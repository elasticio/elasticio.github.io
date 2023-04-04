---
title: Contracts and Workspaces
layout: article
section: Introduction
description: Explanation of the hierarchy of contracts and workspaces.
order: 2
since: 20190401
category: intro
---

This document provides information on [contracts](#contracts), [contract management](#contract-management), [workspaces](#workspaces) and [workspace management](#workspace-management). Additionally, it explains the basic application of this
approach in [solution life cycle](#workspaces-and-life-cycles), and what [limited workspaces](#limited-workspaces) are. The following
scheme shows how contracts and workspaces stand in solution hierarchy.

![Solution hierarchy scheme](/assets/img/getting-started/contracts-and-workspaces/Screenshot_1.png)

## Contracts

A client’s enclosed environment within a
tenant is called a
contract. It is usually backed by a formal contract, hence the name. Each
client can have multiple contracts. A contract includes members, developer
teams, and workspaces:

-   A **workspace** is a smaller enclosed environment that contains integration
    flows and credentials. Details on workspaces can be found [here](#workspaces).

-   A **member** is a registered platform user that has been invited the
    contract by Owner and given a contract
    [role](/guides/managing-user-roles-in-a-tenant). Members can collaborate or work individually.

-   A **developer team** is a smaller enclosed environment that contains
    component developers and their repositories.

Contracts are virtually separated from each other and require corresponding
memberships to enter and work in. With the invitation a user gets a user role.

## Contract Management

A tenant Admin can create contracts and set contract
Owners. By default, only members with contract Owner or a other
[roles](/guides/managing-user-roles-in-a-tenant) with the right permissions can
manage contracts. However, roles can be customized, so in this document we will
differentiate contract and workspace members by
[permissions](/guides/managing-user-roles-in-a-tenant).

Here is the full list of contract permissions:

1.  [Edit members in the contract]({{site.data.tenant.apiDocsUri}}/v2#/contracts/patch_contracts__contract_id__members__user_id_)

2.  [Create workspaces in the contract]({{site.data.tenant.apiDocsUri}}/v2#/workspaces/post_workspaces)

3.  [View all workspaces in the contract]({{site.data.tenant.apiDocsUri}}/v2#/workspaces/get_workspaces)

4.  [Delete workspaces in the contract]({{site.data.tenant.apiDocsUri}}/v2#/workspaces/delete_workspaces__workspace_id_)

5.  [Edit contract repositories]({{site.data.tenant.apiDocsUri}}/v2#/contracts/patch_contracts__contract_id_)

6.  [Edit developer team]({{site.data.tenant.apiDocsUri}}/v2#/teams/patch_teams__team_id_)

## Workspaces

A client’s enclosed environment within a contract is called a workspace. Each
contract can have multiple workspaces, and each workspace is virtually separated
from other workspaces within a contract. A workspace includes members, [credentials](credential) and
[integration flows](integration-flow):

-   A **member** is a user with certain access rights in the workspace. These
    rights are defined by user roles set by workspace Owner upon
    invitation of a contract member to a workspace.

-   An **integration flow** is a set of integration components and
    credentials used
    to synchronize data between multiple applications or services. More details
    on integration flows can be found
    [here](integration-flow).

Contract members can be invited to a workspace within their contract by other
members with the corresponding permissions. Members can contribute to
integration flows in their workspace in collaboration with other members, or
individually.

There are two types of workspaces: **limited** and **full**. Use full workspaces
for the production purposes and limited workspaces for the development purposes.

> The **full** workspaces have no time restrictions on integration flows. Flows
> in **limited** workspaces may only run for a limited amount of time before being
> automatically stopped. Check the separate section for restrictions on [limited workspaces](#limited-workspaces).

## Workspace Management

Any contract member can create workspaces. Only workspace Owner or member with
corresponding permissions can manage workspaces. Here is the full list of
workspace permissions:

1.  Edit the workspace (including memberships)

2.  Edit flows in the workspace

3.  Toggle flow status between active and inactive

4.  Toggle flow status between ordinary and real-time

5.  Edit credentials

You can learn more about workspace management [here](/guides/managing-workspaces).

## Workspaces and Life Cycles

Workspaces in a contract are separated from each other, but they can utilize the
same components for their integration flows. This means that one can create
similar integration flows in different workspaces within a contract. For
non-disruptive testing one can create dedicated workspaces for testing and
production stages, both running near-identical integration flows. The workspaces
will have different credentials, so the testing stage may be accessed by the
client’s engineers, and production environment is customer-facing only.

## Limited Workspaces

Limited workspaces have certain restrictions for integration flows:

*   Integration flows in the limited workspaces are restricted by work time. The **platform automatically stops all active flows after 8 hours** in limited workspaces.
*   If your integration flow contains messages in the processing queues, these messages will be removed when the time is up to stop the flow.
*   You can restart the flows afterwards to continue your testing.

> We recommend not to use **limited workspaces** for the production purposes. Use **full workspaces** instead.

The limited workspaces are marked in the platform UI:

{% include img.html max-width="100%" url="/assets/img/getting-started/contracts-and-workspaces/limited-workspace.png" title="Workspace - Limited" %}

To change workspace type from **limited** to **full**, contact our support team or
your tenant administration.

## Related links

- [Managing user roles in a tenant](/guides/managing-user-roles-in-a-tenant)
- [Credentials](credential)
- [Integration flows](integration-flow)
- [Workspace management](/guides/managing-workspaces)
