---
title: Microsoft Dynamics NAV 2015 component
layout: component
section: ERP components
description: A enterprise resource planning (ERP) software.
icon: microsoft-dynamic-nav-2015.png
icontext: Microsoft-Dynamics-NAV-2015 component
category: Microsoft Dynamics NAV 2015
createdDate: 2015-09-10
updatedDate: 2019-11-07
---

## Description

Microsoft Dynamics NAV is a global enterprise resource planning (ERP) solution that provides small and midsize businesses greater control over their financials and can simplify their supply chain, manufacturing, and operations.

## Credentials

| Property name | Required |
|--------------|--------|
| Username     | true   |
| Password     | true   |
| Company      | true   |
| Service URL  | true   |


## Triggers

### Dependency to ChangeLog

The component triggers make use of the Navision ChangeLog to identify latest changes.

Before using this component, you need to enable ChangeLog for the following:

* Customer (Insertion, modification, deletion)
* Sales Invoice Header (Insertion, modification)
* Customer (Insertion, modification, deletion)
* Contact (Insertion, modification, deletion)
* Item (Insertion, modification, deletion)
* Customer Price Group (Insertion, modification, deletion)
* Sales Price (Insertion, modification, deletion)
* Units (Insertion, modification, deletion)

### Paging

The component triggers use the "nextLink" property for paging.
The amount of items per page is determined by the Max Page Size setting in the configuration for the Microsoft Dynamics NAV Server instance that you are using for OData services.
More information here: https://msdn.microsoft.com/en-us/library/hh168522(v=nav.90).aspx

### Field "Number of Pages retrieved per Flow Run"

This property defines the number of pages which should be retrieved for each flow iteration which is part of the *initial sync*.
It will have effect *when the snapshot date time field is empty*.
It was created to support first time synchronization, when there is a high amount of initial data - it will help retrieve it in more batches, with one flow execution per batch.
Before using it, you need to be aware of the *Max Page Size setting* of the Microsoft Dynamics NAV Server instance which you are using.

#### Expected behaviour:

##### Params:

* 2450 Products available on the Nav Server
* NAV Server instance Max Page Size is 100
* Number of Pages to retrieve per flow run is 5

##### Flow behaviour:

Start of first time sync => Empty snapshot

* Run 1: Gets 500 products, saves nextLink in snapshot
* Run 2: Gets next 500 products, saves nextLink in snapshot
* Run 3: Gets next 500 products, saves nextLink in snapshot
* Run 4: Gets next 500 products, saves nextLink in snapshot
* Run 5: Gets next 500 products, saves snapshot as date time value

End of first time sync => All runs after this will *no longer use* the page limit property

## Actions

### Custom fields

The component is using dynamic metadata, and custom fields added will show up automatically in the elastic.io platform mapper.

Actions 'upsertContact' and 'upsertCustomer' make use of:
* externalPrimaryContactID
* externalCustomerID
* externalContactID

### Update fields

The component will use certain fields for checking if an item already exists. Based on this, the component will decide if 'Update' or 'Create' will be used.

1. upsertContact - No, externalContactId
2. upsertCustomer - No, externalCustomerId

### Extend/Expose Actions

#### General notes

These actions are used together with a trigger, to complete or extend the information provided by it.
They will not create or update anything.

##### Mapping info

The action will emit the *message* it receives as input + the extra data.
This means that whatever information you need from the trigger, needs to mapped as input to the action too, so you can access it after using the action.

#### Expose lines

This is used to get Details of Invoices, Quotes and Orders.
The triggers for these entities will not retrieve lines - and the output will be of little use by its own.
The complete entitiy information is obtained by using the action to extend the information returned by the trigger.
This was done for performance reasons.

##### Dependencies

For this to work, the following functionality must be enabled on the Navision Instance:
https://msdn.microsoft.com/en-us/library/hh167449(v=nav.90).aspx

##### Mapping info

The action has a "Document type" select view. Use "SalesHeader" for Quotes and Orders and "SalesInvoiceHeader" for Invoices.
For Quotes and Orders you need to also map "Document_Type" in the mapper.

#### Expose customers

This can be used to identify the Customer associated to a Contact, using the Company_No property.

## Performance

For optimal performance, it is recommended to consider the following:

1. Configure a smaller page size in Navision, for example 100 instead of the default 1000
2. Make the first synchronization in more flow runs, so fewer items are processed per flow iteration. this can be achieved using the triggers "Pages per run" parameter, as described above
3. Allocate additional memory to Navision containers, using elastic.io Repo Environment Variables
