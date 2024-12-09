---
layout: article
title: ClickHouse
order: 5
section: Platform microservices
description: Used to store statistical data.
category: services
---

{: .no_toc}

{{page.description}}

1. TOC
{:toc}

## Downtime
{: .d-inline-block }
Bad
{: .label .label-red}

If the service is down then the following information will be lost:

*   Message statistics.
*   Container events
*   Resource usage

If down the following and their dependent services will not work properly:

*   [Bran-Read](/on-premises/kubernetes/bran-read)
*   [Bran-Write](/on-premises/kubernetes/bran-write)
*   [Iron-Bank](/on-premises/kubernetes/iron-bank)

## Installation

ClickHouse is installed and run on a separate dedicated VM. Check our
[ClickHouse installation guide](/on-premises/clickhouse-installation) for more information.
