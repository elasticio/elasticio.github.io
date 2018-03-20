---
title: Content-Based Routing
layout: article
section: Integration patterns
order: 1
since: 20180228
---

The **Content-Based Router** (CBR) is *a message processing pattern* described in
the [Enterprise Integration Patterns](http://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentBasedRouter.html)
book (G. Hohpe and B. Woolf, 2003). The pattern is used to send each message to
the correct recipient based on message content.

For example, imagine you have two stores where you are selling shoes. Each store
specialises on a particular shoe type: sport shoes, lady's shoes, etc. You also
have multiple suppliers who need to import their delivery data through a web API.
However, the delivery data should be redirected to the proper store depending on
the shoe type. This example is illustrated in the following diagram.

![Content-Based Router principle](/assets/img/integrator-guide/cbr/cbr-principle.png "Content-Based Router principle")

In this article we will discuss how this pattern can be implemented on the
{{site.data.tenant.name}} platform in integration flows.

We assume that you know how to create an integration flow on {{site.data.tenant.name}}
platform since you have followed the steps in [creating your first integration flow](/getting-started/first-flow)
and [creating webhook flow](/getting-started/webhook-flow) tutorials.

## Implementing the Content-Based Router pattern

To implement a content-based router integration pattern let us build the above
presented scenario. We have an incoming data about different products and
depending on the type of product we will route or re-direct the information to
the matching marketplace.

The incoming data structure will be received by *Webhook*. It can have the following
structure:

```js
{
  "ProductID": 345664,
  "SKU": "0406654603",
  "Product Name": "Sport Shoes XL Tracker",
  "Description": {
    "Colour": "green",
    "Type": "shoes",
    "Design": "sport",
    "Size": 42,
    "Weight": 0.5
  },
  "Price": 107.99,
  "Quantity": 50
}
```

The JSON object above demonstrates an example of a *webhook* payload sent by
your ERP system. We will used 3 parameters in `Description` to store the product
information into the matching marketplace.

Let us add the main ingredient of this workflow - the **Content-Based Router**
component.

![Adding Content Based Router component](/assets/img/integrator-guide/cbr/create-cbr-1.png "Adding Content Based Router component")

The screenshot above shows how to find and add the Content-Based router component.
Click on *Choose Content-Based Router* button to continue and configure it.

> **Note** Content-Based Router is an Action component, therefore, it will
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
(Description.Design & " " & Description.Type) = "sport shoes"
and Description.Colour = "green"
```
This JSONAata expression evaluates to a `boolean` value `true` since in the
incoming data  the `Description.Design` has a vlue of `"sport"`,
`Description.Type` is `"shoes"` and the `Description.Colour` is `"green"`. Let us
add another branch to encounter for the other case. Click on the
*+Add one more branch* button to start configuring the second branch.

![Adding the second branch](/assets/img/integrator-guide/cbr/create-cbr-6.png "Adding the second branch")

The screenshot above shows the configuration stage for the second branch. Here
we can use a different JSONata expression like:

```
(Description.Design & " " & Description.Type) = "high-heeled shoes"
and Description.Colour = "red"
```

This JSONAata expression evaluates to a `boolean` value `false` according to the
incoming data sample that we have used above.

> **Note** For Content-Based Router we used the expression which are evaluated to either
> `boolean` value `true` or `false`. Using this we can route the incoming messages
> to the corresponding recipient/branch.

We can proceed and add the components on each branch to make the use case complete.

![Final configuration](/assets/img/integrator-guide/cbr/create-cbr-7.png "Final configuration")

The screenshot shows the configured Content-Based Router pattern in
our integration flow. The messages would be routed to *Amazon store* if the
*green sport shoes* are added and to *Magento store* when the
*red high-heeled shoes* are added instead.

Now we can set the flow live and test the Content-Based Router performance.

![CBR in use](/assets/img/integrator-guide/cbr/create-cbr-8.png "CBR in use")

The screenshot above shows the execution result after 6 packages were sent from
which 4 were *green sport shoes* and 2 were *red high-heeled shoes*. The packages
were routed accordingly.
