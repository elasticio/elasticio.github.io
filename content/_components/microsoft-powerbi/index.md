---
title: Microsoft Power BI
layout: component
section: Service components
description: Integration component to Microsoft Power BI.
icon: powerbi.png
icontext: Microsoft Power BI component
category: Microsoft
updatedDate: 2023-12-29
ComponentVersion: 1.0.0
---

## Description

Microsoft Power BI Component is designed to interact with [Power BI REST API](https://learn.microsoft.com/en-us/rest/api/power-bi/) Current release of the component tested on [API v1](https://api.powerbi.com/v1.0/).

## Credentials

Microsoft Power BI uses the OAuth 2.0. How to register an application look [here](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app). Redirect URI for platform is - `{{site.data.tenant.appURL}}/callback/oauth2`

* **Type** (dropdown, required) - `OAuth2`.
* **Choose Auth Client** (dropdown, required) - select one of the created before or `Add New Auth Client`:
    * **Name** (string, required) - provide any name you want.
    * **Client ID** (string, required) - put here `Application (client) ID`.
    * **Client Secret** (string, required) - put here `Client credentials`.
    * **Authorization Endpoint** (string, required) - Power BI authorization endpoint:
    `https://login.windows.net/common/oauth2/authorize?resource=https://analysis.windows.net/powerbi/api`
    * **Token Endpoint** (string, required) - Power BI refresh token endpoint: 
    `https://login.windows.net/common/oauth2/token?resource=https://analysis.windows.net/powerbi/api`
* **Name Your Credential** (string, required) - provide any name you want.
* **Scopes** (Space-separated list) (string, required) - Put here scopes to get access to your Power BI reports - `offline_access Report.ReadWrite.All` and any additional scopes that you need.

>**Warning:** To maintain a smooth experience, we recommend reusing stored credentials where possible. Duplicating secrets across OAuth clients can result in errors and complications.

## Triggers

This component has no trigger functions. This means it will not be accessible to select as a first component during the integration flow design.

## Actions

### Retrieve reports

Used to search and retrieve reports.

#### Configuration Fields

* **Operation** - (dropdown, required):
    * **Search Report** - Search for the report by its name or retrieve all available reports.
    * **Get Report Info** - Get report description.
    * **Export Report** - Exports the specified report from the workspace to a Power BI file.

#### Input Metadata

Depends on the selected Operation:
* `Get Report Info` and `Export Report`:
    * **Report id** - (string, required): Unique report identifier.
* `Search Report`:
    * **Report name** - (string, optional): You can use any part of the report name to search multiple reports or leave it blank to get all.
    
### Make Raw Request

Executes custom requests utilizing plain Power BI REST API.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as an error, defaults to `false`.

#### Input Metadata

* **URL** - (string, required): Path of the resource relative to the base URL (here comes a part of the path that goes after `https://api.powerbi.com/v1.0/`).
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Microsoft Power BI component like [changelog](/components/microsoft-powerbi/technical-notes#changelog).

