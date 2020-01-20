---
title: Real-time Flows and component re-deployment
description: Here we will describe what is a Real-time flow and how to update component code.s
layout: article
section: Developing Components
order: 1
---

## Real-time flow

Real-time Flows are up and running consistently which means:

*   When the flow starts our platform will use the latest revision of your component's code available in you repository at that moment.
*   When the flow starts your component is deployed into a container which will be up and running indefinitely due to the nature of the Real-time Flows to reach sub-seconds speeds.

More information [here](/guides/realtime-flows).


## Component code updating

When you need to update the component code to use a new functionality you need to
restart your flow to use the new changes. However, **you don't need to restart the flow manually**.
The platform will restart it for you if you follow these steps:

### 1. Deploy the new version of your component

Deploy the new version of your component to the same repository. Platform will
create a new version of your component and set it as recent.

### 2. Make a new draft of your integration flow

Create a new draft of your integration flow by navigating to the flow designer view
and using the edit button.

### 3. Adjust your integration flow

Adjust your integration flow setup and make the necessary changes. For example,
if you have added a new Action or Trigger that you would like to use. It will only
be available after you restart the active flow. No matter even if you have deployed
your changes already. The reason for that is:

>**When the container containing your code is up and running it has no way of knowing that the code in your repository has changed**.

### 4. Publish your draft

Publish your draft. This would stop the active integration flow and replace
it with a new version of the flow and start it again.

>**Note**: It would take some time until the new version of your flow is active again. We call it a **warm-up time**.

The warm-up time is affected by the number of integration steps you have in your flow.
If you see 3 steps in UI then it is usually 5 steps in reality since there are 2 additional
steps by the mapper component. The platform will restart all these steps and establish
connectivity between them.

## Real-time flows and trigger process function

Real-time flows are designed to reach sub-second execution speeds by having all
the components always up and running. The most common use case for such type of
integration flow is a real-time event processing from external systems. In such
cases, the trigger `process()` function connects to the source of external events
and starts receiving data.

The Real-time flow will run indefinitely unless stopped which means the trigger
`process()` function will be called continuously as well. This could be a
potential pitfall when implemented carelessly. For example, if your code is of this form:

```js
//import some module which creates listeners
module.exports.process = function processTrigger() {
  const listener = createListener();
  listener.on('event', eventData => { /* some logic here */ });
};
```

then a listener is created each time the `process()` function is called. In the
case of a Real-time flow, it would mean indefinitely creating numerous listeners
all trying to process the same event. To avoid such a repetitive event processing
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

## Related links

- [Building real-time flows](/guides/realtime-flows)
