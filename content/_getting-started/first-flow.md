---
title: Creating a Basic Integration Flow
layout: article
section: Tutorials
order: 1
category: integration-flow
since: 20190613
---

This document provides a step-by-step instruction on creating a basic [Integration Flow](integration-flow). It is intended for platform users who have little to no experience in Flow creation. The instruction includes the following sections: [configuring trigger](#configuring-trigger), [configuring action step](#configuring-action-steps) and [post-creation activities](#post-creation-activities).

## Configuring Trigger

The first step of an Integration Flow is called an initial trigger. Its job is to trigger the running Flow execution. Different Components can be used for a trigger: Node.js, Webhook Component, Simple Trigger, etc. For this instruction we will use Simple Trigger as an example of the first step.  

To start the creation of our Flow, go to the navigational menu, select your Workspace and either click "Add new flow" on the dashboard:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_0.png)

**OR** go to *Flows* and click "Add New Flow":

![](/assets/img/getting-started/creating-basic-flow/Screenshot_1.png)

This brings you to *Designer* page. Let's start with naming your Flow, which is optional, and adding the initial trigger:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_4.png)

The platform prompts you to setup the first step. First you may give the step a special name. Then you can select the Component you want to use, by using search bar, Component list, or load new Component from Catalog:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_5.png)

We want to use Simple Trigger, so we will start typing "simple" to the search bar, and find it faster. Then select it and click "Choose Simple trigger":

![](/assets/img/getting-started/creating-basic-flow/Screenshot_6.png)

The next step is [data sample](/data-sample-overview) retrieval. Click "Retrieve sample from Simple trigger" and then "Continue" to proceed:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_7.png)

![](/assets/img/getting-started/creating-basic-flow/Screenshot_8.png)

In the next tab you may add a description if you want, and click "Finish step" to finalize the initial trigger:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_9.png)


## Configuring Action Steps

As our initial trigger is ready, let's proceed with the second step, which is an action triggered by the first step. To start configuring the action, click "Add a new action":

![](/assets/img/getting-started/creating-basic-flow/Screenshot_10.png)

Again, we're prompted to setup the step, similar to the first one. We have chosen Node.js as the second Component. Select it and click "Choose Node.js Code":

![](/assets/img/getting-started/creating-basic-flow/Screenshot_11.png)

Node.js requires a code to execute. We will use the basic one:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_2.png)

Next, we need to retrieve a data sample and continue:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_13.png)

![](/assets/img/getting-started/creating-basic-flow/Screenshot_14.png)

Let's finalize the step by adding a description and clicking "Finish step":

![](/assets/img/getting-started/creating-basic-flow/Screenshot_15.png)

Now we will add another action step:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_16.png)

Optionally, set a name for the step. We're going to use Email Component for our third step. Select it and click "Choose Email":

![](/assets/img/getting-started/creating-basic-flow/Screenshot_17.png)

Email Component sends an email when triggered, so you should just fill in the details as you would for an email. Also, you can cancel error message on the event of sending fail. After you've entered all the data, click "Continue":

![](/assets/img/getting-started/creating-basic-flow/Screenshot_18.png)

![](/assets/img/getting-started/creating-basic-flow/Screenshot_19.png)

Next, you retrieve a data sample and click "Continue":

![](/assets/img/getting-started/creating-basic-flow/Screenshot_20.png)

Finally, you may add a description and click "Finish step":

![](/assets/img/getting-started/creating-basic-flow/Screenshot_21.png)

To publish the Flow draft and be able to run the Flow, click the corresponding button:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_22.png)



## Post-Creation Activities

The Flow is now published. You can run it, edit it or delete it using the corresponding buttons:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_23.png)

You can also manage it using the tabs on *Designer* page. The *Implement* tab allows you to clone the Flow in the same Workspace:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_25.png)

The *History* tab shows you a log of activity associated with the Flow:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_26.png)

In the *Settings* tab you can switch Flow type from Realtime to Ordinary:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_27.png)

Additionally, you can switch Flow type via settings in its settings menu on *Flows* page:

![](/assets/img/getting-started/creating-basic-flow/Screenshot_28.png)

The same menu allows you to **Subscribe to errors**. This feature will order the platform to send you emails in case of any errors in your running Flow. However, it will not just mindlessly spam you with messages if an error repeats. With some errors, messaging interval is one email per hour, while with others its one per 24 hours. This interval is hardcoded and cannot be configured.

![](/assets/img/getting-started/creating-basic-flow/Screenshot_24.png)
