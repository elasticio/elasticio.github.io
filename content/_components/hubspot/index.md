---
title: Hubspot component
layout: component
section: Marketing-related components
description: A component that connects to Hubspot API
icon: hubspot.png
icontext: Hubspot component
category: hubspot
updatedDate: 2021-10-29
ComponentVersion: 1.2.0
---

## General information

### Description

A [{{site.data.tenant.name}}](http://www.{{site.data.tenant.name}}) component that connects to Hubspot API.

### Environment variables

|Name|Mandatory|Description|Values|
|----|---------|-----------|------|
|`REQUEST_MAX_RETRY`| false | Set how many time system try to make request to API on errors (3 by default) | any `integer` above 0|

## Credentials

Authentication occurs via OAuth 2.0.
In order to make OAuth work, you need a new App in your Hubspot.

More information you can find [here](https://developers.hubspot.com/docs/api/working-with-oauth).

During credentials creation you would need to:
- select existing Auth Client from drop-down list ``Choose Auth Client`` or create the new one.
For creating Auth Client you should specify following fields:

Field name|Mandatory|Description|
|----|---------|-----------|
|Name| true | your Auth Client's name (any) |
|Client ID| true | your OAuth client key (provide by Hubspot) |
|Client Secret| true | your OAuth client secret (provide by Hubspot) |
|Authorization Endpoint| true | your OAuth authorization endpoint. ex: <br>`https://app-eu1.hubspot.com/oauth/authorize`
|Token Endpoint| true | your OAuth Token endpoint for refreshing access token: <br>`https://api.hubapi.com/oauth/v1/token`|


## Triggers

### Get New and Updated Objects

### Config Fields

 * **Object Type** Dropdown: Indicates Object Type to be fetched
 * **Emit behavior** Dropdown: Indicates emit objects individually or emit by page
 * **Field to poll** Dropdown: Indicates field to poll (new objects or modified objects)
 * **Start Time** - TextField (string, optional): Indicates the beginning time to start retrieving events from
 * **End Time** - TextField (string, optional, defaults to never): If provided, don’t fetch records modified after this time
 * **Size of Polling Page** - TextField (optional, positive integer, max 100, defaults to 100): Indicates the size of pages to be fetched
 * **Single Page per Interval** - Checkbox: Indicates that if the number of changed records exceeds the maximum number of results in a page, instead of fetching the next page immediately, wait until the next flow start to fetch the next page

## Actions

### Raw Request

Action to call any Hubspot API endpoint

#### Config Fields

* **Throw Error on 404 Response** - Treat 404 HTTP responses as errors.

#### Input Metadata

* **URL** - Path of the resource relative to the URL base (https://api.hubapi.com), required.
* **Method** - Allowed values `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, required. HTTP verb to use in the request.
* **Request Body** - Body of the request to send

### Upsert

Action to make upsert(update/create) object in Hubspot

#### Config Fields

* **Object type** - Object type for upsert ("Companies", "Contacts", "Deals", "Line Items", "Tickets")
* **ID to Search On** - Identificator to search object ("Hubspot Id" or "Email". "Email" is only for "Contacts" `Object Type`)

#### Input Metadata

Dynamically generated

### Lookup Object (at most one)

Action designed to lookup one object by unique field

#### Config Fields

* **Object Type** Dropdown: Indicates Object Type to find
* **ID to Search On** Dropdown: Indicates unique field to search on
* **Allow ID to be omitted** Checkbox: When selected, the ID field becomes optional, otherwise it is a required field
* **Allow zero results** Checkbox: When selected, if zero results are returned, the empty object {} is emitted, otherwise typically an error would be thrown.

#### Input Metadata

* **ID value** Textfield: value for `ID to Search On` (unique field value by itself)

## Known Limitations

[Rate Limits](https://developers.hubspot.com/docs/api/usage-details#rate-limits).
