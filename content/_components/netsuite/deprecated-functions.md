---
title: Deprecated NetSuite functions
layout: component
description: Information on deprecated NetSuite functions
icon: netsuite.png
icontext: NetSuite component
category: netsuite
updatedDate: 2021-02-26
ComponentVersion: 2.3.0
---

## Deprecated Triggers

### Search Entity(deprecated)

Deprecated. Use [Get New and Updated Objects Polling](/components/netsuite/triggers#get-new-and-updated-objects-polling) trigger instead.

Find an object or a set of objects using filter criteria (field, operator, value).

### How to use Search Entity Trigger

#### Step 1

Find and select NetSuite component in the component repository

![Step 1](https://user-images.githubusercontent.com/16806832/44349305-75efa980-a4a5-11e8-8cd3-a9529ffd9625.png)

#### Step 2

Create new or select existing credentials

![Step 2](https://user-images.githubusercontent.com/16806832/44349488-cf57d880-a4a5-11e8-86d6-542e13536de1.png)

#### Step 3

Specify parameters for searching entity
The component supports next entity types for now:
 - Customer payments
 - Vendor payments

 Supported entity list can be extended in future.

![Step 3](https://user-images.githubusercontent.com/16806832/44348950-8d7a6280-a4a4-11e8-8201-2a1610dab8f0.png)

##### Step 3.1

Select "Entity type" from drop-down list, you can choose "Vendor payment" or "Customer payment"

![Step 3.1](https://user-images.githubusercontent.com/16806832/44349277-5a849e80-a4a5-11e8-908f-820812e826ad.png)

##### Step 3.2

Select options "Filter by field" from drop-down list, you can choose "dateCreated" or "lastModifiedDate"

![Step 3.2](https://user-images.githubusercontent.com/16806832/44349548-f1e9f180-a4a5-11e8-804b-5d35bf8871db.png)

##### Step 3.3

Select options "Filter operator" from drop-down list, you can choose next one:

 - after
 - before
 - notAfter
 - notBefore
 - notEmpty
 - on
 - notOn
 - notOnOrBefore
 - notOnOrAfter
 - onOrAfter
 - onOrBefore

![Step 3.3](https://user-images.githubusercontent.com/16806832/44349714-51480180-a4a6-11e8-8b6f-dbb7e0aeed7b.png)

##### Step 3.4

Input "Filter value" - date and time in format "2018-01-01T00:00:00.000 -07:00"
At the end of trigger execution "Filter value" field change value to "Last trigger execution date" value.
It is opportunity to load only new updated/created records from the NetSuite.

![Step 3.4](https://user-images.githubusercontent.com/16806832/44350141-4cd01880-a4a7-11e8-88b9-9e002276458c.png)

#### Step 4

Retrieve sample or add sample manually

![Step 4: Retrieve sample](https://user-images.githubusercontent.com/16806832/44350423-07601b00-a4a8-11e8-933d-3617971eb0fc.png)

#### Step 5

Retrieve sample result

![Step 5: Retrieve sample result](https://user-images.githubusercontent.com/16806832/44350359-d849a980-a4a7-11e8-9f78-57023a0c2dfa.png)

## Deprecated Action

### Upsert Customer(deprecated)

Deprecated. Use [Lookup Object By Id](/components/netsuite/actions#lookup-object-by-id) action instead

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

### Upsert Contact(deprecated)

Deprecated. Use [Upsert Object By Id](/components/netsuite/actions#upsert-object-by-id) action instead.

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

### Upsert Invoice(deprecated)

Deprecated. Use [Upsert Object By Id](/components/netsuite/actions#upsert-object-by-id) action instead.

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

### Upsert Sales Order(deprecated)

Deprecated. Use [Upsert Object By Id](/components/netsuite/actions#upsert-object-by-id) action instead.

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

### Upsert Vendor(deprecated)

Deprecated. Use [Upsert Object By Id](/components/netsuite/actions#upsert-object-by-id) action instead.

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
