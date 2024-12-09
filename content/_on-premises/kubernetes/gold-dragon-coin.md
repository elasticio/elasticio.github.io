---
layout: article
title: Gold-dragon-coin
description: Service that is responsible for pod count quota enforcement.
category: kubernetes
---

{: .no_toc}

{{page.description}} [Admiral](/on-premises/kubernetes/admiral) communicates with
this service with messages like: **"Can I start new pod"**  and
**"I’m going to stop pod, forget about it"**. In case this service disagrees, pod
is not started/stopped. The service stores it's state in the [MongoDB](/on-premises/mongodb).
Default version always responds with `yes` and stores nothing. It is possible to
configure otherwise.

- TOC
{:toc}

## Downtime
{: .d-inline-block }
very bad
{: .label .label-red}

The downtime means Flow step pods starts and stops will be blocked. Due to retries
it's acceptable to stop service for no more then 5 minutes. After 5 minutes all
Flows that have pods starting, will be suspended.

## Scaling

Scalable to any reasonable amount of pods.

## Deployment

Use rolling release. Delete pod and create new. **It’s forbidden to have less then one active pod.**


## Strong dependencies

None in the default configuration.

## Weak dependencies
