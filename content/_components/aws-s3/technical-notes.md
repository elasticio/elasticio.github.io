---
title: AWS S3 Technical notes
layout: component
description: Technical Notes for  AWS S3 component.
icon: aws-s3.png
icontext: AWS S3 component
category: AWS S3 component
createdDate: 2019-12-27
updatedDate: 2020-06-05
redirect_from:
  - /components/aws-s3/completeness-matrix.html
  - /components/aws-s3/changelog.html
---

## Changelog

### 1.4.0 (June 5, 2020)

* Add Upsert File Action
* Update dependencies
* Verify Credentials now checks for access to buckets.
* Update to Node v 14
* Replace Component completeness matrix to version 2.3

### 1.3.1 (May 22, 2020)

* Update sailor version to 2.6.7

### 1.3.0 (February 13, 2020)

* Add Get New and Updated S3 Objects trigger
* Fix `Error! Cannot convert undefined or null to object` error on no attachments object in message in Write file action
* Add attachment size limitation
* Add empty response to Delete file action when file already not exists
* Add possibility to retrieve more than 1,000 files for 'Get filenames' action
* Improved error handling for Get filenames action
* Removed invalid docs job from circle ci

### 1.2.1 (December 26, 2019)

* Update sailor version to 2.5.4

### 1.2.0 (December 19, 2019)

* Add `Rename file` action
* Rename field `Bucket Name` to `Bucket Name and Folder`
* Make `Bucket Name and Folder` field non required
* Use one Client for all actions
* Update Sailor version

### 1.1.0 (June 18, 2019)

* Add `Write file` action
* Add `Read file` action
* Add `Get filenames` action
* Add `Delete file` action
* Update versions of dependencies
* Update README.md

### 1.0.0 (April 28, 2016)

* Initial release

## Completeness Matrix

Here is the Completeness Matrix for the AWS S3 component.

![Completeness Matrix](https://user-images.githubusercontent.com/5710732/82918058-312e5780-9f42-11ea-9f80-9eb6cc9aed35.png)
