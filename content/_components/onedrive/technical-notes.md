---
title: Microsoft OneDrive Technical Notes
layout: component
description: Technical Notes for the Microsoft OneDrive component
icon: onedrive.png
icontext: Microsoft OneDrive component
category: onedrive
ComponentVersion: 2.0.0
updatedDate: 2023-05-19
redirect_from:
  - /components/onedrive/completeness-matrix.html
  - /components/onedrive/changelog.html
---

## Changelog

### 2.0.0 (May 19, 2023)

* New version of component, no backward compatibility! Written from scratch using TS and last versions of libraries
* New authentication mechanism
* Added retries on server errors
* Added retries on 429 (too many requests) errors
* Attachment URL provided directly in messages
* Added support for uploading large files to OneDrive
* Updated ReadMe

### 1.0.6 (September 23, 2022)

* Update Sailor version to 2.6.29
* Get rid of vulnerabilities in dependencies
* Update component-commons-library version to 3.0.2
* Update oih-standard-library version to 2.0.3

### 1.0.5 (April 14, 2022)

* Update `component-commons-library` to read and upload attachments through `Maester`
* Update `elasticio-sailor-nodejs` to v2.6.27
* Fix dependencies

### 1.0.4 (November 26, 2021)

* Upgrade sailor version to 2.6.26
* Reduced the size of component icon file

### 1.0.3 (March 25, 2021)

* Update sailor version to `2.6.24`

### 1.0.2 (October 30, 2020)

* Update sailor version to `2.6.18`
* Annual audit of the component code to check if it exposes a sensitive data in the logs

### 1.0.1 (August 4, 2020)

* Adapt Polling Trigger to account for the fact that OrderBy is not supported in One Drive for Business
* Polling trigger handles cases where there are more than 200 matching files
* Limit parallelization of writing to steward in polling trigger
* Polling trigger correctly sorts items by timestamp
* Update dependencies. Sailor is updated to version `2.6.14`
* Fix integration tests

### 1.0.0 (March 26, 2020)

* Create Get New And Updated Files Polling Trigger
* Create Upsert File Action
* Create Create Folder Action
* Create Get File Action
* Create Delete File Action
