---
title: Simple-trigger component
layout: component
section: Utility components
description: A component used to trigger integration flows without requesting data from any services.
icon: simple-trigger.png
icontext: Simple-trigger component
category: simple-trigger
updatedDate: 2023-06-30
ComponentVersion: 1.2.0
redirect_from:
  - /components/timer/index.html
---

## Description

This component serves as a trigger for integration flows without requiring data from any services.

## Triggers

### Simple trigger

This trigger sends a message with information when the current and previous messages are sent.

{% include img.html max-width="100%" url="img/simple-trigger.png" title="Simple trigger" %}

#### Configuration Fields

* **Start Time** (string, optional): The timestamp to start sending messages from (inclusive), using the ISO 8601 Date time UTC format (YYYY-MM-DDThh:mm:ss.sssZ). The default value is the beginning of time (January 1, 1970 at 00:00).
* **End Time** (string, optional): The timestamp to stop sending messages (exclusive), using the ISO 8601 Date time UTC format (YYYY-MM-DDThh:mm:ss.sssZ). The default value is set to never stop.

> **Please Note:** As is the case with all other trigger components, to complete the Simple-trigger setup, you must plan a [schedule](/guides/managing-flows#scheduling) for your flow. If not, the default schedule will be used.

#### Input Metadata

This trigger does not require any input metadata.

#### Output Metadata

* **fireTime** (string, required): The timestamp when the trigger was executed, formatted in the ISO 8601 Date time format (YYYY-MM-DDThh:mm:ss.sssZ).
* **lastPoll** (string, required): The timestamp of the previous execution in the ISO 8601 Date time UTC format (YYYY-MM-DDThh:mm:ss.sssZ).
