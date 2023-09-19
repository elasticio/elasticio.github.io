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

1.  Production or `full` workspace used for production flows.
2.  Development or `limited` workspace used to develop integration flows and run tests.
3.  Menu item to [**View All Workspaces**](#workspaces) in the contract.
4.  Menu item to **+ Create Workspace**.

## 3. Analyze

This menu section links pages to help you monitor and debug your integration flows.

*   [Dashboard](#dashboard)
*   [Executions](#executions)
*   [Containers](#containers)
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

### Containers

The Containers menu item opens our [Containers page](/guides/executions#containers-page). This page provides insights into containers and their components. By default, it displays today's log information, but users can expand the date range using the filtering and search features.

<details close markdown="block"><summary><strong>Click to expand for more details.</strong></summary>

Container logs are retained for up to 30 days. On the Containers page, you'll encounter the following states:

* **Running** (Green Flag): Indicates that the container is currently operational.
* **Finished** (Green Flag): Indicates that the container has been successfully shut down.
* **Finished** (Red Flag): Suggests that the container has been stopped due to a registered error.
* **Killed** (Green Flag): Signifies a successful termination of the container.
* **Killed** (Red Flag): Indicates that the container was abruptly terminated by the operating system.

{% include img.html max-width="100%" url="/assets/img/getting-started/tour/container-states.png" title="Container States" %}

To access specific information for a container, simply click on the 'Step Name.' On the individual container page, you will find the following details:

* **Status:** The current status of the container.
* **Flow Name:** The name of the flow associated with this container. Clicking on the flow name opens the corresponding flow designer page.
* **Start Date:** The date and time when the container started.
* **Stop Date:** The date and time when the container stopped.
* **Exit Code:** The current or last status code of the container.
* **Reason:** A description of the current or last status code.
* **Filtering:** Options for filtering the container's logs, including Search, Log Level, and Date Range.
* **Details:** Log entries with Date/Time, Log Level, and Description.

{% include img.html max-width="100%" url="/assets/img/getting-started/tour/container.png" title="Container" %}

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
*   [Recipes](#recipes)

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

### Recipes

The Recipes menu item opens the [Recipes](/guides/creating-recipes) management page. Here you can
activate and delete your Recipes. We also display the number of deployments of these recipes on each Recipe Card. Recipes allow users to share Flow templates with others without disclosing their non-shareable data (Credentials, Fields, Variables).​

<details close markdown="block"><summary><strong>Click to expand for more details:</strong></summary>

1.  You can deploy running integration flows from any listed Recipe by hitting the **Activate** button.
2.  Each deployment can include more than one integration flows and these we display when you click **Show Deployments** on the Recipe Card.
3. You can also delete any Recipe.

![Recipes](/assets/img/getting-started/tour/recipes.png "Recipes")

</details>

## 5. Organize

This menu section has one item - the Workspace which opens [workspace management](/guides/managing-workspaces)
page. Each workspace has a separate page like this where you can rename it,
manage members and delete it based on your access role.

<details close markdown="block"><summary><strong>Click to expand for more details:</strong></summary>

While in workspace management page you can:

1.  Rename the workspace.
2.  Add or Invite new member to this workspace.
3.  See the list of workspace members.
4.  Edit member roles or remove them completely.
5.  Delete the workspace.

![Organize Workspace](/assets/img/getting-started/tour/organize-workspace.png "Organize Workspace")

For more information please visit our
[Managing Workspaces](/guides/managing-workspaces) page.

</details>

## 6. Contract Settings

This menu section includes the following items:

*   [Quota Usages](#quota-usages)
*   [Members](#members)
*   [Workspaces](#workspaces)

### Quota Usages

The Quota Usages menu item opens our [quota overview](quota-overview) page. Here
you can check the combined memory usage of flows in all your workspaces of the
contract. From here you can drill-down the usage based on the workspaces and
individual flows for the current month. If you have the memory quota limit set for
your contract then you will see relationship of used and still remaining quota.


<details close markdown="block"><summary><strong>Click to expand for more details:</strong></summary>

1.  Shows the current month and the current usage. It also shows the quota limit if defined.
2.  Use the button to drill-down into the workspace and flow level usage.
3.  The histogram of the used memory per month. If the contract has a quota limit then histogram shows the used memory and the still remaining quota. You can hover on any month to get the exact values.
4.  The legend for the histogram.

![Quota page](/assets/img/getting-started/tour/quota-page.png "Quota page")

</details>

### Members

The Members menu item opens the contract Member management page. Here you can
rename the contract, view and invite members, edit the [member access roles](/guides/managing-user-roles-in-a-tenant) or
remove the member from the contract. From this page you can access [Workspaces](#workspaces)
page as well.

<details close markdown="block"><summary><strong>Click to expand for more details:</strong></summary>

You can do the following action if you have `Owner` role in the contract.

1.  Rename the contract.
2.  The list of members in current contract.
3.  Workspaces switcher to open page with all workspaces.
4.  **Invite new member** button to invite new member to this contract based on your role in this contract.
5.  Pencil icon to use for [managing the user roles](/guides/managing-user-roles-in-a-tenant) and bin icon to delete the user.

![Members](/assets/img/getting-started/tour/members-page.png "Members")

</details>

### Workspaces

You can access this page from the **Workspaces tab** of the [Members](#members) page
or from the **View all workspaces** menu link of the [Workspaces name](#2-workspaces).
Here you can [manage the workspaces](/guides/managing-workspaces) of this contract.
You can create a new workspace, see all existing workspaces and navigate to each
workspace if you have appropriate access and role in the contract.

<details close markdown="block"><summary><strong>Click to expand for more details:</strong></summary>

1.  Click on **+ Create New Workspace** button to create new workspace.
2.  See the existing workspace cards showing the name, type and number of users.
3.  Delete the workspace by pressing on bin icon. **Warning: this action is irreversible**.

![Workspaces](/assets/img/getting-started/tour/workspaces-page.png "Workspaces")

For more information please cvisit our [Managing workspaces](/guides/managing-workspaces) page.

</details>

## 7. Development

This menu section includes items for component developers. Here you have a link
to the following pages:

*   [Developer Teams](#developer-teams)
*   [Metadata Test Tool](#metadata-test-tool)

### Developer Teams

The Developer Teams menu item opens the contract developer teams page. Here you
can [manage your existing teams and integration components](/developers/teams-and-repos) or
create a new ones if your have contract `Admin` access role.

<details close markdown="block"><summary><strong>Click to expand for more details:</strong></summary>

1.  Use **+ Add New Team** button to create a new developer team.
2.  Here you can see the developer team details, number of members and repositories it contains.  Click on the Name to navigate to any developer team.

![Developer Teams](/assets/img/getting-started/tour/developer-teams.png "Developer Teams")

If you clicked on the team name, you will see the functionality to manage your team:

1. Create a new repositories or invite new members.
2. Delete member of the developer team.
3. See details on repositories.

![Your Team](/assets/img/getting-started/tour/your-team.png "Your Team")

</details>

### Metadata Test Tool

The Metadata Test Tool menu link opens a [special tool](/developers/try-metadata)
our developers use to test and improve the component metadata structures. You can
paste your metadata here to see how it renders on the platform UI.

<details close markdown="block"><summary><strong>Click to expand for more details:</strong></summary>

1.  The panel you can use to paste the JSON structure of your metadata.
2.  The panel renders the output based on your input data.

![Metadata Test Tool](/assets/img/getting-started/tour/metadata-test-tool.png "Metadata Test Tool")

</details>
