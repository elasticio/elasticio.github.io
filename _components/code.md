---
title: Code component
layout: article
section: Utility Components
---
---
## Description

A code component for the platform, runs a piece of a JavaScript code inside your
integration flow.

## How Works

Pretty much the same way that you would use any other component in our system.
It is deployed by default to production, so no need to deploy it yourself
(although you could if you have extended it yourself). In our Dashboard start
building your integration and include the Code component as well. You will see a
picture similar to the one below:

![image](https://user-images.githubusercontent.com/56208/52571227-71cd9480-2e15-11e9-9c62-17e5085d7ada.png)

However, don't let the simple look fool you - it has a full-fledged interface
with many very useful features like the ones you would expect from your
favourite desktop developing tool:

*   Syntax highlighting - a standard for any online real-time coding interface
*   Code auto-completion - again a standard that you got used to from your desktop tool
*   Support for number of variables and libraries within the context of the execution
*   Support latest ECMAScript standard
*   Run and troubleshoot within the designer interface.

## Available Variables and Libraries

Here are the available variables and libraries that can be used within the context of execution. The most up-to-date list
can always be found in be used within the context of execution. The most up-to-date list can always be found in code.js
of the component. Below is a sample for the reference:

-   `console`: - more on [Node.js console](https://nodejs.org/dist/latest-v5.x/docs/api/console.html),
-   `process`: - Current Node.js process,
-   `require`: - Module require,
-   `setTimeout`: - more on [setTimeout](https://nodejs.org/dist/latest-v5.x/docs/api/timers.html),
-   `clearTimeout`: - more on [clearTimeout](https://nodejs.org/dist/latest-v5.x/docs/api/timers.html),
-   `setInterval`: - more on [setInterval](https://nodejs.org/dist/latest-v5.x/docs/api/timers.html),
-   `clearInterval`: - more on [clearInterval](https://nodejs.org/dist/latest-v5.x/docs/api/timers.html),
-   `msg`: - Incoming message containing the payload from the previous step,
-   `exports`: {},
-   `messages`: - Utility for convenient message creation,
-   `request`: - Http Client (wrapped in `co` - [this library](https://www.npmjs.com/package/co-request)),
-   `wait`: - wait,
-   `emitter`: user to emit messages and errors

## Code component usage Examples

Use code is very simple, just do following:

```javascript
async function run(msg) {
  console.log('Incoming message is %s', JSON.stringify(msg));
  const body = { result : 'Hello world!' };
  // You can emit as many data messages as required
  await this.emit('data', { body });
  console.log('Execution finished');
}
```
transform
Please note if you have a simple one-in-one-out function you can simply return a
JSON object as a result of your function, it will be automatically emitted as data.

## Common usage scenarios

### Doing complex data transformation

[JSONata](http://jsonata.org/) is great however sometimes it's easier to do
things in JavaScript, if you want to transform an incoming message with code,
just use following sample:

```javascript
async function run(msg) => {
  addition : "You can use code",
  keys : Object.keys(msg)
}
```

### Calling an external REST API

It's very simple to code a small REST API call out of the Code component, see
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

-   Snapshots are not supported
-   Credentials are not supported
-   No `async` is supported
