---
title: Square component
layout: component
section: CRM components
description: The Square component is designed to facilitate interaction with the Square API.
icon: square.png
icontext: Square component
category: Square component
updatedDate: 2025-09-18
ComponentVersion: 1.1.0
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Triggers](#triggers)
  * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
  * [Webhook](#webhook)
* [Actions](#actions)
  * [Lookup Objects (plural)](#lookup-objects-plural)
  * [Make Raw Request](#make-raw-request)

## Description

The Square component is designed to facilitate interaction with the [Square API](https://developer.squareup.com/reference/square).

This component has been tested with API version `2024-06-04`.

## Credentials

To use this component, you will need to [obtain a personal access token](https://developer.squareup.com/docs/build-basics/access-tokens#get-a-personal-access-token).

Component credentials configuration fields:

- **Access token** (string, required): Provide your `Sandbox` or `Production` access token here.
- **Environment** (dropdown, required): Select the desired environment.
- **Square Version** (string, optional): Specify the version here. If left blank, the component will default to `2024-06-04`.

## Triggers

### Get New and Updated Objects Polling

Retrieves all the created or updated objects within a given time range.

> **Please Note:** This trigger fetches all records for the selected object type and filters them in memory. For large datasets, this may lead to performance issues. Please ensure your account has appropriate API usage limits.

#### Configuration Fields

* **Object Type** - (dropdown, required): Type of object to poll on. Currently supported types are:
  * Customers
  * Catalog Objects
  * Catalog Items
  * Catalog Item Variations
  * Payments

* **Poll Config** - (dropdown, required): Select the date field to track changes.
* **Emit behavior** - (dropdown, optional): Indicates emit objects behavior - `Emit individually` (by default) or `Emit page`.
* **Size of Polling Page** - (optional, positive integer, defaults to 100, min 1, max 100): Indicates the size of pages to be fetched.
* **Start Time** - (string, optional): The timestamp, in ISO8601 format, to start polling from (exclusive). The default value is the beginning of time (January 1, 1970 at 00:00.000).

#### Input Metadata

None.

#### Output Metadata

- For `Fetch page`: An object with key ***results*** that has an array as its value.
- For `Emit Individually`:  Each object fills the entire message.

### Webhook

Creates a [subscription](https://developer.squareup.com/docs/webhooks/webhook-subscriptions-api) in Square for selected events and receives them.

### Configuration Fields

- **Events** - (multiselect dropdown, required): Select the events to subscribe to.
- **Name of the Webhook** - (string, optional): Specify a name for your webhook. This can help you identify it in the Square UI. If not provided, the name will default to "Flow {flow_id}".
- **API version** - (string, required): The Square API version that will be used to send events to the component. If left blank, the component will use the version specified in the credentials or default to `2024-06-04`.

#### Input Metadata

None

#### Output Metadata
The selected event from the subscription.

#### Limitations
- If you use an ordinary flow ([`real-time`](/guides/realtime-flows.html) not enabled), after the flow starts, you will need to run it once. Just follow the webhook URL (to trigger the first execution). This action will create a subscription.

## Actions

### Lookup Objects (Plural)

Lookups a set of objects based on a defined list of criteria. The results can be emitted in different ways.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to look up. The currently supported types are:
  - Customers
  - Catalog Objects
  - Payments

* **Emit Behavior** - (dropdown, optional): Specifies how the resulting objects will be emitted, either as `Emit All` or `Emit Individually`.

#### Input Metadata

A dynamically generated list of available criteria.

#### Output Metadata

For `Emit All` mode: An object with the key `results`, which contains an array as its value.
For `Emit Individually` mode: Each object fills the entire message.

### Make Raw Request

Executes a custom request.

#### Configuration Fields

- **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses as non-errors. Defaults to `false`.

#### Input Metadata

- **Url** - (string, required): The relative path of the resource, appended to the base URL `https://connect.squareup.com/v2/` (or `https://connect.squareupsandbox.com/v2/` for Sandbox).
- **Method** - (string, required): The HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
- **Request Body** - (object, optional): The body of the request to send.

#### Output Metadata
- **Status Code** - (number, required): The HTTP status code of the response.
- **HTTP Headers** - (object, required): The HTTP headers of the response.
- **Response Body** - (object, optional): The HTTP response body.