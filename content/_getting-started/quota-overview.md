---
title: Quota
layout: article
section: Basic Concepts
order: 2
category: integration-flow
since: 20191101
---

This document provides basic information on Platform resource quota and usage types.

## Quota
A quota defines the limit of usable resources in your Contract, Workspace or Flow. It was designed to allow the user to maintain a better resource balance, and minimize the possibility of failure due to overuse. The resources that you can limit are RAM and CPU.

Quotas can be set per Contract, per Workspace and per Flow, depending on the requirements. If a quota is enabled, but not defined, a default value in  will be set. To set a quota, a user needs a corresponding Service Account.

Note, that you can set the Workspace quota higher than Contract quota, but there is no practical sense in doing so. Workspace quota will just become redundant.

## Resource Usage
You can see the actual resource usage on the dedicated page. The usage is shown per Contract, per Workspace and per Flow. Also, you don't really need to keep an eye on the usage page all the time, because the quota service will notify you on different steps of approach to the limit. 

![Quota page](/assets/img/getting-startes/quota/quota.png)
