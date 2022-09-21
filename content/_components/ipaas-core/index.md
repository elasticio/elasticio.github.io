---
title: IPaas Core component
layout: component
section: Utility components
description: A component to manipulate integration artifacts such as flows via the REST API (v2) of the Integration Platform As a Service.
icon: ipaas-core.png
icontext: IPaas Core component
category: ipaas-core
updatedDate: 2022-08-26
ComponentVersion: 1.5.0
---

## Description

#### Environment variables

| Name | Mandatory | Description | Values |
|----|---------|-----------|------|
| `PARALLEL_PLATFORM_API_CALLS`| false | Sets the max number of concurrent API calls that will be made to the platform at a given time | Positive Integer. Default is `20`.|

## Credentials

To authenticate against the platform API, you need three pieces of information.
You can get all three pieces of information on your **Profile Information** page
located at `/account/profile`.

*   **Platform Instance URL** - The address to the platform API
*   **Email** - The Email Address To use in authentication
*   **API Key** - The API key used in authentication

The component can handle the following authentication models:

*   Integrator provides no additional authentication parameters: The component fetches all three pieces of required information from environment variables in the component. The component will only have access to the current workspace.
*   The integrator provides a username/api combination to gain access to artifacts within the same tenant. The address of the platform API is fetched from environment variables.
*   The integrator provides all three pieces of information so that artifacts from other tenants/instances can be accessed.

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Calculate Flow Dependencies

Action which emits list of all topics, secrets, credentials and components which are required by flow.

#### Configuration Fields

There is no configuration fields

#### Input Metadata

* **Flow ID** - (string, required): ID of the flow to be processed.

### Validate Deployability

Action which emits list of all topics, secrets, credentials and components which are NOT presented in provided workspace.

#### Configuration Fields

There is no configuration fields

#### Input Metadata

**Workspace Id** - (string, required): ID of the workspace where needed to check data.

**Component version match strategy** - (string, optional). Select one of version check strategy:

<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>
    * `exactMatch` - workspace must have same version of component
    * `exactMatchOrHigher` -  workspace must have same or above version of component
</details>

**Rebase** - (array of objects, optional): If you need to use another component in target workspace that is different to original, here you can provide mapping for it

<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>
    * **team_name** - original component developer team
    * **to_team_name** - target workspace component developer team
    * **repo_name** - original component repository name
    * **to_repo_name** - target workspace repository name
</details>

**Topics** - (array of objects, optional): A list of all distinct topics

<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>
  * **id** - Unique topic identifier
  * **name** - Topic name
  * **schema** - Topic schema
</details>

**Credentials** - (array of objects, optional): A list of all distinct credentials

<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>
  * **id** - Unique credential identifier
  * **name** - Credential name
  * **component** - The component that uses the credential
    * **id** - Component id
    * **name** - Component repository name
    * **team_name** - Component developer team
</details>

**Secrets** - (array of objects, optional): A list of all distinct (OAuth) secrets

<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>
  * **id** - Unique secret identifier
  * **name** - Secret name
  * **auth_client** - Authentication Client
    * **id** - Client id
    * **name** - Client name
  * **component** - The component that uses the secret
    * **id** - Component id
    * **name** - Component repository name
    * **team_name** - Component developer team
</details>

**components** - (array of objects, optional): A list of all distinct components

<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>
  * **id** - Component id
  * **repo_name** - Component repository name
  * **team_name** - Component developer team
  * **title** - The name of the component identified by the component.json
  * **description** - Component description
  * **name** - Component name
  * **version_number** - Component version number
</details>

### Lookup Object (at Most One)

Given a set of criteria, that identifies at most one object, return the matching object.
Currently, only **Flow** objects are supported.

The following three types of unique criteria are supported:
* Flow ID
* Flow Name & Workspace ID (defaults to current workspace if omitted)
* Flow Name & Workspace Name (defaults to current workspace if omitted)

The additional configuration settings can be set:
* **Allow zero results?** - This option controls what happens when there are no matching results. When selected and there is no matching result, an empty message is produced. If not selected and there is no matching result, an error is thrown.
* **Allow Criteria to be omitted?** - This option controls if the search criteria can be omitted. When selected and there is no incoming criteria, then an empty message is produced. Otherwise, an error is thrown.

