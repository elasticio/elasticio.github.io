---
title: MongoDB component Action functions
layout: component
description: MongoDB component action function details.
icon: mongodb.png
icontext: MongoDB component
category: mongodb
updatedDate: 2026-09-16
ComponentVersion: 2.0.0
---

## Description

Here are the details of the action function of MongoDB component.

## Aggregate

Calculates aggregate values for data in a collection or view using a MongoDB aggregation pipeline.

#### Configuration
* **Select a DB** (required): Database to execute the aggregation in.
* **Select a Collection** (required): Collection to aggregate documents from.
* **Emit Behavior** (required): Defines how resulting documents are emitted:
  * `Emit Individually`: Emits one message per resulting document.
  * `Emit Batch`: Emits documents grouped into arrays of size `batchSize`.
  * `Fetch All`: Emits a single message containing an array of all resulting documents in memory.
* **allowDiskUse** (optional): When checked, allows aggregation stages to write data to temporary files on the database server. Recommended for aggregations exceeding 100 MB of RAM.

#### Input Body
* `pipeline` (required array): Array of aggregation pipeline stages (e.g., `$match`, `$group`, `$sort`, `$project`).
* `batchSize` (optional number): Page/batch size when `Emit Batch` is selected. Default: `10`.

#### Input Example
```json
{
  "pipeline": [
    {
      "$match": {
        "status": "active"
      }
    },
    {
      "$group": {
        "_id": "$category",
        "totalAmount": {
          "$sum": "$amount"
        },
        "count": {
          "$sum": 1
        }
      }
    },
    {
      "$sort": {
        "totalAmount": -1
      }
    }
  ],
  "batchSize": 25
}
```

#### Output Examples

* **Emit Individually** (message per document):
```json
{
  "result": {
    "_id": "Electronics",
    "totalAmount": 15420.5,
    "count": 42
  }
}
```

* **Emit Batch / Fetch All** (array of documents):
```json
{
  "result": [
    {
      "_id": "Electronics",
      "totalAmount": 15420.5,
      "count": 42
    },
    {
      "_id": "Furniture",
      "totalAmount": 8340.0,
      "count": 19
    }
  ]
}
```

## Bulk Write

Executes multiple write operations in a single database request. Operations are executed in the order provided.

#### Configuration
* **Select a DB** (required): Target database.
* **Select a Collection** (required): Target collection.

#### Input Body
* `operations` (required array): Array of operation objects. Supported operations:
  * `insertOne`: `{ "document": { ... } }`
  * `updateOne`: `{ "filter": { ... }, "update": { ... }, "upsert": boolean }`
  * `updateMany`: `{ "filter": { ... }, "update": { ... }, "upsert": boolean }`
  * `deleteOne`: `{ "filter": { ... } }`
  * `deleteMany`: `{ "filter": { ... } }`
  * `replaceOne`: `{ "filter": { ... }, "replacement": { ... }, "upsert": boolean }`

  #### Input Example
```json
{
  "operations": [
    {
      "insertOne": {
        "document": {
          "sku": "ITEM-101",
          "name": "Wireless Mouse",
          "stock": 150
        }
      }
    },
    {
      "updateOne": {
        "filter": {
          "sku": "ITEM-100"
        },
        "update": {
          "$inc": {
            "stock": -1
          }
        }
      }
    },
    {
      "deleteOne": {
        "filter": {
          "sku": "ITEM-099"
        }
      }
    }
  ]
}
```

#### Output Example
```json
{
  "result": {
    "acknowledged": true,
    "insertedCount": 1,
    "matchedCount": 1,
    "modifiedCount": 1,
    "deletedCount": 1,
    "upsertedCount": 0,
    "insertedIds": {
      "0": "64a296786751183ae1f615ed"
    },
    "upsertedIds": {}
  }
}
```

## Delete By ID

Removes a specific document from a collection by its unique MongoDB identifier (`_id`).

#### Configuration
* **Select a DB** (required): Target database.
* **Select a Collection** (required): Target collection.

