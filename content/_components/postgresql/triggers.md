---
title: PostgreSQL triggers
layout: component
description: PostgreSQL component triggers.
icon: postgresql.png
icontext: PostgreSQL component
category: postgresql-component
updatedDate: 2021-11-26
ComponentVersion: 1.4.2
---

## SELECT Trigger and Action

This trigger and action are actually the same but can be used in two different
scenarios - trigger as a first step and action in between other steps.

{% include img.html max-width="100%" url="img/select-trigger-and-action.png" title="SELECT Trigger and Action" %}

Following configuration options are available:

*   **SQL Query** - here you can type your SELECT query that should return 0 or more (much more) data back to you. There is **no limit on number of rows** returned by your SELECT queries, we will fetch results in 1000 batches and push it to the next component. You can use variables from incoming messages in the templates, see section below on how it works.
*   **Bundle results in batches** - this option will influence how your results are returned to the next component, sometimes you would like to see and work with your results as stream (this is useful for async processing) so that each row in your result will be placed in the individual message, however sometimes you would like to see the query result as a whole (and you don't expect too much rows as an output), then you can get all results grouped as batch (up to 1000 rows).

For example you have an SQL query that returns you 400 rows, if **Bundle results in batches**
is enabled you'll get a single message with array of 400 elements in it:

```json
{
  "values" : [
    {"id": 1},
    {"id": 2},

    {"id": 400}
  ]
}
```

and if no records were found you'll get a message with an empty array in it. This
is sometimes useful, especially when working with request-response kind of tasks.

If **Bundle results in batches** is disabled (and that's so by default) then you
will get a message per resulting row, so in example above you'll get 400 messages.
If query returned no data then no messages will be sent.

### Known limitations

SELECT Action & Trigger does not support transactions.
