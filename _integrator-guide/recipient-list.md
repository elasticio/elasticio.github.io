---
title: Sending data to a list of recipients
layout: article
section: Integration patterns
order: 0
since: 20180220
---

In this article we will explain how to send the same data to multiple recipients
using a recipient list on the {{site.data.tenant.name}} platform

> A **Recipient List** is a *message processing pattern* for sending a copy of the same
> message to multiple recipients as it is described in the [Enterprise Integration Patterns](http://www.enterpriseintegrationpatterns.com/patterns/messaging/RecipientList.html)
> book (G. Hohpe and B. Woolf, 2003).

For example, most of the e-mail systems use the recipient list pattern to send 
the copy of each message to a list of pre-defined recipients. For integration
flows, the recipient list can be implemented to get information from one source
(CRM, ERP, etc) and send it to multiple systems for processing.

We will assume that you already know how to create an [integration flow](/getting-started/integration-flow)
on {{site.data.tenant.name}} platform. You have followed the steps in [creating your first integration flow](/getting-started/first-flow)
and [creating webhook flow](/getting-started/webhook-flow) tutorials.

## Creating recipient list

Let us consider the following scenario. The system receives a message contaning
the information about a pet in this JSON:

```js
{
  "name": "Gromit",
  "status": "sold",
  "department": "sales"
}
```

This scenario is almost identical to the [creating a webhook flow](/getting-started/webhook-flow)
tutorial with a slight addition of the `department` parameter. Here we will
use the webhook flow as a basis and develop further.

![Starting with recipient list](/assets/img/integrator-guide/recipient-list/recipient-list-1.png "Starting with recipient list")

The screenshot above shows the exact moment when we have our webhook flow ready.
Hover on the flow diagram on the left and you will notice two blue circles. One
is cross which you can use to add a step between these two components. The second
one is for creating a branch from here. Click on the branch icon.

![New branch](/assets/img/integrator-guide/recipient-list/recipient-list-2.png "New branch")

Screenshot shows the newly created branch to the right from the previous branch.
We are also taken to the component chooser screen to select the first component
for newly created branch. Type *email* and click on *Select E-Mail* button to
configure this step.

![Configuring e-mail component](/assets/img/integrator-guide/recipient-list/recipient-list-3.png "Configuring e-mail component")

The screenshot above shows the configuration fields for the E-Mail component
already filled in with the values. Go ahead and fill-in these 3 required fields:

*  To: `department&"@acme.co"`
*  Subject: `"A pet with name "&name&" was added"`
*  Body: `"Dear "&department&" department,"& "\n" & "A pet named "&name&" was aded to the "&status&" list. Please update your records."`

You are welcome to provide your own values if you feel confident to do so at
this stage. Just remember that `department`, `name` and `status` get their values
from the incoming Webhook component. Click on *Continue* button to go forward.

![Saving the recipient list](/assets/img/integrator-guide/recipient-list/recipient-list-4.png "Saving the recipient list")

We are almost done with the recipient list creation. The screenshot above shows
the current stage where we can either add another branch to this flow or publish
it. For simplicity of explanation let us publish it by clicking on *I'm done!*
button, then give a name to this integration flow and publish it.

![Start the flow](/assets/img/integrator-guide/recipient-list/recipient-list-5.png "Start the flow")

The flow is published. Click on *Start* button and remember to copy the Webhook
URL to send payloads. You can now use a tool of your choice to send a payload
to the copied URL of the Webhook. Here is the example of payload for your
convenience:

```js
{
  "name": "Gromit",
  "status": "sold",
  "department": "sales"
}
```
Let us send a couple of payloads to see the recipient list in action.

![Execution result](/assets/img/integrator-guide/recipient-list/recipient-list-6.png "Execution result")

The screenshot above show the execution result after 3 payloads were sent. The
recipient list sent the same message to two different recipients.
