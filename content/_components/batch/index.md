---
title: Batch component
layout: component
section: Utility components
description: A component that provides an opportunity to collect messages to a batch.
icon: batch.png
icontext: Batch component
category: batch
updatedDate: 2022-07-29
ComponentVersion: 2.0.2
---

## General information

### Description
Сomponent that provides an opportunity to collect messages to a batch.

The main purpose is to provide a user with a simple collection and an opportunity to process messages in batches.

Integrators would need to split an integration logic into 2 parts. The first one should use the action `Add message to batch` which starts to collect messages. The second one should start with the `Get ready batches` trigger.

![Flow parts](img/flow-parts.png)

It uses the Maester service as a package repository, the legacy component versions support using MongoDB (versions: 4.0 and higher stable releases) as a batches repository.

> **Please be advised that the component does not support external MongoDB as a data store since version 2.0.0 (disabled support for credentials in the component)**

### Requirements

Maester microservice should be enabled on installation and what would happen if it doesn't.

## Triggers

### Get ready batches

Emits all batches that are ready to be processed.

![Get ready batches](img/get-ready-batches.png)

#### Input fields description

|Input field|Required|Description|Example|
|-----------|--------|---------|---------|
|Max time in ms before Batch is ready|false|Timeout in millisecond after batch creation, which makes batch ready for processing. Defaults to `60000 ms`|3000|
|Max records number in Batch|false|Maximum count of items in batch which makes batch ready for processing. Defaults to `100`|10|
|Max size of Batch in bytes|false|Maximum bytes size of items in batch which makes batch ready for processing `1000000(1 MB)`|500000|
|Correlation Id|true|Correlation Id between action and trigger. Correlation Id helps identify what collection of batches should be used|Flow1|
|Do Not Delete Batch After Retrieval|false|If checked, the batch will not be deleted after emit|false|

>**Important: Use the same configuration in action for correct batch processing**

## Actions

### Add message to batch

Stores a message in a batch and emits a created/updated batch with a processed item only.

![Add message to batch](img/add-message-to-batch.png)

#### Input fields description

|Input field|Required|Description|Example|
|-----------|--------|---------|---------|
|Max time in ms before Batch is ready|false|Timeout in millisecond after batch creation, which makes batch ready for processing. Defaults to `60000 ms`|3000|
|Max records number in Batch|false|Maximum count of items in batch which makes batch ready for processing. Defaults to `100`|10|
|Max size of Batch in bytes|false|Maximum bytes size of items in batch which makes batch ready for processing `1000000(1 MB)`|500000|
|Correlation Id|true|Correlation Id between action and trigger. Correlation Id helps identify what collection of batches should be used|Flow1|

>**Important: Use the same configuration in trigger for correct batch processing**

## Additional info

1. Created objects in Maester would have default TTL, please contact support in case if you need value of this property.
2. Please make sure that values of `Max time in ms before Batch is ready` are less than Maester default TTL, as you would never get your batch ready (object in Maester would be deleted before batch is ready)

## Known Limitations

1. Component uses Maester microservice, so the component is affected by it's limitations.
2. Emit rate logic is not implemented.
3. The library does not guarantee a sequence of batch items.
