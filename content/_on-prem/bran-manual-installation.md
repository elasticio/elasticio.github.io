---
layout: article
title: Installing the Bran
order: 8
section: Installation Guides
description: This document provides a step-by-step tutorial on the Bran manual installation on the already installed Platform.
category: installation
---

{: .no_toc}

{{page.description}}

1. TOC
{:toc}

## Introduction

Here is the simplest setup for you to try the Bran service. Database replication
is disabled here. If you need high availability, contact us for instructions on
how to set up a replicated [ClickHouse](/services/clickhouse).

## Install ClickHouse

### Requirements

-   Separate VM
-   RAM: 8 GB
-   Storage: 40 GB

### Steps

1.  [Install](https://clickhouse.com/docs/en/install) version 19.13.1.11.
2.  Make it accessible by IP address from Kubernetes pods network.
3.  [Set up](https://clickhouse.com/docs/en/operations/access-rights) user and password if you were not asked
    about credentials during installation.

## Enable Bran

1.  Set the following variables in `config.json`:
```
  "bran_clickhouse_uri": "http://${clickhouse_user}:${clickhouse_password}@${clickhouse_ip}:8123",
```
   Replace `${clickhouse_...}` placeholders with actual values.
2.  Apply ksonnet.
3.  Make sure `bran-read` and `bran-write` microservices are deployed and running in the cluster.

## Check an experimental page

Visit `https://${your_domain}/c/${contract_id}/#/contract/${contract_id}#/w/${workspace_id}/executions` (replace `${your_domain}`, `${contract_id}` and `${workspace_id}` with actual values).
You should see an experimental executions page.
