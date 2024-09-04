---
title: HubSpot component
layout: component
section: CRM components
description: A component that connects to HubSpot API
icon: hubspot.png
icontext: Hubspot component
category: hubspot
updatedDate: 2024-09-04
ComponentVersion: 1.6.1
redirect_from:
  - /components/hubspot-component
  - /components/hubspot-component/actions
  - /components/hubspot-component/triggers
---

# HubSpot component

## Table of Contents
* [General information](#general-information)
  * [Description](#description)
  * [Completeness Matrix](#completeness-matrix)
  * [Environment variables](#environment-variables)
* [Credentials](#credentials)
* [Triggers](#triggers)
  * [Get New and Updated Objects](#get-new-and-updated-objects)
  * [Deprecated triggers](#deprecated-triggers)
* [Actions](#actions)
  * [Raw Request](#raw-Request)
  * [Upsert](#upsert)
  * [Lookup Set Of Objects By Unique Criteria](#lookup-set-of-objects-by-unique-criteria)
  * [Lookup Object (at most one)](#lookup-object-at-most-one)
  * [Lookup Objects (Plural)](#lookup-objects-plural)
  * [Create Association](#create-association)
  * [Remove Association](#remove-association)
  * [Delete Object](#delete-object)
* [Known Limitations](#known-limitations)
## General information
### Description
[elastic.io](http://www.elastic.io;) iPaaS component that connects to Hubspot API
### Completeness Matrix
![image](https://user-images.githubusercontent.com/30211658/141339015-835ede31-70c7-49b6-afde-19dea8c0fc12.png)

[Completeness Matrix](https://docs.google.com/spreadsheets/d/1EBZNhv4VP9NUpsT1FNO89SKW2DHqe9DbrHRU8Kwjj8o/edit#gid=0)

### Environment variables

| Name | Mandatory | Description | Values |
|----|---------|-----------|------|
| `REQUEST_MAX_RETRY` | false | Set how many time system try to make request to API on errors (3 by default) | any `integer` above 0 |
| `RENEW_LIMIT` | false | Set biggest number of records in `Get New and Updated Objects` trigger before set new start date, 9800 by default | any `integer` above 0 and less 10000 |

## Credentials
Authentication occurs via OAuth 2.0.
In order to make OAuth work, you need a new App in your Hubspot.

More information you can find [here](https://developers.hubspot.com/docs/api/working-with-oauth).

After granting access, you should be redirected back to our platform via a `redirect_url`. To do this, you will need to provide our [OAuth Callback Redirect URL](https://docs.elastic.io/guides/oauth-callback-redirect-url.html).

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

![ksnip_20210924-154946](https://user-images.githubusercontent.com/7985390/134677237-b9aedd64-e7c0-4489-9125-f476cc129e31.png)
- fill field ``Name Your Credential`` (any)
- fill field ``Scopes`` - must be the same as provided during app creation in Hubspot, use space separated list (not comma), ``crm.objects.owners.read`` is required for verification
![ksnip_20210924-160402](https://user-images.githubusercontent.com/7985390/134678850-0a8880a7-fb98-4b2e-9dc0-560ae93364db.png)
![ksnip_20210924-160400](https://user-images.githubusercontent.com/7985390/134678845-eae59b7f-3e5d-4519-8353-a95b23926130.png)

- click on ``Authenticate`` button - if you have not logged in Hubspot before, then log in by entering data in the login window that appears
- click on ``Verify`` button for verifying your credentials
- click on ``Save`` button for saving your credentials

## Triggers
### Get New and Updated Objects
### Config Fields
 * **Object Type** Dropdown: Indicates Object Type to be fetched
 * **Emit behavior** Dropdown: Indicates emit objects individually or emit by page
 * **Field to poll** Dropdown: Indicates field to poll (new objects or modified objects)
 * **Start Time** - TextField (string, optional): Indicates the beginning time to start retrieving events from
 * **End Time** - TextField (string, optional, defaults to never): If provided, don’t fetch records modified after this time
 * **Size of Polling Page** - TextField (optional, positive integer, max 100, defaults to 100): Indicates the size of pages to be fetched
 * **Single Page per Interval** - Checkbox: Indicates that if the number of changed records exceeds the maximum number of results in a page, instead of fetching the next page immediately, wait until the next flow start to fetch the next page. This field will be ignored if `Max amount of Polling Pages` field is set.
 * **Max amount of Polling Pages** - TextField (optional, positive integer, max 1000, defaults to 1000): Indicates the maximum amount of pages to be fetched per execution

#### Output Metadata
- For `Fetch page`: An object with key ***results*** that has an array as its value
- For `Emit Individually`:  Each object fill the entire message

### Limitations
After reaching **9800** records flow will find largest `Field to poll` in last Polling Page and use it as `Start Time` for next iterations, results with this date will be excluded from that iteration and include in the next one

### Deprecated triggers

#### Webhook

❗This trigger is deprecated, please use Hubspot webhook component instead.

Receive data from HubSpot based on configured [webhooks](https://developers.hubspot.com/docs/api/webhooks)

##### Config Fields

 * **Client secret** - You need provide Client secret from HubSpot application here

 ❗You will get error during webhook requests if this field will be incorrect

##### Output Metadata

Triggered object from HubSpot

## Actions
### Raw Request
Action to call any Hubspot API endpoint
#### Config Fields

* **Throw Error on 404 Response** - (optional) Treat 404 HTTP responses as errors, defaults to `false`.

#### Input Metadata
* **Url** - Path of the resource relative to the URL base (https://api.hubapi.com), required.
* **Method** - Allowed values `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, required. HTTP verb to use in the request.
* **Request Body** - Body of the request to send

### Upsert
Action to make upsert(update/create) object in Hubspot
#### Config Fields

* **Object type** - Object type for upsert ("Companies", "Contacts", "Deals", "Line Items", "Tickets")
* **ID to Search On** - Identificator to search object ("Hubspot Id" or "Email". "Email" is only for "Contacts" `Object Type`)

#### Input Metadata
Dynamically generated

For each custom file field, it is generated an object to upload the custom file to populate that field. That object includes the following:

 * Attachment URL (URL containing the file contents to upload)
 * Folder Path
 * File Name
 * Charset Hunch
 * Access
 * TTL
 * Overwrite
 * Duplicate Validation Strategy
 * Duplicate Validation Scope

For uploading file [Files API](https://developers.hubspot.com/docs/api/files/files) is used.

### Lookup Set Of Objects By Unique Criteria
Action to lookup object in Hubspot.
Lookup Set will make sure all the items in the set should be there, otherwise throw an error.

#### Config Fields

* **Object type** - Object type for lookup ("Companies", "Contacts", "Deals", "Line Items", "Tickets", "Quotes")
* **ID to Search On** - Identification to search object ("Hubspot Id" or "Email". "Email" is only for "Contacts" `Object Type`)
* **Enable download attachments** - Checkbox for enabling downloading attachments from fields with type `file`

#### Input Metadata
An array where each item is an ID

### Lookup Object (at most one)
Action designed to lookup one object by unique field
#### Config Fields

* **Object Type** Dropdown: Indicates Object Type to find
* **ID to Search On** Dropdown: Indicates unique field to search on
* **Allow ID to be omitted** Checkbox: When selected, the ID field becomes optional, otherwise it is a required field
* **Allow zero results** Checkbox: When selected, if zero results are returned, the empty object {} is emitted, otherwise typically an error would be thrown.
* **Enable download attachments** - Checkbox for enabling downloading attachments from fields with type `file`

#### Input Metadata
* **ID value** Textfield: value for `ID to Search On` (unique field value by itself)


<br>

### Lookup Objects (Plural)
Action to lookup objects in Hubspot

#### Config Fields

* **Object Type** Dropdown: Indicates Object Type to find
* **Behaviour** Dropdown with options: `Fetch all`, `Fetch page`, `Emit individually`, required
* **Enable download attachments** - Checkbox for enabling downloading attachments from fields with type `file`

<br>

#### Input Metadata

* **Search Criteria** Array: Search terms are to be combined with the AND operator. For each search term.

❗HubSpot support up to three criteria

Example:
>
>
> Records created after *'2021-10-01T03:30:17.883Z'* with property *'firstname'* contains *'Tony'*
> ```
> ["createdate GT 1633059017883", "firstname CONTAINS_TOKEN Tony"]
> ```

Supported operators:

|OPERATOR|DESCRIPTION|
|----|------|
|EQ | equal to|
|NEQ | not equal to|
|LT | less than|
|LTE | less than or equal to|
|GT | greater than|
|GTE | greater than or equal to|
|HAS_PROPERTY | has property value|
|NOT_HAS_PROPERTY | does not have property value|
|CONTAINS_TOKEN | contains token|
|NOT_CONTAINS_TOKEN | does not contain token|

If selected `Fetch page` additional metadata fields:
* **Page Size** - Number of records to retrieve, limit - 100
* **Page Number** - How many pages should be skipped
* **Order** - Order direction, **ASCENDING** or **DESCENDING**

Order example:
>
> ```
> 'createdate DESCENDING'
> ```
<br>

#### Output Metadata
- For `Fetch page`: An object with:
  - key ***results*** that has an array as its value
  - key ***totalCountOfMatchingResults*** which contains the total number of results (not just on the page) which match the search criteria
- For `Fetch All`:  An object, with key ***results*** that has an array as its value
- For `Emit Individually`:  Each object fill the entire message


### Create Association

#### Config Fields

* **From Object Type** Dropdown: Choose from which object needs to create association
* **To Object Type** Dropdown: Choose to what object

❗*NOTE*: Objects to assosiate are not dinamically retrieved, so please make sure in Hubspot documentation that selected objects can be assosiated
#### Input Metadata
* **From Object ID** - HubSpot id of object which needs to create association
* **To Object ID** - id of associated object

#### Output Metadata
Object with key ***statusCode*** that represent result of request


### Remove Association

#### Config Fields

* **From Object Type** Dropdown: Choose from which object needs to remove association
* **To Object Type** Dropdown: Choose to what object

❗*NOTE*: Objects to assosiate are not dinamically retrieved, so please make sure in Hubspot documentation that selected objects can be assosiated
#### Input Metadata
* **From Object ID** - HubSpot id of object which needs to remove association
* **To Object ID** - id of associated object

#### Output Metadata
Object with key ***statusCode*** that represent result of request


### Delete Object
Action designed to delete one object by unique field
#### Config Fields

* **Object Type** Dropdown: Indicates Object Type to find
* **ID to Search On** Dropdown: Indicates unique field to search on

#### Input Metadata
* **ID value** Textfield: value for `ID to Search On` (unique field value by itself)

#### Output Metadata
The expected output is an object with a `id` property. `id` value stands for id of delete object.


# Known Limitations
1. [Rate Limits](https://developers.hubspot.com/docs/api/usage-details#rate-limits)
2. Please, use some timer (around 5sec) if you are going to implement flow like `Upsert Object Action` -> any type of `Lookup Object(s) Action` with enabled feature `Enable download attachments`. Uploading the file to Hubspot on `Upsert Object Action` takes some time, so it is possible to receive `404` error on lookup.
