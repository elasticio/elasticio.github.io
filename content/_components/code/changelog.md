---
title: Changelog
layout: component
description: Changelog for the Code component.
icon: code.png
icontext: Code component
category: Code component
createdDate: 2015-12-27
updatedDate: 2019-12-27
---

## 1.0.1 (November 13, 2019)

* Added snapshots support by passing 2 more arguments to `run` function: `cfg` and `snapshot`.
* All log statements changed from `info` level to `debug`.

## 1.0.1 (August 28, 2019)

Fixed bug:
* Nodejs code component processes all at once messages in it's input queue in case of asynchronous code body.

## 1.0.0 (August 2, 2019)

* Initial release which includes a bunch of previous unversioned releases.
