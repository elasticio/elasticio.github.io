---
title: Mapping data
layout: article
section: Data transformation
order: 1
since: 20180125
---

In this article we will explain how to map the data between integration components to keep them in sync.

An integration flow on {{site.data.tenant.name}} platform must have at least two components, one trigger and one action. Trigger emits a data for the action component to receive and process it. Between these two components seats the {{site.data.tenant.name}} **data mapper**, which maps or matches the incoming data to the specific fields where the next component expects them to receive.

To understand how the data-mapping works in practice visit our tutorials section. We recommend starting from steps-by-step instructions in [how to create your first integration flow](/getting-started/first-flow) followed by the [creating a webhook flow](/getting-started/webhook-flow) articles as an introduction to the data-mapping.

If you have already followed the tutorials you realise that the data-mapping on {{site.data.tenant.name}} platform is an important part of the integration process which warrants detailed explanation in its own.

## Mapping simple values

We assume that you have built your first flows following the step-by-step instructions in the tutorials sections and are familiar with the data-mapping step.
