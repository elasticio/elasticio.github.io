---
title: Shopware component
layout: component
section: E-Commerce components
description: A component to work with Shopware API.
icon: shopware.png
icontext: Shopware component
category: shopware-component
createdDate: 2019-06-11
updatedDate: 2019-11-07
---

Shopware component for the {{site.data.tenant.name}} platform.

## Description

This is component for [Shopware](https://shopware.com/) eCommerce software which
is developed specifically to run on {{site.data.tenant.name}} platform.


## Requirements

> **PLEASE NOTE:** This component depends on [Shopware REST API extenstions](https://github.com/elasticio/elasticio-shopware-api-extension),
> please install it first before proceeding further.	please install it first before proceeding further.



**This component was tested with the Shopware version 5 (5.6).**

### Query Articles/Products

Shopware has a concept of ``Artikel`` in German which their UI translates to
``Products`` in English which is available through their API at the ``/article``
endpoint.  There is a trigger ``Query Articles`` which queries for new & updated
products.  The results are returned in batches of the form

```
{
  data:
  [
  //items
  ]
}
```

The batch size is configurable as a parameter. The batches can be broken up by
the mapper as they proceed to the next step.

The output of this method includes only information about the product.  It does
not include information about the variants of the article.  This information can
be obtained by having the ``Query Articles`` trigger followed by the ``Get
Article Details By Id`` action.  This action will return all the details for an
article including information about the articles variants.

## Actions

### Upsert Object

Action creates a new object or updates object which already exists by provided ID (by default) or Number (MainDetail.Number).
This action makes POST request when get message body without ID to create new entity
and PUT request when get message body includes ID or Number to update existing object.

![image](https://user-images.githubusercontent.com/40201204/68288341-e378fd00-008c-11ea-8df7-dd2e5696287c.png)


## Shopware API Limitations/Improvements

The Shopware API has many shortcomings which limit the ability to use Shopware
out of the box.  [Shopware allows for features to be requested in their issue
tracker](http://en.community.shopware.com/_detail_1282.html#Ticket_overview).
