---
title: Introducing flow versions
layout: article
section: Integration patterns
order: 1
Since: 20180122
---

We are excited to announce the release of a new feature called integration flow versions!

This new feature enhances our integration flow designer by giving you a chance to create versions of your existing flows right in the UI. You can view different versions of the flow and create a new version from any of them. And, you can activate the new version of your flow by replacing the old one.

Here are the main topics of this release.

*   The enhancements to integration flow designer.
*   Creating a new version of your flow.


## Enhancements to integration flow designer

With the flow versions feature we enhanced our UI and introduced a new logic to the underlying workflow of the integration designer.

Until now, to change an active integration flow, you had to either stop the flow, change and restart it or replace it with the new copy using the curl command. First method can cause an extended downtime because each integration steps might need more testing. The second method might not be applicable for every use case.

When you click on dashboard to open any flow to see the details, you will now see the following view:

![The flow details](/assets/img/integrator-guide/versions/versions-1.png "The flow details")

Here we have 3 new features:
1.  Version number field right to the name of the flow. When we view a different version than the active or published version, here we will see the version hash tag.
2.  New button to create a draft version of the selected version of the flow.
3.  Tabs to separate different part of the active/published version of the flow. We are now on *Manage tab*.

What is not here is the `curl` command which you can use to create a separate copy of the current flow. That part has now migrated into a separate tab called *Implement*. When you click on *Implement* tab you will see the `curl` expression:

![The curl expression](/assets/img/integrator-guide/versions/versions-2.png "The curl expression")

You can copy the `curl` expression from here and submit it to our platform to create a copy of this flow. This has been the case until now. With the release of versions, you can do the same procedure for every version of the flow.

The *History* tab is for showing the versions of your flow.

![The History tab](/assets/img/integrator-guide/versions/versions-3.png "The History tab")

Here we can see two distinct versions. For example:
1.  The record of the active version. It is marked as Published. We have here the date, the author and the hash tag of this flow.
2.  The second record is the earlier version of this flow with similar details. By clicking on *Preview Version* you can examine that version in detail. Including the component setups and the mapping. You can also get the `curl` expression to create a separate copy.

Next: Let us create a new draft of the published version.

## Creating a new version of your flow

Click on Create Draft button to create the draft of active or selected version of the flow. We will skip the stage of actual flow configuration where we add one more component to the flow. 

![The new draft](/assets/img/integrator-guide/versions/versions-4.png "The new draft")

Here we have the view of the History tab where the current draft is highlighted.

1.  The new draft version is ready. We still can change or delete it but when we publish, it becomes a version of the flow. There can be only one draft at the time.
2.  We have added a new step between the two components.
3.  We have changed the name of the flow. The version indicator shows that we are on the draft version view.
4.  We can now publish this draft by pressing the button.

If we publish the flow right now, when an active flow exist, we will get the following warning:
```
To publish this draft we need to restart the flow. Any unprocessed
messages will be lost. Are you sure you want to continue?
```
If you choose press on OK, the platform will stop the original flow, replace it with the new draft version. The new version is set to active and will be executed according to the scheduling constrains of the flow.

![The new version is active](/assets/img/integrator-guide/versions/versions-5.png "The new version is active")

Here we have the most recent version of this flow along with the two earlier versions.
