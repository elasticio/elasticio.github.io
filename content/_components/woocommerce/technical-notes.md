---
title: WooCommerce Technical Notes
layout: component
description: Technical Notes for the WooCommerce component
icontext: WooCommerce component
icon: woocommerce.png
category: woocommerce
updatedDate: 2022-03-10
ComponentVersion: 2.0.2
---

## Changelog

### 2.0.2 (March 10, 2023)

* Fixed `key $schema must not start with '$'` error that appeared creating a recipe from a flow
* Update Sailor version to 2.7.1

### 2.0.1 (May 06, 2022)

* Documentation improvements

### 2.0.0 (April 22, 2022)

* Added action - `Raw Request`
* Added action - `Upsert Object`
* Added trigger - `Webhook`
* Added metadata information to all actions
* `Create Object` and `Update Object` actions removed in favor new `Upsert Object` action
* Get rid of vulnerabilities in dependencies
* Update Sailor version to 2.6.27
* Add component pusher job to Circle.ci config
