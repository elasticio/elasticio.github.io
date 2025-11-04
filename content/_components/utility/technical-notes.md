---
layout: component
title: Utility Technical Notes
description: Technical Notes for the Utility сomponent.
icon: utility.png
icontext: Utility сomponent
category: utility
updatedDate: 2025-09-16
ComponentVersion: 1.8.0
redirect_from:
  - /components/utility/changelog.html
---

## Changelog

### 1.8.0 (September 16, 2025)

* Added `Get file metadata` action
* Bumped sailor to `2.7.6`
* Bumped @elastic.io/component-commons-library to `4.0.0`

### 1.7.0 (July 18, 2024)

* Added `Create named time values` checkbox to `Convert Between Timezones` action
* Bumped sailor to `2.7.5`
* Bumped @elastic.io/component-commons-library to `3.2.2`

## 1.6.1 (December 12, 2024)

* Added options to decode data as either plain text or binary to the `String to Attachment` action
* Moved to Node.js `20`
* Bumped sailor to `2.7.4`
* Bumped @elastic.io/component-commons-library to `3.2.1`
* Bumped a bunch of development dependencies to the recent versions
* Got rid of a few usused packages and functions

### 1.6.0 (March 01, 2024)

* Improvements in Log Message action:
  * Added Log without formatting checkbox to configuration.
  * Added Message to log object to input metadata.
  * Fixed issue with incorrect logs when message is above 256000 bytes.

### 1.5.3 (November 04, 2022)

* Update Sailor version to 2.7.1
* Fix issue where action `String From Attachment` don't work properly

### 1.5.2 (September 23, 2022)

* Update Sailor version to 2.6.29
* Get rid of vulnerabilities in dependencies
* Update component-commons-library version to 3.0.1
* Update output metadata for `String To Attachment` action

### 1.5.1 (September 2, 2022)

* Nothing actually changed. A blank release to fix an issue with the component pusher

### 1.5.0 (June 08, 2022)

* Added `Network Diagnostics` action

### 1.4.1 (April 13, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config
* Update component-commons-library version to 2.0.1

### 1.4.0 (January 14, 2022)

* Add New action: `Log Message`
* Add New action: `Create JSON Patch`
* Add New action: `Apply JSON Patch`
* Bump dependencies

### 1.3.0 (July 23, 2021)

* Add New action: `Delay`
* Update sailor version to 2.6.26
* Update buildType to docker

### 1.2.2 (February 12, 2021)

* Update sailor version to 2.6.24

### 1.2.1 (January 15, 2021)

* Update sailor version to 2.6.23

### 1.2.0 (November 20, 2020)

* Update all dependencies
* Allow attachment information to be handled by the body

### 1.1.5 (October 27, 2020)

* Update sailor version to 2.6.18
* Fix unit tests

### 1.1.4 (October 21, 2020)

* Update sailor version to 2.6.17

### 1.1.3 (September 25, 2020)

* Annual audit of the component code to check if it exposes a sensitive data in the logs

### 1.1.2 (July 24, 2020)

* Update sailor version to 2.6.14
* Downgrade node: 14.5.0

### 1.1.1 (May 19, 2020)

* Update sailor version to 2.6.7

### 1.1.0 (May 6, 2020)

* Add action for converting timezones
* Bump dependencies

### 1.0.0 (July 25, 2019)

* Initial release

* New actions:

  - String to  Attachment
  - Attachment to String
  - Base64 Decode
  - Base64 Encode
