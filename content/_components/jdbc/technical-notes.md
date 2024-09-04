---
title: JDBC Technical Notes
layout: component
description: Technical Notes for JDBC component
icon: jdbc.png
icontext: JDBC component
category: jdbc
updatedDate: 2023-09-05
ComponentVersion: 2.5.9
redirect_from:
  - /components/jdbc/completeness-matrix.html
  - /components/jdbc/changelog.html
---

## Changelog

### 2.5.9 (August 01, 2024)
* Bumped Sailor to 4.0.3


### 2.5.8 (July 09, 2024)
* Bumped Sailor to 4.0.2
* Bumped Postgresql library to 42.5.5
* Bumped MySQL library to 8.4.0

### 2.5.7 (July 07, 2023)

* Updated Sailor to to 4.0.1

### 2.5.6 (November 04, 2022)

* Added limitations in readme about custom timezone behavior
* Update Sailor version to 3.5.0

### 2.5.5 (May 20, 2022)

* Set default `connectionTimeZone` parameter for MYSQL to `SERVER`

### 2.5.4 (May 11, 2022)

* Made an automated vulnerability check run in CI/CD

### 2.5.3 (May 06, 2022)

* Add an automated vulnerability check

### 2.5.2 (April 08, 2022)

* Updated the Sailor version to 3.3.9

### 2.5.1 (November 26, 2021)

* Updated the sailor version to 3.3.6
* Reduced the size of component icon file

### 2.5.0 (October 1, 2021)

* Add New Select action
* Deprecate old Select action

### 2.4.5 (September 1, 2021)

Open only one connection pool per one execution and reuse it

### 2.4.4 (August 12, 2021)

* Remove dependencyCheckAnalyze task

### 2.4.3 (February 12, 2021)

* Update sailor version to 3.3.2

### 2.4.2 (November 20, 2020)

* Upgrade sailor to 3.3.1
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual dependencies vulnerabilities audit

### 2.4.1 (October 21, 2019)

* Add rebound mechanism in case of deadlocks for actions: Insert, UpsertByPK, DeleteByPK

### 2.4.0 (October 17, 2019)

* Add `Custom Query` action
* Add rebound mechanism in case of deadlocks for actions: Insert, UpsertByPK, DeleteByPK

### 2.3.1 (September 30, 2019)

* Add placeholder to MySQL schemas list

### 2.3.0 (September 25, 2019)

* Add new action `Insert`

### 2.2.0 (August 28, 2019)

 * Add support `Configuration properties` for DB connection
 * Enable circleci

### 2.1.0 (2019-07-22)

* Add Execute stored procedure action

### 2.0.1 (2019-06-24)

* Fix error logging for generating metadata of `Select` action

### 2.0.0 (2018-09-19)

* Add Select trigger
* Add Get rows polling trigger

* Add Select action
* Add Lookup by primary key action
* Add Upsert by primary key action (for migration)
* Add Delete by primary key action

* Remove CreateOrUpdateRecord action

* Fix issue in postgresql - getDate(null)
* Fix null values as input for select

## Completeness Matrix

Here is the JDBC Component Completeness Matrix.

![JDBC Component Completeness Matrix](https://user-images.githubusercontent.com/22715422/67289390-38dad900-f4e7-11e9-9a45-1c7775c9c7d5.png)
