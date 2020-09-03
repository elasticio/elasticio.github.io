---
title: REST API trigger&action
layout: component
description: REST API component triggers.
icon: rest-api.png
icontext: REST API component
category: REST API component
createdDate: 2020-01-02
updatedDate: 2020-09-06
---

## HTTP request

HTTP request will send a `GET`/`POST`/`PUT`/`DELETE` HTTP requests and parse the response back to the flow.

![Configure Input - Rest API](img/configure-input.png)

*Numbers show: (1) The URL and method of the REST API resource, (2) the HTTP call headers, (3) configuration options (4) follow redirect mode, (5) delay, (6) call count and (7) request timeout.*

**1.**  HTTP methods and URL
 * REST API component supports the following HTTP methods: `GET`, `PUT`, `POST`, `DELETE` and `PATCH`.
 * The URL of the REST API resources. Accepts JSONata expressions, meaning the URL address evaluates [JSONata](http://jsonata.org/) expressions.

**2.** Request Headers and Body
 * Definition of request [headers](#defining-http-headers)
 * Definition of request [body](#defining-http-body), if the HTTP method is not `GET`

**3.** Configuration options
 * ``Don`t throw Error on Failed Calls`` - if enabled return error, error code and stacktrace in message body otherwise throw error in flow.
 * ``Split Result if it is an Array`` - if enabled and response is array, creates message for each item of array. Otherwise create one message with response array.  
 * ``Retry on failure`` - enabling [rebound](https://support.elastic.io/support/solutions/articles/14000044750-why-and-where-we-use-the-rebound-) feature for following HTTP status codes:
    - 408: Request Timeout
    - 423: Locked
    - 429: Too Many Requests
    - 500: Internal Server Error
    - 502: Bad Gateway
    - 503: Service Unavailable
    - 504: Gateway Timeout
    - DNS lookup timeout
 * ``Do not verify SSL certificate (unsafe)`` - disable verifying the server certificate - **unsafe**.

**4.** ``Follow redirect mode`` - If you want disable Follow Redirect functionality, you can use option ``Follow redirect mode``.By default ``Follow redirect mode`` option has value ``Follow redirects``.

**5.** ``Delay`` - If you want to slow down requests to your API you can set delay value (in seconds) and the component will delay calling the next request after the previous request.
Time for the delay is calculated as `Delay`/ `Call Count` and shouldn't be more than 1140 seconds (19 minutes due to platform limitation).
The `Call Count` value by default is 1. If you want to use another value, please set the `Call Count` field.
>Notice: See [Known Limitations](/components/rest-api/index#known-limitations) about `Delay` value.

**6.** ``Call Count`` - the field should be used only in pair with `Delay`, default to 1.

**7.** ``Request timeout`` - Timeout period in milliseconds (1-1140000) while component waiting for server response, also can be configured with REQUEST_TIMEOUT environment variable if configuration field is not provided. Defaults to 100000 (100 sec).
Notice: Specified for component REQUEST_TIMEOUT environment variable would be overwritten by specified value of Request timeout, default value would be also overwritten.
