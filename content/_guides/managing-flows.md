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

- [Subscribe to errors, schedule via CRON expressions](#additional-actions)

## Start, Stop, Edit, Delete

These basic actions may be done via the [UI](#start-stop-edit-delete-via-the-ui), and via the [API](#start-stop-edit-delete-via-the-api).

#### Start, Stop, Edit, Delete via the UI

To start, stop, edit and delete a Flow via the UI, navigate to Flows. Here you can see all your Flows, identify the required stopped Flow by name **(1)** and start **(2)** it:

![](Screenshot_1.png)

Also you can run **(1)** or stop **(2)** a started Flow:

![](Screenshot_2.png)

Edit or delete the Flow by opening the settings menu **(1)** of the selected Flow, and clicking *Edit Flow* **(2)** or *Delete Flow* **(3)**:

![](Screenshot_6.png)

Alternatively, you can navigate to the Flow itself by clicking on its name:

![](Screenshot_3.png)

Then click the corresponding buttons to start **(1)**, edit **(2)** or delete **(3)** Flow.

![](Screenshot_4.png)

In case you need to stop a running Flow, click the stop button:

![](Screenshot_5.png)



#### Start, Stop, Edit, Delete via the API

1\. To start a Flow via the API, we will use the following request:

`POST {{apiBaseUri}}/v2/flows/{FLOW_ID}/start`

Below are request parameters:

| **URL Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `FLOW_ID`                             | yes          | Flow ID |

2\. To stop a Flow via the API, we will use the following request:

`POST {{apiBaseUri}}/v2/flows/{FLOW_ID}/stop`

Below are request parameters:

| **URL Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `FLOW_ID`                             | yes          | Flow ID |

3\. To delete a Flow via the API, we will use the following request:

`DELETE {{apiBaseUri}}/v2/flows/{FLOW_ID}`

Below are request parameters:

| **URL Parameter**                    | **Required** | **Description**                                   |
|----------------------------------|--------------|---------------------------------------------------|
| `FLOW_ID`                             | yes          | Flow ID |

4\. To edit a Flow to some extent via the API, we will use the following request:

`PATCH {{apiBaseUri}}/v2/flows/{FLOW_ID}`

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

![](Screenshot_7.png)  

Alternatively, you can navigate to the Flow itself by clicking on its name:

![](Screenshot_3.png)

Then switch to *Implement* tab **(1)** and copy the command **(2)** to clipboard to [create a copy of the Flow via the API](/managing-workspaces):

![](Screenshot_8.png)  

As a result, you get a copy of your Flow:

![](Screenshot_9.png)  

To copy a Flow within the same Workspace, navigate to see your Flows. Then click on the corresponding icon to open the settings menu of the selected Flow:

![](Screenshot_10.png)

Switching back works the same way. Alternatively, you can navigate to the Flow itself by clicking on its name, switch to *Settings* tab **(1)**, scroll down and toggle the corresponding switch **(2)**:

![](Screenshot_11.png)

## Additional Actions

You can also subscribe to errors, and schedule your Flow via [CRON expressions](https://en.wikipedia.org/wiki/Cron#CRON_expression).

1\. Subscribe to errors is a feature that orders the platform to send you emails in case of any errors in your running Flow. However, it will not just mindlessly spam you with messages if an error repeats. With some errors, messaging interval is one email per hour, while with others its one per 24 hours. This interval is hardcoded and cannot be configured.

To subscribe to errors, use the settings menu **(1)** of the corresponding Flow and click *Subscribe to Errors* **(2)**:

![](Screenshot_12.png)

Unsubscribing works the same way.

2\. To schedule the Flow via CRON expressions, you need to be in drafting mode. You can turn it on by [editing the Flow](#start-stop-edit-delete-via-the-ui). While editing the Flow, switch to *Settings* tab **(1)**, use CRON expression to schedule the Flow, and click *Save*:

![](Screenshot_13.png)

Use the hint below the CRON expression field for reference. The default schedule is every 3 minutes.
