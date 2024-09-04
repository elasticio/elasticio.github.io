---
title: NetSuite component
layout: component
section: ERP components
description: A component which interacts with the NetSuite ERP system.
icon: netsuite.png
icontext: NetSuite component
category: netsuite
updatedDate: 2024-09-04
ComponentVersion: 3.2.0
---

# NetSuite component

## Table of Contents
* [General information](#general-information)
   * [Description](#description)
   * [Purpose](#purpose)
   * [How works](#how-works)
   * [API version](#api-version)
* [Requirements](#requirements)
   * [Environment variables](#environment-variables)
   * [Enable web-service communication](#enable-web-service-communication)
* [Credentials](#credentials)
   * [Get credentials in NetSuite](#get-credentials-in-netsuite)
   * [Authentication on elastic.io](#authentication-on-elasticio)
* [Triggers](#triggers)
   * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
     * [Get New and Updated Objects Polling. Config fields](#get-new-and-updated-objects-polling-config-fields)
   * [Search Entity (deprecated)](#search-entity-deprecated)
     * [How to use Search Entity Trigger](#how-to-use-search-entity-trigger)
* [Actions](#actions)
   * [Add Object](#add-object)
     * [Add Object. Config fields](#add-object-config-fields)
     * [Add Object. Input metadata](#add-object-input-metadata)
   * [Delete Object By Id](#delete-object-by-id)
     * [Delete Object By Id. Config fields](#delete-object-by-id-config-fields)
   * [Get Item Availability](#get-item-availability)
   * [Lookup Object By Id](#lookup-object-by-id)
     * [Delete Object By Id. Config fields](#lookup-object-by-id-config-fields)
   * [Lookup Objects](#lookup-objects)
     * [Lookup Objects. Config fields](#lookup-objects-config-fields)
     * [Basic search](#basic-search)
       * [Search operators](#search-operators)
       * [Basic Search Samples](#basic-search-samples)
     * [Joined search](#joined-search)
       * [Joined Search Samples](#joined-search-samples)
     * [Advanced search](#advanced-search)
       * [Advanced Search Samples](#advanced-search-samples)
   * [Lookup Objects By Custom Field](#lookup-objects-by-custom-field)
     * [Lookup Objects By Custom Field. Config fields](#lookup-objects-by-custom-field-config-fields)
   * [Update Object](#update-object)
      * [Update Object. Config fields](#update-object-config-fields)
      * [Update Object. Input metadata](#update-object-input-metadata)
   * [Upsert Object By Id](#upsert-object-by-id)
     * [Upsert Object By Id. Config fields](#upsert-object-by-id-config-fields)
   * [Lookup Customer (deprecated)](#lookup-customer-deprecated)
     * [How to use Lookup Customer Action](#how-to-use-lookup-customer-action)
     * [Lookup Customer. Input metadata](#lookup-customer-input-metadata)
   * [Lookup Invoice (deprecated)](#lookup-invoice-deprecated)
     * [How to use Lookup Invoice Action](#how-to-use-lookup-invoice-action)
     * [Lookup Invoice. Input metadata](#lookup-invoice-input-metadata)
   * [Upsert Contact (deprecated)](#upsert-contact-deprecated)
     * [How to use Upsert Contact Action](#how-to-use-upsert-contact-action)
     * [Upsert Contact. Input metadata](#upsert-contact-input-metadata)
   * [Upsert Customer (deprecated)](#upsert-customer-deprecated)
     * [How to use Upsert Customer Action](#how-to-use-upsert-customer-action)
     * [Upsert Customer. Input metadata](#upsert-customer-input-metadata)
   * [Upsert Invoice (deprecated)](#upsert-invoice-deprecated)
     * [How to use Upsert Invoice Action](#how-to-use-upsert-invoice-action)
     * [Upsert Invoice. Input metadata](#upsert-invoice-input-metadata)
   * [Upsert Sales Order (deprecated)](#upsert-invoice-deprecated)
     * [How to use Upsert Sales Order Action](#how-to-use-upsert-sales-order-action)
     * [Upsert Sales Order. Input metadata](#upsert-sales-order-input-metadata)
   * [Upsert Vendor (deprecated)](#upsert-invoice-deprecated)
     * [How to use Upsert Vendor Action](#how-to-use-upsert-vendor-action)
     * [Upsert Vendor. Input metadata](#upsert-vendor-input-metadata)
   * [Upsert Custom Fields](#upsert-custom-fields)
* [Known Limitations](#known-limitations)
* [Links](#links)


## General information
### Description
[elastic.io](http://www.elastic.io;) iPaaS component that connects to NetSuite ERP API.
### Purpose
Main purpose of this component is to provide functionality to interact with NetSuite ERP system.
### How works
Communication with NetSuite API established using NetSuite's native SDK.
### API version
**2022.1** NetSuite version is used and supported. The component will work with other NS versions in most cases. But 100% compatibility could not be guaranteed.

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

## Credentials

Elastic.io Netsuite connector since version 3.0.0 only supports a token based authentication mechanisms. Support of a user credentials mechanism has been removed by Netsuite SOAP API.

To use Token-Based authentication you must at first setup a Netsuite account:
Enable Integration:
1. Go to Setup > Company > Enable Features > Suite Cloud > Manage Authentication
2. Enable Token-Based Authentication
3. Go to menu Setup > Integrations > Manage Integrations
4. Click New button
5. Set the name to whatever you want. Please make sure to tick the Token-Based Authentication option, uncheck the "TBA: AUTHORIZATION FLOW" and "AUTHORIZATION CODE GRANT" option, and check the "TBA: ISSUETOKEN ENDPOINT"  option.
6. Copy Consumer Key and Consumer secret values to be used in credentials. As they will be not available later.


Create a Role and assign to a User:
1. Go to Setup > Users/Roles > Manage Roles > New
2. Create a role and assign necessary permissions for a connector (Access to any Netsuite object types, transactions, etc.).
3. The role must have "User Access Tokens" and "SOAP Web Services" permissions for integration using TBA
4. Assign the Role to the desired user that will be used for integration. Go to Lists > Employees > edit user > Access tab > Roles subtab.


Create an Access Token for the Integration record, User, and Role:
1. Go to Setup > Users/Roles > Access Tokens > New.
2. Select the Integration record, User, and Role created or referenced in the previous steps.
3. Token Id and Token Secret will be displayed after tapping the save button. Copy the Consumer Key and Consumer secret values as they as will not be available after you leave the page.


All the credentials fields are required:
1. Domain. To find your domain endpoint go to `Setup > Company > Setup Tasks > Company Information (Administrator)` in the NetSuite UI.
   Your domains are listed on the Company URLs subtab. Should be something like `https://{accountId}.suitetalk.api.netsuite.com`
2. Account. Account Number to access NetSuite API. This number is required for the component to connect to NetSuite via native SuiteTalk API. Can be found here:
   1. Go to `Setup -> Integration -> Web Services Preferences`
   2. Find ACCOUNT ID field there.
      ![Get Account Number](https://user-images.githubusercontent.com/8449044/44263739-c3abae00-a228-11e8-8de6-8e6b33c23be3.png)

**Important!** Make sure you have copied an account name exactly how it is specified in Netsuite UI.

3. Consumer Key
4. Consumer Secret
5. Token Id
6. Token Secret

## Triggers
### Get New and Updated Objects Polling
Generic trigger that polls NetSuite instance for new and/or updated objects (of any type available in the NetSuite).

#### Get New and Updated Objects Polling. Config fields
* Object Type (dropdown)
* Start Time (string, optional): Indicates the beginning time to start polling from (defaults to the beginning of time)
* End Time (string, optional): If provided, don’t fetch records modified after this time (defaults to never)
* Size of Polling Page (optional; string). Indicates the size of pages to be fetched. Defaults to 1000. CAN NOT be less then 5.
* Single Page per Interval (dropdown/checkbox: yes/no; default yes). Indicates that if the number of changed records exceeds the maximum number of results in a page, instead of fetching the next page immediately, wait until the next flow start to fetch the next page.

First, the system reads all the objects of the chosen type and processes it further along with your designed integration flow.
It will also create an initial state of fetched objects, we call it a *snapshot*, in order to have something to compare with after your data is updated.

After the initial read, any further requests for an update or create new object in NetSuite will be compared to this snapshot and in case any changes are detected they will be passed along with the integration flow as well.

### Search Entity (deprecated)
Deprecated. Use `Get New and Updated Objects Polling` trigger instead.

Finds an object or a set of objects using filter criteria (field, operator, value). See below for the details.

#### How to use Search Entity Trigger
##### Step 1
Find and select NetSuite component in the component repository

![Step 1](https://user-images.githubusercontent.com/16806832/44349305-75efa980-a4a5-11e8-8cd3-a9529ffd9625.png)
##### Step 2
Create new or select existing credentials

![Step 2](https://user-images.githubusercontent.com/16806832/44349488-cf57d880-a4a5-11e8-86d6-542e13536de1.png)
##### Step 3
Specify parameters for searching entity
The component supports next entity types for now:
 - Customer payments
 - Vendor payments

 Supported entity list can be extended in future.

![Step 3](https://user-images.githubusercontent.com/16806832/44348950-8d7a6280-a4a4-11e8-8201-2a1610dab8f0.png)
###### Step 3.1
Select "Entity type" from drop-down list, you can choose "Vendor payment" or "Customer payment"

![Step 3.1](https://user-images.githubusercontent.com/16806832/44349277-5a849e80-a4a5-11e8-908f-820812e826ad.png)
###### Step 3.2
Select options "Filter by field" from drop-down list, you can choose "dateCreated" or "lastModifiedDate"

![Step 3.2](https://user-images.githubusercontent.com/16806832/44349548-f1e9f180-a4a5-11e8-804b-5d35bf8871db.png)
###### Step 3.3
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
###### Step 3.4
Input "Filter value" - date and time in format "2018-01-01T00:00:00.000 -07:00"
At the end of trigger execution "Filter value" field change value to "Last trigger execution date" value.
It is opportunity to load only new updated/created records from the NetSuite.

![Step 3.4](https://user-images.githubusercontent.com/16806832/44350141-4cd01880-a4a7-11e8-88b9-9e002276458c.png)

##### Step 4
Retrieve sample or add sample manually

![Step 4: Retrieve sample](https://user-images.githubusercontent.com/16806832/44350423-07601b00-a4a8-11e8-933d-3617971eb0fc.png)
##### Step 5
Retrieve sample result

![Step 5: Retrieve sample result](https://user-images.githubusercontent.com/16806832/44350359-d849a980-a4a7-11e8-9f78-57023a0c2dfa.png)

### Polling objects
Find an object or a set of objects was updated since last polling of time.

#### Input fields

**Object Type -**
Object type to poll (only for objects which support lastModifiedDate filtering)

**Start Time -**
Indicates the beginning time to start polling from (defaults to the beginning of time, in next format yyyy-MM-ddTHH:mm:ss.SSS XXX)

**End Time -**
If provided, don’t fetch records modified after this time (defaults to never, in next format yyyy-MM-ddTHH:mm:ss.SSS XXX)

**Size of Polling Page -**
Indicates the size of pages to be fetched. Defaults to 1000.

**Single Page per Interval -**
Indicates that if the number of changed records exceeds the maximum number of results in a page, instead of fetching the next page immediately, wait until the next flow start to fetch the next page.

#### Known Limitations
At the moment trigger supports polling of next object types:
- Calendar Event,
- Campaign
- Contact
- Customer
- Employee
- Entity
- Entity Group
- Folder
- Issue
- Item
- Item Demand Plan
- Item Supply Plan
- Job
- Opportunity
- Originating Lead
- Partner
- Phone Call
- Project Task
- Solution
- Support Case
- Task
- Transaction
- Vendor
## Actions
### Add Object
Add an object to NetSuite.

#### Add Object. Config Fields
* **Object Category** - a category of an object in NetSuite
    * Standard
    * Custom
* **Object Type** - an object in NetSuite (Contact, Customer etc.). Fetches dynamically.

#### Add Object. Input Metadata
Is being fetched dynamically. Sample:

<details><summary>Input metadata for Invoice object:</summary>


```json
{
  "entity": {
    "internalId": "5"
  },
  "currency": {
    "internalId": "1"
  },
  "tranDate": "2023-05-23",
  "itemList": {
    "item": [
      {
        "description": "General Donation",
        "amount": 1000,
        "item": {
          "internalId": "12"
        },
        "quantity": 1,
        "rate": "100",
        "taxCode": {
          "internalId": "5"
        },
        "customFieldList": {
          "customField": [
            {
              "type": "SelectCustomFieldRef",
              "scriptId": "asd_d3",
              "value": {
                "name": "Charity type",
                "internalId": "2"
              }
            }
          ]
        }
      }
    ]
  },
  "customFieldList": {
    "customField": [
      {
        "type": "StringCustomFieldRef",
        "scriptId": "custbody_sf_field-one",
        "value": "Bank Transfer"
      },
      {
        "type": "StringCustomFieldRef",
        "scriptId": "custbody_sf_field-two",
        "value": "Individual One-Off"
      },
      {
        "type": "StringCustomFieldRef",
        "scriptId": "custbody_sf_field-three",
        "value": "John Doe"
      },
      {
        "type": "StringCustomFieldRef",
        "scriptId": "custbody_sf_field-four",
        "value": "ABC-987"
      }
    ]
  }
}
```
</details>

### Delete Object By Id
Deletes an object by the ID provided.

#### Delete Object By Id. Config fields
* **Object Category** - a category of an object in NetSuite
  * Standard
  * Custom
* **Object Type** - an object in NetSuite (Contact, Customer etc.). Fetches dynamically.

#### Delete Object By Id. Input Metadata
Is being fetched dynamically. The sample:

Input metadata for Transaction objects:
```json
{
  "internalId": "string",
  "externalId": "string",
  "deletionReasonCode": "deleteionReasonCodeString",
  "deletionReasonMemo": "deletionReasonMemoString"
}
```

Deletion Reason Usage Notes
<details><summary>Click to expand</summary>

> Note the following about the deletionReason parameter:
> The deletionReason complex type includes two fields: deletionReasonCode and deletionReasonMemo. The deletionReasonCode must identify a deletion reason that is listed at Setup > Accounting > Accounting Lists. If the Use Deletion Reasons feature is enabled and you use the deletionReasonCode to identify a code that does not exist, the request fails with an INVALID_REF_KEY error.
> Deletion reasons can be saved only for transactions. However, in SOAP web services, you must use the deletionReason parameter even when referencing other record types, and even when the Use Deletion Reasons feature is not enabled. For situations where it is not appropriate to identify a deletion reason, pass in a value of null.
> Even when when a deletion reason is required, you can use a value of null. In these cases, the system automatically populates the deletion reason fields with default values. These defaults are: Other for deletionReasonCode and This transaction was deleted by script or web service for deletionReasonMemo.
> The deletionReason complex type is defined in the core XSD.
> For more details about the Use Deletion Reasons feature, see Recording a Reason for Deleting a Transaction.
</details>

Input metadata for other objects:
```json
{
  "internalId": "string",
  "externalId": "string"
}
```
#### Delete Object By Id. Output Metadata
```json
{
  "internalId": "string"
}
```

### Get Item Availability
Allows to get an item availability based on its type and internal ID provided

#### Get Item Availability. Config fields
* **Item Type** - item type to search for. One of:
  * Assembly Item
  *  Description Item
  *  Discount Item
  *  Download Item
  *  Inventory Item
  *  Gift Certificate Item
  *  Kit Item
  *  Non-Inventory Purchase Item
  *  Non Inventory Resale Item
  *  Non Inventory Sale Item
  *  Other Charge Purchase Item
  *  Other Charge Resale Item
  *  Other Charge Sale Item
  *  Payment Item
  *  Service Resale Item
  Service Sale Item
* **Allow Empty Results (Defaults: false)** - When an item not found, if this is checked, an empty object will be emitted instead of throwing an error.

#### Get Item Availability. Input Metadata
* **Item Internal ID** - internal ID of an item to search by. Optional
* **Item External ID** - external ID of an item to search by. Optional.
Please note that either 'External ID' or 'Internal ID' field must be provided.

Input metadata example:
```json
{
  "internalId": "1234"
}
```

#### Get Item Availability. Output Metadata
Generates dynamically based on the item type selected in the configuration field

### Lookup Object By Id
Lookup an object by the ID provided.

#### Lookup Object By Id. Config fields
* **Object Category** - a category of an object in NetSuite
  * Standard
  * Custom
* **Object Type** - an object in NetSuite (Contact, Customer etc.). Fetches dynamically.
* **Allow ID to be omitted**
* **Allow Zero Results**

### Lookup Objects
Looks for objects available in NetSuite which meet given criteria.
Use this action to execute the following types of searches:
* [**Basic search**](#basic-search) — Execute a search on a record type based on search filter fields that are specific to that type. See Basic Searches in SOAP Web Services.
* [**Joined search**](#joined-search) — Execute a search on a record type based on search filter fields on an associated record type. See Joined Searches in SOAP Web Services
* [**Advanced search**](#advanced-search) — Execute a search on a record type in which you specify search filter fields and/or search return columns or joined search columns. Using advanced search, you can also return an existing saved search. See Advanced Searches in SOAP Web Services.

#### Lookup Objects. Config fields
* **Object Type** - an object in NetSuite (Contact, Customer etc.). Fetches dynamically.
* **Search Type** - a type of search. See below.
  * Basic
  * Joined
  * Advanced
* **Behavior** - a behavior for the component on how to handle the response which has more than 1 object to response with:
  * Emit individually
  * Fetch all
  * Fetch Page

#### Basic search
A basic search lets you search records of a specific type using the fields on that record as search filters.
In a basic search, field criteria are the only values you set. You cannot specify search return columns.
The full list of available objects to search can be found  in the Help Center (may vary for each installation). You can find the entire metadata of each object there as well.

Log in to your NetSuite account >  Suite Cloud (Customization, Scripting, and Web Services) > SuiteCloud Platform Introduction > SuiteCloud Records Reference Tools > The SuiteScript Records Browser > Click 'Go to the SuiteScript Records Browser.'
![SuiteScript Records Browser](https://user-images.githubusercontent.com/8449044/61944948-8490eb80-afa7-11e9-9272-60f63a387ebc.png)

Then choose Schema Browser > 'common' from the dropdown list and open the `Search` tab at the left.
![Common](https://user-images.githubusercontent.com/8449044/61945260-34feef80-afa8-11e9-8026-8e995dcff3d1.png)

What you should do next is to build a correct search request using object fields and operators.
##### Search operators
It is just the recommended list. You should always use an actual one based on the Help center of your account.

**GetSelectValueFilterOperator**:
<details><summary>Click to expand</summary>

* contains
* is
* startsWith
</details>

**SearchDateFieldOperator**:
<details><summary>Click to expand</summary>

* after
* before
* empty
* notAfter
* notBefore
* notEmpty
* notOn
* notOnOrAfter
* notOnOrBefore
* notWithin
* on
* onOrAfter
* onOrBefore
* within
</details>

**SearchDoubleFieldOperator**:
<details><summary>Click to expand</summary>

* between
* empty
* equalTo
* greaterThan
* greaterThanOrEqualTo
* lessThan
* lessThanOrEqualTo
* notBetween
* notEmpty
* notEqualTo
* notGreaterThan
* notGreaterThanOrEqualTo
* notLessThan
* notLessThanOrEqualTo
</details>

**SearchEnumMultiSelectFieldOperator**:
<details><summary>Click to expand</summary>

* anyOf
* noneOf
</details>

**SearchLongFieldOperator**:
<details><summary>Click to expand</summary>

* between
* empty
* equalTo
* greaterThan
* greaterThanOrEqualTo
* lessThan
* lessThanOrEqualTo
* notBetween
* notEmpty
* notEqualTo
* notGreaterThan
* notGreaterThanOrEqualTo
* notLessThan
* notLessThanOrEqualTo
</details>

**SearchMultiSelectFieldOperator**:
<details><summary>Click to expand</summary>

* anyOf
* noneOf
</details>

**SearchStringFieldOperator**:
<details><summary>Click to expand</summary>

* contains
* doesNotContain
* doesNotStartWith
* empty
* hasKeywords
* is
* isNot
* notEmpty
* startsWith
</details>

**SearchTextNumberFieldOperator**:
<details><summary>Click to expand</summary>

* between
* empty
* equalTo
* greaterThan
* greaterThanOrEqualTo
* lessThan
* lessThanOrEqualTo
* notBetween
* notEmpty
* notEqualTo
* notGreaterThan
* notGreaterThanOrEqualTo
* notLessThan
* notLessThanOrEqualTo
</details>

##### Basic Search Samples
###### Search contacts by a provided email
Object Type: Contact

Search Type: ContactSearchBasic

XML request:
<details><summary>Click to expand</summary>

```xml
<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:messages_2019_1.platform.webservices.netsuite.com" xmlns:urn1="urn:core_2019_1.platform.webservices.netsuite.com">
    <soapenv:Header>
        <urn:applicationInfo>
            <urn:applicationId>YOURAPPLICATIONID</urn:applicationId>
        </urn:applicationInfo>
        <urn:passport>
            <urn1:email>YOUREMAIL</urn1:email>
            <urn1:password>YOURPASSWORD</urn1:password>
            <urn1:account>YOURACCOUNT</urn1:account>
        </urn:passport>
    </soapenv:Header>
    <soapenv:Body>
        <urn:search xmlns="urn:messages_2019_1.platform.webservices.netsuite.com">
            <urn:searchRecord xsi:type="ns4:ContactSearch" xmlns:ns4="urn:relationships_2019_1.lists.webservices.netsuite.com">
                <ns4:basic xsi:type="ns5:ContactSearchBasic" xmlns:ns5="urn:common_2019_1.platform.webservices.netsuite.com">
                    <ns5:email operator="is" xsi:type="ns6:SearchStringField" xmlns:ns6="urn:core_2019_1.platform.webservices.netsuite.com">
                        <ns6:searchValue xsi:type="xsd:string">tomsmith@tomsmith.com</ns6:searchValue>
                    </ns5:email>
                </ns4:basic>
            </urn:searchRecord>
        </urn:search>
    </soapenv:Body>
</soapenv:Envelope>
```
</details>

The same request for the component (JSON):
```json
{
  "email": {
    "searchValue": "tomsmith@tomsmith.com",
    "operator": {
      "value": "is"
    }
  }
}
```

Response:
<details><summary>Click to see the response</summary>

```json
{
  "results": [
    {
      "internalId": "4248",
      "lastModifiedDate": "2018-08-17T08:51:19.000+0000",
      "dateCreated": "2018-08-17T08:16:53.000+0000",
      "globalSubscriptionStatus": {
        "value": "_softOptIn"
      },
      "subsidiary": {
        "internalId": "3",
        "name": "Honeycomb Holdings Inc."
      },
      "isInactive": false,
      "isPrivate": false,
      "email": "tomsmith@tomsmith.com",
      "lastName": "Smith",
      "firstName": "Tom",
      "salutation": "Smith",
      "entityId": "Tom Smith"
    }
  ]
}
```
</details>

#### Joined search
Execute a search on a record type based on search filter fields on an associated record type.
A joined search allows you search against a specific record type using the fields on an associated record as search filters.
In the NetSuite UI, you can identify which associated records provide joined filter criteria by first navigating to a record's search interface.

Once again, you can find the list of available objects in the Help Center. The component will dynamically fetch all the list with an available metadata. But you should always look at the documentation to build a correct search request.

##### Joined Search Samples
###### Search contacts associated with customers

Object Type: Contact

Search Type: Contact Search Join

The following sample shows how to return an associated joined list of records. In this case, all contacts associated with customers of internalId 1, 2 and 3 are returned.

XML request:
<details><summary>Click to expand</summary>

```xml
<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:messages_2019_1.platform.webservices.netsuite.com" xmlns:urn1="urn:core_2019_1.platform.webservices.netsuite.com">
    <soapenv:Header>
        <urn:applicationInfo>
            <urn:applicationId>YOURAPPLICATIONID</urn:applicationId>
        </urn:applicationInfo>
        <urn:passport>
            <urn1:email>YOUREMAIL</urn1:email>
            <urn1:password>YOURPASSWORD</urn1:password>
            <urn1:account>YOURACCOUNT</urn1:account>
        </urn:passport>
    </soapenv:Header>
    <soapenv:Body>
        <urn:search xmlns="urn:messages_2019_1.platform.webservices.netsuite.com">
            <urn:searchRecord xsi:type="ns1:ContactSearch" xmlns:ns1="urn:relationships_2019_1.lists.webservices.netsuite.com">
                <ns1:customerJoin xsi:type="ns2:CustomerSearchBasic" xmlns:ns2="urn:common_2019_1.platform.webservices.netsuite.com">
                    <ns2:internalId operator="anyOf" xsi:type="ns3:SearchMultiSelectField" xmlns:ns3="urn:core_2019_1.platform.webservices.netsuite.com">
                        <ns3:searchValue internalId="449" type="customer" xsi:type="ns3:RecordRef" />
                        <ns3:searchValue internalId="594" type="customer" xsi:type="ns3:RecordRef" />
                        <ns3:searchValue internalId="500" type="customer" xsi:type="ns3:RecordRef" />
                    </ns2:internalId>
                </ns1:customerJoin>
            </urn:searchRecord>
        </urn:search>
    </soapenv:Body>
</soapenv:Envelope>
```
</details>

The same request for the component (JSON):
```json
{
  "customerJoin": {
    "internalId": {
      "searchValue": [
        {
          "internalId": "449",
          "name": "customer"
        },
        {
          "internalId": "500",
          "name": "customer"
        },
        {
          "name": "customer",
          "internalId": "594"
        }
      ],
      "operator": {
        "value": "anyOf"
      }
    }
  }
}
```

Response
<details><summary>Click to see the response</summary>

```json
{
  "results": [
    {
      "externalId": "Karen Austin / John Spear",
      "internalId": "912",
      "lastModifiedDate": "2019-07-24T09:54:53.000+0000",
      "dateCreated": "2015-06-07T20:47:55.000+0000",
      "globalSubscriptionStatus": {
        "value": "_softOptIn"
      },
      "supervisor": {
        "internalId": "27",
        "name": "Brad M Sparling"
      },
      "mobilePhone": "(123) 545-6666",
      "homePhone": "(222) 123-4321",
      "officePhone": "(123) 456-7890",
      "subsidiary": {
        "internalId": "1",
        "name": "Honeycomb Mfg."
      },
      "isInactive": false,
      "isPrivate": false,
      "defaultAddress": "Brandy Dough<br>7829 N. Commerce Avenue<br>San Francisco CA <br>United States",
      "email": "bdickens@ramsey.com",
      "phone": "(123) 456-7890",
      "title": "Purchasing",
      "lastName": "Dickens",
      "firstName": "Brandy",
      "entityId": "Brandy Dickens"
    },
    {
      "internalId": "1545",
      "lastModifiedDate": "2019-07-24T09:56:22.000+0000",
      "dateCreated": "2015-03-18T14:35:42.000+0000",
      "globalSubscriptionStatus": {
        "value": "_softOptIn"
      },
      "supervisor": {
        "internalId": "1516",
        "name": "Brenda Jones"
      },
      "homePhone": "(713) 456-7878",
      "subsidiary": {
        "internalId": "1",
        "name": "Honeycomb Mfg."
      },
      "isInactive": false,
      "isPrivate": false,
      "defaultAddress": "123<br>Ave B<br>Houston TX 78665<br>United States",
      "email": "adminaccess2@ramsey.com",
      "phone": "(713) 456-7878",
      "lastName": "Samms",
      "firstName": "Brandy",
      "entityId": "Brandy Samms"
    }
  ]
}
```
</details>

###### Search items with a price equal to 10

Object Type: Item

Search Type: Item Search Join

The following sample shows how to search for all items that have a price level of 10.00.

XML request:
<details><summary>Click to expand</summary>

```xml
<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:messages_2019_1.platform.webservices.netsuite.com" xmlns:urn1="urn:core_2019_1.platform.webservices.netsuite.com">
    <soapenv:Header>
        <urn:applicationInfo>
            <urn:applicationId>YOURAPPLICATIONID</urn:applicationId>
        </urn:applicationInfo>
        <urn:passport>
            <urn1:email>YOUREMAIL</urn1:email>
            <urn1:password>YOURPASSWORD</urn1:password>
            <urn1:account>YOURACCOUNT</urn1:account>
        </urn:passport>
    </soapenv:Header>
    <soapenv:Body>
        <urn:search xmlns="urn:messages_2019_1.platform.webservices.netsuite.com">
            <urn:searchRecord xmlns:q1="urn:accounting_2019_1.lists.webservices.netsuite.com" xsi:type="q1:ItemSearch">
                <q1:basic>
                    <type operator="anyOf" xmlns="urn:common_2019_1.platform.webservices.netsuite.com">
                        <searchValue xmlns="urn:core_2019_1.platform.webservices.netsuite.com">_inventoryItem</searchValue>
                    </type>
                </q1:basic>
                <q1:pricingJoin>
                    <rate operator="equalTo" xmlns="urn:common_2019_1.platform.webservices.netsuite.com">
                        <searchValue xmlns="urn:core_2019_1.platform.webservices.netsuite.com">10</searchValue>
                    </rate>
                </q1:pricingJoin>
            </urn:searchRecord>
        </urn:search>
    </soapenv:Body>
</soapenv:Envelope>
```
</details>

The same request for the component (JSON):
```json
{
  "pricingJoin": {
    "rate": {
      "operator": {
        "value": "equalTo"
      },
      "searchValue": 10
    }
  },
  "basic": {
    "type": {
      "operator": {
        "value": "anyOf"
      },
      "searchValue": [
        "_inventoryItem"
      ]
    }
  }
}
```

Response
<details><summary>Click to see the response</summary>

```json
{
  "results": [
    {
      "externalId": "ITEM163",
      "internalId": "163",
      "customFieldList": {
        "customField": [
          {
            "value": false,
            "scriptId": "custitem16",
            "internalId": "194"
          }
        ]
      },
      "supplyReplenishmentMethod": {
        "internalId": "REORDER_POINT",
        "name": "Reorder Point"
      },
      "currency": "USA",
      "availableToPartners": false,
      "isInactive": true,
      "offerSupport": false,
      "isOnline": true,
      "displayName": "Reserve Pinot Noir 2000",
      "itemId": "Reserve Pinot Noir 2000",
      "outOfStockBehavior": {
        "value": "_default"
      },
      "onSpecial": false,
      "dontShowPrice": false,
      "showDefaultDonationAmount": false,
      "isDonationItem": false,
      "sitemapPriority": {
        "value": "_auto"
      },
      "excludeFromSitemap": false,
      "autoReorderPoint": true,
      "seasonalDemand": false,
      "autoPreferredStockLevel": true,
      "autoLeadTime": true,
      "leadTime": 0,
      "useBins": false,
      "cost": 6,
      "overallQuantityPricingType": {
        "value": "_byLineQuantity"
      },
      "costEstimateType": {
        "value": "_averageCost"
      },
      "useMarginalRates": false,
      "costCategory": {
        "internalId": "3",
        "name": "Default"
      },
      "shipIndividually": false,
      "enforceMinQtyInternally": true,
      "roundUpAsComponent": false,
      "isSpecialOrderItem": false,
      "isDropShipItem": false,
      "trackLandedCost": false,
      "costingMethodDisplay": "Average",
      "weightUnit": {
        "value": "_lb"
      },
      "weight": 5,
      "billExchRateVarianceAcct": {
        "internalId": "152",
        "name": "5097 Bill Exchange Rate Variance"
      },
      "billPriceVarianceAcct": {
        "internalId": "151",
        "name": "5096 Bill Price Variance"
      },
      "billQtyVarianceAcct": {
        "internalId": "150",
        "name": "5095 Bill Quantity Variance"
      },
      "matchBillToReceipt": false,
      "assetAccount": {
        "internalId": "120",
        "name": "Inventory Asset"
      },
      "taxSchedule": {
        "internalId": "1",
        "name": "S1"
      },
      "incomeAccount": {
        "internalId": "56",
        "name": "4002 Sales : Sales - Merchandise"
      },
      "includeChildren": true,
      "salesDescription": "Reserve Pinot Noir 2000",
      "cogsAccount": {
        "internalId": "121",
        "name": "Cost of Goods Sold"
      },
      "copyDescription": false,
      "purchaseDescription": "Reserve Pinot Noir 2000",
      "lastModifiedDate": "2016-01-18T08:05:19.000+0000",
      "createdDate": "2015-06-12T21:29:35.000+0000"
    },
    {
      "externalId": "ITEM164",
      "internalId": "164",
      "customFieldList": {
        "customField": [
          {
            "value": false,
            "scriptId": "custitem16",
            "internalId": "194"
          }
        ]
      },
      "supplyReplenishmentMethod": {
        "internalId": "REORDER_POINT",
        "name": "Reorder Point"
      },
      "currency": "USA",
      "availableToPartners": false,
      "isInactive": true,
      "offerSupport": false,
      "isOnline": true,
      "displayName": "Crystallus 2002",
      "itemId": "Crystallus 2002",
      "outOfStockBehavior": {
        "value": "_default"
      },
      "onSpecial": false,
      "dontShowPrice": false,
      "showDefaultDonationAmount": false,
      "isDonationItem": false,
      "sitemapPriority": {
        "value": "_auto"
      },
      "excludeFromSitemap": false,
      "autoReorderPoint": true,
      "seasonalDemand": false,
      "autoPreferredStockLevel": true,
      "autoLeadTime": true,
      "leadTime": 0,
      "useBins": false,
      "cost": 5,
      "overallQuantityPricingType": {
        "value": "_byLineQuantity"
      },
      "costEstimateType": {
        "value": "_averageCost"
      },
      "useMarginalRates": false,
      "costCategory": {
        "internalId": "3",
        "name": "Default"
      },
      "shipIndividually": false,
      "enforceMinQtyInternally": true,
      "roundUpAsComponent": false,
      "isSpecialOrderItem": false,
      "isDropShipItem": false,
      "trackLandedCost": false,
      "costingMethodDisplay": "Average",
      "weightUnit": {
        "value": "_lb"
      },
      "weight": 5,
      "billExchRateVarianceAcct": {
        "internalId": "152",
        "name": "5097 Bill Exchange Rate Variance"
      },
      "billPriceVarianceAcct": {
        "internalId": "151",
        "name": "5096 Bill Price Variance"
      },
      "billQtyVarianceAcct": {
        "internalId": "150",
        "name": "5095 Bill Quantity Variance"
      },
      "matchBillToReceipt": false,
      "assetAccount": {
        "internalId": "120",
        "name": "Inventory Asset"
      },
      "taxSchedule": {
        "internalId": "1",
        "name": "S1"
      },
      "incomeAccount": {
        "internalId": "56",
        "name": "4002 Sales : Sales - Merchandise"
      },
      "includeChildren": true,
      "salesDescription": "Crystallus 2002",
      "cogsAccount": {
        "internalId": "121",
        "name": "Cost of Goods Sold"
      },
      "copyDescription": false,
      "purchaseDescription": "Crystallus 2002",
      "lastModifiedDate": "2016-01-18T08:05:19.000+0000",
      "createdDate": "2015-06-12T21:29:35.000+0000"
    }
  ]
}
```
</details>

#### Advanced search
Execute a search on a record type in which you specify search filter fields and/or search return columns or joined search columns.
Using advanced search, you can also return an existing saved search.

Advanced searching provides users with the ability to:
* Perform a search that references an existing saved search
* Perform a search that references an existing saved search, and then overrides existing search return columns with new search return columns
* Perform a search that references an existing saved search, and then provides additional search filter criteria (on top of the criteria already specified in the saved search)
* Perform a search that specifies search criteria and search result columns

The SOAP web services API includes advanced search objects for all records that have an existing search interface.

Please check your 'Advanced Search' Help center section in order to build a correct request. You can find it in the following way:

Log in to your NetSuite account >  Suite Cloud (Customization, Scripting, and Web Services) > SuiteTalk Web Services > SuiteTalk SOAP Web Services Platform Guide > SOAP Web Services operations > search > Advanced Searches in SOAP Web Services.

The component will always fetch all the existing metadata for the advanced search for you. All you should do is to delete what you don't need and to build a correct request based on the documentation.

##### Known Limitations
 - Enum values for condition operators accessible only in the `Basic search` type.
 - Input metadata for property columns absent for object type: `Transaction` and  `Advance Search` search type.
 - The following transaction searches are not supported:
 <details><summary>Click to expand</summary>

     - Blanket Purchase Order
     - CCard Refund
     - Commission
     - Credit Card
     - Currency Revaluation
     - Customer Payment Authorization
     - Deprecated Custom Transaction
     - Finance Charge
     - Fulfillment Request
     - GL Impact Adjustment
     - Inventory Count
     - Inventory Distribution
     - Inventory Status Change
     - Inventory Worksheet
     - Liability Adjustment
     - Ownership Transfer
     - Payroll Adjustment
     - Payroll Liability Check
     - Period End Journal
     - Purchase Contract
     - Request For Quote
     - Revenue Arrangement
     - Revenue Commitment
     - Revenue Commitment Reversal
     - Revenue Contract
     - Sales Tax Payment
     - Statement Charge
     - Store Pickup Fulfillment
     - System Journal
     - Tax Liability Cheque
     - Tegata Payable
     - Tegata Receivable
     - Transfer
     - Vendor Request For Quote
 </details>

##### Advanced Search Samples
###### Execute saved search

Object Type: Customer

Search Type: Customer Search Advanced

The following sample shows how to find customers, using saved search (by a keyword in an email).

XML request:
<details><summary>Click to expand</summary>

```xml
<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:messages_2019_1.platform.webservices.netsuite.com" xmlns:urn1="urn:core_2019_1.platform.webservices.netsuite.com">
    <soapenv:Header>
        <urn:applicationInfo>
            <urn:applicationId>YOURAPPLICATIONID</urn:applicationId>
        </urn:applicationInfo>
        <urn:passport>
            <urn1:email>YOUREMAIL</urn1:email>
            <urn1:password>YOURPASSWORD</urn1:password>
            <urn1:account>YOURACCOUNT</urn1:account>
        </urn:passport>
    </soapenv:Header>
    <soapenv:Body>
        <urn:search xmlns="urn:messages_2019_1.platform.webservices.netsuite.com">
            <urn:searchRecord xmlns:q1="urn:relationships_2019_1.lists.webservices.netsuite.com" xsi:type="q1:CustomerSearchAdvanced" savedSearchId="740" />
        </urn:search>
    </soapenv:Body>
</soapenv:Envelope>
```
</details>

The same request for the component (JSON):
```json
{
  "savedSearchId": "740"
}
```

Response
<details><summary>Click to see the response</summary>

```json
{
  "results": [
    {
      "basic": {
        "salesRep": [
          {
            "searchValue": {
              "internalId": "1008"
            }
          }
        ],
        "phone": [
          {
            "searchValue": "937-287-2222"
          }
        ],
        "internalId": [
          {
            "searchValue": {
              "internalId": "980"
            }
          }
        ],
        "entityId": [
          {
            "searchValue": "D&H Manufacturing"
          }
        ],
        "billState": [
          {
            "searchValue": "OH"
          }
        ],
        "billCity": [
          {
            "searchValue": "Dayton"
          }
        ],
        "billAddress1": [
          {
            "searchValue": "410 E. Fifth St."
          }
        ]
      }
    }
  ]
}
```
</details>

### Lookup Objects By Custom Field
Looks for objects available in NetSuite which meet given custom string field criteria.

#### Lookup Objects By Custom Field. Config fields
* **Object Category** - a category of an object in NetSuite
    * Standard
    * Custom
* **Object Type** - an object in NetSuite (Contact, Customer, Invoice, Cash Sale etc.). Fetches dynamically.

Input metadata  objects:
* Custom field name - name of the custom field. E.g. `custbody_tran_number`
* Custom field value - value of the custom field. E.g. `ABC-123`

```json
{
  "customFieldName": "custbody_tran_number",
  "customFieldValue": "ABC-123"
}
```

### Update Object
Update an object in NetSuite.

### Update Object. Config Fields
* **Object Category** - a category of an object in NetSuite
    * Standard
    * Custom
* **Object Type** - an object in NetSuite (Contact, Customer etc.). Fetches dynamically.

#### Update Object. Input Metadata
Is being fetched dynamically. Sample:

<details><summary>Input metadata for Invoice object:</summary>

```json
{
  "internalId": "13817",
  "entity": {
    "internalId": "5"
  },
  "currency": {
    "internalId": "1"
  },
  "tranDate": "2023-05-23",
  "itemList": {
    "item": [
      {
        "description": "General Donation",
        "amount": 1000,
        "item": {
          "internalId": "12"
        },
        "quantity": 1,
        "rate": "100",
        "taxCode": {
          "internalId": "5"
        },
        "customFieldList": {
          "customField": [
            {
              "type": "SelectCustomFieldRef",
              "scriptId": "asd_d3",
              "value": {
                "name": "Charity type",
                "internalId": "2"
              }
            }
          ]
        }
      }
    ]
  },
  "customFieldList": {
    "customField": [
      {
        "type": "StringCustomFieldRef",
        "scriptId": "custbody_sf_field-one",
        "value": "Bank Transfer"
      },
      {
        "type": "StringCustomFieldRef",
        "scriptId": "custbody_sf_field-two",
        "value": "Individual One-Off"
      },
      {
        "type": "StringCustomFieldRef",
        "scriptId": "custbody_sf_field-three",
        "value": "John Doe"
      },
      {
        "type": "StringCustomFieldRef",
        "scriptId": "custbody_sf_field-four",
        "value": "ABC-987"
      }
    ]
  }
}
```
</details>

### Upsert Object By ID
Either update an object in NetSuite by an ID provided or inserts as a new object if it does not exist.  

### Upsert Object By ID. Config Fields
* **Object Category** - a category of an object in NetSuite
  * Standard
  * Custom
* **Object Type** - an object in NetSuite (Contact, Customer etc.). Fetches dynamically.

### Lookup Customer (deprecated)
Deprecated. Use `Lookup Object By Id` action instead.
Find customer by provided ID.

#### How to use Lookup Customer Action
##### Find and select NetSuite component in the component repository
![Step 1](https://user-images.githubusercontent.com/13310949/44709539-8cec5800-aab2-11e8-88cd-b29508220dd3.png)

##### Create new or select existing credentials
![Step 2](https://user-images.githubusercontent.com/16806832/44349488-cf57d880-a4a5-11e8-86d6-542e13536de1.png)

##### Select action from list
![Step 3](https://user-images.githubusercontent.com/13310949/44708435-dab39100-aaaf-11e8-837d-7be16b43ff07.png)

##### Set input message or bind data from previous step
![Step 4](https://user-images.githubusercontent.com/13310949/44708436-db4c2780-aaaf-11e8-93f7-e98efe01a357.png)

##### Retrieving sample
![Step 5](https://user-images.githubusercontent.com/13310949/44708438-db4c2780-aaaf-11e8-99f0-fe9f3b076f28.png)

##### Retrieve sample result and click "Continue"
![Step 6](https://user-images.githubusercontent.com/13310949/44708439-db4c2780-aaaf-11e8-9d50-aeb5a3a08a5e.png)

##### Finish component configuration
![Step 7](https://user-images.githubusercontent.com/13310949/44708442-dbe4be00-aaaf-11e8-889a-8fa735fe7716.png)

You can provide **internal**, **external** id or **all** of them in input message.
If entity doesn't have **externalId** You must specify only **internalId** in input message.

If you specify incorrect internal or external id, You will get error "**That record does not exist.**"

For example:

 - externalId exists
```json
{
  "internalId":"1234",
  "externalId":"4567"
}
```
 - externalId does not exist

```json
{
  "internalId":"1234"
}
```

#### Lookup Customer. Input metadata
`./schemas/json/LookupCustomerById.in.json`

### Lookup Invoice (deprecated)
Deprecated. Use `Lookup Object By Id` action instead.

Finds invoice by provided ID.

#### How to use Lookup Invoice Action
##### Find and select NetSuite component in the component repository
![Step 1](https://user-images.githubusercontent.com/13310949/44709539-8cec5800-aab2-11e8-88cd-b29508220dd3.png)

##### Create new or select existing credentials
![Step 2](https://user-images.githubusercontent.com/16806832/44349488-cf57d880-a4a5-11e8-86d6-542e13536de1.png)

##### Select action from list
![Step 3](https://user-images.githubusercontent.com/13310949/44712312-20c12280-aab9-11e8-9809-210c29c56b35.png)

##### Set input message or bind data from previous step
![Step 4](https://user-images.githubusercontent.com/13310949/44712313-20c12280-aab9-11e8-8eed-c09f423f012a.png)

##### Retrieving sample
![Step 5](https://user-images.githubusercontent.com/13310949/44712315-2159b900-aab9-11e8-9a86-4133ded721f3.png)

##### Retrieve sample result and click "Continue"
![Step 6](https://user-images.githubusercontent.com/13310949/44712316-2159b900-aab9-11e8-999e-edfc86bd7f5d.png)

##### Finish component configuration
![Step 7](https://user-images.githubusercontent.com/13310949/44712318-2159b900-aab9-11e8-9c51-b5f62b1bfb29.png)

You can provide **internal**, **external** id or **all** of them in input message.
If entity doesn't have **externalId** You must specify only **internalId** in input message.

If You specify incorrect internal or external id, You will get error "**That record does not exist.**"

For example:

 - externalId exists
```json
{
  "internalId":"1234",
  "externalId":"4567"
}
```
 - externalId does not exist

```json
{
  "internalId":"1234"
}
```

#### Lookup Invoice. Input metadata
`./schemas/json/GetInvoiceById.json`

### Upsert Contact (deprecated)
Deprecated. Use `Upsert Object By Id` action instead.

Create new or update existing contact by provided external ID.

#### How to use Upsert Contact Action
##### Find and select NetSuite component in the component repository
![Step 1](https://user-images.githubusercontent.com/13310949/44709539-8cec5800-aab2-11e8-88cd-b29508220dd3.png)

##### Create new or select existing credentials
![Step 2](https://user-images.githubusercontent.com/16806832/44349488-cf57d880-a4a5-11e8-86d6-542e13536de1.png)

##### Select action from list
![Step 3](https://user-images.githubusercontent.com/16806832/44841590-63ffca80-ac4c-11e8-8757-56f643755186.png)

##### Set input message or bind data from previous step
![Step 4](https://user-images.githubusercontent.com/16806832/44841748-c2c54400-ac4c-11e8-8f34-8b6604ffd5f8.png)

##### Retrieving sample
![Step 5](https://user-images.githubusercontent.com/16806832/44841820-edaf9800-ac4c-11e8-80ae-b83eaae3685f.png)

##### Retrieve sample result and click "Continue"
![Step 6](https://user-images.githubusercontent.com/16806832/44842428-77139a00-ac4e-11e8-964d-95a429791b69.png)

##### Finish component configuration
![Step 7](https://user-images.githubusercontent.com/13310949/44706289-c1a7e180-aaa9-11e8-8b06-ac04d2876570.png)

#### Upsert Contact. Input metadata
`./schemas/json/Contact.json`

Request sample:
```json
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

### Upsert Customer (deprecated)
Deprecated. Use `Upsert Object By Id` action instead.

Creates new or updates an existing customer by provided external ID.

#### How to use Upsert Customer Action
##### Find and select NetSuite component in the component repository
![Step 1](https://user-images.githubusercontent.com/13310949/44709539-8cec5800-aab2-11e8-88cd-b29508220dd3.png)

##### Create new or select existing credentials
![Step 2](https://user-images.githubusercontent.com/16806832/44349488-cf57d880-a4a5-11e8-86d6-542e13536de1.png)

##### Select action from list
![Step 3](https://user-images.githubusercontent.com/13310949/44706283-c10f4b00-aaa9-11e8-9c60-057553824b45.png)

##### Set input message or bind data from previous step
![Step 4](https://user-images.githubusercontent.com/13310949/44706284-c10f4b00-aaa9-11e8-8622-6e33b5bbb480.png)

##### Retrieving sample
![Step 5](https://user-images.githubusercontent.com/13310949/44706286-c10f4b00-aaa9-11e8-8f63-f24a7f5801bf.png)

##### Retrieve sample result and click "Continue"
![Step 6](https://user-images.githubusercontent.com/13310949/44706287-c10f4b00-aaa9-11e8-8d3c-70bd2e4ec32b.png)

##### Finish component configuration
![Step 7](https://user-images.githubusercontent.com/13310949/44706289-c1a7e180-aaa9-11e8-8b06-ac04d2876570.png)

#### Upsert Customer. Input metadata
`./schemas/json/Customer.json`

Request sample:
```json
{
  "externalId": "external order ID",
  "customerId": "internal customer ID",
  "currency": "USA",
  "exchangeRate": 1.0,
  "orderItems": [
		{
			"itemInternalId": "387",
			"quantity": 10

		}
	]
}

```

### Upsert Invoice (deprecated)
Deprecated. Use `Upsert Object By Id` action instead.

Creates new or update existing invoice by provided external ID.

#### How to use Upsert Invoice Action
##### Find and select NetSuite component in the component repository
![Step 1](https://user-images.githubusercontent.com/8449044/45221760-1d991400-b2bb-11e8-96fa-a07cbdff5a92.png)

##### Create new or select existing credentials
![Step 2](https://user-images.githubusercontent.com/8449044/45221776-2984d600-b2bb-11e8-96bf-bf35e84b02c1.png)

##### Select action from list
![Step 3](https://user-images.githubusercontent.com/8449044/45221590-9a77be00-b2ba-11e8-9e93-e2748dfce4dd.png)

##### Set input message or bind data from previous step
![Step 4](https://user-images.githubusercontent.com/8449044/45221625-b24f4200-b2ba-11e8-86a0-9d478d0e55c6.png)

##### Retrieving sample
![Step 5](https://user-images.githubusercontent.com/8449044/45221640-c09d5e00-b2ba-11e8-9b1c-192e072055fa.png)

##### Retrieve sample result and click "Continue"
![Step 6](https://user-images.githubusercontent.com/8449044/45221667-d3179780-b2ba-11e8-8327-5f90e4728936.png)

##### Finish component configuration
![Step 7](https://user-images.githubusercontent.com/8449044/45221707-f0e4fc80-b2ba-11e8-897a-d784dcc2d35c.png)

#### Upsert Invoice. Input metadata:
`./schemas/json/Invoice.json`

<details><summary>Click to see the response</summary>

Request sample:
```json
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
</details>

### Upsert Sales Order (deprecated)
Deprecated. Use `Upsert Object By Id` action instead.

Creates new or update existing sales order by provided external ID.

#### How to use Upsert Sales Order Action
##### Find and select NetSuite component in the component repository
![Step 1](https://user-images.githubusercontent.com/13310949/44709539-8cec5800-aab2-11e8-88cd-b29508220dd3.png)

##### Create new or select existing credentials
![Step 2](https://user-images.githubusercontent.com/16806832/44349488-cf57d880-a4a5-11e8-86d6-542e13536de1.png)

##### Select action "Upsert Sales Order" from list
![Step 3](https://user-images.githubusercontent.com/16806832/45081682-68baf780-b100-11e8-935d-22ab98b74233.png)

##### Set input message or bind data from previous step
![Step 4](https://user-images.githubusercontent.com/16806832/45082400-e9c6be80-b101-11e8-9006-eb0fb07d60bc.png)

##### Retrieving sample
![Step 5](https://user-images.githubusercontent.com/16806832/44841820-edaf9800-ac4c-11e8-80ae-b83eaae3685f.png)

##### Retrieve sample result and click "Continue"
![Step 6](https://user-images.githubusercontent.com/16806832/45082510-27c3e280-b102-11e8-8a18-42cb5358efa5.png)

##### Finish component configuration
![Step 7](https://user-images.githubusercontent.com/13310949/44706289-c1a7e180-aaa9-11e8-8b06-ac04d2876570.png)

#### Upsert Sales Order. Input metadata
`./schemas/json/SalesOrder.json`

Request sample:
```json
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

### Upsert Vendor (deprecated)
Deprecated. Use `Upsert Object By Id` action instead.

Creates new or update existing vendor by provided external ID.

#### How to use Upsert Vendor Action
##### Find and select NetSuite component in the component repository
![Step 1](https://user-images.githubusercontent.com/13310949/44709539-8cec5800-aab2-11e8-88cd-b29508220dd3.png)

##### Create new or select existing credentials
![Step 2](https://user-images.githubusercontent.com/16806832/44349488-cf57d880-a4a5-11e8-86d6-542e13536de1.png)

##### Select action from list
![Step 3](https://user-images.githubusercontent.com/13310949/44707033-19474c80-aaac-11e8-909c-0496be43bea0.png)

##### Set input message or bind data from previous step
![Step 4](https://user-images.githubusercontent.com/13310949/44707035-19474c80-aaac-11e8-8cfa-d71df74644b0.png)

##### Retrieving sample
![Step 5](https://user-images.githubusercontent.com/13310949/44707037-19474c80-aaac-11e8-8e5e-075addf680f6.png)

##### Retrieve sample result
![Step 6](https://user-images.githubusercontent.com/13310949/44707038-19dfe300-aaac-11e8-961d-286cdce3b06a.png)

##### Finish component configuration
![Step 7](https://user-images.githubusercontent.com/13310949/44707040-19dfe300-aaac-11e8-83b2-b9f2c3527456.png)

Request sample:

```json
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

#### Upsert Vendor. Input metadata
`./schemas/json/Vendor.json`

### Upsert Custom Fields
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
```json
{
  "internalId": "1",
  "scriptId": "script1",
  "value": true,
  "type": "BooleanCustomFieldRef"
}
```

 - **DateCustomFieldRef**
```json
{
  "internalId": "1",
  "scriptId": "script1",
  "value": "2018-01-01T00:00:00.000+00:00",
  "type": "DateCustomFieldRef"
}
```

 - **DoubleCustomFieldRef**
```json
{
  "internalId": "1",
  "scriptId": "script1",
  "value": 3456.24,
  "type": "DoubleCustomFieldRef"
}
```

 - **LongCustomFieldRef**
```json
{
  "internalId": "1",
  "scriptId": "script1",
  "value": 987979999,
  "type": "LongCustomFieldRef"
}
```

 - **MultiSelectCustomFieldRef**
```json
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
```json
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
```json
{
  "internalId": "1",
  "scriptId": "script1",
  "value": "some value",
  "type": "StringCustomFieldRef"
}
```

## Known limitations
 - Currently 'Vendor payments' and 'Customer payments' types are supported for the `Search Entity` trigger.
 - Calling [Get New and Updated Objects Polling](#Get New and Updated Objects Polling) with Size of Polling Page less then 5 returns Error while NetSuite API call \[Invalid search page size.\]

## Links
[API docs](http://www.netsuite.com/portal/developers/resources/suitetalk-documentation.shtml)

[Open Integration Hub Standards](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#lookup-objects-plural)
