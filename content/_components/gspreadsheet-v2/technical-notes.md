---
title: Google Spreadsheets v2 Technical Notes
layout: component
description: Technical Notes for the  Google Spreadsheets component v2
icon: gspreadsheet.png
icontext: Google Spreadsheets component
category: gspreadsheet-v2
updatedDate: 2023-07-03
ComponentVersion: 1.0.3
---

## Changelog

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

![Completeness Matrix](https://user-images.githubusercontent.com/16806832/181498512-fba88280-5562-448a-aaf0-85a175f1ba18.png)
