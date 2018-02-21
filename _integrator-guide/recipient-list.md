---
title: Sending data to a list of recipients
layout: article
section: Integration patterns
order: 0
since: 20180220
---

In this article we will explain how to send the same data to more than one recipient using the recipient list.

The recipient list is a message processing concept when one message is sent to multiple recipients for a separate processing. For example, most of the e-mail systems send each message to a list of pre-defined recipients.

In integration flows the recipient list is used to acquire information from one source (CRM, ERP, etc) and simultaneously send it to multiple systems for further processing.

We will assume that you know how to create an [integration flow](/getting-started/integration-flow) on {{site.data.tenant.name}} platform. You are welcome to refresh your memory by following the steps in [creating your first integration flow](/getting-started/first-flow) and [creating webhook flow](/getting-started/webhook-flow) tutorials.

## Creating recipient list

You know how to build linear flows when the data from any one step is consequently transferred to the next step for processing. You have one sender and one recipient.
