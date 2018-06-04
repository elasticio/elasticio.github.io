---
title: Building real-time flows
layout: article
section: Building integration flows
order: 0
---

The {{site.data.tenant.name}} platform is microservices-based, which means that
each [integration component](/getting-started/integration-component) is placed
inside its own Docker container. All the containers connect through a
messaging queue to form an [integration flow](getting-started/integration-flow).

> **Note,** there are two types of integration flows, **ordinary** and **real-time**.
> The difference is not in the construction of the flow but in the mode of execution.

In this article:

*   [Ordinary Flows](#ordinary-flows)
*   [Real-time flows](#real-time-flows)
*   [Real-time flow warm-up period](#real-time-flow-warm-up-period)
*   [How to switch to Real-time flow?](#how-to-switch-to-real-time-flow)
*   [Real-time Flows and component re-deployment](#real-time-flows-and-component-re-deployment)

## Ordinary flows

Every newly built [integration flows](getting-started/integration-flow), unless
explicitly set otherwise, are **ordinary flows**. This means the {{site.data.tenant.name}}
platform starts each corresponding container when there is an incoming data from
a step before or a third party (in case of [webhook flows](/getting-started/webhook-flow))
and stops after the data processing.

Ordinary flows are sufficient for many use cases where the synchronisation is not
time critical. They are sufficiently fast, meaning the whole execution could take
anywhere between 1-3 minutes and are less resource intensive because the containers
are not up and running constantly.

If the integration use case requires almost instantaneous synchronisation then it
is recommended to switch to the real-time mode.

## Real-time Flows

Real-time Flows run at sub-second speeds. In these flows, containers start and never
stop, while being "glued" together via the {{site.data.tenant.name}} platform
messaging queue. Thanks to this, data passes through all of them basically in no time!

To give more realistic numbers. The average *communication between containers* is
less than 15ms (that is milliseconds). This is the time in which data is communicated from
one container to the next container. In a typical integration flow with 3 running
containers, {{site.data.tenant.name}} platform overhead would be 30ms (2 x 15ms)
in average. This could result in flow executions anywhere between 100 and 400ms,
depending on the data volume and the outside APIs call response times.

## Real-time flow warm-up period

When you first start the flow it will take longer to process the very first message.
**We call this period a warm-up time**. It will usually take a minute or so to rise
all the containers and make them operational. All the consecutive messages will
just fly through like a lightening.

The warm-up time would also need to be considered when you re-deploy your component
code and re-launch it again.


## How to switch to Real-time flow?

Every integration flow can be switched to a real-time flow. Here is how to do it.

Navigate to the *Flows page* and open the menu of the flow which needs to be set
to a real-time mode/type. Before you can do change this you must **STOP the flow first**,
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

## Real-time Flows and component re-deployment

Real-time Flows are up and running consistently which means that the {{site.data.tenant.name}}
will use the latest revision of your component's code available in you repository
at that very moment.

When the flow starts your component is deployed into a container which will be
up and running indefinitely due to the nature of the Real-time Flows to reach
sub-seconds speeds.

When the component code needs to be updated to use a new functionality that has
been developed recently, follow these steps to succeed:

1.  Deploy the new version of your component
2.  Check your integration flow setup and make the necessary adjustments if necessary. For example, if you have added a new Action or Trigger that you would like to use.
3.  Publish the draft and start your flow again.

> **Note** Your flow would still need to go through the warm-up period.

The {{site.data.tenant.name}} platform will not use the newly deployed code until
the Real-time Flow is not stopped and restarted again. The new re-deployed code
will be loaded into the container when you start the flow again. The reason is simple:

When the container containing your code is up and running it has no way of knowing
that the code in your repository has changed.
