---
title: Webhook Flow Overview
layout: article
section: Basic Concepts
description: This document provides basic information on Webhooks, their usage on the platform, and Webhook integration flows.
order: 3
category: integration-flow
since: 20190406
---

This document provides basic information on [Webhooks](#webhooks), their [usage on the platform](/components/webhook/), and [Webhook integration flows](#webhook-flows).

## Webhooks

Webhooks allow applications to communicate between each other automatically.

Say we have two applications running in different environments. One of them will send some data the other, so we'll call it "sender application". The second one will be "receiver application" - it has to receive the data and process it somehow. Now, here is a typical principle of their work with Webhook:

1. We set up a Webhook on the "receiver application", exposing a Webhook URL to receive data. Also, you configure this application to perform certain actions depending on the data it receives.

2. We configure the "sender application" to send certain data to the "receiver application" via an HTTP(s) request to the Webhook URL.

3. The "receiver application" gets the data and acts accordingly, optionally replying with `404` if not successful, or some other pre-configured feedback on success.    

Let's look at a small "real life" example for a clear vision. Most of us use the services of banks quite often. There is a backend banking application, which actually moves the money and registers account states. Then, there is your personal client-bank application, typically web-based. This personal app is configured to receive transaction details on its exposed Webhook URL, and send you a report to your mobile messenger of choice. So as the backend app sends the appropriate data to client-bank Webhook URL, you immediately get a message about what is happening to your money.

## Webhooks on the Platform

Our platform utilizes Webhooks in the form of *Webhook Component*, and *Webhooks Service*:

- Webhook Component is a component allows the flow to receive external triggers via Webhook URL. You can use the Webhook Component as the initial trigger of the flow, or otherwise, in the middle, as an intermediate step.  

- Webhooks Service is a special microservice that handles Webhook Components work within the flows. It takes the requests and assigns them by ID to their corresponding flows. Then Webhooks Service sends the requests into a queue, where they are processed and delivered to the flows.

Obviously, to achieve a result, one needs more than just Webhook Component, but an entire working flow. Here's a simple example. Say you want an automatic tweet made every time you publish a blog post. All you have to do is create a Webhook flow that will get a request from your blog via Webhook, form a tweet and publish it on Twitter. That requires two components - Webhook Component, and Twitter Component.    

## Webhook flows

A Webhook [integration flow](integration-flow) is a flow that uses a Webhook Component as a trigger. It means that the actions get started by an external input to the Webhook URL.

The following scheme shows how our platform uses Webhooks for integration flows.

![Webhook scheme](/assets/img/getting-started/webhooks-overview/scheme_1.png)

We have Webhook component and Webhooks Service. An external HTTP request in JSON or XML format, a list of properties, or a file reaches a Webhook component's URL exposed by Webhooks Service. The Webhooks Service differentiates the requests by flow ID, and sends them to the platform for queueing. The queue of requests is then processed and sent to the corresponding Webhook flows. As a running flow gets its request, it initiates execution of steps.   

Webhook components can be secured with credentials to avoid unwanted activity. There are four types of Webhook [credentials](credential):

-   `No Auth` - makes the Webhook URL accessible by anyone
-   `Basic Auth` - defines username and password to authenticate the Webhook clients using [Basic Access Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
-   `API Key Auth` - defines an API key for the Webhook clients
-   `HMAC verification` - used to create a *HMAC* signature of the payload

## Related links

- [Integration Flow Overview](integration-flow)
- [Understanding credentials](credential)
- [Basic Access Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
