---
layout: component
title: Maester Technical Notes
description: Technical Notes for the Maester Component
icon: maester.png
icontext: Maester Component
category: maester
updatedDate: 2022-07-29
ComponentVersion: 1.0.3
---

## Changelog

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
