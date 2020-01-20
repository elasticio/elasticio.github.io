---
title: EmitError
description: Emit `error` event is used to return an error which occurs during the execution of the component.
layout: article
section: Sailor
since: 20180430
order: 4
category: events
---

> emit `error` event is used to return an error which occurs during the execution of the component.

## Example 1

Here is an example implementation:

```js
function emitError(err) {
    this.emit('error', err);
}
```
## Example from Kenn.io

This is one of the simplistic implementations of the emit error event. For more advanced usage one could consult the following example from {{site.data.tenant.name}} [Keen.io](/components/keenio/index) component:

```js
var Keen = require('keen-js');
var Q = require('q');
var elasticio = require('elasticio-node');
var messages = elasticio.messages;

exports.process = execute;

function execute(msg, cfg) {

    var that = this;

    Q(cfg)
        .then(validateConfig)
        .then(createClient)
        .then(sendEvent)
        .then(emitSuccess)
        .fail(emitError)
        .done(end);


    function validateConfig(cfg) {

        if (!cfg.writeKey) {
            throw new Error('writeKey is required to perform the sendEvent action, please reconfigure your account.');
        }

        if (!cfg.projectId) {
            throw new Error('Please provide a valid projectId.');
        }

        if (!cfg.eventCollection) {
            throw new Error('Please provide a Collection Name for your events.');
        }

        return cfg;
    }

    function createClient(cfg) {
        return new Keen({
            writeKey: cfg.writeKey,
            projectId: cfg.projectId
        });
    }

    function sendEvent(client) {
        return Q.ninvoke(client, 'addEvent', cfg.eventCollection, msg.body);
    }

    function emitSuccess(response) {
        var newMsg = messages.newMessageWithBody(response);

        that.emit('data', newMsg);
    }

    function emitError(err) {
        that.emit('error', err);
    }

    function end() {
        that.emit('end');
    }
}
```

Lines 55-57 show the same structure of emit `error`, however, this time we see how the error event is going to be called. It will be called when any of the functions listed on Lines 13-16 fail. It is important to note that this implementation method is made possible by use of `promises` via q-promises.
