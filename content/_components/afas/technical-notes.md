---
title: AFAS component Technical Notes
layout: component
description: Technical Notes for the AFAS Component.
icon: afas.png
icontext: AFAS component
category: afas
ComponentVersion: 2.2.0
updatedDate: 2025-05-07
---

## Changelog

### 2.2.0 (May 07, 2025)
* Added an option which adds the request body to the response message body. This option has been applied to the following actions:
  * Make Raw Request
  * Upsert Object

### 2.1.0 (April 23, 2025)
* Added an option which allows errors occurring in the component emitting as a regular message instead of throwing as an error. This option has been applied to the following actions:
  * Make Raw Request
  * Upsert Object
* Update Node version from 18 to 20

### 2.0.3 (April 10, 2025)
* Enabled CircleCI
* `Sailor` bumped from 2.7.2 to 2.7.5
* `component-commons-library` bumped from 3.2.0 to 3.2.2
* `axios` bumped from 1.8.4

### 2.0.2 (November 21, 2024)
* Fixed Unified identifier handling for `Upsert Object` Action

### 2.0.1 (July 30, 2024)
* Added `Integration Id` field in credentials section

### 2.0.0 (April 18, 2024)
* Breaking changes in `Get New and Updated Objects Polling` trigger:
  * Polling logic changed: component will use maximum timestamp from the results of the last polling as date to poll new records instead last execution date
  * Implemented using hashes to avoid batch duplicates (there still may be duplicates of records if they in different batches)
  * Removed config field `Convert dates in request from UTC to CET/CEST`
  * Removed config field `Time zone fix`
  * Added config field `Subtract seconds from last maximum date`

### 1.2.0 (April 03, 2024)
* Changes in `Get New and Updated Objects Polling` trigger:
  * "Time stamp field to poll on" changed to multi-select type
  * Added new field "Convert dates in request from UTC to CET/CEST"
* Added `Don't retry 500 errors with 'externalMessage'` checkbox in configuration 

### 1.1.0 (March 07, 2024)
* Added retry configuration in credentials section
* Added `Convert dates in fields` in configuration for `Get New and Updated Objects Polling` trigger and `Upsert Object` action
* Removed Object creation in case of failure update in `Upsert Object` action

### 1.0.0 (December 07, 2023)
* Added `Get New and Updated Objects Polling` Trigger
* Added `Make Raw Request` Action
* Added `Upsert Object` Action
* Initial component release