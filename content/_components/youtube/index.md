---
title: Youtube component
layout: component
section: Service components
description: Youtube Component is designed to implement the Youtube Data API.
icon: youtube.png
icontext: Youtube component
category: youtube
ComponentVersion: 1.0.0
updatedDate: 2024-11-07
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
    * [Make Raw Request](#make-raw-request)

## Description
Youtube Component is designed to implement the [Youtube Data API](https://developers.google.com/youtube/v3).

## Credentials
Youtube component uses the OAuth 2.0 authentication protocol

Before building your first integration flow you must configure the app from inside the [Google Developers Console](https://console.cloud.google.com/). 
- Go to the `APIs & Services` -> `Enabled APIs & services` page and enable the `Youtube API`
- Go to the `Credentials` section and create a new credential of type  `OAuth client ID`
- Set Application type to `Web application`
- Add Authorized redirect URI as: `https://{your-tenant-address}/callback/oauth2`


During credentials creation you would need to:
- select `OAuth2` drop-down list ``Type``.
- select existing Auth Client from drop-down list ``Choose Auth Client`` or create the new one.
  For creating Auth Client you should specify following fields:

| Field name             | Mandatory | Description                                     |
|------------------------|-----------|-------------------------------------------------|
| Name                   | true      | your Auth Client's name                         |
| Client ID              | true      | your OAuth Client ID                            |
| Client Secret           | true      | your OAuth Client Secret                        |
| Authorization Endpoint | true      | set: `https://accounts.google.com/o/oauth2/auth` |
| Token Endpoint         | true      | set: `https://oauth2.googleapis.com/token`       |

- **Scopes (Comma-separated list)** (string, required) - Put here scopes to get access to your Youtube - e.g. `https://www.googleapis.com/auth/youtube`, [more info](https://developers.google.com/identity/protocols/oauth2/scopes#youtube)
- **Additional parameters (Comma-separated list)** (string, required) - set it as `access_type:offline,prompt:consent` to make component works properly

## Actions
### Make Raw Request
Executes custom request to the plain REST API. Follow the docs to learn how to build a REST request:
- https://developers.google.com/youtube/v3/docs
  You might also want to read about the following parts of a request (of a query):
- [Parts](https://developers.google.com/youtube/v3/getting-started#part)
- [Fields](https://developers.google.com/youtube/v3/getting-started#fields)

#### Configuration Fields
* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata
* **Url** - (string, required): Path of the resource relative to the base URL.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
* **Headers** - (object, optional): Headers of the request to send.
* **Request Body** - (object, optional): Body of the request to send.

Input message example:
```json
{
  "method": "GET",
  "url": "/channels?part=snippet&mine=true"
}
```

#### Output Metadata
* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.