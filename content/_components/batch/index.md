---
title: Batch component
layout: component
section: Utility components
description: A component that provides an opportunity to collect messages to a batch.
icon: batch.png
icontext: Batch component
category: batch
updatedDate: 2026-10-08
ComponentVersion: 2.0.10
---

## Table of Contents

- [General Information](#general-information)
  - [Description](#description)
  - [Architecture and Usage Pattern](#architecture-and-usage-pattern)
  - [Requirements](#requirements)
  - [Environment Variables](#environment-variables)
- [Credentials](#credentials)
- [Triggers](#triggers)
  - [Get ready batches](#get-ready-batches)
- [Actions](#actions)
  - [Add message to batch](#add-message-to-batch)
- [Additional Info](#additional-info)
- [Known Limitations](#known-limitations)

## General information

### Description

The **Batch component** provides batching capabilities within the iPaaS platform. It allows users to collect individual incoming messages into batches based on configured conditions (such as record count, byte size, or maximum lifetime/timeout) and release them downstream once ready.

### Architecture and Usage Pattern

A typical batch integration logic is split across two flows:
1. **Collector Flow**: Receives incoming events and uses the `Add message to batch` action to aggregate records into batches stored in the platform's internal Maester object store.
2. **Consumer Flow**: Starts with the `Get ready batches` polling trigger, which regularly inspects Maester, finds batches meeting the readiness criteria, locks them, and emits ready batches for processing.

### Requirements

- The **Maester** object storage service must be available in your platform environment (standard in modern platform installations).

### Environment Variables

No custom environment variables are required. Standard platform variables (e.g. `ELASTICIO_OBJECT_STORAGE_URI`) are injected automatically by the platform runtime.

## Credentials

No credentials are required. Since version `2.0.0`, all batch persistence is managed securely and natively via the platform's internal Maester service.

## Triggers

### Get ready batches

A polling trigger that periodically checks for open batches that satisfy any of the configured completion criteria (lifetime, records count, or byte size), locks them, and emits each ready batch for downstream processing.

{% include img.html max-width="100%" url="img/get-ready-batches.png" title="Get ready batches" %}

#### Configuration Fields

| Field Name | Required | Type | Default | Description |
|:-----------|:--------:|:-----|:--------|:------------|
| **Correlation Id** (`correlationId`) | **Yes** | String | - | Identifier linking the collector action and polling trigger to the same batch collection (e.g. `OrdersSync`). |
| **Batch lifetime** (`maxWaitTime`) | No | Number (ms) | `60000` | Maximum time in milliseconds before an open batch is considered ready for processing. |
| **Max records in Batch** (`maxItemsNumber`) | No | Number | `100` | Maximum number of items in a batch before it is marked ready. |
| **Max size of Batch** (`maxSize`) | No | Number (bytes) | `1000000` | Maximum batch payload size in bytes (defaults to 1 MB) before it is marked ready. |
| **Do Not Delete Batch After Retrieval** (`doNotdeleteBatchAfterRetrieval`) | No | Boolean | `false` | If enabled, the batch will be marked with status `SUCCESS` in Maester rather than being deleted after emit. |

> **Important:** Always use the same `correlationId`, `maxWaitTime`, `maxItemsNumber`, and `maxSize` values in both the action and trigger for consistent batching behavior.

#### Output Metadata
```json
{
  "id": "c1f8d4e0-9e12-11ed-a8fc-0242ac120002",
  "items": [
    {
      "id": "1",
      "item": {
        "orderId": "ORD-1001",
        "customer": "John Doe",
        "total": 99.50
      }
    },
    {
      "id": "2",
      "item": {
        "orderId": "ORD-1002",
        "customer": "Jane Smith",
        "total": 149.00
      }
    }
  ],
  "status": "LOCKED",
  "itemsCount": 2,
  "size": 154,
  "createdAt": 1727680000000,
  "activeBatch": "0"
}
```

## Actions

### Add message to batch

Stores an incoming item into an open batch. If no matching open batch exists or if the existing batch would exceed the configured limits, a new batch is created. The action emits the batch structure containing only the processed item.

{% include img.html max-width="100%" url="img/add-message-to-batch.png" title="Add message to batch" %}

#### Configuration Fields

| Field Name | Required | Type | Default | Description |
|:-----------|:--------:|:-----|:--------|:------------|
| **Correlation Id** (`correlationId`) | **Yes** | String | - | Correlation ID identifying the target collection of batches (e.g. `OrdersSync`). |
| **Batch lifetime** (`maxWaitTime`) | No | Number (ms) | `60000` | Maximum time in milliseconds before the batch is considered ready. Must be greater than 0. |
| **Max records in Batch** (`maxItemsNumber`) | No | Number | `100` | Maximum count of items in a single batch before it becomes ready. |
| **Max size of Batch** (`maxSize`) | No | Number (bytes) | `1000000` | Maximum batch size in bytes (defaults to 1 MB).

#### Input Metadata
```json
{
  "id": "1",
  "item": {
    "orderId": "ORD-1001",
    "customer": "John Doe",
    "total": 99.50
  }
}
```

#### Output Metadata
```json
{
  "id": "c1f8d4e0-9e12-11ed-a8fc-0242ac120002",
  "items": [
    {
      "id": "1",
      "item": {
        "orderId": "ORD-1001",
        "customer": "John Doe",
        "total": 99.50
      }
    }
  ]
}
```

---

## Additional Info
1. **Maester TTL:** Objects created in Maester have a platform default Time-To-Live (TTL). Ensure that `Batch lifetime` (`maxWaitTime`) is significantly lower than the platform's default Maester object retention policy to prevent premature deletion of open batches.
2. **Polling Schedule:** The `Get ready batches` trigger is a polling trigger executed on a cron schedule configured in the consumer flow. If no batches meet the readiness criteria at trigger execution time, it will log `Ready batches count: 0` and complete without emitting messages.

## Known Limitations
1. **Sequential Order:** The component does not guarantee strict FIFO ordering of items within or across batches.
2. **Maester Dependency:** All persistence operations rely on the platform Maester microservice; transient network/DNS blips are handled with built-in retries and in-memory queue protection.