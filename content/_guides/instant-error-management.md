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

Let's put it this way - you can't instantly solve solid problems like being out of memory. However, when it comes to different runtime errors, there is a way to avoid spending too much time locating and dealing with the error.

What you can do is click *Retry* just where your Flow's logs are shown. The Platform will then try to run the Flow again with the same parameters. Note that this only works with a started Flow. Obviously, if it was a network error and it's gone now, retrying will help. This works for any non-permanent problem, which saves you quite a lot of time and effort spent on troubleshooting.   

(NEED ACME FLOW WITH RUNTIME ERROR)

## Example
Let's start a generic integration Flow and cause a network problem. It will be seen here in the logs:

SCREENSHOT OR GIF

It is obviously the error we wanted for our demonstration, so we are sure that in a few moments it is going to fix itself. It happens to network problems all the time. Now let's click *Retry* and see what happens:

SCREENSHOT OR GIF

As you can see, the Flow works perfectly now:
