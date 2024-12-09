---
layout: article
title: Cadvisor
description: Service that collects resource usage data from the Kubernetes cluster.
category: kubernetes
---

{: .no_toc}

{{page.description}} This data is taken by the [Iron-bank](/on-premises/kubernetes/iron-bank)
and stored in proper places.

- TOC
{:toc}

## Downtime
{: .d-inline-block }
Not critical
{: .label .label-yellow}

The downtime is Bad, but not critical. Resource usage accounting may lose data
during downtime. Generally not critical to stop for minute or two, but resource
usage accuracy will be affected.

## Scaling

One pod per machine with flows. Should be implemented as daemon set in terms of
the Kubernetes cluster.

## Deployment

Use rolling release. Update pods one by one.

## Strong dependencies

Cadvisor strongly depends on the Kubernetes API service. It will not start without it.

## Weak dependencies
