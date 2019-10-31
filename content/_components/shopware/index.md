---
title: Shopware component
layout: article
section: E-Commerce components
---

## Description

This is component for [Shopware](https://shopware.com/) eCommerce software.
## Before you Begin

> **PLEASE NOTE:** This component depends on [Shopware REST API
extenstions](https://github.com/elasticio/elasticio-shopware-api-extension),
please install it first before proceeding further.

## Query Articles/Products

Shopware has a concept of ``Artikel`` in German which their UI translates to
``Products`` in English which is available through their API at the ``/article``
endpoint. There is a trigger ``Query Articles`` which queries for new & updated
products. The results are returned in batches of the form
```
{
  data: [
  //items
  ]
}
```

The batch size is configurable as a parameter. The batches can be broken up by
the JSONata mapper as they proceed to the next step.

The output of this method includes only information about the product.  It does
not include information about the variants of the article.  This information can
be obtained by having the ``Query Articles`` trigger followed by the ``Get
Article Details By Id`` action.  This action will return all the details for an
article including information about the articles variants.


## Shopware API Limitations/Improvements

The Shopware API has many shortcomings which limit the ability to use Shopware
out of the box.  [Shopware allows for features to be requested in their issue
tracker](http://en.community.shopware.com/_detail_1282.html#Ticket_overview).
