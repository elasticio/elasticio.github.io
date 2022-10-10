---
title: Microsoft Dynamics CRM v2 component
layout: component
section: CRM components
description: Microsoft Dynamics CRM v2 Component is designed to use Web API from Microsoft.
icon:  msdynamics-crm-v2.png
icontext: Microsoft Dynamics CRM v2 component
category: msdynamics-v2
updatedDate: 2022-09-23
ComponentVersion: 1.1.0
---

## Credentials

Microsoft Dynamics CRM APIs uses the OAuth 2.0.

During credentials creation you would need to:
- select `OAuth2` drop-down list ``Type``.
- select existing Auth Client from drop-down list ``Choose Auth Client`` or create the new one.
  For creating Auth Client you should specify following fields:

| Field name             | Mandatory | Description   |
|------------------------|-----------|--------------|
| Name                   | true      | your Auth Client's name |
| Client ID              | true      | your OAuth Client ID  |
| Client Secret          | true      | your OAuth Client Secret  |
| Authorization Endpoint | true      | set: `https://login.windows.net/common/oauth2/authorize?resource=https%3A%2F%2Forg1.crm4.dynamics.com%2F`, where `org1.crm4.dynamics.com` it is URL of your MS Dynamic CRM organization |
| Token Endpoint         | true      | set: `https://login.windows.net/common/oauth2/token`    |

- fill field ``Name Your Credential``
- fill field ``Base URL`` - required, field indicates what URL base needs to be used. Example `https://org1.crm4.dynamics.com/api/data/v9.2` or `https://org1.crm4.dynamics.com/api/data` (without version)
- fill field ``API version`` - optional, API version to use. Right format is `vXX.XX`. By default, `v9.2`
- click on ``Authenticate`` button - the process would take you to Microsoft Dynamics to log-in and give permissions to the platform to access your service.
- click on ``Verify`` button for verifying your credentials
- click on ``Save`` button for saving your credentials


## Triggers

### Get New and Updated Objects Polling

Retrieve all the updated or created objects within a given time range.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to poll on. E.g `Accounts`.
* **Emit behavior** - (dropdown, required): list with options: `Emit page` - all found values will be emitted in one array `results`, and `Emit individually` - each found object will be emitted individual.
* **Size of Polling Page** - (string, optional): Indicates the size of pages to be fetched. Defaults to ['odata.maxpagesize'](https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/query-data-web-api#specify-the-number-of-rows-to-return-in-a-page) preference value equals 5000
* **Process Single Page Per Execution** - (checkbox): Indicates that if the number of changed records exceeds the maximum number of results in a page, instead of fetching the next page immediately, wait until the next flow start to fetch the next page.
* **Start Time** - (string, optional): The timestamp, in ISO8601 format, to start polling from (inclusive). Default value is the beginning of time (January 1, 1970 at 00:00.000).
* **End Time** - (string, optional): The timestamp, in ISO8601 format, to end at (inclusive). Default value is never.
* **Timestamp field to poll on** - (string, optional): Can be either Last Modified or Created dates (updated or new objects, respectively). Defaults to Last Modified.

#### Input Metadata

There is no Input Metadata

#### Output Metadata

Depends on `Object Type` and `Emit behavior` fields. If `Emit behavior` field is equal to `Emit page` - object with property `results` that contains array of selected objects will be returned, if to `Emit individually`, metadata for selected `Object Type` will be returned.

## Actions

### Lookup Objects (plural)

Lookup a set of object by defined criteria list. Can be emitted in different way.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to lookup on. E.g `Contacts`.
* **Emit Behavior** - (dropdown, required): Defines the way result objects will be emitted, one of `Emit all`, `Emit page` or `Emit individually`.

#### Input Metadata

* **Search Criteria** - (array of strings, required): [Search terms to filter objects](https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/query-data-web-api#filter-results). Search terms are array which will be used as value for `filter` param of search. Be default, mapping configured to combine all search terms with `and` logical operator, if you want to use another behavior - proceed to advanced mode. Example Search Criteria: `[{ fieldName: 'createdon', operator: 'gt', fieldValue: '2022-08-28T14:27:45Z' }, { fieldName: '_primarycontactid_value', operator: 'eq', fieldValue: 'd1bf9a01-b056-e711-abaa-00155d701c02' }]`

If selected `Emit Behavior` is `Emit page` additionally fields will be added:
* **Page Number** - (number, defaults 0): Indicates number of page to fetched.
* **Page Size** - (number, defaults to 5000): Indicates amount of objects per page. Value from 0 to 5000.

#### Output Metadata

For `Emit All` mode: An object, with key `results` that has an array as its value.
For `Emit Page` mode: An object with key `results` that has an array as its value (if `Page Size` > 0). Key `totalCountOfMatchingResults` which contains the total number of results (not just on the page) which match the search criteria (if `Page Size` = 0).
For `Emit Individually` mode: Each object which fill the entire message.

### Lookup Object (at most one)

Lookup a single object by a selected field.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to lookup on. E.g `Users`.
* **Lookup Criteria** - (dropdown, required): A list of object parameters by which object could be searched.
* **Allow criteria to be omitted** - (boolean, optional): If selected field `Lookup Criteria Value` becomes optional.
* **Allow zero results** - (boolean, optional): When selected, if the object is not found - an empty object will be returned instead of throwing error.

#### Input Metadata

* **Lookup Criteria Value** - (string, required unless `Allow criteria to be omitted` is selected): Value for unique search criteria in `Lookup Criteria` configuration field.

#### Output Metadata

Object with result of lookup as value.

### Delete Object By ID

Delete a single object by its ID.

#### Configuration Fields

* **Object Type** - (string, required): Object-type to lookup on. E.g `Accounts`.

#### Input Metadata

* **ID Value** - (string, required): Value for ID of the object to delete.

#### Output Metadata

* **id** - (string, required): ID of deleted object.

### Make Raw Request

Executes custom request.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
* **Headers** - (object, optional): Headers of the request to send.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

### Extract Raw System Metadata

Read the large XML-only document located at `{{endpoint}}/api/data/{{api version}}/$metadata` and place the raw XML contents into either an attachment or into a JSON string.

#### Configuration Fields

* **Output** - (dropdown, required): Where the fetched metadata should be placed

#### Input Metadata

There is no Input Metadata

#### Output Metadata

Depends on selected `Output`:
* **As Attachment**
  * **content-type** (string, required): Hard-coded to application/xml
  * **type** (string, required): Hard coded to .xml
  * **size** (number, required): Length of the attachment in bytes
  * **url** (string, required): Maester URL with the contents
* **In Body**
  * **metadata** (string, required): An XML string with the retrieved contents.

## Limitations

1. Output metadata for `Lookup Object (at most one)` Action can be inaccurate because:
 - some of the fields may have another name. E.g `ownerid` will look like `_ownerid_value`, so extra symbols could be added
 - microsoft schema has too much data types, most of which doesn't supported by platform so they are set to 'string'
