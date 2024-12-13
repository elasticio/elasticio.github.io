---
title: Pipedrive component
layout: component
section: CRM components
description: The Pipedrive Component enables seamless interaction with the Pipedrive API. 
icon: pipedrive.png
icontext: Pipedrive component
category: pipedrive
updatedDate: 2024-12-02
ComponentVersion: 1.0.0
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Make Raw Request](#make-raw-request)

## Description

The Pipedrive Component enables seamless interaction with the [Pipedrive API](https://developers.pipedrive.com/docs/api/v1). This component has been tested with API versions `v1` and `v2`.

## Credentials
To begin building any integration flow, the first step is to create an application by following these instructions:

1. Obtain your [developer sandbox account](https://developers.pipedrive.com/).
   * If you already have a sandbox account, switch to it by clicking on your profile name or picture in the upper right corner and selecting `Switch company`.
2. Open the [Developer Hub](https://app.pipedrive.com/developer-hub).
3. Click the `Create an app` button.
4. Select `Create private app`.
5. Enter a desired `App name`.
6. Provide the `Callback URL` as `https://{your-tenant-address}/callback/oauth2`, where `{your-tenant-address}` is the domain of the integration platform.
7. In the `OAuth & access scopes` section, select the necessary scopes—object types and operations that you plan to use with this integration. Also, copy the `Client ID` and `Client secret`, as they will be needed in the subsequent steps.

For more information about creating an OAuth app, please refer to the documentation [here](https://pipedrive.readme.io/docs/marketplace-registering-the-app).

Once the app is created, proceed to set up new credentials for the component:

* **Choose Auth Client** (dropdown, required) - Choose from the previously created clients or select `Add New Auth Client`:
    * **Name** (string, required) - Assign any desired name.
    * **Client ID** (string, required) - Enter the `Client ID` obtained from your app.
    * **Client Secret** (string, required) - Enter the `Client secret` from your app.
    * **Authorization Endpoint** (string, required) - Enter the OAuth2 authorization endpoint: `https://oauth.pipedrive.com/oauth/authorize`.
    * **Token Endpoint** (string, required) - Enter the refresh token endpoint: `https://oauth.pipedrive.com/oauth/token`.
* **Name Your Credential** (string, required) - Enter a name of your choice.
## Actions

### Make Raw Request

Allows for the execution of custom requests using the Pipedrive REST API directly.

#### Configuration Fields

* **Don't throw an error on 404 Response** - (optional, boolean): Configures the handling of 404 HTTP responses as non-errors. Default is `false`.

#### Input Metadata

* **Url** - (string, required): The relative path of the resource, appended to the base URL `https://{COMPANYDOMAIN}.pipedrive.com/api/`.
* **Method** - (string, required): Specifies the HTTP method for the request, one of "GET", "POST", "PUT", "PATCH", "DELETE".
* **Request Body** - (object, optional): The body content for the request.

#### Output Metadata

* **Status Code** - (number, required): The HTTP response status code.
* **HTTP headers** - (object, required): The response's HTTP headers.
* **Response Body** - (object, optional): The body of the HTTP response.