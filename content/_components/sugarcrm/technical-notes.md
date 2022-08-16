---
title: SugarCRM Technical Notes
layout: component
description: Technical Notes for the SugarCRM component.
icon:  sugarcrm.png
icontext: SugarCRM component
category: sugarcrm
updatedDate: 2022-08-12
ComponentVersion: 1.1.6
redirect_from:
  - /components/sugarcrm/changelog.html
---

## Changelog

### 1.1.6 (August 12, 2022)

* Added `email1` and `email2` fields for metadata of `Contacts` module in `Upsert Action`
* Updated Circle.ci config
* Updated sailor-nodejs to v2.6.29
* Get rid of vulnerabilities

### 1.1.5 (November 26, 2021)

* Added metadata where it was missing

### 1.1.4 (November 26, 2021)

* Upgrade sailor version to 2.6.26
* Reduced the size of component icon file

### 1.1.3 (November 6, 2020)

* Upgrade to sailor 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit
* Fix bug: `Verify` credentials button does not really verify credentials
* Fix exception, emit called without await

### 1.1.2 (October 6, 2020)

* Annual audit of the component code to check if it exposes a sensitive data in the logs.

### 1.1.0 (December 25, 2019)

* Add support for `Bulk operations` (Create/Update/Delete)
* Add `Lookup Objects` action
* Add `Query` action
* `Upsert Entry` action: add ability to utilize binary data attachment from previous step
* `Lookup Object` action: add ability to pass binary data (if found object has it) to the next component as a binary attachment

### 1.0.0 (November 3, 2016)

* Initial release of guideline compliant component
