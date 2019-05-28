---
title: Content-Based Routing
layout: article
section: Integration patterns
order: 1
since: 20180228
---

The **Content-Based Router** (CBR) is *a message processing pattern* described in
the [Enterprise Integration Patterns](http://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentBasedRouter.html)
book (G. Hohpe and B. Woolf, 2003). We can use this pattern to send each message to
the correct recipient based on the message content.

For example, imagine you have two stores where you are selling shoes. Each store
specialises on a particular shoe type: sport shoes, lady's shoes, etc. You also
have suppliers who need to import their delivery data through a web API. Then we
can redirect the delivery data to the proper store depending on the shoe type.
This following diagram illustrates this example.

![Content-Based Router principle](/assets/img/integrator-guide/cbr/cbr-principle.png "Content-Based Router principle")

In this article we will show how to build this pattern on the {{site.data.tenant.name}} platform.

## Implementing the Content-Based Router pattern

To implement a Content-Based Router integration pattern let us build the above
presented scenario. Imagine you are selling sport shoes on Amazon and the lady's
shoes on Magento shop. We will build a webhook flow that is receiving product
data from an ERP system. These data will be passed to the **Content-Based Router**
component which is configured with a set of criteria or filters. These filters
are used to decide whether the product is routed to Amazon API or Magento API.

We assume that you know how to create an integration flow on {{site.data.tenant.name}}
platform since you have followed the steps in [creating your first integration flow](/getting-started/first-flow)
and [creating webhook flow](/getting-started/webhook-flow) tutorials.


The *Webhook* receives an incoming data in the following structure:

```json
{
  "ProductID": 345664,
  "SKU": "0406654603",
  "Product Name": "Sport Shoes XL Tracker",
  "Price": 107.99,
  "Quantity": 50,
  "Colour": "green",
  "Type": "shoes",
  "Category": "sport",
  "Size": 42,
  "Weight": 0.5
}
```

The JSON object above demonstrates an example of a *Webhook* payload sent by
your ERP system.

Let us add the main ingredient of this workflow - the **Content-Based Router**
component.

As you can see below, to find the Content-Based Router component type
the word `content` in the component search field. Once found, choose it and click
on the *Choose Content-Based Router* button to continue with configuration.

![Adding Content Based Router component](/assets/img/integrator-guide/cbr/create-cbr-1.png "Adding Content Based Router component")

> **Note** Content-Based Router is an Action component, it will be available to
> choose after you add the trigger component to your integration flow.

Now that the component is chosen, let's configure it as shown in the following
screenshot.

![Adding a new branch](/assets/img/integrator-guide/cbr/create-cbr-2.png "Adding a new branch")

As you can see in the above screenshot you need to add branches in the next step.
These branches are used to route messages to different recipients, your stores
in this example. To add a branch either click on the *+Add branch* tab or on
the *Continue* button.

> **Note** The Content-Based Router component with a single branch acts as a
> simple filter.

![Click to add a branch](/assets/img/integrator-guide/cbr/create-cbr-3.png "Click to add a branch")

The screenshot above demonstrates the stage where we add the first branch. Click on
*+Add branch* button to continue.

![Configuring the first branch](/assets/img/integrator-guide/cbr/create-cbr-4.png "Configuring the first branch")

Screenshot above shows the configuration step for this branch. Here we can see the
incoming data sample and an input field to write a JSONata expression. The result
of JSONata expression evaluation gets displayed below the data sample field.
Scroll-down the page or click on *Collapse* to hide the data sample and see the
evaluation result field.

![Evaluation result](/assets/img/integrator-guide/cbr/create-cbr-5.png "Evaluation result")

In the top expression field we write:
```
Category = "sport"
```
This JSONata expression evaluates to a `boolean` value `true` since in the
incoming data `Category` has a value of `"sport"`. Let us
add another branch to encounter for the other case. Click on the
*+Add one more branch* button to start configuring the second branch.

![Adding the second branch](/assets/img/integrator-guide/cbr/create-cbr-6.png "Adding the second branch")

The screenshot above shows the configuration stage for a second branch. Here
we use a different JSONata expression like:

```
Category = "high-heeled"
```

This JSONata expression evaluates to a `boolean` value `false` according to the
incoming data sample that we have used above.

> **Note** The expression of the **Content-Based Router** component must be
> valid [JSONata](http://jsonata.org/) expressions which evaluate to `true` or
> `false`. If the evaluation of a message results in true, the
> dedicated branch will receive the message.

We can proceed and add the components on each branch to make this scenario complete.

![Final configuration](/assets/img/integrator-guide/cbr/create-cbr-7.png "Final configuration")

The screenshot shows the configured Content-Based Router pattern in our integration
flow. If the product information contains *sport* shoes then it is routed to
the *Amazon store* and if it contains *high-heeled* shoes then to the *Magento store*.

Now we can set the flow live and test the scenario based on the
Content-Based Router pattern.

![Content-Based Router in use](/assets/img/integrator-guide/cbr/create-cbr-8.png "Content-Based Router in use")

The screenshot above shows the execution result after 6 entries of the product
information. From those 6 the 4 contained *sport* shoes and 2 had
*high-heeled* shoes. The messages were routed accordingly.
