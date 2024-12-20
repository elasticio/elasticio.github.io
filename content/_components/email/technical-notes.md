---
title: Email Technical Notes
layout: component
description: Technical Notes for the Email component
icon: email.png
icontext: Email component
category: email
ComponentVersion: 1.3.0
updatedDate: 2024-11-07
redirect_from:
  - /components/lookup-table/changelog.html
---

## Changelog

### 1.3.0 (November 07, 2024)

* Introduced the new HTML body field to make it possible sending both an HTML and a text contents. The text one becomes optional and will only be used if a HTML content is either not supported by a receiver or is empty. The backward compatibility has not broken
* Update Sailor version to 2.7.3
* Migrated to Node.js 20

### 1.2.4 (January 13, 2023)

* Fixed a typo in logs

### 1.2.3 (November 04, 2022)

* Update Sailor version to 2.7.1

### 1.2.2 (August 30, 2022)

* Republish email component using components-build-helper@2.0.0

### 1.2.1 (August 26, 2022)

* Update Sailor version to 2.6.29
* Get rid of vulnerabilities in dependencies
* Update component-commons-library version to 3.0.2

### 1.2.0 (June 17, 2022)

* Added support attachments from metadata
* Stringify JSON bodies by default
* New main library for sending emails (old one is now deprecated)
* Migration to TypeScript

### 1.0.14 (April 08, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config

### 1.0.12 (November 26, 2021)

* Update sailor version to 2.6.26
* Reduced the size of component icon file

### 1.0.11 (February 12, 2021)

* Update sailor version to 2.6.24

### 1.0.10 (January 29, 2021)

* Update sailor version to 2.6.23

### 1.0.9 (November 6, 2020)

* Update sailor version to 2.6.18

### 1.0.8 (October 20, 2020)

* Update sailor version to 2.6.17

### 1.0.7 (September 20, 2020)

* Annual audit of the component code to check if it exposes a sensitive data in the logs.

### 1.0.6 (May 22, 2020)

* Update sailor version to 2.6.7

### 1.0.5 (March 26, 2020)

* Add help text to the action and description to the metatdata fields

### 1.0.4 (January 13, 2020)

* Using Sailor logger
* Improved few logs

### 1.0.3 (December 06, 2019)

* Update sailor version to 2.5.1

### 1.1.0 (August 20, 2019)

* Add retry mechanism to attachments uploading

### 1.0.0 (August 02, 2019)

* Initial release
