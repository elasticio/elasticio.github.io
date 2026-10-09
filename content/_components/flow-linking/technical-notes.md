---
title: Flow Linking Technical Notes
layout: component
description: Technical Notes for the Flow Linking component
icon: flow-linking.png
icontext: Flow Linking  component
category: flow-linking
ComponentVersion: 1.2.0
updatedDate: 2026-10-09
---

## Changelog

### 1.2.0 (October 9, 2026)
* Added configurable retry mechanism with Exponential Backoff and Jitter to `Trigger another flow` action:
  * Added `Number of retry attempts` (`retryCount`) configuration field (default: 3, max: 5)
  * Added `Initial delay between retries (in seconds)` (`initialDelay`) configuration field (default: 1s, max: 10s)
  * Added `Retry 404 (Not Found)` (`retryOn404`) checkbox to optionally retry `404 Not Found` responses for eventual consistency workflows
* Added `Do not throw error on failed calls` (`dontThrowErrorOnFailedCalls`) checkbox to `Trigger another flow` action:
  * Emits response payload and `statusCode` on non-2xx HTTP responses without failing the step
  * Emits `statusCode` alongside `result` on successful calls when enabled
* Sorted flow names and IDs alphabetically (case-insensitive) in dynamic metadata dropdowns
* Updated dependencies and platform modernization:
  * `@elastic.io/component-commons-library`: `3.2.0` -> `4.0.3`
  * `elasticio-sailor-nodejs`: `2.7.2` -> `2.7.9`
  * `axios`: `0.27.2` -> `1.20.0`
  * Removed deprecated `elasticio-node` and replaced with local message envelope utility
  * Removed unused `elasticio-rest-node` dependency
* Migrated CI/CD workflows from CircleCI to GitHub Actions

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
