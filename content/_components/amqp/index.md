---
title: AMQP component
layout: component
section: Protocol components
description: A open standard application layer protocol for passing business messages between applications or organizations.
icon:  amqp.png
icontext: AMQP component
category: amqp
ComponentVersion: 1.4.2
updatedDate: 2023-03-27
---

## Description

A component designed to talk to Advanced Message Queuing Protocol,
(**AMQP**) APIs. AMQP is an open standard for passing business messages
between applications or organizations (see [amqp.org](https://www.amqp.org) for more).

AMQP component establishes an asynchronous communications with queues and topics
to publish or consume records.


## How works

The consumer will register a non-exclusive non-durable queue with `autodelete=true` and
without any dead-letter. Name of the queue will be dynamically generated based on
the `USER_ID`, `FLOW_ID` prefixed with `eio_consumer_`. This
queue will be bound to the exchange with specified bound key or multiple bound
keys that are specified in one string separated by commas.

## Requirements

### Environment variables

This component will automatically encrypt data that is sent to the queue when following environment variables are set and `Don't encrypt payload` unchecked

*   `ELASTICIO_MESSAGE_CRYPTO_IV` - vector for symmetric encryption
*   `ELASTICIO_MESSAGE_CRYPTO_PASSWORD` - password for symmetric encryption

These variables are by default available in the platform environment.
Data will be encrypted using symmetric `AES-256` encryption.

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about AMQP component like [changelog](/components/amqp/technical-notes#changelog).

## Credentials

This component expects user to provide a AMQP URL, username and password should
be embedded as part of the URL, for example `amqp://foo:bar@server`. You can
also use URL syntax to provide further parameters and any other options
(e.g. `vHost` or port).

![Credentials](img/credentials.png)

## Triggers

### Consume

Will consume the incoming message object that contains `body` with the payload.
If the exchange doesn't exist it will be created on start.

![Consume](img/consume.png)

#### Configuration Fields

* **Exchange** - (string, required): Exchange name where you want to get messages
* **Binding Keys**  - (string, optional): Optionally you can use `#` or `*` to wildcard. For more information check the tutorial provided at the [RabbitMQ site](http://www.rabbitmq.com/tutorials/tutorial-five-javascript.html).
* **Don't decrypt payload**  - (checkbox, optional): If checked payload will be not decrypted
* **Reconnect Timeout** - (string, optional, 5 by default, maximum 1000): In case of errors how long to wait until retry is seconds
* **Reconnect Attempts** - (string, optional, 12 by default, maximum 1000): How many times try to reconnect before throw error

## Actions

### Publish

Will publish the messages into an exchange. This exchange will be created on
start if it doesn't exists.

![Publish](img/publish.png)

#### Configuration Fields

* **Exchange** - (string, required): Exchange name where you want to send message to
* **Don't encrypt payload** - (checkbox, optional): If checked payload will be not encrypted
* **Content-Type** - (string, optional): Content-Type of pushed payload, default is `application/octet-stream`
* **Reconnect Timeout** - (string, optional, 5 by default, maximum 1000): In case of errors how long to wait until retry is seconds
* **Reconnect Attempts** - (string, optional, 12 by default, maximum 1000): How many times try to reconnect before throw error. 12 by default

## Known limitations

Following limitations of the component are known:
*   You can not publish to the default exchange.
*   All published exchanges are `topic` exchanges by default. However, with the `topic` exchanges one can emulate `direct` and `fanout` exchanges.
