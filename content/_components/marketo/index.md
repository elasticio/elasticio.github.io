---
title: Marketo component
layout: component
section: Marketing-related components
description: A marketing automation component focused on account-based marketing.
icon: marketo.png
icontext: Marketo component
category: marketo
createdDate: 2018-03-02
updatedDate: 2020-05-08
---

## Latest changelog

**2.1.0 (May 8, 2020)**

* Add `Get New Activities Polling` trigger
* Add `Get New Leads Polling` trigger
* Add `Upsert Objects` action
* Fix `Lookup Activities` bug in case of empty response
* Add `Bulk Import` action
* Add `Bulk Extract` action
* Add `Poll Bulk Extract Results` trigger

> To see the full **changelog** please use the following [link](/components/marketo/changelog).

## Description

[Marketo](https://www.marketo.com/) is a marketing automation platform focused
on account-based marketing, including email, mobile, social, digital ads, web
management and analytics.

### Authentication

Marketo [provides instructions to grant API access](http://developers.marketo.com/rest-api/) under the section `Getting Started`.  The following permissions are required for the role:

 * `Access API`.`Read-Only Activity` -> For all polling tasks and for verifying
 credentials
 * `Access API`.`Read-Only Lead` -> For `GetLeadsPolling`

### Environment variables

|Name|Mandatory|Description|Values|
|----|---------|-----------|------|
|`LOG_LEVEL`| false | Controls logger level | `trace`, `debug`, `info`, `warning`, `error` |
|`SWAGGER_URL`| false | Define url to Marketo swagger document for generation correct metadata  | https://developers.marketo.com/swagger/swagger-mapi.json |
|`BULK_IMPORT_POLLING_TIMEOUT`| false | Timeout for polling bulk import job status in ms | 60000 |

###  Credentials

 * Client Id

 * Client Secret

 * Endpoint URL
   Url of your endpoint. For example `https://example.com/rest`

 * Identity URL
   Url of your identity. For example `https://example.com/identity`

First two items you can find here:

![Rest API serviceand no permissions service](img/rest-API-service-and-no-permissions-service.png)

Other two here:

![Endpoint and Identity](img/endpoint-and-identity.png)

Once these values have been collected, they can be entered in the account information [{{site.data.tenant.name}}](http://www.{{site.data.tenant.name}}).

### Completeness Matrix

The [component completeness](completeness-matrix) matrix gives the technical
details about Salesforce objects this component covers.

## Triggers

  1. [Get New Activities Polling](/components/marketo/triggers#get-new-activities-polling)                                  
  Trigger to get all new and updated activities since last polling.

  2. [Get New Leads Polling](/components/marketo/triggers#get-new-leads-polling)                                            
  Trigger to get all leads updates. Only [updated](https://developers.marketo.com/rest-api/lead-database/activities/#data_value_changes) leads fields wold be retrieved.

  3. [Poll Bulk Extract Results](/components/marketo/triggers#poll-bulk-extract-results)                                       
  Poll Bulk Extract Results and download file with extracted data to attachments.


## Actions

 1. [Describe Object](/components/marketo/actions#describe-object)                                                              
 Get describe Object metadata.

 2. [List Custom Objects](/components/marketo/actions#list-custom-objects)                                                   
 Action will return a list of custom objects available in the destination instance, along with additional metadata about the objects.

 3. [Lookup Objects](/components/marketo/actions#lookup-objects)                                                             
 Lookup objects by criteria.

 4. [Lookup Activities](/components/marketo/actions#lookup-activities)                                                       
 Lookup Activities by criteria.

 5. [Bulk Import](/components/marketo/actions#bulk-import)                                                                   
 Action for insertion of large sets of person and person related data.

 6. [Upsert Objects](/components/marketo/actions#upsert-objects)                                                             
 Action upsert objects by unique criteria.
 
 7. [Bulk Extract](/components/marketo/actions#bulk-extract)                                                                
 Extract file with Requested data to attachments.

## Known limitations

1. See [REST API limitations](https://developers.marketo.com/rest-api/marketo-integration-best-practices/)
2. We recommend to set flow to realtime if total execution time is greater than 60 seconds.
3. The attachments mechanism does not work with Local Agent Installation.
