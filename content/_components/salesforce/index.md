---
title: Salesforce Component
layout: component
section: CRM components
description: A component enables you to manage your organization’s sales, marketing and customer support assets, far beyond email addresses and phone numbers.
icon: salesforce.png
icontext: Salesforce component
category: salesforce
createdDate: 2019-06-27
updatedDate: 2020-03-26
---

## Latest changelog

**1.3.3 (May 8, 2020)**

* Fix bug with 1,000 objects limit in actions:
  - Query
  - Lookup Object
  - Lookup Objects

  and trigger:
  - Get New and Updated Objects Polling.

  New configuration field Max Fetch Count added to configure the limit.

> To see the full **changelog** please use the following [link](/components/salesforce/changelog).

## Description

Integration component to connect the Salesforce for the [{{site.data.tenant.name}} platform](http://www.{{site.data.tenant.name}}).

> **Note**: The component works with the Salesforce API. This means you must
> make sure your Salesforce edition has API Access enabled. To check which editions
> have API access see the [Salesforce editions with API Access](https://help.salesforce.com/articleView?id=000326486&type=1&mode=1) document.
> **If your edition has no API Access by default this component _will not work for you_.**

### API version

The component uses Salesforce - API Version 45.0, except:

-   Deprecated Actions and Triggers - API Version 25.0

### Authentication

Authentication occurs via OAuth 2.0.

In the component repository you need to specify OAuth Client credentials as environment variables:

- ```OAUTH_CLIENT_ID``` - your OAuth client key

- ```OAUTH_CLIENT_SECRET``` - your OAuth client secret

> **Note**: We renamed the environment variables `SALESFORCE_KEY` and `SALESFORCE_SECRET` to standardize the OAuth workflow.

To get these values you can check the
[creating OAuth App for Salesforce](creating-oauth-app-for-salesforce) article.

The [component completeness](completeness-matrix) matrix gives the technical
details about Salesforce objects this component covers.

### Credentials

During credentials creation you would need to:

*   Choose `Environment`

*   Enter ``Username`` and ``Password`` in a pop-up window after click on ``Authenticate`` button.

*   Verify and save your new credentials.

> **Note**: When you deploy the Salesforce component separately into a dedicated tenant or
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
This trigger will subscribe for any platform Event using Salesforce streaming API.

The following Salesforce triggers are deprecated:

  1. [New Case trigger(deprecated)](/components/salesforce/triggers#new-case-triggerdeprecated)                                                                     
Polls existing and updated Cases (fetches a maximum of 1000 objects per execution)   
Trigger is `deprecated`. You can use [Get New and Updated Objects Polling](/components/salesforce/triggers#get-new-and-updated-objects-polling-trigger) trigger instead.

  2. [New Lead trigger(deprecated)](/components/salesforce/triggers#new-lead-triggerdeprecated)                                                                     
Polls existing and updated Leads (fetches a maximum of 1000 objects per execution)   
Trigger is `deprecated`. You can use [Get New and Updated Objects Polling](/components/salesforce/triggers#get-new-and-updated-objects-polling-trigger) trigger instead.

  3. [New Contact trigger(deprecated)](/components/salesforce/triggers#new-contact-triggerdeprecated)                                                                     
Polls existing and updated Contacts (fetches a maximum of 1000 objects per execution)
Trigger is `deprecated`. You can use [Get New and Updated Objects Polling](/components/salesforce/triggers#get-new-and-updated-objects-polling-trigger) trigger instead.

  4. [New Account trigger(deprecated)](/components/salesforce/triggers#new-account-triggerdeprecated)                                                                     
Polls existing and updated Accounts (fetches a maximum of 1000 objects per execution)
Trigger is `deprecated`. You can use [Get New and Updated Objects Polling](/components/salesforce/triggers#get-new-and-updated-objects-polling-trigger) trigger instead.

  5. [New Task trigger(deprecated)](/components/salesforce/triggers#new-task-triggerdeprecated)                                                                     
Polls existing and updated Tasks (fetches a maximum of 1000 objects per execution)   
Trigger is `deprecated`. You can use [Get New and Updated Objects Polling](/components/salesforce/triggers#get-new-and-updated-objects-polling-trigger) trigger instead.

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

  7. [Bulk Create/Update/Delete action](/components/salesforce/actions#bulk-createupdatedelete-action)                                                         
  Bulk API provides a simple interface for quickly loading large amounts of data from CSV file into Salesforce.

  8. [Bulk Query action](/components/salesforce/actions#bulk-query-action)        
  Fetches records to a CSV file.

The following Salesforce actions are deprecated:

  1. [Lookup Object (deprecated)](/components/salesforce/actions#lookup-object-actiondeprecated)                     
  Lookup an object by a selected field.Action is `deprecated`. You can use [Lookup Object action](/components/salesforce/actions#lookup-objects-action) or [Lookup Object action (at most 1)](/components/salesforce/actions#lookup-object-action-at-most-1) instead.

  2. [New Account (deprecated)](/components/salesforce/actions#new-account-actiondeprecated)                                                            
  This action will automatically retrieve all existing fields of `Account` object type that available on your Salesforce organization. Action is `deprecated`. You can use [Create Object action](/components/salesforce/actions#create-object-action) instead.

  3. [New Case (deprecated)](/components/salesforce/actions#new-case-actiondeprecated)                                                         
  Creates a new Case. Action is `deprecated`. You can use [Create Object action](/components/salesforce/actions#create-object-action) instead.

  4. [New Contact (deprecated)](/components/salesforce/actions#new-contact-actiondeprecated)                                                         
  Creates a new Contact. Action is `deprecated`. You can use [Create Object action](/components/salesforce/actions#create-object-action) instead.

  5. [New Event (deprecated)](/components/salesforce/actions#new-event-actiondeprecated)                                                         
  Creates a new Event. Action is `deprecated`. You can use [Create Object action](/components/salesforce/actions#create-object-action) instead.

  6. [New Lead (deprecated)](/components/salesforce/actions#new-lead-actiondeprecated)                                                         
  Creates a new Lead. Action is `deprecated`. You can use [Create Object action](/components/salesforce/actions#create-object-action) instead.

  7. [New Note (deprecated)](/components/salesforce/actions#new-note-actiondeprecated)                                                         
  Creates a new Note. Action is `deprecated`. You can use [Create Object action](/components/salesforce/actions#create-object-action) instead.

  8. [New Task (deprecated)](/components/salesforce/actions#new-task-actiondeprecated)                                                         
  Creates a new Task. Action is `deprecated`. You can use [Create Object action](/components/salesforce/actions#create-object-action) instead.

## Known limitations

Attachments mechanism does not work with [Local Agent Installation](/getting-started/local-agent)
