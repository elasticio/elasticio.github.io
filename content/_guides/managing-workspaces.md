---
title: Managing Workspaces
description: This document explains how to manage workspaces. It shows how to create, edit and delete workspaces using the user interface and platform REST API.
layout: article
section: Contract Management
order: 1
since: 20190411
category: integrator-management
---

{{page.description}} We assume you are familiar with
[hierarchical structure](/getting-started/contracts-and-workspaces) of the platform
and why we need workspaces.

## Creating Workspace

Every contract member can create a workspace on the [user interface](#creating-workspace-ui)
or using a [REST API call](#creating-workspace-api).

**Please note** no matter which method you use to create, a workspace name must
adhere to the following standards:

*   It must have usable characters like letters, digits, white-spaces, hyphen (`-`) and underscore (`_`).
*   It must be 3 to 40 characters in length.

### Creating workspace: UI

When you start from an empty contract you can open the menu (**1**), click to create
a workspace (**2**) either from the menu item **+ Create Workspace** or by clicking
on a **+ Create New Workspace** button in the middle:

{% include img.html max-width="80%" url="/assets/img/integrator-guide/managing-workspaces/create-workspace-empty-contract.png" title="Creating workspace in empty contract" %}

The following animation shows workspace creation in case of fully operation contract:

{% include img.html max-width="80%" url="/assets/img/integrator-guide/managing-workspaces/creating-workspace-contract.gif" title="Creating workspace in contract" %}

You can create a Workspace when viewing all workspaces page as well. Open the menu,
and expand the workspace list and click on **View All Workspaces** menu item to navigate
to all workspaces page. Here you can create a new one by clicking on **+ Create New Workspace**
button.

{% include img.html max-width="80%" url="/assets/img/integrator-guide/managing-workspaces/creating-workspace-all-workspaces.png" title="Creating workspace from all workspaces page" %}


### Creating workspace: API

To create a workspace using our REST API you must use your `email` and `APIKEY`
to authenticate. Check the [platform tour profile information section](/getting-started/platform-tour.html#profile-information) if unsure where to find this information.

Make an HTTP `POST` to `{{site.data.tenant.apiBaseUri}}/v2/workspaces` using the
following request parameters:

| Payload Parameter                  | Required | Description                |
|------------------------------------|----------|----------------------------|
| `type`                             | yes      | Allowed value: `workspace` |
| `attributes.name`                  | yes      | Name of the new workspace  |
| `relationships.contract.data.id`   | yes      | ID of the contract         |
| `relationships.contract.data.type` | yes      | Allowed value: `contract`  |

Check our REST API documentation [workspace creation section]({{site.data.tenant.apiDocsUri}}/v2/#create-a-workspace) for more details.


## Editing Workspace

With the right [permissions](/guides/managing-user-roles-in-a-tenant) a workspace
member can perform workspace management via the [UI](#editing-workspace-ui) or
the [API](#editing-workspace-api).

### Editing workspace: UI

You can rename the workspace via the user interface open the menu and click on
the **Organize** > **Workspace** item to navigate to the workspace management
page. Now click on the name of the workspace to edit.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/managing-workspaces/edit-workspace-name.png" title="Edit workspaces name" %}

> **Please note** to edit the [workspace type](/getting-started/contracts-and-workspaces.html#limited-workspaces)
> from `limited` to `full` or back you must contact your tenant administration.
> They can edit the type using `tenantAdmin` access rights via an API call.

### Editing workspace: API

You can edit the workspace record using our REST API providing your `email` and `APIKEY`
to authenticate.

To change the workspace parameters make an HTTP `PATCH` call to
`{{site.data.tenant.apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}` endpoint using the
following request parameters:

| Payload Parameter | Required | Description                       |
|-------------------|----------------------------------------------|
| `type`            | yes      | The value must be `workspace`.    |
| `attributes.name` | yes      | Name of the workspace.            |
| `attributes.flow_stats_enabled_default` | no | Boolean `true`/`false`. Read more: [Flow Stats Toggle](https://api.elastic.io/docs/v2/#flow-stats-toggle) |
| `attributes.type` | no | Type of the Workspace. Allowed values: full or limited. |

Check our REST API documentation [update workspace section]({{site.data.tenant.apiDocsUri}}/v2/#update-a-workspace) for more details.

> To change the workspace type you need to have at least tenant administration access
> rights (`tenantAdmin`).


## Deleting workspace

As with most operations described on this page, you can delete a workspace either
via the [UI](#deleting-workspace-ui) or the [API](#deleting-workspace-api).

**Before you can proceed with this operation you must keep in mind that this is an irreversible process.**
This means we cannot undo this and all the following associated resources will be deleted:

*   Credentials in this workspace,
*   VPN agents,
*   Data samples generated by integrated steps,
*   Invitations; all invitation tokens will not work,
*   Lookup tables,
*   Flow's Dynamic Metadata,
*   Flow's Dynamic Select Model data,
*   Flow's Execution Statistics,
*   Flow's Execution Results,
*   Flows and their versions,
*   Flow's Errors and their details.


### Deleting workspace: UI

To delete a workspace click on **Organize** > **Workspace** item to navigate to
the workspace management page. Scroll down to find **Delete workspace** button.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/managing-workspaces/delete-workspace.png" title="Delete workspaces" %}

When you click on this button a warning message would show with the following text:

> **Delete workspace Name**
>
> Are you sure you want to delete this workspace permanently? Deleting this
> workspace is an irreversible process, we cannot undo a deletion if you complete
> the process by accident.

You can press **Cancel** to stop deletion process or press on **Delete workspace**
to permanently delete it.

### Deleting workspace: API

To delete workspace via the API we make an HTTP `DELETE` call to the the following
endpoint `{{site.data.tenant.apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}`. Here you
must only provide the ID of the workspace.

> **Please note** No warning message comes when you execute this call via the API.


## Workspace members

You can add, invite and manage members in your workspace using either
the [UI](#managing-workspace-members-ui) or the [API](#managing-workspace-members-api).

The workspace `Owner` role allows you to add and manage members in your workspace.
To invite new members not included in the contract to your workspace you must
have an `Owner` role in contract as well.

### Managing workspace members: UI

You can do all user related tasks on the workspace management page. Choose the
workspace where you need to perform this operations (**1**), click on
**Organise** > **Workspace** to load the page (**2**). Here you can add, invite,
edit and delete members (**3**). Let us consider each case separately.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/managing-workspaces/workspace-add-invite-member.png" title="Workspace management page to add and invite members." %}

> **Please Note** when you have lower than **Admin** role in the contract you
> will not see **Invite new member** button.

#### Add member via UI

To add a member to your workspace follow these steps:

1.  Click on **+ Add new member** button to load **Add new member form** above the existing member's list.
2.  Click to open the drop-down menu for selecting members. Here you will have all present members of the current contract listed, select the desired user.
3.  Next select a role for this new member in your workspace from the drop-down menu and then
4.  click on **+ Add** link to finish.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/managing-workspaces/workspace-add-member.png" title="Add member to workspace." %}

#### Invite member via UI

To invite a new member to your workspace follow these steps:

1.  Click on **Invite new member** button (if it exist) to load **Invite new member form** above the existing member's list.
2.  Input the email address of the person you wish to invite.
3.  Select the contract role to grant. You can choose one or combination of `Owner`, `Admin` and `Member` [user roles](/guides/managing-user-roles-in-a-tenant).
4.  Select the workspace role. You can choose from existing roles available for the workspace.
5.  Click to send the invitation. Our system will send an invitation to join your contract and the workspace.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/managing-workspaces/workspace-invite-member.png" title="Invite member to workspace." %}

#### Edit or delete member via UI

From this page you can edit user roles or delete them

{% include img.html max-width="100%" url="/assets/img/integrator-guide/managing-workspaces/workspace-member-edit-delete.png" title="Edit or delete members." %}

When you delete a members. the system would transfer all Flows, security credentials
and Data Samples to your member.

Editing the member means changing the roles. The following animation shows more:

{% include img.html max-width="80%" url="/assets/img/integrator-guide/managing-workspaces/workspace-edit-member-role.gif" title="Edit member role." %}

### Managing workspace members: API

You can manage members in your workspace using our
[REST API workspace unit]({{site.data.tenant.apiDocsUri}}/v2/#workspace-unit)
section. In includes information abour adding new members, managing their workspace
user roles and removing members.

#### Add new member via API

To add a new member via the API, use the following request:

`POST {{site.data.tenant.apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members`

Below are request parameters:

| Payload Parameter    | Required | Description                                |
|----------------------|--------------|----------------------------------------|
| `id`                 | yes      | ID of an already registered user, who will be added as a member of the workspace |
| `type`               | yes      | Allowed value: `member`.                   |
| `attributes.roles[]` | yes      | New member roles.                          |

#### Update members via API

To update user roles via the API, use the following request:

`PATCH {{site.data.tenant.apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members/{USER_ID}/`

Below are request parameters:

| URL Parameter      | Required | Description                              |
|--------------------|----------|------------------------------------------|
| `WORKSPACE_ID`     | yes      | Workspace ID                             |
| `USER_ID`          | yes      | Target user ID                           |


| Payload Parameter    | Required | Description                                |
|----------------------|----------|--------------------------------------------|
| `id`                 | yes      | ID of an already registered user, match URL parameter `{USER_ID}` |
| `type`               | yes      | Allowed value: `member`.                   |
| `attributes.roles[]` | yes      | Roles.                                     |


#### Delete member via API

To remove a member from the workspace via the API we will use the following
request:

`DELETE {{site.data.tenant.apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members/{USER_ID}/`

Below are request parameters:

| URL Parameter  | Description                                  |
|----------------|----------------------------------------------|
| `WORKSPACE_ID` | The ID of the Workspace.                     |
| `USER_ID `     | The ID of the user, which requires deletion. |
