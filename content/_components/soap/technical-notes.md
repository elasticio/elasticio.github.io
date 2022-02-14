---
title: SOAP Technical Notes
layout: component
description: Technical Notes for the SOAP component.
icon: soap.png
icontext: SOAP component
category: soap
updatedDate: 2022-02-11
ComponentVersion: 1.2.7
redirect_from:
  - /components/soap/completeness-matrix.html
  - /components/soap/changelog.html
---

## Changelog

## # 1.2.7 (February 11, 2022)

* Add configuration field `Request timeout` for `Call` action: timeout period in milliseconds (1-1140000) while component waiting for server response. Defaults to 60000 (60 sec).

### 1.2.6 (October 15, 2021)

* Update Sailor version to 3.3.6
* `Call` action: add an option to emit a platform message instead of throwing an exception in case of a SOAP fault

### 1.2.5 (December 18, 2020)

* Update Sailor version to 3.3.1
* Annual audit of the component code to check if it exposes sensitive data in the logs

### 1.2.4 (July 24, 2020)

* Fix bug for some cases with WSDL behind basic auth  

### 1.2.3 (June 22, 2020)

* Remove the job which updates docs on code changes

### 1.2.2 (May 29, 2020)

* Replace weight in component.json with order

### 1.2.1 (May 7, 2020)

* Fix component.json field order
* Fix component.json descriptions and links
* Add basic authorization support to Call action
* Improved SOAP Body parsing

### 1.2.0 (September 25, 2019)

* Add Soap Reply action
* Add Receive SOAP Request trigger

### 1.1.0 (May 20, 2019)

#### Call action

* Optimize memory consumptions, refactor code and tests.

* Add circle ci status badge.

## Completeness Matrix

Here is a SOAP Component Completeness Matrix:

![soap component completeness Matrix](https://user-images.githubusercontent.com/36419533/65602890-eddfab80-dfa4-11e9-8d76-bd758aafa403.png)
