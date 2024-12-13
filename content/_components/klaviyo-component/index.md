---
title: Klaviyo component
layout: component
section: Marketing-related components
description: The Klaviyo Component provides a simple way to interact with the Klaviyo API, enabling efficient integration with Klaviyo’s powerful features.
icon: klaviyo.png
icontext: Klaviyo component
category: klaviyo
ComponentVersion: 1.0.0
updatedDate: 2024-12-04
---

## Table of Contents

- [Klaviyo Component](#klaviyo-component)
  - [Table of Contents](#table-of-contents)
  - [API version](#api-version)
  - [Description](#description)
  - [Credentials](#credentials)
  - [Triggers](#triggers)
    - [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
  - [Actions](#actions)
    - [Make Raw Request](#make-raw-request)

## API version

The most recent version is `2024-10-15`

## Description

Klaviyo is a customer data and marketing automation platform tailored for e-commerce businesses. It empowers users to collect, analyze, and utilize customer data to create highly targeted email and SMS marketing campaigns, automate workflows, and foster personalized customer engagement. Klaviyo integrates seamlessly with platforms like Shopify and Magento, making it an indispensable tool for improving customer retention and driving sales.

The Klaviyo Component provides a simple way to interact with the [Klaviyo API](https://developers.klaviyo.com/en/reference/api_overview), enabling efficient integration with Klaviyo's powerful features.

## Credentials

This component supports API key authentication. To obtain an API key, follow these steps:

1. Log in to your [Klaviyo account](https://www.klaviyo.com/settings/account/api-keys)
2. Navigate to **Settings -> API Keys**
3. Create a **Private API Key**
4. Define the required scopes for the API key
5. Use the generated key in this component to authenticate your requests

Now you can set the component credentials:

- **API key**: *(required, string)* - API key you created in the account
- **Revision**: *(optional, string)* - API version to use. Default: `2024-10-15`. Refer to the [Versioning docs](https://developers.klaviyo.com/en/docs/api_versioning_and_deprecation_policy) to find the versions available.

**Important!** Note that in order to successfully verify the credentials in the component, the api key you create must have *at least* the scope: `List: Read Access`.

## Triggers
  
### Get New and Updated Objects Polling

Retrieve all the updated or created objects within a given time range.

#### Configuration Fields

- **Object Type** - (dropdown, required): Type of object to poll on.
- **Timestamp field to poll on** - (dropdown, required): Select the date field to track changes.
- **Emit behavior** - (dropdown, optional): Indicates emit objects behavior - `Emit individually` (by default) or `Emit page`
- **Size of Polling Page** - (optional, positive integer, defaults to 100, max 100): Indicates the size of pages to be emitted. Note, that the Klaviyo API sets different page sizes to be returned to the component per each execution. This parameter is not set by this configuration.
- **Start Time** - (string, optional): The timestamp, in ISO8601 format, to start polling from (inclusive). The default value is the beginning of time (January 1, 1970 at 00:00.000). E.g. 2024-11-21T10:00:00Z.

#### Input Metadata

None.

#### Output Metadata

- For `Fetch page`: An object with key ***results*** that has an array as its value
- For `Emit Individually`:  Each object fills the entire message

## Actions

### Make Raw Request

Allows for the execution of custom requests directly using the Klaviyo API.

#### Input Metadata

- **Url** - *(string, required)*: The path of the resource relative to the base URL `https://a.klaviyo.com/api`. For example, `/profiles?page[size]=20`.
- **Method** - *(string, required)*: The HTTP method to use for the request (e.g., GET, POST, PUT, DELETE).
- **Request Body** - *(object, optional)*: The payload to include in the request body, if applicable.

#### Output Metadata

- **Status Code** - *(number, required)*: The HTTP response status code returned by the request.
- **HTTP Headers** - *(object, required)*: The HTTP headers included in the response.
- **Response Body** - *(object, optional)*: The content of the HTTP response body, if any.