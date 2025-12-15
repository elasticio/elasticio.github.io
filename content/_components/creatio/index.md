---
layout: component
title: Creatio component
section: CRM components
description: The Creatio component allows you to interact with your Creatio account via API.
icon: creatio.png
icontext: Creatio component
category: creatio
ComponentVersion: 1.0.0
updatedDate: 2025-12-15
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Triggers](#triggers)
  * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
* [Actions](#actions)
  * [Delete Object By ID](#delete-object-by-id)
  * [Lookup Object By ID](#lookup-object-by-id)
  * [Lookup Objects (plural)](#lookup-objects-plural)
  * [Make Raw Request](#make-raw-request)
  * [Upsert Object](#upsert-object)
* [Known Limitations](#known-limitations)

## Description

{{page.description}}

## Credentials

To build an integration flow, you must first register an OAuth 2.0 application in your Creatio CRM environment:

1. Sign in with a system administrator account, click the gear icon to open `System Designer`, then go to `Import and integration` → `OAuth 2.0 integrated applications`.
2. Click `New` → `On behalf of a user`.
3. Provide the details:
   - **Name** – any label that helps you recognise the client.
   - **Application URL** – url of an application.
   - **Description** – description for the credentials.
4. Then specify the [Redirect URI](/guides/oauth-callback-redirect-url.html) as `https://{your-tenant-address}/callback/oauth2`, where `{your-tenant-address}` is the domain of your integration platform.
5. Save the record and copy the generated **Client Id** and **Client secret**.

After the OAuth client exists, configure the component credentials:

* **Type** (dropdown, required) – `OAuth2`.
* **Choose Auth Client** (dropdown, required) – pick the previously created client or choose `Add New Auth Client` and supply:
  * **Name** – any label.
  * **Client ID** – value copied from Creatio.
  * **Client Secret** – value copied from Creatio.
  * **Authorization Endpoint** – `https://{your-creatio-domain}/0/connect/authorize`.
  * **Token Endpoint** – `https://{your-creatio-domain}/0/connect/token`.
   * **Scope** – `offline_access,ApplicationAccess_{ID}`; ID can be found at `System Designer` → `Lookups` → `OAuth resources`.
* **Instance URL** (string, required) – the instance URL of your Creatio environment, e.g. `https://123-crm-bundle.creatio.com`.
* **Number of retries** (number, optional, default `5`) – how many times requests are retried when throttled.
* **Delay between retries** (number, optional, default `10000`) – wait time in milliseconds before the next retry.
* **Name Your Credential** (string, required) – any label that helps you identify the credential.

## Triggers

### Get New and Updated Objects Polling

Polls Creatio for records that have been created or updated after the snapshot time. Results can be emitted one-by-one or as pages.

#### Configuration Fields

* **Object type** (dropdown, required) – Creatio entity to monitor. List is populated from your instance metadata.
* **Poll configuration field** (dropdown, required) – which date/time field to evaluate (e.g., `CreatedOn`, `ModifiedOn`). Available values are derived from the selected object type.
* **Start Time** (string, optional) – ISO 8601 timestamp for the initial poll; defaults to `1970-01-01T00:00:00Z` when omitted.
* **Page Size** (number, optional, default `100`) – number of records to request per API call; must be between 1 and 100 (reduced to 10 in debug/sample flows).
* **Emit Behavior** (dropdown, optional, default `Emit individually`) – choose `Emit individually` to output each record separately or `Emit page` to output pages of results.

#### Output Metadata

* **Emit individually** – identical to `Lookup Objects` response for the selected type.
* **Emit page** – `{ results: [...] }` where `results` is the same structure as the individual emit records.

#### Snapshot Behavior

The trigger stores the latest seen value of the selected poll configuration field. The next run starts strictly after that timestamp (plus one second when no new data was found) to avoid duplicate emissions.

## Actions

### Delete Object By ID

Deletes a single record from Creatio by its unique identifier (ID).

#### Configuration Fields

* **Object type** (dropdown, required) – the type of Creatio object to delete. The list is dynamically populated from your Creatio instance.

#### Input Metadata

* **Object ID** - (string, UUID, required): The unique identifier of the object to delete.

#### Output Metadata

* **Status Code** - (number, required): HTTP status returned by Creatio after the delete request.
* **Deleted Object ID** - (string, UUID, required): Identifier of the record that was deleted.

### Lookup Object By ID

Retrieves a single record from a Creatio object type by its unique identifier (ID).

#### Configuration Fields

* **Object type** (dropdown, required) – the type of Creatio object to query (e.g., Account, Contact, etc.). The list is dynamically populated based on your Creatio instance.

#### Input Metadata

* **Object ID** - (string, UUID, required): The unique identifier of the object to retrieve.

#### Output Metadata

The output message contains a single object with properties specific to the selected object type. Common fields include:

* **Id** - (string, UUID): Unique identifier for the record.
* **CreatedOn** - (string, date-time): Record creation timestamp.
* **CreatedById** - (string, UUID): User who created the record.
* **ModifiedOn** - (string, date-time): Last modification timestamp.
* **ModifiedById** - (string, UUID): User who last modified the record.
* **ProcessListeners** - (integer): Internal system field for process listeners.
* Additional fields depend on the object type.

### Lookup Objects (plural)

Retrieves multiple records from a Creatio object type. Can emit records individually or as pages.

#### Configuration Fields

* **Object type** (dropdown, required) – the type of Creatio object to query (e.g., Account, Contact, etc.). The list is dynamically populated based on your Creatio instance.
* **Emit Behavior** (dropdown, required) – determines how records are emitted:
  * `Emit individually` – each record is emitted as a separate message.
  * `Emit page` – records are emitted in pages as arrays.

#### Input Metadata

* **Page Size** - (number, optional, default `100`): Maximum number of records to return per page. Must be between 1 and 100.

#### Output Metadata

The output structure depends on the selected **Emit Behavior**:

* **Emit individually**: Each output message contains a single object with properties specific to the selected object type. Common fields include:
  * **Id** - (string, UUID): Unique identifier for the record.
  * **CreatedOn** - (string, date-time): Record creation timestamp.
  * **ModifiedOn** - (string, date-time): Last modification timestamp.
  * Additional fields depend on the object type.

* **Emit page**: Each output message contains an object with:
  * **results** - (array): Array of objects with the same structure as described above for individual emit.

### Make Raw Request

Sends a custom HTTP request to the Creatio API. Use this action when you need functionality not covered by prebuilt actions.

#### Configuration Fields

None.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL. Here comes a part of the path that goes after specified instance URL.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PATCH`, `DELETE`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

### Upsert Object

Creates a new record or updates an existing one depending on the selected operation and the presence of a record ID.

#### Configuration Fields

* **Object type** (dropdown, required) – Creatio entity to create or update. Populated dynamically from your instance metadata.
* **Operation** (dropdown, required) – choose `Create` to insert a new record or `Update` to modify an existing record. When `Update` is selected, an `Id` field becomes mandatory in the input metadata.

#### Input Metadata

The schema is generated dynamically from Creatio metadata for the selected object type. It contains all writable fields on that entity. Additionally:

* **Id** - (string, UUID): Required when **Operation** is `Update`; ignored when `Create` is selected. Use either `Id` or `id` in the payload.

#### Output Metadata

Matches the record returned by Creatio after the upsert. Common fields include `Id`, `CreatedOn`, `ModifiedOn`, `CreatedById`, `ModifiedById`, and any other properties available on the selected object type.

## Known Limitations

* To authenticate the credentials, you must have an active Creatio session.