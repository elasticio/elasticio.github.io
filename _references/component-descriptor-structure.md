---
title: Component Descriptor Structure
layout: article
section: Component Descriptor
order: 0
category: component descriptor
---

Each integration component developed for {{site.data.tenant.name}} platform must
have a **component descriptor** file called `component.json` in its root folder,
as shown below. It describes the component structure and tells the platform what functions
are available, what credentials are necessary to run your component on
the {{site.data.tenant.name}} platform, etc.

````
├── component.json                                          (1)
├── lib
│   ├── actions
│   ├── schemas
│   └── triggers
├── logo.png
├── package.json
└── verifyCredentials.js
````

The example above shows the structure of a Node.js component. The components
written in Java programming language have a different structure but the location
of the component descriptor is the same: it must be located in the
root folder of the component (1). You are welcome to read our introductory
guides about building components in [Java](/developer-guide/building-java-component)
or [Node.js](/developer-guide/building-nodejs-component) for the
{{site.data.tenant.name}} platform. Here we will concentrate on
providing an in-depth reference about the structure and the objects which you can
use to describe different parts of any component.

## Descriptor Structure

Let's explore the structure of the `component.json` in the following table.
As you can see there are simple properties such as `title` and nested objects
such as `credentials`. You can follow the links to see details about of the
nested objects.

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| title       | `string` | Yes      | Component's title to be displayed in the UI |
| description | `string` | Yes      | Component's description to be displayed in the UI  |
| [envVars](#envvars-object) | `object` |  | Used to declare environment variables |
| [credentials](#credentials-object) | `object` |  | Used to specify the details about the authentication with the given API |
| [triggers](#triggers-object) | `object` | Yes | Used to expose component's triggers |
| [actions](#actions-object) | `object` | Yes | Used to expose component's actions |
| [fields](#fields-object) | `object` | | A nested object which is used to collect input from a user that is required for a component to work properly |

Let's explore an example of a component descriptor:

```json
{
  "title": "Title of the component",
  "description": "The description of the component",
  "envVars": { },
  "credentials": { },
  "triggers": { },
  "actions": { }
}
```
As we have presented the information in the table above, only `title` and
`description` are required properties here.

> **Note** You must declare at least one function, either in `triggers` or
> `actions` for the component to function properly.

## envVars Object

The **envVars object** is used to define the environment variables to be used
for component configuration. Every environment variable defined in the `component.json`
file must have the following properties:

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| required    | `boolean`|  | Specifies whether setting the environmental variable is required for the component to operate properly. If not present then the value is set to `false` by default. |
| description | `string` |  | Description of the environment variable |

The environment variable naming follows a standard UNIX/Linux Shell variable
definitions. As a guidance, variable name must begin with an alphanumeric or alpha
character, followed by one or more alphanumeric or underscore (`_`) characters.
Avoid using reserved words like (`if`, `else`, `elif`, `do`, `done` ...). Here is
an example of `envVars` object implemented in the [Salesforce Component](https://github.com/elasticio/salesforce-component/blob/master/component.json):

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

## Credentials Object

The **Credentials Object** specifies how a user can grant a component the access
to his protected resources using API. This is accomplished by defining fields
used to gather authentication related data from the user.

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| [fields](#fields-object)      | `object` | Yes | Object used to define input fields to gather authentication related data from the user. The keys of this object define field names, which must be unique. The values are definitions of the fields. |
| [oauth1](#oauth1) | `object` |  | Specifies the details about OAuth v1.0 resources. Only used if a `OAuthFieldView` field is defined. |
| [oauth2](#oauth2) | `object` |  | Specifies the details about OAuth v2.0 resources. Only used if a `OAuthFieldView` field is defined. |

Let's explore an example from the [Petstore API (Node.js)](https://github.com/elasticio/petstore-component-nodejs/blob/master/component.json)
component. The client authenticated with the Petstore API using an API key
which is sent via an HTTP header. That's why it is sufficient to define in
the `credentials` object a single field to gather the API key from the user,
as shown below.

```json
"credentials": {
    "fields": {
      "apiKey": {
        "label": "API key",
        "required": true,
        "viewClass": "TextFieldView",
        "note": "Please use <b>{{site.data.tenant.petStoreApiKey}}</b> as API key"
      }
    }
  }
```

In the example above the `apiKey` field is used to gather user's API key.

The view of the field is defined as `TextFieldView` which tells the platform
to present it in the UI as a simple input field where a user must enter his API key.
Please read more details on field types [here](#fields-object).

The value of this field will be provided to the component at the runtime.

## OAuth1

Specifies OAuth 1.0 specific details of the API used by the component. For more
details about Authenticating with OAuth 1.0 refer to the
[OAuth 1.0 specification](http://oauth.net/core/1.0/) standard.

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| consumer_key | `string` | Yes     | The Consumer Key |
| consumer_secret | `string` | Yes  | The Consumer Secret |
| request_token_uri | `string` | Yes | URI to obtain a Request Token |
| auth_uri | `string` | Yes | URI to obtain User Authorization |
| access_token_uri | `string` |Yes | URI to obtain an Access Token |

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
the configuration. Please note that the `viewClass` property of the field must be
set to `OAuthFieldView`.

## OAuth2

Specifies OAuth 2.0 specific details of the API used by the component. For more
details about Authenticating with OAuth 2.0 please read the
[OAuth 2.0 specification](http://tools.ietf.org/html/rfc6749).

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| client_id   | `string` | Yes      | The Consumer Key |
| client_secret | `string` | Yes      | The Consumer Secret |
| auth_uri    | `string`   | Yes | URI to obtain User Authorization |
| token_uri   | `string`   | Yes | URI to obtain a Access Token |
| scopes      | `array` of `strings` |   No | Scopes of the access request |

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

Please note that the properties `access_type` and `prompt` above are specific to Google. They are not defined in the OAuth2 specification.

Sometimes you will need to access values in the `oauth2` properties you
gathered from the user using fields, as for example is done in the [Salesforce component](https://github.com/elasticio/salesforce-component/blob/master/component.json).
The following example demonstrates how to accomplish that.

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
      "client_id":"SALESFORCE_KEY",
      "client_secret":"SALESFORCE_SECRET",
      "auth_uri":"https://prodEnv.salesforce.com/services/oauth2/authorize",
      "token_uri":"https://prodEnv.salesforce.com/services/oauth2/token"
   }
}
```

In the example above the value of the `prodEnv` field is used to define the `auth_uri` and `token_uri` properties.

The `auth_url` property can take additional query parameters as shown below:

```json
"oauth2": {
   "auth_uri": "https://login.windows.net/common/oauth2/authorize?resource=RESOURCSE",
   "token_uri": "https://login.windows.net/common/oauth2/token"
}
```

## Triggers Object

The **Triggers Object** is used to expose component's triggers. The properties of this
object are used as unique trigger names.

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| title | `string` | Yes | Human readable title of the trigger |
| main | `string` | Yes | Relative path to a Node.js module or a fully qualified name of a Java class |
| metadata | `object` | Yes | Contains a single `out` property whose value is a JSON Schema describing the metadata of the message's body produced by the trigger |
| type | `string` | No  | It can have only 2 values `polling` or `webhook`. If the `type` is omitted then it is considered to be a Webhook trigger and it will wait for the messages to arrive. Otherwise, it needs to be specifically written as a `polling` for it to be scheduled for an execution. |
| [fields](#fields-object) | `object` | No | Trigger specific input fields used to provide configuration for the trigger |


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

## Actions Object

The **Actions Object** is used to expose component's actions. The properties of
this object are used as unique action names.

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| title       | `string` | Yes      | Human readable title of the action |
| main        | `string` | Yes      | Relative path to a Node.js module or a fully qualified name of a Java class |
| metadata    | `object` | Yes      | Can contain two properties `in` and `out` whose values are JSON Schemas describing the metadata of the message's body consumed and produced by the action. The `in` metadata define the input data required by the action. These metadata are rendered as input fields in user interface during the mapping. The `out` metadata define the out data produced by the action. |
| [fields](#fields-object)      | `object` | No       | Action specific input fields used to provide configuration for the action |

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

## Fields Object

The **Fields Object** specifies how to render an input field used to collect the
input from a user that is required for a component to work properly.

For example, fields object is used for providing credentials to authenticate with
the given API or to configure a trigger/action with some parameters:

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| label	      | `string` |  Yes	    | Label for the input field |
| viewClass	  | `string` |  Yes	    | Specifies how to render an input field |
| required	  | `boolean`|          | Specifies whether a value for this input is required or not. If not present then the value is false by default |
| model	      | `object` or `string` |      | Used only with `SelectView` to define the available options for selection. If the value is of type object, the property name of this JSON object are used as option keys and the values as option labels. Instead of defining a JSON object it is possible to use a name of a function exposed by a component that returns such a JSON object.|
| prompt      |	`string` |           | Used only with `SelectView` or `SelectPropertyView` when no option is selected |
| prefix      | `string` |           | Used with `TextFieldView` or `TextFieldWithNoteView` to display a prefix for an input field. |
| suffix      | `string` |           | Used with `TextFieldView` or `TextFieldWithNoteView` to display a suffix for an input field. |
| require	    | `string` |           | Specifies an arrays of field names that this field depends on and requires to valid.|
| placeholder	| `string` |           | Used to pre-fill descriptive text on an HTML form.|

Any object implementation is directly connected with one or several `View Class`
definitions, therefore it is [advisable to check them as well](view-classes).
