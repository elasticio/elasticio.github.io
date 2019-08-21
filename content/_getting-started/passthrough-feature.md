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

To begin with, it would have been strange not to allow a component in the Flow to access data other than what the previous step sends it. Use cases are numerous, because even similar applications often work with slightly different data. Say your Flow serves a small internet store. What you need is for the Flow to start upon receiving an order form with Order ID and the customer's data. Then you want it to retrieve customer data from your CRM, to see if it is a returning customer.     


**THERE WILL BE A PIC HERE**

## Example

Let's say that *Flow Baboon* consists of 4 steps: *Webhook*, *CRM*, *Logger* and *Email*.

1\. The *Webhook* receives a trigger message when someone fills in a registration form, and sends the registration data to the *CRM*.

2\. The *CRM* does its magic and sends a "report" to the *Logger*.   

3\. The *Logger* logs the new registered member, but its outgoing message does not contain anything beneficial for the *Email* component.

4\. The *Email* uses passthrough to read the required data from the initial trigger message, or *CRM* message, and sends out an email.
