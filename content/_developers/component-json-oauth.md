---
title: OAuth in Component.json
description: This technical reference describes the changes required in component.json in order for the component to handle the OAuth authentication protocol
layout: article
section: Component Template Features
order: 8
category: component-descriptor
redirect_from:
  - /references/component-json-oauth.html
---

## OAuth1

Specifies OAuth 1.0 specific details of the API used by the component. For more
details about Authenticating with OAuth 1.0 refer to the
[OAuth 1.0 specification](http://oauth.net/core/1.0/) standard.

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| consumer_key | `string` | Yes     | The Consumer Key |
| consumer_secret | `string` | Yes  | The Consumer Secret |
| request_token_uri | `string` | Yes | URI to get a Request Token |
| auth_uri | `string` | Yes | URI to get User Authorization |
| access_token_uri | `string` |Yes | URI to get an Access Token |

Here is an example implementation of OAuth1 in the Credentials Object:

```json
{
  "credentials" : {
    "fields": {
      "oauth": {
        "viewClass":"OAuthFieldView",
        "label":"Twitter Account",
        "required" : true
      }
    },
    "oauth1":{
      "consumer_key":"{{TWITTER_API_KEY}}",
      "consumer_secret":"{{TWITTER_API_SECRET}}",
      "request_token_uri":"https://api.twitter.com/oauth/request_token",
      "auth_uri":"https://api.twitter.com/oauth/authorize",
      "access_token_uri":"https://api.twitter.com/oauth/access_token"
    }
  }
}
```

In case of OAuth1 Authentication we must use `fields` and `oauth1` objects together.
The `fields` object defines the input field type and the `oauth1` object provides
the configuration. Please note that the `viewClass` property of the field must be
set to `OAuthFieldView`.

## OAuth2

Specifies OAuth 2.0 specific details of the API used by the component. For more
details about Authenticating with OAuth 2.0 please read the
[OAuth 2.0 specification](http://tools.ietf.org/html/rfc6749).

To use an OAuth2 based Component in the platform it is required to register a client at the authorization server. After registration the authorization server issues the registered client an identifier (client ID) and a secret. These client credentials are used to create a client using the corresponding API calls. Auth clients can be created on any level: tenant, contract or workspace which incapsulate each other (in order), i.e client created on tenant level is available to use for creating secrets in any workspace of the tenant. You can find all information about the required API endpoints in the [API documentation]({{site.data.tenant.apiDocsUri}}/v2#/auth%20clients).

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| client_id   | `string` | Yes      | The Consumer Key |
| client_secret | `string` | Yes      | The Consumer Secret |
| auth_uri    | `string`   | Yes | URI to get User Authorization |
| token_uri   | `string`   | Yes | URI to get a Access Token |
| scopes      | `array` of `strings` |   No | Scopes of the access request |

Here is an example of `OAuth2` implementation in [Google Spreadsheets](https://github.com/elasticio/gspreadsheets/blob/master/component.json#L18) component:

```json
{
  "oauth2":{
    "client_id":"{{GOOGLE_APP_ID}}",
    "client_secret":"{{GOOGLE_APP_SECRET}}",
    "auth_uri":"https://accounts.google.com/o/oauth2/v2/auth",
    "token_uri":"https://www.googleapis.com/oauth2/v4/token",
    "scopes": [
      "https://spreadsheets.google.com/feeds"
    ],
    "access_type": "offline",
    "prompt": "consent"
  }
}
```

> Please note that the properties `access_type` and `prompt` above are specific to Google. They are not defined in the OAuth2 specification.

Sometimes you will need to access values in the `oauth2` properties you
gathered from the user using fields, as for example is done in the [Salesforce component](https://github.com/elasticio/salesforce-component/blob/master/component.json).
The following example demonstrates how to do that.

```json
{
  "credentials" : {
    "fields":{
      "prodEnv" : {
        "label":"Environment",
        "viewClass":"SelectView",
        "required":true,
        "model":{
          "test":"Sandbox",
          "login":"Production"
        },
        "prompt":"Select environment"
      },
      "oauth":{
        "label":"Authentication",
        "viewClass":"OAuthFieldView",
        "required": true
      }
    },
    "oauth2":{
      "client_id":"SALESFORCE_KEY",
      "client_secret":"SALESFORCE_SECRET",
      "auth_uri":"https://prodEnv.salesforce.com/services/oauth2/authorize",
      "token_uri":"https://prodEnv.salesforce.com/services/oauth2/token"
   }
 }
}
```

In the example above the value of the `prodEnv` field is used to define the `auth_uri` and `token_uri` properties.

The `auth_url` property can take additional query parameters as shown below:

```json
{
  "oauth2": {
    "auth_uri": "https://login.windows.net/common/oauth2/authorize?resource=RESOURCSE",
    "token_uri": "https://login.windows.net/common/oauth2/token"
  }
}
```
