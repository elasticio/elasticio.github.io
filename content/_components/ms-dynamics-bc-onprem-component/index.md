---
title: Microsoft Dynamics Business Central On-Premise
layout: component
section: ERP components
description: Microsoft Dynamics Business Central On-Premise Component is designed to interact with OData API
icon: ms-dynamics-bc-onprem-component.png
icontext: Microsoft Dynamics Business Central On-Premise
category: ms-dynamics-bc-onprem-component
updatedDate: 2024-09-04
ComponentVersion: 1.0.0
---

# Microsoft Dynamics Business Central On-Premise Component

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Delete Object By ID](#delete-object-by-id)
  * [Lookup Object By ID](#lookup-object-by-id)
  * [Lookup Objects (plural)](#lookup-objects-plural)
  * [Upsert Object](#upsert-object)
  * [Make Raw Request](#make-raw-request)
* [Triggers](#triggers)
  * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
* [Known Limitations](#known-limitations)

## Description

Microsoft Dynamics Business Central On-Premise Component is designed to interact with OData API

The current release of the component tested on Business Central version `16.0.20531.0`

## Credentials

Component credentials configuration fields:
* **API Base URI** (string, required) - URL to your Dynamics Business Central OData endpoint
* **Username** (string, required) - The name of the user who has rights to access to this OData endpoint
* **Password** (string, required) - The password for your OData authentication

## Actions

### Delete Object By ID

Delete a single object by its identifier.

#### Configuration Fields

* **Object Type** - (string, required): A dynamically generated list of available object types to delete.

#### Input Metadata

In Microsoft Business Central, the process of identifying and retrieving objects may vary depending on the specific object type. Here, you will find a dynamic list of required fields.

#### Output Metadata

If deletion was successful, output metadata will match input metadata

### Lookup Object By ID

Retrieve a single object using its identifier.

#### Configuration Fields

* **Object Type** - (string, required): A dynamically generated list of available object types for lookup.

#### Input Metadata

In Microsoft Business Central, the process of identifying and retrieving objects may vary depending on the specific object type. Here, you will find a dynamic list of required fields.

#### Output Metadata

The output will include the object resulting from the lookup as the value.

### Lookup Objects (plural)

Lookup a set of object by defined criteria list. Can be emitted in different way.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to lookup on. E.g `Users`.
* **Emit Behavior** - (dropdown, optional, default `Emit individually`): Defines the way result objects will be emitted, one of `Emit page` or `Emit individually`.
* **Select fields of the resulting object** - (multiselect, optional): Use this option to specify which fields should be included in the response. If leave blank - all default fields will be included.
* **Number of search terms** - (strings, optional): specify a number of search terms (positive integer number [0-99]).
* **Expert Mode for Filter Expression** - (checkbox, optional, default to false): if checked, any [filter expression](https://learn.microsoft.com/en-us/graph/filter-query-parameter) can be entered in metadata field `Filter Expression`.

#### Input Metadata

If configuration field `Expert Mode for Filter Expression` is enabled:
* **Filter Expression** - (strings, required):  any [filter expression](https://learn.microsoft.com/en-us/graph/filter-query-parameter) can be entered in metadata field `Filter Expression` (without `$filter=`). For advanced users. Examples:
  * `startsWith(displayName,'J') and jobTitle eq 'Software Engineer'`
  * `DocumentType eq 'Order'`

If configuration field `Expert Mode for Filter Expression` is disabled:
* Depend on configuration field `Number of search terms`. If = `N` - N search term and N-1 logical operators will be generated, if = 0 - any search term will be generated.
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
      "condition": "eq",
      "fieldValue": "Cronus"
    }
  }
  ```

If selected `Emit Behavior` is `Emit page` additionally fields will be added:
* **Page Size** - (number, defaults to 100, max 1000): Indicates amount of objects per page.

#### Output Metadata

For `Emit Page` mode: An object with key `results` that has an array as its value.
For `Emit Individually` mode: Each object which fill the entire message.

### Upsert Object

Updates (if record found) or creates a new object.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to upsert
* **Field to search object** - (dropdown, required): Select uniq field that will be used to search object to perform update
* **Throw error if not found** - (checkbox, optional): If value to search is provided and object not found, component will throw an error instead of trying to create new

#### Input Metadata

* **Value to search in "{Field to search object}"** - (string, optional): identifier of the object to upsert.
And dynamically generated fields according to chosen `Upsert Schema`.

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
* **Headers** - (object, optional): You can put here additional headers

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

## Triggers

### Get New and Updated Objects Polling

Retrieve new or updated objects based on timestamp field.

#### Configuration Fields

* **Object Type** - (string, required): Object-type to lookup on. E.g `Users`.
* **Timestamp field to poll on** - (string, optional): Select available timestamp field than will be used to filter new or updated objects
* **Emit behavior** - (dropdown, optional): Indicates emit objects behavior - `Emit individually` or `Emit page` (by default)
* **Start Time** - (string, optional): The timestamp, in ISO8601 format, to start polling from (exclusive). Default value empty - poll all records
* **Size of Polling Page** - (optional, positive integer, defaults to 100, max 1000): Indicates the number of items that will be fetched per request
* **Additional filter** - (string, optional): You can put here additional filter, for example: `city eq 'Leiden'`

#### Input Metadata

None.

#### Output Metadata
- For `Fetch page`: An object with key ***results*** that has an array as its value
- For `Emit Individually`:  Each object fills the entire message

## Known Limitations
* Currently, Basic authentication is supported only
