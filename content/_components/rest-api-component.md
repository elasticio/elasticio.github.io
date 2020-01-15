---
title: rest-api-component
layout: article
section: PLACEHOLDER
---
---

[![Circle CI][circle-image]][circle-url]

# REST API component

The **REST API component** is a simple yet powerful component that allows you to connect to any REST API without programming your own components and deploying them into the platform.

The REST API component will perform a single REST API call when executed. Incoming data can gets used to configure the API call made and the response from the API call will be the output.

This document covers the following topics:

*   [Introduction](#introduction)
*   [Authorisation methods](#authorisation-methods)
*   [Defining HTTP headers](#defining-http-headers)
*   [Defining request body](#defining-request-body)
*   [Working with XML Response](#working-with-xml)
*   [HTTP Headers in Response](#http-headers)
*   [Redirection](#redirection)
*   [Attachments](#attachments)
*   [Exception handling](#exception-handling)
*   [Known Limitations](#known-limitations)

## Introduction

The example below shows the development team creation using the REST API component with our own [REST API service](https://api.elastic.io/docs "elastic.io REST API service").

![alt text](https://user-images.githubusercontent.com/16806832/63769383-591d5b80-c8db-11e9-8b57-5890d4d4f21f.png)
*Numbers show: (1) The URL and method of the REST API resource, (2) the HTTP call headers. (3) configuration options and (4) follow redirect mode.*

1.  HTTP methods and URL
 * REST API component supports the following HTTP methods: `GET`, `PUT`, `POST`, `DELETE` and `PATCH`.
 * The URL of the REST API resources. Accepts JSONata expressions, meaning the URL address evaluates [JSONata](http://jsonata.org/) expressions.
2. Request Headers and Body
 * Definition of request [headers](#defining-http-headers)
 * Definition of request [body](#defining-http-body), if the HTTP method is not `GET`
3. Configuration options
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
4. ``Follow redirect mode`` - If you want disable Follow Redirect functionality, you can use option ``Follow redirect mode``.By default ``Follow redirect mode`` option has value ``Follow redirects``.

## Authorisation methods

To use the REST API component with any restricted access API provide the authorisation information.

![alt text](https://cdn.elastic.io/documentation/restapi-component-auth.png "REST API component Basic authorisation")
*Example above shows how to add the username/password to access the API during the integration flow design.*

You can add the authorisation methods during the integration flow design or by going to your `Settings > Security credentials > REST client` and adding there.

REST API component supports 3 authorisation types:

*   `No Auth` - use this method to work with any open REST API
*   `Basic Auth` - use it to provide login credentials like **username/password**
*   `API Key Auth` - use it to provide `API Key` to access the resource

Please note that the result of creating a credential is an HTTP header automatically placed for you. You can also specify the authorisation in the headers section directly.

## Defining HTTP headers

Use this section to add the request headers.

![alt text](https://cdn.elastic.io/documentation/rest-api-component-headers-get.png "REST API component Headers field")

Each header has a name and a value. Header name should be colon-separated name-value pairs in clear-text `string` format. The header value can use [JSONata](http://jsonata.org/) expressions.

*Note:* **HTTP Response headers** will not be stored, the components stores body and attachment only.
 
## Defining request body

The body may be defined if the HTTP method is not `GET`. The **body** tab enables configuration options such as the **content type** drop-down menu and the **body input field**.

Here is the list of all supported **content types**:

*   `multipart/form-data`
*   `application/x-www-form-urlencoded`
*   `text/plain`
*   `application/json`
*   `application/xml`
*   `text/xml`
*   `text/html`

The **body input field** changes according to the chosen content type.

*Notes:* 
1. **Response body** will be stored in msg.body
2. Request body that couses empty response body will return `{}`

### Sending JSON data

Here is how to send a JSON data in the body. Change the **content type** to `application/json` and the **body input part** would change accordingly to accept JSON object. Please note that this field supports [JSONata](http://jsonata.org) expressions.

![alt text](https://cdn.elastic.io/documentation/restapi-component-body-json-var.png "REST API component Body sending JSON data")
*Example shows the JSON in the body where the `name` parameter value gets mapped using the value of `project_name` from the previous step of integration.*

### Sending XML data

To send an `XML` data set the content type to `application/xml` or `text/xml` and place the `XML` in the body input field between double-quotes like:

```
"
<note>
  <to>" & fname & "</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>
"
```
Use a JSONata expression to include and map any values coming from the previous steps. It will replace the variable with a real value in the final mapping. Note that the rest of `XML` gets passed as a `string`.

### Sending Form data

To send a form data two content types are available:

*   `application/x-www-form-urlencoded` - used to submit simple values to a form
*   `multipart/form-data` - used to submit (non-alphanumeric) data or file attachment in payload

In both cases the payload gets transmitted in the message body.

In case of `application/x-www-form-urlencoded` content type add the necessary parameters by giving the name and the values like:

![alt text](https://cdn.elastic.io/documentation/restapi-component-body-form-simple.png "REST API component Body sending a simple form")
*Please note that parameter value fields support [JSONata](http://jsonata.org) expressions.*

This HTTP request would submit `key1=value1&key2=value2` in the message body.

In case of `multipart/form-data` content type add the parameters similarly.

![alt text](https://cdn.elastic.io/documentation/restapi-component-body-form-complex.png "REST API component Body sending a complex form")

The transmitted HTTP request body would be:

```
--__X_ELASTICIO_BOUNDARY__
Content-Disposition: form-data; name="part1"

Please note that this fields supports [JSONata](http://jsonata.org) expressions.
--__X_ELASTICIO_BOUNDARY__
Content-Disposition: form-data; name="part2"

<p>Some more text</p>
--__X_ELASTICIO_BOUNDARY__--
```

Notice how different parts get separated by the boundary. This form is capable of supporting attachments as well.

### Working with XML

This component will try to parse XML content types in the HTTP Response assuming the `Content-Type` header has a
**MIME Content Type** with `xml` in it (e.g. `application/xml`). 
In this case response body will be parsed to JSON using `xml2js` node library and following settings:

```js
{
    trim: false,
    normalize: false,
    explicitArray: false,
    normalizeTags: false,
    attrkey: '_attr',
    tagNameProcessors: [
        (name) => name.replace(':', '-')
    ]
}
```

for more information please see the 
[Documenattion of XML2JS library](https://github.com/Leonidas-from-XIV/node-xml2js#options)

## HTTP Headers 

You can to get HTTP response header only if ``Don`t throw Error on Failed Calls`` option is checked.
In this case output structure of component will be: 
```js
    {
      headers:<HTTP headers>,
      body:<HTTP response body>,
      statusCode:<HTTP response status code>
      statusMessage:<HTTP response status message>
    }
```

## Attachments
Rest API component has opportunity of binary data sending. You just need choose ``multipart/form-data`` Content type and attachments from input message will be included to the request payload automatically.

Rest-api component automatically load binary data to attachments with next content types in response headers:
* image/*
* text/csv
* application/msword
* application/msexcel
* application/pdf
* application/octet-stream

## Exception handling
Rest API component uses exception handling logic below: 
![Exception handling logic](https://user-images.githubusercontent.com/13310949/41960520-9bd468ca-79f8-11e8-83f4-d9b2096deb6d.png)

## Known Limitations

The component can parse any of json and xml content types. 
There are:
* application/json
* application/xml
* text/xml
* etc.

`If content type is not  exists  in response header, component will try parse response as json. 
If it get parse exception, it return response as is.`

> Make sure not to perform your tests using the [requestb.in](https://requestb.in/) since it responds with the `content-type: text/html`.

Attachments limitations:

1. Maximal possible size for an attachment is 10 MB.
2. Attachments mechanism does not work with [Local Agent Installation](https://support.elastic.io/support/solutions/articles/14000076461-announcing-the-local-agent-)


[circle-image]: https://circleci.com/gh/elasticio/rest-api-component.svg?style=svg&circle-token=2bf8e1f60133011d1fdea9505afdbabbd12b0c7b
[circle-url]: https://circleci.com/gh/elasticio/rest-api-component
