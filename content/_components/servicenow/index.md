---
layout: component
title: ServiceNow component
section: Service components
description: The ServiceNow component allows you to interact with your ServiceNow instance via REST API.
icon: servicenow.png
icontext: ServiceNow component
category: servicenow
ComponentVersion: 1.0.0
updatedDate: 2026-02-25
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Delete Object By ID](#delete-object-by-id)
  * [Lookup Object By ID](#lookup-object-by-id)
  * [Lookup Objects (plural)](#lookup-objects-plural)
  * [Make Raw Request](#make-raw-request)
  * [Upsert Object](#upsert-object)
* [Triggers](#triggers)
  * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
* [Known Limitations](#known-limitations)  

## Description

The ServiceNow component allows you to interact with your ServiceNow instance via REST API. This component provides actions to query and manipulate ServiceNow records, and triggers to poll for new and updated records.

## Credentials

To build an integration flow, you must configure OAuth 2.0 authentication:

### Prerequisites in ServiceNow

Before configuring the component, you need to set up OAuth 2.0 in your ServiceNow instance. For detailed instructions, see the [ServiceNow OAuth Applications documentation](https://www.servicenow.com/docs/r/xanadu/platform-security/c_Authentication.html).

**Create OAuth Application** – Navigate to `System OAuth → Application Registry → New → New Inbound Integration Experience → OAuth - Authorization code grant`
   - **Name** – Enter a descriptive name for your OAuth application (e.g., "elastic.io integration")
   - **Provider name** – Enter a provider identifier (e.g., "elastic.io")
   - **Redirect URLs** – Add the following [callback redirect URL](/guides/oauth-callback-redirect-url): `https://{your-tenant-address}/callback/oauth2`
   - **Active** – Ensure this checkbox is checked
   - **Auth scope** – Configure the auth scope:
     - Click **Configure auth scope** or **Create auth scope** to set up appropriate permissions
     - Select or create an auth scope that grants access to the required APIs
     - **Note:** The `useraccount` scope grants access to all resources available to the signed-in user. Use this scope with caution as it may introduce security risks. Consider creating a more restrictive scope for your integration.
   - After saving, ServiceNow will generate a **Client ID** and **Client Secret** – save these values as you'll need them for component configuration

### Component Configuration

1. **Authentication** (OAuth 2.0, required) – Configure OAuth 2.0 credentials:
   - **Client ID** – From your ServiceNow OAuth application
   - **Client Secret** – From your ServiceNow OAuth application
   - **Authorization Endpoint** – `https://<instance>.service-now.com/oauth_auth.do`
   - **Token Endpoint** – `https://<instance>.service-now.com/oauth_token.do`
   - **Scopes** – The scope name configured in your OAuth application's auth scope:
     - If you used `useraccount` as the auth scope, enter: `useraccount`
     - If you created a custom auth scope, enter the name of that custom scope
2. **Instance URL** (string, required) – Your ServiceNow instance URL, e.g., `https://dev12345.service-now.com` or `https://yourcompany.service-now.com`.
3. **API Version** (string, optional) – Version of the endpoint to access (e.g., `v1` or `v2`). Only specify this value to use an endpoint version other than the latest. If not specified, the latest version will be used.
4. **Number of retries** (number, optional, default `5`) – How many times requests are retried when throttled.
5. **Delay between retries** (number, optional, default `10000`) – Wait time in milliseconds before the next retry.

> **Please Note:** The OAuth Application User must have appropriate roles (e.g., `rest_api_explorer` or `web_service_admin`) to access the Table API.

## Actions

### Delete Object By ID

Deletes a single record from a ServiceNow table by its unique identifier (sys_id).

#### Configuration Fields

* **Table Name** (dropdown, string, required) – ServiceNow table name. The list is dynamically populated from your ServiceNow instance.

#### Input Metadata

* **sys_id** (string, required) – The unique identifier of the record to delete.

#### Output Metadata

* **statusCode** (number, required) – HTTP status code returned by ServiceNow after the delete request (typically 204 No Content or 200 OK).
* **deletedSysId** (string, required) – The sys_id of the record that was deleted.

#### Example: Delete an Incident

**Configuration:**
* Table Name: `incident`

**Input:**
```json
{
  "sysId": "abc123def456"
}
```

**Output:**
```json
{
  "statusCode": 204,
  "deletedSysId": "abc123def456"
}
```

> **Please Note:** If the record does not exist, ServiceNow will return a 404 error, which will be propagated as an error in the action.

### Lookup Object By ID

Retrieves a single record from a ServiceNow table by its unique identifier (sys_id).

#### Configuration Fields

* **Table Name** (dropdown, string, required) – ServiceNow table name. The list is dynamically populated from your ServiceNow instance.

#### Input Metadata

* **sys_id** (string, required) – The unique identifier of the record to retrieve.
* **Fields** (string, optional) – A comma-separated list of fields to return. If not specified, all fields are returned.
* **Display Value** (boolean, optional, default `false`) – Return display values instead of sys_ids for reference fields.

#### Output Metadata

The output message contains a single object with properties specific to the selected table. Common fields include:

* **sys_id** (string) – Unique identifier for the record.
* **number** (string) – Record number (for numbered tables like incident, change_request, etc.).
* **sys_created_on** (string, date-time) – Record creation timestamp.
* **sys_created_by** (string) – User who created the record.
* **sys_updated_on** (string, date-time) – Last modification timestamp.
* **sys_updated_by** (string) – User who last modified the record.
* Additional fields depend on the table type.

#### Example: Lookup an Incident by ID

**Configuration:**
* Table Name: `incident`

**Input:**
```json
{
  "sysId": "abc123def456",
  "fields": "number,short_description,state,priority",
  "displayValue": true
}
```

**Output:**
```json
{
  "sys_id": "abc123def456",
  "number": "INC0010001",
  "short_description": "User cannot access email",
  "state": "In Progress",
  "priority": "High"
}
```

### Lookup Objects (plural)

Retrieves multiple records from a ServiceNow table. Can emit records individually or as pages.

#### Configuration Fields

* **Table Name** (dropdown, string, required) – ServiceNow table name (e.g., `incident`, `sys_user`, `cmdb_ci`).
* **Emit Behavior** (dropdown, required) – Determines how records are emitted:
  * `Emit individually` – Each record is emitted as a separate message.
  * `Emit page` – Records are emitted in pages as arrays.

#### Input Metadata

* **Page Size** (number, optional, default `100`) – Maximum number of records to return per request. Must be between 1 and 10000.
* **Query** (string, optional) – ServiceNow encoded query string for filtering records. Examples:
  * `priority=1^state=2` – Records with priority=1 AND state=2
  * `short_descriptionCONTAINSemail` – Records containing "email" in short_description
  * `sys_created_on>=javascript:gs.dateGenerate('2024-01-01','00:00:00')` – Records created after a date
* **Fields** (array, optional) – List of field names to return. If not specified, all fields are returned.
* **Display Value** (boolean, optional, default `false`) – Return display values instead of sys_ids for reference fields.

#### Output Metadata

The output structure depends on the selected **Emit Behavior**:

* **Emit individually**: Each output message contains a single object with properties specific to the selected table. Common fields include:
  * **sys_id** (string) – Unique identifier for the record.
  * **number** (string) – Record number (for numbered tables).
  * **sys_created_on** (string, date-time) – Record creation timestamp.
  * **sys_updated_on** (string, date-time) – Last modification timestamp.
  * Additional fields depend on the table type.

* **Emit page**: Each output message contains an object with:
  * **results** (array) – Array of objects with the same structure as described above for individual emit.

#### Example: Lookup Active Incidents

**Configuration:**
* Table Name: `incident`
* Emit Behavior: `Emit individually`

**Input:**
```json
{
  "pageSize": 50,
  "query": "state=2^priority=1",
  "fields": ["sys_id", "number", "short_description", "priority", "state"],
  "displayValue": true
}
```

**Output:** Multiple messages, each containing one incident record.

### Make Raw Request

Sends a custom HTTP request to the ServiceNow REST API. Use this action when you need functionality not covered by prebuilt actions.

#### Configuration Fields

None.

#### Input Metadata

* **Method** (string, required) – HTTP verb to use in the request, one of `GET`, `POST`, `PATCH`, `PUT`, `DELETE`.
* **URL** (string, required) – Path of the resource relative to the base URL. Examples:
  * `/api/now/table/incident` – Access the incident table
  * `/api/now/table/incident/{sys_id}` – Access a specific incident
  * `/api/now/table/sys_user` – Access the user table
* **Request Body** (object, optional) – Body of the request to send (required for POST, PATCH, PUT).

#### Output Metadata

* **Status Code** (number, required) – HTTP status code of the response.
* **HTTP headers** (object, required) – HTTP headers of the response.
* **Response Body** (object, optional) – HTTP response body.

#### Example: Create an Incident

**Input:**
```json
{
  "method": "POST",
  "url": "/api/now/table/incident",
  "data": {
    "short_description": "User cannot access email",
    "urgency": "2",
    "impact": "2",
    "category": "inquiry"
  }
}
```

### Upsert Object

Creates a new record or updates an existing record in a ServiceNow table based on the selected operation.

#### Configuration Fields

* **Table Name** (dropdown, string, required) – ServiceNow table name. The list is dynamically populated from your ServiceNow instance.
* **Operation** (dropdown, required) – Determines the action to perform:
  * `Create` – Inserts a new record into the table.
  * `Update` – Updates an existing record identified by sys_id.

#### Input Metadata

The input metadata is **dynamically generated** based on the selected **Table Name**. After selecting a table, the input metadata will show all available fields for that table with their appropriate types.

* **sys_id** (string, optional) – The unique identifier of the record to update. Required when operation is "Update", optional when operation is "Create".
* **Table-specific fields** (dynamically generated) – All writable fields available for the selected table will appear in the input metadata. Fields are fetched from your ServiceNow instance and include:
  * Field labels and descriptions
  * Appropriate data types (string, number, boolean, date, datetime, etc.)
  * Reference field information
  * Read-only fields are automatically excluded

The metadata is generated after you select a table name in the configuration.

#### Output Metadata

The output message contains a single object with properties specific to the selected table. Common fields include:

* **sys_id** (string) – Unique identifier for the record.
* **number** (string) – Record number (for numbered tables like incident, change_request, etc.).
* **sys_created_on** (string, date-time) – Record creation timestamp.
* **sys_created_by** (string) – User who created the record.
* **sys_updated_on** (string, date-time) – Last modification timestamp.
* **sys_updated_by** (string) – User who last modified the record.
* Additional fields depend on the table type.

#### Example: Create an Incident

**Configuration:**
* Table Name: `incident`
* Operation: `Create`

**Input:**
```json
{
  "short_description": "User cannot access email",
  "urgency": "2",
  "impact": "2",
  "category": "inquiry",
  "caller_id": "abc123def456"
}
```
**Output:**
```json
{
  "sys_id": "abc123def456",
  "number": "INC0010001",
  "short_description": "User cannot access email",
  "urgency": "2",
  "impact": "2",
  "category": "inquiry",
  "sys_created_on": "2024-01-15 10:30:00",
  "sys_created_by": "admin"
}
```

#### Example: Update an Incident

**Configuration:**
* Table Name: `incident`
* Operation: `Update`

**Input:**
```json
{
  "sysId": "abc123def456",
  "incident_state": "3",
  "work_notes": "Issue resolved by restarting service",
  "resolved_at": "2024-01-15 11:45:00",
  "close_code": "Solved (Work Around)"
}
```

> **Please Note:** For update operations, only include the fields you want to modify. The `sysId` field is required. All other fields shown in the input metadata are optional and will only be updated if you provide values for them.

**Output:**
```json
{
  "sys_id": "abc123def456",
  "number": "INC0010001",
  "short_description": "User cannot access email",
  "incident_state": "3",
  "work_notes": "Issue resolved by restarting service",
  "resolved_at": "2024-01-15 11:45:00",
  "close_code": "Solved (Work Around)",
  "sys_updated_on": "2024-01-15 11:45:00",
  "sys_updated_by": "admin"
}
```

> **Please Note:** 
* For create operations, if the record creation fails, an error will be thrown.
* For update operations, if the record with the specified sys_id does not exist, ServiceNow will return a 404 error, which will be propagated as an error in the action.

## Triggers

### Get New and Updated Objects Polling

Polls for new and updated records from a ServiceNow table based on a date field. The trigger uses snapshot to track the last processed timestamp and only fetches records that have been created or updated since the last execution.

#### Configuration Fields

* **Table Name** (dropdown, string, required) – ServiceNow table name. The list is dynamically populated from your ServiceNow instance.
* **Date Field** (dropdown, optional, default `sys_updated_on`) – Field name to use for filtering records by date. The list is dynamically populated based on the selected table and includes:
  * Common fields available on all tables:
    * `sys_updated_on` – Last modification timestamp (default)
    * `sys_created_on` – Creation timestamp
  * Table-specific date/datetime fields (e.g., `opened_at`, `resolved_at`, `due_date`, etc.)
* **Start Time** (string, optional) – Initial date/time to start polling from in ServiceNow format (`YYYY-MM-DD HH:mm:ss`). If not specified, defaults to `1970-01-01 00:00:00`. The trigger will use snapshot to track the last processed timestamp, so this is only used for the first execution.
* **Additional Query** (string, optional) – Optional ServiceNow encoded query string to further filter records (e.g., `state=2^priority=1`). This will be combined with the date filter.
* **Page Size** (number, optional, default `100`) – Maximum number of records to fetch per request. Must be between 1 and 100.
* **Emit Behavior** (dropdown, required) – Determines how records are emitted:
  * `Emit individually` – Each record is emitted as a separate message.
  * `Emit page` – Records are emitted as an array.

#### Output Metadata

The output structure depends on the selected **Emit Behavior**:

* **Emit individually**: Each output message contains a single object with properties specific to the selected table. Common fields include:
  * **sys_id** (string) – Unique identifier for the record.
  * **sys_updated_on** (string, date-time) – Last modification timestamp.
  * **sys_created_on** (string, date-time) – Record creation timestamp.
  * Additional fields depend on the table type.

* **Emit page**: Each output message contains an object with:
  * **results** (array) – Array of objects with the same structure as described above for individual emit.

> **Please Note:**
* The trigger uses snapshot to track progress. Each execution will automatically continue from where the previous execution left off.
* If you want to reset the polling, you can clear the snapshot or change the Start Time.
* The date field format should match ServiceNow's format: `YYYY-MM-DD HH:mm:ss`.
* Records are ordered by the date field to ensure consistent processing.

## Known Limitations

1. ServiceNow API has rate limits. The component will retry on 429 (Too Many Requests) errors.
2. Some fields may be restricted by ACLs (Access Control Lists) based on user permissions.
3. Query syntax follows ServiceNow's encoded query format.