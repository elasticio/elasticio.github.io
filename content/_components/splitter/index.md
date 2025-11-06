---
title: Splitter component
layout: component
section: Utility components
description: The Splitter component provides powerful, fundamental tools for message flow control on the platform.
icon: splitter.png
icontext: Splitter component
category: splitter
updatedDate: 2025-11-05
ComponentVersion: 1.6.0
---

## Table of Contents
* [Description](#description)
  * [Environment variables](#environment-variables)
  * [Technical Notes](#technical-notes)
* [Actions](#actions)

## Description

The Splitter component provides powerful, fundamental tools for message flow control on the platform. It allows you to deconstruct a single message containing an array into multiple individual messages, or conversely, to aggregate multiple individual messages into a single, grouped message.

This component is essential for scenarios requiring iteration over data sets or for batching data before sending it to systems that have rate limits or prefer batched inputs.

At the moment, there are two actions that allow you to process incoming data. [Split](actions.html#split-on-jsonata-expression) action takes the incoming message body and applies the configured JSONata transformation on it. [Re-assemble Messages action](actions.html#re-assemble-messages) is the opposite of the Split action. In this document, we will introduce you to all the technical aspects of the component, describe both actions in detail and show an [example of using](usage-example) a Splitter component.

### Environment variables

Component does not have any required environment variables, but we suggest to use `EIO_REQUIRED_RAM_MB` in order to avoid `Component run out of memory and terminated` error, recommended value of allocated memory is `512` MB.

> **Please Note:** From the platform version [20.51](/releases/20/51) we deprecated the
> component `LOG_LEVEL` environment variable. Now you can control logging level per each step of the flow.

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Splitter component like [changelog](/components/splitter/technical-notes#changelog).

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

* [Split on JSONata Expression](actions.html#split-on-jsonata-expression) - This action takes the incoming message body and applies the configured JSONata tranformation on it.
* [Re-assemble Messages](actions.html#re-assemble-messages) - The opposite of the Split action.
