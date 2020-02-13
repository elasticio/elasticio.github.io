---
title: Changelog
layout: component
description: AWS S3 component's changelog
icon: aws-s3.png
icontext: AWS S3 component
category: AWS S3 component
createdDate: 2019-12-27
updatedDate: 2020-01-17
---

# 1.3.0 (February 13, 2020)

## General Changes

* Add Get New and Updated S3 Objects trigger
* Fix `Error! Cannot convert undefined or null to object` error on no attachments object in message in Write file action
* Add attachment size limitation
* Add empty response to Delete file action when file already not exists
* Add possibility to retrieve more than 1,000 files for 'Get filenames' action
* Improved error handling for Get filenames action
* Removed invalid docs job from circle ci

# 1.2.1 (December 26, 2019)

* Update sailor version to 2.5.4

## 1.2.0 (December 19, 2019)

* Add `Rename file` action
* Rename field `Bucket Name` to `Bucket Name and Folder`
* Make `Bucket Name and Folder` field non required
* Use one Client for all actions
* Update Sailor version

## 1.1.0 (June 18, 2019)

* Add `Write file` action
* Add `Read file` action
* Add `Get filenames` action
* Add `Delete file` action
* Update versions of dependencies
* Update README.md

## 1.0.0 (April 28, 2016)

* Initial release
