---
title: Integration Flow Overview
layout: article
section: Introduction
description: This document provides basic information on integration flow and their parts.
order: 3
category: intro
since: 20180102
---

An integration Flow is an automated workflow used to synchronize data between multiple applications or services.
Typically a flow consists of following steps:

1. Exporting data from a *source* application
2. Transforming the data according to a set of predefined rules
3. Sending data to one or multiple *target* applications.

A Flow is constructed from a set [integration components](integration-component) that are invoked in a predefined order.
The components within a Flow can be classified into two groups: *triggers* and *actions*, as shown in the following diagram.

![Flow structure](/assets/img/getting-started/integration-flow/flow-trigger-actions.png "Flow structure")

In the diagram above you can see that the first component of the flow is always as *trigger*.
A flow can have a single trigger only. All the other components of the flow are *actions*.

The Platform can be configured to show handy help links to the corresponding documentation in the process of creating an integration Flow:

- When creating and verifying new [Credentials](credential)

- When selecting trigger or action of the Component

- When receiving Credentials errors

- When configuring Component fields and mapping

- Etc.

## Flow triggers

A flow is always started by a *trigger* component which used to monitor changes in the source application. For example, a Salesforce
trigger monitors insertion of new objects or changes to existing objects in Salesforce and starts the integration flow
once a change is detected.

There are two types of triggers:

* Polling: **actively** monitoring the source service in predefined intervals
* Webhook: **waiting** for the source system to send notification about changes


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

* Data is never lost if any of the containers crashed
* Containers can be scaled if we need to [parallelize the work](/guides/managing-flows.html#parallel-processing), e.g. in the diagram above we have 2 instances of Step 2 running. This means that a Step will process more than one message simultaneously, so keep track of the available resources for processing.
* Message delivery between containers is reliable, e.g. when the target API is unavailable the platform can easily retry later as the messages remain on the queues.


## Flow States

The main Flow states are:

- `Stopped` (`Inactive`)
- `Running`
- `Sleeping`
- `Suspended`  

Additionally, there are two intermediate states, which cannot be changed manually, and will go to the next state after some time:

- `Starting`. This state is followed by `Running` automatically.
- `Stopping`. This state is followed by `Stopped` automatically.
- `Suspending`. This state is followed by `Suspended` automatically.

A Flow in `Inactive` state is not working. No messages are sent, no triggers or actions performed, no containers running. From this state, a Flow can only be run, going from  `Starting` to `Running`. Note, that a `Stopped` Flow cannot be `Suspended`.

A `Running` Flow is operating as designed. Containers are running, triggers and actions are performed. From this state, a Flow can be `Stopped` or `Suspended`, going through corresponding intermediate states. Additionally, a `Running` Flow can go into `Sleeping` state.

A `Sleeping` Flow resembles a `Stopped` Flow in terms of activity, but it is actually just paused, because the Flow has done all the work. In this state, the Flow is waiting for a trigger from a Webhook or Scheduler to resume work. `Sleeping` Flows go to `Running` state without the intermediate. Also, they can be `Suspended` in rare cases. `Sleeping` state only works for *ordinary* Flows.  

`Suspended` is a state caused by Flow exceeding its message number or size limit in RabbitMQ queue. Suspension is more of a pause, than a stop. All non-processed messages in a suspended Flow are saved in RabbitMQ queue for a limited time. Then they get dropped if the user did not fix the issues and did not resume the Flow. In limited workspaces, Flows are stopped instead of being suspended. A stopped Flow doesn’t save any non-processed messages - everything is dropped. You can stop a Flow manually by pressing the Stop button. Please, keep in mind that stopping a Flow drops all unprocessed messages at the moment of stopping. A `Suspended` Flow can go to `Running` or `Stopped` states.     

## Related links

- [Integration Component Overview](integration-component)
- [Creating a Basic Integration Flow](first-flow)
- [Creating a webhook flow](webhooks-flow)
- [Docker](https://www.docker.com/)
