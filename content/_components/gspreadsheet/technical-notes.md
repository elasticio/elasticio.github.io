---
title: Google Spreadsheets Technical Notes
layout: component
description: Technical Notes for Google Spreadsheets component.
icon: gspreadsheet.png
icontext: Google Spreadsheets component
category: gspreadsheet
updatedDate: 2021-11-26
ComponentVersion: 2.0.1
redirect_from:
  - /components/gspreadsheet/completeness-matrix.html
  - /components/gspreadsheet/changelog.html
---

## Changelog

### 2.0.1 (November 26, 2021)

* Upgrade sailor version to 2.6.26

### 2.0.0 (October 30, 2020)

* Remove deprecated actions
* Upgrade to sailor 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs

### 1.2.2 (September 6, 2020)

* Add request rate limits handling

### 1.2.1 (June 16, 2020)

* Change OAuth variables naming
* Improve documentation

### 1.2.0 (June 5, 2020)

* Update sailor to 2.6.9
* Update metadata for add row action
* Remove update docs on deploy script

### 1.1.2 (December 30, 2019)

* Update sailor version to 2.5.4
* Refactor console log to built in sailor logger
* Change build type to `docker`

### 1.1.1 (October 1, 2019)

* Change `New Spreadsheet Row` trigger response types to `UNFORMATTED_VALUE`

### 1.1.0 (June 24, 2019)

* Add `Create new Spreadsheet` action
* Add `Add Spreadsheet Row` action
* Add `New Spreadsheet Row` trigger

> Using Google SDK based on API v4 for new actions and triggers

### 1.0.0 (March 15, 2019)

* Initial release

## Completeness Matrix

Google Spreadsheet Component Completeness Matrix:

![Completeness Matrix](https://user-images.githubusercontent.com/8449044/66487235-a2ed8a00-eab4-11e9-9166-c850f7f6d491.png)
