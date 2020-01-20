---
title: Supported Java version
description: Deails on supported Java version.
layout: article
section: Working with Java
order: 1
category: component descriptor
---

## Use Java 8

> **You should use Java 8 for component building.**
You can use all the standard [Java packages from Java 8](https://docs.oracle.com/javase/8/docs/api/)
as well as any third-party library as long as it is listed in the
[Maven repository](https://mvnrepository.com/). Find there the library and
its version, open Gradle tab and copy-paste the link into the component `build.gradle`
file like this:

```
dependencies {
    compile 'commons-logging:commons-logging:1.1'
    compile 'com.fasterxml.jackson.module:jackson-module-jsonSchema:2.9.4'
    compile group: "com.github.java-json-tools", name: "json-schema-validator", version: "2.2.8"
    compile group: 'com.smartystreets.api', name: 'smartystreets-java-sdk', version: '3.2.0'
    compile 'io.elastic:sailor-jvm:2.1.0'
    testCompile group: 'junit', name: 'junit', version: '4.12'
}
```

All dependencies will be resolved and automatically download by the platform
during component deployment.
