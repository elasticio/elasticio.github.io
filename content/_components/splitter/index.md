---
title: Splitter component
layout: component
section: Utility components
description: The Splitter integration connector was designed to work together with the JSONata-powered Mapper.
icon: splitter.png
icontext: Splitter component
category: splitter
updatedDate: 2021-07-23
ComponentVersion: 1.2.1
---

## Description

The Splitter processes income messages containing multiple elements that might have to be processed in different ways. The Splitter emits out the composite message into individual messages, each containing data related to one item.

### Environment variables

Component does not have any required environment variables, but we suggest to use `EIO_REQUIRED_RAM_MB` in order to avoid `Component run out of memory and terminated` error, recommended value of allocated memory is `512` MB.

> Please Note: From the platform version [20.51](/releases/2020-12-17) we deprecated the
> component `LOG_LEVEL` environment variable. Now you can control logging level per each step of the flow.

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Splitter component like [changelog](/components/splitter/technical-notes#changelog).

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

* [Split on JSONata Expression](actions.html#split-on-jsonata-expression) - This component takes the incoming message body and applies the configured JSONata tranformation on it.
* [Re-assemble Messages](actions.html#re-assemble-messages) - Inverse of the split action.
