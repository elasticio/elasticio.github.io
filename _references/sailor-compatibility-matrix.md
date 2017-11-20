---
title: Sailor compatibility matrix
layout: article
section: Sailor
---

Starting from version 2.0.0, sailors for Java and Node.js programming languages are feature-compatible.
If a feature is available in a given version, you can be sure that Sailors for both programming languages are
supporting this feature. The following table shows the support of the platform features in Sailor versions:

|             |          Grouping           ||
First Header  | Second Header | Third Header |
 ------------ | :-----------: | -----------: |
Content       |          *Long Cell*        ||
Content       |   **Cell**    |         Cell |

New section   |     More      |         Data |
And more      | With an escaped '\|'         ||

| Features | v2.0.0 | v2.1.0 | v2.1.0 |
| :--- | :--- | :--- | :--- |
|  Request-reply |  Yes |  Yes | Yes  |

{{site.data.tenant.name}} follows the Semver semantics for the Sailor releases. In order to keep the compatibility matrix
manageable, we might skip patch releases here.

## Node.js - package.json

All the available Node.js Sailor versions can be retrieved directly from the NPM or by executing the following command
on your terminal: npm view elasticio-sailor-nodejs versions.

If your component is written in Node.js then you must make the modification in your component.json configuration file
found in the root directory of your component. Here is where to pay particular attention:

````
"dependencies": {
    "elasticio-sailor-nodejs": "2.1.0",
    "elasticio-node": "0.0.8",
}
````

## Java - build.gradle

All the available Java Sailor versions can be retrieved from the Maven Central Repository.

If your component is written in Java you must make the modification in your build.gradle configuration file found in
the root directory of your component. Here is what exactly to modify:

````
dependencies {
    compile "io.elastic:java-api:2.1.0"
}
````