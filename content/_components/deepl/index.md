---
title: DeepL component
layout: component
section: Service components
description: The DeepL Component is specifically crafted to interact with the DeepL API.
icon: deepl.png
icontext: DeepL component
category: deepl
updatedDate: 2024-05-08
ComponentVersion: 1.0.0
---

## Description

The DeepL Component is specifically crafted to interact with the [DeepL API](https://www.deepl.com/docs-api).

The current version of the component has been tested with API version `v2`.

## Authentication
To utilize the DeepL Component, you must provide the following credentials:

- **Authentication Key** (string, required) - This key is essential for accessing the API. You can easily locate your unique key within your [account settings](https://www.deepl.com/account/summary).

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.


## Actions

  * [**Make Raw Request**](#make-raw-request).
  * [**Translate Document**](#translate-document).
  * [**Translate Text**](#translate-text).

## Make Raw Request
Enables you to run your own custom requests directly through the DeepL REST API.

### Configuration Fields
- **Don't Throw Error on 404 Response** - (optional, boolean): This setting configures the handling of 404 HTTP responses as non-errors. By default, it is set to `false`.

### Input Metadata
- **URL** - (string, required): The specific path of the resource, which is appended to the base URL `https://api(-free).deepl.com/v2/`.
- **Method** - (string, required): Determines the HTTP method for the request.
- **Request Body** - (object, optional): Contains the content for the request.

### Output Metadata
- **Status Code** - (number, required): Indicates the HTTP response status code.
- **HTTP Headers** - (object, required): Showcases the HTTP headers of the response.
- **Response Body** - (object, optional): Represents the body of the HTTP response.

## Translate Document
This action enables you to translate whole documents and supports the following file types and extensions:

- `docx` - Microsoft Word Document.
- `pptx` - Microsoft PowerPoint Document.
- `xlsx` - Microsoft Excel Document.
- `pdf` - Portable Document Format.
- `htm` / `html` - HTML Document.
- `txt` - Plain Text Document.
- `xlf`/ `xliff` - XLIFF Document, version 2.1.

> **Please note** that with every submitted document of type `.pptx`, `.docx`, `.xlsx`, or `.pdf`, you are billed a minimum of 50,000 characters with the DeepL API plan, no matter how many characters are included in the document.
    
### Configuration Fields
- **Target language** - (dropdown, required): The language into which the text should be translated.
- **Emit behaviour** (dropdown, required) - By default, we need to wait until DeepL translates the file after it was sent to the server periodically checking the status, here you can select when the component should emit a message. Options currently available:
  - `Emit directly after sending` - The component will not wait for the result but will provide `document_id` and `document_key` to check it manually.
  - `Wait for the file without download` - The component will emit a message with `document_id` and `document_key` only after the file is translated and ready for download.
  - `Wait and download file (default)` - The component will emit a message with `attachment_url` with downloaded to the internal storage file and `billed_characters`.
- **Source language** - (dropdown, optional): Language of the text to be translated. If it is blank or set to `Autodetect` DeepL will attempt to detect the language.
- **Formality** (dropdown, optional): Sets whether the translated text should lean towards formal or informal language. Options currently available:
  - `More` - For a more formal language.
  - `Less` - For a more informal language.
  - `Prefer more` - For a more formal language if available, otherwise fallback to default formality.
  - `Prefer less` - For a more informal language if available, otherwise fallback to default formality.
  - `Default`.

### Input Metadata
- **File URL** (string, required) - URL to file from external or internal storage.
- **File name** (string, required) - The name of the uploaded file.

### Output Metadata
Depending on selected **Emit behavior**:

- `For Emit directly after sending` and `Wait for the file without download` there will be two fields:
  - `document_id` (string, required) - A unique ID assigned to the uploaded document and the translation process.
  - `document_key` (string, required) - A unique key that is used to encrypt the uploaded document as well as the resulting translation on the server side.
* For `Wait and download file` there will be following fields:
  - `attachmentUrl` (string, required) - URL to downloaded file in the internal storage.
  - `billedCharacters` (number, required) - The number of characters billed to your account.

## Translate Text
Translate the provided text into the selected language

### Configuration Fields
- **Target language** - (dropdown, required): The language into which the text should be translated.
- **Source language** - (dropdown, optional): Language of the text to be translated. If it is blank or set to `Autodetect` DeppL will attempt to detect the language.
- **Preserve formatting** - (checkbox, optional): Sets whether the translation engine should respect the original formatting, even if it would usually correct some aspects.
- **Formality** (dropdown, optional): Sets whether the translated text should lean towards formal or informal language. Options currently available:
  - `More` - For a more formal language.
  - `Less` - For a more informal language.
  - `Prefer more` - For a more formal language if available, otherwise fallback to default formality.
  - `Prefer less` - For a more informal language if available, otherwise fallback to default formality.
  - `Default`.
- **Tag handling** - (dropdown, optional): Sets which kind of tags should be handled. Options currently available:
  - `Enable XML tag handling`.
  - `Enable HTML tag handling`.
  - `Disable`.
- **Split sentences** - (dropdown, optional): Sets whether the translation engine should first split the input into sentences. Options currently available:
  - `No splitting at all` - Whole input is treated as one sentence.
  - `Splits on punctuation and on newlines` - Default when Tag handling is not set to HTML.
  - `Splits on punctuation only` - Ignores newlines, is default when Tag handling set to HTML.
  - `Default`.
  
### Input Metadata
- **Text** - (string, required): Text to be translated. Only UTF-8-encoded plain text is supported.

### Output Metadata
- `detected_source_language` (string, required) - Language of the translated text.
- `text` (string, required) - The translated text.

## Limitations
- The total request body size in `Translate Text` action must not exceed 128KB.
