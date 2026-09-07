---
title: Choosing a Trigger
layout: article
section: Tutorials
order: 4
description: A practical guide to the trigger types you'll find across components — polling, webhooks, and real-time streams — and how to decide between them.
category: actions-and-triggers
---

Every flow starts with a trigger. Before you pick a component, it helps to know that almost every trigger on the platform is one of three kinds, regardless of which system it connects to. This article walks through each, and gives you a way to decide which one your flow needs.

> This article assumes you've read [Understanding Actions and Triggers](actions-and-triggers-overview) first.

## The three kinds of trigger

| Kind | Typical name | How it starts your flow | Delay |
|---|---|---|---|
| Polling | **Get New and Updated Objects (Polling)** | The platform asks the connected system, on a schedule, "anything new or changed since last time?" | Minutes, depending on your polling interval |
| Webhook | **Webhook** / **Webhook Subscription** | The connected system pushes a notification to the platform the moment something happens | Seconds |
| Real-time stream | **Subscribe to Platform Events**, **Subscribe to PubSub**, and similar | The flow keeps an open, persistent connection to the connected system's event stream | Near-instant, but only inside a real-time flow |

### Polling triggers

A polling trigger — usually named **Get New and Updated Objects (Polling)** — checks the connected system on an interval you configure (for example, every 15 minutes) and starts your flow once for every record that's new or has changed since the last check. It's the most widely available trigger type, because it only requires the connected system to have a normal read API — it doesn't need the system to support webhooks or streaming at all.

Use a polling trigger when:

* the connected system doesn't offer webhooks for the object you care about
* a delay of a few minutes between something happening and your flow reacting is acceptable
* you want the simplest, most predictable setup — polling triggers rarely need anything configured on the *other* system's side, only here

Keep in mind: a shorter polling interval means faster reactions but more API calls to the connected system, which can run into that system's rate limits. Match the interval to how time-sensitive the flow actually is, not to the shortest interval available.

### Webhook triggers

A webhook-based trigger — often just named **Webhook**, sometimes **Webhook Subscription** — takes the opposite approach: instead of asking, it waits. The connected system calls a URL the platform gives you the moment a relevant event happens, and that call starts your flow immediately. This is faster than polling and puts less load on the connected system, but it requires that system to support sending webhooks, and usually a one-time setup step (registering the webhook URL) either automatically by the component or manually in the connected system's settings.

Use a webhook trigger when:

* the component and the connected system both support it for the event you need
* near-real-time reaction matters for the use case (order placed, ticket created, payment received)

See the [Webhook Overview](webhooks-overview) and [Creating a webhook flow](webhooks-flow) for a full walkthrough of setting one up.

### Real-time stream triggers

A smaller number of components — Salesforce's **Subscribe to Platform Events** and **Subscribe to PubSub**, for example — offer a trigger that stays connected to a live event stream from the source system. These are the fastest option, but they only run inside a [real-time flow](/guides/realtime-flows), a specific flow mode on the platform built to keep a persistent connection open. If you drop one of these triggers into a regular, non-real-time flow, it won't work — check the component's own documentation page for whether a trigger has this requirement before you build around it.

Use a real-time stream trigger when:

* the connected system exposes an event-streaming API (platform events, pub/sub, CDC streams) for what you need
* you're already using, or are prepared to set up, a real-time flow

## Neither fits? Look for Delta Detection

Some systems offer no webhooks and no reliable "changed since" field to poll against. For those, look for a flow built around the [Delta Detection component](/components/delta-detection), which keeps its own record of what it has already seen and works out what's new or changed by comparison, rather than relying on the source system to tell it.

## Quick decision guide

1. **Does the component offer a Webhook trigger for what you need, and can you register it?** Use it — it's the best combination of speed and simplicity for most flows.
2. **Do you need near-instant reaction and are you working in a real-time flow?** Look for a streaming trigger like Subscribe to Platform Events.
3. **Otherwise, use the polling trigger** and set the interval to match how time-sensitive the flow actually is.
4. **No webhook, no stream, and no reliable "changed since" field on the source system?** Reach for Delta Detection.

## Related links

- [Understanding Actions and Triggers](actions-and-triggers-overview)
- [Choosing an Action](choosing-an-action)
- [Webhook Overview](webhooks-overview)
- [Creating a webhook flow](webhooks-flow)
- [Building real-time flows](/guides/realtime-flows)
- [Delta Detection component](/components/delta-detection)
