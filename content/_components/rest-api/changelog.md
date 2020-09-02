---
title: REST API changelog
layout: component
description: Changelog for REST API component.
icon: rest-api.png
icontext: REST API component
category: REST API component
createdDate: 2020-01-02
updatedDate: 2020-09-06
---

## 1.2.11 (September 6, 2020)

* Fix url encoding

## 1.2.10 (August 25, 2020)

* Fix `application/x-www-form-urlencoded` encoding bug

## 1.2.9 (July 10, 2020)

* Timeout configuration field

## 1.2.8 (July 6, 2020)

* Add configuration fields: `Delay` and `Call Count` for rate limit
* Update sailor version to 2.6.13

## 1.2.7 (June 24, 2020)

* Add checkBox to not verify servers certificate

## 1.2.5 (May 19, 2020)

* Update sailor version to 2.6.7

## 1.2.4 (April 9, 2020)

* Fix `No refresh tokens were returned by the OAuth2 provider` error for credentials with non-expiring refresh_token

## 1.2.3 (April 1, 2020)

* New Jsonata expressions support: `$getFlowVariables` and `$getPassthrough`

## 1.2.2 (March 19, 2020)

* Add binary message types to list for processing them as attachments

## 1.2.1(March 12, 2020)

* Added validity check of `refresh_token` in keys for `OAuth2` authentication strategy

## 1.2.0(February 13, 2020)

* Added new authentication strategy `OAuth2`

## 1.1.4 (December 23, 2019)

* Update sailor version to 2.5.4
* Remove Enable debugging checkbox

## 1.1.3 (December 07, 2019)

* Update sailor version to 2.5.1
* Update jsonata-moment to 1.1.4

## 1.1.2 (September 06, 2019)

* Fix `new Buffer()` deprecated warning

## 1.1.0 (August 28, 2019)

* Added feature `Retry on failure`

## 1.0.1 (June 26, 2019)

* Initial release which includes a bunch of previous unversioned releases
