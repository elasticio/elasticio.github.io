---
title: Hubspot Technical Notes
layout: component
description: Technical Notes for the Hubspot component
icon: hubspot.png
icontext: Hubspot component
category: hubspot
updatedDate: 2022-10-07
ComponentVersion: 1.5.4
---

## Changelog

### 1.5.4 (October 07, 2022)

* Update Sailor version to 2.6.29
* Get rid of vulnerabilities in dependencies
* Update component-commons-library version to 3.0.2

### 1.5.3 (September 23, 2022)

* Fix `Verify` for credentials

### 1.5.2 (April 13, 2022)

* Fix uploading attachment

### 1.5.1 (April 08, 2022)

* Fixed limit 10000 records for `Get New and Updated Objects` trigger
* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config

### 1.5.0 (February 11, 2022)

- Added metadata information to `Get New and Updated Objects` trigger

### 1.4.1 (December 22, 2021)

- Fix bug with attachments uploading in `Upsert` action

### 1.4.0 (December 10, 2021)

- Reduced the size of component icon file
- Added support for File Custom Fields in `Upsert` action
- Added option `Enable download attachments` to actions: `Lookup Objects`, `Lookup Object', 'Lookup Set of Objects`

### 1.3.1 (November 12, 2021)

- Minor fix

### 1.3.0 (November 12, 2021)

- Added actions:
  - `Lookup Objects (Plural)`
  - `Create associations`
  - `Remove associations`
  - `Delete Object`

- Added triggers:
  - `Webhook`

### 1.2.0 (October 29, 2021)

- Added actions:
  - `Lookup Object (at most one)`
  - `Upsert`

### 1.1.0 (October 15, 2021)

- Added `Get New and Updated Objects` trigger

### 1.0.0 (October 1, 2021)

- Added `Raw Request` action

## Completeness Matrix

Here is the Hubspot Component Completeness Matrix.

![Hubspot Component Completeness Matrix](https://user-images.githubusercontent.com/30211658/137831852-a998bf9e-52e6-4b19-9db7-d8e9e9f206e3.PNG)
