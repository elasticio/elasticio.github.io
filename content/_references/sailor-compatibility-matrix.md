---
title: Sailor compatibility matrix
description: This document provides information on Sailor compatibility matrix
layout: article
section: Sailor
since: 20180430
order: 1
category: sailor
---

## Platform Sailor

{{site.data.tenant.name}} Sailor is a tool to help developers build and deploy their own integrations using the platform. Sailor is essentially a set of out-of-the-box functionality in library form that allows developers to create, test and deploy integration components.

Using {{site.data.tenant.name}} Sailor, developers can create and package their own integration components in the form of Docker image, which can be easily deployed and run on the Elastic.io platform. These components can be used to integrate various cloud-based services and applications, such as CRMs, ERPs, marketing automation tools, and more.

Sailor also provides a number of tools and utilities to help developers manage their integration components, including the ability to test and debug components locally, as well as the ability to deploy and manage components on the Elastic.io platform. Overall, {{site.data.tenant.name}} Sailor is a powerful tool that can help developers streamline the integration process and build better, more reliable integrations in less time.

The following tables shows the support of the platform features in Sailor versions:

 * [Node.js Sailor compatibility matrix](#nodejs-sailor-compatibility-matrix)
 * [Java Sailor compatibility matrix](#java-sailor-compatibility-matrix)

{{site.data.tenant.name}} follows the [Semver semantics](https://en.wikipedia.org/wiki/Software_versioning)
for the Sailor releases. To keep the compatibility matrix manageable,
we might skip patch releases here.

## Node.js - package.json

All the available `Node.js` Sailor versions can be retrieved directly from the
[NPM](https://www.npmjs.com/package/elasticio-sailor-nodejs) or by executing the
following command on your terminal:

```sh
npm view elasticio-sailor-nodejs versions
```

If your component is written in Node.js then you must make the modification in
your `package.json` configuration file found in the root directory of your component.
Here is where to pay particular attention:

```js
"dependencies": {
    "elasticio-sailor-nodejs": "2.7.1",
    "elasticio-node": "0.0.9",
}
```

### Node.js Sailor compatibility matrix

| Features             | v2.0.x | v2.1.x | v2.2.x | v2.5.x | v2.6.x-v2.7.0 |
| :---                 | :---   | :---   | :---   | : --- | : --- |
| [Request-reply](/components/request-reply/index.html#request-reply-mechanism) | Yes    | Yes    | Yes    | Yes   | Yes   |
| [Startup Hook](/references/sailor-hooks.html#startup-hook) | Yes    | Yes    | Yes    | Yes   | Yes   |
| [Init Hook](/references/sailor-hooks.html#init-hook) | Yes    | Yes    | Yes    | Yes   | Yes   |
| [Passthrough](/guides/passthrough-feature) | -      | Yes    | Yes    | Yes   | Yes   |
| [Shutdown Hook](/references/sailor-hooks.html#shutdown-hook)| -      | -      | Yes    | Yes   | Yes   |
| [Bunyan Logger](/references/sailor-logger) | -      | -      | -      | Yes   | Yes   |
| [Message Size](/guides/platform-behavior.html#default-limits) | -      | -      | -      | -     | Yes   |
| [Disable Passthrough](/guides/passthrough-feature.html#disable-passthrough) | -      | -      | -      | -     | Yes   |
| [Dynamic flow control](/guides/flow-control) | -      | -      | -      | -     | Yes   |
| [Custom error handler](/guides/custom-error-handler.html) | -      | -      | -      | -     | Yes   |
| [Lightweight messages](/releases/20/31.html#support-for-large-messages) | -      | -      | -      | -     | Yes   |

## Java - build.gradle

All the available Java Sailor versions can be retrieved from the
[Maven Central Repository](https://search.maven.org/#search%7Cga%7C1%7Cio.elastic).

If your component is written in Java you must make the modification in your
`build.gradle` configuration file found in the root directory of your component.
Here is where to pay particular attention:

```java
dependencies {
    compile "io.elastic:java-api:2.1.0"
}
```

### Java Sailor compatibility matrix

| Features             | v2.0.x | v2.1.x | v3.0.x | v3.1.x | v3.2.x | v3.3.x-v4.0.0 |
| :---                 | :---   | :---   | :---   | :---   | :---   | :---   |
| [Request-reply](/components/request-reply/index.html#request-reply-mechanism) | Yes    | Yes    | Yes    | Yes    | Yes    | Yes    |
| [Startup Hook](/references/sailor-hooks.html#startup-hook) | Yes    | Yes    | Yes    | Yes    | Yes    | Yes    |
| [Init Hook](/references/sailor-hooks.html#init-hook) | Yes    | Yes    | Yes    | Yes    | Yes    | Yes    |
| [Passthrough](/guides/passthrough-feature) | -      | Yes    | Yes    | Yes    | Yes    | Yes    |
| [Shutdown Hook](/references/sailor-hooks.html#shutdown-hook) | -      | -      | Yes    | Yes    | Yes    | Yes    |
| [Bunyan Logger](/references/sailor-logger) | -      | Yes    | Yes    | Yes    | Yes    | Yes    |
| [Disable Passthrough](/guides/passthrough-feature.html#disable-passthrough) | -      | Yes    | Yes    | Yes    | Yes    | Yes    |
| [Dynamic flow control](/guides/flow-control) | -      | -      | -      | Yes    | Yes    | Yes    |
| [Custom error handler](/guides/custom-error-handler.html) | -      | -      | -      | -      | -      | Yes    |
| [Lightweight messages](/releases/20/31.html#support-for-large-messages) | -      | -      | -      | -      | Yes    | Yes    |
