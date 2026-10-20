---
title: Email component with Credentials
layout: component
section: Utility components
description: This email component is designed for use with the Mailchimp Transactional API or custom SMTP server.
icon: email-with-credentials.png
icontext: Email component with Credentials
category: email
ComponentVersion: 1.1.0
updatedDate: 2026-10-19
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Environment variables](#environment-variables)
* [Actions](#actions) 
  * [Send Email](#send-email)
* [HTML Email Styling Best Practices](#html-email-styling-best-practices)

## Description
This email component is designed for use with the [Mailchimp Transactional API](https://mailchimp.com/developer/transactional/guides/quick-start/) or custom SMTP server using `SMTP URI`.

## Credentials

The component supports two authentication and transport methods: **Mandrill API** and **SMTP**. At least one of **Mandrill API Key** or **SMTP URI** must be configured. If both are provided, **SMTP URI** takes precedence and emails will be sent via SMTP.

Complete the following fields in the component's credential section:
* **Mandrill API Key** - (string, optional): Your key from the Mandrill app settings (required when sending via Mandrill).
* **SMTP URI** - (string, optional): SMTP connection URI (e.g. `smtp://USER:PASS@HOST:PORT` or `smtps://USER:PASS@HOST:PORT`). Required when sending via custom SMTP server.
* **Mandrill API Url** - (string, optional, `https://mandrillapp.com/api/1.0` by default): The URL for the Mandrill API (used only with Mandrill).
* **From Email** - (string, required): The sender's email address.
* **From Name** - (string, optional): The sender's display name.

> **Please Note:** For the Mandill authentication, you must [create a Mailchimp account](https://mailchimp.com/developer/transactional/guides/quick-start/#create-an-account) and generate an [API key](https://mailchimp.com/developer/transactional/guides/quick-start/#generate-your-api-key) that will serve as part of the credentials for the Mandrill app.

### Environment variables
The component can be configured using the following environmental variables

| Name | Mandatory | Description | Values |
|------|-----------|-------------|--------|
| `MAX_BODY_LENGTH` | false | Maximum email message size in bytes (including attachments), defaults to `10485760` (10 MB) | `number` |

## Actions 
 
### Send Email

For each incoming message the component sends an email message via SMTP (if `SMTP URI` is configured, taking precedence over Mandrill) or via Mandrill using the [Send new message](https://mailchimp.com/developer/transactional/api/messages/send-new-message/) API resource.

#### Configuration Fields

* **Do not throw an error when e-mail send failed** - (checkbox, optional): If checked, the component will not throw an error when sending fails; details will be provided in the output message. Defaults to `false`.

#### Input Metadata

* **To** - (string, required): The email address(es) for primary recipients; you can provide a comma-separated list.
* **Cc** - (string, optional): Comma-separated list of email addresses to receive a carbon copy of the mail.
* **Bcc** - (string, optional): Comma-separated list of email addresses to receive a blind carbon copy of the mail.
* **Subject** - (string, required): Subject of the email.
* **Text Body** - (string, optional): The plain text content of the email. If the body is a JSON object or array, it will be automatically stringified. Serves as a fallback for email clients that do not render HTML. Either 'Text Body' or 'HTML Body' must be provided.
* **HTML Body** - (string, optional): The HTML content of the email to be sent. Either 'Text Body' or 'HTML Body' must be provided.
* **Attachments** - (array, optional): List of attachment objects:
  * **Attachment URL** - (string, required): URL of the file (from platform storage or external).
  * **Filename** - (string, required): Name of the attached file as it will appear in the received email.

Input message example:
```json
{
  "to": "recipient@example.com",
  "cc": "manager@example.com",
  "subject": "Sample Notification",
  "textBody": "Hello! Thank you for subscribing.",
  "htmlBody": "<p>Hello! Thank you for subscribing.</p>",
  "attachments": [
    {
      "url": "https://example.com/files/invoice.pdf",
      "name": "invoice.pdf"
    }
  ]
}
```

#### Output Metadata

As a result of sending, you will receive an object containing a **"results"** array with delivery information for each recipient:

* **To** - (string): The email address of the recipient.
* **RecipientType** - (string): Type of recipient (`to`, `cc`, or `bcc`).
* **Message** - (string): The sending status of the recipient (`OK` or `QUEUED` on success; `REJECTED` or `INVALID` on failure).
* **MessageID** - (string): The message's unique identifier.
* **SubmittedAt** - (string): Timestamp when the message was submitted in ISO format (`YYYY-MM-DDTHH:mm:ss.SSSSSSSZ`).
* **RejectedReason** - (string, optional): Rejection reason returned by the mail server (present when `Message` is `REJECTED`).
* **ErrorCode** - (number): Deprecated parameter, always `0`.

Output message example:
```json
{
  "results": [
    {
      "To": "recipient@example.com",
      "RecipientType": "to",
      "Message": "OK",
      "MessageID": "c1d10979c1ca441385f64f209d172508",
      "SubmittedAt": "2026-10-16T13:10:00.0000000Z",
      "ErrorCode": 0
    }
  ]
}
```

## HTML Email Styling Best Practices

When providing content for the **HTML Body**, keep in mind that rendering in email clients (like Gmail, Outlook, or Apple Mail) differs significantly from modern web browsers:

1. **CSS Inlining**: Many email clients (especially Gmail and older versions of Outlook) strip out `<style>` blocks located in the `<head>` for security and performance reasons. For the most reliable results, **inline your CSS** directly into the HTML tags using the `style` attribute.
2. **Avoid CSS Variables**: Email clients do not support CSS variables (e.g., `var(--main-color)`). Use literal hex codes instead.
3. **Table-Based Layouts**: While modern browsers use Flexbox or Grid, many email clients still require standard HTML tables (`<table>`) for complex multi-column layouts to ensure stability.
4. **CSS Inlining Support**: When sending via Mandrill, this component enables `inline_css: true`, which attempts to automatically move styles from `<style>` blocks into element attributes. However, manual inlining is always recommended for critical designs.

An HTML body example with inlined styles:
```json
{
  "to": "email@example.com",
  "subject": "HTML content",
  "textBody": "Hello! Thank you for subscribing.",
  "htmlBody": "<body style=\"margin:0; padding:20px; font-family:Arial,sans-serif; background-color:#f4f4f4;\"><div style=\"background-color:#ffffff; padding:20px; border-radius:5px; box-shadow:0 0 10px rgba(0,0,0,0.1); max-width:600px; margin:0 auto;\"><h1 style=\"color:#333;\">Hello, Recipient!</h1><p style=\"font-size:16px; color:#666; line-height:1.5;\">Thank you for subscribing to our newsletter.</p><a href=\"https://www.example.com\" style=\"display:inline-block; padding:10px 20px; background-color:#007BFF; color:#ffffff; text-decoration:none; border-radius:5px;\">Get Started</a></div></body>"
}
```