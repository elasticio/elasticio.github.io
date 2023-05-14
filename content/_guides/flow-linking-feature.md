---
title: Flow Linking feature
description: This document provides information on three mechanisms to link flows and how to use them.
layout: article
section: Data transfer
category: data-transfer
order: 6
---

## Introduction

{{site.data.tenant.name}} is a cloud-based integration platform as a service (iPaaS) that provides various solutions for connecting and integrating disparate systems and applications. Flow linking is one of the key features of the platform that allows users to link multiple flows together and automate complex workflows. Within flow linking, there are several solutions available, including [REST API](/components/rest-api), [Webhook](/components/webhook), [Flow Linking](/components/flow-linking), and [Pub/Sub](/components/pub-sub) components. In this article, we will differentiate between these flow linking solutions and provide guidance on when to use each approach.

## REST API Component and Webhook Component

REST API and Webhook are two of the most common approaches used for integrating with external systems or services. REST API is a popular protocol for web-based communication that uses HTTP requests to send and receive data. The REST API component in elastic.io allows users to expose their own REST API endpoints or consume third-party REST API endpoints. In contrast, the Webhook component in elastic.io enables users to receive incoming HTTP requests from external systems and trigger a flow in response.

> All necessary information about API endpoints can be found in our [API documentation]({{site.data.tenant.apiDocsUri}}/v2#).

### When to use

If you need to expose your own API endpoints or consume third-party APIs, the REST API component is the best approach. On the other hand, if you need to trigger flows based on incoming HTTP requests from external systems, the Webhook component is the best option.

> For a better understanding of how this mechanism works, please refer to the [example](/components/rest-api/rest-api-flow-linking) of using the **REST-API** component to link flows.

## Flow Linking Component

The Flow Linking component allows users to connect multiple flows together and automate complex workflows. It provides a graphical user interface (GUI) for creating complex workflows using a drag-and-drop approach. The Flow Linking component allows users to link flows together and pass data between them, making it easier to orchestrate complex workflows.

### When to use

The Flow Linking component is ideal for users who need to automate complex workflows that involve multiple steps and multiple systems. It is also a good choice for users who prefer a GUI-based approach to workflow automation.

> For a better understanding of how this mechanism works, please refer to the [example](/components/flow-linking/usage-example) of using the **Flow linking** component to link flows.

## Pub/Sub Component

The Pub/Sub component enables users to create event-driven architectures and implement real-time data processing. It uses a publish/subscribe messaging pattern, where publishers send messages to a topic, and subscribers receive messages from that topic. The Pub/Sub component supports various messaging protocols, including MQTT and Apache Kafka.

### When to use

The Pub/Sub component is ideal for users who need to implement real-time data processing or event-driven architectures. It is also a good choice for users who need to handle large volumes of data in a scalable and efficient way.

> For a better understanding of how this mechanism works, please refer to the [example](/components/pub-sub/usage-example) of using the **Pub-Sub** component to link flows.
