---
title: Managing user roles in a tenant
layout: article
section: User Management
order: 1
since: 20190321
---

# User Roles


This document explains [what roles and permissions are](#roles-and-permissions),
how [roles are set in the UI](#setting-user-roles) and how [custom roles are
configured](#configuring-custom-user-roles). Additionally, it provides
[permissions reference](#permissions-reference-table) table.

## Roles and permissions


A [tenant](https://docs.elastic.io/getting-started/tenant.html) admin can
control user rights in his tenant by configuring user roles. A role is a user
attribute that defines a set of permissions for the user. Contract roles define
permissions for contract management, and workspace roles define permissions for
workspace management.

The default *contract roles* are:

-   **Owner.** Users with this role can edit contract members list, create and
    delete workspaces, and see all workspaces in the contract.

-   **Admin.** Users with this role can edit contract members list, create and
    delete workspaces, see all workspaces in the contract, make changes into
    repository, and edit development team.

-   **Member.** Users with this role can create workspaces in the contract.

The default *workspace roles* are:

-   **Owner.** Users with this role can edit the workspace, edit
    [flows](https://docs.elastic.io/getting-started/integration-flow.html),
    toggle flows’ active/inactive status, toggle flows’
    [real-time/ordinary](https://docs.elastic.io/guides/realtime-flows.html)
    status, and edit workspace credentials.

-   **Admin.** Users with this role have the same permission set as **Owner**.

-   **Integrator.** Users with this role can edit flows, toggle flows’
    active/inactive status, toggle flows’ real-time/ordinary status, and edit
    [credentials](https://docs.elastic.io/getting-started/credential.html).

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

<img width="50%" alt ="docs" src="https://user-images.githubusercontent.com/48761764/54754019-3039c180-4beb-11e9-97a0-8e29d9093981.jpg">


2\.  Edit members’ roles:

<img width="50%" alt ="docs" src="https://user-images.githubusercontent.com/48761764/54753985-1a2c0100-4beb-11e9-88dc-e95cf3b28c03.png">


3\.  Either add or invite a new member:

  a)  Click **Add new member**, select an existing user and use the **Role** dropdown menu.

![](https://user-images.githubusercontent.com/48761764/54754038-3891fc80-4beb-11e9-818f-af131fe6bfd9.jpg)

  b)  Click **Invite new member**, enter user email and use **Contract Role** and **Workspace Role** dropdown menus.

![](https://user-images.githubusercontent.com/48761764/54754026-33cd4880-4beb-11e9-8677-fc9ced4ff1c1.jpg)

4\.  In the corresponding menu, select the required role. If your tenant has an extensive list of roles, use the **Find role** field to optimize search. Start typing to gradually filter out unwanted roles.

<img width="50%" alt ="docs" src="https://user-images.githubusercontent.com/48761764/54753842-b6093d00-4bea-11e9-8641-174a76b36d2f.jpg">

<img width="50%" alt ="docs" src="https://user-images.githubusercontent.com/48761764/54754016-2f089480-4beb-11e9-96aa-26bc1888b095.jpg">


5\.  Click **Add** or **Send Invite**, depending on your previous actions.

![](https://user-images.githubusercontent.com/48761764/54754014-2d3ed100-4beb-11e9-9622-2861f33537fc.jpg)

![](https://user-images.githubusercontent.com/48761764/54754025-33cd4880-4beb-11e9-908a-63febb3873a8.jpg)

To set a role for a user when adding or inviting new users to a workspace:

1\.  Open profile **Settings** in the navigation menu:

<img width="50%" alt ="docs" src="https://user-images.githubusercontent.com/48761764/54754010-2b750d80-4beb-11e9-9064-b12fb573a822.png">

2\.  Select your contract:

<img width="50%" alt ="docs" src="https://user-images.githubusercontent.com/48761764/54753989-1c8e5b00-4beb-11e9-8d1c-0a522329f48b.png">

3\.  Edit members’ roles In the **Members** tab:

<img width="50%" alt ="docs" src="https://user-images.githubusercontent.com/48761764/54753985-1a2c0100-4beb-11e9-88dc-e95cf3b28c03.png">

4\.  Alternatively, invite a new member and set the roles. Initially, only **Contract Role** dropdown menu is visible. To assign the new member’s workspace and workspace role, click **Specify invitee’s workspace**, and use the **Workspace Role** dropdown menu. Then click **Send Invite**.

![](https://user-images.githubusercontent.com/48761764/54754027-3465df00-4beb-11e9-8b97-6cec9f836768.png)

## Configuring custom user roles


A tenant admin can configure custom roles if required. To do that, the admin
needs a special set of credentials called *service account*. It can be acquired
by an authorized client employee via [support](https://support.elastic.io), or
the in-built support service in the UI.

When the tenant admin uses the *service account* privileges, he can [create
custom roles](https://api.elastic.io/docs/v2/#update-tenant's-roles) via the
following API request:

PATCH https://api.elastic.io/v2/tenants/{TENANT_ID}/roles , where

{TENANT_ID} parameter stands for the ID of the tenant.

Below are request payload parameters:

| **Parameter**                            | **Required** | **Description**                                                                                                                                                                                                 |
|------------------------------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type                                     | yes          | This parameter should have the value: **tenant-policy**                                                                                                                                                         |
| attributes.roles[]                       | yes          | An array of Tenant’s roles. It can be empty.                                                                                                                                                                    |
| attributes.roles[].role                  | no           | Custom role name                                                                                                                                                                                                |
| attributes.roles[].scope                 | no           | The group of objects, which is affected by this role. Value can be: **contracts** or **workspaces.**                                                                                                            |
| attributes.roles[].permissions[]         | yes          | An array of permissions. It can be empty. To get the list of available permissions execute the endpoint: GET https://api.elastic.io/v2/permissions or see [this reference table](#permissions-reference-table). |
| attributes.roles[].i18n.{{language_key}} | no           | The name of a role in different languages. The value is only required for “**en**” key. For other languages value is optional.                                                                                  |

**EXAMPLE:**

To add a new role called *Godzilla*, with permissions to see and delete
workspaces in the contract, and edit a workspace, we will use the following
request:
```
curl https://api.elastic.io/v2/tenants/{TENANT_ID}/roles
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

| **NOTE:** these endpoints are still in development and are subject to change. |
|-------------------------------------------------------------------------------|


## Permissions reference table


| **Permission**                 | **Description**                                             |
|--------------------------------|-------------------------------------------------------------|
| contracts.membership.edit      | Edit members in the contract                                |
| contracts.workspace.create     | Create workspaces in the contract                           |
| contracts.workspace.listAll    | View all workspaces in the contract                         |
| contracts.workspace.delete     | Delete workspaces in the contract                           |
| contracts.repository.edit      | Edit contract repository                                    |
| contracts.devTeam.edit         | Edit developer team                                         |
| workspaces.workspace.edit      | Edit the workspace                                          |
| workspaces.flow.edit           | Edit flows in the workspace                                 |
| workspaces.flow.toggleStatus   | Toggle flow statuses between **active** and **inactive**    |
| workspaces.flow.toggleRealtime | Toggle flow statuses between **ordinary** and **real-time** |
| workspaces.credential.edit     | Edit credentials                                            |
