---
title: Sending data to a list of recipients
layout: article
section: Integration patterns
order: 0
since: 20180220
---

In this article we will explain how to send the same data to multiple recipients
using a recipient list on the {{site.data.tenant.name}} platform

> A **Recipient List** is a *message processing pattern* for sending a copy of the same
> message to multiple recipients as it is described in the [Enterprise Integration Patterns](http://www.enterpriseintegrationpatterns.com/patterns/messaging/RecipientList.html)
> book (G. Hohpe and B. Woolf, 2003).

For example, most of the e-mail systems use the recipient list pattern to send 
the copy of each message to a list of pre-defined recipients. For integration
flows, the recipient list can be implemented to get information from one source
(CRM, ERP, etc) and send it to multiple systems for processing.

We will assume that you already know how to create an [integration flow](/getting-started/integration-flow)
on {{site.data.tenant.name}} platform. You have followed the steps in [creating your first integration flow](/getting-started/first-flow)
and [creating webhook flow](/getting-started/webhook-flow) tutorials.

## Creating recipient list

Let us consider the following scenario. 

You know how to build linear flows when the data from any one step is consequently transferred to the next step for processing. You have one sender and one recipient.
