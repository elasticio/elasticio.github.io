---
title: Building real-time flows
layout: article
section: Building integration flows
order: 0
---

As already discussed in the [Containers and Queues section](/getting-started/integration-flow)
an integration flow in the {{site.data.tenant.name}} platform consists of multiple
integration steps, each of which is running as an individual [Docker](https://www.docker.com/)
container. These containers are linked with each other through messaging
queues so that they can exchange data.

The integration flows can be grouped into two types:

* `ordinary`: used for background synchronisation of data. Each flow is
ordinary by default so that the majority of the flows is of this type.
* `real-time`: used for use cases in which a request must be responded
in real-time without any delays. For example, when an end user interacts
with a chatbot communicating with the {{site.data.tenant.name}} platform.

## Flow's step life cycle

In order to understand `real-time` flows, let's explore the life cycle of
a flow's step. When a flow is started, each of its steps is transitioning
from the `Sleeping` state into `Starting` and the startup was successful
eventually into `Running`. This is illustrated in the following diagram.

![Container life cycle](/assets/img/integrator-guide/realtime-flows/container-lifecycle.png "Container life cycle")

The platform's internal Container orchestrator is monitoring the activity
of the flow's steps and decides to stop the flow's steps when it believes
the data have been processed and the steps are idling. In this case the
steps are transitioning to `Shutting Down` and then to `Sleeping` where
they are waiting for the next execution round.

Such a step life cycle is very important in a Cloud environment where
millions of Docker containers are being run on the same hardware. It allows
to keep the hardware costs low, however there is a price for that: starting
and stopping the containers produces a slight latency which is acceptable
for the majority of the flows doing background synchronisation of data.
In real-time use cases such a latency is not acceptable and this is where
`real-time` flows come into play.


## Real-time flows

In contrast to an `ordinary` flow, a `real-time` flow never sleeps. All
the steps of a real-time flow remain in the `Running` state until the flow
has been stopped by the user explicitly. Because the containers are running
all the time, the data are consumed from the messaging queues and process
in real-time without any latency produced by the platform.

When you first start a real-time flow it might take longer to process the
very first message because the platform needs to to start all the containers
and make them operational. We call it a **warm-up time**. All the consecutive
messages will just fly through like a lightening.

The warm-up time would also need to be considered when you re-start your
flow.


## How to switch to real-time flow?

Every integration flow can be switched to a real-time flow. Here is how to do it.

Navigate to the *Flows page* and open the menu of the flow which needs to be set
to a real-time mode/type. Before you can do change this you must stop the flow first,
otherwise the option *Enable real-time* is greyed-out as it can be seen on the
screenshot below:

![Flows page with menu open](/assets/img/integrator-guide/realtime-flows/realtime-flows-1.png "Flows page with menu open")

Open the menu of the inactive flow to see the available *Enable real-time* option:

![Select to switch](/assets/img/integrator-guide/realtime-flows/realtime-flows-2.png "Select to switch")

Select the *Enable real-time* to switch this flow into real-time mode/type.

![Flow is real-time](/assets/img/integrator-guide/realtime-flows/realtime-flows-3.png "Flow is real-time")

The screenshot above shows the moment when the flow is switched into real-time.
The process is successfully and a check-mark appears on the rights side of the menu
item *Enable real-time* as well as an icon with a rocket icon appears to the left
of the flow's name.

## Updating real-time flows

In order to make changes to your real-time flows, you need to create a
new [Draft](/integrator-guide/managing-flow-history). None of the changes
made to the draft will affect the currently running flow containers, be
it a mapping adjustment, a component version change or anything else. In
order to apply the changes you need to publish the draft as a new version.

Once you publish the draft as a new version, the currently running version
of the flow will be stopped by shutting down all the running flow
containers. The new version will be deployed by starting new step containers.
Please note that in this case the flow goes through the warm-up period
again.
