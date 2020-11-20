---
title: Shopify Admin component
layout: component
section: E-Commerce components
description: A component to work with the Shopify Admin API.
icon: shopify-admin.png
icontext: Shopify Admin component
category: shopify-component
createdDate: 2017-04-30
updatedDate: 2020-11-20
---

## How works. API version

Component was tested on `2019-10` API version.

You can find more information about API versioning at Shopify [here](https://help.shopify.com/en/api/versioning).

[Shopify Admin API documentation](https://help.shopify.com/api/reference).

## Requirements

### Credentials

*   `shopName`
*   `apiKey`
*   `password`

> **Please Note:** [How to generate creds](https://shopify.dev/tutorials/authenticate-a-private-app-with-shopify-admin#generate-credentials-from-the-shopify-admin)

### Environment variables

| Name | Mandatory | Description | Values |
|---------------------|-------|------------------------------------------|--------------------|
| SHOPIFY_API_VERSION | false | Determines API version of Shopify to use | Default: `2019-10` |

### Metafield Notes

Metafields for an object can be written when upserting/creating an object that supports metafields. When polling for objects, looking up an object or searching for objects, there is a checkbox that can be selected that will fetch the corresponding metafields for objects. Selecting this checkbox will cause more API calls to be consumed. (An additional API call per object read.)

When reading metafields data will be returned in this format. When writing metafield data, the following format is also expected for the `metafields` object.

```json
{
  "metafieldNamespaceOne" : {
    "metafieldKeyOne": "Metafield Value for metafieldNamespaceOne.metafieldKeyOne",
    "metafieldKeyTwo": "Metafield Value for metafieldNamespaceOne.metafieldKeyTwo"
  },
  "metafieldNamespaceTwo": {
    "metafieldKeyThree": "Metafield Value for metafieldNamespaceTwo.metafieldKeyThree"
  }
}
```

Shopify metafields support the following three types:

  * `integer` metafields will be created whenever the value provided for a metafield is a JSON number that is an integer. When reading Shopify `integer` metafields, they will result in JSON numbers.

  * `string` metafields will be created whenever the value provided for a metafield is a JSON string or a JSON number that is not an integer. When reading any Shopify `string` metafields, they will result in JSON strings regardless of whether or not they could be parsed as numbers.

  * `json_string` metafields will be created whenever the value provided for a metafield is a JSON object, array or boolean. The incoming value will be converted to a JSON string and stored. When reading Shopify metafields, they will be converted back to their JSON forms.

Setting a metafield the value of JSON `null` will result in that metafield being deleted.

Not setting a value for a metafield will result in that metafield being unchanged.

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about AWS-S3 component like [changelog](/components/shopify-admin/technical-notes#changelog) and [completeness matrix](/components/shopify-admin/technical-notes#completeness-matrix).

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

[How to generate creds](https://shopify.dev/tutorials/authenticate-a-private-app-with-shopify-admin#generate-credentials-from-the-shopify-admin)
