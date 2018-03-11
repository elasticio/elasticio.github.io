---
title: REST API component
layout: article
section: Building integration flows
order: 0
newFeatureSince: 20171101
---

The **REST API component** is a simple yet powerful component that allows you to
connect to any REST API without programming your own components and deploying
them into the {{site.data.tenant.name}} platform.

The REST API component will perform a single REST API call when executed. Incoming
data can gets used to configure the API call made and the response from the API
call will be the output.

This document covers the following topics:

*   [Introduction](#introduction)
*   [Authorisation methods](#authorisation-methods)
*   [Defining HTTP headers](#defining-http-headers)
*   [Defining request body](#defining-http-body)
*   [Known Limitations](#known-limitations)

## Introduction

The example below shows the development team creation using the REST API component
with {{site.data.tenant.name}}
[REST API service](https://api.{{site.data.tenant.name}}/docs "{{site.data.tenant.name}} REST API service").

![REST API component features](/assets/img/integrator-guide/rest-api/rest-api-component-1.png "REST API component features")
*Numbers show: (1) HTTP methods, (2) the URL of the REST API resource, (3) the HTTP call headers and (4) the body of the HTTP request.*

1.  REST API component supports the following HTTP methods: `GET`, `PUT`, `POST`, `DELETE` and `PATCH`.
2.  The URL of the REST API accepts JSONata expressions, meaning the URL address evaluates [JSONata](http://jsonata.org/) expressions.
3.  Definition of request [headers](#defining-http-headers)
4.  Definition of request [body](#defining-http-body), if the HTTP method is not `GET`

## Authorisation methods

To use the REST API component with any restricted access API provide the
authorisation information.

![REST API component Basic authorisation](/assets/img/integrator-guide/rest-api/rest-api-component-2.png "REST API component Basic authorisation")
*Example above shows how to add the username/password to access the API during the integration flow design.*

You can add the authorisation methods during the integration flow design or by
going to your `Settings > Security credentials > REST client` and adding there.

REST API component supports 3 authorisation types:

*   `No Auth` - use this method to work with any open REST API
*   `Basic Auth` - use it to provide login credentials like **username/password**
*   `API Key Auth` - use it to provide `API Key` to access the resource

Please note that the result of creating a credential is an HTTP header automatically
placed for you. You can also specify the authorisation in the headers section directly.

## Defining HTTP headers

Use this section to add the request headers.

![REST API component Headers field](/assets/img/integrator-guide/rest-api/rest-api-component-3.png "REST API component Headers field")

Each header has a name and a value. Header name should be colon-separated
name-value pairs in clear-text `string` format. The header value can use
[JSONata](http://jsonata.org/) expressions.

## Defining request body

The body may be defined if the HTTP method is not `GET`. The **body** tab
enables configuration options such as the **content type** drop-down menu and
the **body input field**.

Here is the list of all supported **content types**:

*   `multipart/form-data`
*   `application/x-www-form-urlencoded`
*   `text/plain`
*   `application/json`
*   `application/xml`
*   `text/xml`
*   `text/html`

The **body input field** changes according to the chosen content type.

### Sending JSON data

Here is how to send a JSON data in the body. Change the **content type** to
`application/json` and the **body input part** would change accordingly to
accept JSON object. Please note that this field supports [JSONata](http://jsonata.org) expressions.

![REST API component Body sending JSON data](/assets/img/integrator-guide/rest-api/rest-api-component-4.png "REST API component Body sending JSON data")
*Example shows the JSON in the body where the `name` parameter value gets mapped using the value of `project_name` from the previous step of integration.*

### Sending XML data

To send an `XML` data set the content type to `application/xml` or `text/xml`
and place the `XML` in the body input field between double-quotes like:

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
Use a JSONata expression to include and map any values coming from the previous
steps. It will replace the variable with a real value in the final mapping. Note
that the rest of `XML` gets passed as a `string`.

### Sending Form data

To send a form data two content types are available:

*   `application/x-www-form-urlencoded` - used to submit simple values to a form
*   `multipart/form-data` - used to submit (non-alphanumeric) data or file attachment in payload

In both cases the payload gets transmitted in the message body.

In case of `application/x-www-form-urlencoded` content type add the necessary
parameters by giving the name and the values like:

![REST API component Body sending a simple form](/assets/img/integrator-guide/rest-api/rest-api-component-5.png "REST API component Body sending a simple form")
*Please note that parameter value fields support [JSONata](http://jsonata.org) expressions.*

This HTTP request would submit `key1=value1&key2=value2` in the message body.

In case of `multipart/form-data` content type add the parameters similarly.

![REST API component Body sending a complex form](/assets/img/integrator-guide/rest-api/rest-api-component-6.png "REST API component Body sending a complex form")

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

Notice how different parts get separated by the boundary. This form is capable
of supporting attachments as well.

## Known Limitations

**If the response content-type is anything else than `application/json` then
the component will through an error and stop the execution**. In particular the
REST API component still:

*   Can't handle XML Responses
*   Can't handle multi-part responses
*   Can't handle HTML/Plain-text responses

> Make sure not to perform your tests using the [requestb.in](https://requestb.in/)
> since it responds with the `content-type: text/html`.

Here are some further limitation of the REST API component:

*   HTTP Response code gets ignored
*   Ignores and does not store HTTP Response headers
*   Can't handle redirects
*   No native `XML` support
*   No attachment support
