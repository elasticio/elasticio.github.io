---
title: Scheduled executions
description: This document provides information on scheduled executions.
layout: article
section: Building integration flows
category: building integration flows
order: 9
---

## Scheduled executions

Scheduled Executions are a critical feature designed to address configuration challenges that arise when using a component within a specific node in a particular flow. These challenges are often dynamic and context-dependent, making it difficult to predefine all configuration options. To illustrate this, consider the example of a component with a module that retrieves a list of products from various e-commerce platforms. In such cases, there are three dynamic parameters that need to be configured:

1. Category: Each e-commerce installation has its own unique set of product categories, and the choice of category impacts the data structure of the resulting messages (metadata).

2. Metadata: Metadata associated with a selected category must be retrieved for each use case.

3. Credentials: Every client employs their own set of credentials to connect the connector with their specific e-commerce platform installation. These credentials need to be validated to prevent potential errors when using the component.

To tackle these challenges, we introduce the concept of Scheduled Executions, which allows the execution of special methods within a component. These methods include:

* `selectModel`: Retrieves available options for configuring a parameter of the component when used in a specific node within a flow.
* `getMetaModel`: Fetches metadata associated with a specific configuration of a node in a flow.
* `verifyCredentials`: Validates the validity of the credentials for a particular component configuration.

All these methods are executed in the same environment as the component/module during the execution of flows.

## Scheduled Execution Workflow

The execution of a component is an asynchronous process. When a client requests an execution, it is scheduled and awaits the availability of a worker. Once a worker becomes available, the component is executed, and the results are sent back to the client. Since the results cannot be immediately generated and returned, the client must engage in polling to retrieve them.

>For a more detailed understanding of asynchronous REST, please refer to the [REST Cookbook](https://restcookbook.com/Resources/asynchroneous-operations/).

The following diagram illustrates the process of scheduling a component:

{% include img.html max-width="100%" url="/assets/img/getting-started/exec-page/scheduling-diagramm.png" title="Scheduling diagramm" %}

1. Initiation: A method execution is scheduled by sending a request to the corresponding endpoint (see below). The API responds with a status of `202 Accepted`. The URL for polling execution results is provided in the `Location` HTTP header.

2. Polling: To check the execution result's status, the client periodically sends requests to the polling resource at `exec/poll/{EXECUTION_ID}`. The API responds with a `200 OK` if the result is not yet available. Please see how to [poll execution results]({{site.data.tenant.apiDocsUri}}/v2#/scheduled%20executions/get_exec_poll__execution_id_).

3. Result Availability: When the result becomes available, the polling resource responds with a `303 See Other` status. The URL for retrieving the execution results is provided in the Location HTTP header. Please see how to [poll execution results]({{site.data.tenant.apiDocsUri}}/v2#/scheduled%20executions/get_exec_poll__execution_id_).
4. Retrieval: The final step involves retrieving the results from exec/result/{EXECUTION_ID}. Refer to retrieve [execution results]({{site.data.tenant.apiDocsUri}}/v2#/scheduled%20executions/get_exec_result__execution_id_) for details.
