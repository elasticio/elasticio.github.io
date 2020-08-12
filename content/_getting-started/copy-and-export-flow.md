---
title: Copy and Export flow
layout: article
section: Platform Features
description: This document provides basic information on how to copy and export flows.
order: 6
category: platform-features
---

## Description

We are introducing a new functionalities:

 * copy flows inside your workspace - [Copy flows](#copy-flows).
 * copy flows from one workspace to the another - [Export flows](#export-flows).

> **Please Note:** You must have at least Integrator level access in both workspaces for this to work.

## Copy flows

You can copy your flow in the same workspace. For example you would like to create a new flow very similar to the existing one:

![Copy flows](/assets/img/getting-started/copy-flow/copy-flow.png)

You need to enter the new flow name:

![Enter name](/assets/img/getting-started/copy-flow/enter-flow-name.png)

A new flow with same name will be created in draft mode. You need to choose the credentials and publish the draft:

![Exported flow](/assets/img/getting-started/copy-flow/exported-flow.png)

## Export flows

You can export your flow from one workspace in to another the same contract. For example you would like to export your flow from development to production workspace. Please note that the flow can be successfully exported only if the components used in it are visible in the target workspace.

![Export flow](/assets/img/getting-started/copy-flow/export-flow.png)

You need to select the destination workspace:

![]()

You can choose a flow to **override** with this flow. If no flow to override is chosen, a new flow will be created:

![Override flow](/assets/img/getting-started/copy-flow/override-flow.png)

A new flow with same name will be created in draft mode. You need to choose the credentials and publish the draft:

![Exported flow](/assets/img/getting-started/copy-flow/exported-flow.png)
