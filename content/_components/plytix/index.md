---
title: Plytix component
layout: component
section: Sevice components
description: Plytix Component is designed to connect Plytix API.
icon: plytix.png
icontext: Plytix component
category: plytix
updatedDate: 2022-12-30
ComponentVersion: 1.3.0
---

## Description

Plytix Component is designed to connect Plytix API.

## Credentials

Component credentials configuration fields:
* **API Key** (string, required) - Key from Profile section
* **API Password** (string, required) - API Password
* **API Base URI** (string, optional, `https://pim.plytix.com` by default) - Indicates what URL base needs to be used
* **API version** (string, optional, `v1` by default) - Indicates what API version needs to be used.

## Triggers

### Get New and Updated Objects Polling

Retrieve all the updated or created objects within a given time range.

#### Configuration Fields

* **Object Type** - (string, required): Object-type to lookup on. E.g `Products`.
* **Object Attributes** - (multi-dropdown, required): fields that will be included in the response. If left empty - only some system-required fields will be returned.
* **Timestamp field to poll on** - (string, optional): Can be either Last Modified or Created dates (updated or new objects, respectively). Defaults to Last Modified.
* **Emit behavior** - (dropdown, optional): Indicates emit objects behavior - `Emit individually` (by default) or `Emit page`
* **Size of Polling Page** - (optional, positive integer, defaults to 100, max 100): Indicates the size of pages to be fetched
* **Single Page per Interval** - (boolean, optional): Indicates that if the number of changed records exceeds the maximum number of results in a page, instead of fetching the next page immediately, wait until the next flow start to fetch the next page. Defaults to false.
* **Start Time** - (string, optional): The timestamp, in ISO8601 format, to start polling from (inclusive). Default value is the beginning of time (January 1, 1970 at 00:00.000).
* **End Time** - (string, optional): The timestamp, in ISO8601 format, to end at (inclusive). Default value is never.

#### Input/Output Metadata

There is no Input or Output Metadata

#### Limitations

Pagination has not been implemented yet in this trigger. Running a flow will return a single page with all of the results of the query.

## Actions

### Product Bulk

Bulk action on products.

#### Configuration Fields

* **Action Type** - (dropdown, required): Currently supported only `Update`
* **Wait Until Bulk Job Finish** - (checkbox, optional): If checked - check every 1 minute during 15 minutes bulk job status, when status is `FINISHED` - emit job result details.
If job still not finished after 15 minutes, emit last job details. If unchecked - will emit job result that was received immediately after execution bulk operation.

#### Input Metadata

Metadata contains array of products: each product should contain `id` or `sku` and system attributes and user attributes arrays.
The maximum number of editable products is 1000.
=======
### Link or Unbind object

Action execute `Link` or `Unbind` operation for objects:

 - `Products` <-> `Assets`
 - `Products` <-> `Categories`
 - `Products` <-> `Variations`
 - `Products` <-> `Relationships`
 - `Product Attribute Groups` <-> `Attribute`
 - `Assets` <-> `Categories`

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to lookup on. E.g `Assets`.
* **Operation** - (dropdown, required): `Link` or `Unbind` operation.

#### Input Metadata

Generated dynamically and depends on the object type, typically: parent object ID and label object ID or object to be linked or unbounded to the parent object.

#### Output Metadata

Dynamically generated, depended on Object Type.

### Lookup Object (at most one)

Lookup a single object by a selected field that uniquely identifies it.

#### Configuration Fields

* **Object Type** - (string, required): Object-type to lookup on. E.g `Assets`.
* **Lookup Criteria** - (dropdown, required): A list of object parameters that can uniquely identify the object in the database.
* **Object Attributes** - (multi-dropdown, required): fields that will be included in the response. If left empty - only some system-required fields will be returned.
* **Allow criteria to be omitted** - (boolean, optional): If selected field `Lookup Criteria Value` becomes optional.
* **Allow zero results** - (boolean, optional): When selected, if the object is not found - an empty object will be returned instead of throwing error.

#### Input Metadata

* **Lookup Criteria Value** - (string, required unless `Allow criteria to be omitted` is selected): Value for unique search criteria in `Lookup Criteria` configuration field.

#### Output Metadata

Object with result of lookup as value.

### Lookup Objects (plural)

Lookup a set of object by defined criteria list. Can be emitted in different way.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to lookup on. E.g `Assets`.
* **Object Attributes** - (multi-dropdown, required): fields that will be included in the response. If left empty - only some system-required fields will be returned.
* **Emit Behavior** - (dropdown, required): Defines the way result objects will be emitted, one of `Emit all`, `Emit page` or `Emit individually`.
* **Number of search terms** - text field to specify a number of search terms (positive integer number [1-99] or 0).

#### Input Metadata

Depend on configuration field `Number of search terms`. If = `N` - N search term and N-1 logical operators will be generated, if = 0 - any search term will be generated.
Example for `Number of search terms = 2`:

```json
{
  "sTerm_1": {
    "fieldName": "id",
    "condition": "eq",
    "fieldValue": "1"
  },
  "link_1_2": "and",
  "sTerm_2": {
    "fieldName": "displayName",
    "condition": "contains",
    "fieldValue": "Cronus"
  }
}
```

If selected `Emit Behavior` is `Emit page` additionally fields will be added:
* **Page Number** - (number, defaults to 1): Indicates index of page to be fetched.
* **Page Size** - (number, defaults to 0): Indicates amount of objects per page. If 0, `totalCountOfMatchingResults` wil be returned

#### Output Metadata

For `Emit All` mode: An object, with key `results` that has an array as its value.
For `Emit Page` mode: An object with key `results` that has an array as its value (if `Page Size` > 0). Key `totalCountOfMatchingResults` which contains the total number of results (not just on the page) which match the search criteria (if `Page Size` = 0).
For `Emit Individually` mode: Each object which fill the entire message.

### Delete Object

Lookup a single object by a selected field that uniquely identifies it.

#### Configuration Fields

* **Object Type** - (string, required): Object-type to delete. E.g `Products`.
* **Lookup Criteria** - (dropdown, required): A list of object parameters that can uniquely identify the object in the database.
* **Don't throw error** - (checkbox, optional, `false` by default): If got error (like object not found) emit empty message instead of throwing an error.

#### Input Metadata

* **Lookup Criteria Value** - (string, required): Value for unique search criteria in `Lookup Criteria` configuration field.

#### Output Metadata

* **id** - (string, required): Id of deleted object

### Upsert Object

Updates (of record found) or creates a new object.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to upsert. E.g `Products`.
* **Create or update existing object** - (dropdown, required): Options are "Create new" or "Update existing".

#### Input Metadata

And dynamically generated fields according to chosen `Object Type` and `Create or update existing object` option

#### Output Metadata

Result object from upsert.

### Make Raw Request

Executes custom request.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

## Known limitations

* Plytix has two plan types with distinct rate limits for the API. All rate limits are applied based on API credentials known as keys. These limits are enforced on all the resources available in the API. For more information please see [details](https://apidocs.plytix.com/#api-limits).

|Plan|	Limits
|-|-|
|FREE|	Each API key is allowed 20 requests every 10 seconds, capped at 2000 requests per hour
|PRO|	Each API key is allowed 50 requests every 10 seconds, capped at 5000 requests per hour
