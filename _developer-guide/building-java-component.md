---
title: Building a component in Java
layout: article
section: Developing Components
category: component
order: 3
---

The {{site.data.tenant.name}} platform supports Java programming language for building integration components. Please read the [JavaDocs](http://www.elastic.io/javadoc/ "Java API documentation") of the Java SDK or browse the source code on [GitHub](https://github.com/elasticio/java-api "JAVA-API").

To help you create a component in Java we have created a simple [Petstore component in Java](https://github.com/elasticio/petstore-component-java "Petstore Component in Java") which connects to the [Petstore API](https://petstore.elastic.io/docs/ "Petstore API") and demonstrates multiple features of the platform.

## Java Component Structure Overview

Here is the structure of the example Hello World component on our GitHub repository:

| **File Name** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| [logo.png](#logo) | image | suggested | Logo of your component |
| [component.json](#componentjson)  | JSON | Yes | Description of the component structure |
| [gradle/wrapper](#gradle) | directory | Yes | Gradle wrapper directory |
| [build.gradle](#buildgradle) | Gradle | required | Gradle build file |
| [src/main](#src-main) | directory | suggested | the main component directory |

## Logo

If you have a logo for the component, you can place the file called logo.png in the root directory of the component. Typically the logo of the API vendor gets used as component logo. If you did not provide any logo, the component will show a generic logo for your component.

Here are the requirements for the logo file:

*   The name must be `logo.png` (PNG format). Do not change it.
*   The logo should have at least 128 x 128 pixels in dimension.

## component.json

The file **component.json** is the component descriptor which must be located in the root directory of the component. This descriptor is interpreted by the platform to gather all the required information to be presented to the user in the platform UI. For example, you can define simple things like component's title in the component descriptor but also the component's authentication mechanism. The descriptor is the only place to list the functionality provided by the component, the so called `triggers` and `actions`.

**Please note that your `component.json` file should have/describe at least one trigger or action.**
```js
{
  "title": "Petstore API (Java)",
  "description": "elastic.io component for the Petstore API",
  "docsUrl": "https://github.com/elasticio/petstore-component-java",
  "credentials": {
    "fields": {
      "apiKey": {
        "label": "API key",
        "required": true,
        "viewClass": "TextFieldWithNoteView",
        "note": "Please use <strong>elasticio</strong> as API key. For more details see <a href="https://petstore.elastic.io/docs/" target="_blank">Petstore API docs</a>."
      }
    },
    "verifier": "io.elastic.petstore.ApiKeyVerifier"
  },
  "triggers": {
    "getPetsByStatus": {
      "main": "io.elastic.petstore.triggers.GetPetsByStatus",
      "type": "polling",
      "title": "Get Pets By Status (HttpClient)",
      "description": "Retrieves pets from the Petstore API by given pet status using Apache HttpClient",
      "fields": {
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
        "out": "./schemas/getPetsByStatus.out.json"
      }
    },
    "getPetsByStatusJaxRs": {
      "main": "io.elastic.petstore.triggers.GetPetsByStatusJaxRs",
      "type": "polling",
      "title": "Get Pets By Status (JAX-RS)",
      "description": "Retrieves pets from the Petstore API by given pet status using Java API for RESTful Web Services (JAX-RS)",
      "fields": {
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
        "out": "./schemas/getPetsByStatus.out.json"
      }
    },
    "getPetsByStatusWithDynamicSelectModel": {
      "main": "io.elastic.petstore.triggers.GetPetsByStatus",
      "type": "polling",
      "title": "Get Pets By Status With Dynamic Select Model",
      "description": "Retrieves pets from the Petstore API by given pet status. The available statuses are retrieved from the Petstore API dynamically.",
      "fields": {
        "status": {
          "label": "Pet Status",
          "required": true,
          "viewClass": "SelectView",
          "model": "io.elastic.petstore.providers.PetStatusModelProvider",
          "prompt": "Select Pet Status"
        }
      },
      "metadata": {
        "out": "./schemas/getPetsByStatus.out.json"
      }
    }
  },
  "actions": {
    "createPet": {
      "main": "io.elastic.petstore.actions.CreatePet",
      "title": "Create a Pet",
      "description": "Creates a new Pet",
      "metadata": {
        "in": "./schemas/createPet.in.json",
        "out": "./schemas/createPet.out.json"
      }
    }
  }
}
```

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
