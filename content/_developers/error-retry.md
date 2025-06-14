---
title: Error Retry and Retention Policy
description: Error retry is a feature which gives a possibility to try to process the failed messages in the integration Flows.
layout: article
section: Component Troubleshooting
order: 2
redirect_from:
  - /guides/error-retry.html
---

## Description

This document describes Error Retry, a feature which gives a possibility to try to process the failed messages in the integration Flows. Additionally, the document provides information on the Platform [Error Retention policy](#error-retention-policy).

## Use case of Retry

Any complex integration flow can fail due to unpredictable problems like network
disruption between the platform and the third party source such as your CRM or ERP.
If this disruption occurs during the API request there is a high chance the platform
would not process the data and report an error like timeout or remote host is unreachable.

In another example with reading the data from an external database every day. Now if
the database is under maintenance or offline your flow step responsible for
connecting and downloading the data would fail. This would disrupt your integration flow.

To recover from this situation might seem tricky at first, but, the platform
features are here to help.

As a good sign we suggest using the [snapshots](/guides/using-snapshots) to save the state of
the step. Configure the [rebound](/getting-started/rebound) to enable automatic retry
of messages in case of failures. And the last not least, use the retry.


## Reprocess and Retry

When the platform fails to connect with a third party resource the request or the
intended data would still be in the processing queue. If you have configured the
[rebound](/getting-started/rebound) the system would retry it until it goes through.
Otherwise, if the connectivity is not back in couple of hours the system would
report `Rebound limit exceeded` and would stop trying. The platform would stop
trying after 10 times.

When the automatic retry fails to deliver due to the time constrains you can
use the manual retry of the errors. Here is how it works.

Let's start a generic integration Flow and cause an error. It will
be seen here in the logs. Then we run it, see errors, and go to check the runlog
to click *Retry* and see what happens:

![Retry feature in action](/assets/img/integrator-guide/instant-error-management/edit-retry-error.gif)

When you press Retry the platform will then try to run the erroneous process again.
The error will be removed from the execution page.

> **Please Note**: the integration flow must be active for Retry feature. When the flow is inactive the Retry button provides a clear hint stating that the flow needs to be active for the retry function to work. 

{% include img.html max-width="100%" url="/assets/img/integrator-guide/instant-error-management/retry.png" title="Retry" %}

Before you proceed to press Retry button try to assess the situation:

*   Have you done the troubleshooting as to why the error appeared in the first place?
*   Have you checked with the third party resource if it is up and running?
*   Are you sure a simple retry would solve the problem?

If answer to any of these questions is no then it is highly possible you would get
an error again after the Retry. You may have noticed the *Edit* button that allows you to edit the message, which resulted in the error. This is the quick way to fix the error, if the message really caused it:

![Edit message before retry](/assets/img/integrator-guide/instant-error-management/edit-error.gif)

* If the original message was lightweight, it will be updated in storage with a new body. 
* If the original message was NOT lightweight and the new message body is larger than 1 MB, a new lightweight message will be created and sent.

> **Please Note**: Changing/deleting/adding lightweight message header (x-ipaas-object-storage-id) is forbidden.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/instant-error-management/message-header.png" title="Lightweight message header" %}

Passthrough and input message are separated on UI, and passthrough can not be edited.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/instant-error-management/passthrought-edit.png" title="Passthrough can not be edited" %}

> **Please Note**: If the message is larger than 10 MB, the user cannot edit it due to user interface limitations, but can retry the message.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/instant-error-management/message-too-large.png" title="Error retention" %}

## Retry-all flow errors

During some exceptional circumstances, you might get too many errors in your flow
execution step to [retry it one-by-one](#reprocess-and-retry). To help
process these errors in one go we introduce a new option **Retry All Errors** which
will appear if more than one error happens in this step during an execution.

![Retry all button](/assets/img/integrator-guide/instant-error-management/retry-all-errors.png)

When clicked, our system will ask you to confirm your action by displaying you
the following popup message:

> **Please Note:** the error messages will be deleted from this Runlog Record. Retry results will arrive to this Runlog record.

{% include img.html max-width="60%" url="/assets/img/integrator-guide/instant-error-management/retry-all-errors-confirmation.png" title="Retry all confirmation" %}

You can cancel and return to your screen with errors or confirm and retry all
errors, in which case our system will retry all retriable errors. This feature
has a limitation: **you can't edit messages before retrying while using retry all errors**.

> **Please Note**: Only messages in the single step of particular executions will be retried. It is
> not possible to retry errors from all steps or from all executions of the flow. For that you still
> need to open each step in particular execution separately and press retry all button.

## Error Retention policy

There is a limit that defines the maximum number of errors we list for a Flow.
If the limit is reached, no new errors are listed for the given Flow anymore.
This limit will protect you from the "chatterbox" Flows that tend to spam too much.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/instant-error-management/error-retention-limit.png" title="Error retention limit." %}

The default limit is `1000` records per Flow. If the amount of errors per
Flow gets higher than `1000` value, the Platform removes old error records and
shows a corresponding notification in the UI.

> **Please Note**: ALL lightweight messages can be retried only for the TTL of the storage (24 hours by default). For NON lightweight messages please check the [Input messages TTL](/guides/platform-behavior.html#default-limits). When TTL is expired and message is removed from the storage, UI will show warning to user that the message was deleted and retry is impossible.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/instant-error-management/error-retry-ttl.png" title="Error retry TTL" %}

## Retry from step

With this feature you can select any previous step in the flow and start retrying from that moment. The rerunning flow process starts from the selected step. Therefore, the messages on the steps will be doubled (another message will be added) and only on the step with an error - the behavior will be as before. The error will disappear - and either a valid message or an error will appear again.

There are a few points you should be aware of before using this feature:

* To retry your flow must be active
* If passthrought is disabled in a step, you will not be able to retry from previous steps. You can see this in the following [example](/assets/img/integrator-guide/instant-error-management/example-flow.png) with step *10. E-Mail*, where step *6. REST API V2* has passthrough disabled:

{% include img.html max-width="60%" url="/assets/img/integrator-guide/instant-error-management/passthrought-disabled.png" title="Passthrought disabled" %}

After you have started the flow and found an error, you can choose a step from which you want retry. You can select any step other than the trigger.

We'll take a closer look at this function using this flow as an example. First, click on the place where the error is indicated:

{% include img.html max-width="60%" url="/assets/img/integrator-guide/instant-error-management/example-flow.png" title="Example flow" %}

Here you can see the description of the error in your flow and select the step in which you want to correct the message:

{% include img.html max-width="100%" url="/assets/img/integrator-guide/instant-error-management/retry-from-step.png" title="Retry from step" %}

In our case, the mistake was the wrong email address, which we can correct in the chosen step by editing message. The second step produce a message which property was mapped into `to:` field of email-component, which means we can change the message in one of the following steps - for example, in the **Splitter**:

{% include img.html max-width="100%" url="/assets/img/integrator-guide/instant-error-management/edit-message.png" title="Edit message" %}

After you edit corresponding message to have a correct output, click on the **Retry Message** and the flow will start from step *Spliter* and you will see the next picture:

{% include img.html max-width="100%" url="/assets/img/integrator-guide/instant-error-management/retry-message.png" title="Retry message" %}

After you have fixed the error and retry the flow, you can see how the message goes through the entire flow again:

{% include img.html max-width="100%" url="/assets/img/integrator-guide/instant-error-management/after-retry.png" title="After Retry" %}