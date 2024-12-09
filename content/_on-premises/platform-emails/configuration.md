---
title: Email Configuration
description: This document explains how to enable and disable each outgoing email from the platform for your Tenant.
layout: article
category: platform-emails
---

{: .no_toc}

{{page.description}} The complete list of emails is [here](templates).

- TOC
{: toc}

## Email Configuration

You can enable or disable all emails for each Tenant. This is done by
[updating the Tenant](https://api.elastic.io/docs/v2#/tenants/patch_tenants__tenant_id_) via the following API request:

```sh
curl https://api.elastic.io/v2/tenants/{TENANT_ID} \
    -X PATCH \
    -u {EMAIL}:{APIKEY} \
    -H 'Content-Type: application/json' -d '
{
  "data":{
    "type":"tenant",
    "attributes":{
      "email_templates":{
        "agent-request": true,
        "contract-deleted": true,
        "contract-invite-empty-contract": true,
        "contract-invite-new-user": true,
        "contract-suspended": true,
        "contract-unsuspended": true,
        "password-recovery": true,
        "repo-new-version": false,
        "repo-new-version-in-workspace-flows": false,
        "task-error-notification": true,
        "task-operational-error": true,
        "team-from-contract-invite": true,
        "team-removed-member": true,
        "user-removed-from-contract": true,
        "wiper-exhaustion-quota-notification": true,
        "wiper-flow-suspended-due-to-queue-overflow": true,
        "wiper-suspended-queue-purged": true,
        "workspace-invite-empty-workspace": true,
        "workspace-invite-new-user": true,
        "workspace-removed": true,
        "workspace-removed-member": true
      }
    }
  }
}'
```

To control set the template value to `true` or `false`, to enable or disable them
respectively.
