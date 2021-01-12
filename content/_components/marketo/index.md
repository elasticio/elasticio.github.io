---
title: Marketo component
layout: component
section: Marketing-related components
description: A marketing automation component focused on account-based marketing.
icon: marketo.png
icontext: Marketo component
category: marketo
createdDate: 2018-03-02
updatedDate: 2020-05-21
---

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

| Name|Mandatory|Description|Values|
|----|---------|-----------|------|
| `SWAGGER_URL`| false | Define url to Marketo swagger document for generation correct metadata  | https://developers.marketo.com/swagger/swagger-mapi.json |
| `BULK_IMPORT_POLLING_TIMEOUT`| false | Timeout for polling bulk import job status in ms | 60000 |

> Please Note: From the platform version [20.51](/releases/2020-12-17) we deprecated the
> component `LOG_LEVEL` environment variable. Now you can control logging level per each step of the flow. 

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

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Marketo component like [changelog](/components/marketo/technical-notes#changelog) and [completeness matrix](/components/marketo/technical-notes#completeness-matrix).

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

 8. [Delete Object by Unique Criteria](/components/marketo/actions#delete-object-by-unique-criteria)
 Delete Object By Unique Criteria.

 9. [Lookup Object (at most 1)](/components/marketo/actions#lookup-object-at-most-1)
 Lookup Object By Unique Criteria.

## Known limitations

1. See [REST API limitations](https://developers.marketo.com/rest-api/marketo-integration-best-practices/)
2. We recommend to set flow to realtime if total execution time is greater than 60 seconds.
3. The attachments mechanism does not work with Local Agent Installation.
