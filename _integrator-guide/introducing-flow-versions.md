---
title: Managing flow history
layout: article
section: Building integration flows
order: 1
since: 20180124
---

Any integration flow in the {{site.data.tenant.name}} platform has a history of changes since its creation. A history of a flow consists of individual versions that allow you to:

*   Change the flow without affecting the deployed and actively running version
*   See who changed a flow and when
*   Deploy any version in the history to the runtime
*   Roll-back a version deployment

In this article we will cover how to create and manage a flow's history. You will learn how to create a first version of a flow, how to create a new version from an existing one. You will also learn the concept of `Drafts`.


## Creating the first version of your flow

When you click on dashboard to open any flow to see the details, you will now see the following view:

![The flow details](/assets/img/integrator-guide/versions/versions-1.png "The flow details")

In the screenshot above you can see the *Manage* tab for the integration flow (1). You can't edit this flow from here. You can stop, delete, add a description and much more from here. When you click on the *Implement* tab you will see the following view:

![The curl expression](/assets/img/integrator-guide/versions/versions-2.png "The curl expression")

In the screenshot above we have the `curl` expression of this version of the flow. You can copy the `curl` expression from here and submit it to our platform to create a copy of this version of the flow.

The *History* tab is for showing the versions of your flow.

![The History tab](/assets/img/integrator-guide/versions/versions-3.png "The History tab")

In the screenshot above you can see the published version of this flow created today at 12:02 by William Thacker. The version has its own version hash `2d3df0d`. We have no other versions of this flow. Let us create one version.

Click on *Create Draft* button to create a new version.

![The new version](/assets/img/integrator-guide/versions/versions-4.png "The new version")

In the screenshot above we can see en exact copy of the original version but you can edit it without stopping or changing the published version. Before editing this version let us switch to the *History* tab:

![Two versions](/assets/img/integrator-guide/versions/versions-5.png "Two versions")

In the screenshot above we can see two versions in the list. The first one (1) is the published and active version by William Thacker and the second one is by Anna Smith, created a few seconds ago.

We will just change the name of the flow for this example. We can make as many changes to the draft as we need. All the changes will be persisted to the same version unless we press the *Publish Draft* button.

If we publish the flow right now, when an active flow exist, we will get the following warning:
```
To publish this draft we need to restart the flow. Any unprocessed
messages will be lost. Are you sure you want to continue?
```

After we press the *Publish Draft* button the {{site.data.tenant.name}} will stop the active version of the flow, replace it with the version which you want to publish and then start it.

![New published version](/assets/img/integrator-guide/versions/versions-6.png "New published version")

In the screenshot above we see the version by Anna Smith (`0c8dee3`) is now published and running. We can create yet another version by clicking on the *Create Draft* button.

![The third version](/assets/img/integrator-guide/versions/versions-7.png "The third version")

This time William Thacker created a new version.
