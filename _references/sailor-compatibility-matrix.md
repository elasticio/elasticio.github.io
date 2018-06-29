---
title: Sailor compatibility matrix
layout: article
section: Sailor
since: 20180430
---

Starting from version 2.0.0, sailors for Java and Node.js programming languages
are feature-compatible. If a feature is available in a given version, you can be
sure that Sailors for both programming languages are supporting this feature. The
following table shows the support of the platform features in Sailor versions:

| Features | v2.0.x | v2.1.x | v2.2.x |
| :--- | :--- | :--- | :--- |
|  Request-reply |  Yes |  Yes | Yes  |
|  Startup Hook |  Yes |  Yes | Yes  |
|  Init Hook |  Yes |  Yes | Yes  |
|  Passthrough |  - |  Yes | Yes  |
|  Shutdown Hook |  - |  - | Yes  |

{{site.data.tenant.name}} follows the [Semver semantics](https://en.wikipedia.org/wiki/Software_versioning)
for the Sailor releases. In order to keep the compatibility matrix manageable,
we might skip patch releases here.

## Node.js - package.json

All the available Node.js Sailor versions can be retrieved directly from the
[NPM](https://www.npmjs.com/package/elasticio-sailor-nodejs) or by executing the
following command on your terminal:

```sh
npm view elasticio-sailor-nodejs versions
```

If your component is written in Node.js then you must make the modification in
your `package.json` configuration file found in the root directory of your component.
Here is where to pay particular attention:

````
"dependencies": {
    "elasticio-sailor-nodejs": "2.1.0",
    "elasticio-node": "0.0.8",
}
````

## Java - build.gradle

> **Note**  Java Sailor 2.2.0 is in beta testing phase

All the available Java Sailor versions can be retrieved from the
[Maven Central Repository](https://search.maven.org/#search%7Cga%7C1%7Cio.elastic).

If your component is written in Java you must make the modification in your
`build.gradle` configuration file found in the root directory of your component.
Here is where to pay particular attention:

````
dependencies {
    compile "io.elastic:java-api:2.1.0"
}
````
