---
title: Code component
layout: article
section: Utility Components
---

## Description

{{site.data.tenant.name}} Code component executes a piece of code. It is available
as an essential utility in our platform.

### Purpose

To execute a custom code (only `Node.js`, see the [known limitations for more](#known-limitations))
without developing a full fledged component. The code is immediately executed
during the normal execution of the component and the results are immediately
available as an output data from the component.

### How works.  API version / SDK version

Pretty much the same way that you would use any other component in our system.
It is deployed by default to production, so no need to deploy it yourself (although
you could if you have extended it yourself). In our Dashboard start building your
integration and include the Code component as well. You will see a picture similar
to the one below:

![](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/14018804997/original/JeiuYO-31ocTuv6E-O3lqUzqVMTqMRxSOw.png?1501499642)

However, don't let the _simple look_ fool you - it has a full-fledged interface
with many very useful features like the ones you would expect from your favourite
desktop developing tool:

*   **Syntax highlighting** - a standard for any online real-time coding interface
*   **Code auto-completion** - again a standard that you got used to from your desktop tool
*   Support for number of **[variables and libraries](#available-variables-and-libraries)** within the context of the execution
*   Support for [ECMAScript 2015](https://en.wikipedia.org/wiki/ECMAScript) JavaScript standard
*   Run and troubleshoot within the designer interface.

### Requirements

#### Environment variables

Code component does not need environment variables to function. Environment Variables
can be used to tune or extend the functionality like available RAM memory for the
docker containers to use.

## Credentials

Code component does not require credentials to function.

## Triggers

### Executes custom code

This trigger executes a custom code inputted on the interface.

## Actions

### Executes custom code

This action executes a custom code inputted on the interface.

## Additional info

### Available Variables and Libraries

Here are the available variables and libraries that can be used within the context
of execution. The most up-to-date list can always be found in be used within the
context of execution. Below is the list for your reference:

*   `console`: - more on [Node.js console](https://nodejs.org/dist/latest-v5.x/docs/api/console.html),
*   `process`: - [Current Node.js process](https://nodejs.org/dist/latest-v5.x/docs/api/process.html),
*   `require`: - [Module require](https://nodejs.org/dist/latest-v5.x/docs/api/modules.html),
*   `setTimeout`: - more on [setTimeout](https://nodejs.org/dist/latest-v5.x/docs/api/timers.html),
*   `clearTimeout`: - more on [clearTimeout](https://nodejs.org/dist/latest-v5.x/docs/api/timers.html),
*   `setInterval`: - more on [setInterval](https://nodejs.org/dist/latest-v5.x/docs/api/timers.html),
*   `clearInterval`: - more on [clearInterval](https://nodejs.org/dist/latest-v5.x/docs/api/timers.html),
*   `msg`: - Incoming message containing the payload from the previous step,
*   `exports`: {},
*   `messages`: - [Utility for convenient message creation](https://github.com/elasticio/elasticio-node/blob/master/lib/messages.js),
*   `request`: - [Http Client](https://github.com/id0x3d/co-request),
*   `wait`: - wait,
*   `emitter`: user to emit messages and errors


## Known limitations

Only the code written in `Node.js` is supported at this moment.

## Code component usage Examples

Here are several examples where it's possible to see how can Code component be
used. For purposes of displaying the functionality, we will use the
{{site.data.tenant.name}} [Rest API]({{site.data.tenant.apiBaseUri}}/docs/#introduction).

In the examples below, we make an HTTP request to retrieve your user information
from our API and pass this information to the next stage of integration. We use
Environment variables to retrieve your API username and API Key which is already
defined in your account while logged into the platform Dashboard.

The information that we are accessing is normally given back in the
[JSON form like]({{site.data.tenant.apiBaseUri}}/docs/#users):

```js
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "54f4be3fe7d5224f91000001",
  "first\_name": "John",
  "last\_name": "Doe",
  "email": "test@example.com"
}
```

### Using Callbacks

The simplest way to retrieve this information could be done using JavaScript callbacks.

```js
console.log('Starting Node.js code execution');

var opts = {
    uri: '{{site.data.tenant.apiBaseUri}}/v2/users',
    auth: {
        user: process.env.ELASTICIO\_API\_USERNAME,
        pass: process.env.ELASTICIO\_API\_KEY
    },
    json: true
};

request.get(opts, function(err, response, body){
    if (err) {
        console.log(err);
        return emitter.emit(err);
    }

    if (response.statusCode != 200) {
        return emitter.emit(new Error("API responded with", response.statusCode));
    }

    // create message to emit
    var data = messages.newMessageWithBody({
        fullName: body.first\_name + " " + body.last\_name,
        email: body.email,
        userID: body.id
    });

    // Emit the data event
    emitter.emit('data', data);

    console.log('Message emitted');
});
```

For a simple use case, this is sufficient, however, if we then decide to include
more options to connect different servers it could simply block your entire
integration flow if the proper routines and handlers are not implemented in your
code. This usually involves handling and processing the callback errors and
nesting more and more structures. The highly nested code is difficult to
troubleshoot and it is not called **callback Hell** for no reason.

### Using Promises

We could avoid the **callback Hell** by simply using promises which would transform
the example above into something short and robust:

```js
function\* run() {
    console.log('Incoming message=%j', msg);
    return request.get({
        uri: '{{site.data.tenant.apiBaseUri}}/v2/users',
        auth: {
            user: process.env.ELASTICIO\_API\_USERNAME,
            pass: process.env.ELASTICIO\_API\_KEY
        },
        json: true
    }).then(function transform(res) {
        return {
            fullName: res.body.first\_name + " " + res.body.last\_name,
            email: res.body.email,
            userID: res.body.id
        }
    });
}
```

### Using Function Generators

Going one bit further we can use Function Generators to make our example is even
more robust. Notice we have added an additional call to our API inside.


```js
function\* run() {
    console.log('Incoming message=%j', msg);
    var auth = {
        user: process.env.ELASTICIO\_API\_USERNAME,
        pass: process.env.ELASTICIO\_API\_KEY
    }
    var result = yield request.get({
        uri: '{{site.data.tenant.apiBaseUri}}/v2/users',
        auth: auth,
        json: true
    });
    var result2 = yield request.get({
        uri: '{{site.data.tenant.apiBaseUri}}/v2/teams',
        auth: auth,
        json: true
    });
    return {
        fullName: result.body.first\_name + " " + result.body.last\_name,
        email: result.body.email,
        userID: result.body.id,
        teams: result2.body.map((team) => team.name).join(',')
   }
}
```

For this example `yield` would _make sure_ that response would be given only
when all these `requests` in the above example are executed.
