---
layout: article
title: Flow Count Limit Quota
description: This document explains the flow count limit quota.
category: quotas
---

{: .no_toc}

{{page.description}}

You MUST have either the **Service Account** or **Quota Manager** credentials to
apply this quota.
{: .note.warning}

- TOC
{: toc}

## Quota sync

Before you can use this quota you MUST sync your existing flow counts with the
`quotatxns` DB tables. Use `https://api.elastic.io/sidedoor/quotatxns/sync/flow`
endpoint to `POST` using the Service Account credentials.
{: .note.errors}

## API Call Blueprint

To apply quota make an HTTP `POST` to `https://api.elastic.io/v2/quotas/quota_type/context_expression` endpoint
using the correct credentials and the following body:

```json
{
    "data": {
        "quotaType": "quota_type",
        "context": "context_expression",
        "limit": 10
    }
}
```


### quotaType


Here are the types to use in context of flow count limit quota:

*   `per_workspace_flow_count_limit` - use this to set flow count limit in a workspace,
*   `per_contract_flow_count_limit` - use this to set flow count limit in a contract,
*   `per_tenant_flow_count_limit` - use to set tenant-wide flow count limit.

You must use one of the quota types in the API `POST` URL as well.
like `/v2/quotas/per_workspace_flow_count_limit/context_expression`.
{: .note.info}

### context

The context expression depends on the `quotaType` you want to apply.

*   Set the context to `TENANT_ID.CONTRACT_ID.WORKSPACE_ID` if you want to set the quota for a workspace (`per_workspace_flow_count_limit`).
*   Set the context to `TENANT_ID.CONTRACT_ID` if you want to set the quota for a contract (`per_contract_flow_count_limit`).
*   Set the context to `TENANT_ID` if you want to set the quota for a tenant (`per_tenant_flow_count_limit`).

You can use context expression to set broader quota limits.

*   Set `TENANT_ID.CONTRACT_ID.ANY` context if you want to apply the quota to all workspaces in the contract.
*   Set `TENANT_ID.ANY` context if you want to apply the quota for all contracts in the tenant.
*   Set `ANY` context to apply your quota for all tenants in the installation.

You must use the same context in the API `POST` URL as well.
like `/v2/quotas/quota_type/TENANT_ID.CONTRACT_ID.WORKSPACE_ID`.
{: .note.info}

### limit

The quota limit can have two values:

*   Set a `number` like `10` or `20` to limit number of flows, or
*   Set `-1` if you want unlimited quota.
*   Set `0` to disable the quota.

## Rules

When you set flow count limit the following actions would trigger quota check and
an error notification in the user interface if the action causes quota exhaustion:

*   Increase usage on flow creation
*   Decrease usage on flow deletion
*   Increase usage on flow export/copy
*   Increase usage on recipe activation into full workspace (production)
*   Decrease usage in case of switching workspace from full to limited (production to developer)
*   Increase usage in case of promoting workspace from limited to full (developer to production)

## Exceptions

The following exceptions exist to the above rules:

*   We don't check and increase quota if exporting flow on top of existing flow
*   We don't count debug and retry flows
*   We don't count quota for limited workspaces
