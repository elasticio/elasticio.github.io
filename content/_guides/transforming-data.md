---
title: Transforming data
description: This article describes some JSONata basics so that you can start transforming your data.
layout: article
section: Data transfer
category: data-transfer
order: 0
since: 20180216
---

In this document we will discuss some [JSONata](http://jsonata.org/) basics so that you can start transforming your data. For more advanced functionality of the JSONata transformation language please go to the [JSONata website](http://jsonata.org/).

## Transforming strings

Using JSONata expressions we can perform different types of transformations with
`strings` using standard string operators. We can also use more complex string
functions like `$uppercase(str)`, `$lowercase(str)`, `$split(str, separator [, limit])`,
`$joinarray[, separator]` and more.

For the following examples we will assume the following incoming data:

```json
{
  "author":"Mark Twain",
  "fname":"Tom",
  "lname":"Sawyer",
  "email":"tom.sawyer@twaincreations.com",
  "town":"StPetersburg",
  "state":"Missouri"
}
```

To start with a simple example let us combine the parts of the incoming data by
simple concatenation. For example, let us write the title of the book:

```json
"The Adventures of " & fname & " " & lname
```

Here we used the `&` operator to combine the strings into one message:
`The Adventures of Tom Sawyer`.

Now we want to write the same sentence in all caps since it is the title of a book:

```json
$uppercase("The Adventures of " & fname & " " & lname)
```

The result is: `THE ADVENTURES OF TOM SAWYER`.

How about adding a new line and adding the name of the author?

```json
$uppercase("The Adventures of " & fname & " " & lname)
& "\n" & $uppercase("by " & author)
```

> **Please note**, that `\n` - does not work in [JSONata exerciser](https://try.jsonata.org/) but it works well on our platform.

And the outcome is:

```
THE ADVENTURES OF TOM SAWYER
BY MARK TWAIN
```

What if we want to get the domain name from the incoming email address
`tom.sawyer@twaincreations.com`? To do that we could write the following JSONata
expression:

```
$split(email, /[@,.]+/)[2]
```

This expression first takes the value of the `email` field, splits it using the
`@` and `.` characters to build an array with elements containing
`["tom","sawyer","twaincreations","com"]`. Then it takes the domain name value,
which is the element `[2]`, to get the final result of `twaincreations` .

If you noticed the email address domain contains the author's surname. Can we be sure?

```json
$contains(email,$lowercase($split(author," ")[1]))
```

This JSONata expression takes the value of the `author` field, splits it into an
array and takes the surname part (Twain). Then it converts it to lower case and
uses the value (`twain`) to check the `email` field for a presence of a value. The  
answer is `true`.

More example of string functions and their implementation is available in
[JSONata documentation pages](http://docs.jsonata.org/string-functions.html).


## Performing simple numeric transformations

Before starting with examples of number transformation it is worth to mention
one function, `$number(arg)`, which could potentially address many issues of data
inconsistency.

Let us consider the following incoming data sample:

```json
{
  "itemPrice": {
    "amount": "25.44",
    "currencyCode": "USD"
  }
}
```

The value of the `itemPrice.amount` parameter is not a number but a `"25.44"`,
which is a `string`. As it stands we would not be able to use it in any numeric
calculations. To address this we could write:

```json
$number(itemPrice.amount)
```

This would result in `25.44`, which is a number. A related issue can be when the
incoming data contains a number in German accounting format.

```json
{
  "itemPrice": {
    "amount": "12,99",
    "currencyCode": "EUR"
  }
}
```

Before we pass the value `itemPrice.amount` to `$number(arg)` function we need
to replace the comma with a point. Here we will use a string transformation
function `$replace(str, pattern, replacement [, limit])`:

```json
$number($replace(itemPrice.amount, ",","."))
```

The result would be `12.99`, which is a number.

Now let's perform some basic arithmetic operations on numbers in your payload.
Consider the following data was produced by a source system:

```json
{
  "orderItems": [
    {
      "conditionId": "New",
      "promotionDiscount": {
        "amount": 1.99,
        "currencyCode": "USD"
      },
      "giftWrapPrice": {
        "amount": 0.00,
        "currencyCode": "USD"
      },
      "shippingPrice": {
        "amount": 4.49,
        "currencyCode": "USD"
      },
      "itemPrice": {
        "amount": 25.44,
        "currencyCode": "USD"
      },
      "quantityShipped": 2,
      "title": "my life in kenya"
    }
  ]
}
```

As an exercise, we could get the price of the whole order but only the part
which was shipped. We would also like to get the output as a JSON:

```
{
  "shipment title" : orderItems.title,
  "shipment price" : orderItems.(quantityShipped*(itemPrice.amount + shippingPrice.amount) - promotionDiscount.amount)
}
```

In this example, we performed basic arithmetic operations with values from incoming
data. First, we added the `itemPrice.amount` to `shippingPrice.amount` then
multiplied with `quantityShipped` value to get the whole order before applying
the `promotionDiscount.amount`. So, in numbers that would be `2 * (25.44 + 4.49) - 1.99`.
Here is the outgoing JSON:

```json
{
  "shipment title": "my life in kenya",
  "shipment price": 57.87
}
```

## Using numeric aggregation functions

Now let us slightly change the requirement from above example. We want to apply
the `promotionDiscount.amount` to each item in the order.

```
{
  "shipment title" : orderItems.title,
  "shipment price" : orderItems.(quantityShipped*$sum([itemPrice.amount, shippingPrice.amount, -promotionDiscount.amount]))
}
```

Here is the outgoing JSON:

```json
{
  "shipment title": "my life in kenya",
  "shipment price": 55.88
}
```

Notice we have used `$sum(array)` which is a numeric aggregation function along
with `$max(array)`, `$min(array)` and `$average(array)`. More details about these
function is available from the [JSONata documentation pages](http://docs.jsonata.org/aggregation-functions.html).

## Transforming dates and time with moment.js

JSONata does not provide a sophisticated support for transforming dates
and time by default. That's why we extend the language to support [moment.js documentation pages on formatting](https://momentjs.com).
We will discuss some basics on moment.js, for more details please read the
library's documentation.

You can use `$moment()` to return the current timestamp (equivalent to `$now()`).
For example, if the local time is 2017-09-01T12:00:00 (Germany Time, Central
Europen Summer Time) which is 1-hour ahead of UTC + DST (Daylight Saving Time).

```json
$moment()
```

The output is going to be in ISO 8601 standard format:

```
2017-09-01T10:00:00.000Z
```

To convert the date explicitly to UTC use:

```json
$moment().utc()
```

This implementation will set the used dates to UTC. However, sometimes this might
not be the most desirable solution especially when the timezone information is
crucial for the operations.

When a date string is passed:

```json
$moment('06.12.2017')
```

Since the passed date is ambiguous, the outcome can be unexpected as well:

*   6st of December 2017 (DD.MM.YYYY) = `"2017-12-05T23:00:00.000Z"`. Converted to UTC and no DST due to the time of the year.
*   12th of June 2017 (MM.DD.YYYY) = `"2017-06-11T22:00:00.000Z"`. Converted to UTC and + DST.

In above case, it was assumed the German Time (Central Europen Time zone). It
will get complicated if it is not, therefore, one should prevent this inconsistency
in advance by using known [ISO 8601 standard](https://en.wikipedia.org/wiki/ISO_8601)
or String + Format method:

```json
// String + format
$moment('06.12.2017','DD.MM.YYYY')
// or ISO 8601
$moment('2017-12-06')
```

Both implementations will return the same value:

```
"2017-12-05T23:00:00.000Z"
```

## Formatting dates

`$moment()` returns the date and time in a standard ISO 8601 format but it can
be modified by using .format() parameter. When used in the initial empty state:

```json
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

```json
$moment('2012-12-01').format('MM/DD/YYYY')
```

This expression returns the input ISO 8601 value in a formatted US date format.

```
12/01/2012
```

Let us take another example:

```json
$moment('2012-12-01T22:32:16').format("dddd, MMMM Do YYYY, h:mm:ss a")
```

This outcome of this expression would be:

```
Saturday, December 1st 2012, 10:32:16 pm
```

More details about possible formatting is available from the
[moment.js documentation pages on formatting](https://momentjs.com/docs/#/displaying/format/).

## Performing operations on dates

Any given date one can be changed using manipulate functions. It is possible to
add and subtract years, months, weeks, days and etc. For example to add 1 year,
3 months and 15 days from any particular date:

```json
$moment('2012-12-01').add(1, 'year').add(3,'months').add(15,'days').format('LL')
```

The outcome would be:

```
March 16, 2014
```

It is also possible to use add and subtract together in one expression like this:

```json
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

## Avoiding the date parsing inconsistency pitfalls

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

```json
$moment("01.04.1980")
```

Then the output would be:

```
"1980-01-03T23:00:000Z"
```

It is obvious that the input date and time were incorrectly interpreted. Here is
how to correct it:

```json
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


## Selecting elements in arrays

Let us consider the following input array:

```json
{
  "Order": [
    {"ids":[1,2,3]},
    {"ids":[4,5,6]},
    {"ids":[7,8,9]}
  ]
}
```

To select the first embedded array elements (`[1,2,3]`) use:

```json
Order[0].ids
```

To select only the first element of the first embedded array (`1`) use:

```json
Order[0].ids[0]
```

It is possible to select elements using a wildcard `*` like:

```json
*[0].*[0]
```

Returning just `1` like the previous example.

## Flattening arrays

Considering the same input array example, here is how to flatten the two
embedded arrays into one:

```json
Order.ids
```

Which would result in: `[1,2,3,4,5,6,7,8,9]`

Let us use a nested array example from the [JSONata Exerciser page](http://try.jsonata.org/).

```json
{
  "Account": {
    "Account Name": "Firefly",
    "Order": [
      {
        "OrderID": "order103",
        "Product": [
          {
            "Product Name": "Bowler Hat",
            "ProductID": 858383,
            "SKU": "0406654608",
            "Description": {
              "Colour": "Purple",
              "Width": 300,
              "Height": 200,
              "Depth": 210,
              "Weight": 0.75
            },
            "Price": 34.45,
            "Quantity": 2
          },
          {
            "Product Name": "Trilby hat",
            "ProductID": 858236,
            "SKU": "0406634348",
            "Description": {
              "Colour": "Orange",
              "Width": 300,
              "Height": 200,
              "Depth": 210,
              "Weight": 0.6
            },
            "Price": 21.67,
            "Quantity": 1
          }
        ]
      }
    ]
  }
}
```

To create a custom JSON document on output follow these guidelines:

*   Include the output in curly brackets `{ }`
*   JSON property names can be declared:

```
{"parameter": Account.Order[0].OrderID}
```

which returns:

```json
{"parameter":"order103"}
```

*   To access the properties with space in the name use brackets:

```
{"name": Account.Order[0].Product[0]."Product Name"}
```

 returns:

```json
{"name": "Bowler Hat"}
```

*   To refer the value of `"Product Name"` property in an embedded array structure use `$` to reference the current array level:

```
{"product": Account.Order.Product.({"name" : $."Product Name"})}
```

which would return

```json
{
  "product": [
    {
      "name": "Bowler Hat"
    },
    {
      "name": "Trilby hat"
    }
  ]
}
```

JSON document with an array including the names of the products.

> **Please note:** without `$` the value of `"Product Name"` would not have been propagated.

Following the above guidelines, here is the final JSONata expression:

```
{
  "account": Account."Account Name",
  "orderID": Account.Order.OrderID,
  "products": Account.Order.Product.({
    "name": $."Product Name",
    "revenue": (Price * Quantity)
  })
}
```

It returns the following JSON document:

```js
{
  "account": "Firefly",
  "orderID": "order103",
  "products": [
    {
      "name": "Bowler Hat",
      "revenue": 68.9
    },
    {
      "name": "Trilby hat",
      "revenue": 21.67
    }
  ]
}
```

We defined our custom structure of the resulting JSON, performed calculations
and flattened the nested arrays.


## Related links

- [JSONata](http://jsonata.org/)
- [Moment.js](https://momentjs.com).
- [ISO 8601 standard](https://en.wikipedia.org/wiki/ISO_8601)
- [Moment.js Guides](http://momentjs.com/guides)
- [JavaScript Date parsing behavior](http://dygraphs.com/date-formats.html)
- [Time Zones](https://stackoverflow.com/tags/timezone/info)
- [JSONata Exerciser page](http://try.jsonata.org/).
