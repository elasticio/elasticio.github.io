---
title: Mercado Pago component
layout: component
section: Utility components
description: A component that connects to Mercado Pago API.
icon: mercado.png
icontext: Mercado component
category: mercado
updatedDate: 2022-02-25
ComponentVersion: 1.0.0
---

## Credentials

* **App Token** (string, required) - Mercado Pago token

## Triggers

### Get New And Updated Objects Polling

Polls Mercado API for new and updated objects.

#### Configuration Fields

* **Object Type** - (required, dropdown) Currently supported only `Payments` object.
* **Time stamp field to poll on** - (required, dropdown) Indicates just new or modified items: `Created` or `Modified`.
* **The External Reference** - (required, dropdown) Needed for the search objects, ID given by the merchant in their system.

#### Input Metadata

Input metadata is absent for triggers

#### Output Metadata

Output metadata is generated dynamically and depends on Object Type (for payments see [Response parameters](https://www.mercadopago.com.ar/developers/en/reference/payments/_payments_search/get))

## Actions

### Make Raw Request

Executes custom request

#### Configuration Fields

* **Throw error on 404 Response** - (сheckbox) Treat 404 HTTP responses as errors.

#### Input Metadata

* **Url** - (string, required) Path of the resource relative to the URL base (https://api.mercadopago.com), required.
* **Method** - (string, required) Allowed values `GET`, `POST`, `PUT`, `PATCH`, `DELETE`. HTTP verb to use in the request.
* **Request Body** - (object, optional) Body of the request to send

#### Output Metadata

* **Status Code** - (number, required) HTTP status code of the response, required.
* **HTTP headers** - (object, required) HTTP headers.
* **Response Body** - (object, optional) HTTP response body.

### Lookup Object (at most 1)

Lookup an object by unique criteria

#### Input field description

* **Object type to Lookup** - (dropdown, required) List where you should choose the object type, which you want to lookup. Currently available values: `Payments`.
* **Search Criteria** - (dropdown, required) List where you should choose the criteria with which you want to lookup.
* **Allow criteria to be omitted** - (checkbox, optional), if checked - `Input for the search ID` can be omitted and the empty object will be returned, else - `Input for the search ID` is required.
* **Allow zero results** - (checkbox, optional), if checked and nothing is found - empty object will be returned, else - action throws an error.

#### Metadata description

* **Input for the search ID** - `string`, value for `Search Criteria`

#### Output field description

The matching object
