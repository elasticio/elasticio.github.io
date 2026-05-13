---
title: Code component
layout: component
section: Utility components
description: A component to run a piece of JavaScript code inside the integration.
icon: code.png
icontext: Code component
category: code
updatedDate: 2026-05-13
ComponentVersion: 1.2.16
---

## Description

A code component for the platform, runs a piece of a JavaScript code inside your
integration flow.

## How it Works

Pretty much the same way that you would use any other component in our system.
It is deployed by default to production, so no need to deploy it yourself
(although you could if you have extended it yourself). In our Dashboard start
building your integration and include the Code component as well.

![Node.js interface](img/code-input.png)

However, don't let the simple look fool you - it has a full-fledged interface
with useful features like the ones you would expect from your
favourite desktop developing tool:

*   Syntax highlighting - a standard for any online real-time coding interface
*   Code auto-completion - again a standard that you got used to from your desktop tool
*   Support for number of variables and libraries within the context of the execution
*   Support latest ECMAScript standard
*   Run and troubleshoot within the designer interface.

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Code component like [changelog](/components/code/technical-notes#changelog).

## Available Variables and Libraries

Here are the available variables and libraries that you can use within the context
of execution. The most up-to-date list can always be found in be used within the context of execution or in `code.js` of the component. Below is a sample for the reference.
Built-in Node.js global objects are also supported.

### Platform Specific Functionality

- `msg` - incoming message containing the payload from the previous step
- `cfg` - step's configuration. At the moment contains only one property: `code` (the code, being executed)
- `snapshot` - step's snapshot
- `messages` - utility for convenient message creation
- `emitter` user to emit messages and errors

### Other Libraries/functions

- `wait(numberOfMilliscondsToSleep)` - Utility function for sleeping
- [`request`](https://github.com/request/request) - Http Client (wrapped in `co` - [this library](https://www.npmjs.com/package/co-request) so that it is pre-promisified)
- `_` - [Lodash](https://lodash.com/)
- `strong-soap` - [SOAP client](https://github.com/loopbackio/strong-soap) for invoking web services
- [`nodemailer`](https://nodemailer.com/) - Library for sending emails from Node.js ([Example](#sending-an-email-with-nodemailer))

## Code component usage Example

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

> **Please note:** If you have a simple one-in-one-out function you can return a
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
const axios = require('axios');
async function run(msg) {
  const { data: res } = await axios.get('{{site.data.tenant.apiBaseUri}}/v2/users/me', {
    auth: {
      username: process.env.ELASTICIO_API_USERNAME,
      password: process.env.ELASTICIO_API_KEY
    }
  });

  return {
    fullName: `${res.data.attributes.first_name} ${res.data.attributes.last_name}`,
    email: res.data.attributes.email,
    userID: res.data.id
  };
}
```

### Calling a SOAP web service with strong-soap

The Code component exposes the [`strong-soap`](https://github.com/loopbackio/strong-soap) client as `soap`. You can call SOAP operations using async/await. Create the client with a small promise wrapper, then invoke methods (they return promises).

**Basic SOAP call (WSDL URL and operation args from incoming message):**

```javascript
function createSoapClient(wsdlUrl, options = {}) {
  return new Promise((resolve, reject) => {
    soap.createClient(wsdlUrl, options, (err, client) => {
      if (err) reject(err);
      else resolve(client);
    });
  });
}

async function run(msg, cfg, snapshot) {
  const { wsdlUrl, operation, args } = msg.body;
  const client = await createSoapClient(wsdlUrl);
  const { result } = await client[operation](args || {});
  await this.emit('data', { body: result });
}
```

**Calling a specific service and port:**

If the WSDL defines multiple services or ports, use the `ServiceName.PortName.MethodName` form (use the same `createSoapClient` helper as in the examples above):

```javascript
async function run(msg, cfg, snapshot) {
  const client = await createSoapClient(msg.body.wsdlUrl);
  const { result } = await client.MyService.MyPort.MyFunction({ name: msg.body.inputName });
  await this.emit('data', { body: result });
}
```

### Sending an email with nodemailer

The Code component includes [`nodemailer`](https://nodemailer.com/) for sending emails. Here is an example of how to use it:

```javascript
async function run(msg, cfg, snapshot) {
  this.logger.info('Verifying nodemailer support...');
  
  // 1. Check if the library is available in the context
  if (typeof nodemailer === 'undefined') {
    throw new Error('nodemailer library was not found in the execution context');
  }
  // 2. Create a test transporter using Ethereal (safe for testing)
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  // 3. Attempt to send a test email
  const info = await transporter.sendMail({
    from: '"Tester" <test@elastic.io>',
    to: "bar@example.com",
    subject: "Nodemailer Test from elastic.io ✔",
    text: "Nodemailer is correctly installed and accessible!",
    html: "<b>Nodemailer is correctly installed and accessible!</b>",
    attachments: [
      {
        filename: 'test.txt',
        content: 'Hello world!'
      }
    ]
  });
  this.logger.info("Email sent successfully! Message ID: %s", info.messageId);
  const previewUrl = nodemailer.getTestMessageUrl(info);
  this.logger.info("You can view the test email at: %s", previewUrl);
  await this.emit('data', { body: {
    status: 'Nodemailer is working', 
    messageId: info.messageId, 
    previewUrl 
  }});
}
```

## Known issues and limitations

-   Credentials are not supported, please see [Code component with Credentials](/components/code-with-credentials/).
