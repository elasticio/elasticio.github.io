---
title: General Troubleshooting Guide
description: This document describes common problems that you can encounter and the ways to solve them.
layout: article
section: Troubleshooting
order: 1
category: troubleshooting
---

This document describes common problems that you can encounter and the ways to solve them.

For your convenience, we divided the issues into three levels:

- [Integration logic](#integration-logic)

- [Component runtime](#component-runtime)

- [Platform issues](#platform-issues)

Also, we will provide a few [examples](#examples).

## Integration Logic

The first thing you might want to do when encountering errors is checking the *[Errors](error-retry)* tab on the Dashboard:

![Dashboard](/assets/img/integrator-guide/troubleshoot/Screenshot_1.png)

One of the most common troubles here is system downtime. Some of the integrated systems may just be down, obviously causing an error. Also, you should double check the credentials, because they will cause integration logic failure too. Having checked that, try systems answer structure and [mapping](mapping-data).

Now, the last thing you can do before writing to support is a manual go-through. Basically, you can just follow the Flow step by step and see where it fails to work properly.

## Component Runtime

When it comes to Component problems, everything is quite simple. You can check what is wrong in Component logs. See how it is done [here](managing-flow-errors). There you will find all the information required to debug the code and fix the issue, or contact Component developer for assistance, depending on your Component source code ownership.

## Platform Issues

While the Platform itself is not error-prone, we surely can not predict every possible issue with custom Components and complex Flows. Check [this document](platform-behavior) for some details on the common Platform troubles and the general way to fix them.
Most of platform errors won't lead to message loss, unless the messaging subsystem itself fails. Platform uses RabbitMQ to handle message transport between integration steps.

If you encounter a Platform issue that you can not deal with, feel free to
contact our support service. You can reach them by [email](mailto:{{site.data.tenant.supportEmail}}): {{site.data.tenant.supportEmail}} or via the UI. First, click the *Quick Help* (*?*) icon of the Navigational Menu **(1)**, then click *Help Center* **(2)**:

![Help Center](/assets/img/integrator-guide/troubleshoot/Screenshot_2.png)

A support chat will appear for you to state your issue and get assistance:

![Help Center](/assets/img/integrator-guide/troubleshoot/Screenshot_3.png)

Here is the info the team requires to provide support:

1\. **The title of the issue** - this is not the description of the problem you are facing, but just a title.

2\. **Description of the issue** - please provide as much information as possible. This description **must include the Contract, Workspace and Flow, where the issue happened**, and, optionally, the minimum required steps to reproduce the issue on our side:
- Provide a screenshot where one can easily see the error
- Provide the log file in the text format - not a screenshot of the logs
- Provide the error text - not a screenshot of the text
- Date and time when the error was first observed
- Indicate if you have already checked the provided documentation and the solution was not found or was not clear.

3\. If the issue is not easy to reproduce, please include the **exact timeline** of the events you have observed. In particular include:
- Incident time - first observed
- Error report from the UI or email - please include that as well.

4\. Indicate the **priority of the event** - how soon you need a solution.

5\. Indicate if this is a blocker for your work and the deadline for the solution or the workaround to be in the place.

## Examples

Stay tuned, we will come up with some beneficial examples soon!

## Related links

- [Mapping data](mapping-data)
- [Managing Flow Errors](managing-flow-errors)
- [Platform Behavior](platform-behavior)
