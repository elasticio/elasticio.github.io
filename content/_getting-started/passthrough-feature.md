---
title: Passthrough Feature
layout: article
section: Platform Features
description: This document introduces the passthrough feature,
 explains why would you use it,
 and gives a real-life example on how to use it.
order: 9
since: 20190903
category: platform-features
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
integration use-cases. Here are some sceIn this example, we want to update the status of a pet named Gromit in the pet store. Information that the status has been updated must be sent using the component to the boss’s mail. To send the information we need, we use components and a component to send the results to the mail.narious when the passthrough feature makes
a significant difference.

*   As an integrator you want to retrieve the data from more than one external resource and combine it into one outgoing message to store it in your desired storage. Without the passthrough feature you would need to retrive the data separately from different resources, synchronize them and store in the storage. For this you would definetly need to use more than one integration flow and make sure not overwrite it every time.
*   As an integrator you would like to retrive the data at least two times from the third party resource due to limitations of the third party API abilities. Without the passthrough you would need to use two different initegration flows and somehow synchronize the information between them.

Let us have a look into an example on how the passthrough feature can help to solve
a real-life integration dilemma.

## Example

In this example, we want to update the status of a pet named Gromit in the pet store. Information that the status has been updated must be sent using the E-Mail component to the boss’s mail. To accomplish the task, we created this flow:

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

Finaly we move on to the E-Mail component where we need to use the passthrough function. While configuring E-Mail component input we must fill in the "To" field using data from the Webhook component. At this moment we use the passthrough that allows us to use data not only from the previous, but also from earlier steps (Webhook in our case):

![E-mail step](/assets/img/getting-started/passthrough/email_step.png)

## Related links

- [Integration Flow Overview](integration-flow)
