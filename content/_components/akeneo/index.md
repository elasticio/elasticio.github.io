---
title: Akeneo component
layout: component
section: E-Commerce components
description: Akeneo component is designed to connect Akeneo API.
icon: akeneo.png
icontext: Akeneo component
category: akeneo
updatedDate: 2025-03-21
ComponentVersion: 2.0.1
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Make Raw Request](#make-raw-request)
  * [Delete Object By ID](#delete-object-by-id)
  * [Lookup Object By ID](#lookup-object-by-id)
  * [Lookup Objects (plural)](#lookup-objects-plural)
  * [Upsert Object](#upsert-object)
* [Triggers](#triggers)
  * [Fetch New/Updated Objects Polling](#fetch-newupdated-objects-polling)

## Description
Akeneo Component is designed to connect Akeneo API.

## Credentials

To use this component you need to create own API access integration credentials:
`Connect > Connection Settings > Create` or use this link with your instance: `https://{your_instance}/connect/connection-settings/create`.
You will get credentials like this:

![](https://user-images.githubusercontent.com/30211658/190648337-23cf6ef2-04e3-4ffb-b6c2-17066484e81e.png)

Component credentials configuration fields:

* **API Base URI** (string, required) - Indicates what URL base needs to be used.
* **API version (v1 as default)** (string, optional) - Indicates what API version needs to be used.
* **Client id** (string, required) - "Client ID" from generated connection app.
* **Client secret** (string, required) - "Secret" from generated connection app.
* **Username** (string, required) - "Username" from generated connection app.
* **Password** (string, required) - "Password" from generated connection app.

> **Please Note:** To maintain a smooth experience, we recommend reusing stored credentials where possible. Duplicating secrets across OAuth clients can result in errors and complications.

## Actions

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

### Delete Object By ID

Delete a single object by its ID.

#### Configuration Fields

* **Object Type** - (string, required): Object-type to lookup on. E.g `Users`.

#### Input Metadata

* **ID Value** - (string, required): Value for ID of the object to delete.

#### Output Metadata

* **ID** - (string, required): ID of the deleted object.

### Lookup Object By ID

Lookup a single object by it's id.

#### Configuration Fields

* **Object Type** - (string, required): Object-type to lookup on. E.g `Users`.
* **Allow criteria to be omitted** - (boolean, optional): If selected field `ID Value` becomes optional.
* **Allow zero results** - (boolean, optional): When selected, if the object is not found - an empty object will be returned instead of throwing error.

#### Input Metadata

* **ID Value** - (string, required unless `Allow criteria to be omitted` is selected): Value for unique search criteria in `Lookup Criteria` configuration field.

#### Output Metadata

* Object with result of lookup as value.

### Lookup Objects (plural)

Lookup a set of object by defined criteria list. Can be emitted in different way.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to lookup on. E.g `Users`.
* **Emit Behavior** - (dropdown, required): Defines the way result objects will be emitted, one of `Emit all`, `Emit page` or `Emit individually`.

#### Input Metadata

* **Search Criteria** - (array of strings, required): Search terms to be combined with the AND operator, E.g: `[{ fieldName: 'createdon', operator: 'gt', fieldValue: '2022-08-28T14:27:45Z' }, { fieldName: 'name', operator: 'eq', fieldValue: '"Alex"' }]`

If selected `Emit Behavior` is `Emit page` additionally fields will be added:
* **Page Number** - (number, defaults to 0): Indicates index of page to be fetched.
* **Page Size** - (number, defaults to 100): Indicates amount of objects per page. Value from 1 to 100.
If selected `Emit Behavior` is `Emit all` additional field will be added:
* **Emit only total count of results matching search criteria** - (boolean, defaults to false): If `true`: emit only `totalCountOfMatchingResults` with total amount of objects found by search criteria.

#### Output Metadata

* For `Emit All` & `Emit Page` mode: An object, with key `results` that has an array as its value.
* For `Emit Individually` mode: Each object which fill the entire message.
* If `Emit only total count of results matching search criteria` is set `true` for `Emit All` mode: only `totalCountOfMatchingResults` with total amount of objects found by search criteria will be emitted.

### Upsert Object

Updates/creates object.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to upsert. E.g `Users`.
* **Create or update existing object** - (dropdown, required): Options are "Create new" or "Update existing".
* **Make GET request after object created/updated** - (checkbox, optional): Make GET request after object created/updated. If false - only object ID will be emitted.

#### Input Metadata

Dynamically generated fields according to chosen `Upsert Schema`.

#### Output Metadata

* If `Make GET request after object created/updated` is `true`:
Dynamically generated fields according to chosen `Upsert Schema`.
* If `Make GET request after object created/updated` is `false`:
  - **ID** - (string, optional): ID of the upserted object.

## Triggers

### Fetch New/Updated Objects Polling

Retrieve all the updated or created objects within a given time range based on the object type. Certain objects support filtering based on both Created and Updated fields while others only on the Updated criteria. The [Filtering documentation](https://api.akeneo.com/documentation/filter.html) provides the full list of available options.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to lookup on. E.g `Products`.
* **Timestamp field to poll on** - (dropdown, optional): Can be either `Last Modified` or `Created` (updated or new objects, respectively). Defaults to `Last Modified`.
* **Emit behavior** - (dropdown, optional): Indicates emit objects behavior - `Emit individually` (by default) or `Emit page`.
* **Size of Polling Page** - (optional, positive integer, defaults to 100, max 100): Indicates the size of pages to be fetched.
* **Single Page per Interval** - (boolean, optional): Indicates that if the number of changed records exceeds the maximum number of results in a page, instead of fetching the next page immediately, wait until the next flow start to fetch the next page. Defaults to false.
* **Start Time** - (string, optional): The timestamp, in ISO8601 format, to start polling from (inclusive). Default value is the beginning of time (January 1, 1970 at 00:00.000).
* **End Time** - (string, optional): The timestamp, in ISO8601 format, to end at (inclusive). Default value is never.

#### Input Metadata

There is no Input Metadata.

#### Output Metadata
* For `Emit page`: An object with key ***results*** that has an array as its value.
* For `Emit Individually`:  Each object fill the entire message.

#### Limitations

Number of items retrieved in a sample is limited to 10. This is done to reduce the load on the platform’s UI. Flow runtime will not have any limitations.