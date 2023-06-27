---
title: Authorization methods
layout: component
description: Information on authorization methods in REST API component.
icon: rest-api.png
icontext: REST API component
category: rest-api
updatedDate: 2022-09-14
ComponentVersion: 2.0.14
---

## Authorization Methods

When working with the REST API component and accessing restricted APIs, you need to provide authorization information. This article explains how to add different types of authorization during the integration flow design.

### Adding Authorization Methods

There are two ways to add authorization methods:

Integration Flow Design: You can add authorization methods directly during the integration flow design process. To do this, refer to the image below:

{% include img.html max-width="100%" url="img/basic_auth.png" title="Basic auth" %}

Credentials Section: Alternatively, you can add authorization methods by navigating to the left side-bar, choosing `Credentials > REST API V2` and adding them there. Follow the steps below to add new credentials:

{% include img.html max-width="100%" url="img/credentials_rest_api.png" title="Credentials section" %}

### Supported Authorization Types

The REST API component supports the following authorization types:

*   `No Auth`: Use this method to work with any open REST API.
*   `Basic Auth`: Use this method to provide login credentials such as username and password.
*   `API Key Auth`: Use this method to provide an `API Key` for accessing the resource.
*   `OAuth2`: Use this method to provide `OAuth2` credentials for accessing the resource. Currently, only the `Authorization code` OAuth2 flow is implemented.

## Creating OAuth2 Credentials

To create `OAuth2` credentials, you need to choose an Auth-client or create a new one. The Auth-client must include the following details:

* `Name`
* `Client ID`
* `Client Secret`
* `Authorization Endpoint`
* `Token Endpoint`

Refer to the API documentation of the resource you want to connect to for more information. Follow the steps below to add a new Auth-client:

{% include img.html max-width="100%" url="img/add_auth_client.png" title="Add Auth Client" %}

Additionally, you can select an existing `client` by following the steps shown in the image below:

{% include img.html max-width="100%" url="img/choose_client.png" title="Choose client" %}

> Please note that creating a credential automatically generates an HTTP header for you. You can also specify the authorization directly in the headers section.

### Additional fields in OAuth2

Some Instagram services utilize unique authorization schemas, and to accommodate this, we have introduced a new Auth Client Type called `oauth2_instagram`.

In the `component.json` file of the REST API V2 component, you need to define the scopes because the `OAuthFieldView` does not allow specifying them in the credentials section. Here is an example of how it should be configured:

```json

"authClientTypes": [
  "oauth2_instagram"
]
"credentials": {
  "fields": {
    "auth": {
      "required": false,
      "viewClass": "OAuthFieldView"
    }
  },
  "oauth2": {
    "scopes": ["user_profile", "user_media"]
  }
}

```

>**Please Note:** `HTTPAuthView` does NOT support `oauth2_instagram` type.

Here's how the authorization process works on our platform:

1. The user creates an OAuth Client by providing all the necessary data.

2. The user then creates a new credential and clicks **"Authenticate"**, which redirects them to the Instagram OAuth window. Once the user logs in, Instagram returns an authorization code.

3. The user saves the credential, and our backend automatically exchanges the authorization code for a short-lived token. Subsequently, it instantly exchanges the short-lived token for a long-lived token, which becomes associated with the credential.

4. As the long-lived token nears its expiration, our backend automatically refreshes it. This ensures that the Flows utilizing the token can always access the Instagram API seamlessly.

## Auth-client creation

The REST-API-v2 component supports four types of auth-clients:

* `oauth2` - this is the OAuth2 type
* `basic` - a basic type with username and password only
* `api_key` - this is for API Key and header key
* `noauth` - no authentication is required

For all four cases, you need to [create]({{site.data.tenant.apiDocsUri}}/v2#/auth%20clients/post_auth_clients) an `auth-client` before using them. This means even for the `noauth` method, an `auth-client` is required.

Each `auth-client` is unique to a component. If you deploy another copy of the REST-API-V2 component to our platform, you will need to create all four types of `auth-clients` for it to work.

Below is an example of what the body of a noauth type auth-client should look like:

{% include img.html max-width="40%" url="img/auth-client-noauth.png" title="Noauth example" %}

In the example, the API call body is for creating a `noauth` type auth-client for the entire tenant. You can choose between `component`, `workspace`, `contract`, and `tenant` levels. For more information, please visit our [API documentation]({{site.data.tenant.apiDocsUri}}/v2#/auth%20clients/post_auth_clients).

<details close markdown="block"><summary><strong>noauth body in json</strong></summary>

```json
{
    "data": {
        "type":"auth-client",
        "attributes":{
            "type":"noauth",
            "name": "No Auth",
            "credentials": {}
        },
        "relationships":{
         "components":{
            "data":[
               {
                  "id":"COMPONENT_ID",
                  "type":"component"
               }
            ]
         },
         "tenant":{
            "data":{
               "id":"TENNT_ID",
               "type":"tenant"
            }
         }
        }
    }
}
```

> Please note that the credentials field is left blank for the `noauth` type. However, for the other three types, you need to specify the credentials as shown below.

</details>

<details close markdown="block"><summary><strong>Basic</strong></summary>

```json
"credentials": {
                "name": "USER_NAME"
            }
```
</details>

<details close markdown="block"><summary><strong>API Key</strong></summary>

```json
"credentials":{
                "name" : "HEADER_NAME",
                "value" : "API_KEY"
            }
```
</details>

<details close markdown="block"><summary><strong>OAuth 2</strong></summary>

```json
"credentials":{
            "client_id":"CLIENT_ID",
            "client_secret":"CLIENT_SECRET",
            "refresh_token_uri":"http://example.com",
            "token_expires_in":18000,
            "token_uri":"TOKEN_URI",
            "auth_uri":"AUTH_URI"
         }
```

> Please ensure that the authClientTypes specified in the component structure match exactly with the types mentioned above:

```json
"authClientTypes": [
    "oauth2",
    "basic",
    "api_key",
    "noauth"
  ]
```

</details>

### Environment variables

| NAME                       | DESCRIPTION    | DEFAULT   | OPTIONAL |
|----------------------------|------------------------|-----------|----------|
| REQUEST_TIMEOUT            | HTTP authorization request timeout in milliseconds.                                                   | 10000     | true     |
| REQUEST_RETRY_DELAY        | Delay between authorization retry attempts in milliseconds                                            | 5000      | true     |
| REQUEST_MAX_RETRY          | Number of HTTP authorization request retry attempts.                                                  | 3         | true     |
