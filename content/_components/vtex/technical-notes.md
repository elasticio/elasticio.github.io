---
title: Vtex Technical Notes
layout: component
description: Technical Notes for the Vtex component
icontext: Vtex component
icon: vtex.png
category: vtex
updatedDate: 2023-01-27
ComponentVersion: 1.5.0
---

## Changelog

### 1.5.0 (January 27, 2023)

* Added new Trigger - `Selective Get New And Updated Objects Polling Trigger`
* Updated Sailor version to 2.7.1

### 1.4.3 (September 09, 2022)

* Fixed output metadata for `Lookup Object (at Most 1)` action for Object Type - Orders
* Fixed incorrect behavior of `Allow ID to be omitted` for `Lookup Object (at Most 1)` action
* Update Sailor version to 2.6.29

### 1.4.2 (May 20, 2022)

* Added `Last interaction` option to `Time stamp field to poll on` in `Get New And Updated Objects Polling` trigger
* Improved `Get New And Updated Objects Polling` trigger to use [scroll](https://developers.vtex.com/docs/guides/search-and-scroll-api-queries) instead of [search](https://developers.vtex.com/docs/guides/search-and-scroll-api-queries) to collect all records

### 1.4.1 (May 06, 2022)

- Added `Place Order` action
- Get rid of vulnerabilities in dependencies
- Add component pusher job to Circle.ci config

### 1.3.0 (April 08, 2022)

* Added `Lookup Object (at Most 1)` action

### 1.2.0 (March 25, 2022)

* Added `Lookup Set Of Objects By Unique Criteria` action

### 1.1.0 (March 11, 2022)

* Added `Lookup Objects (Plural)` action
* Added `Upsert Object` action
* Fixed Stub Output Metadata to fit the upgraded version of Faker library on the UI

### 1.0.0 (February 11, 2022)

* Added `Make Raw Request` action
* Added `Get New And Updated Objects Polling` trigger
