---
title: Utility Component
layout: component
section: Utility components
description: A component that is designed for utility operations.
icon: utility.png
icontext: Utility Component
category: Utility Component
createdDate: 2019-07-29
updatedDate: 2019-07-31
---

## Latest changelog

**1.0.0 (July 25, 2019)**

* Initial release

* New actions:

  - String to  Attachment
  - Attachment to String
  - Base64 Decode
  - Base64 Encode

> To see the full **changelog** please use the following [link](/components/utility/changelog).

## Environment variables

* [optional] **EIO_REQUIRED_RAM_MB** - Number of MB allocated to container. Recommended value of allocated memory is `512` MB. 256 by default
* [optional] **REQUEST_TIMEOUT** - HTTP request timeout in milliseconds. 10000 by default
* [optional] **REQUEST_RETRY_DELAY** - Delay between retry attempts in milliseconds. 7000 by default
* [optional] **REQUEST_MAX_RETRY** - Number of HTTP request retry attempts. 7 by default
* [optional] **REQUEST_MAX_CONTENT_LENGTH** - Max size of HTTP request in bytes. 10485760 by default

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### String To Attachment

Creates attachment from input `value`. Output is `attachmentId` in `message.body` and attachment object in `message.attachments`.

#### Configuration fields description

* `encodeToBase64` - if checked encode an input `value` using Base64 encode. Than saves encoded value into attachment.

### String From Attachment

Creates string from attachment with provided input `attachmentId`.

#### Configuration fields description

* `decodeFromBase64` - if checked decode attachment content using Base64 decode before output. If content of attachment is malformed or not Base64 encoded string, result will be malformed.  

### Base64 Decode

Decodes input `value` using Base64 decoding to regular string. If malformed input provided or not Base64 encoded string, result will be malformed.

### Base64 Encode

Encodes input `value` using Base64 encoding.

## Limitations

1. Maximal possible size for an attachment is 10 MB.
2. Attachments mechanism does not work with Local Agent Installation
