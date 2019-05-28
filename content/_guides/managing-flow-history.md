---
title: Managing flow history
layout: article
section: Building integration flows
order: 1
since: 20180215
---

Any integration flow in the {{site.data.tenant.name}} platform has a history of changes since its creation. A history of a flow consists of individual versions that allow you to:

*   Change the flow without affecting the deployed and actively running version
*   See who changed a flow and when
*   Deploy any version in the history to the runtime
*   Roll-back a version deployment

In this article we will cover how to create and manage a flow's history. You will learn how to create a first version of a flow, how to create a new version from an existing one. You will also learn the concept of `Drafts`. This article assumes that you know how to create an [integration flow](/getting-started/integration-flow) on {{site.data.tenant.name}} platform. You are welcome to refresh your memory by following the steps in [creating your first integration flow](/getting-started/first-flow) and [creating webhook flow](/getting-started/webhooks-flow) tutorials.

## Creating the first version of your flow

If you have followed our tutorials then you should now have the first `Draft` of your integration flow, as shown in the following screenshot.

![First version is ready](/assets/img/integrator-guide/versions/versions-1.png "First version is ready")

In the screenshot above you can see that you are able to delete your flow but not to start. This is because your flow is still unpublished. An unpublished version of a flow is called a `Draft`. If you now check the dashboard you will see the following picture.

![Dashboard view of your unpublished flow](/assets/img/integrator-guide/versions/versions-2.png "Dashboard view of your unpublished flow")

Go back to your unpublished flow and click on the *History* tab.

![The History tab](/assets/img/integrator-guide/versions/versions-3.png "The History tab")

Click on *Publish Draft* button to publish your flow and then start your flow. After a few moments your flow will be *running*.

> **Note** It is impossible to change any configuration of an existing version of integration flow. You have to create a new `Draft` version from an existing flow to change any configuration field.


## Creating new version of your existing flow

As discussed above, a flow is read-only by default. To change a flow, a new version of the flow must be created. Creating a new version of the flow starts with creating a new `Draft`, as shown in the screenshot below.

![Creating new version](/assets/img/integrator-guide/versions/versions-4.png "Creating new version")

In screenshot above we have the *History* tab where we have our flow published 6 minutes ago by William Thacker. The version has its own version hash `03b5625`. We have no other versions of this flow. Let us create one more version by clicking on *Create Draft* button. Before editing this version let us switch to the *History* tab again.

![New Draft version is active](/assets/img/integrator-guide/versions/versions-5.png "New Draft version is active")

In the screenshot above we can see two versions in the list. The first one (1) is the published and active version by William Thacker and the second one (2) is by Anna Smith, created a few seconds ago. The major difference is that you can edit it without stopping or changing the published version.

We will change the name of the flow for this example. We can make as many changes to the `Draft` as we need. All the changes are applied to the same version unless we press the *Publish Draft* button.


If we publish the flow right now, when an active flow exist, we will get the following warning:
> **Note** To publish this `Draft` we need to restart the flow. Any unprocessed messages will be lost. Are you sure you want to continue?

After we press the *Publish Draft* button the {{site.data.tenant.name}} will stop the active version of the flow, replace it with the version which you want to publish and then start it.

![New draft version is active](/assets/img/integrator-guide/versions/versions-6.png "New Draft version is active")

In the screenshot above we see the version by Anna Smith (`a800029c`) is now published and running. We can create yet another version by clicking on the *Create Draft* button.

![Third Draft](/assets/img/integrator-guide/versions/versions-7.png "Third Draft")

This time William Thacker created a new version.
