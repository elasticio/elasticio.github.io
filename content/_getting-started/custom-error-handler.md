---
title: Custom Error Handler
layout: article
section: Platform Features
order: 15
description: How to turn a flow's errors into a Slack message, an email, or a spreadsheet row instead of letting them disappear into the execution log.
category: platform-features
---

By default, when a step in your flow fails, that failure is recorded in the flow's execution log — useful if you're actively watching, easy to miss if you're not. The **Custom Error Handler** feature lets you attach an actual action to a flow's errors, so instead of just being logged, they get *sent* somewhere: an email to your team, a row in a tracking spreadsheet, a message in Slack, or anything else a component's action can do.

## How it works

Any component that has an action can be attached as a flow's error handler — there's no separate "error handling" component to learn. From a flow's draft, you add error handling and pick which component and action should run when something in the flow fails; that action then receives the error's details (its name and message, at minimum) as its input, the same way any other action receives input from a previous step.

Two examples cover most use cases:

* **Email** — send yourself or your team the error name and message the moment something breaks, so you find out from your inbox instead of by a customer noticing first.
* **Spreadsheet** — append a row with the error details to a shared sheet, building up a running log you can filter, sort, and share with people who don't have access to the platform itself.

## Setting it up

A few things are worth knowing before you configure one:

* Your flow's draft needs at least one step already configured before you can add error handling to it.
* It generally makes sense to configure error handling last, once the rest of the flow's steps are in place.
* Decide what you actually want to happen with an error *before* you start configuring — "send an email" and "log a spreadsheet row" call for slightly different input mapping.

## Related links

- [Custom Error Handler](/guides/custom-error-handler) — the full walkthrough, with both the Email and Google Spreadsheet examples configured step by step
- [Managing Flow Errors](/guides/managing-flow-errors)
- [Email component](/components/email/)
- [Google Spreadsheet component](/components/gspreadsheet/)
