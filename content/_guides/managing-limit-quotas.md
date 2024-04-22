---
title: Managing Limit Quotas
description: This document provides information about special quota parameters that allow you to make additional limits on various actions - Limit Quotas
layout: article
section: Contract Management
category: integrator-management
order: 1
---

This document provides information about special quota parameters that allow you to make additional limits on various actions. These parameters are called **Limit Quotas**.


## Setting up the Limit Quota
> **Please Note:** You MUST have the **Service Account** credentials to apply this quota.

All Limit Quotas are set in one way - via API request. To apply Quota Limit make an HTTP request **`PUT {{site.data.tenant.apiBaseUri}}/v2/quotas/{LimitQuota}/{context_expression}`** using the correct credentials and the following body:

```
{
  "data": {
    "quotaType": "{LimitQuota}",
    "context": "{TENANT_ID}.ANY",
    "limit": 3
  }
}
```
### Limit Quota

The type of limit to be set. The full list of Limit Quotas can be found down the page.

> **Please Note:** You MUST use the same Limit Quota in the API `PUT` URL as well.

### Context

The context expression depends on the Limit Record you want to apply.
- Set the *context* to `"{TENANT_ID}.{CONTRACT_ID}.{WORKSPACE_ID}"` if you want to set the quota for a workspace.
- Set the *context* to `"{TENANT_ID}.{CONTRACT_ID}"` if you want to set the quota for a contract.
- Set the *context* to `"{TENANT_ID}"` if you want to set the quota for a tenant.

You can use context expression to set broader quota limits.
- Set the *context* to `"{TENANT_ID}.{CONTRACT_ID}.ANY"` if you want to apply the quota to all workspaces in the contract.
- Set the *context* to `"{TENANT_ID}.ANY"` if you want to apply the quota for all contracts in the tenant.
- Set the *context* to `"ANY"` to apply your quota for all tenants in the installation.

> **Please Note:** You MUST use the same *context* in the API `PUT` URL as well.

### Limit
The limit can have three values:
- Set a `integer` like `3` or `42` to limit number of flows.
- Set a `-1` if you want to set unlimited quota.
- Set a `0` to disable the quota.

## List of Limit Quotas

We can categorize Limit Quotas by type of limit:

### Number of Workspaces

- `per_contract_workspace_count_full`

Limits the number of workspaces with type [Full](/getting-started/contracts-and-workspaces.html#workspaces).

- `per_contract_workspace_count_limited`

Limits the number of workspaces with type [Limited](/getting-started/contracts-and-workspaces.html#workspaces).

### Amount of Memory and CPU usage

- `per_contract_cpu_usage_monthly_limit`

Limits amount of available [CPU usage](/getting-started/quota-overview.html#quota) for certain Contract in month.

- `per_workspace_cpu_usage_monthly_limit`

Limits amount of available [CPU usage](/getting-started/quota-overview.html#quota) for certain Workspace in month.

- `per_contract_mem_usage_monthly_limit`

Limits amount of available [RAM Memory](/getting-started/quota-overview.html#quota) usage for certain contract in month.

- `per_workspace_mem_usage_monthly_limit`

Limits amount of available [RAM Memory](/getting-started/quota-overview.html#quota) usage for certain workspace in month.

> **Please Note:** The numerical value of the memory quota limit must be expressed in Mb*s. [Details](/getting-started/quota-overview.html#quota-limit-calculation).

### Amount of Requests per minute

- `per_contract_request_webhooks_per_minute_limit`

Limits amount of available [Requests to Webhooks](/getting-started/webhooks-overview.html#webhook-flows) for certain contract per minute.

- `per_workspace_request_webhooks_per_minute_limit`

Limits amount of available [Requests to Webhooks](/getting-started/webhooks-overview.html#webhook-flows) for certain workspace per minute.

### Count of Flows

- `per_workspace_flow_count_limit`

Limits the number of Flows for certain Workspace.

- `per_contract_flow_count_limit`

Limits the number of Flows for certain Contract.

- `per_tenant_flow_count_limit`

Limits the number of Flows for certain Tenant.

> **Please Note:** Before you can use this quota you MUST sync your existing flow counts with the quotatxns DB tables. Use `POST {{site.data.tenant.apiBaseUri}}/sidedoor/quotatxns/sync/flow` endpoint using the *Service Account* credentials.

### Count of Users

- `per_contract_user_count_limit`

Limits the number of users that can be present in a contract.

### Count of Containers

- `per_contract_container_count_limit`

Limits that control the number of steps, including mapper, in active flows for both *Ordinary* and *Real-Time* Flows in the running and sleeping states per single contract. If the value of this parameter is exceeded, starting new Flows will not be available.

You can see the total number of containers occupied by one Flow, for example, in the UI by going to Flow Queues. In the example below there are 6 containers:

{% include img.html max-width="50%" url="/assets/img/tenant-management-guide/managing-limit-records/Containers_in_Queues.png" title="Containers_in_Queues" %}

> **Please Note:** Before you can use this quota you MUST sync your existing containers count with the quotatxns DB tables. Use `POST {{site.data.tenant.apiBaseUri}}/sidedoor/quotatxns/sync/container` endpoint using the *Service Account* credentials.


## Related links

- [Quota](/getting-started/quota-overview)
- [Managing Contracts](/guides/managing-contracts)
- [Managing Workspaces](/guides/managing-workspaces)
