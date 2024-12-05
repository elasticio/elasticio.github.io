---
layout: article
title: Data Rendering
description: Document provides an overview of data rendering principles and suggests dashboards to use.
category: monitoring
---

{{page.description}}

Use [Grafana](https://grafana.com/) and [Prometheus](https://prometheus.io/) as a data source. Ask support
for an access to dashboards to import.

Each dashboard has the following tags:

*   `eio` indicates dashboard provided by elastic.io
*   `eio-service` if dashboard monitors service developed by elastic.io
*   `eio-vendor` if dashboard monitors 3rd party service

We recommend using 3rd party dashboards:

*   [RabbitMQ-Overview](https://grafana.com/grafana/dashboards/10991)
*   [MongoDB Instances Overview](https://github.com/percona/grafana-dashboards/blob/main/dashboards/MongoDB/MongoDB_Instances_Overview.json). Requires [mongodb_exporter](https://github.com/percona/mongodb_exporter)
*   [MongoDB WiredTiger Details](https://github.com/percona/grafana-dashboards/blob/main/dashboards/MongoDB/MongoDB_WiredTiger_Details.json). Requires [mongodb_exporter](https://github.com/percona/mongodb_exporter)
*   [Redis Dashboard](https://grafana.com/grafana/dashboards/763) for `cache` Kubernetes Service
