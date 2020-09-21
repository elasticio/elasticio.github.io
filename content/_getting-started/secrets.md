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
expiration becomes a real problem while more than one integration steps try to refresh the
tokens of the same credential. This can create a race-condition and other
contention-on-shared-data problems due to concurrent and asynchronous work of steps
in different integration flow steps.

Secrets takes over all the functionalities of the Credentials and provides a
unified service to manage the credentials and tokens independently. This removes
the need to refreash credentials by the components.

> Please Note: Secrets runs as a micorservice in the platform cluster, constantly
> checking the expiration information for all credentials and updating them at
> last 1 minutes before the expiration.

## How works

There are two entities involved in the work of Secrets feature as a service: the
Authentication Client (`auth-client`) and the Secret (`auth-secret`).

The `auth-client` takes the responsibility of communication between the Applicatio (the platform)
and the Service (3rd party service), while the `auth-secret` takes the role of the User
(user of the platform) and communicates with the Client in the normal
[3-leg OAuth2 authorisation process](/references/how-the-oauth2-process-works).

Let us consider the case of Google OAuth2 authentication:

*   The `auth-client` would hold the `client_id`, `client_secret`, `auth_uri`, `token_uri` and `refresh_token_uri` values. These values would guarantee connection between the platform and third party service.
*   The `auth-secret` would hold the actual `access_token`, `refresh_token`, `expires_in`, `expires_at` and `scope` of this connection.
*   Using `auth-client` and `auth-secret`, the Secrets feature as a service updates the credentials when necessary, without waiting for the components to initiate the process.
