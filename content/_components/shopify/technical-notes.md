---
title: Shopify Technical Notes
layout: component
description: Changelog for Shopify component.
icon: shopify-admin.png
icontext: Shopify component
category: shopify-component
updatedDate: 2021-12-10
ComponentVersion: 1.4.4
redirect_from:
  - /components/shopify-admin/completeness-matrix.html
  - /components/shopify-admin/changelog.html
  - /components/shopify-admin/technical-notes.html
---

## Changelog

### 1.4.4 (December 10, 2021)

* Fix output metadata for `Lookup Objects` action

### 1.4.3 (November 26, 2021)

* Reduced the size of component icon file

### 1.4.2 (September 15, 2021)

*   Add Make Raw Request Action
*   Upgrade to Sailor `2.6.26`

### 1.4.1 (November 10, 2020)

*   Upgrade to sailor 2.6.18
*   Annual audit of the component code to check if it exposes a sensitive data in the logs
*   Annual npm vulnerabilities audit

### 1.4.0 (Sept 11, 2020)

* Add support for reading & writing metafields
* Bump dependencies
* Change API Key in credentials to password level
* Remove sensitive info from logs

### 1.3.0 (November 15, 2019)

**Triggers:**

* Add Webhook Subscription trigger
* Add Polling trigger

**Actions:**

* Add Create Object Action
* Add Upsert Object Action
* Depreacte updateProductVariant action
* Depreacte createProductVariant action
* Depreacte createProductImage action
* Depreacte updateProductImage action
* Depreacte upsertProduct action

### 1.2.0 (November 5, 2019)

**Actions:**

* Add Lookup Object Action
* Add Delete Object action
* Deprecate Get Product action
* Deprecate Get Inventory Item action
* Deprecate Delete Product action
* Deprecate Delete Product Image action
* Deprecate Delete Product Variant action

### 1.1.0 (October 4, 2019)

**Actions:**

* Add List Obejct action
* Deprecate List products
* Deprecate List inventory items

### 1.0.0 (May 7, 2018)

* Initial release

## Completeness Matrix

Here is the Shopify Admin component Completeness Matrix:

![Shopify Admin component Completeness Matrix](img/completeness-matrix.png)
