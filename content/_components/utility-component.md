---
title: utility-component
layout: article
section: PLACEHOLDER
---
---

[![Circle CI][circle-image]][circle-url]

# Utility Component 
## Description
iPaaS component that is designed for utility operations

#### Environment variables 
| NAME                       | DESCRIPTION                                                                             | DEFAULT   | OPTIONAL |
|----------------------------|-----------------------------------------------------------------------------------------|-----------|----------|
| EIO_REQUIRED_RAM_MB        | Number of MB allocated to container. Recommended value of allocated memory is `512` MB. | 256       | true     |
| REQUEST_TIMEOUT            | HTTP request timeout in milliseconds.                                                   | 10000     | true     |
| REQUEST_RETRY_DELAY        | Delay between retry attempts in milliseconds                                            | 7000      | true     |
| REQUEST_MAX_RETRY          | Number of HTTP request retry attempts.                                                  | 7         | true     |
| REQUEST_MAX_CONTENT_LENGTH | Max size of HTTP request in bytes.                                                      | 10485760 | true     |

## Actions

### String To Attachment
Creates attachment from input `value`. Output is `attachmentId` in `message.body` and attachment object in `message.attachments`.
#### Configuration fields description
* `encodeToBase64` - if checked encode an input `value` using Base64 encode. Than saves encoded value into attachment. 
#### Input and output schema description
[Input schema](lib/schemas/upload.in.json) 
[Output schema](lib/schemas/upload.out.json)

### String From Attachment
Creates string from attachment with provided input `attachmentId`. 
#### Configuration fields description
* `decodeFromBase64` - if checked decode attachment content using Base64 decode before output. If content of attachment is malformed or not Base64 encoded string, result will be malformed.  
#### Input and output schema description
[Input schema](lib/schemas/download.in.json) 
[Output schema](lib/schemas/download.out.json)

### Base64 Decode
Decodes input `value` using Base64 decoding to regular string. If malformed input provided or not Base64 encoded string, result will be malformed. 
#### Input and output schema description
[Input schema](lib/schemas/base64.in.json) 
[Output schema](lib/schemas/base64.out.json)

### Base64 Encode
Encodes input `value` using Base64 encoding.
#### Input and output schema description
[Input schema](lib/schemas/base64.in.json) 
[Output schema](lib/schemas/base64.out.json)

### Limitations
1. Maximal possible size for an attachment is 10 MB.
2. Attachments mechanism does not work with [Local Agent Installation](https://support.elastic.io/support/solutions/articles/14000076461-announcing-the-local-agent-)

[circle-image]: https://circleci.com/gh/elasticio/utility-component/tree/master.svg?style=svg&circle-token=b94cb1063f2907ae74bb4a87e220e95491c932d1
[circle-url]: https://circleci.com/gh/elasticio/utility-component/tree/master
