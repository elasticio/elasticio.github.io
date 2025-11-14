---
title: XML Technical Notes
layout: component
description: Technical Notes for the XML component.
icon: xml.png
icontext: XML component
category: xml
ComponentVersion: 1.4.1
updatedDate: 2025-11-14
redirect_from:
  - /components/xml/changelog.html
---

## Changelog

### 1.4.1 (November 14, 2025)

* Fix: support maester attachments in `XML Attachment to JSON` action
* Updated `Sailor` version to 2.7.6
* Updated `@elastic.io/component-commons-library` version to 4.0.0
* Removed `elasticio-node` dependency

### 1.4.0 (June 09, 2023)

* Implemented support `attachments` inside message body for `XML Attachment to JSON` action
* Updated Sailor version to 2.7.1
* Removed old dependencies

### 1.3.7 (September 12, 2022)

* Deleted buildType from component.json to fix component build

### 1.3.6 (September 09, 2022)

* Update Sailor version to 2.6.29
* Get rid of vulnerabilities in dependencies
* Update component-commons-library version to 3.0.2

### 1.3.5 (April 13, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config
* Update component-commons-library version to 2.0.2

### 1.3.4 (February 12, 2021)

* Update sailor version to 2.6.24

### 1.3.3 (October 30, 2020)

* Upgrade to sailor 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs

### 1.3.2 (June 6, 2020)

* Remove update docs on deploy script

### 1.3.1 (May 22, 2020)

* Update sailor version to 2.6.7
* Correctly handle incoming attachments that are empty.
* Update dependencies.
* Add debug log statements.

### 1.3.0 (April 23, 2020)

* Update dependencies
* Create new JSON to XML action
* Add help links

### 1.2.1 (March 30, 2020)

* Minor logs improvements in "XML to JSON" action

### 1.2.0 (January 30, 2020)

* Update sailor version to 2.6.1
* Refactor console.log to built in sailor logger
* Change build type to docker

### 1.1.1 (September 25, 2019)

* Upload attachments with component commons library

### 1.1.0 (June 24, 2019)

* Update `README`

### 1.0.0 (December 29, 2016)

* Initial release
