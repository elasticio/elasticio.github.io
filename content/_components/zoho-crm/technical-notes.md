---
layout: component
title: Zoho CRM Technical Notes
description: Technical Notes for the Zoho CRM component.
category: zoho-crm
icon: zoho-crm.png
icontext: Zoho CRM component
ComponentVersion: 1.3.9
updatedDate: 2024-11-07
---

## Changelog

### 1.3.9 (November 07, 2024)

* Fix the metadata generation bug in the Get New and Updated Objects trigger. Metadata fields having no `json_type` field coming from the API, will be be default generated as `string`
* Search values in the Lookup Set Of Objects By Unique Criteria action are made `encodeURIComponent` encoded
* Bumped sailor from 2.6.29 to 2.7.3
* Bumped component-commons-library from 3.0.2 to 3.2.1

### 1.3.8 (March 16, 2023)

* Fix bug in Lookup objects (plural) action. An empty array `results` will be emitted when no objects are found

### 1.3.7 (March 15, 2023)

* Fix bug where search criteria does not work properly in the Lookup Objects Plural action

### 1.3.6 (November 24, 2022)

* Fix verify credentials

### 1.3.5 (September 09, 2022)

* Update Sailor version to 2.6.29
* Get rid of vulnerabilities in dependencies
* Update component-commons-library version to 3.0.2
* Update oih-standard-library version to 2.0.3

### 1.3.4 (June 03, 2022)

* Fix attachment processing
* Set node engine to 16.x (fix error with "Verify Credentials")
* Added ENV `MAX_FILE_SIZE` to control attachment size limit
* Upgrade `component-commons-library` to v2.1.0

### 1.3.3 (May 23, 2022)

* Add `version` field to the component.json file

### 1.3.2 (April 13, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config
* Update component-commons-library version to 2.0.1

### 1.3.1 (February 14, 2022)

* Added output metadata for `Get New and Updated Objects` trigger

### 1.3.0 (November 26, 2021)

- Added support for Attachments in `Lookup Object (at most one)`,  `Lookup objects (plural)`, `Upsert request` actions
- Reduced the size of component icon file

### 1.2.0 (November 12, 2021)

- Added `Lookup objects (plural)` action
- Added `Delete object` action

### 1.1.0 (October 29, 2021)

- Added `Get New and Updated Objects` trigger
- Added actions:
  - `Upsert`
  - `Lookup object (at most one)`
  - `Lookup Set Of Objects By Unique Criteria`

### 1.0.0 (October 15, 2021)

- Added `Raw request` action

## Completeness Matrix

Here is the Completeness Matrix for the Zoho CRM component:

![Completeness Matrix](https://user-images.githubusercontent.com/30211658/142396645-e592d8d3-e897-4be8-9ec7-97c08497e6f2.png)
