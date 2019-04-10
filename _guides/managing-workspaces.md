\---  
title: Managing Workspaces  
layout: article  
section: Tenant Management  
order: 1  
since: 20190411  
---

This document provides information on workspace management, namely the following
actions: [workspace creation](#workspace-creation), [editing the
workspace](#editing-the-workspace), [flow creation](#Flow_creation), [editing
flows](#editing-flows) in the workspace, [credentials
creation](#credentials-creation) and [editing
credentials](#editing_credentials).

Workspace Creation
------------------

Workspaces are enclosed environments in a
[contract](https://docs.elastic.io/getting-started/contracts-and-workspaces.html#contracts).
You can find the basic information about workspaces
[here](https://docs.elastic.io/getting-started/contracts-and-workspaces.html#workspaces).
A contract member can create workspaces in his contract via the UI or the
[API](#API).

To create a new workspace in the UI:

1.  On the sidebar, click **Add**.

![](media/c7c9f863f084eaefc849e762b39cbf36.png)

1.  Enter new workspace name and click **Create.**

![](media/ee32dc8b15eee6ef9207bbff8034994f.png)

1.  Your new workspace is ready.

![](media/946e124f2e4ada9a2f68dd78638f244a.png)

To create a workspace via the API, use the following request:

POST [{{apiBaseUri}}/v2/workspaces](https://api.elastic.io/v2/workspaces)

Below are request payload parameters:

| **Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| type                             | yes          | This parameter should have the value: “workspace” |
| attributes.name                  | yes          | Name of the new workspace                         |
| relationships.contract.data.id   | yes          | ID of the contract                                |
| relationships.contract.data.type | yes          | This parameter should have the value: “contract”  |

**EXAMPLE:**

To create a new workspace called *Integrator 2: Judgement Day*, we will use the
following request:

curl {{apiBaseUri}}/v2/workspaces \\

\-X POST \\

\-u {EMAIL}:{APIKEY} \\

\-H 'Accept: application/json' \\

\-H 'Content-Type: application/json' -d '

{

"data":{

"type":"workspace",

"attributes":{

"name":"Integrator 2: Judgement Day"

},

"relationships":{

"contract":{

"data":{

"id":"{CONTRACT_ID}",

"type":"contract"

}

}

}

}

}'

Editing the Workspace
---------------------

With the right
[permissions](https://docs.elastic.io/guides/managing-user-roles-in-a-tenant.html#permissions-reference-table)
a workspace member can perform workspace management via the
[UI](#Editing_the_workspace_ui) or the [API](#API2).

1. Workspace management via the UI includes such actions as [adding or
inviting](#add_or_invite) new members, managing their workspace [user
roles](https://docs.elastic.io/guides/managing-user-roles-in-a-tenant.html),
[removing members](#remove_members), and [deleting the
workspace](#delete_workspace). All these actions are done in **Workspace** tab
of the navigational menu:

![](media/231a4a98181c89be79642685bf1bcab7.png)

To add or invite new members to the workspace, click **Add new member** or
**Invite new member\***:

![](media/f94e9d53d4699154955715e2320e7e03.png)

For adding new member, select a contract member from the list, assign a user
role in the corresponding menu, and click **Add**:

![](media/14e1382b0e774671300e05f1a5291886.png)

For inviting a new member, fill in user email address, define contract role and
workspace role, and click Send Invite:

![](media/fc3e3c36108dcd47e3838c851d6294c3.png)

**\*** Note that only contract members with the corresponding contract
permission will have the option to invite new members to the workspace.

Find how to assign member roles
[here](https://docs.elastic.io/guides/managing-user-roles-in-a-tenant.html).

To remove members from a workspace, click the corresponding icon on the user
list:

![](media/058b1a1c7781c91cac6d61cf46c66964.png)

To delete workspace, click **Delete workspace**:

![](media/744a1d9bd17e21d0100ccd4465281a09.png)

2. Workspace management via the API includes such actions as adding new members,
managing their [workspace user roles](#update_roles_api), [removing
members](#remove_member_api), and [deleting the
workspace](#delete_workspace_api).

To add a new member via the API, use the following request:

POST
[{{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members](https://api.elastic.io/v2/workspaces/%7bWORKSPACE_ID%7d/members)

Below are request payload parameters:

| **Parameter**      | **Required** | **Description**                                                                  |
|--------------------|--------------|----------------------------------------------------------------------------------|
| id                 | yes          | ID of an already registered user, who will be added as a member of the workspace |
| type               | yes          | A value should be “member”.                                                      |
| attributes.roles[] | yes          | New member roles.                                                                |

**EXAMPLE:**

To add a user with the ID *Elvis* with *King* role we will use the following
request:

curl {{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members/ \\

\-X POST \\

\-u {EMAIL}:{APIKEY} \\

\-H 'Accept: application/json' \\

\-H 'Content-Type: application/json' -d '

{

"data": {

"type": "member",

"id": "Elvis",

"attributes": {

"roles": [

"{King}",

]

}

}

}'

To update user roles via the API, use the following request:

PATCH
[{{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members/{USER_ID}/](https://api.elastic.io/v2/workspaces/%7bWORKSPACE_ID%7d/members/%7bUSER_ID%7d/)

Below are request payload parameters:

| **Parameter**      | **Required** | **Description**                                                 |
|--------------------|--------------|-----------------------------------------------------------------|
| id                 | yes          | ID of an already registered user, match URL parameter {USER_ID} |
| type               | yes          | A value should be “member”.                                     |
| attributes.roles[] | yes          | Roles.                                                          |

**EXAMPLE:**

To change the role of *Elvis* to *Alive* we will use the following request:

curl {{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members/{USER_ID}/ \\

\-X PATCH \\

\-u {EMAIL}:{APIKEY} \\

\-H 'Accept: application/json' \\

\-H 'Content-Type: application/json' -d '

{

"data": {

"type": "member",

"id": "Elvis",

"attributes": {

"roles": [

"Alive"

]

}

}

}'

To remove a member from the workspace via the API we will use the following
request:

DELETE
[{{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members/{USER_ID}/](https://api.elastic.io/v2/workspaces/%7bWORKSPACE_ID%7d/members/%7bUSER_ID%7d/)

Below are request payload parameters:

| **Parameter** | **Description**                              |
|---------------|----------------------------------------------|
| WORKSPACE_ID  | The ID of the Workspace.                     |
| USER_ID       | The ID of the user, which requires deletion. |

**EXAMPLE:**

curl {{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members/{USER_ID}/ \\

\-X DELETE \\

\-u {EMAIL}:{APIKEY}

To delete workspace via the API we will use the following request:

DELETE {{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID} \\

Below are request payload parameters:

| **Parameter** | **Description**          |
|---------------|--------------------------|
| WORKSPACE_ID  | The ID of the Workspace. |

**EXAMPLE:**

curl -i {{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID} \\

\-X DELETE \\

\-u {EMAIL}:{APIKEY}

Flow Creation  
An integration
[flow](https://docs.elastic.io/getting-started/integration-flow.html) is a set
of components used to synchronize data between multiple applications or
services. A workspace member with corresponding permissions can create flows in
his contract via the UI or the [API](#flow_via_api).

To create a new flow in the UI:

1.  On the dashboard, click **Add new flow**.

![](media/fe36e156286d6c6d034944969f894473.png)

Alternatively, you can click **Add New Flow** in **Flows**.

![](media/d7ce143be85fb4957333298ea1755d0a.png)

1.  Your new flow is ready. Be sure to name it and write a description, which is
    optional.

![](media/b026a24d2e63e19d16d6049d436b00ff.png)

To create a flow via the API, use the following request:

POST {{apiBaseUri}}/v2/flows/

Below are request payload parameters:

| **Parameter**                     | **Required** | **Description**                                |
|-----------------------------------|--------------|------------------------------------------------|
| type                              | yes          | A value must be flow.                          |
| attributes.name                   | yes          | Flow name.                                     |
| attributes.type                   | yes          | Flow type. Value may be:                       |
| attributes.graph                  | yes          | Flow graph representing component connections. |
| relationships.workspace.data.id   | yes          | The ID of the workspace.                       |
| relationships.workspace.data.type | yes          | The value must be \`workspace\`.               |

-   ordinary,

-   long_running

**EXAMPLE:**

curl -X POST {{apiBaseUri}}/v2/flows \\

\-u {EMAIL}:{APIKEY} \\

\-H 'Accept: application/json' \\

\-H 'Content-Type: application/json' -d '

{

"data":{

"attributes":{

"default_mapper_type":"jsonata",

"type":"ordinary",

"name":"Timer to E-Mail",

"description":null,

"cron":null,

"graph":{

"nodes":[

{

"id":"step_1",

"command":"elasticio/timer:timer\@latest",

"fields":{

"interval":"minute"

}

},

{

"command":"elasticio/email:send\@latest",

"fields":{

},

"id":"step_2"

}

],

"edges":[

{

"config":{

"mapper_type":"jsonata",

"mapper":{

"to":"info\@acme.org",

"subject":"Subject",

"textBody":"fireTime"

}

},

"source":"step_1",

"target":"step_2"

}

]

}

},

"type":"flow",

"relationships":{

"workspace":{

"data":{

"id":"59d341e9037f7200184a408b",

"type":"workspace"

}

}

}

}

}'

Editing Flows
-------------

With the right
[permissions](https://docs.elastic.io/guides/managing-user-roles-in-a-tenant.html#permissions-reference-table)
a workspace member can perform flow management via the [UI](#flow_manage_ui) or
the [API](#Flow_management_API).

1.  Flow management via the UI includes toggling type between **Realtime** and
    **Ordinary**, starting and stopping flows, and deleting flows. All your
    flows can be found in **Flows** inside the navigational menu. You can use
    search and filters to find the required flow. To manage the flow, click on
    the flow’s name, in our case – “**Test flow**”.

![](media/83dad26f27a29de066db729ab8e0c0df.png)

You will see your flow control page, where you can rename, start, stop, edit,
and delete the flow.

![](media/58e49aacec34c53215f931e4b89e3e00.png)

Click **Settings** to access the settings tab where you can toggle flow type.

![](media/2974214f733d8be3dc31e9c1dc02d3ab.png)

Flows can be **Realtime** and **Ordinary**. You can find more info about these
types [here](/realtime-flows). You can toggle flow type with the corresponding
switch.

![](media/a069af9744d948f0c01d73ef8566cc20.png)

1.  Flow management via the API includes [toggling type](#update_flow_api)
    between **Realtime** and **Ordinary**, [starting and
    stopping](#start_stop_api) flows, and deleting flows.

To update flow type or name, we will use the following API request:

PATCH
[{{apiBaseUri}}/v2/flows/{FLOW_ID}](https://api.elastic.io/v2/flows/%7bFLOW_ID%7d)

Below are request payload parameters:

| **Parameter**    | **Required** | **Description**                                |
|------------------|--------------|------------------------------------------------|
| type             | yes          | A value must be flow.                          |
| id               | yes          | ID of the flow you want to update.             |
| attributes.name  | no           | Flow name.                                     |
| attributes.type  | no           | Flow type. Value may be:                       |
| attributes.graph | no           | Flow graph representing component connections. |
| attributes.cron  | no           | Cron expression representing flow timing.      |

-   ordinary,

-   long_running

**EXAMPLE:**

curl {{apiBaseUri}}/v2/flows/{FLOW_ID} \\

\-X PATCH \\

\-u {EMAIL}:{APIKEY} \\

\-H 'Accept: application/json' \\

\-H 'Content-Type: application/json' -d '

{

"data": {

"type": "flow",

"id": "{FLOW_ID}",

"attributes": {

"name": "New flow name"

}

}

}'

To start or stop a flow we will use the following requests:

POST
[{{apiBaseUri}}/v2/flows/{FLOW_ID}/start](https://api.elastic.io/v2/flows/%7bFLOW_ID%7d/start)

POST
[{{apiBaseUri}}/v2/flows/{FLOW_ID}/stop](https://api.elastic.io/v2/flows/%7bFLOW_ID%7d/stop)

As you can see, the only difference between requests is the corresponding
\`start\` or \`stop\`.

Below are request payload parameters:

| **Parameter** | **Required** | **Description** |
|---------------|--------------|-----------------|
| FLOW_ID       | yes          | Flow ID.        |

**EXAMPLE:**

curl {{apiBaseUri}}/v2/flows/{FLOW_ID}/start \\

\-X POST \\

\-u {EMAIL}:{APIKEY} \\

\-H 'Accept: application/json' \\

\-H 'Content-Type: application/json'

To delete a flow, we will use the following requests:

DELETE
[{{apiBaseUri}}/v2/flows/{FLOW_ID}](https://api.elastic.io/v2/flows/%7bFLOW_ID%7d)

Below are request payload parameters:

| **Parameter** | **Required** | **Description** |
|---------------|--------------|-----------------|
| FLOW_ID       | yes          | Flow ID.        |

**EXAMPLE:**

curl {{apiBaseUri}}/v2/flows/{FLOW_ID} \\

\-X DELETE \\

\-u {EMAIL}:{APIKEY}

Credentials Creation
--------------------

Credentials contain authorization information that is required by components.
Workspace members with corresponding permissions can create credentials via the
[UI](#create_credentials_UI) and the [API](#create_credentials_api).

To create new credentials via the UI:

1.  In the navigational menu, click **Credentials**. Then choose the required
    component from the list and click it. For example, let’s use Magento.

![](media/1441f63e602274451521116870b21d20.png)

1.  Click **Add New Credential** and fill in the appearing fields. When done,
    click **Verify**.

![](media/d6b93eae7be36097a12728fa182b010c.png)

To create new credential via the API, we will use the following API request:

POST [{{apiBaseUri}}/v2/credentials/](https://api.elastic.io/v2/credentials/)

Below are request payload parameters:

| **Parameter**                     | **Required** | **Description**                                                                    |
|-----------------------------------|--------------|------------------------------------------------------------------------------------|
| type                              | yes          | The value must be \`credential\`.                                                  |
| attributes.name                   | no           | Credential name. An automatic name will be generated if you ignore this parameter. |
| relationships.component.data.id   | yes          | ID of the target component.                                                        |
| relationships.component.data.type | yes          | The value must be \`component\`.                                                   |
| relationships.workspace.data.id   | yes          | Workspace ID.                                                                      |
| relationships.workspace.data.type | yes          | The value must be \`workspace\`.                                                   |
| relationships.agent               | no           | Agent relation object.                                                             |
| relationships.agent.data.id       | no           | Agent ID.                                                                          |
| relationships.agent.data.type     | no           | The value must be \`agent\`                                                        |
| attributes.keys                   | no           | An object which represents component’s configuration (OAuth keys, etc.)            |

**EXAMPLE:**

curl {{apiBaseUri}}/v2/credentials/ \\

\-X POST \\

\-u {EMAIL}:{APIKEY} \\

\-H 'Accept: application/json' \\

\-H 'Content-Type: application/json' -d '

{

"data":{

"type":"credential",

"attributes":{

"name":"credname",

"keys":{

"host":"hostname",

"username":"Pumbaa",

"password":"hakunamatata"

}

},

"relationships":{

"component":{

"data":{

"id":"56793fb4d8057406000000f7",

"type":"component"

}

},

"workspace":{

"data":{

"id":"59d341e9037f7200184a408b",

"type":"workspace"

}

}

}

}

}'

Editing Credentials
-------------------

A member with the right permissions can manage credentials – update or delete
them via the [UI](#Editing_credentials_ui) or the
[API](#editing_credentials_api):

1.  Editing credentials via the UI includes updating and deleting credentials.

To edit credentials, choose the required credential from the list in
**Credentials**.

![](media/a37d4673fcf6276bb837ca235b3a9760.png)

Click **Edit** and fill in all the required fields. Then click **Verify**.

![](media/abfd5e434989fff286a5986980fd016e.png)

To delete credentials, choose the required credential in **Credentials**, and
click **Delete**.

![](media/64a9519f06537bb0fba4c14f38ceb0b4.png)

1.  Editing credentials via the API includes updating and deleting credentials.

To update credentials, we will use the following request:

PATCH
[{{apiBaseUri}}/v2/credentials/{CREDENTIAL_ID}/](https://api.elastic.io/v2/credentials/%7bCREDENTIAL_ID%7d/)

Below are request payload parameters:

| **Parameter**                 | **Required** | **Description**                                                                                                                                                          |
|-------------------------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id                            | yes          | The value must be the same as the URL parameter \`CREDENTIAL_ID\`                                                                                                        |
| type                          | yes          | The value must be \`credential\`.                                                                                                                                        |
| attributes.name               | no           | Credential name. Will not change if you choose to ignore this parameter.                                                                                                 |
| attributes.keys               | no           | An object which represents component’s configuration. Will not change if you choose to ignore this parameter. Please note, that \`keys\` object is overwritten entirely. |
| relationships.agent           | no           | The agent relation object. Will not change if you choose to ignore this parameter.                                                                                       |
| relationships.agent.data.id   | no           | Agent ID.                                                                                                                                                                |
| relationships.agent.data.type | no           | The value must be \`agent\`.                                                                                                                                             |

**EXAMPLE:**

curl {{apiBaseUri}}/v2/credentials/{CREDENTIAL_ID}/ \\

\-u {EMAIL}:{APIKEY} \\

\-X PATCH \\

\-H 'Accept: application/json' \\

\-H 'Content-Type: application/json' -d '

{

"data": {

"id": "585430d3f02852a8a9fac45e",

"type": "credential",

"attributes": {

"keys": {

"key1": "updated value"

}

},

"relationships": {

"agent": {

"data": {

"id": "59a410d76b670400182f190e",

"type": "agent"

}

}

}

}

}'

To delete credentials, we will use the following request:

DELETE
[{{apiBaseUri}}/v2/credentials/{CREDENTIAL_ID}/](https://api.elastic.io/v2/credentials/%7bCREDENTIAL_ID%7d/)

Below are request payload parameters:

| **Parameter**     | **Required** | **Description** |
|-------------------|--------------|-----------------|
| \`CREDENTIAL_ID\` | yes          | Credential ID.  |

**EXAMPLE:**

curl {{apiBaseUri}}/v2/credentials/{CREDENTIAL_ID}/ \\

\-X DELETE \\

\-u {EMAIL}:{APIKEY}
