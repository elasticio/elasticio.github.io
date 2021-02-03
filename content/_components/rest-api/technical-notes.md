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

## Cookies

Sometimes it's required to read and set cookies. To read cookies you should have gain access to the `Set-Cookie` headers of the _HTTP Response_,
in this case you should check the ``Don`t throw Error on Failed Calls`` option. Please note that HTTP Response may have **multiple**
`Set-Cookie` headers therefore you should expect to find an **array** of values in the HTTP Response

![image](https://user-images.githubusercontent.com/56208/85700153-66160180-b6dc-11ea-8885-45f8c888dc8a.png)

To _set_ Cookies you could simply use the HTTP header on your _Response_ called `Cookie` to a cookie value to a
list of name-value pairs in the form of <cookie-name>=<cookie-value>. Pairs in the list are separated by a semicolon and a space ('; ')
like `yummy_cookie=choco; tasty_cookie=strawberry`. More information on setting the cookies can be found [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie).

## Attachments

With the REST API component, you can send binary data as attachment. You just need to choose
`multipart/form-data` Content type and attachments from the input message will be
included to the request payload automatically.

REST API component automatically load binary data to attachments with next content
types in response headers:

*   `image/*`
*   `text/csv`
*   `application/msword`
*   `application/msexcgel`
*   `application/pdf`
*   `application/octet-stream`
*   `application/x-binary`
*   `application/binary`
*   `application/macbinary`

## Exception handling

Rest API component uses exception handling logic below:
![Exception handling logic](https://user-images.githubusercontent.com/5710732/99240680-1d7ef200-27fd-11eb-9b14-c9aaf7c23bb1.jpg)

## Known Limitations

**1.** The component can parse any of json and xml content types.
They are:
* application/json
* application/xml
* text/xml
* etc.

> **Please note:** if content type is not indicated in response header, component will try to parse response as json. If it gets parse exception, it returns response as is.

**2.** Attachments limitations:

  1. Maximal possible size for an attachment is 10 MB.

  2. Attachments mechanism does not work with [Local Agent Installation](/references/local-agents-requesting#compatible-operating-systems)

**3.** OAuth2 authentication strategy limitation: [Access Token Response](https://www.oauth.com/oauth2-servers/access-tokens/access-token-response/) should   always contain `refresh_token` property (optional in OAuth2 standard). Reason behind it - platform shoud be able to refresh access token after it's expiration.  Possible solution - use `access_type:offline` in additional parameter which is supported by many OAuth2 providers.

**4.** We suggest not to set Delay value more than time period between two executions of the flow. Please keep in mind that delay can influence the time of next execution. For example, the flow has type `Ordinary` and scheduled for execution for every 60 sec, but the delay is set to 120 sec, so the next execution will be started only after 120 sec, instead of 60 seconds.

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
