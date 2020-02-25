---
title: Managing Contracts
description: This document provides information on Contract management.
layout: article
section: Contract Management
order: 1
category: integrator-management
---

This document provides information on Contract management, namely the following
actions: [creating Contracts](#creating-contracts), [retrieving Contract data](#getting-contract-data), [editing Contract memberships](#editing-contract-memberships), [editing Contracts](#editing-contracts).

## Creating Contracts

A [Contract](/getting-started/contracts-and-workspaces) is an enclosed environment, which contains Workspaces and DevTeams.
A Tenant member with the corresponding permissions can create Contracts in their Tenant via the following request:

`POST {{site.data.tenant.apiBaseUri}}/v2/contracts`

Below are request parameters:

| **Payload Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `type`                             | yes          | Allowed value: `contract` |
| `attributes.name`                  | yes          | Name of the new Contract                         |
| `attributes.available_roles[]`   | no          | A subset of the Tenant's roles.                                |


**EXAMPLE:**

To create a new contract, we will use the following request:
```
curl {{site.data.tenant.apiBaseUri}}/v2/contracts \
  -X POST \
  -u {EMAIL}:{APIKEY} \
  -H 'Content-Type: application/json' -d '
      {
       "data":{
         "type":"contract",
         "attributes":{
           "name":"My Contract",
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
     }'
```
**NOTE:** Contract name is limited by usable characters and length. It may contain only letters, digits, whitespaces, `-` and `_` symbols, and be from 3 to 40 symbols long.

## Getting Contract Data

With the right [permissions](/guides/managing-user-roles-in-a-tenant)
a Contract member can get Contract data via the API. Namely, the following actions are available:

1\. Get Contract by ID via the following request:

`GET {{site.data.tenant.apiBaseUri}}/v2/contracts/CONTRACT_ID/`

Below are request parameters:

| **URL Parameter**      | **Required** | **Description**                                                                  |
|--------------------|--------------|----------------------------------------------------------------------------------|
| `CONTRACT_ID`                | yes          | Contract ID |
| `include`               | no         | Parameter for getting more detailed information regarding the Contract's entities. Allowed values: `members` and/or `invites`.                                                      |

**EXAMPLE:**

```
curl {{site.data.tenant.apiBaseUri}}/v2/contracts/{CONTRACT_ID}?include=members,invites \
   -u {EMAIL}:{APIKEY}
```

2\. Get Contracts via the following request:

`GET {{site.data.tenant.apiBaseUri}}/v2/contracts/`

**EXAMPLE:**

```
curl {{site.data.tenant.apiBaseUri}}/v2/contracts/
  -u {EMAIL}:{APIKEY}
```

2\. Get a list of Contract members via the following request:

`GET {{site.data.tenant.apiBaseUri}}/v2/contracts/CONTRACT_ID/members/`

Below are request parameters:

| **URL Parameter**      | **Required** | **Description**                                                                  |
|--------------------|--------------|----------------------------------------------------------------------------------|
| `CONTRACT_ID`                | yes          | Contract ID |

**EXAMPLE:**

```
curl {{site.data.tenant.apiBaseUri}}/v2/contracts/{CONTRACT_ID}/members/ \
  -u {EMAIL}:{APIKEY}
```

3\. Get a list of pending invites via the following request:

`GET {{site.data.tenant.apiBaseUri}}/v2/contracts/CONTRACT_ID/invites/`

Below are request parameters:

| **URL Parameter**      | **Required** | **Description**                                                                  |
|--------------------|--------------|----------------------------------------------------------------------------------|
| `CONTRACT_ID`                | yes          | Contract ID |

**EXAMPLE:**
```
curl {{site.data.tenant.apiBaseUri}}/v2/contracts/{CONTRACT_ID}/invites/ \
   -u {EMAIL}:{APIKEY}
```

4\. Get Contract roles via the following request:

`GET {{site.data.tenant.apiBaseUri}}/v2/contracts/CONTRACT_ID/roles/`

Below are request parameters:

| **URL Parameter**      | **Required** | **Description**                                                                  |
|--------------------|--------------|----------------------------------------------------------------------------------|
| `CONTRACT_ID`                | yes          | Contract ID |

**EXAMPLE:**
```
curl {{site.data.tenant.apiBaseUri}}/v2/contracts/{CONTRACT_ID}/roles/ \
  -u {EMAIL}:{APIKEY}
```



## Editing Contract Memberships

A Contract member with the corresponding permissions can:

1\. Invite a user to the Contract via the following request:

`POST {{site.data.tenant.apiBaseUri}}/v2/contracts/{CONTRACT_ID}/invites/`

Below are request parameters:

| **URL Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `CONTRACT_ID`                | yes          | Contract ID |

| **Payload Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `type`                             | yes          | Allowed value: `contract-invite` |
| `attributes.email`                  | yes          | Email                         |
| `attributes.roles[]`   | yes          | Roles. To get all available roles, please execute the “Get the Contract’s roles” endpoint.                                 |
| `attributes.workspace_id`   | no          | Corresponding Workspace ID for cases when you want to invite a user into a Contract and a Workspace.                                 |
| `attributes.workspace_roles`   | no (yes, if Workspace ID was specified)         | To get all available roles, please execute the “Get the Contract’s roles” endpoint.                                 |

**EXAMPLE:**
```
curl {{site.data.tenant.apiBaseUri}}/v2/contracts/{CONTRACT_ID}/invites/ \
    -X POST \
    -u {EMAIL}:{APIKEY} \
    -H 'Content-Type: application/json' -d '
   {
       "data": {
           "type": "contract-invite",
           "attributes": {
               "email": "admin@email.com",
               "roles": [
                 "owner"
               ],
               "workspace_id":"{WORKSPACE_ID}",
               "workspace_roles":[
                 "integrator"
               ]
           }
       }
    }'
```

2\. Add a new member to the Contract via the following request:

`POST {{site.data.tenant.apiBaseUri}}/v2/contracts/{CONTRACT_ID}/members`

Below are request parameters:

| **Payload Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `ID`                | yes          | ID of a registered Tenant user. |
| `type`                             | yes          | Allowed value: `contract-member` |
| `attributes.roles[]`                  | yes          | Roles. To get all available roles, please execute the “Get the Contract’s roles” endpoint.                     |

3\. Update membership in the contract via the following request:

`PATCH {{site.data.tenant.apiBaseUri}}/v2/contracts/{CONTRACT_ID}/members/{USER_ID}/`

Below are request parameters:

| **URL Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `CONTRACT_ID`                | yes          | Contract ID |
| `USER_ID`                             | yes          | Target user ID |

| **Payload Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `type`                  | yes          | Allowed value: `contract-member`             |
| `id`   | yes          |  	ID of a registered user. Must match the `USER_ID` URL parameter.            |
| `attributes.roles[]`   | yes          | To get all available roles, please execute the “Get the Contract’s roles” endpoint.
                 |

**EXAMPLE:**
```
curl {{site.data.tenant.apiBaseUri}}/v2/contracts/{CONTRACT_ID}/members/{USER_ID}/ \
    -X PATCH  \
    -u {EMAIL}:{APIKEY} \
    -H 'Content-Type: application/json' -d '
    {
       "data": {
           "type": "contract-member",
           "id": "{USER_ID}",
           "attributes": {
               "roles": [
                 "{NEW_ROLE}"
               ]
           }
       }
    }'
```

4\. Remove a user from a contract via the following request:

`DELETE {{site.data.tenant.apiBaseUri}}/v2/contracts/{CONTRACT_ID}/members/{USER_ID}/`

Below are request parameters:

| **URL Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `CONTRACT_ID`                | yes          | Contract ID |
| `USER_ID`                             | yes          | Target user ID |

**EXAMPLE:**
```
curl {{site.data.tenant.apiBaseUri}}/v2/contracts/{CONTRACT_ID}/members/{USER_ID}/ \
   -X DELETE    \
   -u {EMAIL}:{APIKEY}
```

**IMPORTANT:**

- If a contract only has one member, which is the Owner, it is still possible to remove this member. However, this user also will be removed from the Platform completely if they are not a member of other contracts.

- It is not possible to remove the last Contract Owner, if there are still members in the Contract.

## Editing contracts

A Contract member with the corresponding permissions can edit the Contract in the following ways:

1\. Suspend Contract, which means stopping of all of its flows and inability of performing any actions with the Contract, via the following request:

`POST {{site.data.tenant.apiBaseUri}}/v2/contracts/CONTRACT_ID/suspend/`

Below are request parameters:

| **URL Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `CONTRACT_ID`                | yes          | Contract ID |

**EXAMPLE:**
```
curl {{site.data.tenant.apiBaseUri}}/v2/contracts/{CONTRACT_ID}/suspend \
-X POST \
  -u {EMAIL}:{APIKEY}
```

2\. Unsuspend Contract via the following request:

`POST {{site.data.tenant.apiBaseUri}}/v2/contracts/CONTRACT_ID/unsuspend/`

Below are request parameters:

| **URL Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `CONTRACT_ID`                | yes          | Contract ID |

**EXAMPLE:**
```
curl {{site.data.tenant.apiBaseUri}}/v2/contracts/{CONTRACT_ID}/unsuspend \
-X POST \
  -u {EMAIL}:{APIKEY}
```

3\. Delete the Contract via the following request:

`DELETE {{site.data.tenant.apiBaseUri}}/v2/contracts/{CONTRACT_ID} \`

Below are request parameters:

| **URL Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `CONTRACT_ID`                | yes          | Contract ID |

**EXAMPLE:**
```
curl -i {{site.data.tenant.apiBaseUri}}/v2/contracts/{CONTRACT_ID} \
  -X DELETE \
  -u {EMAIL}:{APIKEY}
```

**IMPORTANT:**
The actual data deletion will be performed after an API response, as it requires time for termination of all the Contract’s flows containers. A Contract cannot be deleted if any of its Components are being used in a flow in another Contract.

4\. Update a Contract's name and available roles via the following request:

`PATCH {{site.data.tenant.apiBaseUri}}/v2/contracts/{CONTRACT_ID}`

Below are request parameters:

| **Payload Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `type`                | yes          | Allowed value: `contract`|
| `attributes.name`                | yes          | Contract name |
| `attributes.available_roles[]`                | no          | Roles available in the Tenant the Contract belongs to. |

**EXAMPLE:**
```
curl {{site.data.tenant.apiBaseUri}}/v2/contracts/{CONTRACT_ID} \
  -X PATCH \
  -u {EMAIL}:{APIKEY} \
  -H 'Content-Type: application/json' -d '
      {
       "data":{
         "type":"contract",
         "id":"{CONTRACT_ID}"
         "attributes":{
            "name":"New Contract Name",
            "available_roles":[
             {
               "scope":"contracts",
               "role":"admin"
             },
             {
               "scope":"workspaces",
               "role":"admin"
             },
             {
               "scope":"workspaces",
               "role":"guest"
             }
           ]
         }
       }
     }'
```

## Related links

- [Contracts and Workspaces](/getting-started/contracts-and-workspaces)
- [Managing user roles in a tenant](/guides/managing-user-roles-in-a-tenant)
