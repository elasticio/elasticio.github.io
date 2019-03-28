\---

title: Contracts and Workspaces

layout: article

section: Basic Concepts

order: 1

since: 20190328

\---

This document provides information on [contracts](#contracts), [contract
management](#contract-management), [workspaces](#workspaces) and [workspace
management](#section). Additionally, it explains the basic application of this
approach in [solution life cycle](#workspaces-and-life-cycles). The following
scheme shows here contracts and workspaces stand in solution hierarchy.  
  


![](media/73655d79cfa16743bcf8248345ea618b.png)

<br>Contracts
-------------

A client’s enclosed environment within a
[tenant](https://docs.elastic.io/getting-started/tenant.html) is called a
contract. It is usually backed by a formal agreement, hence the name. Each
client can have multiple contracts. A contract includes members, developer
teams, and workspaces:

-   A **workspace** is a smaller enclosed environment that contains integration
    flows. Details on workspaces can be found [here](#workspaces).

-   A **member** is a registered platform user that has been invited the
    contract by Owner and given a contract
    [role](https://docs.elastic.io/guides/managing-user-roles-in-a-tenant.html).

-   A **developer team** is a smaller enclosed environment that contains
    component developers and their GitHub repositories.

Contracts are virtually separated from each other and require corresponding
memberships to enter and work in. With the invitation a user gets a user role.

Contract Management
-------------------

A tenant Admin can [create
contracts](https://api.elastic.io/docs/v2/#create-a-contract) and set contract
Owners. By default, only members with contract Owner or Admin
[roles](https://docs.elastic.io/guides/managing-user-roles-in-a-tenant.html) can
manage contracts. However, roles can be customized, so in this document we will
differentiate contract and workspace members by
[permissions](https://docs.elastic.io/guides/managing-user-roles-in-a-tenant.html#permissions-reference-table).

Here is the full list of contract permissions:

1.  Edit members in the contract

2.  Create workspaces in the contract

3.  View all workspaces in the contract

4.  Delete workspaces in the contract

5.  Edit contract repositories

6.  Edit developer team

A detailed description of contract management process can be found here.

<br>Workspaces
--------------

A client’s enclosed environment within a contract is called a workspace. Each
contract can have multiple workspaces, and each workspace is virtually separated
from other workspaces within a contract. A workspace includes members and
[integration flows](https://docs.elastic.io/getting-started/integration-flow):

-   A **member** is a user with certain access rights in the workspace. These
    rights are defined by user roles set by workspace Owner or Admin upon
    invitation of a contract member to a workspace.

-   An **integration flow** is a set of integration components and
    [credentials](https://docs.elastic.io/getting-started/credential.html) used
    to synchronize data between multiple applications or services. More details
    on integration flows can be found
    [here](https://docs.elastic.io/getting-started/integration-flow).

Contract members can be invited to a workspace within their contract by other
members with the corresponding permissions. Members can contribute to
integration flows in their workspace in collaboration with other members, or
individually.

Workspace Management
--------------------

Any contract member can create workspaces. Only workspace Owner or member with
corresponding permissions can manage workspaces. Here is the full list of
workspace permissions:

1.  Edit the workspace (including memberships)

2.  Edit flows in the workspace

3.  Toggle flow status between active and inactive

4.  Toggle flow status between ordinary and real-time

5.  Edit credentials

A detailed description of workspace management process can be found here.

Workspaces and Life Cycles
--------------------------

Workspaces in a contract are separated from each other, but they can utilize the
same components for their integration flows. This means that one can create
similar integration flows in different workspaces within a contract. For
non-disruptive testing one can create dedicated workspaces for testing and
production stages, both running near-identical integration flows. The workspaces
will have different credentials, so the testing stage may be accessed by the
client’s engineers, and production environment is customer-facing only.
