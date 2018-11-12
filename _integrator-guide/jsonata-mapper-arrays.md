---
title: JSONata mapper | Working with arrays
layout: article
section: Data transformation
category: data-transformation
order: 4
---

The advanced mode of the [data mapping](mapping-data#using-advanced-mapping-mode)
between integration components on {{site.data.tenant.name}} uses
[JSONata](http://jsonata.org) expressions to transform incoming data into the
necessary outgoing structure for the next component to consume.

**In this article we will dive deeper into the methods of data transformations when the `arrays` in use.**

JSONata mapper is not going to split arrays but it can be used to select,
rearrange and flatten the array structures to suit your integration scenario logic.

This article consist of the following sections:

*   [Selecting elements](#selecting-elements)
*   [Flattening the array](#flattening-the-array)


## Selecting elements

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

## Flattening the array

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
