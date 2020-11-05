---
title: Quickbooks component
layout: component
section: Finance-related components
description: QuickBooks is a software to manage sales and expenses, and keep track of daily transactions.
icon: quickbooks.png
icontext: Quickbooks component
category: Quickbooks
createdDate: 2018-10-11
updatedDate: 2020-10-30
---

## General information

### API version / SDK version

By default minor API version 26 is used, but it's also possible to specify a more suitable minor API version in the credentials field `Minor API version` in case you really need it.

### Environment variables

|Name|Mandatory|Description|Values|
|----|---------|-----------|------|
|LOG_LEVEL| false | Controls logger level | `trace`, `debug`, `info`, `warn`, `error` |

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about AWS-S3 component like [changelog](/components/quickbooks/technical-notes#changelog) and [completeness matrix](/components/quickbooks/technical-notes#completeness-matrix).

## Credentials

Quickbooks service uses OAuth 2.0 authorization.
Information about how to retrieve OAuth keys you can find [here](https://developer.intuit.com/docs/00_quickbooks_online/1_get_started/40_get_development_keys).

The keys could be found [here](https://developer.intuit.com/v2/ui#/app/appdetail/{{application_id}}/{{application_id}}/keys).

If you create an app that needs a Callback URL for authentication purposes then the URL structure should be the following:

`https://{YOUR_TENANT_ADDRESS}/callback/oauth2`

![image](https://user-images.githubusercontent.com/16806832/97473962-3f026180-1954-11eb-9e5a-7288cab5fdbd.png)

* Company ID - Set the id of the company you want to access.
* Application Client Id - OAuth client id (client key)
* Application Client Secret - OAuth client secret
* Switching from production to sandbox environment - If `True` - sandbox environment will be used, if `False` - production one.
* Minor API version - This field represents current API [minor version](https://developer.intuit.com/app/developer/qbo/docs/develop/explore-the-quickbooks-online-api/minor-versions#minor-version-summary). For default, it's 26.

## Triggers

### Polling Trigger

Allows to get entries by chosen type. On first request, trigger will provide all existing objects by current type.
On the next iterations, trigger will provide ONLY objects which were changed since a previous request. **This trigger supports all type of business entities and response pagination.** To set response size you should set/change 'Batch Size for request pagination' field in trigger settings.

#### List of Expected Config fields

 * Polling Object - dropdown with a list of objects available for polling
 * Batch Size for request pagination - The maximum number of entities that can be returned is 1000. If the result size is not specified, the default number is 1000. If a query returns a big amount of entities, it is recommended to fetch the entities in chunks.

## Actions

### Insert Object

Allows to add a new entity to your company. To Insert entity you must provide
mandatory fields and fields which you want to update. This action is available
ONLY for entities which can't be updated with API. **This action contains dynamic metadata.**

### Upsert Object

Allows to add a new object or update one of the existing objects in your company.
To add a new object you should provide business required fields in the request body.
To update entity you should provide primary key and fields which you want to update.
**This action contains dynamic metadata.**

### Delete Object

Allows to remove existing entity in your division. To remove contact you need to
provide a primary key in the request body. **This action contains dynamic metadata.**

### General Update & Upsert Actions

To prevent problems with concurrent access QuickBooks API entities have SyncToken
field. This field is required for update API request.
If you provide wrong SyncToken your request will be rejected with 400 code.

## Current Limitations

For now, API [XSD description](https://developer.intuit.com/docs/00_quickbooks_online/2_build/20_explore_the_quickbooks_online_api/80_minor_versions) doesn't have any information
about required fields, so be careful while creating insert, update or upsert requests.

Entities metadata structure was created from `v3_minor_version_26` XSD version.
Be careful, metadata was created once from the XSD, and now is stored in the component `schemas/io`.

**The QuickBooks API has some limitations for request number:**

*   Sandbox servers: Throttled at 100 requests per minute, per individual app.
*   Production servers: Throttled to 500 requests per minute, per realm ID.

Here is [more information about the request limitations](https://developer.intuit.com/docs/00_quickbooks_online/2_build/20_explore_the_quickbooks_online_api/80_minor_versions).

## Known limitations

1. For now, API [XSD description](https://developer.intuit.com/docs/00_quickbooks_online/2_build/20_explore_the_quickbooks_online_api/80_minor_versions) doesn't have any information about required fields, so be careful while creating insert, update or upsert requests.
Entities metadata structure was created from ` v3_minor_version_26 ` XSD version.
Be careful, metadata was created once from the XSD, and now is storing in the component.
2. The QuickBooks API has some limitations for request number:
- Sandbox servers: Throttled at 100 requests per minute, per individual app.
- Production servers: Throttled to 500 requests per minute, per realm ID.
[Here](https://developer.intuit.com/docs/00_quickbooks_online/2_build/20_explore_the_quickbooks_online_api/80_minor_versions) is more information about request limitations.

3. To prevent problems with concurrent access QuickBooks API entities have SyncToken field. This field is required for update API request.
If you provide wrong SyncToken your request will be rejected with 400 code.

4. Metadata
Most field of Quick Books entities are optionally required - they are NOT marked in EIO web so be careful and
check the QB [docs](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/most-commonly-used/account)
before building a request.

## Additional info

*  [QuickBooks Online REST API documentation](https://developer.intuit.com/docs/00_quickbooks_online/2_build/20_explore_the_quickbooks_online_api)
*  Here is how to [create custom fields for QuickBooks API](https://developer.intuit.com/docs/00_quickbooks_online/2_build/60_tutorials/0040_create_custom_fields).
