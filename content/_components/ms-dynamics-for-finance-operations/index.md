---
title: Microsoft Dynamics for Finance and Operations Component
layout: component
section: ERP components
description: Microsoft Dynamics for Finance and Operations Component is designed to use ODATA API from Microsoft.
icon: ms-dynamics-for-finance-operations.png
icontext: Microsoft Dynamics for Finance and Operations component
category: ms-dynamics-for-finance-operations
updatedDate: 2024-07-05
ComponentVersion: 1.0.0
---

## Description

Microsoft Dynamics for Finance and Operations Component is designed to use [ODATA API from Microsoft](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/data-entities/data-management-api).

## Credentials

Microsoft Dynamics for Finance and Operations component uses the OAuth 2.0 authentication protocol.

During credentials creation you would need to:
- Select `OAuth2` drop-down list `Type`.
- Select existing Auth Client from drop-down list `Choose Auth Client` or create the new one. For creating Auth Client you should specify following fields:

| **Field name** | **Description** |
| - | -----------------------------|
| Name | *Your Auth Client's name* |
| Client ID | *Your OAuth Client ID* |
| Client Secret | *Your OAuth Client Secret* |
| Authorization Endpoint |  *set: `https://login.windows.net/common/oauth2/authorize?resource=https%3A%2F%2Fyourdomain.operations.dynamics.com%2F`, where `yourdomain.operations.dynamics.com` it is URL of your MS Dynamic for Finance and Operations organization* |
| Token Endpoint | *set: `https://login.windows.net/common/oauth2/token`* |

 > **Important note:**: All of the above fields are mandatory!
 
 1. Fill field Name Your Credential.
 2. Click on Authenticate button - the process would take you to Microsoft Dynamics to log-in and give permissions to the platform to access your service.
 3. Click on Verify button for verifying your credentials.
 4. Click on Save button for saving your credentials.


## Triggers

This component has no trigger functions. This means it will not be accessible to select as a first component during the integration flow design.

## Actions

### Make Raw Request

Executes custom request

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
* **Headers** - (object, optional): Headers of the request to send.
* **Request Body** - (object, optional): Body of the request to send.

Input message example:

```json
{
  "method": "GET",
  "url": "/data/ServiceOrderLines?$top=1"
}
```

#### Output Metadata

- **Status Code** - (number, required): HTTP status code of the response.
- **HTTP headers** - (object, required): HTTP headers of the response.
- **Response Body** - (object, optional): HTTP response body.
