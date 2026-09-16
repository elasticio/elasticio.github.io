---
title: MongoDB component
layout: component
section: Database components
description: The MongoDB component connects your integration flows directly to MongoDB databases.
icon: mongodb.png
icontext: MongoDB component
category: mongodb
updatedDate: 2026-09-16
ComponentVersion: 2.0.0
---

## Table of Contents
* [General Information](#general-information)
  * [Description](#description)
  * [Credentials](#credentials)
  * [Environment Variables](#environment-variables)
  * [ObjectId Handling Across Actions](#objectid-handling-across-actions)
* [Actions](#actions)
  * [Aggregate](actions#aggregate)
  * [Bulk Write](actions#bulk-write)
  * [Delete By ID](actions#delete-by-id)
  * [Delete By Unique Criteria](actions#delete-by-unique-criteria)
  * [Lookup By ID](actions#lookup-by-id)
  * [Lookup By Unique Criteria](actions#lookup-by-unique-criteria)
  * [Lookup Plural](actions#lookup-plural)
  * [Update Many](actions#update-many)
  * [Upsert By ID](actions#upsert-by-id)
  * [Upsert By Unique Criteria](actions#upsert-by-unique-criteria)
* [Known Limitations](#known-limitations)

## General Information
Integrate workflows with MongoDB to store, retrieve, update, and manage data at scale. The component is powered by the official MongoDB driver (v7.6.0) on Node.js 24, providing full support for MongoDB Server versions 4.0 and newer.

### Description
The MongoDB component connects your integration flows directly to MongoDB databases. It supports a comprehensive range of database operations including advanced aggregations, bulk operations, and standard CRUD tasks using the official Node.js MongoDB driver.

### Credentials
To establish a connection, configure the following fields:

1. **URL** (required): The standard MongoDB connection string.
   * Format: `mongodb://user:password@hostname:port/database` or `mongodb+srv://hostname/database`
2. **User** (required): Authentication username.
3. **Password** (required): Authentication password.
4. **Authentication Database** (`authSource`, optional): The database against which authentication credentials are verified. Defaults to `admin`.

> **Please Note:** Component v2.0+ uses an automatic unified driver. Manual `mongoVersion` selection is no longer required.

### Environment Variables

The component has no required variables, however in some cases it would be beneficiary
to use them. Here are the available variables:
1. **`MONGO_CONNECTION_TIMEOUT`** (optional): Maximum time in milliseconds to wait for database connection establishment. Default: `10000`.
2. **`EIO_REQUIRED_RAM_MB`** (optional): Container memory limit allocated for component execution. Recommended to increase when executing large aggregations or batch lookups.

### ObjectId Handling Across Actions
MongoDB uses 12-byte / 24-character hexadecimal identifiers for document `_id` fields. The component provides unified, consistent support for ObjectIds across all actions:

1. **Direct ID Actions** (*Lookup By ID*, *Delete By ID*, *Upsert By ID*):
   * Expect the document ID via the `id` property in the input message body.
   * Accepts **either** a raw 24-character hexadecimal string or the wrapped template syntax:
     ```json
     { "id": "64a296786751183ae1f615ed" }
     ```
     or
     ```json
     { "id": "ObjectId('64a296786751183ae1f615ed')" }
     ```
   * Single quotes (`'`) and double quotes (`"`) are both supported.
   * The component automatically parses the input into a native MongoDB `ObjectId`.

2. **Criteria, Pipeline & Operation Actions** (*Lookup By Unique Criteria*, *Lookup Plural*, *Delete By Unique Criteria*, *Update Many*, *Upsert By Unique Criteria*, *Aggregate*, *Bulk Write*):
   * When querying by `_id` or another ObjectId field inside a `criteria` object, aggregation `pipeline`, or `bulkWrite` operations array, wrap the 24-character hex ID with the template:
     ```text
     ObjectId('64a296786751183ae1f615ed')
     ```
   * Both single-quote (`ObjectId('...')`) and double-quote (`ObjectId("...")`) syntax are supported.
   * **Full Scope & Nested Operators**: The component recursively traverses objects and arrays. You can use the template at top-level fields, inside query operators, and within logical operators. Multiple ObjectIds across the same criteria or payload are converted automatically.

#### ObjectId Examples

* **Nested Filter Operators (`$in`, `$or`, `$eq`) in Criteria**:
  ```json
  {
    "criteria": {
      "$or": [
        { "_id": "ObjectId('64a296786751183ae1f615ed')" },
        { "accountId": { "$in": [
          "ObjectId('64a296786751183ae1f615ee')",
          "ObjectId('64a296786751183ae1f615ef')"
        ]}}
      ]
    }
  }
  ```

* **Aggregate Pipeline with ObjectId Filter**:
  ```json
  {
    "pipeline": [
      {
        "$match": {
          "companyId": "ObjectId('64a296786751183ae1f615ed')",
          "status": "active"
        }
      },
      {
        "$group": {
          "_id": "$department",
          "total": { "$sum": 1 }
        }
      }
    ]
  }
  ```

* **Bulk Write with ObjectId Filters**:
  ```json
  {
    "operations": [
      {
        "updateOne": {
          "filter": { "_id": "ObjectId('64a296786751183ae1f615ed')" },
          "update": { "$set": { "verified": true } }
        }
      },
      {
        "deleteOne": {
          "filter": { "_id": "ObjectId('64a296786751183ae1f615ee')" }
        }
      }
    ]
  }
  ```

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

Please check the dedicated page for action functions. Below are the existing
action functions, each linked to the section where more explanation is given.

*   **[Aggregate](actions#aggregate)** - Calculates aggregate values for data in a collection or view using a MongoDB aggregation pipeline.
*   **[Bulk Write](actions#bulk-write)** - Executes multiple write operations in a single database request.
*   **[Delete By ID](actions#delete-by-id)** - Removes a specific document from a collection by its unique MongoDB identifier (`_id`).
*   **[Delete By Unique Criteria](actions#delete-by-unique-criteria)** - Deletes documents from a collection that match the specified filter criteria.
*   **[Lookup By ID](actions#lookup-by-id)** - Retrieves a single document from a collection based on its `_id`.
*   **[Lookup By Unique Criteria](actions#lookup-by-unique-criteria)** - Retrieves up to one document matching the specified unique criteria..
*   **[Lookup Plural](actions#lookup-plural)** - Finds multiple documents matching the given search criteria.
*   **[Update Many](actions#update-many)** - Updates one or more documents matching the specified criteria.
*   **[Upsert By ID](actions#upsert-by-id)** - Updates an existing document or inserts a new document based on the provided document ID and payload.
*   **[Upsert By Unique Criteria](actions#upsert-by-unique-criteria)** - Updates an existing document or inserts a new one based on unique matching criteria.

## Known Limitations

1. **Authentication Mechanisms**:
   * Supports standard SCRAM-SHA-1 and SCRAM-SHA-256 authentication.
   * Does not support LDAP, Kerberos (GSSAPI), or X.509 client certificate authentication.
2. **Supported MongoDB Versions**:
   * Uses official MongoDB Driver `v7.6.0`, supporting MongoDB Server versions 4.0 and higher.
3. **Memory Considerations with Fetch All**:
   * The `Fetch All` emit behavior loads all query results into container memory simultaneously before emitting. For large datasets, use `Emit Batch` or `Emit Individually` to avoid out-of-memory errors.