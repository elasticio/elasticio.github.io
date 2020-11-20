---
title: Salesforce Technical Notes
layout: component
description: Technical Notes for Salesforce Component.
icon: salesforce.png
icontext: Salesforce component
category: salesforce
createdDate: 2020-01-02
updatedDate: 2020-10-30
redirect_from:
  - /components/salesforce/completeness-matrix.html
  - /components/salesforce/changelog.html
---

## Changelog

## 2.0.3 (November 18, 2020)

* Fix fields dependencies from subject field in component.json

### 2.0.2 (October 30, 2020)

* Update sailor version to 2.6.18

### 2.0.1 (October 23, 2020)

* Update sailor version to 2.6.17

### 2.0.0 (October 2, 2020)

* First commit of v2 branch.

### 1.3.7 (October 30, 2020)

Upgrade to sailor 2.6.18

### 1.3.6 (October 8, 2020)

Component version 1 got deprecated.

### 1.3.5 (August 21, 2020)

* Update `Bulk Create/Update/Delete` action:
   - now it supports `Bulk Upsert` feature
   - fix bug `404 - File's metadata is not found`

### 1.3.4 (May 8, 2020)

* Hotfix: removed `Max Fetch Count` field from Query trigger, as it does not work

### 1.3.3 (May 8, 2020)

* Fix bug with 1,000 objects limit in actions:
  - Query
  - Lookup Object
  - Lookup Objects

  and trigger:
  - Get New and Updated Objects Polling.

New configuration field `Max Fetch Count` added to configure the limit.

### 1.3.2 (March 26, 2020)

* Add new optional field `Include linked objects` in trigger: `Get New and Updated Objects Polling`

### 1.3.1 (March 11, 2020)

* Add new optional field `Output method` in triggers: `Query` and `Get New and Updated Objects Polling`

### 1.3.0 (February 27, 2020)

* Add Delete Object (at most 1) Action
* Add new optional field in the Lookup Object Action

### 1.2.3 (February 4, 2020)

* Fix query action

### 1.2.2 (January 25, 2020)

* Add request caching for lookup actions

### 1.2.1 (December 27, 2019)

* Update sailor version to 2.5.4
* Refactor console.log to built in sailor logger
* Change build type to `docker`

### 1.2.0 (December 2, 2019)

* Add support for `Bulk operations` feature (Create/Update/Delete and Query)
* Add `Delete Object` action
* Add `Lookup Objects` action
* `Create object` action: add ability to utilize binary data attachment from previous step
* `Upsert object` action: add ability to utilize binary data attachment from previous step
* `Lookup Object (at most 1)` action: add ability to pass binary data (if found object has it) to the next component as a binary attachment
* `Query` action: add ability to query deleted objects

### 1.1.2 (October 28, 2019)

* Change Oauth values naming

### 1.1.1 (July 10, 2019)

* Add support for `Create Attachment` feature
* Fix bug with Salesforce's and platform's types mismatch
* Make unit tests great again (internal issue)

### 1.0.0 (June 27, 2019)

* Initial release which includes a bunch of previous unversioned releases

## Completeness Matrix

### Matrix version 2.0.0

Here is the Completeness Matrix for the Salesforce component from version 2.

![Salesforce component Completeness Matrix](https://user-images.githubusercontent.com/16806832/93742890-972ca200-fbf7-11ea-9b7c-4a0aeff1c0fb.png)

### Matrix version 1.3.5

Here is the Completeness Matrix for the Salesforce component up to version 2.

![Salesforce component completness Matrix](https://user-images.githubusercontent.com/36419533/75436046-9a5ef880-595c-11ea-838f-32660c119972.png)
