---
title: Quickbooks component
layout: component
section: Finance-related components
description: QuickBooks is a software to manage sales and expenses, and keep track of daily transactions.
icon: quickbooks.png
icontext: Quickbooks component
category: quickbooks
updatedDate: 2024-10-02
ComponentVersion: 1.0.0
---

# QuickBooks Component

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Triggers](#triggers)
  * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
* [Actions](#actions)
  * [Make Raw Request](#make-raw-request)
* [Known Limitations](#known-limitations)
* [Additional info](#additional-info)

## Description
QuickBooks Component is designed to interact with [QuickBooks Online Accounting API](https://developer.intuit.com/app/developer/qbo/docs/get-started)

## Credentials
Quickbooks service uses OAuth 2.0 authorization. [More Info](https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/oauth-2.0)

Below are the steps to obtain and configure your QuickBooks credentials:
1. Create a QuickBooks Developer Account
- Navigate to [QuickBooks Developer Portal](https://developer.intuit.com/app/developer/homepage).
- Sign up or log in with your Intuit Developer account.
2. Create an App:
- Once logged in, go to the `Dashboard` section.
- Click `Create an App` and choose `QuickBooks Online and Payments` as the platform.
- Fill in the required details for your app.
3. Obtain API Keys. After creating the app, you'll have access to the following credentials in your app's settings:
- Client ID: This is the unique identifier for your application.
- Client Secret: A confidential key used to authenticate your app.
- Redirect URI: URL where users will be redirected after authentication.
4. Set Redirect URIs
- Add Authorized redirect URI as: `https://{your-tenant-address}/callback/oauth2`

To configure Production Credentials go to your app's settings and click `Production Settings` -> `Keys & credentials`

Now you can create new credentials for the component:
* **Type** (dropdown, required) - `OAuth2`
* **Choose Auth Client** (dropdown, required) - select one of created before or `Add New Auth Client`:
  * **Name** (string, required) - provide any name you want
  * **Client ID** (string, required) - put here `Client ID` from `Keys & credentials` section
  * **Client Secret** (string, required) - put here `Client Secret` from from `Keys & credentials` section
  * **Authorization Endpoint** (string, required) - QuickBooks authorization endpoint `https://appcenter.intuit.com/connect/oauth2`
  * **Token Endpoint** (string, required) - QuickBooks refresh token endpoint `https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer`
* **Name Your Credential** (string, required) - provide any name you want
* **Scopes (Comma-separated list)** (string, required) - Put here needed scopes - `com.intuit.quickbooks.accounting`. [More info](https://developer.intuit.com/app/developer/qbo/docs/learn/scopes)
* **Company ID** (string, required) - ID of the company you want to access.
* **Environment** (dropdown, required) - Select the environment: sandbox (development) or production.
* **Minor API version** (string, oprional) - This field represents current API [minor version](https://developer.intuit.com/app/developer/qbo/docs/develop/explore-the-quickbooks-online-api/minor-versions#minor-version-summary).
* **Number of retries** (number, optional, 5 by default) - How many times component should retry to make request
* **Delay between retries** (number ms, optional, 10000 by default) - How much time wait until new try

## Triggers

### Get New and Updated Objects Polling

Retrieve all the updated objects within a given time range.

#### Configuration Fields
* **Object Type** - (dropdown, required): Select one of the available object types to pull on.
* **Time stamp field to poll on** - (dropdown, required): Select the date field to track changes.
* **Emit Behavior** - (dropdown, optional, default `Emit individually`): Defines the way result objects will be emitted, one of `Emit page` or `Emit individually`.
* **Page Size** - (number, optional, defaults to 100, max 100): Indicates the size of pages to be fetched per request.
* **Start Time** - (string, optional): The timestamp, in ISO8601 format, to start polling from (inclusive). The default value is the beginning of time (January 1, 1970 at 00:00.000).

#### Input Metadata

None.

#### Output Metadata

- For `Fetch page`: An object with key ***results*** that has an array as its value
- For `Emit Individually`:  Each object fill the entire message

## Actions

### Make Raw Request

Executes custom request.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `DELETE`, `PATCH`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

## Known limitations

1. The QuickBooks API has some limitations for a request number:
- Sandbox servers: Throttled at 100 requests per minute, per individual app.
- Production servers: Throttled to 500 requests per minute, per realm ID.
[More info on limitations](https://developer.intuit.com/app/developer/qbpayments/docs/learn/rest-api-features#limits-and-throttles)

2. Metadata
Most field of Quick Books entities are optionally required - they are NOT marked in EIO web so be careful and
check the QB [docs](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/account)
before building a request.

## Additional info

[QuickBooks Online REST API documentation](https://developer.intuit.com/app/developer/qbo/docs/learn/explore-the-quickbooks-online-api)

[All entities, fields and parameters provided by QuickBooks Online API](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/account)
