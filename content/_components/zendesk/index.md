---
title: Zendesk Component
layout: component
section: Utility components
description: Article on why and how to use Zendesk component.
icon: zendesk.png
icontext: Zendesk component
category: zendesk
updatedDate: 2021-06-11
ComponentVersion: 1.0.0
---

## General information

### Description

Zendesk component for the [{{site.data.tenant.name}} platform](http://www.{{site.data.tenant.name}} "{{site.data.tenant.name}} platform")

### API version

The component uses API v2 version of Zendesk.

### Environment variables

No required Environment variables.

## Credentials

The component uses [Password Grant type](https://support.zendesk.com/hc/en-us/articles/203663836#topic_z3q_shl_1l).

* **Base URL -** URL of your instance (without `/api/v2`). Example `https://examplesupport.zendesk.com`
* **Username -** Your login for zendesk instance.
* **Password -** Your password for zendesk instance.
* **Client Id -** The unique identifier specified in an OAuth client in the Support admin interface (Admin > Channels > API > OAuth Clients). See [Registering your application with Zendesk](https://support.zendesk.com/hc/en-us/articles/203663836#topic_s21_lfs_qk).
* **Client Secret -** The secret specified in an OAuth client in the Support admin interface (Admin > Channels > API > OAuth Clients). See [Registering your application with Zendesk](https://support.zendesk.com/hc/en-us/articles/203663836#topic_s21_lfs_qk).

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Lookup Object By Id

This action allows you to search objects by unique ID

#### Config Fields

* **Object Type** - Dropdown (required): provides selection of object type.

* **Allow ID To Be Omitted** - Checkbox (optional, default false): When selected, if zero results are returned, the empty object {} is emitted, otherwise typically an error would be thrown.

* **Wait For Object To Exist** - Checkbox (optional, default false): When selected, if no results are found, apply rebounds and wait until the object exits.

* **Linked Objects To Populate** - Multi-Select Dropdown (optional, no objects selected by default): Select which linked objects to fetch.

Available options to select:
  * "Users"
  * "Groups
  * "Organizations"
  * "Last audits"
  * "Metric sets"
  * "Dates"
  * "Sharing agreements"
  * "Comment count"
  * "Incident counts"
  * "Ticket forms"
  * "Metric events (single ticket)"
  * "Slas (single ticket)"
  * "List of comments"

#### Input Metadata

* ID - Number, Optional. ID to make request to, e.g. to get ticket by ID: `https://{subdomain}.zendesk.com/api/v2/tickets/{ID}`.

#### Output Metadata

* Matching object or empty object

### Lookup Objects

#### Config Fields

* **Object Type** - (Dropdown with a single option: `Ticket`, required)
* **Behaviour** - (Dropdown with options: `Fetch all`, `Fetch page`, `Emit individually`, required)
* **Number of search terms** - (Positive integer number [1-99] or 0 to lookup all entities of chosen type)

#### Input Metadata

Dynamically generated:

* **Fetch all:**

  * Max Result Size (optional) - Positive integer to restrict maximum result size for action (defaults to 1000)

* **Fetch page:**
  * Page size (optional) - Positive integer to indicate a size of page (defaults to 100)
  * Page number (required) - Positive 0 based integer to indicate page to return
  * Order (optional) - Array of `fieldName` and sort direction pairs

Usage example of `Fetch page` option:

* Page size (5), Page number(0) - first five elements
* Page size (10), Page number(1) - second 10 elements

Sorting is available on the following fields:
 * created
 * updated
 * commented
 * priority
 * status
 * ticket_type

#### Common

* Search terms (optional) - Allow making search between objects [Search term fields](/lib/schemas/lookupObjects/searchTerm.js)

### Make Raw Request

#### Config Fields

* **Do not throw error on 404 Response code** - (boolean, optional, default false): Indicate how 404 response codes should be handled. (Either emit the 404 code to the next component or throw an error)

#### Input Metadata

* HTTP Verb - Allowed values GET, POST, PUT, DELETE, Required. HTTP verb to use in the request.
* Path - String, Required. Path to make request to (without `/api/v2/`, e.g. to list tickets paste here not `https://{subdomain}.zendesk.com/api/v2/tickets` but `tickets`)
* Request Body - Object, Optional. Body to attach to the HTTP Request

#### Output Metadata

* Status Code (Integer, required): HTTP status code of the response
* Response Body (Object, optional): HTTP response body

### Upsert Object By Id

#### Config Fields

* **Object Type** - (Dropdown with a single option: `Ticket`, required)

#### Input Metadata

Dynamically generated:

* `ID (optional)` - if filled and the object was found by this id - the object will be updated will create the new one in another case.
* Inputs for all object fields: [system](/lib/schemas/ticketMetadata.in.json) and dynamically generated custom fields
