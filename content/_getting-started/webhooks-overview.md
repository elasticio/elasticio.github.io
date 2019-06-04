---
title: Webhook Flow Overview
layout: article
section: Basic Concepts
order: 1
category: integration-flow
since: 20190406
---

This document provides basic information on [Webhooks](#webhooks) and [Webhook integration flows](#webhook-flows).

##Webhooks

Webhooks allow applications to communicate between each other automatically. Here is a basic principle of their work:

1\. You set up a Webhook on the "receiver application", exposing a Webhook URL to receive data. Also, you configure this application to perform certain actions depending on the data it receives.

2\. You configure the "sender application" to send certain data to the "receiver application" Webhook URL as soon as a certain input triggers it. The data is usually a HTTP request in JSON format.

3\. The "action application" receives the data and acts accordingly, optionally replying with `404` if not successful, or some other pre-configured feedback.    

Let's look at a small "real life" example for a clear vision. There is backend banking application, which actually moves the money and registers account states. Then, there is your personal client-bank application, typically web-based. This personal app is configured to receive transaction details on its exposed Webhook URL, and send you a report to your mobile messenger of choice. So as the backend app sends the appropriate data to client-bank Webhook URL, you immediately get a message about what is happening to your money.


## Webhook flows

A Webhook [integration flow](integration-flow) is a flow that has a Webhook component as the initiator. It means that the actions get started by an external input to the Webhook URL.

The following scheme shows how our platform uses Webhooks for integration flows.

![](/assets/img/getting-started/webhooks-overview/Screenshot_1.png)

We have Webhook component and Webhook service. An external HTTP request in JSON or XML format reaches a Webhook component's URL exposed by Webhook Service. The Webhook Service differentiates the requests by flow ID, and sends them to the platform for queueing. The queue of requests is then processed and sent to the corresponding Webhook flows. As a running flow gets its request, it initiates execution of steps.   

Webhook components can be secured with credentials to avoid unwanted activity. There are four
types of Webhook [credentials](credential):

-   `No Auth` - makes the Webhook URL accessible by anyone
-   `Basic Auth` - defines username and password to authenticate the Webhook clients using [Basic Access Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
-   `API Key Auth` - defines an API key for the Webhook clients
-   `HMAC verification` - used to create a *HMAC* signature of the payload
