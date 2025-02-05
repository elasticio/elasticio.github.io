---
title: SAP Business One component
layout: component
section: ERP components
description: The SAP Business One Component is designed to interact seamlessly with the SAP Business One Service Layer API
icon: sap-business-one.png
icontext: SAP Business One component
category: sap-business-one
ComponentVersion: 1.0.0
updatedDate: 2025-01-09
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions) 
  * [Delete Object by Unique Criteria](#delete-object-by-unique-criteria) 
  * [Lookup Object by Unique Criteria](#lookup-object-by-unique-criteria) 
  * [Lookup Objects (plural)](#lookup-objects-plural) 
  * [Make Raw Request](#make-raw-request)
  * [Upsert Object](#upsert-object) 
* [Triggers](#triggers) 
  * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
* [Known Limitations](#known-limitations)

## Description

The SAP Business One Component is designed to interact seamlessly with the [SAP Business One Service Layer API](https://help.sap.com/doc/056f69366b5345a386bb8149f1700c19/10.0/en-US/Service%20Layer%20API%20Reference.html).

This component has been tested with API version `v1` (OData version 3) and `v2` (OData version 4).

## Credentials

The following fields are required for configuring component credentials: 
* **Service Layer API** - (string, required): The full path to your SAP Business One Service Layer API, for example, `https://my-service-layer-server.com:55000/b1s/v2`.
* **Company DB** - (string, required): The name of the company database.
* **Username** - (string, required): Your username.
* **Password** - (string, required): Your password.
* **Skip SSL validation (Not recommended)** - (checkbox, optional): If checked, the component will bypass SSL certificate validation for the provided Service Layer API.

## Actions 
  
### Delete Object by Unique Criteria 

Deletes object by the provided criteria. As a criteria it uses a set (one or more) of fields marked as `Key` in its OData metadata.

! Note: The component performs only a "Soft Delete" due to SAP restrictions. In most cases, the object will be marked as deleted rather than being actually removed.

#### Configuration Fields

* **Object Type** - (dropdown, required): An object type you want to delete. It is a dynamic field. The list of available objects will be automatically retrieved from the OData metadata.

#### Input Metadata

A dynamically fetched input metadata. Only the fields designated as `Key` in the OData metadata will be populated.

#### Output Metadata

* **key**  - (string, required): Unique identifier of deleted object
  
### Lookup Object by Unique Criteria 

Look up data by the provided criteria. As a criteria it uses a set (one or more) of fields marked as `Key` in its OData metadata.

#### Configuration Fields

* **Object Type** - (dropdown, required): An object type you want to look for. It is a dynamic field. The list of available objects will be automatically retrieved from the OData metadata.
* **Fields in resulting object** - (multiselect dropdown, optional): Select the fields that will be included in the resulting object. Leave blank if you want to include all fields
* **Include linked objects** - (multiselect dropdown, optional): You can select related objects that should be included in the resulting object.<br><b>Note:</b> If you select any objects here, you are also required to select `Fields in resulting object`
* **Allow zero results** - (checkbox, optional): When selected, if zero results are returned, the empty object {} is emitted, otherwise typically an error would be thrown.

#### Input Metadata

A dynamically fetched input metadata. Only the fields designated as `Key` in the OData metadata will be populated.

#### Output Metadata

A dynamically fetched output metadata. 

### Lookup Objects (plural) 

Lookup a set of objects by defined criteria list. Can be emitted in different way.


#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to lookup on. E.g `Users`.
* **Emit Behavior** - (dropdown, required): Defines the way result objects will be emitted, one of `Emit page` or `Emit individually`.
* **Number of search terms** - (number, optional): Field to specify a number of search terms (positive integer number [1-99] or 0), leave blank/put zero to lookup all entities of chosen type
* **Expert Mode for Filter Expression** - (checkbox, optional, default to false): if checked, any OData filter expression can be entered in metadata field `Filter Expression`.
* **Page Size** - (number, optional, default and max 100): Number of records to be fetched per API request. Please enter a positive integer only, the default and maximum value is 100
* **Fields in resulting object** - (multiselect dropdown, optional): Select the fields that will be included in the resulting object. Leave blank if you want to include all fields
* **Include linked objects** - (multiselect dropdown, optional): You can select related objects that should be included in the resulting object.<br><b>Note:</b> If you select any objects here, you are also required to select `Fields in resulting object`

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

#### Output Metadata
For `Emit Page` mode: An object with key `results` that has an array as its value
For `Emit Individually` mode: Each object which fill the entire message

### Make Raw Request 

This action executes a raw OData request.


#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): If enabled, 404 HTTP responses will not be treated as errors. The default value is `false`.

#### Input Metadata

* **Url** - (string, required): The path of the resource relative to the base URL provided in the credentials (Service Layer API).
* **Method** - (string, required): The HTTP verb to use for the request, which can be one of `GET`, `POST`, `PUT`, `PATCH`, or `DELETE`.
* **Request Body** - (object, optional): The body of the request to be sent.

#### Output Metadata

* **Status Code** - (number, required): The HTTP status code of the response.
* **HTTP headers** - (object, required): The HTTP headers included in the response.
* **Response Body** - (object, optional): The body of the HTTP response.

### Upsert Object 

Updates (if record found) or creates a new object.

#### Configuration Fields

* **Object Type** - (dropdown, required): A type of the object to upsert

* **Throw error if not found** - (checkbox, optional): If value to search is provided and object not found, the component will throw an error instead of trying to create a new object


#### Input Metadata

* **Value to search in "{Field to search object}"** - (string, optional): identifier of the object to upsert.
And dynamically generated fields according to chosen `Upsert Schema`.

#### Output Metadata

The result object from the upsert operation. It contains the full object in the case of creation, and only the object ID (`key`) if an existing object was updated.
  
### Get New and Updated Objects Polling 

Retrieve new or updated objects based on timestamp field.

#### Configuration Fields

* **Object Type** - (string, required): A type of the object to lookup on. E.g `Users`.

* **Timestamp field to poll on** - (string, optional): Select available timestamp field than will be used to filter new or updated objects
* **Emit behavior** - (dropdown, optional): Indicates emit objects behavior - `Emit individually` or `Emit page` (by default)
* **Start Time** - (string, optional): The timestamp, in ISO8601 format, to start polling from (exclusive). Defaults to 1970-01-01T00:00:00.000Z
* **Size of Polling Page** - (optional, positive integer, defaults to 100, max 1000): Indicates the number of items that will be fetched per request
* **Additional filter** - (string, optional): You can put here additional filter, for example: `city eq 'Leiden'`
* **Fields in resulting object** - (multiselect dropdown, optional): Select the fields that will be included in the resulting object. Leave blank if you want to include all fields
* **Include linked objects** - (multiselect dropdown, optional): You can select related objects that should be included in the resulting object.<br><b>Note:</b> If you select any objects here, you are also required to select `Fields in resulting object`

#### Input Metadata

None.

#### Output Metadata
- For `Fetch page`: An object with key ***results*** that has an array as its value
- For `Emit Individually`:  Each object fills the entire message

# Known Limitations
1. The maximum response size from the SAP Business One Service Layer API is limited to 10MB. If this limit is exceeded, you will receive a `maxContentLength size of 10485760 exceeded` error. This typically occurs when you are using large objects in the `Include linked objects` parameter. In such cases, consider reducing the `Page Size`.