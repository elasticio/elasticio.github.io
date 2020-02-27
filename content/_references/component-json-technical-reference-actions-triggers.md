---
title: component.json Technical Reference - Actions & Triggers
description: This technical reference describes the structure of the actions section of the component.json manifest file/component descriptor file
layout: article
section: Component Descriptor
order: 3
category: component descriptor
---

## `actions` & `triggers` Object

The `actions` & `triggers` objects in the [`component.json`](component-json-technical-reference.html) describe the actions & triggers that exist within the component.  

Actions are operations exposed to the flow builder that can be placed in any step except the first step of a flow. 

Triggers are operations exposed to the flow builder that can only be placed in the first step of a flow.

Both action and trigger objects in `component.json` have similar structures however there are small differences between them which are described in this article.

Each key-value pair in the object represents an action or trigger that is exposed.  The string key acts as the identifier for the action/trigger. 

The structure used to describe each action or trigger is described below. 

If the component has no actions, then the `component.json` file should not have an `actions` field.  If the component has no triggers, then the `component.json` file should not have a `triggers` field.  All components must implement at least one action or at least one trigger.

| Property Name | Action/Trigger | Description |
| :------------ | :---------- | :---------- |
| [title](#title--description) | Both | Action or trigger's title to be displayed in the UI |
| [description](#title--description) | Both | Action or trigger's description to be displayed in the UI  |
| [deprecated](#deprecated) | Both | Used to flag the action/trigger as deprecated |
| [main](#main) | Both | Identifies the code entry point for the action/trigger |
| [type](#type) | Triggers Only | Identifies if the trigger should be a `polling` or `webhook` trigger |
| [fields](#fields-object) | Both |Identifies input fields used to provide flow-level configuration for the action/trigger |
| [dynamicMetadata](#metadata-metadata--dynamicmetadata) | Both | Signals that the component will dynamically communicate the expected structure of incoming and outgoing messages of the action/trigger  |
| [metadata](#metadata-metadata--dynamicmetadata) | Both | Statically defines the expected structure of incoming and outgoing messages of the action/trigger  |


## `title` & `description`
The title and description of the action/trigger to be displayed in the UI
![Example of Action/Trigger Title & Description in the UI](/assets/img/references/component.json/action-title-description.png)

**Type:** string

**Examples:** 
* **`title`:** `Upsert Object`
* **`description`:** `Given criteria that matches at most one object, update that object or create it if it does not exist`

## `deprecated`
Used to signal that this action/trigger should not be used in new flows and that existing flows should migrate to a different action/trigger.

![Example of Action/Trigger Deprecation in the UI](/assets/img/references/component.json/deprecated-action.png)

**Type:** boolean

**Default Value:** `false`
## `main`
Identifies the code entry point for the action/trigger.

In the case of JavaScript components, the code entry point is identified as a path to a `.js` file which contains the code for the action/trigger. This path should be relative to the root of the component.

In the case of Java components, the code entry point is identified as a fully qualified Java class name which implements the logic for the action/trigger.

**Type:** string

**Examples:** 
* **JavaScript:** `./lib/actions/upsertFile.js`
* **Java:** `io.elastic.soap.actions.CallAction`

## `type` 
**Triggers Only**

Identifies the type of trigger. There are two options: `polling` and `webhook`.

- Setting the value to `polling` will cause the platform to start the flow at regularly scheduled intervals based on a CRON expression.
- Setting the value to `webhook` will cause the platform to generate a URL when the flow is published. The flow will be run when HTTP(S) requests arrive at this URL.

**Type:** string enum of `polling` or `webhook`

**Example:** `polling`

**Default Value:** `polling`
## `fields` Object

## Metadata: `metadata` & `dynamicMetadata`

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| title       | `string` | Yes      | Human readable title of the action |
| main        | `string` | Yes      | Relative path to a Node.js module or a fully qualified name of a Java class |
| metadata    | `object` | Yes      | Can contain two properties `in` and `out` whose values are JSON Schemas describing the metadata of the message's body consumed and produced by the action. The `in` metadata define the input data required by the action. These metadata are rendered as input fields in user interface during the mapping. The `out` metadata define the out data produced by the action. |
| [fields](#fields-object)      | `object` | No       | Action specific input fields used to provide configuration for the action |

Here is an example of action object implementation in the `component.json`:

```json
{
  "queryAction": {
    "title": "Query",
    "main": "./lib/actions/query.js",
    "metadata": {
      "in": {
      "type": "object",
      "properties": {
        "query": {
          "maxLength": "20000",
          "title": "SOQL Query",
          "type": "string",
          "required": "true"
        }
      }
    },
    "out": {}
  }
}
}
```
