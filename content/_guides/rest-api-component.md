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

## Authentication methods

The majority of REST APIs require their clients to authenticate when sending
HTTP requests. In the {{site.data.tenant.name}} platform we use
[Credentials](/getting-started/credential) to authenticate, as shown below.

![Authentication methods](/assets/img/integrator-guide/rest-api/rest-api-component-01.png "Authentication methods")

As you can see above REST API component supports 3 authentication types:

*   `No Auth` - used to work with any open REST API
*   `Basic Auth` - used to provide username and password for APIs that authenticate clients using [Basic Access Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).
*   `API Key Auth` - used to provide `API Key` to access the resource

Please note that the result of creating a credential is an HTTP header automatically
placed for you. You can also specify the authentication method in the
[headers section](#defining-http-headers) directly.

Now let us use the `Basic Auth` as an example. The following screenshot demonstrates
how to define the username and password for the `Basic Auth` method.

![Basic Auth](/assets/img/integrator-guide/rest-api/rest-api-component-02.png "Basic Auth")

## Configuring component

The example below shows how to send `POST` request to JSON API, such as {{site.data.tenant.name}}
[REST API](https://api.{{site.data.tenant.name}}/docs) using the REST API component.

![REST API component features](/assets/img/integrator-guide/rest-api/rest-api-component-03.png "REST API component features")

Now let us explore the annotations on the screenshot above:

1.  `Method`: REST API component supports the following HTTP methods: `GET`, `PUT`, `POST`, `DELETE` and `PATCH`.
2.  `URL`: Used to define the request target URL. Please note that this field accepts [JSONata](http://jsonata.org/) expressions.
3.  `Headers`: Used to define request headers. Covered [further down](#defining-http-headers).
4.  `Body`: Used to define a body of the request, if the HTTP method is not `GET`. [Covered separately](#defining-http-body)


## Defining HTTP headers

Use this section to add the request headers.

![REST API component Headers field](/assets/img/integrator-guide/rest-api/rest-api-component-04.png "REST API component Headers field")

As you can see above each header has a name and a value. You can add as many
headers as you need. The header names can contain multiple words connected by
the hyphen (`-`). The header value must be a [JSONata](http://jsonata.org)
expression. For example, the value for the header *Content-type* is
`"application/json"` which is a JSONata string.

Now let's see how to define a request body in the next section.

## Defining HTTP body

The body may be defined if the HTTP method is not `GET`. The *Body* tab
enables configuration options such as the *content type* drop-down menu and
the *body input field*.

Here is the list of all supported `content-types`:

*   `multipart/form-data`
*   `application/x-www-form-urlencoded`
*   `text/plain`
*   `application/json`
*   `application/xml`
*   `text/xml`
*   `text/html`

The *body input field* changes according to the chosen content type. Now let's
explore how to use `application/json` content type to send JSON payloads.

### Sending JSON payload

Here is how to send a JSON data in the body. Change the `content-type` to
`application/json` and the *body input part* would change accordingly to
accept JSON object.

![REST API component Body sending JSON data](/assets/img/integrator-guide/rest-api/rest-api-component-05.png "REST API component Body sending JSON data")

In the screenshot above you can see a JSON object in the *Body* text area. This
object is actually a [JSONata](http://jsonata.org) expression in which the value
of `data.attributes.name` property is defined by `project_name` variable provided
by the previous step of this integration flow.

Any response from an external API resource with a content type `application/json`
is fully supported. Now let's explore how  the `XML` is used and parsed.

### Working with XML data

To send an `XML` data set the content type to `application/xml` or `text/xml`
and place the `XML` in the `Body` text area between double-quotes as it is shown below.

![Sending XML data](/assets/img/integrator-guide/rest-api/rest-api-component-06.png "Sending XML data")

Again, the `Body` text area expects a [JSONata](http://jsonata.org) expression.
Therefore, you need to provide the XML payload as a string which may be combined
with the variables from previous steps. For example, in the screenshot above, we
used the `project_name` variable to provide a value for the `<to>` tag.

In case when the third party resource responds in `XML` the component will parse it
only when the reply object would have a `Content-Type` of `application/xml`
or `text/xml` set as MIME Content Type. We will use a different third party resource
to receive an `XML` response.

Here is an example where the `XML` gets parsed by the {{site.data.tenant.name}}.
![Receiving an XML data](/assets/img/integrator-guide/rest-api/rest-api-component-07.png "Receiving an XML data")

The screenshot above shows how the `XML` is received and parsed to JSON using
`xml2js` node library with a following settings:

```
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
For more information please see the
[Documentation of XML2JS library](https://github.com/Leonidas-from-XIV/node-xml2js#options)

### Sending Form data

To send a form data two content types are available:

*   `application/x-www-form-urlencoded` - used to submit simple values to a form
*   `multipart/form-data` - used to submit (non-alphanumeric) data or file attachment in payload

In both cases the payload gets transmitted in the message body.

In case of `application/x-www-form-urlencoded` content type add the necessary
parameters by giving the name and the values like:

![REST API component Body sending a simple form](/assets/img/integrator-guide/rest-api/rest-api-component-08.png "REST API component Body sending a simple form")

> **Note** The parameter value fields support [JSONata](http://jsonata.org) expressions.

This HTTP request would submit `key1=value1&key2=value2` in the message body.

In case of `multipart/form-data` content type add the parameters similarly.

![REST API component Body sending a complex form](/assets/img/integrator-guide/rest-api/rest-api-component-09.png "REST API component Body sending a complex form")

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

If the response content-type is anything else than `application/json`,
`application/xml` and `text/xml` then the component will throw an error and
stop the execution.

In particular the REST API component still does not allow you to:

*   Process the multi-part responses
*   Process the HTML/Plain-text responses

Here are some further limitation of the REST API component:

*   Status code of the HTTP response is not available in the component output
*   Ignores and does not store HTTP Response headers
*   Does not follow redirects
*   No native `XML` support
*   No attachment support
