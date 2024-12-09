---
layout: article
title: Elasticsearch
order: 3
section: Platform microservices
description: Service used to store Platform and flow step logs.
category: services
---

{: .no_toc}

{{page.description}}

- TOC
{: toc}

## Downtime
{: .d-inline-block }
Not Critical
{: .label .label-yellow}

*   If down Frontend will not show flow step and build logs.
*   Receives logs from [GrayLog](graylog).
*   If stopped for several hours
    *   GrayLog buffer might get full causing a data lost.
    *   Can cause significant RAM memory usage on GrayLog side and delayed log delivery for 20-40 minutes if the Elasticsearch was stopped for several hours.


## Scaling

One instance is generally enough.

## Deployment



## Strong dependencies


## Weak dependencies
