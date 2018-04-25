---
title: Component Descriptor Structure
layout: article
section: Component Descriptor
since: 20180315
---

Each integration component developed for {{site.data.tenant.name}} platform must
have a **component descriptor** file called `component.json` in its root folder.
It describes and links component's functions and the credentials necessary to run
your component on the {{site.data.tenant.name}} platform.

To see the component descriptor structure implementation you are welcome to read
our introductory guides about building [java](/developer-guide/building-java-component) or [node.js](/developer-guide/building-nodejs-component) components for the
{{site.data.tenant.name}} platform environment. Here we will concentrate on
providing an in-depth reference about the structure and the objects which you can
use to describe different parts of any component.

Each `component.json` can have the following hierarchic structure:

```
Root Object
├── envVars Object
|
├── Credentials Object
|   ├── fields Object
|   ├── OAuth1 Object
|   └── OAuth2 Object
|
├── Triggers Object
|   ├── fields Object
|   └── metadata Object
|
└── Actions Object
    ├── fields Object
    └── metadata Object
```

| Object Type | Implementation |
| :--- | :--- |
| [Root Object](#root-object) | used to declare the component |
| [envVars Object](#envvars-object) | used to declare the environment variables |
| [Credentials Object](#credentials-object) | used to grant component the access |
| [Triggers Object](#triggers-object) | used to expose component's triggers |
| [Actions Object](#actions-object) | used to expose component's actions |

# Root Object
Navigate to: | Root Object | [envVars Object](#envvars-object) | [Credentials Object](#credentials-object) | [Triggers Object](#triggers-object) | [Actions Object](#actions-object) |

---------

Every component consist of the **Root Object** which encompasses all the other objects
and information. It contains the following fields:

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| `title`       | `string` | Yes      | Specifies the component's title to be displayed below the component's logo |
| `description` | `string` | Yes      | Description of the component |
| `docsURL`     | `string` | No       | URL to documentation |
| `envVars`     | `object` | No       | Environment variables |
| `credentials` | `object` | No       | Specifies input fields to provide Authentication with the given API |
| `triggers`    | `object` | Yes/No   | Specifies component's triggers |
| `actions`     | `object` | Yes/No   | Specifies component's actions |

# envVars Object
Navigate to: | [Root Object](#root-object) | envVars Object | [Credentials Object](#credentials-object) | [Triggers Object](#triggers-object) | [Actions Object](#actions-object) |

---------

The **envVars object** is used to define the environment variables which can be used
throughout the whole component. Every environment variable must have the following
properties:

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| `required`    | `boolean`| No       | Specifies whether setting the environmental variable is required for the component to operate properly. If not present then the value is set `false` by default. |
| `description` | `string` | No       | Description of the environment variable |

An environment variable is defined using a word or words connected with hyphens
(`-`) or underscores (`_`) in capital letters. Here is an example of `envVars`
object implemented in the [Salesforce Component](https://github.com/elasticio/salesforce-component/blob/master/component.json):

```json
"envVars": {
    "SALESFORCE_KEY": {
      "required": true,
      "description": "Your Salesforce OAuth client key"
    },
    "SALESFORCE_SECRET": {
      "required": true,
      "description": "Your Salesforce OAuth client secret"
    }
  }
```

# Credentials Object
Navigate to: | [Root Object](#root-object) | [envVars Object](#envvars-object) | Credentials Object | [Triggers Object](#triggers-object) | [Actions Object](#actions-object) |

---------

The **Credentials Object** specifies how a user can grant a component the access
to his protected resources using API.

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| `fields`      | `object` | Yes      | Input fields used to provide credentials for Authentication. Each property of this object defines a name of a configuration property. |
| `oauth1`      | `object` |          | Specifies the APIs details about Authenticating with OAuth 1.0 |
| `oauth2`      | `object` |          | Specifies the APIs details about Authenticating with OAuth 2.0 |

## Basic Authentication

If the authentication is done via HTTP headers, then it is sufficient to define
a single input field (`TextFieldView` - check the View Classes for more) for an
API key like it is done in the [Petstore API (Node.js)](https://github.com/elasticio/petstore-component-nodejs/blob/master/component.json)
component:

```json
"credentials": {
    "fields": {
      "apiKey": {
        "label": "API key",
        "required": true,
        "viewClass": "TextFieldWithNoteView",
        "note": "Please use <b>elasticio</b> as API key ..."
      }
    }
  }
```



## OAuth1

Specifies OAuth 1.0 specific details of the API used by the component. For more
details about Authenticating with OAuth 1.0 refer to the
[OAuth 1.0 specification](http://oauth.net/core/1.0/) standard.

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| `consumer_key` | `string` | Yes     | The Consumer Key |
| `consumer_secret` | `string` | Yes  | The Consumer Secret |
| `request_token_uri` | `string` | Yes | URI to obtain a Request Token |
| `auth_uri` | `string` | Yes | URI to obtain User Authorization |
| `access_token_uri` | `string` |Yes | URI to obtain an Access Token |

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
The `fields` object defines the type of input field and the `oauth1` object provides
the configuration.

## OAuth2

Specifies OAuth 2.0 specific details of the API used by the component. For more
details about Authenticating with OAuth 2.0 please read the
[OAuth 2.0 specification](http://tools.ietf.org/html/rfc6749).

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| `client_id`   | `string` | Yes      | The Consumer Key |
| `client_secret` | `string` | Yes      | The Consumer Secret |
| `auth_uri`    | `string`   | Yes | URI to obtain User Authorization |
| `token_uri`   | `string`   | Yes | URI to obtain a Access Token |
| `scopes`      | `array` of `strings` |   No | Scope of the access request |
| `prompt`      | `string` | No |  |
| `access_type` | `string`| No |  |

Here is an example of `OAuth2` implementation in [Google Spreadsheets](https://github.com/elasticio/gspreadsheets/blob/master/component.json#L18) component:

```json
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
```

In some cases `OAuth2` needs to receive some external parameters for accessing
say production or sandbox environments. This kind of solution is implemented in
the [Salesforce component](https://github.com/elasticio/salesforce-component/blob/master/component.json#L16):

```json
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
      "client_id":"{{SALESFORCE_KEY}}",
      "client_secret":"{{SALESFORCE_SECRET}}",
      "auth_uri":"https://{{prodEnv}}.salesforce.com/services/oauth2/authorize",
      "token_uri":"https://{{prodEnv}}.salesforce.com/services/oauth2/token"
      }
}
```

`auth_url` can take additional parameters like this:

```json
"oauth2": {
   "auth_uri": "https://login.windows.net/common/oauth2/authorize?resource={{encode resource}}",
   "token_uri": "https://login.windows.net/common/oauth2/token"
}
```

# Triggers Object
Navigate to: | [Root Object](#root-object) | [envVars Object](#envvars-object) | [Credentials Object](#credentials-object) | Triggers Object | [Actions Object](#actions-object) |

---------

The **Triggers Object** is Used to expose component's triggers. The properties of this
object are used as unique trigger names.

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| `title`       | `string` | Yes      | Human readable title of the trigger |
| `main`        | `string` | Yes      | Relative path to a Node.js module or a fully qualified name or a Java class |
| `metadata`    | `object` | Yes      | Contains a single `out` property whose value is a JSON Schema describing the metadata of the message's body produced by the trigger |
| `type`        | `string` | No       | It can have only 2 values `polling` or `webhook`. If the `type` is omitted then it is considered to be a WebHook trigger and it will wait for the messages to arrive. Otherwise, it needs to be specifically written as a `polling` for it to be scheduled for an execution. |
| `fields`      | `object` | No       | Trigger specific input fields used to provide configuration for the trigger |


Here is an example of a trigger definition in the `component.json` where the
`type` is included and specified as `polling`:

```json
"queryTrigger": {
  "title": "SOQL Query",
  "main": "./lib/triggers/query.js",
  "type":"polling",
  "metadata": {
      "out": {}
    },
   "fields": {
        "query": {
             "label": "SOQL Query",
              "required": true,
              "viewClass": "TextAreaView"
          }
      }
 }
 ```

# Actions Object
Navigate to: | [Root Object](#root-object) | [envVars Object](#envvars-object) | [Credentials Object](#credentials-object) | [Triggers Object](#triggers-object) | Actions Object |

---------

The **Actions Object** is used to expose component's actions. The properties of
this object are used as unique action names.

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| `title`       | `string` | Yes      | Human readable title of the action |
| `main`        | `string` | Yes      | Relative path to a Node.js module or a fully qualified name of a Java class |
| `metadata`    | `object` | Yes      | Can contain two properties `in` and `out` whose values are JSON Schemas describing the metadata of the message's body consumed and produced by the action. The `in` metadata define the input data required by the action. These metadata are rendered as input fields in user interface durring the mapping. The `out` metadata define the out data produced by the action. |
| `fields`      | `object` | No       | Action specific input fields used to provide configuration for the action |

Here is an example of action object implementation in the `component.json`:

```json
"queryAction": {
  "title": "Query",
  "main": "./lib/actions/query.js",
  "metadata": {
    "in": {
       "type": "object",
      "properties": {
           "query": {
              "maxLength": "20000",
                 "title": "SOQL Query",
                 "type": "string",
                 "required": "true"
                }
          }
      },
   "out": {}
 }
}
```
