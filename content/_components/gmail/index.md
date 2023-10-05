---
title: Gmail Component
layout: component
section: Office components
description: Gmail Component is designed to connect to Google Gmail, using both low-level REST API calls and high-level Google API client.
icon: gmail.png
icontext: Gmail component
category: gmail
updatedDate: 2023-09-08
ComponentVersion: 1.0.1
---

## Description

The Gmail Component is designed to establish a connection with Google Gmail, utilizing both low-level REST API calls and high-level Google API client. The current release of the component supports API version v1.

## Credentials

Before building any integration flow, you must configure the app from within the Google Developers Console.

1. Navigate to the APIs & Services -> Enabled APIs & Services page and enable the Gmail API.
2. Go to the Credentials section and create a new credential of type OAuth client ID:
  * Set Application type to Web application.
  * Add Authorized redirect URI as: https://{your-tenant-address}/callback/oauth2.

For new domains, you may encounter a message stating, "This app isn't verified." Please refer to this [documentation](https://support.google.com/cloud/answer/7454865?hl=en) to learn how to proceed.

Now you can create new credentials for the component:

* **Type** (dropdown, required) - `OAuth2`
* **Choose Auth Client** (dropdown, required) - select one of the previously created clients or choose `Add New Auth Client`:
  * **Name** (string, required) - provide any name you prefer.
  * **Client ID** (string, required) - use the `Client ID` from the `Web application` section in the `Google Developers Console`.
  * **Client Secret** (string, required) - use the `Client Secret` from the `Web application` section in the `Google Developers Console`.
  * **Authorization Endpoint** (string, required) - Google OAuth2 authorization endpoint `https://accounts.google.com/o/oauth2/v2/auth`.
  * **Token Endpoint** (string, required) - Google refresh token endpoint `https://oauth2.googleapis.com/token`.
* **Name Your Credential** (string, required) - provide any name you want.
* **Scopes (Comma-separated list)** (string, required) - Enter the scopes to gain access to your Gmail, e.g., `https://www.googleapis.com/auth/gmail.readonly`. For more information, refer to [Google's documentation](https://developers.google.com/gmail/api/auth/scopes).
* **Additional parameters (Comma-separated list)** (string, required) - Set it as `access_type:offline,prompt:consent` to ensure the proper functioning of the component.
* **Number of retries** (number, optional, default is 5) - Set how many times the component should retry making a request.
* **Delay between retries** (number ms, optional, default is 10000) - Set how much time to wait before the next attempt.

> **Important Note:** To verify credentials, you need to set any of the scopes that allow reading basic user data (profile). For example, `https://www.googleapis.com/auth/gmail.readonly` or broader scopes.

## Triggers

This component does not have trigger functions, making it inaccessible as the first component during the integration flow design.

## Actions

### Make Raw Request

Executes a custom request. Refer to the official [Gmail REST API documentation](https://developers.google.com/gmail/api/reference/rest).

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as an error; defaults to `false`.

#### Input Metadata

* **URL** - (string, required): Path of the resource relative to the base URL (`https://gmail.googleapis.com/gmail/v1/`). E.g., `/users/me/messages`.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

### Delete Email By ID

Delete the specified message by providing its ID. Depending on the configuration, a message will either be permanently deleted or moved to the trash.

>**Please note:** Soft delete (move email to trash) requires one of the following OAuth scopes:

```
https://mail.google.com/
https://www.googleapis.com/auth/gmail.modify
```

Hard delete (immediate delete) requires:

```
https://mail.google.com/
```

#### Configuration Fields

* **Immediately and permanently delete the specified message** - (checkbox, optional): If selected, the message will be permanently deleted; by default, the message will be moved to trash.
* **Emit strategy when no email found** - (dropdown, optional): Specifies the output when no email is found by the provided ID. Options include:
* **Emit nothing** - Emit nothing; just skips an execution. **Note:** In a real flow execution, there will be no error, just an execution skip.
* **Emit an empty object {}** - Emit an empty object, e.g., {}.
* **Throw an error** (Default) - Throw an error with the text 'No email found by provided ID'. This is the default option if nothing else is selected.

#### Input Metadata

* **ID** - (string, required): The ID of the email to delete. Example:

```json
{
  "id": "18a4a8ab45841745"
}
```

#### Output Metadata

* **ID** - (string, optional): The ID of the deleted email.

### Get Email by ID

Search for mail by a provided ID.

#### Configuration Fields

* **Omit attachments** - (checkbox, optional): If selected, `attachments` will not be presented in the output metadata.
* **Allow criteria to be omitted** - (checkbox, optional): In case the checkbox is unchecked, an error will be thrown when the object ID is missing in metadata; if checked, an empty object will be returned instead of throwing an error.
* **Allow Zero Results** - (checkbox, optional): In case the checkbox is unchecked, an error will be thrown when no objects were found. If checked, an empty object will be returned instead of throwing an error.

#### Input Metadata

* **ID** - (string, required/optional): ID of the mail to look up by, required if Allow criteria to be omitted is unchecked.

#### Output Metadata

* **id** - (string, required): Mail ID from Gmail.
* **subject** - (string, required): Subject of the mail.
* **from** - (object, required): Sender information, contains two fields:
  * **name** - (string, optional): Sender name.
  * **address** - (string, required): Sender email.
* **to** - (array of objects, required): Receivers information, each record is represented by an object with two fields:
  * **name** - (string, optional): Receiver name.
  * **address** - (string, required): Receiver email.
* **cc** - (array of objects, optional): Receivers in copy information, each record is represented by an object with two fields:
  * **name** - (string, optional): Receiver name.
  * **address** - (string, required): Receiver email.
* **date** - (string, required): When the message was received.
* **text** - (string, optional): Plaintext version of the message if it has at least one ‘text/plain’ node.
* **html** - (string, optional): HTML version of the message if it has at least one ‘text/html’ node or plaintext version of the message in HTML format.
* **attachments** - (array of objects, optional): Provided if the message has attachments and `Omit attachments` is unchecked. Each record contains the following fields:
  * **name** - (string, optional): Name of the file if present.
  * **contentType** - (string, required): File content type.
  * **contentType** - (string, required): File content type.
  * **size** - (string, required): File size.
  * **url** - (string, required): URL to internal platform storage for this file.

#### Known limitations

The component operates smoothly with attachments up to 15MB by default. However, if you intend to work with larger files, it is advisable to create or increase the environment variable `EIO_REQUIRED_RAM_MB`, which serves as the memory usage limit for the component, initially set at 256MB.

### Search emails

Retrieve emails based on specified criteria. There will be one API request to retrieve a page and one additional API request for each email. This trigger collects emails from all folders, including `Sent`.

#### Configuration Fields

* **Emit Behavior** - (dropdown, optional, default `Emit individually`): Defines the way result objects will be emitted, one of `Emit page`, `Emit individually`, `Emit all`.
* **Expert Mode for Filter Expression** - (checkbox): If checked, any [filter expression](https://support.google.com/mail/answer/7190) can be entered in the metadata field `Filter Expression` for advanced users.
* **Number of search terms** (string, optional) - Text field to specify a number of search terms (positive integer number [1-99] or 0). (If `Expert Mode for Filter Expression` checkbox is disabled)
* **Omit attachments** - (checkbox, optional): If selected, `attachments` will not be presented in the output metadata.

#### Input Metadata

* If the configuration field Expert Mode for Filter Expression is enabled:

  * **Filter Expression** - (string, required): Any filter expression can be entered in the metadata field Filter Expression. For advanced users. Example: subject:(dinner movie) AND is:unread AND in:anywhere.

* If the configuration field Expert Mode for Filter Expression is disabled:

  * Depends on the configuration field `Number of search terms`. If = `N` - N search term and N-1 logical operators will be generated, if = 0 - the component will collect all messages without filtering.

Example for `Number of search terms = 2`:

```json
{
  "sTerm_1": {
    "fieldName": "is",
    "fieldValue": "unread"
  },
  "link_1_2": "AND",
  "sTerm_2": {
    "fieldName": "in",
    "fieldValue": "anywhere"
  }
}
```

* If selected `Emit Behavior` is `Emit page`, an additional field will be added:

  * **Page Size** - (number, defaults to 100, max 500): Indicates the number of emails per page.

#### Output Metadata

Depends on `Emit behavior` fields.

* If `Emit behavior` field is equal to `Emit page` or `Emit all` - object with property `results` that contains an array of emails with the same structure as in [Get Email by ID](#get-email-by-id).
* If `Emit behavior` field is equal to `Emit individually`, email information will fulfill the whole message with the same structure as in [Get Email by ID](#get-email-by-id).

### Send Email

Simply send an email.

>**Please note:** Be aware of [Google usage limits](https://support.google.com/a/answer/166852) to avoid exceeding the limits.

#### Input Metadata:

* **Subject** - (string, required): Subject of the email.
* **To** - (array of objects, required): Receivers' information, each record is represented by an object with two fields:
  * **Name** - (string, optional): Receiver name.
  * **Address** - (string, required): Receiver email.
* **Cc** - (array of objects, optional): Receivers in copy information, each record is represented by an object with two fields:
  * **Name** - (string, optional): Receiver name.
  * **Address** - (string, optional): Receiver email.
* **Bcc** - (array of objects, optional): Receivers in hidden copy information, each record is represented by an object with two fields:
  * **Name** - (string, optional): Receiver name.
  * **Address** - (string, optional): Receiver email.
* **Text** - (string, optional. One of `Text` or `HTML` is required): Plaintext version of the message.
* **HTML** - (string, optional. One of `Text` or `HTML` is required): HTML version of the message.
* **Attachments** - (array of objects, optional): An array of attachments. Currently, only an external link to a file on the Internet is supported. Each record contains the following fields:
  * **File Name** - (string, required): Name of the file if present.
  * **Attachment URL** - (string, required): URL to the file location (either an external URL or Maester URL).

Incoming Message Sample:

```json
{
  "to": "mail@gmail.com,mail2@gmail.com,mail3@gmail.com",
  "cc": "mail@gmail.com",
  "replyTo": "mail@gmail.com",
  "subject": "Hello Test 🚀",
  "text": "This email is sent from the integration tests",
  "html": "<p>🙋🏻‍♀️ &mdash; This is a <b>test email</b> from <a href='https://example.com'>Test HTML</a>.</p>",
  "attachments": [
    {
      "filename": "sample.pdf",
      "url": "https://filesamples.com/samples/document/pdf/sample2.pdf"
    },
    {
      "filename": "order.json",
      "url": "http://maester-service.platform.svc.cluster.local:3002/objects/1da027b7-8dfb-44f9-8ec8-486792ca023e?storage_type=maester"
    }
  ]
}
```

#### Output Metadata

* **id** - (string, required): The immutable ID of the message.
* **threadId** - (string, required): The ID of the thread the message belongs to.
* **labelIds** - (array of strings, required): List of IDs of labels applied to this message.

### Get New Emails

This operation allows you to retrieve emails within a specified time range. The process involves one API request to fetch a page and an additional API request for each individual email. The retrieval encompasses all folders, including the Sent folder.

#### Configuration Fields

* **Emit Behavior** - (Dropdown, Optional, Default: `Emit individually`): This setting determines how result objects will be emitted, with options for either emitting a page collectively or emitting each email individually.
* **Page Size** - (Number, Optional, Default: 100, Max: 500): Specifies the size of pages to be fetched per request.
* **Start Time** - (String, Optional): The timestamp to commence polling from (inclusive) in ISO 8601 Date Time UTC format (YYYY-MM-DDThh:mm:ssZ). The default value is the beginning of time (January 1, 1970, at 00:00).
* **End Time** - (String, Optional): The timestamp to conclude polling (exclusive) in ISO 8601 Date Time UTC format (YYYY-MM-DDThh:mm:ssZ). The default value is the execution time of the flow.
* **Omit Attachments** - (Checkbox, Optional): If selected, `attachments` will not be included in the output metadata.
* **Include SPAM and TRASH** - (Checkbox, Optional): If selected, messages from SPAM and TRASH will be included in the results.

#### Input Metadata

There is no input metadata in this action.

#### Output Metadata

The output metadata structure depends on the selected `Emit behavior` field:

* If `Emit behavior` is set to `Emit page`, the output is an object with the property results, which contains an array of emails with the same structure as described in [Get Email by ID](#get-email-by-id).

* If `Emit behavior` is set to `Emit individually`, the email information will fill the entire message with the same structure as described in [Get Email by ID](#get-email-by-id).
