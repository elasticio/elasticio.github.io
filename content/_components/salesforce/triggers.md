---
title: Salesforce triggers
layout: component
description: Salesforce component triggers.
icon: salesforce.png
icontext: Salesforce component
category: salesforce
updatedDate: 2023-09-28
ComponentVersion: 2.7.2
---

## Get Updated Objects Polling

### Config Fields

 * **Object Type** Dropdown: Indicates Object Type to be fetched.
 * **Selected Fields** Multiselect dropdown: list with all Object Fields. Select fields, which will be returned in response. That can prevent [431 and 414 Errors](https://developer.salesforce.com/docs/atlas.en-us.salesforce_app_limits_cheatsheet.meta/salesforce_app_limits_cheatsheet/salesforce_app_limits_platform_api.htm).
 * **Include linked objects** Multiselect dropdown: list with all the related child and parent objects of the selected object type. List entries are given as `Object Name/Reference To (Relationship Name)`. Select one or more related objects, which will be join queried and included in the response from your Salesforce Organization. Please see the **Limitations** section below for use case advisories.
 * **Emit behavior** Dropdown: Indicates emit objects individually or emit by page.
 * **Start Time** - TextField (string, optional): Indicates the beginning time to start retrieving events from in ISO 8601 Date time utc format - `YYYY-MM-DDThh:mm:ssZ`.
 * **End Time** - TextField (string, optional, defaults to never): If provided, don’t fetch records modified after this time in ISO 8601 Date time utc format - `YYYY-MM-DDThh:mm:ssZ`.
 * **Size of Polling Page** - TextField (optional, positive integer, max 10000, defaults to 10000): Indicates the size of pages to be fetched.
 * **Process Single Page Per Execution** - Checkbox: Indicates that if the number of changed records exceeds the maximum number of results in a page, instead of fetching the next page immediately, wait until the next flow start to fetch the next page.

#### Output Metadata

- For `Fetch page`: An object with key ***results*** that has an array as its value.
- For `Emit Individually`:  Each object fill the entire message.

### Limitations

 * If records reach `Size of Polling Page` flow will find largest update date and use it as `Start Time` for next iterations, results with this date will be excluded from that iteration and include in the next one.
 * If all records from one iteration will have same 'LastModifiedDate' they will be proceed, but all objects in the next iteration will start from date strictly greater than this, to avoid this use bigger `Size of Polling Page`.
 * Highly not recommended use very small (less than 5) `Size of Polling Page` (look at previous point).
 * When a binary field (primitive type `base64`, e.g. Documents, Attachments, etc) is selected on **Include linked objects**, an error will be thrown: `MALFORMED_QUERY: Binary fields cannot be selected in join queries. Instead of querying objects with binary fields as linked objects (such as children Attachments), try querying them directly.` There is also a limit to the number of linked objects that you can query at once - beyond two or three, depending on the number of fields in the linked objects, Salesforce could potentially return a Status Code 431 or 414 error, meaning the query is too long. Finally, due to a bug with multiselect dropdowns, it is recommended to deselect all of the elements in this field before you change your selection in the *Object* dropdown list.

## Query trigger

Continuously runs the same SOQL Query and emits results according to `Output method` configuration field.
Use the Salesforce Object Query Language (SOQL) to search your organization’s Salesforce data for specific information.
SOQL is similar to the SELECT statement in the widely used Structured Query Language (SQL) but is designed specifically for Salesforce data.
This trigger allows you to interact with your data using SOQL.

{% include img.html max-width="100%" url="img/query-trigger.png" title="Query trigger - configure input" %}

### List of Expected Config fields trigger

* **SOQL Query** - Input field for your SOQL Query.

* **Output method** - dropdown list with options: `Emit all` - all found records will be emitted in one array `records`, and `Emit individually` - each found object will be emitted individual. Optional field, defaults to: `Emit individually`.

* **Don't emit on empty results** - checkbox, optional. If selected, component will not produce empty messages when result is empty.

### SOQL Query Input example

```
SELECT id, Name, Phone, Birthdate, Likes_Ice_Cream
FROM Contract
WHERE Phone != null
LIMIT 5
```

>**Please Note:** Max possible fetch size is 2000 objects per execution.

## Subscribe to platform events trigger

This trigger will subscribe for any platform Event using Salesforce streaming API:

{% include img.html max-width="100%" url="img/subscribe-trigger.png" title="Subscribe to platform events trigger" %}

>**Please note:** REALTIME FLOWS ONLY

### Input field description

* **Event object name** - Input field where you should select the type of platform event which you want to subscribe E.g. `My platform event`

### How to create new custom Platform event Entity:

`Setup --> Integrations --> Platform Events --> New Platform Event`

{% include img.html max-width="100%" url="img/platform-events.png" title="Platform Events" %}

You can find more detail information in the [Platform Events Intro Documentation](https://developer.salesforce.com/docs/atlas.en-us.platform_events.meta/platform_events/platform_events_intro.htm).

## Subscribe to PubSub

This trigger will subscribe for any platform Event using [Pub/Sub API](https://developer.salesforce.com/docs/platform/pub-sub-api/overview).

### Config Fields
* **Event object name** - (dropdown, required): Input field where you should select the type of platform event to which you want to subscribe E.g. `My platform event`.
* **Pub/Sub API Endpoint** - (string, optional): You can set Pub/Sub API Endpoint manually or leave it blank for default: `api.pubsub.salesforce.com:7443`. Details about Pub/Sub API Endpoints can be found [here](https://developer.salesforce.com/docs/platform/pub-sub-api/guide/pub-sub-endpoints.html).
* **Number of events per request** - (positive integer, optional, defaults to 10, max 100): Salesforce uses batches of events to deliver to the component, the bigger number may increase processing speed, but if the batch size is too big, you can get out of memory error. If there are fewer events ready than the batch size, they will be delivered anyway.
* **Start from Replay Id** - (positive integer, optional): In the Salesforce platform events and change data capture events are retained in the event bus for 3 days and you can subscribe at any position in the stream by providing here Replay Id from the last event. This field is used only for the first execution, following executions will use the Replay Id from the latest event to get a new one.

### Output Metadata
* **event** - (object, required): Store `replayId` of this message which can be used to retrieve records that were created after (using it as `Start from Replay Id` in configuration).
* **payload** - (object, required): Dynamically generated content of the event.

### Limitations:
* The component starts tracking changes after the first execution (it means you have to "run-now" flow with this trigger or wait for the first execution by the scheduler to establish a connection and only after this new event will be listened).
* If you use "Ordinary" flow:
    * Make sure that you execute it at least once per 3 days - according to the [documentation](https://developer.salesforce.com/docs/platform/pub-sub-api/references/methods/subscribe-rpc.html#replaying-an-event-stream) Salesforce stores events for up to 3 days.
* To `Retrieve new sample from Salesforce v2` you need to trigger an event on Salesforce side or provide a sample manually.
