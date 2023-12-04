---
title: Managing Flows
description: This document provides information on Flow management.
layout: article
section: Contract Management
order: 1
category: integrator-management
---

This document provides information on Flow management, namely the following
actions:

*   [Start, Stop, Edit, Delete](#start-stop-edit-delete)
*   [Restoring Deleted Flow](#restoring-deleted-flow)
*   [Copy Flow within the same Workspace, switch between *real-time* and *ordinary*](#copy-flow-switch-flow-type)
*   [Filtering, Sorting Flows](#filtering-sorting-flows)
*   [Subscribe to Errors](#subscribe-to-errors)
*   [Schedule via CRON expressions](#scheduling)
*   [Flow Versioning](#flow-versioning)
*   [Parallel Processing](#parallel-processing)
*   [Reset Snapshot](#reset-snapshot)

All actions are available to users with the corresponding [permissions](/guides/managing-user-roles-in-a-tenant).

## Start, Stop, Edit, Delete

These basic actions may be done via the UI, and via the [API]({{site.data.tenant.apiDocsUri}}/v2#/flows). Note that when you start a Flow, the latest [Flow version](#flow-versioning) is used.

#### Start, Stop, Edit, Delete via the UI

To start, stop, edit and delete a Flow via the UI, navigate to Flows. Here you can see all your Flows, identify the required stopped Flow by name **(1)** and start **(2)** it:

![Start flow](/assets/img/tenant-management-guide/managing-flows/Screenshot_1.png)

Also you can run Flow on demand **(1)** or stop **(2)** a started Flow:

![Run or stop](/assets/img/tenant-management-guide/managing-flows/Screenshot_2.png)

Edit or delete the Flow by opening the settings menu **(1)** of the selected Flow, and clicking *Edit Flow* **(2)** or *Delete Flow* **(3)**:

![Settings menu](/assets/img/tenant-management-guide/managing-flows/Screenshot_6.png)

Alternatively, you can navigate to the Flow itself by clicking on its name:

![Click on flows name](/assets/img/tenant-management-guide/managing-flows/Screenshot_3.png)

Then click the corresponding buttons to start **(1)**, edit **(2)** or delete **(4)** Flow. You can also update all components by clicking **(3)**.

![Corresponding buttons](/assets/img/tenant-management-guide/managing-flows/Screenshot_4.png)

In case you need to stop a running Flow, click the stop button:

![Stop a running Flow](/assets/img/tenant-management-guide/managing-flows/Screenshot_5.png)

>It is important to remember, that every time you change a flow, you create a draft of that flow to make the changes. Please note that you can work with a draft not only via UI, but also using API calls. All necessary information on this topic can be found in our [API documentation]({{site.data.tenant.apiDocsUri}}/v2#/flow%20drafts)

#### Start, Stop, Edit, Delete via the API

By following the link below, you will learn how to perform the functions described above using API Calls:

1\. [Start a Flow via the API]({{site.data.tenant.apiDocsUri}}/v2#/flows/post_flows__flow_id__start).

2\. [Stop a Flow via the API]({{site.data.tenant.apiDocsUri}}/v2#/flows/post_flows__flow_id__stop).

3\. [Delete a Flow via the API]({{site.data.tenant.apiDocsUri}}/v2#/flows/delete_flows__flow_id_).

4\. [Edit a Flow to some extent via the API]({{site.data.tenant.apiDocsUri}}/v2#/flows/patch_flows__flow_id_).

5\. [Retrieve a flow by ID]({{site.data.tenant.apiDocsUri}}/v2#/flows/get_flows__flow_id_).

## Restoring Deleted Flow

If you accidentally delete a Flow you need, you can restore it for some time after deletion.

> The amount of time during which Flow can be restored is set by the installation environment variable. By default, this parameter is equivalent to 24 hours.

If you have Tenant-Admin rights, you can use these two endpoints to find and restore access to Flow:

1\. [List deleted Flows]({{site.data.tenant.apiDocsUri}}/v2#/flows/get_flows_deleted)

2\. [Restore deleted Flow by ID]({{site.data.tenant.apiDocsUri}}/v2#/flows/post_flows__flow_id__restore)

If you do not have Tenant-Admin rights, please [contact support](/admin/reporting-issue.html#how-to-contact-us) and describe the flow you need to restore.

## Filtering, Sorting Flows

The Flows tab provides a wide range of managment tools: Searching, Filtering and Sorting Flows in Workspace.

![Filtering Sorting](/assets/img/tenant-management-guide/managing-flows/Filtering_Sorting.png)

You can: 
1. Search Flow **(1)** by name via Search bar
2. Filter Flows **(2)** by Creator via dropdown menu
3. Filter Flows **(3)** by [Status](/getting-started/integration-flow.html#flow-states): *Active*, *Stopped*, *Suspended*
4. Filter Flows **(4)** by [Flow type](/guides/realtime-flows.html): *Ordinary* or *Real-Time*
5. Filter Flows **(5)** by content of certain components in Flow
6. Filter flows **(6)** via checkbox  only Flows having *Draft*
7. Sort Flows **(7)** by creation date, by update date and alphabetical order and reverse alphabetical order
8. You can also switch **(8)** between Flow display modes in Grid or a List:

![Flows_list_view](/assets/img/tenant-management-guide/managing-flows/Flows_list_view.png)

> **Note:** You can observe all active filters in the tooltips that appear below:
> ![Filtering_tooltips](/assets/img/tenant-management-guide/managing-flows/Filtering_tooltips.png)


## Copy Flow, Switch Flow Type

To copy a Flow within the same Workspace, navigate to see your Flows. Then click on the corresponding icon to open the settings menu of the selected Flow:

![Delete flow](/assets/img/tenant-management-guide/managing-flows/Screenshot_7.png)

Alternatively, you can navigate to the Flow itself by clicking on its name:

![Navigate to the flow](/assets/img/tenant-management-guide/managing-flows/Screenshot_3.png)

Then switch to *Implement* tab **(1)** and click the command **(2)** to copy it to clipboard, and [create a copy of the Flow via the API]({{site.data.tenant.apiDocsUri}}/v2#/flows/post_flows__flow_id__copy):

![Implement tab](/assets/img/tenant-management-guide/managing-flows/Screenshot_8.png)

As a result, you get a copy of your Flow:

![Flow copy](/assets/img/tenant-management-guide/managing-flows/Screenshot_9.png)

To switch between real-time and ordinary types, navigate to see your Flows. Then click on the corresponding icon to open the settings menu of the selected Flow:

![Switch to real-time](/assets/img/tenant-management-guide/managing-flows/Screenshot_10.png)

Switching back works the same way. Alternatively, you can navigate to the Flow itself by clicking on its name, switch to *Settings* tab **(1)**, scroll down and toggle the corresponding switch **(2)**:

![Settings - Switch to real-time](/assets/img/tenant-management-guide/managing-flows/Screenshot_11.png)

Note, that you can only switch Flow type if there's at least one published Flow version, and it is not running.

## Subscribe to Errors

You can order the platform to send you emails in case of any errors in your running Flow. However, it will not just mindlessly spam you with messages if an error repeats. With some errors, messaging interval is one email per hour, while with others its one per 24 hours. This interval is hard-coded and cannot be configured.

To subscribe to errors, use the settings menu **(1)** of the corresponding Flow and click *Subscribe to Errors* **(2)**:

![Subscribe to Errors](/assets/img/tenant-management-guide/managing-flows/Screenshot_12.png)

Unsubscribing works the same way.

## Scheduling

To schedule your Flow via [CRON expressions](https://en.wikipedia.org/wiki/Cron#CRON_expression), you need to be in drafting mode. You can turn it on by [editing the Flow](#start-stop-edit-delete-via-the-ui). While editing the Flow, switch to *Settings* tab **(1)**, use CRON expression to schedule the Flow **(2)**, and click *Save* **(3)**:

![Settings - Scheduling](/assets/img/tenant-management-guide/managing-flows/Screenshot_13.png)

The default CRON expression is `*/10 * * * *`, meaning "Every 10 minutes".
> **Note:** The default value of this parameter can be changed by configuring the internal environment variable `SCHEDULER_TASK_POLLING_INTERVAL`.

The positions in the expression from left to right represent:

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

Feel free to use the hint below the CRON expression field for reference. Otherwise, you can always click [*Run Now*](#start-stop-edit-delete) or use [`POST {{site.data.tenant.apiBaseUri}}/v2/flows/{FLOW_ID}/run-now`]({{site.data.tenant.apiDocsUri}}/v2#/flows/post_flows__flow_id__run_now) request to run the Flow on demand.

If the CRON expression was written properly, you'll see your schedule in the Next Occurrences:

![Next Occurrences](/assets/img/tenant-management-guide/managing-flows/Screenshot_17.png)


## Flow Versioning

The Platform allows you to create different versions of a Flow and switch between them if required. There are two general Flow states in Flow creation process: *draft mode* and *published version*. Every time you publish a draft, you create a new Flow version.

In the draft state you can edit or add steps, verify credentials, retrieve data samples and configure CRON expressions. When everything is ready, you should publish the draft before you can run the Flow. A new draft is created when you create a new Flow, or edit an existing one. If a draft is created for an existing Flow, it does not affect the Flow until it is published. To publish a draft, use the corresponding button:

![Publish draft](/assets/img/tenant-management-guide/managing-flows/Screenshot_15.png)

Note, that you need to finish all the steps for the button to become active.

Each published **(1)** draft is, basically, a separate version of the Flow. All the versions are listed in History tab **(2)**. Once you publish the Flow, you can then revert to the any other published version **(3)**.

![Published draft - History](/assets/img/tenant-management-guide/managing-flows/Screenshot_14.png)

To achieve that, you should select the required version:

![Select the required version](/assets/img/tenant-management-guide/managing-flows/Screenshot_16.png)

Then [edit](#start-stop-edit-delete) it to create a draft, and publish this draft so it becomes the latest Flow version.

> Please note that you can see all versions of a particular flow not only on the platform Ui itself, but also with the corresponding [API endpoint]({{site.data.tenant.apiDocsUri}}/v2#/flow%20versions)

You can work on one draft of a given Flow at a time. If you try to create another one, the Platform will ask you if you want to overwrite the existing one.  Remember that a draft can only become a new version of a Flow if you publish it. It is possible to publish drafts of active and stopped Flows. In case you publish a draft of an active Flow, it will stop immediately, and then restart from scratch as a new version.

## Parallel Processing

Parallel processing, also called "Step message prefetch count", can be configured via the UI and the API.

1\. To configure parallel processing via the UI, use *Advanced Settings* section in *Step Summary* tab:

![Advanced Settings](/assets/img/tenant-management-guide/managing-flows/advanced-settings.png)

> **Note:** the changes will be applied after clicking the *Finish Step* button.


2\. To configure parallel processing via the API, use `prefetch` field as a parameter to `nodeConfig` section of the `/v2/flows` endpoint. The Mapper-Step gets the same prefetch as the previous Step.

**EXAMPLE:**

```
"attributes": {
        "nodes_config": {
            "step_1": {
                "prefetch": 4
            }
        }
    }
}
```

## Reset Snapshot

A [Snapshot](/developers/snapshot-overview) is the data saved by a Component during its execution. When the Component is run next time, it will read the Snapshot to continue the process from the point it finished last time. You can manually reset this Snapshot, so the Component starts from scratch next time. Note that you can only reset Snapshot for a stopped Flow. To do this, click the settings button on the Flow **(1)**, and select Reset Snapshot **(2)**:

![Reset Snapshot](/assets/img/tenant-management-guide/managing-flows/Screenshot_18.png)

This is the only way to delete an existing snapshot via UI. You can also use the appropriate [API Call]({{site.data.tenant.apiDocsUri}}/v2#/snapshots/delete_flows__flow_id__snapshots__step_id_) for this.

## Related links

- [Managing user roles in a tenant](/guides/managing-user-roles-in-a-tenant)
- [Managing Workspaces](/guides/managing-workspaces)
- [CRON expressions](https://en.wikipedia.org/wiki/Cron#CRON_expression)
