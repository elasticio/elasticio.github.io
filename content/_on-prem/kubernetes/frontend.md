---
layout: article
title: Frontend
description: Service which runs the platform user interface (UI).
category: kubernetes
---

{: .no_toc}

{{page.description}}

- TOC
{:toc}

## Downtime
{: .d-inline-block }
Very Bad
{: .label .label-red}

The downtime means no user interface. The platform and the integration flows would still run unaffected.

## Scaling

Scalable to any reasonable amount of pods.

## Deployment

Use rolling release. Remove pods and create new. **It’s forbidden to have less then 1 active pod.**

## Strong dependencies

The service would not start without the [MongoDB](/on-prem/mongodb) and the
[RabbitMQ](/on-prem/rabbitmq).

## Weak dependencies

Frontend service would be degraded if the [API](/on-prem/kubernetes/api) and the
[Elasticsearch](/on-prem/elasticsearch) are down or unreachable.
