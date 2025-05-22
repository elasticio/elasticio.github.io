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

* [Integration logic](#integration-logic)
* [Component runtime](#component-runtime)
* [Platform issues](#platform-issues)
   * [Supended flows](#suspended-flows)
   * [Stuck messages and slow processing](#stuck-messages-and-slow-processing)
* [Platform emails are not received](#platform-emails-are-not-received)

## Integration Logic

The first thing you might want to do when encountering *[Errors](/developers/error-retry)* is checking the *Dashboard* page. First, click the *Records* on the *Execution Statistics* menu to filter errors **(1)**, then select the day on the *Error graph* to view erroneous executions **(2)**, also you can filter errors directly on the [Executions](executions) page **(3)**.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/troubleshoot/dashboard-errors.png" title="Dashboard errors" %}

One of the most common troubles here is system downtime. Some of the integrated systems may just be down, obviously causing an error. Also, you should double check the credentials, because they will cause integration logic failure too. Having checked that, try systems answer structure and [mapping](mapping-data).

Now, the last thing you can do before writing to support is a manual go-through. Basically, you can just follow the Flow step by step and see where it fails to work properly.

## Component Runtime

When it comes to Component problems, everything is quite simple. You can check what is wrong in Component logs. See how it is done [here](managing-flow-errors). There you will find all the information required to debug the code and fix the issue, or contact Component developer for assistance, depending on your Component source code ownership.

> **Please Note:** If a component crashes due to Out of Memory (OOM), its container-pod will be restarted. The old process will be terminated, and the component will start processing the incoming message again from the beginning. Please check the [Component run out of memory](/guides/platform-behavior.html#component-run-out-of-memory) for more information.

## Platform Issues

While the Platform itself is not error-prone, we surely can not predict every possible issue with custom Components and complex Flows. Check [this document](platform-behavior) for some details on the common Platform troubles and the general way to fix them.
Most of platform errors won't lead to message loss, unless the messaging subsystem itself fails. Platform uses RabbitMQ to handle message transport between integration steps.

If you encounter a Platform issue that you can not deal with, feel free to
contact our support service. You can reach them by email: [{{site.data.tenant.supportEmail}}](mailto:{{site.data.tenant.supportEmail}}) or via the UI. First, click the *Navigational Menu* (*☰*) icon **(1)**, then click *Support chat* **(2)**. A support chat will appear, press *Contact Support* (*▻*) button **(3)** to state your issue and get assistance.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/troubleshoot/contact-support-service.png" title="Contact support service" %}

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

## Suspended flows

If you find that your flow is in the [suspended](/getting-started/integration-flow.html#flow-states) state, it's important to understand what exactly caused this behavior:
- A user may have accidentally clicked the *Suspend* instead of *Stop* button, or forgotten and left the flow suspended, causing messages to accumulate in the flow's queue.
- The flow may also be suspended due to the scheduled maintenance or in the event of an incident. 
- In rare situations, the platform safeguard can suspend your flow. Please check the [Platform's behavior](/guides/platform-behavior.html#flow-suspension) for more information.

To start the flow, you can click the *Resume* button or contact [support](mailto:{{site.data.tenant.supportEmail}}), ensuring messages are processed. If messages in your flow's queue are not important, you can click the *Stop* button, in this case, accumulated messages will be lost.

> **Please Note:** For some webhook, polling or subscription triggers, suspending the flow will stop receiving messages. The resumed flow will begin receiving messages once it is triggered and a subscription is created according to the component limitation.

## Stuck messages and slow processing

Sometimes you may find messages in the queues that seem to have stopped processing. In order to refresh the [dashboard](/assets/img/integrator-guide/troubleshoot/dashboard-errors.png) values, reload the page. 

First, you need to check if these messages are stuck or if they are being processed very slowly. If this turns out to be the slow processing, you can consider:

- Checking the platfrom [Default Limits](/guides/platform-behavior.html#default-limits). 
- Optimising your custom component's or flow's logic.
- Adding [Parallel Processing](/guides/managing-flows.html#parallel-processing) to the slow processing steps. 

If you are unsure of the reasons for such behavior, contact [support](mailto:{{site.data.tenant.supportEmail}}).

> **Please Note:** 
> * If a single message processing takes longer than 30 minutes to complete, the container-pod will continue running, but a new parallel process will be initiated. In this timeout scenario, the old process will continue working, potentially causing a duplication. A timeout could occur if the flow logic is not optimised and exceeds platform limits. Please contact [support](mailto:{{site.data.tenant.supportEmail}}) for assistance.
> * During a one-time ordinary flow execution, if no messages are present on the steps and a single component demands a longer data retrieval period to emit the next message before proceeding, the flow container-pod will terminate in accordance with the [scheduled execution timeout](/releases/24/45.html#extending-scheduled_execution_timeout-to-720-seconds). For this case, consider setting up the [Editable delay for container shutdown in Ordinary Flows](/guides/managing-flows.html#editable-delay-for-container-shutdown-in-ordinary-flows).

If messages on a certain step queue are not proceeding, you can:
- Confirm if the flow is not in the [suspended](#suspended-flows) state. 
- Examine last timestamps on the [Logs](/getting-started/logs-page) page to verify that the flow is not producing any new logs on the stuck step.
- Check if there are any containers present on the [Containers](/guides/containers) page for this step, making sure that the container-pod was successfully started and is running.

Gathering this information and providing it to support will assist us in promptly identifying the reason behind the stuck messages, and taking the necessary actions to resume processing.

## Platform emails are not received

If you are not receiving platform emails (e.g. contract or workspace invitations, or error notifications) in your mailbox, there could be many reasons causing this issue.

1. Sometimes emails can be mistakenly marked as spam and filtered into the spam/junk folder. Make sure to check this folder so that platform emails are not being missed.

2. Your inbox can be full and can't accept new messages, or it has specific rules in place that automatically move or delete emails. Review it to avoid such situations.

3. Platform emails could also be blocked by your email provider's settings or firewall. Make sure that emails from our platform sender or domain are not being filtered out or blocked.

4. If you have a backup mail address, try editing your email on the [User profile](/getting-started/user-profile-information) page and check if emails arrive in your backup inbox. This will help you determine if the issue is only with your primary email address before contacting support.

5. As a consequence, your user email can be placed on the platform's email API service rejection denylist due to a soft-bounce or hard-bounce. If none of the previous solutions helped you, contact [support](mailto:{{site.data.tenant.supportEmail}}).

> **Please Note:** Active platform users should automatically receive newsletters about the status of platform services and incident reports. However, if you are not receiving it or if you have other colleagues whom you would like to add, please [contact us](/admin/reporting-issue.html#how-to-contact-us).

## Related links

- [Mapping data](mapping-data)
- [Managing Flow Errors](managing-flow-errors)
- [Platform Behavior](platform-behavior)