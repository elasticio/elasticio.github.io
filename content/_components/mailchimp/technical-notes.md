---
title: Mailchimp Technical Notes
layout: component
description: Technical Notes for the Mailchimp component
icon: mailchimp.png
icontext: Mailchimp component
category: mailchimp
updatedDate: 2026-04-21
ComponentVersion: 2.0.0
redirect_from:
  - /components/mailchimp/changelog.html
---

## Changelog

### 2.0.0 (April 21, 2026)

* Added dynamic metadata for `Add new Subscriber` action to support list-specific merge fields.
* **ATTENTION**: Moving to the dynamic metadata might break existing flow mapping. Please check your flows after upgrading.
* Upgraded dependencies to latest stable versions:
    * `elasticio-sailor-nodejs`: 2.7.1 -> 2.7.8
    * `moment`: 2.29.4 -> 2.30.1
* Removed `elasticio-node` dependency and replaced it with a local utility.
* Integrated latest security fixes and `better-npm-audit`.

### 1.0.5 (January 05, 2026)

* Update Sailor version to 2.7.7
* Remove unused `elasticio-node` dependency
* Update the Node engine to version 24.x.

### 1.0.4 (June 12, 2022)

* Fixed credential verification
* Upgrade to Sailor 2.7.1

### 1.0.3 (April 27, 2022)

* Upgrade to sailor 2.6.27
* Fix dependencies
* Added ability to set `Ansprache` field for `Add new Subscriber` action

### 1.0.2 (November 5, 2020)

* Upgrade to sailor 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit

### 1.0.1 (December 30, 2019)

* Update component to new sailor version 2.5.4

### 1.0.0 (January 25, 2018)

* Initial release which includes a bunch of previous unversioned releases
