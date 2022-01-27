---
title: Hubspot component
layout: component
section: Marketing-related components
description: A component that connects to Hubspot API
icon: hubspot.png
icontext: Hubspot component
category: hubspot
updatedDate: 2021-12-22
ComponentVersion: 1.4.1
redirect_from:
  - /components/hubspot-component
  - /components/hubspot-component/actions
  - /components/hubspot-component/triggers
---

## General information

{{page.description}}

### Environment variables

|Name|Mandatory|Description|Values|
|----|---------|-----------|------|
|`REQUEST_MAX_RETRY`| false | Set how many time system try to make request to API on errors (3 by default) | any `integer` above 0|

## Credentials

Authentication occurs via OAuth 2.0. To make OAuth work, you need to
[create a new OAuth2 App](creating-oauth-app-for-hubspot) in your Hubspot.

During the credentials creation you can either select existing OAuth2 Client
from the drop-down list or [choose to create a new OAuth2 Client](creating-oauth-app-for-hubspot)
to use your created OAuth2 App in HubSpot.

![Oauth2](img/hubspot-credentials-screen.png)

* Leave the **Additional parameters** input empty unless you have specifically configured this field in your HubSpot.
* Provide the following value in the **Scopes** input: `crm.objects.contacts.read`, `crm.objects.contacts.write`, `crm.schemas.contacts.read`, `crm.schemas.contacts.write`, `crm.objects.owners.read`. If you wish to grant certain permissions, you can do so by removing them from this list.

To complete the process:

*   click on **Authenticate** button - if you have not logged into Hubspot before, then log in by entering data in the login window that appears
*   click on **Verify** button for verifying your credentials
*   click on **Save** button for saving your credentials.

## Triggers

### Get New and Updated Objects

### Configuration Fields

*   **Object Type** drop-down: Indicates Object Type to be fetched
*   **Emit behavior** drop-down: Indicates emit objects individually or emit by page
*   **Field to poll** drop-down: Indicates field to poll (new objects or modified objects)
*   **Start Time** - Text field (string, optional): Indicates the beginning time to start retrieving events from
*   **End Time** - Text field (string, optional, defaults to never): If provided, don’t fetch records modified after this time
*   **Size of Polling Page** - Text field (optional, positive integer, max 100, defaults to 100): Indicates the size of pages to be fetched
*   **Single Page per Interval** - Checkbox: Indicates that if the number of changed records exceeds the maximum number of results in a page, instead of fetching the next page at once, wait until the next flow start to fetch the next page

### Webhook

