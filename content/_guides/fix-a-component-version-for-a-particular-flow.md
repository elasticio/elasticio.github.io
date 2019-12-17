---
title: Fix a component version for a particular flow
layout: article
section: Building integration flows
order: 1
---

## Build history

During the component development, every new deployment or code commit is given a distinct version which every developer can examine in the **Build history** table presented on each repository page.

![Build history](/assets/img/integrator-guide/fix-a-component-version/build-history.png)


In this example, there are 11 distinct deployments and each one has its version. The last deployment is set to be the **Current version** which will be selected by default during the flow design.

> **Please note:** unless you fix your component version for a particular flow the system will always use the latest version during the next execution. Check also the how the realtime flows behave during the component re-deployment.

However, what if you want to use say v10 from these deployments because there is one feature (Action or Trigger) you need in that specific version? What if you want to create two or more integration flows using the different versions just to test the behaviour of your code? **So how to fix a specific version of the component for a particular flow?**

The answer is simple, fix the component version during the flow creation!

## Fix the component version

Here is what to do:

  * Start designing an integration flow. The designer would automatically choose the Latest version by skipping to the configuration stage.

  * Click on the Version tab and select the desired version to use as it is shown below in the picture:

![Choose version](/assets/img/integrator-guide/fix-a-component-version/choose-version.png)

> **Please note:** When you select any particular version for your flow it WILL STAY on that version and would NOT CHANGE even when you deploy new versions of your component.
