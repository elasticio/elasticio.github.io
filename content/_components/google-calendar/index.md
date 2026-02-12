---
layout: component
title: Google Calendar component
section: Office components
description: Google Calendar Component is designed to connect to the Google Calendar API.
icon: google-calendar.png
icontext: Google Calendar component
category: google-calendar
ComponentVersion: 1.0.0
updatedDate: 2026-02-11
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

## Description

Google Calendar Component is designed to connect to the [Google Calendar API](https://developers.google.com/workspace/calendar/api/v3/reference). The current release of the component supports Google Calendar API v3.

## Credentials

Before building any integration flow you must at first configure the app from inside the [Google Developers Console](https://console.cloud.google.com/).
1. Go to the `APIs & Services` -> `Enabled APIs & services` page and enable the following:
-  Google Calendar API 
2. Go to the `Credentials` section and create a new credential of type  `OAuth client ID`.
- Set Application type to `Web application`
- Add Authorized [redirect URI](/guides/oauth-callback-redirect-url.html) as: `https://{your-tenant-address}/callback/oauth2`

Now you can create new credentials for the component:
* **Type** (dropdown, required) - `OAuth2`
* **Choose Auth Client** (dropdown, required) - select one of created before or `Add New Auth Client`:
  * **Name** (string, required) - provide any name you want
  * **Client ID** (string, required) - put here `Client ID` from `Web application` in `Google Developers Console`
  * **Client Secret** (string, required) - put here `Client Secret` from `Web application` in `Google Developers Console`
  * **Authorization Endpoint** (string, required) - Google oauth2 authorization endpoint `https://accounts.google.com/o/oauth2/v2/auth`
  * **Token Endpoint** (string, required) - Google refresh token endpoint `https://oauth2.googleapis.com/token`
* **Name Your Credential** (string, required) - provide any name you want
* **Scopes (Comma-separated list)** (string, required) - Put here scopes to get access to your Google Calendar - `https://www.googleapis.com/auth/calendar`
* **Additional parameters (Comma-separated list)** (string, required) - set it as `access_type:offline,prompt:consent` to make component works properly

## Actions

### Delete Object By ID

Deletes a single object by its ID.

#### Configuration Fields

* **Object Type** - (string, required): The object type to delete (e.g., `Event`).

#### Input Metadata

Required fields will be dynamically generated based on the selected Object Type.

#### Output Metadata

Returns the id of the deleted object.

### Lookup Object By ID

Retrieve a single object by its ID.

#### Configuration Fields

* **Object Type** - (string, required): The object type to look up (e.g., `Event`).

#### Input Metadata

Required fields will be dynamically generated based on the selected Object Type.

#### Output Metadata

An object containing the lookup result as its value.

### Lookup Objects (plural)

Looks up a set of objects based on a defined list of criteria. The results can be emitted in different ways.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to look up (e.g., `Event`).
* **Emit Behavior** - (dropdown, required): Defines how result objects are emitted. Options: `Emit page` or `Emit individually`.
* **Page Size** - (integer, optional, 100 by default): The number of records to be fetched per API call. Must be a positive integer, maximum 100.

#### Input Metadata

Contains the fields used to identify the objects. If no fields are available, no input metadata is provided.

#### Output Metadata
For `Emit Page` mode: An object with key `results` that has an array as its value.

For `Emit Individually` mode: Each object fills the entire message.

### Make Raw Request

Executes custom request.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL. Here comes a part of the path that goes after `https://www.googleapis.com/calendar/v3`.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PATCH`, `DELETE`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

### Upsert Object 

Creates a new object or updates an existing one, depending on whether the unique identifier field is provided.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to upsert (e.g., `Event`).

#### Input Metadata

* Unique field used to identify the object to be updated
* Additional fields generated dynamically based on the selected `Object Type`.

#### Output Metadata

The object returned from the upsert operation.

## Triggers

### Get New and Updated Objects Polling

Retrieve all the new and updated objects within a given time range. The results can be emitted in different ways.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to look up (e.g., `Event`).
* **Calendar Id** - (string, required): Calendar identifier.
* **Event Types** - (dropdown, optional): Event types to return. If unset, returns all event types.
* **Time stamp field to poll on** - (dropdown, required): The event date field used to track changes.
* **Emit Behavior** - (dropdown, required): Defines how result objects are emitted. Options: `Emit page` or `Emit individually`.
* **Page Size** - (integer, optional, 100 by default): The number of records to be fetched per API call. Must be a positive integer, maximum 100.
* **Start Time** - (string, optional): The exclusive start time for polling, in the format \"YYYY-MM-DD[T]HH:MM:SS[Z]\" where [] wraps a fixed character value. Defaults to 1970-01-01T00:00:00Z

#### Input Metadata

None.

#### Output Metadata

For `Emit Page` mode: An object with key `results` that has an array as its value.

For `Emit Individually` mode: Each object fills the entire message.

#### Known Limitations

* Deleted events are always excluded from the response.