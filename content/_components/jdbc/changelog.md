---
title: Changelog
layout: component
description: Changelog for JDBC component
icon: jdbc.png
icontext: JDBC component
category: jdbc
createdDate: 2019-12-27
updatedDate: 2020-09-25
---

## 2.4.1 (September 25, 2020)

* Annual audit of the component code to check if it exposes a sensitive data in the logs

## 2.3.2 (October 21, 2019)

* Add rebound mechanism in case of deadlocks for actions: Insert, UpsertByPK, DeleteByPK

## 2.4.0 (october 17, 2019)

* Add `Custom Query` action

## 2.3.1 (September 30, 2019)

* Add placeholder to MySQL schemas list

## 2.3.0 (September 25, 2019)

* Add new action `Insert`

## 2.2.0 (August 28, 2019)

 * Add support `Configuration properties` for DB connection
 * Enable circleci

## 2.1.0 (2019-07-22)

* Add Execute stored procedure action

## 2.0.1 (2019-06-24)

* Fix error logging for generating metadata of `Select` action

## 2.0.0 (2018-09-19)

* Add Select trigger
* Add Get rows polling trigger

* Add Select action
* Add Lookup by primary key action
* Add Upsert by primary key action (for migration)
* Add Delete by primary key action

* Remove CreateOrUpdateRecord action

* Fix issue in postgresql - getDate(null)
* Fix null values as input for select
