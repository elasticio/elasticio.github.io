---
title: Choosing an Action
layout: article
section: Tutorials
order: 5
description: A decision guide for the standard actions you'll find across components — Create, Update, Upsert, Lookup, Delete, and Raw Request — and when to reach for each.
category: actions-and-triggers
---

Once a trigger has started your flow, actions are the steps that do something with the data — usually writing it into another system, or fetching more data from one. Most components draw from the same small set of actions. This article walks through each one and when to use it.

> This article assumes you've read [Understanding Actions and Triggers](actions-and-triggers-overview) first.

## Start with the Object Type field

Whichever action you pick, the first thing to configure is almost always which kind of record it applies to — a field usually named **Object Type**, **Object**, or **Table**, and populated live from your connected account. Set this first: the rest of the action's fields (which data it expects as input, which fields it returns as output) are generated from whatever you choose here, so they won't be right — or won't appear at all — until it's set.

## Writing data: Create, Update, or Upsert?

| Action | Does | Needs |
|---|---|---|
| **Create Object** | Always makes a new record | Just the field values for the new record |
| **Update Object** | Changes a record that already exists | The record's ID (or another unique identifier), plus the fields to change |
| **Upsert Object** | Creates a new record, *or* updates a matching one if it finds it | A field to match on (an ID, an external ID, or another unique field) |

If you already know for certain whether the record exists — for instance, you just created it two steps earlier in the same flow and have its ID — **Create** or **Update** is the more direct choice. If you don't know, and the flow needs to work correctly either way (a very common case: "sync this contact, whether or not we've seen them before"), **Upsert Object** is built for exactly that, and saves you from having to do a Lookup first just to decide.

## Reading data: Lookup Object vs. Lookup Objects

Components consistently distinguish singular from plural in this pair, so read the title carefully:

* **Lookup Object (By ID)** — fetches exactly one record, by an ID or another value that uniquely identifies it. Use it when you know precisely which record you want.
* **Lookup Objects (plural)** — fetches a list of records matching some criteria (a filter, a search field, sometimes a full query). Use it when you need several records, or when you don't have a unique identifier to search by.

Some components additionally expose a direct query action — for example **Query** or **Bulk Query** on Salesforce, running a SOQL statement — for cases where a simple field-match lookup isn't expressive enough.

## Removing data: Delete Object

**Delete Object** (sometimes **Delete Object By ID**) removes a single record, identified the same way as **Lookup Object** — usually by ID. There's no "bulk delete" equivalent in most components beyond running this once per record; if you need to remove many records, feed a list into this action from an earlier step in the flow.

## When none of the above fits: Make Raw Request

**Make Raw Request** (also seen as **Raw Request**, or **Execute Mutation** on GraphQL-based components) sends a request directly to the connected system's API, exactly as you construct it, and returns the raw response. Nothing about the object model or field mapping is done for you.

Reach for it when:

* you need an API operation the component doesn't expose as a standard action — for example, a specialized endpoint that doesn't map cleanly to create/update/lookup/delete
* you're working with an API the component only partially covers (components typically implement the endpoints most integrators need, not the entire API surface — see the [Integration Component Overview](/getting-started/integration-component#action) for why)
* you already know the target API well and configuring the URL, method, and body directly is faster than working through a generic action

It's more configuration work — you're responsible for the URL, HTTP method, and request body — so treat it as the option you use when a more specific action doesn't cover your case, not as the default.

## Moving large volumes: Bulk actions

A handful of components — Salesforce is the clearest example, with **Bulk Create/Update/Delete/Upsert** and **Bulk Query** — offer bulk variants built for moving large numbers of records efficiently (tens of thousands at once), usually by accepting or producing a CSV file rather than one message per record. If you're processing more than a few hundred records in a single run and the component offers a bulk action, it will generally perform far better than looping the equivalent single-record action.

## Quick decision guide

1. **Writing a record and you're not sure if it exists yet?** Upsert Object.
2. **Writing a record and you're sure whether it exists?** Create Object or Update Object.
3. **Reading exactly one known record?** Lookup Object (By ID).
4. **Reading a list of records matching some criteria?** Lookup Objects.
5. **Removing a record?** Delete Object.
6. **Moving a large batch of records at once, and a Bulk action is available?** Use it instead of the single-record action.
7. **None of the above covers what you need?** Make Raw Request — check the component's documentation page first for the exact input it expects.

## Related links

- [Understanding Actions and Triggers](actions-and-triggers-overview)
- [Choosing a Trigger](choosing-a-trigger)
- [Understanding Data Sample](/guides/data-sample-overview)
- [Mapping Data](/guides/mapping-data)
