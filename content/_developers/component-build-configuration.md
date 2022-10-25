---
title: Components build configuration requirements
description: This document explains how the components-build-helper (CBH) builds docker images for Java and NodeJs components and how it checks for the vulnerabilities in the components.
layout: article
section: Component Template Features
order: 1
category: component-descriptor
---

## Summary

{{page.description}}

## Vulnerabilities check

The component vulnerability checks are the essential part of the component build
process. There are two distinct parts to these checks:

1.  **Check for vulnerabilities in the used libraries**. As a component developer, you must configure these checks according to guidelines we present for [Java](#java-components) and [NodeJs](#nodejs-components) languages.
2.  **Check for vulnerabilities in the build docker image**. The `CBH` does this during the CI/CD component build process using the [grype](https://github.com/anchore/grype) tool.

### Checks during the CI/CD build process

`CBH` has a `build_component_docker` command, which builds docker image, checks
vulnerabilities using the [grype](https://github.com/anchore/grype) tool and
pushes images to the Docker Hub. The `build_component_docker` accepts the
following environment variables:

*   `DOCKER_USERNAME` - username to authenticate in the docker registry
*   `DOCKER_PASSWORD` - password to authenticate in the docker registry
*   `DRY_RUN` - If `true` , disables pushing built docker image to the docker registry

> **Limitation**: `build_component_docker` command supports pushing docker image only to the **elasticio** Docker Hub repository.

Example of component CI/CD configuration:

```yaml
version: 2.1
parameters:
  node-version:
    type: string
    default: "16.13.2"
orbs:
  node: circleci/node@5.0.0
jobs:
  build:
    docker:
      - image: cimg/base:stable
        user: root
    steps:
      - checkout
      - node/install:
          node-version: << pipeline.parameters.node-version >>
      - setup_remote_docker:
          version: 19.03.13
          docker_layer_caching: true
      # build and push Docker image
      - run:
          name: Install component-build-helper lib
          command: npm install -g @elastic.io/component-build-helper
      - run:
          name: Build and publish docker image
          command: build_component_docker
workflows:
  publish_release:
    jobs:
      - build:
          name: "Build and publish docker image"
          filters:
            branches:
              ignore: /.*/
            tags:
              only: /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/
```

### How to handle docker image vulnerabilities during CI/CD process?

*   You can disable image vulnerabilities check using `GRYPE_DISABLED=true` environment variable.
*   If you need to ignore some vulnerability checks of the component image, use component-specific grype ignore list `.grype-ignore.yaml` file. Place this file at the root of the project. The file should have a root element `ignore` containing children elements following the [grype ignore rules](https://github.com/anchore/grype#specifying-matches-to-ignore) like:

```yaml
ignore:
  - vulnerability: CVE-****-******
  - vulnerability: CVE-****-******
  - package:
      type: apk
```

## Java components

When you deploy a Java based component code, the `CBH` uses `generateDockerfile`
function to create `Dockerfile` with structure and commands (including `./gradlew build`)
needed to build a docker image with a proper Java runtime environment.

### Supported Java versions

The `CBH` supports the following LTS Java versions: `1.8` (Java SE 8), `11` (Java SE 11)
and `17` (Java SE 11). Depending on the version (or the `targetCompatibility` value),
`CBH` uses different build/runtime images as build and runtime environment to
address potential vulnerabilities in the runtime docker images:

| targetCompatibility | build images | runtime image |
| --- | --- | --- |
| 1.8 | amazoncorretto:8-alpine-jdk | amazoncorretto:8-alpine-jre |
| 11 | amazoncorretto:11-alpine-jdk | alpine:latest |
| 17 | amazoncorretto:17-alpine-jdk | alpine:latest |

The `CBH` takes advantage of the **Java module packaging mechanism** to identify all necessary modules for the component class-path and creates a runtime image which contains only them.

You can change this behaviour by adding your list of runtime java models using `jdeps.info` file, which must be in the root directory of the component sources. This configuration file must have a comma separated list of modules you wish to include:

```yaml
java.base,java.desktop,java.management,java.security.jgss,java.security.sasl,java.sql.rowset,jdk.security.auth,jdk.unsupported
```

### Gradle configuration

The **`CBH`** supports only the [**Gradle**](https://gradle.org/) to build Java based component code. Currently, it will use the gradle version `7.4.2` by default. If the component code requires a special version of gradle, you can configure the **wrapper** in the **build.gradle** file like:

```groovy
wrapper {
    gradleVersion = '5.4.1'
}
```

However, there are limitations and some unique configurations one should remember while configuring the build process for the Java components.

> **Limitation: `CBH`** supports only the gradle wrapper generated using version above `3.2`**.** Starting from the gradle version `3.2`, it generates wrapper with `#!/usr/bin/env sh` instead of `#!/usr/bin/env bash`. **`CBH`** generates Dockerfile without bash installed.


**`CBH`** expects to find built classes in the `build/classes/main` directory. By default, gradle uses another directory to locate built classes. That’s why **build.gradle** file **must contains right `sourceSets` configuration:**

```groovy
sourceSets {
    main {
        java.outputDir = file('build/classes/main')
    }
    test {
        java.outputDir = file('build/classes/test')
    }
    integrationTest {
        java.outputDir = file('build/classes/integrationtest')
        java { srcDir file('src/integration-test/java') }
        resources { srcDir file('src/integration-test/resources') }
    }
}
```

### Gradle and Vulnerability checks



As a component developer, you must configure the vulnerability checks in the
**build.gradle** file and configure nightly jobs in the CI to identify new
vulnerabilities in the used libraries.

You can configure the `org.owasp.dependencycheck.gradle.DependencyCheckPlugin`
to identify vulnerabilities. Configuration must contain a suppression file, where
you can exclude not relevant vulnerabilities. See [https://plugins.gradle.org/plugin/org.owasp.dependencycheck](https://plugins.gradle.org/plugin/org.owasp.dependencycheck) for more details.

## Node.js components

When you deploy a NodeJs based component code, the `CBH` detects the `package.json`
and `package-lock.json` files and starts the build process (`npm install`) for the
NodeJs based components. Next, the `CBH` uses  `generateDockerfile` function to
create `Dockerfile` image and stores it the docker registry.

### Recommended NodeJs versions

To guarantee a proper build and execution of NodeJs component, we recommend using
only the [officially supported NodeJs versions](https://github.com/nodejs/Release).
NodeJs version range should contain the last patch of selected LTS node version
and have the following format: `16.x`(last patch of node 16), `18.x`(last patch
of node 18). `CBH` automatically finds the last patch version and specifies it on
the docker image tag. As a component developer, specify the version in the
`package.json` file in the `engines.node` part like:

```json
"engines": {
    "node": "18.x"
  }
```

The `CBH` uses the latest `node:${version}-alpine` docker image as build and
runtime to help address the vulnerabilities in the runtime docker image.

### NodeJS package vulnerabilities

You must configure a nightly job in the CI to identify new vulnerabilities in the
used npm packages. We found that the [better-npm-audit](https://www.npmjs.com/package/better-npm-audit)
package provides flexibility and functionality to do the job. It has a functionality
to add unnecessary vulnerabilities to the ignore file.

## Custom Dockerfile

Sometimes the developer needs to install additional packages for the component
image. By default, **`CBH`** generates Dockerfile based on the `alpine` Linux,
with the following dependencies:

*   `git`
*   `tini`
*   `python3`
*   `make`
*   `g*++*`

If you need to customise the Dockerfile image, you can create a custom Dockerfile
by issuing the following command:

```bash
npm i @elastic.io/component-build-helper -g
component_cli generateDockerfile ./ > /your/component/root/dir/Dockerfile
```

This will create the following `Dockerfile` structure:

```bash
FROM node:14-alpine AS base
RUN apk add --update git tini python3 make g++ && rm -rf /var/cache/apk/*
WORKDIR /home/node
COPY --chown=node:node . ./
FROM base AS dependencies
ENV LOG_OUTPUT_MODE=short
USER node
RUN npm config set update-notifier false
RUN npm install --no-audit
RUN npm test
RUN npm prune --production
RUN rm -rf spec* .circleci README.md LICENSE .idea
FROM node:14-alpine AS release
LABEL elastic.io.component=""
LABEL elastic.io.logo=""
WORKDIR /home/node
COPY --from=base --chown=node:node /sbin/tini /sbin/tini
COPY --from=dependencies --chown=node:node /home/node /home/node
USER node
ENTRYPOINT ["/sbin/tini", "-v", "-e", "143", "--"]
```

*   If you need an additional package for the building process, you can install it on the `base`  stage.
*   In case you need a package in runtime, install to the `release` stage.

### Docker Labels

In case you wand to use custom `Dockerfile`, omit `elastic.io.component` and
`elastic.io.logo` labels in your custom `Dockerfile`. The `generateDockerfile`
command will add these labels automatically during the deployment.
