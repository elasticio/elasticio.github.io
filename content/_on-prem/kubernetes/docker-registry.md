---
layout: article
title: Docker-registry
description: Service that stores component docker images and used to push/pull images to start.
category: kubernetes
---

{: .no_toc}

{{page.description}} Kubernetes uses it to pull images for Flow steps.

- TOC
{:toc}

## Downtime
{: .d-inline-block }
Very bad
{: .label .label-red}

The downtime is Bad. Step pods may not start (e.g. pod start due to Flow start or
ordinary Flow wake-ups). Component pushes into the [Gitreceiver](/on-prem/kubernetes/gitreceiver) won’t work.

## Scaling

Scalable to any reasonable amount of pods. But backend storage should be able to
handle this. Sticky sessions (in terms of client IP address) require a balancer
in front of the registry.

## Deployment

Use rolling release. Replace pods one by one. **It’s forbidden to have zero pods.**

## Strong dependencies

Backend storage (NFS at Platform installations).

## Weak dependencies
