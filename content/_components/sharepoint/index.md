---
layout: component
title: SharePoint component
section: Office components
description: The SharePoint Component allows you to interact with your SharePoint Online environment via the Microsoft Graph API.
icon: sharepoint.png
icontext: SharePoint component
category: sharepoint
ComponentVersion: 1.0.0
updatedDate: 2026-01-28
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Triggers](#triggers)
  * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
* [Actions](#actions)
  * [Delete Object By ID](#delete-object-by-id)
  * [Lookup Object By Unique Criteria](#lookup-object-by-unique-criteria)
  * [Lookup Objects (plural)](#lookup-objects-plural)
  * [Make Raw Request](#make-raw-request)
  * [Upsert Object](#upsert-object)
* [Known Limitations](#known-limitations)

## Description

The SharePoint Component allows you to interact with your SharePoint Online environment via the Microsoft Graph API. This component enables operations such as retrieving, creating, updating, and deleting objects within your SharePoint sites and document libraries.

## Credentials

To build an integration flow, you must first register an OAuth 2.0 application in Azure Active Directory (Azure AD):

1. Sign in to the [Azure Portal](https://portal.azure.com/) with an account that has administrative privileges.
2. Navigate to **Azure Active Directory** → **App registrations** → **New registration**.
3. Provide the details:
   - **Name** – any label that helps you recognize the client (e.g., "SharePoint Integration App").
   - **Supported account types** – choose based on your needs (usually "Accounts in this organizational directory only").
   - **Redirect URI** – set to `https://{your-tenant-address}/callback/oauth2`, where `{your-tenant-address}` is the domain of your integration platform. Select **Web** as the platform type.
4. Click **Register** to create the application.
5. Configure API permissions:
   - In the registered application's overview page, select **API permissions** → **Add a permission**.
   - Choose **Microsoft Graph** → **Delegated permissions**.
   - Add the following permissions based on your needs:
     - `Sites.Read.All` – read sites and lists (required for read operations).
     - `Sites.ReadWrite.All` – read and write sites, lists, and list items (required for write operations).
     - `Files.Read.All` – read files in all site collections.
     - `Files.ReadWrite.All` – read and write files in all site collections.
   - Click **Add permissions**, then click **Grant admin consent for {Your Organization}** to grant the permissions.
6. Create a client secret:
   - Navigate to **Certificates & secrets** → **New client secret**.
   - Provide a description and set an expiration period.
   - Click **Add** and copy the generated **Client Secret** value immediately (it won't be displayed again).
7. Note the **Application (client) ID** from the application's overview page.

After the OAuth client exists, configure the component credentials:

* **Type** (dropdown, required) – `OAuth2`.
* **Choose Auth Client** (dropdown, required) – pick the previously created client or choose `Add New Auth Client` and supply:
  * **Name** – any label.
  * **Client ID** – the Application (client) ID from Azure AD.
  * **Client Secret** – the Client Secret from Azure AD.
  * **Authorization Endpoint** – `https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/authorize`, where `{tenant-id}` is your Azure AD tenant ID (found in Azure AD → Overview → Tenant ID, or you can use `common` for multi-tenant apps).
  * **Token Endpoint** – `https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token`, using the same `{tenant-id}`.
  * **Scope** – `https://graph.microsoft.com/.default` (for application permissions) or specific delegated permissions like `https://graph.microsoft.com/Sites.Read.All https://graph.microsoft.com/Sites.ReadWrite.All`.
* **Number of retries** (number, optional, default `5`) – how many times requests are retried when throttled.
* **Delay between retries** (number, optional, default `10000`) – wait time in milliseconds before the next retry.
* **Name Your Credential** (string, required) – any label that helps you identify the credential.

> **Important:** The scopes configured in the **Scope** field must match the permissions granted to your Azure AD application. Mismatched or insufficient scopes will result in authentication errors or permission denied errors when executing operations.

For more information about registering an application in Azure AD, refer to the [Microsoft documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).

## Triggers

### Get New and Updated Objects Polling

Polls SharePoint for objects that have been created or updated after the snapshot time. Results can be emitted one-by-one or as pages.

#### Configuration Fields

* **Site ID** (string, required) – the unique identifier of the SharePoint site to monitor.
* **Object Type** (dropdown, required) – the type of SharePoint object to poll on (e.g., `Base Site Pages`).
* **Time stamp field to poll on** (dropdown, optional, default `Last Modified`) – which date/time field to evaluate (e.g., `lastModifiedDateTime`).
* **Start Time** (string, optional) – ISO 8601 timestamp for the initial poll; defaults to `1970-01-01T00:00:00Z` when omitted. Format: `YYYY-MM-DD[T]HH:MM:SS[Z]`.
* **Size of Polling Page** (number, optional, default `100`) – number of records to request per API call; must be between 1 and 100 (reduced to 10 in debug/sample flows).
* **Emit Behavior** (dropdown, optional, default `Emit individually`) – choose `Emit individually` to output each record separately or `Emit page` to output pages of results.

#### Output Metadata

* **Emit individually** – identical to the `Lookup Objects` response for the selected object type.
* **Emit page** – `{ results: [...] }` where `results` is an array with the same structure as the individual emit records.

#### Snapshot Behavior

The trigger stores the latest seen value of the selected time stamp field. The next run starts strictly after that timestamp (plus one second when no new data was found) to avoid duplicate emissions.

## Actions

### Delete Object By ID

Deletes a single object from SharePoint by its unique identifier (ID).

#### Configuration Fields

* **Object Type** (dropdown, required) – the type of SharePoint object to delete. Options include: `List`, `List Item`, `Site Column`, `List Column`, `Base Site Page`, `Drive Item`.

#### Input Metadata

* **ID Value** (string, required) – the unique identifier of the object to delete.
* Additional fields may be required depending on the object type:
  * For `Drive Item`: **Site ID** (required for soft delete) or **Drive ID** (required for permanent delete).
  * **Delete Permanently** (boolean, optional, for `Drive Item`) – whether to permanently delete the drive item.

#### Output Metadata

* **ID Value** (string, required) – identifier of the record that was deleted.

### Lookup Object By Unique Criteria

Retrieves a single object from SharePoint using unique lookup criteria (ID, title, path, etc.).

#### Configuration Fields

* **Object Type** (dropdown, required) – the type of SharePoint object to query. Options include: `Site`, `List`, `List Item`, `Site Column`, `List Column`, `Base Site Page`, `Drive`, `Drive Item`.
* **Lookup Criteria** (dropdown, required) – the unique field to use for looking up the object. Available options depend on the selected object type:
  * Most object types: `ID`.
  * `List`: `ID` or `Title`.
  * `Drive Item`: `ID` or `Path`.
  * `Drive`: `ID` or `default` (Site's default Drive).

#### Input Metadata

* **Lookup Criteria Value** (string, required) – the value of the selected lookup criteria field. Not required when **Lookup Criteria** is `default` for `Drive`.
* Additional fields may be required depending on the object type and lookup criteria:
  * For `Drive` with `default`: **Site ID** (required).
  * For various object types: **Site ID**, **List ID**, or other context identifiers as needed.

#### Output Metadata

The output message contains a single object with properties specific to the selected object type. Common fields include:

* **id** (string) – unique identifier for the record.
* **name** (string) – name of the object.
* **createdDateTime** (string, date-time) – creation timestamp.
* **lastModifiedDateTime** (string, date-time) – last modification timestamp.
* Additional fields depend on the object type.

For `Drive Item` objects, if **Download To Maester** is enabled and the item has a download URL, the output will include an **internalUrl** field pointing to the file stored in Maester storage.

### Lookup Objects (plural)

Retrieves multiple objects from SharePoint. Can emit records individually or as pages.

#### Configuration Fields

* **Object Type** (dropdown, required) – the type of SharePoint object to query. Options include: `Sites`, `Lists`, `List Items`, `Site Columns`, `List Columns`, `Base Site Pages`, `Content Types`, `Drives`, `Drive Folder Contents`.
* **Emit Behavior** (dropdown, optional, default `Emit individually`) – determines how records are emitted:
  * `Emit individually` – each record is emitted as a separate message.
  * `Emit All` – all records are emitted in a single message as an array.

#### Input Metadata

The input schema is dynamically generated based on the selected object type and typically includes:

* Context fields as needed (e.g., **Site ID**, **List ID**, **Drive ID**, **Folder Path**).
* **Query Parameters** (object, optional) – OData query parameters including:
  * `top` (Page Size, string, optional, default `100`) – maximum number of records to return per request. Must be between 1 and 100.
  * `filter`, `orderby`, `select`, `expand` – additional OData query parameters as needed.
  * **Note:** These parameters are automatically sent to the Microsoft Graph API with the `$` prefix (e.g., `top` becomes `$top`, `filter` becomes `$filter`).
* For `Drive Folder Contents`: **Download To Maester** (string, enum, optional) – whether to download files to Maester storage.

#### Output Metadata

The output structure depends on the selected **Emit Behavior**:

* **Emit individually**: Each output message contains a single object with properties specific to the selected object type. Common fields include:
  * **id** (string) – unique identifier for the record.
  * **name** (string) – name of the object.
  * **createdDateTime** (string, date-time) – creation timestamp.
  * **lastModifiedDateTime** (string, date-time) – last modification timestamp.
  * Additional fields depend on the object type.

* **Emit All**: Each output message contains an object with:
  * **results** (array) – array of objects with the same structure as described above for individual emit.

For `Drive Folder Contents` with **Download To Maester** enabled, items with download URLs will include an **internalUrl** field in the output.

### Make Raw Request

Sends a custom HTTP request to the Microsoft Graph API. Use this action when you need functionality not covered by prebuilt actions.

#### Configuration Fields

None.

#### Input Metadata

* **URL** (string, required) – path of the resource relative to the base URL. This is the part of the path that comes after `https://graph.microsoft.com/v1.0`.
* **Method** (string, required) – HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
* **Request Body** (object, optional) – body of the request to send.

#### Output Metadata

* **Status Code** (number, required) – HTTP status code of the response.
* **Headers** (object, required) – HTTP headers of the response.
* **Response Body** (object, optional) – HTTP response body.

### Upsert Object

Creates a new record or updates an existing one depending on the selected operation and the presence of a record ID.

#### Configuration Fields

* **Operation** (dropdown, required) – choose `Create` to insert a new record or `Update` to modify an existing record. When `Update` is selected, an **ID Value** field becomes mandatory in the input metadata.
* **Object Type** (dropdown, required) – SharePoint entity to create or update. Options include:
  * For `Create`: `List`, `List Item`, `Site Column`, `List Column`, `Drive Item (Metadata)`, `Drive Item (Content)`.
  * For `Update`: `List Item`, `Site Column`, `List Column`, `Drive Item (Metadata)`, `Drive Item (Content)`.

#### Input Metadata

The schema is generated dynamically based on the selected object type and operation. It contains all writable fields for that entity. Common fields include:

* **ID Value** (string) – required when **Operation** is `Update`; ignored when `Create` is selected.
* **Site ID** (string, required) – the unique identifier of the SharePoint site.
* **List ID** (string, conditional) – required for list-related objects.
* Context fields as needed (e.g., **Drive ID**, **Parent ID**, **Filename**, **Folder Path**).
* **Fields** (object, optional) – an object containing field values to set. When provided, these fields will be merged with the top-level fields.
* **Conflict Behavior** (string, optional, for drive items) – how to handle conflicts: `fail`, `replace`, or `rename`.
* For `Drive Item (Content)`:
  * **File URL** (string, conditional) – URL of the file to upload (required if **Text Content** is not provided).
  * **Text Content** (string, conditional) – text content to upload (required if **File URL** is not provided).

**Note:** For `Drive Item (Content)`, the `Create` operation creates a new file, while the `Update` operation replaces the content of an existing file.

#### Output Metadata

Matches the record returned by Microsoft Graph after the upsert. Common fields include `id`, `name`, `createdDateTime`, `lastModifiedDateTime`, and any other properties available on the selected object type.

#### Examples

**Example 1: Create Drive Item (Metadata) - Create a Folder**

```json
{
  "siteId": "1234567890abc",
  "parentId": "root",
  "name": "My New Folder",
  "description": "A folder for organizing documents",
  "folder": {},
  "conflictBehavior": "rename"
}
```

**Example 2: Update Drive Item (Metadata) - Update File Metadata**

```json
{
  "siteId": "1234567890abc",
  "idValue": "01ABC123DEF456GHI789",
  "name": "Updated Document.pdf",
  "description": "Updated description for the document"
}
```

**Example 3: Create List**

```json
{
  "siteId": "1234567890abc",
  "displayName": "Project Tasks",
  "description": "A list to track project tasks and milestones",
  "list": {
    "template": "genericList",
    "hidden": false
  }
}
```

## Known Limitations

1. For `List Items` object type in the polling trigger, **List ID** must be provided in addition to **Site ID**.
2. When authenticating credentials, you must have an active Azure AD session and the registered application must have the appropriate permissions granted.
3. File size limits: When downloading files to Maester storage, files must not exceed the platform's file size limits.
4. Drive item creation (using `Create` operation with `Drive Item (Content)` object type) only supports files up to 250 MB in size.
5. Drive item permanent deletion requires the **Drive ID** to be provided and uses a POST request to the drive item's permanent delete endpoint.
6. **Concurrent login limitations**: Microsoft Graph API has restrictions when multiple users attempt to authenticate simultaneously using the same account credentials. This is a Microsoft-imposed limitation and cannot be resolved at the component level. If credentials become invalid or corrupted when multiple users log in concurrently from the same account, this is expected behavior due to Microsoft's authentication token management system. 