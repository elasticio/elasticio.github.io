---
title: Rebound Feature
layout: article
section: Platform Features
order: 14
description: What happens when a message arrives before the data it depends on is ready, and how the platform automatically retries it instead of failing outright.
category: platform-features
---

Integrations between complex systems rarely arrive in a tidy, guaranteed order. If you're syncing both customers and their orders, and each order references a customer, a perfectly reasonable race condition can put an order's data on the wire a few seconds before the matching customer's data lands. Without something to handle that gap, the order sync fails — even though nothing is actually wrong, the two systems just haven't caught up with each other yet. **Rebound** is the platform's built-in answer to that gap.

## How it works

When a component can't process a message because something it depends on isn't in place yet, it can rebound the message instead of failing it outright. The message goes to a special queue, waits, and is re-queued for another attempt. If it's rebounded again, the wait period increases each time. This can repeat for a limited number of attempts — after which, if the dependency still isn't there, the message is rejected and an error is reported as normal.

![Rebound schematics](/assets/img/rebound/rebound-schematics.png "Rebound schematics")

From the outside, this looks like the flow is patiently giving a parallel process — the one syncing customers, in the example above — a little more time to catch up, instead of treating a timing gap as a hard failure.

## Why this matters

This is the platform's practical implementation of **eventual consistency**: rather than requiring a central coordinator to guarantee every dependent piece of data arrives in exact order (expensive, and a single point of failure), Rebound accepts that data may arrive out of order and gives it a bounded number of chances to resolve itself before giving up. It's a deliberate trade-off — you gain resilience against ordering and timing issues between parallel processes, at the cost of some records taking a little longer to settle, and occasionally arriving processed slightly out of order.

You don't need to configure anything to benefit from it — many components rebound automatically when they hit a missing dependency. What's worth knowing is that it exists, so a "delayed but eventually successful" execution in your logs isn't cause for alarm, and so you can deliberately trigger a rebound from your own component logic when you're building one.

## Related links

- [How to cause or emit a Rebound?](/guides/how-to-cause-or-emit-a-rebound) — the full explanation, including the theory behind eventual consistency and how to emit a rebound yourself
- [CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem)
- [Managing Flow Errors](/guides/managing-flow-errors)
