---
layout: article
title: Bran-read
description: Service which provides the statistics of messages, threads, containers and others.
category: kubernetes
---

{: .no_toc}

{{page.description}} Used by the [API](/on-prem/kubernetes/api).

- TOC
{:toc}

## Downtime
{: .d-inline-block }
Not critical
{: .label .label-yellow}

If Bran-read service is down then thread and message statistics will not be available.

## Scaling

Scalable to any reasonable amount.

## Deployment

Use rolling release. Update pods one by one.

## Strong dependencies

Bran-read strongly depends on the [Clickhouse](/on-prem/clickhouse). It will not
start without it.

## Weak dependencies
