---
title: Flow Linking
layout: article
section: Platform Features
order: 16
description: Three different ways to connect one flow's output to another flow's input, and how to tell which one a given situation calls for.
category: platform-features
---

Not every integration fits neatly into a single flow. Sometimes what you actually want is several smaller, focused flows that hand data off to each other — one that ingests orders, another that enriches them, another that fans them out to fulfillment systems — rather than one long flow that does everything and is painful to change safely. **Flow linking** is the general name for the platform's mechanisms to connect flows like that, and there are three of them, each suited to a different situation.

## The three mechanisms

**REST API and Webhook components.** The REST API component lets a flow expose its own endpoint or call someone else's; the Webhook component lets a flow start the moment an external system — including another one of your own flows, calling out via REST API — sends it a request. Together they're the general-purpose option: reach for them when you need to expose an endpoint, consume a third-party one, or trigger a flow from an incoming HTTP request.

**Flow Linking component.** A dedicated, drag-and-drop way to connect flows together directly, without you managing the HTTP request/response mechanics yourself. This is the better fit when you're deliberately composing several flows into one larger orchestrated process and want that composition visible in the flow builder itself.

**Pub/Sub component.** Built around a publish/subscribe pattern — supporting protocols like MQTT and Apache Kafka — where one flow publishes to a topic and any number of other flows can subscribe to it, independently of each other. This is the right tool for event-driven designs, or when several downstream flows all need to react to the same event without being wired to each other directly.

## Picking between them

As a rule of thumb: use **REST API / Webhook** for general request/response integration, including with systems outside the platform entirely; use the **Flow Linking component** when you're explicitly chaining a known, fixed sequence of your own flows; and use **Pub/Sub** when multiple, possibly-changing consumers need to react to the same event without you having to update a producer flow every time a new consumer is added.

## Related links

- [Flow Linking feature](/guides/flow-linking-feature) — the full comparison, with a worked example for each mechanism
- [REST API component](/components/rest-api)
- [Webhook component](/components/webhook)
- [Flow Linking component](/components/flow-linking)
- [Pub/Sub component](/components/pub-sub)
