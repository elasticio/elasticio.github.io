---
title: MongoDB Technical Notes
layout: component
description: Technical Notes for the MongoDB component.
icon: mongodb.png
icontext: MongoDB component
category: mongodb
updatedDate: 2023-07-06
ComponentVersion: 1.6.0
redirect_from:
  - /components/mongodb/changelog.html
---

## Changelog

### 1.6.0 (November 30, 2023)
* Added support for MongoDB latest versions (incl. 7.0) updating MongoDB Node.js driver to the latest version (6.2.0)
    - Nothing has been changed for the old MongoDB versions (4.4 and older). MongoDB version can be chosen in the credentials
    - Due to changes made in both MongoDB and its Node.JS driver certain things might have changed.
    Like output format of data (metadata) emitted by some actions.
    - A couple of options that have been removed in MongoDB 5.0+ but still are available for older versions:
        - `keepAlive`
        - `useNewUrlParser` and `useUnifiedTopology`

## 1.5.12 (July 06, 2023)

* Added ability to use `ObjectId` in following actions:
  - `Lookup By Unique Criteria`
  - `Update Many`
  - `Upsert By Unique Criteria`
* Added unit tests

## 1.5.11 (July 03, 2023)

* Fixed the issue of long verification of credentials in the event of failure

### 1.5.10 (December 02, 2022)

* Update Sailor version to 2.7.1

### 1.5.9 (April 29, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config

### 1.5.8 (November 26, 2021)

* Reduced the size of component icon file

### 1.5.7 (October 29, 2021)

* Update sailor version to `2.6.26`
* Update `Aggregate` action: add 'allowDiskUse' option
* Update `Lookup Plural` action: add ability to lookup objects by fields with ObjectID type

### 1.5.6 (January 28, 2021)

* Update sailor version to `2.6.24`

### 1.5.5 (January 15, 2021)

* Update sailor version to `2.6.23`

### 1.5.4 (November 6, 2020)

* Update sailor version to 2.6.18

### 1.5.3 (October 23, 2020)

* Update sailor to version 2.6.17

### 1.5.2 (September 20, 2020)

* Annual audit of the component code to check if it exposes a sensitive data in the logs

### 1.5.1 (July 17, 2020)

* Add Authentication DB information to documentation
* Update dependencies
* Update sailor to version 2.6.14
* Log errors in verify credentials.
* Fix test suite.

### 1.5.0 (June 23, 2020)

* Add Emit Batch Behavior to **Lookup Plural** action
* Update to Sailor 2.6.10

### 1.4.2 (June 5, 2020)

* Add Emit Behavior to **Aggregate** and **Lookup Plural** actions
* Update to Sailor 2.6.9
* Component updated to use Node v14 and the dependencies are updated

### 1.4.1 (May 19, 2020)

*   Update Sailor to 2.6.7
*   Update documentation
*   Add dynamic metadata for `upsertById`, `upsertByCriteria` and `updateMany` actions

### 1.4.0 (April 29, 2020)

*   Aggregate Action

### 1.3.0 (April 27, 2020)

*   Bulk Write Action
*   Add Project Fields to Lookup Plural Action

### 1.2.1 (April 24, 2020)

*   Move limit from configuration to message body

### 1.2.0 (April 14, 2020)

*   Add Update Many Action
*   Add limit to Lookup Plural

### 1.1.0 (April 14, 2020)

*   Delete By ID Action
*   Delete By Unique Criteria Action

### 1.0.0 (April 13, 2020)

*   Created Lookup By ID Action
*   Created Lookup Plural Action
*   Created Upsert By ID Action
*   Created Upsert By Unique Criteria Action
