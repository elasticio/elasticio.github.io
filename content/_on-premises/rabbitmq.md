---
layout: article
title: RabbitMQ
order: 2
section: Platform microservices
description: Service used as middleware for inside flow and cross-communication.
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

**Downtime of RabbitMQ cluster is forbidden.**

## Scaling

For the production installation it must run in cluster to ensure the high
availability (HA) of the service. Cluster must be 3, 5, etc to ensure
quorum.

## Deployment

Deployed and installed on the separate VMs to ensure HA.

*   Has potential to consume resources due to clustered setup.
*   UI with all plugins might overwhelm the system - not recommended.
*   **Recommended to set limitations on queue sizes.**

## Strong dependencies

## Weak dependencies
