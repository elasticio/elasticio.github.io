---
title: Contract Management
description: This article describes how to manage the contracts from the tenant administration point of view.
layout: article
category: tenant
---

{: .no_toc}

{{page.description}}

A [Contract](/getting-started/contracts-and-workspaces) is
an enclosed environment, which contains Workspaces and DevTeams. If you have
TenantAdmin role in your contract you can create, edit and delete contracts.

- TOC
{: toc}

## Create Contracts

As of this moment you can create a new contract using an HTTP `POST` call to the
platform API `/v2/contracts` endpoint using the TenantAdmin credentials (email and the API-Key).

```json
{
  "data":{
    "type":"contract",
    "attributes": {
      "name":"My Contract",
      "support_user_id":"{{user_id}}",
      "available_roles":[
        {
          "scope":"contracts",
          "role":"admin"
        },
        {
          "scope":"workspaces",
          "role":"admin"
        }
      ]
    }
  }
}
```
Here is an explanation of the parameters and which values they could have:

*   `type` (required) - should always have `contract` value for this call.
*   `attributes.name` (required) - Contract name is limited by usable characters and length. It may contain only letters, digits, white-spaces, `-` and `_` symbols, and be from 3 to 40 symbols long.
*   `attributes.support_user_id` (optional) - use this parameter to define a dedicated support user for this contract. The parameter accepts only the user ID. Get this ID in advance to include here.
*   `attributes.available_roles[]` (optional) - you can omit this parameter and all system roles will be available for this contract and the workspaces in it. It is also possible to set different sets to roles for the whole contract and the workspaces.

## Suspend/unsuspend Contracts

You can suspend all activities in the contract using an HTTP `POST` call to the
platform API `/v2/contracts/{CONTRACT_ID}/suspend/` endpoint using the TenantAdmin
credentials (email and the API-Key) replacing the `CONTRACT_ID` with a real ID.

When the contract is suspended the following happens:

*   All integration flows are stopped. You can not start any flow.
*   You can examine the flows and delete them.
*   You can navigate through the different sections of the contract.
*   You can not invite new members to this contract.
*   You can not remove any member from this contract.
*   Message appears in the right top corner indicating the contract suspension.


You can unsuspend already suspended contract using an HTTP `POST` call to the
platform API `/v2/contracts/{CONTRACT_ID}/unsuspend/` endpoint using the TenantAdmin
credentials (email and the API-Key) replacing the `CONTRACT_ID` with a real ID.

After unsuspending the contract you can resume all operations as before. However,
as of this moment, **previously active flows would need to be started by hand**.
{: .note.warning}

## Delete Contracts

To delete an existing contract use an HTTP `DELETE` call to the
platform API `/v2/contracts/{CONTRACT_ID}` endpoint using the TenantAdmin
credentials (email and the API-Key) replacing the `CONTRACT_ID` with a real ID.

You can not delete the contract if it contains an integration component used in
the flows of other contracts. This can only happen when the component has `tenant`
or `global` access level.
{: .note.warning}

When you delete the contract you will delete all the following related resources:

*   **Credentials** used in the integration flows steps.
*   **Agents** - VPN or otherwise.
*   **Integration flows** and the following related entities:
    *   Previous versions of the flow.
    *   `DataSamples` used in every integration flow step.
    *   `DynamicMetadata` used in flow steps.
    *   `DynamicSelectModel` used in the flow steps.
    *   Execution statistics of all flows.
    *   Execution Result of all flows in your contract.
    *   Request Bins created for flows starting with WebHooks.
    *   Error Data and statistics.
*   **Workspaces** in the contract.
*   **Developer Teams** and the following related entities:
    *   Integration Components
    *   Integration Component previous versions
    *   Component unique Environment variables.
*   **Topics**
*   **Recipes**
*   **User accounts** when user were member of only this contract in the tenant along with their SSH Keys.
*   **Invite Tokens** generated to invite new members to the contract.

The deletion process is asynchronous. The actual data deletion will be performed
after an API response, as it requires time for termination of all the Contract’s
flows containers.
{: .note.info}