Additionally, the following two boolean settings can be set through JSONata expressions:
* **Remove Non Writeable Properties** *(Default: false)* - Remove parts of the flow attributes which can not be written by the integrator (they are set automatically by the platform) such as the last executed time for a flow.  If you are storing a version of the flow for change tracking purposes or are making a copy of this flow, this value should be set to `true`. If you need to inspect any of these flow attributes, this value should be set to `false`.  Removed values include:
    * `created_at` (flow level)
    * `current_status` (flow level)
    * `last_stop_time` (flow level)
    * `last_modified` (flow level)
    * `last_start_time` (flow level)
    * `status` (flow level)
    * `updated_at` (flow level)
    * `dynamic_metadata` (for each step)
    * `dynamic_select_model` (for each step)
    * `selected_data_samples` (for each step, removed only when **Include Data Samples** is false)
* **Include Data Samples** *(Default: false)*  - When set to `true`, data samples will be included in the response provided. When set to `false`, all data sample information will be removed.  If you are copying flows, then the sample data must be extracted from the original so this value must be true.

##### Other Notes

* When trying to lookup a flow in a workspace in which you don't have access, the component will give you a not found error even if the flow exists.

##### Limitations

* No snapshot data is exported
* Error expected in case when at least one data sample id (is placed at `attributes.graph.nodes[nodeId].selected_data_samples` array) is invalid (wrong id, not exists on the platform anymore etc)

### Lookup Objects (plural)

Use for retrieving multiple flows by provided search criteria

#### Config Fields

* **Object Type** Dropdown: Indicates Object Type, only **Flow** objects are supported.
* **Retrieve only base fields** Checkbox: If selected, retrieves additional fields of selected Object Type. (Defaults to false)
* **Emit behavior** Dropdown with options: `Fetch all`, `Fetch page`, `Emit individually`, required

#### Input Metadata

* **Page Size** (non-negative integer, optional, defaults to 100, max 100, only when **Fetch Page** mode) - Amount of items per page
* **Page Number** (non-negative integer, optional, defaults to 1, only when **Fetch Page** mode) - determinate page of results, depends from Page Size
* **Order** (string, optional, defaults by `id`) - Sort flows list by certain field. May be `created_at`, `updated_at` or `name`. Prefix field name with `-` for reversed (desc) order e.g. `-updated_at`.
* **Search Criteria** (optional: default to empty array - search all) Search terms contained with combination "filed Name"="value" to be combined with the AND operator.
Supported fields:

   |Field Name|Description|
   |----|-----------|
   |`filter[has_draft]`|Filter flows only with or without a draft. May be `true` or `false`.|
   |`filter[status]`|Filter by status. May be any of: `active`, `inactive`.|
   |`filter[type]`|Filter by flow type. May be any of: `ordinary`, `long_running`.|
   |`filter[user]`|Filter by user. Must be `id` of User who created the flow. User could be found in relationships of the flow.|
   |`search`|Search flows by a word or a phrase contained in a `description` OR in a `name`. Behavior is similar to operator LIKE in SQL. Case insensitive. Leading/following spaces are trimmed.|

   Sample: ["filter[status]=active", "search=My super Flow Name"]
* **Remove Non Writeable Properties** (boolean, defaults false) - See behavior of `Lookup Object (at Most One)`

#### Output Metadata

* **For Fetch Page mode** An object with key `results` that has an array as its value and key `totalCountOfMatchingResults` which contains the total number of results (not just on the page) which match the search criteria
* **For Fetch All mode** An object, with key `results` that has an array as its value
* **For Emit Individually mode** - Each object fill the entire message

#### Limitations

* Maximum result records in one request - 100

### Upsert Object

Given a set of criteria, that identifies at most one object, update that object, otherwise create it.  Currently, only **Flow** objects are supported.

The following three types of unique criteria are supported:
* Flow ID
* Flow Name & Workspace ID (defaults to current workspace if omitted)
* Flow Name & Workspace Name (defaults to current workspace if omitted)

The following inputs can be set through JSONata expressions:
* **Flow Attributes** - Data which matches the `attributes` property of an exported flow.  Can be modified to change properties of the flow.

