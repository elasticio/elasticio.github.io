---
title: Open API component
layout: component
section: Utility components
description: A component that is designed for utility operations.
icon: open-api.png
icontext: Open API component
category: open-api
updatedDate: 2025-11-14
ComponentVersion: 1.1.4
---

## Table of Contents

* [General information](#general-information)
   * [Description](#description)
   * [Purpose](#purpose)
   * [Completeness Matrix](#completeness-matrix)
   * [How it works. API version/SDK version](#how-it-works-api-version--sdk-version)
* [Credentials](#credentials)
     * [Type](#type)
     * [A URL to an OpenAPI/Swagger document](#a-url-to-an-openapiswagger-document)
* [Actions](#actions)
   * [Make Request](#make-request)
* [Known Limitations](#known-limitations)

## General information

### Description

OpenAPI Specification (formerly Swagger Specification) is an API description format for REST APIs.
OpenAPI (Swagger) document needs to be hosted online and should be reached without authentication. You need to provide a URL to this document in the credentials.

### Purpose

Using OpenAPI Specification make request to REST API on the platform.

### How it works. API version / SDK version

Currently, it is supported OpenAPI version 2.0 documents.
It is used [Swagger Client](https://github.com/swagger-api/swagger-js) version 3.10.0.
[OpenAPI Specification](https://swagger.io/docs/specification/about/).

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Open API component like [changelog](/components/open-api/technical-notes#changelog) and [completeness matrix](/components/open-api/technical-notes#completeness-matrix).

## Credentials

{% include img.html max-width="100%" url="img/open-api-credentials.png" title="Credentials" %}

### Type

Authentication type field to define the authentication schema that would be used for making request.

  It is supported 4 auth type:

  - `No Auth` - used by default, make request without authentication.
  - `Basic Auth` - make request with basic authentication, `Username` and `Password` fields should be specified:

{% include img.html max-width="100%" url="img/open-api-credentials-basic-auth.png" title="Credentials Basic" %}

  - `API Key Auth` - make request with API key in headers authentication, `Header Name` and `Header Value` fields should be specified:

{% include img.html max-width="100%" url="img/open-api-credentials-api-key-auth.png" title="Credentials API Key" %}

   - `OAuth2` - it is supported `Authorization code` OAuth2 flow. Fields:
        - `Client Id` - is a public identifier for apps
        - `Client Secret` -  is a secret known only to the application and the authorization server
        - `Auth URI` -  uri for authorization
        - `Token URI` -  uri for getting an access token
        - `Scopes` -  is a scope of the access request

{% include img.html max-width="100%" url="img/open-api-credentials-OAuth2.png" title="Credentials OAuth2" %}

### A URL to an OpenAPI/Swagger document

A URL to an OpenAPI/Swagger document that would define the calls that could be made, as example https://petstore.swagger.io/v2/swagger.json

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Make Request

{% include img.html max-width="100%" url="img/open-api-make-request.png" title="Make Request" %}

#### List of Expected Config fields

* Path - A dropdown for the paths than defined in the OpenAPI document.

* Operation - A dropdown for the operations that are allowed for a previously defined path.

* Do not throw Error on Failed Calls - An option as to whether or not errors should be thrown for HTTP codes in the 4xx/5xx range.

>**Please Note** an exception is the 401 HTTP status code - error would be thrown for this code regardless of field value (true/false)

#### Expected input metadata

Input metadata is depend on parameters, that are defined in [operation](https://swagger.io/docs/specification/2-0/describing-parameters/):

`path parameters` are defined as a separate fields, and `body` as object that should be configured by user.

For example, path `/pet/{petId}` and operation `get` metadata is:

```json
     {
       "type": "object",
       "properties": {
         "petId": {
           "type": "integer",
           "required": true
         }
       }
     }
```

<details close markdown="block"><summary><strong> OpenApi Description for path `/pet/{petId}` and operation `get`</strong></summary>

     {
       "paths": {
         "/pet/{petId}": {
           "get": {
             "tags": [
               "pet"
             ],
             "summary": "Find pet by ID",
             "description": "Returns a single pet",
             "operationId": "getPetById",
             "produces": [
               "application/json",
               "application/xml"
             ],
             "parameters": [
               {
                 "name": "petId",
                 "in": "path",
                 "description": "ID of pet to return",
                 "required": true,
                 "type": "integer",
                 "format": "int64"
               }
             ],
             "responses": {
               "200": {
                 "description": "successful operation",
                 "schema": {
                   "$ref": "#/definitions/Pet"
                 }
               },
               "400": {
                 "description": "Invalid ID supplied"
               },
               "404": {
                 "description": "Pet not found"
               }
             },
             "security": [
               {
                 "api_key": []
               }
             ]
           }
         }
       }
     }

</details>

#### Expected output metadata

```json
     {
         "type": "object",
         "properties": {
           "headers": {
             "type": "object",
             "properties": {},
             "required": true
           },
           "body": {
             "type": "object",
             "properties": {},
             "required": true
           },
           "responseCode": {
             "type": "number",
             "required": true
           }
         }
       }
```

## Known limitations

 - OpenApi v2.0 is supported only
 - Multiply hosts are not supported
 - Each operation should contains only one tag
 - Authentication for access to OpenAPI (Swagger) file is not supported
 - OAuth2 authentication type is not supported in real-time flows due to platform limitations
