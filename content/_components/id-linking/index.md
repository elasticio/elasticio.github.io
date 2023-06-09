---
title: ID Linking component
layout: component
section: Utility components
description: A component used to map source data to target data.
icon: id-linking.png
icontext: ID Linking component
category: id-linking
updatedDate: 2022-11-24
ComponentVersion: 1.2.0
---

## General information

### Description

ID linking component is a {{site.data.tenant.name}} integration component to link IDs between different systems.

Bucket contains bucket ID and an array of linked objects between the systems. Linked object IDs may be string, number or object.

**Bucket samples:**

<details close markdown="block"><summary><strong>Click to expand - Bucket Sample 1 </strong></summary>

```json
{
  "bucketId": "some_sf_bucket_id",
  "linkedIds": [
    {
      "systemAId": "00344000020qT3K",
      "systemBId": 123
    },
    {
      "systemAId": "0034400001uxwXZ",
      "systemBId": 62
    }
  ]
}
```
</details>

<details close markdown="block"><summary><strong>Click to expand - Bucket Sample 2 </strong></summary>

```json
{
  "bucketId": "some_sf_bucket_id",
  "linkedIds": [
    {
      "systemAId": "00344000020qT3K",
      "systemBId": {
        "company": "mvise-eio",
        "id": "7c7fec00-d313-40c7-890b-3bc857bbb7dd"
      }
    },
    {
      "systemAId": "0034400001uxwXZ",
      "systemBId": {
        "company": "mvise-salessphere",
        "id": "fc64c4f0-06f7-47ef-b3b6-8441b4837305"
      }
    }
  ]
}
```
</details>

## Requirements

### Environment variables

No need to set up any environment variables manually.
However, the component needs environment variables ELASTICIO_OBJECT_STORAGE_TOKEN and ELASTICIO_OBJECT_STORAGE_URI to connect to Maester service.

### Credentials

Bucket ID - a text input of a bucket ID to assign.

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Delete Object

This action deletes a linked object from the list of linked objects in the bucket by the source system ID key provided once a match object is found.

{% include img.html max-width="100%" url="img/delete-object.png" title="Delete object" %}

#### Config Fields

* **System Type to delete by (a key to lookup by)** - (required) - A system to lookup the ID in. Either System A or System B.

* **Do not throw error when no object found** - (optional) - This option defines the strategy to follow if no object found by the provided key. By default, an error `No object found by provided ID in the bucket` will be thrown. Once the checkbox is checked - an empty message will be returned instead of throwing errors.

#### Input Metadata

* sourceSystemId - Number, String or Object (required). ID to lookup in the source system.

#### Output Metadata

* result - a found object or empty. **If result is not empty**:
* An object representing a bucket. Contains a bucket ID and an array of linked objects

### Lookup Object

This action allows you to search linked objects in the bucket by the source system ID.

{% include img.html max-width="100%" url="img/lookup-object.png" title="Lookup object" %}

#### Config Fields

* **Allow ID To Be Omitted** - When selected, the ID field becomes optional, otherwise it is a required field.

* **Object Not Found Behavior** - (required) - Either `Allow zero results` or `Wait for object to exist`:

  *  **Allow zero results** - When selected, if zero results are returned, the empty object {} is emitted, otherwise an error would be thrown.
  *  **Wait for object to exist** - When selected, if no results are found, apply rebounds and wait until the object exits.

* **System ID Type** - (required) - A system to lookup the ID in. Either System A or System B.

#### Input Metadata

* sourceSystemId - Number, String or Object (required or optional - depending on `Allow ID To Be Omitted` checkbox). ID to lookup in the source system.

#### Output Metadata

* result - a found object or empty

### Upsert Object

This action allows you to create/update a linked object in the bucket by system ID keys.

{% include img.html max-width="100%" url="img/upsert-object.png" title="Upsert object" %}

>**Please Note:** Currently buckets in Maester are being created with infinite lifetime.

#### Config Fields

* **System ID Type** - (required) - A system to upsert the ID. Either System A or System B.

#### Input Metadata

* **System A ID** - Number, String or Object (optional): ID value.
* **System B ID** - Number, String or Object (optional): ID value.

### Write Entire Bucket Contents

This action allows you to write linked objects (array of objects) in the bucket, Bucket ID needs to be specified in the credentials.

{% include img.html max-width="100%" url="img/write-entire-bucket-contents.png" title="Write Entire Bucket Contents" %}

>**Please Note:** Currently buckets in Maester are being created with infinite lifetime.

#### Config Fields

There is no Config Fields in this action.

#### Input Metadata

* linkedIds - (array, required): array of objects with optional fields: `[{ systemAId: ["object", "string"], systemBId: ["object", "string"] }]`

<details close markdown="block"><summary><strong>Click to expand - linkedIds </strong></summary>

   ```json
    [
      {
        "systemAId": "aid",
        "systemBId": "bid"
      },
      {
        "systemAId": "aid2",
        "systemBId": "bid2"
      }
    ]
   ```
</details>

#### Output Metadata

* bucketContents - (object, required): Echo back the value that was saved

### Read Entire Bucket Contents

This action allows you to read linked objects (array of objects) from the bucket, Bucket ID needs to be specified in the credentials.

{% include img.html max-width="100%" url="img/read-entire-bucket-contents.png" title="Read Entire Bucket Contents" %}

#### Config Fields

There is no Config Fields in this action.

#### Input Metadata

There is no Input Metadata in this action.

#### Output Metadata

* bucketContents - (object, required): Emit the entire contents of the bucket in a single message.
