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

The first page you land when navigate to your contract is the Dashboard page. It
shows the daily execution statistics graph and the runlog of executions and errors.

<details close markdown="block"><summary><strong>Click to expand for more details.</strong></summary>

1.  The **Daily Execution Statistics** graph showing the values for data records and errors. You can click on the legend to filter one or the other.
2.  The **Runlog** showing the past execution and errors of integration flows in your workspace. You can use tabs to switch between the executions and errors.
3.  **Add new flow** button to create an integration flow.

![Dashboard](/assets/img/getting-started/tour/dashboard.png "Dashboard")

</details>

### Executions

The Executions menu item opens our [Executions Page](executions). Here you can
find a list of executions based on a data transfer, sort them with filters to
narrow down your search and navigate to the one you need.

<details close markdown="block"><summary><strong>Click to expand for more details:</strong></summary>

1.  Use filters to narrow down your search based on the Flow Name, Status and the time.
2.  The list of execution matching the selected criteria.

![Executions](/assets/img/getting-started/tour/executions.png "Executions")

</details>

### Logs

The Logs menu item opens our [Logs Page](logs-page). Here you can find the logs of
all executions in your workspace. The view shows logs sorted by time. You can search
and filter the logs you are looking for.

<details close markdown="block"><summary><strong>Click to expand for more details:</strong></summary>

1.  You can search in the logs and use the filters to find the logs you need.
2.  The panel shows the logs sorted according to the time-stamp. Here you can click to navigate to the specific execution of the logs (3 dots on the right). You can expand long log entries by clicking on the triangle which will show on the left of the log entry.

![Logs](/assets/img/getting-started/tour/logs.png "Logs")

</details>

## 4. Integrate

This menu section links the pages you need to build integration flows.

*   [Flows](#flows)
*   [Credentials](#credentials)
*   [Agents](#agents)
*   [Topics](#topics)

### Flows

The Flows menu item opens the page where you can
[manage your integration Flows](/guides/managing-flows). From here you can
start, stop and edit your existing flows. You can also create new flows either
from scratch or by copying and editing the existing flows. From here you can also
export flows into different workspaces or create flow recipes.

<details close markdown="block"><summary><strong>Click to expand for more details:</strong></summary>

1.  Use the button to **Add New Flow**
2.  Use the free search or provided filters to find the flow(s). You can see the used filters below the search field.
3.  Use to change the view of flows page between flow cards and list view.
4.  The Flow card containing information about each flow. You can use the buttons to **Edit**, **Start** or **Stop** flows. You can also use the menu (click on cog icon to open) to **copy** and **export** the flow, **reset the snapshot**, **subscribe to errors**, **enable real-time** and **delete** the flow.

![Flows](/assets/img/getting-started/tour/flows.png "Flows")

For more information please visit our [Managing Flows](/guides/managing-flows) page.

</details>

### Credentials

The Credentials menu item opens the page containing [component credentials](/guides/credential)
for each component to use for authentication with the 3rd party resources. Here
you can create, edit and delete the credentials for each integration component.

<details close markdown="block"><summary><strong>Click to expand for more details:</strong></summary>

1.  Here you will find a card for each component which requires a credential to function. Click on any card to navigate to page to **create**, **edit** or **delete** the credentials associated with the component.
2.  The green number on each credential card shows the number of credentials you have for this component.

![Credentials](/assets/img/getting-started/tour/credentials.png "Credentials")

> **Please Note** you can also create credentials during the flow step configuration.
> These credentials will appear on the credentials page as well.

</details>

### Agents

The Agents menu item links the [VPN Agent](/guides/vpn-agent) management page where
you can create, edit and delete the VPN Agents. You can use this feature to establish
a secure VPN tunnel between your local resource and the platform. This enables a secure
data exchange between your local system and the active integration flow.

<details close markdown="block"><summary><strong>Click to expand for more details:</strong></summary>

1.  Use to [create the VPN Agents](/guides/vpn-agent.html#how-to-setup).
2.  The list of VPN Agents configured for your workspace.

![Agents](/assets/img/getting-started/tour/agents.png "Agents")

</details>

### Topics

The Topics menu item opens the [Topics](topics) management page. Here you can
create, edit and delete your Topics. You can use this feature to establish a
publish-subscribe messaging pattern to exchange data between the integration flows.

<details close markdown="block"><summary><strong>Click to expand for more details:</strong></summary>

1.  Use the **Create** button to create a new topic.
2.  The existing topic cards. Click on them to edit or delete them.

![Topics](/assets/img/getting-started/tour/topics.png "Topics")

</details>

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
