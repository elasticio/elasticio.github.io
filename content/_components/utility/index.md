---
layout: component
title: Utility сomponent
section: Utility components
description: A component that is designed for utility operations.
icon: utility.png
icontext: Utility сomponent
category: utility
updatedDate: 2025-09-16
ComponentVersion: 1.8.0
---

# Utility Component 
## Table of Contents
* [Description](#description)
  * [Environment variables](#environment-variables)
* [Actions](#actions)
  * [Get file metadata](#get-file-metadata)  
  * [String To Attachment](#string-to-attachment)
  * [String From Attachment](#string-from-attachment)
  * [Base64 Decode](#base64-decode)
  * [Base64 Encode](#base64-encode)
  * [Convert Between Timezones](#convert-between-timezones)
  * [Delay](#delay)
  * [Log Message](#log-message)
  * [Create JSON patch](#create-json-patch)
  * [Apply JSON patch](#apply-json-patch)
  * [Network Diagnostics](#network-diagnostics)
* [Limitations](#limitations)


## Description
A component that is designed for utility operations.

## Environment variables

* [optional] **EIO_REQUIRED_RAM_MB** - Number of MB allocated to container. 1024 by default
* [optional] **REQUEST_TIMEOUT** - HTTP request timeout in milliseconds. 10000 by default
* [optional] **REQUEST_RETRY_DELAY** - Delay between retry attempts in milliseconds. 7000 by default
* [optional] **REQUEST_MAX_RETRY** - Number of HTTP request retry attempts. 7 by default
* [optional] **REQUEST_MAX_CONTENT_LENGTH** - Max size of HTTP request in bytes. 10485760 by default

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Get file metadata
Collects useful metadata for a file from a provided URL.

#### Config Fields
None

#### Input Metadata
* **File Url** (string, required) - URL of the file to retrieve metadata for: supports both internal and external URLs

#### Output Metadata
* **size** (integer) - Size of the file in bytes
* **md5** (object) - MD5 checksum of the file in hex and base64 formats
* **sha1** (object) - SHA-1 checksum of the file in hex and base64 formats
* **sha256** (object) - SHA-256 checksum of the file in hex and base64 formats
* **sha512** (object) - SHA-512 checksum of the file in hex and base64 formats
* **crc32** (string) - CRC32 checksum of the file
* **mime** (string) - MIME type identifying the file format
* **ext** (string) - File extension indicating the file format
* **filename** (string) - Name of the file, including its extension

> **Please Note:**
* `filename` is taken from the headers (Content-Disposition). If empty, it is taken from the URL. If that is also empty, the default name `file.` + `ext` is used.
* `mime` and `ext` will be determined from the data when possible. If not, we will try to obtain them from the headers. If those are also unavailable, the defaults `text/plain` and `txt` will be used, respectively.

### String To Attachment

Creates attachment from input `value`. Output is `attachmentId` and `attachmentUrl` in `message.body` and attachment object in `message.attachments`.

#### Configuration fields description
* Decode/Encode Base64 Before Upload (Select View, optional):
  * `Decode Base64 as binary` - decode an input `value` as binary data
  * `Decode Base64 as plain text` - decode an input `value` as plain text (in UTF-8 encoding)
  * `Encode text to Base64` - encode an input `value` using Base64 encode. Than saves encoded value into attachment.
  * `No encoding/decoding` - just skip any encoding/decoding. The only purpose of this option to secure the backward compatibility. Select it if you don't need any data encoding or decoding.

### String From Attachment

Creates string from attachment with provided input `attachmentId` which must be either:
* A numeric ID of the attachment that can be referenced in the step immediately prior
* A URL to an attachment produced by any component in the flow.

#### Configuration fields description
* `decodeFromBase64` - if checked decode attachment content using Base64 decode before output. If content of attachment is malformed or not Base64 encoded string, result will be malformed.

#### Configuration fields description

* `decodeFromBase64` - if checked decode attachment content using Base64 decode before output. If content of attachment is malformed or not Base64 encoded string, result will be malformed.

### Base64 Decode

Decodes input `value` using Base64 decoding to regular string. If malformed input provided or not Base64 encoded string, result will be malformed:

{% include img.html max-width="100%" url="img/decode.png" title="Base64 Decode" %}

### Base64 Encode

Encodes input `value` using Base64 encoding:

{% include img.html max-width="100%" url="img/encode.png" title="Base64 Encode" %}

### Convert Between Timezones

Given two timezones and an array of timestamps (without any timezone info) converts the timestamps to the output timezone. The output is a dictionary of oldTimezone -> newTimezone values:

{% include img.html max-width="100%" url="img/convert-between-timezones.png" title="Convert Between Timezones" %}

#### Config Fields
* `From Timezone` - dropdown, required. The timezone to convert from.
* `To Timezone` - dropdown, required. The timezone to convert to.
* `Create named time values` - checkbox, optional. When checked, the input metadata should be an array of objects rather than strings, and the output will provide converted time values named according to the original message keys.

#### Input Metadata
* `timesToConvert` - The content of this field depends on the `Create named time values` checkbox:
  * If **unchecked**, this should be an array of strings, for example:
  ```json
  {
    "timesToConvert": [
      "2020-01-01T12:00:00",
      "2020-07-01T12:00:00"
    ]
  }
  ```
  * If **checked**, this should be an array of objects, for example:
  ```json
  {
    "timesToConvert": [
      {
        "createdDate": "2020-01-01T12:00:00"
      },
      {
        "updatedDate": "2020-07-01T12:00:00"
      }
    ]
  }
  ```

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

### Delay

Introduce a delay before passing the message to the next step.

{% include img.html max-width="100%" url="img/delay.png" title="Delay" %}

#### Config Fields

There are two options for delay behavior:

* `Delay Each`: In this option, every incoming message will be independently delayed from one another. For example, if we have 100 messages arriving simultaneously with a delay of 1 second, after 1 second, all messages will proceed to the next step together.

* `Delay All`: In this option, each incoming message will be delayed one by one. A new message will only proceed to the next step once the previous message has completed. For instance, if we have 100 messages arriving simultaneously with a delay of 1 second, each message will advance to the next step at the rate of one message per second, starting from the oldest message.

#### Input Metadata

* `Delay Time (in seconds)` - Amount of time this component should wait/delay (in seconds) before emiting the message. Negative number will be converted to positive, strings converted to number, if converted failed will set to zero.
* `Data to transfer` - Use this field to transfer data in to another steps

### Log Message

Log the message (and potentially passthrough) into the provided logger at the selected level.

{% include img.html max-width="100%" url="img/log-message.png" title="Log Message" %}

#### Config Fields

* `Log Level` - dropdown, the log level at which to store the message, default: Info. To see message in logs, level in config must be higher or equal component Log Level. When you do "Retrieve new sample" log Level set to platform default value - Info.
* `Log All Passthrough` - dropdown, Log only the message body or log all passthrough data, default: message body
* `Log without formatting` - checkbox. If checked, the message in logs will be not formatted, for example:
  * Formatted message (default):
      ```json
        {
          "key1": "value1",
          "key2": "value2"
        }
      ```
  * Message without formatting:
      ```json
        {"key1":"value1","key2":"value2"}
      ```

#### Input Metadata

* `Message to log` - If you don't need to log the whole message, you can specify here the needed part.
    
    For example, you have the following incoming message:
    ncomming message:
    
    ```json
    {
      "key1": "value1",
      "key2": "value2",
      "key3": "value3",
      "key4": "value4"
    }
    ```
  
  But you need to log only `key2` and `key4`, in this case, you should put here:
    Message to log:

    ```json
    {
      "key2": key2,
      "key4": key4
    }
    ```

#### Output Metadata

Match the input message metadata

#### Limitations
* The maximum size of the logged message is 256000 bytes, all data above this will be cut off (use `Log without formatting` to log more useful data).

### Create JSON Patch

Utility to create a JSON patch.

{% include img.html max-width="100%" url="img/create-json-patch.png" title="Create JSON Patch" %}

#### Config Fields

There are no Config Fields in this action.

#### Input Metadata

* `Origin Object` - Object that we have now
* `Target Object` - Object that should be after patch was applied

#### Output Metadata

* `JSON Patch` - Series of changes to be applied to go from Origin Object to Target Object

### Apply JSON Patch

Utility to apply a JSON patch

{% include img.html max-width="100%" url="img/apply-json-patch.png" title="Apply JSON Patch" %}

#### Config Fields

There are no Config Fields in this action.

#### Input Metadata

* `Origin Object` - Object that we have now
* `JSON Patch` - Series of changes to be applied to go from Origin Object to Target Object

#### Output Metadata

* `Target Object` - Object that should be after patch was applied

### Network Diagnostics

Useful to diagnose connectivity issues between an eio pod and some endpoint

{% include img.html max-width="100%" url="img/network-diagnostics.png" title="Network Diagnostics" %}

#### Config Fields

There is no Config Fields

#### Input Metadata

* `URL` - Full url to the resource. E.g `https://github.com`

#### Output Metadata

* `pingResult` - Result object for `ping`
* `nsLookupResult` - Result object for `NsLookup`
* `sslCertCheckResult` - Result object for `SSL certificate check`

## Limitations

1. Maximal possible size for an attachment is 10 MB.
2. Attachments mechanism does not work with [Local Agent](/guides/vpn-agent) Installation.
3. `Delay All` option from `Delay` don't correctly support `Parallel Processing` option in component more then 1
4. `Delay Each` option from `Delay` in ordinary flow type can handle delay up to 30 sec, if you need more, use real-time type
5. Needs to use `Data to transfer` field for correct transfer data after `Delay` component.
