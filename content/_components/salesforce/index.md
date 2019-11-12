---
title: Salesforce Component
layout: component
section: CRM components
description: A component enables you to manage your organization’s sales, marketing and customer support assets, far beyond email addresses and phone numbers.
icon: salesforce.png
icontext: Salesforce component
category: salesforce
createdDate: 2019-06-27
updatedDate: 2019-10-28
---

## Description

Integration component to connect the Salesforce for the [{{site.data.tenant.name}} platform](http://www.{{site.data.tenant.name}}).

> **Note**: The component works with the Salesforce API. This means you must
> make sure your Salesforce edition has API Access enabled. To check which editions
> have API access see the [Salesforce editions with API Access](https://help.salesforce.com/articleView?id=000326486&type=1&mode=1) document.
> **If your edition has no API Access by default this component _will not work for you_.**

### API version

The component uses Salesforce - API Version 25.0, except:
-   Action: Lookup Object - API Version 39.0
-   Action: Query - API Version 39.0
-   Action: Upsert Other Object - API Version 39.0

The [component completeness](completeness-matrix) matrix gives the technical
details about Salesforce objects this component covers.

## Requirements

### Credentials

During credentials creation you would need to:

*   Choose `Environment`
*   Enter ``Username`` and ``Password`` in a pop-up window after click on ``Authenticate`` button.
*   Verify and save your new credentials.

> **Note**: When you deploy the Salesforce component separately into a dedicated tenant or
> into your developer team it can not use the OAuth App specifically created for
> our main {{site.data.tenant.name}} tenant. For this purposes you must create a
> different OAuth App and add the required environment variables to the component setup.

### Environment variables

Read these instructions in case you have a custom deployment of the Salesforce
component. The authentication is done via `OAuth 2.0` which means you need to provide
the appropriate environment variables so the platform can make the 3-leg authentication
on your behalf.

In the component repository you need to specify OAuth Client credentials as
environment variables:

-   `SALESFORCE_KEY` - your OAuth client key
-   `SALESFORCE_SECRET` - your OAuth client secret

To get these values you can check the
[creating OAuth App for Salesforce](creating-oauth-app-for-salesforce) article.


## Triggers

### Query

Continuously runs the same SOQL Query and emits results one-by-one.

Use the Salesforce Object Query Language (SOQL) to search your organization's
Salesforce data for specific information. SOQL is similar to the `SELECT` statement
in the widely used Structured Query Language (`SQL`) but is designed specifically
for Salesforce data. This action allows you to interact with your data using SOQL.

*  **SOQL Query** - Input field for your SOQL Query


### New Case

Polls existing and updated Cases

### New Lead

Polls existing and updated Leads

### New Contact

Polls existing and updated Contacts

### New Account
Polls existing and updated Accounts

### New Task

Polls existing and updated Tasks

### New Other Object

Polls existing and updated objects. You can select any custom or built-in object
for your Salesforce instance.

*  **Object** - Input field where you should select the type of object which updates you want to get. E.g. `Account`


## Actions

### Query

Executing a SOQL Query that may return many objects. Each resulting object is
emitted one-by-one. Use the Salesforce Object Query Language (SOQL) to search
your organization's Salesforce data for specific information. SOQL is similar to
the `SELECT` statement in the widely used Structured Query Language (`SQL`) but
is designed specifically for Salesforce data. This action allows you to interact
with your data using SOQL.

Here is the description of input fields:

*   **Optional batch size** - A positive integer specifying batch size. If no batch size is specified then results of the query will be emitted one-by-one, otherwise, query results will be emitted in an array of maximum batch size.
*   **Allow all results to be returned in a set** - checkbox which allows emitting query results in a single array. `Optional batch size` option is ignored in this case.
*   **SOQL Query** - Input field where you should type the SOQL query. E.g. `"SELECT ID, Name from Contact where Name like 'John Smi%'"`

### New Account

Creates a new Account. Action creates a single object. Input metadata is fetched
dynamically from your Salesforce account. Output metadata is the same as input
metadata, so you may expect all fields that you mapped as input to be returned as output.

This action will automatically retrieve all existing fields of `Account` object
type that available on your Salesforce organization.

### New Case

Creates a new Case. Action creates a single object. Input metadata is fetched
dynamically from your Salesforce account. Output metadata is the same as input
metadata, so you may expect all fields that you mapped as input to be returned as output.

This action will automatically retrieve all existing fields of `Case` object type
that available on your Salesforce organization

### New Contact

Creates a new Contact. Action creates a single object. Input metadata is fetched
dynamically from your Salesforce account. Output metadata is the same as input
metadata, so you may expect all fields that you mapped as input to be returned as output.

This action will automatically retrieve all existing fields of `Contact` object
type that available on your Salesforce organization

### New Event

Creates a new Event. Action creates a single object. Input metadata is fetched
dynamically from your Salesforce account. Output metadata is the same as input
metadata, so you may expect all fields that you mapped as input to be returned as output.

This action will automatically retrieve all existing fields of `Event` object
type that available on your Salesforce organization

### New Lead

Creates a new Lead. Action creates a single object. Input metadata is fetched
dynamically from your Salesforce account. Output metadata is the same as input
metadata, so you may expect all fields that you mapped as input to be returned as output.

This action will automatically retrieve all existing fields of `Lead` object
type that available on your Salesforce organization.

### New Note

Creates a new Note. Action creates a single object. Input metadata is fetched
dynamically from your Salesforce account. Output metadata is the same as input
metadata, so you may expect all fields that you mapped as input to be returned as output.

This action will automatically retrieve all existing fields of `Note` object type
that available on your Salesforce organization

### New Task

Creates a new Task. Action creates a single object. Input metadata is fetched
dynamically from your Salesforce account. Output metadata is the same as input
metadata, so you may expect all fields that you mapped as input to be returned as output.

This action will automatically retrieve all existing fields of `Task` object type
that available on your Salesforce organization.

### New Other Object

Creates a new Selected Object. Action creates a single object. Input metadata is
fetched dynamically from your Salesforce account. Output metadata is the same as
input metadata, so you may expect all fields that you mapped as input to be returned as output.

* **Object** - Input field where you should choose the object type, which you want to find. E.g. `Account`

This action will automatically retrieve all existing fields of chosen object type that available on your Salesforce organization.

### Upsert Other Object

Creates or Updates Selected Object. Action creates a single object. Input metadata
is fetched dynamically from your Salesforce account. Output metadata is the same
as input metadata, so you may expect all fields that you mapped as input to be returned as output.


*   **Object** - Input field where you should choose the object type, which you want to find. E.g. `Account`
*   **Optional Upsert field** - Input field where you should specify the ExternalID name field. E.g. `ExtId__c`.

You should specify **external** or **internal Id** for making some updates in salesforce object.
If you want to create new Object you should always specify **Optional Upsert field** and value of External Id in input body structure.

### Lookup Object

Lookup an object by a selected field. Action creates a single object. Input
metadata is fetched dynamically from your Salesforce account. Output metadata
is the same as input metadata, so you may expect all fields that you mapped as
input to be returned as output.

*   **Optional batch size** - A positive integer specifying batch size. If no batch size is specified then results of the query will be emitted one-by-one, otherwise, query results will be emitted in an array of maximum batch size.
*   **Object** - Input field where you should choose the object type, which you want to find. E.g. `Account`
*   **Lookup field** - Input field where you should choose the lookup field which you want to use for result filtering. E.g. `Id`.

```For now, you can specify all unique, lookup, ExternalID/Id fields. ```

#### Execution result handling

| Condition | Execution result |
|----------|------------------|
| Lookup failed - we were not able to find any parent object. | Lookup action emits a single message with an empty body. |
| Lookup found a single object, e.g. we were able to identify a parent Account to the Contact | A single message will be emitted, found object will be a body of the message |
| Lookup found multiple objects (that may happen when a lookup is made by non-unique field) | Each found object will be emitted with the separate message |
