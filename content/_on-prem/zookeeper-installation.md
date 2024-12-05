---
layout: article
title: ZooKeeper Installation
order: 4
section: Installation Guides
description: Document guides through the installation and configuration of the ZooKeeper service used for ClickHouse Replication mode.
category: installation
---

{: .no_toc}

{{page.description}}

- TOC
{:toc}

## Installation

### VM Requirements

*   Separate VM
*   RAM: 2 GB
*   Storage: at least 20 GB

### Steps

*   [Install](https://zookeeper.apache.org/doc/r3.1.2/zookeeperStarted.html) version `3.5.5`,
*   Make it accessible by IP address from the networks where ClickHouse instances located. Also configure firewall to
allow access to `2181` ports of these VMs

## Configuration

Check the [official ClickHouse](https://clickhouse.tech/docs/en/operations/tips/#zookeeper)
tips regarding ZooKeeper setup. Pay special attention to the point about the "time bomb".
