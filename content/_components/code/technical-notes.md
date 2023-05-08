---
title: Code Technical Notes
layout: component
description: Technical Notes for the Code component.
icon: code.png
icontext: Code component
category: code
updatedDate: 2023-04-21
ComponentVersion: 1.2.11
redirect_from:
  - /components/code/changelog.html
---

## Changelog

### 1.2.11 (April 21, 2023)

* Add json-bigint library

### 1.2.10 (February 10, 2023)

* Get rid of vulnerabilities in dependencies

### 1.2.9 (February 10, 2023)

* Update Sailor version to 2.7.1

### 1.2.8 (April 08, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config

### 1.2.7 (February 15, 2022)

* Updated Node engine to 15.8.0

### 1.2.6 (November 26, 2021)

* Updated sailor version to 2.6.26

### 1.2.5 (February 12, 2021)

* Update sailor version to 2.6.24

### 1.2.4 (January 15, 2021)

* Update sailor version to 2.6.23

### 1.2.3 (November 6, 2020)

* Update sailor version to 2.6.18

### 1.2.2 (October 20, 2020)

* Update sailor version to 2.6.17

### 1.2.1 (July 1, 2020)

* Update sailor version to 2.6.13

### 1.2.0 (May 19, 2020)

* Update sailor version to 2.6.7

* Add support for more node global objects

### 1.1.1 (January 30, 2020)

* Update sailor version to 2.6.1

### 1.0.1 (November 13, 2019)

* Added snapshots support by passing 2 more arguments to `run` function: `cfg` and `snapshot`.

* All log statements changed from `info` level to `debug`.

### 1.0.1 (August 28, 2019)

Fixed bug:

* Nodejs code component processes all at once messages in it's input queue in case of asynchronous code body.

### 1.0.0 (August 2, 2019)

* Initial release which includes a bunch of previous unversioned releases.
