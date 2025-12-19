---
title: Exact Online Technical Notes
layout: component
description: Technical Notes for the Exact Online component.
icon: exact-online.png
icontext: Exact Online component
category: exact-online
updatedDate: 2025-12-19
ComponentVersion: 1.1.2
redirect_from:
  - /components/exact-online/changelog.html
---

## Changelog

### 1.1.2 (December 19, 2025)

* Force the component builds to be dockerized ad pushed to the Docker Hub
* Moved the `odata-component` to the `lib` folder to avoid the need to install it as a dependency (git receiver can not download dependencies from the git repository)

### 1.1.1 (August 13, 2021)

* Updated sailor-nodejs to version 2.6.26
* Skipped tests for old authorization (not through faceless service)

### 1.1.0 (September 11, 2020)

* Bump dependencies
* Add option to credentials to select country
* Bump node version

### 1.0.1 (January 3, 2020)

* Refactor to use built in logger
* Change build type to docker
* Update Sailor to version 2.5.4
* Remove `^` from dependencies

### 1.0.0 (November 29, 2018)

* Initial release
