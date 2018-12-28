---
title: Defining execution frequency for flows
layout: article
section: Building integration flows
category: component
order: 4
since: 20181218
---

Scheduling tasks are part of the {{site.data.tenant.name}} functionality. Every flow is executed every 3 minutes which is Platform's default setting. Depending on your business needs, the default setting might not always be suitable for you. In order to proceed further, you may use some of the flow scheduling features that are going to be described in this article.

## The Scheduling

Please be aware, that changing the flow's schedule means modifying the flow. Here some of the requirements to follow: 

*   For modifying a flow, you should have specific permissions.
*   As soon as you modify the flow's schedule, you should restart it to let the System apply the changes.

To proceed further with CRON scheduling follow the steps below:

### Navigation

Create a [flow](#realtime-flows) or pick the existing one by navigating to the *Workspace > Flows > Choose the necessary Flow > Settings* tab. See the screenshot below.

![CRON Navigation](/assets/img/developer-guide/cron/cron_navigation.png "CRON Navigation")

### Working with Expressions

The *Scheduling tab* consists of the *Cron Expression* section and the *Next Occurrences* one. 

Specify the necessary value into the *Minute field* that is under the *Cron Expression* title. For example, we want to restart the flow every minute, so we type in the following `*/1` value. The *Next Occurrences* section represents the result. Check the screenshot below.

![Scheduling](/assets/img/developer-guide/cron/scheduling.png "Scheduling")

> **Please Note**: By default, the *Cron Expression* section's value is always in the *GMT* format. The *Next Occurrences* section converts the specified GMT value into your Local Time format one. This way it demonstrates the expected result, so you can make sure it is correct.

In case of mistake or wrong value, the System displays an Error Message.

![Scheduling Error](/assets/img/developer-guide/cron/scheduling_error.png "Scheduling Error")


Below are some predefined scheduling definitions:

| Description                                                | Equal to        |
| :---------:                                                | :-----------:   |
| Run once at every 5th minute                               | `*/5 * * * * `  |
| Run once at every 10th minute                              | `*/10 * * * * ` |
| Run once every hour at minute 0                            | `0 * * * *`     |
| Run once every day at midnight 00:00                       | `0 0 * * *`     |
| Run once every week at 00:00 on Sunday                     | `0 0 * * 0`     |
| Run every month at 00:00 on day-of-month 1                 | `0 0 1 * *`     |
| Run every year at 00:00 on day-of-month 1 in January       | `0 0 1 1 *`     |

To find more definitions, please follow this [link](https://crontab.guru).

### Understanding CRON 

[CRON](https://en.wikipedia.org/wiki/Cron) is the UNIX-like job scheduler that executes commands or scripts at given time and date. 
CRON is driven by a *cron table*, to run periodically on a given schedule. See the *crontab* line on the screenshot below:

![Crontab](/assets/img/developer-guide/cron/cron.png "Crontab")

The line's syntax expects a CRON expression made of five values. For more information on how to generate CRON's expressions, please follow this [link](https://www.freeformatter.com/cron-expression-generator-quartz.html).


### Saving Changes

Once you finish the setup, click the *Save* button to apply the changes. The *Successfully updated the flow scheduling* text message appears in the upper right corner. 

### Finishing the Setup

Now let's publish our Draft. To do that, please navigate back to the **Graph** tab and click the **Publish Draft** button. Once it's done, start the flow by clicking the green play-icon on your right.

![Start the Flow](/assets/img/developer-guide/cron/start_the_flow.png "Start the Flow")

> **Please Note**: In case of a *Webhook* flow, there won't be any CRON Scheduling available. See the screenshots below for more information.

![Webhook Graph](/assets/img/developer-guide/cron/webhook_graph.png "Webhook Graph")
![Webhook Settings](/assets/img/developer-guide/cron/webhook_settings.png "Webhook Settings")

## Summary

Let's briefly review the key points we have learned from this article.

* By default, each `polling` flow is executed every 3 minutes.
* Modifying the flow requires the specific permissions.
* Defining a custom execution frequency is accomplished by a CRON expression applied to a flow.
* *Cron Expression* section utilizes the standard GMT time format unlike the *Next Occurrences* one.
* CRON scheduling is not available for the Webhook-like flows.


This is how you schedule your flow with CRON in the {{site.data.tenant.name}}. 
