---
title: Lightspeed-ecom triggers
layout: component
description: Lightspeed ECom API component triggers.
icon: lightspeed-ecom.png
icontext: Lightspeed-ecom component
category: lightspeed-ecom
updatedDate: 2020-12-04
ComponentVersion: 1.0.2
---

## Polling entity

This trigger polls for existing and updated objects where you can select object type.

![Trigger - Polling entity](https://user-images.githubusercontent.com/40201204/50344276-04973480-0533-11e9-9ac5-c0aa38a7f2ab.png)

### Input fields description

* **Object Type** - you should select the type of object which updates you want to get.
* **Polling Field** - you can use any field existing at current object, which has datatype like DATE, DATETIME or TIMESTAMP.
* **Batch Size for request pagination** - count of entries which you will get by one request ().

Supported entities:
* attributes
* blogs
* brands
* catalog
* categories
* contacts
* countries
* customers
* dashboard
* deliverydates
* discounts
* events
* external_services
* filters
* groups
* invoices
* languages
* metafields
* orders
* paymentmethods
* products
* quotes
* redirects
* returns
* reviews
* sets
* shipments
* shippingmethods
* shop
* subscriptions
* suppliers
* tags
* taxes
* textpages
* tickets
* time
* types
* variants

## Webhook subscription

This trigger can create webhook to receive any changes for chosen type of entities.

![Webhook subscription trigger](https://user-images.githubusercontent.com/40201204/50344997-19c19280-0536-11e9-8c40-f7060ee84cec.png)

### Input fields description

* **Object Type** - you should select the type of object to make a subscription.

Supported entities:
* contacts
* customers
* invoices
* orders
* products
* quotes
* returns
* reviews
* shipments
* shop
* subscriptions
* tickets
* variants
