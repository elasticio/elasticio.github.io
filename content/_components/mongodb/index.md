---
title: MongoDB component
layout: component
section: Database components
description: Integration component to interact with MongoDB databases.
icon: mongodb.png
icontext: MongoDB component
category: mongodb
createdDate: 2020-04-13
updatedDate: 2020-07-17
---

## Latest changelog

**1.5.1 (July 17, 2020)**

* Add Authentication DB information to documentation
* Update dependencies
* Update sailor to version `2.6.14`
* Log errors in verify credentials.
* Fix test suite.

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

## Credentials

1. `URL` - URL used to connect with Mongo DB.
Example: mongodb://example.com:2017, mongodb+srv://server.example.com:2017 .
2. `User` - user for connection to Mongo DB.
3. `Password` - password for user to connect with Mongo DB.
4. `Authentication Database` - database that used for authentication user. Default: admin. If you connect to your database via the mongo shell with a command of the form `mongo mongodb://example.com/myDatabase -u myUser -p myPassword` then you should place `myDatabase` in this field.  If you connect to your database via the mongo shell with a command of the form  `mongo mongodb://example.com/ -u myUser -p myPassword` then you should leave this field blank.

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
*   **[Delete By Unique Criteria](actions#delete-by-unique-criteria)** - Delete document by Unique Criteria.
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
