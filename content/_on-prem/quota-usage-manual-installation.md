---
layout: article
title: Quotas service
order: 9
section: Installation Guides
description: "Deprecated: This document provides a step-by-step tutorial on the Quota Usages manual installation on the already installed Platform."
category: installation
---

{{page.description}}

**This article describes configuration using an old ksonnet deployment. We are in the process of migrating these guides to reflect the current HELM3 deployment.**

## Introduction

Here is the simplest setup for you to try the Quota Usages service. Database
replication is disabled here. For this service to run you need to
[install the ClickHouse](clickhouse-installation) first. If you need
high availability then ClickHouse must run as a replica set.

## Enable Quota Usages

1. Set the following variables in `config.json`:
   ```
   "iron_bank_clickhouse_uri": "http://[clickhouse_user]:[clickhouse_password]@[clickhouse_ip]:8123/iron_bank",
   "iron_bank_clickhouse_no_replica": "true",
   "iron_bank_uri": "http://iron-bank-service.platform.svc.cluster.local:3000"
   ```
   Replace `[clickhouse_...]` placeholders with actual values.
2. Set the following variable in `platform.json`:
   ```
   "iron_bank_enabled": "true"
   ```
3. Apply ksonnet
4. Restart `api` Deployment to make it reload variables

## Check the page

Visit `https://[your_domain]/c/[contract_id]/contract/[contract_id]/quota-usages` (replace [your_domain] and [contract_id]
with actual values). You should see an experimental dashboard with quota and actual usage.
