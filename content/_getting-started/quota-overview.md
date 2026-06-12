---
title: Quota
layout: article
section: Introduction
description: This document provides basic information about Platform resource quotas and how quota limits are calculated.
order: 5
category: intro
since: 20191101
---

{{page.description}}

## Active Steps Quota

The **Active Steps quota** represents the number of steps used by all currently running (active) flows within a contract.

{% include img.html max-width="100%" url="/assets/img/getting-started/quota/quota-overview.png" title="Steps Quota" %}

### Key Details

- Only flows in the **Active** state are considered.
- Each active flow contributes its total number of steps to the quota.

## Messages Quota

The **Messages quota** defines the monthly limit on the number of emitted data items (including both records and errors) produced by flow steps within a contract or workspace.

{% include img.html max-width="100%" url="/assets/img/getting-started/quota/messages-usage.png" title="Messages Quota" %}

By selecting the **View Report** option, you'll gain access to a comprehensive messages usage chart along with a detailed breakdown of quota utilization for each individual Workspace under your account. To further explore the allocation of quotas, you can simply click on the workspace name displayed in the **Workspace Memory Usage** list within the **Current Month Quota**. This action will seamlessly navigate you to the respective workspace's Dashboard. Here, you'll be presented with an insightful overview of quota distribution per specific Flows, enabling you to assess and manage your resource allocation more effectively.

{% include img.html max-width="100%" url="/assets/img/getting-started/quota/messages-report.png" title="Quota Report" %}

The following fields are now available in the API endpoints [usages]({{site.data.tenant.apiDocsUri}}/v2#/quota%20usages) and [limits]({{site.data.tenant.apiDocsUri}}/v2#/quota%20limits):
- `per_contract_message_count_limit`
- `per_workspace_message_count_limit`

Additionally, a new [API endpoint]({{site.data.tenant.apiDocsUri}}/v2#/runtime%20quota%20usages) is available: `GET /v2/runtime-quota-usages/contracts/:contract_id/messages-usage/history`

This endpoint returns message usage history grouped by month for a specific contract.

### When Is Quota Limit Validation Performed

Message quota limits are validated during the following actions:

- When starting a flow (**Start**)
- When executing a flow manually (**Run Now**)

## Behavior When Quota Is Exceeded

- If the [Messages](#messages-quota) or [Active steps](#active-steps-quota) quota is exceeded, launching or running flows is blocked.
- All flows within the affected contract are automatically suspended.
- Flows can only be resumed after the quota limit is increased by our Support.

All contract/workspace users receive automated notifications when approaching or reaching the quota limit:
- **At 80% usage**:  
  “Resource usage for [contract/workspace] message count has exceeded 80% of your quota”
- **At 100% usage**:  
  “Resource usage for [contract/workspace] message count has exceeded 100% of your quota”

> **Please Note:** When the quota is exceeded, all flows in the contract will be suspended. They can be resumed by our Support upon a request to increase the resource limit.

## Memory Quota (legacy)

The **Memory quota** defines the limit of usable resources in your Contract, Workspace or Flow. It was designed to allow the user to maintain a better resource balance, and minimize the possibility of failure due to overuse. The resources that you can limit are RAM and CPU.

Quotas can be set per Contract, per Workspace and per Flow, depending on the requirements. If a quota is enabled, but not defined, a default value will be set. To set a quota, a user needs a corresponding Service Account.

>**Please Note:** You can set the Workspace quota higher than Contract quota, but there is no practical sense in doing so. Workspace quota will just become redundant.

You can see the actual resource usage on the dedicated page. You can also use [API calls]({{site.data.tenant.apiDocsUri}}/v2#/quota%20usages) to get this information. The usage is shown per Contract, per Workspace and per Flow.

Also on the histogram you can see the Memory quota overuse. If you go over the set Memory quota value the overused part will show in red.

For more convenience, the quota service will send email notifications to users with the [contact/workspace Owner role](/guides/managing-user-roles-in-a-tenant.html#roles-and-permissions) at various stages of approaching the limit.

{% include img.html max-width="100%" url="/assets/img/getting-started/quota/memory-usage.png" title="Quota page" %}

By selecting the **View Report** option, you'll gain access to a comprehensive memory usage chart along with a detailed breakdown of quota utilization for each individual Workspace under your account. To further explore the allocation of quotas, you can simply click on the workspace name displayed in the **Workspace Memory Usage** list within the **Current Month Quota**. This action will seamlessly navigate you to the respective workspace's Dashboard. Here, you'll be presented with an insightful overview of quota distribution per specific Flows, enabling you to assess and manage your resource allocation more effectively.

{% include img.html max-width="100%" url="/assets/img/getting-started/quota/memory-report.png" title="Quota Report" %}

> **Please note:** Other ways and criteria for limiting resource usage are also presented. You can find other types of limits on the [Limit Quotas page](/guides/managing-limit-quotas), as well as in [API Documentation]({{site.data.tenant.apiDocsUri}}/v2#/quotas)

### Memory Quota Limit Calculation

A quota limit is the amount of resources multiplied by time. So if we have `2GB` quota and we want to know our monthly quota limit in `Mb*s` (a composite unit of memory usage that means 1 Megabyte of data transfer sustained for 1 second), we have to:

1\. Take `2GB` and convert them into `Mb`, so `2*1024=2048`

2\. Multiply our quota by the amount of seconds in a month (60 seconds per minute, 60 minutes per hour, 24 hours per day, 31 days per month), `2048*60*60*24*31=5485363200`

3\. Our quota limit is `5485363200 Mb*s`. This is, basically, how many seconds of 1 Mb data processing/transfer you get.

### Memory Quota per Step Calculation

It was determined that a single Step with 24/7 operation consumes `75 Mb` monthly. It follows that the quota consumption for one [Real-Time Flow](/guides/realtime-flows.html) consisting of 5 steps (including Mapper) is `375Mb/Month`.
