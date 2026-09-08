---
title: Google Spreadsheets v2 Technical Notes
layout: component
description: Technical Notes for the Google Spreadsheets v2 component
icon: gspreadsheet.png
icontext: Google Spreadsheets component
category: gspreadsheet-v2
updatedDate: 2025-08-06
ComponentVersion: 1.1.1
---

## Changelog

### 1.1.1 (August 06, 2025)

* Updated Sailor to version 2.7.6.
* Updated `@elastic.io/component-commons-library` to version 4.0.0.
* Updated `axios` to version 1.11.0.
* Removed the `elasticio-node` library.

### 1.1.0 (December 4, 2023)

* Added `Get Spreadsheets Row` action (based on the existing trigger `Get Spreadsheet Row`)

### 1.0.3 (July 03, 2023)

* Update Sailor version to 2.7.1
* Fixed issue when component doesn't read `Number of retries` and `Max number of calls per second` from credentials configuration

### 1.0.2 (October 07, 2022)

* Update Sailor version to 2.7.0
* Fixed issue when component doesn't send any data during timeout
* Fixed errors during push to platform - reduced size of metadata

### 1.0.1 (August 12, 2022)

* Now error with `429` status code will be retried (with [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff))
* Now `5xx` errors will be retried with exponential backoff

### 1.0.0 (July 29, 2022)

* Initial release

### Completeness Matrix

[Google Spreadsheets Component Completeness Matrix](https://docs.google.com/spreadsheets/d/1usD_k7NxyiplSEXgttAT9dmpgDNADCED7z4UCoRaAfs/edit#gid=0)
