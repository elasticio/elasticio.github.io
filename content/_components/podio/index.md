---
title: Podio component
layout: component
section: CRM components
description: Podio component is designed to implement the Podio API.
icon: podio.png
icontext: Podio component
category: podio
ComponentVersion: 1.0.0
updatedDate: 2025-06-03
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Make Raw Request](#make-raw-request)

## Description

Podio component is designed to implement the following API:
- [Podio API](https://developers.podio.com/)

## Credentials

Podio component uses the OAuth 2.0 authentication protocol

Before building any integration flow you must first configure the app:
1. In your Podio account go to `My Account` - `Account Settings` - `API keys`
2. Under the `API Key Generator` section input:
- **Application name (displayed in stream byline)**: The name of your app.
- **Full domain (without protocol) of your return URL (e.g. mypodioapp.com)**: The URL of the tenant on the integration platform you are using. E.g. {your-tenant-address}. You don't have to specify the full callback URL like the most of the components require (`https://{your-tenant-address}/callback/oauth2`). You only need the domain, without `https://` and without `/callback/oauth2`.
- Click `Generate API key`. This will give you Client ID and Client Secret.

Now you can create new credentials for the component on the platform:
* **Type** (dropdown, required) - `OAuth2`
* **Choose Auth Client** (dropdown, required) - select one of created before or `Add New Auth Client`:
  * **Name** (string, required) - provide any name you want
  * **Client ID** (string, required) - put here `Client ID` from the Podio credentials
  * **Client Secret** (string, required) - put here `Client Secret` from the Podio credentials
  * **Authorization Endpoint** (string, required) - Podio authorization endpoint `https://podio.com/oauth/authorize`
  * **Token Endpoint** (string, required) - Podio refresh token endpoint `https://podio.com/oauth/token`
* **Name Your Credential** (string, required) - provide any name you want
* **Scopes (Comma-separated list)** (string, required) - Put here scopes to get access to your Podio account - `https://developers.podio.com/authentication/scopes`. Note that omitting to specify the scope parameter or giving it an empty value is equivalent to requesting access to the Global scope with all permissions or: `global:all`
* **Additional parameters (Comma-separated list)** (string, required) - set it as `access_type:offline,prompt:consent` to make component works properly
* **Number of retries** (number, optional, 5 by default) - How many times component should retry to make request 
* **Delay between retries** (number ms, optional, 10000 by default) - How much time wait until new try

## Actions 

### Make Raw Request 

Executes custom request.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `DELETE`, `POST`, `PUT`.
* **Request Body** - (object, optional): Body of the request to send.

Input message example:
```json
{
  "method": "GET",
  "url": "/user"
}
```

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.