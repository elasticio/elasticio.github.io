---
title: Magento2 component
layout: component
section: E-Commerce components
description: A component to work with Magento 2.
icon: magento.png
icontext: Magento 2 Component
category: magento2
updatedDate: 2021-10-29
ComponentVersion: 1.6.5
---

## Description

The main purpose of the component is to integrate an external system with the Magento version 2 e-commerce platform.

Every form of actions is generated from appropriate Magento2 API endpoint JSONschema. The component is currently compatible with only v2.3 of the API, since v2.2 was [deprecated by Magento in December 2019](https://magento.com/sites/default/files/magento-software-lifecycle-policy.pdf?_ga=2.223327577.313663481.1582195591-1899578326.1570182293). We only support Magento minor versions that have been released in 2019, i.e. Magento v2.3.1 - 2.3.4.

`sku` - stock keeping unit is product identifier.

### Purpose

The main purpose of the component is integration some external system with e-commerce platform Magento version 2

### API links

https://devdocs.magento.com/swagger/

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Magento2 component like [changelog](/components/magento2/technical-notes#changelog) and [completeness matrix](/components/magento2/technical-notes#completeness-matrix).

## Credentials

There is implemented [token-based authentication](https://devdocs.magento.com/guides/v2.0/get-started/authentication/gs-authentication-token.html) in component.

1. **Admin Token authorization**: for this option `username` and `password` fields are required, `Integration Token` field should be empty.
A token is generated for each request.

2. **Integration Token authorization**: for this option `Integration Token` field is required, `username` and `password` fields should be empty.

### Minor Version of Magento

Dropdown list with a minor version of Magento 2. It is currently only possible to select version 2.3. Required field.

### Magento Edition

Dropdown list with an edition of Magento 2. It is possible to select `Open source` or `Enterprise` edition. Required field.

### Instance URL

It is needed to specify url of Magento instance like `https://magento.instance.com`. Required field.

### Username

It is needed to specify username. Required in pair with `password` for `Admin Token authorization`.

### Password

It is needed to specify password. Required in pair with `username` for `Admin Token authorization`

### Integration Token

It is needed to specify integration token. Required for `Integration Token authorization`

## Environment variables

| Name|Mandatory|Description|Values|
|----|---------|-----------|------|
| `BULK_EXTRACT_PAGE_SIZE`| false | Define max page for one call in Bulk Extract trigger | Integer, default is 1000 |

> Please Note: From the platform version [20.51](/releases/2020-12-17) we deprecated the
> component `LOG_LEVEL` environment variable. Now you can control logging level per each step of the flow.

## Triggers

Magento2 component includes the following triggers:

  1. [Get New and Updated Objects Polling](/components/magento2/triggers#get-new-and-updated-objects-polling)
  Lookup objects polling trigger.

  2. [Bulk Extract](/components/magento2/triggers#bulk-extract)
  Trigger for retrieval of large sets of person and person related data, using bulk Marketo API.

## Actions

Magento2 component includes the following actions:

  1. [Custom Request Action](/components/magento2/actions#custom-request-action)
Using this actions you can do custom request. You should manually specify `method`, `url` and `body`.

  2. [Set Inventory Action](/components/magento2/actions#set-inventory-action)
This action allows you to set the quantity for an already existing product.

  3. [Upsert Product Action](/components/magento2/actions#upsert-product-action)
You can create new or update existing simple or configurable product and associate with existing child product (for configurable products) using this action.

  4. [Set order as shipped Action](/components/magento2/actions#set-order-as-shipped-action)
Using this action you can set your order as shipped.

  5. [Set Sales Order External ID](/components/magento2/actions#set-sales-order-external-id)
This action allows to set or update Sales Order external ID for existing Order.

  6. [Create Invoice Action](/components/magento2/actions#create-invoice-action)
This action allows you to create an invoice for an already existing order using the order’s `entity id`.

  7. [Add Update To Sales Order](/components/magento2/actions#add-update-to-sales-order)
This action allows to set or update Sales Order status.

  8. [Lookup Object by ID](/components/magento2/actions#lookup-object-by-id)
This action allows you to search up one of the object types: `customer`, `product` or `sales order` by unique criteria.

  9. [Lookup Objects](/components/magento2/actions#lookup-objects)
  Given a field-value return all matching records.

  10. [Lookup Set Of Objects](/components/magento2/actions#lookup-set-of-objects)
  Given an array of information where each item in the array uniquely describes exactly one object, lookup each object.

  11. [Set Tiered Prices](/components/magento2/actions#set-tiered-prices)
This action takes an array as input, and therefore can only be used in developer mode.

  12. [Upsert Customer](/components/magento2/actions#upsert-customer)
Updates a customer, or creates it if it doesn’t exist. To update, you must provide the `customer ID` and `website ID` (Associate to Website). To create, do not enter a customer ID; the system will generate one.

  13. [Delete Object](/components/magento2/actions#delete-object)
This action allows you to delete the following object types: `customer` or `product` by unique criteria.

  14. [Read Store Config Action](/components/magento2/actions#read-store-config-action)
You can read all the configured stores on a Magento instance (like [GET /V1/store/storeConfigs](https://devdocs.magento.com/swagger/#/storeStoreConfigManagerV1/storeStoreConfigManagerV1GetStoreConfigsGet))

  15. [Create order](/components/magento2/actions#create-order)
Creates an order on behalf of a customer given an existing customer id, or creates an order for a guest user.

## Known limitations

1. Current component version was tested with Magento2 v2.3.4. Correct component behavior is not guaranteed for other Magento2 versions.

2. Deprecated triggers and actions don't support `Integration Token authorization`, only `Admin Token authorization`.

3. Currently Magento2 has a bug where encoded URI's are not recognised and will throw errors. For example if you have `some/sku`, it
will be encoded to `some%2Fsku`. However, due to the bug this will throw errors. Refrain from using URI's that have special characters which
are meant to be encoded.
