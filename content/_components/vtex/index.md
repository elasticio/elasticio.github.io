---
title: Vtex component
layout: component
section: Utility components
description: The Vtex iPaaS component that connects to VTEX API
icontext: Vtex component
icon: vtex.png
category: vtex
updatedDate: 2022-02-11
ComponentVersion: 1.0.0
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

* **Url** - (string, required) Path of the resource relative to the URL base (https://api.hubapi.com), required.
* **Method** (string, required) - Allowed values `GET`, `POST`, `PUT`, `PATCH`, `DELETE`. HTTP verb to use in the request.
* **Request Body** - (object, optional) Body of the request to send

#### Output Metadata

* **Status Code** - (number, required) HTTP status code of the response, required.
* **Response Body** - (object, optional) HTTP response body.
