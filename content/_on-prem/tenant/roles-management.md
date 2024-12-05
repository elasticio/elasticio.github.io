---
title: Roles Management
description: This article describes how to manage the user roles in tenant.
layout: article
category: tenant
---

{: .no_toc}

{{page.description}}

- TOC
{: toc}

You can view the user roles in the tenant using the TenantAdmin account. However,
to edit the user roles you must use dedicated **service account**.
{: .note.info}

## Roles and permissions

A role in the platform is an attribute that is defined with a set of permissions
enabling it to perform operations on the platform. There are different types of
roles in the platform:

*   **Service accounts** - These are specific roles with set permissions to perform specific operations with system infrastructure and services. Details of these roles and permissions [presented elsewhere](https://api.elastic.io/docs/v2#/permissions/get_permissions). This article would not extend on these accounts and permissions.
*   **TenantAdmin** - This role has defined permissions to operate the tenant specific entities.
*   **User roles** - These are attributes that have set of [defined permissions](#available-user-roles) for the users to perform operations on the platform.


## Available user roles

The platform has default set of user roles which have already [defined permissions](#available-permissions)
to perform operations in contracts and workspaces. The details of abilities for user
roles in context of contract and workspace units are [presented elsewhere](https://docs.elastic.io/guides/managing-user-roles-in-a-tenant). Here we will list the roles in conjunction with their permissions.

**Contract roles are** (click to expand to see the permissions):

<details close markdown="block"><summary>contract.owner</summary>
{: .mx-4 .fw-700}
`contracts.contract.edit`
{: .mx-6 .mt-0 .mb-0}
`contracts.membership.edit`
{: .mx-6 .mt-0 .mb-0}
`contracts.workspace_limits.edit`
{: .mx-6 .mt-0 .mb-0}
`contracts.workspace.create`
{: .mx-6 .mt-0 .mb-0}
`contracts.workspace.listAll`
{: .mx-6 .mt-0 .mb-0}
`contracts.workspace.delete`
{: .mx-6 .mt-0 .mb-0}
`global.stats.workspaces`
{: .mx-6 .mt-0 .mb-0}
`global.auth_clients.create`
{: .mx-6 .mt-0 .mb-0}
`global.auth_clients.get`
{: .mx-6 .mt-0 .mb-0}
`global.auth_clients.edit`
{: .mx-6 .mt-0 .mb-0}
`global.auth_clients.delete`
{: .mx-6 .mt-0 .mb-2}
</details>
<details close markdown="block"><summary>contract.admin</summary>
{: .mx-4 .fw-700}
`contracts.workspace.create`
{: .mx-6 .mt-0 .mb-0}
`contracts.workspace.listAll`
{: .mx-6 .mt-0 .mb-0}
`contracts.workspace.delete`
{: .mx-6 .mt-0 .mb-0}
`contracts.repository.edit`
{: .mx-6 .mt-0 .mb-0}
`contracts.devTeam.edit`
{: .mx-6 .mt-0 .mb-0}
`global.auth_clients.create`
{: .mx-6 .mt-0 .mb-0}
`global.auth_clients.get`
{: .mx-6 .mt-0 .mb-0}
`global.auth_clients.edit`
{: .mx-6 .mt-0 .mb-0}
`global.auth_clients.delete`
{: .mx-6 .mt-0 .mb-2}
</details>
<details close markdown="block"><summary>contract.member</summary>
{: .mx-4 .fw-700}
`contracts.workspace.create`
{: .mx-6 .mt-0 .mb-2}
</details>

**Workspace roles are** (click to expand to see the permissions):

<details close markdown="block"><summary>workspace.owner</summary>
{: .mx-4 .fw-700}
`global.auth_clients.get`
{: .mx-6 .mt-0 .mb-0}
`global.auth_clients.edit`
{: .mx-6 .mt-0 .mb-0}
`global.auth_clients.create`
{: .mx-6 .mt-0 .mb-0}
`global.auth_clients.delete`
{: .mx-6 .mt-0 .mb-0}
`workspaces.workspace.edit`
{: .mx-6 .mt-0 .mb-0}
`workspaces.workspace.edit_membership_support`
{: .mx-6 .mt-0 .mb-0}
`workspaces.auth_secret.get`
{: .mx-6 .mt-0 .mb-0}
`workspaces.auth_secret.get_credentials`
{: .mx-6 .mt-0 .mb-0}
`workspaces.auth_secret.edit`
{: .mx-6 .mt-0 .mb-0}
`workspaces.auth_secret.create`
{: .mx-6 .mt-0 .mb-0}
`workspaces.auth_secret.delete`
{: .mx-6 .mt-0 .mb-0}
`workspaces.auth_secret.refresh`
{: .mx-6 .mt-0 .mb-0}
`workspaces.flow.edit`
{: .mx-6 .mt-0 .mb-0}
`workspaces.flow.toggleStatus`
{: .mx-6 .mt-0 .mb-0}
`workspaces.flow.toggleRealtime`
{: .mx-6 .mt-0 .mb-0}
`workspaces.logs.read_all`
{: .mx-6 .mt-0 .mb-0}
`workspaces.credential.edit`
{: .mx-6 .mt-0 .mb-0}
`workspaces.vpn_agent.create`
{: .mx-6 .mt-0 .mb-0}
`workspaces.vpn_agent.get`
{: .mx-6 .mt-0 .mb-0}
`workspaces.vpn_agent.edit`
{: .mx-6 .mt-0 .mb-0}
`workspaces.vpn_agent.delete`
{: .mx-6 .mt-0 .mb-0}
`workspaces.vpn_agent.get_config`
{: .mx-6 .mt-0 .mb-0}
`workspaces.topic.create`
{: .mx-6 .mt-0 .mb-0}
`workspaces.topic.get`
{: .mx-6 .mt-0 .mb-0}
`workspaces.topic.edit`
{: .mx-6 .mt-0 .mb-0}
`workspaces.topic.delete`
{: .mx-6 .mt-0 .mb-2}
</details>
<details close markdown="block"><summary>workspace.admin</summary>
{: .mx-4 .fw-700}
`global.auth_clients.get`
{: .mx-6 .mt-0 .mb-0}
`global.auth_clients.edit`
{: .mx-6 .mt-0 .mb-0}
`global.auth_clients.create`
{: .mx-6 .mt-0 .mb-0}
`global.auth_clients.delete`
{: .mx-6 .mt-0 .mb-0}
`workspaces.workspace.edit`
{: .mx-6 .mt-0 .mb-0}
`workspaces.workspace.edit_membership_support`
{: .mx-6 .mt-0 .mb-0}
`workspaces.auth_secret.get`
{: .mx-6 .mt-0 .mb-0}
`workspaces.auth_secret.get_credentials`
{: .mx-6 .mt-0 .mb-0}
`workspaces.auth_secret.edit`
{: .mx-6 .mt-0 .mb-0}
`workspaces.auth_secret.create`
{: .mx-6 .mt-0 .mb-0}
`workspaces.auth_secret.delete`
{: .mx-6 .mt-0 .mb-0}
`workspaces.auth_secret.refresh`
{: .mx-6 .mt-0 .mb-0}
`workspaces.flow.edit`
{: .mx-6 .mt-0 .mb-0}
`workspaces.flow.toggleStatus`
{: .mx-6 .mt-0 .mb-0}
`workspaces.flow.toggleRealtime`
{: .mx-6 .mt-0 .mb-0}
`workspaces.flow.exportToRecipe`
{: .mx-6 .mt-0 .mb-0}
`workspaces.logs.read_all`
{: .mx-6 .mt-0 .mb-0}
`workspaces.recipe.edit`
{: .mx-6 .mt-0 .mb-0}
`workspaces.credential.edit`
{: .mx-6 .mt-0 .mb-0}
`workspaces.vpn_agent.create`
{: .mx-6 .mt-0 .mb-0}
`workspaces.vpn_agent.get`
{: .mx-6 .mt-0 .mb-0}
`workspaces.vpn_agent.edit`
{: .mx-6 .mt-0 .mb-0}
`workspaces.vpn_agent.delete`
{: .mx-6 .mt-0 .mb-0}
`workspaces.vpn_agent.get_config`
{: .mx-6 .mt-0 .mb-0}
`workspaces.topic.create`
{: .mx-6 .mt-0 .mb-0}
`workspaces.topic.get`
{: .mx-6 .mt-0 .mb-0}
`workspaces.topic.edit`
{: .mx-6 .mt-0 .mb-0}
`workspaces.topic.delete`
{: .mx-6 .mt-0 .mb-2}
</details>
<details close markdown="block"><summary>workspace.integrator</summary>
{: .mx-4 .fw-700}
`workspaces.recipe.edit`
{: .mx-6 .mt-0 .mb-0}
`workspaces.flow.edit`
{: .mx-6 .mt-0 .mb-0}
`workspaces.flow.toggleStatus`
{: .mx-6 .mt-0 .mb-0}
`workspaces.flow.toggleRealtime`
{: .mx-6 .mt-0 .mb-0}
`workspaces.flow.exportToRecipe`
{: .mx-6 .mt-0 .mb-0}
`workspaces.credential.edit`
{: .mx-6 .mt-0 .mb-0}
`workspaces.vpn_agent.create`
{: .mx-6 .mt-0 .mb-0}
`workspaces.vpn_agent.get`
{: .mx-6 .mt-0 .mb-0}
`workspaces.vpn_agent.edit`
{: .mx-6 .mt-0 .mb-0}
`workspaces.vpn_agent.delete`
{: .mx-6 .mt-0 .mb-0}
`workspaces.vpn_agent.get_config`
{: .mx-6 .mt-0 .mb-0}
`workspaces.logs.read_all`
{: .mx-6 .mt-0 .mb-0}
`global.auth_clients.create`
{: .mx-6 .mt-0 .mb-0}
`global.auth_clients.get`
{: .mx-6 .mt-0 .mb-0}
`global.auth_clients.edit`
{: .mx-6 .mt-0 .mb-0}
`global.auth_clients.delete`
{: .mx-6 .mt-0 .mb-0}
`workspaces.auth_secret.get`
{: .mx-6 .mt-0 .mb-0}
`workspaces.auth_secret.get_credentials`
{: .mx-6 .mt-0 .mb-0}
`workspaces.auth_secret.edit`
{: .mx-6 .mt-0 .mb-0}
`workspaces.auth_secret.create`
{: .mx-6 .mt-0 .mb-0}
`workspaces.auth_secret.delete`
{: .mx-6 .mt-0 .mb-0}
`workspaces.auth_secret.refresh`
{: .mx-6 .mt-0 .mb-0}
`workspaces.topic.create`
{: .mx-6 .mt-0 .mb-0}
`workspaces.topic.get`
{: .mx-6 .mt-0 .mb-0}
`workspaces.topic.edit`
{: .mx-6 .mt-0 .mb-0}
`workspaces.topic.delete`
{: .mx-6 .mt-0 .mb-2}
</details>
<details close markdown="block"><summary>workspace.guest</summary>
{: .mx-4 .fw-700}
`global.auth_clients.get`
{: .mx-6 .mt-0 .mb-0}
`workspaces.auth_secret.get`
{: .mx-6 .mt-0 .mb-0}
`workspaces.logs.read_all`
{: .mx-6 .mt-0 .mb-0}
`workspaces.vpn_agent.get`
{: .mx-6 .mt-0 .mb-0}
`workspaces.topic.get`
{: .mx-6 .mt-0 .mb-2}
</details>

The `contract.owner` and `workspace.owner` roles are part of the platform core
functionality. **Your attempts to edit or delete these roles will fail.** You can edit
or delete all the other roles, even create your own versions (using the service account).
{: .note.warning}

## Custom user roles

You can create, edit and delete custom user role within the context of contract
or workspace using a special **Service account** role. There are a few restrictions
for custom role creation and role deletion:

*   You cannot create more than one role with identical names in one scope,
*   You cannot delete a role that is assigned to a member,
*   You cannot delete `contract.owner` and `workspace.owner` roles,
*   You cannot delete a role that is used during the [contract creation](/on-prem/tenant/contract-management#create-contracts).

To create, edit or delete a user role follow these instructions:

1.  Use HTTP `GET` call to the platform API `/v2/tenants/{TENANT_ID}/roles` endpoint using the TenantAdmin credentials to get the current list of roles and permissions. More about this API call [here](https://api.elastic.io/docs/v2#/tenants/get_tenants__tenant_id__roles).
2.  Examine the returned JSON structure and make your modifications following the [established structure](#request-structure-parameters) and the [example case](#example-role-structure).
3.  Use the HTTP `PATCH` call to the platform API `/v2/tenants/{TENANT_ID}/roles` endpoint using the **service account** credentials to add, modify or delete a role. The `TENANT_ID` in the call is the ID of tenant where the modification must be done. More about this API call [here](https://api.elastic.io/docs/v2#/tenants/patch_tenants__tenant_id__roles). Don't submit the tenant `id`, `relationships` and `meta` parts you got in the step 1 back in the body of the call.

Before you go and try to modify the tenant roles table you must remember to
**submit all existing roles along with the new modifications in one API call**.
Failure to do so can cause disruptions for all user operations in your tenant.
{: .note.errors}

### Request structure parameters

Below are request parameters:

| **Payload Parameter**       | **Required** |  **Description**                 |
|-----------------------------|--------------|----------------------------------|
| `type`                      | yes          | This parameter should have the value: `tenant-policy`  |
| `attributes.roles[]`        | yes          | An array of Tenant’s roles. It can be  empty.          |
| `attributes.roles[].role`   | no           | Custom role name                                       |
| `attributes.roles[].scope`  | no           | The group of objects, which is affected by this role. Value can be: `contracts` or `workspaces` |
| `attributes.roles[].permissions[]` | yes   | An array of [permissions](#available-permissions). |
| `attributes.roles[].i18n.{language_key}` | no | The name of a role in different languages. The value is only required for `en` key. For other languages value is optional. |

### Example role structure

As an example we would like to create an **Operator** role in workspaces with
the follwing abilities:

*   To be able to start/stop flows (`workspaces.flow.toggleStatus`),
*   To be able to edit or create credentials for integration steps (`workspaces.credential.edit`),
*   To be able to change the flow from ordinary to real-time and back (`workspaces.flow.toggleRealtime`),
*   To be able to access `auth_secrets` in the workspace (`workspaces.auth_secret.get`),
*   To be able to access globally defined `auth_clients` (`global.auth_clients.get`),
*   To be able to read credentials associated with `auth_secrets` (`workspaces.auth_secret.get_credentials`),
*   To be able to manually trigger `auth_secret` refresh procedure (`workspaces.auth_secret.refresh`),
*   To be able to access all logs of the workspace (`workspaces.logs.read_all`).

 Here is the part of json to include in your API call to grant the permissions:

 ```json
 {
   "data" : {
     "type" : "tenant-policy",
     "attributes" : {
       "roles" : [
         {
           "i18n" : {
             "en" : "Operator"
           },
           "role" : "operator",
           "permissions" : [
             "workspaces.flow.toggleStatus",
             "workspaces.credential.edit",
             "workspaces.flow.toggleRealtime",
             "workspaces.auth_secret.get",
             "global.auth_clients.get",
             "workspaces.auth_secret.get_credentials",
             "workspaces.auth_secret.refresh",
             "workspaces.logs.read_all"
           ],
           "scope" : "workspaces"
         },
         { "role 2" },
         { "role 3" },
         { "etc roles "}
       ]
     }
   }
 }
 ```

## Available Permissions

This section presents permissions available to the platform users. These permissions
are set for 3 different levels like `global`, `contracts` and `workspaces`.

*   `global` - these permissions have tenant-wide reach
*   `contracts` - these permissions are set for contract wide operations
*   `workspaces` - these permissions are set for workspace operations

|  Permission                                    | Description                                                         |
| ---------------------------------------------- |---------------------------------------------------------------------|
| `global.stats.workspaces`                      | Get statistics on workspaces                                        |
| `global.auth_clients.get`                      | Read `auth_client`                                                  |
| `global.auth_clients.edit`                     | Edit `auth_client`                                                  |
| `global.auth_clients.create`                   | Create `auth_client`                                                |
| `global.auth_clients.delete`                   | Delete `auth_client`                                                |
| `contracts.contract.edit`                      | Edit contract                                                       |
| `contracts.membership.edit`                    | Edit members in the contract                                        |
| `contracts.workspace_limits.edit`              | Edit workspace limits                                               |
| `contracts.workspace.create`                   | Create workspace in the contract                                    |
| `contracts.workspace.listAll`                  | List all workspaces in the contract                                 |
| `contracts.workspace.delete`                   | Delete workspace in the contract                                    |
| `contracts.repository.edit`                    | Edit repositories in contract                                       |
| `contracts.devTeam.edit`                       | Edit developer team                                                 |
| `workspaces.workspace.edit`                    | Edit the workspace (includes workspace name & workspace membership) |
| `workspaces.workspace.edit_membership_support` | Edit membership of Support User                                     |
| `workspaces.auth_secret.get`                   | Read `auth_secret`                                                  |
| `workspaces.auth_secret.get_credentials`       | Read credentials connected to `auth_secret`                         |
| `workspaces.auth_secret.edit`                  | Edit `auth_secret`                                                  |
| `workspaces.auth_secret.create`                | Create `auth_secret`                                                |
| `workspaces.auth_secret.delete`                | Delete `auth_secret`                                                |
| `workspaces.auth_secret.refresh`               | Refresh `auth_secret`                                               |
| `workspaces.flow.edit`                         | Edit flows in workspace                                             |
| `workspaces.flow.toggleStatus`                 | Change flows status between **active** to **inactive**              |
| `workspaces.flow.toggleRealtime`               | Change flow status between **ordinary** and **real-time**           |
| `workspaces.flow.exportToRecipe`               | Export flow to recipe                                               |
| `workspaces.logs.read_all`                     | Read all logs in workspace                                          |
| `workspaces.recipe.edit`                       | Edit a recipe                                                       |
| `workspaces.credential.edit`                   | Edit or create credentials                                          |
| `workspaces.vpn_agent.create`                  | Create a VPN agent                                                  |
| `workspaces.vpn_agent.get`                     | List the VPN agents                                                 |
| `workspaces.vpn_agent.edit`                    | Edit the VPN agents                                                 |
| `workspaces.vpn_agent.delete`                  | Delete the VPN agents                                               |
| `workspaces.vpn_agent.get_config`              | Read VPN agent configuration                                        |
| `workspaces.topic.create`                      | Create a topic                                                      |
| `workspaces.topic.get`                         | List the topics                                                     |
| `workspaces.topic.edit`                        | Edit topics                                                         |
| `workspaces.topic.delete`                      | Delete the topics                                                   |

These are not all permissions available in the system. There are additional
[group of permissions](https://api.elastic.io/docs/v2#/permissions/get_permissions)
not available for users for performing specific operations with the system infrastructure and services.
{: .note.info}
