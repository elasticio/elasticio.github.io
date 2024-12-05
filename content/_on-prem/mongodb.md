---
layout: article
title: MongoDB
order: 1
section: Platform microservices
description: MongoDB service used by many platform services.
category: services
---

{: .no_toc}

{{page.description}}

- TOC
{:toc}

## Downtime
{: .d-inline-block }
Platform down
{: .label .label-red}

Downtime is absolutely forbidden. No platform service would function.

We recommend:
*   **Backup your MongoDB at least daily.**
*   Use [passive replica-set member](#scaling) for backup to avoid overwhelming the system during the process.

## Scaling

For the production installation:

*   **Must run in replication** (replica set) to ensure the high availability (HA) of the service.
*   Replica set must have 3, 5, etc members to ensure decision quorum.
*   Add one `passive` mongo instance to backup from it (for example 3+1 system).

## Deployment

Deployed and installed on the separate Virtual Machines to ensure HA.


## Strong dependencies


## Weak dependencies
