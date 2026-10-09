---
title: Flow Linking component
layout: component
section: Utility components
description: The Flow Linking component enables synchronous communication and data exchange between different flows in the same workspace on the platform.
icon: flow-linking.png
icontext: Flow Linking  component
category: flow-linking
ComponentVersion: 1.2.0
updatedDate: 2026-10-09
---

## Table of Contents
* [General Information](#general-information)
    * [Description](#description)
    * [Environment Variables](#environment-variables)
* [Credentials](#credentials)
* [Actions](#actions)
    * [Trigger another flow](#trigger-another-flow)
* [Triggers](#triggers)
    * [Receive trigger from another flow](#receive-trigger-from-another-flow)
* [Known Limitations](#known-limitations)

## General Information

### Description

{{page.description}}

### Environment Variables

Environment variables are automatically injected by the platform:
* `ELASTICIO_API_URI`: Platform API endpoint URL.
* `ELASTICIO_API_USERNAME`: API service username.
* `ELASTICIO_API_KEY`: API service key.
* `ELASTICIO_WORKSPACE_ID`: ID of the current workspace.
* `ELASTICIO_WEBHOOK_URI` / `ELASTICIO_FLOW_WEBHOOK_URI`: Base URL for triggering flow webhooks.

## Credentials

* **Shared Secret** (`sharedSecret`, string, required): A secret string configured identically on both the calling action and the receiving trigger to authenticate execution requests.
* **Webhook Auth** (`auth`, optional): Additional webhook authentication settings if applicable.

## Actions

### Trigger another flow
This action triggers a target flow in the workspace via its webhook URL and waits for the response.

> **Please Note:** There are no limits on the number of flows that trigger the same flow with the Receive trigger.

#### Configuration Fields

* **Lookup by id** (`lookupById`, boolean, optional): If checked, the component looks up the target flow by its **Flow ID** instead of **Flow Name**.
* **Retry errors** (`doRetry`, boolean, optional): If checked, the component automatically retries the webhook call in case of server errors (`5xx`, except `504 Gateway Timeout`) or `404 Not Found` if enabled.
* **Number of retry attempts** (`retryCount`, number, optional): Number of retry attempts when retries are enabled (default: `3`, maximum: `5`).
* **Initial delay between retries (in seconds)** (`initialDelay`, number, optional): Initial delay before the first retry attempt (default: `1`, maximum: `10`). Subsequent delays scale exponentially with randomized jitter to prevent request stampedes.
* **Retry 404 (Not Found)** (`retryOn404`, boolean, optional): If checked, `404 Not Found` responses will also be retried. Recommended for eventual consistency workflows where target records or resources may still be propagating.
* **Do not throw error on failed calls** (`dontThrowErrorOnFailedCalls`, boolean, optional): If checked, non-2xx HTTP responses will not fail the flow step. Instead, the component emits an output message containing the response data and HTTP status code, allowing downstream router or filter steps to handle errors gracefully.

#### Input Metadata
* If `Lookup by id` is unchecked:
  * **Flow Name to Call** (`flowName`, string enum, required): The name of the target flow within the current workspace that has the Flow Linking Component's `Receive trigger from another flow` trigger.
* If `Lookup by id` is checked:
  * **Flow Id to Call** (`flowId`, string enum, required): The ID of the target flow within the current workspace.
* **Data to transfer** (`data`, object, required): JSON object payload to send to the target flow.

```json
{
  "flowName": "Order Validation Flow",
  "data": {
    "orderId": "ORD-12345",
    "customerId": "CUST-987"
  }
}
```

#### Output Metadata

**Standard Output (when `dontThrowErrorOnFailedCalls` is disabled):**
```json
{
  "result": {
    "status": "validated",
    "processedAt": "2026-09-30T10:00:00.000Z"
  }
}
```

**Extended Output (when `dontThrowErrorOnFailedCalls` is enabled):**
```json
{
  "result": {
    "error": "Customer not found",
    "code": "ENTITY_NOT_FOUND"
  },
  "statusCode": 404
}
```

## Triggers

### Receive trigger from another flow
Receives incoming payloads triggered by the `Trigger another flow` action, validates the shared secret, and emits the payload to subsequent steps in the flow.

> **Please Note:** Use the [HTTP Reply Component](/components/request-reply) as the final step in the receiving flow to return synchronous responses back to the caller.

#### Input Metadata
* Incoming HTTP headers and body received from the calling webhook request.

#### Output Metadata
* The JSON body forwarded from the caller:
```json
{
  "orderId": "ORD-12345",
  "customerId": "CUST-987"
}
```

## Known Limitations

* **Platform Webhook Timeout**: Webhook calls are subject to the platform's hard 3-minute (180s) gateway timeout. Total cumulative retry duration is kept within safe limits to prevent 504 timeouts.
* **Sample Retrieval**: The `Receive trigger from another flow` trigger cannot retrieve samples dynamically from the platform UI; provide a manual sample JSON. Safely ignore the UI warning `"Shared Secret" is not valid!` during sample configuration.
* **Flow List Scope**: `Flow Name to Call` / `Flow Id to Call` dropdowns list only flows that use the Flow Linking component's technical trigger name (`receiveTrigger`).
