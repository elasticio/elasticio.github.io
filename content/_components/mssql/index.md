---
title: MsSQL component
layout: component
section: Database components
description: MsSQL designed for use in corporate applications, both on-premises and in the cloud.
icon: mssql.png
icontext: MsSQL component
category: MsSQL component
createdDate: 2017-02-09
updatedDate: 2018-06-14
---

## Latest changelog

**1.1.0 (January 30, 2020)**

* Update sailor version to 2.6.1
* Refactor console.log to built in sailor logger
* Change build type to `docker`

> To see the full **changelog** please use the following [link](/components/mssql/changelog).

## Authentication

You may use following properties to configure a connection:

![Properties to configure a connection](https://user-images.githubusercontent.com/40201204/41356042-97e26406-6f2b-11e8-88fb-11cba846d143.png)

other types of configuration parameters are also supported, more information and samples you can find [here](https://www.npmjs.com/package/mssql#formats)

## Environment Variables

LOG_LEVEL - controls verbosity of logger. Possible values: `trace`, `debug` `info`, `warn`, `error`. Default: `info`

## Triggers

### SELECT Trigger and Action

With this action you may fetch data out of the database, e.g. using ``SELECT`` statement.

![SELECT Trigger and Action - configure input](https://user-images.githubusercontent.com/56208/29715706-b4930bdc-89a8-11e7-8a0d-969959d26dd6.png)

This trigger & action has no limitations on the number of rows so you may expect to get all of these
via sequential fetching that is implemented within the node.js ``mssql`` driver.

#### Polling

Component will remember last execution timestamp and let you build queries on it:

```sql
select * from Leads where Created >= '%%EIO_LAST_POLL%%'
```

where just before executing the statement the ``%%EIO_LAST_POLL%%`` will be replaced with ISO Date of the last execution, for example ``2017-08-25T07:43:48.127Z``. During the first execution, date will be equal to [the bigging of time](http://www.onthisday.com/date/1970/january/1) - ``1970-01-01T00:00:00.000Z``.

## Actions

### SELECT action

Check the [SELECT Action description above](#select-trigger-and-action).

### INSERT/DELETE/UPDATE Action

![INSERT/DELETE/UPDATE Action - configure input](https://user-images.githubusercontent.com/56208/29715914-9c369ee0-89a9-11e7-89cb-a559f4a8861f.png)

You may use this action to do the operations that are not producing output rows but do the database manipulations,
e.g. ``INSERT``, ``UPDATE`` or ``DELETE`` statements. Internally we use prepared statements, so all incoming data is
validated against SQL injection, however we had to build a connection from JavaScript types to the MSSQL data types
therefore when doing a prepared statements you would need to add ``:type`` to **each prepared statement variable**.

For example if you have a following SQL statement:

```sql
INSERT INTO
  Test2.dbo.Tweets
(Lang, "Text", id, CreatedAt, Username, ScreenName)
VALUES
(@lang, @text, @id, @created_at, @username, @screenname)
```

you should add ``:type`` to each ``@parameter`` so your SQL query will looks like this:

```sql
INSERT INTO
  Test2.dbo.Tweets
(Lang, "Text", id, CreatedAt, Username, ScreenName)
VALUES
(@lang, @text, @id:bigint, @created_at:date, @username, @screenname)
```

Following types are supported:
 * ``string`` (also default type if type is omitted)
 * ``number`` (will be converted to MSSQL ``int``)
 * ``bigint``
 * ``boolean`` (will be converted to MSSQL ``bit``)
 * ``float``
 * ``date`` (will be converted to ``DateTime2``)
 * ``money``

more details can be found [here](https://github.com/elasticio/mssql-component/blob/master/lib/actions/insert.js#L25)

Component supports dynamic incoming metadata - as soon as your query is in place it will be parsed and incoming metadata will be generated accordingly.

## Known issues

No known issues are there yet.
