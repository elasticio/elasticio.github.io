---
title: Email Templates
description: This document provides a list of our platform's outgoing email messages and the conditions that trigger each message.
layout: article
category: platform-emails
---

{: .no_toc}

{{page.description}} We list all [obsolete templates](#obsolete-templates) that
are not available anymore.

Note that you can disable any of these emails for an individual Tenant. The
[email configuration page](configuration) explains how.

## Agent Request

Template name: `agent-request` - **Soon to be deprecated.**

This message is sent out in case a local agent is requested. By default, the email
is sent to support address or any address specified in the `AGENT_REQUESTS_EMAIL`
variable which is configurable in each tenant.

To trigger the message, follow these steps:

1.  Go to *Agents* page
2.  Click *Request an agent* button
3.  Fill `Name` and `Description` for your agent
4.  Click *Next*.

On the execution of step 4, an email will be sent to the specified address.

<details close markdown="block">
<summary>
Click to expand the template which Raven is using:
</summary>

{% raw %}
```json
{
    "html": "htmlstring",
    "subject": "Agent request from {{{ORGANIZATION}}}",
    "global_merge_vars": [
        {
            "name": "SUBJECT",
            "content": "Agent request from {{ORGANIZATION}}"
        },
        {
            "name": "COMPANY",
            "content": "elastic.io GmbH"
        },
        {
            "name": "USER",
            "content": "TEST"
        },
        {
            "name": "ORGANIZATION",
            "content": "TEST"
        },
        {
            "name": "AGENT_TITLE",
            "content": "TEST"
        },
        {
            "name": "AGENT_DESCRIPTION",
            "content": "TEST"
        },
        {
            "name": "AGENT_ID",
            "content": "TEST"
        }
    ]
}
```
{% endraw %}

</details>

Table below summarizes the variables:

| Variable name     | Example                  | Description                    |
|:-----------------:|:------------------------:|:------------------------------:|
| USER              | Elvis Presley               | user's firstname and last name |
| USER_EMAIL        | bond@gmail.com           | user email                     |
| ORGANIZATION      | Org                      | organization name              |
| ORGANIZATION_ID   | 5ae5cc0121758047ebeb2547 | organization id                |
| AGENT_ID          | 5ae5cc0121758047ebeb2547 | agent id                       |
| AGENT_TITLE       | TEST                     | agent title                    |
| AGENT_DESCRIPTION | TEST                     | agent description              |


## Invite User to Empty Contract

Template name: `contract-invite-empty-contract`

This message is sent out to an existing platform user when they are added to a
Contract as the first user.

To trigger the message, make API-call `POST v2/contracts/{{contract_id}}/invites`
for a contract, which has no members yet. The invited user will receive a
corresponding email.

<details close markdown="block">
<summary>
Click to expand the template which Raven is using:
</summary>
{% raw %}
```json
{
    "html": "htmlTemplate",
    "subject": "Invitation to join contract {{{CONTRACT}}} at {{{COMPANY}}}",
    "global_merge_vars": [
        {
            "name": "SUBJECT",
            "content": "Invitation to join contract {{CONTRACT}} at {{COMPANY}}"
        },
        {
            "name": "COMPANY",
            "content": "elastic.io GmbH"
        },
        {
            "name": "NAME",
            "content": "TEST"
        },
        {
            "name": "CONTRACT",
            "content": "TEST"
        },
        {
            "name": "CODE",
            "content": "code"
        }
    ]
}
```
{% endraw %}

</details>

| Variable na          | Example                                   | Description                              |
|:--------------------:|:-----------------------------------------:|:----------------------------------------:|
| CODE                 | 5ae5cc0121758047ebeb2547                  | invite token id, used in link            |
| NAME                 | Elvis Presley                                | user's firstname and last name           |
| CONTRACT             | Contract                                  | contract name                            |
| CONTRACT_ID          | 5ae5cc0121758047ebeb2547                  | contract id                              |
| ROOT_PATH            | /c/5ae5cc0121758047ebeb2547               | frontend path for contract               |
| CONTRACT_INVITE_PATH | /contract/invite/5ae5cc0121758047ebeb2547 | invite path used in link `https://{{APP_DOMAIN}}{{CONTRACT_INVITE_PATH}}` |


## Invite New User to Contract

Template name: `contract-invite-new-user`

This message is sent out to a user when they are invited to a Contract.

To trigger the message, follow these steps:

1.  Go to *Settings* -> *{Contract Name}* -> *Members* tab
2.  Click *Invite new member* button
3.  Fill in the user's email and Contract role
4.  Click *Send invite* link.

On the execution of step 4, The invited user will receive a corresponding email.

<details close markdown="block">
<summary>
Click to expand the template which Raven is using:
</summary>

{% raw %}
```json
{
    "html": "htmlTemplate",
    "subject": "Invitation to join contract {{{CONTRACT}}} at {{{COMPANY}}}",
    "global_merge_vars": [
        {
            "name": "SUBJECT",
            "content": "Invitation to join contract {{CONTRACT}} at {{COMPANY}}"
        },
        {
            "name": "COMPANY",
            "content": "elastic.io GmbH"
        },
        {
            "name": "NAME",
            "content": "TEST"
        },
        {
            "name": "CONTRACT",
            "content": "TEST"
        },
        {
            "name": "CODE",
            "content": "code"
        }
    ]
}
```
{% endraw %}

</details>

| Variable na          | Example                                   | Description                              |
|:--------------------:|:-----------------------------------------:|:----------------------------------------:|
| CODE                 | 5ae5cc0121758047ebeb2547                  | invite token id, used in link            |
| NAME                 | Elvis Presley                                | user's firstname and last name           |
| CONTRACT             | Contract                                  | contract name                            |
| CONTRACT_ID          | 5ae5cc0121758047ebeb2547                  | contract id                              |
| ROOT_PATH            | /c/5ae5cc0121758047ebeb2547               | frontend path for contract               |
| CONTRACT_INVITE_PATH | /contract/invite/5ae5cc0121758047ebeb2547 | invite path used in link `https://{{APP_DOMAIN}}{{CONTRACT_INVITE_PATH}}` |



## Invite New User to Workspace

Template name: `workspace-invite-new-user`

This message is sent out to an existing platform user when they are added to a Workspace.

To trigger the message, follow these steps:

1.  Go to *Workspace* page
2.  Click *Add new member* button
3.  Choose user and role in the corresponding drop-down menus
4.  Click *Add*.

On the execution of step 4, an email will be sent to the added user.

<details close markdown="block">
<summary>
Click to expand the template which Raven is using:
</summary>

{% raw %}
```json
{
    "html": "htmlTemplate",
    "subject": "Invitation to join workspace {{{WORKSPACE}}} at {{{COMPANY}}}",
    "global_merge_vars": [
        {
            "name": "SUBJECT",
            "content": "Invitation to join workspace {{WORKSPACE}} at {{COMPANY}}"
        },
        {
            "name": "COMPANY",
            "content": "elastic.io GmbH"
        },
        {
            "name": "NAME",
            "content": "TEST"
        },
        {
            "name": "WORKSPACE",
            "content": "TEST"
        },
        {
            "name": "CODE",
            "content": "code"
        },
        {
            "name": "CONTRACT_ID",
            "content": "CONTRACT_ID"
        },
        {
            "name": "WORKSPACE_ID",
            "content": "WORKSPACE_ID"
        }
    ]
}
```
{% endraw %}

</details>

## Request Password Recovery

Template name: `password-recovery`

This message is sent out to a user when they request password recovery.

To trigger the message, follow these steps:

1.  Go to *Login* page
2.  Click *Forgot?* link in the login form
3.  Fill in user email
4.  Click *Send reset code* button.

On the execution of step 4, the user will receive an email with reset password link.

<details close markdown="block">
<summary>
Click to expand the template which Raven is using:
</summary>

{% raw %}
```json
{
    "tenantId": "mongo-object-id",
    "locale": "en",
    "name": "password-recovery",
    "message": {
        "from_name": "{{{COMPANY}}} team",
        "track_opens": true,
        "track_clicks": false,
        "auto_text": true,
        "url_strip_qs": false,
        "preserve_recipients": true,
        "merge_language": "handlebars",
        "html": "Some new custom html string (with css)",
        "subject": "{{{COMPANY}}} password recovery",

        "global_merge_vars": [
            {
                "name": "CURRENT_YEAR",
                "content": "2018"
            },
            {
                "name": "APP_DOMAIN",
                "content": "app.elastic.io"
            },
            {
                "name": "SUBJECT",
                "content": "{{COMPANY}} password recovery"
            },
            {
                "name": "COMPANY",
                "content": "elastic.io GmbH"
            },
            {
                "name": "LIST_ADDRESS_HTML",
                "content": "list_address_html"
            },
            {
                "name": "CODE",
                "content": "12345"
            },
            {
                "name": "FNAME",
                "content": "TEST"
            }
        ]
    }
}
```
{% endraw %}

</details>

| Variable name | Example                                    | Description                    |
|:-------------:|:------------------------------------------:|:------------------------------:|
| FNAME         | Elvis Presley                                 | user's firstname               |
| CODE          | https://{{APP_DOMAIN}}/reset?code={{CODE}} | token id                       |

## Invite Developer to DevTeam

Template name: `team-from-contract-invite`

This message is sent out to a Developer when they are invited to a Developer Team.

To trigger the message, follow these steps:

1.  Go to *Settings* -> *{Contract Name}* -> *Developer Teams* tab
2.  Go to any existing DevTeam or create a new one
3.  Click *Invite Developer* button
4.  Choose a user from the list
5.  Click *Send Invites* link.

On the execution of step 5, the selected user will receive an invitation email.

<details close markdown="block">
<summary>
Click to expand the template which Raven is using:
</summary>

{% raw %}
```json
{
    "html": "htmlTemplate",
    "subject": "Invitation to join team {{{TEAM}}} at {{{COMPANY}}}",
    "global_merge_vars": [
        {
            "name": "SUBJECT",
            "content": "Invitation to join team {{TEAM}} at {{COMPANY}}"
        },
        {
            "name": "COMPANY",
            "content": "elastic.io GmbH"
        },
        {
            "name": "NAME",
            "content": "TEST"
        },
        {
            "name": "TEAM",
            "content": "TEST"
        },
        {
            "name": "TEAM_ID",
            "content": "TEAM_ID"
        },
        {
            "name": "ROOT_PATH",
            "content": "/"
        },
        {
            "name": "CONTRACT_ID",
            "content": "CONTRACT_ID"
        },
        {
            "name": "CONTRACT_NAME",
            "content": "Name of the contract"
        }
    ]
}
```
{% endraw %}

</details>

| Variable name |  Example           | Description                               |
|:-------------:|:------------------:|:-----------------------------------------:|
| NAME          | Elvis Presley         | user's firstname and last name            |
| TEAM          |  dev               | team name                                 |
| CONTRACT_NAME | Horns & Roofs      | contract name                             |
| TEAM_PATH     | /c/5b4f3371ff4304610483b909/#/account/contract/5b4f3371ff4304610483b909/teams/557aee0d5925ab0900000001 | team path, used in link https://{{APP_DOMAIN}}{{TEAM_PATH}} |


## Task Error Notification

Template name: `task-error-notification`

This message is sent out to a user that subscribed to Flow errors, when a component
in the Flow reports an error.

To trigger the message, follow these steps:

1.  Create the simple Flow *Simple Trigger =>> Node.js Code*
2.  Configure the *Node.js Code* component to fail
3.  Go to the *Flows* page, locate the newly-created Flow, click *Settings* on Flow card, choose *Subscribe to errors* option
4.  Open *Settings* menu on the Flow's card
5.  Start the Flow
6.  Wait until the Flow is finished with an errors

On the execution of step 6, you will receive the corresponding email.

> **NOTE:** The email will be sent once per hour in case of a repeating error, no
> matter how often the error happens. This interval cannot be configured.

<details close markdown="block">
<summary>
Click to expand the template which Raven is using:
</summary>

{% raw %}
```json
{
    "html": "htmlTemplate",
    "subject": "Your task \"{{{TASK_NAME}}}\" failed with error",
    "from_name": "{{COMPANY}} error bot",

    "inline_css": true,

    "global_merge_vars": [
        {
            "name": "MESSAGE",
            "content": "error message"
        },
        {
            "name": "ORIGINAL_MESSAGE",
            "content": "error message"
        },
        {
            "name": "LAST_SEEN",
            "content": "last seen"
        },
        {
            "name": "COMPANY",
            "content": "elastic.io"
        },
        {
            "name": "TASK_NAME",
            "content": "Unknown task"
        },
        {
            "name": "TASK_ID",
            "content": "Unknown step"
        },
        {
            "name": "STEP_ID",
            "content": "Unknown step"
        },
        {
            "name": "COMP_ID",
            "content": "Unknown comp"
        },
        {
            "name": "COMP_NAME",
            "content": "Unknown comp name"
        },
        {
            "name": "METHOD",
            "content": "Unknown method"
        },
        {
            "name": "EXECUTION_PATH",
            "content": ""
        }
    ]
}
```
{% endraw %}

</details>

| Variable name    | Example                                  | Description                    |
|:----------------:|:----------------------------------------:|:------------------------------:|
| ORIGINAL_MESSAGE | n/a                                      | error message                  |
| STACK            | n/a                                      | error stack                    |
| TASK_ID          | 5ae5cc0121758047ebeb2547                 | task id                        |
| STEP_ID          | step_1                                   | step id                        |
| EXEC_ID          | 63d0a7cdc8a34fa5b6b7d4ab37773572         | execution id                   |
| COMP_ID          | 5ae5cc0121758047ebeb2547                 | component id                   |
| METHOD           | unknown method                           | component method               |
| TASK_NAME        | task                                     | task name                      |
| COMP_NAME        | comp                                     | component name                 |
| EXECUTION_PATH   | https://{{APP_DOMAIN}}{{EXECUTION_PATH}} | path to execution              |

## Operational Error Notification

Template name: `task-operational-error`

This message is sent out to a user that subscribed to Flow errors, when a container
execution fails in K8S.

To trigger the message, follow these steps:

1.  Create the simple Flow with only *Node.js Code* (for example) component
2.  Configure the *Node.js Code* component to fail a container or perform erroneous container start
3.  Go to the *Flows* page, locate the newly-created Flow, click *Settings* on Flow card, choose *Subscribe to errors* option
4.  Start the Flow
5.  Wait one execution

On the execution of step 5, you will receive the corresponding email.

> **NOTE:** The email will be sent once per 24h in case of a repeating error,
> no matter how often the error happens. This interval cannot be configured.

<details close markdown="block">
<summary>
Click to expand the template which Raven is using:
</summary>

{% raw %}
```json
{
    "subject": "Your flow \"{{{TASK_NAME}}}\" failed with unexpected error",
    "html": "htmlTemplate",
    "global_merge_vars": [
        {
            "name": "MESSAGE",
            "content": "error message"
        },
        {
            "name": "LAST_SEEN",
            "content": "last seen"
        },
        {
            "name": "COMPANY",
            "content": "elastic.io GmbH"
        }
    ]
}
```
{% endraw %}

</details>

| Variable name    | Example                                  | Description                    |
|:----------------:|:----------------------------------------:|:------------------------------:|
| ORIGINAL_MESSAGE | n/a                                      | error message                  |
| STACK            | n/a                                      | error stack                    |
| TASK_ID          | 5ae5cc0121758047ebeb2547                 | task id                        |
| STEP_ID          | step_1                                   | step id                        |
| EXEC_ID          | 63d0a7cdc8a34fa5b6b7d4ab37773572         | execution id                   |
| COMP_ID          | 5ae5cc0121758047ebeb2547                 | component id                   |
| METHOD           | unknown method                           | component method               |
| TASK_NAME        | task                                     | task name                      |
| COMP_NAME        | comp                                     | component name                 |
| EXECUTION_PATH   | https://{{APP_DOMAIN}}{{EXECUTION_PATH}} | path to execution              |


## Flow Suspended due to Queue Overflow

Template name: `wiper-flow-suspended-due-to-queue-overflow`

This message is sent out to the Flow author when his Flow gets suspended due to
`RabbitMQ` queue overflow. The overflow is triggered when the total count of
messages or total size of a queue exceeds the 80% threshold. This percentage value
is non-changeable. However, your Platform Operations Team can configure the absolute
maximum values of messages per queue or size in MB per queue with the following
environment variables per installation:

-  `RABBITMQ_MAX_MESSAGES_PER_QUEUE` for message limit
-  `RABBITMQ_MAX_MESSAGES_MBYTES_PER_QUEUE` for size limit

To trigger the message, follow these steps:

1.  Create simple Flow *Node.js Code =>> Node.js Code*
2.  Configure trigger *Node.js Code* component to spam input component with data
3.  Configure input *Node.js Code* component to timeouts, so that the queue overflows
4.  Schedule CRON Expression every minute `* * * * *`
5.  Set Flow type `Realtime`
6.  Start the Flow
7.  Wait for Flow suspension

On the execution of step 7, the Flow author will receive the corresponding email.

<details close markdown="block">
<summary>
Click to expand the template which Raven is using:
</summary>

{% raw %}
```json
{
    "html": "htmlTemplate",
    "subject": "Flow {{{FLOW_ID}}} {{{FLOW_NAME}}} has been suspended due to queue overflow",
    "from_name": "{{{COMPANY}}} error bot",

    "inline_css": true,

    "global_merge_vars": [
        { "name": "COMPANY", "content": "n/a" },
        { "name": "CONTRACT_NAME", "content": "n/a" },
        { "name": "WORKSPACE", "content": "n/a" },
        { "name": "SUSPENDED_CLEANUP_PERIOD_DAYS", "content": "n/a" },
        { "name": "FLOW_ID", "content": "n/a" },
        { "name": "FLOW_NAME", "content": "n/a" },
        { "name": "FLOW_PATH", "content": "n/a" },
        { "name": "MESSAGES", "content": "n/a" },
        { "name": "MESSAGES_LIMIT", "content": "n/a" },
        { "name": "BYTES", "content": "n/a" },
        { "name": "BYTES_LIMIT", "content": "n/a" }
    ]
}
```
{% endraw %}

</details>

## Developer Team Member Removed

Template name: `team-removed-member`

This email is sent to a user whose membership in a Developer Team has been terminated.

To trigger the message, follow these steps:

1. Create a new Developer Team and invite members to it
2. Use `DELETE https://api.elastic.io/v2/teams/{TEAM_ID}/relationships/members`

{% raw %}
```json
{
      "data": {
           "type": "user",
           "id": "{user_id}"
      }
  }
```
{% endraw %}

 request to remove a member

 <details close markdown="block">
 <summary>
 Click to expand the template which Raven is using:
 </summary>

{% raw %}
```json
{
    "html": "htmlTemplate",
    "subject": "Developer Team Membership Update",
    "global_merge_vars": [
        {
            "name": "SUBJECT",
            "content": "Developer Team Membership Update"
        },
        {
            "name": "COMPANY",
            "content": "ACME"
        },
        {
            "name": "NAME",
            "content": "TEST"
        },
        {
            "name": "TEAM",
            "content": "TEST"
        },
        {
            "name": "ROOT_PATH",
            "content": "/"
        },
        {
            "name": "CONTRACT_NAME",
            "content": "Name of the contract"
        }
    ]
}
```
{% endraw %}

</details>

| Variable name | Example                                    | Description                    |
|:-------------:|:------------------------------------------:|:------------------------------:|
| NAME         | Elvis Presley                                 | User's first name and last name    |
| TEAM          | A-TEAM | Team name    |
| CONTRACT_NAME          | ACME | Contract name     |


## Component Version Changed

Template name: `repo-new-version`

This email is sent to all members of the Developer Team where the new version was pushed.

To trigger the message, follow these steps:

1. Publish a new version of a Component.

<details close markdown="block">
<summary>
Click to expand the template which Raven is using:
</summary>

{% raw %}
```json
{
    "html": "htmlTemplate",
    "subject": "Component version changes",
    "global_merge_vars": [
        {
            "name": "SUBJECT",
            "content": "Component version changes"
        },
        {
            "name": "COMPANY",
            "content": "ACME"
        },
        {
            "name": "NAME",
            "content": "TEST"
        },
        {
            "name": "TEAM",
            "content": "TEST"
        },
        {
            "name": "COMPONENT_NAME",
            "content": "TEST"
        },
        {
            "name": "TEAM_ID",
            "content": "TEAM_ID"
        },
        {
            "name": "REPO_ID",
            "content": "REPO_ID"
        },
        {
            "name": "CONTRACT_ID",
            "content": "CONTRACT_ID"
        },
        {
            "name": "REPO_PATH",
            "value": "/c/CONTRACT_ID/#/contract/CONTRACT_ID/teams/TEAM_ID/REPO_ID"
        },
        {
            "name": "ROOT_PATH",
            "content": "/"
        },
        {
            "name": "CONTRACT_NAME",
            "content": "Name of the contract"
        }
    ]
}
```
{% endraw %}

</details>

| Variable name | Example                                    | Description                    |
|-------------|------------------------------------------|------------------------------|
| NAME         | Elvis Presley                                 | User's first name and last name    |
| TEAM          | A-TEAM | Team name    |
| COMPONENT_NAME |	email |	Component name |
| CONTRACT_NAME |	ACME | Contract name |
| CONTRACT_ID |	5b4f3371ff4304610483b909 | Contract ID |
| REPO_ID |	5ae5cc0121758047ebeb2547 |	Repository ID |
| TEAM_ID |	557aee0d5925ab0900000001 |	Team ID  |
| REPO_PATH |	/c/5b4f3371ff4304610483b909/#/account/contract/5b4f3371ff4304610483b909/teams/557aee0d5925ab0900000001/repo/5ae5cc0121758047ebeb2547 |	path, used in link https://{{APP_DOMAIN}}{{REPO_PATH}} |


## Component Version Changed - in Your Workspace

Template name: `repo-new-version-in-workspace-flows`

This email is sent to all Platform users who use the mentioned Component in their Flows.

To trigger the message, follow these steps:

1. Publish a new version of an existing Component

<details close markdown="block">
<summary>
Click to expand the template which Raven is using:
</summary>

{% raw %}
```json
{
    "html": "htmlTemplate",
    "subject": "Component version changes",
    "global_merge_vars": [
        {
            "name": "SUBJECT",
            "content": "Component version changes"
        },
        {
            "name": "COMPANY",
            "content": "ACME"
        },
        {
            "name": "NAME",
            "content": "TEST"
        },
        {
            "name": "TEAM",
            "content": "TEST"
        },
        {
            "name": "COMPONENT_NAME",
            "content": "TEST"
        },
        {
            "name": "TEAM_ID",
            "content": "TEAM_ID"
        },
        {
            "name": "REPO_ID",
            "content": "REPO_ID"
        },
        {
            "name": "CONTRACT_ID",
            "content": "CONTRACT_ID"
        },
        {
            "name": "REPO_PATH",
            "value": "/c/CONTRACT_ID/#/contract/CONTRACT_ID/teams/TEAM_ID/REPO_ID"
        },
        {
            "name": "ROOT_PATH",
            "content": "/"
        },
        {
            "name": "CONTRACT_NAME",
            "content": "Name of the contract"
        }
    ]
}
```
{% endraw %}

</details>

| Variable name | Example                                    | Description                    |
|:-------------:|:------------------------------------------:|:------------------------------:|
| NAME         | Elvis Presley                                 | User's first name and last name    |
| TEAM          | A-TEAM | Team name    |
| COMPONENT_NAME |	email |	Component name |
| CONTRACT_NAME |	ACME | Contract name |
| CONTRACT_ID |	5b4f3371ff4304610483b909 | Contract ID |
| REPO_ID |	5ae5cc0121758047ebeb2547 |	Repository ID |
| TEAM_ID |	557aee0d5925ab0900000001 |	Team ID  |

## Workspace Removed

Template name: `workspace-removed`

This email is sent to all Workspace members.

To trigger the message, follow these steps:

1. Create a Workspace and add members to it
2. Delete the Workspace

<details close markdown="block">
<summary>
Click to expand the template which Raven is using:
</summary>

{% raw %}
```json
{
    "html": "htmlTemplate",
    "subject": "Workspace Update",
    "global_merge_vars": [
        {
            "name": "SUBJECT",
            "content": "Workspace Update"
        }
    ]
}
```
{% endraw %}

</details>

| Variable name | Example                                    | Description                    |
|:-------------:|:------------------------------------------:|:------------------------------:|
| USER_NAME         | Elvis Presley                                 | User's first name and last name    |
| CONTRACT_NAME |	ACME | Contract name |
| CONTRACT_ID |	5b4f3371ff4304610483b909 | Contract ID |
| WORKSPACE_NAME |	ACME Production |	Workspace name |
| WORKSPACE_ID |	557aee0d5925ab0900000001 |	Workspace ID  |
| CONTRACT_PATH	| /c/5b4f3371ff4304610483b909 |	Contract path to be used in the address |

## Workspace Member Removed

Template name: `workspace-removed-member`

This email is sent to a user whose membership in a Workspace has been terminated.

1. Create a Workspace and add members to it
2. Delete a member from this Workspace via the UI, or `DELETE https://api.elastic.io/v2/workspaces/{WORKSPACE_ID} \` API request
3.
<details close markdown="block">
<summary>
Click to expand the template which Raven is using:
</summary>

{% raw %}
```json
{
    "html": "htmlTemplate",
    "subject": "Workspace Membership Update",
    "global_merge_vars": [
        {
            "name": "SUBJECT",
            "content": "Workspace Membership Update"
        }
    ]
}
```
{% endraw %}

</details>

| Variable name | Example                                    | Description                    |
|:-------------:|:------------------------------------------:|:------------------------------:|
| USER_NAME         | Elvis Presley                                 | User's first name and last name    |
| CONTRACT_NAME |	ACME | Contract name |
| CONTRACT_ID |	5b4f3371ff4304610483b909 | Contract ID |
| WORKSPACE_NAME |	ACME Production |	Workspace name |
| WORKSPACE_ID |	557aee0d5925ab0900000001 |	Workspace ID  |
| CONTRACT_PATH	| /c/5b4f3371ff4304610483b909 |	Contract path to be used in the address |


## Contract Suspended

Template name: `wiper-contract-suspended`

This email is sent to all members of the suspended Contract.

1. Create a Contract and add members to it
2. Suspend the Contract via `POST https://api.elastic.io/v2/contracts/CONTRACT_ID/suspend/` API call

<details close markdown="block">
<summary>
Click to expand the template which Raven is using:
</summary>

{% raw %}
```json
{
    "html": "htmlTemplate",
    "subject": "Contract suspended",
    "global_merge_vars": [
        {
            "name": "SUBJECT",
            "content": "Contract suspended"
        },
        {
            "name": "COMPANY",
            "content": "ACME"
        },
        {
            "name": "USER_NAME",
            "content": "First Last"
        },
        {
            "name": "CONTRACT_NAME",
            "content": "Contract Name"
        }
    ]
}
```
{% endraw %}

</details>

| Variable name | Example                                    | Description                    |
|:-------------:|:------------------------------------------:|:------------------------------:|
| USER_NAME         | Elvis Presley                                 | User's first name and last name    |
| CONTRACT_NAME |	ACME | Contract name |

## Contract Unsuspended

Template name: `contract-unsuspended`

This email is sent to all members of the unsuspended Contract.

1. Create a Contract and add members to it
2. Suspend the Contract via `POST https://api.elastic.io/v2/contracts/CONTRACT_ID/suspend/` API call
3. Unsuspend the Contract via `POST https://api.elastic.io/v2/contracts/CONTRACT_ID/unsuspend/` API call

<details close markdown="block">
<summary>
Click to expand the template which Raven is using:
</summary>

{% raw %}
```json
{
    "html": "htmlTemplate",
    "subject": "Contract unsuspended",
    "global_merge_vars": [
        {
            "name": "SUBJECT",
            "content": "Contract unsuspended"
        },
        {
            "name": "COMPANY",
            "content": "elastic.io GmbH"
        },
        {
            "name": "USER_NAME",
            "content": "FirstName LastName"
        },
        {
            "name": "CONTRACT_NAME",
            "content": "Contract Name"
        }
    ]
}
```
{% endraw %}

</details>

| Variable name | Example                                    | Description                    |
|:-------------:|:------------------------------------------:|:------------------------------:|
| USER_NAME         | Elvis Presley                                 | User's first name and last name    |
| CONTRACT_NAME |	ACME | Contract name |

## Contract Removed

Template name: `wiper-contract-deleted`

This email is sent to all members of the removed Contract.

1. Create a Contract and add members to it
2. Delete the Contract via `DELETE https://api.elastic.io/v2/contracts/{CONTRACT_ID} \` API call

<details close markdown="block">
<summary>
Click to expand the template which Raven is using:
</summary>

{% raw %}
```json
{
    "html": "htmlTemplate",
    "subject": "Contract Removed",
    "global_merge_vars": [
        {
            "name": "SUBJECT",
            "content": "Contract Removed"
        },
        {
            "name": "COMPANY",
            "content": "elastic.io GmbH"
        },
        {
            "name": "USER_NAME",
            "content": "First Last"
        },
        {
            "name": "CONTRACT_NAME",
            "content": "Contract Name"
        }
    ]
}
```
{% endraw %}

</details>

| Variable name | Example                                    | Description                    |
|:-------------:|:------------------------------------------:|:------------------------------:|
| USER_NAME         | Elvis Presley                                 | User's first name and last name    |
| CONTRACT_NAME |	ACME | Contract name |



## Contract Member Removed

Template name: `user-removed-from-contract`

This email is sent to a user whose membership in a Contract has been terminated.

1. Create a Contract and add members to it
2. Delete a member from this Contract via the UI, or `DELETE https://api.elastic.io/v2/contracts/{CONTRACT_ID}/members/{USER_ID}/` API request

<details close markdown="block">
<summary>
Click to expand the template which Raven is using:
</summary>

{% raw %}
```json
{
    "html": "htmlTemplate",
    "subject": "Contract Membership Update",
    "global_merge_vars": [
        {
            "name": "SUBJECT",
            "content": "Contract Membership Update"
        },
        {
            "name": "COMPANY",
            "content": "elastic.io GmbH"
        },
        {
            "name": "USER_NAME",
            "content": "FirstName LastName"
        },
        {
            "name": "CONTRACT_NAME",
            "content": "Contract Name"
        }
    ]
}
```
{% endraw %}

</details>

| Variable name | Example                                    | Description                    |
|:-------------:|:------------------------------------------:|:------------------------------:|
| USER_NAME         | Elvis Presley                                 | User's first name and last name    |

## Obsolete Templates

These templates are all unusable now, and may have never been used at all. The
list is for reference purposes only, none of these templates are in use now.

| **Template Name**     |  **Description**                                |
|----------------------------------|--------------------------------------|
| `organization-invite-new-user`   |  Sent to a user that has been invited to an Organization (an obsolete enclosed environment before Contracts and Workspaces) |
| `organization-invite-empty-org`  |  Sent to a user that has been invited to an empty Organization |
| `wiper-suspended-flow-stopped`   |  In case messages in a suspended flow queue exceeded RabbitMQ limit, the flow got stopped and this template was sent to the creator |
| `wiper-suspended-queue-purged`   |  In case messages in a suspended flow queue  exceeded a certain limit, the queue got purged, and this template was sent|
| `workspace-invite-empty-workspace`   |  Erroneous, never been used |
| `team-invite-existing-user`         |  Erroneous |
| `wiper-flow-suspended` |Sent to a user whose Flow has been suspended|
