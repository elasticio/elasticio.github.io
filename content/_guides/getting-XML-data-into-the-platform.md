---
title: Getting XML data into the platform
layout: article
section: Working with XML
category: XML
order: 2
---

## Description

There are multiple ways you could process externally-stored XML data, here we will describe some common patterns on getting XML data into your integration flow.

## Accepting XML payload over HTTP

You can send an XML Payload over HTTP and accept it using our WebHook component, however, there are multiple ways to do that that will be handled slightly different.

## HTTP Post with XML as a Body

You can send your XML document as a Body via HTTP Post. Your HTTP request must have following properties:

  * HTTP Request method should be POST

  * Content type of your request should be application/xml

  * Body of your HTTP request should only include your XML content

Here how you can post your XML data using curl

```xml
curl -X POST -H "Content-Type: application/xml" -d '<foo>Hello XML!</foo>' https://in.platform.address/hooks/your-hook
```

Here how such POST looks like on request-bin:

![POST looks like-on request bin 1](/assets/img/getting-started/working-with-XML/POST-looks-like-on-request-bin-1.png)

In this case, your XML document will be parsed and transformed into JSON document automatically. Resulting JSON Document will be used as placed in a body of your message and message will be sent to the next component in the flow. Here is how such message will look like:

```js
{
  "id": "2b90def0-d250-11e6-a2f1-5b2841bfd572",
  "attachments": {},
  "body": {
    "foo": "Hello XML!"
  },
  "headers": {
    "x-real-ip": "10.0.5.31, 10.0.5.31",
    "host": "in.platform.address",
    "x-forwarded-for": "10.0.5.31",
    "x-nginx-proxy": "true",
    "x-forwarded-proto": "https",
    "connection": "upgrade",
    "content-length": "21",
    "user-agent": "curl/7.51.0",
    "accept": "*/*",
    "content-type": "application/xml"
  }
}
```
>**Note:** as your XML payload will be automatically parsed and transformed to JSON you would be aware that invalid XML document will cause an HTTP 400 "Bad Request" error (e.g. close tag is missing).

## HTTP Post with XML file as attachment

If you don't like how XML is parsed and represented as JSON object or you would like to preserve your XML file for further processing, then you can send your XML file as multipart - using multipart/form-data content type, so your HTTP request should be:

  * Method should be POST

  * Content type should be multipart/form-data

  * We recommend that your XML file inside your request should have a content type application/xml

You can generate such request using curl like following:

```xml
curl -F "propertyName=@data.xml" https://requestb.in/twm9t5tw
```

And in request bin it will look like:

![POST looks like-on request bin 2](/assets/img/getting-started/working-with-XML/POST-looks-like-on-request-bin-2.png)

After receiving such HTTP request WebHook component will upload your file to the platform attachments storage and place a reference to it inside the attachments part of the generate message:

```js
{
  "id": "2b90def0-d250-11e6-a2f1-6b2841bfd574",
  "attachments": {
    "data.xml" : {
      "url": "http://steward.marathon.mesos:8091/files/1cfc3a71-d7a7-44e6-a15e-ae18860d537c",
      "content-type": "application/xml"
    }
  },
  "body": {
  },
  "headers": {
    "x-real-ip": "10.0.5.31, 10.0.5.31",
    "host": "in.platform.address",
    "x-forwarded-for": "10.0.5.31",
    "x-nginx-proxy": "true",
    "x-forwarded-proto": "https",
    "connection": "upgrade",
    "content-length": "21",
    "user-agent": "curl/7.51.0",
    "accept": "*/*",
    "content-type": "application/xml"
  }
}
```

>**Note:** Your XML file won't be parsed and be stored as it is, it's the responsibility of the component to handle parsing/validation/transformation later.

## Reading XML files from external location

You can read XML files from the external location, e.g. URI or FTP or any other file storage service. For example, you can take the SFTP component, every file SFTP component will find on your server will be sent as an attachment, similar to the sample above. If you would like to parse the attachments.
