---
title: Sugar-crm component
layout: article
section: CRM Components
---


[SugarCRM](https://www.sugarcrm.com) is a CRM system with a  a simple user
interface, industry-leading customer experience, and an intuitive customization
platform.

This is an open source component template for [Sugar
CRM](https://www.sugarcrm.com) which is developed specifically to run on
[elastic.io platform](https://www.elastic.io "elastic.io platform"). You can
clone it and change it as you wish.

# Authentication
In order for the elastic.io platform to authenticate with SugarCRM, the
following tasks need to be completed:
* An admin must manually create an OAuth App on the SugarCRM instance through SugarCRM's UI *(step by step instructions below)*
* [If using a version of SugarCRM that was released after Winter '18, you must
register a platform on your SugarCRM
instance](https://community.sugarcrm.com/community/developer/blog/2017/11/20/unknown-platforms-to-be-restricted-in-winter-18-release)
  * With Sugar 8, this can [be done through the
  UI](http://support.sugarcrm.com/Documentation/Sugar_Versions/8.0/Ent/Administration_Guide/Developer_Tools/index.html#Configure_API_Platforms)
  *(step by step instructions below)*
  * It is also possible to load new platform values by [creating and installing
   a
   module](https://community.sugarcrm.com/docs/DOC-5875-tutorial-how-to-register-custom-platforms-in-sugar-instances)
* Finally, authentication information for your Sugar instance must be entered into the elastic.io UI *(step by step instructions below)*

## Creating an app on a SugarCRM instance
In order the platform to connect to your SugarCRM instance, an app needs to be
created on that instance.  Below are the steps to do so.  Once that is done, you
will provide a valid username and password to the elastic.io platform.  The
platform will exchange that username and password for a token.  In a production
system, the best practice is to create a dedicated user for the elastic.io
platform.  This user should have the minimum required permissions.

1. As an admin on your SugarCRM instance, go to the Administration panel

   ![screenshot from 2017-09-21 10-16-21](https://user-images.githubusercontent.com/5710732/30685820-76e92b22-9eb6-11e7-8efc-2715b9102f26.png)
2. Select **OAuth Keys**

   ![screenshot from 2017-09-21 10-17-08](https://user-images.githubusercontent.com/5710732/30685819-76e71f8a-9eb6-11e7-8f79-505111d2c0df.png)
3. In the top bar, select the dropdown for the now visible **OAuth Keys** option

   ![screenshot from 2017-09-21 10-17-45](https://user-images.githubusercontent.com/5710732/30685818-76dea1ca-9eb6-11e7-85ae-0dc7fc15e987.png)
4. Select **Create OAuth Key**
5. Fill in the following values:
   1. **Consumer Key Name**: Pick a name that is convenient to remember
   1. **Consumer Key**: Pick a strongly random string.  You will need to provide
   this information as part of the SugarCRM component account information
   1. **Consumer Secret**: Pick a strongly random string.  You will need to
   provide this information as part of the SugarCRM component account
   information
   1. **OAuth Version**: OAuth 2.0
   1. **Client Type**: Sugar User
   1. **Description**: Optional value for your convenience

   ![screenshot from 2017-09-21 10-18-21](https://user-images.githubusercontent.com/5710732/30685817-76c6c1d6-9eb6-11e7-991f-37830f1c35ac.png)
6. Click **Save**

## Registering a New SugarCRM Platform Value through the UI
1. As an admin on your SugarCRM instance, go to the Administration panel

   ![screenshot from 2017-09-21 10-16-21](https://user-images.githubusercontent.com/5710732/30685820-76e92b22-9eb6-11e7-8efc-2715b9102f26.png)
2. Select **Configure API Platforms**

   ![screenshot from 2018-05-04 11-58-04](https://user-images.githubusercontent.com/5710732/39622436-7baf1e36-4f92-11e8-97e5-8d09b7bbea32.png)
3. Enter a value of your choosing for the new platform and click **Add** and then **Save**.

   ![screenshot from 2018-05-04 12-03-31](https://user-images.githubusercontent.com/5710732/39622613-35964b26-4f93-11e8-82e6-fed4b70fce56.png)

## Authentication on elastic.io

![screenshot from 2018-05-04 13-45-46](https://user-images.githubusercontent.com/5710732/39626260-7a34e34c-4fa1-11e8-8cb2-de57183cd403.png)

Fill in the following for your account:
* **Name Your Account**: Name to identify this account on elastic.io
* **Your SugarCRM domain**: URL of your Sugar CRM instance
* **Your login**: Username used to login to SugarCRM instance
* **Your password**: Password used to login to SugarCRM instance
* **Your OAuth 2.0 Consumer Key**: Value created in step 5ii.
* **Your OAuth 2.0 Consumer Secret**: Value created in step 5iii.
* **Custom Platform Value**: Platform value registered above.

For real-time tasks please use separate oauth keys to avoid login conflicts.

Parameter `platform` should be set to some custom string but should be unique per sugar component in order to avoid any potential login conflicts.
So now `platform` is "`$TASK_ID:$STEP_ID`".

# Triggers
## Fetching New and Updated Objects from SugarCRM - Polling

It is possible to fetch any type newly created and/or updated object in your
SugarCRM instance.  Select the trigger **Fetch new and updated objects** and
then configure the following:

![screenshot from 2017-09-21 11-20-40](https://user-images.githubusercontent.com/5710732/30688610-f825e81c-9ebe-11e7-8736-3c522f92c65c.png)

* **SugarCRM module to fetch**: Type of object to fetch
* **Number of records to fetch**: Maximum number of records to fetch per call.
 If left blank then the default set on your SugarCRM instance.

## Fetching New and Updated Objects from SugarCRM - Webhook

It is possible to have new and updated objects be pushed to the elastic.io
platform via webhooks.  In order to do so, select **Fetch new and updated
objects (getObjects - Webhook)**.  When a flow with this trigger is started, the
elastic.io platform will register webhooks on the SugarCRM instance.  When the
flow is stopped, this webhook will be destroyed by the platform.

## Fetch Deleted Objects from SugarCRM - Webhook

It is possible to have the ids of deleted objects be pushed to the elastic.io
platform via webhooks.  In order to do so, select **Fetch deleted objects
(getDeletedObjects - Webhook)**.  When a flow with this trigger is started, the
elastic.io platform will register webhooks on the SugarCRM instance.  When the
flow is stopped, this webhook will be destroyed by the platform.

# Actions
## Lookup Object By ID

Given an object, looks up the object with that ID.  You must select the type of
object to lookup.

## Delete Object By ID

Given an object, deletes the object with that ID.  You must select the type of
object to lookup.

## Upsert Object By ID

Update an existing entry if the id provided.  Otherwise create a new entry.  You
must select the type of object to lookup.

# Configuration Info
## Required environment variables
For the local testing (e.g. spec-integration) `ELASTICIO_TASK_ID` and `ELASTICIO_STEP_ID` envs should be provided.

## Version and compatibility information
This component interacts with version 10 of the SugarCRM REST API.  It has been
tested with ``SugarCRM Enterprise, Version 7.9.1.0 (Build 1074)`` and ``SugarCRM
Enterprise, Version 8.0.0 (Build 211) (Spring '18)``.

[npm-image]: https://badge.fury.io/js/sugarcrm-component.svg
[npm-url]: https://npmjs.org/package/sugarcrm-component
[travis-image]: https://travis-ci.org/elasticio/sugarcrm-component.svg?branch=master
[travis-url]: https://travis-ci.org/elasticio/sugarcrm-component
[daviddm-image]: https://david-dm.org/elasticio/sugarcrm-component.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/elasticio/sugarcrm-component
[circle-image]: https://circleci.com/gh/elasticio/sugarcrm-component.svg?style=svg&circle-token=b1275f44aed2c3448bee5dccf7cb0a8970a1a0d1
[circle-url]: https://circleci.com/gh/elasticio/sugarcrm-component
