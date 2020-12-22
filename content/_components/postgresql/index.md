---
title: PostgreSQL Component
layout: component
section: Database components
description: PostgreSQL is a general purpose and open source object-relational database management system.
icon: postgresql.png
icontext: PostgreSQL Component
category: postgresql-component
updatedDate: 2020-11-20
ComponentVersion: 1.4.0
---

## Description

This is an open source component for working with [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL)
object-relational database management system on {{site.data.tenant.name}} platform.The component also works well with [AWS Redshift](https://aws.amazon.com/redshift/).

## Overview

With this component you will have the following trigger:

*   `SELECT` - this trigger will execute an SQL query that returns multiple results, it has no limitations on the query but apparently best suited for SELECT type of queries

Following actions are also inside:

*   `SELECT` - same as above but as an action
*   `INSERT`/`UPDATE`/`DELETE` - this action executes the SQL query that returns no data, for example insert, delete or update. After query is executed original message will be pushed to the next component.
*   `INSERT Bulk` - this action executes the bulk INSERT SQL query and returns execution result.
*   `SQL Injection` - **Expert mode.** This action executes the SQL query or SQL script without prepared statements and returns an array of results of execution each query.
*   `SQL Query` - **Expert mode.** This action executes the SQL query or SQL script with prepared statements and returns an array of results of execution each query. **JSONata expression can be used as a source of SQL query.**

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about PostgreSQL component like [changelog](/components/postgresql/technical-notes#changelog) and [completeness matrix](/components/postgresql/technical-notes#completeness-matrix).

## Environment Variables

`LOG_LEVEL` - `trace` | `debug` | `info` | `warning` | `error` controls logger level

The component completeness matrix is also [available separately](completeness-matrix).

## Authentication

There are two options for authentication:

1. Filling out the Connection URI (host), Connection port, Database Name, User, and Password fields. This is the recommended method.
2. Adding a full PostgreSQL connection URL in the Connection String field to connect to your database, as follows:

```
postgresql://user:password@your.postgresql.host:5432/dbname
```

>**Note:** if you fill out both the Connection String and all the other connection data fields, the platform will use the connection string to connect to the database.

The option `Allow self-signed certificates` add to connection options following:

```
ssl: {
    rejectUnauthorized: false
  }
```

It could be useful for instances that are is using self-signed SSL certificates (like [Heroku](https://help.heroku.com/MDM23G46/why-am-i-getting-an-error-when-i-upgrade-to-pg-8))

See more in [documentation](https://www.postgresql.org/docs/current/static/libpq-connect.html#LIBPQ-CONNSTRING).

## Triggers

PostgreSQL component includes the following triggers:

  1. [SELECT trigger](/components/postgresql/triggers#select-trigger-and-action)                                                                         
  This trigger and action are actually the same but can be used in two different scenarios - trigger as a first step and action in between other steps.

## Actions


1. [SELECT action](/components/postgresql/actions#select-action)                                                                         
This trigger and action are actually the same but can be used in two different scenarios - trigger as a first step and action in between other steps.

2. [INSERT/UPDATE/DELETE action](/components/postgresql/actions#insertupdatedelete-action)                                                                         
Use this action to insert, update or delete some data, returned value is ignored, number of affected rows you can see in the log file.

3. [INSERT Bulk action](/components/postgresql/actions#insert-bulk-action)                                                                         
This action is useful to execute a bulk insert query in one transaction. An incoming message needs to contain a body with an array of objects.

4. [SQL Query action](/components/postgresql/actions#sql-query-action)                                                                         
**Expert mode**. You can execute SQL query or SQL script in this action.

5. [SQL Injection action](/components/postgresql/actions#sql-injection-action)                                                                         
**Expert mode**. You can execute SQL Injection in this action. You can not use prepare statement there, for this purpose use [SQL Query Action](/components/postgresql/actions#sql-query-action).

## How SQL templates work

SQL language is pretty extensive and complicated, so we tried to design the
templating as minimum invasive so that you could express your self in SQL with
maximum flexibility. Implementation of the templating is based on
[prepared statement](https://www.postgresql.org/docs/9.3/static/sql-prepare.html)
and hence should be safe to many SQL injection attacks. Second technology that is
used here is [JavaScript template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Expression_interpolation) (we are using [this library](https://github.com/felixfbecker/node-sql-template-strings) internally) so you can even property traversal and string manipulation
in the templates. Let us demonstrate how the templating works on a sample. Let's
take an incoming message like this:

```json
{
  "body": {
    "name": "Homer Simpson",
    "age": 38,
    "address": {
      "street": "742 Evergreen Terrace",
      "city": "Springfield"
    }
  }
}
```

If we would like to insert it into the database, we would use following template:

```sql
INSERT INTO customers (name, age, address) VALUES (${name},${age},${address.street + address.city})
```

So as you can see in the example above type conversion will happen automatically
and you can traverse and concatenate values.

Now the SELECT example:

```sql
SELECT * FROM customers WHERE address LIKE ${'%' + address.city + '%'}
```
Same as above, concatenation and traversal in action.

## Known limitations

There are several limitations of the component:

We are relying on standard type default js<->postgresql data-type coercion
[see here](https://github.com/brianc/node-postgres#features)

If in doubt call support.
