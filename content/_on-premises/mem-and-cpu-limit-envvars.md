---
layout: article
title: Memory Configurations
order: 3
section: Operation Guides
description: This document provides information on how to configure default memory and CPU limits.
category: operation
---

{: .no_toc}

{{page.description}} In case a Component tries to consume more memory than the
configured limit, the Platform will stop the pod. If the problem persists for XXX
times in YYY minutes, the task gets suspended. These XXX and YYY values are
configured in Wiper.

1. TOC
{:toc}

## List of Environment Variables per Installation

The table below contains the default environment variables set per installation,
their recommended values and their descriptions. **These values are recommended as optimal for a default platform installation**, and are configured in `values.yaml` file of [HELM3 deployment](/on-premises/common-values).
In case the environment variables were set
[per component](#list-of-environment-variables-per-component), they override those
set configured for installation.

| **Environment Variable**                    | **Value** | **Description**                                   |
|----------------------------------|-----------------|---------------------------------------------------|
| `COMPONENT_MEM_DEFAULT`           | 205 | Sets the default memory value in MB for a Component pod per installation.   |
| `COMPONENT_MEM_DEFAULT_LIMIT`     | 256 | Sets the maximum memory value in MB for a Component pod per installation.   |
| `COMPONENT_MEM_JAVA`             | 512  | Sets the default memory value in MB for a Java component pod per installation.   |
| `COMPONENT_MEM_JAVA_LIMIT`       | 512  | Sets the maximum memory value in MB for a Java component pod per installation.   |
| `COMPONENT_CPU`                  | 0.1  | Sets the default CPU value for a Component pod per installation.    |
| `COMPONENT_CPU_LIMIT`            | 1    | Sets the maximum CPU value for a Component pod per installation.    |

Note that values for Java Components are higher than those for other Components,
as typically Java Components require more resources.

## List of Environment Variables per Component

The table below contains the default environment variables set per Component and
their descriptions. These environment variables should be configured for components
that require exceptions from default values. They will override the values set per installation.

| **Environment Variable**                    | **Description**                               |
|----------------------------------|---------------------------------------------------|
| `EIO_REQUIRED_RAM_MB`            | Sets the memory value in MB for a Component pod.   |
| `EIO_REQUIRED_RAM_MB_FLOW_${task.id}`      | Sets the maximum memory value in MB for a Component pod per Flow. **Note:** ${task.id} is a variable for your Flow ID.  |
