---
title: Flow Control
description: This document provides basic information on flow control and differences between dynamic and static flow control.
layout: article
section: Data transfer
category: data-transfer
order: 5
---

## Introduction

Our platform is designed to connect a variety of applications and systems. The platform uses dynamic and static flow control to manage the flow of data. Understanding the differences between these two methods of flow control is important to ensure efficient, reliable, and scalable data integration.

## Static Flow Control

Static flow control involves setting a fixed rate of data transfer, regardless of their current performance or capacity. While static flow control can be useful in situations where the performance of the applications and network is predictable and stable, it can lead to problems if the data flow rate is set too high or too low. Static flow control can cause data loss, latency issues, or other problems if the rate of data flow is not adjusted based on real-time feedback from each application.

In older components, static flow control will continue to work as usual. If the maximum number of messages is exceeded, the flow will be suspended.

In newer Node.js components and Java components (from Sailor version 3.3.5+), where Dynamic Flow Control is not disabled, Dynamic Flow Control works in conjunction with static flow control. The following criteria are taken into consideration:

* Number of messages in the queue (75 KB)
* Total volume of messages in the queue (200 MB)

If either of these criteria is fulfilled, a restriction is triggered, and the message cannot be queued. The system will attempt to queue the message exponentially, resulting in retries with increasing backoff intervals.

## Dynamic Flow Control

The Dynamic Flow Control is based on RabbitMQ Publisher Confirms and RabbitMQ Flow Policies which enables a dynamic slow-down of a publisher/producer based on the current queue state. Each task queue has a messages limit. RabbitMQ `overflow: 'reject-publish'` policy is set for all task queues to reject steps to publish into queue which is overflowed by messages. [Sailor](/references/sailor-compatibility-matrix) will retry publish infinitely until message will be successfully sent.

Sailors use [Publish Confirm](https://www.rabbitmq.com/confirms.html) RabbitMQ feature. They prefetch some amount of messages (”Parallel Processing” in UI, default: 1) and send confirmation back to RabbitMQ  after processing each incoming message. Processing of incoming message ends when sailor successfully sends a message to the next step. So a step can’t process more then “Parallel Processing” messages at a time, other messages are waiting in a queue.

RabbitMQ [Flow Control](https://www.rabbitmq.com/flow-control.html) automatically reduces the speed to connections which are publishing too quickly to keep the rate of message ingress at one that the rest of the server (e.g. queues those messages are route to) can handle.

### Dynamic Flow Control details

When you retry erroneous messages, they get marked with `retry=true` header, so lookout doesn’t write data record.

Sailor retries publishing messages to next step infinitely, for those cases when the next queue is overloaded. Retries will happen with exponential back-off. For example, if it starts with retry in 5 seconds, the next will be in 10, then 20, then 40, then 80 seconds, etc. The maximum delay is configurable with an environment variable. By default, there is no limit to retries.

The following variables control the retry process:

*  `AMQP_PUBLISH_RETRY_DELAY`: 100 ms
*  `AMQP_PUBLISH_RETRY_ATTEMPTS`: Infinity
*  `AMQP_PUBLISH_MAX_RETRY_DELAY`: 5 minutes.

> **Please Note:** Dynamic Flow Control affects **Flow Queues**. For more information read this [article](/guides/platform-behavior.html#messaging-queue-limits).

### Disable Dynamic Flow Control

As the feature may have a performance impact, you can disable it. Currently disable is supported only if step is using sailor-jvm `3.3.5+` or it’s a webhook step. In this case you will see a “Dynamic flow control” switch in UI during step configuration. When Dynamic Flow Control is disabled for a step, RabbitMQ Publish Confirm feature is not used by sailor and, of course, there will be no retries on error.

{% include img.html max-width="80%" url="/assets/img/integrator-guide/flow-control/disable-UI.png" title="Disable Dynamic Flow Control via UI" %}

> **Please note** that Dynamic Flow Control cannot be disabled in Node.js components. However, you can disable dynamic flow control in Java components by using the UI or [API call]({{site.data.tenant.apiDocsUri}}/v2#/flows/patch_flows__flow_id_). This option is available only for components with Sailor version 3.3.5+.

### Use Cases

1. webhook (new request arrives) → step 1 queue (overflowed) → step 1 (processing 2 messages)
    1. webhook will try to publish a message into step 1 queue and get a reject from RabbitMQ
    2. webhook will reply with 429 Too Many Requests
2. webhook → step 1 queue (2 messages) → step 1 (parallel processing: 1, emits a message) → step 2 queue (overflowed) → step 2 (processing 2 messages)
    1. step 1 will get a reject from RabbitMQ and try to make infinite amount of retries with [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff) until successful publish
    2. until successful publish 2 messages in step 1 queue will stay there

### E-commerce Order Management example

In an e-commerce order management system, orders may need to be processed in real-time to ensure timely delivery to customers. A static flow control system may be configured to send a fixed number of orders to the warehouse management system every minute. However, if there is a surge in orders, the warehouse may become overloaded, and orders may not be processed on time, resulting in customer complaints.

With dynamic flow control, the platform can monitor the warehouse's performance and adjust the rate of orders being sent to ensure that the warehouse is not overloaded. The platform may also adjust the rate of orders being sent based on network conditions, such as latency or available bandwidth.
