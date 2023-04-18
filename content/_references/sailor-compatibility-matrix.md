---
title: Sailor compatibility matrix
description: This document provides information on Sailor compatibility matrix
layout: article
section: Sailor
since: 20180430
order: 1
category: sailor
---

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
    "elasticio-sailor-nodejs": "2.1.0",
    "elasticio-node": "0.0.8",
}
```

### Node.js Sailor compatibility matrix

| Features             | v2.0.x | v2.1.x | v2.2.x | 2.5.x | 2.6.x || 2.7.0 |
| :---                 | :---   | :---   | :---   | : --- | : --- || : --- |
| Request-reply        | Yes    | Yes    | Yes    | Yes   | Yes   || Yes   |
| Startup Hook         | Yes    | Yes    | Yes    | Yes   | Yes   || Yes   |
| Init Hook            | Yes    | Yes    | Yes    | Yes   | Yes   || Yes   |
| Passthrough          | -      | Yes    | Yes    | Yes   | Yes   || Yes   |
| Shutdown Hook        | -      | -      | Yes    | Yes   | Yes   || Yes   |
| Bunyan Logger        | -      | -      | -      | Yes   | Yes   || Yes   |
| Message Size         | -      | -      | -      | -     | Yes   || Yes   |
| Disable Passthrough  | -      | -      | -      | -     | Yes   || Yes   |
| Dynamic flow control | -      | -      | -      | -     | Yes   || Yes   |
| Custom error handler | -      | -      | -      | -     | Yes   || Yes   |
| Lightweight messages | -      | -      | -      | -     | Yes   || Yes   |

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

| Features             | v2.0.x | v2.1.x | v3.0.x | v3.1.x | v3.2.x | v3.3.x || v3.4.0 || v3.5.0 || v4.0.0 |
| :---                 | :---   | :---   | :---   | :---   | :---   | :---   || :---   || :---   || :---   |
| Request-reply        | Yes    | Yes    | Yes    | Yes    | Yes    | Yes    || Yes    || Yes    || Yes    |
| Startup Hook         | Yes    | Yes    | Yes    | Yes    | Yes    | Yes    || Yes    || Yes    || Yes    |
| Init Hook            | Yes    | Yes    | Yes    | Yes    | Yes    | Yes    || Yes    || Yes    || Yes    |
| Passthrough          | -      | Yes    | Yes    | Yes    | Yes    | Yes    || Yes    || Yes    || Yes    |
| Shutdown Hook        | -      | -      | Yes    | Yes    | Yes    | Yes    || Yes    || Yes    || Yes    |
| Bunyan Logger        | -      | Yes    | Yes    | Yes    | Yes    | Yes    || Yes    || Yes    || Yes    |
| Disable Passthrough  | -      | Yes    | Yes    | Yes    | Yes    | Yes    || Yes    || Yes    || Yes    |
| Dynamic flow control | -      | -      | -      | Yes    | Yes    | Yes    || Yes    || Yes    || Yes    |
| Custom error handler | -      | -      | -      | -      | -      | Yes    || Yes    || Yes    || Yes    |
| Lightweight messages | -      | -      | -      | -      | Yes    | Yes    || Yes    || Yes    || Yes    |
