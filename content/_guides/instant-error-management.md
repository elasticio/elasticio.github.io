---
title: Instant Error Management
layout: article
section: Building integration flows
order: 1
since: 20191202
---

This document describes the quick way to solve some of the Flow errors.

## Flow Errors
It is obvious that while the Platform itself is not error-prone, a complex integration Flow can still suffer from some unpredictable problems. For example, if there is a network problem right at the moment of an API request. Basically, the Platform's complexity doesn't even have anything to do with this, an yet the Flow will fail.

Unofficially, we differentiate solid problems like being out of memory, and those errors that sort themselves out, like temporary downtime. The main concern is that both types of errors may lead to permanent data loss and integration fails. Going through all the logs trying to solve all the errors and then fix the consequent problems can be really time-consuming.

For example, let's say we have a component that reads data from a database every day. If a request fails, the snapshot will still be saved, so you lose one day worth of data. Earlier, it would have taken some time to solve this, depending on a few factors. First you had to find and fix the cause, then the data loss itself. As of now, the latter can be done almost instantly.

What you can do is click *Retry* just where your Flow's error logs are shown. The Platform will then try to run the erroneous process again. In our example that means that once you solve the problem that caused the data loss, you will only have to click one button to fix the data loss itself. The button saves you quite a lot of time and effort spent on troubleshooting. Note that this only works with a started Flow.  


## Example
Let's start a generic integration Flow and cause a network problem. It will be seen here in the logs. Now let's click *Retry* and see what happens.
