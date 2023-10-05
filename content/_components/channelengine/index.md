---
title: ChannelEngine component
layout: component
section: Service components
description: Component is designed to connect with ChannelEngine using API
icon: channelengine.png
icontext: ChannelEngine component
category: channelengine
updatedDate: 2023-09-07
ComponentVersion: 1.0.0
---

## Description

The ChannelEngine Component is designed to seamlessly connect with ChannelEngine through its API.

## Credentials

Configure the following fields for the component credentials:

* **API Base URI** (string, required): Specify the base URL to be used (your installation URL, e.g., `https://YourAccount.channelengine.net/api/`).
* **API key** (string, required): Enter your Merchant API key; for more information, refer to [this link](https://support.channelengine.com/hc/en-us/articles/4409502549661-ChannelEngine-getting-API-access).
* **Swagger JSON file location** (string, required): Provide the path to your Swagger file (e.g., `https://youraccount.channelengine.net/api/swagger/merchant/swagger.json`).

## API version

This component is tested with `ChannelEngine Merchant API` version `2.13.0`.

## Triggers

This component does not have trigger functions, making it inaccessible as the first component during the integration flow design.

## Actions

### Make API Call

This action is employed to call any endpoint from the provided Swagger file.

#### Configuration Fields

Select an endpoint (dropdown, required): Choose from available endpoints, e.g., GET /v2/channels (Get channels.).

#### Input Metadata

Each field is automatically generated based on the selected endpoint:

* **Parameters from path** (object, optional): Provide required fields to build the correct path. For example, if your endpoint looks like `/v2/channels/{channelId}/products`, include the field `channelId`.
* **Request parameters** (string, optional): Add additional parameters for the request.
* **Request body** (string, optional): Include the request body if the endpoint supports it. If you need to upload a file, the field name will be renamed to `{original name}` - URL to file location, where you can provide a link to the file (on the platform or external).

#### Output Metadata

In common cases, this will be the Response body. If this is a file, an object with the field url to the file location on the platform will be provided.

#### Known Limitations

If the endpoint supports pagination (field `page` in `Request parameters`) and you don't provide an exact page number, the component will automatically go through all pages and emit all of them.

### Make Raw Request

Executes a custom request.

#### Configuration Fields

* **Don't throw error on 404 Response** (optional, boolean): Treat 404 HTTP responses not as an error (defaults to false).

#### Input Metadata

* **Url** (string, required): Path of the resource relative to the base URL.
* **Method** (string, required): HTTP verb to use in the request, one of GET, POST, PUT, PATCH, DELETE.
* **Request Body** (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** (number, required): HTTP status code of the response.
* **HTTP headers** (object, required): HTTP headers of the response.
* **Response Body** (object, optional): HTTP response body.
