---
title: SFTP Technical Notes
layout: component
description: Technical Notes for the SFTP component.
icon: sftp.png
icontext: SFTP component
category: sftp
updatedDate: 2022-06-03
ComponentVersion: 1.4.9
redirect_from:
  - /components/sftp/changelog.html
---

## Changelog

### 1.4.9 (June 03, 2022)

* Add a file filter to the `Poll Files` trigger

### 1.4.8 (April 20, 2022)

* Fix memory leak for `Download Files/File by name` actions and `Read Files` trigger
* Get rid of vulnerabilities in dependencies

### 1.4.7 (April 12, 2022)

* Fix uploading attachments

### 1.4.6 (April 08, 2022)

* Fix downloading files of size > 10MB

### 1.4.5 (November 26, 2021)

* Upgrade sailor version to 2.6.26
* Reduced the size of component icon file

### 1.4.4 (February 12, 2021)

* Update sailor version to 2.6.24

### 1.4.3 (January 15, 2021)

* Update sailor version to 2.6.23

### 1.4.2 (October 30, 2020)

* More logging improvements
* Update sailor to 2.6.18

### 1.4.1 (October 19, 2020)

* Annual audit of the component code to check if it exposes sensitive data in the logs
* Update sailor to 2.6.17

### 1.4.0 (July 6, 2020)

* Update component to new sailor version 2.6.10
* If deleting a file that does not exist, emit the empty message.
* Use POSIX rename if possible to move files. It is now possible to replace existing files with move.
* Update all dependencies.
* Use Node v 14.
* Remove update docs on deploy script

### 1.3.0 (June 5, 2020)

* Add new 'Move File' action
* Fix performance problem when trying to download large number of files

### 1.2.2 (May 19, 2020)

* Update component to new sailor version 2.6.7

## 1.2.1 (December 30, 2019)

* Update component to new sailor version 2.5.4

### 1.2.0 (December 18, 2019)

* Add max to file size and environment variable to configure
* Add key-based authentication
* Add Download files action
* Add Upload File From URL action
* The following actions are renamed:
  - Upload files -> Upload files From Attachments Header
  - Lookup file by name -> Download file by name
  - Get new and updated files -> Poll files

### 1.1.2 (December 6 2019)

* New Action: Download files
* Migrate integration tests to another SFTP Server
* Fix integration tests error during local running
* Migrate SFTP-->Attachment upload logic to streams

#### Action: Poll files

* Fix 0kb file download bug

#### Action: Download file by name

* Fix 0kb file download bug

### 1.1.1 (December 6 2019)

* Add Lookup files action

### 1.1.0 (December 5, 2019)

* Add `Delete file` action
* Add `Lookup file by name` action
* Add `Get new and updated files` trigger

#### Action: Upload files

* Add custom name for uploaded file

### 1.0.0 (October 8, 2019)

* Initial release
* Add custom port field instead of defaulting to 22
* Add more unit tests
* Fix integration test using `path.resolve` based on test machine
* Format repository according to Airbnb styling
