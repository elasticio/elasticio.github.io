---
title: Demandware component
layout: component
section: E-Commerce components
description: A cloud-based commerce platform for fast-growing businesses.
icon: demandware.png
icontext: Demandware component
category: demandware
createdDate: 2018-03-13
updatedDate: 2018-03-15
---

## Requirements

### Credentials

Access to the Demandware API are secured by a `Client ID` and `Client password`
combination.

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

The component has actions for accessing for all endpoints of the commerce cloud
`Data API`. Here are some of them:

### Upsert product

`PUT` products `/products/{id}`

### Retrieve products

`POST` product_search `/product_search`

### Retrieve product

`GET` products `/products/{id}`

### Delete product

`DELETE` products `/products/{id}`

### Update inventory

`PATCH` inventory_lists `/inventory_lists/{id}`
