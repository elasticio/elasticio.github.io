---
title: JSONata mapper | Working with dates and times
layout: article
section: Data transformation
category: data-transformation
order: 3
---

The advanced mode of the [data mapping](mapping-data#using-advanced-mapping-mode)
between integration components on {{site.data.tenant.name}} uses
[JSONata](http://jsonata.org) expressions to transform incoming data into the
necessary outgoing structure for the next component to consume.

**In this article we will dive deeper into the methods of data transformations using `dates` and `times`.**

To perform operations with dates and times with the JSONata mapper the following
3 different functions can be used:

*   `$millis()` - returns the milliseconds since the UNIX Epoch (1 January 1970 UTC);
*   `$now()` - returns an [ISO 8601 formatted](https://en.wikipedia.org/wiki/ISO_8601) timestamp;
*   `$moment()` - is a [Moment.js](https://momentjs.com/) library extension to JSONata.

**During the flow design process on the user interface, these functions are
using the JavaScript dates based on the users' browser time information to
return the values.** These functions work differently during an actual execution
on the server where the actual server time is used. More on this discrepancy is
discussed later.

Moment.js library implementation provides a wrapper for the native JavaScript
date object by extending the functionality and including the `$millis()` and
`$now()` functions as well. Therefore, this article will cover only the
`$moment()` extension:

*   [Basic usage](#basic-usage)
*   [Formatting the outcome](#formatting-the-outcome)
*   [Date and time operations](#date-and-time-operations)
*   [Warning: Parsing Inconsistency pitfall](#warning-parsing-inconsistency-pitfall)

## Basic usage

Use `$moment()` to return the current timestamp (equivalent to `$now()`).
For example, if the local time is 2017-09-01T12:00:00 (Germany Time, Central
Europen Summer Time) which is 1-hour ahead of UTC + DST (Daylight Saving Time).

```js
$moment()
```

The output is going to be in ISO 8601 standard format:

```
2017-09-01T10:00:00.000Z
```

To convert the date explicitly to UTC use:

```js
$moment().utc()
```

This implementation will set the used dates to UTC. However, sometimes this might
not be the most desirable solution especially when the timezone information is
crucial for the operations.

When a date string is passed:

```js
$moment('06.12.2017')
```

Since the passed date is ambiguous, the outcome can be unexpected as well:

*   6st of December 2017 (DD.MM.YYYY) = `"2017-12-05T23:00:00.000Z"`. Converted to UTC and no DST due to the time of the year.
*   12th of June 2017 (MM.DD.YYYY) = `"2017-06-11T22:00:00.000Z"`. Converted to UTC and + DST.

In above case, it was assumed the German Time (Central Europen Time zone). It
will get complicated if it is not, therefore, one should prevent this inconsistency
in advance by using known [ISO 8601 standard](https://en.wikipedia.org/wiki/ISO_8601)
or String + Format method:

```js
// String + format
$moment('06.12.2017','DD.MM.YYYY')
// or ISO 8601
$moment('2017-12-06')
```

Both implementations will return the same value:

```
"2017-12-05T23:00:00.000Z"
```

## Formatting the outcome

`$moment()` returns the date and time in a standard ISO 8601 format but it can
be modified by using .format() parameter. When used in the initial empty state:

```js
$moment('2017-12-06').format() & "\n" &
$moment('2017-06-12').format()
```

Would return:

```
2017-12-06T00:00:00+01:00
2017-06-12T00:00:00+02:00
```

These are the ISO 8601 formatted date and the time values offset from UTC at
each particular moment (German Time). It is also possible to output using many
other formats. For example:

```js
$moment('2012-12-01').format('MM/DD/YYYY')
```

This expression returns the input ISO 8601 value in a formatted US date format.

```
12/01/2012
```

Let us take another example:

```js
$moment('2012-12-01T22:32:16').format("dddd, MMMM Do YYYY, h:mm:ss a")
```

This outcome of this expression would be:

```
Saturday, December 1st 2012, 10:32:16 pm
```

More details about possible formatting is available from the
[Moment.js documentation pages on formatting](https://momentjs.com/docs/#/displaying/format/).

## Date and time operations

Any given date one can be changed using manipulate functions. It is possible to
add and subtract years, months, weeks, days and etc. For example to add 1 year,
3 months and 15 days from any particular date:

```js
$moment('2012-12-01').add(1, 'year').add(3,'months').add(15,'days').format('LL')
```

The outcome would be:

```
March 16, 2014
```

It is also possible to use add and subtract together in one expression like this:

```js
$moment('2012-12-01').add(3, 'year').subtract(25,'days').format('LL')
```

The answer would be:

```
November 6, 2015
```

**Warning: Date and time operations are not linear in nature.** For example,
daylight saving time (DST) can cause the day to be 23 or 25 hours long.
Similarly, leap years need to be taken into account during the calculations.
Therefore, add/subtract dates and time separately. More information [here](http://momentjs.com/guides/#/lib-concepts/date-time-math/).

[Moment.js documentation](https://momentjs.com/docs/#/manipulating/) includes
considerably more possibilities to manipulate the date and time.

## Warning: Parsing Inconsistency pitfall

While building integration flows using JSONata mapper expression a caution must
be made to avoid several pitfalls of javascript date and time parsing. The
parsing which occurs during the writing JSONata expressions in the designer UI
and the actual executions can differ especially because:

1.  The native parsing of dates in different browsers is [very inconsistent](http://dygraphs.com/date-formats.html). If one expression is parsed correctly in Google Chrome it might not be parsed in Apple Safari at all.
2.  **The time zones and offsets play a significant role**. This is the scenario of developer and the client residing in different time zones and the time record not containing any time zone or time offset information.


To address the first pitfall use [ISO 8601 standard](https://en.wikipedia.org/wiki/ISO_8601)
or `String + Format` method for date and time.

To address the second problem use not only the date but local time and the time
offset. For example, if the input field has this:

```js
$moment("01.04.1980")
```

Then the output would be:

```
"1980-01-03T23:00:000Z"
```

It is obvious that the input date and time were incorrectly interpreted. Here is
how to correct it:

```js
$moment("01.04.1980" & "-0400","MM.DD.YYYYZZ")
```

This expression would return the following record:

```
"1980-01-04T04:00:000Z"
```

Strictly speaking, the time offset
[is not the same as the time zone](https://stackoverflow.com/tags/timezone/info),
therefore, the above solution can also fail in cases when the different time zones
have the same time offset.
