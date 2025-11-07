---
title: Salesforce triggers
layout: component
description: Salesforce component triggers.
icon: salesforce.png
icontext: Salesforce component
category: salesforce
updatedDate: 2025-10-15
ComponentVersion: 2.9.0
---

## Get Updated Objects Polling
Polls for objects that have been created or updated within a given time frame.

#### Configuration Fields
* **Object Type** (dropdown, required): The type of Salesforce object to be fetched.
* **Selected Fields** (multiselect, optional): A list of fields to be returned in the response. If left empty, all fields will be returned. Selecting only the necessary fields can prevent [431 and 414 Errors](https://developer.salesforce.com/docs/atlas.en-us.salesforce_app_limits_cheatsheet.meta/salesforce_app_limits_cheatsheet/salesforce_app_limits_platform_api.htm).
* **Include linked objects** (multiselect, optional): A list of related child and parent objects to be join-queried and included in the response. List entries are given as `Object Name/Reference To (Relationship Name)`.
* **Emit behavior** (dropdown, required): Choose to emit objects `Individually` or as a single `Fetch page`.
* **Start Time** (string, optional): The beginning of the time window to retrieve objects from, in ISO 8601 format (`YYYY-MM-DDThh:mm:ssZ`). Defaults to the beginning of time (`1970-01-01T00:00:00.000Z`).
* **End Time** (string, optional): If provided, the trigger will not fetch records modified after this time. Must be in ISO 8601 format.
* **Size of Polling Page** (integer, optional): The maximum number of records to fetch per page. Defaults to `10000`.
* **Process Single Page Per Execution** (checkbox, optional): If checked, the trigger will process only one page of results per flow execution. If unchecked, it will retrieve all pages in a single execution.

#### Required Permissions
Due to the trigger's use of keyset pagination for reliability, the user profile for the credential must have **read access** (Field-Level Security) to the `Id` and `LastModifiedDate` fields for the object being polled. Without these permissions, the trigger will fail.

#### Output Metadata
*   **For `Fetch page`:** An object with a `results` property, which contains an array of records.
*   **For `Emit Individually`:** Each record is emitted as a separate message.

### Limitations
*   When a binary field (primitive type `base64`, e.g., in Documents or Attachments) is selected via **Include linked objects**, an error will be thrown: `MALFORMED_QUERY: Binary fields cannot be selected in join queries.` Instead of querying these as linked objects, query them directly.
*   There is a limit to the number of linked objects that can be queried at once. Beyond two or three (depending on the number of fields), Salesforce may return a `431` or `414` error, indicating the query is too long.
*   Due to a known issue with multiselect dropdowns, it is recommended to deselect all items in the **Include linked objects** field before changing the **Object Type**.

## Query Trigger

Executes a user-defined SOQL query during each polling interval to fetch records.

Use the Salesforce Object Query Language (SOQL) to search your organization’s Salesforce data for specific information. SOQL is similar to the `SELECT` statement in SQL but is designed specifically for Salesforce data.

{% include img.html max-width="100%" url="img/query-trigger.png" title="Query trigger - configure input" %}

#### Configuration Fields
*   **SOQL Query** (string, required): The SOQL query to execute.
*   **Output method** (dropdown, optional): `Emit all` emits all found records in a single message with a `records` array. `Emit individually` emits each record as a separate message. Defaults to `Emit individually`.
*   **Don't emit on empty results** (checkbox, optional): If selected, the component will not produce an empty message if the query returns no results.

## Subscribe to Platform Events

Subscribes to a specified Platform Event using the Salesforce Streaming API.

{% include img.html max-width="100%" url="img/subscribe-trigger.png" title="Subscribe to platform events trigger" %}

#### How to Create a Platform Event

In Salesforce, navigate to `Setup --> Integrations --> Platform Events --> New Platform Event`.

{% include img.html max-width="100%" url="img/platform-events.png" title="Platform Events" %}

For more details, see the [Platform Events Intro Documentation](https://developer.salesforce.com/docs/atlas.en-us.platform_events.meta/platform_events/platform_events_intro.htm).

#### Configuration Fields
*   **Event object name** (dropdown, required): The name of the Platform Event to subscribe to (e.g., `My_Platform_Event__e`).

#### Limitations
*   **This trigger is designed for Real-time flows only** and is not supported in Ordinary flows.
*   Due to Salesforce API limitations, the trigger does not queue messages while the flow is in a `SUSPEND` state. To resume processing messages, you must manually trigger the flow with the **Run Now** action after it resumes.

## Subscribe to Pub/Sub Events

Subscribes to a specified Platform Event using the Salesforce [Pub/Sub API](https://developer.salesforce.com/docs/platform/pub-sub-api/overview).

#### Configuration Fields
*   **Event object name** (dropdown, required): The name of the Platform Event to subscribe to.
*   **Pub/Sub API Endpoint** (string, optional): The Pub/Sub API endpoint. If left blank, it defaults to `api.pubsub.salesforce.com:7443`. For more details, see the [Pub/Sub API Endpoints documentation](https://developer.salesforce.com/docs/platform/pub-sub-api/guide/pub-sub-endpoints.html).
*   **Number of events per request** (integer, optional): The maximum number of events to retrieve in a single batch. A larger batch size may improve performance, but setting it too high can cause memory errors. Defaults to `10` (max `100`).
*   **Start from Replay ID** (integer, optional): A specific Replay ID to start the event stream from. This is only used for the first execution. Subsequent executions will automatically use the Replay ID from the last processed event.

#### Output Metadata
*   **event**: An object containing the `replayId` of the message.
*   **payload**: An object containing the dynamically generated content of the event.

#### Limitations
*   The component begins tracking changes after the first execution. You must run the flow once (either manually or on its schedule) to establish the connection before events will be detected.
*   If you are using an **Ordinary (polling) flow**, you must ensure it executes at least once every 3 days, as Salesforce retains events for a maximum of 72 hours.
*   To retrieve a new sample, you must trigger an event in Salesforce or provide a sample manually.