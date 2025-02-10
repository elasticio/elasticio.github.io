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

To set the custom RAM memory limits on your component open its repository and click on the **Enviroment variables** link.
![Env var repo](/assets/img/on-premises/mem-and-cpu-limit-envvars/env-vars-repo.png)

We have set recommendations for each component for the minimum amount of RAM
memory to use `EIO_REQUIRED_RAM_MB`. Check if your component has such requirement and set it accordingly by clicking **Create a new variable** button.
![Env vars](/assets/img/on-premises/mem-and-cpu-limit-envvars/env-vars.png)

To set the custom RAM memory limit for one flow, consider using `EIO_REQUIRED_RAM_MB_FLOW_${task.id}` environment variable. This way the component will use more RAM memory only in specified flow and you will not suddenly increase the RAM memory consumption for every flow that uses the component.
![Edit Env var](/assets/img/on-premises/mem-and-cpu-limit-envvars/edit-env-vars.png)

> **Please Note**: Increase environment variable only as a last resort. The maximum allowed platform value on allocated and requested processing memory (RAM) for each pod in the Kubernetes cluster is **4GB (4096)**. Consider increasing memory incrementally, by adjusting and testing your flow. For RAM increases on platform components, [contact support](/admin/reporting-issue.html#how-to-contact-us) to discuss your use case.