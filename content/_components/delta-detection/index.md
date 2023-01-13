---
layout: component
title: Delta Detection Component
section: Utility components
description: A component to manage records from a system which does not provide timebased change tracking or webhooks.
icon: delta-detection.png
icontext: Delta Detection Component
category: delta-detection
updatedDate: 2023-01-03
ComponentVersion: 2.2.0
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

### Read Entire Bucket Contents

Action helps to read the entire contents of the saved bucket in a single message.

#### Expected config

There are no configuration fields.

#### Expected input metadata

There is no input metadata.

#### Expected output metadata

Output metadata is `bucketContents` object (required): the entire contents of the saved bucket.

### Write Entire Bucket Contents

Action helps to set the entire bucket contents.

#### Expected config

There are no configuration fields.

#### Expected input metadata

Input metadata is `bucketContents` object (required):  value to set the entire bucket contents.
The object must have the following structure:

```json
{
    "objects": [
        {
            "objectId": 1,
            "lastSeenTime": "2022-05-26T13: 47: 17.887Z",
            "objectData": {
                "b": "foo",
                "c": "bar",
                "a": "foo"
            }
        }
    ]
}
```

Each object from `objects` array must contain `objectId` and `objectData` properties, `lastSeenTime` is optional and if is not set will be set current timestamp.

#### Expected output metadata

Output metadata is `bucketContents` object (required):  echo back the value that was saved.

### Delete Object/Record

This action use for deletion one Object/Record from the bucket

#### Expected config

* `If no object found` (dropdown, optional, `Emit nothing` by default) - select one of options to handle case when Object not exist in bucket:
  * `Emit nothing` - component will not produce any messages
  * `Emit an empty object` - result will be empty object: `{}`
  * `Throw an error` - error will be thrown

#### Expected input metadata

* `objectId` (number/string/object, required) - unique identifier for Object/Record

#### Expected output metadata

Empty JSON Object (`{}`)

## Known Limitations

 1. Please note: **Bucket Lifetime is 24 hours**.
 2. The hash function generates the same hash for different types of quotes: `''`, `""`, ` `` `
 3. Pre-fetch count should be equal 1. Correct behavior with pre-fetch > 1 is not guaranteed
 4. One credential cannot be used in more than one step per all platform instances that are connected to one `maester` installation as it would lead to a collision
