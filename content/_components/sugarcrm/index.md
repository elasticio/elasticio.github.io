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

### Input field description

* **SugarCRM module to lookup** - dropdown list where you should choose the module, which you want to lookup. E.g. `Accounts`.

* **Pass binary data to the next component (if found object has it)** - a checkbox, if it is checked and found object has a binary field (type of `file`) then its data will be passed to the next component as a binary attachment.

## Lookup Objects

Lookup a list of objects satisfying specified criteria.

### Input field description

* **SugarCRM module to lookup** - dropdown list where you should choose the module, which you want to lookup. E.g. `Accounts`.

* **Output method** - dropdown list with following values: "Emit all", "Emit page", "Emit individually".

* **Number of search terms** - text field where you can specify a number of search terms (not less than 0 and not greater than 99). Default value is 0 (if provided value is not allowed).

### Metadata description

Depending on the configuration field *Output method* the input metadata can contain different fields:

*Output method* - "Emit page":

Field "Page size" - required positive integer that defaults to 1000;

Field "Page number" - required non-negative integer (starts with 0, default value 0);

*Output method* - "Emit all":
Field "Maximum number of records" - optional positive integer (default value 1000);

*Output method* - "Emit individually":
Field "Maximum number of records" - optional positive integer (default value 10000);

>**Note** that the number of records the component emits may affect the performance of the platform/component.

Groups of fields for each search term go next:

Field "Field name" - string represents module's field (a list of allowed values is available);

Field "Field value" - string represents value for selected field;

Field "Condition" - one of the following: "=", "!=", "<", "<=", ">", ">=", "STARTS WITH", "ENDS WITH", "CONTAINS", "IS NULL", "NOT NULL", "IN", "NOT IN";

Between each two term's group of fields:

Field "Logical operator" - one of the following: "AND", "OR";

Output data depends on the configuration field *Output method*:

* "Emit page", "Emit all" - an array of records;
* "Emit individually" - a record;

### Delete Object By ID

Given an object, deletes the object with that ID.  You must select the type of
object to lookup.

### Upsert Object By ID

Update an existing entry if the id provided. Otherwise create a new entry. You must select the type of object to lookup.
Input metadata is fetched dynamically from your SugarCRM account. Output metadata is the same as input metadata, so you may expect all fields that you mapped as input to be returned as output.

#### Input fields description

* **Module** - Input field where you should choose the object type, which you want to find. E.g. `Note`

* **Utilize data attachment from previous step (for objects with a binary field)** - a checkbox, if it is checked and an input message contains an attachment and specified object has a binary field (type of `file`) then the attachment is put into object's binary field.

#### Limitations

When **Utilize data attachment from previous step (for objects with a binary field)** is checked and this action is used with Local Agent error would be thrown: 'getaddrinfo ENOTFOUND steward-service.platform.svc.cluster.local steward-service.platform.svc.cluster.local:8200'

### Bulk Create Objects

Provides a simple interface for quickly creating large amounts of objects.

#### Input field description

* **Module** - dropdown list where you should choose the object type to perform bulk create operation. E.g. `Cases`.

#### Metadata description

* **Objects** - an array of the objects that will be created. Example of format [SugarCRM objects](https://support.sugarcrm.com/Documentation/Sugar_Developer/Sugar_Developer_Guide_9.2/Integration/Web_Services/REST_API/Endpoints/module_POST/)

Result is an object with a property **result**: `array`. It contains the list of newly created objects.

### Bulk Update Objects

Provides a simple interface for quickly updating large amounts of objects.

#### Input field description

* **Module** - dropdown list where you should choose the object type to perform bulk update operation. E.g. `Cases`.

### Metadata description

* **Massupdate_params** - an object contains `array` of uid's and new values for updated objects. Action allows not only update primitive fields but also add or replace values in the lists. Please, take a look [SugarCRM Mass Update](https://support.sugarcrm.com/Documentation/Sugar_Developer/Sugar_Developer_Guide_9.2/Integration/Web_Services/REST_API/Endpoints/moduleMassUpdate_PUT/) documentation for examples.

Result is an object with the 2 properties:

* **failed** - `numeric`, how many objects were failed to update.

* **status** - `string`, if operation were successful `status="done"`. Operation could consider successful even if `failed > 0`

Note: SugarCRM server doesn't return errors in case of a wrong uid.

### Bulk Delete Objects

Provides a simple interface for quickly deleting large amounts of objects.

#### Input field description

* **Module** - dropdown list where you should choose the object type to perform bulk delete operation. E.g. `Cases`.

#### Metadata description

* **Massupdate_params** - an object contains `array` of uid's for deleted objects. Please, take a look [SugarCRM Mass Update](https://support.sugarcrm.com/Documentation/Sugar_Developer/Sugar_Developer_Guide_9.2/Integration/Web_Services/REST_API/Endpoints/moduleMassUpdate_DELETE/) documentation for examples.

Result is an object with the 2 properties:

* **failed** - `numeric`, how many objects were failed to delete.

* **status** - `string`, if operation were successful `status="done"`. Operation could consider successful even if `failed > 0`

### Query

Retrieve a set of records filtered by an expression utilizing the SugarCRM REST API filter endpoint. [See for details](https://support.sugarcrm.com/Documentation/Sugar_Developer/Sugar_Developer_Guide_9.1/Integration/Web_Services/REST_API/Endpoints/modulefilter_POST/)

#### Input field description

* **SugarCRM module** - dropdown list where you should choose the module, which you want to lookup. E.g. `Accounts`.

* **Output method** - dropdown list with following values: `Emit all`, `Emit individually`.

#### Metadata description

In the Intergator mode a request can be built by filling the following fields:

* **Filter expression** - JSON object representing the filter expression. E.g.

```json
  [
    {
      "billing_address_country":
      {
        "$in": ["England","France"]
      }
    }
  ]
```

* **Maximum number of records** - maximum number of records to return. Default is 20.

* **The number of records to skip** - number of records to skip over before records are returned. Default is 0.

* **How to sort the returned records** - how to sort the returned records, in a comma delimited list with the direction appended to the column name after a colon.

E.g. "name:DESC,account_type:DESC,date_modified:ASC".

In the Developer mode a request can be built utilizing all features by providing a JSON object (for more information go to the link above). E.g.:

```json
{
  "filter": [{
    "$or": [{
        "$and": [{
            "billing_address_country": {
              "$not_in": ["DE", "India"]
            }
          },
          {
            "acc_float_c": {
              "$is_null": ""
            }
          }
        ]
      },
      {
        "billing_address_country": {
          "$equals": "England"
        }
      }
    ]
  }],
  "fields": "id,name,billing_address_country,parent_name,accdate_c,acccheck_c,acc_float_c",
  "max_num": 42
}
```

>**Note** that the number of records the component emits may affect the performance of the platform/component.

Output data depends on the configuration field **Output method**:

* `Emit all` - an array of records.

* `Emit individually` - a record.

## Configuration Info

### Required environment variables

For the local testing (e.g. spec-integration) `ELASTICIO_TASK_ID` and `ELASTICIO_STEP_ID`
environment variables should be provided.

### Version and compatibility information

This component interacts with version 10 of the SugarCRM REST API.  It has been
tested with:
*   `SugarCRM Enterprise, Version 7.9.1.0 (Build 1074)` and
*   `SugarCRM Enterprise, Version 8.0.0 (Build 211) (Spring '18)`.
