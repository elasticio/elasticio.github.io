---
title: Realtime Flows and component re-deployment
layout: article
section: Developing Components
order: 1
---

## Realtime flow

Realtime Flows are up and running consistently which means:

When the flow starts our platform will use the latest revision of your component's code available in you repository at that very moment.

> When the flow starts your component is deployed into a container which will be up and running indefinitely due to the nature of the Realtime Flows to reach sub-seconds speeds.

More information [here](https://docs.elastic.io/guides/realtime-flows.html).


## Component code updating

When the component code needs to be updated to use a new functionality that has been developed recently, it is advisable to follow these steps to succeed:

  **1.**  STOP your integration flow where the component is used.

  **2.**  Re-deploy your component the usual way.

  **3.**  Check your integration flow setup and make the necessary adjustments if necessary. For example, if you have added a new Action or Trigger that you would like to use. It will only be available after you stop your actively running integration flow. No matter even if you have deployed your changes already.

  **4.**  START the flow again. Note that your flow would still need to go through the warm-up period.


### Why go through these steps?

The {{site.data.tenant.name}} platform will not use the newly deployed code until the Realtime Flow is not stopped and restarted again. The new re-deployed code will be loaded into the container when you start the flow again. The reason is simple:

> When the container containing your code is up and running it has no way of knowing that the code in your repository has changed.
