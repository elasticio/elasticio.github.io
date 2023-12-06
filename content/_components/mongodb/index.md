---
title: MongoDB component
layout: component
section: Database components
description: Integration component to interact with MongoDB databases.
icon: mongodb.png
icontext: MongoDB component
category: mongodb
updatedDate: 2023-07-06
ComponentVersion: 1.5.12
---

## Description

Integration component to interact with MongoDB databases.
> **Note:** The component works with the MongoDB versions `2.6` and above.

## Credentials

1. **URL** - URL used to connect with Mongo DB. Example: `mongodb://example.com:2017`, `mongodb+srv://server.example.com:2017`.
2. **User** - user for connection to Mongo DB.
3. **Password** - password for user to connect with Mongo DB.
4. **Authentication Database** - database that used for authentication user. Default: `admin`. If you connect to your database via the mongo shell with a command of the form `mongo mongodb://example.com/myDatabase -u myUser -p myPassword` then you should place `myDatabase` in this field.  If you connect to your database via the mongo shell with a command of the form  `mongo mongodb://example.com/ -u myUser -p myPassword` then you should leave this field blank.
5. **MongoDB version** - version of the MongoDB. One of options:
- `4.4 and lower (Default)` - Node.JS MongoDB driver version 3.5.9 will be used
- `5.0 and higher` - Node.JS MongoDB driver version 6.2.0 will be used

## Environment Variables

The component has no required variables, however in some cases it would be beneficiary
to use them. Here are the available variables:

1.  `MONGO_CONNECTION_TIMEOUT` - timeout in ms for connection to MongoDB. Default is `10000`.
2. `EIO_REQUIRED_RAM_MB` - Number of RAM megabytes provided to container. Additional memory may be needed in cases when incoming message is big (up to 10MB)

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

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about MongoDB component like [changelog](/components/mongodb/technical-notes#changelog).


## Limitations

*   Not supported authentication mechanisms: `LDAP`, `Kerberos` (`GSSAPI`) and `X.509`
*   Backward compatibility has not been broken for old MongoDB versions (`2.6` - `4.4`). But output metadata might have changed for certain actions for the latest MongoDB versions due to the changes made in the latest MongoDB and Node.JS driver implementations
