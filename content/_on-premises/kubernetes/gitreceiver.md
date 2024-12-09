---
layout: article
title: Gitreceiver
description: Service that is responsible for handing component pushes.
category: kubernetes
---

{: .no_toc}

{{page.description}} It accepts traffic in git over ssh format, builds component
into slug and docker images (if required), and pushes built slug into the
[Platform-storage-slugs](/on-premises/kubernetes/platform-storage-slugs) and docker
image into the [Docker-registry](/on-premises/kubernetes/docker-registry).
[MongoDB](/on-premises/mongodb) is used to authenticate and authorize user, and to
register build result. Build logs are delivered to [Elasticsearch](/on-premises/elasticsearch)
by means of [Graylog](/on-premises/graylog).

- TOC
{:toc}

## Downtime
{: .d-inline-block }
not critical
{: .label .label-yellow}

The downtime means integration component pushing is not possible.

## Scaling

Scalable to any reasonable amount of pods.

## Deployment

Use rolling release. Remove pods and create new.

## Strong dependencies

The service will not start without Kubernetes service running.

## Weak dependencies

Gitreceiver service would be degraded if the following services are down or unreachable:

*   [Elasticsearch](/on-premises/elasticsearch),
*   [MongoDB](/on-premises/mongodb),
*   [Graylog](/on-premises/graylog),
*   [Docker-registry](/on-premises/kubernetes/docker-registry),
*   [Platform-storage-slugs](/on-premises/kubernetes/platform-storage-slugs).
