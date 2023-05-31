---
title: Jira Cloud component
layout: component
section: Service components
description: Jira Cloud Component is designed to connect to Atlassian Jira Cloud platform.
icon: jira-cloud.png
icontext: Jira Cloud component
category: jira-cloud
updatedDate: 2023-05-31
ComponentVersion: 1.3.0
---

## Description

The Jira Cloud Component is specifically designed to integrate with Atlassian products such as the [Jira Cloud platform](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/) and [Jira Service Management Cloud](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/).

In Jira Cloud, `Service requests` and `Issues` refer to the same type of objects. This means that you can utilize all the available actions and triggers for `Issue` to create, update, and delete `Service requests`. The Jira Cloud Component enables seamless interaction with these objects, allowing you to perform various operations on them within the context of your integration.

### API version

Current release of component tested on API `v3`.

### Credentials

Before creating an integration flow, it is essential to configure the app by accessing the [Atlassian developer console](https://developer.atlassian.com/console/myapps/). This console allows you to set up and manage your app's configuration. To do this, follow the steps below:

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
* **Scopes (Space-separated list)** (string, required) - Put here scopes to get access to your Jira - `offline_access read:jira-user read:jira-work write:jira-work` [more info](https://developer.atlassian.com/cloud/jira/platform/scopes-for-oauth-2-3LO-and-forge-apps/), additionally `manage:servicedesk-customer read:servicedesk-request write:servicedesk-request` if you going to use Service Management
* **Additional parameters (Comma-separated list)** (string, required) - set it as `prompt:consent` to make component works properly
* **Number of retries** (number, optional, 5 by default, maximum 10) - How many times component should retry to make request
* **Delay between retries** (number ms, optional, 3000 by default, maximum 10 000) - How much time to wait until the new attempt. Note that in case a response includes a header `Retry-After` it will be used

## Triggers

### Get New and Updated Objects Polling

Retrieve all the updated or created objects within a given time range. Currently supported `Issues` only

#### Configuration Fields

* **Select cloud** - (dropdown, required): This will retrieve the sites that have scopes granted by the token.
* **Object Type** - (string, required): Object-type to lookup on. E.g `Issues`.
* **Timestamp field to poll on** - (string, optional): Can be either Last Modified or Created dates (updated or new objects, respectively). Defaults to Last Modified.
* **Emit Behavior** - (dropdown, required): Defines the way result objects will be emitted, one of `Emit all`, `Emit page` or `Emit individually`.
* **Start Time** - (string, optional): The timestamp to start polling from (inclusive) - format YYYY-MM-DD hh:mm, should include timezone. Default value is the beginning of time (January 1, 1970 at 00:00).
* **End Time** - (string, optional): The timestamp to stop polling (exclusive) - format YYYY-MM-DD hh:mm, should include timezone. Default value is execution time.

#### Input Metadata

There is no input metadata in this component.

#### Output Metadata

For `Emit Page` mode: An object with key `results` that has an array as its value
For `Emit Individually` mode: Each object which fill the entire message.

#### Known Limitations

* For `Retrieve sample` there will be limit of 10 records

## Actions

### Delete Object

Simply delete an object. Currently, only one - 'issues' object type is supported.

#### Configuration Fields

* **Select cloud** - (dropdown, required): This will retrieve the sites that have scopes granted by the token.
* **Object Type** - (dropdown, required): Object-type to delete. Currently, the only one object type is supported: `Issue`.
* **Emit strategy when no object found** - (dropdown, optional): This specifies the output when no object is found by the provided criteria (e.g. ID). One of:
  * **Emit nothing** - Emit nothing. Just skips an execution. Please note! If this option is selected, retrieving a sample, you will see an error with the text No object found. Execution stopped. This error is only applicable to the Retrieve Sample. In flow executions there will be no error, just an execution skip.. This is fine. In a real flow execution there will be no error.
  * **Emit an empty object {}** - Emit an empty object, e.g. {}.
  * **Throw an error (Default)** - Throw an error with the text No object found by provided ID. This is the default option if nothing else is selected.

#### Input Metadata

* **Issue ID or Key** - (string, required): An ID or a key of an issue to delete.

Example:

```json
{
  "issueIdOrKey": "SP-60"
}
```

#### Output Metadata

* **Issue ID or Key** - (string, optional): An ID or a key of a deleted issue.

### Lookup Objects (plural)

Lookup a set of objects by defined criteria. Currently supported `Users` and `Issues`

#### Configuration Fields

* **Select cloud** - (dropdown, required): This will retrieve the sites that have scopes granted by the token.
* **Object Type** - (dropdown, required): Object-type to lookup on. E.g `Users`.
* **Emit Behavior** - (dropdown, required): Defines the way result objects will be emitted, one of `Emit all`, `Emit page` or `Emit individually`.
* **Number of search terms**- (number, optional, max 99): - specify a number of search terms (not applicable to `Users`).

#### Input Metadata

* For `Issues` Object Type:
Groups of fields for each search term:
  * **Field name** - (string, required): Object field name to filter (a list of allowed values is available)
  * **Condition** - (string, required): Condition to compare selected field with value, [more info](https://support.atlassian.com/jira-software-cloud/docs/advanced-search-reference-jql-operators/)
  * **Field value** - (string, optional): Value of selected field, pay attention to syntax - if value contains spaces, they should be quoted, if condition may have several values it should be enclosed in parentheses. for example:
    * Condition is `=` and value doesn't contains space, it can be simple text: `John`
    * Condition is `=` and value contains space, it should be quoted: `"John Smith"`
    * Condition is `IN` and value doesn't contains space, it should be enclosed in parentheses: `(Jack,Jill)`
    * Condition is `IN` and value contains space, it should be quoted and enclosed in parentheses: `("Jack Smith", "Jill Smith")`
  * **Logical operator** - one of the following: `and`, `or` to combine multiple search terms

<details close markdown="block"><summary><strong>Example</strong></summary>


```json
    {
      "sTerm_1": {
        "fieldName": "summary",
        "condition": "~",
        "fieldValue": "Fail"
      },
      "link_1_2": "and",
      "sTerm_2": {
        "fieldName": "assignee",
        "condition": "=",
        "fieldValue": "null"
      }
    }
```

</details>

* For `Users` Object Type:

  * **Query** - (string, optional): Find users by query, you can put here part of string that is matched against user attributes `displayName` and `emailAddress` or use statements [more info](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-user-search/#api-rest-api-3-user-search-query-get)


If `Emit Behavior` equals `Emit page` additional fields will be added:

* **Page Number** - (number, defaults to 0): Indicates index of page to be fetched.
* **Page Size** - (number, defaults to 100, max 100): Indicates the number of objects per page


#### Output Metadata

For `Emit All` mode: An object, with key `results` that has an array as its value.

For `Emit Page` mode: An object with key `results` that has an array as its value (if `Page Size` > 0). Key `totalCountOfMatchingResults` which contains the total number of results (not just on the page) which match the search criteria (not available with `Users` Object Type).

For `Emit Individually` mode: Each object which fill the entire message.

#### Known Limitations

* If you expect a big amount of records in result, avoid using `Emit All`
* `Number of search terms` not applicable to `Users` Object Type
* `Users` total results with provided `Query` restricted to 1000, if you need more, leave it blank
* For `Retrieve sample` there will be limit of 10 records

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

### Make Raw Request

Executes custom request.

#### Configuration Fields

* **Select cloud** - (dropdown, required): This will retrieve the sites that have scopes granted by the token.
* **Cloud product** - (dropdown, required): Select one of supported Atlassian products:
  * [Jira Cloud platform](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/)
  * [Jira Service Management Cloud](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/)
* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL:
  * `https://api.atlassian.com/ex/jira/{cloudid}/rest/api/3/` for `Jira Cloud platform`
  * `https://api.atlassian.com/ex/jira/{cloudid}/rest/servicedeskapi/` for `Jira Service Management Cloud`
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
