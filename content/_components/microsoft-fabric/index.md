---
layout: component
title: Microsoft Fabric component
section: Service components
description: The Microsoft Fabric component is designed to interact with the Microsoft Fabric REST API.
icon: microsoft-fabric.png
icontext: Microsoft Fabric component
category: microsoft-fabric
ComponentVersion: 1.1.0
updatedDate: 2026-05-11
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions) 
  * [Delete Object By ID](#delete-object-by-id) 
  * [Lookup Object By ID](#lookup-object-by-id) 
  * [Lookup Objects (plural)](#lookup-objects-plural) 
  * [Make Raw Request](#make-raw-request)
  * [Upsert Object](#upsert-object) 
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

### Delete Object By ID

Deletes a single object by its ID.

#### Configuration Fields

* **Workspace** - (dropdown, required): Select the workspace.
* **Hard Delete** - (checkbox, optional): Specifies whether to perform a hard delete. When enabled, the object is permanently deleted and cannot be recovered. When disabled or unspecified, the object is soft-deleted if the object type supports this behavior.

#### Input Metadata

* **ID** - (string, required): The ID of the object to delete.

#### Output Metadata

Returns the ID of the deleted object.

### Lookup Object By ID

Retrieves a single object by its ID.

#### Configuration Fields

* **Workspace** - (dropdown, required): Select the workspace.
* **Get Definition** - (checkbox, optional): Enable this option to retrieve the object definition.

#### Input Metadata

* **ID** - (string, required): The ID of the object to retrieve.

#### Output Metadata

An object containing the lookup result as its value.

### Lookup Objects (plural)

Retrieves a set of objects. Results can be emitted in different modes.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to look up (e.g., `Event`).
* **Workspace** - (dropdown, required): Select the workspace.
* **Emit Behavior** - (dropdown, required): Defines how result objects are emitted. Options: `Emit page` or `Emit individually`.

#### Input Metadata

None.

#### Output Metadata

For `Emit Page` mode: An object with a `results` key containing an array of values.

For `Emit Individually` mode: Each object is emitted as a separate message.

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

### Upsert Object

Creates a new object or updates an existing one, depending on whether a unique identifier field is provided.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to upsert (e.g., `Event`).
* **Workspace** - (dropdown, required): Select the workspace.
* **Skip confirmation** - (checkbox, optional): By default, when the component receives a `202` HTTP status code, it treats this as a [Long Running Operation](https://learn.microsoft.com/en-us/rest/api/fabric/core/long-running-operations/get-operation-state?tabs=HTTP) and waits until the operation state is no longer `Running`. Enabling this option causes the component to skip this verification process.

#### Input Metadata

* A unique field used to identify the object to be updated.
* Additional fields are generated dynamically based on the selected `Object Type`.

#### Output Metadata

The object returned from the upsert operation. Note that Microsoft does not define a standard response structure.

## Triggers

This component has no trigger functions. This means it will not be accessible to select as a first component during the integration flow design.