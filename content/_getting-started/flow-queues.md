---
title: Flow Queues
layout: article
section: Platform Features
description: This document provides basic information on flow queues and how to use them.
order: 10
category: platform-features
---

## Description

The feature Flow Message Queue allows you to see number of messages in the queue for each of your flow steps:

![Flow Queues](/assets/img/getting-started/flow-queues/flow-queues.png)

> **Please Note:**  The Flow Queues are only available for actively running flows.

## Access to flow queues

### Executions

To access navigate to Executions, select any active execution:

![Executions](/assets/img/getting-started/flow-queues/executions.png)

Then look for the Flow Queues menu link along with the Download Logs and View Flow links like in the picture below:

![Executions](/assets/img/getting-started/flow-queues/executions-flow-queues.png)

### Dashboard

To access navigate to Dashboard, select any active flow and look for the Flow Queues menu link along with the Download Logs and View Flow links like in the picture below:

![Dashboard](/assets/img/getting-started/flow-queues/dashboard.png)

### Flows

To access navigate to Flows, select any active flow, click to cogwheel and select Flow Queues:

![Flows](/assets/img/getting-started/flow-queues/flows.png)

### API endpoint

You can also access the queue information using the `/v2/stats/queues/FLOW_ID API` endpoint. More information is available from the [API reference documentation](https://api.elastic.io/docs/v2/#stats).
