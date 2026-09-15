---
title: Choosing a Trigger
layout: article
section: Tutorials
order: 4
description: A practical guide to the trigger types you'll find across components — polling, webhooks, and real-time flows — and how to decide between them.
category: actions-and-triggers
---

Every flow starts with a trigger. Before you pick a component, it helps to know that almost every trigger on the platform is one of three kinds, regardless of which system it connects to. This article walks through each, and gives you a way to decide which one your flow needs.

> This article assumes you've read [Understanding Actions and Triggers](actions-and-triggers-overview) first.

## The three kinds of trigger

| Kind | Typical name | How it starts your flow | Delay |
|---|---|---|---|
| Polling | **Get New and Updated Objects (Polling)** | The platform asks the connected system, on a schedule, "anything new or changed since last time?" | Minutes, depending on your polling interval |
| Webhook | **Webhook** / **Webhook Subscription** | The connected system pushes a notification to the platform the moment something happens | Seconds |
| Event subscription | **Subscribe to Events**, **Subscribe to Platform Events**, **Subscribe to PubSub**, and similar | The flow keeps a live subscription to the connected system's event stream | Near-instant; whether it needs a real-time flow depends on the trigger — see below |

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

### Event subscription triggers

A growing number of components offer a trigger that subscribes directly to a live event stream from the source system — look for names like **Subscribe to Events**, **Subscribe to Platform Events**, or **Subscribe to PubSub**. Not all of them require a [real-time flow](/guides/realtime-flows): some keep a persistent subscription open and run perfectly well in an ordinary flow, while others genuinely need the real-time flow mode to keep that connection alive. Which one you have is usually spelled out right in the trigger's own name (for example, Salesforce's **Subscribe to platform events (Realtime flows only)**) — check the trigger's name and the component's documentation page rather than assuming either way.

Use an event subscription trigger when:

* the connected system exposes an event-streaming API (platform events, pub/sub, CDC streams) for what you need
* if the trigger's name indicates it needs a real-time flow, you're already using one or are prepared to set one up

## Quick decision guide

1. **Does the component offer a Webhook trigger for what you need, and can you register it?** Use it — it's the best combination of speed and simplicity for most flows.
2. **Do you need near-instant reaction?** Look for an event subscription trigger such as Subscribe to Events or Subscribe to Platform Events, and check its name for whether it requires a real-time flow.
3. **Otherwise, use the polling trigger** and set the interval to match how time-sensitive the flow actually is.

## Related links

- [Understanding Actions and Triggers](actions-and-triggers-overview)
- [Choosing an Action](choosing-an-action)
- [Webhook Overview](webhooks-overview)
- [Creating a webhook flow](webhooks-flow)
- [Building real-time flows](/guides/realtime-flows)
