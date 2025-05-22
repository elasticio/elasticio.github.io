---
title: Containers Page
description: This document provides basic information on containers and the containers page.
layout: article
section: Building integration flows
category: building integration flows
order: 10
redirect_from:
  - /getting-started/containers.html
---

This document provides basic information on [containers](#containers) and the [containers page](#containers-page).

## Containers

A container serves as a standardized software unit that encapsulates code and all its dependencies, ensuring consistent and efficient execution across various computing environments. Specifically, Docker container images represent lightweight, self-contained packages of software that encompass everything essential for running an application: code, runtime, system tools, system libraries, and configuration settings.

In the flows, individual containers are created for each step, allowing components to perform their designated tasks. However, it's crucial to note that if an error occurs during the container initialization process, the affected component will be unable to fulfill its functions, consequently impacting the entire flow. To address such issues, we provide a dedicated containers page where you can access comprehensive information about the status of each container associated with a particular component in your flow.

For example, consider a scenario where your flow begins with a simple webhook component, but the execution doesn't proceed as expected. In such cases, if you're unsure about the root cause of the problem, your initial course of action should involve visiting the containers page and examining the status of the container responsible for the webhook component within your workflow.

>**Please note:** that numerous factors can lead to flow errors. Among the most frequently encountered issues are ["Component Failed to Start"](/guides/platform-behavior#component-failed-to-start) and ["Component Ran Out of Memory"](/guides/platform-behavior#component-run-out-of-memory) errors.  For a more detailed insight into these errors and how to address them, we recommend referring to the dedicated articles that provide comprehensive information and solutions for these issues.

## Containers Page

On the Containers page, you'll encounter the following states:

* **Running** (Green Flag): Indicates that the container is currently operational.
* **Finished** (Green Flag): Indicates that the container has been successfully shut down.
* **Finished** (Red Flag): Suggests that the container has been stopped due to a registered error.
* **Killed** (Green Flag): Signifies a successful termination of the container.
* **Killed** (Red Flag): Indicates that the container was abruptly terminated by the operating system.
* **Failed** (Red Flag): Indicates that the container was abruptly terminated due to an error.

{% include img.html max-width="100%" url="/assets/img/getting-started/exec-page/container-states.png" title="Container States" %}

To access specific information for a container, simply click on the 'Step Name.' On the individual container page, you will find the following details:

* **Status:** The current status of the container.
* **Flow Name:** The name of the flow associated with this container. Clicking on the flow name opens the corresponding flow designer page.
* **Start Date:** The date and time when the container started.
* **Stop Date:** The date and time when the container stopped.
* **Exit Code:** The current or last status code of the container.
* **Reason:** A description of the current or last status code.
* **Filtering:** Options for filtering the container's logs, including Search, Log Level, and Date Range.
* **Details:** Log entries with Date/Time, Log Level, and Description.

{% include img.html max-width="100%" url="/assets/img/getting-started/exec-page/container.png" title="Container" %}
