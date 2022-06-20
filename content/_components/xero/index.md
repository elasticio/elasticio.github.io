---
title: Xero component
layout: component
section: Finance-related components
description: iPaaS component that connects to Xero API
icon: xero.png
icontext: Xero component
category: xero
ComponentVersion: 1.0.0
updatedDate: 2022-06-20
---

## Requirements

### Environment variables

|Name|Mandatory|Description|Values|
|----|---------|-----------|------|
|`REQUEST_MAX_RETRY`| false | Set how many time system try to make request to API on errors (3 by default) | any `integer` above 0|
|`REQUEST_RETRY_DELAY`| false | Delay between retry attempts in milliseconds (1000 by default) | any `integer` above 0|
|`REQUEST_TIMEOUT`| false | HTTP requests timeout in milliseconds (120000 by default) | any `integer` above 0|
|`BASE_URL`| false | Base url for Xero API, `https://api.xero.com/` by default | any `string` |

### Credentials

Authentication occurs via OAuth 2.0.
In order to make OAuth work, you need a new App in your [Xero developer account](https://developer.xero.com/) - go to `My Apps`, press `New app` button, provide following information:
* **App name** - Any as you want
* **Integration type** - Web app
* **Company or application URL** - Provide iPaaS installation url
* **Redirect URI** - Same as above, but with additional `/callback/oauth2` at the end, [more info](/guides/oauth-callback-redirect-url)

After app is created, go to `Configuration` section where you can find `Client id` and generate `Client secret`. this fields required to component works

When you finish preparing application, you be able to add new Credentials on platform:
* Select existing Auth Client from drop-down list `Choose Auth Client` or create the new one:

#### Add Auth Client
    * **Name** - (string, required) Any as you want
    * **Client ID** - (string, required) Provide by Xero app
    * **Client Secret** - (string, required) Provide by Xero app
    * **Authorization Endpoint** - (string, required) Url to Xero authorization - `https://login.xero.com/identity/connect/authorize`
    * **Token Endpoint** (string, required) - Url to Xero refresh token - `https://identity.xero.com/connect/token`
* **Name Your Credential** - (string, required) Any as you want
* **Scopes** - (string, required) Provide list with needed data that you want to be able to have access, [full list and description](https://developer.xero.com/documentation/guides/oauth2/scopes), minimum required list - `openid, profile, email, offline_access`

* click on ``Authenticate`` button - if you have not logged in Hubspot before, then log in by entering data in the login window that appears
* click on ``Verify`` button for verifying your credentials (it use request to [/connections](https://developer.xero.com/documentation/guides/oauth2/auth-flow/#5-check-the-tenants-youre-authorized-to-access))
* click on ``Save`` button for saving your credentials

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Make Raw Request

Executes custom request

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, checkbox) Treat 404 HTTP responses not as error, defaults to `false`
* **Tenant** - (required, dropdown) Select tenant you want to make request

#### Input Metadata

* **Url** - (string, required) Path of the resource relative to the base URL
* **Method** - (string, required) HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
* **Request Body** - (object, optional) Body of the request to send

#### Output Metadata

* **Status Code** - (number, required) HTTP status code of the response
* **HTTP headers** - (object, required) HTTP headers of the response
* **Response Body** - (object, optional) HTTP response body
