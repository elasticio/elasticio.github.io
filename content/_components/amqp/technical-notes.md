---
layout: component
title: AMQP Technical Notes
description: Technical Notes for AMQP component.
icon:  amqp.png
icontext: AMQP component
category: amqp
ComponentVersion: 1.4.4
updatedDate: 2026-01-15
redirect_from:
  - /components/amqp/changelog.html
---

## Changelog

### 1.4.4 (January 15, 2026)

* Updated Node.js engine requirement to `24.x`.
* Upgraded dependencies:
  * `amqp-connection-manager`: 4.1.14 -> 5.0.0
  * `elasticio-sailor-nodejs`: 2.7.2 -> 2.7.7
* Got rid of `elasticio-node` and `amqplib` dependencies
* Updated CircleCI configuration to reflect Node 24 upgrade.
* Enhanced README for clarity, improved language, and better formatting.

### 1.4.3 (July 05, 2024)

* Now logs and messages for `Consume` trigger will be located in the last flow execution.
* Upgrade to sailor `2.7.2`.
* Upgrade amqplib to `0.10.4`.

### 1.4.2 (March 27, 2023)

* Fixed issue with shutdown hook in `Consume` trigger.

### 1.4.1 (March 27, 2023)

Fixed connection cloning in `Publish` action.

### 1.4.0 (March 25, 2023)

* Implemented retry mechanism on connection errors.
* Added configuration fields to set retry options.
* Added `Don't encrypt payload` and `Content-Type` configuration fields to `Publish` action.
* Added `Don't decrypt payload` configuration field to `Consume` trigger.
* Upgrade to sailor `2.7.1`.
* Upgrade amqplib to `0.10.3`.

### 1.3.3 (March 25, 2021)

* Upgrade to sailor `2.6.24`.

### 1.3.2 (November 5, 2020)

* Upgrade to sailor `2.6.18`.
* Annual audit of the component code to check if it exposes a sensitive data in the logs.
* Annual npm vulnerabilities audit.

### 1.3.1 (May 22, 2020)

* Update sailor version to `2.6.7`.

### 1.3.0 (April 21, 2017)

* Update sailor version to `2.1.0`.

### 1.2.0 (February 21, 2017)

* Update sailor version to `2.0.0`.

### 1.1.0 (December 16, 2016)

* Add Consume Trigger.

### 1.0.0 (December 15, 2016)

* Initial release.
* Add Publish Action.
