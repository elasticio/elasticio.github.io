---
layout: component
title: Utility Component
section: Utility components
description: A component that is designed for utility operations.
icon: utility.png
icontext: Utility Component
category: utility
updatedDate: 2021-02-12
ComponentVersion: 1.2.2
---

## Environment variables

* [optional] **EIO_REQUIRED_RAM_MB** - Number of MB allocated to container. Recommended value of allocated memory is `512` MB. 256 by default
* [optional] **REQUEST_TIMEOUT** - HTTP request timeout in milliseconds. 10000 by default
* [optional] **REQUEST_RETRY_DELAY** - Delay between retry attempts in milliseconds. 7000 by default
* [optional] **REQUEST_MAX_RETRY** - Number of HTTP request retry attempts. 7 by default
* [optional] **REQUEST_MAX_CONTENT_LENGTH** - Max size of HTTP request in bytes. 10485760 by default

## Technical Notes

The [technical notes](technical-notes) page gives some technical details about Utility component like [changelog](/components/utility/technical-notes#changelog).


## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### String To Attachment

Creates attachment from input `value`. Output is `attachmentId` and `attachmentUrl` in `message.body` and attachment object in `message.attachments`:

![String To Attachment](img/string-to-attachment.png)

#### Configuration fields description

* `encodeToBase64` - if checked encode an input `value` using Base64 encode. Than saves encoded value into attachment.

### String From Attachment

Creates string from attachment with provided input `attachmentId` which must be either:
* A numeric ID of the attachment that can be referenced in the step immediately prior
* A URL to an attachment produced by any component in the flow.

![String From Attachment](img/string-from-attachment.png)

#### Configuration fields description

* `decodeFromBase64` - if checked decode attachment content using Base64 decode before output. If content of attachment is malformed or not Base64 encoded string, result will be malformed.  

### Base64 Decode

Decodes input `value` using Base64 decoding to regular string. If malformed input provided or not Base64 encoded string, result will be malformed:

![Base64 Decode](img/decode.png)

### Base64 Encode

Encodes input `value` using Base64 encoding:

![Base64 Encode](img/encode.png)

### Convert Between Timezones

Given two timezones and an array of timestamps (without any timezone info) converts the timestamps to the output timezone. The output is a dictionary of oldTimezone -> newTimezone values:

![Convert Between Timezones](img/convert-between-timezones.png)

E.g. If converting from UTC to German time then

`{timesToConvert: ['2020-01-01T12:00:00', '2020-07-01T12:00:00']}`

produces

```
{
  '2020-01-01T12:00:00': '2020-01-01T13:00:00+01:00',
  '2020-07-01T12:00:00': '2020-07-01T14:00:00+02:00',
}
```

This component takes into account that Germany is ahead of UTC 1 hour in Winter and 2 hours in the Summer.
The possible format of incoming strings is deliberately broad to account for as large a range of possible timestamps.
Epoch time conversion is not supported.


## Limitations

1. Maximal possible size for an attachment is 10 MB.
2. Attachments mechanism does not work with [Local Agent](/getting-started/local-agent) Installation.
