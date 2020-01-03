---
title: SugarCRM component
layout: component
section: CRM components
description: A user interface, industry-leading customer experience, and an intuitive customization platform.
icon:  sugarcrm.png
icontext: SugarCRM component
category: SugarCRM component
createdDate: 2016-12-03
updatedDate: 2019-09-25
---

This is an open source component template for [SugarCRM](https://www.sugarcrm.com)
which is developed specifically to run on
[{{site.data.tenant.name}} platform](https://www.{{site.data.tenant.name}} "{{site.data.tenant.name}} platform").
You can clone it and change it as you wish.

## Latest changelog

**1.0.0 - Nov 3, 2016**

- Initial release of guideline compliant component

> To see the full **changelog** please use the following [link](/components/sugarcrm/changelog).

## Authentication

In order for the {{site.data.tenant.name}} platform to authenticate with SugarCRM, the
following tasks need to be completed:

*   An admin must manually create an [OAuth App on the SugarCRM instance through SugarCRM's UI](creating-oauthapp-sugarcrm).
*   If using a version of SugarCRM released after Winter '18, you must
[register a platform on your SugarCRM instance](https://community.sugarcrm.com/community/developer/blog/2017/11/20/unknown-platforms-to-be-restricted-in-winter-18-release)
  *   With Sugar 8, this can [be done through the UI](http://support.sugarcrm.com/Documentation/Sugar_Versions/8.0/Ent/Administration_Guide/Developer_Tools/index.html#Configure_API_Platforms). Follow the [step by step instructions here](register-sugarcrm-value).
  *   It is also possible to load new platform values by [creating and installing a module](https://community.sugarcrm.com/docs/DOC-5875-tutorial-how-to-register-custom-platforms-in-sugar-instances)
*   Finally, authentication information for your Sugar instance must be entered into the {{site.data.tenant.name}} UI *(step by step instructions below)*

## Authentication on platform

![screenshot from 2018-05-04 13-45-46](https://user-images.githubusercontent.com/5710732/39626260-7a34e34c-4fa1-11e8-8cb2-de57183cd403.png)

Fill in the following for your account:

*   **Name Your Account**: Name to identify this account on {{site.data.tenant.name}}
*   **Your SugarCRM domain**: URL of your Sugar CRM instance
*   **Your login**: Username used to login to SugarCRM instance
*   **Your password**: Password used to login to SugarCRM instance
*   **Your OAuth 2.0 Consumer Key**: Value created in step 5ii.
*   **Your OAuth 2.0 Consumer Secret**: Value created in step 5iii.
*   **Custom Platform Value**: Platform value registered above.

For real-time tasks please use separate oauth keys to avoid login conflicts.

Parameter `platform` should be set to some custom string but should be unique
per sugar component in order to avoid any potential login conflicts.
So now `platform` is "`$TASK_ID:$STEP_ID`".

## Triggers

### Fetching New and Updated Objects from SugarCRM - Polling

It is possible to fetch any type newly created and/or updated object in your
SugarCRM instance. Select the trigger **Fetch new and updated objects** and
then configure the following:

![screenshot from 2017-09-21 11-20-40](https://user-images.githubusercontent.com/5710732/30688610-f825e81c-9ebe-11e7-8736-3c522f92c65c.png)

*  **SugarCRM module to fetch**: Type of object to fetch
*  **Number of records to fetch**: Maximum number of records to fetch per call.
 If left blank then the default set on your SugarCRM instance.

### Fetching New and Updated Objects from SugarCRM - Webhook

It is possible to have new and updated objects be pushed to the {{site.data.tenant.name}}
platform via webhooks. To do so, select **Fetch new and updated objects (`getObjects` - Webhook)**.
When a flow with this trigger is started, the {{site.data.tenant.name}} platform will register webhooks on
the SugarCRM instance. When the flow is stopped, this webhook will be destroyed by the platform.

### Fetch Deleted Objects from SugarCRM - Webhook

It is possible to have the ids of deleted objects be pushed to the {{site.data.tenant.name}}
platform via webhooks.  In order to do so, select **Fetch deleted objects (`getDeletedObjects` - Webhook)**.
When a flow with this trigger is started, the {{site.data.tenant.name}} platform
will register webhooks on the SugarCRM instance. When the flow is stopped, this
webhook will be destroyed by the platform.

## Actions

### Lookup Object By ID

Given an object, looks up the object with that ID. You must select the type of
object to lookup.

### Delete Object By ID

Given an object, deletes the object with that ID.  You must select the type of
object to lookup.

### Upsert Object By ID

Update an existing entry if the id provided.  Otherwise create a new entry.  You
must select the type of object to lookup.

## Configuration Info

### Required environment variables

For the local testing (e.g. spec-integration) `ELASTICIO_TASK_ID` and `ELASTICIO_STEP_ID`
environment variables should be provided.

## Version and compatibility information

This component interacts with version 10 of the SugarCRM REST API.  It has been
tested with:
*   `SugarCRM Enterprise, Version 7.9.1.0 (Build 1074)` and
*   `SugarCRM Enterprise, Version 8.0.0 (Build 211) (Spring '18)`.
