---
title: Flow Linking Technical Notes
layout: component
description: Technical Notes for the Flow Linking component
icon: flow-linking.png
icontext: Flow Linking  component
category: flow-linking
ComponentVersion: 1.1.1
updatedDate: 2024-09-05
---

## Changelog

### 1.1.1 (July 29, 2024)
* Added service `flow-linking` to component.json

### 1.1.0 (July 5, 2024)
* Fixed `socket hang up` issue.
* Added `Lookup by id` checkbox to `Trigger another` flow action.
* Added `Retry errors` checkbox to `Trigger another` flow action.

### 1.0.3 (May 21, 2024)

* Fixed issue with `Cannot read properties of undefined (reading 'data')` in `Trigger another flow` action.
* Update Sailor version to `2.7.2`.

### 1.0.2 (October 07, 2022)

* Linking url now depends of installation environment.
* Disabled components name check for metadata in `Trigger another flow` action.
* Performance improvements.
* Update Sailor version to `2.7.0`.

### 1.0.1 (April 22, 2022)

* Update Sailor version to `2.6.27`.
* Get rid of vulnerabilities in dependencies.
* Add component pusher job to Circle.ci config.

### 1.0.0 (January 28, 2022)

 * Added action `Trigger another flow`.
 * Added trigger `Receive trigger from another flow`.
