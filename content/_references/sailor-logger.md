---
title: Sailor Logger
description: Information about currently used logger in components and how to implement it in your components. This document describes the changes in node.js sailor from January 2020.
layout: article
section: Sailor
since: 20200116
order: 1
category: sailor
---

## Description

Information about currently used logger in components and how to implement it in
your components. This document describes the changes in node.js sailor from January 2020.

As of {{site.data.tenant.name}} platform version [20.03](/releases/20.03) a new
[executions](/getting-started/executions) page is introduced. Unlike the main
dashboard which shows log statements from both `console.log()` and `this.logger.info()`,
the new executions page will show the logs if you enveloper your message in `this.logger.info()`.

To take advantage of this new executions page your component must use
`this.logger.info()` to envelope the messages or in technical terms your must
switch to [bunyan](https://github.com/trentm/node-bunyan) logging framework and
upgrade the Sailor version to at least `2.5.4`.

## About the Built-In Logger

Every `process()` function will have a property `logger` attached to the [context of the function that can be accessed by referencing `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this).

The `logger` object is an instance of a [Bunyan Logger](https://github.com/trentm/node-bunyan).
It exposes 6 levels of log statements (from highest to lowest):

-   `this.logger.fatal` - The service/app is going to stop or become unusable now. An operator should immediately look into this soon.
-   `this.logger.error` - This is fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish).
-   `this.logger.warn` - This is a note on something that should probably be looked at by an operator eventually.
-   `this.logger.info` - This is a detail on regular operation.
-   `this.logger.debug` - This is something else, i.e. too verbose to be included in `info` level.
-   `this.logger.trace` - This is logging from external libraries used by your app or very detailed application logging.

> **Please Note**: Only statements with level `info` or higher will appear on the executions page.

Most other exported functions (e.g. `verifyCredenitals()`, `getMetaModel()` and
functions which populate dynamic drop-downs) also have this logger attached.
However, the logger is not available in the `init()`, `shutdown()` or `startup()`
functions.  As of 20.03 it is no longer possible to record log statements from
those functions.

## How to Use the Built-In Logger

In a component `process()` function

Instead of

```js
    module.exports.process = async function process(msg, cfg, snapshot) {
            console.log('Incoming message is %s', JSON.stringify(msg));
            const body = { result : 'Hello world!' };
            await this.emit('data', { body });
            console.log('Execution finished');
    }
```

Do
```js
    module.exports.process = async function process(msg, cfg, snapshot) {
            this.logger.info('Incoming message is %s', JSON.stringify(msg));
            const body = { result : 'Hello world!' };
            await this.emit('data', { body });
            this.logger.info('Execution finished');
    }
```

> **Please Note**: If you call into a child function from within your parent `process` function, you will need to pass the `logger` as an argument to the child function.

Instead of

```js
    async function buildMessage(resultText) {
            console.log(resultText);
            return { body: { result : 'Hello world!' }};
    }

    module.exports.process = async function process(msg, cfg, snapshot) {
            const message = buildMessage('Hello world!');
            await this.emit('data', { body });
    }
```
Do
```js
    async function buildMessage(logger, resultText) {
            logger.info(resultText);
            return { body: { result : 'Hello world!' }};
    }

    module.exports.process = async function process(msg, cfg, snapshot) {
            const message = buildMessage(this.logger, 'Hello world!');
            await this.emit('data', { body });
    }
```
or do
```js
    async function buildMessage(resultText) {
            this.logger.info(resultText);
            return { body: { result : 'Hello world!' }};
    }

    module.exports.process = async function process(msg, cfg, snapshot) {
            const message = buildMessage.call(this, 'Hello world!');
            await this.emit('data', { body });
    }
```

## Java

Currently, the Java Sailor does not expose a logger that is capable of recording
log statements on the new executions page. For flows which use components that
are written in Java, it is advised to continue using the old executions interface.

## Related links

- [Executions Page](/getting-started/executions)
- [Bunyan](https://github.com/trentm/node-bunyan)
- [A function's `this` keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
