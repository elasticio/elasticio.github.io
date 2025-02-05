---
title: Webhook Technical Notes
layout: component
description: Technical Notes for the Webhook component.
icon: webhook.png
icontext: Webhook component
category: webhook
updatedDate: 2025-01-13
ComponentVersion: 2.0.0
redirect_from:
  - /components/webhook/changelog.html
---

## Changelog

### 2.0.0 (January 13, 2025)

* Update Sailor version to 2.7.4
* Removed deprecated action `Send data`
* Removed unnecessary dependencies
* Code migrated to TypeScript (TS)
* Revitalized README

### 1.2.12 (November 04, 2022)

* Update Sailor version to 2.7.1

### 1.2.11 (April 08, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config

### 1.2.10 (November 26, 2021)

* Updated sailor version to 2.6.26

### 1.2.9 (January 28, 2021)

* Update sailor version to 2.6.24

### 1.2.8 (January 15, 2021)

* Update sailor version to 2.6.23

### 1.2.7 (October 27, 2020)

* Update sailor version to 2.6.18
* Fix unit-tests

### 1.2.6 (October 19, 2020)

* Update sailor version to 2.6.17

### 1.2.5 (October 12, 2020)

* Update sailor version to 2.6.16

### 1.2.4 (Sept 29, 2020)

* Annual audit of the component code to check if it exposes a sensitive data in the logs.

### 1.2.3 (Sept 11, 2020)

* Bump dependencies
* Don't log entire incoming message at info level

### 1.2.2 (May 19, 2020)

* Update sailor version to 2.6.7
* "Send data" Action become deprecated

### 1.2.1 (March 26, 2020)

* Add help messages to the trigger and action

### 1.2.0 (February 13, 2020)

* "Receive" trigger awaits the result of emit
* Update sailor version to 2.6.3
* Remove "q" dependency

### 1.1.2 (January 30, 2020)

* Update sailor version to 2.6.1

### 1.1.1 (December 07, 2019)

* Update sailor version to 2.5.1

### 1.1.0 (July 29, 2019)

* Migrate to es6
* Refactor unit tests and component structure
* Add additional information to the webhook call

### 1.0.0 (March 23, 2016)

* Initial release
