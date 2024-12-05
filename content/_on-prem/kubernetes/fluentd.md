---
layout: article
title: Fluentd
description: Service which collects Platform services and Flow steps logs.
category: kubernetes
---

{: .no_toc}

{{page.description}} It stores them in the [Elasticsearch](/on-prem/elasticsearch)
(with [GrayLog](/on-prem/graylog) as an intermediate).

- TOC
{:toc}

## Downtime
{: .d-inline-block }
Not critical
{: .label .label-yellow}

The downtime means no logs from platform pods and flow pods. In most cases it is
acceptable to stop for several minutes.

## Scaling

Should be started at all VMs used to run the Platform (including VMs for flows
and the Platform services).

## Deployment

Use rolling release. Remove the pod and create a new one.

## Strong dependencies

The service would not start without the Kubernetes API service.

## Weak dependencies

Fluentd service would be degraded if the [GrayLog](/on-prem/graylog) is down or unreachable.
