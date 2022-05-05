---
title: HTTP request
layout: component
description: Information on how works HTTP request in REST API component.
icon: rest-api.png
icontext: REST API component
category: rest-api
updatedDate: 2022-04-08
ComponentVersion: 2.0.12
---

## HTTP request function

In a REST API component the trigger and action perform the same function - HTTP request witch will send a `GET`/`POST`/`PUT`/`PATCH`/`DELETE` requests and parse the response back to the flow.

### Output

The messages produced by the REST API component will have the following properties:

* `headers`: Object containing the HTTP response headers
* `statusCode`: HTTP Status Code of the Response. Number between `100` and `599`
* `statusMessage`: Human readable equivalent to the response code
* `body`: The contents of the HTTP response body:
  * When the content type header includes `json`, then the result will be parsed into the corresponding object
  * When the content type header includes `xml`, then the result will be converted into the JSON equivalent of the represented XML using the same rules as above
  * When the content type header includes one of `image`, `msword`, `msexcel`, `pdf`, `csv`, `octet-stream` or `binary` the request body contents will be stored as an attachment and there will be no `body` property in the outgoing message
  * When there is no body (because the content-length is 0), then there will be no `body` property in the outbound message.
  * If there is another content type, then the response will be treated as text
  * If the content type header is omitted, then an attempt to convert the result to JSON will be made. If that fails, then the result will be treated as if it were text.

> For more details you can see the [usage example](/components/rest-api/usage-example).

## Defining request body

If the HTTP method is any other but `GET`, you will see a **Body** tab appear next to the Header tab. The **Body** tab enables
configuration options such as the **content type** drop-down menu and the **body input field**.

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
1.  **Response body** will be stored in `msg.body`
2.  Request body that causes empty response body will return `{}`

### Sending JSON data

Here is how to send a JSON data in the body. Change the **content type** to
`application/json` and the **body input part** would change accordingly to accept
JSON object. Please note that this field supports [JSONata](http://jsonata.org) expressions.

![Configure Input - Body](img/body-sending-json-data.png "REST API component Body sending JSON data")

*Example shows the JSON in the body where the `name` parameter value gets mapped using the value of `project_name` from the previous step of integration.*

### Sending XML data

To send an `XML` data, set the content type to `application/xml` or `text/xml` and place the `XML` in the body input field between double-quotes like:

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

To send a form data, two content types are available:

*   `application/x-www-form-urlencoded` - used to submit simple values to a form
*   `multipart/form-data` - used to submit (non-alphanumeric) data or file attachment in payload

In both cases the payload gets transmitted in the message body.

In case of `application/x-www-form-urlencoded` content type, add the necessary parameters by giving the name and the values like:

![Sending form data](img/sending-form-data.png "REST API component Body sending a simple form")

> **Please note:** the parameter value fields support [JSONata](http://jsonata.org) expressions.*

This HTTP request would submit `key1=value1&key2=value2` in the message body.

In case of `multipart/form-data` content type, add the parameters similarly.

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

You can get HTTP response header only if ``Don`t throw Error on Failed Calls`` option is checked.
In this case output structure of component will be:

```js
    {
      headers:<HTTP headers>,
      body:<HTTP response body>,
      statusCode:<HTTP response status code>
      statusMessage:<HTTP response status message>
    }
```

### Defining HTTP headers

Use this section to add the request headers.

![HTTP Headers](img/http-headers.png "REST API component Headers field")

Each header has a name and a value. Header name should be colon-separated
name-value pairs in clear-text `string` format. The header value can use
[JSONata](http://jsonata.org/) expressions.

> **Please note: HTTP Response headers** will not be stored, the components stores body and attachment only.
