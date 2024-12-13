---
title: SAP ByDesign component
layout: component
section: ERP components
description: The SAP ByDesign Component is designed to facilitate interaction with the SAP OData API.
icon: sapbydesign.png
icontext: SAP ByDesign component
category: sap-byDesign
updatedDate: 2024-12-09
ComponentVersion: 1.0.1
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions) 
  * [Delete Object By ID](#delete-object-by-id) 
  * [Lookup Object By ID](#lookup-object-by-id) 
  * [Lookup Objects (plural)](#lookup-objects-plural) 
  * [Make Raw Request](#make-raw-request)
  * [Upsert Object](#upsert-object) 
* [Triggers](#triggers) 
  * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
* [Known Limitations](#known-limitations)

## Description

The SAP ByDesign Component is designed to facilitate interaction with the SAP OData API.

This component has been tested with SAP UI5 Version `1.108.9`, User Interface Version `2408.1.1`.

## Credentials

Before you begin using this component, you must expose the necessary objects to the OData API. Detailed instructions can be found [here](https://help.sap.com/docs/SAP_BUSINESS_BYDESIGN/7c182c462ec043cba338a30b952068c7/2bccd772722d1014b742a3a0c4b116d0.html?locale=en-US).

The configuration fields for component credentials are as follows: 
* **Service URL** (string, required) - The URL to your OData metadata endpoint, for example, `https://my123456.sapbydesign.com/sap/byd/odata/v1/company/$metadata`.
* **Username** (string, required) - The username of an individual who has the rights to access this OData endpoint.
* **Password** (string, required) - The password for OData authentication.

## Actions 
  
### Delete Object By ID 

Delete a single object by its ID.

#### Configuration Fields

* **Object Type** - (string, required): Object-type to lookup on. E.g `Users`.

#### Input Metadata

* **ID Value** - (string, required): Value for ID of the object to delete.

#### Output Metadata

Object with result of delete. 
  
### Lookup Object By ID 

Lookup a single object by its ID.

#### Configuration Fields

* **Object Type** - (string, required): Object-type to lookup on. E.g `Users`.

#### Input Metadata

* **ID Value** - (string, required): Value for ID of the object to lookup.

#### Output Metadata

Object with result of lookup as value. 
  
### Lookup Objects (plural) 
Lookup a set of object by defined criteria list. Can be emitted in different way.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to lookup on. E.g `Users`.
* **Emit Behavior** - (dropdown, optional, default `Emit individually`): Defines the way result objects will be emitted, one of `Emit page` or `Emit individually`.
* **Number of search terms** - (strings, optional): specify a number of search terms (positive integer number [0-99]).
* **Expert Mode for Filter Expression** - (checkbox, optional, default to false): if checked, any OData filter expression can be entered in metadata field `Filter Expression`.

#### Input Metadata

If configuration field `Expert Mode for Filter Expression` is enabled:
* **Filter Expression** - (strings, required): any OData filter expression (without `$filter=`). For advanced users. Examples:
  * `startswith(displayName,'J') and jobTitle eq 'Software Engineer'`
  * `DocumentType eq 'Order'`

If configuration field `Expert Mode for Filter Expression` is disabled:
* Depend on configuration field `Number of search terms`. If = `N` - N search term and N-1 logical operators will be generated, if = 0 - any search term will be generated.
Each term contains the following fields:

  * **Field name** - (string, required): The name of the chosen entity's field. You must select one field from the Allowed Values section.
  * **Condition** - (string, required): The condition used to compare the selected field with the value. The available conditions are described as follows:
    * `gt` - Greater than
    * `lt` - Less than
    * `eq` - Equal to
    * `ne` - Not equal to
    * `ge` - Greater than or equal to
    * `le` - Less than or equal to
    * `has` - Contains (in the context of membership or presence)
    * `in` - Belongs to a set or collection
    * `startswith` - Begins with
    * `endswith` - Ends with
    * `contains` - Includes or possesses within
  * **Field value** - (string, required): The value that the field must match according to the specified condition.
  * **Detect type** - (boolean, optional): When set to true, the component will attempt to detect the value type and apply additional conditions, such as adding single quotes to strings.

  Between search terms, there is a **Logical operator** to combine multiple terms. Available options:
    * `and`
    * `or`

  Example for `Number of search terms = 2`:
  ```json
  {
    "sTerm_1": {
      "fieldName": "id",
      "condition": "eq",
      "fieldValue": "1",
      "detectType": true
    },
    "link_1_2": "and",
    "sTerm_2": {
      "fieldName": "displayName",
      "condition": "eq",
      "fieldValue": "Cronus",
      "detectType": true
    }
  }
  ```

If selected `Emit Behavior` is `Emit page` additionally fields will be added:
* **Page Size** - (number, defaults to 100, max 1000): Indicates amount of objects per page.


### Make Raw Request 

This action executes a custom request.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treats 404 HTTP responses as non-errors; defaults to `false`.

#### Input Metadata

* **Url** - (string, required): The path of the resource relative to the base URL.
* **Method** - (string, required): The HTTP verb to use in the request, which can be one of `GET`, `POST`, `PUT`, `PATCH`, or `DELETE`.
* **Request Body** - (object, optional): The body of the request to send.
* **Headers** - (object, optional): You can put here additional headers.

#### Output Metadata

* **Status Code** - (number, required): The HTTP status code of the response.
* **HTTP headers** - (object, required): The HTTP headers included in the response.
* **Response Body** - (object, optional): The body of the HTTP response.

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

The result object from the upsert operation. It contains the full object in the case of creation, and only the object ID if an existing object was updated.

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
* For operations that involve changes to objects (create, update, delete), the component will make an additional call to fetch the CSRF protection token.