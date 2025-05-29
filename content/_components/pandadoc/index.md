---
title: PandaDoc component
layout: component
section: Office components
description: The PandaDoc component is designed to interact seamlessly with the PandaDoc API.
icon: pandadoc.png
icontext: PandaDoc component
category: pandadoc
ComponentVersion: 1.0.0
updatedDate: 2025-05-23
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions) 
  * [Create a Document from Template](#create-a-document-from-template)
  * [Delete Object By ID](#delete-object-by-id)
  * [Download Document](#download-document)
  * [Lookup Objects (plural)](#lookup-objects-plural)
  * [Make Raw Request](#make-raw-request)
  * [Send Document](#send-document)
* [Triggers](#triggers) 
  * [Webhook](#webhook)

## Description

The PandaDoc component is designed to interact seamlessly with the [PandaDoc API](https://developers.pandadoc.com/reference/about). 

This component has been tested with API versions `public/v1` and `public/v2`.

## Credentials

To use this component, you must first obtain an API key. Please refer to the [API Key Authentication](https://developers.pandadoc.com/reference/api-key-authentication-process) section of the official documentation for more information.

The following fields are required for configuring component credentials: 
* **API key** (string, required): This key will be included in the `API-Key ${API key}` Authorization header for each request.
* **Timeout** (string, optional, 15 by default): The request timeout in seconds (the duration to wait for a reply from the server).

## Actions 
  
### Create a Document from Template

Generates a document based on the selected template.

#### Configuration Fields

* **Template** - (dropdown, required): Select the desired template from the available options.
* **Keep full schema** - (checkbox, optional): If enabled, the entire schema will be included as input metadata. If disabled, the schema will be generated according to the selected template.
* **Wait draft status** - (checkbox, optional): By default, after the document is created, it will be in the `document.uploaded` state. If this option is checked, the component will wait up to 60 seconds until the document status changes to `document.draft` before emitting the result.

#### Input Metadata

Schema generated dynamically based on the selected template.

#### Output Metadata

Returns the result of the document creation process.
  
### Delete Object By ID 

Deletes a single object identified by its ID.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to delete. For example, `Documents`. Currently supported types:
  * `Documents`
  * `Templates`

#### Input Metadata

* **Object id** - (string, required): The ID of the object to be deleted.

#### Output Metadata

An object containing the result of the delete operation.
  
### Download Document 

Downloads a document by the specified ID and stores it in internal storage.

#### Configuration Fields

None

#### Input Metadata

* **Document id** - (string, required): The ID of the document to be downloaded.

#### Output Metadata

* **attachmentUrl** - (string, required): URL of the downloaded document stored in internal storage.
  
### Lookup Objects (plural) 

Retrieves a set of objects based on the specified criteria list. Results can be emitted in different ways.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to search for, e.g., `Documents`. Currently supported:
  * `Documents`
  * `Templates`
* **Emit Behavior** - (dropdown, optional, `Emit individually` by default): Specifies how the resulting objects will be emitted, options include `Emit page` or `Emit individually`.
* **Page Size** - (number, optional, defaults to 50): The number of objects to include per request. Acceptable values range from 1 to 100.

#### Input Metadata

A dynamically generated list of filter fields corresponding to the selected Object Type.

#### Output Metadata

* For `Emit Page` mode: An object containing a key `results`, whose value is an array of objects.
* For `Emit Individually` mode: Each object is emitted as a separate, complete message.

### Make Raw Request 

This action allows you to execute a custom request to the [PandaDoc API](https://developers.pandadoc.com/reference/about).

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): If set to true, treats 404 HTTP responses as non-errors. Defaults to `false`.

#### Input Metadata

* **Url** - (string, required): The relative path of the resource, which will be appended to the base URL (https://api.pandadoc.com), or a complete URL of the resource, such as:
  * `/public/v1/documents`
  * `https://api.pandadoc.com/public/v1/documents`
* **Method** - (string, required): The HTTP verb to use for the request; options include `GET`, `POST`, `PUT`, `PATCH`, or `DELETE`.
* **Request Body** - (object, optional): The body of the request to be sent.

#### Output Metadata

* **Status Code** - (number, required): The HTTP status code of the response.
* **HTTP headers** - (object, required): The HTTP headers included in the response.
* **Response Body** - (object, optional): The HTTP response body.

### Send Document 

Sends a document with draft status to designated recipients.

#### Configuration Fields

None

#### Input Metadata

* **Document id** - (string, required): The ID of the document to be sent.

#### Output Metadata

* Result of the document sending operation.
  
## Triggers

### Webhook

Creates a subscription to selected events.


#### Configuration Fields

* **Subscribe to events** - (multiselect, required): Choose events you want to subscribe to.

* **Include in JSON Payload** - (multiselect, optional): Document webhooks always provide basic information along with recipients. You can configure your webhook to include additional details such as fields, tokens, products, and pricing.

#### Input Metadata

None

#### Output Metadata

An array of events, where each element contains:
* **event** - (string, required): The name of the event.
* **data** - (object, required): The data representing this event.

#### Known Limitations
If the flow with the `Webhook` is not real-time, you will need to manually execute it once after the flow is published and started. To do this, click the `Run Now` button and follow the URL to trigger the flow subscription process.