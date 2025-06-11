---
title: HubSpot component
layout: component
section: CRM components
description: Hubspot Component is designed to connect to the Hubspot API.
icon: hubspot.png
icontext: Hubspot component
category: hubspot
updatedDate: 2025-06-06
ComponentVersion: 1.6.3
redirect_from:
  - /components/hubspot-component
  - /components/hubspot-component/actions
  - /components/hubspot-component/triggers
---

## Table of Contents

* [General information](#general-information)
  * [Description](#description)
  * [Completeness Matrix](/components/hubspot/technical-notes.html#completeness-matrix)
  * [Environment variables](#environment-variables)
* [Credentials](#credentials)
* [Triggers](#triggers)
  * [Get New and Updated Objects](#get-new-and-updated-objects)
  * [Deprecated triggers](#webhook-deprecated)
* [Actions](#actions)
  * [Raw Request](#raw-request)
  * [Upsert Object](#upsert-object)
  * [Lookup Set Of Objects By Unique Criteria](#lookup-set-of-objects-by-unique-criteria)
  * [Lookup Object (at most one)](#lookup-object-at-most-one)
  * [Lookup Objects (Plural)](#lookup-objects-plural)
  * [Create Association](#create-association)
  * [Remove Association](#remove-association)
  * [Delete Object](#delete-object)
* [Known Limitations](#known-limitations)

## General information

### Description

Hubspot Component is designed to connect to the [Hubspot API](https://developers.hubspot.com/docs/reference/api/overview).

### Environment variables

| Name | Mandatory | Description | Values |
|----|---------|-----------|------|
| `REQUEST_MAX_RETRY` | false | Specifies how many times the system retries a failed API request (default: 3) | any `integer` above 0 |
|`RENEW_LIMIT`| false | Maximum number of records retrieved by the `Get New and Updated Objects` trigger before advancing the start date (default: 9800) | any `integer` above 0 and less 10000|

## Credentials

HubSpot component authentication occurs via OAuth 2.0. Before you can make it work on our platform you MUST create an OAuth2 App on HubSpot side.

The HubSpot documentation already contains a detailed explanation of the process and we encourage you to [follow it](https://developers.hubspot.com/docs/api/working-with-oauth).

> **Please Note:** After granting access, you should be redirected back to our platform via a `redirect_url`. To do this, you will need to provide our [OAuth Callback Redirect URL](/guides/oauth-callback-redirect-url).

{% include img.html max-width="100%" url="img/hubspot-credentials-screen.png" title="Oauth2" %}

**1.** During the OAuth2 App creation you would need to select an existing Auth Client from the drop-down list **Choose Auth Client** or create the new one. Next you MUST specify the following fields:

| Field name | Mandatory | Description |
|----|---------|-----------|
|Name| true | A name for your Auth Client (can be any value) |
|Client ID| true | OAuth Client ID (provided by HubSpot) |
|Client Secret| true | OAuth Client Secret (provided by HubSpot) |
|Authorization Endpoint| true | OAuth authorization endpoint. ex: <br>`https://app-eu1.hubspot.com/oauth/authorize`
|Token Endpoint| true | OAuth Token endpoint for refreshing the access token: <br>`https://api.hubapi.com/oauth/v1/token`|

{% include img.html max-width="100%" url="img/auth-settings.png" title="Hubspot Auth settings" %}

**2.**  Fill-in the field **Name Your Credential** (any).

{% include img.html max-width="50%" url="img/hubspot-oauth2.png" title="OAuth2" %}

**3.**  Fill-in the field **Scopes** like: 
```
crm.objects.contacts.read crm.objects.contacts.write crm.schemas.contacts.read oauth
```
{% include img.html max-width="100%" url="img/scopes.png" title="Hubspot scopes" %}

> **Please Note:** 
  * Scopes must be the same as provided during app creation in Hubspot, use a space-separated list (not comma-separated).
  * The scope `oauth` is always required for verification and must be included in the scopes list for all app installs.
  * The required scopes for your integration depend on the types of HubSpot objects your flow will access. You must ensure that all scopes necessary to access the specific object types you want to retrieve or modify are included in this list.
  * **Required scopes** must always be included in the OAuth `scope` parameter for your app to work correctly.
  * **Conditionally required** scopes depend on which HubSpot objects or features your app accesses. For instance, if your flow retrieves contacts, you must include contact-related scopes like `crm.objects.contacts.read`.

{% include img.html max-width="100%" url="img/credential-scopes.png" title="Credential scopes" %}

**4.**  Click on **Authenticate** button - if you have not logged into HubSpot before, then log in by entering data in the login window that appears

**5.** Click on **Verify** button for verifying your credentials

**6.** Click on **Save** button for saving your credentials.

>**Warning:** To maintain a smooth experience, we recommend reusing stored credentials where possible. Duplicating secrets across OAuth clients can result in errors and complications.

### User Permissions

The user who authorizes the component (i.e., logs in during the OAuth flow) must have the necessary HubSpot user permissions to access the HubSpot objects your flow will handle.

To verify and manage user permissions, users can refer to the official [HubSpot guide on user permissions and roles](https://knowledge.hubspot.com/user-management/hubspot-user-permissions-guide).

If the authorizing user lacks permissions for certain objects, your flow may fail or return authorization errors.

## Triggers

### Get New and Updated Objects

Retrieves new or modified objects in HubSpot based on a polling mechanism.

### Configuration Fields

* **Object Type** Dropdown: Specifies the type of object to retrieve.
* **Emit behavior** Dropdown: Determines whether to emit each object individually or emit them in a batch (by page).
* **Field to poll** Dropdown: The field to use for detecting new or updated records.
* **Start Time** - TextField (string, optional): The starting point in time to begin retrieving events.
* **End Time** - TextField (string, optional, defaults to never): If set, records modified after this time will not be retrieved.
* **Size of Polling Page** - TextField (optional, positive integer, max 100, defaults to 100): Indicates the size of pages to be fetched.
* **Single Page per Interval** - Checkbox: When selected, if the number of records exceeds the page limit, the connector will wait until the next polling interval to fetch additional pages. This is ignored if `Max Amount of Polling Pages` is set.
* **Max amount of Polling Pages** - TextField (optional, positive integer, max 1000, defaults to 1000): Maximum number of pages to fetch per execution.

#### Input Metadata

None

#### Output Metadata

- For `Fetch page`: An object with a ***results*** key containing an array of records.
- For `Emit Individually`: Each object fills the entire message.

#### Limitations

After retrieving **9800** records, the connector will take the highest value of the selected Field to Poll from the last polling page and use it as the `Start Time` for the next polling cycle.
Records with exactly that timestamp will be excluded from the current iteration and included in the next one to avoid duplicates and ensure no records are missed.

### Webhook (deprecated)

> This trigger is deprecated. Please use [HubSpot Webhook component](/components/hubspot-webhook/) instead.

Receive data from HubSpot based on configured [webhooks](https://developers.hubspot.com/docs/api/webhooks).

### Configuration Fields

**Client secret** - Provide Client secret from HubSpot application here otherwise you will get an error during the webhook requests in case of incorrect or missing value.

#### Output Metadata

Triggered object from HubSpot.

## Actions

### Raw Request

Executes custom request.

{% include img.html max-width="100%" url="img/raw-request.png" title="Raw Request" %}

#### Configuration Fields

* **Throw Error on 404 Response** - (optional) Configures the handling of 404 HTTP responses as non-errors. The default is `false`.

#### Input Metadata

* **Url** - Path of the resource relative to the base URL (https://api.hubapi.com), required.
* **Method** - Allowed values are `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, required. HTTP verb to use in the request.
* **Request Body** - The body content for the request.

### Upsert Object

Performs an upsert (update or create) operation on an object in HubSpot.

{% include img.html max-width="100%" url="img/upsert-object.png" title="Upsert" %}

#### Configuration Fields

* **Object type** - The type of object to upsert ("Companies", "Contacts", "Deals", "Line Items", "Tickets")
* **ID to Search On** - Choose the field used for identification (e.g., "HubSpot ID", "Email").
>**Please Note:** "Email" is valid only for the Contacts object type.

#### Input Metadata

Metadata is generated dynamically based on the selected object type and fields.

For each custom file field, an input object is generated to upload a file for that field. The object includes the following fields:

* Attachment URL (URL containing the file contents to upload)
* Folder Path
* File Name
* Charset Hunch
* Access 
* TTL 
* Overwrite 
* Duplicate Validation Strategy 
* Duplicate Validation Scope

Files are uploaded using the [Hubspot Files API](https://developers.hubspot.com/docs/api/files/files).

### Lookup Set Of Objects By Unique Criteria

Looks up a set of objects in HubSpot using a unique field.
All specified items must be found, otherwise, an error will be thrown.

{% include img.html max-width="100%" url="img/lookup-set-of-objects.png" title="Lookup Set Of Objects By Unique Criteria" %}

#### Configuration Fields

* **Object type** - Select the object type to look up ("Companies", "Contacts", "Deals", "Line Items", "Tickets", "Quotes").
* **ID to Search On** - Choose the field used for identification (e.g., "HubSpot ID", "Email").
>**Please Note:** "Email" is valid only for the Contacts object type.
* **Enable download attachments** -  Enable downloading of attachments from fields of type `file`.

#### Input Metadata

An array of ID values to look up.

#### Output Metadata

Returns the matched objects.

### Lookup Object (at most one)

Retrieves a single object from HubSpot using a unique field.

{% include img.html max-width="100%" url="img/lookup-object-at-most-one.png" title="Lookup Object (at most one)" %}

#### Configuration Fields

* **Object Type** Dropdown: Select the type of object to look up.
* **ID to Search On** Dropdown: Select the unique field used for lookup.
* **Allow ID to be omitted** Checkbox: When enabled, the ID field becomes optional. If disabled, the field is required.
* **Allow zero results** Checkbox: When enabled, an empty object {} is emitted if no match is found. If disabled, an error will be thrown when no results are found.
* **Enable download attachments** - Enable downloading of attachments from fields of type `file`.

#### Input Metadata

**ID value** Text field: The value to use for the ID to Search On field (must be a unique value).

#### Output Metadata

Returns the matched object, or an empty object {} if no match is found and Allow zero results is enabled.

### Lookup Objects (Plural)

Lookups a set of objects based on a defined list of criteria. The results can be emitted in different ways.

{% include img.html max-width="100%" url="img/lookup-objects.png" title="Lookup Objects (Plural)" %}

#### Configuration Fields

* **Object Type** Dropdown: Select the type of object to search for.
* **Behaviour** Dropdown with options: `Fetch all`, `Fetch page`, `Emit individually`, required.
* **Enable download attachments** - Enable downloading of attachments from fields of type `file`.

#### Input Metadata

**Search Criteria** Array: An array of search terms combined using the `AND` operator.

> **Please note:** HubSpot support up to three criteria.

Example:
Records created after `2021-10-01T03:30:17.883Z` with property `firstname` containing `Tony`.

```
["createdate GT 1633059017883", "firstname CONTAINS_TOKEN Tony"]
```

Supported operators:

| OPERATOR | DESCRIPTION |
| ---- | ------ |
| `EQ` | equal to |
| `NEQ` | not equal to |
| `LT` | less than |
| `LTE` | less than or equal to |
| `GT` | greater than |
| `GTE` | greater than or equal to |
| `HAS_PROPERTY` | has property value |
| `NOT_HAS_PROPERTY` | does not have property value |
| `CONTAINS_TOKEN` | contains token |
| `NOT_CONTAINS_TOKEN` | does not contain token |

If selected `Fetch page` additional metadata fields:
*   **Page Size** - Number of records to retrieve, limit - 100.
*   **Page Number** - Number of pages to skip.
*   **Order** - Order direction, **ASCENDING** or **DESCENDING**

Order example:

```
'createdate DESCENDING'
```

#### Output Metadata

*   For `Fetch page`: An object with:
    *   key `results` that has an array as its value.
    *   key `*totalCountOfMatchingResults` containing the total number of results (not just on the page) matching the search criteria.
*   For `Fetch All`:  An object, with key `*results` that has an array as its value.
*   For `Emit Individually`:  Each object fill the entire message.

### Create Association

Creates an association between two HubSpot objects.

{% include img.html max-width="100%" url="img/create-associations.png" title="Create Association" %}

#### Configuration Fields

*   **From Object Type** dropdown: Choose an object type to create association.
*   **To Object Type** dropdown: Choose an object type to associate to.

> **Please note**: We do not retrieve objects to associate dynamically. Check the
> HubSpot documentation to verify that the association between selected objects is possible.

#### Input Metadata

*   **From Object ID** - HubSpot id of object which needs to create association.
*   **To Object ID** - id of associated object.

#### Output Metadata

Object with `statusCode` key that represent result of request.

### Remove Association

Removes an association between two HubSpot objects.

{% include img.html max-width="100%" url="img/remove-associations.png" title="Remove Association" %}

#### Configuration Fields

*   **From Object Type** dropdown: Choose from which object to remove association.
*   **To Object Type** dropdown: Choose to which object.

> **Please note**: We do not retrieve objects to associate dynamically. Check the
> HubSpot documentation to verify that the association between selected objects is possible.

#### Input Metadata

*   **From Object ID** - HubSpot id of object which needs to remove association.
*   **To Object ID** - id of associated object.

#### Output Metadata

Object with `statusCode` key that represent result of request.

### Delete Object

Deletes a single object using a unique identifier.

{% include img.html max-width="100%" url="img/delete-object.png" title="Delete Object" %}

#### Configuration Fields

*   **Object Type** dropdown: Indicates Object Type to find.
*   **ID to Search On** dropdown: Indicates unique field to search on.

#### Input Metadata

**ID value** text field: value for `ID to Search On` (unique field value by itself).

#### Output Metadata

The expected output is an object with a `id` property. `id` value stands for id of delete object.

## Known Limitations

1.  [Rate Limits](https://developers.hubspot.com/docs/api/usage-details#rate-limits).
2.  Please, use a timer (around 5 seconds) if you need to build a flow like `Upsert Object Action` -> any type of `Lookup Object(s) Action` with enabled feature `Enable download attachments`. Uploading the file to HubSpot on `Upsert Object Action` takes some time, your might get `404` error on lookup.
