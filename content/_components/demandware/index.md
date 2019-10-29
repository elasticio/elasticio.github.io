---
title: Demandware component
layout: article
section: E-Commerce components
---

## Description

Salesforce Commerce Cloud, formerly known as Demandware, is a cloud-based commerce
platform for fast-growing businesses. The platform has a strong focus on APIs and
microservices for omnichannel customer experiences.

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

## Related information

Here is the Demandware (commerce cloud) [API documentation](https://documentation.demandware.com/DOC1/index.jsp).
You need to be authorized to access the docs.
