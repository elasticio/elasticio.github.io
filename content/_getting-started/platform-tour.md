---
title: Platform UI tour
layout: article
section: Introduction
description: This document provides a quick tour of the Platform User Interface (UI) describing each item of the Navigation Menu from top to bottom in case of already established contract with working integration flows.
order: 1
category: intro
---

<img src="/assets/img/getting-started/tour/menu-all.png" style="width:200px; float:right; margin:10px 0px 20px 20px" alt="Menu" title="Menu">

{{page.description}}

**Menu structure**:

1.  [Contract name and status](#1-contract-name-and-status)
2.  [Workspaces](#2-workspaces)
3.  [Analyze](#3-analyze)
4.  [Integrate](#4-integrate)
5.  [Organize](#5-organize)
6.  [Contract Settings](#6-contract-settings)
7.  [Development](#7-development)

Click through each menu section while you reading this tour since you might
see slightly different picture based on your access level and the project stage in
your contract.

## 1. Contract name and status

At the top of our navigation menu you can find your contract name and the status.
Contract status shows state of the contract - Active or Suspended.

If you have access to more than one contract on our platform you will also see the
chevron icon which you can click on to open list of your contracts. Select the
name to switch to a different contract.

![Menu: Contracts](/assets/img/getting-started/tour/menu-contracts.png "Menu: Contracts")


## 2. Workspaces

This part of the menu shows the current workspace. Click on the chevron icon to
open a sub-menu containing list of the workspaces you can access in the current
contract. Select the name to switch to a different workspace.

![Menu: Workspaces](/assets/img/getting-started/tour/menu-workspaces.png "Menu: Workspaces")

The open workspaces sub-menu on the right shows the following details and menu items:

1.  Production or `full` workspace used for production flows,
2.  Development or `limited` workspace used to develop integration flows and run tests,
3.  Menu item to **View All Workspaces** in the contract,
4.  Menu item to **+ Create Workspace**.

## 3. Analyze

This menu section links pages to help you monitor and debug your integration flows.

*   [Dashboard](#dashboard)
*   [Executions](#executions)
*   [Logs](#logs)

### Dashboard

The Dashboard **(1)** item opens the default page that you see when you open the
Platform. On this page, you can see the daily statistics diagram **(2)**. The
tabs below list the past executions **(3)** and errors **(4)**. Also, there is
an *Add new flow* button **(5)** you can use to create a new Flow.

![Dashboard](/assets/img/getting-started/tour/dashboard.png "Dashboard")

### Executions

The Executions **(1)** item opens our [Executions Page](executions). Here you can
find a list of executions **(2)** that you can sort with filters **(3)**.

![Executions](/assets/img/getting-started/tour/executions.png "Executions")


### Logs

The Logs **(1)** item opens our [Logs Page](logs-page). Here you can find a list
of logs **(2)** that you can sort with filters **(3)**. You can also go to
[Executions Page](executions) by clicking on *"Thread's details"* **(4)**.

![Logs](/assets/img/getting-started/tour/logs.png "Logs")


## 4. Integrate

This menu section includes the following items:

*   [Flows](#flows)
*   [Credentials](#credentials)
*   [Agents](#agents)
*   [Topics](#topics)

### Flows

You can manage your integration [Flows](integration-flow) here **(1)**. Navigation
through your Flow list is simplified with search and filters **(2)**. You can
open **(3)** each Flow for details and management, and see Flow status **(4)**.
Also, part of the management is done here, for example: starting **(5)**,
deleting **(6)**, running **(7)** or stopping **(8)**.

![Flows](/assets/img/getting-started/tour/flows.png "Flows")

For more information please visit our [Managing Flows](/guides/managing-flows) page.

### Credentials

This page **(1)** contains a list of [Components](integration-component) that may
require [Credentials](credential) to work. To manage Credentials, select one of
the Components **(2)**. The green circle with a number **(3)** represents the
number of valid Credentials you have for a certain Component.

![Credentials](/assets/img/getting-started/tour/creds.png "Credentials")

For more information please visit our
[Managing Workspaces](/guides/managing-workspaces.html#creating-credentials) page.

### Agents

This is the [VPN Agent](vpn-agent) management page **(1)**. Here you can manage
your Local Agents **(2)**, and create them **(3)**.

![Agents](/assets/img/getting-started/tour/agents.png "Agents")

### Topics

This is the [Topics](topics) management page **(1)**. Here you can manage your
Topics **(2)** or create a new one **(3)**.

![Topics](/assets/img/getting-started/tour/topics.png "Topics")


## 5. Organize

This is the page where you can manage your Workspace **(1)**. This includes
changing Workspace name **(2)**, adding members **(3)**, and checking member
list where you can edit or delete **(5)** members. Additionally, here you can
delete **(6)** the Workspace itself.

![Organize Workspace](/assets/img/getting-started/tour/workspace.png "Organize Workspace")

For more information please visit our
[Managing Workspaces](/guides/managing-workspaces) page.

## 6. Contract Settings

This menu section includes the following items:

*   [Quota Usages](#quota-usages)
*   [Members](#members)

### Quota Usages

This item opens the [Quota](quota-overview) page **(1)** that contains all the
information on the used and available resources, and a detailed report **(2)**.
 It is beneficial for limited [Workspaces](contracts-and-workspaces).

![Quota page](/assets/img/getting-started/tour/quota.png "Quota page")

### Members

This item brings you to the Members page **(1)**, where you can manage Contract
Members **(2)**.

![Members](/assets/img/getting-started/tour/members.png "Members")

For more information please visit our
[Managing user roles](/guides/managing-user-roles-in-a-tenant) page.


## 7. Development

This menu section includes the following items:

*   [Developer Teams](#developer-teams)
*   [Test Metadata Tool](#test-metadata-tool)

### Developer Teams

Here you can manage your Developer Teams **(1)**. Each team's details **(2)**
can be opened on this page. Also, you can add new teams via the corresponding button **(3)**.

![Developer Teams](/assets/img/getting-started/tour/devteams.png "Developer Teams")

### Test Metadata Tool

Here you can render the component metadata structures to see how they would look
on the platform UI using our [tool](/developers/try-metadata) **(1)**.

![Test Metadata Tool](/assets/img/getting-started/tour/metadata-tool.png "Test Metadata Tool")


## Documentation

Documentation presents two links: to docs and to API docs.

{% include img.html max-width="50%" url="/assets/img/getting-started/tour/documentation.png" title="Documentation" %}

## Support


Support presents links to support helpdesk or built-in intercom.

{% include img.html max-width="50%" url="/assets/img/getting-started/tour/support.png" title="Support" %}

## Profile Information

To find your profile information click to open the profile menu **(1)** and select
the profile name **(2)**. Here you can do the following actions:

*   [Edit your profile](#edit-your-profile) **(3)**
*   [Change your password](#change-your-password) **(4)**
*   [Enable or disable Two-factor (2FA) authentication](#two-factor-authentication) **(5)**
*   [Copy or regenerate your personal API Key](#manage-your-api-key) **(6)**
*   [Delete your account](#delete-your-account) **(7)**

{% include img.html max-width="100%" url="/assets/img/getting-started/tour/profile.png" title="Profile Information" %}

### Edit your profile

Here you can edit the name and email address associated with your account. Just be
careful to safe this in your records to not get locked out of the platform.

{% include img.html max-width="80%" url="/assets/img/getting-started/tour/edit-profile.png" title="Edit Profile" %}

### Change your password

Here you can change your password which you use to login to the platform - not your API Key.
Please follow the instructions to generate secure password.

{% include img.html max-width="80%" url="/assets/img/getting-started/tour/change-password.png" title="Change your password" %}

### Two-factor authentication

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

### Manage your API Key

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

### Delete your account

You can delete your account by pressing this button. Please note this process is
not reversible.

## Identity Keys

If you open the section **(1)** and click this item **(2)**, you will reach your SSH keys list, which you can manage from here.

{% include img.html max-width="100%" url="/assets/img/getting-started/tour/ssh.png" title="SSH Keys" %}

## Sign Out

This item signs you out of the profile.

{% include img.html max-width="50%" url="/assets/img/getting-started/tour/signout.png" title="Sign Out" %}
