---
title: Notion component
layout: component
section: Service components
description: Notion component is designed to interact with Notion API.
icon: notion.png
icontext: Notion component
category: notion
updatedDate: 2024-05-08
ComponentVersion: 1.1.0
---


## Description

Notion Component is designed to interact with [Notion API](https://developers.notion.com/reference/intro).

The current release of the component tested on API version `2022-06-28` with `https://api.notion.com/v1/` basic path.

## Credentials

To be able to connect to Notion API you will need to proceed with the following steps:

- The workspace owner needs to create [Internal integrations](https://developers.notion.com/docs/create-a-notion-integration) through the [Integration dashboard](https://www.notion.so/my-integrations).
- Once an internal integration has been added to a workspace, members must [give the integration permission](https://www.notion.so/help/add-and-manage-connections-with-the-api#add-connections-to-pages) to access specific pages or databases through Notion’s UI by adding a connection to the pages or databases.

Component credentials configuration fields:

- **Internal Integration Secret** (string, required) - Put here your secret from internal integration `Secrets` section.
- **API version** (string, optional, defaults to `2022-06-28`) - You can provide the needed API version here, [more information can be found here](https://developers.notion.com/reference/versioning).

## Triggers

This component has no trigger functions. This means it will not be accessible to select as a first component during the integration flow design.

## Actions

### Archive Object
Archive a single object by its ID.

#### Configuration Fields
- **Object Type** - (dropdown, required): Object type to Archive. Currently, supported types are: Pages and Blocks
- **Emit strategy when no object is found** - (dropdown, optional): This specifies the output when no object is found by the provided ID. One of:
  - **Emit nothing** - Emit nothing. Just skips an execution. Please note! If this option is selected, retrieving a sample, you will see an error with the text 'No object found. Execution stopped. This error is only applicable to the Retrieve Sample. In flow executions there will be no error, just an execution skip... This is fine. In a real flow execution, there will be no error.
  - **Emit an empty object {}** - Emit an empty object - `{}`.
  - **Throw an error (Default)** - Throw an error with the text `No object found by provided ID`. This is the default option if nothing else is selected.

#### Input Metadata
- **ID** - (string, required): Value for ID of the object to archive.

#### Output Metadata
- `id` - (string, required): ID of archived object.

### Lookup Object at Most One
Look for an object by unique criteria.

#### Configuration Fields
- **Object Type** - (dropdown, required): Object-type to upsert. Currently, supported types are: `Page`, `Database` and `Block`.
- **Lookup Criteria** - (dropdown, required): A unique field by which you want to lookup the object. Currently, supported types are: `ID` (for all object types) and `Title` (for `Page` and `Database` only).
- **Allow criteria to be omitted** - (boolean, optional): If selected, the field Lookup Criteria Value becomes optional.
- **Allow zero results** - (boolean, optional): When selected, if the object is not found - an empty object will be returned instead of throwing an error.

#### Input Metadata
- **Lookup Criteria Value** - (string, required unless `Allow criteria to be omitted` is selected): Value for unique search criteria in `Lookup Criteria` configuration field.

#### Output Metadata
Result object depending on the object selected and the configuration setting `Allow Zero Result`.

### Lookup Objects (plural)
Lookup a set of objects by defined criteria.

#### Configuration Fields
- **Object Type** - (dropdown, required): Object-type to lookup. Currently, supported types are: `Pages`, `Databases`, `Database records` and `Blocks`.
- **Emit Behavior** - (dropdown, required): Defines the way resulting objects will be emitted, one of `Emit all`, `Emit page` or `Emit individually`.
- **Page size** - (number, defaults to 100, maximum 100) Number of records to be fetched for each API request. Positive integer only.

#### Input Metadata
Depend on the selected Object Type:
- **Pages** - one field: `Part of the page title`.
  > Note - Results will also include pages if the parent database contains the provided title.
- **Databases** - one field: `Part of the database title`.
- **Database records** - two fields: `Identifier for a Notion database`. (required) and `Filter` object.
- **Blocks** - one field: `Parent block or page identifier`. (required).

#### Output Metadata
For `Emit All` and `Emit Page` mode: An object, with key `results` that has an array as its value. For `Emit Individually` mode: Each object that fills the entire message.

### Make Raw Request

Executes custom requests utilizing plain Notion REST API.

#### Configuration Fields
- **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as an error, defaults to `false`.

#### Input Metadata
- **URL** - (string, required): Path of the resource relative to the base URL (here comes a part of the path that goes after `https://api.notion.com/v1/`).
- **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
- **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata
- **Status Code** - (number, required): HTTP status code of the response.
- **HTTP headers** - (object, required): HTTP headers of the response.
- **Response Body** - (object, optional): HTTP response body.


### Upsert Object

Updates existing or creates a new object.

#### Configuration Fields
- **Object Type** - (dropdown, required): Object-type to upsert. Currently, supported types are: `Page`, `Database` and `Block`.
- **Operation** - (dropdown, required): Create a new record or update existing.
#### Input Metadata:
Dynamically generated fields according to the chosen `Object Type` and `Operation` Each field will have a tooltip with a description of what they expected to be and links to official documentation with examples:

{% include img.html max-width="100%" url="img/upsert_mapping.png" title="Upsert Mapping" %}

#### Output Metadata
Result object from the upsert
