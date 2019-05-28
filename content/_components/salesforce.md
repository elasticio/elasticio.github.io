---
title: Salesfoce Component
layout: article
section: Basic Components
---

Integration component for Salesforce API for the {{site.data.tenant.name}} platform.

### Purpose
Salesforce component is designed for Salesforce API integration.

###  Completeness Matrix
![image](https://user-images.githubusercontent.com/36419533/51548396-e80f5480-1e70-11e9-96d4-afaf697dd694.png)

[Salesforse-component Completeness Matrix](https://docs.google.com/spreadsheets/d/1_4vvDLdQeXqs3c8OxFYE80CvpeSC8e3Wmwl1dcEGO2Q/edit?usp=sharing)


### API version
The component uses Salesforce - API Version 25.0, except:
- Action: Lookup Object - API Version 39.0
- Action: Query - API Version 39.0
- Action: Upsert Other Object - API Version 39.0

### Authentication
Authentication occurs via OAuth 2.0.
In the component repository you need to specify OAuth Client credentials as environment variables:
- ```SALESFORCE_KEY``` - your OAuth client key
- ```SALESFORCE_SECRET``` - your OAuth client secret

## Create new App in Salesforce

In order to make OAuth work, you need a new App in your Salesforce. During app creation process you will be asked to specify
the callback URL, to process OAuth authentication via {{site.data.tenant.name}} platform your callback URL should be

```https://your-tenant-url/callback/oauth2```

More information you can find [here](https://help.salesforce.com/apex/HTViewHelpDoc?id=connected_app_create.htm)

## Credentials

During credentials creation you would need to:
- choose ``Environment``
- enter ``Username`` and ``Password`` in a pop-up window after click on ``Authenticate`` button.
- verify and save your new credentials.

## Actions
### Query
Executing a SOQL Query that may return many objects. Each resulting object is emitted one-by-one. Use the Salesforce Object Query Language (SOQL) to search your organization’s Salesforce data for specific information. SOQL is similar to the SELECT statement in the widely used Structured Query Language (SQL) but is designed specifically for Salesforce data. This action allows you to interact with your data using SOQL.

#### Input fields description
* **Optional batch size** - A positive integer specifying batch size. If no batch size is specified then results of the query will be emitted one-by-one, otherwise, query results will be emitted in an array of maximum batch size.
* **Allow all results to be returned in a set** - checkbox which allows emitting query results in a single array. `Optional batch size` option is ignored in this case.
* **SOQL Query** - Input field where you should type the SOQL query. E.g. `"SELECT ID, Name from Contact where Name like 'John Smi%'"`

### New Account
Creates a new Account.
Action creates a single object. Input metadata is fetched dynamically from your Salesforce account. Output metadata is the same as input metadata, so you may expect all fields that you mapped as input to be returned as output.

#### Input fields description
This action will automatically retrieve all existing fields of `Account` object type that available on your Salesforce organization.

### New Case
Creates a new Case.
Action creates a single object. Input metadata is fetched dynamically from your Salesforce account. Output metadata is the same as input metadata, so you may expect all fields that you mapped as input to be returned as output.

#### Input fields description
This action will automatically retrieve all existing fields of `Case` object type that available on your Salesforce organization

### New Contact
Creates a new Contact.
Action creates a single object. Input metadata is fetched dynamically from your Salesforce account. Output metadata is the same as input metadata, so you may expect all fields that you mapped as input to be returned as output.

#### Input fields description
This action will automatically retrieve all existing fields of `Contact` object type that available on your Salesforce organization

### New Event
Creates a new Event.
Action creates a single object. Input metadata is fetched dynamically from your Salesforce account. Output metadata is the same as input metadata, so you may expect all fields that you mapped as input to be returned as output.

#### Input fields description
This action will automatically retrieve all existing fields of `Event` object type that available on your Salesforce organization

### New Lead
Creates a new Lead.
Action creates a single object. Input metadata is fetched dynamically from your Salesforce account. Output metadata is the same as input metadata, so you may expect all fields that you mapped as input to be returned as output.

#### Input fields description
This action will automatically retrieve all existing fields of `Lead` object type that available on your Salesforce organization

### New Note
Creates a new Note.
Action creates a single object. Input metadata is fetched dynamically from your Salesforce account. Output metadata is the same as input metadata, so you may expect all fields that you mapped as input to be returned as output.

#### Input fields description
This action will automatically retrieve all existing fields of `Note` object type that available on your Salesforce organization

### New Task
Creates a new Task.
Action creates a single object. Input metadata is fetched dynamically from your Salesforce account. Output metadata is the same as input metadata, so you may expect all fields that you mapped as input to be returned as output.

#### Input fields description
This action will automatically retrieve all existing fields of `Task` object type that available on your Salesforce organization

### New Other Object
Creates a new Selected Object.
Action creates a single object. Input metadata is fetched dynamically from your Salesforce account. Output metadata is the same as input metadata, so you may expect all fields that you mapped as input to be returned as output.

#### Input fields description
* **Object** - Input field where you should choose the object type, which you want to find. E.g. `Account`

This action will automatically retrieve all existing fields of chosen object type that available on your Salesforce organization

### Upsert Other Object
Creates or Updates Selected Object.
Action creates a single object. Input metadata is fetched dynamically from your Salesforce account. Output metadata is the same as input metadata, so you may expect all fields that you mapped as input to be returned as output.

#### Input field description
* **Object** - Input field where you should choose the object type, which you want to find. E.g. `Account`
* **Optional Upsert field** - Input field where you should specify the ExternalID name field. E.g. `ExtId__c`.

You should specify **external** or **internal Id** for making some updates in salesforce object.
If you want to create new Object you should always specify **Optional Upsert field** and value of ExternalId in input body structure.

### Lookup Object
Lookup an object by a selected field.
Action creates a single object. Input metadata is fetched dynamically from your Salesforce account. Output metadata is the same as input metadata, so you may expect all fields that you mapped as input to be returned as output.

#### Input field description
* **Optional batch size** - A positive integer specifying batch size. If no batch size is specified then results of the query will be emitted one-by-one, otherwise, query results will be emitted in an array of maximum batch size.
* **Object** - Input field where you should choose the object type, which you want to find. E.g. `Account`
* **Lookup field** - Input field where you should choose the lookup field which you want to use for result filtering. E.g. `Id`.

```For now, you can specify all unique, lookup, ExternalID/Id fields. ```

##### Execution result handling
|Condition | Execution result |
|----------|------------------|
|Lookup failed - we were not able to find any parent object. |Lookup action emits a single message with an empty body.|
|Lookup found a single object, e.g. we were able to identify a parent Account to the Contact|A single message will be emitted, found object will be a body of the message|
|Lookup found multiple objects (that may happen when a lookup is made by non-unique field) | Each found object will be emitted with the separate message|


## Triggers
### Query
Continuously runs the same SOQL Query and emits results one-by-one.
Use the Salesforce Object Query Language (SOQL) to search your organization’s Salesforce data for specific information. SOQL is similar to the SELECT statement in the widely used Structured Query Language (SQL) but is designed specifically for Salesforce data. This action allows you to interact with your data using SOQL.

#### List of Expected Config fields

* **SOQL Query** - Input field for your SOQL Query


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
Polls existing and updated objects. You can select any custom or built-in object for your Salesforce instance.

#### Input field description
* **Object** - Input field where you should select the type of object which updates you want to get. E.g. `Account`
