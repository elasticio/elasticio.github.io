---
title: Mapping data
layout: article
section: Data transformation
category: data-transformation
order: 0
since: 20180216
---

In this article we will explain how to map the data between integration components to keep them in sync.

An integration flow on {{site.data.tenant.name}} platform must have at least two components, one trigger and one action. Trigger emits a data for the action component to receive and process it. Between these two components seats the {{site.data.tenant.name}} **data mapper**, which maps or matches the incoming data to the specific fields where the next component expects them to receive.

To understand how the data-mapping works in practice visit our tutorials section. We recommend starting from steps-by-step instructions in [how to create your first integration flow](/getting-started/first-flow) followed by the [creating a webhook flow](/getting-started/webhook-flow) articles as an introduction to the data-mapping.

If you have already followed the tutorials you realise that the data-mapping on {{site.data.tenant.name}} platform is an important part of the integration process which warrants detailed explanation in its own.

## Mapping simple values

Let us consider a simple scenario when we have an incoming data through the *Webhook* component like the following `JSON` structure.

```js
{
  "name": "Gromit",
  "status": "sold"
}
```

We intend to map these values into outgoing fields in *Petstore API* component. Let us jump into the integration flow design right at the mapping stage.

![Mapping: Configure input](/assets/img/integrator-guide/data-mapper/mapper-01.png "Mapping: Configure input")

The screenshot above shows the stage in integration flow designer where the actual mapping or matching of the values is done. The *Petstore API* operation for creating a Pet requires a name and a status for the new pet. That's why the component asks the user to provide input in two fields: `Name` and `Status`. These two fields are required (red exclamation marks), which means without providing the values for them we won't be able to proceed further and click on *Continue* button. Let us proceed with the mapping.

![Mapping: Selecting drop-down](/assets/img/integrator-guide/data-mapper/mapper-02.png "Mapping: Selecting drop-down")

To map the *Name* field click on a drop-down menu on the right side and select the matching value from the provided values in the *Data* tab. For example, our incoming data has a field `name` which we match with the *Name* field from *Petstore API* component.

![Mapping result of the field](/assets/img/integrator-guide/data-mapper/mapper-03.png "Mapping result of the field")

The screenshot above shows the successful mapping result which is `Gromit`. Notice that you have jumped to the *Mapping results* tab here which shows the successful evaluation result. Note also the green check-mark appeared besides the mapping field. This means the mapping of this field is valid.

![Expressions tab](/assets/img/integrator-guide/data-mapper/mapper-04.png "Expressions tab")

