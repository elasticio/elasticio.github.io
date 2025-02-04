---
title: Salesforce Technical Notes
layout: component
description: Technical Notes for Salesforce Component.
icon: salesforce.png
icontext: Salesforce component
category: salesforce
updatedDate: 2025-01-31
ComponentVersion: 2.8.6
redirect_from:
  - /components/salesforce/completeness-matrix.html
  - /components/salesforce/changelog.html
---

## Changelog

### 2.8.6 (January 31, 2025)

* Upgrade Sailor version to 2.7.4
* Enhanced error message text in the `Raw Request` action

### 2.8.5 (November 07, 2024)

* Fixed issues in `Get New and Updated Objects Polling` trigger:
  * Emit only one batch of messages if results are more than 10000
  * Error `Cannot read properties of undefined (reading 'LastModifiedDate')` if you used and delete `Size of Polling Page` value

### 2.8.4 (July 11, 2024)

* Attempt to fix error `The Replay ID validation failed` when `Subscribe to PubSub` trigger does't emit messages more than three days
* Update Sailor version to 2.7.2
* Update component-commons-library version to 3.2.0

### 2.8.3 (March 01, 2024)

* The component interface has not changed. This is a technical enhancement! Introduced baseURL parameter in the Raw Request Action's configuration of the axios library. Refer to the documentation for the details.
It will not affect any of the existing integration. Instead, it gives more flexibility allowing to call other REST endpoints than the standard `/services/data`

### 2.8.2 (February 02, 2023)

* Fixed bug when component didn't use `replayId` after error in `Subscribe to PubSub` trigger

### 2.8.1 (December 29, 2023)

* Fixed duplicate retries and added exponential backoff in `Subscribe to PubSub` trigger

### 2.8.0 (December 15, 2023)

* Added new `Subscribe to PubSub` trigger

### 2.7.3 (November 30, 2023)

* Fixed issue when real-time flows have authentication errors sometimes

### 2.7.2 (September 28, 2023)

* Improvements in `Subscribe to platform events` trigger:
  * fixed duplicates retries on connections lost
  * fixed incorrect behavior with AuthFailure

### 2.7.1 (September 21, 2023)

* Improvements in `Subscribe to platform events` trigger:
  * Added retry on connections lost
  * Changed the behavior where new logs would appear in the first execution regardless of which message they belonged to. Now, all messages will be displayed in their appropriate execution
* Logs with `Going to fetch secret` set to debug level


### 2.7.0 (June 29, 2023)

Added support for  files attachment by providing a URL in the body for all actions where it is used

### 2.6.0 (June 09, 2023)

Added `Don't emit on empty results` checkbox in `Query` trigger

### 2.5.1 (January 31, 2023)

* Fixed issue with `431` and `414` errors in `Get Updated Objects Polling` trigger
* New configuration field `Selected Fields`in `Get Updated Objects Polling` trigger added

### 2.4.2 (November 18, 2022)

* Improved error handling in `Lookup Objects` action

### 2.4.1 (October 07, 2022)

* Fixed loop issue when records equal to `Size of Polling Page` and have same `LastModifiedDate` in `Get Updated Objects Polling` trigger
* Update Sailor version to 2.7.0

### 2.4.0 (August 30, 2022)

* New `Get New and Updated Objects Polling` trigger, old one set to deprecated
* Update Sailor version to 2.6.29
* Get rid of vulnerabilities in dependencies
* Update component-commons-library version to 3.0.2

### 2.3.0 (June 17, 2022)

* Added new `Type Of Search` - `External IDs` to `Upsert Object` action
* Implemented caching for metadata in `Upsert Object` action (metadata needs to find fields that contain attachment)
* Small fixes

### 2.2.4 (June 03, 2022)

* Added timeout for `Upsert Object` action

### 2.2.3 (April 14, 2022)

* Bump dependencies

### 2.2.2 (April 08, 2022)

* Implemented reconnect logic on errors
* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config

### 2.2.1 (December 1, 2021)

* Upgrade sailor version to 2.6.26
* Reduced the size of component icon file
* Fix output metadata for `Get New and Updated Objects Polling` trigger
* Fix output metadata for `Lookup Objects` action

### 2.2.0 (August 20, 2021)

* New `Upsert Object` action
* Old `Upsert Object` action is deprecated
* `Get New and Updated Objects Polling` trigger updated:
 - Default size of pages to be fetched changed from `1000` to `10000`
 - Restriction `maxFetch should be maximum 10000 objects` is removed

### 2.1.0 (August 10, 2021)

* New `Raw Request` action

### 2.0.3 (November 18, 2020)

* Fix fields dependencies from subject field in component.json

### 2.0.2 (October 30, 2020)

* Update sailor version to 2.6.18

### 2.0.1 (October 23, 2020)

* Update sailor version to 2.6.17

### 2.0.0 (October 2, 2020)

* First commit of v2 branch.

### 1.3.9 (April 08, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config

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
