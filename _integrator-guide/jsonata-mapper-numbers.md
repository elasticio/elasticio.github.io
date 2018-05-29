---
title: JSONata mapper | Working with numbers
layout: article
section: Data transformation
category: data-transformation
order: 2
---

The advanced mode of the [data mapping](mapping-data#using-advanced-mapping-mode)
between integration components on {{site.data.tenant.name}} uses
[JSONata](http://jsonata.org) expressions to transform incoming data into the
necessary outgoing structure for the next component to consume.

**In this article we will dive deeper into the methods of data transformations using
the `numbers`.**

JSONata mapper supports more than simple numeric operations but also numeric functions
like `$abs(number)`, `$floor(number)`, `$ceil(number)`, `$power(base, exponent)`
and more. In this guide, we give examples using few of them. To learn more
please refer to the [JSONata documentation](http://docs.jsonata.org/numeric-functions.html).

## String to number

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

## Simple number manipulations

To display the following functionality we will take the following incoming data:

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
