---
title: Secrets feature
layout: article
section: Platform Features
description: This document provides basic information about Secrets feature.
order: 11
category: platform-features
since: 20200924
---

## Introduction

Secrets is a feature which independently keeps access tokens up-to-date so any
integration step would get a valid and working access credential to the third party
resource. Secrets updates these tokens behind the scene using the token expiration
information.

The real power of Secrets becomes evident in case of OAuth2 credentials when token
expiration becomes a real problem while several integration steps try to refresh the
tokens of the same credential. This can create a race-condition and other
contention-on-shared-data problems due to concurrent and asynchronous work of steps
in different integration flows.
