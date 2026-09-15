---
layout: component
title: Creatio Technical Notes
description: Technical Notes for Creatio component.
icon: creatio.png
icontext: Creatio component
category: creatio
ComponentVersion: 1.1.0
updatedDate: 2026-09-14
---

## Changelog

### 1.1.0 (September 14, 2026)

* Set Node.js environment to 24.x
* Update dependencies to their latest major-compatible versions:
  * `@elastic.io/component-commons-library`: `4.0.0` -> `4.0.3`
  * `elasticio-sailor-nodejs`: `2.7.7` -> `2.7.9`
  * `axios`: `1.12.2` -> `1.20.0`
  * `fast-xml-parser`: `5.3.2` -> `5.11.1`
* Ensure alphabetical sorting (case-insensitive) across dynamic select models and schema properties

### 1.0.0 (December 15, 2025)

* Added `Delete Object By ID` Action
* Added `Get New and Updated Objects Polling` Trigger
* Added `Lookup Object By ID` Action
* Added `Lookup Objects (plural)` Action
* Added `Make Raw Request` Action
* Added `Upsert Object` Action
* Initial component release