![image](https://user-images.githubusercontent.com/7985390/151942532-825af8b4-db4a-474a-b3ab-710cf1f78552.png)

<details close markdown="block">
<summary>Sample</summary>
**Attributes:**
```json
  {
  "api_version": "2.0",
  "default_mapper_type": "jsonata",
  "description": null,
  "graph": {
    "nodes": [
      {
        "id": "step_1",
        "component_id": {
          "componentId": "5c41a519299462001290d260",
          "componentDevTeam": "elasticio",
          "componentName": "simple-trigger-component",
          "componentSemanticVersion": "1.0.0"
        },
        "command": {
          "actionOrTrigger": "timer",
          "componentVersion": "9505be5cff3a408fbaa2d468d668690a2e30031b"
        },
        "name": "",
        "description": "",
        "first": true
      },
      {
        "id": "step_3",
        "component_id": {
          "componentId": "55ffca6ecc04c20600000001",
          "componentDevTeam": "elasticio",
          "componentName": "jdbc",
          "componentSemanticVersion": "1.0.0"
        },
        "command": {
          "actionOrTrigger": "customQuery",
          "componentVersion": "ba59a3b5b679c7071706a3da9afbda060a9c2710"
        },
        "name": "2. qwerty",
        "description": "",
        "credentials_id": {
          "credentialId": "615709ccb0bc08001129de87",
          "credentialName": "MySQL"
        }
      },
      {
        "id": "step_4",
        "component_id": {
          "componentId": "6156f6ecb8eee60012c3965f",
          "componentDevTeam": "elasticio",
          "componentName": "hubspot",
          "componentSemanticVersion": "1.0.0"
        },
        "command": {
          "actionOrTrigger": "lookupObjects",
          "componentVersion": "b07cf3a30cba42a9b2c7c78cdcdbda9858088340"
        },
        "name": "3. Extract data",
        "description": "",
        "fields": {
          "emitBehaviour": "fetchPage",
          "objectType": "contacts"
        },
        "secret_id": {
          "secretId": "61570904ebca010011b50f51",
          "secretName": "My New Hubspot Credential"
        }
      },
      {
        "id": "step_5",
        "component_id": {
          "componentId": "5968b3c594cbb000199f2adc",
          "componentDevTeam": "elasticio",
          "componentName": "router",
          "componentSemanticVersion": "1.0.0"
        },
        "command": {
          "actionOrTrigger": "route",
          "componentVersion": "4039731b2bf72e8f518237ccfb2176e25605c631"
        },
        "name": "",
        "description": "",
        "service": "router"
      },
      {
        "id": "step_6",
        "component_id": {
          "componentId": "566d7ca473917c0a0000005c",
          "componentDevTeam": "elasticio",
          "componentName": "code",
          "componentSemanticVersion": "1.0.0"
        },
        "command": {
          "actionOrTrigger": "execute",
          "componentVersion": "57bddebd24721929d50abee0a727fae0b150ae04"
        },
        "name": "",
        "description": "",
        "fields": {
          "code": "// Please note only Node.js code is supported here\nasync function run(msg, cfg, snapshot) {\n\tthis.logger.info('Execution finished');\n}"
        }
      },
      {
        "id": "step_10",
        "component_id": {
          "componentId": "566d7ca473917c0a0000005c",
          "componentDevTeam": "elasticio",
          "componentName": "code",
          "componentSemanticVersion": "1.0.0"
        },
        "command": {
          "actionOrTrigger": "execute",
          "componentVersion": "57bddebd24721929d50abee0a727fae0b150ae04"
        },
        "name": "",
        "description": "",
        "fields": {
          "code": "// Please note only Node.js code is supported here\nasync function run(msg, cfg, snapshot) {\n\tthis.logger.info('Incoming message is %s', JSON.stringify(msg));\n\tconst body = { result : 'Hello world!' };\n\t// You can emit as many data messages as required\n\tawait this.emit('data', { body });\n\tthis.logger.info('Execution finished');\n}"
        }
      },
      {
        "id": "step_9",
        "component_id": {
          "componentId": "5d42a70b0a1c6bb17137cdb7",
          "componentDevTeam": "elasticio",
          "componentName": "utility-component",
          "componentSemanticVersion": "1.0.0"
        },
        "command": {
          "actionOrTrigger": "decodeBase64",
          "componentVersion": "244f810a67a0bf87c390a0dc8104f9eb7f2f9506"
        },
        "name": "",
        "description": ""
      }
    ],
    "edges": [
      {
        "id": "mapper:step_1:step_3",
        "target": "step_3",
        "config": {
          "mapper_type": "jsonata",
          "mapper": {
            "query": "fireTime"
          },
          "condition": null
        },
        "source": "step_1"
      },
      {
        "id": "mapper:step_3:step_4",
        "target": "step_4",
        "config": {
          "mapper_type": "jsonata",
          "mapper": {
            "pageNumber": "1",
            "pageSize": "10",
            "order": "$getPassthrough().\"step_1\".body.fireTime"
          },
          "condition": null
        },
        "source": "step_3"
      },
      {
        "id": "step_4:step_5",
        "source": "step_4",
        "target": "step_5"
      },
      {
        "id": "step_5:step_6",
        "source": "step_5",
        "target": "step_6",
        "config": {
          "condition": "true"
        }
      },
      {
        "id": "step_5:step_10",
        "source": "step_5",
        "target": "step_10"
      },
      {
        "id": "mapper:step_6:step_9",
        "target": "step_9",
        "config": {
          "mapper_type": "jsonata",
          "mapper": {
            "value": "\"123\""
          },
          "condition": null
        },
        "source": "step_6"
      }
    ]
  },
  "nodes_config": {},
  "name": "Elementary flow",
  "type": "ordinary",
  "stats_enabled": true
  }
```
</details>

* **Restart Flow** *(Default: false)*  - Boolean: If referencing an existing flow that is running, should the existing flow be stopped so that the update can be applied.

* **Component Match Strategy** - Options are `componentId` or `nameAndTeam`. When `componentId` is used, each step in the flow must have a `component_id` property which is either a string reference to the component ID or an object with a `componentId` property which is a string reference to the component ID. This is the component that will be used in this flow. When `nameAndTeam` is used, each step in the flow must have a `component_id` property which is an object which then contains `componentDevTeam` and `componentName` to identify the component that will be used in the flow.

* **Credential Match Strategy** - Options are `credentialId` or `credentialName`.  When `credentialId` is used, each step in the flow that uses credential or secrets must have a `credentials_id`/`secret_id` property which is either a string reference to the credential/secret ID or an object with a `credential_id`/`secret_id` property which is a string reference to the credential ID oran object with a `credentialId`/`secretId` property which is a string reference to the credential/secret ID. When `credentialName` is used, each step in the flow that uses credentials must have a `credentials_id`/`secret_id` property which is an object which then contains `credentialName`/`secretName` to identify the name of the credential/secret that will be used in the flow.

* **Pub-Sub Topic Match Strategy** - Options are `pubSubId` or `pubSubTopicName`, optional, `pubSubId` by default. When the match strategy is `pubSubId`, the upsert action will delete the `pubSubTopicName` attribute before uploading the flow definition.
When the match strategy is `pubSubTopicName`, the upsert action will find the topic ID of the topic that has the exact same name referenced in `pubSubTopicName` and use that in the flow definition. (pubSubTopicName will be deleted before upload.) The component throw an error if the number of topics with the provided name is not exactly 1.

* **Component Version Match Strategy** - Options are `alwaysUseLatest`, `exactMatch` or `exactMatchOrHigher`, optional, `alwaysUseLatest` by default.
  * When the match strategy is `alwaysUseLatest`, the upsert action grab the latest published version of every component.
  * When the match strategy is `exactMatch`, the upsert action grab the published version of the component with the exact same semantic version. (Throw an error if there is no published version of the component with the exact same semantic version.)
  * When the match strategy is `exactMatchOrHigher`, the upsert action grab the latest (fix) published version of the component with the same major semantic version. The action throw an error if the latest fix is less than the semantic version provided in the incoming message for the step.


#### Notes on Component and Credential Match Strategies

Consider the following cases for copying flows:

* Within the same workspace
* Within the same contract/tenant while using the same components
* Between platform instances or copying flows from a case where a dev version of a component is used to where a production version of the component is used

When copying flows within a workspace where both the copy and the original use the same set of credentials and components, there is no need to transform the references to credentials. In this case you would match both credentials and components by ID.

When copying flows in the same contract (or within the same tenant assuming all used components are tenant wide) but not within the same workspace, the copy of the flow can not reference the same set of credentials because credentials exist only in a single workspace and can't be referenced by flows outside of that workspace.  In order to copy flows between workspaces, each credential used in the origin workspace must have a matching credential in the target workspace.  There are two ways to do this:
1. Use the lookup table component and create a table mapping the ids of origin credentials to destination credentials and then transform the credential ids in the flow. You would then use the match by id case for credentials since the new IDs are part of the incoming data.
1. Link the credentials used in the two workspaces by assigning them both the same name. Then you can use the match by name when creating the new flow.

When copying flows between platform instances or copying flows from a case where a dev version of a component is used to where a production version of the component is used, you would need to apply similar transformations except for components instead of credentials.

##### Other Notes

* When matching by flow name, it is possible to rename flows by setting `flowName` to the current name and `flowAttributes.name` to the desired new name.
* When trying to upsert a flow in a workspace in which you don't have access, the component will give you a not found error even if the flow exists.

##### Limitations

* No snapshot data can be written
* Partial updates are not supported. The entire flow is replaced with the new data provided.

### Raw Request

Raw HTTP Request Action allows to assemble custom requests to be sent to the system. Given a set of request options returns response body and status code.

#### Input Metadata

* **HTTP Verb (Method)** HTTP verb to use in the request (GET, POST, PUT, PATCH, DELETE), required.
* **Url**  Path of the resource relative to the URL base `https://{{BASE_URL}}/v2`, required.
* **Request Body** Body to attach to the HTTP Request, optional.
* **Throw error on 404 Response code** Indicate how 404 response codes should be handled. (Either emit the 404 code to the next component or throw an error). If true an error 404 will be thrown otherwise if false the 404 code to the next component will be emitted". Boolean value (true or false), default true.

#### Output Metadata

* **Status Code** HTTP status code of the response
* **Response Body** HTTP response body

#### Related API Documentation

Platform API documentation can be found [here]({{site.data.tenant.apiBaseUri}}/docs/v2)

### Fetch Dynamic Select Model

Fetch Dynamic Select Model Action built to access dynamic select model from any Component's action or trigger, if there is one described in `component.json` file as field with **"model": "{{MethodName}}"** for correspondent action or trigger. `{{MethodName}}` is the name of the method from the Component's code which returns the dynamic select model. Moreover, custom metadata fields and values for that fields should be chosen, as specified in `component.json` file for each of action or trigger to be sent to the API in order to get the dynamic select model for the Component. Given a set of other required options, like Component's Credentials or Secret Id and Method Name, returns object with Dynamic Select Model.

#### Input Metadata

* **Credential Id / Secret Id** The Component's `Credential Id` or `Secret Id`. Required field
* **Workspace Id** `Id` of the Component's current `Workspace` should be provided. If not provided, current Component's Workspace Id will be selected as value. Optional field
* **Module** Either one of this options `Action` or `Trigger` should be selected. Required field
* **Action / Trigger Name** This Name should be the same as described in `component.json` file. For example, **lookupObjects** or **rawRequest**. Required field
* **Method Name** This Name should be the same as described in `component.json`: **"model": "{{MethodName}}"** as the name of the method from the Component's code which returns the dynamic select model. For example, **getTableNames**. Required field
* **Config fields** Describe in object Component's Selected Config Fields and Values for the metadata. These field names and values for them also should be matching the correspondent field names and values as described in `component.json` file inside selected Action or Trigger. Optional field

#### Output Metadata

* Model (object, required): An object recommending the selectable options for the Component. This is an object that might look like this: `{ "TABLE_NAME_1": "TABLE_NAME_1", "TABLE_NAME_2": "TABLE_NAME_2" }`

### Fetch Dynamic Metadata
Fetch Dynamic Metadata Action provides possibility to acquire dynamic metadata from any Component's action or trigger, if there is one described in `component.json` file as field **"dynamicMetadata": true** for correspondent action or trigger. Besides, custom metadata fields and values for that fields should be chosen, as specified in `component.json` file for each of action or trigger to be sent to the API in order to get the dynamic metadata for the Component. Given a set of other required options, like Component's Credentials or Secret Id and Component's Workspace Id returns object with Dynamic Metadata.

#### Input Metadata

* **Credential Id / Secret Id** The Component's `Credential Id` or `Secret Id`. Required field
* **Workspace Id** `Id` of the Component's current `Workspace` should be provided. If not provided, current Component's Workspace Id will be selected as value. Optional field
* **Module** Either one of this options `Action` or `Trigger` should be selected. Required field
* **Action / Trigger Name** This Name should be the same as described in `component.json` file. For example, **lookupObjects** or **rawRequest**. Required field
* **Config fields** Describe in object Component's Selected Config Fields and Values for the metadata. These field names and values for them also should be matching the correspondent field names and values as described in `component.json` file inside selected Action or Trigger. Optional field

#### Output Metadata

* Metadata: The produced Metadata from the Component. This is an object which looks like this: `{ in: { ...metadata in }, out: { ...metadata out } }`

## Known limitations

Actions `Fetch Dynamic Metadata` and `Fetch Dynamic Select Model` so far only support components with `Credential Id` or `Secret Id`.
