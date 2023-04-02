---
title: Managing Contracts
description: This document provides information on Contract management.
layout: article
section: Contract Management
order: 1
category: integrator-management
---

## Maganig Contract via UI

At the moment, it is mostly possible to manage contracts on the platform mostly via API calls. There are three functions available through UI:

*  Change the name of a contract. For updating Contract name you need `contracts.contract.edit` permission.
* Invite users to a contract. You need have `contracts.membership.edit` permission or to be a user with `TenantAdmin` role for that.
* Remove users from a contract. You need have `contracts.membership.edit` permission or to be a user with `TenantAdmin` role for that.

Of course, the functionality of contract management is not limited to this. However, it is only possible using the corresponding API calls. All functionality can be divided into 3 groups: getting Contract data, editing Contract memberships and editing Contracts.

## Getting Contract Data

With the right [permissions](/guides/managing-user-roles-in-a-tenant)
a Contract member can get Contract data via the API. Namely, the following actions are available:

1. [Get Contract by ID]({{site.data.tenant.apiDocsUri}}/v2#/contracts/get_contracts__contract_id_)
2. [Get Contracts]({{site.data.tenant.apiDocsUri}}/v2#/contracts/get_contracts)
3. [Get a list of Contract members]({{site.data.tenant.apiDocsUri}}/v2#/contracts/get_contracts__contract_id__members)
4. [Get a list of pending invites]({{site.data.tenant.apiDocsUri}}/v2#/contracts/get_contracts__contract_id__invites)
5. [Get Contract roles]({{site.data.tenant.apiDocsUri}}/v2#/contracts/get_contracts__contract_id__roles)

## Editing Contract Memberships

A Contract member with the corresponding [permission](/guides/managing-user-roles-in-a-tenant) can:

1. [Invite a user to the Contract]({{site.data.tenant.apiDocsUri}}/v2#/contracts/post_contracts__contract_id__invites)
2. [Add a new member to the Contract]({{site.data.tenant.apiDocsUri}}/v2#/contracts/post_contracts__contract_id__members)
3. [Update membership in the Contract]({{site.data.tenant.apiDocsUri}}/v2#/contracts/patch_contracts__contract_id__members__user_id_)
4. [Remove a user from a Contract]({{site.data.tenant.apiDocsUri}}/v2#/contracts/delete_contracts__contract_id__invites__invite_id_)

>**PLease Note:**
- If a contract only has one member, which is the Owner, it is still possible to remove this member. However, this user also will be removed from the Platform completely if they are not a member of other contracts.
- It is not possible to remove the last Contract Owner, if there are still members in the Contract.

## Editing contracts

A Contract member with the corresponding [permission](/guides/managing-user-roles-in-a-tenant) can edit the Contract in the following ways:

1. [Suspend Contract]({{site.data.tenant.apiDocsUri}}/v2#/contracts/post_contracts__contract_id__suspend), which means stopping of all of its flows and inability of performing any actions with the Contract
2. [Unsuspend Contract]({{site.data.tenant.apiDocsUri}}/v2#/contracts/post_contracts__contract_id__unsuspend)
3. [Update a Contract's name and available roles]({{site.data.tenant.apiDocsUri}}/v2#/contracts/patch_contracts__contract_id_)
