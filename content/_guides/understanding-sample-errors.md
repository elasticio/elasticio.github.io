---
title: Understanding Sample errors
description: This document describes common errors that you can encounter and the ways to solve them.
layout: article
section: Troubleshooting
order: 6
category: troubleshooting
---

## Introduction

In this document, we tried to collect the most common errors in samples and how to solve them. Understanding how you can fix these errors is extremely important for building an integration flow, since without the correct samples you will not be able to work with the next steps.

## Credentials errors

Some errors in samples appear due to the fact that credentials are invalid or simply created incorrectly. In order to avoid such errors, we advise you to use the credentials verification function. You can save credits without going through the verification stage, but in the future this can only cause additional errors. We highly recommend you to not ignore the verification function.

Here we want to show you how verification helps you to detect errors related to credentials in advance:

![Verification failed](/assets/img/integrator-guide/sample-errors/verification-failed.png)

As you can see verification has failed. This happened due to the wrong **"Seller ID"**, however, you can only see information about the specific reason why the platform cannot verify credentials in the [logs](/getting-started/logs-page):

![Invalid Seller ID](/assets/img/integrator-guide/sample-errors/invalid-seller-id.png)

If you can correct the error, do it and repeat the verification. If everything is done correctly, the credentials will be verified:

![Verified credentials](/assets/img/integrator-guide/sample-errors/verified-credentials.png)

> Please note that not all errors can be fixed directly, for example, your credentials may be outdated and you will not be able to find out from the [logs](/getting-started/logs-page).
