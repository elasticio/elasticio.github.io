---
title: NetSuite component
layout: article
section: ERP Components
---
---
## Description

A component which interacts with the NetSuite ERP system.

## How works

Communication with NetSuite API established using NetSuite's native SDK. **2017.2**
NetSuite version is used and supported. The component will work with other NS
versions in most cases. But 100% compatibility could not be guaranteed.

## Requirements

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

## Credentials

### Get credentials in NetSuite

**Email**  - Email as a login for NetSuite account.

**Password** - Password for NetSuite account.

**Account**

Account Number to access NetSuite API. This number is required for the component t
o connect to NetSuite via native SuiteTalk API Can be found here:

1.  Go to Setup -> Integration -> Web Services Preferences
2.  Find ACCOUNT ID field there.
![Get Account Number](https://user-images.githubusercontent.com/8449044/44263739-c3abae00-a228-11e8-8de6-8e6b33c23be3.png)

**Application ID**

Application ID to access NetSuite API. This number is required for the component
to connect to NetSuite via native SuiteTalk API Can be found here:

1.  Go to Setup -> Integration -> Manage Integrations -> New
2.  Find APPLICATION ID field there.

![Get Application ID](https://user-images.githubusercontent.com/8449044/44274840-e4392f80-a24b-11e8-9d1d-00676e0b9217.png)

## Triggers

### Search Entity

Find an object or a set of objects using filter criteria (field, operator, value).
To start select the NetSuite component and follow the configuration option below:

*   `Entity types list` - Currently **Vendor payments** and **Customer payments** types are supported.
*   `Filter by field` - Drop-down has only two options: `dateCreated` or `lastModifiedDate`.
*   `Filter operator` - This drop-down enables the following parameter values: **after**, **before**, **notAfter**, **notBefore**, **notEmpty**, **on**, **notOn**, **notOnOrBefore**, **notOnOrAfter**, **onOrAfter** and **onOrBefore**.
*   `Filter value` - this is date and time in format `2018-01-01T00:00:00.000 -07:00`. At the end of trigger execution "Filter value" field change value to "Last trigger execution date" value. It is opportunity to load only new updated/created records from the NetSuite.

## Actions

### Lookup Customer

This action enables to find the customer by provided ID. It is possible to provide
**internal**, **external** id or **all** of them in input message.

If entity doesn't have `externalId` You must specify only `internalId` in
input message. If You specify incorrect internal or external id, You will get
error **That record does not exist.**

For example when the `externalId` exists the answer would be:

```javascript
{
  "internalId":"1234",
  "externalId":"4567"
}
```
When the `externalId` does not exist:

```javascript
{
  "internalId":"1234"
}
```

### Lookup Invoice

This action can be used to find invoices by provided ID.

You can provide **internal**, **external** id or **all** of them in input message.
If entity doesn't have `externalId` You must specify only `internalId` in input message.

If You specify incorrect internal or external id, You will get error "**That record does not exist.**"

For example if the `externalId` exists:

```javascript
{
  "internalId":"1234",
  "externalId":"4567"
}
```
If the `externalId` does not exist:

```javascript
{
  "internalId":"1234"
}
```

### Upsert Customer

Create new or update existing customer by provided external ID. The request
sample could look like:

```javascript
{
  "externalId": "external order ID",
  "customerId": "internal customer ID",
  "currency": "USA",
  "exchangeRate": 1.0,
  "orderItems": [
		{
			"itemInternalId": "387",
			"quantity": 10![Step 1](https://some-url-address)

		}
	]
}
```

### Upsert Contact

Create new or update existing contact by provided external ID.

Request sample:
```javascript
{
  "externalId": "entity164",
  "customForm": {
    "internalId": "-40",
    "name": "Standard Contact Form"
  },
  "entityId": "Olha Grogan",
  "salutation": "Mrs.",
  "firstName": "Olha",
  "lastName": "Grogan",
  "subsidiary": {
    "internalId": "1",
    "name": "Honeycomb Mfg."
  }
}
```

### Upsert Invoice

Create new or update existing invoice by provided external ID.

Request sample:
```javascript
{
  "externalId": "23213000001",
  "customForm": {
    "name": "HM Product Invoice",
    "internalId": "102"
  },
  "entity": {
    "name": "Jennings Financial",
    "internalId": "81"
  },
  "terms": {
    "name": "Net 30",
    "internalId": "2"
  },
  "subsidiary": {
    "name": "Honeycomb Mfg.",
    "internalId": "1"
  },
  "currency": {
    "name": "USA",
    "internalId": "1"
  },
  "location": {
    "name": "02: Boston",
    "internalId": "1"
  },
  "isTaxable": true,
  "taxItem": {
    "name": "CA-SAN MATEO",
    "internalId": "-112"
  },
  "taxRate": 8.25,
  "fax": "916-555-0806",
  "message": "We appreciate your prompt payment",
  "shipMethod": {
    "name": "Truck",
    "internalId": "3"
  },
  "itemList": {
    "item": [
      {
        "job": null,
        "item": {
          "name": "CHA00002®",
          "internalId": "707",
          "externalId": null,
          "type": null
        },
        "line": 1,
        "description": "Assembly Item - Historical",
        "amount": 7020,
        "isTaxable": null,
        "quantity": 36,
        "price": {
          "name": "List Price",
          "internalId": "1"
        },
        "rate": "195.00",
        "taxCode": {
          "name": "-Not Taxable-",
          "internalId": "-7"
        }
      }
    ],
    "replaceAll": false
  },
  "shippingCost": 704.25,
  "customFieldList": {
    "customField": [
      {
        "type": "BooleanCustomFieldRef",
        "internalId": "167",
        "scriptId": "custbody_fmt_senior_exec_declined",
        "value": false
      }
    ]
  }
}
```

## Upsert Sales Order

Create new or update existing sales order by provided external ID.

Request sample:

```javascript
{
  "externalId": "80144000000B5wqAAC",
  "orderStatus": "_pendingFulfillment",
  "currency": {
    "name": "USA",
    "internalId": "1"
  },
  "customForm": {
    "internalId": "174",
    "name": "Z - HM Sales Order Form"
  },
  "entity": {
    "internalId": "2053"
  },
  "exchangeRate": "1.0",
  "toBePrinted":"false"
}
```

### Upsert Vendor

Create new or update existing vendor by provided external ID.

Request sample:

```javascript
{
  "externalId": "9999",
  "entityId": "Nick",
  "isPerson": "false",
  "companyName": "Nick2",
  "phone": "937 99 92",
  "fax": "937 99 92",
  "email": "nick2@nickthebest.com",
  "url": "http://www.nickthebest2.com",
  "customFieldList": {
    "customField": [
      {
        "internalId": "3992",
        "scriptId": "custentity_2663_payment_method",
        "type": "BooleanCustomFieldRef",
        "value": "false"
      },
      {
        "internalId": "3993",
        "scriptId": "custentity_2663_payment_method",
        "type": "BooleanCustomFieldRef",
        "value": "false"
      }
    ]
  }
}
```

# Upsert custom fields:

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

**`BooleanCustomFieldRef`**

```javascript
{
  "internalId": "1",
  "scriptId": "script1",
  "value": true,
  "type": "BooleanCustomFieldRef"
}
```

**`DateCustomFieldRef`**

```javascript
{
  "internalId": "1",
  "scriptId": "script1",
  "value": "2018-01-01T00:00:00.000+00:00",
  "type": "DateCustomFieldRef"
}
```

**`DoubleCustomFieldRef`**

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

**`MultiSelectCustomFieldRef`**

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

**`SelectCustomFieldRef`**

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
**`StringCustomFieldRef`**

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
