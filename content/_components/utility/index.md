---
layout: component
title: Utility Component
section: Utility components
description: A component that is designed for utility operations.
icon: utility.png
icontext: Utility Component
category: utility
updatedDate: 2024-03-01
ComponentVersion: 1.6.0
---

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

### String To Attachment

Creates attachment from input `value`. Output is `attachmentId` and `attachmentUrl` in `message.body` and attachment object in `message.attachments`:

{% include img.html max-width="100%" url="img/string-to-attachment.png" title="String To Attachment" %}

#### Configuration fields description

* `encodeToBase64` - if checked encode an input `value` using Base64 encode. Than saves encoded value into attachment.

### String From Attachment

Creates string from attachment with provided input `attachmentId` which must be either:
* A numeric ID of the attachment that can be referenced in the step immediately prior.
* A URL to an attachment produced by any component in the flow.

{% include img.html max-width="100%" url="img/string-from-attachment.png" title="String From Attachment" %}

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
