---
layout: component
title: Microsoft Dynamics CRM Client Credentials component
section: CRM components
description: The Microsoft Dynamics CRM Client Credentials Component connects to the Microsoft Dynamics CRM / Dataverse Web API using the OAuth 2.0 Client Credentials Grant.
icon: msdynamics-crm-v2.png
icontext: Microsoft Dynamics CRM Client Credentials component
category: msdynamics-client-credentials
ComponentVersion: 1.0.0
updatedDate: 2026-11-06
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Rate Limiting and Retry Logic](#rate-limiting-and-retry-logic)
* [Actions](#actions)
  * [Lookup Objects (plural)](#lookup-objects-plural)
  * [Lookup Object (at most one)](#lookup-object-at-most-one)
  * [Upsert Object](#upsert-object)
  * [Delete Object By ID](#delete-object-by-id)
  * [Make Raw Request](#make-raw-request)
* [Triggers](#triggers)
  * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
* [Known Limitations](#known-limitations)
* [Official Documentation & Useful Links](#official-documentation--useful-links)

---

## Description

The Microsoft Dynamics CRM Client Credentials Component connects to the Microsoft Dynamics CRM / Dataverse Web API using the OAuth 2.0 **Client Credentials Grant** (server-to-server / machine-to-machine authentication without interactive user login).

The component automatically manages OAuth 2.0 token acquisition and refresh via Microsoft Entra ID (Azure AD), deriving the resource scope directly from your Dynamics instance Base URL (`${origin}/.default`).

---

## Credentials

### Prerequisites in Microsoft Dynamics 365 & Azure Portal

> **Please Note:**
>
> **1. Application User in Dynamics 365 (Required):**
> Microsoft Dynamics CRM / Dataverse will reject requests with `401 Unauthorized` or `403 Forbidden` (`0x80072560 - The user is not a member of the organization`) unless the Azure App Registration is added as an Application User (see [Manage application users in the Power Platform admin center](https://learn.microsoft.com/en-us/power-platform/admin/manage-application-users)):
> * Go to the **[Power Platform Admin Center](https://admin.powerplatform.microsoft.com/)**.
> * In the left menu, select **Environments** -> select your Dynamics 365 environment.
> * In the top bar, click **Settings** -> expand **Users + permissions** -> click **Application users**.
> * Click **+ New app user**.
> * Click **+ Add an app**, search for and select your Azure App Registration (by Client ID or Name).
> * Select the appropriate **Business unit**.
> * Under **Security roles**, assign the required roles (e.g., **System Administrator** or a custom security role with read/write access to target entities).
> * Click **Create**.
>
> **2. Azure App Registration & API Permissions:**
> Refer to [Microsoft Entra ID: Client credentials grant flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-client-creds-grant-flow) and [Use Multi-Tenant Server-to-Server Authentication](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/use-multi-tenant-server-server-authentication):
> * In the [Azure Portal](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps) under **App registrations**, select your application.
> * Under **Overview**, copy your **Application (Client) ID** and **Directory (Tenant) ID**.
> * Go to **API permissions** -> click **Add a permission** -> select **Dynamics CRM** -> check `user_impersonation`.
> * Click **Grant admin consent for <your-organization>** and verify green checkmarks.
> * Under **Certificates & secrets**, generate a **New client secret** and copy its **Value**.

### Configuration Fields

| Field Name | Mandatory | Description |
| :--- | :---: | :--- |
| **Application (Client) ID** | Yes | Azure App Registration Application (Client) ID (GUID). |
| **Client Secret** | Yes | Azure App Registration Client Secret Value. |
| **Directory (Tenant) ID** | Yes | Azure Directory (Tenant) ID (GUID). |
| **Base URL** | Yes | Your Dynamics CRM Web API URL, e.g. `https://org1.crm4.dynamics.com/api/data/v9.2` or `https://org1.crm4.dynamics.com`. |
| **API version** | No | Web API version to use (e.g. `v9.2`). Defaults to `v9.2` if omitted. |

To complete setup:
1. Fill in all required fields.
2. Click **Verify** to validate credentials against the `/WhoAmI` endpoint.
3. Click **Save** to store the credentials.

---

## Rate Limiting and Retry Logic

- **401 Unauthorized**: Automatically refreshes the OAuth 2.0 access token via Microsoft Entra ID and retries the failed request once.
- **429 Too Many Requests**: Automatically backs off and retries requests when Dataverse rate limits are encountered, respecting the `Retry-After` response header (supporting both integer seconds and HTTP-Date format) up to 3 retry attempts.

---

## Actions

### Lookup Objects (plural)

Performs a lookup of multiple objects based on configurable filter criteria, pagination, and projection parameters.

#### Configuration Fields

* **Object Type** - (dropdown, required): Entity set name to query, e.g. `accounts`, `contacts`.
* **Emit Behavior** - (dropdown, optional, default `Emit individually`):
  * `Emit individually`: Emits each matching record as a separate message.
  * `Emit page`: Emits all records from the page in a single message with an array named `results`.
* **Number of search terms** - (string, optional): Number of criteria terms to construct via the form builder (0 to 99).
* **Expert Mode for Filter Expression** - (checkbox, optional, default `false`): Enables writing raw OData `$filter` expressions directly into the `Filter Expression` input field.
* **Page Size** - (string, optional, default `100`): Maximum records to fetch per page (1 to 1000).
* **Select fields** - (string, optional): Comma-separated list of attributes to return, e.g. `name,telephone1,accountnumber`.
* **Expand fields** - (string, optional): Comma-separated list of navigation properties to expand, e.g. `primarycontactid,createdby`.

#### Input Metadata

##### When "Expert Mode for Filter Expression" is Enabled:
* **Filter Expression** - (string, required): Raw OData `$filter` expression (without `$filter=` prefix).

###### Input Example (Expert Mode):
```json
{
  "filterExpression": "startswith(name,'Fabrikam') and statecode eq 0"
}
```

##### When "Expert Mode for Filter Expression" is Disabled:
Input is dynamically constructed based on **Number of search terms**:

###### Input Example (Number of search terms = 2):
```json
{
  "sTerm_1": {
    "fieldName": "address1_city",
    "condition": "eq",
    "fieldValue": "'Seattle'"
  },
  "link_1_2": "and",
  "sTerm_2": {
    "fieldName": "statuscode",
    "condition": "eq",
    "fieldValue": "1"
  }
}
```

#### Output Metadata

##### When Emit Behavior is `Emit individually`:
Each matching record is emitted as its own message:
```json
{
  "accountid": "88cea450-cb0c-ea11-a813-000d3a1b1223",
  "name": "Fabrikam, Inc.",
  "accountnumber": "ACC-10042",
  "telephone1": "423-555-0103",
  "address1_city": "Seattle",
  "createdon": "2024-08-28T14:27:43Z"
}
```

##### When Emit Behavior is `Emit page`:
Emits an array under `results`:
```json
{
  "results": [
    {
      "accountid": "88cea450-cb0c-ea11-a813-000d3a1b1223",
      "name": "Fabrikam, Inc.",
      "accountnumber": "ACC-10042",
      "telephone1": "423-555-0103"
    },
    {
      "accountid": "99dfb561-db1d-ea11-a813-000d3a1b1224",
      "name": "Contoso Pharmaceuticals",
      "accountnumber": "ACC-10043",
      "telephone1": "206-555-0199"
    }
  ]
}
```

---

### Lookup Object (at most one)

Looks up a single record by a selected unique or identifier field. If more than one record matches, execution fails with `"More than one object found"`.

#### Configuration Fields

* **Object Type** - (dropdown, required): The entity to search, e.g. `accounts`, `contacts`.
* **Lookup Criteria** - (dropdown, required): The attribute used for the lookup. The list dynamically surfaces guaranteed-valid criteria:
  * **Primary Key**: e.g. `AccountId (Primary Key)`
  * **Primary Name**: e.g. `Name (Primary Name)`
  * **Alternate Keys**: e.g. `AccountNumber (Alternate Key)`
  * **String Identifiers**: Single-line text attributes, e.g. `EMailAddress1`, `Telephone1`, `Address1_City`.
* **Allow criteria to be omitted** - (checkbox, optional): When enabled, an empty message is emitted if `Lookup Criteria Value` is not provided.
* **Allow zero results** - (checkbox, optional): When enabled, emits `{}` instead of throwing an error when no matching record is found.

#### Input Metadata

* **Lookup Criteria Value** - (string, required unless `Allow criteria to be omitted` is checked): The value to search for.
  * **For Primary ID / GUID fields**: Must be a valid 32-character hex GUID (e.g. `00000000-0000-0000-0000-000000000000`).
  * **For String fields**: Enter the exact text value. Single quotes and apostrophes (e.g. `O'Connor`) are automatically escaped.

###### Input Example (Lookup by Primary Key):
```json
{
  "lookupCriteriaValue": "88cea450-cb0c-ea11-a813-000d3a1b1223"
}
```

###### Input Example (Lookup by Primary Name):
```json
{
  "lookupCriteriaValue": "Fabrikam, Inc."
}
```

#### Output Metadata

Returns the matched object:
```json
{
  "accountid": "88cea450-cb0c-ea11-a813-000d3a1b1223",
  "name": "Fabrikam, Inc.",
  "accountnumber": "ACC-10042",
  "telephone1": "423-555-0103",
  "address1_city": "Lynnwood",
  "createdon": "2024-08-28T14:27:43Z",
  "modifiedon": "2024-08-28T14:30:19Z"
}
```

---

### Upsert Object

Creates a new record or updates an existing record based on a unique identifier or Alternate Key.

#### Configuration Fields

* **Object type** - (dropdown, required): Object type to upsert, e.g. `accounts`, `contacts`.
* **ID to Search On** - (dropdown, required): The search criterion:
  * `Entity ID`: Matches on the record's primary GUID.
  * Any configured **Alternate Key** (e.g. `accountnumber`).

#### Input Metadata

* **id** - (string, optional when creating, required when updating via `Entity ID`): The primary GUID of the record.
* **Dynamically generated attributes**: All valid create/update fields for the chosen object type.
* **Lookup Navigation Properties (`@odata.bind`)**: For foreign key lookup fields (e.g. `primarycontactid`), provide the navigation path format: `/<EntitySetName>(<GUID>)`.

###### Input Example (Update Existing Record by Primary ID):
```json
{
  "id": "88cea450-cb0c-ea11-a813-000d3a1b1223",
  "name": "Fabrikam International, Inc.",
  "telephone1": "423-555-0199",
  "revenue": 9500000,
  "primarycontactid@odata.bind": "/contacts(cdd6a450-cb0c-ea11-a813-000d3a1b1223)"
}
```

###### Input Example (Create New Record - ID Omitted):
```json
{
  "name": "Contoso Retailers",
  "telephone1": "206-555-0100",
  "address1_city": "Bellevue",
  "address1_line1": "100 Main St."
}
```

#### Output Metadata

Returns the created or updated object from Dynamics 365:
```json
{
  "accountid": "88cea450-cb0c-ea11-a813-000d3a1b1223",
  "name": "Fabrikam International, Inc.",
  "telephone1": "423-555-0199",
  "revenue": 9500000,
  "modifiedon": "2024-11-04T12:30:00Z"
}
```

---

### Delete Object By ID

Deletes a single record by its primary ID.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object type from which to delete, e.g. `accounts`.

#### Input Metadata

* **id** - (string, required, titled `ID Value`): The primary GUID of the record to delete.

###### Input Example:
```json
{
  "id": "88cea450-cb0c-ea11-a813-000d3a1b1223"
}
```

#### Output Metadata

* **id** - (string): The ID of the successfully deleted record.

###### Output Example:
```json
{
  "id": "88cea450-cb0c-ea11-a813-000d3a1b1223"
}
```

---

### Make Raw Request

Executes an arbitrary HTTP request against the Microsoft Dynamics CRM Web API using the authenticated client.

#### Configuration Fields

* **Don't throw error on 404 Response** - (checkbox, optional, default `false`): When checked, 404 HTTP responses are returned in `responseBody` rather than throwing an error.

#### Input Metadata

* **method** - (string, required): HTTP verb: `GET`, `POST`, `PUT`, `PATCH`, or `DELETE`.
* **url** - (string, required): Resource path relative to the Base URL, e.g. `/accounts?$select=name&$top=5`.
* **headers** - (object, optional): Additional request headers, e.g. `{ "Prefer": "odata.maxpagesize=50" }`.
* **data** - (object, optional, titled `Request Body`): Request payload for `POST`, `PUT`, or `PATCH`.

###### Input Example 1 (GET Request with Projection and Paging):
```json
{
  "method": "GET",
  "url": "/accounts?$select=name,accountnumber&$top=2",
  "headers": {
    "Prefer": "odata.include-annotations=\"*\""
  }
}
```

###### Input Example 2 (PATCH Request to Update Record):
```json
{
  "method": "PATCH",
  "url": "/accounts(88cea450-cb0c-ea11-a813-000d3a1b1223)",
  "headers": {
    "If-Match": "*"
  },
  "data": {
    "telephone1": "423-555-0155"
  }
}
```

#### Output Metadata

* **statusCode** - (number): HTTP status code returned by the server.
* **headers** - (object): Response HTTP headers.
* **responseBody** - (object): Parsed JSON response body.

###### Output Example:
```json
{
  "statusCode": 200,
  "headers": {
    "content-type": "application/json; odata.metadata=minimal",
    "odata-version": "4.0"
  },
  "responseBody": {
    "value": [
      {
        "accountid": "88cea450-cb0c-ea11-a813-000d3a1b1223",
        "name": "Fabrikam, Inc.",
        "accountnumber": "ACC-10042"
      }
    ]
  }
}
```

---

## Triggers

### Get New and Updated Objects Polling

Periodically polls for newly created or modified records within a sliding time window.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object type to poll, e.g. `accounts`, `contacts`.
* **Emit behavior** - (dropdown, required):
  * `Emit individually`: Emits each changed record as a separate message.
  * `Emit page`: Emits all records from the page under `results`.
* **Size of Polling Page** - (string, optional, default `5000`): Maximum records to fetch per polling request.
* **Process Single Page Per Execution** - (checkbox, optional): When checked, only one page of records is processed per execution interval. Subsequent pages are fetched in subsequent scheduled intervals.
* **Start Time** - (string, optional): ISO-8601 start timestamp (inclusive), e.g. `2024-01-01T00:00:00Z`. Defaults to all existing records.
* **End Time** - (string, optional): ISO-8601 end timestamp (inclusive). Defaults to never.
* **Time stamp field to poll on** - (dropdown, optional, default `Last Modified`):
  * `Last Modified`: Polls on `modifiedon`.
  * `Created`: Polls on `createdon`.

#### Input Metadata

None.

#### Output Metadata

##### When Emit behavior is `Emit individually`:
```json
{
  "accountid": "88cea450-cb0c-ea11-a813-000d3a1b1223",
  "name": "Fabrikam, Inc.",
  "modifiedon": "2024-11-04T13:45:00Z",
  "createdon": "2024-08-28T14:27:43Z"
}
```

##### When Emit behavior is `Emit page`:
```json
{
  "results": [
    {
      "accountid": "88cea450-cb0c-ea11-a813-000d3a1b1223",
      "name": "Fabrikam, Inc.",
      "modifiedon": "2024-11-04T13:45:00Z"
    }
  ]
}
```

---

## Known Limitations

1. **Multiline Text (`Memo`) and Complex Attributes in Filters**:
   Microsoft Dataverse does not support OData `$filter` queries on `Memo` (multiline text, e.g. `description`), virtual attributes, or file/image properties. These are excluded from single-record lookup criteria.
2. **Navigation Properties in Filters vs Payloads**:
   - In filter queries, Dataverse references lookup navigation properties via the `_<field>_value` column name (e.g. `_primarycontactid_value eq <GUID>`).
   - In create or update payloads (`Upsert Object`), Dataverse requires `@odata.bind` notation (e.g. `"primarycontactid@odata.bind": "/contacts(<GUID>)"`).
3. **Primary ID Format**:
   All primary ID lookups require a valid 32-character hexadecimal GUID format (with or without hyphens). Passing non-GUID strings or integers to GUID fields will result in a validation error.

---

## Official Documentation & Useful Links

* **Microsoft Dataverse Web API**:
  * [Microsoft Dataverse Web API Overview](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/overview) - Official API reference, service limits, and OData endpoints.
  * [Query data using the Web API](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/query-data-web-api) - Guide for `$filter`, `$select`, `$expand`, and OData query syntax.
  * [Web API Limits and Allocations](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/api-limits) - Dataverse throughput limits, concurrency limits, and retry patterns.
* **Authentication & Permissions (Microsoft Entra ID / Azure AD)**:
  * [Microsoft Entra ID Client Credentials Grant Flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-client-creds-grant-flow) - Server-to-server daemon authentication without interactive sign-in.
  * [Use Multi-Tenant Server-to-Server Authentication with Dataverse](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/use-multi-tenant-server-server-authentication) - Guide on configuring Azure App Registrations and security roles for Dataverse.
  * [Manage Application Users in Power Platform Admin Center](https://learn.microsoft.com/en-us/power-platform/admin/manage-application-users) - Step-by-step instructions to create application users and assign security roles.
* **Portals**:
  * [Microsoft Power Platform Admin Center](https://admin.powerplatform.microsoft.com/) - Manage environments, users, and security roles.
  * [Azure Portal - App Registrations](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps) - Configure client IDs, secrets, and API permissions.