Receive data from HubSpot based on configured [webhooks](https://developers.hubspot.com/docs/api/webhooks)

### Configuration Fields

*   **Client secret** - You need provide Client secret from HubSpot application here
> You will get error during webhook requests if this field will be incorrect

#### Output Metadata

Triggered object from HubSpot

## Actions

### Raw Request

Action to call any Hubspot API endpoint

#### Configuration Fields

*   **Throw Error on 404 Response** - (optional) Treat 404 HTTP responses as errors, defaults to `false`.

#### Input Metadata

*   **URL** - Path of the resource relative to the URL base ([https://api.hubapi.com](https://api.hubapi.com)), required.
*   **Method** - Allowed values `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, required. HTTP verb to use in the request.
*   **Request Body** - Body of the request to send

### Upsert

Action to make upsert(update/create) object in Hubspot

#### Configuration Fields

*   **Object type** - Object type for upsert ("Companies", "Contacts", "Deals", "Line Items", "Tickets")
*   **ID to Search On** - Id to search object ("Hubspot Id" or "Email". "Email" is only for "Contacts" `Object Type`)

#### Input Metadata

Dynamically generated

For each custom file field, an object is generated to upload the custom file
to populate that field. That object includes the following:

*   Attachment URL (URL containing the file contents to upload)
*   Folder Path
*   File Name
*   Charset Hunch
*   Access
*   TTL
*   Overwrite
*   Duplicate Validation Strategy
*   Duplicate Validation Scope

For uploading file [Files API](https://developers.hubspot.com/docs/api/files/files) is used.

#### Known limitations

Please, don't use platform attachments url
(like `http://steward-service.platform.svc.cluster.local:8200/v2/objects/xxxxx`)
for fields `Attachment URL`. The component will throw an exception `process.uncaughtException`.

### Lookup Set Of Objects By Unique Criteria

Action to lookup object in Hubspot.
Lookup Set will make sure all the items in the set should be there, otherwise throw an error.

#### Configuration Fields

*   **Object type** - Object type for lookup ("Companies", "Contacts", "Deals", "Line Items", "Tickets", "Quotes")
*   **ID to Search On** - Identification to search object ("Hubspot Id" or "Email". "Email" is only for "Contacts" `Object Type`)
*   **Enable download attachments** - Checkbox for enabling downloading attachments from fields with type `file`

#### Input Metadata

An array where each item is an ID

### Lookup Object (at most one)

Action designed to lookup one object by unique field

#### Configuration Fields

*   **Object Type** drop-down: Indicates Object Type to find
*   **ID to Search On** drop-down: Indicates unique field to search on
*   **Allow ID to be omitted** Checkbox: When selected, the ID field becomes optional, otherwise it is a required field
*   **Allow zero results** Checkbox: When selected, if zero results are returned, the empty object {} is emitted, otherwise typically an error would be thrown.
*   **Enable download attachments** - Checkbox for enabling downloading attachments from fields with type `file`

#### Input Metadata

*   **ID value** Text field: value for `ID to Search On` (unique field value by itself)

### Lookup Objects (Plural)

Action to lookup objects in Hubspot

#### Configuration Fields

*   **Object Type** drop-down: Indicates Object Type to find
*   **Behaviour** drop-down with options: `Fetch all`, `Fetch page`, `Emit individually`, required
*   **Enable download attachments** - Checkbox for enabling downloading attachments from fields with type `file`

#### Input Metadata

*   **Search Criteria** Array: Search terms are to be combined with the AND operator. For each search term.

>**Please note:** HubSpot support up to three criteria

Example:
Records created after *'2021-10-01T03:30:17.883Z'* with property *'firstname'* contains *'Tony'*

```
["createdate GT 1633059017883", "firstname CONTAINS_TOKEN Tony"]
```

Supported operators:

| OPERATOR | DESCRIPTION |
| ---- | ------ |
| EQ | equal to |
| NEQ | not equal to |
| LT | less than |
| LTE | less than or equal to |
| GT | greater than |
| GTE | greater than or equal to |
| HAS_PROPERTY | has property value |
| NOT_HAS_PROPERTY | does not have property value |
| CONTAINS_TOKEN | contains token |
| NOT_CONTAINS_TOKEN | does not contain token |

If selected `Fetch page` additional metadata fields:
*   **Page Size** - Number of records to retrieve, limit - 100
*   **Page Number** - How many pages should be skipped
*   **Order** - Order direction, **ASCENDING** or **DESCENDING**

Order example:

```
'createdate DESCENDING'
```

#### Output Metadata

*   For `Fetch page`: An object with:
    *   key ***results*** that has an array as its value
    *   key ***totalCountOfMatchingResults*** which contains the total number of results (not just on the page) which match the search criteria
*   For `Fetch All`:  An object, with key ***results*** that has an array as its value
*   For `Emit Individually`:  Each object fill the entire message

### Create Association

#### Configuration Fields

*   **From Object Type** drop-down: Choose from which object needs to create association
*   **To Object Type** drop-down: Choose to what object

> **Please note**: Objects to associate are not dynamically retrieved, so please
> make sure in Hubspot documentation that selected objects can be associated.

#### Input Metadata

*   **From Object ID** - HubSpot id of object which needs to create association
*   **To Object ID** - id of associated object

#### Output Metadata

Object with key **statusCode** that represent result of request

### Remove Association

#### Configuration Fields

*   **From Object Type** drop-down: Choose from which object needs to remove association
*   **To Object Type** drop-down: Choose to what object

> **Please note:** Objects to associate are not dynamically retrieved, so please
> make sure in Hubspot documentation that selected objects can be associated

#### Input Metadata

*   **From Object ID** - HubSpot id of object which needs to remove association
*   **To Object ID** - id of associated object

#### Output Metadata

Object with key **statusCode** that represent result of request

### Delete Object

Action designed to delete one object by unique field

#### Configuration Fields

*   **Object Type** drop-down: Indicates Object Type to find
*   **ID to Search On** drop-down: Indicates unique field to search on

#### Input Metadata

* **ID value** text field: value for `ID to Search On` (unique field value by itself)

#### Output Metadata

The expected output is an object with a `id` property. `id` value stands for id of delete object.


## Known Limitations

1. [Rate Limits](https://developers.hubspot.com/docs/api/usage-details#rate-limits)
2. Please, use some timer (around 5sec) if you are going to implement flow like `Upsert Object Action` -> any type of `Lookup Object(s) Action` with enabled feature `Enable download attachments`. Uploading the file to Hubspot on `Upsert Object Action` takes some time, so it is possible to receive `404` error on lookup.
