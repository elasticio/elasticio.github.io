---
title: Re-authentication for sensitive actions
layout: article
section: Platform Features
description: This document explains the automatic re-authentication function.
order: 11
category: platform-features
---

## Description 

While working with the platform interface, there may be cases of unwanted changes of user/contract data by an unauthorized person who gained access to the interface or by the user himself by accident. 

In order to prevent unaware changes and protect against malicious changes of data, the platform has a mechanism - *Re-authentication for sensitive actions*.

## Settings

The mechanism is implemented through a flag in the Tenant configuration and can be activated optionally for the entire installation.

`sensitive_actions_reauth`

By default this flag is not active and to enable it you need to make a [PATCH request]({{site.data.tenant.apiDocsUri}}/v2#/tenants/patch_tenants__tenant_id_) to the Tenant you are interested in, with the following body:
```json
{
  "data": {
    "type": "tenant",
    "attributes": {
     // Enter your tenant attributes
      "feature_flags": {
       // Enter your tenant feature flags
        "sensitive_actions_reauth": true
      }
    }
  }
}
```

> **Please Note:** You will need Tenant Admin user rights to be able to make changes to Tenant settings.

## Changes

When feature flag `sensitive_actions_reauth` is active, all Tenant users will be required to enter a password to confirm their actions before attempting to make changes to sensitive data.

{% include img.html max-width="50%" url="/assets/img//getting-started/sensitive_actions_reauth/password_request.png" title="Sensitive action re-authentication" %}

In case the user does not use a password when authenticating to the platform, the user will be redirected to OIDC/SAML provider for authentication.

This feature will work on all modern web browsers versions from:
* Chrome `66+`
* Firefox `63+`

> **Please Note:** The user will be asked to re-authenticate every 6 hours. It means that after successful authentication the user will be able to do sensitive actions for another 6 hours without additional authentication.

## Actions

Below you can see a list of actions that are considered sensitive by the platform and will require additional re-authentication if engaged:

- [Reading, copying and regenerating user API Keys](/getting-started/user-profile-information.html#manage-your-api-key)
- [Modifying user details](/getting-started/user-profile-information.html#edit-your-profile)
- [Disabling 2-Factor Authentication (2FA)](/getting-started/user-profile-information.html#two-factor-authentication)
- [Inviting Members to Contracts.](/guides/managing-contracts.html#editing-contract-memberships)
- [Inviting and removing Members from Workspaces](/guides/managing-workspaces.html#workspace-members) 
- [Changing user roles in Contracts and Workspaces](/guides/managing-user-roles-in-a-tenant.html#setting-user-roles-in-workspace)
- [Adding or removing SSH Keys](/getting-started/user-profile-information.html#identity-keys)
- [Removing Member from Contract](/guides/managing-user-roles-in-a-tenant.html#setting-user-roles-in-workspace)
