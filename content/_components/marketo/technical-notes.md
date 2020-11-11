---
title: Marketo Technical Notes
layout: component
description: Technical Notes for for the Marketo component.
icon: marketo.png
icontext: Marketo component
category: marketo
createdDate: 2018-03-02
updatedDate: 2020-11-10
redirect_from:
  - /components/marketo/completeness-matrix.html
  - /components/marketo/changelog.html
---

## Changelog

### 2.2.2 (November 6, 2020)

* Upgrade to sailor 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit

### 2.2.1 (June 19, 2020)

* Fix bug when query string exceeds 8K characters
* More clearly report HTTP level failures
* Component updated to use Node v14 and the dependencies are updated
* The component logo was updated.

### 2.2.0 (May 21, 2020)

* Add `Lookup Object (at most 1)` action
* Add `Delete Object By Unique Criteria` action

### 2.1.0 (May 8, 2020)

* Add `Get New Activities Polling` trigger
* Add `Get New Leads Polling` trigger
* Add `Upsert Objects` action
* Fix `Lookup Activities` bug in case of empty response
* Add `Bulk Import` action
* Add `Bulk Extract` action
* Add `Poll Bulk Extract Results` trigger

### 2.0.0 (April 23, 2020)

* Add `Lookup Objects` action
* Add `Lookup Activities` action
* Add `Describe Object` action
* Add `List Custom Objects` action

### 1.0.0 (March 2, 2018)

* Initial release

## Completeness Matrix

Here is the Marketo Component Completeness Matrix.

![Marketo Component Completeness Matrix](https://user-images.githubusercontent.com/16806832/82535315-5fc9be00-9b4f-11ea-8cb4-5c786d0c3f6d.png)
