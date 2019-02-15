---
title: Netsuite component
layout: article
section: ERP Components
---


## Purpose
Main purpose of this component is to provide functionality to interact with NetSuite ERP system.
## How works
Communication with NetSuite API established using NetSuite's native SDK.

**2017.2** NetSuite version is used and supported. The component will work with other NS versions in most cases. But 100% compatibility could not be guaranteed.
### Requirements

#### Environment variables
Environment variable 'EIO_REQUIRED_RAM_MB' must be configured **before** any component's activity (credentials verify, retrieve sample).

| Variable            | Value  |
| ------------------- |:------:|
| EIO_REQUIRED_RAM_MB | 1024   |

#### Enable web-service communication
NetSuite’s Web Services SOAP interface allows you to communicate with the ERP and to integrate external systems with it.
NetSuite's native SDK, which is used for the communication in the component, uses NetSuite’s SOAP Web Services  under the hood.
By default web service communication is disabled in NetSuite.
So it should be enabled in order to allow component make calls.
To enable Web Service communication:
1. Go to Setup -> Company -> Enable Features
2. Open SuiteCloud tab and tick there the 'Web Services' checkbox in the SuitTalk section
3. Press Save

![Enable Web Service](https://user-images.githubusercontent.com/8449044/44262942-9a3d5300-a225-11e8-840d-834528f68776.png)

# Credentials

## Get credentials in NetSuite

**Email -**
Email as a login for NetSuite account.

**Password -**
Password for NetSuite account.

**Account -**
Account Number to access NetSuite API. This number is required for the component to connect to NetSuite via native SuiteTalk API
Can be found here:
1. Go to Setup -> Integration -> Web Services Preferences
2. Find ACCOUNT ID field there.
![Get Account Number](https://user-images.githubusercontent.com/8449044/44263739-c3abae00-a228-11e8-8de6-8e6b33c23be3.png)

**Application ID -**
Application ID to access NetSuite API. This number is required for the component to connect to NetSuite via native SuiteTalk API
Can be found here:
1. Go to Setup -> Integration -> Manage Integrations -> New
2. Find APPLICATION ID field there.

![Get Application ID](https://user-images.githubusercontent.com/8449044/44274840-e4392f80-a24b-11e8-9d1d-00676e0b9217.png)
## Authentication on elastic.io
#### Step 1
On elastic.io go to Settings -> Security credentials select NetSuite component and click "Add New Credential"

![Step 1](https://user-images.githubusercontent.com/16806832/44389705-391ec380-a534-11e8-851b-e6d27cf6e1f4.png)
#### Step 2
Fill in the following for your account:

![Step 2](https://user-images.githubusercontent.com/16806832/44389810-800cb900-a534-11e8-8900-2fbd968b8d56.png)
#### Step 3
Click "Verify", if your credentials are correct, the button "Save" will appear, click on it.

## Triggers

### Search Entity
Find an object or a set of objects using filter criteria (field, operator, value). See below for the details.

* Currently 'Vendor payments' and 'Customer payments' types are supported.

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

![Step 5: Retrieve sample](https://user-images.githubusercontent.com/16806832/44350423-07601b00-a4a8-11e8-933d-3617971eb0fc.png)
#### Step 6
Retrieve sample result

![Step 6: Retrieve sample result](https://user-images.githubusercontent.com/16806832/44350359-d849a980-a4a7-11e8-9f78-57023a0c2dfa.png)


## Actions

### Lookup Customer

Find customer by provided ID.

#### Step 1 - Find and select NetSuite component in the component repository

![Step 1](https://user-images.githubusercontent.com/13310949/44709539-8cec5800-aab2-11e8-88cd-b29508220dd3.png)

#### Step 2 - Create new or select existing credentials

![Step 2](https://user-images.githubusercontent.com/16806832/44349488-cf57d880-a4a5-11e8-86d6-542e13536de1.png)

#### Step 3 - Select action from list

![Step 3](https://user-images.githubusercontent.com/13310949/44708435-dab39100-aaaf-11e8-837d-7be16b43ff07.png)

#### Step 4 - Set input message or bind data from previous step

![Step 4](https://user-images.githubusercontent.com/13310949/44708436-db4c2780-aaaf-11e8-93f7-e98efe01a357.png)

#### Step 5 - Retrieving sample

![Step 5](https://user-images.githubusercontent.com/13310949/44708438-db4c2780-aaaf-11e8-99f0-fe9f3b076f28.png)

#### Step 6 - Retrieve sample result

![Step 6](https://user-images.githubusercontent.com/13310949/44708439-db4c2780-aaaf-11e8-9d50-aeb5a3a08a5e.png)

#### Step 7 - Click "Continue"

![Step 7](https://user-images.githubusercontent.com/13310949/44708441-db4c2780-aaaf-11e8-9ea8-6194bb2db79a.png)

#### Step 8 - Finish component configuration
![Step 8](https://user-images.githubusercontent.com/13310949/44708442-dbe4be00-aaaf-11e8-889a-8fa735fe7716.png)


You can provide **internal**, **external** id or **all** of them in input message.
If entity doesn't have **externalId** You must specify only **internalId** in input message.

If You specify incorrect internal or external id, You will get error "**That record does not exist.**"

For example:

 - externalId exists
```javascript
{
  "internalId":"1234",
  "externalId":"4567"
}
```
 - externalId does not exist

```javascript
{
  "internalId":"1234"
}
```

### Input metadata:
`./schemas/json/LookupCustomerById.in.json`


### Lookup Invoice

Find invoice by provided ID.

#### Step 1 - Find and select NetSuite component in the component repository

![Step 1](https://user-images.githubusercontent.com/13310949/44709539-8cec5800-aab2-11e8-88cd-b29508220dd3.png)

#### Step 2 - Create new or select existing credentials

![Step 2](https://user-images.githubusercontent.com/16806832/44349488-cf57d880-a4a5-11e8-86d6-542e13536de1.png)

#### Step 3 - Select action from list

![Step 3](https://user-images.githubusercontent.com/13310949/44712312-20c12280-aab9-11e8-9809-210c29c56b35.png)

#### Step 4 - Set input message or bind data from previous step

![Step 4](https://user-images.githubusercontent.com/13310949/44712313-20c12280-aab9-11e8-8eed-c09f423f012a.png)

#### Step 5 - Retrieving sample

![Step 5](https://user-images.githubusercontent.com/13310949/44712315-2159b900-aab9-11e8-9a86-4133ded721f3.png)

#### Step 6 - Retrieve sample result

![Step 6](https://user-images.githubusercontent.com/13310949/44712316-2159b900-aab9-11e8-999e-edfc86bd7f5d.png)

#### Step 7 - Click "Continue"

![Step 7](https://user-images.githubusercontent.com/13310949/44712317-2159b900-aab9-11e8-9ee5-a5d8f4c2417c.png)

#### Step 8 - Finish component configuration
![Step 8](https://user-images.githubusercontent.com/13310949/44712318-2159b900-aab9-11e8-9c51-b5f62b1bfb29.png)

You can provide **internal**, **external** id or **all** of them in input message.
If entity doesn't have **externalId** You must specify only **internalId** in input message.

If You specify incorrect internal or external id, You will get error "**That record does not exist.**"

For example:

 - externalId exists
```javascript
{
  "internalId":"1234",
  "externalId":"4567"
}
```
 - externalId does not exist

```javascript
{
  "internalId":"1234"
}
```

### Input metadata:
`./schemas/json/GetInvoiceById.json`

### Upsert Customer

Create new or update existing customer by provided external ID.

#### Step 1 - Find and select NetSuite component in the component repository

![Step 1](https://user-images.githubusercontent.com/13310949/44709539-8cec5800-aab2-11e8-88cd-b29508220dd3.png)

#### Step 2 - Create new or select existing credentials

![Step 2](https://user-images.githubusercontent.com/16806832/44349488-cf57d880-a4a5-11e8-86d6-542e13536de1.png)

#### Step 3 - Select action from list

![Step 3](https://user-images.githubusercontent.com/13310949/44706283-c10f4b00-aaa9-11e8-9c60-057553824b45.png)

#### Step 4 - Set input message or bind data from previous step

![Step 4](https://user-images.githubusercontent.com/13310949/44706284-c10f4b00-aaa9-11e8-8622-6e33b5bbb480.png)

#### Step 5 - Retrieving sample

![Step 5](https://user-images.githubusercontent.com/13310949/44706286-c10f4b00-aaa9-11e8-8f63-f24a7f5801bf.png)

#### Step 6 - Retrieve sample result

![Step 6](https://user-images.githubusercontent.com/13310949/44706287-c10f4b00-aaa9-11e8-8d3c-70bd2e4ec32b.png)

#### Step 7 - Click "Continue"

![Step 7](https://user-images.githubusercontent.com/13310949/44706288-c1a7e180-aaa9-11e8-811a-905c40a4d1bd.png)

#### Step 8 - Finish component configuration
![Step 8](https://user-images.githubusercontent.com/13310949/44706289-c1a7e180-aaa9-11e8-8b06-ac04d2876570.png)


### Input metadata:
`./schemas/json/Customer.json`

Request sample:
```javascript
{
  "externalId": "external order ID",
  "customerId": "internal customer ID",
  "currency": "USA",
  "exchangeRate": 1.0,
  "orderItems": [
		{
			"itemInternalId": "387",
			"quantity": 10![Step 1](https://user-images.githubusercontent.com/13310949/44708851-db005c00-aab0-11e8-9881-5228555860d3.png)

		}
	]
}
```

### Upsert Contact

Create new or update existing contact by provided external ID.

#### Step 1 - Find and select NetSuite component in the component repository

![Step 1](https://user-images.githubusercontent.com/13310949/44709539-8cec5800-aab2-11e8-88cd-b29508220dd3.png)

#### Step 2 - Create new or select existing credentials

![Step 2](https://user-images.githubusercontent.com/16806832/44349488-cf57d880-a4a5-11e8-86d6-542e13536de1.png)

#### Step 3 - Select action from list

![Step 3](https://user-images.githubusercontent.com/16806832/44841590-63ffca80-ac4c-11e8-8757-56f643755186.png)

#### Step 4 - Set input message or bind data from previous step

![Step 4](https://user-images.githubusercontent.com/16806832/44841748-c2c54400-ac4c-11e8-8f34-8b6604ffd5f8.png)

#### Step 5 - Retrieving sample

![Step 5](https://user-images.githubusercontent.com/16806832/44841820-edaf9800-ac4c-11e8-80ae-b83eaae3685f.png)

#### Step 6 - Retrieve sample result

![Step 6](https://user-images.githubusercontent.com/16806832/44842428-77139a00-ac4e-11e8-964d-95a429791b69.png)

#### Step 7 - Click "Continue"

![Step 7](https://user-images.githubusercontent.com/16806832/44841912-2bacbc00-ac4d-11e8-9c03-5064f606d717.png)

#### Step 8 - Finish component configuration
![Step 8](https://user-images.githubusercontent.com/13310949/44706289-c1a7e180-aaa9-11e8-8b06-ac04d2876570.png)

### Input metadata:
`./schemas/json/Contact.json`

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
#### Step 1 - Find and select NetSuite component in the component repository

![Step 1](https://user-images.githubusercontent.com/8449044/45221760-1d991400-b2bb-11e8-96fa-a07cbdff5a92.png)

#### Step 2 - Create new or select existing credentials

![Step 2](https://user-images.githubusercontent.com/8449044/45221776-2984d600-b2bb-11e8-96bf-bf35e84b02c1.png)

#### Step 3 - Select action from list

![Step 3](https://user-images.githubusercontent.com/8449044/45221590-9a77be00-b2ba-11e8-9e93-e2748dfce4dd.png)

#### Step 4 - Set input message or bind data from previous step

![Step 4](https://user-images.githubusercontent.com/8449044/45221625-b24f4200-b2ba-11e8-86a0-9d478d0e55c6.png)

#### Step 5 - Retrieving sample

![Step 5](https://user-images.githubusercontent.com/8449044/45221640-c09d5e00-b2ba-11e8-9b1c-192e072055fa.png)

#### Step 6 - Retrieve sample result

![Step 6](https://user-images.githubusercontent.com/8449044/45221667-d3179780-b2ba-11e8-8327-5f90e4728936.png)

#### Step 7 - Click "Continue"

![Step 7](https://user-images.githubusercontent.com/8449044/45221691-e165b380-b2ba-11e8-971f-dca79efc9804.png)

#### Step 8 - Finish component configuration
![Step 8](https://user-images.githubusercontent.com/8449044/45221707-f0e4fc80-b2ba-11e8-897a-d784dcc2d35c.png)

### Input metadata:
`./schemas/json/Invoice.json`

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

#### Step 1 - Find and select NetSuite component in the component repository

![Step 1](https://user-images.githubusercontent.com/13310949/44709539-8cec5800-aab2-11e8-88cd-b29508220dd3.png)

#### Step 2 - Create new or select existing credentials

![Step 2](https://user-images.githubusercontent.com/16806832/44349488-cf57d880-a4a5-11e8-86d6-542e13536de1.png)

#### Step 3 - Select action "Upsert Sales Order" from list

![Step 3](https://user-images.githubusercontent.com/16806832/45081682-68baf780-b100-11e8-935d-22ab98b74233.png)

#### Step 4 - Set input message or bind data from previous step

![Step 4](https://user-images.githubusercontent.com/16806832/45082400-e9c6be80-b101-11e8-9006-eb0fb07d60bc.png)


#### Step 5 - Retrieving sample

![Step 5](https://user-images.githubusercontent.com/16806832/44841820-edaf9800-ac4c-11e8-80ae-b83eaae3685f.png)

#### Step 6 - Retrieve sample result

![Step 6](https://user-images.githubusercontent.com/16806832/45082510-27c3e280-b102-11e8-8a18-42cb5358efa5.png)


#### Step 7 - Click "Continue"

![Step 7](https://user-images.githubusercontent.com/16806832/45082562-49bd6500-b102-11e8-9cfd-48d4605c3e4b.png)


#### Step 8 - Finish component configuration
![Step 8](https://user-images.githubusercontent.com/13310949/44706289-c1a7e180-aaa9-11e8-8b06-ac04d2876570.png)

### Input metadata:
`./schemas/json/SalesOrder.json`

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
#### Step 1 - Find and select NetSuite component in the component repository

![Step 1](https://user-images.githubusercontent.com/13310949/44709539-8cec5800-aab2-11e8-88cd-b29508220dd3.png)

#### Step 2 - Create new or select existing credentials

![Step 2](https://user-images.githubusercontent.com/16806832/44349488-cf57d880-a4a5-11e8-86d6-542e13536de1.png)

#### Step 3 - Select action from list

![Step 3](https://user-images.githubusercontent.com/13310949/44707033-19474c80-aaac-11e8-909c-0496be43bea0.png)

#### Step 4 - Set input message or bind data from previous step

![Step 4](https://user-images.githubusercontent.com/13310949/44707035-19474c80-aaac-11e8-8cfa-d71df74644b0.png)

#### Step 5 - Retrieving sample

![Step 5](https://user-images.githubusercontent.com/13310949/44707037-19474c80-aaac-11e8-8e5e-075addf680f6.png)

#### Step 6 - Retrieve sample result

![Step 6](https://user-images.githubusercontent.com/13310949/44707038-19dfe300-aaac-11e8-961d-286cdce3b06a.png)

#### Step 7 - Click "Continue"

![Step 7](https://user-images.githubusercontent.com/13310949/44707039-19dfe300-aaac-11e8-8106-aa33d292c118.png)

#### Step 8 - Finish component configuration
![Step 8](https://user-images.githubusercontent.com/13310949/44707040-19dfe300-aaac-11e8-83b2-b9f2c3527456.png)


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

### Input metadata:

`./schemas/json/Vendor.json`

# Upsert custom fields:
Currently, You can upsert custom fields only from developer mode.
You should to use property **type**, which can accept next values:
 - BooleanCustomFieldRef
 - DateCustomFieldRef
 - DoubleCustomFieldRef
 - LongCustomFieldRef
 - MultiSelectCustomFieldRef
 - SelectCustomFieldRef
 - StringCustomFieldRef

 You can find example of custom field structures bellow.

 - **BooleanCustomFieldRef**
```javascript
{
  "internalId": "1",
  "scriptId": "script1",
  "value": true,
  "type": "BooleanCustomFieldRef"
}
```

 - **DateCustomFieldRef**
```javascript
{
  "internalId": "1",
  "scriptId": "script1",
  "value": "2018-01-01T00:00:00.000+00:00",
  "type": "DateCustomFieldRef"
}
```

 - **DoubleCustomFieldRef**
```javascript
{
  "internalId": "1",
  "scriptId": "script1",
  "value": 3456.24,
  "type": "DoubleCustomFieldRef"
}
```

 - **LongCustomFieldRef**
```javascript
{
  "internalId": "1",
  "scriptId": "script1",
  "value": 987979999,
  "type": "LongCustomFieldRef"
}
```

 - **MultiSelectCustomFieldRef**
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

- **SelectCustomFieldRef**
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

 - **StringCustomFieldRef**
```javascript
{
  "internalId": "1",
  "scriptId": "script1",
  "value": "some value",
  "type": "StringCustomFieldRef"
}
```

## Links
http://www.netsuite.com/portal/developers/resources/suitetalk-documentation.shtml - API doc.
