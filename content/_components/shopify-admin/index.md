---
title: Shopify Admin component
layout: component
section: E-Commerce components
description: A component to work with the Shopify Admin API.
icon: shopify-admin.png
icontext: Shopify Admin component
category: shopify-component
createdDate: 2017-04-30
updatedDate: 2019-11-15
---

## Latest changelog

**1.3.0 (November 15, 2019)**

**Triggers**

* Add Webhook Subscription trigger

* Add Polling trigger

> To see the full **changelog** please use the following [link](/components/shopify-admin/changelog).

## How works. API version

Component was tested on `2019-10` API version.

You can find more information about API versioning at Shopify [here](https://help.shopify.com/en/api/versioning).

[Shopify Admin API documentation](https://help.shopify.com/api/reference).

## Requirements

### Credentials

*   `shopName`
*   `apiKey`
*   `password`

> **Note:** [How to generate creds](https://help.shopify.com/api/getting-started#generate-api-credentials-from-the-shopify-admin)

### Environment variables

| Name | Mandatory | Description | Values |
|---------------------|-------|------------------------------------------|--------------------|
| SHOPIFY_API_VERSION | false | Determines API version of Shopify to use | Default: `2019-10` |


## Triggers

Shopify Admin component includes the following triggers:

  1. [Polling Trigger](/components/shopify-admin/triggers#polling-trigger)  
  Polls Shopify API for new and updated objects.

  2. [Webhook subscription trigger](/components/shopify-admin/triggers#webhook-subscription)  
  Creates webhook subscriptions on the Shopify side and receives events to the flow.

## Actions

Shopify Admin component includes the following actions:

  1. [Lookup Object action](/components/shopify-admin/actions#lookup-object)                                                           
  Finds object by id.

  2. [Lookup Objects action](/components/shopify-admin/actions#lookup-objects)                                                           
  Retrieves object by ID.

  3. [Create Object action](/components/shopify-admin/actions#create-object)                                                           
  Action to create new object instance. Only for object that can’t be updated.

  4. [Upsert Object action](/components/shopify-admin/actions#upsert-object)                                                           
  Upsert Object action is useful if it isn’t known if there is already an object in the system. Action determines if the data needs to be matched to an existing object or added to a new one. Only for objects that can be created and updated.

  5. [Delete Object action](/components/shopify-admin/actions#delete-object)                                                           
  Delete Object By Unique Criteria

The following Shopify Admin actions are deprecated:

  1. [List Products(deprecated)](/components/shopify-admin/actions#list-productsdeprecated)                                                           
  This actions is deprecated. Use [Lookup Object](/components/shopify-admin/actions#lookup-object) action instead.

  2. [Upsert Product(deprecated)](/components/shopify-admin/actions#upsert-productdeprecated)                                                           
  This actions is deprecated. Use [Upsert Objects](/components/shopify-admin/actions#upsert-object) action instead.

  3. [Delete Product(deprecated)](/components/shopify-admin/actions#delete-productdeprecated)                                                           
  This actions is deprecated. Use [Upsert Objects](/components/shopify-admin/actions#delete-object) action instead.

  4. [Get Product(deprecated)](/components/shopify-admin/actions#get-productdeprecated)                                                           
  This actions is deprecated. Use [Lookup Object](/components/shopify-admin/actions#lookup-object) action instead.

  5. [Count Products(deprecated)](/components/shopify-admin/actions#count-productsdeprecated)                                                           
  This actions is deprecated. Use [Delete Object](/components/shopify-admin/actions#delete-object) action instead.

  6. [Create Product Image(deprecated)](/components/shopify-admin/actions#create-product-imagedeprecated)                                                           
  This actions is deprecated. Use [Upsert Object](/components/shopify-admin/actions#upsert-object) action instead.

  7. [Update Product Image(deprecated)](/components/shopify-admin/actions#update-product-imagedeprecated)                                                           
  This actions is deprecated. Use [Upsert Object](/components/shopify-admin/actions#upsert-object) action instead.

  8. [Delete Product Image(deprecated)](/components/shopify-admin/actions#delete-product-imagedeprecated)                                                           
  This actions is deprecated. Use [Upsert Object](/components/shopify-admin/actions#upsert-object) action instead.

  9. [List Inventory Items(deprecated)](/components/shopify-admin/actions#list-inventory-itemsdeprecated)                                                           
  This actions is deprecated. Use [Lookup Object](/components/shopify-admin/actions#lookup-object) action instead.

  10. [Get Inventory Item(deprecated)](/components/shopify-admin/actions#get-inventory-itemdeprecated)                                                           
  This actions is deprecated. Use [Lookup Object](/components/shopify-admin/actions#lookup-object) action instead.

  11. [Update Inventory Item(deprecated)](/components/shopify-admin/actions#update-inventory-itemdeprecated)                                                           
  This actions is deprecated. Use [Upsert Object](/components/shopify-admin/actions#upsert-object) action instead.

  12. [Create Product Variant(deprecated)](/components/shopify-admin/actions#create-product-variantdeprecated)                                                           
  This actions is deprecated. Use [Upsert Object](/components/shopify-admin/actions#upsert-object) action instead.

  13. [Update Product Variant(deprecated)](/components/shopify-admin/actions#update-product-variantdeprecated)                                                           
  This actions is deprecated. Use [Upsert Object](/components/shopify-admin/actions#upsert-object) action instead.

  14. [Delete Product Variant(deprecated)](/components/shopify-admin/actions#delete-product-variantdeprecated)                                                           
  This actions is deprecated. Use [Upsert Object](/components/shopify-admin/actions#upsert-object) action instead.

## Links

[Shopify Admin API documentation](https://help.shopify.com/api/reference)

[How to generate creds](https://help.shopify.com/api/getting-started#generate-api-credentials-from-the-shopify-admin)
