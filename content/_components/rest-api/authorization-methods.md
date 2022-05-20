---
title: Authorization methods
layout: component
description: Information on authorization methods in REST API component.
icon: rest-api.png
icontext: REST API component
category: rest-api
updatedDate: 2022-04-08
ComponentVersion: 2.0.12
---

## Authorization methods

To use the REST API component with any restricted access API, you need provide the authorization information.

![alt text](https://user-images.githubusercontent.com/8449044/95571339-ee70a600-0a30-11eb-972e-d512c1ef88d9.png "REST API component Basic authorization")
*Example above shows how to add the username/password to access the API during the integration flow design.*

You can add the authorization methods during the integration flow design or by going to the left side-bar, choosing `Credentials > REST API V2`
and adding there.

![alt text](https://user-images.githubusercontent.com/8449044/95571461-2f68ba80-0a31-11eb-9fff-c67b34506b00.png "REST API component OAuth2 authorization")

*Example above shows how to add new credential to access the API from Credentials page.*

REST API component supports 4 authorization types:

*   `No Auth` - use this method to work with any open REST API
*   `Basic Auth` - use it to provide login credentials like **username/password**
*   `API Key Auth` - use it to provide `API Key` to access the resource
*   `OAuth2` - use it to provide `Oauth2` credentials to access the resource. Currently it is implemented `Authorization code` OAuth2 flow.

To create `OAuth2` credential you have to choose Auth-client or create the new one. It must contains `Name`, `Client ID`, `Client Secret`, `Authorization Endpoint` and `Token Endpoint`. For more information please check the documentation of the API you want to connect to.

![alt text](https://user-images.githubusercontent.com/8449044/95571677-7e165480-0a31-11eb-9b45-915401d40e31.png "Creating auth client for REST API component")

*Example above shows how to add new Auth-client to access the API.*

Here you can see how to select an existing `client`:

![Choose client](img/client-exist.png)

>**Please note** that the result of creating a credential is an HTTP header automatically placed for you. You can also specify the authorization in the headers section directly.

### Auth-client creation

The REST-API-v2 component has a possibility to use 4 types of auth-clients:

* `oauth2` - this is the OAuth2 type
* `basic` - a basic type with username and password only
* `api_key` - this is for API Key and header key
* `noauth` - no authentication is required

For all 4 cases, an auth-client must be created before you can use them. This means even for the `noauth` you must have auth-client .
Each auth-client is unique to a component. That means if you deploy another copy of the REST-API-V2 component to our platform you would need to create all 4 types of auth-clients for this component to work. Here you can see an example what `noauth` body should look like:

![Noauth example](img/auth-client-noauth.png)

As you can see in the ???orange block???,  the above API call body is for creating `noauth` type auth-client for the whole tenant. You can choose between `component`, `workspace`, `contract` and `tenant` levels. For more information please visit out [API documentation]({{site.data.tenant.apiBaseUri}}/docs/v2/#create-auth-client).

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

</details>

> **Please Note:** authClientTypes must be exactly the same as specified in the component structure.
```json
"authClientTypes": [
    "oauth2",
    "basic",
    "api_key",
    "noauth"
  ]
```

### Environment variables

| NAME                       | DESCRIPTION    | DEFAULT   | OPTIONAL |
|----------------------------|------------------------|-----------|----------|
| REQUEST_TIMEOUT            | HTTP authorization request timeout in milliseconds.                                                   | 10000     | true     |
| REQUEST_RETRY_DELAY        | Delay between authorization retry attempts in milliseconds                                            | 5000      | true     |
| REQUEST_MAX_RETRY          | Number of HTTP authorization request retry attempts.                                                  | 3         | true     |
