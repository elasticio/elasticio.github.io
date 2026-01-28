---
title: Salesforce actions
layout: component
description: Salesforce component actions.
icon: salesforce.png
icontext: Salesforce component
category: salesforce
updatedDate: 2026-01-28
ComponentVersion: 2.9.1
---

## Bulk Create/Update/Delete/Upsert

Uses the Bulk API 2.0 to quickly load large amounts of data (up to 10,000 records) from a CSV file into Salesforce. This action takes a CSV file from an attachment as input. The required CSV format is described in the [Salesforce documentation](https://developer.salesforce.com/docs/atlas.en-us.api_bulk_v2.meta/api_bulk_v2/datafiles.htm).

{% include img.html max-width="100%" url="img/bulk-create-update-delete.png" title="Bulk Create/Update/Delete action" %}

#### Configuration Fields
*   **Operation** (dropdown, required): The bulk operation to perform: `Create`, `Update`, `Upsert`, or `Delete`.
*   **Object** (dropdown, required): The type of object to perform the bulk operation on (e.g., `Case`).
*   **Timeout** (integer, optional): The maximum time in seconds to wait for the server to complete the bulk operation. Defaults to `600`.

#### Input Metadata
*   **External ID Field**: For the `Upsert` operation, specify the name of the External ID field (e.g., `my_external_id__c`).

#### Output Metadata
The action outputs a message with a `result` property, which is an array of objects. Each object in the array represents the outcome for a record and contains the following fields:
*   **id**: The Salesforce ID of the object.
*   **success**: A boolean indicating if the operation was successful (`true` or `false`).
*   **errors**: An array containing error descriptions if the operation failed.

#### Limitations
*   The action does not throw an error for failed records. You must check the `success` field in the output to identify failures.
*   An `Object ID` is required for `Update` and `Delete` operations.
*   An `External ID` is required for the `Upsert` operation.
*   Salesforce processes a maximum of 10,000 records from the input CSV file per operation.

## Bulk Query

Fetches a large number of records using a SOQL query and streams the result as a CSV file in an attachment.

{% include img.html max-width="100%" url="img/bulk-query-action.png" title="Bulk Query action" %}

#### Input Metadata
*   **SOQL Query** (string, required): The SOQL query to execute (e.g., `SELECT Id, Name from Contact`).

## Create Object

Creates a single new object in Salesforce.

{% include img.html max-width="100%" url="img/create-object-action.png" title="Create Object action" %}

> **Please Note:** To create an `Attachment`, you must provide the file content as a base64-encoded string in the `Body` field. The `ParentId` must be the Salesforce ID of the object (e.g., Account, Lead) the attachment will be associated with.

#### Configuration Fields
*   **Object** (dropdown, required): The type of object to create (e.g., `Account`).
*   **Utilize data attachment from previous step...**: If checked, and if an attachment is present in the input message, the component will use the attachment data for any binary field (e.g., the `Body` of a `Document`).

#### Input/Output Metadata
This action dynamically retrieves all available fields for the chosen object type. The output metadata will mirror the input metadata.

#### Limitations
*   When **Utilize data attachment...** is checked, this action may fail if used with a Local Agent due to networking constraints.

## Delete Object (at most 1)

Deletes a single object found by a specified field and value.

{% include img.html max-width="100%" url="img/delete-object-action.png" title="Delete Object action (at most 1)" %}

#### Configuration Fields
*   **Object** (dropdown, required): The type of object to delete.
*   **Type Of Search** (dropdown, required): Choose to look up the object by `Unique Fields` or `All Fields`.
*   **Lookup by field** (dropdown, required): The field to use for the lookup.

#### Input Metadata
The input metadata is dynamically generated based on the **Lookup by field**.

#### Output Metadata
*   **id**: The Salesforce ID of the deleted object.
*   **success**: A boolean indicating if the operation was successful.
*   **errors**: An array of errors if the operation failed.

## Lookup Object (at most 1)

Looks up a single object by a specified field and value.

{% include img.html max-width="100%" url="img/lookup-object-action.png" title="Lookup Object action (at most 1)" %}

#### Configuration Fields
*   **Object** (dropdown, required): The type of object to look up.
*   **Type Of Search** (dropdown, required): Choose to look up the object by `Unique Fields` or `All Fields`.
*   **Lookup by field** (dropdown, required): The field to use for the lookup.
*   **Include referenced objects** (multiselect, optional): A list of related objects to include in the result.
*   **Allow criteria to be omitted** (checkbox, optional): If checked, an empty object will be returned if the lookup criteria is missing from the input.
*   **Allow zero results** (checkbox, optional): If checked, an empty object will be returned if no matching record is found.
*   **Pass binary data to the next component...**: If checked, and if the found object contains a binary field, its data will be passed as an attachment.
*   **Enable Cache Usage** (checkbox, optional): Enables caching for this action.

#### Limitations
1.  Selecting a binary field (e.g., in Documents or Attachments) under **Include referenced objects** will cause a `MALFORMED_QUERY` error.
2.  The action does not support looking up objects where the lookup field value is `null`.
3.  Passing binary data as an attachment may fail if used with a Local Agent.

## Lookup Objects

Looks up a list of objects that satisfy the specified criteria.

{% include img.html max-width="100%" url="img/lookup-object-actions.png" title="Lookup Object actions" %}

#### Configuration Fields
*   **Object** (dropdown, required): The type of object to look up.
*   **Include deleted** (checkbox, optional): If checked, deleted records will be included in the results.
*   **Output method** (dropdown, required): Choose to `Emit all`, `Emit page`, or `Emit individually`.
*   **Number of search terms** (integer, required): The number of filter conditions to apply (0-99).
*   **Enable Cache Usage** (checkbox, optional): Enables caching for this action.
*   **Max Fetch Count** (integer, optional): The maximum number of records to fetch. Defaults to `1000`.

#### Input Metadata
The input metadata changes based on the **Output method** and the **Number of search terms**.

#### Output Metadata
An object with a `results` property, which contains an array of found objects.

## Query Action

Executes a SOQL query.

{% include img.html max-width="100%" url="img/query-action.png" title="Query action" %}

#### Configuration Fields
*   **Optional batch size** (integer, optional): If specified, results will be emitted in arrays of this size. If empty, results are emitted one-by-one.
*   **Allow all results to be returned in a set** (checkbox, optional): If checked, all results are returned in a single array, ignoring batch size.
*   **Include deleted** (checkbox, optional): If checked, deleted records will be included in the results.
*   **Max Fetch Count** (integer, optional): The maximum number of records to fetch. Defaults to `1000`.

#### Input Metadata
*   **SOQL Query** (string, required): The SOQL query to execute.

## Raw Request

Executes a custom REST API call to a Salesforce endpoint.

{% include img.html max-width="100%" url="img/raw-request.png" title="Raw Request" %}

#### Configuration Fields
*   **HTTP Verb** (dropdown, required): The HTTP method to use (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
*   **Path** (string, required): The URL path for the request. 
    *   For standard REST API calls, use a relative path (e.g., `query/?q=SELECT+Id,Name+FROM+Account`).
    *   For other services like Apex REST, provide the full URL.
*   **Request Body** (object, optional): The body to attach to the request.

#### Output Metadata
*   **Response Object**: The HTTP response body from the API call.

## Upsert Object

Creates a new object or updates an existing one.

{% include img.html max-width="100%" url="img/upsert-object-action.png" title="Upsert Object action" %}

#### Configuration Fields
*   **Object** (dropdown, required): The type of object to upsert.
*   **Type Of Search** (dropdown, required): The type of field to use for the lookup.
    *   `External IDs`: Uses Salesforce's native, high-performance upsert functionality based on an External ID field.
    *   `Unique Fields` or `All Fields`: The component will first look up an object. If one is found, it is updated. If none are found, a new one is created. If multiple are found, an error is thrown.
*   **Lookup by field** (dropdown, required): The field to use for the lookup, based on the **Type Of Search**.

#### Input Metadata
Dynamically generated based on the selected object and lookup field.

#### Output Metadata
*   **id**: The unique Salesforce identifier of the created or updated object.
*   **success**: A boolean indicating the result of the operation.
*   **errors**: An array of errors if the operation failed.