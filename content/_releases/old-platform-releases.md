---
title: Archived Platform Release Notes
layout: rel
section: Platform Releases
description: Platform release notes, archived into one big page after 6 month and kept around for the reference.
category: platform-releases
version: (3.17.0 - 3.9.0)
updatedDate: 2020-03-07
redirect_from:
  - /releases/3.9.0.html
  - /releases/3.10.0.html
  - /releases/3.11.0.html
  - /releases/3.12.0.html
  - /releases/3.13.0.html
  - /releases/3.14.0.html
  - /releases/3.15.0.html
  - /releases/3.16.0.html
  - /releases/3.17.0.html
---

## 3.17.0 Release

> Released date: 01 Jul 2019

### New Features

#### Frontend

Credentials management is now way better due to a few tweaks. First of all, you can now edit or delete credentials in the Designer. Secondly, you don't have to verify credentials any more. Of course, verification  protects Flows from invalid credentials. However, we thought that the step should be optional. So now you don't have to spend extra time on credentials verification, if you don't want to. Check the screenshots below to see how this looks in the UI.

- When creating new Credentials:

![](/assets/img/RN/317/Screenshot_1.png)

- when adding new credentials to a Component in a Flow:

![](/assets/img/RN/317/Screenshot_2.png)

Also, we changed the order in step configuration process. Now it goes as follows:

1\. Select the Component

2\. Choose version (optional)

3\. Choose Trigger/Action

3\. Choose credential (or choose Agent, if the Component does not have credentials)


#### Other

