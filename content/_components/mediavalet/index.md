---
layout: component
title: MediaValet component
section: Marketing-related components
description: The MediaValet component provides actions that offer functionality in line with the MediaValet API that implements hypermedia to provide access to Asset information, creation of Asset, generation of CDN link and more.
icon: mediavalet.png
icontext: MediaValet component
category: mediavalet
ComponentVersion: 1.0.0
updatedDate: 2026-03-26
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Add details to the Asset](#add-details-to-the-asset)
  * [Assign Asset to the Category](#assign-asset-to-the-category)
  * [Create a Direct Link](#create-a-direct-link)
  * [Finalize Upload](#finalize-upload)
  * [Make Raw Request](#make-raw-request)
  * [Request Upload URL](#request-upload-url)
  * [Retrieve all Assets (with detailed info)](#retrieve-all-assets-with-detailed-info)
  * [Retrieve an Asset](#retrieve-an-asset)
  * [Retrieve Assets with Search Criteria](#retrieve-assets-with-search-criteria)
  * [Retrieve Direct Links](#retrieve-direct-links)
  * [Upload and Create Asset](#upload-and-create-asset)
  * [Upload the file](#upload-the-file)

## Description

{{page.description}} Please check the [API documentation](https://docs.mediavalet.com).

## Credentials

The MediaValet component uses OAuth 2.0 authentication.

### Component Configuration

1. **Authentication** (OAuth 2.0, required) - Configure OAuth 2.0 credentials:
   - **Client ID** - From your MediaValet application
   - **Client Secret** - From your MediaValet application
   - **Authorization Endpoint** - `https://login.mediavalet.com/connect/authorize`
   - **Token Endpoint** - `https://login.mediavalet.com/connect/token`
2. **Subscription Key (Primary Key)** (string, required) - The subscription key of your api plan.
3. **Number of retries** (number, optional, default `5`) - How many times requests are retried when throttled.
4. **Delay between retries** (number, optional, default `5000`) - Wait time in milliseconds before the next retry.

### Retry Mechanism

The component handles HTTP errors systematically based on their category:

1. **5xx Server Errors**: Automatically retried up to the designated `Number of retries` utilizing an exponential backoff formula.
2. **429 Rate Limiting**: Explicitly retried up to the maximum `Number of retries`, waiting exactly the `Delay between retries` between each attempt before throwing an error.
3. **401 Unauthorized**: The component will intercept this and explicitly attempt to refresh the token using your credentials. If the response indicates an invalid subscription key or if a token rotation yields the exact same invalid token, it quickly throws the error without triggering a retry loop.
4. **Other 4xx Client Errors** *(e.g. 400 Bad Request, 403 Forbidden, 404 Not Found)*: **No retries**. The component will immediately fail out and throw the error or return the error payload if `Don't throw Error on Failed Calls` is enabled.

## Actions

### Add details to the Asset

Supply a description and title to each asset being uploaded.

#### Configuration Fields
* **Don't throw Error on Failed Calls** (checkbox)

#### Input Metadata
* **Asset ID** (string, required)
* **Asset File Name** (string, required)
* **Asset Title** (string, optional)
* **Asset Description** (string, optional)
* **File Size** (number, optional) - Size in Bytes.

### Assign Asset to the Category

Assign Asset to the Category.

#### Configuration Fields
* **Don't throw Error on Failed Calls** (checkbox)

#### Input Metadata
* **Asset ID** (string, required)
* **Category ID(s)** (array, required) - List of Category IDs.

### Create a Direct Link

Generates a direct link for an original or renditions for any asset type.

#### Configuration Fields
* **Don't throw Error on Failed Calls** (checkbox)

#### Input Metadata
* **Asset ID** (string, required)
* **Type of Size** (string, optional)
* **Width** (number, optional)
* **Height** (number, optional)
* **Format** (string, required)
* **Link Name** (string, required)
* **Is Unique Link** (boolean, required)

### Finalize Upload

Finalize the Upload.

#### Configuration Fields
* **Don't throw Error on Failed Calls** (checkbox)

#### Input Metadata
* **Asset ID** (string, required)

### Make Raw Request

Sends a custom HTTP request to the MediaValet REST API. Use this action when you need functionality not covered by prebuilt actions.

#### Configuration Fields

None.

#### Input Metadata

* **Method** (string, required) – HTTP verb to use in the request, one of `GET`, `POST`, `PATCH`, `PUT`, `DELETE`.
* **URL** (string, required) – Path of the resource relative to the base URL. Examples:
  * `/assets` – Access all assets
  * `/assets/{assetId}` – Access a specific asset
* **Request Body** (object, optional) – Body of the request to send (required for POST, PATCH, PUT).

#### Output Metadata

* **Status Code** (number, required) – HTTP status code of the response.
* **HTTP headers** (object, required) – HTTP headers of the response.
* **Response Body** (object, optional) – HTTP response body.

### Request Upload URL

Request a URL to upload the Asset file.

#### Configuration Fields
* **Don't throw Error on Failed Calls** (checkbox)

#### Input Metadata
* **File Name** (string, required) - Name of the Asset file to be uploaded (with extension).

### Retrieve all Assets (with detailed info)

Retrieve all the Assets with detailed information about each of them.

#### Configuration Fields
* **Don't throw Error on Failed Calls** (checkbox)
* **Split result if its an array** (checkbox)

#### Input Metadata
* **Number of responses** (number, optional) - Max 50 per request.
* **Offset** (number, optional)

### Retrieve an Asset
Return information of the single Asset from the specified mediavalet library.

#### Configuration Fields
* **Don't throw Error on Failed Calls** (checkbox) - If selected, the component will emit any error response as a message instead of throwing an error.

#### Input Metadata
* **Asset ID** (string, required) - ID of the asset to be retrieved.
* **Include Soft Deleted** (boolean, optional) - Allow soft deleted assets if permissible.

### Retrieve Assets with Search Criteria

Return information of all the Assets present in the specified mediavalet library.

#### Configuration Fields
* **Don't throw Error on Failed Calls** (checkbox)
* **Split result if its an array** (checkbox) - If selected, we will emit one message for each element of the array.

#### Input Metadata
* **Include Soft Deleted** (boolean, optional)
* **Count** (number, optional) - Number of records to be returned (max 50).
* **Offset** (number, optional) - Number of records to be skipped.
* **Search** (string, optional)
* **Sort** (string, optional)
* **Filters** (string, optional)
* **Container Filter** (string, optional)
* **Search Fields** (string, optional)
* **Include total count** (boolean, optional)

### Retrieve Direct Links

Retrieve all the direct cdn links of an Asset.

#### Configuration Fields
* **Don't throw Error on Failed Calls** (checkbox)
* **Split result if its an array** (checkbox)

#### Input Metadata
* **Asset ID** (string, required)
* **Include Soft Deleted** (boolean, optional)

### Upload and Create Asset

Upload and Create an Asset in a single action.

Be aware that processing files bigger than 10 MB is not recommended!

#### Configuration Fields
* **Don't throw Error on Failed Calls** (checkbox)

#### Input Metadata
* **File Name** (string, required)
* **File URL** (string, required)
* **Asset Title** (string, optional)
* **Asset Description** (string, optional)
* **File Size** (number, optional)
* **Category ID(s)** (array, required)

### Upload the file

Upload the file to Azure Blob storage.

#### Configuration Fields
* **Don't throw Error on Failed Calls** (checkbox)

#### Input Metadata
* **Azure Upload URL** (string, required) - Upload URL from "Request Upload URL" step.
* **File URL** (string, required) - URL of the Asset file to be uploaded.