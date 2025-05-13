---
title: Microsoft Dynamics for Finance and Operations component
layout: component
section: ERP components
description: Microsoft Dynamics for Finance and Operations component is designed to use ODATA API from Microsoft.
icon: ms-dynamics-for-finance-operations.png
icontext: Microsoft Dynamics for Finance and Operations component
category: ms-dynamics-for-finance-operations
updatedDate: 2025-04-22
ComponentVersion: 1.1.0
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions) 
  * [Upsert Object](#upsert-object)
  * [Make Raw Request](#make-raw-request)
  * [Lookup Object by Unique Criteria](#lookup-object-by-unique-criteria)
  * [Lookup Objects (plural)](#lookup-objects-plural)

## Description

Microsoft Dynamics for Finance and Operations component is designed to use [ODATA API from Microsoft](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/data-entities/data-management-api).

## Credentials

Microsoft Dynamics for Finance and Operations component uses the OAuth 2.0 authentication protocol. 

During the creation of credentials, you will need the following information:
* **Client ID** - (string, required): You will receive this after app registration. 
* **Client Secret** - (string, required): You will receive this after app registration. 
* **Tenant ID** - (string, required): You will receive this after app registration. 
* **Resource URL** - (string, required): Your installation URL, for example, `https://my-project.sandbox.operations.dynamics.com/`

## Triggers

This component has no trigger functions. This means it will not be accessible to select as a first component during the integration flow design.

## Actions

### Upsert Object 

This function updates an existing object or creates a new one.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to upsert, e.g., `Users`.
* **Select fields to search by** - (multiselect, optional): Use this option to select the fields you wish to use as search criteria.
* **If a record is found** - (dropdown, optional, defaults to `Update it`): Specifies the action to take if a record is found. The available options are:
  * **Update it** (default) - The found object will be updated.
  * **Throw an error** - An error will be thrown, and the object will not be updated.
  * **Emit the existing record** - The found object will be emitted, and it will not be updated.
  * **Emit an empty message** - An empty object will be emitted, and the found object will not be updated.
* **If a record is not found** - (dropdown, optional, defaults to `Create it`): Specifies the action to take if a record is not found. The available options are:
  * **Create it** (default) - A new object will be created.
  * **Throw an error** - An error will be thrown, and the object will not be created.
  * **Emit an empty message** - An empty object will be emitted, and the object will not be created.

#### Input Metadata

* The field `Value to search by "${fieldName}"` represents the value corresponding to the selected field in `Select fields to search by`, which will be utilized to search for an existing object.
* Additional fields are dynamically generated based on the selected `Object Type`.

#### Output Metadata

The output will be the resulting object obtained from the upsert operation.

### Make Raw Request
Executes custom request

#### Configuration Fields
* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata
* **Url** - (string, required): Path of the resource relative to the base URL.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
* **Headers** - (object, optional): Headers of the request to send.
* **Request Body** - (object, optional): Body of the request to send.

Input message example:
```json
{
  "method": "GET",
  "url": "/data/ServiceOrderLines?$top=1"
}
```

#### Output Metadata
* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

### Lookup Object by Unique Criteria
Look up data by the provided criteria. As a criteria it uses a set (one or more) of fields marked as `IsKey: true` in its OData metadata.
The metadata fields are marked as optional but at least one of them must be specified. For example, if there are 3 fields available:
- ServiceOrderNumber
- LineNumber
- dataAreaId
and you want to search by 2 of them, say, ServiceOrderNumber (string) and LineNumber (number), it will be converted into the following OData filtering query:
`$filter=ServiceOrderNumber eq 'abc' and LineNumber eq 1`. Data type is fetched from the OData metadata dynamically.

#### Configuration Fields
* **Object Type** - (required, dropdown): An object type you want to look for. It is a dynamic field. The list of available objects will be automatically retrieved from the OData metadata.
* **Allow zero results** - (optional, boolean): When selected, if zero results are returned, the empty object {} is emitted, otherwise typically an error would be thrown.

#### Input Metadata
A dynamically fetched input metadata. Only the fields marked as `IsKey: true` in its OData metadata are to be converted

#### Output Metadata
A dynamically fetched output metadata.

### Lookup Objects (plural)
Lookup a set of objects by one or more conditions (filters) provided. It works somewhat similar to the [Lookup Object by Unique Criteria](#lookup-object-by-unique-criteria) action.
There are a few differences compared to that action:
- Any field can be used as a filter parameter, not only those marked as `IsKey: true` in its OData metadata
- Different filtering conditions are supported, not only `eq`
- Conditions can be joined with either `and` or `or` operators
- Any output number of the objects is considered correct as opposite to the [Lookup Object by Unique Criteria](#lookup-object-by-unique-criteria) action where there must be one and only one output object
- The result can be emitted either individually (one by one), or split into batches (pages)

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to lookup on. E.g `Customers`
* **Emit Behavior** - (dropdown, optional, default `Emit individually`): Defines the way result objects will be emitted, one of `Emit page` or `Emit individually`
* **Select fields to search by** - (multiselect, optional): Use this option to select the fields you wish to use as a search criteria
* **Expert Mode for Filter Expression** - (checkbox, optional, default to false): if checked, any [filter expression](https://learn.microsoft.com/en-us/graph/filter-query-parameter) can be entered in metadata field `Filter Expression`.

> **Please Note:** You must select either **Select fields to search by** or **Expert Mode for Filter Expression** choose only one to serve as the primary search criteria

#### Input Metadata

If configuration field `Expert Mode for Filter Expression` is enabled:
* **Filter Expression** - (strings, required):  any [filter expression](https://learn.microsoft.com/en-us/graph/filter-query-parameter) can be entered in metadata field `Filter Expression` (without `$filter=`). For advanced users. Examples:
  * `CustomerAccount eq '123' or CustomerAccount eq '456'`
  * `DocumentType eq 'Order'`
  * `CustomerAccount eq '123' or TrackCost eq Microsoft.Dynamics.DataEntities.PSAProjTrackCost'Actual'` if a field has a custom enum type
  * `TrackCost eq Microsoft.Dynamics.DataEntities.PSAProjTrackCost'Actual' and InvoiceCost eq Microsoft.Dynamics.DataEntities.NoYes'No'`

If configuration field `Expert Mode for Filter Expression` is disabled:
* Depends on the set of the fields to search by.
  Example for 2 fields to search by selected:  `ServiceOrderNumber` and `LineNumber`:
  ```json
  {
    "sTerm_1|ServiceOrderNumber|withQuotes": {
      "condition": "eq",
      "fieldValue": "1234567"
    },
    "link_1_2": "and",
    "sTerm_2|LineNumber|noQuotes": {
      "condition": "eq",
      "fieldValue": "1"
    }
  }
  ```

Don’t be concerned about unusual field names; they are generated automatically, and you do not need to enter them manually.

**Important Note on Filter Expression Modes**

When working with OData, it’s crucial to understand the differences between basic and expert modes for filter expressions.

**Basic Mode**

- **Purpose:** The Basic Mode is designed to operate with standard OData types, such as:
  - Edm.String
  - Edm.Int32
  - Edm.Double
  - Edm.Boolean

- **Limitations:**
  - This mode does not support custom types. If you attempt to use parameters with custom types (e.g., enums), you may encounter the following error - `A binary operator with incompatible types was detected.`

**Expert Mode for Filter Expression**
- **When to Use:** If you need to work with custom types, such as enums, switch to Expert Mode for Filter Expression.
- **Requirements:** In Expert Mode, you must specify the exact name of the custom type. For example, instead of using TrackCost, you would need to use `Microsoft.Dynamics.DataEntities.PSAProjTrackCost`
- **Finding Type Names:** You can find the exact names of custom types by querying the OData metadata endpoint. Use the following request `GET {baseURL}/metadata/PublicEntities`

If selected `Emit Behavior` is `Emit page` additionally fields will be added:
* **Page Size** - (number, defaults to 100, max 1000): Indicates amount of objects per page.

#### Output Metadata

For `Emit Page` mode: An object with key `results` that has an array as its value.
For `Emit Individually` mode: Each object which fill the entire message.