#### Input Body
* `id` (required string): 24-character hexadecimal MongoDB `_id` string (e.g., `"64a296786751183ae1f615ed"`), or wrapped template syntax `ObjectId('64a296786751183ae1f615ed')`.

#### Input Example
```json
{
  "id": "64a296786751183ae1f615ed"
}
```

#### Output Example
```json
{
  "result": {
    "acknowledged": true,
    "deletedCount": 1
  }
}
```

## Delete By Unique Criteria

Deletes documents from a collection that match the specified filter criteria.

> **Please Note:** Although named *Delete By Unique Criteria*, this action executes a MongoDB `deleteMany` command under the hood. Any document that matches the criteria will be deleted.

#### Configuration
* **Select a DB** (required): Target database.
* **Select a Collection** (required): Target collection.

#### Input Body
* `criteria` (required object): Filter query. Supports `ObjectId('...')` syntax recursively on top-level fields, nested query operators (`$eq`, `$in`, `$or`, etc.), and arrays.

#### Input Example
```json
{
  "criteria": {
    "status": "archived",
    "customerId": "ObjectId('64a296786751183ae1f615ed')"
  }
}
```

#### Output Example
```json
{
  "result": {
    "acknowledged": true,
    "deletedCount": 3
  }
}
```

## Lookup By ID

Retrieves a single document from a collection based on its `_id`.

#### Configuration

* **Select a DB** (required): Target database.
* **Select a Collection** (required): Target collection.

#### Input Body
* `id` (required string): 24-character hexadecimal MongoDB `_id` string (e.g., `"64a296786751183ae1f615ed"`), or wrapped template syntax `ObjectId('64a296786751183ae1f615ed')`.

#### Input Example
```json
{
  "id": "64a296786751183ae1f615ed"
}
```

#### Output Examples

* **Document found**:
```json
{
  "result": {
    "_id": "64a296786751183ae1f615ed",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "status": "active"
  }
}
```

* **Document not found**:
```json
{
  "result": null
}
```

## Lookup By Unique Criteria

Retrieves up to one document matching the specified unique criteria.

#### Configuration
* **Select a DB** (required): Target database.
* **Select a Collection** (required): Target collection.
* **Allow zero results** (optional checkbox):
  * If **checked**: When no document matches the query, an empty object `{}` is emitted.
  * If **unchecked**: When no document matches the query, an error `Document not found` is thrown.

#### Action Logic
* **0 documents found**:
  * `Allow zero results` is true: emits `{}`.
  * `Allow zero results` is false: throws `Document not found`.
* **Exactly 1 document found**: Emits the document directly at the root of the message body (no `result` wrapper).
* **More than 1 document found**: Throws `More than one document found`.

#### Input Body
* `criteria` (required object): Search filter. Supports `ObjectId('...')` syntax recursively on fields and nested query operators.

#### Input Example
```json
{
  "criteria": {
    "email": "jane.doe@example.com"
  }
}
```

#### Input Example with ObjectId
```json
{
  "criteria": {
    "_id": "ObjectId('64a296786751183ae1f615ed')"
  }
}
```

#### Output Examples

* **Single document found**:
```json
{
  "_id": "64a296786751183ae1f615ed",
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "status": "active"
}
```

* **No document found with "Allow zero results" checked**:
```json
{}
```

## Lookup Plural

Finds multiple documents matching the given search criteria.

#### Configuration
* **Select a DB** (required): Target database.
* **Select a Collection** (required): Target collection.
* **Emit Behavior** (required):
  * `Emit Individually`: Emits one message per document with `groupInfo`.
  * `Emit Batch`: Emits arrays of documents chunked by `batchSize` with `groupInfo`.
  * `Fetch All`: Emits a single message containing all matching documents.

#### Input Body
* `criteria` (required object): Search filter. Supports `ObjectId('...')` syntax recursively on fields and nested query operators.
* `limit` (optional number): Maximum number of documents to return. Set to `0` or omit for unlimited.
* `project` (optional object): Specifies which fields to include (`1`) or exclude (`0`).
* `batchSize` (optional number): Chunk size when `Emit Batch` is selected. Default: `10`.

