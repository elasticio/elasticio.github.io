---
layout: article
title: GrayLog
order: 4
section: Platform microservices
description: Used to catch and index all logs from the Platform
category: services
---

{: .no_toc}

{{page.description}} and store it in the [Elasticsearch](elasticsearch).
Logs come from the [Fluentd](/kubernetes/fluentd) to GrayLog using the `GELF` protocol.

- TOC
{: toc}

## Downtime
{: .d-inline-block }
acceptable
{: .label .label-yellow}

*   If logs in `GELF` protocol sent using a `UDP` connection then all logs from the Platform will be lost during the downtime.
*   If logs are sent using a `TCP` connection then GrayLog downtime is acceptable for a time. The Fluentd will handle this.

## Scaling

Generally one instance (1 replica) of GrayLog is enough to handle the load.

## Deployment


## Strong dependencies


## Weak dependencies
