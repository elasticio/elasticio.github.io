---
layout: article
title: Monitoring and Alerting
order: 3
section: Platform Administration
description: Guides and principles used to monitor the platform and send alerts when necessary.
category: monitoring
---

{{page.description}}

We use [Prometheus](https://prometheus.io/) for collecting metrics, [Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/) for alerting and [Grafana](https://grafana.com/) to monitor and
diagnose issues.

## Table of contents

1.  [Data Collection](monitoring/data-collection) Document guides through methods used to collect data from platform services.
2.  [Data Rendering](monitoring/data-rendering) Document provides an overview of data rendering principles and suggests dashboards to use.
3.  [Alerting Rules](monitoring/alerting-rules) Document provides suggestions on alerting rules to implement.