Before going further we can check the *Expressions* tab here. Here you can look under the hood of the [JSONata](http://jsonata.org/) powered mapper and see the list of expression and functions that is possible to use. We have already used them in the [how to create your first integration flow](/getting-started/first-flow) tutorial.

We can match the *Status* field with the incoming `status` value as well to complete the mapping and go forward.

> **Note** During the mapping process the mapping expressions is evaluated on the samples. During the component execution {{site.data.tenant.name}} evaluates these expressions based on the incoming data which will differ from the presented sample.

## Using advanced mapping mode

In the previous section you learned how to map data between two steps of an integration flow using a JSONata expression. This is a convenient approach, however, the graphical mapping in the *Integrator mode* has certain limitations. For example, the array-to-array mapping is only possible in the *Developer mode*. For that purpose we recommend switching to the *Developer mode* to continue.

> **Note** Array-to-array mappings is only possible in the *Developer mode*.

The following screenshot demonstrates the *Developer mode*.

![Developer mode](/assets/img/integrator-guide/data-mapper/mapper-05.png "Developer mode")

In the *Developer mode* you can write a single JSONata expressions for the entire input object instead of defining expressions for each individual field as in case of the *Integrator mode*.

To use the *Developer mode*, you need to know the meta-model of input data: the structure of the object and the property names. Without having access to component's source code knowing the input model is impossible.

Therefore, when you switch from *Integrator mode* to *Developer mode*, the mapper input field is pre-populated with a required JSON expression. {{site.data.tenant.name}} generates it from the incoming meta-model parameter values and random property values. You can write your mapping by overriding the property values.

![Developer mode edited values](/assets/img/integrator-guide/data-mapper/mapper-06.png "Developer mode edited values")

The above screenshot shows how the property values is replaced by the variables `name` and `status`. These variables get their values from the incoming payload of the Webhook component.

> **Please note** your expression is evaluated as you are typing it. The result is shown at once below the mapper input field, in the *Mapping result* section. If you give an invalid expression, an error message is displayed.

![Error in mapping](/assets/img/integrator-guide/data-mapper/mapper-07.png "Error in mapping")

The screenshot above shows the incomplete `JSON` structure which is not accepted by {{site.data.tenant.name}} and the error is shown in the *Mapping result* section.

> **Note** You can switch between *Developer* and *Integrator* modes during the design of integration flow but not after the flow is published. To change the mapping mode a new [draft version of a flow](managing-flow-history) must be created.


Now that we introduced the mapper, let's discuss some [JSONata](http://jsonata.org/) basics
so that you can start transforming your data in the following section.
For more advanced functionality of the JSONata transformation language
please go to the [JSONata website](http://jsonata.org/).

## Transforming strings

Using JSONata expressions we can perform different types of transformations with
`strings` using standard string operators. We can also use more complex string
functions like `$uppercase(str)`, `$lowercase(str)`, `$split(str, separator [, limit])`,
`$joinarray[, separator]` and more.

For the following examples we will assume the following incoming data:

```js
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

```js
"The Adventures of " & fname & " " & lname
```

Here we used the `&` operator to combine the strings into one message:
`The Adventures of Tom Sawyer`.

Now we want to write the same sentence in all caps since it is the title of a book:

```js
$uppercase("The Adventures of " & fname & " " & lname)
```
The result is: `THE ADVENTURES OF TOM SAWYER`.

How about adding a new line and adding the name of the author?

```js
$uppercase("The Adventures of " & fname & " " & lname)
& "\n" & $uppercase("by " & author)
```

And the outcome is:
```
THE ADVENTURES OF TOM SAWYER
BY MARK TWAIN
```

What if we want to get the domain name from the incoming email address
`tom.sawyer@twaincreations.com`? To do that we could write the following JSONata
expression:

```js
$split(email, /[@,.]+/)[2]
```

This expression first takes the value of the `email` field, splits it using the
`@` and `.` characters to build an array with elements containing
`["tom","sawyer","twaincreations","com"]`. Then it takes the domain name value,
which is the element `[2]`, to get the final result of `twaincreations` .

If you noticed the email address domain contains the author's surname. Can we be sure?

```js
$contains(email,$lowercase($split(author,"")[1]))
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

```js
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
```js
$number(itemPrice.amount)
```
This would result in `25.44`, which is a number. A related issue can be when the
incoming data contains a number in German accounting format.

```js
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

```js
$number($replace(itemPrice.amount, ",","."))
```

The result would be `12.99`, which is a number.

Now let's perform some basic arithmetic operations on numbers in your payload.
Consider the following data was produced by a source system:

```js
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

```js
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

```js
{
  "shipment title": "my life in kenya",
  "shipment price": 57.87
}
```


## Using numeric aggregation functions

Now let us slightly change the requirement from above example. We want to apply
the `promotionDiscount.amount` to each item in the order.

```js
{
  "shipment title" : orderItems.title,
  "shipment price" : orderItems.(quantityShipped*$sum([itemPrice.amount, shippingPrice.amount, -promotionDiscount.amount]))
}
```
Here is the outgoing JSON:

```js
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

## Formatting dates

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
[moment.js documentation pages on formatting](https://momentjs.com/docs/#/displaying/format/).

## Performing operations on dates

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


## Selecting elements in arrays

Let us consider the following input array:

```js
{
  "Order": [
    {"ids":[1,2,3]},
    {"ids":[4,5,6]},
    {"ids":[7,8,9]}
  ]
}
```

To select the first embedded array elements (`[1,2,3]`) use:
```js
Order[0].ids
```

To select only the first element of the first embedded array (`1`) use:

```js
Order[0].ids[0]
```

It is possible to select elements using a wildcard `*` like:

```js
*[0].*[0]
```

Returning just `1` like the previous example.

## Flattening arrays

Considering the same input array example, here is how to flatten the two
embedded arrays into one:

```js
Order.ids
```

Which would result in: `[1,2,3,4,5,6,7,8,9]`

Let us use a nested array example from the [JSONata Exerciser page](http://try.jsonata.org/).

```js
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
```js
{"parameter": Account.Order[0].OrderID}
```
which returns:
```js
{"parameter":"order103"}
```
*   To access the properties with space in the name use brackets:
```js
{"name": Account.Order[0].Product[0]."Product Name"}
```
 returns:
```js
{"name": "Bowler Hat"}
```
*   To refer the value of `"Product Name"` property in an embedded array structure use `$` to reference the current array level:
```js
{"product": Account.Order.Product.({"name" : $."Product Name"})}
```
which would return
```js
{
  "product": [
    {"name": "Bowler Hat"},
    {"name": "Trilby hat"},
    {"name": "Bowler Hat"},
    {"name": "Cloak"}
  ]
}
```
JSON document with an array including the names of the products.
> **Note** without `$` the value of `"Product Name"` would not have been propagated.

Following the above guidelines, here is the final JSONata expression:

```js
{
  "account": Account."Account Name",
  "orderID": Account.Order.(OrderID),
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





