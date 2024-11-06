---
layout: component
title: Zoho CRM component
section: CRM components
description: A component that connects to Zoho CRM API.
category: zoho-crm
icon: zoho-crm.png
icontext: Zoho CRM component
ComponentVersion: 1.3.9
updatedDate: 2024-11-07
---

## Table of Contents
- [Description](#description)
    - [Completeness Matrix](technical-notes#completeness-matrix)
    - [Environment variables](#environment-variables)
- [Credentials](#credentials)
- [Triggers](#triggers)
  - [Get New and Updated Objects](#get-new-and-updated-objects)
    - [Config Fields](#config-fields)
    - [Input Metadata](#input-metadata)
    - [Output Metadata](#output-metadata)
- [Actions](#actions)
  - [Raw Request](#raw-request)
    - [Config Fields](#config-fields-1)
    - [Input Metadata](#input-metadata-1)
  - [Upsert](#upsert)
    - [Config Fields](#config-fields-2)
    - [Input Metadata](#input-metadata-2)
  - [Lookup object (at most one)](#lookup-object-at-most-one)
    - [Config Fields](#config-fields-3)
    - [Input Metadata](#input-metadata-3)
  - [Lookup Set Of Objects By Unique Criteria](#lookup-set-of-objects-by-unique-criteria)
    - [Config Fields](#config-fields-4)
    - [Input Metadata](#input-metadata-4)
    - [Output Metadata](#output-metadata-1)
  - [Lookup objects (plural)](#lookup-objects-plural)
    - [Config Fields](#config-fields-5)
    - [Input Metadata](#input-metadata-5)
    - [Output Metadata](#output-metadata-2)
  - [Delete object](#delete-object)
    - [Config Fields](#config-fields-6)
    - [Input Metadata](#input-metadata-6)
    - [Output Metadata](#output-metadata-3)
- [Known limitations](#known-limitations)

### Description

A component that connects to Zoho CRM API.

### Environment variables

| Name                | Mandatory | Description                                                                  | Values          |
|---------------------|-----------|------------------------------------------------------------------------------|-----------------|
| `REQUEST_MAX_RETRY` | false     | Set how many time system try to make request to API on errors (3 by default) | min: 0, max: 10 |

>The optional environment variable MAX_FILE_SIZE could be set in settings to provide the maximum file size for attachments in megabytes (mb). The default value for MAX_FILE_SIZE is 100MB.

## Credentials

Authentication occurs via OAuth 2.0.

In order to make OAuth work, you need a new Client in your Zoho Developer Console.

More information you can find [here](https://api-console.zoho.com).

For creating Auth Client you should specify following fields:

| Field name               | Mandatory | Description                                     |
|--------------------------|-----------|-------------------------------------------------|
| Client Name              | true      | your Auth Client's name (any)                   |
| Homepage URL             | true      | https://{installation-url}                      |
| Authorized Redirect URIs | true      | https:/{installation-url}/callback/oauth2       |

You will receive next fields: `Client ID`, `Client Secret`.

In order to setup created Auth Client on Elastic.io platform you should click on `Add New Auth Client`, and fill next fields:
* **Name** -  Name your Auth Client's name (any).
* **Client ID** - Your `Client ID` from Zoho Developer Console.
* **Client Secret** - Your `Client Secret` from Zoho Developer Console |
* **Authorization Endpoint** - Zoho Accounts URL-based auth url + parameter `access_type` with value `offline` (needed for refresh token to be present).

[Documentation](https://www.zoho.com/crm/developer/docs/api/v2/access-refresh.html). Examples:
- For US: https://accounts.zoho.com/oauth/v2/auth?access_type=offline
- For AU: https://accounts.zoho.com.au/oauth/v2/auth?access_type=offline
- For EU: https://accounts.zoho.eu/oauth/v2/auth?access_type=offline
- For IN: https://accounts.zoho.in/oauth/v2/auth?access_type=offline
- For CN: https://accounts.zoho.com.cn/oauth/v2/auth?access_type=offline
* **Token Endpoint** - Zoho Accounts URL-based token url. [Documentation](https://www.zoho.com/crm/developer/docs/api/v2/access-refresh.html). Examples:
- For US: https://accounts.zoho.com/oauth/v2/token
- For AU: https://accounts.zoho.com.au/oauth/v2/token
- For EU: https://accounts.zoho.eu/oauth/v2/token
- For IN: https://accounts.zoho.in/oauth/v2/token
- For CN: https://accounts.zoho.com.cn/oauth/v2/token

Save client and then:
- [provide scopes](https://www.zoho.com/crm/developer/docs/api/v2/scopes.html)

>**Please Note:** attention to the scope of the operations you are going to use. If the provided scope does not satisfy Zoho API requirements the request will fail (E.g. with 400 code - `Request failed with status code 400`).

A few (not a comprehensive list, just a few examples!) most used scopes:
1. `ZohoCRM.settings.ALL`. Recommended by default. Is required to get a list of modules (Object types). Is used in all the actions and triggers except for the `Raw Request` action.
2. `ZohoCRM.modules.ALL`. Recommended by default.
3. `ZohoCRM.users.ALL`. Required to communicate with the `Users` module.
4. `ZohoCRM.coql.READ`. Required for Lookup objects (plural) action as it uses COQL queries under the hood.

Multiple scopes can be applied with the comma as a separator.

>**Please Note:** that whitespaces between scopes are not allowed!

E.g.: `ZohoCRM.settings.ALL,ZohoCRM.modules.ALL,ZohoCRM.users.ALL`.

### Credentials Fields

* **API version** Dropdown, optional: list of available APIs (2, 2.1, 3, 4). By default the component uses v4 if other is not set in the credentials.

## Trigger

### Get New and Updated Objects

#### Config Fields

 * **Object Type** Dropdown: Indicates Object Type to be fetched.
 * **Emit behavior** Dropdown: Indicates behavior to emit result objects: `Emit individually` or `Emit page`.
 * **Field to poll** Dropdown: Indicates field to poll (new objects or modified objects).
 * **Start Time** - TextField (string, optional): Indicates the beginning time to start retrieving events from.
 * **End Time** - TextField (string, optional, defaults to never): If provided, don’t fetch records modified after this time.
 * **Size of Polling Page** - TextField (optional, positive integer, defaults to 200): Indicates the size of pages to be fetched.
 * **Process Pages Consistently** - Checkbox: Indicates that pages will be processed one by one, without waiting next flow run. Defaults to false.

#### Input Metadata

There is no Input Metadata.

#### Output Metadata

 If `Emit behavior` = `Emit individually`: dynamically generated properties according to selected `Object Type`.
 If `Emit behavior` = `Emit page`:

  * **results** Array with items: dynamically generated properties according to selected `Object Type`.

## Actions

### Raw Request

Action to call any Zoho-crm API endpoint.

>**Please Note**: when you are trying to get some object by id, in case no object found - Zoho API will return empty body and statusCode 204.

#### Config Fields

#### Input Metadata

* **Url** - Path of the resource relative to the URL base (https://api.hubapi.com), required. For example `/crm/v2/leads`.
* **Method** - Allowed values `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, required. HTTP verb to use in the request.
* **Request Body** - Body of the request to send.

### Upsert

Action to insert or update a record. The system checks for duplicate records based on the duplicate check field's values. If the record is already present, it gets updated. If not, the record is inserted.
*Note*: you can add only system-defined duplicate check fields and user-defined unique fields. If you do not specify the `Duplicate field checks`, the system checks for duplicate records in this order: "system-defined duplicate check fields" > "user-defined unique fields".

#### Config Fields

* **Object Type** Dropdown: Indicates Object Type to be upserted.
* **Duplicate field checks** Multiselect dropdown: Indicates for system which fields to check for duplicate records.

#### Input Metadata

* **Attachments** Array of objects with properties `attachmentUrl` and `fileName`. Where `attachmentUrl`: Steward/Maester URL containing the file contents to upload.
Example: [{"attachmentUrl": "http://steward-service.platform.svc.cluster.local:8200/v2/objects/b9a6a95f-fc68-4ae7-aa2b-22717979bf1b", "fileName": "myimage.png"}].
Other fields are dynamically generated.

### Lookup object (at most one)

Action designed to lookup one object by unique field.

#### Config Fields

* **Object Type** Dropdown: Indicates Object Type to be fetched.
* **ID to Search On** Dropdown: Indicates unique field to search on.
* **Allow ID to be omitted** Checkbox: When selected, the ID field becomes optional, otherwise it is a required field.
* **Allow zero results** Checkbox: When selected, if zero results are returned, the empty object {} is emitted, otherwise typically an error would be thrown.

#### Input Metadata

* **ID value** Textfield: value for `ID to Search On` (unique field value by itself).
* **Fetch Attachments** Boolean: If `true` attachments will saved to storage. Result array for `attachments` consists of objects with properties `maesterStorageId` and `attachmentUrl`. Where `attachmentUrl` - url to attachment in Zoho CRM. Attachments of size bigger than `MAX_FILE_SIZE` ENV will be skipped.

### Lookup Set Of Objects By Unique Criteria

Action designed to lookup set of objects by unique field.

#### Config Fields

* **Object Type** Dropdown: Indicates Object Type to search.
* **ID to Search On** Dropdown: Indicates unique field to search on.

#### Input Metadata

* **Id Values to Lookup** An array where each item is an ID. Required.

#### Output Metadata

The expected output is an object with a `resultsDictionary` property. The value of this `resultsDictionary` will be a dictionary where the keys are the lookup identity, and the key is the corresponding object.

### Lookup objects (plural)

Action designed to lookup objects.

#### Config Fields

* **Object type** Dropdown, required: Indicates Object type to be fetched.
* **Emit behavior** Dropdown, required: Indicates flow behavior. One of `Fetch All`, `Fetch Page`, `Emit Individually`.

>**Please Note**: an empty array `results` will be emitted when no objects are found for all possible `Emit behavior` options.

#### Input Metadata

* **Search Criteria** Array, required: Array of sql search terms. Search terms are to be combined with the AND operator. Example: ["Email='user@gmail.com'", "First_Name='user name'"].
* **Fetch Attachments** Boolean: If `true` attachments will saved to storage. Result array for `attachments` consists of objects with properties `maesterStorageId` and `attachmentUrl`. Where `attachmentUrl` - url to attachment in Zoho CRM. Attachments of size bigger than `MAX_FILE_SIZE` ENV will be skipped.
NEXT FIELDS ONLY FOR `Fetch Page` Emit behavior:
* **Page Number** Integer: Indicates amount of pages to be fetched. Defaults to 0.
* **Page Size** Integer: Indicates the size of pages to be fetched. Defaults to Zoho Default Page Size of 200.
* **Order** String: Indicates Field and direction to order objects. Examples: "Email ASC", "First_Name DESC".

#### Output Metadata

Dynamically generated.

### Delete object

Action designed to delete object.

#### Config Fields

* **Object type** Dropdown, required: Indicates Object type to be fetched.
* **ID to Search On** Dropdown: Indicates unique field to search on.

#### Input Metadata

* **ID value** Textfield: value for `ID to Search On` (unique field value by itself).

#### Output Metadata

The expected output is an object with a `id` property. `id` value stands for id of delete object.

## Known limitations

- External id is not supported.
