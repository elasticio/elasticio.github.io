---
title: Passthrough Feature
description: This document introduces the passthrough feature, explains why would you use it, and gives a real-life example on how to use it.
layout: article
section: Integration patterns
order: 5
category: integration-patterns
redirect_from:
  - /getting-started/passthrough-feature.html
---

This document introduces the [passthrough feature](#what-is-passthrough),
explains [why would you use it](#passthrough-usage), and gives a
[real-life example](#real-life-example) on how to use it.

## What is passthrough

Most components in an [integration flow](integration-flow) receive, process and
send data. Incoming data typically differs from the outgoing one, so the
last step may receive a message without even a small trace of the initial data.
If you want a component to map data other than what it receives from the previous
step, you can use the passthrough feature.

> Passthrough enables the data re-usability along the integration flow; meaning we
> can re-use and re-mapp again - **nothing is lost**. This feature enables mapping
> of the data from non-adjacent steps. Thanks to this, you can use the passthrough
> feature for a content enrichment purposes.

With this feature enabled you can *pass-it-through* the data from the
component not only to the next step but to the step after that and thereafter. This
means you can use and reuse the data of any particular step along with the
integration flow several times.

Basically, passthrough maintains copies of all messages per step in the flow, and
adds them to each following message. This way, data received by *Step 4* will
contain the message sent by *Step 3*, and a special section with the messages
received by *Step 1*, *Step 2* and *Step 3*. Here is how it looks schematically:

![Passthrough schematics](/assets/img/getting-started/passthrough/passthrough-schematics.png)

The schematics above shows the passthrough feature in the flow. Without this
feature the *Step 4* reads and processes the data sent by *Step 3*, but you can
configure it to choose a messages from any other previous steps, if required.

## Passthrough Usage

An ability to access the data on different steps of the integration flow and
combine them into one outgoing message is an important advantage for many
integration use-cases. Here are some scenarios when the passthrough feature makes
a significant difference.

*   As an integrator you want to retrieve the data from more than one external resource and combine it into one outgoing message to store it in your desired storage. Without the passthrough feature you would need to retrieve the data separately from different resources, synchronize them and store in the storage. For this you would definitely need to use more than one integration flow and make sure not overwrite it every time.
*   As an integrator you would like to retrieve the data at least two times from the third party resource due to limitations of the third party API abilities. Without the passthrough you would need to use two different integration flows and somehow synchronize the information between them.

Let us have a look into an  beginner's example on how the passthrough feature works.

## Beginner's Example

In this example, we want to update the status of a pet named Gromit in the pet store. We need to send information about changing the status of the pet to the boss’s mail using the E-mail component. To accomplish the task, we created this flow:

![Passthrough flow](/assets/img/getting-started/passthrough/passthrough-flow.png)

We use the Webhook component in order to send data to the Petstore component.

![Webhook step](/assets/img/getting-started/passthrough/webhook_step.png)

Paste the following `JSON` in the input field:

```
{
"petname": "Gromit",
"petstatus": "sold",
"email": "boss.mail@mail.com"
}
```

Then we have to configure Petstore input using data from Webhook component:

![Petstore step](/assets/img/getting-started/passthrough/petstore_step.png)

Finally, we move on to the E-Mail component where we need to use the passthrough function. While configuring E-Mail component input we must fill in the "To" field using data from the Webhook component. At this moment we use the passthrough that allows us to use data not only from the previous, but also from earlier steps (Webhook in our case):

![E-mail step](/assets/img/getting-started/passthrough/email_step.png)

## Real-life Example

In this use case, we want to transfer Amazon MWS Orders into Salesforce Orders.
We aim to have all information about the orders found in Amazon MWS synchronized in
the Salesforce.

This case is interesting since Amazon MWS API gives answers in some certain ways:

*   When we query the list of orders (`listOrders`) from Amazon MWS we get information about orders such as IDs, the total amount of orders, shipping information, etc. But this answer does not include information about specific items included in those orders (`listOrderItems`).
*   To get items (`listOrderItems`) we need to store the order IDs and then use them to query the items belonging to those orders.
*   Then we need to combine both: orders (`listOrders`) and items (`listOrderItems`) together to store this information into Salesforce. But, without having the order IDs, we can not get item IDs.

We can address the above-presented scenario in two ways:
1.  We use multiple flows (the sequential mechanism) and external ID to pass the information gradually or
2.  Use the passthrough feature to merge all the information on-the-fly.

### Sequential mechanism

In the imaginary unlucky case when we didn't have passthrough, we would have to
create a second flow for second query. There may be problems of synchronization
between the two flows, which we can try to solve with rebounds. The system tries to
get the external IDs of those orders before asking for items. If the IDs are still
not there it will try again later and later. However, there is always a limit on
how many times the system can try and that many connections can fail if one end
of integration reports a timeout.

**We need a solution which would not fail and would do it in one go!**
Solution to this dilemma is provided by the passthrough feature.

### Using the passthrough

In this use case, we want to transfer Orders from Google Spreadsheets into Salesforce Orders. We aim to have all information about the orders found in Spreadsheet synchronized in the Salesforce. In fact, it makes absolutely no difference whether Spreadsheet will be the source or it will be a database or some CRM component. The Spreadsheet example would just be more visual, because we can see the tables themselves and the relationship between them.

Since within any database, the relationship between Orders and Items are formed by one-to-many or many-to-many relations, services form an additional table OrderItems from which you can understand which order refers to Item.
As an example, we will use two tables for Orders and for OrderItems:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dfed2ded-06e4-498f-a87b-82606167a16d/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f585c304-f570-47c7-99c5-30c38ce411b4/Untitled.png)

- When we query the list of orders from Orders sheet we get information about orders such as IDs, the Update and Index dates of orders, descriptions, etc. But this answer does not include information about specific items included in those orders.
- To get items (listOrderItems) we need to store the order IDs and then use them to query the items belonging to those orders.
- Then we need to combine both: Orders and items (OrderItems) together to store this information into Salesforce. But, without having the order IDs, we can not get item IDs.
We can address the above-presented scenario in two ways:
1. We use multiple flows (the sequential mechanism) and external ID to pass the information gradually or
2. Use the passthrough feature to merge all the information on-the-fly.

### ****Sequential mechanism****

In the imaginary unlucky case when we didn’t have passthrough, we would have to create a second flow for second query. There may be problems of synchronization between the two flows, which we can try to solve with rebounds. The system tries to get the external IDs of those orders before asking for items. If the IDs are still not there it will try again later and later. However, there is always a limit on how many times the system can try and that many connections can fail if one end of integration reports a timeout.

**We need a solution which would not fail and would do it in one go!** Solution to this dilemma is provided by the passthrough feature.

### **Using the passthrough**

Using the passthrough features we can get the list of Orders and list of the OrderItems in two separate steps. Let’s take a look at our flow:

{% include img.html max-width="40%" url="/assets/img/getting-started/passthrough/entire-flow.png" title="Entige flow" %}

### Step 1

Simple trigger with a preset timer that will start the flow.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d58037d8-a682-4622-a510-b4e600033bf4/Untitled.png)

### Step 2

Google Spreadsheet component that accesses the Orders table and retrieves data for all Orders.

> With the function Emit Behaviour - Emit Individually, we have the ability to immediately divide the received array of Orders into individual messages and work with each message individually in the next step
>

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b71505ea-f2c8-444c-9210-739a64eedbf6/Untitled.png)

