---
title: Platform Behavior
description: This document describes the current safeguards, imposed limits and what can happen when your integration flows reach these limits.
layout: article
section: Troubleshooting
order: 1
category: troubleshooting
---

## Introduction

Every running system has limitation and safeguards in place to prevent abuse and
ensure stability. Your own computer has it, your email service has it. Our platform
is not an exception.

We have imposed limits and safeguards in place to ensure stability of the system
for every company, every user and every integration flow. If one of your integration
flows is misbehaving for any reason, it should not affect your other integration
flows, your entire operations or other users in the system.

In this document we provide information about the current safeguards, imposed limits
and what can happen when your integration flows reach these limits. We describe
common errors connected to these limits and the ways to prevent or address them.


## Default Limits

The table below lists {{site.data.tenant.name}} platform parameters which you
can configure to impose limits along with their default values.

{% include table3col-30-55-15.html items="msgqueue, sizequeue, outgoingsize, errorret, sampleret, limitworkspace" file="limits" caption="Default limits imposed in the platform" headers="Limit Name, Description, Value" %}

Platform has set limitations on accepting, processing and exporting attachments.
Please check the [attachment limitations page](/references/attachments-limitations) for more details.

## Messaging Queue Limits

The messages in your integration flow steps go through the queues so that the
platform can process them in their turns. Each step in your active integration
flow has a dedicated messaging queue. The platform imposes both **Queue message number**
and **Queue message size** limits to each of these queues.

> **Please Note** : These limits ensure the stability of processing queue
> engine - the RabbitMQ. We can increase these limits for the whole system (not recommended) or for
> individual flows (recommended) if your use-case requires this. Please get in touch with us to
> discuss your use-case.

When the step queues in your integration flow reach to any of these two limits,
platform will stop processing messages until the message number or combined queue
size drops from the set limit according to Dynamic Flow Control mechanism. This
ensures the stability of RabbitMQ from one side but it also ensures that no messages
get lost.

To take advantage of this mechanism your component must use the Sailor version
supporting Dynamic Flow Control mechanism. In particular you must build your
Node.js component with Sailor version `2.6.7+` or the Java component with Sailor
version `3.1.0+`.

In case when even one of your integration flow steps uses a component with
older Sailor version, the following will happen:

*   Any queue overflow will trigger the platform to [suspend your integration flow](#flow-suspension).
*   Any new messages getting to already overflowing queues can get lost.

## Flow Suspension

In some rare cases platform can suspend your flow. This safeguard ensures the stability
of the system in edge cases when all other safeguards fail. The suspension is more
of a pause, than a stop. You will receive an email informing you about the flow suspension.
You can then resume your flow or stop it for further investigation.

## Flows Stopped in Limited Workspaces

In [limited workspaces](/getting-started/contracts-and-workspaces.html), Flows
are stopped instead of being suspended. A stopped Flow doesn't save any non-processed
messages - everything is dropped. You can stop a Flow manually by pressing the Stop
button. Please, keep in mind that stopping a Flow drops all unprocessed messages
at the moment of stopping.

## Common Errors

In general, the Platform is not error-prone, but there are a few issues you may
encounter. The most common are:

- [Component failed to start](#component-failed-to-start)

- [Component run out of memory and terminated](#component-run-out-of-memory)

- [Syntax errors, human factor](#syntax-errors)

### Component Failed to Start

The reasons for this error may differ. Though the messages still stay safe in intermediate queue, it is better to create a ticket to the platform support as described [here](general-troubleshooting-guide).

### Component Run Out of Memory

This error appears if the Component exceeds the set memory limit, which is `256 MB` by default:

![Component Run Out of Memory](/assets/img/integrator-guide/behavior/Screenshot_1.png)

You can check Component logs the same way as shown [here](managing-flow-errors), to see the exit code for details:

![Exit code](/assets/img/integrator-guide/behavior/Screenshot_2.png)

In this case, the message can be lost. If you are aware that this scenario is possible in your case, then you can set memory limit to a custom value, more suitable for you. You can also ask Components repository owner to do this.

### Syntax Errors

This is not a Platform error per se, but it happens frequently if data is not handled correctly. And your Flows won't suffer from this issue. Most likely, you will still see the problem in Component logs and be able to fix it. Otherwise, escalate the issue to the platform vendor via support. You can find info on applying for support [here](general-troubleshooting-guide).

## Related links

- [Contracts and Workspaces](/getting-started/contracts-and-workspaces.html)
- [Limitations on Attachments](/references/attachments-limitations)
- [General Troubleshooting Guide](general-troubleshooting-guide)
- [Managing Flow Errors](managing-flow-errors)
