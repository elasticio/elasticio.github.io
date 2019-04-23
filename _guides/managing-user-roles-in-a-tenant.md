---
title: Managing user roles in a tenant
layout: article
section: Tenant Management
order: 1
since: 20190321
---

This document explains [what roles and permissions are](#roles-and-permissions),
how [roles are set in the UI](#setting-user-roles) and how [custom roles are
configured](#configuring-custom-user-roles). Additionally, it provides a list of [non-deletable roles](#essential-roles), and a [permissions reference](#permissions-reference-table) table.

## Roles and permissions


A [tenant](/getting-started/tenant) admin can
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

1\.  Open **Workspace** in navigation menu:

![](/assets/img/tenant-management-guide/managing-user-roles-in-a-tenant/Screenshot_2.png)


2\.  Edit members’ roles:

![](/assets/img/tenant-management-guide/managing-user-roles-in-a-tenant/Screenshot_1.png)


3\.  Either add or invite a new member:

  a)  Click **Add new member**, select an existing user and use the **Role** dropdown menu.

![](/assets/img/tenant-management-guide/managing-user-roles-in-a-tenant/Screenshot_18.jpg)

  b)  Click **Invite new member**, enter user email and use **Contract Role** and **Workspace Role** dropdown menus.

![](/assets/img/tenant-management-guide/managing-user-roles-in-a-tenant/Screenshot_19.jpg)

4\.  In the corresponding menu, select the required role. If your tenant has an extensive list of roles, use the **Find role** field to optimize search. Start typing to gradually filter out unwanted roles.

![](/assets/img/tenant-management-guide/managing-user-roles-in-a-tenant/Screenshot_3.png)

![](/assets/img/tenant-management-guide/managing-user-roles-in-a-tenant/Screenshot_4.png)


5\.  Click **Add** or **Send Invite**, depending on your previous actions.

![](/assets/img/tenant-management-guide/managing-user-roles-in-a-tenant/Screenshot_24.jpg)

![](/assets/img/tenant-management-guide/managing-user-roles-in-a-tenant/Screenshot_20.jpg)

To set a role for a user when adding or inviting new users to a workspace:

1\.  Open profile **Settings** in the navigation menu:

![](/assets/img/tenant-management-guide/managing-user-roles-in-a-tenant/Screenshot_5.png)

2\.  Select your contract:

![](/assets/img/tenant-management-guide/managing-user-roles-in-a-tenant/Screenshot_6.png)

3\.  Edit members’ roles In the **Members** tab:

![](/assets/img/tenant-management-guide/managing-user-roles-in-a-tenant/Screenshot_7.png)

4\.  Alternatively, invite a new member and set the roles. Initially, only **Contract Role** dropdown menu is visible. To assign the new member’s workspace and workspace role, click **Specify invitee’s workspace**, and use the **Workspace Role** dropdown menu. Then click **Send Invite**.

![](/assets/img/tenant-management-guide/managing-user-roles-in-a-tenant/Screenshot_29.png)

## Configuring custom user roles


A tenant admin can configure custom roles if required. To do that, the admin
needs a special set of credentials called *service account*. It can be acquired
by an authorized client employee via support.

There are a few restrictions for custom role creation and role deletion:

- You cannot create multiple roles with identical names in one scope;
- You cannot delete a role that is assigned to a member;
- You cannot delete [essential roles](#essential-roles);
- You cannot delete a role that is used in `contract.availableRoles` (learn more about it [here]({{apiBaseUri}}/docs/v2/#create-a-contract)).


When the tenant admin uses the *service account* privileges, he can [create
custom roles]({{apiBaseUri}}/docs/v2/#update-tenant's-roles) via the
following API request:

`PATCH {{apiBaseUri}}/v2/tenants/{TENANT_ID}/roles` , where

`{TENANT_ID}` parameter stands for the ID of the tenant.

Below are request payload parameters:

| **Parameter**                            | **Required** | **Description**                                                                                                                                                                                                 |
|------------------------------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`                                     | yes          | This parameter should have the value: `tenant-policy`                                                                                                                                                         |
| `attributes.roles[]`                       | yes          | An array of Tenant’s roles. It can be empty.                                                                                                                                                                    |
| `attributes.roles[].role`                  | no           | Custom role name                                                                                                                                                                                                |
| `attributes.roles[].scope`                 | no           | The group of objects, which is affected by this role. Value can be: `contracts` or `workspaces`.                                                                                                            |
| `attributes.roles[].permissions[]`         | yes          | An array of permissions. It can be empty. To get the list of available permissions execute the endpoint: `GET {{apiBaseUri}}/v2/permissions` or see [this reference table](#permissions-reference-table). |
| `attributes.roles[].i18n.{{language_key}}` | no           | The name of a role in different languages. The value is only required for `en` key. For other languages value is optional.                                                                                  |

**EXAMPLE:**

To add a new role called *Godzilla*, with permissions to see and delete
workspaces in the contract, and edit a workspace, we will use the following
request:
```
curl {{apiBaseUri}}/v2/tenants/{TENANT_ID}/roles
   -X PATCH
   -u {EMAIL}:{APIKEY}
   -H 'Content-Type: application/json' -d '
    {
      "data":{
        "type":"tenant-policy",
        "attributes":{
          "roles":[
            {
              "role":"Godzilla",
              "scope":"contracts",
              "permissions":[
                "contracts.workspace.listAll",
                "contracts.workspace.delete"
              ],
              "i18n":{
                "en":"Godzilla"
              }
            },
            {
              "role":"Godzilla",
              "scope":"workspaces",
              "permissions":[
                "workspaces.workspace.edit",               
              ],
              "i18n":{
                "en":"Godzilla"
              }
            }
          ]
        }
      }
    }'
```

 **NOTE:** these endpoints are still in development and are subject to change.

## Essential roles

A number of roles cannot be edited or deleted, because their functionality is unique. They are:

- contract.owner - this role is assigned to the first member of the contract;
- workspace.owner - this role is assigned to the user who created the workspace;

These roles have exclusive permissions, which are essential for contract and workspace management.    

## Permissions reference table


| **Permission**                 | **Description**                                             |
|--------------------------------|-------------------------------------------------------------|
| `contracts.membership.edit`      | Edit members in the contract                                |
| `contracts.workspace.create `    | Create workspaces in the contract                           |
| `contracts.workspace.listAll`    | View all workspaces in the contract                         |
| `contracts.workspace.delete`     | Delete workspaces in the contract                           |
| `contracts.repository.edit `     | Edit contract repository                                    |
| `contracts.devTeam.edit  `       | Edit developer team                                         |
| `workspaces.workspace.edit`      | Edit the workspace                                          |
| `workspaces.flow.edit`           | Edit flows in the workspace                                 |
| `workspaces.flow.toggleStatus`   | Toggle flow status between **active** and **inactive**    |
| `workspaces.flow.toggleRealtime` | Toggle flow status between **ordinary** and **real-time** |
| `workspaces.credential.edit `    | Edit credentials                                            |
