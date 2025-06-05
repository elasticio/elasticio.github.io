---
title: Airtable component
layout: component
section: Database components
description: The Airtable component is designed to interact seamlessly with the Airtable Web API.
icon: airtable.png
icontext: Airtable component
category: airtable
ComponentVersion: 1.0.0
updatedDate: 2025-05-23
---

## Table of Contents

- [API Version](#api-version)
- [Description](#description)
- [Credentials](#credentials)
- [Actions](#actions)
  - [Delete Record by ID](#delete-record-by-id)
  - [Lookup Record by ID](#lookup-record-by-id)
  - [Make Raw Request](#make-raw-request)

## API Version

The latest API version developed and tested is [`2025-03-13`](https://airtable.com/developers/web/api/changelog#anchor-2025-03-13).

## Description

Airtable is a cloud-based platform that combines the simplicity of a spreadsheet (like Excel or Google Sheets) with the power of a database. The [Airtable Web API](https://airtable.com/developers/web/) allows you to integrate and manage your Airtable data from external systems and applications.

## Credentials

This component supports [Personal access token](https://airtable.com/developers/web/guides/personal-access-tokens) authentication. To obtain an API key, follow these steps:

1. Log in to your [Airtable /create/tokens](https://airtable.com/create/tokens) page.
2. Create a new **Token**.
3. Use the generated key in this component to authenticate your requests.

Set the component credentials as follows:

- **Personal access token**: *(required, string)* - The Personal access token you created in your account.

## Actions

### Delete Record By ID

Deletes a single record by its ID.

#### Configuration Fields

- **Base** - (dropdown, required): The base to delete from.
- **Table** - (dropdown, required): The table within the selected base to delete from.

#### Input Metadata

- **ID Value** - (string, required): The ID of the record to delete.

#### Output Metadata

Returns the ID of the deleted record along with the result of the delete operation (e.g. `deleted: true`).

### Lookup Record By ID

Retrieves a single record using its ID.

#### Configuration Fields

- **Base** - (dropdown, required): The base to lookup in.
- **Table** - (dropdown, required): The table within the selected base to lookup in.

#### Input Metadata

- **ID Value** - (string, required): The ID of the record to lookup.

#### Output Metadata

Returns an object representing the record as a result of the lookup.

**Known limitation**: Currently, the `Generate Stub Sample` button only allows generating generic metadata, without specific object type details.

### Make Raw Request

Enables execution of custom requests directly through the Airtable API.

#### Input Metadata

- **URL** - *(string, required)*: The path of the resource relative to the base URL `https://api.airtable.com/v0/`. For example, `/meta/whoami`.
- **Method** - *(string, required)*: The HTTP method to use for the request (e.g., GET, POST, PUT, DELETE).
- **Request Body** - *(object, optional)*: The payload to include in the request body, if applicable.

#### Output Metadata

- **Status Code** - *(number, required)*: The HTTP response status code returned by the request.
- **HTTP Headers** - *(object, required)*: The HTTP headers included in the response.
- **Response Body** - *(object, optional)*: The content of the HTTP response body, if any.