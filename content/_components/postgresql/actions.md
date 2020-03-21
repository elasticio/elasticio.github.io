---
title: PostgreSQL actions
layout: component
description: PostgreSQL Component actions.
icon: postgresql.png
icontext: PostgreSQL Component
category: postgresql-component
createdDate: 2020-03-20
updatedDate: 2020-03-20
---

## SELECT action

Check the [SELECT Action and Trigger](/components/postgresql/triggers#select-trigger-and-action).

## INSERT/UPDATE/DELETE action

Use this action to insert, update or delete some data, returned
value is ignored, number of affected rows you can see in the log file.

![PostgreSQL - INSERT/UPDATE/DELETE Action](https://user-images.githubusercontent.com/16806832/53739075-8d1e4380-3e99-11e9-882d-fe26430f8729.png)

Following configuration options are available:

*   **SQL Query** - here you can type your INSERT/UPDATE/DELETE query. Returned data will be ignored, so this component will simply push original message to the next component. You can use variables from incoming messages in the templates, see section below on how it works.

### Known limitations

Action does not support transactions.

## INSERT Bulk action

This action is useful to execute a bulk insert query in one transaction. An
incoming message needs to contain a body with an array of objects.

### Configuration field

![Configuration field](https://user-images.githubusercontent.com/16806832/53736488-8c35e380-3e92-11e9-8975-7bf41742c160.png)

#### Table Name

You need to put the name of the table into field **Table Name** where you want
to put multiple values.

*   **Columns** - You need to determine the name of the columns in which corresponding values will be inserted.
*   **Input metadata** - **Values** - needs to contain an array of objects, each object needs to contain values that will be inserted in corresponding columns.

For example, you need to execute following query:

```sql
INSERT INTO itemstable(id, text) VALUES (1, 'First item'), (2, 'Second item')
```

You need specify field  **Table Name** = 'itemstable', **Columns** = 'id, text'
and **Values** needs to be:

```sql
[
  {
    id: 1,
    text: 'First item'
  },
  {
    id: 2,
    text: 'Second item'
  }
]
```

All changes will rollback, if something wrong with data.

## SQL Query action

**Expert mode**. You can execute SQL query or SQL script in this action.

### Configuration field

#### SQL Query

Put your SQL expression to `SQL Query` for further execution. You can put only one
SQL query or several queries with delimiter `;`. All queries are executed in one
transaction. All changes will rollback if something wrong with one of the executions.
Also if you want to use prepared statements in your query, you need define prepared
statement variables like this way `sqlVariableName = @MetadataVariableName:type` where:

1.  `sqlVariableName` - variable name in sql expression;
2.  `MetadataVariableName` - variable name in metadata (it can be the same as `sqlVariableName`);
3.  `type` - type of variable , following types are supported:
   *  `string` (also default type if type is omitted)
   *  `number`
   *  `boolean`

For example, for SQL expression `SELECT * FROM tableName WHERE column1 = 'text' AND column2 = 15`
you need to use following template: `SELECT * FROM tableName WHERE column1 = @column1:string AND column2 = @column2:number` and put values into generated metadata.

![SQL Query](https://user-images.githubusercontent.com/16806832/53731432-635a2200-3e83-11e9-9a4e-0fc26aeeb001.png)

#### Input metadata

Input metadata is generated from `SQL Query` configuration field if this field
contains at least one defined value.

#### Output metadata

Output metadata is an array of arrays with the result of query execution and
depends on the count of SQL queries which were executed. There is an empty array
in output metadata, if execution does not return any results. For example, for an
SQL script:

```sql
INSERT INTO tableOne (column1, column2) VALUES ('value1', 'value2');
SELECT * FROM table2;
```

the first SQL query `INSERT INTO tableOne (column1, column2) VALUES ('value1', 'value2')`
does not return any values and the second sql query `SELECT * FROM table2` returns two records.
Output metadata for this example is:

```sql
[
  [],
  [
    {
      "col2": 123,
      "col1": "abc"
    },
    {
      "col2": 456,
      "col1": "def"
    }
  ]
]
```

## SQL Injection action

**Expert mode**. You can execute SQL Injection in this action.
You can not use prepare statement there, for this purpose use [SQL Query Action](/components/postgresql/actions#sql-query-action).

### Input metadata

Input metadata contains two fields:
*   `SQL Expression`;
*   `Number of retries in case of deadlock transaction`.

#### SQL Expression

You can put there SQL query, SQL script or set of SQL queries from the previous
step. You can put only one SQL query or several queries with delimiter `;`.
All queries are executed in one transaction. All changes will rollback if
something wrong with one of the executions. For example, you have some file with
defined SQL script and want to execute this. You need to use some component
which can read this file on the previous step and return value like this:

```json
  {
    "query_string": "INSERT INTO tableOne (column1, column2) VALUES ('value1', 'value2'); SELECT * FROM table2"
  }
```
and in this action you need put `query_string` (or some JSONata expression) to `Sql Injection string`:

![Integrator mode](https://user-images.githubusercontent.com/40201204/62026183-f3a65400-b1e2-11e9-988a-db689dd33a95.png)

### Number of retries in case of deadlock transaction

You can specify maximum number of retries, that is intended to help to solve
lock's issues in case of a deadlock transaction. The delay between retries is 1
second. Default value for this configuration field is `0`, it means, that such
behavior is switched off (by default) and no any retry will be performed in case
of deadlocked transaction.

### Output metadata

Output metadata is an array of arrays with the result of query execution and
depends on the count of SQL queries which were executed. There is an empty array
in output metadata, if execution does not return any results. For example, for
SQL script:

```sql
INSERT INTO tableOne (column1, column2) VALUES ('value1', 'value2');
SELECT * FROM table2;
```
the first SQL query `INSERT INTO tableOne (column1, column2) VALUES ('value1', 'value2')`
does not return any values and the second SQL query `SELECT * FROM table2` returns two records.
Output metadata for this example is:

```sql
[
  [],
  [
    {
      "col2": 123,
      "col1": "abc"
    },
    {
      "col2": 456,
      "col1": "def"
    }
  ]
]
```
