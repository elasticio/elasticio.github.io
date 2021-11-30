---
title: ID Linking component
layout: component
section: Utility components
description: A component used to map source data to target data.
icon: id-linking.png
icontext: ID Linking component
category: id-linking
updatedDate: 2021-11-26
ComponentVersion: 1.0.2
---

## General information

### Description

ID linking component is a {{site.data.tenant.name}} integration component to link IDs between different systems.

Bucket contains bucket ID and an array of linked objects between the systems. Linked object IDs may be string, number or object.

**Bucket samples:**

<details closed markdown="block">
<summary>
Click to expand - Bucket Sample 1
</summary>
```json
{
  "bucket_id": "some_sf_bucket_id",
  "linked_ids": [
    {
      "system_a_id": "00344000020qT3K",
      "system_b_id": 123
    },
    {
      "system_a_id": "0034400001uxwXZ",
      "system_b_id": 62
    }
  ]
}
```
</details>

<details closed markdown="block">
<summary>
Click to expand - Bucket Sample 2
</summary>
```json
{
  "bucket_id": "some_sf_bucket_id",
  "linked_ids": [
    {
      "system_a_id": "00344000020qT3K",
      "system_b_id": {
        "company": "mvise-eio",
        "id": "7c7fec00-d313-40c7-890b-3bc857bbb7dd"
      }
    },
    {
      "system_a_id": "0034400001uxwXZ",
      "system_b_id": {
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

## Actions

### Lookup Object

This action allows you to search linked objects in the bucket by the source system ID.

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

>**Please Note:** Currently buckets in Maester are being created with infinite lifetime.

#### Config Fields

* **System ID Type** - (required) - A system to upsert the ID. Either System A or System B.

#### Input Metadata

* sourceSystemId - Number, String or Object (optional). ID to lookup in the source system.
* targetSystemId - Number, String or Object (optional). ID of the target system to upsert.
