---
title: OAuth2 setup preparation in component.json
description: It is important to make sure that this setup is prepared and provided during the design of the integration component.
layout: article
section: Tokens in OAuth2 components
order: 3
category: tokens-in-oauth2-components
redirect_from:
  - /references/oauth2-setup-preparation-in-component-json.html
---

## Description

It is important to make sure that this setup is prepared and provided during the design of the integration component. The setup of `oauth` part is one part of the general process of authorization.

The `oauth` setup in the `component.json` of your component ensures that several things are set:

  * The `credentials` field is presented in the user interface for the user to give its explicit authorization to the {{site.data.tenant.name}} **Application**. This ensures the ability to add security credentials to be used for the integration component proper function.
  
  * The `authClientTypes` property specifies the authentication types supported by the component. It supports `oauth2`, `oauth2_client_credentials`, `basic`, `api_key`, `noauth` - allowing users to choose their preferred authentication method. 
  > **Please Note:** The `oauth2_client_credentials` option can only be specified in combination with `oauth2`. All other authentication types can be specified in any combination, e.g. `oauth2`, `basic`, `api_key`, `noauth`.

## Example

Let us explain how it should be done on an example of currently working example. Here are the corresponding lines from [component.json](https://github.com/elasticio/outlook/blob/master/component.json) of our [Outlook component](/components/outlook/index) showing those parts:

```js
{
  "title": "Outlook",
  "description": "elastic.io integration component for Office 365 Outlook REST API",
  "version": "2.1.1",
  "authClientTypes": [
    "oauth2"
  ],
  "credentials": {
    "fields": {
      "oauth": {
        "label": "Authentication",
        "viewClass": "HTTPAuthView",
        "required": true
      }
    }
  },
  ...
}
``` 

The `authClientTypes` property specifies the authentication types supported by the component. To support both  OAuth 2.0 Authorization flow and OAuth 2.0 Client Credentials grant authentication types, configure it as follows:

```json
"authClientTypes": [
  "oauth2",
  "oauth2_client_credentials"
]
```

This allows users to choose their preferred authentication method when configuring the integration component.

Once added, your `component.json` will look like this:


```json
{
  "title": "Best component",
  "description": "Best component",
  "version": "1.0.0",
  "authClientTypes": [
    "oauth2",
    "oauth2_client_credentials"
  ],
  "credentials": {
    "fields": {
      "oauth": {
        "label": "Authentication",
        "viewClass": "HTTPAuthView",
        "required": true
      }
    }
  },
  ...
} 
```

## Token Refresh Behavior

The `oauth2_client_credentials` authentication type uses the OAuth 2.0 Client Credentials grant, which allows an application to obtain an access token using its own client credentials without requiring explicit user authorization. For more details, see the official [OAuth 2.0 Client Credentials Grant Specification (RFC 6749)](https://datatracker.ietf.org/doc/html/rfc6749).

When the access token expires, a new access token is requested from the token endpoint using the Client Credentials grant. Unlike authorization code flows, this flow typically does not issue a refresh token. Therefore, token renewal is performed by requesting a new access token rather than exchanging a refresh token.

## Notes

From the examples, we have the following sections to note:

* The `oauth` field draws the user interface for `credentials`. For more details, please refer to the credentials object description. This would be the interface where the **User** would be asked to authorise. This is just one example representation and can be different from component to component. However, everything which is involved in drawing that part should be included here.
* The `authClientTypes` property specifies the authentication types supported by the component. For example, the `oauth2` type represents the Authorization flow, while `oauth2_client_credentials` enables authentication using the Client Credentials grant. Both OAuth 2.0 types can be specified together, allowing users to choose their preferred authentication method.
* The `oauth2_client_credentials` type does not require interactive user authorization. When the access token expires, a new token is requested using the client credentials rather than a refresh token.

> It is also worth mentioning that `oauth` is used as the name of the JSON structure where the final `credentials` are saved in the database.