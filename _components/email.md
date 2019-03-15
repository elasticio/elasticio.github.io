---
title: Email component
layout: article
section: Utility Components
---
---
## Description

An Email component for the integration platform which send e-mail to one or more
recipients using [Mandrill](http://mandrillapp.com/) REST API.

## How works

The component sends a new transaction through Mandrill using the [Send](https://mandrillapp.com/api/docs/messages.JSON.html#method=send) API resource for each incoming message.

## Requirements

## Environment variables

The component can be configured using the following environment variables:

*   `MANDRILL_API_KEY` - this is your Mandrill API Key
*   `MANDRILL_FROM_EMAIL` - to configure which address the communication would come. It should be of the following format: `no-reply@your-site-name`
*   `MANDRILL_FROM_NAME` - this will be the name of your company or service

Please note that you must [verify your domain](https://mandrill.zendesk.com/hc/en-us/articles/205582247) before using this component and configuring it with your environment variables.

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Send

This action would send your message. There are several parameters which can be
configures for this function.

### Error handling types

You can choose different scenarios of exception handler using "**Do not throw an error when e-mail send failed**" switch.

*   If switch above has false value, error event will be emitted for each element of Mandrill API response array that has `status==(rejected | invalid)`, error event will be the same as result we've got from Mandrill API.
*   If switch above has true value, error events will not emitted to the flow level. In this case sending result will be in output message.

### Multiple recipients

Email component can send messages to multiple recipients. You can fill comma
separated list of email addresses for input parameters:

*   **To**
*   **Cc**
*   **Bcc**

### Response structure

As a result of sending you will get object **"results"** which contain result
entities of sending messages for each recipient:

``` js
{
  "results": [
    {
      "RecipientType": "to",
      "Message": "INVALID",
      "ErrorCode": 0,
      "MessageID": "cae5a6d1233d430fa41cd4317b2ad070",
      "SubmittedAt": "2018-06-07T14:24:13.9150000+00:00",
      "To": "email1@example.com"
    },
    {
      "RecipientType": "to",
      "Message": "OK",
      "ErrorCode": 0,
      "MessageID": "97d78bc5b37f4b7b8a0517c409d5e43c",
      "SubmittedAt": "2018-06-07T14:24:13.9180000+00:00",
      "To": "email2@example.com"
    },
    {
      "RecipientType": "cc",
      "Message": "OK",
      "ErrorCode": 0,
      "MessageID": "c785b33ccfd546668752605d6c19f878",
      "SubmittedAt": "2018-06-07T14:24:13.9180000+00:00",
      "To": "email3@example.com"
    },
    {
      "RecipientType": "cc",
      "Message": "OK",
      "ErrorCode": 0,
      "MessageID": "511f60c5da974980b797cbbd2796b129",
      "SubmittedAt": "2018-06-07T14:24:13.9180000+00:00",
      "To": "email4@example.com"
    },
    {
      "RecipientType": "bcc",
      "Message": "OK",
      "ErrorCode": 0,
      "MessageID": "ba5d29e8ca2f4322961eac50180a4caf",
      "SubmittedAt": "2018-06-07T14:24:13.9180000+00:00",
      "To": "email5@example.com"
    }
  ]
}
```

### Attachments

E-mail component can include attachment to email. More information about
attachments functionality on the is provided elsewhere.
