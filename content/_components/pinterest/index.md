---
title: Pinterest Component
layout: component
section: Service components
description: Pinterest Component is designed to interact with Pinterest REST API
icon: pinterest.png
icontext: Pinterest Component
category: pinterest
ComponentVersion: 1.0.0
updatedDate: 2023-12-29
---

## Description

Pinterest Component is designed to interact with [Pinterest REST API](https://developers.pinterest.com/docs/api/v5/). The current release of the component supports API version `5`, tested on `5.11.0`.


### Credentials

To get the credentials you need to [Set up an app](https://developers.pinterest.com/docs/getting-started/set-up-app/)

Component credentials configuration fields:
- **Type** (dropdown, required) - `OAuth2` or `No Auth` for Sandbox.
- **Choose Auth Client** (dropdown, required) - Select one of the created before or `Add New Auth Client`:
    - **Name** (string, required) - provide any name you want.
    - **Client ID** (string, required) - put here `App ID` of your application.
    - **Client Secret** (string, required) - put here `App Secret Key`.
    - **Authorization Endpoint** (string, required) - Pinterest oauth2 authorization endpoint `https://www.pinterest.com/oauth/`.
    - **Token Endpoint** (string, required) - Pinterest refresh token endpoint `https://api.pinterest.com/v5/oauth/token`
- **Name Your Credential** (string, required) - provide any name you want.
- **Scopes (Comma-separated list)** (string, required) - Put here the scopes required to access Pinterest - e.g. `boards:read,pins:read,user_accounts:read`, [more info](https://developers.pinterest.com/docs/getting-started/scopes/).
> **Note**: To Verify credentials you need at least `user_accounts:read scope`.

- **Additional parameters (Comma-separated list)** (string, required) - leave it blank.
- **OpenAPI JSON file location** - (string, optional): OpenAPI description of Pinterest's REST API in JSON format (By default component uses the local file version: `5.11.0`) (ex: `https://raw.githubusercontent.com/pinterest/api-description/main/v5/openapi.json`).
- **Sandbox access token** - (string, optional): Must be empty for OAuth2! For `No Auth` this field is mandatory, Sandbox API will be used instead of the production.

>**Warning:** To maintain a smooth experience, we recommend reusing stored credentials where possible. Duplicating secrets across OAuth clients can result in errors and complications.


## Triggers
This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.


## Actions

### Make API call

This action is used to call any Pinterest endpoint.

#### Configuration Fields

- **Select an endpoint** - (dropdown, required): Select one of the available endpoints, ex: `GET /pins` *(List Pins)*
- **Enable pagination** - (optional, checkbox): If checked and an endpoint supports [pagination](https://developers.pinterest.com/docs/getting-started/pagination/), the component will automatically go through all pages and emit all of them one by one.

#### Input Metadata

Each field is auto-generated based on the endpoint selected:

- **Parameters from the path** - (object, optional): Required fields to build a correct path with, for example, if the endpoint looks like this `/boards/{board_id}/pins`, it will be `board_id`.

- **Request parameters** - (string, optional): Additional parameters for the request.

- **Request body** - (string, optional): A request body if the endpoint supports it.

#### Output Metadata

Here will be the response body.

### Make Raw Request

Executes custom request.

#### Configuration Fields

- **Don't throw error on 404 Response** - (optional, boolean): Do not treat 404 HTTP responses as an error, defaults to `false`.

#### Input Metadata

- **URL** - (string, required): Path of the resource relative to the base URL.
- **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
- **Request Body** - (object, optional): Body of the request to send.

**Output Metadata**
- **Status Code** - (number, required): HTTP status code of the response.
- **HTTP headers** - (object, required): HTTP headers of the response.
- **Response Body** - (object, optional): HTTP response body.
