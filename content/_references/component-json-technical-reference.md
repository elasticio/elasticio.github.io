---
title: component.json Technical Reference - Overview
description: This technical reference describes the structure of the component.json manifest file/component descriptor file
layout: article
section: Component Descriptor
order: 1
category: component descriptor
---

{{site.data.tenant.name}} components are code libraries that are accompanied by a manifest file/**component descriptor** file which contains metadata about the component.  The metadata in this file includes:
* the name and description of the component
* information about the actions and triggers of the component including
  * the location of the action/trigger code
  * name & description of the action/trigger
  * the fields that must be configured to use the action/trigger
  * the inputs and outputs of the action/trigger

## component.json Structure
This metadata is stored in a [JSON](https://tools.ietf.org/html/rfc7159) file which must be named `component.json` and must sit in the root folder of the component. 
The file needs to be valid JSON.  It should be a single JSON object with the following fields:

| Property Name | Description |
| :------------ | :---------- |
| [title](#title)       | Component's title to be displayed in the UI |
| [description](#description) | Component's description to be displayed in the UI  |
| [buildType](#buildtype) | Determines how the component should be built and run on the platform |
| [deprecated](#deprecated) | Used to flag the component as deprecated |
| [credentials](component-json-technical-reference-credentials.html) | Used to expose the fields needed to connect to and authenticate against a system  |
| [actions](component-json-technical-reference-actions-triggers.html) | Used to expose component's actions |
| [triggers](#triggers-object) | Used to expose component's triggers |
| [envVars](#envvars-object) | Used to declare environment variables |

> **Note** All components must implement at least one action or at least one trigger. 

## `title`
Component's title to be displayed in the UI
![Example Title in the UI](/assets/img/references/component.json/title.png)

**Type:** string

**Example:** `Salesforce`

## `description`
Component's description to be displayed in the UI
![Example Description in the UI](/assets/img/references/component.json/description.png)

**Type:** string

**Example:** `Customer relationship management (CRM) software & cloud computing from the leader in CRM solutions for businesses large & small.`

## `buildType`
Determines how the component should be built and run on the platform

- Setting the value to `docker` will cause the platform to build a docker image based on the pushed code.  This docker image will be run when the component is invoked. The build will be longer but the component will start faster and more reliably.  This is the recommended option.
- Setting the value to `slug` or otherwise omitting it will cause the platform to build a `.tar.gz` slug file. This file will be downloaded and extracted by a generic docker image when the component is run.  The build will be quicker but each component execution will take longer. Some older components may encounter compatiblity problems when they are built with `docker`  mode.  Otherwise, `docker` mode is encouraged.

**Type:** string enum of `docker` or `slug`

**Example:** `docker`

**Default Value:** `slug`

## `deprecated`
Used to signal that this action/trigger should not be used in new flows and that existing flows should migrate to a different action/trigger.

![Example of Action/Trigger Deprecation in the UI](/assets/img/references/component.json/deprecated-component.png)

**Type:** boolean

**Default Value:** `false`

## `credentials` Object
This identifies the information that the platform needs to collect from the integrator in order to be able to connect to their instance/account.  Information that is collected in this section typically include:
* URL to the integrator's instance (if there is not a shared cloud url)
* Username or other account identifier
* Password or other API keys/tokens required to authenticate

> **Note:** [See what happens when the credentials object is omitted](component-json-technical-reference-credentials.html#omitting-credentials)

[See the dedicated article on the credentials object for more information.](component-json-technical-reference-credentials.html)

## `actions` Object

The `actions` object describes the actions that exist within the component. 

Actions are operations exposed to the flow builder that can be placed in any step except the first step.  

If the component has no actions, then the component.json file should not have an actions field.

[See the dedicated article on the action object for more information.](component-json-technical-reference-actions-triggers.html)

## envVars Object

The **envVars object** defines the environment variables for the component
configuration. Every environment variable defined in the `component.json`
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
{
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
}
```



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

Please note that the properties `access_type` and `prompt` above are specific to Google. They are not defined in the OAuth2 specification.

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
{
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


## JSONSchema References

You can use [JSONSchema references](https://json-schema.org) in Component metadata. Basically, it allows you to avoid repetitive coding by referencing certain keys called definitions. Let's take Email Component as an example. Here you can see three address fields `To`, `Cc` and `Bcc`:

```json
{
  "actions": {
    "send": {
      "main": "./send.js",
      "title": "Send Mail",
      "metadata": {
        "in": {
          "type": "object",
          "properties": {
            "to": {
              "title": "To",
              "type": "string",
              "required": true
            },
            "cc": {
              "title": "Cc",
              "type": "string",
              "required": false
            },
            "bcc": {
              "title": "Bcc",
              "type": "string",
              "required": false
            }
          }
        }
      }
    }
  }
}
```

The thing about them is that they are basically the same element. So what you can do is add a definition for address fields, and just refer to it every time you need one. Here is how it will look like:

```json
{
  "definitions": {
    "addressfields": {
      "type": "object",
      "properties": {
        "To":           { "type": "string" },
        "Cc":           { "type": "string" },
        "Bcc":          { "type": "string" }
      },
      "required": ["To"]
    }
  }
}
```

When you need to refer to this definition from elsewhere using the `$ref` keyword:

`{ "$ref": "#/definitions/addressfields" }`

So if we go back to our initial Email Component, with a set reference it will look like this:

```json
{
  "actions": {
    "send": {
      "main": "./send.js",
      "title": "Send Mail",
      "metadata": {
        "in": {
          "type": "object",
          "properties": {
            "$ref": "#/definitions/addressfields"
          }
        }
      }
    }
  }
}
```

>**IMPORTANT:** We do not support referencing by `$id` and referencing external schemas at the moment.

## Related links

- [Building a component in Java](/guides/building-java-component)
- [Building a component in Node.js](/guides/building-nodejs-component)
- [OAuth 1.0 specification](http://oauth.net/core/1.0/)
- [OAuth 2.0 specification](http://tools.ietf.org/html/rfc6749)
- [View Classes](view-classes)
- [JSONSchema references](https://json-schema.org)
