---
title: Close CRM component
layout: component
section: CRM components
description: The Close CRM Component provides a simple way to interact with the Close API, enabling efficient integration with Close's powerful features.
icon: close-crm.png
icontext: Close CRM component
category: close-crm
ComponentVersion: 1.0.0
updatedDate: 2025-01-21
---

## Table of Contents

- [API version](#api-version)
- [Description](#description)
- [Credentials](#credentials)
- [Actions](#actions)
  - [Delete Object By ID](#delete-object-by-id)
  - [Lookup Object By ID](#lookup-object-by-id)
  - [Make Raw Request](#make-raw-request)

## API version

The most recent version is `Dec2, 2024`

## Description

Close CRM is a customer relationship management platform designed to enhance sales efficiency for small businesses and startups. It integrates communication tools such as calling, emailing, SMS, and calendar synchronization, enabling sales teams to manage customer interactions seamlessly within a single interface.

The Close CRM Component provides a simple way to interact with the [Close API](https://developer.close.com/), enabling efficient integration with Close's powerful features.

## Credentials

This component supports API key authentication. To obtain an API key, follow these steps:

1. Log in to your [Close account](https://app.close.com/login/)
2. Navigate to **Settings -> Developer**
3. Create a new **API Key**
4. Use the generated key in this component to authenticate your requests

Now you can set the component credentials:

- **API Key**: *(required, string)* - API key you created in the account

## Actions

### Delete Object By ID

Deletes a single object using its ID.

#### Configuration Fields

- **Object Type** - (dropdown, required): The type of the object to delete.

#### Input Metadata

- **ID Value** - (string, required): The ID of the object to delete.

#### Output Metadata

Returns the id of the object that has been deleted.

### Lookup Object By ID

Retrieves a single object using its ID.

#### Configuration Fields

- **Object Type** - (dropdown, required): The type of object to look up.

#### Input Metadata

- **ID Value** - (string, required): The ID of the object to look up.

#### Output Metadata

Returns an object with the result of the lookup.

**Known limitation**: Currently, the `Generate Stub Sample` button only allows to generate generic metadata, with no particular object type details.

### Make Raw Request

Enables execution of custom requests directly through the Close API.

#### Input Metadata

- **Url** - *(string, required)*: The path of the resource relative to the base URL `https://api.close.com/api/v1`. For example, `/me`.
- **Method** - *(string, required)*: The HTTP method to use for the request (e.g., GET, POST, PUT, DELETE).
- **Request Body** - *(object, optional)*: The payload to include in the request body, if applicable.

#### Output Metadata

- **Status Code** - *(number, required)*: The HTTP response status code returned by the request.
- **HTTP Headers** - *(object, required)*: The HTTP headers included in the response.
- **Response Body** - *(object, optional)*: The content of the HTTP response body, if any.