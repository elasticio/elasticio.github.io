---
title: NetSuite triggers
layout: component
description: NetSuite component triggers.
icon: netsuite.png
icontext: NetSuite component
category: NetSuite component
createdDate: 2020-03-18
updatedDate: 2020-03-18
---
## Get New and Updated Objects Polling

Generic trigger that polls NetSuite instance for new and/or updated objects (of any type available in the NetSuite).

![Get New and Updated Objects Polling](img/get-new-update-objects-polling.png)

### Get New and Updated Objects Polling. Config fields

* Object Type (dropdown)

* Start Time (string, optional): Indicates the beginning time to start polling from (defaults to the beginning of time)

* End Time (string, optional): If provided, don’t fetch records modified after this time (defaults to never)

* Size of Polling Page (optional; string). Indicates the size of pages to be fetched. Defaults to 1000. CAN NOT be less then 5.

* Single Page per Interval (dropdown/checkbox: yes/no; default yes). Indicates that if the number of changed records exceeds the maximum number of results in a page, instead of fetching the next page immediately, wait until the next flow start to fetch the next page.

First, the system reads all the objects of the chosen type and processes it further along with your designed integration flow.
It will also create an initial state of fetched objects, we call it a *snapshot*, in order to have something to compare with after your data is updated.

After the initial read, any further requests for an update or create new object in NetSuite will be compared to this snapshot and in case any changes are detected they will be passed along with the integration flow as well.

## Search Entity(deprecated)

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
