---
title: Google Analytics component
layout: component
section: Marketing-related components 
description: Google Analytics Component is designed to connect to Google Analytics Data API.
icon: google-analytics.png
icontext: Google Analytics component
category: google-analytics
ComponentVersion: 1.0.0
updatedDate: 2024-09-03
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Triggers](#triggers) 
  * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling) 
* [Actions](#actions) 
  * [Make Raw Request](#make-raw-request)
* [Known Limitations](#known-limitations)

## Description

Google Analytics Component is designed to connect to Google [Analytics Data API](https://developers.google.com/analytics/devguides/reporting/data/v1).
The current release of component supports `v1beta` and `v1alpha` API versions.

## Credentials

Before building any integration flow you must at first configure the app from inside the [Google Developers Console](https://console.cloud.google.com/).
1. Go to the `APIs & Services` -> `Enabled APIs & services` page and enable the following:
- Google Analytics Data API
2. Go to the `Credentials` section and create a new credential of type  `OAuth client ID`.
- Set Application type to `Web application`
- Add Authorized redirect URI as: `https://{your-tenant-address}/callback/oauth2`
3. Create new or link existing [Billing account](https://console.cloud.google.com/billing/) to your project in `Billing` section - it must be valid (Status: active) to use this service

Now you can create new credentials for component:
* **Type** (dropdown, required) - `OAuth2`
* **Choose Auth Client** (dropdown, required) - select one of created before or `Add New Auth Client`:
  * **Name** (string, required) - provide any name you want
  * **Client ID** (string, required) - put here `Client ID` from `Web application` in `Google Developers Console`
  * **Client Secret** (string, required) - put here `Client Secret` from `Web application` in `Google Developers Console`
  * **Authorization Endpoint** (string, required) - Google oauth2 authorization endpoint `https://accounts.google.com/o/oauth2/auth`
  * **Token Endpoint** (string, required) - Google refresh token endpoint `https://oauth2.googleapis.com/token`
* **Name Your Credential** (string, required) - provide any name you want
* **Scopes (Comma-separated list)** (string, required) - Put here scopes to get access to your Google Analytics - `https://www.googleapis.com/auth/analytics`, [more info](https://developers.google.com/identity/protocols/oauth2/scopes#analytics)
* **Additional parameters (Comma-separated list)** (string, required) - set it as `access_type:offline,prompt:consent` to make component works properly
* **Property ID** (string, required) - Property ID is a unique identifier that represents a specific Google Analytics property. A property in Google Analytics is where the data for your website, app, or other digital resource is collected and managed. [Where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id#what_is_my_property_id)
* **Number of retries** (number, optional, 5 by default) - How many times component should retry to make request 
* **Delay between retries** (number ms, optional, 10000 by default) - How much time wait until new try

## Triggers 
  
### Get New and Updated Objects Polling 

Retrieve all the updated objects within a given time range.

#### Configuration Fields
* **Method** - (dropdown, required): Select one of the available methods to be executed for data retrieving.
* **Metrics** - (dropdown, required): Specify the metrics to be included in the report. [All available metrics can be found here](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema#metrics)
* **Dimensions** - (dropdown, required): Specify the dimensions to be included in the report. By default the dateHourMinute dimension is included in each request for data filtering. [All available dimensions can be found here](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema#dimensions)
* **Additional Report Attributes** - (string, optional): Specify additional report configurations such as metricFilter, comparisons, etc. It must be a valid JSON Object. Please avoid specifing dataRanges, limit, offset, metrics and dimensions since there are separate fields for them. [All available fields for a request body](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport#request-body)
* **Emit Behavior** - (dropdown, optional, default `Emit individually`): Defines the way result objects will be emitted, one of `Emit page` or `Emit individually`.
* **Page Size** - (number, optional, defaults to 100, max 100): Indicates the size of pages to be fetched per request.
* **Single Page per Interval** - Checkbox: Indicates that if the number of changed records exceeds the maximum number of results in a page, instead of fetching the next page immediately, wait until the next flow start to fetch the next page.
* **Start Time** - (string, optional): The timestamp to start polling from (inclusive) - using ISO 8601 Date time utc format - YYYY-MM-DDThh:mm:ssZ. Default value is 2015-08-14T00:00:00Z. Cannot be less than 2015-08-14T00:00:00Z.

#### Input Metadata

None.

#### Output Metadata

- For `Fetch page`: An object with key ***results*** that has an array as its value
- For `Emit Individually`:  Each object fill the entire message

## Actions 

### Make Raw Request 

Executes custom request.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

## Known Limitations
The maximum number of selected metrics for a `Get New and Updated Objects Polling` trigger is 10

The maximum number of selected dimensions for a `Get New and Updated Objects Polling` trigger is 8