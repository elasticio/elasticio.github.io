---
layout: component
title: Frontify component
section: Marketing-related components
description: The Frontify component enables you to integrate with your Frontify account.
icon: frontify.png
icontext: Frontify component
category: frontify
ComponentVersion: 1.0.0
updatedDate: 2025-10-10
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Execute Mutation](#execute-mutation)
  * [Lookup Objects (plural)](#lookup-objects-plural)
  * [Lookup Object By ID](#lookup-object-by-id)
  * [Make Raw Request](#make-raw-request)
* [Triggers](#triggers)
  * [Webhook](#webhook)
* [Known Limitations](#known-limitations)

## Description

The Frontify component enables you to integrate with your Frontify account.  It allows you to interact with brand assets, guidelines, and projects stored in Frontify through the [GraphQL API](https://developer.frontify.com/d/xJoA5nhTq1AT/graphql-api#/introduction/graphql-api).

## Credentials
To embark on building any integration flow, the initial step involves creating an app by following these steps:

1. Log in to your Frontify account (e.g., `https://<YOUR-SUBDOMAIN>.frontify.com`).  
2. Navigate to **Account Settings → Developer → Applications**.  
3. Click **Add Application** and provide:  
    - **Name** – a descriptive name for your app.  
    - **Redirect URI** – the callback URL as `https://{your-tenant-address}/callback/oauth2`.
    - **Confidential** - enable this option.
    - **Scopes** – select the scopes that your integration requires (at minimum, `basic:read`).  
4. After saving, Frontify generates a **Client ID** and a **Client Secret**.  

With the app created, proceed to generate new credentials for the component:

* **Type** (dropdown, required) - `OAuth2`
* **Choose Auth Client** (dropdown, required) - choose from previously created clients or select `Add New Auth Client`:
    * **Name** (string, required) - Assign any desired name.
    * **Client ID** (string, required) - Enter the `Client ID` from your Frontify app.
    * **Client Secret** (string, required) - Enter the `Client Secret` from your Frontify app.
    * **Authorization Endpoint** (string, required) - Use Frontify's OAuth2 authorization endpoint `https://<YOUR-SUBDOMAIN>.frontify.com/api/oauth/authorize`.
    * **Token Endpoint** (string, required) - Use Frontify's refresh token endpoint `https://<YOUR-SUBDOMAIN>.frontify.com/api/oauth/accesstoken`.
* **Name Your Credential** (string, required) - Choose any name you prefer.
* **Scopes (Comma-separated list)** (string, required) - Specify the scopes to access your Frontify objects, e.g., `basic:read, basic:write`. You should enter the exact same scopes you selected when creating your Frontify application. For more information on scopes, see the [Frontify API scope documentation](https://developer.frontify.com/d/xJoA5nhTq1AT/graphql-api#/access-control/scopes-p11876). To successfully verify credentials, a minimum of `basic:read` is required.
* **Additional parameters (Comma-separated list)** (string, required) - Leave this field blank.
* **Base URL** (string, required) - Your Frontify domain (e.g., `https://mycompany.frontify.com`).
* **Version** (dropdown, optional, defaults to `v1`) - Choose either `v1` or `v2(beta)`.

## Actions
  
### Execute mutation

Execute any mutation available in the Frontify GraphQL API.  
This action can be used to **create**, **update**, or **delete** objects, as well as perform any other operation that modifies Frontify data.

#### Configuration Fields

* **Mutation type** - (dropdown, required): The mutation type to execute. E.g `Create Asset`.
* **Select basic fields for resulting object** - (dropdown, optional): A predefined set of common fields that can be included in the resulting object. Reducing the number of fields can lower the query cost.
* **You can provide additional fields here** - (string, optional): You can manually specify extra fields to include in the resulting object. Be aware that adding many fields may increase query cost.

Example for Update Asset:
  ```
    asset {
      id
      description
    }
  ```

> Special Notes for `Upload File` Mutation:
>
>* Required fields:
  - **File URL** (string, required): The URL of the file to upload. Can be either an external public URL or an internal Maestar storage URL.
  - **Size** (string, required): File size in bytes.
  - **Filename** (string, required): Name of the file.
>* The action will automatically split the file into chunks and upload each part to Frontify using presigned URLs returned by the mutation.

#### Input Metadata

Dynamically generated fields according to chosen `Mutation type`.

#### Output Metadata

Result object from executed mutation.

### Lookup Objects (plural)

Lookup a set of objects based on defined criteria.  
The results can be emitted either as a page or as individual objects.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to look up. E.g `Brands`.
* **Select basic fields for resulting object** - (dropdown, optional): A predefined set of common fields that can be included in the resulting object. Reducing the number of fields can lower the query cost.
* **You can provide additional fields here** - (string, optional): You can manually specify extra fields to include in the resulting object. Be aware that adding many fields may increase query cost.

Example for Brands:

  ```
    rgbaColor {
      red
      alpha
    }
  ```

* **Emit Behavior** - (dropdown, required): Defines how the result objects will be emitted:

  - Emit page – All results are returned together in one array under the key `results`.
  - Emit individually – Each object is returned in its own message.

#### Input Metadata

Dynamically generated fields according to the chosen `Object type`.

#### Output Metadata

For `Emit Page` mode: An object with key `results` that has an array as its value.

For `Emit Individually` mode: Each object that fills the entire message.

### Lookup Object By ID

Lookup a single object by its ID.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to look up.
* **Select basic fields for resulting object** - (dropdown, optional): A predefined set of common fields that can be included in the resulting object. Reducing the number of fields can lower the query cost.
* **You can provide additional fields here** - (string, optional): You can manually specify extra fields to include in the resulting object. Be aware that adding many fields may increase query cost.

Example for Brand:
  ```
    libraries {
      total
    }
  ```

#### Input Metadata

* **ID Value** - (string, required): The ID of the object to lookup.

#### Output Metadata

Dynamically generated fields according to the chosen `Object type` and selected fields.

### Make Raw Request

Executes custom requests using the Frontify GraphQL API.

#### Configuration Fields

None.

#### Input Metadata

* **Request Body** - (object, optional): Provide the request body.

Example Request Body:

``` json
  "query": "{ currentUser { ... on AccountUser { id email avatar name } } }"
```

[Frontify API reference](https://frontify.github.io/graphql-reference/)

#### Output Metadata

* **Status Code** - (number, required): The HTTP status code of the response.
* **HTTP headers** - (object, required): The response's HTTP headers.
* **Response Body** - (object, optional): The body of the HTTP response.

## Triggers
  
### Webhook

Creates a subscription to selected events.

Required scopes: `basic:write`, `webhooks:read`, `webhooks:write`.

More information can be found on [Frontify Webhooks Docs](https://developer.frontify.com/d/xJoA5nhTq1AT/webhooks#/general/frontify-webhooks-1).

#### Configuration Fields

* **Project Id** - (string, required): Specify the project ID.
* **Name** - (string, required): Specify the name for the subscription.
* **Events** - (dropdown, required): Select the events that will trigger this webhook.
  * For `v1`, only subscription to all events is possible.
  * For `v2(beta)`, specific [event types](https://developer.frontify.com/d/xJoA5nhTq1AT/webhooks#/webhook-events/asset-events) can be chosen.

#### Input Metadata

None.

#### Output Metadata

An object with the key [event](https://developer.frontify.com/d/xJoA5nhTq1AT/webhooks#/webhook-events/event-format-1) that describes changes.

## Known Limitations

* The `Webhook` trigger can only work in a real-time flow.
* Frontify does not guarantee the order in which you receive a webhook for a specific event.
* Occasionally it might happen that you receive the same event multiple times.
* `Retrieving a new sample` for the webhook will not work because the webhook requires a valid event signature. Only events sent by Frontify contain a valid signature.