---
title: Docuware component
layout: component
section: Office components
description: A component that connects to DocuWare API
icon: docuware.png
icontext: Docuware component
category: docuware
ComponentVersion: 1.1.2
updatedDate: 2022-09-23
---

## General information

### Description

[{{site.data.tenant.name}}](http://www.{{site.data.tenant.name}}) iPaaS component that connects to DocuWare API.

### Environment variables

|Name|Mandatory|Description|Values|
|----|---------|-----------|------|
|`REQUEST_MAX_RETRY`| false | Set how many time system try to make request to API on errors (3 by default) | any `integer` above 0|
|`REQUEST_RETRY_DELAY`| false | Set delay between requests on errors in ms (5000 by default) | any `integer` above 0|
|`HOST_ID`| false | Client identifier that would be attached to each request as an optional debug information. | any `string`|

## Credentials

You need to use following properties to configure credentials:

* **Username** - Provide a username that has permissions to interact with the DocuWare, required.
* **Password** - Provide a password of the user that has permissions to interact with the DocuWare, required.
* **Server URL** - place, where registered DocuWare account, required.
* **Regional Settings** - [developer.docuware.com](https://developer.docuware.com/rest/examples/postman-collection-download.html#handle-culture-and-language-cookies) - Handle culture and language cookies, optional.
* **Cookies** - Place to store access cookies received from the login process & other received metadata (e.g. expiry time), optional

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Raw Request

Action to call any DocuWare API endpoint

#### Input Metadata

* **Url** - Path of the resource relative to the URL base (https://api.hubapi.com), required.
* **Method** - Allowed values `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, required. HTTP verb to use in the request.
* **Request Body** - Body of the request to send
* **Don't throw error on 404 Response** - (optional) Treat 404 HTTP responses not as error, defaults to `false`.

#### Output Metadata

* **Status Code** - HTTP status code of the response, required.
* **HTTP headers** - HTTP headers of the response, required.
* **Response Body** - HTTP response body.
* **URL to Response Body** - If the HTTP response body is present and is not JSON, here will be a link to the Maester attachment.

### Lookup Documents (Lookup Objects Plural)

Action to lookup documents in DocuWare by parameters

#### Config Fields

* **File Cabinet Id** - (String, required): Id of File Cabinet to use.
* **Search Dialog to Use** - (String, required): Id of Search Dialog to use.
* **Behavior** - (Dropdown, required): Behavior to emit items (`Emit Individually` or `Fetch all`.)

#### Input Metadata

* **Operation** - (String, required): Operation for request parameters (`Or` or `And`).
Other fields are dynamically generated

#### Output Metadata

* **Result** - array of items or single item depends os selected `Behavior`

### Make Raw File Upload Request

Action to upload file to DocuWare

#### Config Fields

* **Method** - (String, required): values `GET`, `POST`, `DELETE`. HTTP verb to use in the request.

#### Input Metadata

* **DocuwareUrl** - (String, required): Relative URL path to call. For example: `https://servername.com/docuware/platform/FileCabinets/{FileCabinetId}/Documents/{DocumentId}/FileDownload?targetFileType=Auto&keepAnnotations=false`
* **Request Headers** - (Object, optional): Headers of request for `DocuwareUrl`  
When `Method` is `POST` additionally two fields:
  * **Request Body URL** - (String, required): URL to a Maester attachment that would be provided as the HTTP body for the request. For example: `http://maester-service.platform.svc.cluster.local:3002/objects/object-id?storage_type=maester`
  * **File Name** - (String, required): Url for the file from platform storage

#### Output Metadata

* **Status Code** - HTTP status code of the response, required.
* **HTTP headers** - HTTP headers of the response, required.  
When `Method` is `GET`:
  * **Attachment URL** - Link for attachment saved into platform Maester storage.
In other `Method`-s:
  * **Response Body** - HTTP response body.
