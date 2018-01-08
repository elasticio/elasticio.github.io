---
title: What is an integration flow?
layout: article
section: Basic Concepts
order: 2
category: integration-flow
since: 20180102
---

An integration flow is an automated workflow used to synchronize data between multiple applications or services. A flow
constructed from a set [integration components](integration-component.html) that are invoked in a predefined order.

# Triggers

A flow is always started by a *trigger* component used to monitor changes in the source system. For example, a Salseforce
trigger monitors insertion of new objects or changes to existing objects in Salesforce and startes the integration flow
once a change is detected.

There are two types of triggers:

* polling: actively monitoring the source service in predefined intervals
* webhook: waiting for the source system to send notification about changes


# Actions

The data produced by a *trigger* are sent to an *action* for consumption. For example, a new object from a Salesforce
trigger is sent to a Quickbooks action.
