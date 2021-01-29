---
title: REST API Technical Notes
layout: component
description: Technical Notes for REST API component.
icon: rest-api.png
icontext: REST API component
category: rest-api
updatedDate: 2021-01-28
ComponentVersion: 2.0.7
redirect_from:
  - /components/rest-api/changelog.html
---

## Changelog

### 2.0.7 (January 28, 2021)

* Update sailor version to 2.6.24

### 2.0.6 (January 15, 2021)

* Update sailor version to 2.6.23

### 2.0.5 (December 7, 2020)

* Update sailor version to 2.6.21

### 2.0.4 (November 10, 2020)

* Bump dependencies
* Automatically & immediately retry 5 times on network failure
* All network failures trigger rebounds when the enable rebound option is set

### 2.0.3 (November 6, 2020)

* Update sailor version to 2.6.18

### 2.0.2 (October 23, 2020)

* Annual audit of the component code to check if it exposes a sensitive data in the logs

### 2.0.1 (October 15, 2020)

* Update sailor version to 2.6.17

### 2.0.0 (October 8, 2020)

* Include status code, HTTP headers along with body in produced message
* Update dependencies
* Remove logging of sensitive data
* Include attachment information in outbound message
* Use node version 14
* Make use of new OAuth mechanism
* First commit of v2 branch.


### 1.2.17 (December 7, 2020)

* Update sailor version to 2.6.21

### 1.2.15 (November 6, 2020)

* Update sailor version to 2.6.18

### 1.2.14 (October 22, 2020)

* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Update sailor version to 2.6.17
* Update internal libraries versions

### 1.2.11 (September 6, 2020)

* Fix url encoding

### 1.2.10 (August 25, 2020)

* Fix `application/x-www-form-urlencoded` encoding bug

### 1.2.9 (July 10, 2020)

* Timeout configuration field

### 1.2.8 (July 6, 2020)

* Add configuration fields: `Delay` and `Call Count` for rate limit
* Update sailor version to 2.6.13

### 1.2.7 (June 24, 2020)

* Add checkBox to not verify servers certificate

### 1.2.5 (May 19, 2020)

* Update sailor version to 2.6.7

### 1.2.4 (April 9, 2020)

* Fix `No refresh tokens were returned by the OAuth2 provider` error for credentials with non-expiring refresh_token

### 1.2.3 (April 1, 2020)

* New Jsonata expressions support: `$getFlowVariables` and `$getPassthrough`

### 1.2.2 (March 19, 2020)

* Add binary message types to list for processing them as attachments

### 1.2.1(March 12, 2020)

* Added validity check of `refresh_token` in keys for `OAuth2` authentication strategy

### 1.2.0(February 13, 2020)

* Added new authentication strategy `OAuth2`

### 1.1.4 (December 23, 2019)

* Update sailor version to 2.5.4
* Remove Enable debugging checkbox

### 1.1.3 (December 07, 2019)

* Update sailor version to 2.5.1
* Update jsonata-moment to 1.1.4

### 1.1.2 (September 06, 2019)

* Fix `new Buffer()` deprecated warning

### 1.1.0 (August 28, 2019)

* Added feature `Retry on failure`

### 1.0.1 (June 26, 2019)

* Initial release which includes a bunch of previous unversioned releases
