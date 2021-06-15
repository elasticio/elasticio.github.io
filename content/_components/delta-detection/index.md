---
layout: component
title: Delta Detection Component
section: Utility components
description: A component to manage records from a system which does not provide timebased change tracking or webhooks.
icon: delta-detection.png
icontext: Delta Detection Component
category: utility
updatedDate: 2021-05-11
ComponentVersion: 2.0.0
---

## Description

Component learn about new records, updates to records and deletions of records from a system which does not provide timebased change tracking or webhooks.

### Requirements

The component would not work without the platform native object-storage service.  The service is configured as a part of standard installation.

## Credentials

`External id` - field to identify component. Should be unique per `maester` instance

## Actions

### Delta Detection

Action helps to learn about new records, updates to records from a system that does not provide time-based change tracking or webhooks.

Common mechanism of action:

![image](https://user-images.githubusercontent.com/16806832/84742618-62d29580-afb9-11ea-8ce4-b7cc9e88bf39.png)

Example Integration Flow Using This Action:

  * Extracts all records from a system on a daily basis
  * Runs the entire dataset through a delta filter
  * Performs upsert operations in some other system

{% include img.html max-width="20%" url="img/example-integration-flow.png" title="Example Integration Flow" %}

Hashing logic consider that the following two JSON strings represent two JSON objects that are semantically identical produces the same hash:

`{"foo":"bar","bar":"baz"}` = `{"bar":"baz","foo":"bar"}`

Hashes are done with cryptographically secure algorithms and non-reversible.

#### Expected input metadata

<details close markdown="block">
<summary>
Click to expand metadata schema
</summary>

```json
  {
    "type": "object",
    "properties": {
      "objectId": {
        "type": ["object", "string"],
        "required": true,
        "title": "Object ID"
      },
      "objectData": {
        "type": ["object", "string", "array"],
        "required": true,
        "title": "Object Data"
      }
    }
  }
```
</details>

* `objectId` - set unique identifier for storing object information at external object-storage.
* `objectData` - set object data, that component can detect changes.

> Please use developer mode in case when `objectId` or `objectData` should be another object type (array or object).

Expected output metadata depends on incoming object structure.

## Known Limitations

 1. The hash function generates the same hash for different types of quotes: `''`, `""`, ` `` `
 2. Pre-fetch count should be equal 1. Correct behavior with pre-fetch > 1 is not guaranteed
 3. One credential cannot be used in more than one step per all platform instances that are connected to one `maester` installation as it would lead to a collision
