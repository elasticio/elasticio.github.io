---
title:  Click Send SMS component
layout: component
section: Service components
description: The Click Send SMS component facilitates interaction with the Click Send SMS API.
icon: click-send-sms.png
icontext: Click Send SMS component
category: click-send-sms
ComponentVersion: 1.0.0
updatedDate: 2025-05-06
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Triggers](#triggers)
  * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
* [Actions](#actions)
  * [Delete Object By ID](#delete-object-by-id)
  * [Lookup Object By ID](#lookup-object-by-id)
  * [Lookup Objects (plural)](#lookup-objects-plural)
  * [Make Raw Request](#make-raw-request)
  * [Upsert Object](#upsert-object)

## Description

The Click Send SMS Component facilitates interaction with the [Click Send SMS API](https://developers.clicksend.com/docs).

## Credentials

To use this component, follow these steps:

1. Create a [Click Send SMS account](https://dashboard.clicksend.com/signup/step1) or [sign in](https://dashboard.clicksend.com/login).
2. Navigate to the [API Credentials](https://dashboard.clicksend.com/account/subaccounts) page.
3. Save your API key and username securely and do not share it.

* **API Key** (string, required) - The Click Send SMS API token.
* **Username** (string, required) - The Click Send SMS account username.

## Triggers
  
### Get New and Updated Objects Polling

Retrieves all the created or updated objects within a given time range.

> **Please Note:** This trigger fetches all records for the selected object type and filters them in memory (except for the SMS History object type, which supports server-side filtering). For large datasets, this may lead to performance issues. Please ensure your account has appropriate API usage limits.

#### Configuration Fields

* **Object Type** - (dropdown, required): Type of object to poll on. Currently supported types are:
    - SMS History
    - SMS Receipts
    - SMS Campaigns

* **Poll Config** - (dropdown, required): Select the date field to track changes.
* **Emit behavior** - (dropdown, optional): Indicates emit objects behavior - `Emit individually` (by default) or `Emit page`.
* **Size of Polling Page** - (optional, positive integer, defaults to 100, min 15, max 100): Indicates the size of pages to be fetched.
* **Start Time** - (string, optional): The timestamp, in ISO8601 format, to start polling from (exclusive). The default value is the beginning of time (January 1, 1970 at 00:00.000).

#### Input Metadata

None.

#### Output Metadata

- For `Fetch page`: An object with key ***results*** that has an array as its value.
- For `Emit Individually`:  Each object fills the entire message.

## Actions

### Delete Object By ID

Deletes a single object using its ID.

#### Configuration Fields

* **Object Type** - (string, required): The type of object to delete. Currently supported types are:
    - Contact List
    - Contact

#### Input Metadata

A dynamically generated list of required fields based on the selected `Object Type`.

#### Output Metadata

An object with the key `result`, which contains the result of the operation.

### Lookup Object By ID

Retrieves a single object using its ID.

#### Configuration Fields

* **Object Type** - (string, required): The type of object to look up. Currently supported types are:
    - SMS Receipt
    - SMS Campaign
    - Contact List
    - Contact

#### Input Metadata

A dynamically generated list of required fields based on the selected `Object Type`.

#### Output Metadata

Returns an object with the result of the lookup.

### Lookup Objects (Plural)

Lookups a set of objects based on a defined list of criteria. The results can be emitted in different ways.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to look up. Currently supported types are:
    - SMS History
    - SMS Receipts
    - SMS Campaigns
    - Contact Lists
    - List Contacts

* **Emit Behavior** - (dropdown, optional): Indicates emit objects behavior - `Emit individually` (by default) or `Emit page`.

#### Input Metadata

A dynamically generated list of available criteria.

#### Output Metadata

For `Emit All` mode: An object with the key `results`, which contains an array as its value.
For `Emit Individually` mode: Each object fills the entire message.

### Make Raw Request

Allows for the execution of custom requests using the Click Send SMS API directly.

#### Configuration Fields

* **Don't throw an error on 404 Response** - (optional, boolean): Configures the handling of 404 HTTP responses as non-errors. The default is `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL (here comes a part of the path that goes after `https://rest.clicksend.com/v3`).
* **Method** - (string, required): Specifies the HTTP method for the request.
* **Request Body** - (object, optional): The body content for the request.

#### Output Metadata

* **Status Code** - (number, required): The HTTP response status code.
* **HTTP headers** - (object, required): The response's HTTP headers.
* **Response Body** - (object, optional): The body of the HTTP response.

### Upsert Object

This action updates an existing object or creates a new one, depending on the selected operation.

#### Configuration Fields

* **Operation** - (dropdown, required): Choose the operation to perform - either `Update` or `Create`.
* **Object Type** - (dropdown, required): Select the type of object to update or create. The following types are currently supported for both `Create` and `Update` operations:
    - SMS Template
    - SMS Campaign
    - List
    - Contact

  The SMS object type is supported for the `Create` operation only.

#### Input Metadata

Fields are dynamically generated based on the selected `Object Type`.

#### Output Metadata

The result object from the create or update operation.