---
title: Microsoft Dynamics CRM actions
layout: component
description: Microsoft Dynamics CRM component actions.
icon:  msdynamics-crm.png
icontext: Microsoft Dynamics CRM component
category: Microsoft Dynamics CRM
createdDate: 2018-03-18
updatedDate: 2020-06-18
---

## Bulk Create Objects

Provides a simple interface for quickly creating large amounts of objects.

### Input field description

* **Object Type to create** - dropdown list where you should choose the object type to perform bulk create operation. E.g. `accounts`.

### Metadata description

* **Objects** - an array of the objects that will be created. Example input objects for creating 2 accounts:

```js
    inputObjects: [
      {
        name: "Sample account 1",
        telephone1: "+1 (555) 123-4567",
        address1_latitude: 47.639583,
        description: "This is the description of the sample account",
        revenue: 5000000
      }, {
        name: "Sample account 2",
        description: "This is the description of the sample account 2",
      }
    ]
```

More information [Dynamics 365 Basic Create](https://docs.microsoft.com/en-us/powerapps/developer/common-data-service/webapi/create-entity-web-api#basic-create)

Result is an object with a property **result**: `array`. It contains the list of newly created object IDs.

Bulk create performed in a single transactional operation. Error will be thrown in case when one of objects in input cannot be created (for example due to invalid input).

### Limitations

Current implementation can process up to 100 objects at the time.

## Bulk Update Objects

Provides a simple interface for quickly updating large amounts of objects.

### Input field description

* **Object Type to create** - dropdown list where you should choose the object type to perform bulk update operation. E.g. `accounts`.

### Metadata description

* **Objects** - an `array` of the objects. Each object contains id and new values for the updated object. Format is the same as for the bulk create action but objects must also contain id field.
Example input objects for updating 2 accounts:

```js
    inputObjects: [
      {
        id: "AAAAAAAA-EC57-EA11-A811-000D3A2287A4",
        description: "New description of the sample account"
      }, {
        id: "BBBBBBBB-EC57-EA11-A811-000D3A2287A4",
        description: "New description of the sample account 2",
      }
    ]
```

Result is an object with a property **result**: `array`. It contains the list `boolean` results of an operation.

### Limitations

Current implementation can process up to 100 objects at the time.

## Bulk Delete Objects

Provides a simple interface for quickly deleting large amounts of objects.

### Input field description

* **Object Type to create** - dropdown list where you should choose the object type to perform bulk delete operation. E.g. `accounts`. Example input objects for deleting 2 accounts:

```js
    inputObjects: [
      {
        id: "AAAAAAAA-EC57-EA11-A811-000D3A2287A4",
      }, {
        id: "BBBBBBBB-EC57-EA11-A811-000D3A2287A4",
      }
    ]
```

### Metadata description

* **Objects** - an `array` of the objects. Each object contains id for deleted objects.

In case of successful operation result is an object with a property **result**: `boolean` = `true`.

### Limitations

Current implementation can process up to 100 objects at the time.

## Delete Object By ID

Deletes a Selected Object.

### Input field description

* **Object Type to create** - Input field where you should choose the object type, which you want to delete. E.g. `account`

### Metadata description

* **id** - `string`, DynamicsCRM 365 object id

In case of successful operation result is an object with a property **result**: `boolean` = `true`.

## Lookup Object by Field(s)

Given a set of criteria which matches exactly one record, find that matching record.

All Objects Programmatically Detectable Covered. Requires a sample object to
exist to infer schema. Shows all fields, not just unique fields.  Does not
necessarily understand type for field.

## Upsert Object

Creates or Updates Selected Object.

Action creates a single object. Input metadata is fetched dynamically from your Dynamics 365 account. Output metadata is the same as input metadata, so you may expect all fields that you mapped as input to be returned as output.

### Input field description

* **Object type** - a dropdown list where you should choose an entity set, which you want to lookup. E.g. `accounts`.
* **Utilize data attachment from previous step (for objects with a binary field)** - a checkbox, if it is checked and an input message contains an attachment and specified object has a binary field (type of `ImageType`) then the input data is put into object's binary field. In this case any data specified for the binary field in the data mapper is discarded.

You should specify **ID** for making updates in object.

### Limitations

When **Utilize data attachment from previous step (for objects with a binary field)** is checked and this action is used with Local Agent error would be thrown: 'getaddrinfo ENOTFOUND steward-service.platform.svc.cluster.local steward-service.platform.svc.cluster.local:8200'

## Lookup Object by Field(deprecated)

Use **Lookup Object by Field** instead

Given a set of criteria which matches exactly one record, find that matching record.

All Objects Programmatically Detectable Covered. Requires a sample object to
exist to infer schema. Shows all fields, not just unique fields.  Does not
necessarily understand type for field.

## Upsert Object(deprecated)

Use **Upsert Object** instead

Update an existing entry if the id provided.  Otherwise create a new entry.

All Objects Programmatically Detectable Covered. Requires a sample object to
exist to infer schema.  Does not inform following components if new.

## Sync Accounts(deprecated)

Use **Upsert Object** action instead

## Sync Contacts(deprecated)

Use **Upsert Object** action instead

## Sync Invoices(deprecated)

Use **Upsert Object** action instead

## Sync Orders(deprecated)

Use **Upsert Object** action instead

## Sync Price Levels(deprecated)

Use **Upsert Object** action instead

## Sync Product Price Levels(deprecated)

Use **Upsert Object** action instead

## Sync Products(deprecated)

Use **Upsert Object** action instead

## Sync Quotes(deprecated)

Use **Upsert Object** action instead

## Sync Unit Groups(deprecated)

Use **Upsert Object** action instead

## Sync Units(deprecated)

Use **Upsert Object** action instead
