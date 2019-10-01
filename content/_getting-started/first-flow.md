---
title: Creating a Basic Integration Flow
layout: article
section: Tutorials
order: 1
category: integration-flow
since: 20190613
---

This document provides a step-by-step instruction on creating a basic [Integration Flow](integration-flow). It is intended for platform users who have little to no experience in Flow creation. The instruction includes the following sections: [configuring trigger](#configuring-trigger) and [configuring action steps](#configuring-action-steps).

## Configuring Trigger

The first step of an Integration Flow is called an initial trigger. Its job is to trigger the running Flow execution. Some [components](/getting-started/integration-component) can be used for a trigger, for example: Node.js, Webhook Component, Simple Trigger, etc.

For the first step, the list of available Components is limited to those that can be a trigger, so you can't go wrong. In this instruction we will use Simple Trigger as an example of the first step.  

To start the creation of our Flow, go to the navigational menu, select your Workspace and either click "Add new flow" on the dashboard:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_0.png)

**OR** go to *Flows* and click "Add New Flow":

![](/assets/img/getting-started/creating-basic-flow/Screenshot_1.png)

This brings you to *Designer* page. Let's start with naming your Flow **(1)**, which is optional, and adding the initial trigger **(2)**:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_4.png)

The platform prompts you to setup the first step. First you may give the step a special name **(1)**. Then you can select the Component you want to use by using search bar or Component list. We want to use Simple Trigger, so we will start typing "simple" to the search bar **(2)**, and find it faster. Then select it **(3)** and click "Choose Simple trigger" **(4)**:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_2.png)

The next step is data sample retrieval. You can read about [data samples here](/getting-started/data-sample-overview). Click "Retrieve sample from Simple trigger" **(1)**, then "Continue" **(2)** will become active on success.

![](/assets/img/getting-started/creating-basic-flow/Screenshot_7.png)

Then click "Continue" to proceed:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_8.png)

In the next tab you may add a description if you want **(1)**, and click "Finish step" **(2)** to finalize the initial trigger:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_9.png)


## Configuring Action Steps

As our initial trigger is ready, let's proceed with the second step, which is an action triggered by the first step. To start configuring the action, click "Add a new action":

![](/assets/img/getting-started/creating-basic-flow/Screenshot_10.png)

Again, we're prompted to setup the step, similar to the first one. You can give it a specific name **(1)**. We're going to use Email Component for our third step, so let's start typing into the search bar **(2)**. Select the component **(3)** and click "Choose Email" **(4)**:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_3.png)

Email Component sends an email when triggered, so you should just fill in the details as you would for an email:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_5.png)

After you've entered all the data, click "Continue":

![](/assets/img/getting-started/creating-basic-flow/Screenshot_6.png)

Next, you retrieve a data sample **(1)** and click "Continue" **(2)**:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_20.png)

Finally, you may add a description **(1)** and click "Finish step" **(2)**:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_21.png)

To publish the Flow draft and be able to run the Flow, click the corresponding button:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_11.png)

Congratulations! You Flow has been published, and it's ready to run. You can run it **(1)**, edit it **(2)** or delete it **(3)** using the corresponding buttons:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_12.png)
