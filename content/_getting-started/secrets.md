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
Authentication Client (`auth-client`) and the Authentication Secret (`auth-secret`).

The `auth-client` takes the responsibility of communication between the Applicatio (the platform)
and the Service (3rd party service), while the `auth-secret` takes the role of the User
(user of the platform) and communicates with the Client in the normal
[3-leg OAuth2 authorisation process](/references/how-the-oauth2-process-works).

Let us consider the case of Google OAuth2 authentication:

*   The `auth-client` would hold the `client_id`, `client_secret`, `auth_uri`, `token_uri` and `refresh_token_uri` values. These values would guarantee connection between the platform and third party service.
*   The `auth-secret` would hold the actual `access_token`, `refresh_token`, `expires_in`, `expires_at` and `scope` of this connection.
*   There can be more than one `auth-secret` for each `auth-client`.
*   Using `auth-client` and `auth-secret`, the Secrets feature as a service updates all credentials when necessary, without waiting for the components to initiate the process.

## Auth Client Creation

Before you can create your `auth-client` you must know that:

*   The `auth-client` can have `workspace`, `contract` and `tenant` visibility levels. For each level you need to have a matching permission. For example only tenant administrator can create a Client with `tenant` visibility level.

*   They divide into two distinct groups: `oauth2` and others:
    *   For `oauth2` type you must supply `client_id`, `client_secret`, `auth_uri`, `token_uri` and `refresh_token_uri` values to create the Client. Since some services have their own flaivour of OAuth2, this is the right place to give them as well. Check the OAuth2 credential creation example.
    *   For other types you have relative freedom. However, our system already knows about `noauth` (use no authentication), `basic` (use username/password pair) and `api_key` (use header and API Key) types. Contact us if you need something more.

### Creating OAuth2 Client

You can create OAuth2 `auth-client` using either the UI or an API call.

To create via UI you can use the REST-API component as an example to create an OAuth2 `auth-client`
when selecting to add a credentials:

{% include img.html max-width="100%" url="/assets/img/getting-started/secrets/choose-oauth2.png" title="Choose OAuth2 type credential in REST-API component." %}

After clicking on **+Add New Client** a form will showup to fillin the details for
OAuth2 client:

{% include img.html max-width="60%" url="/assets/img/getting-started/secrets/fillin-oauth2-form.png" title="Fill in the form to create the OAuth client." %}

After this step you can create the `auth-secret` the same way as one would create
a credential.

For more advanced cases we recommend using an API call to create `auth-client`.
Please consult the [Create Auth Client]({{site.data.tenant.apiBaseUri}}/docs/v2/#create-auth-client)
section for more.
