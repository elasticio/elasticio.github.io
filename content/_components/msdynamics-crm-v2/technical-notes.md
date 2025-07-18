---
title: Microsoft Dynamics CRM v2 Technical Notes
layout: component
description: Technical Notes for the Microsoft Dynamics CRM v2 component
icon:  msdynamics-crm-v2.png
icontext: Microsoft Dynamics CRM v2 component
category: msdynamics-v2
updatedDate: 2025-07-17
ComponentVersion: 1.3.0
---

## Changelog

### 1.3.0 (July 17, 2025)

* Added new `Lookup Objects (plural)` action, the old one is now deprecated. Main differences:
  * The new action supports a dynamic list of Object Types.
  * **Emit Behavior**: The `Emit page` configuration now emits all pages.

### 1.2.4 (March 21, 2025)

* Fixed verify credentials fail without API version in URL
* Updated the `Node` engine to version 20.x.
* Updated the `Sailor` version to 2.7.5
* Updated the `component-commons-library` version to 3.2.2

### 1.2.3 (May 19, 2023)

* Added titles to output metadata for `Lookup` actions and `Get New and Updated Objects Polling` trigger

### 1.2.2 (May 10, 2023)

* Fixed output metadata for `Get New and Updated Objects Polling` Trigger
* Fixed verify credentials fails

### 1.2.1 (February 15, 2023)

* Fixed input and output metadata for `Upsert Object` Action

### 1.2.0 (February 01, 2023)

* Added `Upsert Object` Action
* Update sailor version to 2.7.1

### 1.1.0 (September 23, 2022)

* Added `Get New and Updated Objects Polling` Trigger
* Added `Lookup Objects (plural)` Action
* Added `Lookup Object (at most one)` Action
* Added `Delete Object By ID` Action
* Added `Extract Raw System Metadata` Action

### 1.0.0 (September 09, 2022)

* Added `Make Raw Request` Action
* Initial component release
