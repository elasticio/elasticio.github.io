---
layout: article
title: Handmaiden
description: Service that ensures that Kubernetes cluster properly handles https traffic for all domains in all Tenants, and uses proper certificates for domains.
category: kubernetes
---

{: .no_toc}

{{page.description}} It periodically asks the [API](/on-prem/kubernetes/api)
for Tenants and their respective certificates. Also, it creates/updates/removes
ingresses and secrets with certificates for those ingresses in the Kubernetes cluster.

- TOC
{:toc}

## Downtime
{: .d-inline-block }
not critical
{: .label .label-yellow}

Downtime will be visible only in case Tenant configuration would be changed
(e.g. new Tenant, Tenant URI’s edited, Tenant certificates changes). Generally
service may be stopped for and arbitrary period of time if there is no changes
in Tenants and Tenant certificates.

## Scaling

Theoretically, it can be scaled to more then one instance. However, there is no
practical sense to do so, and it was never tested.

## Deployment

Use rolling release. Delete pod and create new.


## Strong dependencies

Service depend on Kubernetes API service to start.

## Weak dependencies

Handmaiden would not function without the following services:

*   [API](/on-prem/kubernetes/api)
*   [NGINX-ingress-controller](/on-prem/kubernetes/nginx-ingress-controller) (no ingress controller means no real work).
