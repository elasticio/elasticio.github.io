---
title: Managing Workspaces
description: This document provides information on workspace management.
layout: article
section: Tenant Management
order: 1
since: 20190411
---

This document provides information on workspace management, namely the following
actions: [creating workspaces](#creating-workspaces), [editing the
workspace](#editing-the-workspace), [creating flows](#creating-flows), [editing flows](#editing-flows) in the workspace, [creating credentials](#creating-credentials) and [editing  credentials](#editing_credentials). Additionally, you will find all workspace-related [retrieval API requests](#retrieval-requests).

## Creating Workspaces

Workspaces are enclosed environments in a
[contract](/getting-started/contracts-and-workspaces).
You can find the basic information about workspaces
[here](/getting-started/contracts-and-workspaces).
A contract member can create workspaces in his contract via the [UI](#to-create-a-new-workspace-in-the-ui) or the
[API](#to-create-a-workspace-via-the-api-use-the-following-request).

##### To create a new workspace in the UI:

**Option 1.**  Open the Navigational Menu, expand the list of Workspaces, and click **Create Workspace**. Enter new workspace name and click **Create**:

![Create New Workspace](/assets/img/tenant-management-guide/managing-workspaces/create-workspace-1.png)

**Option 2.** You can also create a new workspace in Workspace list. Open the Navigational Menu, expand the list of Workspaces, and click **View All Workspaces**. Alternatively, you can use **Members** or **Developer Teams** menu items, and just switch to **Workspaces** tab. Then click **Create Workspace**:

![Create New Workspace](/assets/img/tenant-management-guide/managing-workspaces/create-workspace-2.png)

##### To create a workspace via the API, use the following request:

`POST {{site.data.tenant.apiBaseUri}}/v2/workspaces`

Below are request parameters:

| **Payload Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `type`                             | yes          | Allowed value: `workspace` |
| `attributes.name`                  | yes          | Name of the new workspace                         |
| `relationships.contract.data.id`   | yes          | ID of the contract                                |
| `relationships.contract.data.type` | yes          | Allowed value: `contract`  |

**EXAMPLE:**

To create a new workspace called *Integrator 2: Judgement Day*, we will use the
following request:
```
curl {{site.data.tenant.apiBaseUri}}/v2/workspaces \
  -X POST \
  -u {EMAIL}:{APIKEY} \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' -d '
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
```
**NOTE:** Workspace name is limited by usable characters and length. It may contain only letters, digits, whitespaces, `-` and `_` symbols, and be from 3 up to 40 symbols long.

## Editing the Workspace

With the right
[permissions](/guides/managing-user-roles-in-a-tenant)
a workspace member can perform workspace management via the
[UI](#1-workspace-management-via-the-ui) or the [API](#2-workspace-management-via-the-api).

##### 1. Workspace management via the UI

includes adding or inviting new members, managing their Workspace [user roles](/guides/managing-user-roles-in-a-tenant), removing members, renaming and deleting the
workspace. All these actions are done in **Workspace** page, accessed via the Navigational Menu. First, choose a Workspace you want to manage **(1)**, then click **Workspace** in the **Organize** section of the menu  **(2)**:

![Organize - Workspace](/assets/img/tenant-management-guide/managing-workspaces/add-new-member-1.png)

To add new members to the workspace, click **Add new member** button **(1)**, select the member **(2)**, define workspace role **(3)**, and click **Add** **(4)**:

![Add new member](/assets/img/tenant-management-guide/managing-workspaces/add-new-member-2.png)

To invite a new member into the Contract, go to **Members** in the Navigational Menu **(1)**, and click **Invite new member** **(2)**. Then fill in user email  address **(3)** and define Contract role **(4)**. Optionally **(5)**, you can specify invitee's Workspace **(6)** and workspace role **(7)**, and click **Send Invite** **(8)**:

![For inviting a new member](/assets/img/tenant-management-guide/managing-workspaces/invite-new-member-1.png)

Note that only contract members with the corresponding contract
permission will have the option to invite new members to the workspace. You can learn how to assign member roles
[here](/guides/managing-user-roles-in-a-tenant).

To remove members from a workspace, click the corresponding icon on the user
list:

![Remove members from a workspace](/assets/img/tenant-management-guide/managing-workspaces/remove-member-1.png)

To rename a workspace, click **Workspace** in the menu **(1)**, and then click Workspace name **(2)**:

![Rename a workspace](/assets/img/tenant-management-guide/managing-workspaces/rename-workspace.png)

To delete a workspace, click **Delete workspace** on the same page:

![Delete workspace](/assets/img/tenant-management-guide/managing-workspaces/delete-workspace.png)

##### 2. Workspace management via the API

includes adding new members, managing their workspace user roles, removing members, renaming the workspace, and deleting the workspace.

To add a new member via the API, use the following request:

`POST {{site.data.tenant.apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members`

Below are request parameters:

| **Payload Parameter**      | **Required** | **Description**                                                                  |
|--------------------|--------------|----------------------------------------------------------------------------------|
| `id`                 | yes          | ID of an already registered user, who will be added as a member of the workspace |
| `type`               | yes          | Allowed value: `member`.                                                      |
| `attributes.roles[]` | yes          | New member roles.                                                                |

**EXAMPLE:**

To add a user with the ID *Elvis* with *King* and *Immortal* roles we will use the following
request:

```
curl {{site.data.tenant.apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members/ \
    -X POST \
    -u {EMAIL}:{APIKEY} \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' -d '
    {
       "data": {
           "type": "member",
           "id": "{Elvis}",
           "attributes": {
               "roles": [
                 "{King}",
                 "{Immortal}"
               ]
           }
       }
    }'
```
To update user roles via the API, use the following request:

`PATCH {{site.data.tenant.apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members/{USER_ID}/`

Below are request parameters:

| **URL Parameter**      | **Required** | **Description**                                                 |
|--------------------|--------------|-----------------------------------------------------------------|
| `WORKSPACE_ID`                 | yes          | Workspace ID|
| `USER_ID`               | yes          | Target user ID                                     |


| **Payload Parameter**      | **Required** | **Description**                                                 |
|--------------------|--------------|-----------------------------------------------------------------|
| `id`                 | yes          | ID of an already registered user, match URL parameter `{USER_ID}` |
| `type`               | yes          | Allowed value: `member`.                                     |
| `attributes.roles[]` | yes          | Roles.                                                          |

**EXAMPLE:**

To change user roles we will use the following request:

```
curl {{site.data.tenant.apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members/{USER_ID}/ \
    -X PATCH  \
    -u {EMAIL}:{APIKEY} \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' -d '
    {
       "data": {
           "type": "member",
           "id": "{USER_ID}",
           "attributes": {
               "roles": [
                 "{NEW_ROLE}"
               ]
           }
       }
    }'
```
To remove a member from the workspace via the API we will use the following
request:

`DELETE {{site.data.tenant.apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members/{USER_ID}/`

Below are request parameters:

| **URL Parameter** | **Description**                              |
|---------------|----------------------------------------------|
| `WORKSPACE_ID`  | The ID of the Workspace.                     |
| `USER_ID `      | The ID of the user, which requires deletion. |

**EXAMPLE:**
```
curl {{site.data.tenant.apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members/{USER_ID}/ \
    -X DELETE    \
    -u {EMAIL}:{APIKEY}
```

To rename a workspace via the API we will use the following request:

`POST {{site.data.tenant.apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}`

Below are request parameters:

| **Payload Parameter** | **Description**                              |
|---------------|----------------------------------------------|
| `type`  | The value must be `workspace`.                    |
| `attributes.name`      | Name of the workspace. |

**EXAMPLE:**
```
curl {{site.data.tenant.apiBaseUri}}/v2/workspaces/{WORKSPACE_ID} \
  -X PATCH \
  -u {EMAIL}:{APIKEY} \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' -d '
   {
  "data":{
    "type":"workspace",
    "attributes":{
      "name":"New Workspace Name"
      }
    }
  }'
```

To delete workspace via the API we will use the following request:

`DELETE {{site.data.tenant.apiBaseUri}}/v2/workspaces/{WORKSPACE_ID} \`

Below are request parameters:

| **URL Parameter** | **Description**          |
|---------------|--------------------------|
| `WORKSPACE_ID`  | The ID of the Workspace. |

**EXAMPLE:**
```
curl -i {{site.data.tenant.apiBaseUri}}/v2/workspaces/{WORKSPACE_ID} \
 -X DELETE \
 -u {EMAIL}:{APIKEY}
 ```


## Creating Flows

An integration [flow](/getting-started/integration-flow) is a set
of components used to synchronize data between multiple applications or
services. A workspace member with corresponding permissions can create flows in
his contract via the [UI](#to-create-a-new-flow-in-the-ui) or the [API](#to-create-a-flow-via-the-api-use-the-following-request).

##### To create a new flow in the UI:

1\.  On the dashboard, click **Add new flow**:

![Dashboard - Add new flow](/assets/img/tenant-management-guide/managing-workspaces/create-flow-1.png)

Alternatively, you can click **Add New Flow** **(2)** in **Flows** **(1)**:

![Add New Flow in Flows](/assets/img/tenant-management-guide/managing-workspaces/create-flow-2.png)

2\.  Your new flow is ready. Be sure to name it **(1)** and write a description **(2)**, which is optional. Then you can start your work by adding initial trigger **(3)** and publishing the Flow **(4)**:

![Name and description](/assets/img/tenant-management-guide/managing-workspaces/create-flow-3.png)

##### To create a flow via the API, use the following request:

`POST {{site.data.tenant.apiBaseUri}}/v2/flows/`

Below are request parameters:

| **Payload Parameter**                     | **Required** | **Description**                                |
|-----------------------------------|--------------|------------------------------------------------|
| `type`                              | yes          | The value must be `flow`.                          |
| `attributes.name`                   | yes          | Flow name.                                     |
| `attributes.type`                   | yes          | Flow type. Value may be:   `ordinary` or  `long_running`                    |
| `attributes.graph`                  | yes          | Flow graph representing component connections. |
| `relationships.workspace.data.id`   | yes          | The ID of the workspace.                       |
| `relationships.workspace.data.type` | yes          | The value must be `workspace`.               |



**EXAMPLE:**
```
curl -X POST {{site.data.tenant.apiBaseUri}}/v2/flows \
  -u {EMAIL}:{APIKEY} \
   -H 'Accept: application/json' \
   -H 'Content-Type: application/json' -d '
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
            "command":"devTeam1/timer:timer@latest",
            "fields":{
              "interval":"minute"
            }
          },
          {
            "command":"devTeam1/email:send@latest",
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
                "to":"info@acme.org",
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
```


## Editing Flows

With the right
[permissions](/guides/managing-user-roles-in-a-tenant)
a workspace member can perform flow management via the [UI](#1-flow-management-via-the-ui) or
the [API](#2-flow-management-via-the-api).

##### 1. Flow management via the UI.

Includes the following actions:
toggling type between **Realtime** and
    **Ordinary**, starting and stopping Flows, and deleting flows. All your
    flows can be found in **Flows** inside the navigational menu. You can use
    search and filters to find the required Flow. To manage the Flow, click on
    the flow’s name:

![Management via the UI](/assets/img/tenant-management-guide/managing-workspaces/select-flow.png)

You will see your flow control page, where you can start, stop, edit,
and delete the flow:

![Control page](/assets/img/tenant-management-guide/managing-workspaces/start-stop-edit-flow.png)

Click **Settings** to access the settings tab where you can toggle flow type:

![Settings tab](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_16.png)

Flows can be **Realtime** and **Ordinary**. You can find more info about these
types [here](/guides/realtime-flows). You can toggle flow type with the corresponding
switch:

![Realtime and ordinary](/assets/img/tenant-management-guide/managing-workspaces/screenshot_13.png)

##### 2\.  Flow management via the API
includes the following actions:
 [toggling type](#update_flow_api)
    between **Realtime** and **Ordinary**, [starting and
    stopping](#start_stop_api) flows, and deleting flows.

To update flow type or name, we will use the following API request:

`PATCH {{site.data.tenant.apiBaseUri}}/v2/flows/{FLOW_ID}`

Below are request parameters:

| **URL Parameter**    | **Required** | **Description**                                |
|------------------|--------------|------------------------------------------------|
| `FLOW_ID`             | yes          |ID of the flow     |

| **Payload Parameter**    | **Required** | **Description**                                |
|------------------|--------------|------------------------------------------------|
| `type`             | yes          | Allowed value: `flow`.                          |
| `id `              | yes          | ID of the flow you want to update.             |
| `attributes.name`  | no           | Flow name.                                     |
| `attributes.type`  | no           | Flow type. Value may be: `ordinary` or `long_running`.                      |
| `attributes.graph` | no           | Flow graph representing component connections. |
| `attributes.cron`  | no           | Cron expression representing flow timing.      |


**EXAMPLE:**
```
curl {{site.data.tenant.apiBaseUri}}/v2/flows/{FLOW_ID} \
   -X PATCH \
   -u {EMAIL}:{APIKEY} \
   -H 'Accept: application/json' \
   -H 'Content-Type: application/json' -d '
    {
          "data": {
            "type": "flow",
            "id": "{FLOW_ID}",
            "attributes": {
              "name": "this is a test task"
            }
          }
    }'
```
To start or stop a flow we will use the following requests:

`POST {{site.data.tenant.apiBaseUri}}/v2/flows/{FLOW_ID}/start`

`POST {{site.data.tenant.apiBaseUri}}/v2/flows/{FLOW_ID}/stop`

As you can see, the only difference between requests is the corresponding
`start` or `stop`.

Below are request parameters:

| **URL Parameter** | **Required** | **Description** |
|---------------|--------------|-----------------|
| `FLOW_ID `      | yes          | Flow ID.        |

**EXAMPLE:**
```
curl {{site.data.tenant.apiBaseUri}}/v2/flows/{FLOW_ID}/start \
   -X POST \
   -u {EMAIL}:{APIKEY} \
   -H 'Accept: application/json' \
   -H 'Content-Type: application/json'
```

To delete a flow, we will use the following requests:

`DELETE {{site.data.tenant.apiBaseUri}}/v2/flows/{FLOW_ID}`

Below are request parameters:

| **URL Parameter** | **Required** | **Description** |
|---------------|--------------|-----------------|
| `FLOW_ID `      | yes          | Flow ID.        |

**EXAMPLE:**
```
curl {{site.data.tenant.apiBaseUri}}/v2/flows/{FLOW_ID} \
   -X DELETE \
   -u {EMAIL}:{APIKEY}
```


## Creating Credentials

Credentials contain authorization information that is required by components.
Workspace members with corresponding permissions can create credentials via the
[UI](#to-create-new-credentials-via-the-ui) and the [API](#to-create-new-credential-via-the-api-we-will-use-the-following-api-request).

##### To create new credentials via the UI:

1\.  In the navigational menu, click **Credentials**. Then choose the required
    component from the list and click it. For example, let’s use SFTP:

![Credentials](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_22.png)

2\.  Click **Add New Credential** and fill in the appearing fields. When done,
    click **Verify**:

![Add New Credential](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_19.png)

![Add New Credential - Verify](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_20.png)

3\. After the credential gets verified, click **Save**, which will appear in the place of **Verify**.

4\. Alternatively, you can create credentials when adding components to a flow. In **Flows**, choose the required flow:

![Flows - choose the required flow](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_29.png)

5\. Click **Add the initial step** or **edit flow** button, depending on the existence of flow steps:

![Add the initial step](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_30.png)

![Edit flow](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_31.png)

6\. Search for your component in the list and click it:

![Search for your component](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_32.png)

7\. Click **connect new credentials**:

![Connect new credentials](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_34.png)



##### To create new credential via the API, we will use the following API request:

`POST {{site.data.tenant.apiBaseUri}}/v2/credentials/`

Below are request parameters:

| **Payload Parameter**                     | **Required** | **Description**                                                                    |
|-----------------------------------|--------------|------------------------------------------------------------------------------------|
| `type`                              | yes          | The value must be `credential`.                                                  |
| `attributes.name`                   | no           | Credential name. An automatic name will be generated if you ignore this parameter. |
| `relationships.component.data.id`   | yes          | ID of the target component.                                                        |
| `relationships.component.data.type` | yes          | The value must be `component`.                                                   |
| `relationships.workspace.data.id`   | yes          | Workspace ID.                                                                      |
| `relationships.workspace.data.type` | yes          | The value must be `workspace`.                                                   |
| `relationships.agent`               | no           | Agent relation object.                                                             |
| `relationships.agent.data.id`       | no           | Agent ID.                                                                          |
| `relationships.agent.data.type`     | no           | The value must be `agent`                                                        |
| `attributes.keys`                   | no           | An object which represents component’s configuration (OAuth keys, etc.)            |

**EXAMPLE:**
```
curl {{site.data.tenant.apiBaseUri}}/v2/credentials/ \
    -X POST \
    -u {EMAIL}:{APIKEY} \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' -d '
    {
     "data":{
       "type":"credential",
       "attributes":{
         "name":"credname",
         "keys":{
           "host":"hostname",
           "username":"username",
           "password":"pass"
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
```


## Editing Credentials

A member with the right permissions can manage credentials – update or delete
them via the [UI](#editing-credentials-via-the-ui-includes-updating-and-deleting-credentials) or the
[API](#editing-credentials-via-the-api-includes-updating-and-deleting-credentials):

##### 1\.  Editing credentials via the UI includes updating and deleting credentials.

To edit credentials, choose the required credential from the list in
**Credentials**:

![Credentials](/assets/img/tenant-management-guide/managing-workspaces/screenshot_x.png)

Click **Edit** and fill in all the required fields. Then click **Verify**, and **Save** after verification:

![Edit - Verify](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_23.png)

To delete credentials, choose the required credential in **Credentials**, and
click **Delete**:

![Credentials - Delete](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_21.png)

##### 2\.  Editing credentials via the API includes updating and deleting credentials.

To update credentials, we will use the following request:

`PATCH {{site.data.tenant.apiBaseUri}}/v2/credentials/{CREDENTIAL_ID}/`

Below are request parameters:

| **Payload Parameter**                 | **Required** | **Description**                                                                                                                                                          |
|-------------------------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `id`                            | yes          | The value must be the same as the URL parameter `CREDENTIAL_ID`                                                                                                        |
| `type`                          | yes          | The value must be `credential`.                                                                                                                                        |
|` attributes.name`               | no           | Credential name. Will not change if you choose to ignore this parameter.                                                                                                 |
| `attributes.keys`               | no           | An object which represents component’s configuration. Will not change if you choose to ignore this parameter. Please note, that `keys` object is overwritten entirely. |
| `relationships.agent`           | no           | The agent relation object. Will not change if you choose to ignore this parameter.                                                                                       |
| `relationships.agent.data.id`   | no           | Agent ID.                                                                                                                                                                |
| `relationships.agent.data.type` | no           | The value must be `agent`.                                                                                                                                             |

**EXAMPLE:**
```
curl {{site.data.tenant.apiBaseUri}}/v2/credentials/{CREDENTIAL_ID}/ \
   -u {EMAIL}:{APIKEY} \
   -X PATCH \
   -H 'Accept: application/json' \
   -H 'Content-Type: application/json' -d '
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
```

To delete credentials, we will use the following request:

`DELETE {{site.data.tenant.apiBaseUri}}/v2/credentials/{CREDENTIAL_ID}/`

Below are request parameters:

| **URL Parameter**     | **Required** | **Description** |
|-------------------|--------------|-----------------|
| `CREDENTIAL_ID` | yes          | Credential ID.  |

**EXAMPLE:**
```
curl {{site.data.tenant.apiBaseUri}}/v2/credentials/{CREDENTIAL_ID}/ \
   -X DELETE \
   -u {EMAIL}:{APIKEY}
```
## Retrieval Requests
The UI automatically shows you lists of entities (workspaces, users, flows, etc.) in corresponding tabs if you have the corresponding permissions. To see these entities via the API, we will use the following requests. Note, that they will only work for members with the corresponding permissions.

1\. To get workspace by ID:

`GET {{site.data.tenant.apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/`

Below are request parameters:

| **URL Parameter** | **Required** | **Description** |
|---------------|--------------|-----------------|
| `FLOW_ID `      | yes          | Flow ID.        |
| `include `      | no          | Include or full resource objects in response for related entities, or not. Allowed values: `members` and/or `invites`.        |

**EXAMPLE:**
```
curl {{site.data.tenant.apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}?include=members,invites \
  -u {EMAIL}:{APIKEY} \
  -H 'Accept: application/json'
  ```
2\. To get user's workspaces:

`GET {{site.data.tenant.apiBaseUri}}/v2/workspaces?contract_id={CONTRACT_ID}`

Below are request parameters:

| **URL Parameter** | **Required** | **Description** |
|---------------|--------------|-----------------|
| `CONTRACT_ID`      | yes          | Contract ID.        |

**EXAMPLE:**

```
curl {{site.data.tenant.apiBaseUri}}/v2/workspaces?contract_id={CONTRACT_ID} \
   -u {EMAIL}:{APIKEY} \
   -H 'Accept: application/json'
```
3\. To get workspace member list:

`GET {{site.data.tenant.apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members/`

Below are request parameters:

| **URL Parameter** | **Required** | **Description** |
|---------------|--------------|-----------------|
| `WORKSPACE_ID`      | yes          | Workspace ID.        |

4\. To retrieve all flows in the workspace:

`GET {{site.data.tenant.apiBaseUri}}/v2/flows/`

Below are request parameters:

| **URL Parameter**                     | **Required** | **Description**                                                                    |
|-----------------------------------|--------------|------------------------------------------------------------------------------------|
| `WORKSPACE_ID`                              | yes          | Workspace ID.                                                  |
| `page[size]`                   | no           | Amount of items per list page. Default value is `50`|
| `page[number]`   | no          | Number of page you want to display. Default value is `1`.                                                        |
| `filter[has_draft]` | no         | Filter flows only with or without a draft. Value may be `true` or `false`.                                                   |
| `filter[status]`   | no          | Filter by `status`. Value may be:` active` or `inactive`.                                                                      |
| `filter[type]` | no          | Filter by flow `type`. Value may be `ordinary` or `long_running`.                                                   |
| `filter[user]`               | no           | Filter by `user`. Must be the ID of the user who created the flow. User can be found in relationships of the flow.                                                             |
| `sort`       | no           | Sort flows list by certain field. Value may be `created_at`, `updated_at` or `name`. Prefix field name with `-` for reversed order (example: `sort=-updated_at`) . Default sort is by ID.                                                                          |
| `search`     | no           | Search flows by a word or a phrase contained in the `description` or in the `name`. Behavior is similar to operator `LIKE` in SQL. Case insensitive. Leading/following spaces are trimmed.     |

**EXAMPLES:**

Custom paging:

`curl '{{site.data.tenant.apiBaseUri}}/v2/flows?workspace_id=59d341e9037f7200184a408b&page[size]=20&page[number]=1' \
   -g -u {EMAIL}:{APIKEY}`

Filter:

`curl '{{site.data.tenant.apiBaseUri}}/v2/flows?workspace_id=59d341e9037f7200184a408b&filter[status]=active' \
   -g -u {EMAIL}:{APIKEY}`

Search:

`curl '{{site.data.tenant.apiBaseUri}}/v2/flows?workspace_id=59d341e9037f7200184a408b&search=webhook' \
   -g -u {EMAIL}:{APIKEY} `

Custom sorting:

`curl '{{site.data.tenant.apiBaseUri}}/v2/flows?workspace_id=59d341e9037f7200184a408b&sort=-updated_at' \
   -g -u {EMAIL}:{APIKEY}`

5\. To retrieve a flow by ID:

`GET {{site.data.tenant.apiBaseUri}}/v2/flows/{FLOW_ID}`

Below are request parameters:

| **URL Parameter** | **Required** | **Description** |
|---------------|--------------|-----------------|
| `FLOW_ID`      | yes          | Flow ID.        |

**EXAMPLE:**

`curl {{site.data.tenant.apiBaseUri}}/v2/flows/{FLOW_ID} \
   -u {EMAIL}:{APIKEY}`

6\. To retrieve all credentials:

`GET {{site.data.tenant.apiBaseUri}}/v2/credentials?workspace_id={WORKSPACE_ID}/`

Below are request parameters:

| **URL Parameter** | **Required** | **Description** |
|---------------|--------------|-----------------|
| `WORKSPACE_ID`      | yes          | Workspace ID.        |
| `filter[component]`      | no          | Retrieve credentials that belong only to the given component ID.        |

**EXAMPLE:**

`curl {{site.data.tenant.apiBaseUri}}/v2/credentials/?filter[component]={COMPONENT_ID}&workspace_id={WORKSPACE_ID} \
   -u {EMAIL}:{APIKEY} \
   -H 'Accept: application/json'`

7\. Retrieve a credential by ID:

`GET {{site.data.tenant.apiBaseUri}}/v2/credentials/{CREDENTIAL_ID}/`

Below are request parameters:

| **URL Parameter** | **Required** | **Description** |
|---------------|--------------|-----------------|
| `CREDENTIAL_ID`      | yes          | Credential ID.        |

**EXAMPLE:**

`curl {{site.data.tenant.apiBaseUri}}/v2/credentials/{CREDENTIAL_ID}/ \
   -u {EMAIL}:{APIKEY} \
   -H 'Accept: application/json'`

## Related links

- [Contracts and Workspaces](/getting-started/contracts-and-workspaces)
- [Managing user roles in a tenant](/guides/managing-user-roles-in-a-tenant)
- [Integration Flow Overview](/getting-started/integration-flow)
- [Building real-time flows](/guides/realtime-flows)
