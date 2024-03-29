---
layout: component
title: MsSQL component
section: Database components
description: MsSQL designed for use in corporate applications, both on-premises and in the cloud.
icon: mssql.png
icontext: MsSQL component
category: mssql
ComponentVersion: 1.1.5
updatedDate: 2023-04-06
---

## Authentication

You may use following properties to configure a connection:


{% include img.html max-width="100%" url="img/mssql-credentials.png" title="Properties to configure a connection" %}

other types of configuration parameters are also supported, more information and samples you can find [here](https://www.npmjs.com/package/mssql#formats)

## Environment Variables

> Please Note: From the platform version [20.51](/releases/20/51) we deprecated the
> component `LOG_LEVEL` environment variable. Now you can control logging level per each step of the flow.

## Technical Notes

The [technical notes](technical-notes) page gives some technical details about MsSQL component like [changelog](/components/mssql/technical-notes#changelog).

## Triggers

### SELECT Trigger and Action

With this action you may fetch data out of the database, e.g. using ``SELECT`` statement.

{% include img.html max-width="100%" url="img/select-configure-input.png" title="SELECT Trigger and Action - configure input" %}

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

{% include img.html max-width="100%" url="img/insert-update-delete-configure-input.png" title="INSERT/DELETE/UPDATE Action - configure input" %}

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
