---
title: Managing Workspaces  
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

1\.  On the sidebar, click **Add**:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_1.png)

2\.  Enter new workspace name and click **Create**:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_2.png)

3\.  Your new workspace is ready:
![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_3.png)

4\. Alternatively, you can create a new workspace in contracts settings. Click your avatar at the bottom of the navigational menu, and choose **Settings**:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_26.png)

5\. Choose your contract:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_27.png)

6\. In **Workspaces tab**, click **Create New Workspace**:
![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_28.png)

##### To create a workspace via the API, use the following request:

`POST {{apiBaseUri}}/v2/workspaces`

Below are request payload parameters:

| **Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `type`                             | yes          | This parameter should have the value: `workspace` |
| `attributes.name`                  | yes          | Name of the new workspace                         |
| `relationships.contract.data.id`   | yes          | ID of the contract                                |
| `relationships.contract.data.type` | yes          | This parameter should have the value: `contract`  |

**EXAMPLE:**

To create a new workspace called *Integrator 2: Judgement Day*, we will use the
following request:
```
curl {{apiBaseUri}}/v2/workspaces \
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
**NOTE:** Workspace name is limited by usable characters and length. It may contain only letters, digits, whitespaces, `-` and `_` symbols, and be up to 40 symbols long.

## Editing the Workspace

With the right
[permissions](/managing-user-roles-in-a-tenant)
a workspace member can perform workspace management via the
[UI](#1-workspace-management-via-the-ui) or the [API](#2-workspace-management-via-the-api).

##### 1\. Workspace management via the UI
includes adding or inviting new members, managing their workspace [user
roles](/managing-user-roles-in-a-tenant), removing members, renaming and deleting the
workspace. All these actions are done in **Workspace** tab
of the navigational menu:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_6.png)

To add or invite new members to the workspace, click **Add new member** or
**Invite new member**:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_7.png)

For adding new member, select a contract member from the list, assign a user
role in the corresponding menu, and click **Add**:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_8.png)

For inviting a new member, fill in user email address, define contract role and
workspace role, and click **Send Invite**:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_9.png)

Note that only contract members with the corresponding contract
permission will have the option to invite new members to the workspace. You can learn how to assign member roles
[here](/managing-user-roles-in-a-tenant).

To remove members from a workspace, click the corresponding icon on the user
list:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_10.png)

To rename a workspace, click on the corresponding icon or its name:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_35.png)

To delete a workspace, click **Delete workspace**:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_5.png)

##### 2\. Workspace management via the API
includes adding new members, managing their workspace user roles, removing members, renaming the workspace, and deleting the workspace.

To add a new member via the API, use the following request:

`POST {{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members`

Below are request payload parameters:

| **Parameter**      | **Required** | **Description**                                                                  |
|--------------------|--------------|----------------------------------------------------------------------------------|
| `id`                 | yes          | ID of an already registered user, who will be added as a member of the workspace |
| `type`               | yes          | The value should be `member`.                                                      |
| `attributes.roles[]` | yes          | New member roles.                                                                |

**EXAMPLE:**

To add a user with the ID *Elvis* with *King* and *Immortal* roles we will use the following
request:
```
curl {{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members/ \
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

`PATCH {{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members/{USER_ID}/`

Below are request payload parameters:

| **Parameter**      | **Required** | **Description**                                                 |
|--------------------|--------------|-----------------------------------------------------------------|
| `id`                 | yes          | ID of an already registered user, match URL parameter `{USER_ID}` |
| `type`               | yes          | The value must be `member`.                                     |
| `attributes.roles[]` | yes          | Roles.                                                          |

**EXAMPLE:**

To change user roles we will use the following request:
```
curl {{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members/{USER_ID}/ \
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

`DELETE {{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members/{USER_ID}/`

Below are request payload parameters:

| **Parameter** | **Description**                              |
|---------------|----------------------------------------------|
| `WORKSPACE_ID`  | The ID of the Workspace.                     |
| `USER_ID `      | The ID of the user, which requires deletion. |

**EXAMPLE:**
```
curl {{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members/{USER_ID}/ \
    -X DELETE    \
    -u {EMAIL}:{APIKEY}
```

To rename a workspace via the API we will use the following request:

`POST {{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}`

Below are request payload parameters:

| **Parameter** | **Description**                              |
|---------------|----------------------------------------------|
| `type`  | The value must be `workspace`.                    |
| `attributes.name`      | Name of the workspace. |

**EXAMPLE:**
```
curl {{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID} \
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

`DELETE {{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID} \`

Below are request payload parameters:

| **Parameter** | **Description**          |
|---------------|--------------------------|
| `WORKSPACE_ID`  | The ID of the Workspace. |

**EXAMPLE:**
```
curl -i {{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID} \
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

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_11.png)

Alternatively, you can click **Add New Flow** in **Flows**:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_17.png)

2\.  Your new flow is ready. Be sure to name it and write a description, which is optional:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_12.png)

##### To create a flow via the API, use the following request:

`POST {{apiBaseUri}}/v2/flows/`

Below are request payload parameters:

| **Parameter**                     | **Required** | **Description**                                |
|-----------------------------------|--------------|------------------------------------------------|
| `type`                              | yes          | The value must be `flow`.                          |
| `attributes.name`                   | yes          | Flow name.                                     |
| `attributes.type`                   | yes          | Flow type. Value may be:   `ordinary` or  `long_running`                    |
| `attributes.graph`                  | yes          | Flow graph representing component connections. |
| `relationships.workspace.data.id`   | yes          | The ID of the workspace.                       |
| `relationships.workspace.data.type` | yes          | The value must be `workspace`.               |



**EXAMPLE:**
```
curl -X POST {{apiBaseUri}}/v2/flows \
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
            "command":"elasticio/timer:timer@latest",
            "fields":{  
              "interval":"minute"
            }
          },
          {  
            "command":"elasticio/email:send@latest",
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
[permissions](/managing-user-roles-in-a-tenant)
a workspace member can perform flow management via the [UI](#1-flow-management-via-the-ui) or
the [API](#2-flow-management-via-the-api).

##### 1\. Flow management via the UI.
includes the following actions:
toggling type between **Realtime** and
    **Ordinary**, starting and stopping flows, and deleting flows. All your
    flows can be found in **Flows** inside the navigational menu. You can use
    search and filters to find the required flow. To manage the flow, click on
    the flow’s name, in our case – “**Test flow**”:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_14.png)

You will see your flow control page, where you can rename, start, stop, edit,
and delete the flow:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_15.png)

Click **Settings** to access the settings tab where you can toggle flow type:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_16.png)

Flows can be **Realtime** and **Ordinary**. You can find more info about these
types [here](/realtime-flows). You can toggle flow type with the corresponding
switch:

![](/assets/img/tenant-management-guide/managing-workspaces/screenshot_13.png)

##### 2\.  Flow management via the API
includes the following actions:
 [toggling type](#update_flow_api)
    between **Realtime** and **Ordinary**, [starting and
    stopping](#start_stop_api) flows, and deleting flows.

To update flow type or name, we will use the following API request:

`PATCH {{apiBaseUri}}/v2/flows/{FLOW_ID}`

Below are request payload parameters:

| **Parameter**    | **Required** | **Description**                                |
|------------------|--------------|------------------------------------------------|
| `type`             | yes          | The value must be `flow`.                          |
| `id `              | yes          | ID of the flow you want to update.             |
| `attributes.name`  | no           | Flow name.                                     |
| `attributes.type`  | no           | Flow type. Value may be: `ordinary` or `long_running`.                      |
| `attributes.graph` | no           | Flow graph representing component connections. |
| `attributes.cron`  | no           | Cron expression representing flow timing.      |


**EXAMPLE:**
```
curl {{apiBaseUri}}/v2/flows/{FLOW_ID} \
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

`POST {{apiBaseUri}}/v2/flows/{FLOW_ID}/start`

`POST {{apiBaseUri}}/v2/flows/{FLOW_ID}/stop`

As you can see, the only difference between requests is the corresponding
`start` or `stop`.

Below are request payload parameters:

| **Parameter** | **Required** | **Description** |
|---------------|--------------|-----------------|
| `FLOW_ID `      | yes          | Flow ID.        |

**EXAMPLE:**
```
curl {{apiBaseUri}}/v2/flows/{FLOW_ID}/start \
   -X POST \
   -u {EMAIL}:{APIKEY} \
   -H 'Accept: application/json' \
   -H 'Content-Type: application/json'
```

To delete a flow, we will use the following requests:

`DELETE {{apiBaseUri}}/v2/flows/{FLOW_ID}`

Below are request payload parameters:

| **Parameter** | **Required** | **Description** |
|---------------|--------------|-----------------|
| `FLOW_ID `      | yes          | Flow ID.        |

**EXAMPLE:**
```
curl {{apiBaseUri}}/v2/flows/{FLOW_ID} \
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

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_22.png)

2\.  Click **Add New Credential** and fill in the appearing fields. When done,
    click **Verify**:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_19.png)

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_20.png)

3\. After the credential gets verified, click **Save**, which will appear in the place of **Verify**.

4\. Alternatively, you can create credentials when adding components to a flow. In **Flows**, choose the required flow:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_29.png)

5\. Click **Add the initial step** or **edit flow** button, depending on the existence of flow steps:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_30.png)

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_31.png)

6\. Search for your component in the list and click it:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_32.png)  

7\. Click **connect new credentials**:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_34.png)



##### To create new credential via the API, we will use the following API request:

`POST {{apiBaseUri}}/v2/credentials/`

Below are request payload parameters:

| **Parameter**                     | **Required** | **Description**                                                                    |
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
curl {{apiBaseUri}}/v2/credentials/ \
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

![](/assets/img/tenant-management-guide/managing-workspaces/screenshot_x.png)

Click **Edit** and fill in all the required fields. Then click **Verify**, and **Save** after verification:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_23.png)

To delete credentials, choose the required credential in **Credentials**, and
click **Delete**:

![](/assets/img/tenant-management-guide/managing-workspaces/Screenshot_21.png)

##### 2\.  Editing credentials via the API includes updating and deleting credentials.

To update credentials, we will use the following request:

`PATCH {{apiBaseUri}}/v2/credentials/{CREDENTIAL_ID}/`

Below are request payload parameters:

| **Parameter**                 | **Required** | **Description**                                                                                                                                                          |
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
curl {{apiBaseUri}}/v2/credentials/{CREDENTIAL_ID}/ \
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

`DELETE {{apiBaseUri}}/v2/credentials/{CREDENTIAL_ID}/`

Below are request payload parameters:

| **Parameter**     | **Required** | **Description** |
|-------------------|--------------|-----------------|
| `CREDENTIAL_ID` | yes          | Credential ID.  |

**EXAMPLE:**
```
curl {{apiBaseUri}}/v2/credentials/{CREDENTIAL_ID}/ \
   -X DELETE \
   -u {EMAIL}:{APIKEY}
```
## Retrieval Requests
The UI automatically shows you lists of entities (workspaces, users, flows, etc.) in corresponding tabs if you have the corresponding permissions. To see these entities via the API, we will use the following requests. Note, that they will only work for members with the corresponding permissions.

1\. To get workspace by ID:

`GET {{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/`

Below are request payload parameters:

| **Parameter** | **Required** | **Description** |
|---------------|--------------|-----------------|
| `FLOW_ID `      | yes          | Flow ID.        |
| `include `      | no          | Include or full resource objects in response for related entities, or not. Possible values: `members` and/or `invites`.        |

**EXAMPLE:**
```
curl {{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}?include=members,invites \
  -u {EMAIL}:{APIKEY} \
  -H 'Accept: application/json'
  ```
2\. To get user's workspaces:

`GET {{apiBaseUri}}/v2/workspaces?contract_id={CONTRACT_ID}`

Below are request payload parameters:

| **Parameter** | **Required** | **Description** |
|---------------|--------------|-----------------|
| `CONTRACT_ID`      | yes          | Contract ID.        |

**EXAMPLE:**

```
curl {{apiBaseUri}}/v2/workspaces?contract_id={CONTRACT_ID} \
   -u {EMAIL}:{APIKEY} \
   -H 'Accept: application/json'
```
3\. To get workspace member list:

`GET {{apiBaseUri}}/v2/workspaces/{WORKSPACE_ID}/members/`

Below are request payload parameters:

| **Parameter** | **Required** | **Description** |
|---------------|--------------|-----------------|
| `WORKSPACE_ID`      | yes          | Workspace ID.        |

4\. To retrieve all flows in the workspace:

`GET {{apiBaseUri}}/v2/flows/`

Below are request payload parameters:

| **Parameter**                     | **Required** | **Description**                                                                    |
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

`curl '{{apiBaseUri}}/v2/flows?workspace_id=59d341e9037f7200184a408b&page[size]=20&page[number]=1' \
   -g -u {EMAIL}:{APIKEY}`

Filter:

`curl '{{apiBaseUri}}/v2/flows?workspace_id=59d341e9037f7200184a408b&filter[status]=active' \
   -g -u {EMAIL}:{APIKEY}`

Search:

`curl '{{apiBaseUri}}/v2/flows?workspace_id=59d341e9037f7200184a408b&search=webhook' \
   -g -u {EMAIL}:{APIKEY} `

Custom sorting:

`curl '{{apiBaseUri}}/v2/flows?workspace_id=59d341e9037f7200184a408b&sort=-updated_at' \
   -g -u {EMAIL}:{APIKEY}`

5\. To retrieve a flow by ID:

`GET {{apiBaseUri}}/v2/flows/{FLOW_ID}`

Below are request payload parameters:

| **Parameter** | **Required** | **Description** |
|---------------|--------------|-----------------|
| `FLOW_ID`      | yes          | Flow ID.        |

**EXAMPLE:**

`curl {{apiBaseUri}}/v2/flows/{FLOW_ID} \
   -u {EMAIL}:{APIKEY}`

6\. To retrieve all credentials:

GET {{apiBaseUri}}/v2/credentials?workspace_id={WORKSPACE_ID}/

Below are request payload parameters:

| **Parameter** | **Required** | **Description** |
|---------------|--------------|-----------------|
| `WORKSPACE_ID`      | yes          | Workspace ID.        |
| `filter[component]`      | no          | Retrieve credentials that belong only to the given component ID.        |

**EXAMPLE:**

`curl {{apiBaseUri}}/v2/credentials/?filter[component]={COMPONENT_ID}&workspace_id={WORKSPACE_ID} \
   -u {EMAIL}:{APIKEY} \
   -H 'Accept: application/json'`

7\. Retrieve a credential by ID:

`GET {{apiBaseUri}}/v2/credentials/{CREDENTIAL_ID}/`

Below are request payload parameters:

| **Parameter** | **Required** | **Description** |
|---------------|--------------|-----------------|
| `CREDENTIAL_ID`      | yes          | Credential ID.        |

**EXAMPLE:**

`curl {{apiBaseUri}}/v2/credentials/{CREDENTIAL_ID}/ \
   -u {EMAIL}:{APIKEY} \
   -H 'Accept: application/json'`
