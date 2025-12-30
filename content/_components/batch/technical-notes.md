---
title: Batch Technical Notes
layout: component
description: Technical Notes for the Batch component
icon: batch.png
icontext: Batch component
category: batch
updatedDate: 2025-12-03
ComponentVersion: 2.0.9
redirect_from:
  - /components/batch/changelog.html
---

## Changelog

### 2.0.9 (December 03, 2025)

* Update `@elastic.io/maester-client` version to 6.0.0
* Update Node engine version to 24.x
* Update Sailor version to 2.7.7

### 2.0.8 (June 03, 2024)

* Fixed error `Could not parse Maester object as it is not a JSON object`.
* Update Sailor version to `2.7.2`.

### 2.0.7 (July 06, 2023)

* Added more informative logs.
* Fixed vulnerabilities.
* `batching-library` functionality implemented as internal client.
* Upgraded to node to `v18`.
* Added unit tests.

### 2.0.6 (November 18, 2022)

* Update Sailor version to `2.7.1`.
* Fixed vulnerabilities.

### 2.0.5 (September 6, 2022)

* Fix an issue with the component pusher.

### 2.0.4 (August 26, 2022)

* Update batching-library to `2.0.3`.

### 2.0.3 (August 12, 2022)

* Update batching-library to `2.0.2`.

### 2.0.2 (June 25, 2022)

* Update sailor-nodejs to `2.6.28`.
* Update batching-library to `2.0.1`.
* Updated Circle.ci config.

### 2.0.1 (November 26, 2021)

* Reduced the size of component icon file.
* Upgrade sailor version to `2.6.26`.

### 2.0.0 (April 23, 2021)

* Implemented Maester support.
* Disabled support of MongoDB as an external storage (credentials are no longer supported).
* `Get ready batches` trigger feature `Delete Batch After Retrieval` replased by `Do Not Delete Batch After Retrieval`.
* Update sailor to `2.6.24`.

### 1.0.0 (November 15, 2020)

* Credentials verify minor fix.

### 0.0.6 (November 15, 2020)

* Fix MongoError: Authentication failed by authSource.
* Upgrade to sailor `2.6.18`.
* Update batching-library version.
* Annual audit of the component code to check if it exposes a sensitive data in the logs.
* Annual npm vulnerabilities audit.

### 0.0.5 (July 31, 2020)

* Update Sailor to `2.6.14`.
* Update node to `14.5.0`.
* Add option `Delete Batch After Retrieval` for trigger `Get ready batches`.

### 0.0.4 (May 22, 2020)

* Update Sailor to `2.6.7`.

### 0.0.3 (March 3, 2020)

* Fix bug with verify credentials.
* Update node to `v12`.
* Update sailor to`2.6.5`.

### 0.0.2 (December 25, 2019)

* Change build type to docker.
* Update sailor version to `2.5.4`.
* Update to use builtin sailor logger.
