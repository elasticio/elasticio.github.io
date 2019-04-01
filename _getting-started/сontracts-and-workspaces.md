---
title: Contracts and Workspaces
layout: article
section: Basic Concepts
order: 1
since: 20190401
---

This document provides information on [contracts](#contracts), [contract
management](#contract-management), [workspaces](#workspaces) and [workspace
management](#section). Additionally, it explains the basic application of this
approach in [solution life cycle](#workspaces-and-life-cycles). The following
scheme shows here contracts and workspaces stand in solution hierarchy.  



![](https://user-images.githubusercontent.com/48761764/55168339-51665900-517b-11e9-990d-0d707fe2ad62.png)

## Contracts


A client’s enclosed environment within a
[tenant](tenant) is called a
contract. It is usually backed by a formal contract, hence the name. Each
client can have multiple contracts. A contract includes members, developer
teams, and workspaces:

-   A **workspace** is a smaller enclosed environment that contains integration
    flows and credentials. Details on workspaces can be found [here](#workspaces).

-   A **member** is a registered platform user that has been invited the
    contract by Owner and given a contract
    [role](managing-user-roles-in-a-tenant). Members can collaborate or work individually.

-   A **developer team** is a smaller enclosed environment that contains
    component developers and their repositories.

Contracts are virtually separated from each other and require corresponding
memberships to enter and work in. With the invitation a user gets a user role.

## Contract Management


A tenant Admin can [create
contracts](apiBaseUri/docs/v2/#create-a-contract) and set contract
Owners. By default, only members with contract Owner or a other
[roles](managing-user-roles-in-a-tenant) with the right permissions can
manage contracts. However, roles can be customized, so in this document we will
differentiate contract and workspace members by
[permissions](managing-user-roles-in-a-tenant.html#permissions-reference-table).

Here is the full list of contract permissions:

1.  Edit members in the contract

2.  Create workspaces in the contract

3.  View all workspaces in the contract

4.  Delete workspaces in the contract

5.  Edit contract repositories

6.  Edit developer team


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

## Workspace Management


Any contract member can create workspaces. Only workspace Owner or member with
corresponding permissions can manage workspaces. Here is the full list of
workspace permissions:

1.  Edit the workspace (including memberships)

2.  Edit flows in the workspace

3.  Toggle flow status between active and inactive

4.  Toggle flow status between ordinary and real-time

5.  Edit credentials


## Workspaces and Life Cycles


Workspaces in a contract are separated from each other, but they can utilize the
same components for their integration flows. This means that one can create
similar integration flows in different workspaces within a contract. For
non-disruptive testing one can create dedicated workspaces for testing and
production stages, both running near-identical integration flows. The workspaces
will have different credentials, so the testing stage may be accessed by the
client’s engineers, and production environment is customer-facing only.
