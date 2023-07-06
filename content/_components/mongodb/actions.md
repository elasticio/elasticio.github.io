---
title: MongoDB component Action functions
layout: component
description: MongoDB component action function details.
icon: mongodb.png
icontext: MongoDB component
category: mongodb
updatedDate: 2022-12-02
ComponentVersion: 1.5.10
---

## Description

Here are the details of the action function of MongoDB component.

## Aggregate

Calculates aggregate values for the data in a collection or a view

### Configuration

1. Select a DB - Database to be found in.
2. Select a Collection - Collection to be found in.
3. Select an Emit Behavior: **Emit Individually**, **Emit Batch** or **Fetch All** - Determines how many messages to emit when the number of results is not one.  **Emit Individually** attaches a `groupInfo` to the message (outside the body) which allows the message to be rebuilt.
4. allowDiskUse - Enables writing to temporary files. When set to true, aggregation stages can write data to the _tmp subdirectory in the dbPath directory. See [docs](https://docs.mongodb.com/manual/reference/command/aggregate/#std-label-aggregate-cmd-allowDiskUse).

### Body

`pipeline` - a sequence of data aggregation operations or stages. See the
aggregation pipeline operators for details. **Required field**.

> **Note:** Must be an array of pipeline stages.

`batchSize` - size of pages. Rendered only if `Emit Batch` strategy is chosen. Default: 10.

<details close markdown="block"><summary><strong>Examples</strong></summary>

```
{
  "pipeline": [
    { $group: { _id: null, count: { $sum: 1 } } }
  ]
}
```


```
{
  "pipeline": [
    { $match: { value: 64 } },
    { $addFields: { newField: 88 } },
  ]
}
```

</details>

<details close markdown="block"><summary><strong>Emit batch strategy</strong></summary>

```
{
  "pipeline": [
    { $match: { value: 64 } },
    { $addFields: { newField: 88 } },
  ],
  "batchSize": 10
}
```

</details>

## Bulk Write

Bulk Write takes an array of write operations and executes each of them. Operations executed in provided order.

### Configuration

1. Select a DB - Database to perform operations.
2. Select a Collection - collection to perform operations.

### Body

`operations` - Valid operations are: `insertOne`, `updateOne`, `updateMany`, `deleteOne`, `deleteMany`, `replaceOne`

<details close markdown="block"><summary><strong>Example</strong></summary>

```json
{
  "operations": [
    {
      "insertOne": {
        "document": {
          "test": 1
        }
      }
    },
    {
      "updateOne": {
        "filter": {
          "test": "test"
        },
        "update": {
          "test": 2
        }
      }
    }
  ]
}

```

</details>

## Delete By ID

Delete document by ID.

### Configuration

1. Select a DB - Database to be found in.
2. Select a Collection - Collection to be found in.

### Body

'id' of the document to delete

<details close markdown="block"><summary><strong>Example</strong></summary>

```json
{
  "id" : "5e936f7c7c876ec2e1e48f4d"
}
```

</details>

### Result

<details close markdown="block"><summary><strong>Resulting JSON is a MongoDB specific information</strong></summary>

```json
{
  "result": {
    "result": {
      "n": 1,
      "opTime": {
        "ts": "6815603303313833985",
        "t": 24
      },
      "electionId": "7fffffff0000000000000018",
      "ok": 1,
      "$clusterTime": {
        "clusterTime": "6815603303313833985",
        "signature": {
          "hash": "8NaPN38tce9du4OTS1aMF9qZeoI=",
          "keyId": "6781502667437899778"
        }
      },
      "operationTime": "6815603303313833985"
    },
    "connection": {
      "_events": {},
      "_eventsCount": 4,
      "id": 1,
      "address": "35.195.12.99:27017",
      "bson": {},
      "socketTimeout": 360000,
      "monitorCommands": false,
      "closed": false,
      "destroyed": false,
      "lastIsMasterMS": 10
    },
    "deletedCount": 1,
    "n": 1,
    "opTime": {
      "ts": "6815603303313833985",
      "t": 24
    },
    "electionId": "7fffffff0000000000000018",
    "ok": 1,
    "$clusterTime": {
      "clusterTime": "6815603303313833985",
      "signature": {
        "hash": "8NaPN38tce9du4OTS1aMF9qZeoI=",
        "keyId": "6781502667437899778"
      }
    },
    "operationTime": "6815603303313833985"
  }
}
```

</details>

## Delete By Unique Criteria

Delete document by Unique Criteria.

### Configuration

1. Select a DB - Database to be found in.
2. Select a Collection - Collection to be found in.

### Body

`criteria` of the document to search

<details close markdown="block"><summary><strong>Example</strong></summary>

```json
{
  "criteria": {
    "foo" : "bar"
  }
}
```

</details>

### Result

<details close markdown="block"><summary><strong>Resulting JSON is a MongoDB specific information</strong></summary>

```json
{
  "result": {
    "result": {
      "n": 2,
      "opTime": {
        "ts": "6815625881956909058",
        "t": 24
      },
      "electionId": "7fffffff0000000000000018",
      "ok": 1,
      "$clusterTime": {
        "clusterTime": "6815625881956909058",
        "signature": {
          "hash": "PfOoj8NNKraOSMQIqufBVgFis9g=",
          "keyId": "6781502667437899778"
        }
      },
      "operationTime": "6815625881956909058"
    },
    "connection": {
      "_events": {},
      "_eventsCount": 4,
      "id": 1,
      "address": "35.195.12.99:27017",
      "bson": {},
      "socketTimeout": 360000,
      "monitorCommands": false,
      "closed": false,
      "destroyed": false,
      "lastIsMasterMS": 10
    },
    "deletedCount": 2,
    "n": 2,
    "opTime": {
      "ts": "6815625881956909058",
      "t": 24
    },
    "electionId": "7fffffff0000000000000018",
    "ok": 1,
    "$clusterTime": {
      "clusterTime": "6815625881956909058",
      "signature": {
        "hash": "PfOoj8NNKraOSMQIqufBVgFis9g=",
        "keyId": "6781502667437899778"
      }
    },
    "operationTime": "6815625881956909058"
  }
}
```

</details>

## Lookup By ID

Lookup document by ID.

### Configuration

1. Select a DB - Database to be found in.
2. Select a Collection - Collection to be found in.

### Body

`id` of the document

<details close markdown="block"><summary><strong>Example</strong></summary>

```json
{
  "id" : "5e936f7c7c876ec2e1e48f4d"
}
```

</details>

### Result

```json
{
  "result": {
    "_id": "5a97f9c91c807bb9c6eb5fb4",
    "user_id": "t3qulfeem@kwiv5.6ur",
    "name": "John Smith"
  }
}
```

## Lookup By Unique Criteria

Lookup (at most 1) Document By Unique Criteria.

### Configuration

1. Select a DB - Database to be found in.
2. Select a Collection - Collection to be found in.
3. Allow zero results - When checked, in case zero documents found, an empty body will be emitted as a result. An error will be thrown otherwise.

Action logic:
* In case 0 document found:
  * 'Allow zero results' checked. Empty object is emitted.
  * 'Allow zero results' not checked. Error 'Document not found' thrown.
* In case exactly 1 document found:

This document is emitted
* In case more than 1 document found:
Error 'More than one document found' thrown.

### Body

'criteria' of the document to search

<details close markdown="block"><summary><strong>Example</strong></summary>

```json
{
  "criteria": {
    "value" : 4
  }
}
```

</details>

### Result

```json
{
  "_id": "5a97f9c91c807bb9c6eb5fb4",
  "user_id": "t3qulfeem@kwiv5.6ur",
  "name": "John Smith",
  "value": 4
}
```

## Lookup Plural

Lookup many documents by criteria.

### Configuration

1. Select a DB - Database to be found in.
2. Select a Collection - Collection to be found in.
3. Select an Emit Behavior: **Emit Individually**, **Emit Batch** or **Fetch All** - Determines how many messages to emit when the number of results is not one.  **Emit Individually** attaches a `groupInfo` to the message (outside the body) which allows the message to be rebuilt.

### Body

`criteria` of the document to search. **Required field**.

>**Please Note:**: it is possible to lookup objects by fields with type ObjectID. For enabling this feature use template `"ObjectId('objectId')"`.

<details close markdown="block"><summary><strong>Example</strong></summary>

![image](https://user-images.githubusercontent.com/16806832/137541181-19a9c8f1-464a-4722-b399-323cf65c204b.png)

```json
{
  "criteria": {
    "taskId": "ObjectId('61523b6043a05f0006fc4800')"
  },
  "limit": 100
}
```

</details>

>**Known limitation**: it is possible to lookup by ObjectId only on first level of criteria object. Nested properties are not supported.
In case usage  template `"ObjectId('objectId')"` on next levels of criteria object value will accept as string.

`limit` - specifies the maximum number of documents the action will return. 0 is equivalent to setting no limit. **Optional field**.

`project` - specifies which fields, including embedded objects, the action should return. Please refer [Project Fields to Return from Query](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/) for the details. **Optional field**.

`batchSize` - size of pages. Rendered only if `Emit Batch` strategy is chosen. Default: 10.

<details close markdown="block"><summary><strong>Example</strong></summary>

This will find all the documents (plural) according to th given criteria. In this case this will retrieve all the objects with the root value equals 4:

```json
{
  "criteria": {
    "value": 4
  },
  "limit": 100
}
```

</details>

### Result

Will return an array of documents inside the `result` property:

```json
{
  "result": [
    {
      "_id": "5e936f7c7c876ec2e1e48f4d",
      "name": "Example4",
      "nestedObj": {
        "otherValue": 4
      },
      "value": 4
    }
  ]
}
```

2. Complex queries are also supported. E.g. the next query will return all the objects that have a property `otherValue` equals 4 inside of a property `nestedObj`.
You will get a 'Projection cannot have a mix of inclusion and exclusion' error otherwise.

```json
{
  "criteria": {
    "nestedObj.otherValue": 4
  }
}
```

3. Using project object you can specify which fields to return (set to 1) or not to return (set to 0).
The following sample returns all the objects (as the 'criteria' object is empty), with fields 'fieldFoo' and 'fieldBar' only. Also note that with the exception of the \_id field, you cannot combine inclusion and exclusion statements in projection documents.

```
{
  "criteria": {},
  "project": { 'fieldFoo': 1, 'fieldBar': 1, '_id': 0}
}
```

4. Emit batch strategy:

```json
{
  "criteria": {
    "value": 4
  },
  "limit": 100,
  "batchSize": 10
}
```

## Upsert By ID

Upserts document by ID.

### Configuration

1. Select a DB - Database to be found in.
2. Select a Collection - Collection to be found in.
3. Object ID - id of upserted document. If not provided document would be created. Note: value must be a single String of 12 bytes or a string of 24 hex characters.

### Body

Document to be upserted.

<details close markdown="block"><summary><strong>Example</strong></summary>

```json
{
  "name" : "some_value",
  "surname": "updated_value"
}
```

</details>

### Result

```
{
  "result":  {
    "id": "some id" // object id
    // other document properties
  }
}
```

## Update Many

Updates documents in a collection

### Configuration

1. Select a DB - Database to be found in.
2. Select a Collection - Collection to be found in.
3. Upsert - When checked, creates a new document if no document matches the query.

#### Body

1. `criteria` - the criteria used to select the documents to update.
2. `update` - the update operations to be applied to the documents

Please refer the [MongoDB Update Operators Documentation](https://docs.mongodb.com/manual/reference/operator/update/) for the details on the operators.

<details close markdown="block"><summary><strong>Example</strong></summary>

```json
{
  "criteria": {
    "nestedObj.otherValue": {
      "$gt": 2
    }
  },
  "update": {
    "$set": {
      "nestedObj.anotherValue":"bla"
    }
  }
}
```

</details>

### Result

<details close markdown="block"><summary><strong>Resulting JSON</strong></summary>

```json
{
  "result": {
    "result": {
      "n": 2,
      "nModified": 2,
      "opTime": {
        "ts": "6816718766450147330",
        "t": 24
      },
      "electionId": "7fffffff0000000000000018",
      "ok": 1,
      "$clusterTime": {
        "clusterTime": "6816718766450147330",
        "signature": {
          "hash": "5wbixQ6vmIt6IJehzdL55zp1zYw=",
          "keyId": "6781502667437899778"
        }
      },
      "operationTime": "6816718766450147330"
    },
    "connection": {
      "_events": {},
      "_eventsCount": 4,
      "id": 1,
      "address": "35.195.12.99:27017",
      "bson": {},
      "socketTimeout": 360000,
      "monitorCommands": false,
      "closed": false,
      "destroyed": false,
      "lastIsMasterMS": 10
    },
    "modifiedCount": 2,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 2,
    "n": 2,
    "nModified": 2,
    "opTime": {
      "ts": "6816718766450147330",
      "t": 24
    },
    "electionId": "7fffffff0000000000000018",
    "ok": 1,
    "$clusterTime": {
      "clusterTime": "6816718766450147330",
      "signature": {
        "hash": "5wbixQ6vmIt6IJehzdL55zp1zYw=",
        "keyId": "6781502667437899778"
      }
    },
    "operationTime": "6816718766450147330"
  }
}
```

</details>

## Upsert By Unique Criteria

Upserts document by unique criteria.

### Configuration

1. Select a DB - Database to be found in.
2. Select a Collection - Collection to be found in.

### Body

1. `criteria` - criteria for upsertion.

<details close markdown="block"><summary><strong>Example</strong></summary>

 ```json
{
  "address": "Park Lane 38"
} // Property address equals 'Park Lane 38' in upserted Document
```

```json
{
  "status": {
    "$in": "['A', 'D']"
  }
} // Property status equals 'A' or 'D'
```

</details>

2. `value` - Document to be upserted.

<details close markdown="block"><summary><strong>Example</strong></summary>

```json
{
  "name" : "some_value",
  "surname": "updated_value"
}
```

</details>

### Result

```
{
  "result":  {
    "id": "some id" // object id
    // other document properties
  }
}
```
