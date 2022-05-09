---
title: CSV Technical Notes
layout: component
description: Technical Notes for the CSV component.
icon: csv.png
icontext: CSV component
category: csv
updatedDate: 2022-04-22
ComponentVersion: 3.1.3
redirect_from:
  - /components/csv/changelog.html
---

## Changelog

### 3.1.3 (April 22, 2022)

* Fix a bug when emit strategy 'Emit Batch' did not process correctly

### 3.1.2 (April 14, 2022)

* Update `component-commons-library` to read and upload attachments through `Maester`
* Update `elasticio-sailor-nodejs` to v2.6.27
* Fix dependencies

### 3.1.1 (March 15, 2022)

* Added component pusher build script

### 3.1.0 (March 3, 2022)

* Added `Emit Batch` behavior for `Read CSV attachment` action

### 3.0.0 (July 9, 2021)

* Deleted trigger:  
  - `Read CSV attachment`
* Deleted actions:
  - `Write CSV attachment`
  - `Write CSV attachment from JSON Array`
  - `Write CSV attachment from JSON Object`
  - `Read CSV file from URL`

* Add New actions:
  - `Read CSV attachment`
  - `Create CSV From Message Stream`
  - `Create CSV From JSON Array`

* Removed old dependencies


### 2.2.1 (April 08, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config

### 2.2.0 (April 23, 2021)

* Add pipe to list of separators in `Write CSV attachment from JSON Array` and `Write CSV attachment from JSON Object` actions
* Bump dependencies

### 2.1.7 (March 12, 2021)

* Add support for reading a file from a remote URL in Read CSV attachment action
* Update Sailor version to 2.6.24

### 2.1.6 (January 4, 2021)

* Fix bug with Write From Array and multiple messages
* Bump node version to 14
* Bump dependencies

### 2.1.5 (October 30, 2020)

Upgrade to sailor 2.6.18

### 2.1.4 (August 21, 2020)

Minor asynchronicity improvement.

### 2.1.3 (June 5, 2020)

* Fix `timeout is not a function` bug

### 2.1.2 (May 22, 2020)

* Update sailor version to 2.6.7

### 2.1.1 (May 7, 2020)

* Add input metadata for objects processing
* Add the steward URL to the body of the outgoing message

### 2.1.0 (April 22, 2020)

* Add "Write CSV attachment from Array" action
* Add "Write CSV attachment from JSON" action
* Update sailor version to 2.6.5

### 2.0.2 (December 24, 2019)

* Update sailor version to 2.5.4
* Update component to use logger
* Update buildType to docker
* Fixed bug with invalid path to read action

### 2.0.1 (October 10, 2019)

* Hotfix Action path

### 2.0.0 (October 3, 2019)

* Remove generators, improve eslint

### 1.1.6 (September 10, 2019)

* Migrate from TravisCI to CircleCI

### 1.1.5 (July 15, 2019)

* Add retries mechanism to all request, refactor component to use axios library

### 1.1.4 (June 27, 2019)

* Added emitAll feature for CSV Write action

### 1.1.3 (October 31, 2017)

* Make CSV Write dynamic configuration

### 1.1.2 (September 21, 2017)

* Supporting startRow option

### 1.1.1 (June 18, 2017)

* Updated sailor to 2.1.3

### 1.1.0 (June 8, 2017)

* Added new CSV Write action

### 1.0.1 (January 7, 2016)

* Updated sailor to 1.1.0

### 1.0.0 (November 3, 2015)

* Initial release
