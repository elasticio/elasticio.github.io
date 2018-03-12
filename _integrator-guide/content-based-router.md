---
title: Content-Based Routing
layout: article
section: Integration patterns
order: 1
since: 20180228
---

The **Content-Based Routing** (CBR) is *a message processing pattern* described in
the [Enterprise Integration Patterns](http://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentBasedRouter.html)
book (G. Hohpe and B. Woolf, 2003). The pattern is used to send each message to
the correct recipient based on message content.

For example, a message with customer data or order is received but not all
recipients need to receive the same data, only one or several of them. Data needs
to be routed to the correct recipients based on the content. The illustration
below explains the principle:

![Content-Based Routing principle](/assets/img/integrator-guide/cbr/cbr-principle.png "Content-Based Routing principle")

Image above shows a simple scenario where the Content-Based Routing solves
a logistical problem. A new delivery of sports shoes get routed to the correct
store or section for the sports shoes.

In this article we will discuss how this pattern can be implemented on the
{{site.data.tenant.name}} platform in integration flows.

We assume that you know how to create an integration flow on {{site.data.tenant.name}}
platform since you have followed the steps in [creating your first integration flow](/getting-started/first-flow)
and [creating webhook flow](/getting-started/webhook-flow) tutorials.

## Creating Content-Based ...

To create a content-based router integration pattern let us consider the following
scenario. We have an incoming data about different products and depending on the
sales channel we will route or re-direct the information to the matching store.

The incoming data structure will be received by *Webhook*. It can have the following
structure:

```js
{
  "ProductID": 345664,
  "SKU": "0406654603",
  "Product Name": "Cloak",
  "Description": {
    "Colour": "Black",
    "Width": 30,
    "Height": 20,
    "Depth": 210,
    "Weight": 2
  },
  "Channels": ["amazon", "ebay"],
  "Price": 107.99,
  "Quantity": 1
}
```
We will use the `Channels` parameter to sort the incoming messages. Let us add
the main ingredient of this workflow - the **Content-Based Router** component.

![Adding Content Based Router component](/assets/img/integrator-guide/cbr/create-cbr-1.png "Adding Content Based Router component")

The screenshot above shows how to find and add the Content-Based router component.
Click on *Choose Content-Based Router* button to continue and configure it.

> **Please note** Content-Based Router is an Action component, therefore, it will
> only be available to choose when the trigger is already added to your integration flow.

![Adding a new branch](/assets/img/integrator-guide/cbr/create-cbr-2.png "Adding a new branch")

You can add a new branch either by clicking on the *Continue* button on the
*+Add branch* tab as shown on the above screenshot. We use the chance and rename
the step for the clarity.

![Click to add a branch](/assets/img/integrator-guide/cbr/create-cbr-3.png "Click to add a branch")

The screenshot above shows the step where the branch would be added. Click on
*+Add branch* button to proceed to configure the first branch.

![Configuring the first branch](/assets/img/integrator-guide/cbr/create-cbr-4.png "Configuring the first branch")

Screenshot above shows the configuration step for the branch. Here we can see the
incoming data sample, an input field to write a JSONata expression to be evaluated
and the field for the evaluation result when you scroll-down the page. We can
Collapse the data sample to have a compact view.

![Evaluation result](/assets/img/integrator-guide/cbr/create-cbr-5.png "Evaluation result")

In the top expression field we can write:
```
"amazon" in Channels
```
This JSONAata expression evaluates to a `boolean` value `true` since in the
incoming data  the `Channels: ["amazon", "ebay"]`. Let us add another branch to
encounter for other cases. Click on the *+Add one more branch* button to start
configuring the second branch.

![Adding the second branch](/assets/img/integrator-guide/cbr/create-cbr-6.png "Adding the second branch")

The screenshot above shows the configuration stage for the second branch. Here
we can use a different JSONata expression like:

```
"magento" in Channels
```

This JSONAata expression evaluates to a `boolean` value `false` according to the
incoming data sample that we have used above.

> For Content-Based Router we used the expression which are evaluated to either
> `boolean` value `true` or `false`. Using this we can route the incoming messages
> to the corresponding recipient/branch.

We can proceed and add the components on each branch to make the use case complete.

![Final configuration](/assets/img/integrator-guide/cbr/create-cbr-7.png "Final configuration")

The screenshot shows the completely configured Content-Based Router pattern in
our integration flow. The messages would be routed to *Amazon store* if `Channels`
variable would contain `amazon` value and to *Magento store* when `Channels` variable
would have `magento` value.

Now we can set the flow live and test the Content-Based Router performance.

![CBR in use](/assets/img/integrator-guide/cbr/create-cbr-8.png "CBR in use")

The screenshot above shows the execution result after 6 packages were sent from
which 4 contained `amazon` and 2 `magento`. The packages were routed accordingly.
