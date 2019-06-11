---
title: How to Test Outgoing Messages
layout: article
section: Basic Concepts
order: 1
since: 20191106
---

This document provides a list of our platform's outgoing email messages and the conditions that trigger each message.

## Message Templates

These are all the messages that our platform is configured to send out at the moment:

1\. [Agent Request](#1-agent-request)


2\. [Invite User to Empty Contract](#2-invite-user-to-empty-contract)


3\. [Invite New User to Contract](#3-invite-new-user-to-contract)


4\. [Invite New User to Workspace](#4-invite-new-user-to-workspace)


5\. [Request Password Recovery](#5-request-password-recovery)


6\. [Invite Developer to DevTeam](#6-invite-developer-to-devteam)


7\. [Task Error Notification](#7-task-error-notification)


8\. [Operational Error Notification](#8-operational-error-notification)


9\. [Flow Suspended](#9-flow-suspended)


10\. [Flow Suspended due to Queue Overflow](#10-flow-suspended-due-to-queue-overflow)


### 1. Agent Request
Template name: `agent-request`

This message is sent out in case a local agent is requested. By default, the email is sent to support address. However, you can specify an email address per installation using the following environment variable: `AGENT_REQUESTS_EMAIL`.

To trigger the message, follow these steps:

1\. Go to *Agents* page

2\. Click *Request an agent* button

3\. Fill `Name` and `Description` for your agent

4\. Click *Next*.

On the execution of step 4, an email will be sent to the specified address.

### 2. Invite User to Empty Contract
Template name: `contract-invite-empty-contract`

This message is sent out to an existing platform user when they are added to a Contract as the first user.

To trigger the message, make API-call `POST v2/contracts/{{contract_id}}/invites` for a contract, which has no members yet.
The invited user will receive a corresponding email.

### 3. Invite New User to Contract
Template name: `contract-invite-new-user`

This message is sent out to a user when they are invited to a Contract.

To trigger the message, follow these steps:

1\. Go to *Settings* -> *{Contract Name}* -> *Members* tab  

2\. Click *Invite new member* button

3\. Fill in the user's email and Contract role

4\. Click *Send invite* link.

On the execution of step 4, The invited user will receive a corresponding email.

### 4. Invite New User to Workspace
Template name: `workspace-invite-new-user`

This message is sent out to an existing platform user when they are added to a Workspace.   

To trigger the message, follow these steps:

1\. Go to *Workspace* page

2\. Click *Add new member* button

3\. Choose user and role in the corresponding dropdown menus

4\. Click *Add*.

On the execution of step 4, an email will be sent to the added user.

### 5. Request Password Recovery
Template name: `password-recovery`

This message is sent out to a user when they request password recovery.

To trigger the message, follow these steps:

1\. Go to *Login* page

2\. Click *Forgot?* link in the login form

3\. Fill in user email

4\. Click *Send reset code* button.

On the execution of step 4, the user will receive an email with reset password link.

### 6. Invite Developer to DevTeam
Template name: `team-from-contract-invite`

This message is sent out to a Developer when they are invited to a Developer Team.

To trigger the message, follow these steps:

1\. Go to *Settings* -> *{Contract Name}* -> *Developer Teams* tab  

2\. Go to any existing DevTeam or create a new one

3\. Click *Invite Developer* button

4\. Choose a user from the list

5\. Click *Send Invites* link.

On the execution of step 4, the selected user will receive an invitation email.

### 7. Task Error Notification
Template name: `task-error-notification`

This message is sent out to a user that subscribed to Flow errors, when a component fails in the Flow.

To trigger the message, follow these steps:
1\.  Create the simple Flow *Simple Trigger =>> Node.js Code*

2\. Configure the *Node.js Code* component to fail

3\. Go to the *Flows* page, locate the newly-created Flow, click *Settings* on Flow card, choose *Subscribe to errors* option

4\. Open *Settings* menu on the Flow's card

5\. Start the Flow

6\. Wait until the Flow is finished with an errors

On the execution of step 6, you will receive the corresponding email.

**NOTE:** The email will be sent once per hour in case of a repeating error, no matter how often the error happens. This interval cannot be configured.

### 8. Operational Error Notification
Template name: `task-operational-error`

This message is sent out to a user that subscribed to Flow errors, when a container execution fails in K8S.

To trigger the message, follow these steps:
1\. Create the simple Flow with only *Node.js Code* (for example) component

2\. Configure the *Node.js Code* component to fail a container or perform erroneous container start

3\. Go to the *Flows* page, locate the newly-created Flow, click *Settings* on Flow card, choose *Subscribe to errors* option

4\. Start the Flow

5\. Wait one execution

On the execution of step 5, you will receive the corresponding email.

**NOTE:** The email will be sent once per 24h in case of a repeating error, no matter how often the error happens. This interval cannot be configured.  

### 9. Flow Suspended
Template name: `wiper-flow-suspended`

This message is sent out to the Flow author when his Flow gets suspended due to failing containers. A Flow switches into `suspended` status in case any its containers fails more then `X` times in `Y` minutes.

`X` and `Y` values are configurable with the following environment variables:

- `SUSPEND_WATCH_KUBERNETES_MAX_EVENTS` for `X`

- `SUSPEND_WATCH_INTERVAL` for `Y`   

To trigger the message, follow these steps:

1\. Create the simple Flow *Webhook =>> Node.js Code*

2\. Configure the *Node.js Code* component to fail a container

3\. Start the flow

4\. Trigger the Webhook 6 times consecutively

5\. Wait for flow suspension

On the execution of step 5, the Flow author will receive the corresponding email.

### 10. Flow Suspended due to Queue Overflow
Template name: `wiper-flow-suspended-due-to-queue-overflow`

This message is sent out to the Flow author when his Flow gets suspended due to RabbitMQ queue overflow. The overflow is triggered when the total count of messages or total size of a queue exceeds the 80% threshold. This percentage value is non-changeable. However, you can configure the absolute maximum values of messages per queue or size in MB per queue with the following environment variables:

- `RABBITMQ_MAX_MESSAGES_PER_QUEUE` for message limit

- `RABBITMQ_MAX_MESSAGES_MBYTES_PER_QUEUE` for size limit

To trigger the message, follow these steps:

1\. Create simple flow *Node.js Code =>> Node.js Code*

2\. Configure trigger *Node.js Code* component to spam input component with data

3\. Configure input *Node.js Code* component to timeouts, so that the queue overflows

4\. Schedule CRON Expression every minute `* * * * *`

5\. Set Flow type `Realtime`

6\. Start the Flow

7\. Wait for Flow suspension

On the execution of step 7, the Flow author will receive the corresponding email.
