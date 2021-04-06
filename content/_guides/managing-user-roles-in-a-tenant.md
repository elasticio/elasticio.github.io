---
title: Managing user roles in a contract
description: This document explains what roles and permissions are, how roles are set in the UI and how custom roles are configured.
layout: article
section: Contract Management
order: 1
since: 20190321
category: integrator-management
redirect_from:
  - /guides/managing-user-roles-in-a-tenant#setting-user-roles.html
  - /guides/managing-user-roles-in-a-tenant#configuring-custom-user-roles.html
  - /guides/managing-user-roles-in-a-tenant#essential-roles.html
  - /guides/managing-user-roles-in-a-tenant#permissions-reference-table.html
---

This document explains [what roles and permissions are](#roles-and-permissions) and how [roles are set in the UI](#setting-user-roles).

## Roles and permissions

A tenant admin can
control user rights in his tenant by configuring user roles. A role is a user
attribute that defines a set of permissions for the user. Contract roles define
permissions for contract management, and workspace roles define permissions for
workspace management.

The default *contract roles* are:

-   **Owner.** Users with this role can edit contract members list, create and
    delete workspaces, and see all workspaces in the contract.

-   **Admin.** Users with this role create and
    delete workspaces, see all workspaces in the contract, make changes into
    repository, and edit development team.

-   **Member.** Users with this role can create workspaces in the contract.

The default *workspace roles* are:

-   **Owner.** Users with this role can edit the workspace, edit
    [flows](/getting-started/integration-flow),
    toggle flows’ active/inactive status, toggle flows’
    [real-time/ordinary](realtime-flows)
    status, and edit workspace credentials.

-   **Admin.** Users with this role have the same permission set as **Owner**.

-   **Integrator.** Users with this role can edit flows, toggle flows’
    active/inactive status, toggle flows’ real-time/ordinary status, and edit
    [credentials](/getting-started/credential).

-   **Guest.** Users with this role can browse the workspace.

Note that a full set of contract permissions does not automatically mean a full
set of permissions for every workspace. A contract **Admin** may be a **Guest**
in a certain workspace.

## Setting user roles

The owner or admin sets roles individually for each user when adding users to
the workspace or contract. Also, the admin can edit roles of existing members in
the contract or workspace.

To set a role for a user when adding or inviting new users to a workspace:

1\.  Open **Workspace** in navigation menu  and click **Edit member’s role**:

![Workspace - navigation menu](/assets/img/tenant-management-guide/managing-user-roles-in-a-tenant/setting-user-roles-01.png)

2\.  Either add or invite a new member:

  a)  Click **Add new member**, select an existing user and use the **Role** dropdown menu.

![Add new member - role](/assets/img/tenant-management-guide/managing-user-roles-in-a-tenant/setting-user-roles-02.png)

  b)  You can invite new member in your workspace only if your **Contract Role** is **Owner**. Click **Invite new member**, enter user email and use **Contract Role** and **Workspace Role** dropdown menus. In the corresponding menu, select the required role. If your tenant has an extensive list of roles, use the **Find role** field to optimize search. Start typing to gradually filter out unwanted roles.

![Invite new member](/assets/img/tenant-management-guide/managing-user-roles-in-a-tenant/setting-user-roles-03.png)

3\.  Click **Send Invite** to finish.

![Invite new member - send invite](/assets/img/tenant-management-guide/managing-user-roles-in-a-tenant/setting-user-roles-04.png)

To set a role for a user when adding or inviting new users to a workspace:

1\.  Edit member’s roles In the **Members** tab:

![Edit member’s roles](/assets/img/tenant-management-guide/managing-user-roles-in-a-tenant/setting-user-roles-05.png)

2\.  Alternatively, invite a new member and set the roles. Initially, only **Contract Role** dropdown menu is visible. To assign the new member’s workspace and workspace role, click **Specify invitee’s workspace**, and use the **Workspace Role** dropdown menu. Then click **Send Invite**.

![Members - invite new member](/assets/img/tenant-management-guide/managing-user-roles-in-a-tenant/setting-user-roles-06.png)

## Related links

- [Integration Flow Overview](/getting-started/integration-flow)
- [Building real-time flows](realtime-flows)
- [Understanding credentials](/getting-started/credential)
