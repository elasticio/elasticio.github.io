---
title: Content-Based Routing
layout: article
section: Platform Features
order: 12
description: How to send each message down a different branch of your flow based on what's actually in it, instead of building a separate flow for every case.
category: platform-features
---

Most flows you build early on are linear: a trigger fires, and a fixed sequence of actions runs on every message the same way. That works fine until you hit a case where different messages need different handling — some orders ship domestically and some internationally, some leads are enterprise and some are self-serve, some product updates belong on one storefront and some on another. **Content-Based Routing** is the platform feature that lets one flow make that decision per-message, instead of you maintaining several near-identical flows by hand.

## The idea

A Content-Based Router sits in your flow like any other action, but instead of doing one thing to every message, it evaluates each message against a set of conditions you define — one per branch — and forwards the message down the first branch whose condition matches. Everything downstream of that branch only ever sees messages that satisfy it.

![Content-Based Router principle](/assets/img/integrator-guide/cbr/cbr-principle.png "Content-Based Router principle")

In the diagram above, a single incoming stream of orders is split by product type: sport shoes go to one downstream system, other shoe types to another. Nothing about the trigger or the incoming data changes — only what happens *after* the router does.

## How the conditions work

Each branch's condition is a [JSONata](http://jsonata.org/) expression evaluated against the message — the same expression language used elsewhere on the platform for [transforming data](/guides/transforming-data). The expression must resolve to `true` or `false`; the first branch that evaluates to `true` receives the message. A router configured with a single branch behaves as a simple filter — pass or drop — rather than a full multi-way split.

Because the condition is just an expression over the message's own fields, you're not limited to equality checks on one field — you can combine multiple conditions, compare numbers, or check whether a field exists at all.

## When to reach for it

Content-Based Routing is worth using whenever you catch yourself about to build two or more flows that are identical except for a filter at the top, or a manual step where someone decides which system a record should go to. Common cases:

* Splitting orders, leads, or tickets by region, tier, or type across different destination systems
* Sending only records that meet a threshold (an order total, a priority level) further down a flow, and quietly dropping the rest
* Feeding the same trigger into several unrelated downstream actions without duplicating the trigger itself

## Related links

- [Content-Based Routing](/guides/content-based-router) — the full walkthrough, including building a working example step by step
- [Router component](/components/router/index)
- [Transforming data](/guides/transforming-data)
- [Creating a Basic Integration Flow](first-flow)
