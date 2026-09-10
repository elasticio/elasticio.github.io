---
title: Scheduled Executions
layout: article
section: Platform Features
order: 17
description: How a component figures out what categories, fields, and credentials are valid for your specific account before your flow ever runs.
category: platform-features
---

When you configure a step in a flow, dropdowns like "which category" or "which object" are usually populated with options pulled live from your own connected account, not a fixed list baked into the component. **Scheduled Executions** is the platform mechanism that makes that possible — it's what runs a component's configuration-time logic separately from, and ahead of, the flow actually processing data.

## What it solves

Take a component that retrieves products from an e-commerce platform. The specific categories that exist, the metadata fields attached to a given category, and whether your credentials are even valid — none of that can be known in advance by the person who wrote the component, because it's different for every account, every category, and changes over time. Scheduled Executions gives the component a way to ask, at configuration time, questions like:

* `selectModel` — what are the valid options for this field, for this specific account?
* `getMetaModel` — what metadata is attached to whatever was selected above?
* `verifyCredentials` — are these credentials actually valid for this configuration?

These run in the same environment the component itself runs in during a flow, so the answers reflect your real connected account — the same dropdown you see when configuring a step.

## Why it's asynchronous

Because these calls run against a live external account, they can't always resolve instantly — so the platform treats a scheduled execution as an asynchronous job rather than a blocking request. When you (or, more precisely, the platform's own UI) trigger one, it's accepted and scheduled, and the result is fetched separately once it's ready: the request returns immediately with a pointer to poll, polling returns "not yet" until the result exists, and once it does, a final response tells you where to fetch it.

You won't normally trigger this yourself — it happens automatically every time a dropdown populates or a credential gets verified in the flow builder — but it's useful to recognize the pattern, since the same request → poll → retrieve shape shows up elsewhere in the platform's API.

## Related links

- [Scheduled executions](/guides/scheduled-executions) — the full technical detail, including the request/poll/retrieve workflow and API endpoints
- [Component.json Overview](/developers/component-json-technical-reference)
- [Fields vs Metadata](/developers/input-fields-and-metadata)
