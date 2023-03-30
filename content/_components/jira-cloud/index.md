---
title: Jira Cloud component
layout: component
section: Service components
description: Jira Cloud Component is designed to connect to Atlassian Jira Cloud platform.
icon: jira-cloud.png
icontext: Jira Cloud component
category: jira-cloud
updatedDate: 2023-03-24
ComponentVersion: 1.1.0
---

## Description

Jira Cloud Component is designed to connect to Atlassian [Jira Cloud platform](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/)

### API version

Current release of component tested on API `v3`.

### Credentials

Before building any integration flow you must at first configure the app from inside the [Atlassian developer console](https://developer.atlassian.com/console/myapps/). Here is hot to do that:

1. Create new `OAuth 2.0 integration` app or select from existing
2. Go to the `Authorization` section and press `Configure` button - near `OAuth 2.0 (3LO)`
3. Add Authorized `Callback URL` as: `https://{your-tenant-address}/callback/oauth2` and click `Save changes`
4. Select `Permissions` in the left menu
5. Press `Add` button next to `Jira API` and then `Configure`
6. Here you can provide required Scopes

> Please visite [this](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/#enabling-oauth-2-0--3lo-) website fot more information.

Now you can create new credentials for the component:

* **Type** (dropdown, required) - `OAuth2`
* **Choose Auth Client** (dropdown, required) - select one of created before or `Add New Auth Client`:
  * **Name** (string, required) - provide any name you want
  * **Client ID** (string, required) - put here `Client ID` from `Settings` in `Atlassian developer console`
  * **Client Secret** (string, required) - put here `Secret` from `Settings` in `Atlassian developer console`
  * **Authorization Endpoint** (string, required) - Atlassian authorization endpoint `https://auth.atlassian.com/authorize`
  * **Token Endpoint** (string, required) - Atlassian refresh token endpoint `https://auth.atlassian.com/oauth/token`
* **Name Your Credential** (string, required) - provide any name you want
* **Scopes (Space-separated list)** (string, required) - Put here scopes to get access to your Jira - `offline_access read:jira-user read:jira-work write:jira-work`, [more info](https://developer.atlassian.com/cloud/jira/platform/scopes-for-oauth-2-3LO-and-forge-apps/)
* **Additional parameters (Comma-separated list)** (string, required) - set it as `prompt:consent` to make component works properly
* **Number of retries** (number, optional, 5 by default, maximum 10) - How many times component should retry to make request
* **Delay between retries** (number ms, optional, 3000 by default, maximum 10 000) - How much time to wait until the new attempt. Note that in case a response includes a header `Retry-After` it will be used

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Make Raw Request

Executes custom request.

#### Configuration Fields

* **Select cloud** - (dropdown, required): This will retrieve the sites that have scopes granted by the token.
* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL - `https://api.atlassian.com/ex/jira/{cloudid}/rest/api/3/`
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

### Upsert Object

Updates (if record found) or creates a new object.

#### Configuration Fields

* **Select cloud** - (dropdown, required): This will retrieve the sites that have scopes granted by the token.
* **Object Type** - (dropdown, required): Object-type to upsert. E.g `Issue`.

#### Input Metadata

* **Id Or Key** - (string, optional): Id Or Key of the object to upsert.
And dynamically generated fields according to chosen `Object Type`.

#### Output Metadata

If object was created, there will be both - `id` and `key`, otherwise depends on input
* **id** - (string, optional): Id Or Key of the object to upsert.
* **key** - (string, optional): Id Or Key of the object to upsert.


### Lookup Object (at most one)

Lookup a single object by a selected field that uniquely identifies it.

#### Configuration Fields

* **Select cloud** - (dropdown, required): This will retrieve the sites that have scopes granted by the token.
* **Object Type** - (string, required): Object-type to lookup on. E.g `User`.
* **Allow criteria to be omitted** - (boolean, optional): If selected field `Lookup Criteria Value` becomes optional.
* **Allow zero results** - (boolean, optional): When selected, if the object is not found - an empty object will be returned instead of throwing error.

#### Input Metadata

* **Lookup Criteria Value** - (string, required unless `Allow criteria to be omitted` is selected): Value for unique search criteria in `Lookup Criteria` configuration field.

#### Output Metadata

Object with result of lookup as value.
