---
title: SugarCRM triggers
layout: component
description: SugarCRM component triggers.
icon:  sugarcrm.png
icontext: SugarCRM component
category: SugarCRM component
createdDate: 2020-03-17
updatedDate: 2020-03-17
---

## Fetching New and Updated Objects from SugarCRM - Polling

It is possible to fetch any type newly created and/or updated object in your
SugarCRM instance. Select the trigger **Fetch new and updated objects** and
then configure the following:

![screenshot from 2017-09-21 11-20-40](https://user-images.githubusercontent.com/5710732/30688610-f825e81c-9ebe-11e7-8736-3c522f92c65c.png)

*  **SugarCRM module to fetch**: Type of object to fetch
*  **Number of records to fetch**: Maximum number of records to fetch per call.
 If left blank then the default set on your SugarCRM instance.

## Fetching New and Updated Objects from SugarCRM - Webhook

It is possible to have new and updated objects be pushed to the {{site.data.tenant.name}}
platform via webhooks. To do so, select **Fetch new and updated objects (`getObjects` - Webhook)**.
When a flow with this trigger is started, the {{site.data.tenant.name}} platform will register webhooks on
the SugarCRM instance. When the flow is stopped, this webhook will be destroyed by the platform.

## Fetch Deleted Objects from SugarCRM - Webhook

It is possible to have the ids of deleted objects be pushed to the {{site.data.tenant.name}}
platform via webhooks.  In order to do so, select **Fetch deleted objects (`getDeletedObjects` - Webhook)**.
When a flow with this trigger is started, the {{site.data.tenant.name}} platform
will register webhooks on the SugarCRM instance. When the flow is stopped, this
webhook will be destroyed by the platform.
