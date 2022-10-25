---
title: Batch Usage Example
layout: component
description: In this article you will see a flow with which you will clearly see how and where the Batch component is used.
icon: batch.png
icontext: Batch component
category: batch
updatedDate: 2022-08-26
ComponentVersion: 2.0.4
---

## Szenario

As an example, consider a situation where we need to collect incoming data from Webhook and generate a CSV based on that data. It may happen that there is no possibility to send all data to Webhook at once, for example in case of data arriving in real time, and to generate a representative CSV document we need a set of data with a certain number of lines. In this case, we will use Batch component, which collects all incoming messages into one collection and sends it to CSV component for generating a document. Also, as a check, let's add sending email with the resulting document to the end.

To implement this scenario, we will create two flowss.
In the first, our task will be to initialize the Batch component. In the second flow, we will work with a ready Batch component from the first flow.

## Initialization of Batch

First we need to create an init-flow, which will be responsible for creating a collection of messages.
Let's add a Webhook component and send a POST request that will contain a body with some client data.

![Initialization of Batch 1](img/batch-init-1.png)

After that, let's add a Batch component with the Add message to batch function.

![Initialization of Batch 2](img/batch-init-2.png)

Also, we need to specify the configuration parameters of the component. There are three parameters responsible for the behavior of the Batch component and one parameter Correlation id for linking Batch components with each other.
The first three parameters allow us to configure the component behavior and specify at which of the attainable conditions to consider the Batch assembled and start merging and further data sending. We can choose Batch lifetime, which is the parameter where the Batch will be collected based on a predefined time, i.e. it allows us, for example, to merge all messages arrived in a minute/hour/day, etc.
Max records in Batch - allows you to merge received messages based on their number.
Max size of Batch - allows to merge messages based on the total size of received batch.

![Initialization of Batch 3](img/batch-init-3.png)

In the mapping parameters we need to specify Item ID - the unique message ID and Batch item, which allows you to edit the content of a Batch message. For more convenience, I recommend to name these parameters, it will come in handy later.

This completes the flow setup for initializing Batch. I chose to generate the Batch based on the number of messages and set the Max records in Batch parameter to 5 for demonstration purposes. You can also add other components to this flow which will allow you to edit even more messages if you need to.
