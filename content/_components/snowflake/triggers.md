---
title: Snowflake triggers
layout: component
description: A component for management over Snowflake database.
icon: snowflake.png
icontext: Snowflake component
category: snowflake
updatedDate: 2022-07-29
ComponentVersion: 1.3.0
---

## Get Rows Polling Trigger

This trigger will execute polling new and updated rows from specified table with simple criteria of selected datetime or timestamp table. The trigger will remember last execution timestamp and let you build queries on it.

### Config Fields

* **Table** - Dropdown (required) to specify the `Table` from which to get rows. Tables with only date type columns appear in the dropdown list.

* **Column** - Dropdown (required) to specify a `Table Column` which contains date type. Supported type is SQL TIMESTAMP without timezone, i.e. TIMESTAMP_NTZ(9) (for example: '2004-10-19 10:23:54.123'). More information about date types supported by snowflake you can find [here](https://docs.snowflake.com/en/sql-reference/data-types-datetime.html)

* **Start Polling From Time (optional)** - Text field (optional). Last polled date time, for example 2021-08-01 00:00:00.000 (YYYY-MM-DD hh:mm:ss[.sss]). Where YYYY - year; MM - month; DD - day; hh - hour; mm - minute; ss - second; sss - millisecond (optional). If this field left empty, date will be equal to 1970-01-01 00:00:00.000, which means result rows will be returned from the first date

* **Emit Behavior** - (dropdown, required): Defines the way result objects will be emitted, one of `Emit all` or `Emit individually`.

### Input Metadata

Dynamically generated list of columns according to selected `Table`

### Output Metadata

* If `Emit Behavior` is `Emit All`:

  An array of rows from the selected `Table` and` Table Column` or a message `No new records found` if there is no match at the specified timestamp or if there are no new rows since the last trigger execution.

* If `Emit Behavior` is `Emit individually`:

  Each row individually from the selected `Table` and` Table Column`.

> **Please Note:** If the table contains rows without a valid date or empty date cell value, then this row will be skipped by the query and will not be returned in the result.
