---
title: Magento 2 Technical Notes
layout: component
description: Technical Notes for the Magento2 component.
icon: magento.png
icontext: Magento 2 Component
category: magento2
updatedDate: 2025-02-28
ComponentVersion: 1.7.0
redirect_from:
  - /components/magento2/changelog.html
  - /components/magento2/completeness-matrix.html
---

## Changelog

### 1.7.0 (February 28, 2025)

* Fixed issue in `Verify Credentials`: added validation to reject admin panel URLs in Magento configuration
* Added `Upsert Object`, `Make Raw Request` actions
* Revitalized `Lookup Objects`, `Lookup Object by ID`, `Delete Object by ID` actions
* Revitalized `Get New and Updated Objects Polling` trigger
* Updated the `Node engine` to version 20.x.
* Updated the `Sailor` version to 2.7.4
* Updated the `component-commons-library` version to 3.2.1
* Updated dev dependencies

### 1.6.7 (June 3, 2022)

* Add support for Magento2 versions 2.4.4
* Integration tests fix

### 1.6.6 (April 22, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config
* Update component-commons-library version to 2.0.2

### 1.6.5 (October 29, 2021)

* Fixed bug in Get New And Updated Objects Trigger's Metadata: the trigger always outputs an array.

### 1.6.4 (June 3, 2021)

* Integration tests fixed

### 1.6.3 (May 19, 2021)

* Add support for Magento2 versions 2.3.5 and 2.3.6

### 1.6.2 (Feb 25, 2021)

* Fixed a bug in `Bulk Extract` trigger with incorrect trigger behavior with a large number of retrieved objects.
* Changed npm audit level=high to level=critical  

### 1.6.1 (Jan 4, 2021)

* Bump Dependencies
* Update to node 14
* Fix some bugs with **Create Order**
  * No need to nest order entries in an **item** object
  * Fix in metadata for order items
  * Fix in metadata for regions & countries
* Fix some bugs in **Upsert Customer**
  * Fix logic for regions & countries
* Countries can now be identified by two letter ISO code, three letter ISO code or by name
* Regions can now be identified by ISO code or name     
* Respond to removed JSON schema reference hosted by Magento docs.
* Remove empty string from list of gender options.

### 1.6.0 (June 5, 2020)

* Add `Bulk Extract` trigger
* Add `Lookup Objects` action
* Add `Lookup Set of Objects` action
* Logging tweaks:
  * Have Magento client use logger from sailor
  * Replace parameters in error messages when parameters are an object, not an array
* Update sailor version to 2.6.7

### 1.5.0 (March 11, 2020)

* Created `Add Update To Sales Order` Action
* Created `Create Order` action
* Add new type of unique ID for Sales Order `ext_order_id` to action `Retrieve Object by ID`
* Add `Check if you'd like to make a series of calls ( Developer mode only )` configuration field for `Custom Request` action
* Improve error message for `Custom Request` action
* Add `Time stamp field to poll on` configuration field for `Get New and Updated Objects Polling` trigger

### 1.4.0 (February 26, 2020)

* Add `Read Store Config` action
* Add `status` field to output metadata, option to turn off throwing errors for `Custom Request` action
* Add `Don't throw error on 4XX/5XX HTTP response codes` configuration field for `Custom Request` action
* Remove support for all Magento versions from 2.3.0 and below
* Add support for Magento versions 2.3.2 and 2.3.4 so that currently supported instances are 2.3.1, 2.3.2, 2.3.3, 2.3.4

### 1.3.0 (November 6, 2019)

* Update Magento version from 2.3.1 to 2.3.3
* Add `Upsert Customer` action
* Add `Delete Object` action
* Add `Lookup Object by ID` action
* Add `Set Tiered Prices` action
* Add custom error handler

### 1.2.0 (June 24, 2019)

* Add `Create Invoice` action

### 1.1.0 (June 6, 2019)

* Add `Set inventory` action
* Add `Set order as shipped` action
* Add `Set order external ID` action
* Add `Upsert product` action
* Add `Get New and Updated Objects Polling` trigger

### 1.0.0 (March 16, 2018)

* Initial release