> **Please Note:** In MongoDB projections, you cannot combine field inclusion (`1`) and exclusion (`0`) in the same query, with the sole exception of the `_id` field (e.g. `{ "name": 1, "email": 1, "_id": 0 }`).

#### Input Example (Basic Filter with Limit)
```json
{
  "criteria": {
    "status": "active"
  },
  "limit": 50
}
```

#### Input Example (With Projection and Batch Size)
```json
{
  "criteria": {
    "department": "Engineering"
  },
  "project": {
    "name": 1,
    "email": 1,
    "_id": 0
  },
  "limit": 100,
  "batchSize": 20
}
```

#### Output Examples

* **Emit Individually** (message per document):
```json
{
  "result": {
    "_id": "64a296786751183ae1f615ed",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "status": "active"
  }
}
```

* **Emit Batch / Fetch All** (array of documents):
```json
{
  "result": [
    {
      "_id": "64a296786751183ae1f615ed",
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "status": "active"
    },
    {
      "_id": "64a296786751183ae1f615ee",
      "name": "John Smith",
      "email": "john.smith@example.com",
      "status": "active"
    }
  ]
}
```

## Update Many
Updates one or more documents matching the specified criteria.

#### Configuration
* **Select a DB** (required): Target database.
* **Select a Collection** (required): Target collection.
* **Upsert** (optional checkbox): When checked, creates a new document if no document matches the search criteria.

#### Input Body
* `criteria` (required object): Filter used to select documents to update. Supports `ObjectId('...')` syntax recursively on fields and nested query operators.
* `update` (required object): MongoDB update operations (e.g. `$set`, `$inc`, `$unset`, `$push`).

#### Input Example
```json
{
  "criteria": {
    "department": "Sales",
    "status": "active"
  },
  "update": {
    "$set": {
      "commissionRate": 0.15,
      "lastReviewed": "2026-09-01T00:00:00.000Z"
    },
    "$inc": {
      "reviewCount": 1
    }
  }
}
```

#### Output Example
```json
{
  "result": {
    "acknowledged": true,
    "insertedId": null,
    "matchedCount": 3,
    "modifiedCount": 3,
    "upsertedCount": 0,
    "upsertedId": null
  }
}
```

## Upsert By ID

Updates an existing document or inserts a new document based on the provided document ID and payload.

#### Configuration
* **Select a DB** (required): Target database.
* **Select a Collection** (required): Target collection.

#### Input Body
* `id` (optional string): Raw 24-character hexadecimal MongoDB `_id` of the document to upsert, or wrapped with `ObjectId('...')`.
  * If **provided**: The action searches for a document matching this `_id`. If found, it updates the document; if not found, it inserts a new document with this `_id`.
  * If **omitted**: The action inserts a new document using MongoDB's auto-generated `_id`.
* Additional properties: Document fields to upsert, populated dynamically based on the collection schema.

#### Input Example
```json
{
  "id": "64a296786751183ae1f615ed",
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com",
  "role": "Lead Architect",
  "skills": ["Node.js", "MongoDB", "Kubernetes"]
}
```

#### Output Example
```json
{
  "result": {
    "_id": "64a296786751183ae1f615ed",
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "role": "Lead Architect",
    "skills": ["Node.js", "MongoDB", "Kubernetes"]
  }
}
```

## Upsert By Unique Criteria

Updates an existing document or inserts a new one based on unique matching criteria.

#### Configuration
* **Select a DB** (required): Target database.
* **Select a Collection** (required): Target collection.

#### Input Body
* `criteria` (required object): Unique matching filter. Supports `ObjectId('...')` syntax recursively on fields and nested query operators.
* `value` (required object): Fields to apply via `$set` when updating or inserting the document.

#### Input Example
```json
{
  "criteria": {
    "email": "alice.johnson@example.com"
  },
  "value": {
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "role": "Principal Architect",
    "department": "Platform Engineering",
    "status": "active"
  }
}
```

#### Output Example
```json
{
  "result": {
    "_id": "64a296786751183ae1f615ed",
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "role": "Principal Architect",
    "department": "Platform Engineering",
    "status": "active"
  }
}
```