---
title: Email component
layout: component
section: Utility components
description: Email component for our platform supporting email delivery via Mandrill REST API or a custom SMTP server.
icon: email.png
icontext: Email component
category: email
ComponentVersion: 1.4.0
updatedDate: 2026-09-17
---

## Table of Contents

- [General information](#general-information)
  - [Description](#description)
  - [Environment variables](#environment-variables)
- [Actions](#actions)
  - [Send Email](#send-email)
    - [Configuration Fields](#configuration-fields)
    - [Input Metadata](#input-metadata)
    - [Output Metadata](#output-metadata)

## General information

### Description
Email component for our platform supporting email delivery via [Mandrill](http://mandrillapp.com/) REST API or a custom SMTP server using `SMTP_URI`.

### Environment variables
The component can be configured using the following environmental variables (at least one of `MANDRILL_API_KEY` or `SMTP_URI` must be configured; if both are set, `SMTP_URI` takes precedence and is used):

| Name | Mandatory | Description | Values |
|---|---|---|---|
| `MANDRILL_API_KEY` | false | You can use API key provided by platform or [generate](https://mailchimp.com/developer/transactional/guides/quick-start/#generate-your-api-key) it by yourself (required when sending via Mandrill). | any `string` |
| `SMTP_URI` | false | SMTP connection URI (e.g. `smtp://USER:PASS@HOST:PORT` or `smtps://USER:PASS@HOST:PORT`). Required when sending via custom SMTP server. If both `SMTP_URI` and `MANDRILL_API_KEY` are set, `SMTP_URI` is used. | any `string` |
| `MANDRILL_FROM_EMAIL` | false | Sender email address, `no-reply@elastic.io` by default | any `string` |
| `MANDRILL_FROM_NAME` | false | Sender name, `elastic.io` by default | any `string` |
| `MANDRILL_URL` | false | Base path and version of mandrill installation, `https://mandrillapp.com/api/1.0` by default (used only with Mandrill) | any `string` |
| `MAX_BODY_LENGTH` | false | Maximum email message size (including attachments), `10485760` (10MB) by default | any `number` |

> **Please Note:** that you must [verify your domain](https://mailchimp.com/developer/transactional/docs/authentication-delivery/#authentication) when using Mandrill.      

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Send Email 
For each incoming message the component sends an email message via SMTP (if `SMTP_URI` is provided, taking precedence over Mandrill) or via Mandrill using the [Send new message](https://mailchimp.com/developer/transactional/api/messages/send-new-message/) API resource.

#### Configuration Fields

* **Do not throw an error when e-mail send failed** - (checkbox, required): If checked, component will not throw an error when sending failed, details will be provided in output message.

#### Input Metadata

{% include img.html max-width="100%" url="img/email-action.png" title="Send" %}

* **To** - (string, required): The email address(es) for primary recipients, you can fill comma separated list
* **Cc** - (string, optional): Comma separated list of E-mail addresses to receive a copy of the mail
* **Bcc** - (string, optional): Comma separated list of E-mail addresses to receive a blind copy of the mail
* **Subject** - (string, required): Subject of the E-mail
* **Text Body** - (string, optional): The text content of the E-mail to be sent. If body is a JSON object/array, then it will be stringified. The text field serves as a fallback for email clients that do not render HTML. If a recipient’s email client cannot display HTML emails or the HTML body field is empty, the plain text version will be shown instead. Either the 'Text Body' or 'HTML Body' field must be filled in. If both are filled in, the 'HTML Body' will be used.
* **HTML Body** - (string, optional): The HTML content of the E-mail to be sent. Either the 'Text Body' or 'HTML Body' field must be filled in. If both are filled in, the 'HTML Body' will be used.
* **Attachments** (array, optional): Series of objects with the following format:
    * **Attachment URL** (string, required): URL to file (platform storage or external)
    * **Filename** (string, required): Name of the attached file that will appear in the received email

An HTML body example:
```html
{
  "to": "email@example.com",
  "subject": "HTML content",
  "textBody": "Poor text content",
  "htmlBody": " <head>
                  <meta charset=\"UTF-8\">
                  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
                  <title>Sample Email</title>
                  <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 20px;
                    }
                    .container {
                      background-color: #ffffff;
                      padding: 20px;
                      border-radius: 5px;
                      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .btn {
                      display: inline-block;
                      padding: 10px 15px;
                      font-size: 16px;
                      color: white;
                      background-color: #007BFF;
                      text-decoration: none;
                      border-radius: 5px;
                    }
                    .btn:hover {
                      background-color: #0056b3;
                    }
                  </style>
                </head>
                <body>
                  <div class=\"container\">
                    <h1>Hello, [Recipient's Name]!</h1>
                    <p>Thank you for subscribing to our newsletter. We're excited to have you on board!</p>
                    <p>Stay tuned for updates, tips, and exclusive offers just for you.</p>
                    <p>To get started, click the button below:</p>
                    <a href=\"https://www.example.com\" class=\"btn\">Get Started</a>
                    <p>Best regards,<br>Your Company Name</p>
                  </div>
                </body>
              </html>"
}
```

#### Output Metadata

As a result of sending you will get object **"results"** which contain result entities of sending messages for each recipient, consists of:

* **To** - (string): the email address of the recipient
* **RecipientType** - (string): Type of recipient, possible values: `to`, `cc`, `bcc`
* **Message** - (string): The sending status of the recipient, possible values: `OK` or `QUEUED` - if successful, `REJECTED` or `INVALID` on fail
* **MessageID** - (string): The message's unique id
* **SubmittedAt** - (string): Date, when message was submitted in format - `YYYY-MM-DDTHH:mm:ss.SSSSSSSZ`
* **ErrorCode** - (number): deprecated parameter, always `0`
