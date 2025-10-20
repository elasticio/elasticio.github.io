---
title:  AFAS component
layout: component
section: ERP components
description: AFAS component is designed to communicate with Profit Rest Services.
icon: afas.png
icontext: AFAS component
category: afas
ComponentVersion: 2.2.0
updatedDate: 2025-05-07
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions) 
  * [Make Raw Request](#make-raw-request)
  * [Upsert Object](#upsert-object) 
* [Triggers](#triggers) 
  * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)

## Description

AFAS Component is designed to communicate with [Profit Rest Services](https://help.afas.nl/help/EN/SE/App_Cnr_Rest.htm).

## Credentials

Component credentials configuration fields: 
* **Rest services URL**  (string, required) - Provide here an endpoint to REST/JSON service, [more info](https://help.afas.nl/help/EN/SE/App_Conect_WebSrv_Addrss.htm)
* **Token**  (string, required) - [create](https://help.afas.nl/help/EN/SE/App_Cnr_Rest_Token.htm) a token and put it in this field. E.g. `<token><version>1</version><data>5DEFA8EC26234BB2993040350BDAB18754DB8AF8484301AD1C6CB7BBA20AC16D</data></token>`
* **Integration Id**  (string, optional) - This ID will be added to each request as a header with the key 'IntegrationId'
* **Timeout**  (number, optional) - Timeout for requests to AFAS server in seconds. Default 15s
* **Retry attempts**  (dropdown, optional) - How many time component will retry in case of errors. Default 3
* **Delay**  (number, optional) - Initial delay between retry attempts in seconds. Default 5 (seconds)
* **Exponential backoff**  (dropdown, optional) - How to make delay between retry attempts. Default - None. Possible values:
  * Arithmetic progression
  * Geometric progression
  * None (Constant delay)
* **Don't retry 500 errors with 'externalMessage'**  (checkbox, optional) - If checked, component will not retry 500 errors when response body includes 'externalMessage'

## Actions

### Make Raw Request

Executes custom request.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as an error, defaults to `false`.
* **Emit an error as a message** - (checkbox, optional): Specified the action behaviour when an error arises. When checked, an error body will be sent as a message instead of being thrown as a regular error. Defaults to false.
* **Add the request body to the response** - (checkbox, optional): Add the request body to the response message body as is. Defaults to false.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

### Upsert Object

Updates (of record found) or creates a new object.

#### Configuration Fields

* **Select updateConnector** - (dropdown, required): updateConnector to use for upsert.
* **Convert dates in fields from UTC to CET/CEST** - (multi-select dropdown, optional): Select fields that need to fix timezone
* **Emit an error as a message** - (checkbox, optional): Specified the action behaviour when an error arises. When checked, an error body will be sent as a message instead of being thrown as a regular error. Defaults to false.
* **Add the request body to the response** - (checkbox, optional): Add the request body to the response message body as is. Defaults to false.

#### Input Metadata

Dynamically generated fields according to chosen `updateConnector`.

#### Output Metadata

Result object from an upsert. 

## Triggers 
  
### Get New and Updated Objects Polling 

Retrieve all the updated or created objects within a given time range.

#### Configuration Fields

* **Select getConnector** - (dropdown, required): getConnector to lookup on.
* **Timestamp field to poll on** - (dropdown, optional): Select the date field to track changes.
* **Convert dates in fields from CET/CEST to UTC** - (multi-select dropdown, optional): Select fields that need to fix timezone
* **Poll records from last execution** - (checkbox, optional): If selected, the component will poll only records where the date selected in `Timestamp field to poll on` field was greater than the maximum date among results in the previous execution
* **Subtract seconds from last maximum date** - (number, optional): If the component `Poll records from last execution` it takes the maximum date from records as start time for next execution, you can specify here how many seconds will we subtract from this timestamp. The default is 1 second
* **Emit behavior** - (dropdown, optional): Indicates emit objects behavior - `Emit individually` (by default) or `Emit page`
* **Size of Polling Page** - (optional, positive integer, defaults to 100, max 100): Indicates the size of pages to be fetched
* **Start Time** - (string, optional): The timestamp, in ISO8601 format, to start polling from (inclusive). The default value is the beginning of time (January 1, 1970 at 00:00.000). 
* **Additional filters** - (string, optional): You can use an additional filter here in the following format - `["{filed name},{compare operator},{value}"]`, for example `["Synced,1,false", "Id,7,22548"]`
* **Long polling period in seconds (REALTIME FLOWS ONLY)** - (checkbox, optional): If provided, component will execute pulling recursively each * seconds, new flow executions will be ignored

#### Input Metadata

None.

#### Output Metadata
- For `Fetch page`: An object with key ***results*** that has an array as its value
- For `Emit Individually`:  Each object fills the entire message
