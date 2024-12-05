---
layout: article
title: Kubernetes Cluster
order: 6
section: Platform microservices
description: This is the essential part of our platform where most of the platform services and jobs are running.
category: kubernetes
---

{{page.description}}

**Downtime**
{: .d-inline-block }
Platform down
{: .label .label-red}

The platform Kubernetes cluster has the following namespaces.

| Namespace | Description  |
| :-------- | :----------- |
| `platform` | Platform microservices like api, admiral, webhooks and others |
| `tasks`    | Running pods of **ordinary** and **realtime** flows |
| `monitoring` | Monitoring services like Prometheus, alertmanager, Grafana and others |
| `kube-system` | Kubernetes service like `kube-dns`, `fluentd`, events and others |

## Table of contents

1.  [Admiral](kubernetes/admiral) Service responsible for starting/stopping the flow pods and communicating with local agents. Admiral interacts directly with Kubernetes to start/stop the pods and get their statuses.
2.  [API](kubernetes/api) Service responsible for the HTTP API to almost all services. 
3.  [Bran-read](kubernetes/bran-read) Service which provides the statistics of messages, threads, containers and others.
4.  [Bran-write](kubernetes/bran-write) Service that watches the Platform and gathers statistics: messages counts, threads, containers starts/stops.
5.  [Cadvisor](kubernetes/cadvisor) Service that collects resource usage data from the Kubernetes cluster.
6.  [Docker-registry](kubernetes/docker-registry) Service that stores component docker images and used to push/pull images to start.
7.  [Fluentd](kubernetes/fluentd) Service which collects Platform services and Flow steps logs.
8.  [Frontend](kubernetes/frontend) Service which runs the platform user interface (UI).
9.  [Gitreciever](kubernetes/gitreceiver) Service that is responsible for handing component pushes.
10.  [Gold-dragon-coin](kubernetes/gold-dragon-coin) Service that is responsible for pod count quota enforcement.
11.  [Handmaiden](kubernetes/handmaiden) Service that ensures that Kubernetes cluster properly handles https traffic for all domains in all Tenants, and uses proper certificates for domains.