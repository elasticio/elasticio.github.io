---
title: Component.json Overview
description: This technical reference describes the structure of the component.json manifest file/component descriptor file
layout: article
section: Component.json Technical Reference
order: 1
category: component-descriptor
---

{{site.data.tenant.name}} components are code libraries that are accompanied by a manifest file/**component descriptor** file which contains metadata about the component.  The metadata in this file includes:
* the name and description of the component
* information about the actions and triggers of the component including
  * the location of the action/trigger code
  * name & description of the action/trigger
  * the fields that must be configured to use the action/trigger
  * the inputs and outputs of the action/trigger

## `component.json` Structure
This metadata is stored in a [JSON](https://tools.ietf.org/html/rfc7159) file which must be named `component.json` and must sit in the root folder of the component.
The file needs to be valid JSON.  It should be a single JSON object with the following fields:

### Common Fields

| Property Name | Description |
| :------------ | :---------- |
| [title](#title) | Component's title to be displayed in the UI |
| [description](#description) | Component's description to be displayed in the UI  |
| [buildType](#buildtype) | Determines how the component should be built and run on the platform |
| [credentials](#credentials-object) | Used to expose the fields needed to connect to and authenticate against a system  |
| [actions](#actions--triggers-objects) | Used to expose component's actions |
| [triggers](#actions--triggers-objects) | Used to expose component's triggers |

### Infrequent Fields

| Property Name | Description |
| :------------ | :---------- |
| [deprecated](#deprecated) | Used to flag the component as deprecated |
| [consumesRawData](#consumesrawdata) | Turns off all automatic parsing of incoming requests for all webhooks in the component |
| [envVars](#envvars-object) | Used to declare environment variables |

# `title`
Component's title to be displayed in the UI
![Example Title in the UI](/assets/img/references/component.json/title.png)

**Type:** string

**Example:** `Salesforce`

## `description`
Component's description to be displayed in the UI
![Example Description in the UI](/assets/img/references/component.json/description.png)

**Type:** string

**Example:** `Customer relationship management (CRM) software & cloud computing from the leader in CRM solutions for businesses large & small.`

## `buildType`
Determines how the component should be built and run on the platform

- Setting the value to `docker` will cause the platform to build a docker image based on the pushed code.  This docker image will be run when the component is invoked. The build will be longer but the component will start faster and more reliably.  This is the recommended option.
- Setting the value to `slug` or otherwise omitting it will cause the platform to build a `.tar.gz` slug file. This file will be downloaded and extracted by a generic docker image when the component is run.  The build will be quicker but each component execution will take longer. Some older components may encounter compatibility problems when they are built with `docker`  mode.  Otherwise, `docker` mode is encouraged.

**Type:** string enum of `docker` or `slug`

**Recommended Value:** `docker`

**Default Value:** `slug`

## `credentials` Object
This identifies the information that the platform needs to collect from the integrator in order to be able to connect to their instance/account.  Information that is collected in this section typically include:
* URL to the integrator's instance (if there is not a shared cloud url)
* Username or other account identifier
* Password or other API keys/tokens required to authenticate

> **Note:** [See what happens when the credentials object is omitted](component-json-technical-reference-credentials.html#omitting-credentials)

[See the dedicated article on the credentials object for more information.](component-json-technical-reference-credentials.html)

## `actions` & `triggers` Objects

The `actions` object describes the actions that exist within the component. The `triggers` object describes the triggers that exist within the component.

Actions are operations exposed to the flow builder that can be placed in any step except the first step.  

Triggers are operations exposed to the flow builder that can only be placed in the first step of a flow.

If the component has no actions, then the component.json file should not have an actions field. If the component has no triggers, then the component.json file should not have a triggers field.

[See the dedicated article on the action/trigger object for more information.](component-json-technical-reference-actions-triggers.html)

> **Note** All components must implement at least one action or at least one trigger.

## `deprecated`
Used to signal that this action/trigger should not be used in new flows and that existing flows should migrate to a different action/trigger.

![Example of Action/Trigger Deprecation in the UI](/assets/img/references/component.json/deprecated-component.png)

**Type:** boolean

**Default Value:** `false`
## `consumesRawData`
Normally for webhook triggers, the platform will attempt to parse incoming data to the JSON equivalent before handing it to the component code.  

When this value is set to `true`, then the HTTP body of the incoming request will be passed to your component as an unparsed string in the `msg.body.rawData` field.

This is particularly useful when receiving XML data.

This flag will affect the behavior of all webhooks in the component.  It is not possible to combine "normal" webhooks with "raw" webhooks in the same component.

**Type:** boolean

**Default Value:** `false`

## envVars Object
The **envVars object** defines the environment variables for the component
configuration. Every environment variable defined in the `component.json`
file must have the following properties:

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| required    | `boolean`|  | Specifies whether setting the environmental variable is required for the component to operate properly. If not present then the value is set to `false` by default. |
| description | `string` |  | Description of the environment variable |

The environment variable naming follows a standard UNIX/Linux Shell variable
definitions. As a guidance, variable name must begin with an alphanumeric or alpha
character, followed by one or more alphanumeric or underscore (`_`) characters.
Avoid using reserved words like (`if`, `else`, `elif`, `do`, `done` ...). Here is
an example of `envVars` object implemented in the [Salesforce Component](https://github.com/elasticio/salesforce-component/blob/master/component.json):

```json
{
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
}
```

## Related links

- [Building a component in Java](/guides/building-java-component)
- [Building a component in Node.js](/guides/building-nodejs-component)
- [OAuth 1.0 specification](http://oauth.net/core/1.0/)
- [OAuth 2.0 specification](http://tools.ietf.org/html/rfc6749)
- [View Classes](view-classes)
- [JSONSchema references](https://json-schema.org)