Now all Flows will start and stop faster, taking less time between clicking start or stop in the UI, than they did earlier. If you are interested in details, you can find them [here](#other-stuff).

You can now change metadata for your Platform HTML page, like [this](#other-stuff).

Additionally, we tweaked scaling a bit, adjusting the mechanism of graceful platform application scaling. This means you won't get the old deployment/scaling errors.


### Fixed Bugs

- We were totally dedicated to improvements this month, so all the discovered bugs were immediately fixed before going into production.


### Technical Stuff

**WARNING!** Boring technical stuff ahead. Read only if you have to.

#### Frontend stuff

*"Please, configure all steps in order to save the flow"* message replaced with alert. It shows in case of non-configured components in a flow.


#### Other Stuff

So, now the API call is made immediately after you've clicked start/stop. Obviously, this improvement boosts "reaction" time. Additionally, we reduced latency between message emitted in first step by scheduler or Webhooks, and the actual pod start.

To change metadata add the following attributes to
`POST /v2/tenants` and `PATCH /v2/tenants`:

```json
{
  "data":{
    "type":"tenant",
    "attributes":{
      "html_meta":{
        "description":"I am a description",
        "keywords":[ "hotdog", "burger", "sandwich" ],
        "author":"Acme Corporation"
      }
    }
  }
}
```

## 3.16.0 Release

> Released date: 30 May 2019

### New Features

#### Performance Boosts

We have made quite a few performance-related improvements. Apart from general optimization of the platform this means that now *Flows* and *Designer* pages will work much faster. For once, we will not spam you with boring technical details on this one. You will see the difference.


#### Frontend

For your convenience we have set alphabetical ordering for the following:

-	Contracts switcher
-	Components list on *Credentials* page
-	Credentials list of a certain Component
-	Components list in Designer
-	Credentials of a certain Component in Designer
-	Component's functions list in Designer
-	Workspace members list
-	Contract members list
-	Workspaces list on the *Contract details* page
-	Developer Teams list on *Contract details* page
-	Repositories list on *Developer Team* page

Additionally, you can now open links in new tabs. You know, those you couldn't before, like: *Workspace* link in the left navigation bar, *Flow* link in the list of flows, *Next* and *Previous* links in execution log.

Also, some descriptions and messages are now more clear: mapping description for array mapping, limited Workspace text, etc. Some details [here](#frontend-stuff), if you require.

*Content-Based Router* component now shows branch setup directly after component selection on the first step.


#### Other

You can now filter data samples by ID in API endpoint `GET /v2/data-samples?filter[id]=id1,id2,..,idN`
An example is [here](#other-stuff).

If you're using *Content-Based Router* component, you'd be glad to know that it can now access passthrough.
**NOTE:** The new version of [Content-Based Router component](https://github.com/elasticio/router-component) needs to be applied to your installation.
Details [here](#other-stuff).

In the following gendry migration `2019-05-16-set-task-last-start-time.js` add `flow.lastStartTime` where it's not set. This is essential for the new functionality.


### Fixed Bugs

- Flows older than 1.5 years don't block Contract deletion any more, provided you run gendry migration `2019-05-02-set-task-currentStatus-for-deleted-status.js`

- Uppercase letters in Service Account username do not break login process anymore.


### Technical Stuff

**WARNING!** Boring technical stuff ahead. Read only if you have to.

#### Frontend stuff

*"Please, configure all steps in order to save the flow"* message replaced with alert. It shows in case of non-configured components in a flow.


#### Other Stuff

**FILTERING EXAMPLE:**

```
curl {{site.data.tenant.apiBaseUri}}/v2/data-samples?filter[id]={DATASAMPLE_ID1},{DATASAMPLE_ID2} \
  -u {EMAIL}:{APIKEY} \
  -H 'Accept: application/json'
```

**EXAMPLE FOR CBR PASSTHROUGH:**

 Let's say that the first step of flow returns the following data in the sample:

```json
{
  "fireTime": "2634-02-27T12:50:29.603Z",
  "lastPoll": "2840-04-29T18:20:58.174Z"
}
```

If you want these values to be evaluated please use the following expressions:
`elasticio."step_1".body.fireTime` or `elasticio."step_1".body.lastPoll`


## 3.15.0 Release

> Released date: 25 Apr 2019

### New Features

#### Full and Limited Workspaces

Now there are two types of workspaces: `full` and `limited`. `Full` workspaces are well-known to you, so `limited` type is the new thing. Basically, in `limited` workspaces the workflows are set to stop automatically after a certain time period.

![](/assets/img/getting-started/contracts-and-workspaces/Screenshot_2.png)

`Limited` workspaces are mainly meant for trial periods. Check out more info about them [here](/getting-started/contracts-and-workspaces). By default, your workspaces will be `full`. Here are some more [technical details](#full-and-limited-workspaces-stuff) for those interested.



#### Contracts and Workspaces

There will be no more "stray" contracts, meaning that any contract will always have an Owner. The first member of a contract will automatically be assigned the role of Owner. Also, you cannot just leave the contract without "administration". If you're the last member, you can either delete the contract or terminate your account from the platform. As a general rule, if the last member is removed from the contract, the contract is deleted automatically. Check out the [technical details](#contracts-and-workspaces-stuff).

You can now rename workspaces in the UI. That is, if you have the right [permission](/guides/managing-user-roles-in-a-tenant), of course.

![](/assets/img/tenant-management-guide/managing-workspaces/rename-workspace.png)

As a casual improvement, you can now enjoy optimized internal [resource management](#contracts-and-workspaces-stuff) in contracts.


#### Other

All in all, we've made a few minor additions to improve performance. For example, we removed an entire tier of overhead by using pods instead of jobs for flows. While performance gain is not huge, all actions (retrieve sample, start/stop flow, etc.) are now faster, and this effect is cumulative.

Also, now user registration process is optimized. It works via
API calls instead of directly via Database, which is generally better and more secure.

You can find details [here](#other-stuff).


### Fixed Bugs

-  We updated JSONata versions used in the platform to `1.6.3`, so all associated processes will go smoothly. Don't forget to update mapper, router and JSONata-transform.


### Technical Stuff

**WARNING!** Boring technical stuff ahead. Read only if you have to.

#### Full and Limited Workspaces Stuff

To define `full` type as default, set `tenant.defaultWorkspaceType` to `full`.

There is a new *Wiper* script that handles limited workspaces. It is a job `stop-limited-flows` that periodically stops flows in limited workspaces. Also, we implemented a new API endpoint for *Wiper* to get flows that have to be stopped in limited workspaces. The response consists of an array of IDs of flows that require stopping. You can modify the TTL (Time to Live) of the limited flows by using the environment variable `LIMITED_WORKSPACE_FLOW_TTL_IN_MINUTES`. The default value is `10 minutes`.

The *Wiper* job `suspend-tasks-with-failing-containers` will stop failed flows in limited workspaces, instead of suspending them, as it does in the full workspaces.

#### Contracts and Workspaces Stuff

A user without owner role will not be added to empty contract via `POST /v2/:contract_id/invites` or `POST /v2/:contract_id/members` by default.
`POST /v2/contracts/:contract_id/members` will return `409` if contract has no members and `payload.role` doesn't contain owner.
`POST /v2/contracts/:contract_id/invites` will return `409` if contract has no members and `payload.role` doesn't contain owner.

To disable this effect you need to set environment variable `DISABLE_CONTRACT_MUST_HAVE_OWNER` to `"true"` into secret. After that it is possible to add member without owner role to empty contract.

**EXAMPLE:**
```
{
    "DISABLE_CONTRACT_MUST_HAVE_OWNER": "true"
}
```
**Note:** because of environment variables processing, the value `false` is being converted into a string (`"false"`) and considered as truthy value. In order to set the behavior back to defaults, it is better to remove this environment variable from the secret at all.

**To not create the default workspace**

The default Workspace won't be created in the following cases:

  1\. `POST` new member into the Contract.

  2\. Redeeming an invite.

  3\. New user registration.

  The page with **Create New Workspace** button will appear instead.

#### Other Stuff

Added/changed environment variables that control CPU and memory requests/limits.
Make sure the following environment variables are set:
```
COMPONENT_MEM_DEFAULT=256
COMPONENT_MEM_DEFAULT_LIMIT=256
COMPONENT_MEM_JAVA=512
COMPONENT_MEM_JAVA_LIMIT=512
COMPONENT_CPU=0.1
COMPONENT_CPU_LIMIT=1
```
All new pods in k8s are started with `ImagePullPolicy: IfNotPresent`.

*Reset snapshot* function is disabled while the flow is running. You can reset snapshot only when the flow is stopped.


## 3.14.0 Release

> Released date: 04 Apr 2019

This document presents release notes for our platform version 3.14.0. It
contains the following sections:

### New Features

#### *OAuth*

-   Introduced API endpoints for OAuth clients. Oauth client entity contains
    client ID and client secret for OAuth authorization. Find more info on OAuth clients [here](/guides/managing-oauth-clients).

-   Oauth client is defined in tenant per component. There may be several OAuth
    clients in different tenants for same component. **Note**: since OAuth
    client belongs to tenant, tenant removal means OAuth clients removal for
    this tenant.

-   In case a component was removed or hidden due to access change, OAuth client
    remains. However, no information about component is attached in responses.

-   Accessibility is calculated on tenant basis. So global components are
    recognized as accessible. If component tenant matches OAuth client tenant,
    components with `tenant` and `team` accesses are also recognized as
    accessible.

-   Blocked the ability to delete an OAuth client, which is used in the flow (or draft, or version).

-   Global OAuth components don't appear in `GET /v2/components` response until a Tenant Admin creates an OAuth Client for them.

-   Set OAuth client related environment variables on each step execution.

-   Reworked OAuth code of Frontend to get tenant-specific OAuth parameters from OAuth
    clients API. New service account is introduced. It's used by frontend to
    communicate with API. Login + pass pair is defined with the new environment variables:

     `FRONTEND_SERVICE_ACCOUNT_USERNAME`

     `FRONTEND_SERVICE_ACCOUNT_PASSWORD`.

     You should generate it any way you like (e.g. `pwgen -n 15 -y`) At this moment only `tenants.oauth_client.get` permission is granted to frontend service account.


#### *UI*

-   Number of workspaces shown on the left menu is now limited by browser
    height.

-   Added tooltips to the **Plus** button starting from the second step of the
    flow. *"Add the initial trigger"* and *"Add a new action"* hints.

-   Added tooltip explaining why the user cannot publish a draft. *"Please
    complete all steps first"* message is displayed next to the Publish Draft
    icon.

-   Changed tooltip for **Create Draft** button to *"Edit Flow"*.
    **Note:** changes will not affect the flow until you publish edited draft message is now
    appeared.

#### *Other*

-  All numeric log object properties are converted to strings to avoid the following Graylog parsing errors:
`{"type":"mapper_parsing_exception","reason":"failed to parse
[err_code]","caused_by":{"type":"number_format_exception","reason":"For
input string: \"string\""}}` for platform apps logs.

-   To avoid `MapperParsingException[failed to parse [err_code]]; nested:
    NumberFormatException[For input string: "INVALID_PARAM"]`. Parsing JSON of
    components' log messages removed from Graylog input and is done in-place on
    frontend.
    Deployment instructions: Remove all extractors for Graylog GEL input
    named `"Input for flow steps and one-time execs"`. This should be done after
    instructions for Route platform app logs to own `GELF input -> stream ->
    index`.

-   Removed `contract.membership.edit` permission from `contract.admin` role. So
    that he/she could not change roles of Contract members.

-   New input field type RegExp (Regular Expression). Field object in
    *component.json* should have the next property in order to validate it as a
    regular expression field `"type": "regexp"`.

-   All wiper Cron job descriptors were changed - `“startingDeadlineSeconds”: 200` added.

-   Tenant admin can now include the custom *.js* and *.css* files in order
    to be able to change the behavior/appearance of the platform. Tenant model
    needs to accept the following new properties:

```
"customStylesheets": [
  {"href": "http://path-to-1.css"},
  {"href": "http://path-to-2.css"},
  ...
],
"customScripts": [
  {"src": "http://path-to-1.js"},
  {"src": "http://path-to-2.js"},
  ...
]
```


-   Workspace owner can rename workspace via API request.

-   Implemented statistics collector for one-time-executions.

-   CSS improved for custom tenant styles.

-   Unused samples will be deleted after choosing the definite sample.

-   Route platform app logs to own GELF input -\> stream -\> index. Added
    ability to send log messages of flow steps and one-time-execs (verify
    credentials, dynamic metadata, dynamic select model) to separate GELF input
    in Graylog. This allows applying own extractors configuration and logs
    records retention policies.

**Deployment instructions:**

BEFORE DEPLOYMENT:

• Save following *.json* as file and import as Graylog content pack

```
{"name":"{name} v3.14.0 update","description":"{name} v3.14.0
update","category":"{name}","inputs":[{"id":"5c641c5346bf4004e61835b5","title":"Input
for flow steps and one-time
execs","configuration":{"override_source":"eio-exec","recv_buffer_size":262144,"bind_address":"0.0.0.0","port":12202,"decompress_size_limit":8388608},"static_fields":{},"type":"org.graylog2.inputs.gelf.udp.GELFUDPInput","global":true,"extractors":[{"title":"message_cut","type":"REGEX_REPLACE","cursor_strategy":"COPY","target_field":"message","source_field":"message","configuration":{"replacement":"$1","regex":"^(.{0,524288}).*$"},"converters":[],"condition_type":"NONE","condition_value":"","order":0},{"title":"JSON","type":"JSON","cursor_strategy":"COPY","target_field":"message","source_field":"message","configuration":{"flatten":false,"key_separator":".","list_separator":",
","kv_separator":"="},"converters":[],"condition_type":"STRING","condition_value":"level","order":1},{"title":"K8S
Fluentd","type":"JSON","cursor_strategy":"COPY","target_field":"","source_field":"log","configuration":{"flatten":true,"list_separator":",
","kv_separator":"=","key_prefix":"","key_separator":"_","replace_key_whitespace":false,"key_whitespace_replacement":"_"},"converters":[],"condition_type":"NONE","condition_value":"","order":2}]}],"streams":[{"id":"5c641bc646bf4004e61830e1","title":"Flow
steps and one-time execs stream","description":"Logs from flow steps and
one-time execs
input","disabled":false,"matching_type":"AND","stream_rules":[{"type":"EXACT","field":"source","value":"eio-exec","inverted":false,"description":""},{"type":"EXACT","field":"source","value":"eio-exec","inverted":false,"description":""}],"outputs":[],"default_stream":false}],"outputs":[],"dashboards":[],"grok_patterns":[{"name":"BASE10NUM","pattern":"(?<![0-9.+-])(?>[+-]?(?:(?:[0-9]+(?:\\.[0-9]+)?)|(?:\\.[0-9]+)))"}],"lookup_tables":[],"lookup_caches":[],"lookup_data_adapters":[]}
```

• Apply content from imported {name} v3.14.0 update content pack named
*"Elasticio execs"*

• Start Stream *"Flow steps and one-time execs stream”*

• Make sure udp port 12202 is not blocked by firewall on graylog

• Set GELF_PORT_EIO_EXEC environment variable to 12202 for eio-fluentd Daemon Set

**End of Instructions**


### Fixed Bugs


-  **FIXED** excessively long text in Configure input section is overlaid table border in
    retrieved sample.

-  **FIXED** broken API docs start page when there is no slash at the end of the URL.
    /docs/v2/ is the new start page now.



## 3.13.0 Release

> Released date: 28 Feb 2019

### New Features:

- #### As contract owner I must not be able to leave the contract if I'm the only owner.
At least one Owner should be left in the Contract which contains more than one user.

- #### New API endpoint for granting Tenant Admin rights to users.
User with tenants.membership.edit permission can grant/remove Tenant Admin's permissions to/from the user. See [API documentation]({{site.data.tenant.apiBaseUri}}/docs/v2/#granting-tenant-admin's-permissions-to-the-user) for more information.

- #### Contract and workspace Owners are able to manage their own roles.
Contract and workspace Owners are able to add new role from the list of available roles and remove any role except Owner role from themselves.

- #### Migrate Contract Owner role permissions.
Permissions ```contracts.repository.edit``` and ```contracts.devTeam.edit``` are removed from Contract Owner role. The Admin role is assigned automatically to all users, that currently have Owner role.

- #### Role Contract Owner can't be removable from a Contract using contract.available_roles.
If ```available_roles``` is not empty – it always will contain Contract Owner role (this item is pasted by API implicitly).

- #### Hints regarding the usage of JSONata in the mapping tool.
We implemented hint box which explains that JSONata is used as mapping languages and provides some minimale examples.

- #### The message with requirements for user's password is changed.
We provided more clear explanation for password requirements.

- #### *Wiper* should use a service account.
Service account was added for *wiper*. Several API endpoints allow performing a request with Service Account API-Key. The *Wiper* uses a Service Account credential for an API referring.
A new ```workspaces.workspace.finish_delete``` permission was introduced.

- #### Allow creating tenants without certificates.
Now a Tenant can be created without utilizing domain certificates.

- #### Remove all subtitles on the pages.

- #### Introduce the Tenant Admin role and its permissions in the tenant's scope.

- #### As a Contract Owner I want to be able to rename my contract within the API.
There are two new permission sets for the contract's scope: ```contracts.contract.edit``` and ```contracts.contract.edit_available_roles```
    - the ```contracts.contract.edit``` permission is assigned to all of the contract owners during migration. It allows editing anything except the ```available_roles```. Otherwise, an appropriate error will appear.
    - the ```contracts.contract.edit_avaialble_roles``` permission allows editing anything in the contract, including the available roles.

- #### As the Contract Owner I want to be able to rename my contract within the UI.
To be able to rename the contract, click the *Edit Contract Data* button and the necessary form will appear.

- #### Create a simple tenant delete API endpoint.
The endpoint deletes the tenant only in case it does not contain any contracts.

- #### Introducing roles and permissions for the Service Accounts.
An internal issue implemented for:
    - assigning roles and permissions to Service Accounts, to limit its access;
    - making it possible for the Service Account utilizing these commonly used endpoints ("first-class" endpoints available for users): ```/v2/tenants```,```/v2/contracts```, ```/v2/users```;
    - unifying code that controls what is "allowed/not allowed" in the endpoints. That was made to differentiate the Service Accounts and grant the necessary privileges.

- #### Introducing 4 new environment variables to run migrations.
Please be aware that the introduced variables are allowed for editing/customizing during the platform's life cycle. Nevertheless, it is required for running the *gendry* job once the changes have been made, and immediately restarting all the services that are using the login+password (the ```appdirect``` and ```handmaiden```) combination.

> Please note, do not use the underscore symbol ```_``` in your login & password credentials. The ```NGINX``` web server fails to handle it correctly, as it is being transferred within the HTTP headers.

The environment variables are a combination of login & password pairs for such Service Accounts as the ```handmaiden``` (tenant-operator) and ```appdirect``` (integration service):

1. *The tenant-operator (aka ```handmaiden```) is a special service that maintains ingresses to be aligned with tenants.*

    1.1. The ```TENANT_OPERATOR_SERVICE_ACCOUNT_USERNAME``` variable should contain a login for the tenant-operator.

    1.2. The ```TENANT_OPERATOR_SERVICE_ACCOUNT_PASSWORD``` variable should contain (any string) a password. Can be generated by the following command ```pwgen -ny 15```.

2. *The service account for ```appdirect``` integration service.* Different versions of this service are being used for:
    * the ```Tenant Admin``` account;
    * shared ```SERVICE_ACCOUNT```.

    2.1. The ```APPDIRECT_SERVICE_ACCOUNT_USERNAME``` variable should contain a login for the ```appdirect``` integration service.

    2.2. The ```APPDIRECT_SERVICE_ACCOUNT_PASSWORD``` variable should contain (any string) a password. Can be generated by the following command ```pwgen -ny 15```.

- #### Add unique to toJSONv2.
This is an internal issue that refers to query optimization for a Mongo-related database. It solves the following problem: the frontend was not able to load a list of tasks from the API due to significant excessive load on the *MongoDB* server.

- #### Making certificates management more flexible.
Introduced a new method to store the custom certificates that are being provided for the tenants. From now on, the user can upload certificates for the tenant and provide them with a reference right in the tenant's configuration.
A new environment variable ```CERTIFICATE_STORE_ENCRYPTION_PASSWORD``` was added. It is a password that is used to generate a key for encrypting or decrypting a certificate. There are no restrictions or limitations on how to generate one.

### Fixed Bugs:
- #### Where some symbols were not considered as special in password rules.
The next symbols are considered as special ```~!@#$%^&*()_+-,.<>?/`|;:'[]=```
- #### Where “Find property” search filed was missing in the mapper’s dropdown lists.
- #### Custom certificates now will be deleted along with Tenant they belong to.
- #### Where not all the logs are visible within the UI while some of the components generate a lot of data.
We introduced pagination in the logs panel.
- #### Where it was possible to be blocked in the samples retrieval step.
The first incoming sample is set by default.
- #### Where unnecessary icon appeared once expanding a form in the "Configure" input section.


## 3.12.0 Release

> Released date: 31 Jan 2019

### New Features:

#### Master API key gets better protection in our UI.

Instead of displaying the API key as it is, we replaced it with asterisk symbols. It is displayed as some `******` sings with a Copy button that appears on hover.
The API key is hidden on the User Profile page and Implement Flow tab. The last 4 digits are visible.
Just click the necessary text field to be able to copy the API key, Usage example curl, and Flow values into a clipboard.

#### Set a secure attribute on cookies.

In case a session is secured utilizing TLS, the web application has to set the "secure" attribute into the sessions cookies.
Purpose: The "secure" attribute prevents the browser from sending cookies without encryption. For example, it may happen if some part of a web application contents is not encrypted. However, it can also occur throughout an active attack in which an attacker injects or presents unencrypted links or references.
We set 3 types of cookies that have to be secure now:
- `connect.sid` - session cookie;
- `elastic_remember` - "remember me" cookie;
- `last-contract` - saves a recently used contract.

#### Password requirements for a new user.

In case a password is used as an authentication attribute, it should contain not less than 8 characters and should also include the following elements: upper and lower case letters, numbers, and special characters. Registered users can still log in without any problems, even if their passwords do not meet the requirements above.
Allowed symbols:
- latin alphabet (upper and lower case);
- digits 0-9;
- special symbols ```~!@#$%^&*()_+-,.<>?/`|;:'[]=```

#### As the Contract Admin, I want to invite users to contract and workspace in one click right on the Contract Page.

Now, the Contract Admin is allowed to invite other users to a workspace and a contract simultaneously on the Contract Page.

#### Invite to a Contract and a Workspace in one click.

Now, the Contract Admin is allowed inviting any other user to a workspace and a contract simultaneously right on the Workspace Page.

#### Extend driver events to have a purpose message from a Pod's container status.

Common issues related to running steps inside a flow are reflected in the `runlog`. For example, the `Out of Memory` issue will be addressed as *"Component run out of memory and terminated."* This approach can help with improving an overall debugging procedure.

#### Check roles usage in the `/v2/tenant/:id/roles`.

An additional verifications were added for changing roles procedure in the Tenant:

* It is restricted to remove a role from the "Tenant-policy" if any user/contract utilizes it.
* In case the role has to be removed from the "Tenant-policy", but one of the `contract.availableRoles` is still using it, the `409` error code will be returned.

#### Removing pending invites for `contract.availableRoles` and `tenantPolicy.roles`.

All the pending invites made with an already removed role from the Contract or Tenant will be deleted.



### Bug Fixes:

- **JSONata expression evaluation blocks the UI.**

- **The *Transformation* component was freezing while processing a significant amount of data.**

- **All the Components with optional *Developer Mode* tab received a new *Evaluate* button.**

- **The *Transformation* component has also received the *Evaluate* button.**

- **Retrieving a *Mapping Result*.**

  To be able to retrieve a *Mapping Result* for *Transformation* component navigate to the *Configure Input* section paste the necessary expression into the text field and click *Evaluate*. While mapping is running in the background, the animated wheel icon appears. It indicates that everything is working fine and the page did not get stuck.

- **The `POST v2/users` endpoint is no longer accepting the `relationships.contracts` in the body request.**

  This endpoint was changed: the section relation was removed. Now, the user is being created out of the contract's scope. The following means that he is not allowed to log into our platform. Therefore, this user has to be added to one of the contracts utilizing [Add a new member to the Contract's scope]({{site.data.tenant.apiBaseUri}}/docs/v2/#add-a-new-member-to-the-contract's-scope)

- **The `Out of Memory` record was not represented in the `stderr` file.**

- **Component search in the "Designer" is broken.**

- **I cannot utilize components on Frontend within the existed Revision, even if components are in the different contracts/teams.**

- **It is impossible to remove the user in case if he is a member of more than one contract.**

- **Permission assignment for OWNER role is static.**

  The *Contract Owner* role is not required for the Contract. Now in case a contract is being created without an explicit *Contract Owner* role in the `available_roles` this role will not be added automatically.

- **User cannot delete his account in case a Contract does not have a user with the contract-owner role.**

  Now the user with the *Contract Owner* role cannot perform a permanent deletion his/her account in case there is no other *Contract Owner* left in a particular Contract. For the other contract roles delete users account function available without any checks.


## 3.11.0 Release

> Released date: 11 Jan 2019

### New Features:

#### The support widget, if enabled, has been moved under the "Help" tab.
To contact our support team, please click the Profile's Avatar (round icon) button in a lower left corner and select the "Help" menu item from the list.

#### As a contract Admin, I want to be able to see all workspaces in my contract.
The list of all Contracts' Workspaces is shown for the Contract Admin under the Workspaces tab on the Contract's settings page.

#### Introduced msg/size policies for local agent queues in the RabbitMQ.
The limits depend on environment variables `RABBITMQ_MAX_MESSAGES_PER_QUEUE` (default is 10000) and `RABBITMQ_MAX_MESSAGES_MBYTES_PER_QUEUE` (default is 100 MB). The actual values (for local agent queues) are divided by 10. Therefore the local agent queues are under limits 1000 and 10MB by default.

#### The REST endpoints have been implemented.
In regards to a flexible "Role Model" we added the following API endpoints:
- [Get Tenant’s roles]({{site.data.tenant.apiBaseUri}}/docs/v2/#get-tenant's-roles)
- [Update Tenant’s roles]({{site.data.tenant.apiBaseUri}}/docs/v2/#update-tenant's-roles)
- [Get the list of available permissions]({{site.data.tenant.apiBaseUri}}/docs/v2/#get-the-list-of-available-permissions)

#### Added a new label for marking depreciated or backward incompatible components' changes.
By deprecation, we mean publishing a new component's version without any changes to it. You mark an entire component or its triggers/actions as deprecated. These deprecation messages are shown in the UI.

#### The endpoint for getting roles per contract was introduced.
Endpoint [Get the Contract’s roles]({{site.data.tenant.apiBaseUri}}/docs/v2/#get-the-contract's-roles) returns all the roles that were assigned to the corresponding contract.

#### Frontend should support multiple user roles.
The multiple user roles are now correctly displayed on the Frontend. Roles' actions to handle: view, assign, remove a particular role.

It means you can assign several Roles to a User while inviting him to a Contract or Workspace. You can also edit (reassign/unassign) Roles for already existing Users.

#### API accepts multiple User Roles.
The API User is now able to assign multiple roles to a regular user. The GET endpoints should return multiple roles as well.
To be able to assign several Roles to a User the `{"role":"admin"}` object has to be replaced with the `{"roles":["admin"]}` array. Please see the API Documentation for more details.

#### Reworked the output format for the *Get the list of available permissions* endpoint.
Stringified the Scope->Object->Action permissions hierarchy into the `${scope}/${object}/${action}` string for the following endpoints:
- [Get the list of available permissions]({{site.data.tenant.apiBaseUri}}/docs/v2/#get-the-list-of-available-permissions)
- [Get Tenant’s roles]({{site.data.tenant.apiBaseUri}}/docs/v2/#get-tenant's-roles) and [Update Tenant’s roles]({{site.data.tenant.apiBaseUri}}/docs/v2/#update-tenant's-roles)
- [Get the Contract’s roles]({{site.data.tenant.apiBaseUri}}/docs/v2/#get-the-contract's-roles)

Renamed TASK to FLOW, ORGANIZATION to WORKSPACE, ACCOUNT to CREDENTIALS everywhere in the System.

#### Migration: Admin to Owner.
Now there are two default non-deletable roles in the System, such as the Contract Owner, and the Workspace Owner. All the existing Admins (Contract and Workspace) will be turned to an Owners (database migration).

#### Dynamic User Roles support on the Frontend.
Frontend retrieves an available roles' list from the [Get the Contract’s roles]({{site.data.tenant.apiBaseUri}}/docs/v2/#get-the-contract's-roles) endpoint, instead of using a hardcoded list.

#### Migration: provide default roles (policies) for tenants.
The System uses per-tenant policies.

Please be informed that our internal system service Gendry installs non-deletable roles (Contract Owner and Workspace Owner) only. The migration service for installing the default roles (Contract Admin, Member, Workspace Admin, Integrator, Guest) was created.

Please also be aware that all the predefined System's Roles have an additional `isDefault` field that accepts boolean values only. By default, it is set to true. Once a user initiates changes/edits to any of the Roles' permissions, the `isDefault` will be set to false. This does not apply to the Owners' Roles.

#### The custom API for assigning a subset of the Tenant Roles to the contract.

##### Requirements:

- configuring contract to have the only subset of roles from its tenant
- it is possible to get a list of visible roles
- API should restrict granting an invisible role to a user
- the only roles configured in tenant policy can be enabled in contract
- the tenantAdmin and service account (appdirect) change this behavior

##### API modification:

Introduced new attribute `available_roles` in the following endpoints:
- [Get Contract by Id]({{site.data.tenant.apiBaseUri}}/docs/v2/#get-contract-by-id) allow to retrieve `available_roles`
- [Create a Contract]({{site.data.tenant.apiBaseUri}}/docs/v2/#create-a-contract) allow to assign `available_roles`
- [Update a Contract]({{site.data.tenant.apiBaseUri}}/docs/v2/#update-a-contract) allow to update `available_roles`

Example:

```json
{
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
```

An empty array means "no available roles behavior" – all tenant roles are available. If `available_roles` is not empty – it always contains two non-deletable roles (Contract Owner and Workspace Owner), those items are pasted by API implicitly.
This request authorizes only for `tenant-admin`.
To "reset available roles" – a client has to assign an empty array:

```json
{
  "attributes":{
     "available_roles":[]
  }
}
```

#### Open [GET the list of available permissions]({{site.data.tenant.apiBaseUri}}/docs/v2/#get-the-list-of-available-permissions).
This endpoint is now available to all the platforms' users.

#### Make `workspace_id` required in the Scheduled Executions endpoints.
Endpoints [Verify credentials]({{site.data.tenant.apiBaseUri}}/docs/v2/#verify-credentials), [Retrieve component’s metamodel]({{site.data.tenant.apiBaseUri}}/docs/v2/#retrieve-component's-metamodel) and [Retrieve component’s select model]({{site.data.tenant.apiBaseUri}}/docs/v2/#retrieve-component's-select-model) return `400 Bad Request` in case of absent relation with workspace.

#### It is possible to suspend a contract:
Suspending a contract possibility. The following endpoints were implemented:
- [Suspend Contract]({{site.data.tenant.apiBaseUri}}/docs/v2/#suspend-contract)
- [Unsuspend Contract]({{site.data.tenant.apiBaseUri}}/docs/v2/#unsuspend-contract)

When a contract is suspended:
- users can log in
- users cannot start flows
- users cannot retrieve samples
- users cannot verify credentials => can't create or edit credentials
- users cannot retrieve dynamic metadata
- users cannot retrieve dynamic dropdown models
- users cannot request agents
- existing agents are "logged off"
- users cannot push components
- users can delete their data (Flows, Creds, Workspaces, etc.)
- users cannot create new components, workspaces
- all flows will be stopped (not suspended)


##### API endpoints

- [Suspend Contract]({{site.data.tenant.apiBaseUri}}/docs/v2/#suspend-contract). Marks contract as suspended. Allowed only for `active` contracts.
- [Unsuspend Contract]({{site.data.tenant.apiBaseUri}}/docs/v2/#unsuspend-contract). Allowed only for `suspended` contracts.
- The new attribute `status` is added to the next endpoints: [Get Contracts]({{ api_base_url }}/docs/v2/#get-contracts) and [Get Contract by Id]({{site.data.tenant.apiBaseUri}}/docs/v2/#get-contract-by-id). May have three values `active`, `suspended`, `suspending`.

##### Auth

* New endpoints are allowed to use only by `SystemAccounts`.
* Old/Outdated endpoints ([Get Contracts]({{site.data.tenant.apiBaseUri}}/docs/v2/#get-contracts) and [Get Contract by Id]({{site.data.tenant.apiBaseUri}}/docs/v2/#get-contract-by-id)) work with the same authorization rules, as always. A new attribute was added. It is always visible.

##### Release process

This issue introduces migration and requires to configure 2 environment variables `WIPER_SERVICE_ACCOUNT_USERNAME`  and `WIPER_SERVICE_ACCOUNT_PASSWORD`.
Environment variables names are quite self-explanatory: login and password for system account used by the Wiper to finalize contract suspension.
Username has to be chosen in some sensible way like `wiper`. The password may be any random string. To generate `pwgen` may be used: `pwgen -n -y -s  15`.
Migration installs this service account into mongo to make it possible for API to authorize client that uses `WIPER_SERVICE_ACCOUNT_USERNAME` and  `WIPER_SERVICE_ACCOUNT_PASSWORD`.

#### Support suspended contracts on the frontend.
The warning message *"This contract has been suspended. Please, contact the support team for more information."* is shown on the contact page. This way it is more obvious that the contract was suspended. All the buttons that are responsible for creating/editing any entities were hidden.


### Bug Fixes:

#### Valid step is displayed as broken.

## 3.10.0 Release

> Released date: 29 Nov 2018

### New Features

* Introduced an experimental feature, such as `keen flows`. All steps of the Keen's flow launch simultaneously as the flow starts and continue running until the flow's status changes to `sleeping`.
* Introduced the UI's option for defining the `CRON`'s expression to schedule flow's executions. This functionality is available under the `Settings` tab on the `Designer` page.
* Made the Node.js SDK for proper RabbitMQ's disconnection. In case, one of the RabbitMQ's instances fails or reports errors, the Node.js process terminates immediately and then restarts by the Platform's orchestrator. Thus the process can reconnect to the already running RabbitMQ's instance.
* The `workspace_id` and `workspace_role` were added as optional attributes to the `POST /v2/contracts/:id/invites` endpoint. In case the `workspace_id` has already been provided, then the `workspace_role` will be required.

### Fixed Bugs

* You can't delete any of the security credentials, while it is used in at least one Integration flow.



## 3.9.0 Release

> Released date: 28 Nov 2018

### New Features

* Now the REST API allows a 'Contract Owner' retrieving any details of the Workspace he is in charge of, using the `/v2/workspaces/:id` endpoint request.

### Improvements

* Updated the error messages on the password recovery page.

### Fixed Bugs

* Expression tooltip in the mapper UI is now flashing when hovered with the mouse.
