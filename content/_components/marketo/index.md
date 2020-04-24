---
title: Marketo component
layout: component
section: Marketing-related components
description: A marketing automation component focused on account-based marketing.
icon: marketo.png
icontext: Marketo component
category: marketo
createdDate: 2018-03-02
updatedDate: 2020-04-23
---

## Latest changelog

**2.0.0 (April 23, 2020)**

* Add `Lookup Objects` action
* Add `Lookup Activities` action
* Add `Describe Object` action
* Add `List Custom Objects` action

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

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Describe Object

#### List of Expected Config fields

List contains default object types and custom object types.

|Supported default object types|
|-----------|
|Companies|
|Leads|
|Named Accounts|
|Opportunities|
|Opportunity Roles|
|Sales Persons|


#### Expected output metadata

[/src/schemas/describeObject.out.json](/src/schemas/describeObject.out.json)


### List Custom Objects

Action will return a list of custom objects available in the destination instance, along with additional metadata about the objects.

#### Expected output metadata

[/src/schemas/listCustomObjects.out.json](/src/schemas/listCustomObjects.out.json)

### Lookup Objects

#### List of Expected Config fields

List contains default object types and custom object types.

|Supported default object types|
|-----------|
|Companies|
|Leads|
|Named Accounts|
|Opportunities|
|Opportunity Roles|
|Sales Persons|

##### Emit Behaviour

Options are: `Emit Individually` emits each object in separate message, `Fetch All` emits all objects in one message

#### Expected input metadata

<details>
<summary>Input json Schema</summary>

```json
{
  "type": "object",
  "properties": {
    "searchTerm0": {
      "title": "Search term",
      "type": "object",
      "properties": {
        "filterType": {
          "title": "Field Name",
          "type": "string",
          "required": true
        },
        "filterValues": {
          "title": "List of values",
          "description": "List of values to filter on in the specified fields.",
          "type": "array",
          "required": true,
          "items": {
            "value": {
              "type": "string"
            }
          }
        }
      }
    },
    "maxResultSize": {
      "description": "Positive integer that defaults to 1000",
      "required": false,
      "title": "Max result size",
      "type": "number"
    }
  }
}
```

</details>

#### Expected output metadata

Output metadata will be calculated dynamically according to Marketo documentation

#### Example of input message

```json
{
  "searchTerm0": {
    "filterType": "id",
    "filterValues": ["210","211","339","344","214","215","216"]
  }
}
```

### Lookup Activities

#### List of Expected Config fields

##### Emit Behaviour

Options are: `Emit Individually` emits each object in separate message, `Fetch All` emits all objects in one message

#### Expected input metadata

[/src/schemas/lookupActivities.in.json](/src/schemas/lookupActivities.in.json)

#### Expected output metadata

[/src/schemas/lookupActivities.out.json](/src/schemas/lookupActivities.out.json)

#### Example of input message

```json
{
  "activityTypeIds": [1],
  "sinceDatetime": "2015-04-21T20:51:56.790Z"
}
```

>**NOTES:** If you want to generate the sample for Fetch All behavior, use a small period time in your filter criteria.
In other cases, you will receive a retrieve sample timeout error.
