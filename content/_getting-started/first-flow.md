---
title: Creating a Basic Integration Flow
layout: article
section: Tutorials
order: 1
description: A step-by-step instruction on creating a basic integration flow.
category: integration-flow
since: 20190613
---

This document provides a step-by-step instruction on creating a basic [Integration Flow](integration-flow). It is intended for platform users who have little to no experience in Flow creation. The instruction includes the following sections: [configuring trigger](#configuring-trigger) and [configuring action steps](#configuring-action-steps).

## Configuring Trigger

The first step of an Integration Flow is called an initial trigger. Its job is to trigger the running Flow execution. Some [components](/getting-started/integration-component) can be used for a trigger, for example: Node.js, Webhook Component, Simple Trigger, etc.

For the first step, the list of available Components is limited to those that can be a trigger, so you can't go wrong. In this instruction we will use Simple Trigger as an example of the first step.  

To start the creation of our Flow, go to the navigational menu, select your Workspace and either click "Add new flow" on the dashboard:

{% include img.html max-width="100%" url="/assets/img/getting-started/creating-basic-flow/creating-basic-flow-01.png" title="Workspace - add new flow" %}

**OR** go to *Flows* and click "Add New Flow":

{% include img.html max-width="100%" url="/assets/img/getting-started/creating-basic-flow/creating-basic-flow-02.png" title="Flows - add new flow" %}

This brings you to *Designer* page. Let's start with naming your Flow **(1)**, which is optional, and adding the initial trigger **(2)**:

{% include img.html max-width="100%" url="/assets/img/getting-started/creating-basic-flow/creating-basic-flow-03.png" title="Designer page - add initial trigger" %}

The platform prompts you to setup the first step. First you can select the Component you want to use by using search bar or Component list. We want to use Simple Trigger, so we will start typing "simple" to the search bar **(1)**, and find it faster. Then select it **(2)** and click "Choose Simple trigger" **(3)**:

{% include img.html max-width="100%" url="/assets/img/getting-started/creating-basic-flow/creating-basic-flow-04.png" title="Setup the first step" %}

The next step is data sample retrieval. You can read about [data samples here](/getting-started/data-sample-overview). Click "Retrieve sample from Simple trigger" **(1)**, "Add sample manually" **(2)** or just Skip the Sample **(3)**. After that you will be automatically redirected to the last step.

{% include img.html max-width="100%" url="/assets/img/getting-started/creating-basic-flow/creating-basic-flow-05.png" title="Data sample retrieval" %}

You can also change the sample if you wish:

{% include img.html max-width="100%" url="/assets/img/getting-started/creating-basic-flow/creating-basic-flow-06.png" title="Data sample retrieval - Continue" %}

In the next tab you may change a name **(1)**, add a description if you want **(2)**, and click "Finish step" **(3)** to finalize the initial trigger:

{% include img.html max-width="100%" url="/assets/img/getting-started/creating-basic-flow/creating-basic-flow-07.png" title="Data sample retrieval - Finish Step" %}


## Configuring Action Steps

As our initial trigger is ready, let's proceed with the second step, which is an action triggered by the first step. To start configuring the action, click "Add a new action":

{% include img.html max-width="100%" url="/assets/img/getting-started/creating-basic-flow/creating-basic-flow-08.png" title="Configuring Action Steps - Add a new action" %}

Again, we're prompted to setup the step, similar to the first one. We're going to use Email Component for our third step, so let's start typing into the search bar **(1)**. Select the component **(2)** and click "Choose Email" **(3)**:

{% include img.html max-width="100%" url="/assets/img/getting-started/creating-basic-flow/creating-basic-flow-09.png" title="Choose Email" %}

Email Component sends an email when triggered, so you should just fill in the details as you would for an email. After you've entered all the data, click to "Sample":

{% include img.html max-width="100%" url="/assets/img/getting-started/creating-basic-flow/creating-basic-flow-10.png" title="Configure input" %}

Next click to "Retrieve sample from E-Mail" or "Add sample manually". You can also Skip the Sample. After that you will be automatically redirected to the last step.

{% include img.html max-width="100%" url="/assets/img/getting-started/creating-basic-flow/creating-basic-flow-11.png" title="Retrieve a data sample" %}

Finally, Same as in the trigger step, you can change a name , may add a description and click to "Finish step":

{% include img.html max-width="100%" url="/assets/img/getting-started/creating-basic-flow/creating-basic-flow-12.png" title="Summary - Finish step" %}

To publish the Flow draft and be able to run the Flow, click the corresponding button:

{% include img.html max-width="100%" url="/assets/img/getting-started/creating-basic-flow/creating-basic-flow-13.png" title="Publish the Flow draft" %}

Congratulations! You Flow has been published, and it's ready to run. You can run it **(1)**, edit it **(2)** or delete it **(3)** using the corresponding buttons:

{% include img.html max-width="100%" url="/assets/img/getting-started/creating-basic-flow/creating-basic-flow-14.png" title="Run, edit, or delete a flow" %}
