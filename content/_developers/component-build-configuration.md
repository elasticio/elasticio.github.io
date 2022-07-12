---
title: Components build configuration requirements
description: This document helps understand how components-build-helper (CBH) build docker image structure for Java/ NodeJs components and how to avoid vulnerabilities in the components.
layout: article
section: Component Template Features
order: 1
category: component-descriptor
---

## General information

{{page.description}}

## Vulnerabilities check

Component vulnerabilities check contains two parts:

 * check vulnerabilities in the used libraries - **must be configured by component developer**

 * check vulnerabilities in the build docker image - **must be** **done by `CBH` during component build process**

**`CBH`** has `build_component_docker` command which checks docker image vulnerabilities using `grype` tool.  

 * Image vulnerabilities check can be temporary disabled using env var`GRYPE_DISABLED=true`.
 * In case developer needs to ignore some vulnerability for component image `.grype-ignore.yaml` file can be included to the sources.
 * Component-specific grype ignore list should be inside the file `.grype-ignore.yaml` and placed in the root of the project.
 * The file itself should have root element `ignore` and children elements - [grype ignore rules](https://github.com/anchore/grype#specifying-matches-to-ignore)

`.grype-ignore.yaml` File example:

```yaml
ignore:
  - vulnerability: CVE-****-******
  - vulnerability: CVE-****-******
  - package:
      type: apk
```

## Java components

 * **`CBH`**  has `generateDockerfile` function, which is used to create `Dockerfile` structure during deploy component to the platform.

 **`CBH`** uses latest `amazoncorretto:8-alpine-jdk(jre)` docker image as build and runtime environment. That’s helps to avoid vulnerabilities in the build/runtime docker image.

 * **`CBH`** supports only **Gradle** as Build tool. By default **`CBH`** uses gradle version `7.4.2`. If component requires special version of gradle, **[wrapper](https://docs.gradle.org/current/dsl/org.gradle.api.tasks.wrapper.Wrapper.html#org.gradle.api.tasks.wrapper.Wrapper)** can be configured.

Example of the wrapper configuration in the **build.gradle:**

```groovy
wrapper {
    gradleVersion = '5.4.1'
}
```

 *  **`CBH`** expect to find built classes in the `build/classes/main` directory. By default gradle use another directory to locate built classes. That’s why **build.gradle** must contains right `sourceSets` configuration:

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

 * Vulnerability check must be configured in the **build.gradle**.

 * Developers must configure nightly job in the CI to identify new vulnerabilities in the used libraries.
 * `[org.owasp.dependencycheck.gradle.DependencyCheckPlugin](https://plugins.gradle.org/plugin/org.owasp.dependencycheck)`  must be configured to identify vulnerabilities. Configuration must contain suppression file, where developers can exclude some not relevant vulnerabilities.
See [https://plugins.gradle.org/plugin/org.owasp.dependencycheck](https://plugins.gradle.org/plugin/org.owasp.dependencycheck) for more details.

## Node.js components

 * **`CBH`**  has `generateDockerfile` function, which is used to create `Dockerfile` structure during deploy component to the platform.
 * **`CBH`** uses latest `node:${version}-alpine` docker image as build and runtime environment. That’s helps to avoid vulnerabilities in the runtime docker image.
 * Component developer should specify NodeJs version in the package.json `engines.node` field. NodeJs version range should contains the last patch of selected LTS node version and have next format: `**16.x**`(last patch of node 16), `**18.x**`(last patch of node 18). **`CBH`** automatically find last patch version and specify it in the docker image tag.
 * Developers must configure nightly job in the CI to identify new vulnerabilities in the used npm packages. [better-npm-audit](https://www.npmjs.com/package/better-npm-audit) package is recommended to be used. It contains functionality to add unnecessary vulnerabilities to the ignore file
