---
title: SugarCRM Technical Notes
layout: component
description: Technical Notes for the SugarCRM component.
icon:  sugarcrm.png
icontext: SugarCRM component
category: sugarcrm
updatedDate: 2020-11-10
ComponentVersion: 1.1.3
redirect_from:
  - /components/sugarcrm/changelog.html
---

## Changelog

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
