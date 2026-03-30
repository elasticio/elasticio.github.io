---
layout: component
title: Microsoft Fabric component
section: Service components
description: The Microsoft Fabric component is designed to interact with the Microsoft Fabric REST API.
icon: microsoft-fabric.png
icontext: Microsoft Fabric component
category: microsoft-fabric
ComponentVersion: 1.0.0
updatedDate: 2026-03-26
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions) 
  * [Make Raw Request](#make-raw-request)
* [Triggers](#triggers)

## Description

The Microsoft Fabric component is designed to interact with the [Microsoft Fabric REST API](https://learn.microsoft.com/en-us/rest/api/fabric/articles/).

The current release of the component has been tested on API version `v1`.

## Credentials

Microsoft Fabric uses OAuth 2.0 authentication.

For instructions on registering an application, see [here](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).

The [redirect URI](/guides/oauth-callback-redirect-url) for the platform is `https://{your-tenant-address}/callback/oauth2`.

* **Type** (dropdown, required) - `OAuth2`
* **Choose Auth Client** (dropdown, required) - select a previously created client or choose `Add New Auth Client`:
  * **Name** (string, required) - enter any desired name
  * **Client ID** (string, required) - enter the `Application (client) ID`
  * **Client Secret** (string, required) - enter the `Client credentials`
  * **Authorization Endpoint** (string, required) - the Fabric authorization endpoint: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize`
  * **Token Endpoint** (string, required) - the Fabric refresh token endpoint: `https://login.microsoftonline.com/common/oauth2/v2.0/token`
* **Name Your Credential** (string, required) - enter any desired name
* **Scopes (Space-separated list)** (string, required) - enter the scopes required to access the Fabric REST API: `offline_access https://api.fabric.microsoft.com/Workspace.ReadWrite.All https://api.fabric.microsoft.com/Item.ReadWrite.All`

## Actions 

### Make Raw Request 

Executes a custom request.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): When enabled, treats 404 HTTP responses as non-errors; defaults to `false`.

#### Input Metadata

* **Url** - (string, required): The path of the resource relative to the base URL (here comes a part of the path that goes after https://api.fabric.microsoft.com/v1/).
* **Method** - (string, required): The HTTP verb to use in the request. Must be one of `GET`, `POST`, `PATCH`, `DELETE`.
* **Request Body** - (object, optional): The body of the request to send.
* **Request Headers** - (object, optional): HTTP headers of the request.

#### Output Metadata

* **Status Code** - (number, required): The HTTP status code of the response.
* **HTTP headers** - (object, required): The HTTP headers of the response.
* **Response Body** - (object, optional): The HTTP response body.

## Triggers

This component has no trigger functions. This means it will not be accessible to select as a first component during the integration flow design.