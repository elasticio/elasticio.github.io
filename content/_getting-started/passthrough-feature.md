---
title: Passthrough Feature Overview
layout: article
section: Basic Concepts
order: 3
---

This document provides basic information on [passthrough feature](#passthrough-feature), explains [why it is necessary](#), and gives an [example](#example) of its use.

## Passthrough Feature

Most components in an integration [Flow](integration-flow) receive, process and send messages. After processing, some or even all the data may be lost, so the message a component receives is typically different from the data it sends. The final component may receive something completely different, without even a small trace of the initial message. If you want a component to process data other than what it receives from the previous step, you can use passthrough.

Basically, passthrough maintains copies of all messages per step in the Flow, and adds them to each following message. This way, data received by *Step 4* will contain the message sent by *Step 3*, and a special section with the messages received by *Step 1*, *Step 2* and *Step 3*. Normally, *Step 4* would only read and process the data sent by *Step 3*, but you can configure it to choose a message from any other previous step, if required.  

![](/assets/img/getting-started/passthrough/Pic_1.png)

## Passthrough Usage

To begin with, it would have been strange not to allow a component in the Flow to access data other than what the previous step sends it. Use cases are numerous, because even similar applications often work with slightly different data. The most common use case is customer data processing, when a Flow has to retrieve different pieces of this data from different sources, and then merge them into a full profile.

As a quick example, say your Flow serves a small internet store. What you need is for the Flow to start upon receiving an order form with Order ID and the customer's data. Then you want it to retrieve customer data from your CRM, to see if it is a returning customer. Also, you need it to send an email to the customer, that his order is being processed, and another email to a sales manager who will process it. The Email Component will have to use the original message, which includes customer email. That is where passthrough comes in to let the last step, meaning Email Component, fetch data from the initial message, or any other step's message in the Flow.

## Practical  Example

Here is a detailed example of an actual real-life Flow. It involves Amazon orders being managed by Salesforce. The problem here is that while `listOrders` query to Amazon MWS provides beneficial order data, it can not get a list of the items in the order. To get the item list, we need to query Amazon MWS with `listOrderItems` using a specific order ID. However, without having the order IDs, we obviously can not use `listOrderItems`.

In the imaginary unlucky case when we didn't have passthrough, we would have to create an additional Flow for second query. There may be problems of synchronization between the two Flows, which we usually solve with Rebounds. The system tries to get the external IDs of those orders before asking for items. If the IDs are still not there it will try again later and later. However, there is always a limit on how many times the system can try and that many connections can fail if one end of integration reports a timeout.

However, we do have passthrough, so we can just use `listOrders` and `listOrderItems` in two separate steps. Let's take a look at our Flow:

![](/assets/img/getting-started/passthrough/Passthrough_flow.gif)

1\. Step 1 gets a list of orders:

![](/assets/img/getting-started/passthrough/Screenshot_1.png)

2\. Step 2 splits the list by order:

![](/assets/img/getting-started/passthrough/Screenshot_2.png)

3\. Step 3 gets items in the orders:

![](/assets/img/getting-started/passthrough/Screenshot_3.png)

4\. Step 4 retrieves orders from Step 2 via passthrough by update date:

![](/assets/img/getting-started/passthrough/Screenshot_4.png)

5\. Step 5 retrieves order items from Step 3 via passthrough, adding data on scheduled delivery date, shipping date, item price and quantity of ordered items:

![](/assets/img/getting-started/passthrough/Screenshot_5.png)

That's how instead of separating order item handling to a second Flow, we reduce overall complexity by using passthrough.
