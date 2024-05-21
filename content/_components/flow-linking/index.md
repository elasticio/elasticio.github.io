---
title: Flow Linking component
layout: component
section: Utility components
description: A component to connect Flows
icon: flow-linking.png
icontext: Flow Linking  component
category: flow-linking
ComponentVersion: 1.0.3
updatedDate: 2024-05-21
---

## General information
### Environment variables

No need to set up any environment variables manually.

However, the component needs the next environment variables: 
- `ELASTICIO_API_URI`
- `ELASTICIO_API_USERNAME` 
- `ELASTICIO_API_KEY` 
- `ELASTICIO_WORKSPACE_ID`

### Credentials

* **Shared Secret** (string, required): A value to be used to authenticate all HTTP calls.

## Triggers

### Receive trigger from another flow

This trigger allows you to receive and validate requests from other actions.

> **Note:** You can use the [HTTP Reply component](/components/request-reply) with the Reply action as the last step of the flow to get a result of the execution.

#### Output Metadata

* Body from the request (Object, required).

## Actions

### Trigger another flow

This action allows you to trigger another flow with a request body.

> **Note:** There are no limits on the number of flows that trigger the same flow with the Receive trigger.

#### Input Metadata

* **Flow Name to Call** (String Enum, required): A single flow from a list of flows that have the "Flow Linking Component" as the trigger within the current workspace.

    >**Note:** `Enum` is only available if flows amount < 100. In other cases input the name by yourself.

* **Data to transfer** (Object, required): JSON object containing data to send into the next flow.

#### Output Metadata

* **Response** (Object, required): Response of triggering request.

## Known limitations

* Receive trigger from another flow has a restriction on receiving a sample, you need to provide it manually. Safely ignore the following error `"Shared Secret" is not valid!`.
* Flow matching should be done by Name. If the number of matching flows is not exactly 1, then an error will be thrown.
* `Flow Name to Call` lists all flows that contain `Flow Linking Component` technical trigger name - `receiveTrigger`.
