---
title: Microsoft Dynamics CRM v2 component
layout: component
section: CRM components
description: Microsoft Dynamics CRM v2 Component is designed to use Web API from Microsoft.
icon:  msdynamics-crm-v2.png
icontext: Microsoft Dynamics CRM v2 component
category: msdynamics-v2
updatedDate: 2022-09-09
ComponentVersion: 1.0.0
---

## Credentials

Microsoft Dynamics CRM APIs uses the OAuth 2.0.

During credentials creation you would need to:
- select `OAuth2` drop-down list ``Type``.
- select existing Auth Client from drop-down list ``Choose Auth Client`` or create the new one.
  For creating Auth Client you should specify following fields:

| Field name             | Mandatory | Description   |
|------------------------|-----------|--------------|
| Name                   | true      | your Auth Client's name |
| Client ID              | true      | your OAuth Client ID  |
| Client Secret          | true      | your OAuth Client Secret  |
| Authorization Endpoint | true      | set: `https://login.windows.net/common/oauth2/authorize?resource=https%3A%2F%2Forg1.crm4.dynamics.com%2F`, where `org1.crm4.dynamics.com` it is URL of your MS Dynamic CRM organisation |
| Token Endpoint         | true      | set: `https://login.windows.net/common/oauth2/token`    |

- fill field ``Name Your Credential``
- fill field ``Base URL`` - required, field indicates what URL base needs to be used. Example `https://org1.crm4.dynamics.com/api/data/v9.2` or `https://org1.crm4.dynamics.com/api/data` (without version)
- fill field ``API version`` - optional, API version to use. Right format is `vXX.XX`. By default, `v9.2`
- click on ``Authenticate`` button - the process would take you to Microsoft Dynamics to log-in and give permissions to the platform to access your service.
- click on ``Verify`` button for verifying your credentials
- click on ``Save`` button for saving your credentials


## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Make Raw Request

Executes custom request.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
* **Headers** - (object, optional): Headers of the request to send.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.
