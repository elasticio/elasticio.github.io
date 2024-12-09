---
layout: article
title: OpenID Configuration
order: 5
section: Installation Guides
description: This document describes the process of OpenID configuration and using it to log into the Platform.
category: installation
---

{: .no_toc}

{{page.description}}

- TOC
{:toc}

## OpenID

[OpenID Connect (OIDC)](https://openid.net/) is an interoperable authentication protocol based on the OAuth 2.0 family of specifications. It uses straightforward REST/JSON message flows to allow clients of all types, including browser-based JavaScript and native mobile apps, to launch sign-in flows and receive verifiable assertions about the identity of signed-in users.

Elastic.io allows users to utilize OIDC to simplify authentication process. The implemented OpenID Connect Version is `1.0`, and the implemented Flow type is [Code Flow](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth).

## Requirements
1\. OIDC provider must support the [Discovery process](https://openid.net/specs/openid-connect-discovery-1_0.html).

2\. OIDC provider must provide `email` as one of the claims.

3\. OIDC provider must provide `email_verified` as one of the claims and it has to be `true` (if no OIDC identity is found, and the user with the same email already exists).

## Using OIDC
In order to login to the platform using the OIDC provider, go to the following URL:

https://`platform-tenant-domain-name`/oidc/authenticate?iss={issuer}

The `issuer` query parameter is required and has to be the same as specified during the OIDC provider registration.

OIDC operation scheme:

1\. The user logs in with the Provider, which sends user data to the Platform. The Platform performs a check if the profile exists on the Provider, and if there is a Platform user with this profile. With both checks passed the user can log in.

2\. If automatic user creation is enabled, it will activate when the first check fails. First, the Platform checks the user by verified email, and then creates a new profile and performs user login. This process includes the automatic creation of a new Contract, a new user, and a new random password.

3\. The Tenant can be configured to create new users. In this case, even if there is no user associated with the given email on the Platform, the Platform will still create a new profile.

Here is a diagram of OIDC operation on the Platform:

![OIDC diagram](/assets/img/oidc/diagram.png)

## Limitations
This is the list of current limitations associated with OpenID:

1\. Only [Final Specifications](https://openid.net/developers/specs/) of OIDC are supported. Drafts are unsupported.

2\. Changes made into ID Token on the OpenID Provider will not result in Platform-side changes.

3\. As a new user is created with a random password, which is not revealed to the user, **it is impossible to change this password**.

## Configuring OIDC

Each Tenant can be configured with multiple OIDC providers, but an OIDC provider can only be used once per Tenant.

### Create an Application at an OIDC Provider

You will need to use the following callback URL:
`https://<platform-tenant-domain-name>/oidc/callback`

**EXAMPLE (application configuration in Google Cloud Platform):**

![OIDC in Google Cloud](/assets/img/oidc/oidc-google-cloud.png)

### Register OIDC Provider in the Platform
OIDC provider could be added via the following API call:

`POST /v2/tenants/:tenant_id/openid/providers` - more info [here](https://api.elastic.io/docs/v2#/tenants/post_tenants__tenant_id__openid_providers).

The following ID Token [claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) are used:

| **Parameter**                    | **Description**                                   |
|----------------------------------|---------------------------------------------------|
| `given_name`                             | Given name(s) or first name(s) of the End-User. Note that in some cultures, people can have multiple given names. In that case, all names can be present, being separated by space characters.    |
| `family_name`                  |  	Surname(s) or last name(s) of the End-User. Note that in some cultures, people can have multiple family names or no family name. In that case, either all surnames can be present, separated by space characters, or none.                           |
| `email`   |  End-User's preferred e-mail address.                                 |
| `email_verified` |  Allowed values: `true`, `false`. `True` if the End-User's e-mail address has been verified; otherwise `false`. When this Claim Value is true, this means that the OIDC Provider took affirmative steps to ensure that this e-mail address was controlled by the End-User at the time the verification was performed. The means by which an e-mail address is verified is context-specific, and dependent upon the trust framework or contractual agreements within which the parties are operating.   |
| `sub` |  Identifier for the End-User at the Issuer.  |

Required configuration:

| **Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `issuer`                             | yes          | URL of the OIDC issuer (base URL). |
| `client_id`                  | yes          | Application client ID.                         |
| `client_secret`   | yes          | Application client secret.                                |
| `config.auto_create_users` | no          | Toggles automated new user creation, in case a user is not registered yet. Allowed values: `true`, `false`. Default value: `true`.  |

### Adding OIDC Connections Manually
It’s possible to manually add an OIDC connection to an existing user via the following API call:

`POST /v2/users/{user_id}/openid/identities` - more info [here](https://api.elastic.io/docs/v2#/users/post_users__user_id__openid_identities).

On successful call, the user will be recognized and logged in during the next login via OIDC.
