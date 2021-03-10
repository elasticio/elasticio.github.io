---
title: Filter Technical Notes
layout: component
description: Technical Notes for the Filter component
icon: filter.png
icontext: Filter component
category: filter
ComponentVersion: 1.1.1
updatedDate: 2021-02-26
redirect_from:
  - /components/filter/changelog.html
---

## Changelog

### 1.1.1 (February 26, 2020)

* Update to sailor 2.6.24

### 1.1.0 (November 15, 2020)

* Add `Metadata To Response` configuration parameter
* Upgrade to sailor 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit

### 1.0.4 (July 3, 2020)

* Fix for `elasticio` key in output message

### 1.0.3 (May 22, 2020)

* Add JSONata expression when error thrown by assertion
* Pass incoming message when filter condition is true
* Update EIO Sailor version to 2.6.7
* Update eslint codestyle check properties

## 1.0.2 (March 23, 2019)

* Add support for new Jsonata expressions `getFlowVariables` and `getPassthrough`

### 1.0.1 (December 23, 2019)

* Update sailor to version 2.5.4

### 1.0.0 (November 11, 2019)

* Use `@elastic.io/component-commons-library` instead of `@elastic.io/jsonata-moment` for JSONata transform
* Update to use JSONata version 1.7.0
