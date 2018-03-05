---
title: Sending data to a list of recipients
layout: article
section: Integration patterns
order: 0
since: 20180220
---

A **Recipient List** is a *message processing pattern* described in the [Enterprise Integration Patterns](http://www.enterpriseintegrationpatterns.com/patterns/messaging/RecipientList.html)
book (G. Hohpe and B. Woolf, 2003). The pattern is used to send a copy of the
same message to the multiple predefined recipients.

In this article we will discuss how this pattern can be implemented in the
{{site.data.tenant.name}} platform in integration flows. You will learn how to
created branches in integration flows.

We will assume that you already know how to create an [integration flow](/getting-started/integration-flow)
on {{site.data.tenant.name}} platform. You have followed the steps in [creating your first integration flow](/getting-started/first-flow)
and [creating webhook flow](/getting-started/webhook-flow) tutorials.

## Creating recipient list

Let us consider the following scenario. The system receives a message containing
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

The screenshot above shows the result of branch creation in a linear flow.
Choose the component in the new branch to receive the data from Webhook. Type
*email* in the search field to find the *E-Mail* component and click on
*Select E-Mail* button to configure this step.

![Configuring e-mail component](/assets/img/integrator-guide/recipient-list/recipient-list-3.png "Configuring e-mail component")

The screenshot above shows the configuration fields for the E-Mail component
already filled in with the values. Go ahead and fill-in these 3 required fields:

*  To: `department & "@acme.co"`
*  Subject: `"A pet with name " & name & " was added"`
*  Body: `"Dear " & department & " department," & "\n" & "A pet named " & name & " was aded to the "& status &" list. Please update your records."`

You are welcome to provide your own values if you feel confident to do so at
this stage. Just remember that the variables `department`, `name` and `status`
get their values from the incoming *Webhook* component. Click on *Continue*
button to go forward.

![Saving the recipient list](/assets/img/integrator-guide/recipient-list/recipient-list-4.png "Saving the recipient list")

We are done with the recipient list creation. Let's publish the flow to see it
in action. Please notice that you could also add more branches to the flow. Now
click on the *I'm done!* button, then give a name to this integration flow and publish it.

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
Let us send a couple of payloads to see the recipient list in action. The
following screenshot shows the details of a flow execution.

![Execution result](/assets/img/integrator-guide/recipient-list/recipient-list-6.png "Execution result")

In the screenshot above you see the details an execution of our flow after 3
requests were sent to the flow's URL. As you can see the *Webhook* component passed
its messages to both branches. This is what a recipient list is for.
