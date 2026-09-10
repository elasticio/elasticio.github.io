---
title: Understanding Actions and Triggers
layout: article
section: Tutorials
order: 3
description: What the standard actions and triggers you see in most components mean, why they're named the way they are, and how to pick between them when building a flow.
category: actions-and-triggers
---

If you've opened a few different components on the platform, you've probably noticed the same handful of names keep coming back: **Upsert Object**, **Lookup Objects**, **Delete Object By ID**, **Get New and Updated Objects Polling**, **Make Raw Request**. That's not an accident, and it's not a lack of imagination — it's a deliberate design choice, and understanding it will save you time in every flow you build afterwards.

This article explains what that choice is, why it looks the way it does, and gives you a starting point for picking the right action or trigger. Two follow-up articles go deeper on each side: [Choosing a Trigger](choosing-a-trigger) and [Choosing an Action](choosing-an-action).

> New to the terms "action" and "trigger" themselves? Start with the [Integration Component Overview](/getting-started/integration-component) — this article assumes you know that a trigger starts a flow and an action consumes what the trigger (or a previous action) produced.

## Why the same few names keep showing up

A connector built by a competitor for, say, Salesforce might expose an action literally called "Create Invoice" and another called "New Lead." That reads nicely, but it only exists because someone wrote code specifically for the `Invoice` object and specifically for the `Lead` object. The moment you need a third object — `Opportunity`, or a custom object your team added last month — that connector either doesn't support it, or a developer has to ship an update.

Our components are built differently, most of them on top of [Open Integration Hub](https://openintegrationhub.org), an API-driven approach where the component doesn't hard-code which object it works with. Instead it exposes one **Upsert Object** action, and you tell it which object — Invoice, Lead, Opportunity, or anything else the connected system exposes — through a configuration field. The trade-off is right there in the name: **Upsert Object** is less immediately readable than **Create Invoice**, but it works with every object the API has, today and after you add a custom one next year, with nothing to wait on from us.

Once you know this, the naming stops looking vague and starts looking like a pattern:

* the **verb** (`Upsert`, `Lookup`, `Delete`, `Get New and Updated`) tells you what happens
* the **noun** (`Object`) is a placeholder you fill in yourself, in the action's or trigger's configuration
* a small number of connectors — the ones tied to a schema-less API, like [Airtable](/components/airtable) or a plain [REST API](/components/rest-api) component — use `Row`, `Record`, or `Resource` in place of `Object`, but the same logic applies

## The standard vocabulary

Across the platform's components, most of what you'll build a flow from boils down to this set. You will not find every one of these in every component — a component only exposes the operations its underlying API actually supports — but if a component has actions or triggers at all, they are very likely drawn from this list.

| You want to... | Look for a trigger or action named... | Type |
|---|---|---|
| Start a flow when a record is created or changed, and the system has to be asked periodically | **Get New and Updated Objects (Polling)** | Trigger |
| Start a flow the instant something happens, pushed by the external system | **Webhook** | Trigger |
| Create a record, or update it if a matching one already exists | **Upsert Object** | Action |
| Create a new record only | **Create Object** | Action |
| Change a record you already have the ID for | **Update Object** | Action |
| Fetch one specific record | **Lookup Object (By ID)** | Action |
| Fetch a list of records matching some criteria | **Lookup Objects (plural)** | Action |
| Remove a record | **Delete Object (By ID)** | Action |
| Do something the standard actions above don't cover | **Make Raw Request** | Action |

The last row matters: **Make Raw Request** (sometimes called **Raw Request** or, for GraphQL APIs, **Execute Mutation**) is the escape hatch. It sends a direct call to the connected system's API and hands you the raw response. It's more work to configure, but it means you're never stuck if your use case doesn't fit one of the friendlier actions above — reach for it deliberately, not as your first choice. [Choosing an Action](choosing-an-action) covers when it actually makes sense.

## The dropdown is doing the work

Here is the piece that makes the generic naming workable in practice: every one of these actions and triggers has a configuration field — usually called **Object Type**, **Object**, or **Table** — where you pick the specific thing you want to work with, populated live from your own connected account.

That single dropdown is the difference between an abstract-sounding **Upsert Object** and a concrete result. Pick `Invoice` in that field, and the action becomes, in effect, "create or update an invoice." Pick `Contact`, and it becomes "create or update a contact." The action's name in the component list stays generic on purpose — so it can be reused for any object — but what it *does* in your flow is exactly as specific as what you configure.

Practically, this means:

1. Drag in the action or trigger by its generic name.
2. Open its configuration and set the **Object Type** (or equivalent) field first — most of the other fields on the step depend on it.
3. The input and output fields will update to match the object you picked, often pulling the real field list straight from the connected system.

## Where to go from here

* [Choosing a Trigger](choosing-a-trigger) — a closer look at polling, webhooks, and real-time streams, and how to tell which one a given component offers.
* [Choosing an Action](choosing-an-action) — a decision guide for picking between Create, Update, Upsert, Lookup, Delete, and Raw Request.
* [Creating a Basic Integration Flow](first-flow) — if you haven't built a flow at all yet, start there first.
* Each component's own documentation page (for example, [Salesforce](/components/salesforce), [AFAS](/components/afas), [Shopify Admin](/components/shopify-admin-v2)) lists exactly which of these actions and triggers it supports, plus any configuration fields specific to that system.

## Related links

- [Integration Component Overview](/getting-started/integration-component)
- [Integration Flow Overview](/getting-started/integration-flow)
- [Creating a Basic Integration Flow](first-flow)
- [Understanding Data Sample](/guides/data-sample-overview)
- [Mapping Data](/guides/mapping-data)
