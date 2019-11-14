---
title: Code component
layout: component
section: Utility components
description: A component to run a pice of JavaScript code inside the integration.
icon: code.png
icontext: Code component
category: Code component
createdDate: 2015-09-25
updatedDate: 2019-11-13
---

## Description

A code component for the platform, runs a piece of a JavaScript code inside your
integration flow.

## How Works

Pretty much the same way that you would use any other component in our system.
It is deployed by default to production, so no need to deploy it yourself
(although you could if you have extended it yourself). In our Dashboard start
building your integration and include the Code component as well.

![Node.js interface](https://user-images.githubusercontent.com/2523461/68778086-f3678280-0632-11ea-9e9c-d2a888fd5788.png)

However, don't let the simple look fool you - it has a full-fledged interface
with useful features like the ones you would expect from your
favourite desktop developing tool:

*   Syntax highlighting - a standard for any online real-time coding interface
*   Code auto-completion - again a standard that you got used to from your desktop tool
*   Support for number of variables and libraries within the context of the execution
*   Support latest ECMAScript standard
*   Run and troubleshoot within the designer interface.

## Available Variables and Libraries

Here are the available variables and libraries that you can use within the context
of execution. The most up-to-date list is found within the context of execution.
The most up-to-date list can always be found in code.js of the component. Below
is a sample for the reference:

-   `console` - more on [Node.js console](https://nodejs.org/dist/latest-v5.x/docs/api/console.html)
-   `process` - current Node.js process
-   `require` - module require
-   `setTimeout` - more on [setTimeout](https://nodejs.org/dist/latest-v5.x/docs/api/timers.html)
-   `clearTimeout` - more on [clearTimeout](https://nodejs.org/dist/latest-v5.x/docs/api/timers.html)
-   `setInterval` - more on setInterval
-   `clearInterval` - more on clearInterval
-   `msg` - incoming message containing the payload from the previous step
-   `cfg` - step's configuration. At the moment contains one property: `code` (the executed code)
-   `snapshot` - step's snapshot
-   `exports` - a plain object `{}`
-   `messages` - utility for convenient message creation
-   `request` - Http Client (wrapped in `co` - [this library](https://www.npmjs.com/package/co-request))
-   `wait` - wait
-   `emitter` user to emit messages and errors

## Code component usage Examples

To use the code you can follow these examples:


```javascript
async function run(msg) {
  console.log('Incoming message is %s', JSON.stringify(msg));
  const body = { result : 'Hello world!' };
  // You can emit as many data messages as required
  await this.emit('data', { body });
  console.log('Execution finished');
}
```

```javascript
async function run(msg, cfg, snapshot) {
  return {
      addition: 'You can use code',
      keys: Object.keys(msg)
  };
}
```

> **Please note:** if you have a simple one-in-one-out function you can return a
> JSON object as a result of your function, it will be automatically emitted as data.

## Common usage scenarios

### Doing complex data transformation

If you prefer to transform an incoming message with code then use following sample:

```javascript
async function run(msg) => {
  addition : "You can use code",
  keys : Object.keys(msg)
}
```

### Calling an external REST API

You can code a small REST API call out of the Code component, see
following example:

```javascript
async function run(msg) {
  const res = await request.get({
    uri: '{{site.data.tenant.apiBaseUri}}/v2/users',
    auth: {
      user: process.env.ELASTICIO_API_USERNAME,
      pass: process.env.ELASTICIO_API_KEY
    },
    json: true
  });
  return {
    fullName: res.body.first_name + " " + res.body.last_name,
    email: res.body.email,
    userID: res.body.id
  }
}
```

## Known issues and limitations

-   Credentials are not supported
