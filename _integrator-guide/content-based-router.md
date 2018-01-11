---
title: Content-Based Routing
layout: article
section: Integration patterns
order: 1
Since: 20180111
---

This article is about Content-Based Routing principles and the first steps to take to use Content-Based Routing in integration flows.

## What is Content-Based Routing?

Content-Based Routing (CBR) is **a messaging pattern to route each message to the correct recipient based on the message content**, as described in [Enterprise Integration Patterns](http://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentBasedRouter.html) by G. Hohpe and B. Woolf.

The principle of Content-Based Routing is the following. A message with customer data or order gets received but not all recipients need to receive the same data, only one or several of them. Data gets routed or directed to the correct recipients based on the content. The illustration below explains the principle:

![Content based routing](/assets/img/integrator-guide/cbr/cbr-1.png "Content based routing")

Image above shows a simple scenario where the Content-Based Routing solves a logistical problem. A new delivery of sports shoes gets routed to the correct store or section for the sports shoes.

## Contest-Based Router component

To use Content-Based Routing messaging pattern in your integration flow, select the Content-Based Router component during the design.

![Choosing content-based router component](/assets/img/integrator-guide/cbr/cbr-2.png "Choosing content-based router component")

> Please note: Content-Based Router is an Action component, which means it will be available to choose when the trigger is already added to your integration flow.

For demonstration purposes let us assume that we have an incoming message like this:

```js
{
  "style": "sport",
  "colour": "red",
  "shoeSize": "41"
}
```
Let us try to route the message based on the value of one of these parameters. After selecting the Content-Based router, we see this screen:

![Content-based router component configuration](/assets/img/integrator-guide/cbr/cbr-3.png "Content-based router component configuration")

We proceed and add a branch.

![Adding a branch](/assets/img/integrator-guide/cbr/cbr-4.png "Adding a branch")

Here we can see the incoming data sample and a possibility to write an expression. If the expression gets evaluated to a `boolean` value `true`, then and only then the message gets routed to the corresponding recipient/branch.

> Please note: All expressions MUST be evaluated to either `boolean` value `true` or `false`.

The message evaluation gets done using the [JSONata](http://jsonata.org/) (JSON query and transformation language). For more information about JSONata please refer to the [documentation of the JSONata project](http://docs.jsonata.org/).

For this stage, we write a simple expression to select only shoeSize bigger than 41, which is written like this:

```js
$number(shoeSize) > 40
```

The result is `true` since the incoming data sample has shoeSize 41. Let us add another branch:

![Adding the second branch](/assets/img/integrator-guide/cbr/cbr-5.png "Adding the second branch")

For this branch, we will write the following expression:

```js
$number(shoeSize) <=40
```

This expression is `false` for the given incoming data sample. This branch gets used only when the shoeSize is equal to or smaller than 40. Taking this condition into account, we can then add further integration components to the integration flow like this:

![Completing the integration flow](/assets/img/integrator-guide/cbr/cbr-6.png "Completing the integration flow")

**We have here a recipient list with a Content-Based routing**. Depending on the incoming message, the content gets routed to the branch with E-mail or with Node.js Code component. The choice of components on each branch is arbitrary and depends on your use case.

## Content-Based Routing Use cases

Content-Based Routing provides new possibilities to explore variety of integrations scenarios. Here we list only a few of them to show the capability of this messaging pattern and give you ideas where this can be used.

*   **Stock availability query**. In this scenario, an arbitrary ERP is always asked for the stock availability and sends an alert if the stock drops below a certain number.
*   **Person availability query**. In this scenario, an incoming call gets made to a switchboard asking for one particular person. The system queries the internal availability status record. Based on that record system, it either connects with the person or replies with an offer to make an appointment for later.
*   **Delivery prioritisation**. In this scenario, an online shop places an order which gets transferred to packaging and shipping department. Based on the customer's preferences, the shipment gets marked as urgent, normal or slow so that the department can prioritise the work for better efficiency.
