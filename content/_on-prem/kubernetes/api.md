---
layout: article
title: API
description: Service responsible for the HTTP API to almost all services.
category: kubernetes
---

{: .no_toc}

{{page.description}} Centre of the world. Used by the [Frontend](/on-prem/kubernetes/frontend), used by Flow steps
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
uses external storage – [MongoDB](/on-prem/mongodb)).

## Deployment

Use rolling release. Remove pod – start pod with a new version. **Forbidden to stop ALL pods.**

## Strong dependencies

API strongly depends on the [MongoDB](/on-prem/mongodb) and the [RabbitMQ](/on-prem/rabbitmq).
Without them it will not start.

## Weak dependencies

API will start but not function without the following services:

*   [Iron-bank](/on-prem/kubernetes/iron-bank) (degradation),
*   [Quota-service](/on-prem/kubernetes/quota) (degradation),
*   [Bran-read](/on-prem/kubernetes/bran-read) (degradation),
*   [Steward](/on-prem/kubernetes/steward) (degradation).
