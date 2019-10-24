---
title: Using Snapshots
layout: article
section: Building integration flows
order: 2
since: 20191023
---

This document provides a quick guide on [creating and using Snapshots](#creating-a-snapshot) for Components in your Flows.

## Creating and Using a Snapshot
To create a [Snapshot](/getting-started/snapshot-overview.html), you need to emit it from your Component function:

`emit('snapshot',snapshot)`

Let's see how it works with querying objects by timestamp:

1\. Query all objects since 2017, 1 Jan to establish the first point of reference. Typically, this happens on the first global sync between two systems.

2\. Iterate over all objects. In some cases this stage can take a while due to the amount of data in the source system, therefore it is recommended to use paging if the originating API supports it.

3\. Calculate the last update date based on returned objects. It's not recommended to calculate the last date as current time as you can miss some objects. This stage is also dependent on the originating API properties.

4\. Emit the new last date as snapshot after iterating through all objects.

Having gone through this list, here is what we get:

```
params.snapshot = snapshot;

if (!params.snapshot || typeof params.snapshot !== "string" || params.snapshot === '') {
  // Empty snapshot
      console.warn("Warning: expected string in snapshot but found : ", params.snapshot);
      params.snapshot = new Date("2017-01-01T00:00:00.000Z").toISOString();
  }

 var newSnapshot = new Date().toISOString();

...
...
emitSnapshot(newSnapshot);
```

**IMPORTANT:** Please remember that there can be only one snapshot per step in a Flow. Each time another snapshot is made, the last one is overwritten.

**EXAMPLE:**

```
'use strict';

const elasticio = require('elasticio-node');
const messages = elasticio.messages;

exports.process = processTrigger;

function processTrigger(msg, cfg, snapshot) {
    console.log('Message %j', msg);
    console.log('Config %j', cfg);
    console.log('Snapshot %j', snapshot);

    snapshot.iteration = snapshot.iteration || 0;

    console.log('Iteration: %d', snapshot.iteration);

    snapshot.iteration += 1;

    this.emit('snapshot', snapshot);
    this.emit('data', messages.newMessageWithBody({iteration: snapshot.iteration}));
    this.emit('end');
}
```
