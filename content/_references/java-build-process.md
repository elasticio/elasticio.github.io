---
title: Java Build proces
layout: article
section: Working with Java
order: 1
category: component descriptor
---

## Supported build tools

> What build tools are supported and/or expected, maven, ant or gradle?

The Java components for the {{site.data.tenant.name}} platform are built by
**Gradle** and so have a typical structure of a Gradle project. Each component
has a `build.gradle` file in its root tree which is used to configure Gradle project,
dependencies, plugins, etc. Your build file can be a regular Gradle build file.
We require you to define the Java Sailor dependency like:

```
compile "io.elastic:sailor-jvm:2.1.1"
```
You can always find the latest Sailor version from the [Maven repository](https://mvnrepository.com/artifact/io.elastic/sailor-jvm).

Sailor is the Java SDK for the {{site.data.tenant.name}} platform. It makes your
component a citizen of the platform by providing you a simple programming model
for components and ensuring a smooth communication with the platform.

> Java components are always built with Gradle Wrapper to make sure that we build
> your component with the same version of Gradle as you did.
> **You must add Gradle wrapper to your project and commit it to Git**.

You can initialize gradle wrapper with command:
```
wrapper {
    distributionType = Wrapper.DistributionType.ALL
    gradleVersion = '5.6'
}
```

## Build Environment variables

> Which environment variables are available at build time?

Here (https://support.elastic.io/support/solutions/articles/14000039618-how-to-define-env-vars-for-components) you can read environment variables overview for component building process.

Here (https://support.elastic.io/support/solutions/articles/14000039613-env-vars-available-during-component-execution) you can find basic list of variables that you can use in the component. And here some more:

| Variable Name | Description |
|---------------|-------------|
| `ELASTICIO_COMP_NAME` | The name of the executed component |
| `ELASTICIO_FLOW_ID` | ID of the executed flow |
| `ELASTICIO_TENANT_ID` | ID of the tenant |

If you need the integration component to use and expose an environment variables
then you should [define them in your component descriptor file](component-descriptor-structure#envvars-object) (`component.json`) following way:

```json
"envVars": {
  "SALESFORCE_KEY": {
    "required": true,
    "description": "Your Salesforce OAuth client key"
  },
  "SALESFORCE_SECRET": {
    "required": true,
    "description": "Your Salesforce OAuth client secret"
  }
}
```

Then you can get these vars from your code the following way:

```java
System.getenv("SALESFORCE_KEY")
System.getenv("SALESFORCE_SECRET")
```

## Build time available resources

> How much resources RAM/CPU is available at build time?

RAM: 256MB RAM
CPU: 0.1points*
