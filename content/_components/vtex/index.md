---
title: Vtex component
layout: component
section: E-Commerce components
description: The Vtex iPaaS component that connects to VTEX API
icontext: Vtex component
icon: vtex.png
category: vtex
updatedDate: 2022-03-11
ComponentVersion: 1.1.0
---

## Credentials

* **App Key*** (string, required) - VTEX AppKey
* **App Token*** (string, required) - VTEX AppToken
* **URL** (string, required) - Base url of your VTEX installation (e.g. `https://bestpartnerbr.myvtex.com/` or `bestpartnerbr`)

>**Please Note:** To generate app keys in your account, you should follow the instructions seen in the [Application Keys article](https://help.vtex.com/en/tutorial/application-keys--2iffYzlvvz4BDMr6WGUtet) in VTEX Help Center.

## Triggers

### Get New And Updated Objects Polling

Polls VTEX API for new and updated objects.

#### Configuration Fields

* **Object Type** - (required, dropdown) currently supported only `Customers` object.
* **Time stamp field to poll on** - (required, dropdown) Indicates just new items or new and modified items: `Created` or `Updated`.
**Notice** If you select `Updated` option - only updated objects will be polled, VTEX API fills updatedIn field only if you change object, for created object this field is empty.

#### Input Metadata

Input metadata is absent for triggers

#### Output Metadata

Output metadata is generated dynamically and depends on Object Type (see [VTEX Schemas API](https://developers.vtex.com/vtex-rest-api/reference/schemas))

## Actions

### Make Raw Request

Executes custom request

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean) Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required) Path of the resource relative to the base URL.
* **Method** (string, required) - Allowed values `GET`, `POST`, `PUT`, `PATCH`, `DELETE`. HTTP verb to use in the request.
* **Request Body** - (object, optional) Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required) HTTP status code of the response, required.
* **Response Body** - (object, optional) HTTP response body.


### Lookup Objects (Plural)

Provides the possibility to obtain multiple objects from the server by passing in some unique criteria for finding objects and retrieving them.

#### Configuration Fields

* **Object Type**: (dropdown, required). One of `Customers`, `Orders` or `Products`.
* Note: For now this action supports only `Orders` Object Type.
* **Behavior**: (dropdown, required). Indicates in what manner the action will fetch and retrieve the requested objects. Available options: `Fetch All`, `Fetch Page`, `Emit Individually`.

#### Input Metadata

* **Page Size**: (number, optional). Value between 0 and 30, defaults to 15 - page size used by API. Applicable only in `Fetch Page` mode. A value of 0 indicates that the results will be an empty array with only `totalCountOfMatchingResults` property populated.
* **Page Number**: (number, optional). The number of the page. non-negative, defaults to 0. Used only in `Fetch Page` mode.
* **Order**: (array, optional). Array of strings `OrderField` and `orderType (sort direction)` pairs, separated by coma, defaults to empty array. Can be seen only if it's the `Fetch Page` mode. Array of strings representation: `['OrderField,orderType','OrderField,orderType']`. *Order Field* expected values: creationDate, orderId, items, totalValue and origin. *Order Type* expected values: asc and desc. For example: `['totalValue,desc','creationDate,asc']`.
* **Search Criteria**: (array, optional). `Search terms` to be combined, defaults to empty array. Example: `["fieldName,fieldValue","fieldName,fieldValue"]`.

#### Output Metadata

Depending on the `Behavior` it can be:
- `Fetch Page` mode: An object with key `results` that has an array of object as its value, and key `totalCountOfMatchingResults` which contains the total number of results (not just on the page), which match the search criteria.
- `Fetch All` mode: an object, with key results that has an array as its value.
- `Emit Individually` mode: each object that fills the entire message.

>**Please Note:**  When the user passes search criteria that doesn't match any objects - an empty array inside the object is returned as the results: [], with additional field totalCountOfMatchingResults: 0

### Upsert Object

Allows upsert object by chosen schema

#### Configuration Fields

* **Object Type** - (dropdown, required) Object-type to upsert. E.g `Customers`
* **Upsert Schema** - (dropdown, required) Schema to validate object.

>**Please Note:** `Customers` upsert requires an `email` field to be filled, so schemas are additionally filtered, and schemas with the required `email` field are shown only.

#### Input Metadata

* **ID** - (string, optional) ID of the object to upsert
And dynamically generated fields according to chosen `Upsert Schema`

#### Output Metadata

Dynamically generated fields according to chosen `Upsert Schema`
