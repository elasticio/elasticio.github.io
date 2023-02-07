---
title: Salesforce triggers
layout: component
description: Salesforce component triggers.
icon: salesforce.png
icontext: Salesforce component
category: salesforce
updatedDate: 2023-01-02
ComponentVersion: 2.5.1
---

## Get Updated Objects Polling

### Config Fields

 * **Object Type** Dropdown: Indicates Object Type to be fetched
 * **Selected Fields** Multiselect dropdown: list with all Object Fields. Select fields, which will be returned in response. That can prevent [431 and 414 Errors](https://developer.salesforce.com/docs/atlas.en-us.salesforce_app_limits_cheatsheet.meta/salesforce_app_limits_cheatsheet/salesforce_app_limits_platform_api.htm).
 * **Include linked objects** Multiselect dropdown: list with all the related child and parent objects of the selected object type. List entries are given as `Object Name/Reference To (Relationship Name)`. Select one or more related objects, which will be join queried and included in the response from your Salesforce Organization. Please see the **Limitations** section below for use case advisories.
 * **Emit behavior** Dropdown: Indicates emit objects individually or emit by page
 * **Start Time** - TextField (string, optional): Indicates the beginning time to start retrieving events from in ISO 8601 Date time utc format - YYYY-MM-DDThh:mm:ssZ
 * **End Time** - TextField (string, optional, defaults to never): If provided, don’t fetch records modified after this time in ISO 8601 Date time utc format - YYYY-MM-DDThh:mm:ssZ
 * **Size of Polling Page** - TextField (optional, positive integer, max 10000, defaults to 10000): Indicates the size of pages to be fetched
 * **Process Single Page Per Execution** - Checkbox: Indicates that if the number of changed records exceeds the maximum number of results in a page, instead of fetching the next page immediately, wait until the next flow start to fetch the next page

#### Output Metadata

- For `Fetch page`: An object with key ***results*** that has an array as its value
- For `Emit Individually`:  Each object fill the entire message

### Limitations

 * If records reach `Size of Polling Page` flow will find largest update date and use it as `Start Time` for next iterations, results with this date will be excluded from that iteration and include in the next one.
 * If all records from one iteration will have same 'LastModifiedDate' they will be proceed, but all objects in the next iteration will start from date strictly greater than this, to avoid this use bigger `Size of Polling Page`
 * Highly not recommended use very small (less than 5) `Size of Polling Page` (look at previous point)
 * When a binary field (primitive type `base64`, e.g. Documents, Attachments, etc) is selected on **Include linked objects**, an error will be thrown: `MALFORMED_QUERY: Binary fields cannot be selected in join queries. Instead of querying objects with binary fields as linked objects (such as children Attachments), try querying them directly.` There is also a limit to the number of linked objects that you can query at once - beyond two or three, depending on the number of fields in the linked objects, Salesforce could potentially return a Status Code 431 or 414 error, meaning the query is too long. Finally, due to a bug with multiselect dropdowns, it is recommended to deselect all of the elements in this field before you change your selection in the *Object* dropdown list.

### Query Trigger

Continuously runs the same SOQL Query and emits results according to ``Output method`` configuration field.
Use the Salesforce Object Query Language (SOQL) to search your organization’s Salesforce data for specific information.
SOQL is similar to the SELECT statement in the widely used Structured Query Language (SQL) but is designed specifically for Salesforce data.
This trigger allows you to interact with your data using SOQL.

#### List of Expected Config fields

* **SOQL Query** - Input field for your SOQL Query
* **Output method** - dropdown list with options: `Emit all` - all found records will be emitted in one array `records`, and `Emit individually` - each found object will be emitted individual. Optional field, defaults to: `Emit individually`.

### Subscribe to platform events (REALTIME FLOWS ONLY)

This trigger will subscribe for any platform Event using Salesforce streaming API.

#### Input field description

* **Event object name** - Input field where you should select the type of platform event which you want to subscribe E.g. `My platform event`

#### How to create new custom Platform event Entity:

`Setup --> Integrations --> Platform Events --> New Platform Event`
![Screenshot from 2019-03-11 11-51-10](https://user-images.githubusercontent.com/13310949/54114889-1088e900-43f4-11e9-8b49-3a8113b6577d.png)

You can find more detail information in the [Platform Events Intro Documentation](https://developer.salesforce.com/docs/atlas.en-us.platform_events.meta/platform_events/platform_events_intro.htm).

#### Limitations

At the moment this trigger can be used only for **"Realtime"** flows.

## Query trigger

Continuously runs the same SOQL Query and emits results one-by-one.
Use the Salesforce Object Query Language (SOQL) to search your organization’s Salesforce data for specific information. SOQL is similar to the SELECT statement in the widely used Structured Query Language (SQL) but is designed specifically for Salesforce data. This trigger allows you to interact with your data using SOQL.

### List of Expected Config fields trigger

* **SOQL Query** - Input field for your SOQL Query

* **Output method** - dropdown list with options: `Emit all` - all found records will be emitted in one array `records`, and `Emit individually` - each found object will be emitted individual. Optional field, defaults to: `Emit individually`.

![Query trigger - configure input](img/query-trigger.png)

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

![Subscribe to platform events trigger](img/subscribe-trigger.png)

>**Please note:** REALTIME FLOWS ONLY

### Input field description

* **Event object name** - Input field where you should select the type of platform event which you want to subscribe E.g. `My platform event`

### How to create new custom Platform event Entity:

`Setup --> Integrations --> Platform Events --> New Platform Event`

![Platform Events](img/platform-events.png)

You can find more detail information in the [Platform Events Intro Documentation](https://developer.salesforce.com/docs/atlas.en-us.platform_events.meta/platform_events/platform_events_intro.htm).
