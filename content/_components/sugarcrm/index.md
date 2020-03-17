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

**1.1.0 (December 25, 2019)**

* Add support for `Bulk operations` (Create/Update/Delete)
* Add `Lookup Objects` action
* Add `Query` action
* `Upsert Entry` action: add ability to utilize binary data attachment from previous step
* `Lookup Object` action: add ability to pass binary data (if found object has it) to the next component as a binary attachment

> To see the full **changelog** please use the following [link](/components/sugarcrm/changelog).

## Authentication

In order for the {{site.data.tenant.name}} platform to authenticate with SugarCRM, the
following tasks need to be completed:

*   An admin must manually create an [OAuth App on the SugarCRM instance through SugarCRM's UI](creating-oauthapp-sugarcrm).
*   If using a version of SugarCRM released after Winter '18, you must
[register a platform on your SugarCRM instance](https://community.sugarcrm.com/community/developer/blog/2017/11/20/unknown-platforms-to-be-restricted-in-winter-18-release)
*   With Sugar 8, this can [be done through the UI](http://support.sugarcrm.com/Documentation/Sugar_Versions/8.0/Ent/Administration_Guide/Developer_Tools/index.html#Configure_API_Platforms) here](register-sugarcrm-value).
*   It is also possible to load new platform values by [creating and installing a module](https://community.sugarcrm.com/docs/DOC-5875-tutorial-how-to-register-custom-platforms-in-sugar-instances)
  Developers use the `platform` parameter to distinguish their custom platform from other clients when using the Sugar API. For example, when a user accesses Sugar via the desktop client and the mobile client simultaneously without being logged out of either, it is because the API recognizes that they are different platforms due to their unique platform identifiers. The platform identifier also makes it easy for a Sugar administrator to configure which API platforms are allowed to access their instance via Admin > Configure API Platforms.

  To learn more about platform identifiers, please refer to the [Sugar Developer Blog](https://community.sugarcrm.com/community/developer/blog/2016/05/09/how-platform-parameter-works-in-sugar-v10-rest-api) in the SugarCRM Community.

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

SugarCRM component includes the following triggers:

  1. [Fetching New and Updated Objects from SugarCRM - Polling](/components/sugarcrm/triggers#fetching-new-and-updated-objects-from-sugarcrm---polling)    
  It is possible to fetch any type newly created and/or updated object in your
  SugarCRM instance.

  2. [Fetching New and Updated Objects from SugarCRM - Webhook](/components/sugarcrm/triggers#fetching-new-and-updated-objects-from-sugarcrm---webhook)    
  It is possible to have new and updated objects be pushed to the {{site.data.tenant.name}} platform via webhooks.

  3. [Fetch Deleted Objects from SugarCRM - Webhook](/components/sugarcrm/triggers#fetch-deleted-objects-from-sugarcrm---webhook)    
  It is possible to have the ids of deleted objects be pushed to the {{site.data.tenant.name}} platform via webhooks.

## Actions

SugarCRM component includes the following actions:

  1. [Lookup Object By ID action](/components/sugarcrm/actions#lookup-object-by-id-action)     
  Given an object, looks up the object with that ID. You must select the type of object to lookup.

  2. [Lookup Objects action](/components/sugarcrm/actions#lookup-objects-action)     
  Lookup a list of objects satisfying specified criteria.

  3. [Delete Object By ID action](/components/sugarcrm/actions#delete-object-by-id-action)     
  Given an object, deletes the object with that ID. You must select the type of object to lookup.

  4. [Upsert Object By ID action](/components/sugarcrm/actions#upsert-object-by-id-action)     
  Update an existing entry if the id provided. Otherwise create a new entry. You must select the type of object to lookup.

  5. [Bulk Create Objects action](/components/sugarcrm/actions#bulk-create-objects-action)     
  Provides a simple interface for quickly creating large amounts of objects.

  6. [Bulk Update Objects action](/components/sugarcrm/actions#bulk-update-objects-action)     
  Provides a simple interface for quickly updating large amounts of objects.

  7. [Bulk Delete Objects action](/components/sugarcrm/actions#bulk-delete-objects-action)     
  Provides a simple interface for quickly deleting large amounts of objects.

  8. [Query action](/components/sugarcrm/actions#query-action)             
  Retrieve a set of records filtered by an expression utilizing the SugarCRM REST API filter endpoint.

## Configuration Info

### Required environment variables

For the local testing (e.g. spec-integration) `ELASTICIO_TASK_ID` and `ELASTICIO_STEP_ID`
environment variables should be provided.

### Version and compatibility information

This component interacts with version 10 of the SugarCRM REST API.  It has been
tested with:
*   `SugarCRM Enterprise, Version 7.9.1.0 (Build 1074)` and
*   `SugarCRM Enterprise, Version 8.0.0 (Build 211) (Spring '18)`.
