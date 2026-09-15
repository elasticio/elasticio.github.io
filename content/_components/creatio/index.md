---
layout: component
title: Creatio component
section: CRM components
description: The Creatio component connects our integration platform to your Creatio CRM instance via the Creatio OData API.
icon: creatio.png
icontext: Creatio component
category: creatio
ComponentVersion: 1.1.0
updatedDate: 2026-09-14
---

## Table of Contents

- [General Information](#general-information)
  - [Description](#description)
  - [Prerequisites](#prerequisites)
- [Credentials](#credentials)
  - [Registering an OAuth 2.0 Client in Creatio](#registering-an-oauth-20-client-in-creatio)
  - [Configuring Platform Credentials](#configuring-platform-credentials)
- [Environment Variables](#environment-variables)
- [Triggers](#triggers)
  - [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
- [Actions](#actions)
  - [Delete Object By ID](#delete-object-by-id)
  - [Lookup Object By ID](#lookup-object-by-id)
  - [Lookup Objects (plural)](#lookup-objects-plural)
  - [Make Raw Request](#make-raw-request)
  - [Upsert Object](#upsert-object)
- [Known Limitations & Rate Limits](#known-limitations--rate-limits)

## General Information

The component interacts with Creatio using its OData 4.0 REST API (`/0/odata/`). It dynamically queries metadata (`/0/odata/$metadata`) to populate available entity types, date/time fields, and JSON schema properties in the integration designer.

### Description

The **Creatio component** connects our integration platform to your [Creatio CRM](https://www.creatio.com) instance via the Creatio OData API. It provides triggers and actions to poll, search, retrieve, create, update, and delete Creatio records, as well as execute custom raw API requests.

### Prerequisites

- An active Creatio CRM environment with administrative access.
- Registered OAuth 2.0 Integrated Application credentials in Creatio.

## Credentials

The component uses **OAuth 2.0** for secure API authentication.

### Registering an OAuth 2.0 Client in Creatio

To build an integration flow, you must first register an OAuth 2.0 application in your Creatio CRM environment:

1. Sign in with a system administrator account, click the gear icon to open the `System Designer` page, then go to the `Import and integration` section and click `OAuth 2.0 integrated applications`.
2. Click `New`.
3. Set up your integration by providing the following details:
   - **Name** (required) – any name that helps you identify the integration.
   - **Application URL** – the URL of your application.
   - **Description** – a description of the integration.
4. Under **Choose allowed OAuth flows**, select `On behalf of a user (authorization code)`.
5. Open the `AUTHORIZATION CODE` tab and specify:
   - **Redirect URI** – specify the [Redirect URI](/guides/oauth-callback-redirect-url.html) as `https://{your-tenant-address}/callback/oauth2`, where `{your-tenant-address}` is the domain of your integration platform.
   - **Permitted users** – specify which users are permitted to use this integration to authorize access via OAuth.
6. Save the integration.

### Configuring Platform Credentials

When creating a new credential on the elastic.io platform:

| Field | Type | Required | Description |
|---|---|---|---|
| **Type** | Dropdown | Yes | Select `OAuth2`. |
| **Choose Auth Client** | Dropdown | Yes | Select an existing client or choose `Add New Auth Client` and supply: Client ID, Client Secret, Authorization Endpoint (`https://{your-creatio-domain}/0/connect/authorize`), Token Endpoint (`https://{your-creatio-domain}/0/connect/token`), and Scope (`offline_access,ApplicationAccess_{ID}`). |
| **Instance URL** | String | Yes | Base URL of your Creatio environment, e.g. `https://123-crm-bundle.creatio.com`. |
| **Number of retries** | Number | No | Maximum retry attempts when encountering rate limiting (`429`) or server errors. Defaults to `5`. |
| **Delay between retries** | Number | No | Delay in milliseconds before retrying after a rate limit error. Defaults to `10000` (10 seconds). |
| **Name Your Credential** | String | Yes | A descriptive label for the credential. |

## Environment Variables

| Variable | Description |
|---|---|
| `ELASTICIO_FLOW_TYPE` | Set to `debug` during sample retrieval in the flow designer. When `debug`, maximum page size is automatically capped at `10`. |
| `EIO_REQUIRED_RAM_MB` | Recommended container memory allocation. Default: `256` MB. |

## Triggers

### Get New and Updated Objects Polling

Polls Creatio for records that have been created or modified since the previous poll. Stores the highest timestamp seen in the snapshot to prevent duplicate emissions.

#### Configuration Fields

| Field | Type | Required | Description |
|---|---|---|---|
| **Object Type** | Dropdown | Yes | The Creatio entity to monitor (e.g., `Contact`, `Account`). Populated dynamically and sorted alphabetically. |
| **Time stamp field to poll on** | Dropdown | Yes | Timestamp field to evaluate (e.g., `CreatedOn`, `ModifiedOn`). Populated dynamically based on the selected object type. |
| **Emit Behavior** | Dropdown | No | `Emit individually` (emits one message per record; default) or `Emit page` (emits an array of records under `results`). |
| **Page size** | Number | No | Number of records to request per page (1–100, default `100`). In debug flows, capped at `10`. |
| **Start Time** | String | No | ISO 8601 UTC timestamp to start polling from (e.g., `2024-01-01T00:00:00Z`). Defaults to `1970-01-01T00:00:00Z`. |

#### Input Data

None. This trigger evaluates polling timestamps based on configuration and the latest snapshot.

#### Output Data Examples

**Emit individually (`emitBehavior: emitIndividually`):**

```json
{
  "Id": "c3e7f4c0-2f9a-4c28-98e1-5e8a3d6174a2",
  "Name": "John Doe",
  "CreatedOn": "2024-01-15T08:30:00Z",
  "CreatedById": "410006e1-ca4e-4502-a9ec-e54d922d2c00",
  "ModifiedOn": "2024-01-15T09:45:00Z",
  "ModifiedById": "410006e1-ca4e-4502-a9ec-e54d922d2c00",
  "ProcessListeners": 0
}
```

**Emit page (`emitBehavior: emitPage`):**

```json
{
  "results": [
    {
      "Id": "c3e7f4c0-2f9a-4c28-98e1-5e8a3d6174a2",
      "Name": "John Doe",
      "CreatedOn": "2024-01-15T08:30:00Z",
      "CreatedById": "410006e1-ca4e-4502-a9ec-e54d922d2c00",
      "ModifiedOn": "2024-01-15T09:45:00Z",
      "ModifiedById": "410006e1-ca4e-4502-a9ec-e54d922d2c00",
      "ProcessListeners": 0
    }
  ]
}
```

## Actions

### Delete Object By ID

Deletes a single record from Creatio by its unique identifier (GUID).

#### Configuration Fields

| Field | Type | Required | Description |
|---|---|---|---|
| **Object type** | Dropdown | Yes | The entity type to delete from (e.g., `Contact`, `Account`). |

#### Input Data

```json
{
  "id": "c3e7f4c0-2f9a-4c28-98e1-5e8a3d6174a2"
}
```

#### Output Data

```json
{
  "status": 204,
  "deletedId": "c3e7f4c0-2f9a-4c28-98e1-5e8a3d6174a2"
}
```

### Lookup Object By ID

Retrieves a single record from Creatio by its unique identifier (GUID).

#### Configuration Fields

| Field | Type | Required | Description |
|---|---|---|---|
| **Object type** | Dropdown | Yes | The entity type to query (e.g., `Contact`, `Account`). |

#### Input Data

```json
{
  "id": "c3e7f4c0-2f9a-4c28-98e1-5e8a3d6174a2"
}
```

#### Output Data

```json
{
  "Id": "c3e7f4c0-2f9a-4c28-98e1-5e8a3d6174a2",
  "Name": "Acme Corporation",
  "CreatedOn": "2024-01-10T12:00:00Z",
  "CreatedById": "410006e1-ca4e-4502-a9ec-e54d922d2c00",
  "ModifiedOn": "2024-01-11T15:20:00Z",
  "ModifiedById": "410006e1-ca4e-4502-a9ec-e54d922d2c00",
  "ProcessListeners": 0
}
```

### Lookup Objects (plural)

Queries multiple records of a given object type from Creatio, automatically handling pagination via `$skip` and `$top`.

#### Configuration Fields

| Field | Type | Required | Description |
|---|---|---|---|
| **Object type** | Dropdown | Yes | The entity type to query (e.g., `Contact`, `Account`). |
| **Emit Behavior** | Dropdown | Yes | `Emit individually` or `Emit page`. |

#### Input Data

```json
{
  "pageSize": 50
}
```

#### Output Data Examples

**Emit individually (`emitBehavior: emitIndividually`):**

```json
{
  "Id": "c3e7f4c0-2f9a-4c28-98e1-5e8a3d6174a2",
  "Name": "Acme Corporation",
  "CreatedOn": "2024-01-10T12:00:00Z",
  "CreatedById": "410006e1-ca4e-4502-a9ec-e54d922d2c00",
  "ModifiedOn": "2024-01-11T15:20:00Z",
  "ModifiedById": "410006e1-ca4e-4502-a9ec-e54d922d2c00",
  "ProcessListeners": 0
}
```

**Emit page (`emitBehavior: emitPage`):**

```json
{
  "results": [
    {
      "Id": "c3e7f4c0-2f9a-4c28-98e1-5e8a3d6174a2",
      "Name": "Acme Corporation",
      "CreatedOn": "2024-01-10T12:00:00Z",
      "CreatedById": "410006e1-ca4e-4502-a9ec-e54d922d2c00",
      "ModifiedOn": "2024-01-11T15:20:00Z",
      "ModifiedById": "410006e1-ca4e-4502-a9ec-e54d922d2c00",
      "ProcessListeners": 0
    }
  ]
}
```

### Make Raw Request

Executes an arbitrary HTTP request against your Creatio instance with automatic OAuth 2.0 token management.

#### Configuration Fields

None.

#### Input Data

**GET Request Example:**

```json
{
  "url": "/0/odata/Contact?$top=5&$select=Id,Name,Email",
  "method": "GET"
}
```

**POST Request Example:**

```json
{
  "url": "/0/odata/Account",
  "method": "POST",
  "data": {
    "Name": "New Corporation"
  }
}
```

#### Output Data

```json
{
  "statusCode": 200,
  "headers": {
    "content-type": "application/json; odata.metadata=minimal"
  },
  "responseBody": {
    "@odata.context": "https://creatio.example.com/0/odata/$metadata#Account",
    "value": [
      {
        "Id": "c3e7f4c0-2f9a-4c28-98e1-5e8a3d6174a2",
        "Name": "New Corporation"
      }
    ]
  }
}
```

### Upsert Object

Creates a new record (`POST`) or updates an existing record (`PATCH`) in Creatio.

#### Configuration Fields

| Field | Type | Required | Description |
|---|---|---|---|
| **Operation** | Dropdown | Yes | `Create` to insert a new record, or `Update` to modify an existing record. |
| **Object type** | Dropdown | Yes | The entity type to upsert (e.g., `Contact`, `Account`). |

#### Input Data

**Create Operation (`operation: Create`):**

```json
{
  "Name": "Jane Smith",
  "Email": "jane.smith@example.com",
  "JobTitle": "Lead Engineer"
}
```

**Update Operation (`operation: Update`):**
> When `Update` is selected, `Id` (or `id`) is mandatory.

```json
{
  "Id": "c3e7f4c0-2f9a-4c28-98e1-5e8a3d6174a2",
  "Name": "Jane Smith",
  "Email": "jane.smith@example.com"
}
```

#### Output Data

```json
{
  "Id": "c3e7f4c0-2f9a-4c28-98e1-5e8a3d6174a2",
  "Name": "Jane Smith",
  "Email": "jane.smith@example.com",
  "CreatedOn": "2024-01-15T08:30:00Z",
  "CreatedById": "410006e1-ca4e-4502-a9ec-e54d922d2c00",
  "ModifiedOn": "2024-01-15T09:45:00Z",
  "ModifiedById": "410006e1-ca4e-4502-a9ec-e54d922d2c00",
  "ProcessListeners": 0
}
```

## Known Limitations & Rate Limits

1. **Active Session Requirement**: To authenticate credentials, you must ensure the configured OAuth application is active and valid in your Creatio CRM instance.
2. **Rate Limiting (`HTTP 429`)**: If Creatio throttles requests, the component automatically waits for `retriesDelay` milliseconds (default: 10 seconds) and retries up to `retries` times (default: 5) before failing.
3. **Token Expiration (`HTTP 401`)**: The component automatically refreshes expired access tokens and retries the request without failing the flow execution.
4. **Page Size Limit**: The maximum page size for query and polling actions is `100` records per request (automatically capped at `10` in debug/sample flows).