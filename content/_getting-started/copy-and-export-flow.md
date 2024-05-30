---
title: Copy and Export flow
layout: article
section: Platform Features
description: This document explains how to copy and export your flows.
order: 10
category: platform-features
---

## Description

We are introducing a new functionalities:

 * Copy Flow inside your workspace - [Copy Flow](#copy-flows).
 * Export Flow from one workspace to the another - [Export Flow](#export-flows).

>**Please Note:** You must have at least Integrator level access in both workspaces for this to work.

## Copy Flow

You can copy your flow in the same workspace. For example you would like to create a new flow very similar to the existing one:

![Copy flows](/assets/img/getting-started/copy-flow/copy-flow.png)

You need to enter the new flow name:

![Enter name](/assets/img/getting-started/copy-flow/enter-flow-name.png)

An exact copy of the flow will be created in a draft mode. Then you can rename and publish the draft:

![Exported flow](/assets/img/getting-started/copy-flow/exported-flow.png)

## Export Flow

You can export your flow from one workspace in to another. For example you would like to export your flow from development to production workspace. Please note that the flow can be successfully exported only if the components used in it are accessible in the target workspace.

![Export flow](/assets/img/getting-started/copy-flow/export-flow.png)

You need to select the destination contract and workspace:

![Select Destination](/assets/img/getting-started/copy-flow/select-destination.png)

You can choose a flow to **override** with this flow. If no flow to override is chosen, a new flow will be created:

![Override flow](/assets/img/getting-started/copy-flow/override-flow.png)

> **Please Note:** When you override the flow, a draft will be created. The overridden flow will only be replaced with a exported flow when you publish a draft. Your original flow is saved as a flow version and you can revert it back from a flow History section.

If a flow you want to export contains components that use **Topics** you have to choose a target Topic to override which needs to be exported as well:

![Choose topics](/assets/img/getting-started/copy-flow/choose-topics.png)

> **Please Note**: If the flow has more than one pub/sub Topic we will not copy topics into destination flow.

A new flow with same name will be created in draft mode. You need to choose the credentials and publish the draft:

![Exported flow](/assets/img/getting-started/copy-flow/exported-flow.png)

## API Endpoints

You can use API endpoints with copy flow functionality. The flow will be copied into a draft of the new/existing flow. So to make flow work the draft should be published manually. That is done to avoid disruptions of already running flow (flow is not stopped or changed in any other way except draft), and because most likely flow copy will require additional configuration. Flow can be copied in any workspace and contract, of course, if a user has enough privileges to read the original flow and has enough privileges to edit flow in the destination workspace. Platform forbids copying flow if flow components can not be used in the destination context (e.g. component visibility is restricted to the team, and you are copying flow in another contract). Check our [API-docs documentation pages]({{site.data.tenant.apiDocsUri}}/v2#/flows/post_flows__flow_id__copy) for more details.
