---
layout: article
title: Bran-write
description:  "Service that watches the Platform and gathers statistics: messages counts, threads, containers starts/stops."
category: kubernetes
---

{: .no_toc}

{{page.description}} Collected data is stored in the [Clickhouse](/on-premises/clickhouse) and accessible by the [Bran-read](/on-premises/kubernetes/bran-read) service’s API.

- TOC
{:toc}

## Downtime
{: .d-inline-block }
Not critical
{: .label .label-yellow}

Bran-write down means delayed statistics in the [Clickhouse](/on-premises/clickhouse).
After start it will process delayed data. **Forbidden to shut down for long time**
(e.g several hours). It may cause queue overflow in the [RabbitMQ](/on-premises/rabbitmq),
and a risk of data loss.

## Scaling

Scalable to any reasonable amount.

## Deployment

Use rolling release. Update pods one by one.

## Strong dependencies

Bran-write strongly depends on the [Clickhouse](/on-premises/clickhouse) and the
[RabbitMQ](/on-premises/rabbitmq). It will not start without them.

## Weak dependencies

Bran-write would not function without the [Admiral](/on-premises/kubernetes/admiral).
