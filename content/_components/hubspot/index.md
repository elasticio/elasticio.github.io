---
title: Hubspot component
layout: component
section: Utility components
description: A component that connects to Hubspot API
icon: hubspot.png
icontext: Hubspot component
category: hubspot
updatedDate: 2021-10-01
ComponentVersion: 1.0.0
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

This component has no trigger functions. This means it will not be selectable as the first component in an integration flow.

## Actions

### Raw Request

Action to call any Hubspot API endpoint

#### Config Fields

* **Throw Error on 404 Response** - Treat 404 HTTP responses as errors.

#### Input Metadata

* **URL** - Path of the resource relative to the URL base (https://api.hubapi.com), required.
* **Method** - Allowed values `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, required. HTTP verb to use in the request.
* **Request Body** - Body of the request to send
