---
title: Component version
description: This document provides information on a component versions, build history and how to fix a component version for a particular flow.
layout: article
section: Building integration flows
category: building integration flows
order: 4
---

## Latest Component Version

 The exact latest version of a component is set by default instead of "latest" for existing integration flows and while creating the new ones:

 ![Lates component version](/assets/img/integrator-guide/fix-a-component-version/latest.png)

## Build History

During the component development, every new deployment or code commit is given a distinct version which every developer can examine in the **Build history** table presented on each repository page.

![Build history](/assets/img/integrator-guide/fix-a-component-version/build-history.png)

In this example, there are 11 distinct deployments and each one has its version. The last deployment is set to be the **Current version** which will be selected by default during the flow design.

> **Please note:** unless you fix your component version for a particular flow the system will always use the latest version during the next execution. Check also the how the realtime flows behave during the component re-deployment.

However, what if you want to use say v10 from these deployments because there is one feature (Action or Trigger) you need in that specific version? What if you want to create two or more integration flows using the different versions just to test the behavior of your code? **So how to fix a specific version of the component for a particular flow?**

The answer is simple, fix the component version during the flow creation!

## Fix the Component Version

Here is what to do:

  * Start designing an integration flow. The designer will automatically choose the exact latest version of a component by skipping to the configuration stage.

  * Click on the Versions tab and select the desired version to use as it is shown below in the picture:

{% include img.html max-width="100%" url="/assets/img/integrator-guide/fix-a-component-version/choose-version.png" title="Choose version" %}

> **Please note:** When you select any particular version for your flow it WILL STAY on that version and would NOT CHANGE even when you deploy new versions of your component.
