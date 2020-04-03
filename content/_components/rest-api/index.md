---
title: REST API component
layout: component
section: Utility components
description: A component allows you to connect to any REST API without programming your own components.
icon: rest-api.png
icontext: REST API component
category: REST API component
createdDate: 2018-07-17
updatedDate: 2020-04-01
---

## Latest changelog

**1.2.3 (April 1, 2020)**

* New Jsonata expressions support: `$getFlowVariables` and `$getPassthrough`

> To see the full **changelog** please use the following [link](/components/rest-api/changelog).

## Introduction

The example below shows the development team creation using the REST API component with our own [REST API service](https://api.{{site.data.tenant.name}}/docs "{{site.data.tenant.name}} REST API service").

![Configure Input - Rest API](img/configure-input.png)
*Numbers show: (1) The URL and method of the REST API resource, (2) the HTTP call headers. (3) configuration options and (4) follow redirect mode.*

1.  HTTP methods and URL
 * REST API component supports the following HTTP methods: `GET`, `PUT`, `POST`, `DELETE` and `PATCH`.
 * The URL of the REST API resources. Accepts JSONata expressions, meaning the URL address evaluates [JSONata](http://jsonata.org/) expressions.
2. Request Headers and Body
 * Definition of request [headers](#defining-http-headers)
 * Definition of request [body](#defining-request-body), if the HTTP method is not `GET`
3. Configuration options
 * ``Don`t throw Error on Failed Calls`` - if enabled return error, error code and stacktrace in message body otherwise throw error in flow.
 * ``Split Result if it is an Array`` - if enabled and response is array, creates message for each item of array. Otherwise create one message with response array.
  * ``Split Result if it is an Array`` - if enabled and response is array, creates message for each item of array. Otherwise create one message with response array.
 * ``Enable debug logging`` - The component supports extended logging. `Enable debug logging` checkbox should be enabled for it. After that you may check your logs in the logs console.

    >**Please note** that in case of using **ordinary flows**, adding of `DEBUG` environment variable in component repository will override disabled `Enable debug logging` checkbox during flow run, so all logs will be extended until an environment variable is removed.

 * ``Retry on failure`` - enabling [rebound](/getting-started/rebound) feature for following HTTP status codes:

    - 408: Request Timeout
    - 423: Locked
    - 429: Too Many Requests
    - 500: Internal Server Error
    - 502: Bad Gateway
    - 503: Service Unavailable
    - 504: Gateway Timeout
    - DNS lookup timeout

4. ``Follow redirect mode`` - If you want disable Follow Redirect functionality, you can use option ``Follow redirect mode``.By default ``Follow redirect mode`` option has value ``Follow redirects``.

## Triggers

### HTTP request

Trigger will send a GET/POST/PUT/DELETE HTTP request and parse the response back to the flow.

### Fields

  * Don't throw Error on Failed Calls

  * Split Result if it is an Array
  > **Note:** After making the request, and applying the above JSONata expression, if the result is an array and this box is checked, we will emit one message for each element of the array.

  * Retry on failure

  * Follow redirect mode

## Actions

### Fields

* Don't throw Error on Failed Calls

* Split Result if it is an Array
> **Note:** After making the request, and applying the above JSONata expression, if the result is an array and this box is checked, we will emit one message for each element of the array.

* Retry on failure

* Follow redirect mode

### HTTP request

Action will send a GET/POST/PUT/DELETE HTTP request and parse the response back to the flow.

## Authorisation methods

To use the REST API component with any restricted access API provide the authorisation information.

![Choose credentials](img/choose-credentials.png)

*Example above shows how to add the username/password to access the API during the integration flow design.*

You can add the authorisation methods during the integration flow design or by going to your `Settings > Security credentials > REST client` and adding there.

REST API component supports 4 authorisation types:

*   `No Auth` - use this method to work with any open REST API
*   `Basic Auth` - use it to provide login credentials like **username/password**
*   `API Key Auth` - use it to provide `API Key` to access the resource
*   `OAuth2` - use it to provide `Oauth2` credentials to access the resource. Currently it is implemented `Authorization code` OAuth2 flow.

> **Please note** that the result of creating a credential is an HTTP header automatically placed for you. You can also specify the authorisation in the headers section directly.

## Defining HTTP headers

Use this section to add the request headers.

![HTTP Headers](img/http-headers.png "REST API component Headers field")

Each header has a name and a value. Header name should be colon-separated name-value pairs in clear-text `string` format. The header value can use [JSONata](http://jsonata.org/) expressions.

> **Note: HTTP Response headers** will not be stored, the components stores body and attachment only.

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

>**Notes:**
1. **Response body** will be stored in msg.body
2. Request body that causes empty response body will return `{}`

### Sending JSON data

Here is how to send a JSON data in the body. Change the **content type** to `application/json` and the **body input part** would change accordingly to accept JSON object. Please note that this field supports [JSONata](http://jsonata.org) expressions.

![Configure Input - Body](img/body-sending-json-data.png "REST API component Body sending JSON data")

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

![Sending form data](img/sending-form-data.png "REST API component Body sending a simple form")
*Please note that parameter value fields support [JSONata](http://jsonata.org) expressions.*

This HTTP request would submit `key1=value1&key2=value2` in the message body.

In case of `multipart/form-data` content type add the parameters similarly.

![Sending multipart form data](img/sending-multipart-form-data.png "REST API component Body sending a complex form")

The transmitted HTTP request body would be:

```
--__X_BOUNDARY__
Content-Disposition: form-data; name="part1"

Please note that this fields supports [JSONata](http://jsonata.org) expressions.
--__X_BOUNDARY__
Content-Disposition: form-data; name="part2"

<p>Some more text</p>
--__X_BOUNDARY__--
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
* application/msexcgel
* application/pdf
* application/octet-stream
* application/x-binary
* application/binary
* application/macbinary

## Exception handling

Rest API component uses exception handling logic below:
![Exception handling logic](https://user-images.githubusercontent.com/13310949/41960520-9bd468ca-79f8-11e8-83f4-d9b2096deb6d.png)

## Known Limitations

**1.** The component can parse any of json and xml content types.
There are:
* application/json
* application/xml
* text/xml
* etc.

> If content type is not  exists  in response header, component will try parse response as json. If it get parse exception, it return response as is.

**2.** Attachments limitations:

  1. Maximal possible size for an attachment is 10 MB.

  2. Attachments mechanism does not work with [Local Agent Installation](/references/local-agents-requesting#compatible-operating-systems)

  3. OAuth2 authentication strategy limitation: [Access Token Response](https://www.oauth.com/oauth2-servers/access-tokens/access-token-response/) contains `refresh_token` optional property, but due to EIO platform limitation it is required.
Possible solution - use access_type:offline in additional parameters (may not work in some cases).
