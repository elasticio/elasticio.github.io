---
title: Building real-time flows
layout: article
section: Building integration flows
order: 0
since: 20180430
---

The {{site.data.tenant.name}} platform is microservices-based, which means that
each [integration component](/getting-started/integration-component) is placed
inside its own Docker container. All the containers connect through a
messaging queue to form an [integration flow](getting-started/integration-flow).

There are two types of integration flows, ordinary and realtime.

## Ordinary Flows

When you want to execute a task consisting of, say, two components with a
Data Mapper in between, the {{site.data.tenant.name}} starts each corresponding
container (in our case three in total) one after the other in order to pass data
from the first container to the last one, stopping every container after the use
and proceeding to the next one.

This technique is sufficient for many use cases where the synchronisation is not
time critical. These types of flows are called **Ordinary flows**. They are
sufficiently fast, meaning the whole execution could take anywhere between 1-3
minutes and are less resource intensive.

**So what if faster executions are necessary?**

What if the nature of integration requires almost instantaneous synchronisation
and execution? Luckily, we have a solution for you and it is called **Realtime flows**.

## Realtime Flows

Realtime Flows on demand run at sub-second speeds. In these flows, containers
start and don’t stop, while being "glued" together via our messaging queue. Thanks
to this, data passes through all of them basically in no time!

**How fast can Realtime flow be?**

Our latest latency test shows that in average communication between containers
is less than 15 milliseconds!

This would mean when you have 3 containers running in one integration flow then
{{site.data.tenant.name}} platform overhead is 2 x 15 milliseconds = 30 milliseconds
in average. This could result in flow executions anywhere between 100 and 400 milliseconds,
depending on the data volume and the outside APIs call response times.

## How to switch to Realtime flow?

Every integration flow can be switched to a realtime flow. To do so use the setup
menu found on the right side of every flow on Flows page.

TODO: add screenshot to show the menu

## Realtime Flows and component re-deployment

Realtime Flows are up and running consistently which means that the {{site.data.tenant.name}}
will use the latest revision of your component's code available in you repository
at that very moment.

When the flow starts your component is deployed into a container which will be
up and running indefinitely due to the nature of the Realtime Flows to reach
sub-seconds speeds.

When the component code needs to be updated to use a new functionality that has
been developed recently, follow these steps to succeed:

1.  Deploy the new version of your component
2.  Check your integration flow setup and make the necessary adjustments if necessary. For example, if you have added a new Action or Trigger that you would like to use.
3.  Save the draft and deploy your flow again.

> **Note** Your flow would still need to go through the warm-up period.

The {{site.data.tenant.name}} platform will not use the newly deployed code until
the Realtime Flow is not stopped and restarted again. The new re-deployed code
will be loaded into the container when you start the flow again. The reason is simple:

When the container containing your code is up and running it has no way of knowing
that the code in your repository has changed.

## Realtime flow warm-up period

When you first start the flow it will take longer to process the very first message.
**We call this period a warm-up time**. It will usually take a minute or so to rise
all the containers and make them operational. All the consecutive messages will
just fly through like a lightening.

The warm-up time would also need to be considered when you re-deploy your component
code and re-launch it again.


## Realtime flows and trigger process() function

The Realtime flow will run indefinitely unless stopped which means the trigger
`process()` function will be called continuously as well. This could be a potential
pitfall when implemented carelessly. For example, if your code is of this form:

```js
//import some module which creates listeners
module.exports.process = function processTrigger() {
  const listener = createListener();
  listener.on('event', eventData => { /* some logic here */ });
};
```

then a listener is created each time the `process()` function is called. In the
case of a Realtime flow, it would mean indefinitely **creating numerous listeners
all trying to process the same event**. To avoid such a repetitive event processing
a slight alteration of above code is necessary:

```js
//import some module which creates listeners
let listener;
module.exports.process = function processTrigger() {
  if (!listener) {
    listener = createListener();
    listener.on('event', eventData => { /* some logic here */ });
  }
};
```
In this case, we will get only one listener created and the trigger will work as
expected: single listener for a single event.
