---
title: Code Technical Notes
layout: component
description: Technical Notes for the Code component.
icon: code.png
icontext: Code component
category: code
updatedDate: 2021-02-12
ComponentVersion: 1.2.5
redirect_from:
  - /components/code/changelog.html
---

## Changelog

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
