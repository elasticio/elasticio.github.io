---
title: Tableau Cloud component
layout: component
section: Office components
description: Tableau Cloud is a secure, cloud-based solution for authoring, sharing, distributing, and collaborating on content created in Tableau.
icon: tableau-cloud.png
icontext: Tableau Cloud component
category: tableau-cloud
ComponentVersion: 1.0.0
updatedDate: 2024-12-10
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Triggers](#triggers)
  * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
* [Actions](#actions)
  * [Delete Object By ID](#delete-object-by-id)
  * [Lookup Object By ID](#lookup-object-by-id)
  * [Lookup Objects (plural)](#lookup-objects-plural)
  * [Make Raw Request](#make-raw-request)
  * [Upsert Object](#upsert-object)

## Description
Tableau Cloud is a secure, cloud-based solution for authoring, sharing, distributing, and collaborating on content created in Tableau.
The Tableau Cloud Component facilitates interaction with the [Tableau Cloud API](https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api.htm).

## Credentials
To embark on building any integration flow, the initial step involves creating an app by following these steps:
1. Log in to your [Tableau Cloud account](https://sso.online.tableau.com/).
2. Go to the Settings (section General) and enable `personal access tokens` feature.
3. Navigate to My Account Settings menu by clicking on your profile icon.
4. Find the Personal Access Tokens section.
5. Enter a token name and click Create Token.
6. Copy the token value displayed on the screen. This token will be used for authentication in this component. Note: You will not be able to retrieve this value again, so be sure to store it securely.
7. Copy the Token Name as well.

Once you have generated the required token in Tableau Cloud, you can now set up the credentials on our platform. Fill in the following fields in the credentials configuration screen:
- **PAT Name** - (string, required): The name of the Personal Access Token you generated.
- **PAT Secret** - (string, required): The token value you copied when generating the PAT. [More detailed instruction for PAT generation](https://help.tableau.com/current/online/en-us/security_personal_access_tokens.htm#configure-pat-creation-and-expiration)
- **Server Name** - (string, required): This is the Tableau Cloud instance URL, for example 10ax or us-west-2b.
- **API Version** - (string, optional): The version of the API to use. By default version 3.22 is used. [For more information](https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api_concepts_versions.htm#version_and_rest)
- **Number of retries** - (number, optional): How many times component should retry to make request, 5 by default
- **Delay between retries** - (number ms, optional): How much time wait until new try, 10000 by default
- **Token** - (string, optional): Token that is used for subsequent Tableau Cloud API calls. If left blank, the component will automatically generate and refresh tokens for Tableau Cloud API calls as needed.

Some operations may require special permissions. [More details](https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api_concepts_permissions.htm)


## Triggers
  
### Get New and Updated Objects Polling

Retrieve all the updated or created objects within a given time range.

#### Configuration Fields

* **Object Type** - (dropdown, required): Type of object to poll on.
* **Timestamp field to poll on** - (dropdown, required): Select the date field to track changes.
* **Emit behavior** - (dropdown, optional): Indicates emit objects behavior - `Emit individually` (by default) or `Emit page`
* **Size of Polling Page** - (optional, positive integer, defaults to 100, max 100): Indicates the size of pages to be fetched
* **Start Time** - (string, optional): The timestamp, in ISO8601 format, to start polling from (inclusive). The default value is the beginning of time (January 1, 1970 at 00:00.000).

#### Input Metadata

None.

#### Output Metadata
- For `Fetch page`: An object with key ***results*** that has an array as its value
- For `Emit Individually`:  Each object fills the entire message


## Actions 

### Delete Object By ID 

Delete a single object using its ID.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to delete.

#### Input Metadata

* **ID Value** - (string, required): The ID of the object to delete.

#### Output Metadata

Returns the id of the object that was deleted.


### Lookup Object By ID 

Retrieve a single object using its ID.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to look up.

#### Input Metadata

* **ID Value** - (string, required): The ID of the object to look up.

#### Output Metadata

Returns an object with the result of the lookup.


### Lookup Objects (Plural) 

Lookup a set of objects based on a defined list of criteria. The results can be emitted in different ways.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to look up.
* **Emit Behavior** - (dropdown, required): Specifies how the resulting objects will be emitted, either as `Emit Individually`, `Fetch Page` or `Fetch All`.

#### Input Metadata

A dynamically generated list of available criteria.

#### Output Metadata

For `Fetch Page` mode: An object with the key `results` that has an array as its value and key `totalCountOfMatchingResults` which contains the total number of results.
For `Emit Individually` mode: Each object fills the entire message.
For `Fetch All` mode: An object, with key results that has an array as its value.

### Make Raw Request

Allows for the execution of custom requests using the Tableau Cloud REST API directly.

#### Configuration Fields

* **Don't throw an error on 404 Response** - (optional, boolean): Configures the handling of 404 HTTP responses as non-errors. The default is `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL (here comes a part of the path that goes after `https://MY_SERVER/api/apiVersion`)
* **Method** - (string, required): Specifies the HTTP method for the request.
* **Request Body** - (object, optional): The body content for the request.

#### Output Metadata

* **Status Code** - (number, required): The HTTP response status code.
* **HTTP headers** - (object, required): The response's HTTP headers.
* **Response Body** - (object, optional): The body of the HTTP response.

### Upsert Object

This action either updates an existing object or creates a new one depending on chosen operation.

#### Configuration Fields

* **Operation** - (dropdown, required): Choose the operation to perform - either `Update` or `Create`.
* **Object Type** - (dropdown, required): Select the type of object to update or create. 

#### Input Metadata

Fields are dynamically generated based on the selected `Object Type`.

If the `Operation` is set to `Update`, an additional field will appear:
* **{Object Type} ID** - (string, required): The ID of the object to update.

#### Output Metadata

The result object from the create or update operation.

#### Known Limitations
* When you select the create operation and the object type `flow`, `workbook` or `datasource`, a field appears where you need to specify an url to the required file. The maximum allowed file size is 64 MB.