---
title: MongoDB component
layout: component
section: Database components
description: Integration component to interact with MongoDB databases.
icon: mongodb.png
icontext: MongoDB component
category: mongodb
createdDate: 2020-04-13
updatedDate: 2020-05-22
---

## Latest changelog

**1.4.1 (May 19, 2020)**

*   Update Sailor to 2.6.7
*   Update documentation
*   Add dynamic metadata for `upsertById`, `upsertByCriteria` and `updateMany` actions

> To see the full **changelog** please use the following [link](changelog).

## Description

Integration component to interact with MongoDB databases. The component works with
the MongoDB versions `2.6` and above.

## Authentication

The authenticate and connect with the MongoDB you must create credential with
following entries:

*   **URL** - The connection URL to your MongoDB. For example: `mongodb://example.com:2017`or `mongodb+srv://server.example.com:2017`.
*   **User** - user for connection to MongoDB.
*   **Password** - password for user to connect with MongoDB.
*   **Authentication Database** - database that used for authentication user. By default it is `admin`, but your case can be different. Please check your records.

## Environment Variables

The component has no required variables, however in some cases it would be beneficiary
to use them. Here are the available variables:

*   `MONGO_CONNECTION_TIMEOUT` - timeout in ms for connection to MongoDB. Default is `10000`.
*   `EIO_REQUIRED_RAM_MB` - Number of RAM megabytes provided to container. Additional memory may be needed in cases when incoming massage is big (up to 10MB).

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

Please check the dedicated page for action functions. Below are the existing
action functions, each linked to the section where more explanation is given.

*   **[Aggregate](actions#aggregate)** - Calculates aggregate values for the data in a collection or a view.
*   **[Bulk Write](actions#bulk-write)** - Bulk Write takes an array of write operations and executes each of them. Operations executed in provided order.
*   **[Delete By ID](actions#delete-by-id)** - Delete document by ID.
*   **[Lookup By ID](actions#lookup-by-id)** -  Lookup document by ID.
*   **[Lookup By Unique Criteria](actions#lookup-by-unique-criteria)** - Lookup (at most 1) Document By Unique Criteria.
*   **[Lookup Plural](actions#lookup-plural)** - Lookup many documents by criteria.
*   **[Upsert By ID](actions#upsert-by-id)** - Upserts document by ID.
*   **[Update Many](actions#update-many)** - Updates documents in a collection.
*   **[Upsert By Unique Criteria](actions#upsert-by-unique-criteria)** - Upserts document by unique criteria.

## Limitations

*   Not supported authentication mechanisms: `LDAP`, `Kerberos` (`GSSAPI`) and `X.509`
*   Lookup by `ObjectId` criteria is not supported in Lookup By Unique Criteria action, Lookup by ID action should be used in this case
*   The component supports MongoDB `2.6+`
