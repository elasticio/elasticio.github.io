---
layout: component
title: Apptivo component
section: CRM components
description: The Apptivo component provides a simple way to interact with the Apptivo API, enabling efficient integration with Apptivo's powerful features.
icon: apptivo.png
icontext: Apptivo component
category: apptivo
ComponentVersion: 1.0.0
updatedDate: 2025-08-15
---

## Table of Contents

- [Apptivo Component](#apptivo-component)
  - [Description](#description)
  - [Credentials](#credentials)
  - [Actions](#actions)
    - [Make Raw Request](#make-raw-request)

## Description

Apptivo is a cloud-based suite of over 50 integrated business applications designed for small and medium-sized businesses. While often categorized as a Customer Relationship Management (CRM) platform, it's more comprehensive, with a modular approach that allows companies to use and pay for only the tools they need.

The Apptivo component provides a simple way to interact with the [Apptivo API](https://www.apptivo.com/developer-api/), enabling efficient integration with Apptivo's powerful features.

## Credentials

This component supports API key/Access key authentication. To obtain these keys, follow these steps:

1. Log in to your Apptivo account
2. Click on your profile logo - **Business Settings**
3. Go to  **API Access**
4. Use the keys in this component to authenticate your requests

Now you can set the component credentials:

- **API key**: *(required, string)* - API key you found in the account
- **Access key**: *(required, string)* - Access key you found in the account

## Actions

### Make Raw Request

Allows for the execution of custom requests directly using the Apptivo API.

#### Input Metadata

- **Url** - *(string, required)*: The path of the resource relative to the base URL `https://app.apptivo.com/app/dao/v6`. For example, `/contacts?a=getConfigData`.
- **Method** - *(string, required)*: The HTTP method to use for the request (e.g., GET, POST, PUT, DELETE).
- **Request Body** - *(object, optional)*: The payload to include in the request body, if applicable. However, with the Apptivo API, the request body is often passed as part of the URL. If the API documentation specifies that the payload should be in the URL, leave the request body field empty. Always consult the Apptivo documentation to build the correct API call for your specific needs.

#### Output Metadata

- **Status Code** - *(number, required)*: The HTTP response status code returned by the request.
- **HTTP Headers** - *(object, required)*: The HTTP headers included in the response.
- **Response Body** - *(object, optional)*: The content of the HTTP response body, if any.