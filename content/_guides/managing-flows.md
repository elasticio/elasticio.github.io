---
title: Managing Flows
layout: article
section: Tenant Management
order: 1
since: 20190719
---

This document provides information on Flow management, namely the following
actions:

- [Start, stop, edit, delete](#start-stop-edit-delete)

- [Copy Flow within the same Workspace, switch between *real-time* and *ordinary*](#copy-flow-switch-flow-type)

- [Subscribe to errors](#subscribe-to-errors)

- [Schedule via CRON expressions](#scheduling)

- [Flow versioning](#flow-versioning)

- [Reset Snapshot](#reset-snapshot)

All actions are available to users with the corresponding [permissions](/guides/managing-user-roles-in-a-tenant).

## Start, Stop, Edit, Delete

These basic actions may be done via the [UI](#start-stop-edit-delete-via-the-ui), and via the [API](#start-stop-edit-delete-via-the-api). Note that when you start a Flow, the latest [Flow version](#flow-versioning) is used.

#### Start, Stop, Edit, Delete via the UI

To start, stop, edit and delete a Flow via the UI, navigate to Flows. Here you can see all your Flows, identify the required stopped Flow by name **(1)** and start **(2)** it:

![](/assets/img/tenant-management-guide/managing-flows/Screenshot_1.png)

Also you can run Flow on demand **(1)** or stop **(2)** a started Flow:

![](/assets/img/tenant-management-guide/managing-flows/Screenshot_2.png)

Edit or delete the Flow by opening the settings menu **(1)** of the selected Flow, and clicking *Edit Flow* **(2)** or *Delete Flow* **(3)**:

![](/assets/img/tenant-management-guide/managing-flows/Screenshot_6.png)

Alternatively, you can navigate to the Flow itself by clicking on its name:

![](/assets/img/tenant-management-guide/managing-flows/Screenshot_3.png)

Then click the corresponding buttons to start **(1)**, edit **(2)** or delete **(3)** Flow.

![](/assets/img/tenant-management-guide/managing-flows/Screenshot_4.png)

In case you need to stop a running Flow, click the stop button:

![](/assets/img/tenant-management-guide/managing-flows/Screenshot_5.png)


#### Start, Stop, Edit, Delete via the API

1\. To start a Flow via the API, we will use the following request:

`POST {{site.data.tenant.apiBaseUri}}/v2/flows/{FLOW_ID}/start`

Below are request parameters:

| **URL Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `FLOW_ID`                             | yes          | Flow ID |

2\. To stop a Flow via the API, we will use the following request:

`POST {{site.data.tenant.apiBaseUri}}/v2/flows/{FLOW_ID}/stop`

Below are request parameters:

| **URL Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `FLOW_ID`                             | yes          | Flow ID |

3\. To delete a Flow via the API, we will use the following request:

`DELETE {{site.data.tenant.apiBaseUri}}/v2/flows/{FLOW_ID}`

Below are request parameters:

| **URL Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `FLOW_ID`                             | yes          | Flow ID |

4\. To edit a Flow to some extent via the API, we will use the following request:

`PATCH {{site.data.tenant.apiBaseUri}}/v2/flows/{FLOW_ID}`

Below are request parameters:

| **URL Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `FLOW_ID`                             | yes          | Flow ID |


| **Payload Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `type`                             | yes          | Allowed value: `flow` |
| `id`                             | yes          | Flow ID |
| `attributes.name`                             | no         | Flow name |
| `attributes.type`                             | no          | Flow type. Allowed values: `ordinary`, `long_running `|
| `attributes.graph`                             | no          |  	Flow graph representing component connections |
| `attributes.cron`                             | no          | CRON expression representing Flow timing |


## Copy Flow, Switch Flow Type

To copy a Flow within the same Workspace, navigate to see your Flows. Then click on the corresponding icon to open the settings menu of the selected Flow:

![](/assets/img/tenant-management-guide/managing-flows/Screenshot_7.png)

Alternatively, you can navigate to the Flow itself by clicking on its name:

![](/assets/img/tenant-management-guide/managing-flows/Screenshot_3.png)

Then switch to *Implement* tab **(1)** and click the command **(2)** to copy it to clipboard, and [create a copy of the Flow via the API](/guides/managing-workspaces):

![](/assets/img/tenant-management-guide/managing-flows/Screenshot_8.png)

As a result, you get a copy of your Flow:

![](/assets/img/tenant-management-guide/managing-flows/Screenshot_9.png)

To switch between real-time and ordinary types, navigate to see your Flows. Then click on the corresponding icon to open the settings menu of the selected Flow:

![](/assets/img/tenant-management-guide/managing-flows/Screenshot_10.png)

Switching back works the same way. Alternatively, you can navigate to the Flow itself by clicking on its name, switch to *Settings* tab **(1)**, scroll down and toggle the corresponding switch **(2)**:

![](/assets/img/tenant-management-guide/managing-flows/Screenshot_11.png)

Note, that you can only switch Flow type if there's at least one published Flow version, and it is not running.

## Subscribe to Errors

You can order the platform to send you emails in case of any errors in your running Flow. However, it will not just mindlessly spam you with messages if an error repeats. With some errors, messaging interval is one email per hour, while with others its one per 24 hours. This interval is hard-coded and cannot be configured.

To subscribe to errors, use the settings menu **(1)** of the corresponding Flow and click *Subscribe to Errors* **(2)**:

![](/assets/img/tenant-management-guide/managing-flows/Screenshot_12.png)

Unsubscribing works the same way.

## Scheduling

To schedule your Flow via [CRON expressions](https://en.wikipedia.org/wiki/Cron#CRON_expression), you need to be in drafting mode. You can turn it on by [editing the Flow](#start-stop-edit-delete-via-the-ui). While editing the Flow, switch to *Settings* tab **(1)**, use CRON expression to schedule the Flow, and click *Save*:

![](/assets/img/tenant-management-guide/managing-flows/Screenshot_13.png)

The default CRON expression is `*/3 * * * *`, meaning "every 3 minutes". The positions in the expression from left to right represent:

- Minutes (allowed values: from `0` to `59`)
- Hours (allowed values: from `0` to `23`)
- Days of the month (allowed values: from `1` to `31`)
- Months (allowed values: from `1` to `12` or from `JAN` to `DEC`)
- Days of the week (allowed values: from `0` to `6` or from `MON` to `SUN`)

The month and weekday abbreviations are not case-sensitive.
Also, the following special characters are in use:

- `*` - wildcard, means any value

**EXAMPLE:** `* * * * *` means every minute of every day of every week, etc.

- `,` - value list separator

**EXAMPLE:** `* * * * MON,WED,FRI` means every Monday, Wednesday and Friday.

- `-` - defines a range of values

**EXAMPLE:** `* 2-5 * * *` means every hour between 2 and 5 AM.

- `/` - specifies repetition steps

**EXAMPLE:** `* * * */2 *` means every two months.

Feel free to use the hint below the CRON expression field for reference. Otherwise, you can always click [*Run Now*](#start-stop-edit-delete) or use `POST {{site.data.tenant.apiBaseUri}}/v2/flows/{FLOW_ID}/run-now` request to run the Flow on demand.

If the CRON expression was written properly, you'll see your schedule in the Next Occurrences:

![](/assets/img/tenant-management-guide/managing-flows/Screenshot_17.png)


## Flow Versioning

The Platform allows you to create different versions of a Flow and switch between them if required. There are two general Flow states in Flow creation process: *draft mode* and *published version*. Every time you publish a draft, you create a new Flow version.

In the draft state you can edit or add steps, verify credentials, retrieve data samples and configure CRON expressions. When everything is ready, you should publish the draft before you can run the Flow. A new draft is created when you create a new Flow, or edit an existing one. If a draft is created for an existing Flow, it does not affect the Flow until it is published. To publish a draft, use the corresponding button:

![](/assets/img/tenant-management-guide/managing-flows/Screenshot_15.png)

Note, that you need to finish all the steps for the button to become active.

Each published **(1)** draft is, basically, a separate version of the Flow. All the versions are listed in History tab **(2)**. Once you publish the Flow, you can then revert to the any other published version **(3)**.

![](/assets/img/tenant-management-guide/managing-flows/Screenshot_14.png)

To achieve that, you should select the required version:

![](/assets/img/tenant-management-guide/managing-flows/Screenshot_16.png)

Then [edit](#start-stop-edit-delete) it to create a draft, and publish this draft so it becomes the latest Flow version.

You can work on one draft of a given Flow at a time. If you try to create another one, the Platform will ask you if you want to overwrite the existing one.  Remember that a draft can only become a new version of a Flow if you publish it. It is possible to publish drafts of active and stopped Flows. In case you publish a draft of an active Flow, it will stop immediately, and then restart from scratch as a new version.


## Reset Snapshot

A Snapshot is the data saved by a Component during its execution. When the Component is run next time, it will read the Snapshot to continue the process from the point it finished last time. You can manually reset this Snapshot, so the Component starts from scratch next time. Note that you can only reset Snapshot for a stopped Flow. To do this, click the settings button on the Flow **(1)**, and select Reset Snapshot **(2)**:

![](/assets/img/tenant-management-guide/managing-flows/Screenshot_18.png)

This is the only way to delete an existing snapshot.
