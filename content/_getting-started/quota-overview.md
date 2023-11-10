---
title: Quota
layout: article
section: Introduction
description: This document provides basic information on Platform resource quota and how the limit is calculated.
order: 5
category: intro
since: 20191101
---

This document provides basic information on Platform [resource quota](#quota) and how the [limit is calculated](#quota-limit-calculation).

## Quota

A quota defines the limit of usable resources in your Contract, Workspace or Flow. It was designed to allow the user to maintain a better resource balance, and minimize the possibility of failure due to overuse. The resources that you can limit are RAM and CPU.

Quotas can be set per Contract, per Workspace and per Flow, depending on the requirements. If a quota is enabled, but not defined, a default value will be set. To set a quota, a user needs a corresponding Service Account.

>**Please Note:** You can set the Workspace quota higher than Contract quota, but there is no practical sense in doing so. Workspace quota will just become redundant.

You can see the actual resource usage on the dedicated page. You can also use [API calls]({{site.data.tenant.apiDocsUri}}/v2#/quota%20usages) to get this information. The usage is shown per Contract, per Workspace and per Flow.

Also on the histogram you can see the RAM quota overuse. If you go over the set RAM quota value the overused part will show in red.

For more convenience the quota service will notify you via email on different steps of approach to the limit.

{% include img.html max-width="100%" url="/assets/img/getting-started/quota/quota.png" title="Quota page" %}

By selecting the **View Report** option, you'll gain access to a comprehensive resource usage chart along with a detailed breakdown of quota utilization for each individual Workspace under your account. To further explore the allocation of quotas, you can simply click on the workspace name displayed in the **Workspace Memory Usage** list within the **Current Month Quota**. This action will seamlessly navigate you to the respective workspace's Dashboard. Here, you'll be presented with an insightful overview of quota distribution per specific Flows, enabling you to assess and manage your resource allocation more effectively.

{% include img.html max-width="100%" url="/assets/img/RN/2331/Quota1.gif" title="Quota Report" %}

>**Please note:** Other ways and criteria for limiting resource usage are also presented. You can find other types of limits on the [Limit Quotas page](/guides/managing-limit-quotas), as well as in [API Documentation]({{site.data.tenant.apiDocsUri}}/v2#/quotas)

## Quota Limit Calculation

A quota limit is the amount of resources multiplied by time. So if we have `2GB` quota and we want to know our monthly quota limit in `Mb*s` (a composite unit of memory usage that means 1 Megabyte of data transfer sustained for 1 second), we have to:

1\. Take `2GB` and convert them into `Mb`, so `2*1024=2048`

2\. Multiply our quota by the amount of seconds in a month (60 seconds per minute, 60 minutes per hour, 24 hours per day, 31 days per month), `2048*60*60*24*31=5485363200`

3\. Our quota limit is `5485363200 Mb*s`. This is, basically, how many seconds of 1 Mb data processing/transfer you get.
