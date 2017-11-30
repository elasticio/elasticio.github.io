---
title: Building a component in Java
layout: article
section: Developing Components
category: component
order: 3
---

The {{site.data.tenant.name}} platform supports Java programming language for building integration components.
Please read the [JavaDocs](http://www.elastic.io/javadoc/ "Java API documentation") of the Java SDK or browse the
source code on [GitHub](https://github.com/elasticio/java-api "JAVA-API").

To help you create a component in Java we have created a simple
[Petstore component in Java](https://github.com/elasticio/petstore-component-java "Petstore Component in Java")
which connects to the [Petstore API](https://petstore.elastic.io/docs/ "Petstore API") and demonstrates multiple
features of the platform.

## Petstore Component

Let's have a look at the structure of the Petstore component first.

```sh
petstore-component-java
├── build.gradle                                (1)
├── component.json                              (2)
├── gradle
│   └── wrapper                                 (3)
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew                                     (4)
├── gradlew.bat                                 (5)
├── logo.png                                    (6)
├── schemas                                     (7)
│   ├── createPet.in.json
│   ├── createPet.out.json
│   └── getPetsByStatus.out.json
└── src
    └── main
        └── java                                (8)
```

The Java components for the {{site.data.tenant.name}} platform are build by [Gradle](https://gradle.org/) and so have a
typical structure of a Gradle project. Each component has a `build.gradle` (1) file used to configure Gradle project,
dependencies and plugins. Java components are always built with [Gradle Wrapper](https://docs.gradle.org/4.3.1/userguide/gradle_wrapper.html)
in order to make sure that we build your component with the same version of Gradle as you did. That's why you are required
to add Gradle wrapper (3), (4) and (5) to your project and commit it to Git.

If you have a logo for the component, you can place the file called `logo.png` (5) in the root directory of the component.
Typically the logo of the API vendor gets used as component logo. If you did not provide any logo, the component will
show a generic logo for your component.

The directoty `src/main/java` (8) is predefined directory Gradle expects your Java sources to be located in and the
`schemas` (7) directory is the location of JSON schemas defining the component's metatada which we will cover later in
this article.

Last but not least the `component.json` file (2) is the component descriptor interpreted by the platform to gather all
the required information to be presented to the user in the platform UI. For example, you can define simple things like
component's title in the component descriptor but also the component's authentication mechanism. The descriptor is
the only place to list the functionality provided by the component, the so called `triggers` and `actions`.

## Component descriptor

As mentioned above the `component.json` file is the component descriptor interpreted by the platform to gather all the
required information about the component. Let's explore the descriptor of the Petstore component:

```json
{
  "title": "Petstore API (Java)",                                           (1)
  "description": "elastic.io component for the Petstore API",               (2)
  "docsUrl": "https://github.com/elasticio/petstore-component-java",
  "credentials": {                                                          (3)
    "fields": {
      "apiKey": {
        "label": "API key",
        "required": true,
        "viewClass": "TextFieldWithNoteView",
      }
    },
    "verifier": "io.elastic.petstore.ApiKeyVerifier" (1)
  },
  "triggers": {                                                             (4)
    ...
  },
  "actions": {                                                              (5)
    ...
  }
}
```

The component descriptor above defines the component title (1) and description (2). It also defines the fields used to
ask the user to provide input for authentication (3). In this case a single field is define in which the user will input
the API key for the Petstore API so that the component can communicate with the API on user's behalf.

Now let's have a closer look on how to define triggers. The example below demonstrates the `triggers` section from the
`component.json` component descriptor file.

```json
  "triggers": {
    "getPetsByStatus": {                                                (1)
      "main": "io.elastic.petstore.triggers.GetPetsByStatus",           (2)
      "type": "polling",                                                (3)
      "title": "Get Pets By Status (HttpClient)",
      "fields": {                                                       (4)
        "status": {
          "label": "Pet Status",
          "required": true,
          "viewClass": "SelectView",
          "model": {
            "available": "Available",
            "pending": "Pending",
            "sold": "Sold"
          },
          "prompt": "Select Pet Status"
        }
      },
      "metadata": {
        "out": "./schemas/getPetsByStatus.out.json"                     (5)
      }
    }
  },
```

The example above demonstrates that the trigger with id `getPetsByStatus` (1) is implemented by the `GetPetsByStatus`
class (2). The trigger is of `polling` type (3) meaning it will wake up periodically to poll for changes in the Petstore
API. The triggers can be configured with some fields (4) and defines out-metadata in the file `getPetsByStatus.out.json` (5).

## We are using Gradle wrapper

To build this component we are using a Gradle wrapper for convenience and cross-platform implementation since this wrapper is a batch script on Windows (gradlew.bat), and a shell script (gradlew) for other operating systems.

When you start a Gradle build via the wrapper, Gradle will be automatically downloaded and used to run the build. When the Gradle wrapper gets installed it will add the configuration files into your repository automatically. **You should not remove these files.** Here are the files and their purpose:

*   gradle/wrapper - directory which contains two files:
    *   gradle-wrapper.jar
    *   gradle-wrapper.properties

### build.gradle

This is Gradle build file which includes the rules of the build.

```java
apply plugin: 'java'
apply plugin: 'groovy'
apply plugin: 'idea'
apply plugin: 'eclipse'
apply plugin: 'java-library-distribution'

group = 'io.elastic'
version = '1.0.0'

sourceCompatibility = 1.8
targetCompatibility = 1.8

repositories {
    maven {
        url "https://oss.sonatype.org/content/repositories/snapshots"
    }
    mavenCentral()
    mavenLocal()
}

dependencies {
    compile "io.elastic:sailor-jvm:2.0.1"
    compile "org.glassfish.jersey.core:jersey-client:2.25.1"
    compile "org.glassfish.jersey.media:jersey-media-json-processing:2.25.1"
}

uploadArchives {
    repositories {
        mavenLocal()
    }
}

task wrapper(type: Wrapper) {
    gradleVersion = '2.0'
}
```

## src/main

This directory contains all the relevant dependency files and programs necessary for this component to work:

*   `java/io/elastic/petstore`
    *   `actions`
        *   `CreatePet.java`
    *   `providers`
        *   `PetStatusModelProvider.java`
    *   `triggers`
        *   `GetPetsByStatus.java`
        *   `GetPetsByStatusJaxRs.java`
    *   `ApiKeyVerifier.java`
    *   `Constants.java`
    *   `HttpClientUtils.java`
*   `schemas`
    *   `getHello.out.json`
    *   `updateHello.in.json`
    *   `updateHello.out.json`
