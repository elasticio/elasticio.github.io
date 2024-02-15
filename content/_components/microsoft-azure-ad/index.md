---
title: Microsoft Azure AD Component
layout: component
section: Service components
description: Microsoft Azure AD Component is designed to access users and group data from Azure AD, as well as manage roles, and permissions.
icon: microsoft-azure-ad.png
icontext: Microsoft Azure AD Component
category: microsoft-azure-ad
updatedDate: 2023-03-10
ComponentVersion: 1.1.0
---

## Description

Microsoft Azure AD Component is designed to access users and group data from Azure AD using [Microsoft Graph API](https://learn.microsoft.com/en-us/graph/use-the-api), as well as manage roles, and permissions.

## Credentials

Microsoft Azure AD uses the OAuth 2.0.
How to register an application look [here](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).
Redirect URI for can be found [here](/guides/oauth-callback-redirect-url.html), f.e. `https://{your-tenant-address}/callback/oauth2`.

![Credentials](img/microsoft-azure-ad.png)

- `Client ID` can be found at `Application (client) ID` (see picture).
- `Client Secret` follow link `Client credentials` (see picture) and use `Value` section.

During credentials creation you would need to:
- select `OAuth2` drop-down list ``Type``.
- select existing Auth Client from drop-down list ``Choose Auth Client`` or create the new one.
  For creating Auth Client you should specify following fields:

| Field name             | Mandatory | Description                                                           |
|------------------------|-----------|-----------------------------------------------------------------------|
| Name                   | true      | your Auth Client's name                                               |
| Client ID              | true      | your OAuth Client ID                                                  |
| Client Secret          | true      | your OAuth Client Secret                                              |
| Authorization Endpoint | true      | set: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize` |
| Token Endpoint         | true      | set: `https://login.microsoftonline.com/common/oauth2/v2.0/token`     |

- fill field ``Scopes`` as `offline_access Directory.Read.All Directory.ReadWrite.All Directory.AccessAsUser.All` and add another scopes if you need it.
- click on ``Authenticate`` button - the process would take you to Exact Online to log-in and give permissions to the platform to access your service.
- click on ``Verify`` button for verifying your credentials
- click on ``Save`` button for saving your credentials

>**Warning:** To maintain a smooth experience, we recommend reusing stored credentials where possible. Duplicating secrets across OAuth clients can result in errors and complications.

## Triggers

### Get New and Updated Objects Polling

Retrieve all the created objects within a given time range.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to retrieve. E.g `Users`.
* **Select fields of the resulting object** - (multiselect, required): Use this field to specify which fields should be included in the response. You can select one or more fields from the list of available fields. You must select at least one field.
* **Emit Behavior** - (dropdown, optional): Defines the way result objects will be emitted, one of `Emit page` or `Emit individually`. Defaults to: `Emit individually`.
* **Size of polling page** - (string, optional): Defines Size of polling page. Defaults to 999
* **Start Time** - (string, optional): The timestamp, in ISO8601 format, to start polling from (inclusive). Default value is the beginning of time (January 1, 1970 at 00:00.000).
* **End Time** - (string, optional): The timestamp, in ISO8601 format, to end at (inclusive). Default value is current time.

#### Input Metadata

There is no Input Metadata in this trigger.

#### Output Metadata

For `Emit All` mode: An object, with key `results` that has an array as its value.
For `Emit Individually` mode: Each object which fill the entire message.

#### Known Limitations

* Users and Applications use `createdDateTime` field to poll, Groups use `renewedDateTime` instead (due to Azure AD limitations).

## Actions

### Lookup Objects (plural)

Lookup a set of object by defined criteria list. Can be emitted in different way.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to lookup on. E.g `Users`.
* **Select fields of the resulting object** - (multiselect, required): Use this field to specify which fields should be included in the response. You can select one or more fields from the list of available fields. You must select at least one field.
* **Emit Behavior** - (dropdown, required): Defines the way result objects will be emitted, one of `Emit all` or `Emit individually`.
* **Number of search terms** - (strings, optional): specify a number of search terms (positive integer number [0-99]).
* **Expert Mode for Filter Expression** - (checkbox, optional, default to false): if checked, any [filter expression](https://learn.microsoft.com/en-us/graph/filter-query-parameter) can be entered in metadata field `Filter Expression`.
* **Advanced query capabilities** - (checkbox, optional, default to false): enable [Advanced query capabilities on Azure AD directory objects](https://learn.microsoft.com/en-us/graph/aad-advanced-queries) - including `ConsistencyLevel=eventual` header and `$count=true` additional query string.

#### Input Metadata

If configuration field `Expert Mode for Filter Expression` is enabled:

* **Filter Expression** - (strings, required):  any [filter expression](https://learn.microsoft.com/en-us/graph/filter-query-parameter) can be entered in metadata field `Filter Expression` (without `$filter=`). For advanced users. Example: `startsWith(displayName,'J') and jobTitle eq 'Software Engineer'`.

If configuration field `Expert Mode for Filter Expression` is disabled:

* Depend on configuration field `Number of search terms`. If = `N` - N search term and N-1 logical operators will be generated, if = 0 - any search term will be generated.
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
      "condition": "eq",
      "fieldValue": "Cronus"
    }
  }
  ```

#### Output Metadata

For `Emit All` mode: An object, with key `results` that has an array as its value, if selected `Advanced query capabilities` additionally there will be key `totalCountOfMatchingResults` with total number of results.
For `Emit Individually` mode: Each object which fill the entire message.

### Linking or Unlinking objects

Allows link or unlink two objects, for instance Add Member to Group.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to link. E.g `Groups`.
* **Object Type To link** - (dropdown, required): Object-type to  be linked. E.g `Members`.
* **Link Type** - (dropdown, required): Link type between two objects. E.g `Add`.

#### Input Metadata

* **ID field for 1st Object to be linked** - (string, required): ID of `Object Type`.
* **ID field for 2nd Object of the linked object** - (string, required): ID of `Object Type To link`.

#### Output Metadata

Operation does not return anything in the response body, so Output metadata is:

```json
{ "result": true }
```

#### Known Limitations

* Combination `Object Type` set to `Groups` and `Object Type To link` set to `Assign License` was not tested due to limit access to group-based licensing in Azure Active Directory.

### Make Raw Request

Executes custom request.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

#### Known Limitations

* The REST API architecture comprises a variety of endpoints and methods (verbs). While the Make Raw Request action is intended to cover all possible cases, certain edge cases such as the PUT method may not have been thoroughly tested.

### Lookup Object (at most one)

Lookup a single object by a selected field that uniquely identifies it.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to lookup on. E.g `Users`.
* **Select fields of the resulting object** - (Multiselect, required): Use this field to specify which fields should be included in the response. You can select one or more fields from the list of available fields. You must select at least one field. **Please note!** Selecting the `unseenCount` field for the `Groups` object type may result in a 500 error and field `mailboxSettings` for the `Users` object type in some case can return 404 Error.
* **Lookup Criteria** - (dropdown, required): (dropdown, required): A list of object parameters that can uniquely identify the object in the database, usually an ID.
  However, for certain object types such as Users, there may be an additional field, such as `User Principal Name`, that can be used instead.
* **Allow criteria to be omitted** - (boolean, optional): If selected field `Lookup Criteria Value` becomes optional.
* **Allow zero results** - (boolean, optional): When selected, if the object is not found - an empty object will be returned instead of throwing error.

#### Input Metadata

* **Lookup Criteria Value** - (string, required unless `Allow criteria to be omitted` is selected): Value for unique search criteria in `Lookup Criteria` configuration field.

#### Output Metadata

Object with result of lookup as value.

### Upsert Object

Create or Update object in Microsoft Azure AD.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to upsert. E.g `Users`.

#### Input Metadata

* **ID** - (string, optional): ID of the object to upsert.
  And dynamically generated fields according to chosen `Object Type`.

#### Output Metadata

* **id** - (string, optional): ID of created or updated object.

### Delete Object

Delete a single object by a selected field that uniquely identifies it. See the `Delete Criteria` section in the `Configuration Fields`.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to delete by. E.g `Users`.
* **Delete Criteria** - (dropdown, required): A list of object parameters that can uniquely identify the object in the database, usually an ID.
  However, for certain object types such as Users, there may be an additional field, such as `User Principal Name`, that can be used instead.
* **Emit strategy when no object found** - (dropdown, optional): This specifies the output when no object is found by the provided criteria (e.g. ID). One of:
  * **Emit nothing** - Emit nothing. Just skips an execution. **Please note!** If this option is selected, retrieving a sample, you will see an error with the text `No object found. Execution stopped. This error is only applicable to the Retrieve Sample. In flow executions there will be no error, just an execution skip.`. This is fine. In a real flow execution there will be no error.
  * **Emit an empty object {}** - Emit an empty object, e.g. `{}`.
  * **Throw an error (Default)** - Throw an error with the text `No object found by provided ID`. This is the default option if nothing else is selected.

#### Input Metadata

* **Delete Criteria Value** - (string, required): Value for unique search criteria in `Delete Criteria` configuration field.
See the `Delete Criteria` section in the `Configuration Fields`.

#### Output Metadata

* **Delete Criteria Value** - (string, optional): Criteria value to delete by (e.g. ID).

## Known Limitations

* Currently only 3 object types are supported:
  * **Users**
  * **Groups**
  * **Applications**
