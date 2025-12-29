---
title: ID Linking Technical Notes
layout: component
description: Technical Notes for the ID Linking component
icon: id-linking.png
icontext: ID Linking component
category: id-linking
updatedDate: 2025-12-22
ComponentVersion: 1.3.0
---

## Changelog

### 1.3.0 (December 22, 2025)

* Updated `@elastic.io/component-commons-library` to `4.0.0`
* Updated `@elastic.io/maester-client` to `6.0.0`
* Updated `elasticio-sailor-nodejs` to `2.7.7`
* Implemented retry mechanism for Maester API calls
* Fixed JSON parsing error when looking up objects in Maester
* Improved test coverage and refactored tests to remove nock dependency

### 1.2.0 (November 24, 2022)

* Added Delete Object action
* Updated Sailor to 2.7.1

### 1.1.0 (June 08, 2022)

* Added `Write Entire Bucket Contents` Action
* Added `Read Entire Bucket Contents` Action
* Fix label names for `Upsert Object` input metadata

### 1.0.2 (November 26, 2021)

* Reduced the size of component icon file

### 1.0.1 (July 9, 2021)

* Update Sailor to 2.6.26
* Update Maester client library to 3.3.0

### 1.0.0 (June 25, 2021)

* Initial release
* Add new actions:
- `Lookup Object By Id`
- `Upsert Object By Id`
