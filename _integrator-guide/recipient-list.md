---
title: Sending data to a list of recipients
layout: article
section: Integration patterns
order: 0
since: 20180220
---

In this article we will cover how to send the same data to more than one recipients using the recipient list.

The recipient list is a message processing concept when one message is sent to multiple recipients for separate processing. A very simplified implementation of the recipient list is found in most e-mail systems where each message can be sent to a list of predefined recipients.

In integration flows the recipient list is used to acquire information from one source (CRM, ERP, etc) and send it almost simultaneously to different systems for further processing.

This article assumes that you know how to create an [integration flow](/getting-started/integration-flow) on {{site.data.tenant.name}} platform. You are welcome to refresh your memory by following the steps in [creating your first integration flow](/getting-started/first-flow) and [creating webhook flow](/getting-started/webhook-flow) tutorials.

## Creating recipient list

You know how to build linear flows when the data from any one step is consequently transferred to the next step for processing. You have one sender and one recipient.
