---
title: Salesforce Component
layout: component
section: CRM components
description: A component enables you to manage your organization’s sales, marketing and customer support assets, far beyond email addresses and phone numbers.
icon: salesforce.png
icontext: Salesforce component
category: salesforce
createdDate: 2019-06-27
updatedDate: 2020-10-30
---

## Description

Integration component to connect the Salesforce for the [{{site.data.tenant.name}} platform](http://www.{{site.data.tenant.name}}).

> **Please Note**: The component works with the Salesforce API. This means you must
> make sure your Salesforce edition has API Access enabled. To check which editions
> have API access see the [Salesforce editions with API Access](https://help.salesforce.com/articleView?id=000326486&type=1&mode=1) document.
> **If your edition has no API Access by default this component _will not work for you_.**

### API version

The component uses Salesforce - API Version 46.0 by defaults but can be overwritten by the environment variable `SALESFORCE_API_VERSION`.

>**Please note:** Deprecated Actions and Triggers - API Version 25.0

### Environment variables

|Name|Mandatory|Description|Values|
|----|---------|-----------|------|
|LOG_LEVEL| false | Controls logger level | `trace`, `debug`, `info`, `warn`, `error` |
|SALESFORCE_API_VERSION| false | Determines API version of Salesforce to use | Default: `46.0` |
|REFRESH_TOKEN_RETRIES| false | Determines how many retries to refresh token should be done before throwing an error | Default: `10` |
|HASH_LIMIT_TIME| false | Hash expiration time in ms  | Default: `600000` |
|HASH_LIMIT_ELEMENTS| false | Hash size number limit  | Default: `10` |

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about AWS-S3 component like [changelog](/components/salesforce/technical-notes#changelog) and [completeness matrix](/components/salesforce/technical-notes#completeness-matrix).

## Credentials

Authentication occurs via OAuth 2.0.

In order to make OAuth work, you need a new App in your Salesforce. During app creation process you will be asked to specify
the callback URL, to process OAuth authentication via elastic.io platform your callback URL should be `{{site.data.tenant.appURL}}/callback/oauth2`.

More information you can find [here](https://help.salesforce.com/apex/HTViewHelpDoc?id=connected_app_create.htm).

### Credentials creation

During credentials creation you would need to:

- select existing Auth Client from drop-down list ``Choose Auth Client`` or create the new one.

![Add new client](img/add-new-client.png)

For creating Auth Client you should specify following fields:

![Define client](img/define-client.png)

|Field name|Mandatory|Description|
|----|---------|-----------|
|Name| true | your Auth Client's name |
|Client ID| true | your OAuth client key |
|Client Secret| true | your OAuth client secret |
|Authorization Endpoint| true | your OAuth authorization endpoint. For production use `https://login.salesforce.com/services/oauth2/authorize`, for sandbox - `https://test.salesforce.com/services/oauth2/authorize`|
|Token Endpoint| true | your OAuth Token endpoint for refreshing access token. For production use `https://login.salesforce.com/services/oauth2/token`, for sandbox - `https://test.salesforce.com/services/oauth2/token`|

- fill field ``Name Your Credential``
- click on ``Authenticate`` button - if you have not logged in Salesforce before then log in by entering data in the login window that appears
- click on ``Verify`` button for verifying your credentials
- click on ``Save`` button for saving your credentials

Here you can see how to select an existing `client`:

![Choose client](img/client-exist.png)

For more information pleas read our [Creating OAuth App for Salesforce](creating-oauth-app-for-salesforce) article.

> **Please Note**: When you deploy the Salesforce component separately into a dedicated tenant or
> into your developer team it can not use the OAuth App specifically created for
> our main {{site.data.tenant.name}} tenant. For this purposes you must create a
> different OAuth App and add the required environment variables to the component setup.

## Triggers

Salesforce component includes the following triggers:

  1. [Query trigger](/components/salesforce/triggers#query-trigger)                                                                          
Continuously runs the same SOQL Query and emits results one-by-one. Use the Salesforce Object Query Language (SOQL) to search your organization’s Salesforce data for specific information.

  2. [Get New and Updated Objects Polling trigger](/components/salesforce/triggers#get-new-and-updated-objects-polling-trigger)                                                                          
Polls existing and updated objects. You can select any custom or built-in object for your Salesforce instance.

  3. [Subscribe to platform events](/components/salesforce/triggers#subscribe-to-platform-events-trigger)                                                                          
This trigger will subscribe for any platform Event using Salesforce streaming API. Realtime flows only.

> You can find information on deprecated triggers [here](deprecated-functions#deprecated-actions).

## Actions

Use this list to navigate to the action you seek.

  1. [Query action](/components/salesforce/actions#query-action)                
  Executing a SOQL Query that may return many objects. Each resulting object is emitted one-by-one. Use the Salesforce Object Query Language (SOQL) to search your organization’s Salesforce data for specific information.

  2. [Create Object action](/components/salesforce/actions#create-object-action)  
  Creates a new Selected Object. Action creates a single object.

  3. [Delete Object action](/components/salesforce/actions#delete-object-action-at-most-1)                                                                              
  Deletes an object by a selected field. One can filter by either unique fields or all fields of that sobject.

  4. [Upsert Object action](/components/salesforce/actions#upsert-object-action)                                                                      
  Creates or Updates Selected Object. Action creates a single object.

  5. [Lookup Object action(at most 1)](/components/salesforce/actions#lookup-object-action-at-most-1)                                                                               
  Lookup an object by a selected field. Action creates a single object.

  6. [Lookup Objects action](/components/salesforce/actions#lookup-objects-action)                                                                    
  Lookup a list of objects satisfying specified criteria.

  7. [Bulk Create/Update/Delete/Upsert action](/components/salesforce/actions#bulk-createupdatedeleteupsert-action)                                                         
  Bulk API provides a simple interface for quickly loading large amounts of data from CSV file into Salesforce.

  8. [Bulk Query action](/components/salesforce/actions#bulk-query-action)        
  Fetches records to a CSV file.

> You can find information on deprecated actions [here](deprecated-functions#deprecated-triggers).

## Known limitations

Attachments mechanism does not work with [Local Agent Installation](/getting-started/local-agent)
