---
title: AMQP component
layout: component
section: Protocol components
description: An open standard application layer protocol for passing business messages between applications or organizations.
icon:  amqp.png
icontext: AMQP component
category: amqp
ComponentVersion: 1.4.4
updatedDate: 2026-01-15
---

## Table of Contents

- [Description](#description)
- [How it works](#how-it-works)
- [Requirements](#requirements)
  - [Environment variables](#environment-variables)
- [Credentials](#credentials)
- [Triggers](#triggers)
  - [Consume](#consume)
- [Actions](#actions)
  - [Publish](#publish)
- [Known limitations](#known-limitations)  

## Description

This component provides connectivity to message brokers that support the Advanced Message Queuing Protocol (**AMQP**). AMQP is an open standard for asynchronous message-based communication between applications. For more information, visit [amqp.org](https://www.amqp.org).

It enables publishing messages to exchanges and consuming messages from queues.

## How it works

The consumer (in the "Consume" trigger) automatically creates a non-exclusive, non-durable queue with the `autoDelete` property set to `true`. This queue does not have a dead-letter exchange configured.

The queue name is dynamically generated using the pattern `eio_consumer_{USER_ID}_{FLOW_ID}`.

This queue is then bound to the specified exchange using one or more binding keys (provided as a comma-separated string).

## Requirements

### Environment variables

The component supports automatic payload encryption and decryption using `AES-256`. This feature is enabled by default but can be disabled using the `Don't encrypt payload` or `Don't decrypt payload` configuration options.

The following environment variables are required for encryption/decryption and are automatically provided by the elastic.io platform:

*   `ELASTICIO_MESSAGE_CRYPTO_IV` - vector for symmetric encryption.
*   `ELASTICIO_MESSAGE_CRYPTO_PASSWORD` - password for symmetric encryption.

## Credentials

The component requires an AMQP connection URL. The username and password must be embedded within the URL, for example: `amqp://user:password@hostname`.

Additional parameters, such as the `vHost` or `port`, can also be specified as part of the URL syntax.

{% include img.html max-width="100%" url="img/amqp-credentials.png" title="Credentials" %}

## Triggers

### Consume

Consumes messages from a queue bound to a specified exchange. It emits a message for each consumed payload.

If the target exchange does not exist, it will be created automatically.

Will consume the incoming message object that contains `body` with the payload.
If the exchange doesn't exist it will be created on start.

{% include img.html max-width="100%" url="img/consume-trigger.png" title="Consume Trigger" %}

### Limitations:
*   **Real-time Flows Only**: This trigger is designed for real-time flows. Using it in a scheduled flow (e.g., cron-based) can lead to unexpected behavior and make debugging difficult, as each execution creates a separate record. We recommend setting the schedule frequency to a minimum (e.g., once a day) and using the **'Run Now'** button for manual execution. All logs and emitted messages will appear under the most recent execution record.
*   **Message Ordering**: After a flow is unsuspended, any messages that were queued will be processed, but their original order is not guaranteed.

#### Configuration Fields

*   **Exchange** (string, required): The name of the exchange to consume messages from.
*   **Binding Keys** (string, optional): A comma-separated list of binding keys. Supports wildcards (`#` or `*`). For more details, see the [RabbitMQ tutorials](http://www.rabbitmq.com/tutorials/tutorial-five-javascript.html).
*   **Don't decrypt payload** (boolean, optional): If selected, the component will not attempt to decrypt the incoming message payload.
*   **Reconnect Timeout** (number, optional): The time in seconds to wait before attempting to reconnect in case of an error. Defaults to `5`. Maximum value is `1000`.
*   **Reconnect Attempts** (number, optional): The number of times to try reconnecting before failing. Defaults to `12`. Maximum value is `1000`.

## Actions

### Publish

Will publish the messages into an exchange. This exchange will be created on start if it doesn't exists.

{% include img.html max-width="100%" url="img/publish-action.png" title="Publish action" %}

#### Configuration Fields

*   **Exchange** (string, required): The name of the exchange to publish the message to.
*   **Don't encrypt payload** (boolean, optional): If selected, the outgoing message payload will not be encrypted.
*   **Content-Type** (string, optional): The `Content-Type` of the published payload. Defaults to `application/octet-stream`.
*   **Reconnect Timeout** (number, optional): The time in seconds to wait before attempting to reconnect in case of an error. Defaults to `5`. Maximum value is `1000`.
*   **Reconnect Attempts** (number, optional): The number of times to try reconnecting before failing. Defaults to `12`. Maximum value is `1000`.

## Known limitations

Following limitations of the component are known:

*   Publishing to the default (unnamed) exchange is not supported.
*   All exchanges created by this component are of the `topic` type. However, `topic` exchanges can be configured to emulate `direct` and `fanout` behaviors.