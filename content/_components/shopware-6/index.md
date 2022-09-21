---
title: Shopware 6  component
layout: component
section: E-Commerce components
description: A component to work with Shopware API.
icon: shopware.png
category: shopware-6
icontext: Shopware-6 component
updatedDate: 2022-09-09
ComponentVersion: 1.1.0
---

## Credentials

To use this component you need to create own API access integration credentials:
* Go to Settings > System > Integrations create new access to connect to Shopware, [more info](https://docs.shopware.com/en/shopware-6-en/settings/system/integrationen?category=shopware-6-en/settings/system).

Component credentials configuration fields:

* **API Base URI**  (string, required) - Indicates what URL base needs to be used
* **Client id**  (string, required)
* **Client secret**  (string, required)

## Triggers

### Get New and Updated Objects Polling

Retrieve all the updated or created objects within a given time range.

#### Configuration Fields
* **Object Type** - (dropdown, required): Object Type to be fetched
* **Emit behavior** - (dropdown, optional): Indicates emit objects behavior - `Emit individually` (by default) or `Emit page`
* **Size of Polling Page** - (optional, positive integer, defaults to 100, max 500): Indicates the size of pages to be fetched
* **Timestamp field to poll on** - (string, optional): Can be either `Last Modified` or `Created` (updated or new objects, respectively). Defaults to `Created`.
* **Start Time** - (string, optional): Indicates the beginning time to start retrieving events from in ISO 8601 Date time utc format - `YYYY-MM-DDThh:mm:ssZ`
* **End Time** - (string, optional, defaults to execution date): If provided, don’t fetch records created or modified after this time in ISO 8601 Date time utc format - `YYYY-MM-DDThh:mm:ssZ`

#### Input Metadata

There is no input metadata

#### Output Metadata

* For `Fetch page`: An object with key ***results*** that has an array as its value
* For `Emit Individually`:  Each object fill the entire message

#### Limitations

* For new objects "Last Modified" field is empty
* For `Get New and Updated Objects Polling` Trigger and `Lookup Objects (plural)` Action amount of items retrieved in sample is limited to 10. It's done to decrease load on platform UI.

## Actions

### Lookup Objects (plural)

Lookup a set of objects by defined criteria list. Can be emitted in different way.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to lookup on. E.g `User`.
* **Emit Behavior** - (dropdown, required): Defines the way result objects will be emitted, one of `Emit all`, `Emit page` or `Emit individually`.

#### Input Metadata

* **Search Criteria** - (array of strings, required): [Search terms to filter objects](https://shopware.stoplight.io/docs/store-api/docs/concepts/search-queries.md#filter). Search terms are array which will be used as value for `filter` param of search. Be default, mapping configured to use fields "type", "field", "value", if you want to use another filter configuration - proceed to advanced mode. E.g: `[{ type: 'equals', field: 'firstName', value: 'John' }]`

If selected `Emit Behavior` is `Emit page` additionally fields will be added:
* **Page Number** - (number, defaults 0): Indicates amount number of page to fetched.
* **Page Size** - (number, defaults to 500): Indicates amount of objects per page. Value from 0 to 500.

#### Output Metadata

For `Emit All` mode: An object, with key `results` that has an array as its value.
For `Emit Page` mode: An object with key `results` that has an array as its value (if `Page Size` > 0). Key `totalCountOfMatchingResults` which contains the total number of results (not just on the page) which match the search criteria (if `Page Size` = 0).
For `Emit Individually` mode: Each object which fill the entire message.

### Delete Object By ID

Delete a single object by its ID.

#### Configuration Fields

* **Object Type** - (string, required): Object-type to lookup on. E.g `Customer`.

#### Input Metadata

* **id** - (string, required): Value for ID of the object to delete.

#### Output Metadata

* **id** - (string, required): ID of deleted object.

### Upsert Object

Updates (if record found) or creates a new object.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to upsert. E.g `Customer`.
* **Create or update existing object** - (dropdown, required): Options are "Create new" or "Update existing".
* **Make GET request after object created/updated** - (checkbox, optional): Make GET request after object created/updated. If false - only object ID will be emitted.

#### Input Metadata

If `Make GET request after object created/updated` is `true`:
* **ID** - (string, required): ID of the object to upsert.
And dynamically generated fields according to chosen `Upsert Schema`.
If `Make GET request after object created/updated` is `false`:
* **ID** - (string, optional): ID of the object to upsert.
And dynamically generated fields according to chosen `Upsert Schema`.

#### Output Metadata

If `Make GET request after object created/updated` is `true`:
* **ID** - (string, optional): ID of the object to upsert.
And dynamically generated fields according to chosen `Upsert Schema`.
If `Make GET request after object created/updated` is `false`:
* **ID** - (string, optional): ID of the object to upsert.

### Lookup Object (at most one)

Lookup a single object by a selected field that uniquely identifies it.

#### Configuration Fields

* **Object Type** - (string, required): Object-type to lookup on. E.g `Users`.
* **Allow criteria to be omitted** - (boolean, optional): If selected field `id` becomes optional.
* **Allow zero results** - (boolean, optional): When selected, if the object is not found - an empty object will be returned instead of throwing error.

#### Input Metadata

* **Object Type Id** - (string, required unless `Allow criteria to be omitted` is selected): unique identifier of selected `Object Type`

#### Output Metadata

Object with result of lookup as value.

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
