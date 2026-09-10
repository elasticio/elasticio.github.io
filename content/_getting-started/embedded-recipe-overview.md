---
title: Embedded Recipe
layout: article
section: Platform Features
order: 19
description: How to let an end user activate a pre-built integration from a link or an iframe in your own product, without ever seeing the platform itself.
category: platform-features
---

A [Recipe](recipes) is a pre-configured, reusable flow template — the fast way to give someone a working integration without them building one from scratch. **Embedded Recipe** takes that a step further: it lets you hand a recipe to an end user who shouldn't (or doesn't want to) manage the platform directly at all, by generating a link, or an iframe, that walks them straight to activating it under their own account.

## Who this is for

This is aimed squarely at the case where you're offering integrations *through* your own product — a SaaS app that wants to let its customers connect their own Salesforce or Shopify account, say — rather than at internal use where your own team is comfortable working in the platform's UI directly. The end user authenticates and activates the recipe; nothing about the underlying platform is exposed to them beyond that.

## How it's set up

Setting one up is done through the API, from your own backend, ahead of handing the link to the user:

1. Create a user via the API, and add them as a member of the relevant contract and workspace.
2. Scope that user's permissions down to only what's needed to activate the recipe — nothing more.
3. Generate a one-time token for the user, which is what authenticates them without a normal login.
4. Build the activation URL from your platform domain, the recipe's ID, and that one-time token.

That URL can be handed to the user directly, or embedded in an `<iframe>` inside your own product's UI, so the activation happens without the user ever leaving your app. Once the user completes activation, the platform posts a message back to the parent window with the resulting recipe deployment's ID — so your own application can record that the integration is now live, without polling for it.

## Related links

- [Embedded Recipe](/guides/embedded-recipe) — the full setup reference, including the exact URL format and API endpoints
- [Recipes Feature](recipes)
- [Recipe Deployment](/guides/recipe-deployment)
- [Creating and managing Recipes](/guides/creating-recipes)
