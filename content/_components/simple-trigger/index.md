---
title: Simple Trigger component
layout: component
section: Utility components
description: A lightweight and efficient component designed to trigger integration flows on a scheduled basis without requiring external data sources.
icon: simple-trigger.png
icontext: Simple Trigger component
category: simple-trigger
updatedDate: 2026-03-05
ComponentVersion: 1.3.0
redirect_from:
  - /components/timer/index.html
---

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Triggers](#triggers)
    - [Simple Trigger](#simple-trigger)

## Description

A lightweight and efficient component designed to trigger integration flows on a scheduled basis without requiring external data sources. Ideal for heartbeat signals, periodic tasks, or orchestrating flows that don't depend on incoming data payloads.

## Features

- **Time-Windowed Triggers:** Leverages snapshots to track polling history.
- **Configurable Range:** Set specific start and end boundaries for trigger activation.
- **Offset Support:** Automatically defaults to the beginning of Unix time if no prior state exists.

## Triggers

### Simple Trigger

The primary trigger that emits a heartbeat message with polling metadata.

{% include img.html max-width="100%" url="img/simple-trigger.png" title="Simple trigger" %}

#### Configuration Fields

* **Start Time** (string, optional): The timestamp to start sending messages from (inclusive), using the ISO 8601 Date time UTC format (YYYY-MM-DDThh:mm:ss.sssZ). The default value is the beginning of time (January 1, 1970 at 00:00).
* **End Time** (string, optional): The timestamp to stop sending messages (exclusive), using the ISO 8601 Date time UTC format (YYYY-MM-DDThh:mm:ss.sssZ). The default value is set to never stop.

> **Please Note:** As is the case with all other trigger components, to complete the Simple-trigger setup, you must plan a [schedule](/guides/managing-flows#scheduling) for your flow. If not, the default schedule will be used.

#### Input Metadata

This trigger does not require any input metadata.

#### Output Metadata

Each emitted message contains the following body fields:

* **fireTime** (string, required): The timestamp when the trigger was executed, formatted in the ISO 8601 Date time format (YYYY-MM-DDThh:mm:ss.sssZ).
* **lastPoll** (string, required): The timestamp of the previous execution in the ISO 8601 Date time UTC format (YYYY-MM-DDThh:mm:ss.sssZ).