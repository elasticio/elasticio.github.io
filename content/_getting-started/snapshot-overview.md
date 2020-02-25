---
title: Snapshot Feature
layout: article
section: Platform Features
description: This document provides basic information on Snapshot feature and a few real-life use case.
order: 9
category: platform-features
since: 20180102
---

This document provides basic information on [Snapshot](#component-snapshots) feature and a few real-life [use case](#use-cases).

## Component Snapshots

You may have heard of snapshots before, in terms of backup or other data-related topics. Basically, a snapshot is a saved state that you can revert to if needed. It can be an OS snapshot, an application snapshot, and in our case - a [Flow](integration-flow) step snapshot.

Containers that house the steps often get started and stopped, for example, to conserve resources. When a container is stopped, the [Component](integration-component) loses all the data that was in processing. In case this Component has to start again, it will have to request and process the same data all over again.

That's where snapshots come in handy. A snapshot contains information about Component state when it was run last. The next time that Component runs, it will start from the same point it ended the last time. Basically, a snapshot saves a step's last action. This way:

- The Component avoids possible data duplication caused by overwriting the same data every time it starts.

- The Platform saves time and resources by keeping the data the Component already processed.

It is important to understand, that taking snapshots and using them is an asynchronous process. This means that if a Component fails before another snapshot is taken, it will lose all the data between failure and the last snapshot.

Also, an important thing is that there can only be one snapshot per step in a Flow. A snapshot is limited to `5 KB`, so **please refrain from trying to use it as an intermediate database and writing unnecessary data there**.  

## Use Cases

Obviously, there are many similar Components, so rather than mention their names, we will base the scenarios on Component functionality:

- A Component requests particular data periodically. Snapshots allow such Components to save the time of last data request, so they know which part of the data to include in the next request.

- A Component queries particular data by ID. Snapshots allow such Components to know which IDs were already read, so next time they won't have to do the same job again.

- A Component works by iterations on session basis, and every session has its own ID. Snapshots allow such Components to correlate sessions by ID, so every next iteration is consistent.

So, basically, in each of these use cases the snapshot registers **the last action** by some marker, and allows the Component to proceed from the same point next time it runs.

## Related links

- [Using Snapshots](/guides/using-snapshots)
- [Integration Flow Overview](integration-flow)
- [Integration Component Overview](integration-component)
