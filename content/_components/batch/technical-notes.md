---
title: Batch Technical Notes
layout: component
description: Technical Notes for the Batch component
icon: batch.png
icontext: Batch component
category: batch
updatedDate: 2020-11-20
ComponentVersion: 1.0.0
redirect_from:
  - /components/batch/changelog.html
---

## Changelog

### 1.0.0 (November 15, 2020)

* Credentials verify minor fix

### 0.0.6 (November 15, 2020)

* Fix MongoError: Authentication failed by authSource
* Upgrade to sailor 2.6.18
* Update batching-library version
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit

### 0.0.5 (July 31, 2020)

* Update Sailor to 2.6.14
* Update node to v 14.5.0
* Add option `Delete Batch After Retrieval` for trigger `Get ready batches`

### 0.0.4 (May 22, 2020)

* Update Sailor to 2.6.7

### 0.0.3 (March 3, 2020)

* Fix bug with verify credentials
* Update node to v 12
* Update sailor to v 2.6.5

### 0.0.2 (December 25, 2019)

* Change build type to docker
* Update sailor version to 2.5.4
* Update to use builtin sailor logger
