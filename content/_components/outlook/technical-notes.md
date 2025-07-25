---
title: Outlook Technical Notes
layout: component
description: Technical Notes for Microsoft Outlook Component.
icon: outlook.png
icontext: Outlook component
category: outlook
updatedDate: 2025-07-22
ComponentVersion: 2.1.1
redirect_from:
  - /components/outlook/changelog.html
  - /components/outlook/completeness-matrix.html
---

## Changelog

## 2.1.1 (July 22, 2025)

* Slightly improved error handling
* Updated Sailor 2.7.1 -> 2.7.5
* Updated axios 1.4.0 -> 1.10.0
* Updated @elastic.io/component-commons-library 3.1.5 -> 3.2.2

### 2.1.0 (August 04, 2023)

* Added checkbox `Get Attachment` to `Poll for New Mail` trigger
* Added metadata field `Attachments` to `Send Mail` action

### 2.0.0 (July 19, 2023)

* Breaking change! Reworked authentication mechanism - implemented Secrets feature
* Add new action - Send Mail

### 1.0.3 (April 07, 2023)

* Fixed version mismatch

### 1.0.2 (November 27, 2020)

* Update Sailor version to 2.6.19
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit

### 1.0.0 (July 29, 2020)

* Use this.logger functionality instead of console.log
* Update libs to latest versions
* Update sailor to 2.6.14 version
* Add `Poll for New Mail` trigger
* Add `Move Mail` action

### 0.0.3 (July 6, 2017)

* Initial release

## Completeness Matrix

Here is the Completeness Matrix for the Outlook component.

![Completeness Matrix for the Outlook component](https://user-images.githubusercontent.com/16806832/88404425-8a95f400-cdd6-11ea-8712-127d526efbf9.png)
