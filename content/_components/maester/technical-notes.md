---
layout: component
title: Maester Technical Notes
description: Technical Notes for the Maester Component
icon: maester.png
icontext: Maester Component
category: maester
updatedDate: 2024-10-02
ComponentVersion: 2.0.2
---

## Changelog

### 2.0.2 (September 12, 2024)
* Updated Node.js engine from 16 to 18
* Updated Sailor to 2.7.3
* Bumped maester-client from 4.0.3 to 5.0.3
* Bumped component-commons-library from 3.1.5 to 3.2.0
* Updated the rest of the dependencies to most recent versions


### 2.0.1 (June 07, 2023)

Don't throw an error when updating an object with TTL

### 2.0.0 (May 19, 2023)

* BREAKING CHANGE - Changed output metadata structure. Introduced 2 objects - metaHeaders and searchHeaders
* Fixed the issue when Upsert Object action did not save the search headers in Maester

### 1.0.5 (August 26, 2022)

* Updated maester-client to v4.0.3

### 1.0.4 (August 12, 2022)

* Updated maester-client to v4.0.2

### 1.0.3 (July 29, 2022)

* `Delete Object`: Fix error message when amount of objects found by search criteria is more than 1
* Now, if more than 1 object found by search criteria for `Upsert Object` action - error will be thrown
* Update maester-client to v4.0.0
* Update oih-standard-library to v2.0.3
* Update component-commons-library to v3.0.0
* Update sailor-nodejs to v2.6.29

### 1.0.2 (November 26, 2021)

* Reduced the size of component icon file

### 1.0.1 (August 9, 2021)

* Fix objects count in `Lookup Object` action error message

### 1.0.0 (July 28, 2021)

* Add new actions:

  - `Delete Object`
  - `Lookup Object (at most one)`
  - `Lookup Objects`
  - `Upsert Object
