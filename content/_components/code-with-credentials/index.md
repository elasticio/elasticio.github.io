---
title: Code component with Credentials
layout: component
section: Utility components
description: The component is derived from the code-component v1.2.11 with Credentials feature.
icon: code-with-credentials.png
icontext: Code component with Credentials
category: code
updatedDate: 2025-09-26
ComponentVersion: 1.0.1
---

## Table of Contents

* [Description](#description)
* [Available Variables and Libraries](#available-variables-and-libraries)
  * [Platform Specific Functionality](#platform-specific-functionality)
  * [Available Libraries/functions](#available-librariesfunctions)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Executes custom code](#executes-custom-code-action)
* [Triggers](#triggers)
  * [Executes custom code](#executes-custom-code-trigger)
* [Code component usage Examples](#code-component-usage-examples)

## Description

The code component is derived from the [Code-component](/components/code/) `v1.2.11`. The difference is that an authorization mechanism has been added. Refer to the [Credentials](#credentials) for more details.

The code component is a powerful feature of the platform that allows you to run a piece of JavaScript code within your integration flow. It functions just like any other component in our system. 

The code component is automatically deployed to production, so there is no need to deploy it yourself (although you can if you have extended it). When building your integration in our Dashboard, simply include the Code component. You will see a similar picture to the one below:

{% include img.html max-width="100%" url="img/code-component-example.png" title="Code component Example" %}

However, don't be fooled by its simple appearance - it has a full-fledged interface with many useful features, just like your favorite desktop development tool:

- Syntax highlighting - a standard feature for any online real-time coding interface.
- Code auto-completion - another standard feature that you are familiar with from desktop tools.
- Support for a variety of variables and libraries within the execution context.
- Compatibility with the latest ECMAScript standard.
- Ability to run and troubleshoot within the designer interface.

## Available Variables and Libraries:

The code component provides access to the following variables and libraries within the execution context. The most up-to-date list can always be found in the `code.js` file of the component. Below is a sample for reference. Built-in Node.js global objects are also supported.

### Platform Specific Functionality:

`msg` - Incoming message containing the payload from the previous step.
  - `cfg` - Step configuration, which currently includes the following properties:
    - `code` (the code being executed).
    - `secretId` - The ID of the secret being used by the credentials.
    - `credentials` - The credentials section. Depending on the selected credentials type, it contains a set of credential fields.
  - `snapshot` - Step snapshot.
  - `messages` - Utility for convenient message creation.
  - `emitter` - Used to emit messages and errors.
  
### Available Libraries/functions:
- `wait(numberOfMilliscondsToSleep)` - Utility function for sleeping.
- [`axios`](https://github.com/axios/axios) - A well-known HTTP Client [Documentation](https://www.npmjs.com/package/axios).
- [`request`](https://github.com/request/request) - HTTP Client (wrapped in `co` - [this library](https://www.npmjs.com/package/co-request) so that it is pre-promisified). We recommend using `axios`. Support for `request` is maintained for backward compatibility only.
* `_` - [Lodash](https://lodash.com/)

## Credentials

Please note that the code component can solve a wide variety of tasks, ranging from basic data transformations to complex external API calls. Normally, you won't need any credentials working with the component. However, if you don't need any credentials, you can simply create and save the `No Auth` credentials.

We have introduced credentials of the same type that are used in the REST API component since using them for plain REST API calls is the most common use case across our platform. However, it doesn't mean that you can only use these credentials for REST API calls. Feel free to use them as needed if they fit your requirements.

Code component supports 4 authorization types:

- **No Auth** - Use this method if you don't need any credentials or if you want to work with any open REST API.
- **Basic Auth** - Use this method to provide login credentials such as username/password.
- **API Key Auth** - Use this method to provide an API Key to access a resource.
- **OAuth2** - Use this method to provide OAuth2 credentials to access a resource. Currently, the only implemented OAuth2 flow is the Authorization code flow.

**Credentials always verifies successfully**. The component is not any system-agnostic. This is why we can't do any meaningful verification.

To create `OAuth2` credential you have to choose Auth-client or create the new one. It must contain `Name`, `Client ID`, `Client Secret`, `Authorization Endpoint` and `Token Endpoint`.

{% include img.html max-width="50%" url="img/auth-client.png" title="Auth Client" %}

*The example above shows how to add a new Auth-client to access the API.*

To give you a better idea of how to use the different auth types:

1. **No Auth** - No special usage is required.
2. **Basic auth** - You can find the `username/password` fields within the `cfg.credentials` object:
    ```javascript
    const { username } = cfg.credentials;
    const { password } = cfg.credentials;
    ```
3. **API Key Auth** - You can find the `headerName/headerValue` fields within the `cfg.credentials` object:
  ```javascript
  const { headerName } = cfg.credentials;
  const { headerValue } = cfg.credentials;
  ```
4. **OAuth2** - All the available fields are within the `cfg.credentials` object. For Salesforce OAuth credentials, it would look like this:
  ```json
  {
    ...
    "credentials": {
      "access_token": "00DE0000000dwKc...25beUAzsBb6L4yTQUWwRf",
      "refresh_token": "5Aep861rEpScxnNE66jGO...LPWsLPojH6C3hT.8L_",
      "expires_in": 3600,
      "undefined_params": {
        "signature": "ehhgLZp7T...UrmmEE=",
        "instance_url": "https://de0007100dwkcmai-dev-ed.my.salesforce.com",
        "id": "https://login.salesforce.com/id/00DE0000917dwKcMAI/032481200092zqdAAA",
        "issued_at": "1706879649168"
      }
    }
  }
```

Please note that using the OAuth2 mechanism can be tricky due to its nature. If you need to use an OAuth2 mechanism for REST API calls, consider using our REST API component instead. It handles all the routines such as refreshing tokens and retries. Please refer to the following documentation for more information on how to use it: [Secrets Guide](/guides/secrets)

Refer to the [Code component usage examples](#code-component-usage-examples) to find more examples of how to use each of the available credential types.

## Actions

### Executes Custom Code Action

This action simply runs a piece of JavaScript code. 
It is a very simple yet powerful action. 
Please refer to the [Description](#description) for a full overview of the action's capabilities, as they are common for both the action and the trigger.

#### Input Metadata

No input metadata

#### Output Metadata

No output metadata

## Triggers

### Executes Custom Code Trigger

This trigger simply runs a piece of JavaScript code. 
It is a very simple yet powerful trigger. 
Please refer to the [Description](#description) for a full overview of the trigger's capabilities, as they are common for both the action and the trigger.

#### Input Metadata

No input metadata

#### Output Metadata

No output metadata

## Code component usage examples

Use code is very simple. Just follow these steps:

```javascript
async function run(msg, cfg, snapshot) {
  this.logger.info('Incoming message is %s', JSON.stringify(msg));
  const body = { result : 'Hello world!' };
  // You can emit as many data messages as required
  await this.emit('data', { body });
  this.logger.info('Execution finished');
}
```

Please note that if you have a simple one-in-one-out function, you can simply return a JSON object as the result of your function, and it will be automatically emitted as data.

## Common usage scenarios

### Doing complex data transformation

While [JSONata](http://jsonata.org/) is a great tool, sometimes it's easier to perform tasks in JavaScript. 
If you want to transform an incoming message with code, you can use the following example:

```javascript
async function run(msg, cfg, snapshot) {
  return {
      addition: 'You can use code',
      keys: Object.keys(msg)    
  };
}
```

### Calling an external REST API

It's very simple to code a small REST API call out of the Code component, see following example:

```javascript
async function run(msg, cfg, snapshot) {
  const username = process.env.ELASTICIO_API_USERNAME;
  const password = process.env.ELASTICIO_API_KEY;
  const url = 'https://api.elastic.io/v2/users/me';
  const { data } = await axios.get(url,
    {
      auth: {
        username,
        password
      }
    }
  );
  await this.emit('data', { body: data });
}
```