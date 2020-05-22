---
title: MongoDB component Action functions
layout: component
description: MongoDB component action function details.
icon: mongodb.png
icontext: MongoDB component
category: mongodb
createdDate: 2020-04-13
updatedDate: 2020-05-22
---

## Description

Here are the details of the action function of MongoDB component.

## Aggregate

Calculates aggregate values for the data in a collection or a view

### Configuration

1.  Select a DB - Database to be found in.
2. Select a Collection - Collection to be found in.

### Body

`pipeline` - a sequence of data aggregation operations or stages. See the
aggregation pipeline operators for details. **Required field**.

Must be an array of pipeline stages.

Examples:

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

## Bulk Write

Bulk Write takes an array of write operations and executes each of them. Operations executed in provided order.

### Configuration

1. Select a DB - Database to perform operations.
2. Select a Collection - collection to perform operations.

### Body

`operations` - Valid operations are: `insertOne`, `updateOne`, `updateMany`, `deleteOne`, `deleteMany`, `replaceOne`

Example:

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
## Delete By ID

Delete document by ID.

### Configuration

1. Select a DB - Database to be found in.
2. Select a Collection - Collection to be found in.

### Body

'id' of the document to delete

Example:

```json
{
  "id" : "5e936f7c7c876ec2e1e48f4d"
}
```

### Result

<details>
  <summary>Resulting JSON is a MongoDB specific information</summary>

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

Example:

```json
{
  "criteria": {
    "foo" : "bar"
  }
}
```
### Result

<details>
  <summary>Resulting JSON is a MongoDB specific information</summary>

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

Example:

```json
{
  "id" : "5e936f7c7c876ec2e1e48f4d"
}
```

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

Example:
```json5
{
  "criteria": {
    "value" : 4
  }
}
```
### Result

```json5
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

### Body

'criteria' of the document to search. **Required field**.

'limit' - specifies the maximum number of documents the action will return. 0 is equivalent to setting no limit. **Optional field**.

'project' - specifies which fields, including embedded objects, the action should return. Please refer [Project Fields to Return from Query](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/) for the details. **Optional field**.

Examples:

1. This will find all the documents (plural) according to th given criteria. In this case this will retrieve all the objects with the root value equals 4:
```json5
{
  "criteria": {
    "value": 4
  },
  "limit": 100
}
```
### Result

Will return an array of documents inside the `result` property:
```json5
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
```json5
{
  "criteria": {
    "nestedObj.otherValue": 4
  }
}
```

3. Using project object you can specify which fields to return (set to 1) or not to return (set to 0).
The following sample returns all the objects (as the 'criteria' object is empty), with fields 'fieldFoo' and 'fieldBar' only. Also note that with the exception of the \_id field, you cannot combine inclusion and exclusion statements in projection documents.
```json5
{
  "criteria": {},
  "project": { 'fieldFoo': 1, 'fieldBar': 1, '_id': 0}
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

Example:

```json
{
  "name" : "some_value",
  "surname": "updated_value"
}
```

### Result

```json
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

Example:

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
### Result

<details>
  <summary>Resulting JSON</summary>

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

Examples:

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
2. `value` -
Document to be upserted.
Example:
```json5
{
  "name" : "some_value",
  "surname": "updated_value"
}
```
### Result
```json5
{
  "result":  {
    "id": "some id" // object id
    // other document properties
  }
}
```
