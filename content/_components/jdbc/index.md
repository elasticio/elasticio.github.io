---
title: JDBC component
layout: component
section: Database components
description: An open-source component designed for interacting with object-relational database management systems (ORDBMS).
icon: jdbc.png
icontext: JDBC component
category: jdbc
updatedDate: 2026-03-18
ComponentVersion: 2.5.12
---

## Table of Contents

* [General Information](#general-information)
   * [Description](#description)
   * [Completeness Matrix](#completeness-matrix)
* [Credentials](#credentials)
* [Triggers](#triggers)
* [Actions](#actions)
* [Known Limitations](#known-limitations)

## General Information
### Description

{{page.description}} It works with the `MySQL`, `PostgreSQL`, `Oracle` and `MSSQL` DBs.

### Completeness Matrix

On the [technical notes](technical-notes) page you can find some technical details about JDBC component like [changelog](/components/jdbc/technical-notes#changelog) and [completeness matrix](/components/jdbc/technical-notes#completeness-matrix).

## Credentials

You need to use following properties to configure credentials:

| DB Engine | Port | Limitation |
|-----------|------|------------|
| MySQL     | `3306` | compatible with MySQL Server 5.5, 5.6, 5.7 and 8.0 |
| PostgreSQL     | `5432` | compatible with PostgreSQL 8.2 and higher |
| Oracle     | `1521` | compatible with Oracle Database 8.1.7 - 12.1.0.2 |
| MSSQL     | `1433` | compatible with Microsoft SQL Server 2008 R2 and higher |

*   **Database Name**: The name of the specific database to interact with.
*   **User**: The username with the necessary permissions.
*   **Password**: The password for the specified user.
*   **Additional configuration properties**: (Optional) Additional connection strings, such as `useUnicode=true&serverTimezone=UTC`.

>**Limitation:** Configuration properties may not be validated during the initial "Verify Credentials" step. Ensure all input is accurate to avoid runtime errors.

## Triggers

JDBC component includes the following triggers:

  1. [Select trigger](/components/jdbc/triggers#select-trigger)                              
  This trigger executes a custom SELECT statement for incremental polling.

  2. [Get Rows Polling trigger](/components/jdbc/triggers#get-rows-polling-trigger)         
  This trigger executes an operation that polls multiple rows from the database since the last record.

  3. [SELECT trigger (Deprecated)](/components/jdbc/triggers#select-trigger-deprecated)     
  This action exists in JDBC component only for backward compatibility. New [Select trigger](/components/jdbc/triggers#select-trigger) is recommended to use.

## Actions

JDBC component includes the following actions:

  1. [Execute Custom Query action](/components/jdbc/actions#execute-custom-query-action)     
  Action to execute custom SQL query from provided request string.

  2. [Select Query action](/components/jdbc/actions#select-query-action)                               
  This action will execute an [SQL](https://en.wikipedia.org/wiki/SQL "SQL") query that returns multiple results, it has limitations on the query and suited only for SELECT type of queries.

  3. [Lookup Row By Primary Key action](/components/jdbc/actions#lookup-row-by-primary-key-action)                                                                                
  This action will execute select query from specified table, as criteria can be used only [PRIMARY KEY](https://en.wikipedia.org/wiki/Primary_key "PRIMARY KEY"). The action returns only one result (a primary key is unique).

  4. [Insert action](/components/jdbc/actions#insert-action)                             
  This action will execute insert query into the specified table. The action returns boolean value is execution insert successful or not.

  5. [Delete Row By Primary Key action](/components/jdbc/actions#delete-row-by-primary-key-action)                                                                                
  This action will execute delete query from specified table, as criteria can be used only [PRIMARY KEY](https://en.wikipedia.org/wiki/Primary_key "PRIMARY KEY"). The action returns an integer value that indicates the number of rows affected, the returned value can be 0 or 1 (a primary key is unique).

  6. [Execute Stored Procedure action](/components/jdbc/actions#execute-stored-procedure-action)                                                                               
  This action calls stored procedure from selected DB Schema and Stored procedure name.

  7. [Upsert Row By Primary Key action](/components/jdbc/actions#upsert-row-by-primary-key-action)                                                                                
  This action will execute select command from specified table, as search criteria can be used only [PRIMARY KEY](https://en.wikipedia.org/wiki/Primary_key "PRIMARY KEY"), and execute insert command by PRIMARY KEY with specified field, if result does not found, else - action will execute update command by PRIMARY KEY with specified field. The action returns only one result row (a primary key is unique).

  8. [Create Or Update Record action (Deprecated)](/components/jdbc/actions#create-or-update-record-action-deprecated)                                                      
  This action exists in JDBC component only for backward compatibility. Please use [Upsert row by primary key](/components/jdbc/actions#upsert-row-by-primary-key-action) instead.


## Current limitations

1. Only tables with one [PRIMARY KEY](https://en.wikipedia.org/wiki/Primary_key "PRIMARY KEY") is supported. You will see the message ``Table has not Primary Key. Should be one Primary Key
``, if the selected table doesn't have a primary key. Also, you will see the message ``Composite Primary Key is not supported
``, if the selected table has composite primary key.
2. Only following versions of database types are supported:
    *   **MySQL**: 5.5, 5.6, 5.7, 8.0.
    *   **PostgreSQL**: 8.2 and higher.
    *   **Oracle**: 8.1.7 through 21.3.0.
    *   **MSSQL**: 2008 R2 and higher.
3. The current implementation of the action ``Upsert By Primary Key`` doesn't mark non-nullable fields as required fields at a dynamic metadata. In case of updating such fields with an empty value you will get SQL Exception ``Cannot insert the value NULL into...``. You should manually fill in all non-nullable fields with previous data, if you want to update part of columns in a row, even if data in that fields doesn't change.
4. The current implementation of the action ``Execute stored procedure`` doesn't support any array types parameters.
(MySQL does not have schemas by definition)
5. Rebound mechanism only works for this SQL State: 
    *   MySQL: `40001`, `XA102`
    *   Oracle: `61000`
    *   MSSQL: `40001`
    *   PostgreSQL: `40P01`
6. If your database server configured to custom timezone (differ from UTC) JDBC driver may convert time appropriate - for example if you want to use `Insert action` with `MySQL` which is configured to `+2:00` time zone and provide `2022-01-01 15:00:00` as value to some datetime field in database it will be saved as `2022-01-01 17:00:00`.