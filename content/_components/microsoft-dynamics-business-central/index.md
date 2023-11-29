---
title: Microsoft Dynamics Business Central Component
layout: component
section: ERP components
description: Microsoft Dynamics Business Central Component is designed to use Web API from Microsoft.
icon: microsoft-dynamic-business-central.png
icontext: Microsoft-Dynamics-Business-Central component
category: microsoft-dynamic-business-central
updatedDate: 2023-05-02
ComponentVersion: 1.1.1
---

## Credentials

Microsoft Dynamics Business Central APIs use OAuth 2.0 for authentication. To establish a connection, you need to perform the following three steps:

**1.** Register an OAuth App in Azure Active Directory:

  * Start by registering an OAuth App in the Azure Active Directory.
  * Follow the steps outlined in [this guide](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) to register your application.
  
  > **Note**: Specify the [Redirect URL](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#add-a-redirect-uri) according to documentation and ensure that is using [according callback](/guides/oauth-callback-redirect-url.html).

  > **Note**: Make sure that the application is given the necessary [permissions](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-configure-app-access-web-apis#more-on-api-permissions-and-admin-consent) to work with OAuth in Azure Active Directory.
  > {% include img.html max-width="100%" url="img/permissions.png" title="Permissions" %}

**2.** Create an Auth Client on the Platform:

  * On the platform you are using, create an authentication client that includes the information of the OAuth App registered in step 1.
  * Ensure that the client configuration aligns with the details provided during the registration of the OAuth App.

**3.** Generate a Secret for the OAuth App:

  * Generate a secret on the platform to be used by the OAuth App registered in step 1.
  * This secret is a crucial part of the authentication process and must be securely stored.

<details close markdown="block"><summary><strong>Setting up Credentials for the Component</strong></summary>

### Fields mapping

**1.** `Client ID` can be found at `Application (client) ID` (see picture below)

**2.** `Authorization Endpoint` is equal `https://login.microsoftonline.com/{tenantId}/oauth2/authorize?resource=https://api.businesscentral.dynamics.com`, where `tenantId` can be found at `Directory (tenant) ID` (see picture below)

**3.** `Token Endpoint` is equal `https://login.windows.net/{tenantId}/oauth2/token?resource=https://api.businesscentral.dynamics.com`, where `tenantId` can be found at `Directory (tenant) ID` (see picture below)

{% include img.html max-width="100%" url="img/client-id.png" title="Application (client) ID" %}

**4.** `Client Secret` follow link `Certificates & secrets` (see picture below) and use `Value` section

{% include img.html max-width="100%" url="img/client-secret.png" title="Client Secret" %}

### Credentials creation

During credentials creation you would need to:

- select `OAuth2` drop-down list `Type`.
- select existing Auth Client from drop-down list `Choose Auth Client` or create the new one.

For creating Auth Client you should specify following fields:

| Field name | Description |
|------------------------|-----------------------------------------------------------------|
| Name                   | your Auth Client's name |
| Client ID              | your `Application (client) ID` |
| Client Secret          | your `Value` from `Client secrets` |
| Authorization Endpoint | set: `https://login.microsoftonline.com/{tenantId}/oauth2/authorize?resource=https://api.businesscentral.dynamics.com`, where `tenantId` is user domain name |
| Token Endpoint         |  set: `https://login.windows.net/{tenantId}/oauth2/token?resource=https://api.businesscentral.dynamics.com`, where `tenantId` is user domain name             |

> **Note!**: All of the above fields are mandatory

{% include img.html max-width="100%" url="img/auth-client.png" title="Auth client" %}

- fill field ``Name Your Credential``
- fill field ``Environment Name`` - required, field indicates what environment to be used. How to get a list of business central environments see [here](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/webservices/api-get-environments). Example: `Production`.
Base URL for this component is `https://api.businesscentral.dynamics.com/v2.0/${environmentName}/api/v2.0`
- click on ``Authenticate`` button - the process would take you to Microsoft Dynamics to log-in and give permissions to the platform to access your service.
- click on ``Verify`` button for verifying your credentials
- click on ``Save`` button for saving your credentials

### How to get Microsoft Dynamics Business Central instance URL

To access the Microsoft Dynamics Business Central Instance URL, follow these steps:

1. Register on Microsoft Dynamics Business Central:
   Start by registering on the [Microsoft Dynamics Business Central platform](https://dynamics.microsoft.com/en-us/business-central/signin/?ru=https%3A%2F%2Fbusinesscentral.dynamics.com%2F%3FnoSignUpCheck%3D1).
2. Navigate to the Admin Center:
   Open the **"Settings"** tab, and select **"Admin Center"**.

{% include img.html max-width="100%" url="img/admin-center-settings.png" title="Admin Center - Settings" %}

3. Access Environments:
   In the **"Admin Center"** page, navigate to the **"Environments"** section. Choose the specific environment you are interested in by clicking on it.

{% include img.html max-width="100%" url="img/admin-center-environments.png" title="Admin Center - Environments" %}

4. Retrieve the Instance URL:
   Once you are on the environment details page, locate the URL containing the instance ID. This URL is crucial for accessing Authorization and Token endpoints.

{% include img.html max-width="100%" url="img/environments-url.png" title="Environments URL" %}

</details>

## Triggers

### Get New and Updated Objects Polling

Retrieve all the updated or created objects within a given time range.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to lookup on. Currently supported: `Customers`, `Sales Orders`, `Items`.
* **Company Name** - (dropdown, required): Select you company.
* **Emit behavior** - (dropdown, required): list with options: `Emit page` - all found values will be emitted in one array `results`, and `Emit individually` - each found object will be emitted individual.
* **Size of Polling Page** - (string, optional): Indicates the size of pages to be fetched. Defaults to ['odata.maxpagesize'](https://docs.microsoft.com/en-us/power-apps/developer/data-platform/webapi/query-data-web-api#specify-the-number-of-rows-to-return-in-a-page) preference value equals 5000
* **Process Single Page Per Execution** - (checkbox): Indicates that if the number of changed records exceeds the maximum number of results in a page, instead of fetching the next page immediately, wait until the next flow start to fetch the next page.
* **Start Time** - (string, optional): The timestamp, in ISO8601 format, to start polling from (inclusive). Default value is the beginning of time (January 1, 1970 at 00:00.000).
* **End Time** - (string, optional): The timestamp, in ISO8601 format, to end at (inclusive). Default value is never.

#### Input Metadata

There is no input metadata.

#### Output Metadata

Depends on `Object Type` and `Emit behavior` fields. If `Emit behavior` field is equal to `Emit page` - object with property `results` that contains array of selected objects will be returned, if to `Emit individually`, metadata for selected `Object Type` will be returned.

## Actions

### Delete Object

Delete an object by a selected field that uniquely identifies it.

#### Configuration Fields

* **Object Type** - (string, required): Object-type to lookup on. Currently supported: `Customers`, `Sales Orders`, `Items`.
* **Company Name** - (dropdown, required): Select you company.
* **Delete Criteria** - (dropdown, required): A list of object parameters that can uniquely identify the object in the database.

#### Input Metadata

* **Delete Criteria Value** - (string, required): Value for unique search criteria in `Delete Criteria` configuration field.

#### Output Metadata

The id of the object deleted.

### Lookup Object (at most one)

Lookup a single object by a selected field that uniquely identifies it.

#### Configuration Fields

* **Object Type** - (string, required): Object-type to lookup on. E.g `Customers`.
* **Company Name** - (dropdown, required): Select you company.
* **Lookup Criteria** - (dropdown, required): A list of object parameters that can uniquely identify the object in the database.
* **Allow criteria to be omitted** - (boolean, optional): If selected field `Lookup Criteria Value` becomes optional.
* **Allow zero results** - (boolean, optional): When selected, if the object is not found - an empty object will be returned instead of throwing error.

#### Input Metadata

* **Lookup Criteria Value** - (string, required unless `Allow criteria to be omitted` is selected): Value for unique search criteria in `Lookup Criteria` configuration field.

#### Output Metadata

Object with result of lookup as value.

### Lookup Objects (plural)

Lookup a set of object by defined criteria list. Can be emitted in different way.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to lookup on. Currently supported: `Customers`, `Sales Orders`, `Items`.
* **Company Name** - (dropdown, required): Select you company.
* **Emit Behavior** - (dropdown, required): Defines the way result objects will be emitted, one of `Emit all`, `Emit page` or `Emit individually`.
* **Expert Mode for Filter Expression** - (checkbox): if checked, any [filter expression](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/webservices/use-filter-expressions-in-odata-uris#filter-expressions) can be entered in metadata field `Filter Expression`. For advanced users. Otherwise, enter your search criteria in the appropriate metadata field.
* **Number of search terms** - text field to specify a number of search terms (positive integer number [1-99] or 0). (If `Expert Mode for Filter Expression` checkbox is disabled)

#### Input Metadata

If configuration field `Expert Mode for Filter Expression` is enabled:
* **Filter Expression** - (strings, required):  any [filter expression](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/webservices/use-filter-expressions-in-odata-uris#filter-expressions) can be entered in metadata field `Filter Expression` (without `$filter=`). For advanced users. Example: `Entry_No gt 610 and Entry_No lt 615`.

If configuration field `Expert Mode for Filter Expression` is disabled:
Depend on configuration field `Number of search terms`. If = `N` - N search term and N-1 logical operators will be generated, if = 0 - any search term will be generated.
Example for `Number of search terms = 2`:

```json
{
  "sTerm_1": {
    "fieldName": "id",
    "condition": "eq",
    "fieldValue": "1"
  },
  "link_1_2": "and",
  "sTerm_2": {
    "fieldName": "displayName",
    "condition": "contains",
    "fieldValue": "Cronus"
  }
}
```

If selected `Emit Behavior` is `Emit page` additionally fields will be added:

* **Page Number** - (number, defaults to 1): Indicates index of page to be fetched.
* **Page Size** - (number, defaults to 0): Indicates amount of objects per page. If 0, `totalCountOfMatchingResults` wil be returned

#### Output Metadata

For `Emit All` mode: An object, with key `results` that has an array as its value.
For `Emit Page` mode: An object with key `results` that has an array as its value (if `Page Size` > 0). Key `totalCountOfMatchingResults` which contains the total number of results (not just on the page) which match the search criteria (if `Page Size` = 0).
For `Emit Individually` mode: Each object which fill the entire message.

### Upsert Object

Updates (if record found) or creates a new object.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to upsert. Currently supported: `Customers`, `Sales Orders`, `Items`
* * **Company Name** - (dropdown, required): Select you company.

#### Input Metadata

* **Id** - (string, optional): ID of the object to upsert.
And dynamically generated fields according to chosen `Upsert Schema`.

#### Output Metadata

Result object from upsert.

### Make Raw Request

Executes custom request.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
* **Request headers** - (object, optional): Headers of the request to send.
* **Request Body** - (object, optional): Body of the request to send.

Example of Input Metadata for PATCH request:

![image](https://user-images.githubusercontent.com/16806832/197200040-fd468b2f-14da-4d3a-9a44-454d9b6479f8.png)

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.
