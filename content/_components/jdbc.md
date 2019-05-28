---
title: JDBC Component
layout: article
section: Utility Components
---

This is an open source component for working with object-relational database management systems on {{site.data.tenant.name}} platform.

### Purpose
With this component you will have following triggers:

``SELECT`` - this trigger will execute an [SQL](https://en.wikipedia.org/wiki/SQL "SQL") query that returns multiple results, it has limitations on the query and suited only for SELECT type of queries. The trigger will remember last execution timestamp and let you build queries on it.

``GET ROWS POLLING`` - this trigger will execute select query from specified table with simple criteria of selected datetime or timestamp table. The trigger will remember last execution timestamp and let you build queries on it.

Following actions are inside:

``SELECT`` - this action will execute an [SQL](https://en.wikipedia.org/wiki/SQL "SQL") query that returns multiple results, it has limitations on the query and suited only for SELECT type of queries.

``LOOKUP BY PRIMARY KEY`` - this action will execute select query from specified table, as criteria can be used only [PRIMARY KEY](https://en.wikipedia.org/wiki/Primary_key "PRIMARY KEY"). The action returns only one result (a primary key is unique).

``UPSERT BY PRIMARY KEY`` - this action will execute select command from specified table, as search criteria can be used only [PRIMARY KEY](https://en.wikipedia.org/wiki/Primary_key "PRIMARY KEY"), and execute insert command by PRIMARY KEY with specified field, if result does not found, else - action will execute update command by PRIMARY KEY with specified field. The action returns only one result row (a primary key is unique).

``DELETE BY PRIMARY KEY`` - this action will execute delete query from specified table, as criteria can be used only [PRIMARY KEY](https://en.wikipedia.org/wiki/Primary_key "PRIMARY KEY"). The action returns an integer value that indicates the number of rows affected, the returned value can be 0 or 1 (a primary key is unique).
### How works

### Requirements
Before you can deploy any code into {{site.data.tenant.name}} **you must be a registered {{site.data.tenant.name}} platform user**.

#### Environment variables
For unit-testing is needed to specify following environment variables:
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
#### Others
## Credentials
You may use following properties to configure a connection:
![image](https://user-images.githubusercontent.com/40201204/43577550-ce99efe6-9654-11e8-87ed-f3e0839d618a.png)
You can add the authorisation methods during the integration flow design or by going to your Settings > Security credentials > REST client and adding there.
### DB Engine
You are able to choose one of existing database types:
![image](https://user-images.githubusercontent.com/40201204/43577772-6f85bdea-9655-11e8-96e1-368493a36c9d.png)

### Connection URI
In the Connection URI field please provide hostname of the server, e.g. ``acme.com``
### Connection port
In the Connection port field please provide port of the server instance, as by default:
- ``3306`` - MySQL
- ``5432`` - PostgreSQL
- ``1521`` - Oracle
- ``1433`` - MSSQL
### Database Name
In the Database Name field please provide name of database at the instance that you want to interact with.
### User
In the User field please provide a username that has permissions to interact with the Database.
### Password
In the Password field please provide a password of the user that has permissions to interact with the Database.

Validation will start right after click on a Save button. You will be able to continue working with component after validation if all provided credentials will be valid.
## Triggers
### Select trigger
You are able to provide SELECT query with last execution timestamp as WHERE clause criteria.
![image](https://user-images.githubusercontent.com/40201204/43591075-2a032dcc-967b-11e8-968d-851355c2646e.png)
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
![image](https://user-images.githubusercontent.com/40201204/43591332-c99f6b3e-967b-11e8-8a77-bf8386e83d51.png)
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

### SELECT trigger (Deprecated)
This action exists in JDBC component only for backward compatibility. New [**Select trigger**](#select-trigger) is recommended to use.


## Actions
### Select action
![image](https://user-images.githubusercontent.com/40201204/43592439-39ec5738-967e-11e8-8632-3655b08982d3.png)
The action will execute an [SQL](https://en.wikipedia.org/wiki/SQL "SQL") query that can return multiple results, it has limitations on the query and suited only for SELECT type of queries.
In SQL query you can use clause variables with specific data types.
Internally we use prepared statements, so all incoming data is
validated against SQL injection, however we had to build a connection from JavaScript types to the SQL data types
therefore when doing a prepared statements, you would need to add ``:type`` to **each prepared statement variable**.

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

![image](https://user-images.githubusercontent.com/40201204/43644974-332f2aa4-9739-11e8-8483-f7395e5d195d.png)

Checkbox ``Don't throw Error on an Empty Result`` allows to emit an empty response, otherwise you will get an error on empty response.

#### Input fields description
Component supports dynamic incoming metadata - as soon as your query is in place it will be parsed and incoming metadata will be generated accordingly.

### Lookup Row By Primary Key
![image](https://user-images.githubusercontent.com/40201204/43592505-5b6bbfe8-967e-11e8-845e-2ce8ac707357.png)

The action will execute select query from a ``Table`` dropdown field, as criteria can be used only [PRIMARY KEY](https://en.wikipedia.org/wiki/Primary_key "PRIMARY KEY"). The action returns only one result (a primary key is unique).
Checkbox ``Don't throw Error on an Empty Result`` allows to emit an empty response, otherwise you will get an error on empty response.
#### Input fields description
![image](https://user-images.githubusercontent.com/40201204/43644579-f593d1c8-9737-11e8-9b97-ee9e575a19f7.png)
As an input metadata you will get a Primary Key field to provide the data inside as a clause value.

### Upsert Row By Primary Key action
The action will execute ``SELECT`` command from a ``Tables`` dropdown field, as search criteria can be used only [PRIMARY KEY](https://en.wikipedia.org/wiki/Primary_key "PRIMARY KEY"), and execute ``INSERT`` command by PRIMARY KEY with specified field, if result does not found, else - action will execute ``UPDATE`` command by PRIMARY KEY with specified field. The action returns only one result row (a primary key is unique).
1. Find and select jdbc-component in the component repository
![image](https://user-images.githubusercontent.com/16806832/44981615-c70a9d80-af7b-11e8-8055-3b553abe8212.png)

2. Create new or select existing credentials
![image](https://user-images.githubusercontent.com/16806832/44981652-e86b8980-af7b-11e8-897e-04d1fc9a93cf.png)

3. Select action "Upsert Row By Primary Key" from list
![image](https://user-images.githubusercontent.com/16806832/44981700-0d5ffc80-af7c-11e8-9ac3-aedb16e1d788.png)

4. Select table from ``Table`` dropdown list
![image](https://user-images.githubusercontent.com/16806832/44981754-38e2e700-af7c-11e8-87d3-f029a7fec8fa.png)

5. Specify input data (field with red asterisk is Primary key), and click "Continue"
![image](https://user-images.githubusercontent.com/16806832/44981854-83fcfa00-af7c-11e8-9ef2-8c06e77fed1e.png)

6. Retrieving sample
![image](https://user-images.githubusercontent.com/16806832/44983059-86f9e980-af80-11e8-8178-77e463488c7a.png)

7. Retrieve sample result
![image](https://user-images.githubusercontent.com/16806832/44982952-2ec2e780-af80-11e8-98b1-58c3adbc15b9.png)

8. Click "Continue"
![image](https://user-images.githubusercontent.com/16806832/44983101-b0b31080-af80-11e8-82d8-0e70e4b4ff97.png)

9. Finish component configuration
![image](https://user-images.githubusercontent.com/16806832/44983365-90378600-af81-11e8-9be4-4dbb39af0fdc.png)

#### Input fields description
As an input metadata you will get all fields of selected table. [PRIMARY KEY](https://en.wikipedia.org/wiki/Primary_key "PRIMARY KEY") is required field (will mark as asterisk) and other input fields are optional.
![image](https://user-images.githubusercontent.com/16806832/44397461-1a76f780-a549-11e8-8247-9a6f9aa3f3b4.png)

### Delete Row By Primary Key action
![image](https://user-images.githubusercontent.com/40201204/43592505-5b6bbfe8-967e-11e8-845e-2ce8ac707357.png)
The action will execute delete query from a ``Table`` dropdown field, as criteria can be used only [PRIMARY KEY](https://en.wikipedia.org/wiki/Primary_key "PRIMARY KEY"). The action returns count of affected rows.
Checkbox ``Don't throw Error on an Empty Result`` allows to emit an empty response, otherwise you will get an error on empty response.
#### Input fields description
![image](https://user-images.githubusercontent.com/40201204/43644579-f593d1c8-9737-11e8-9b97-ee9e575a19f7.png)
As an input metadata you will get a Primary Key field to provide the data inside as a clause value.

### Create or update record action (Deprecated)
This action exists in JDBC component only for backward compatibility. [**Upsert row by primary key**](#upsert-row-by-primary-key-action) Action is recommended to use.

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

## Known issues
No known issues are there yet.

## License
Apache-2.0