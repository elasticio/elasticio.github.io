---
layout: component
title: Oracle REST Data Services component
section: Database components
description: The Oracle REST Data Services component allows you to connect to an Oracle Database through Oracle REST Data Services (ORDS).
icon: ords.png
icontext: Oracle REST Data Services component
category: ords
ComponentVersion: 1.0.0
updatedDate: 2025-11-04
---

## Table of Contents

* [Description](#description)
* [Requirements](#requirements)
* [Credentials](#credentials)
* [Triggers](#triggers)
  * [Get Rows Polling](#get-rows-polling)
* [Actions](#actions)
  * [Delete Row By Primary Key](#delete-row-by-primary-key)
  * [Execute Custom Query](#execute-custom-query)
  * [Upsert Row](#upsert-row)
  * [Lookup Rows (plural)](#lookup-rows-plural)
  * [Lookup Row By Primary Key](#lookup-row-by-primary-key)
* [Known Limitations](#known-limitations)

## Description

This component allows you to connect to an **Oracle Database through Oracle REST Data Services (ORDS)**.  
It enables execution of SQL queries and access to REST-enabled database tables exposed via ORDS.  

> **Please Note:** This component does **not** connect via JDBC or Oracle Instant Client.  
Your database must have **ORDS installed and configured** to expose SQL and AutoREST endpoints.

## Requirements

* An Oracle Database (on-premise or cloud).
* ORDS must be installed and running, configured with access to the target schema.
* AutoREST should be enabled for any tables you want to access via this component. Example of SQL query to enable AutoREST for HR schema, EMPLOYEES table:

```sql
BEGIN
   ORDS.ENABLE_OBJECT(
      p_enabled        => TRUE,
      p_schema         => 'HR',           -- replace with your schema
      p_object         => 'EMPLOYEES',    -- replace with your table
      p_object_type    => 'TABLE',
      p_object_alias   => 'employees',    -- replace with your table alias
      p_auto_rest_auth => FALSE           -- public, no auth
   );
   COMMIT;
END;
/
```

## Credentials

Component credentials configuration fields:

* **Instance URL** (string, required): Base URL where ORDS is available (for example, `https://myserver.com`).

* **Schema Alias** (string, required): The schema alias configured in ORDS (for example, `hr`).

* **Username** (string, required): Database username with access to the schema.

* **Password** (string, required): Password for the database user.

The component builds requests using:
`{Host URL}/ords/{Schema Alias}/`

## Triggers

### Get Rows Polling

Polls an AutoREST-enabled table or view for new or updated rows based on a timestamp column.

#### Configuration Fields

* **Table** (dropdown, required): The AutoREST-enabled table or view name.
* **Timestamp Column** (dropdown, required): The column of type `DATE` or `TIMESTAMP` used to detect new or updated rows.  
* **Start Time** (string, optional): The initial timestamp (RFC 3339 format) to start polling from. If not provided, `1970-01-01T00:00:00Z` is used.
* **Page Size** (number, optional, deafult `1000`): Indicates the size of pages to be fetched per request. Max value is 1000, default is 1000.
* **Emit Behavior** (dropdown, optional, default `Emit individually`):  
  - **Emit individually** – Emits each row as a separate message.  
  - **Emit Page** – Emits a page of rows in one message.  

#### Input Metadata

None.

#### Output Metadata

Depends on the **Emit Behavior** setting:

* **Emit individually** – Each message contains a single row object.
* **Emit Page** – Each message contains an object with the key `results`, which contains an array as its value.

## Actions

### Delete Row By Primary Key

Deletes a single row from an AutoREST-enabled table or view by its **Primary Key** value.

#### Configuration Fields

* **Table** (dropdown, required): The AutoREST-enabled table or view name.

#### Input Metadata

* **Primary Key** (string, required) – The Primary Key value of the row to retrieve.  

#### Output Metadata

* **rowsDeleted** (number, required) – Number of rows deleted.

### Execute Custom Query

Executes a custom SQL query against the connected Oracle Database via the ORDS `/_/sql` endpoint.

#### Configuration Fields

None.

#### Input Metadata

A list of available input fields for defining SQL execution criteria.
For the complete JSON schema definition, please refer to the Input Schema file.
<details close markdown="block"><summary><strong>Input Schema file</strong></summary>
```json
{
    "type": "object",
    "properties": {
        "statementText": {
            "help": {
                "description": "The SQL statements to execute. Can be a single string or an array of strings."
            },
            "required": true,
            "type": "string"
        },
        "offset": {
            "help": {
                "description": "Number of rows to skip (pagination)."
            },
            "type": "number",
            "default": 0
        },
        "limit": {
            "help": {
                "description": "Maximum number of rows to return."
            },
            "type": "number"
        },
        "binds": {
            "help": {
                "description": "Array of bind variable definitions."
            },
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "help": {
                            "description": "Name of the bind when using named notation."
                        }
                    },
                    "index": {
                        "type": "number",
                        "help": {
                            "description": "Index of the bind when using positional notation."
                        },
                        "minimum": 1
                    },
                    "data_type": {
                        "type": "string",
                        "help": {
                            "description": "Oracle data type of the bind."
                        }
                    },
                    "value": {
                        "help": {
                            "description": "Value of the bind variable."
                        },
                        "type": [
                            "string",
                            "number",
                            "array",
                            "null"
                        ]
                    },
                    "mode": {
                        "type": "string",
                        "enum": [
                            "in",
                            "out",
                            "inout"
                        ],
                        "default": "in",
                        "help": {
                            "description": "Mode of the bind variable."
                        }
                    },
                    "batch": {
                        "type": "boolean",
                        "default": false,
                        "help": {
                            "description": "Whether this is a batch bind."
                        }
                    },
                    "type_name": {
                        "type": "string",
                        "help": {
                            "description": "Required when data_type = 'PL/SQL TABLE'. Currently only '' (empty string) is accepted."
                        }
                    },
                    "type_subname": {
                        "type": "string",
                        "help": {
                            "description": "Required when data_type = 'PL/SQL TABLE'. Currently only '' (empty string) is accepted."
                        }
                    },
                    "type_components": {
                        "type": "array",
                        "help": {
                            "description": "Array of data types when using PL/SQL TABLE."
                        },
                        "items": {
                            "type": "object",
                            "properties": {
                                "data_type": {
                                    "type": "string",
                                    "help": {
                                        "description": "Oracle data type of the column."
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
```
</details>

Examples of input metadata:

1. Simple `SELECT` query.

```json
{
  "statementText": "SELECT * FROM employees WHERE rownum <= 10"
}
```

2. Advanced query with bind parameters. Please refer to the [Oracle ORDS REST-Enabled SQL documentation](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/25.2/orddg/rest-enabled-sql-service.html#GUID-B0241024-9385-46E4-BB74-E95D3E6E139D) for more details on `binds`.

```json
{
  "statementText": "SELECT * FROM EMPLOYEES WHERE SALARY > :minSalary OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY",
  "offset": 0,
  "limit": 10,
  "binds": [
    {
      "name": "minSalary",
      "data_type": "NUMBER",
      "value": 5000
    },
    {
      "name": "offset",
      "data_type": "NUMBER",
      "value": 0
    },
    {
      "name": "limit",
      "data_type": "NUMBER",
      "value": 10
    }
  ]
}
```

#### Output Metadata

The output is the JSON response returned by ORDS for the executed query.  
The exact structure depends on the SQL statement. Example:

```json

{
  "items": [
    {
      "EMPLOYEE_ID": 100,
      "FIRST_NAME": "Steven",
      "LAST_NAME": "King"
    }
  ]
}
```

### Upsert Row

Creates a new record or updates an existing one depending on the chosen operation.

#### Configuration Fields

* **Table** (dropdown, required): The AutoREST-enabled table or view name.

#### Input Metadata

* **Primary Key** (string, conditionally required) – The Primary Key value of the row to update. Required only when `Operation` is set to `Update`.
* **Record Data** (object, optional) – The row data to insert or update in JSON format.

#### Output Metadata

The created or updated row object returned from Oracle ORDS.

### Lookup Rows (plural)

Retrieves rows from an AutoREST-enabled table or view.
This uses the standard ORDS AutoREST endpoint:

`GET` `{Host URL}/ords/{Schema Alias}/{TableName}/`

#### Configuration Fields

* **Table** (dropdown, required): Name of the table or view (must be AutoREST-enabled).
* **Page Size** (number, optional): Indicates the size of pages to be fetched per request. Defaults to 1000, maximum value is 1000.
* **Emit Behavior** (dropdown, optional, `Emit Individually` by default): Specifies how the resulting objects will be emitted, either as `Emit Page` or `Emit Individually`.

#### Input Metadata

* **q** (string, optional): ORDS AutoREST filter query. Please refer to the [Oracle ORDS REST-Enabled SQL documentation](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/25.2/orddg/developing-REST-applications.html#GUID-091748F8-3D14-402B-9310-25E6A9116B47) for the grammar.

Examples of input metadata:

```json
{
  "q": "{\"$or\": [ { \"FIRST_NAME\": \"Steven\" }, { \"FIRST_NAME\": \"Neena\" } ]}"
}
```

```json
{
  "q": "{\"price\": { \"$and\": [ { \"$gt\": 400 }, { \"$lt\": 900 } ] }}"
}
```

#### Output Metadata

The response returned by ORDS AutoREST for the selected table.

For `Emit Individually` mode: Each object fills the entire message.

For `Emit Page` mode: An object with the key `results`, which contains an array as its value. Example:

```json
{
  "results": [
    {
      "EMPLOYEE_ID": 100,
      "FIRST_NAME": "Steven",
      "LAST_NAME": "King"
    },
    {
      "EMPLOYEE_ID": 101,
      "FIRST_NAME": "Neena",
      "LAST_NAME": "Kochhar"
    }
  ]
}
```

### Lookup Row By Primary Key

Retrieves a single row from an AutoREST-enabled table or view by its **Primary Key** value.

#### Configuration Fields

* **Table** (dropdown, required): The AutoREST-enabled table or view name.

#### Input Metadata

* **Primary Key** (string, required) – The Primary Key value of the row to retrieve.  

#### Output Metadata

Returns the matching row as an object, or an empty object if no row is found.  
The exact fields depend on the structure of the table.

## Known Limitations

* When performing the `Upsert` action, any fields not included in the request may be overwritten with null.