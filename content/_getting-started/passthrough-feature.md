---
title: Passthrough Feature Overview
layout: article
section: Basic Concepts
order: 3
since: 20190903
---

This document provides basic information on [passthrough feature](#passthrough-feature), explains [why it is necessary](#), and gives an [example](#example) of its use.

## Passthrough Feature

Most components in an integration [Flow](integration-flow) receive, process and send data. Incoming data is typically different from the outgoing one, so the last step may receive a message without even a small trace of the initial data. If you want a component to map data other than what it receives from the previous step, you can use passthrough.

Basically, passthrough maintains copies of all messages per step in the Flow, and adds them to each following message. This way, data received by *Step 4* will contain the message sent by *Step 3*, and a special section with the messages received by *Step 1*, *Step 2* and *Step 3*. Normally, *Step 4* would only read and process the data sent by *Step 3*, but you can configure it to choose a message from any other previous step, if required.  

![](/assets/img/getting-started/passthrough/Pic_1.png)

## Passthrough Usage

To begin with, it would have been strange not to allow a component in the Flow to access data other than what the previous step sends it. Use cases are numerous, because even similar applications often work with slightly different data. The most common use case is customer data processing, when a Flow has to retrieve different pieces of this data from different sources, and then merge them into a full profile.

**EXAMPLE:**

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
