---
title: Xero component
layout: component
section: Finance-related components
description: iPaaS component that connects to Xero API
icon: xero.png
icontext: Xero component
category: xero
ComponentVersion: 1.2.2
updatedDate: 2022-11-04
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

### Add Auth Client

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

### Get Updated Objects Polling

Retrieve all the updated objects within a given time range.

#### Configuration Fields

* **Object Type** - (string, required): Object-type to lookup on. E.g `Invoices`.
* **Start Time** - (string, optional): The timestamp, in ISO8601 format, to start polling from (inclusive). Default value is the beginning of time (January 1, 1970 at 00:00.000).
* **End Time** - (string, optional): The timestamp, in ISO8601 format, to end at (inclusive). Default value is never.

## Actions

### Lookup Object (at most one)

Lookup a single object by a selected field that uniquely identifies it.

#### Configuration Fields

* **Tenant** - (required, dropdown): Select tenant you want to make request
* **Object Type** - (string, required): Object-type to lookup on. E.g `Users`.
* **Lookup Criteria** - (object, required): A list of object parameters that can uniquely identify the object in the database.
* **Allow criteria to be omitted** - (boolean, optional): If selected field `Lookup Criteria Value` becomes optional.
* **Allow zero results** - (boolean, optional): When selected, if the object is not found - an empty object will be returned instead of throwing error.
* **Include attachments** - (optional, checkbox): If selected, system will include all object attachments as array in `Attachments` key
* **Upload attachments to platform** - (optional, checkbox) If selected, system will include all object attachments as array in `Attachments` key and upload them to platform storage, original Xero url will be saved as `OriginalUrl`

#### Input Metadata

* **Lookup Criteria Value** - (string, required unless `Allow criteria to be omitted` is selected): Value for unique search criteria in `Lookup Criteria` configuration field.

#### Output Metadata

`result` object with result of lookup as value.

### Lookup Objects (plural)

Lookup a set of object by defined criteria list. Can be emitted in different way.

#### Configuration Fields

* **Object Type** - (string, required): Object-type to lookup on
* **Emit Behavior** - (dropdown, required): Defines the way result objects will be emitted, one of `Emit all`, `Emit page` or `Emit individually`
* **Tenant** - (required, dropdown): Select tenant you want to make request
* **Include attachments** - (optional, checkbox): If selected, system will include all object attachments as array in `Attachments` key
>**Please Note:** there will be additional request for each object which has attachments

* **Upload attachments to platform** - (optional, checkbox) If selected, system will include all object attachments as array in `Attachments` key and upload them to platform storage, original Xero url will be saved as `OriginalUrl`
>**Please Note:** there will be more additional requests for each object: get attachments from Xero, download each and upload it to platform

#### Input Metadata

* **Search Criteria** - (array, optional): Search terms are to be combined with the AND operator, represent [Xero](https://developer.xero.com/documentation/api/accounting/requests-and-responses#http-get) `Where` filter, example:

```
    ["Contact.ContactID = guid(\"96988e67-ecf9-466d-bfbf-0afa1725a649\")", "Type.StartsWith(\"ACC\")", "Date >= DateTime(2022, 06, 04)", "Date < DateTime(2022, 06, 05)"]
```    
* **Order by** - (array, optional): Ordering direction, example:

```
    ["Status asc", "Date desc"]
```

If selected `Emit Behavior` is `Emit page` additionally fields will be added:

* **Page Number** - (number, defaults to infinity): Indicates total pages to be fetched
* **Page Size** - (number, defaults to 100): Indicates number of objects pear page

#### Output Metadata

For `Emit All` or `Emit Page` mode: An object, with key `results` that has an array as its value.
For `Emit Individually` mode: Each object which fill the entire message.

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

### Upsert Object

Updates (of record found) or creates a new object.

#### Configuration Fields

* **Tenant** - (required, dropdown): Select tenant you want to make request
* **Object Type** - (dropdown, required): Object-type to upsert. E.g `Invoice`.

#### Input Metadata

* **[Object Type]ID** - (string, optional): ID of the object to upsert.
And dynamically generated fields according to chosen `Upsert Schema`.

> **Please Note:** to create object, minimum required fields needs to be filled:
  * `Invoice`: Type, Contact, LineItems
  * `Contact`: Name

> **Please also Note:** If object with provided ID not found, component create a new object

#### Output Metadata

Result object from upsert.

### Void approved invoices or bills

If an invoice has been AUTHORISED it cannot be deleted but you can set it's status to VOIDED

#### Configuration Fields

* **Tenant** - (dropdown, required) Select tenant you want to make request

#### Input Metadata

* **Invoice ID** - (string, required): Xero generated unique identifier for invoice

#### Output Metadata

* *Updated invoice*

## Known limitations

Please visite [Xero API limits](https://developer.xero.com/documentation/guides/oauth2/limits/)
