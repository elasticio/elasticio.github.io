---
title: Integration Flow Overview
layout: article
section: Basic Concepts
order: 2
category: integration-flow
since: 20180102
---

An integration flow is an automated workflow used to synchronize data between multiple applications or services.
Typically a flow consists of following steps:

1. exporting data from a *source* application
2. transforming the data according to a set of predefined rules
3. sending data to one or multiple *target* applications.

A flow is constructed from a set [integration components](integration-component) that are invoked in a predefined order.
The components within a flow can be classified into two groups: *triggers* and *actions*, as shown in the following diagram.

![Flow structure](/assets/img/getting-started/integration-flow/flow-trigger-actions.png "Flow structure")

In the diagram above you can you can see that the first component of the flow is always as *trigger*.
A flow can have a single trigger only. All the other components of the flow are *actions*.

## Flow triggers

A flow is always started by a *trigger* component which used to monitor changes in the source application. For example, a Salesforce
trigger monitors insertion of new objects or changes to existing objects in Salesforce and starts the integration flow
once a change is detected.

There are two types of triggers:

* polling: actively monitoring the source service in predefined intervals
* webhook: waiting for the source system to send notification about changes


The difference between *polling* and *webhook* triggers is how the changes are detected. A *polling* trigger is actively
querying for changes in predefined intervals, for example every 3 minutes. In each polling iteration a polling trigger
retrieves either new objects or updated objects since the last polling iteration. For that purpose *polling* trigger typically
maintains a timestamp in its state. More details on polling flows can be found [here](first-flow). In contrast, a *webhook* trigger
is triggered by the changes in an external system. For that purpose a webhook flow registers a unique URL in the source application
and wait to be notified about changes. More details on webhook flows can be found [here](webhooks-flow).


## Flow actions

The data produced by a *trigger* are sent to an *action* for consumption. For example, a new object from a Salesforce
trigger is sent to a Quickbooks action for insertion or update. After consuming the incoming data an action
is producing new data which can be consumed by the next *action*. Typically the response of the API the action is talking to
is sent to the next action. Upon an insertion or update most APIs responds with the new object containing the internal ID or the updated object.

## Containers and Queues

Both *triggers* and *actions* can be referred to as flow's *steps*. Each step of an integration flow is running as an individual [Docker](https://www.docker.com/) container.
All the containers a connected through a messaging queue, as shown in the following diagram:

![Containers and Queues](/assets/img/getting-started/integration-flow/flow-steps-queues.png "Containers and Queues")

Using a messaging queues between flow steps has following advantages:

* data are never lost if any of the containers crashed
* containers can be scaled if we need to parallelise the work, e.g. in the diagram above we have 2 instances of Step 2 running
* reliable message delivery between containers, e.g. when the target API is unavailable the platform can easily retry later as the messages remain on the queues
