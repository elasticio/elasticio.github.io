---
title: User Profile Information
layout: article
section: Introduction
description: This document provides a quick tour of User Profile part of the UI showing how to edit your profile, change your password, enable the 2FA, copy or regenerate the API Key.
order: 2
category: intro
---

{{page.description}}

To find your profile information click to open the profile menu **(1)** and select
the profile name **(2)**. Here you can do the following actions:

*   [Edit your profile](#edit-your-profile) **(3)**
*   [Change your password](#change-your-password) **(4)**
*   [Enable or disable Two-factor (2FA) authentication](#two-factor-authentication) **(5)**
*   [Copy or regenerate your personal API Key](#manage-your-api-key) **(6)**
*   [Manage your sessions](#manage-your-sessions) **(7)**
*   [Delete your account](#delete-your-account) **(8)**

{% include img.html max-width="100%" url="/assets/img/getting-started/tour/profile.png" title="Profile Information" %}

## Edit your profile

Here you can edit the name and email address associated with your account. Just be
careful to safe this in your records to not get locked out of the platform.

{% include img.html max-width="80%" url="/assets/img/getting-started/tour/edit-profile.png" title="Edit Profile" %}

## Change your password

Here you can change your password which you use to login to the platform - not your API Key.
Please follow the instructions to generate secure password.

{% include img.html max-width="80%" url="/assets/img/getting-started/tour/change-password.png" title="Change your password" %}

## Two-factor authentication

We use Google 2FA to provide additional layer of security. Here you can enable the
two-factor authentication. You would need Google Authenticator to read the generated
QR-code:

{% include img.html max-width="80%" url="/assets/img/getting-started/tour/2fa-1-qr-code.png" title="Generated QR code" %}

Open your Google Authenticator and scan this QR-code to get the code:

{% include img.html max-width="80%" url="/assets/img/getting-started/tour/2fa-2-code-entered.png" title="Code entered" %}

After this the 2FA will be enabled, but before navigating away you better copy,
download or print the recovery codes:

{% include img.html max-width="80%" url="/assets/img/getting-started/tour/2fa-3-recovery-codes.png" title="Recovery Codes" %}

When everything is successfully enabled you will get the following screen:

{% include img.html max-width="80%" url="/assets/img/getting-started/tour/2fa-4-generated.png" title="2FA enabled" %}

Here you can either close this window and you will get a prompt to use your
Google Authenticator along with your username/password pair to enter the platform UI.

You can also disable the 2FA from here by pressing Disable button and when system
will confirm with the following message:

{% include img.html max-width="80%" url="/assets/img/getting-started/tour/2fa-5-disabled.png" title="2FA siabled" %}

To enable the 2FA again you must repeat all previous steps.

## Manage your API Key

Every platform user has a dedicated API Key to work with our REST API to automate
many actions to include in your own workflows. Here you can copy your API Key which
is purposefully obfuscated. Just click on the API key.

If you suspect your API Key might be compromised (you gave to somebody and forgot
about it) or you would like to just re-generate it you can do it here. Click on
**Generate new API Key** button to get the following prompt:

{% include img.html max-width="80%" url="/assets/img/getting-started/tour/generate-api-key.png" title="Generate API Key" %}

You are warned to consider this action:

> **Please Note** Generating a new API key will replace the existing API key. If
> a new API key is generated, then API calls made with the old API key will fail.
> Are you sure that you wish to proceed?

## Manage your sessions

In this section, you can view the details of your current platform session such as:
- **Browser**
- **Operational System**
- **Model**
- **IP Address**

As well as additional session information:
- **Expires**
- **Last Modified**
- **Created At**
- **Last Authentication**
- **Engine**
- **CPU Architecture**

Also, in this section you can see the details of other sessions and close the external session if you consider it unauthorized:

{% include img.html max-width="100%" url="/assets/img/getting-started/tour/manage_sessions.gif" title="Manage sessions" %}


## Delete your account

You can delete your account by pressing this button. Please note this process is
not reversible.

## Identity Keys

If you open the section **(1)** and click this item **(2)**, you will reach your SSH keys list, which you can manage from here.

{% include img.html max-width="100%" url="/assets/img/getting-started/tour/ssh.png" title="SSH Keys" %}

## Managing users with API calls

You can do many of the things described above using the corresponding API calls. You can find all necessary information about this functionality in our [API documentation]({{site.data.tenant.apiDocsUri}}/v2#/users).
