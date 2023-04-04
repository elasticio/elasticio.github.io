---
title: Splitter component
layout: component
section: Utility components
description: The Splitter integration connector was designed to work together with the JSONata-powered Mapper.
icon: splitter.png
icontext: Splitter component
category: splitter
updatedDate: 2023-03-28
ComponentVersion: 1.4.4
---

## Description

The Splitter processes income messages containing multiple elements that might have to be processed in different ways. The splitter handles incoming messages that contain multiple elements that might need to be handled differently. At the moment, there are two actions that allow you to process incoming data. [Split](actions.html#split-on-jsonata-expression) action takes the incoming message body and applies the configured JSONata transformation on it. [Re-assemble Messages action](actions.html#re-assemble-messages) is the opposite of the Split action. In this document, we will introduce you to all the technical aspects of the component, describe both actions in detail and show an [example of using](usage-example) a Splitter component.

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

* [Split on JSONata Expression](actions.html#split-on-jsonata-expression) - This action takes the incoming message body and applies the configured JSONata tranformation on it.
* [Re-assemble Messages](actions.html#re-assemble-messages) - The opposite of the Split action.
