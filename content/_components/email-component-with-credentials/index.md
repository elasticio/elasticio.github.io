---
title: Email component with Credentials
layout: component
section: Utility components
description: This email component is designed for use with the Mailchimp Transactional API.
icon: email-with-credentials.png
icontext: Email component with Credentials
category: email
ComponentVersion: 1.0.0
updatedDate: 2024-11-22
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions) 
  * [Send Email ](#send-email)

## Description
This email component is designed for use with the [Mailchimp Transactional API](https://mailchimp.com/developer/transactional/guides/quick-start/).

## Credentials
To utilize this component, you must [create a Mailchimp account](https://mailchimp.com/developer/transactional/guides/quick-start/#create-an-account) and generate an [API key](https://mailchimp.com/developer/transactional/guides/quick-start/#generate-your-api-key) that will serve as part of the credentials for the Mandrill app.

Once you have your API key, please complete the following fields in the component's credential section:
* **Mandrill API Key** - (string, required): Your key from the Mandrill app settings.
* **Mandrill API Url** - (string, optional, `https://mandrillapp.com/api/1.0` by default): The URL for the API.
* **From Email** - (string, required): The sender's email address.
* **From Name** - (string, required): The sender's name.

### Environment variables
The component can be configured using the following environmental variables

| Name | Mandatory | Description | Values |
|-|-|-|-|
| `MAX_BODY_LENGTH`     | false     | Maximum email message size (including attachments), `10485760` (10MB) by default   


## Actions 
 
### Send Email 
For each incoming message the component send a new transactional message through Mandrill using the [Send new message](https://mailchimp.com/developer/transactional/api/messages/send-new-message/) API resource.

#### Configuration Fields

* **Do not throw an error when e-mail send failed** - (checkbox, required): If checked, component will not throw an error when sending failed, details will be provided in output message.

#### Input Metadata

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
```
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