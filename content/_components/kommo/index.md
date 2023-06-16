---
title: Kommo component
layout: component
section: CRM components
description: A component that connects to Kommo CRM API
icon: kommo.png
icontext: Kommo component
category: kommo
updatedDate: 2023-05-22
ComponentVersion: 1.0.0
---

## API version

Current release of component tested on API `v4`.

## Credentials

First you must create an integration:

1. Go to your CRM admin panel `https://{your-account}.kommo.com/`
2. Open `Settings` and press `+ CREATE INTEGRATION` button in right upper corner
3. Fill up necessary fields:
    * `Redirect URL` as: `https://{your-tenant-address}/callback/oauth2`
    * `Allow access:` at least `Access to account data`
    Other fields as you wish
    
4. Press `Save` button
6. Open `Keys and scopes` tab, here you will need following information to create credentials for component:
    * `Integration ID:` is represent of `Client ID` for component
    * `Secret key:` is represent of `Client Secret` for component


Now you can create new credentials for the component:

* **Type** (dropdown, required) - `OAuth2`
* **Choose Auth Client** (dropdown, required) - select one of created before or `Add New Auth Client`:
  * **Name** (string, required) - provide any name you want
  * **Client ID** (string, required) - put here `Integration ID`
  * **Client Secret** (string, required) - put here `Secret key`
  * **Authorization Endpoint** (string, required) - Kommo authorization endpoint `https://www.kommo.com/oauth`
  * **Token Endpoint** (string, required) - Kommo refresh token endpoint `https://{your-account}.kommo.com/oauth2/access_token`, replace `{your-account}` with your account
* **Name Your Credential** (string, required) - provide any name you want
* **Base URL** (string, required) - Put here your installation address - `https://{your-account}.kommo.com/`, replace `{your-account}` with your account
* **Number of retries** (number, optional, 5 by default, maximum 10) - How many times component should retry to make request

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Make Raw Request

Executes custom request.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL - `https://{your-account}.kommo.com/api/v4/`
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.
