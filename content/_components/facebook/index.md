---
title: Facebook component
layout: component
section: Service components
description: Component is designed to connect with Facebook using Graph API.
icon: facebook.png
icontext: Facebook component
category: facebook
updatedDate: 2023-09-19
ComponentVersion: 1.0.0
---

## Description

Facebook Component is designed to connect with facebook using [Graph API](https://developers.facebook.com/docs/graph-api).
The current release of component tested with API `v18.0`.

## Credentials

Before building any integration flow you must at first [Create an App](https://developers.facebook.com/docs/development/create-an-app).

During this process you will need select following options:
- `Other` as a use case
- `None` as app type

After you create the App, go to `Facebook Login` -> `Setting` and provide `Valid OAuth Redirect URIs` as `https://{your-tenant-address}/callback/oauth2`

Now you can create new credentials for the component:

{% include img.html max-width="100%" url="img/facebook-credentials.png" title="Credentials" %}

* **Type** (dropdown, required) - `OAuth2`
* **Choose Auth Client** (dropdown, required) - select one of created before or `Add New Auth Client`:
    * **Name** (string, required) - provide any name you want
    * **Client ID** (string, required) - put here `App ID` from `App settings`
    * **Client Secret** (string, required) - put here `App secret` from `App settings`
    * **Authorization Endpoint** (string, required) - Facebook oauth2 authorization endpoint `https://www.facebook.com/v18.0/dialog/oauth`
    * **Token Endpoint** (string, required) - Facebook refresh token endpoint `https://graph.facebook.com/v18.0/oauth/access_token`
* **Name Your Credential** (string, required) - provide any name you want
* **Scopes (Comma-separated list)** (string, required) - Put here scopes to get access to your Facebook - e.g.`public_profile,email`, [more info](https://developers.facebook.com/docs/facebook-login/permissions/)
* **Additional parameters (Comma-separated list)** (string, required) - Leave it blank
* **API version** (string, optional, `v18.0` by default) - Version of API you are going to use, look at [Facebook changelog](https://developers.facebook.com/docs/graph-api/changelog) to find out what changes have been made

## Triggers

This component has no trigger functions. This means it will not be accessible to select as a first component during the integration flow design.

## Actions

### Make Raw Request

Executes custom request.

#### Configuration Fields

There is no configuration fields in this action.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL `https://graph.facebook.com/{API version}/`
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `DELETE`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.
