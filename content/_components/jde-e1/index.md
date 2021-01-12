---
title: JDE E1 Orchestrator component
layout: component
section: Service components
description: This is the component for working with Oracle JDE Edwards EnterpriseOne Orchestrator service on platform.
icon: jde-e1.png
icontext: JDE E1 Orchestrator component
category: JDE E1 Orchestrator component
createdDate: 2020-09-09
updatedDate: 2020-09-17
---

## Latest changelog

**1.0.0 (September 10, 2020)**

* Add `Execute an Orchestration` action

> To see the full **changelog** please use the following [link](changelog).

## Description

This is the component for working with Oracle JDE Edwards EnterpriseOne Orchestrator service on [{{site.data.tenant.name}} platform](https://www.{{site.data.tenant.name}} "{{site.data.tenant.name}} platform").

### Purpose

The component provides ability to connect to Oracle JDE Edwards EnterpriseOne Orchestrator service (JDE E1) and execute orchestrations.

### How works. API version

The component is based on [REST API for JD Edwards EnterpriseOne AIS Server](https://docs.oracle.com/cd/E53430_01/EOTRS/toc.htm 'REST API for JD Edwards EnterpriseOne AIS Server') version 3.0.

## Requirements

### Environment variables

| Name|Mandatory|Description|Values|
|----|---------|-----------|------|
| `NODE_TLS_REJECT_UNAUTHORIZED`| false | For ignoring server https certificate | `0`

> Please Note: From the platform version [20.51](/releases/2020-12-17) we deprecated the
> component `LOG_LEVEL` environment variable. Now you can control logging level per each step of the flow. 

### Credentials

This component use JD Edwards EnterpriseOne authentication for mobile enterprise applications. It involves:
- `JDE E1 Domain`
- `Username`
- `Password`
- `Device Name`. The original security model put in place for mobile applications still applies, even for non-mobile clients. The `Device Name` (or `Device ID`) is an arbitrary string.

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Execute an Orchestration

Execute the orchestration with the specified parameters on JDE E1 server and return orchestration results.

#### Input fields description

* **Orchestration name** - a dropdown list where you should choose an orchestration which you want to execute.

#### Metadata description

Orchestration input formats are defined within the orchestration, and they are all unique. Use the Orchestrator Studio to create or modify orchestrations.

#### Limitations

* All JDE `Date` types represented in GUI as a `String`
