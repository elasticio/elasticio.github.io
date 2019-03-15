---
title: Jsonata component
layout: article
section: Utility Components
---


> Dedicated data transformation component for {{site.data.tenant.name}} platform based on JSONata

## Authentication

This component requires no authentication.

## How it works

This component takes the incoming message body and applies the configured JSONata transformation on it. It uses
a fact that JSONata expression is a superset of JSON document so that by default any valid JSON document is
a valid JSONata expression.

For example let's take this sample incoming message body:

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

You can use following JSONata expressions to transform it:

```jsonata
{
	"account": Account."Account Name",
	"orderCount" : $count(Account.Order)
}
```

result of that transofrmation will be the following JSON document ([jsonata link](http://try.jsonata.org/B1ctn36ub)):

```json
{
  "account": "Firefly",
  "orderCount": 1
}
```

I hope you've got the idea. Now you can also do something more complicated, like this array-to-array transformation:

```jsonata
{
    "account": Account."Account Name",
    "products": Account.Order.Product.({
    	"name": $."Product Name",
        "revenue": (Price * Quantity)
    }),
    "orderIDs": Account.Order[].(OrderID)
}
```

resulting in ([jsonata link](http://try.jsonata.org/B1ctn36ub)):

```json
{
  "account": "Firefly",
  "products": [
    {
      "name": "Bowler Hat",
      "revenue": 68.9
    },
    {
      "name": "Trilby hat",
      "revenue": 21.67
    }
  ],
  "orderIDs": [
    "order103"
  ]
}
```

## License

Apache-2.0 © [{{site.data.tenant.name}} GmbH](http://{{site.data.tenant.name}})
