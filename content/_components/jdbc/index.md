---
title: JDBC Component
layout: component
section: Database components
description: A component to work with object-relational database management systems.
icon: jdbc.png
icontext: JDBC component
category: jdbc
createdDate: 2019-06-11
updatedDate: 2019-11-01
---

## Latest changelog

**2.3.2 (October 21, 2019)**

* Add rebound mechanism in case of deadlocks for actions: Insert, UpsertByPK, DeleteByPK

> To see the full **changelog** please use the following [link](/components/jdbc/changelog).

## Description

This a component for working with object-relational database management systems.
It works with the `MySQL`, `PostgreSQL`, `Oracle` and `MSSQL` DBs.

## Purpose

With this component you will have following triggers:

``SELECT`` - this trigger will execute an [SQL](https://en.wikipedia.org/wiki/SQL "SQL") query that returns multiple results, it has limitations on the query and suited only for SELECT type of queries. The trigger will remember last execution timestamp and let you build queries on it.

``GET ROWS POLLING`` - this trigger will execute select query from specified table with simple criteria of selected datetime or timestamp table. The trigger will remember last execution timestamp and let you build queries on it.

Following actions are inside:

``SELECT`` - this action will execute an [SQL](https://en.wikipedia.org/wiki/SQL "SQL") query that returns multiple results, it has limitations on the query and suited only for SELECT type of queries.

``LOOKUP BY PRIMARY KEY`` - this action will execute select query from specified table, as criteria can be used only [PRIMARY KEY](https://en.wikipedia.org/wiki/Primary_key "PRIMARY KEY"). The action returns only one result (a primary key is unique).

``UPSERT BY PRIMARY KEY`` - this action will execute select command from specified table, as search criteria can be used only [PRIMARY KEY](https://en.wikipedia.org/wiki/Primary_key "PRIMARY KEY"), and execute insert command by PRIMARY KEY with specified field, if result does not found, else - action will execute update command by PRIMARY KEY with specified field. The action returns only one result row (a primary key is unique).

``DELETE BY PRIMARY KEY`` - this action will execute delete query from specified table, as criteria can be used only [PRIMARY KEY](https://en.wikipedia.org/wiki/Primary_key "PRIMARY KEY"). The action returns an integer value that indicates the number of rows affected, the returned value can be 0 or 1 (a primary key is unique).

``INSERT`` - this action will execute insert query into the specified table. The action returns boolean value is execution insert successful or not.


## Environment variables

For integration-testing is needed to specify following environment variables:

1. Connection to MSSQL:
 - ``CONN_USER_MSSQL`` - user login
 - ``CONN_PASSWORD_MSSQL`` - user password
 - ``CONN_DBNAME_MSSQL`` - DataBase name
 - ``CONN_HOST_MSSQL`` - DataBase host
 - ``CONN_PORT_MSSQL`` - DataBase port

2. Connection to MySQL:
 - ``CONN_USER_MYSQL`` - user login
 - ``CONN_PASSWORD_MYSQL`` - user password
 - ``CONN_DBNAME_MYSQL`` - DataBase name
 - ``CONN_HOST_MYSQL`` - DataBase host
 - ``CONN_PORT_MYSQL`` - DataBase port

3. Connection to Oracle:
 - ``CONN_USER_ORACLE`` - user login
 - ``CONN_PASSWORD_ORACLE`` - user password
 - ``CONN_DBNAME_ORACLE`` - DataBase name
 - ``CONN_HOST_ORACLE`` - DataBase host
 - ``CONN_PORT_ORACLE`` - DataBase port

4. Connection to PostgreSQL:
 - ``CONN_USER_POSTGRESQL`` - user login
 - ``CONN_PASSWORD_POSTGRESQL`` - user password
 - ``CONN_DBNAME_POSTGRESQL`` - DataBase name
 - ``CONN_HOST_POSTGRESQL`` - DataBase host
 - ``CONN_PORT_POSTGRESQL`` - DataBase port

## Credentials

You need to use following properties to configure credentials:

### DB Engine

Choose one of supported database types:

*   MySQL
*   PostgreSQL
*   Oracle
*   MSSQL

### Connection URI

Provide hostname of the server, e.g. ``acme.com``

### Connection port

Optional field. Provide port of the server instance, as by default:
- ``3306`` - MySQL
- ``5432`` - PostgreSQL
- ``1521`` - Oracle
- ``1433`` - MSSQL

### Database Name

Provide name of database at the instance that you want to interact with.

### User

Provide a username that has permissions to interact with the Database.

### Password

Provide a password of the user that has permissions to interact with the Database.

### Configuration properties

Optional field. Provide a configuration properties for connections to the Database, e.g. ``useUnicode=true&serverTimezone=UTC``

**Limitation:** `Configuration properties` value may not be checked during Credentials Verification, so in case of using this field make sure that it contains correct input.

## Triggers

### Select trigger

You are able to provide SELECT query with last execution timestamp as WHERE clause criteria.

![Select trigger](img/select-trigger.png)

Before executing the the statement %%EIO_LAST_POLL%% will be replaced with ISO Date of the last execution or max value of the last pooled datetime, for example ``2018-08-01T00:00:00.000``.
During the first execution, date will be equal to ["start" of Unix Time](https://en.wikipedia.org/wiki/Unix_time) - ``1970-01-01 00:00:00.000``.
Precision of the polling clause can be till milliseconds.
The format of ``Start Polling From (optional)`` field should be like ``yyyy-mm-dd hh:mi:ss[.sss]``, where
- ``yyyy`` - year
- ``mm`` - month
- ``dd`` - day
- ``hh`` - hour
- ``mi`` - minute
- ``ss`` - second
- ``sss`` - millisecond (optional)

### Get Rows Polling trigger

This trigger can polling data from provided table. As WHERE clause you can use column, which has datatype like DATE or TIMESTAMP.

![Get Rows Polling trigger](img/get-rows-polling-trigger.png)

Before executing the the statement %%EIO_LAST_POLL%% will be replaced with ISO Date of the last execution or max value of the last pooled datetime, for example ``2018-08-01T00:00:00.000``.
During the first execution, date will be equal to ["start" of Unix Time](https://en.wikipedia.org/wiki/Unix_time) - ``1970-01-01 00:00:00.000``.
Precision of the polling clause can be till milliseconds.
The format of ``Start Polling From (optional)`` field should be like ``yyyy-mm-dd hh:mi:ss[.sss]``, where

- ``yyyy`` - year
- ``mm`` - month
- ``dd`` - day
- ``hh`` - hour
- ``mi`` - minute
- ``ss`` - second
- ``sss`` - millisecond (optional)

> **Please note** that Component Snapshot will not be overwritten in Real-Time flows due to platform behaviour, so we strongly recommend to use Get Rows Polling trigger in Keen Flows only*

#### Input fields description

![Get Rows Polling trigger - Input fields description](img\get-rows-polling-trigger-input-fields.png)

  * Tables List

Dropdown list with available table names, required field

  * Timestamp (or similar) Column

Dropdown list with available Column names, that have a type like `java.sql.Date` or `java.sql.Timestamp`, required field

  * Start Polling From (optional)

Optional field, indicates the beginning time to start polling from (defaults to the current time)

### SELECT trigger (Deprecated)

This action exists in JDBC component only for backward compatibility. New [**Select trigger**](#select-trigger) is recommended to use.

## Actions

### Execute custom query action

Action to execute custom SQL query from provided request string.

> **Note:** SQL request will be executed according to chosen database JDBC specification.

Execution result returns as array of objects. If request contains multiple sql statements - them will execute inside one transaction.
If one of statements fails, transaction will be rollbacked.

![Execute custom query action](img/execute-custom-query-action.png)

#### Input fields description

As input metadata, you will get one field named `query` to provide request string

#### Query Samples:

Select:
```sql
SELECT name, size FROM stars
```

Update:
```sql
INSERT INTO stars values (1,'Taurus', '2015-02-19 10:10:10.0', 123, 5, 'true', '2015-02-19')
```

Posgresql batch multiple statements request:
```sql
DELETE FROM stars WHERE id = 1;
UPDATE stars SET radius = 5 WHERE id = 2;
```

### Select action

![Select action](img/select-action.png)

The action will execute an [SQL](https://en.wikipedia.org/wiki/SQL "SQL") query that can return multiple results, it has limitations on the query and suited only for SELECT type of queries.
In SQL query you can use clause variables with specific data types.
Internally we use prepared statements, so all incoming data is
validated against SQL injection, however we had to build a connection from JavaScript types to the SQL data types
therefore when doing a prepared statements, you would need to add ``:type`` to **each prepared statement variable**.

> **Note:** prepared statement variables name could contain: any characters between a-z or A-Z, a digit and a character `_` (`[a-zA-Z0-9_]`).

For example if you have a following SQL statement:

```sql
SELECT
FROM users
WHERE userid = @id AND language = @lang
```

you should add ``:type`` to each ``@parameter`` so your SQL query will looks like this:

```sql
SELECT
FROM users
WHERE userid = @id:number AND language = @lang:string
```

Following types are supported:
 * ``string``
 * ``number``
 * ``bigint``
 * ``boolean``
 * ``float``
 * ``date``

![Select Action - SQL Query](img\select-action-sql-query.png)

Checkbox ``Don't throw Error on an Empty Result`` allows to emit an empty response, otherwise you will get an error on empty response.

#### Input fields description

Component supports dynamic incoming metadata - as soon as your query is in place it will be parsed and incoming metadata will be generated accordingly.

### Lookup Row By Primary Key

![Look up Row by Primary key](img\look-up-row-by-primary-key.png)

The action will execute select query from a ``Table`` dropdown field, as criteria can be used only [PRIMARY KEY](https://en.wikipedia.org/wiki/Primary_key "PRIMARY KEY"). The action returns only one result (a primary key is unique).
Checkbox ``Don't throw Error on an Empty Result`` allows to emit an empty response, otherwise you will get an error on empty response.

#### Input fields description

![Look up Row by Primary key - Input fields description](img\look-up-row-by-primary-key-input-field.png)
As an input metadata you will get a Primary Key field to provide the data inside as a clause value.

### Insert action

The action will execute ``INSERT`` command into the table from ``Table`` dropdown list the values specified in the body.

![Insert Action](img\insert-action.png)

#### List of Expected Config fields

   * `Enable Rebound` if `Yes` in case of deadlocks rebound message using Sailor rebound mechanism, number of rebound can be specified via environment variable: `ELASTICIO_REBOUND_LIMIT` recommended value 3

#### Input fields description

Action contains only one configuration field `Table` - dropdown list with available table names.

![Insert Action - Input fields description](img/insert-action-input-fields.png)

#### Expected input metadata

As input metadata, you will get all fields of the selected table except for fields with `auto-increment` or `auto-calculated` property.

#### Expected output metadata

As output metadata, you will get execution insert result like:
```json
{
  "result": true
}
```

### Delete Row By Primary Key action

![Delete Row By Primary Key](img/delete-row-by-primary-key.png)

The action will execute delete query from a ``Table`` dropdown field, as criteria can be used only [PRIMARY KEY](https://en.wikipedia.org/wiki/Primary_key "PRIMARY KEY"). The action returns count of affected rows.
Checkbox ``Don't throw Error on an Empty Result`` allows to emit an empty response, otherwise you will get an error on empty response.

`Enable Rebound` if `Yes` in case of deadlocks rebound message using Sailor rebound mechanism, number of rebound can be specified via environment variable: `ELASTICIO_REBOUND_LIMIT` recommended value 3

#### Input fields description

![Delete Row By Primary Key - Input fields description](img/delete-row-by-primary-key-input-fields.png)
As an input metadata you will get a Primary Key field to provide the data inside as a clause value.

### Execute stored procedure

This action calls stored procedure from selected `DB Schema` and `Stored procedure` name

#### Input fields description

- **DB Schema** - a schema that contains a procedure to call. Must be selected from the dropdown list before `Stored procedure` name
- **Stored procedure** - a name of a procedure to call, can be selected from the dropdown list

Metadata generates automatically using `IN` & `IN OUT` procedure parameters for input, and `OUT` & `IN OUT` procedure parameters for output.

As array fields this action now support ONLY:
- CURSOR (as SQL type)
- REF CURSOR (as ORACLE type)
The result for this type of fields would be returned as an array of JSON objects.

This action DOES NOT processing MSSql @RETURN_VALUE.

- For MySQL component same to DATABASE is same to SCHEMA by it's
[definition](https://dev.mysql.com/doc/refman/8.0/en/getting-information.html), so DB Schema dropdown is empty for MySQL.

- [MSSQL DB](https://docs.microsoft.com/en-us/sql/t-sql/statements/create-procedure-transact-sql?view=sql-server-2017) stored procedures has only IN and INOUT fields.

#### Usage case example

For Oracle DB procedure:

```
create PROCEDURE "INSERT_EMPLOYEE"(
        i_emp_id IN EMPLOYEE.EMPID%TYPE,
        i_name IN EMPLOYEE.EMPNAME%TYPE,
        i_department IN EMPLOYEE.DEPARTMENT%TYPE)
IS
BEGIN
  INSERT INTO EMPLOYEE (EMPID, EMPNAME, DEPARTMENT)
  VALUES (i_emp_id, i_name, i_department);
END;
```

Component generates next metadata:

![image](https://user-images.githubusercontent.com/22715422/62056735-edd26200-b226-11e9-871e-0efc305d70b2.png)

### Upsert Row By Primary Key action

The action will execute ``SELECT`` command from a ``Tables`` dropdown field, as search criteria can be used only [PRIMARY KEY](https://en.wikipedia.org/wiki/Primary_key "PRIMARY KEY"), and execute ``INSERT`` command by PRIMARY KEY with specified field, if result does not found, else - action will execute ``UPDATE`` command by PRIMARY KEY with specified field. The action returns only one result row (a primary key is unique).

Select table from `Table` dropdown list,

![Upsert Row By Primary Key](img/upsert-row-by-primary-key.png)

specify input(`userid` field is in our case a Primary key) data and click "Continue". You can also enable rebound mechanism if needed.

![Upsert Row By Primary Key - Input](img/upsert-row-by-primary-key-input.png)

Retrieving sample

![Upsert Row By Primary Key - Retrieving sample](img/upsert-row-by-primary-key-sample.png)

Retrieve sample result, click "Continue" and finish component configuration.

![Upsert Row By Primary Key - finish](img/upsert-row-by-primary-key-finish.png)

#### Input fields description

* `Enable Rebound` if `Yes` in case of deadlocks rebound message using Sailor rebound mechanism, number of rebound can be specified via environment variable: `ELASTICIO_REBOUND_LIMIT` recommended value 3

As an input metadata you will get all fields of selected table. [PRIMARY KEY](https://en.wikipedia.org/wiki/Primary_key "PRIMARY KEY") is required field and other input fields are optional.

![Upsert Row By Primary Key - Input fields](img/upsert-row-by-primary-key-input-fields.png)


### Create or update record action (Deprecated)

This action exists in JDBC component only for backward compatibility.
Please use [**Upsert row by primary key**](#upsert-row-by-primary-key-action) instead.

## Current limitations

1. Only tables with one [PRIMARY KEY](https://en.wikipedia.org/wiki/Primary_key "PRIMARY KEY") is supported. You will see the message ``Table has not Primary Key. Should be one Primary Key
``, if the selected table doesn't have a primary key. Also, you will see the message ``Composite Primary Key is not supported
``, if the selected table has composite primary key.

2. Only following versions of database types are supported:
- ``MySQL`` - compatible with MySQL Server 5.5, 5.6, 5.7 and 8.0.
- ``PostgreSQL`` - compatible with PostgreSQL 8.2 and higher
- ``Oracle`` - compatible with Oracle Database 8.1.7 - 12.1.0.2
- ``MSSQL`` - compatible with Microsoft SQL Server 2008 R2 and higher

3. The current implementation of the action ``Upsert By Primary Key`` doesn't mark non-nullable fields as required fields at a dynamic metadata. In case of updating such fields with an empty value you will get SQL Exception ``Cannot insert the value NULL into...``. You should manually fill in all non-nullable fields with previous data, if you want to update part of columns in a row, even if data in that fields doesn't change.

4. The current implementation of the action ``Execute stored procedure`` doesn't support ResultSet MSSQL output.

5. The current implementation of the action ``Execute stored procedure`` doesn't support any array types parameters.

6. The current implementation of the action ``Execute stored procedure`` doesn't support MySQL schemas dropdown list.
(MySQL does not have schemas by definition)

6. Rebound mechanism only works for this SQL State:
 - ``MySQL``: 40001, XA102
 - ``Oracle``: 61000
 - ``MSSQL``: 40001
 - ``PostgreSQL``:  40P01
