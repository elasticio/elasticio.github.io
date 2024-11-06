---
title: Looker Studio component
layout: component
section: Service components
description: Looker Studio is designed to implement the Looker Studio API.
icon: looker-studio.png
icontext: Looker Studio component
category: looker-studio
ComponentVersion: 1.0.0
updatedDate: 2024-11-07
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Make Raw Request](#make-raw-request)

## Description

Looker Studio is designed to implement the following API:
- [Looker Studio API](https://developers.google.com/looker-studio/integrate/api/reference)

## Credentials

Looker Studio component uses the OAuth 2.0 authentication protocol

Before building any integration flow you must at first configure the app from inside the [Google Developers Console](https://console.cloud.google.com/) and [Google Admin Console](https://admin.google.com/)
1. Go to the `APIs & Services` -> `Enabled APIs & services` page and enable the following:
- Looker Studio API
2. Go to the `OAuth consent screen` section and create a new OAuth consent screen.
- Choose `Internal`
- Fill out required fields, click `Save`
3. Go to the `Credentials` section and create a new credential of type  `OAuth client ID`.
- Set Application type to `Web application`
- Add Authorized redirect URI as: `https://{your-tenant-address}/callback/oauth2`
4. Configure `domain-wide delegation` with the OAuth Client ID of the app and the Scopes required by the app. The following steps must be completed by a Google Workspace admin:
- Sign in to your Google Admin console and [navigate](https://developers.google.com/cloud-search/docs/guides/delegation) to `domain wide delegation`
- In API clients, click `Add new`
- Enter the Client ID of the app to authorize
- Enter all OAuth scopes required by the app. The following scopes are commonly requested if using the Looker Studio API to manage assets:
`https://www.googleapis.com/auth/datastudio`
`https://www.googleapis.com/auth/userinfo.profile`

Now you can create new credentials for component:
* **Type** (dropdown, required) - `OAuth2`
* **Choose Auth Client** (dropdown, required) - select one of created before or `Add New Auth Client`:
  * **Name** (string, required) - provide any name you want
  * **Client ID** (string, required) - put here `Client ID` from `Web application` in `Google Developers Console`
  * **Client Secret** (string, required) - put here `Client Secret` from `Web application` in `Google Developers Console`
  * **Authorization Endpoint** (string, required) - Google oauth2 authorization endpoint `https://accounts.google.com/o/oauth2/auth`
  * **Token Endpoint** (string, required) - Google refresh token endpoint `https://oauth2.googleapis.com/token`
* **Name Your Credential** (string, required) - provide any name you want
* **Scopes (Comma-separated list)** (string, required) - Put here scopes to get access to your Looker Studio - `https://www.googleapis.com/auth/datastudio`
* **Additional parameters (Comma-separated list)** (string, required) - set it as `access_type:offline,prompt:consent` to make component works properly
* **Number of retries** (number, optional, 5 by default) - How many times component should retry to make request 
* **Delay between retries** (number ms, optional, 10000 by default) - How much time wait until new try

## Actions 

### Make Raw Request 

Executes custom request.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PATCH`.
* **Request Body** - (object, optional): Body of the request to send.

Input message example:
```json
{
  "method": "GET",
  "url": "/assets:search?assetTypes=REPORT"
}
```

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.