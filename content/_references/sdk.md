---
title: Software Development Kit - SDK
description: SDK provides developers with APIs and tools necessary to build, test, and debug integration component for the integration platform.
layout: article
section: Sailor
order: 0
category: sailor
---

The {{site.data.tenant.name}} Software Development Kit or **SDK** provides
developers with APIs and tools necessary to build, test, and debug integration
component for the {{site.data.tenant.name}} integration platform.

## Supported Languages

Our SDK supports **Node.js** and **Java** programming languages.
For each of the supported programming languages, we deliver an SDK with samples
and a lot of documentation. Support for more languages is planned but no timeline
is in place.

## Node.js

Node.js is an open-source, cross-platform runtime environment for developing
server-side web applications. Node.js applications are written in JavaScript and
can be run within the Node.js runtime on many major systems.

Due to its architecture, there can not be a specific API to fetch and work on it.
Instead, we have several examples of components which can be forked and developed
according to anyone's desire.

A simple component called [Petstore]({{site.data.tenant.petStoreSourceNodeJS}})
could well be a starting point to base your project if you desire to develop using Node.js

## Java

Java is a general-purpose computer programming language that is concurrent,
class-based, object-oriented, and specifically designed to have as few
implementation dependencies as possible. It is intended to let application
developers "write once, run anywhere" (WORA), meaning that compiled Java code
can run on all platforms that support Java without the need for recompilation.

The whole idea and the architecture warrant the use of separate API structure
for this language and {{site.data.tenant.name}} has its own [java-API]({{site.data.tenant.javaAPISource}}).

If you prefer to write integration components using Java programming language,
please check our [Java API description]({{site.data.tenant.javaAPIDocs}}) as well.

We also have a [Petstore]({{site.data.tenant.petStoreSourceJava}})
component for java to give you a more in-depth view of the structure that a
simplistic java component can have. **Currently, we support Gradle wrapper** and
all the dependencies are listed in the `build.gradle` file of any component.

The jar is also available on Maven Central. For Apache Maven (XML) please use:

```xml
<dependency>
    <groupId>io.elastic</groupId>
    <artifactId>java-api</artifactId>
    <version>2.0.1</version>
</dependency>
```
## Related links

- [Java API]({{site.data.tenant.javaAPISource}})
- [Java API description]({{site.data.tenant.javaAPIDocs}})
