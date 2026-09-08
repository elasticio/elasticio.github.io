---
title: Component Usage Insights
description: This article describes how to retrieve connector usage statistics across tenant workspaces.
layout: article
category: tenant
---

{: .no_toc}

{{page.description}}

## Introduction

Tenant Admins have access to the `GET /v2/tenants/:tenantId/connector-usage` endpoint, which provides connector usage statistics across all workspaces belonging to the tenant.

The endpoint:
- Returns a paginated list of connectors used across the tenant's workspaces.
- Groups usage counts by contract and workspace.
- Sorts results by total usage in descending order.
- Access is restricted to tenant administrators only.

## Links

For detailed information, please refer to the API documentation: [Tenants Connector Usage](https://api.{{site.data.tenant.name}}/docs/v2#/tenants/get_tenants__tenant_id__connector_usage)