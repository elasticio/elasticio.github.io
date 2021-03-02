---
title: NetSuite component
layout: component
section: ERP components
description: A component which interacts with the NetSuite ERP system.
icon: netsuite.png
icontext: NetSuite component
category: netsuite
updatedDate: 2021-02-26
ComponentVersion: 2.3.0
---

## How works

Communication with NetSuite API established using NetSuite's native SDK. **2017.2**
NetSuite version is used and supported. The component will work with other NS
versions in most cases. But 100% compatibility could not be guaranteed.

## Requirements

### API version

**2019.1** NetSuite version is used and supported. The component will work with other NS versions in most cases. But 100% compatibility could not be guaranteed.

### Environment variables

Component reuquires 1024 MB of RAM memory to properly function. It is recommended
to increase the RAM memory prior any activity. Contact Support for more.

### Enable web-service communication

NetSuite’s Web Services SOAP interface allows you to communicate with the ERP
and to integrate external systems with it. NetSuite's native SDK, which is used
for the communication in the component, uses NetSuite’s SOAP Web Services under
the hood.

By default web service communication is disabled in NetSuite. So it should be
enabled in order to allow component make calls. To enable Web Service communication:

1.  Go to Setup -> Company -> Enable Features
2.  Open SuiteCloud tab and tick there the 'Web Services' checkbox in the SuitTalk section
3.  Press Save

![Enable Web Service](https://user-images.githubusercontent.com/8449044/44262942-9a3d5300-a225-11e8-840d-834528f68776.png)

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about NetSuite component like [changelog](/components/netsuite/technical-notes#changelog).

## Authentication on platform

In order to use the functions of the NetSuite component, you need to go through the authentication process. Please follow the step by steps instruction on this [page](authentication).

## Triggers

NetSuite component includes the following triggers:

  1. [Get New and Updated Objects Polling](/components/netsuite/triggers#get-new-and-updated-objects-polling)                            
  Generic trigger that polls NetSuite instance for new and/or updated objects (of any type available in the NetSuite).

  2. [Polling objects](/components/netsuite/triggers#polling-objects)  
  Find an object or a set of objects was updated since last polling of time.

The following NetSuite triggers are deprecated:

  1. [Search Entity(deprecated)](/components/netsuite/deprecated-functions#search-entitydeprecated)                                                  
  Deprecated. Use [Get New and Updated Objects Polling](/components/netsuite/triggers#get-new-and-updated-objects-polling) trigger instead. Find an object or a set of objects using filter criteria (field, operator, value).

## Actions

NetSuite component includes the following actions:

  1. [Delete Object By Id](/components/netsuite/actions#delete-object-by-id)       
  Deletes an object by the ID provided.

  2. [Lookup Object By Id](/components/netsuite/actions#lookup-object-by-id)       
  Lookup an object by the ID provided.

  3. [Lookup Objects](/components/netsuite/actions#lookup-objects)       
  Looks for objects available in NetSuite which meet given criteria.

  4. [Upsert Object By Id](/components/netsuite/actions#upsert-object-by-id)       
  Either update an object in NetSuite by an ID provided or inserts as a new object if it does not exist.

The following Salesforce actions are deprecated:

  1. [Lookup Customer(deprecated)](/components/netsuite/deprecated-functions#lookup-customerdeprecated)       
  Deprecated. Use [Lookup Object By Id](/components/netsuite/actions#lookup-object-by-id) action instead. This action enables to find the customer by provided ID.

  2. [Lookup Invoice(deprecated)](/components/netsuite/deprecated-functions#lookup-invoicedeprecated)       
  Deprecated. Use [Lookup Object By Id](/components/netsuite/actions#lookup-object-by-id) action instead. This action can be used to find invoices by provided ID.

  3. [Upsert Customer(deprecated)](/components/netsuite/deprecated-functions#upsert-customerdeprecated)       
  Deprecated. Use [Lookup Object By Id](/components/netsuite/actions#lookup-object-by-id) action instead. Create new or update existing customer by provided external ID.

  4. [Upsert Contact(deprecated)](/components/netsuite/deprecated-functions#upsert-contactdeprecated)       
  Deprecated. Use [Upsert Object By Id](/components/netsuite/actions#upsert-object-by-id) action instead. Create new or update existing contact by provided external ID.

  5. [Upsert Invoice(deprecated)](/components/netsuite/deprecated-functions#upsert-invoicedeprecated)       
  Deprecated. Use [Upsert Object By Id](/components/netsuite/actions#upsert-object-by-id) action instead. Create new or update existing invoice by provided external ID.

  6. [Upsert Sales Order(deprecated)](/components/netsuite/deprecated-functions#upsert-sales-orderdeprecated)       
  Deprecated. Use [Upsert Object By Id](/components/netsuite/actions#upsert-object-by-id) action instead. Create new or update existing sales order by provided external ID.

  7. [Upsert Vendor(deprecated)](/components/netsuite/deprecated-functions#upsert-vendordeprecated)       
  Deprecated. Use [Upsert Object By Id](/components/netsuite/actions#upsert-object-by-id) action instead. Create new or update existing vendor by provided external ID.

## Upsert custom fields

Currently, You can upsert custom fields only from developer mode.
You should to use property **type**, which can accept next values:

-   `BooleanCustomFieldRef`
-   `DateCustomFieldRef`
-   `DoubleCustomFieldRef`
-   `LongCustomFieldRef`
-   `MultiSelectCustomFieldRef`
-   `SelectCustomFieldRef`
-   `StringCustomFieldRef`

 You can find example of custom field structures bellow.

- **`BooleanCustomFieldRef`**

```javascript
{
  "internalId": "1",
  "scriptId": "script1",
  "value": true,
  "type": "BooleanCustomFieldRef"
}
```

- **`DateCustomFieldRef`**

```javascript
{
  "internalId": "1",
  "scriptId": "script1",
  "value": "2018-01-01T00:00:00.000+00:00",
  "type": "DateCustomFieldRef"
}
```

- **`DoubleCustomFieldRef`**

```javascript
{
  "internalId": "1",
  "scriptId": "script1",
  "value": 3456.24,
  "type": "DoubleCustomFieldRef"
}
```

- **`LongCustomFieldRef`**

```javascript
{
  "internalId": "1",
  "scriptId": "script1",
  "value": 987979999,
  "type": "LongCustomFieldRef"
}
```

- **`MultiSelectCustomFieldRef`**

```javascript
{
  "internalId": "1",
  "scriptId": "script1",
  "value": [
      {
      "name":"item1",
      "internalId":"2134",
      "externalId":"9878",
      "typeId":"21"
      },
      {
        "name":"item2",
        "internalId":"2135",
        "externalId":"9879",
        "typeId":"21"
      }
  ],
  "type": "MultiSelectCustomFieldRef"
}
```

- **`SelectCustomFieldRef`**

```javascript
{
  "internalId": "1",
  "scriptId": "script1",
  "value": {
      "name":"item1",
      "internalId":"2134",
      "externalId":"9878",
      "typeId":"21"
      },
  "type": "SelectCustomFieldRef"
}
```

- **`StringCustomFieldRef`**

```javascript
{
  "internalId": "1",
  "scriptId": "script1",
  "value": "some value",
  "type": "StringCustomFieldRef"
}
```

## Links

[NetSuite API docs](http://www.netsuite.com/portal/developers/resources/suitetalk-documentation.shtml).