### Step 3

Google spreadsheet component that accesses the OrderItems and retrieves data for all Orders.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e5c4ab49-c2fe-40ed-be10-acec48202a2a/Untitled.png)

### Step 4

Filter component that allows you to match Order ID's from the Orders table with Order ID's from the OrderItems table.

> If you use DB instead of Google Spreadsheets, you won't need filtering step, because there is possibility to query records with regard to ID at once.
>

> In this step, we already use the passthrough function to match the data from the tables
>

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e50d58d3-e30b-496f-9df9-ca3871f8f799/Untitled.png)

### Step 5

Retrieves orders from Step 2 via passthrough by update date

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9872c39d-74bf-45cc-b126-40ef6a2cb7fa/Untitled.png)

### Step 6

Retrieves order items from Step 3 via passthrough, adding data on scheduled delivery date, shipping date, item price and other necessary parameters

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4dad2c1c-f215-4b87-933a-c1b710a65429/Untitled.png)

**In summary**: Instead of separating order and item handling to a second flow, we reduce the complexity by using the passthrough feature of the platform.****

## Disable passthrough

In larger integration flows having large body of passthrough message can have
an adverse affect. The accumulating passthrough message can quickly create a large
overhead and cause out of memory by its own. To avoid this, you can disable the
passthrough from any particular step. This would mean the passthrough message will
be dropped from that point on and the subsequent steps would not have access to the
data from previous steps.

> **Please note**: The passthrough messages will start accumulating again after the particular
> step where passthrough was disabled.

For this to work the Node.js components must have sailor version `2.6.0+`, and Java
component to have sailor version `3.0.0+`.

You can disable passthrough during the flow creation/editing via the UI:

![Disable Passthrough](/assets/img/RN/20.07/disable-passthrough.png).



## Related links

- [Integration Flow Overview](integration-flow)
