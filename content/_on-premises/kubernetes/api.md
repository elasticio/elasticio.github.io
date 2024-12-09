---
layout: article
title: API
description: Service responsible for the HTTP API to almost all services.
category: kubernetes
---

{: .no_toc}

{{page.description}} Centre of the world. Used by the [Frontend](/on-premises/kubernetes/frontend), used by Flow steps
in almost all regular jobs.

- TOC
{:toc}

## Downtime
{: .d-inline-block }
Platform down
{: .label .label-red}

If the API service is down then the Platform is down. Frontend won't work. New
Flow steps can not be started. Existing steps may (or may not) fail depending on component.

## Scaling

Can be scaled to any reasonable amount of pods. Service is stateless itself (but
uses external storage – [MongoDB](/on-premises/mongodb)).

## Deployment

Use rolling release. Remove pod – start pod with a new version. **Forbidden to stop ALL pods.**

## Strong dependencies

API strongly depends on the [MongoDB](/on-premises/mongodb) and the [RabbitMQ](/on-premises/rabbitmq).
Without them it will not start.

## Weak dependencies

API will start but not function without the following services:

*   [Iron-bank](/on-premises/kubernetes/iron-bank) (degradation),
*   [Quota-service](/on-premises/kubernetes/quota) (degradation),
*   [Bran-read](/on-premises/kubernetes/bran-read) (degradation),
*   [Steward](/on-premises/kubernetes/steward) (degradation).
