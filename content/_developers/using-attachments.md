---
title: Using Attachments
description: This document describes attachments. It also explains how attachments work and how to create them.
layout: article
section: How-Tos and Tutorials
order: 7
redirect_from:
  - /guides/using-attachments.html
---

This document describes [attachments](#binary-data). It also explains
[how attachments work](#how-attachments-work) and [how to create them](#how-to-create-attachments).

> **Please Note** that {{site.data.tenant.name}} attachment limit is 100MB. If you send bigger
> attachment or your flow generates bigger attachments you will get an error.

## Binary Data

Sometimes it's required to send binary data as part of integration
[Flow](/getting-started/integration-flow.html). Typical examples are:

-   Transferring product images together with the product description.

-   Transferring custom-encoded files before they could be parsed and transformed to JSON messages, for example, SFTP Component may read `CSV` file without parsing it, while CSV component later will parse it and transform to `JSON` messages.

-   Preserving native data format while working with it in components, for example, sometimes it's required to work natively on `XML` without `XML-JSON-XML` transformation.

-   Handle large amounts of data as a single batch/bulk - as you know memory is an expensive resource and your components should be aware of it, but sometimes it's required to batch a large number of messages - attachment storage could be a good accumulator where you can safely and efficiently stream to and stream from.


## How Attachments Work

As you know, {{site.data.tenant.name}} uses an asynchronous message-oriented
middleware (MOM) between the integration Flow steps, it ensures Flow reliability
and scalability. MOM is multi-tenant (in the multi-tenant plans) hence quality
of service and internal load balancing have to be ensured. It's much simpler to
implement if messages in the queues are roughly the same size so that broker don't
spend too much time on transferring a single multi-gigabyte message while thousands
of smaller messages are waiting for their turn.

It is impractical to stream large payloads through MOM broker, therefore,
binary attachments have to be offloaded to the external storage and linked by
reference within the {{site.data.tenant.name}} message. We are using a reserved
place in the message structure called *attachments* to store attachment references.

**EXAMPLE:**

```json
{
   "body": {
      "sku": "1234",
      "name": "MePhone Y Pro",
      "vendor": "Pear"
   },
   "attachments" : {
      "frontview.jpeg": {
         "content-type": "image/jpeg",
         "size": "45889",
         "url": "http://steward_host/files/1cfc3a71-d7a7-44e6-a15e-ae18860d537c"
      }
   }
}
```

As you can see, attachments are stored as a map, where keys are attachment names
and values are defined as:

| Value                             | Description                   |
|-------------------------------------|---------------------------------|
| `content-type` | **(Optional)**. [MIME content type](https://en.wikipedia.org/wiki/Media_type) of the attachment, will help you to get an initial idea of what could be inside. |
| `size`         | **(Optional)** Size of the attachment in bytes. |
| `url`          | HTTP URL where your component may download the attachment, you can be sure that URL contains all information you need to download it, no additional authentication should be required. |

>**NOTE 1:** You shouldn't assume or expect anything about the format or host/port
part of that URL, as it could be changed without the prior notice.

>**NOTE 2:** attachment URLs are internal {{site.data.tenant.name}} cluster specific
URLs and can not be accessed from outside of the cluster.

## How to Create Attachments

We have established that a component may access attachments so that you could
work with binary data in your Component. However, what if you would like to
receive/pull binary data and make it available as an attachment to the next component?
It's also easy to do via {{site.data.tenant.name}} API.

To create a new attachment you would need to do an `HTTP POST` to the following URL:

```sh
curl {{site.data.tenant.apiBaseUri}}/v2/resources/storage/signed-url \
   -X POST \
   -u {EMAIL}:{APIKEY}
```

Please make sure you are using authentication credentials that can be found in
your container's environment variables. It will return something like this:

```json
{
  "get_url": "http://steward_host/files/ea941d07-3ff5-4df1-b812-1bae2f0b9c36",
  "put_url": "http://steward_host/files/ea941d07-3ff5-4df1-b812-1bae2f0b9c36",
  "expires": 18000
}
```

Now you can use `put_url` to store your binary data and `get_url` you should
place into the attachment section (as shown above) so that the next Component
can read your binary data.

## Related links

- [Integration Flow Overview](/getting-started/integration-flow.html)
