---
title: Flow Control
description: This document provides basic information on flow control and differences between dynamic and static flow control.
layout: article
section: Data transfer
category: data-transfer
order: 5
---

## Introduction

Our platform is designed to connect a variety of applications and systems. The platform uses dynamic and static flow control to manage the flow of data between connected applications and systems. Understanding the differences between these two methods of flow control is important to ensure efficient, reliable, and scalable data integration.

## Static Flow Control

Static flow control involves setting a fixed rate of data transfer between applications, regardless of their current performance or capacity. While static flow control can be useful in situations where the performance of the applications and network is predictable and stable, it can lead to problems if the data flow rate is set too high or too low. Static flow control can cause data loss, latency issues, or other problems if the rate of data flow is not adjusted based on real-time feedback from each application.

## Dynamic Flow Control

Dynamic flow control, on the other hand, is a method of adjusting the rate of data transfer between applications based on real-time feedback from each endpoint. In our platform dynamic flow control involves using algorithms to calculate the optimal data flow rate based on factors such as network latency, processing speed, and available resources. This rate can be adjusted in real-time as conditions change, ensuring that data integration remains efficient and reliable. Dynamic flow control is essential in complex IT environments where the performance and capacity of applications and network conditions can change rapidly.

>**Please note:** If your component is written in Java then you can now disable the dynamic flow control in the step by setting the `AMQP_PUBLISH_CONFIRM_ENABLED` environment variable in the component repository as false. This is only possible if your component is using the Java sailor version 3.3.5.

### Dynamic Flow Control details

When you retry erroneous messages, they get marked with `retry=true` header, so lookout doesn’t write data record.

Sailor retries publishing messages to next step infinitely, for those cases when the next queue is overloaded. Retries will happen with exponential back-off. For example, if it starts with retry in 5 seconds, the next will be in 10, then 20, then 40, then 80 seconds, etc. The maximum delay is configurable with an environment variable. By default, there is no limit to retries.

The following variables control the retry process:

*  `AMQP_PUBLISH_RETRY_DELAY`: 100 ms
*  `AMQP_PUBLISH_RETRY_ATTEMPTS`: Infinity
*  `AMQP_PUBLISH_MAX_RETRY_DELAY`: 5 minutes.

### Impact on Flow Queues

Dynamic flow control can have a significant impact on [flow queues](flow-queues). A flow queue is a buffer that holds messages waiting to be processed by a component of a data integration flow. The flow queue size can be limited by the maximum number of messages that can be processed simultaneously by a component.

With static flow control, the flow queue size is fixed and does not change based on real-time feedback from each component. This can lead to overloading or underloading of the components, causing delays, errors, or data loss.

In contrast, dynamic flow control adjusts the flow queue size based on real-time feedback from each component. If a component is processing messages too slowly, the platform may reduce the flow queue size to prevent overloading the component. If a component is processing messages quickly, the platform may increase the flow queue size to ensure that messages are processed efficiently.

Dynamic flow control can also adjust the flow queue size based on external factors, such as network conditions or resource availability. For example, if the network latency increases, the platform may reduce the flow queue size to prevent message delays or errors.

## Static vs Dynamic Flow Control

The main difference between static and dynamic flow control is how the flow of data is managed between connected applications and systems. Static flow control uses a fixed rate of data transfer, while dynamic flow control adjusts the rate of data transfer based on real-time feedback from each endpoint. Dynamic flow control is more flexible than static flow control, as it can adapt to changes in the performance or capacity of the applications and network, and can prevent errors or data loss caused by overloading or underloading an application.

## Advantage of dynamic flow control

### Example 1: E-commerce Order Management

In an e-commerce order management system, orders may need to be processed in real-time to ensure timely delivery to customers. A static flow control system may be configured to send a fixed number of orders to the warehouse management system every minute. However, if there is a surge in orders, the warehouse may become overloaded, and orders may not be processed on time, resulting in customer complaints.

With dynamic flow control, the platform can monitor the warehouse's performance and adjust the rate of orders being sent to ensure that the warehouse is not overloaded. The platform may also adjust the rate of orders being sent based on network conditions, such as latency or available bandwidth.

### Example 2: Cloud-Based Accounting Software

A cloud-based accounting software may require data to be transferred between different systems, such as payroll, tax, and general ledger systems. In a static flow control system, data may be transferred at a fixed rate, regardless of the systems' performance or capacity.

With dynamic flow control, the platform can monitor the performance and capacity of each system and adjust the rate of data transfer accordingly. This can ensure that data is transferred efficiently, with minimal delay or errors, even if the systems experience fluctuations in performance or capacity.
