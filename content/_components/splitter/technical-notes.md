---
title: Splitter Technical Notes
layout: component
description: Technical Notes for the Splitter component.
icon: splitter.png
icontext: Splitter component
category: splitter
updatedDate: 2023-03-28
ComponentVersion: 1.4.4
redirect_from:
  - /components/splitter/changelog.html
---

## Changelog

### 1.4.4 (March 28, 2023)

* Fix bug while asynchronous polling with Splitter in Re-assemble Messages mode

### 1.4.3 (November 04, 2022)

* Update Sailor version to 2.7.1

### 1.4.2 (October 07, 2022)

* Update Sailor version to 2.7.0
* Update maester-client version to 4.0.3
* Get rid of vulnerabilities in dependencies
* Fix message processing
* Maximum `Delay timer` in `Re-assembled message` action reduced to 20 sec

### 1.4.1 (April 08, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config

### 1.4.0 (November 26, 2021)

* Update `Re-assembled message` action: Make Message ID optional
* Update sailor version to 2.6.26

### 1.2.1 (July 23, 2021)

* Implemented support of maester storage in `Re-assembled message` action (maester-client library 3.3.0)

### 1.2.0 (July 9, 2021)

* Add Ability to pass data from the individual messages to `Re-assembled message` action

### 1.1.9 (February 12, 2021)

* Update sailor version to 2.6.24

### 1.1.8 (January 15, 2021)

* Update sailor version to 2.6.23

### 1.1.7 (November 6, 2020)

* Update sailor version to 2.6.18

### 1.1.6 (October 20, 2020)

* Update sailor version to 2.6.17

### 1.1.5 (September 25, 2020)

* Annual audit of the component code to check if it exposes a sensitive data in the logs

### 1.1.4 (August 20, 2020)

* `Split on JSONata Expression` action update: add possibility to emit non-array objects.

### 1.1.3 (August 11, 2020)

* Update Sailor and dependencies.
* Fix node version.

### 1.1.1 (May 19, 2020)

* Update sailor version to 2.6.7

### 1.1.0 (May 7, 2020)

* Add re-assemble action
* Update dependencies

### 1.0.6 (March 26, 2020)

* Add support for new getFlowVariables and handlePassthrough jsonata functions

### 1.0.5 (March 3, 2020)

* Fixed bug when emitting to much data

### 1.0.4 (February 03, 2020)

* Fixed bug with incorrect await while emitting data

### 1.0.3 (December 24, 2019)

* Update sailor version to 2.5.4
* New Sailor logger
* Improved few logs

### 1.0.2 (September 18, 2019)

* Initial release
* Add "Split on JSONata Expression" action
* Deprecate "Split Message By Array" action
* Format repository according to Airbnb styling

### 1.0.1 (December 07, 2019)

* Update sailor version to 2.5.1
* Change build type to docker

### 1.0.0 (March 24, 2017)

* Initial release
