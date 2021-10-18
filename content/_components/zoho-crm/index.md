---
layout: component
title: Zoho CRM component
section: Marketing-related components
description: A component that connects to Zoho-crm API.
category: zoho-crm
icon: zoho-crm.png
icontext: Zoho CRM component
ComponentVersion: 1.0.0
updatedDate: 2021-10-15
---

## General information

### Environment variables

|Name|Mandatory|Description|Values|
|----|---------|-----------|------|
|`REQUEST_MAX_RETRY`| false | Set how many time system try to make request to API on errors (3 by default) | min: 0, max: 10 |

## Credentials

Authentication occurs via OAuth 2.0.

In order to make OAuth work, you need a new Client in your Zoho Developer Console.

More information you can find [here](https://api-console.zoho.com).

For creating Auth Client you should specify following fields:

|Field name|Mandatory|Description|
|----|---------|-----------|
|Client Name| true | your Auth Client's name (any) |
|Homepage URL| true | https://{installation-url}|
|Authorized Redirect URIs| true | https:/{installation-url}/callback/oauth2 |

You will receive next fields: `Client ID`, `Client Secret`

In order to setup created Auth Client on Elastic.io platform you should click on `Add New Auth Client`, and fill next fields:
* **Name** -  Name your Auth Client's name (any)
* **Client ID** - Your `Client ID` from Zoho Developer Console
* **Client Secret** - Your `Client Secret` from Zoho Developer Console |
* **Authorization Endpoint** - Zoho Accounts URL-based auth url + parameter `access_type` with value `offline` (needed for refresh token to be present).

[Documentation](https://www.zoho.com/crm/developer/docs/api/v2/access-refresh.html). Examples:
- For US: https://accounts.zoho.com/oauth/v2/auth?access_type=offline
- For AU: https://accounts.zoho.com.au/oauth/v2/auth?access_type=offline
- For EU: https://accounts.zoho.eu/oauth/v2/auth?access_type=offline
- For IN: https://accounts.zoho.in/oauth/v2/auth?access_type=offline
- For CN: https://accounts.zoho.com.cn/oauth/v2/auth?access_type=offline
* **Token Endpoint** - Zoho Accounts URL-based token url. [Documentation](https://www.zoho.com/crm/developer/docs/api/v2/access-refresh.html). Examples:
- For US: https://accounts.zoho.com/oauth/v2/token
- For AU: https://accounts.zoho.com.au/oauth/v2/token
- For EU: https://accounts.zoho.eu/oauth/v2/token
- For IN: https://accounts.zoho.in/oauth/v2/token
- For CN: https://accounts.zoho.com.cn/oauth/v2/token

Save client and then:
- [provide scopes](https://www.zoho.com/crm/developer/docs/api/v2/scopes.html). `ZohoCRM.modules.ALL` is recommended as default
- click on ``Authenticate`` - login (if needed) and provide access
- click on ``Verify`` button for verifying your credentials
- click on ``Save`` button for saving your credentials

## Trigger

This component has no trigger functions. This means you can not select it as a first
component during the integration flow design.

## Actions

### Raw Request

Action to call any Zoho-crm API endpoint

>**Please Note**: when you are trying to get some object by id, in case no object found - Zoho API will return empty body and statusCode 204

#### Config Fields

#### Input Metadata

* **Url** - Path of the resource relative to the URL base (https://api.hubapi.com), required.
* **Method** - Allowed values `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, required. HTTP verb to use in the request.
* **Request Body** - Body of the request to send
