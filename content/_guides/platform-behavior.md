---
title: Platform Behavior
layout: article
section: Building integration flows
order: 1
since: 20190924
---

This document provides information on the peculiarities of the Platform behavior, including [Flow suspension and stopping](#flow-suspended-vs-stopped), known timeouts, thresholds and errors.

## Flow Suspended vs. Stopped
If a Flow gets `5` errors in `5` minutes, it is going to be suspended. Suspension is more of a pause, than a stop. All non-processed messages in a suspended Flow are saved in RabbitMQ queue for 14 days. Then they get dropped if the user did not fix the issues and did not resume the Flow. In [limited workspaces](/getting-started/contracts-and-workspaces.html), Flows are stopped instead of being suspended. A stopped Flow doesn't save any non-processed messages - everything is dropped. You can stop a Flow manually by pressing the *Stop* button.   
