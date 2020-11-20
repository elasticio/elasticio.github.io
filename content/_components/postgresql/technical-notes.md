---
title: Technical Notes
layout: component
description: Technical Notes for PostgreSQL Component.
icon: postgresql.png
icontext: PostgreSQL Component
category: postgresql-component
createdDate: 2020-01-02
updatedDate: 2020-11-20
redirect_from:
  - /components/postgresql/completeness-matrix.html
  - /components/postgresql/changelog.html
---

## Changelog

### 1.4.0 (November 20, 2020)

* Update Sailor version to 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit
* Add new options 'Allow self-signed certificates' for credentials

### 1.3.4 (May 22, 2020)

* Update sailor version to 2.6.7

### 1.3.2 (December 27, 2019)

* Update sailor version to 2.5.4

### 1.3.1 (July 19, 2019)

* Added retry in case of a deadlock transaction in `SQL Injection` action

### 1.3.0 (March 19, 2019)

* Added `Insert/Update/Delete` action
* Added `SQL Injection` action
* Added `Select` trigger
* Migrated to sailor 2.3.0

### 1.2.0 (January 24, 2019)

* Added `Insert Bulk` action

### 1.1.1 (April 21, 2017)

* Migrated to sailor 2.1.0

### 1.1.0 (January 13, 2017)

* Added `SQL Query` trigger

### 1.0.1 (December 19, 2016)

* Migrated to sailor 1.3.0

### 1.0.0 (April 3, 2016)

* Initial release


## Completeness matrix

Here is the completeness matrix of the [PostgreSQL component](index).

![PostgreSQL completeness matrix](https://user-images.githubusercontent.com/40201204/61518227-bb985780-aa11-11e9-9d18-d2a9c3cc3e65.png)
