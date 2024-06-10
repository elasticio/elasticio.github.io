---
title: Monday component
layout: component
section: Service components
description: The Monday Component facilitates interaction with the Monday API.
icon: monday.png
icontext: Monday component
category: monday
updatedDate: 2024-05-08
ComponentVersion: 1.0.0
---

## Description

The Monday Component facilitates interaction with the [Monday API](https://developer.monday.com/api-reference/reference). This version of the component has been tested with API version `2024-01`, utilizing `https://api.monday.com/v2/` as the base path.

## Credentials
To embark on building any integration flow, the initial step involves creating an app by following these steps:

1. Click on your profile picture at the top right corner.
2. Choose **Developers** to navigate to the Developer Center in a new tab.
3. In the new tab, select **Create app**.
4. Enter the desired Name. On this page, you'll also need to note the `Client ID` and `Client Secret`.
5. Navigate to the **OAuth** section in the left-side menu.
6. Choose the appropriate **Scopes**.
7. Input the **Redirect URLs** as `https://{your-tenant-address}/callback/oauth2`, where `{your-tenant-address}` is the domain of the integration platform.

With the app created, proceed to generate new credentials for the component:

- **Type** (dropdown, required) - `OAuth2`.
- **Choose Auth Client** (dropdown, required) - choose from previously created clients or select `Add New Auth Client`:
  - **Name** (string, required) - Assign any desired name.
  - **Client ID** (string, required) - Enter the `Client ID` found in your app's `Basic Information`.
  - **Client Secret** (string, required) - Enter the `Client Secret` from your app's `Basic Information`.
  - **Authorization Endpoint** (string, required) - Use Monday's `OAuth2` authorization endpoint `https://auth.monday.com/oauth2/authorize`.
  - **Token Endpoint** (string, required) - Use Monday's refresh token endpoint `https://auth.monday.com/oauth2/token`.
- **Name Your Credential** (string, required) - Choose any name you prefer.
- **Scopes** (Comma-separated list) (string, required) - Specify the scopes to access your Monday objects, e.g., `me:read`, `docs:write`. For more information on scopes, [click here](https://developer.monday.com/apps/docs/oauth#permission-scopes). To successfully verify credentials, a minimum of `me:read` is required.
- **Additional parameters (Comma-separated list)** (string, required) - Leave this field blank.
- **API version** (For advanced users) (string, optional) - Leaving this blank defaults to the `Current` API version. For details on what `Current` entails, [refer here](https://developer.monday.com/api-reference/docs/api-versioning).
  
  Example value for this field: `2024-01`

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.


## Actions

  * [**Execute Mutation**](#execute-mutation).
  * [**Lookup Objects (plural)**](#lookup-objects-plural).
  * [**Lookup Object By ID**](#lookup-object-by-id).
  * [**Make Raw Request**](#make-raw-request).


## Execute mutation

Execute any mutation available on API. This action can be used to `Create`, `Update` or `Delete` Objects and any other operations that affect Monday data.

#### Configuration Fields

* **Mutation type** - (dropdown, required): Mutation type to execute. E.g `Add users to team`.
* **Select basic fields for resulting object** - (dropdown, optional): Here provided only basic fields that can be included in resulting object, it may affect on query cost
* **You can provide additional fields here** - (string, optional): Resulting object can be expanded using GraphQL request, it may affect on query cost 
#### Example for Add users to team

  ```graphql
    successful_users {
      name
      email 
    }
  ```

#### Input Metadata

Dynamically generated fields according to chosen `Mutation type`.

#### Output Metadata

Result object from executed mutation.

## Lookup Objects plural
Lookup a set of objects by a defined criteria list. Can be emitted differently.

### Configuration Fields
- **Object Type** - (dropdown, required): Object-type to lookup on. E.g `Boards`.
- **Select basic fields for resulting object** - (dropdown, optional): Here provided only basic fields that can be included in the resulting object, it may affect query cost.
- **You can provide additional fields here** - (string, optional): The resulting object can be expanded using GraphQL request, it may affect query cost.
  <details close markdown="block"><summary><strong>Example for boards</strong></summary>

  ```graphql
    groups {
        title
        id
      }
  ```
  </details>

- **Emit Behavior** - (dropdown, required): Defines the way result objects will be emitted, one of `Emit page` or `Emit individually`.

### Input Metadata
Dynamically generated fields according to the chosen `Object type`.

### Output Metadata
For `Emit Page` mode: An object with key `results` that has an array as its value For `Emit Individually` mode: Each object that fills the entire message.

### Known Limitations
If the response from Monday is not an iterable array, it will be emitted as `Emit Individually` regardless of selected `Emit Behavior`.

## Lookup Object By ID
Lookup a single object by its ID.

### Configuration Fields
- **Object Type** - (dropdown, required): Object-type to lookup on. E.g `Boards`.
- **Select basic fields for resulting object** - (dropdown, optional): Here provided only basic fields that can be included in the resulting object, it may affect query cost.
- **You can provide additional fields here** - (string, optional): The resulting object can be expanded using GraphQL request, it may affect query cost.
  <details close markdown="block"><summary><strong>Example for boards</strong></summary>
    ```graphql
      groups {
          title
          id
        }
    ```
    </details>

- **Allow zero results** - (checkbox, optional): If checked and Object not found, returns empty Object (otherwise throws an error).

### Input Metadata
- **ID Value** - (string, required): Value for ID of the object to lookup.

### Output Metadata
Dynamically generated fields according to chosen `Object type` and selected fields.

## Make Raw Request
Executes custom requests using the straightforward Monday GraphQL API.

### Configuration Fields
none

### Input Metadata
- `Request Body` - (object, optional): Provide the request body.

<details close markdown="block"><summary><strong>Body Example</strong></summary>
```json
{
  "query" : "query { me { is_guest created_at name id}}"
}
```
</details>


  More info:
  - [Monday API reference](https://developer.monday.com/api-reference/reference/about-the-api-reference).
  - [GraphQL overview](https://developer.monday.com/api-reference/docs/introduction-to-graphql).

### Output Metadata
- **Status Code** - (number, required): The HTTP status code of the response.
- **HTTP headers** - (object, required): The response's HTTP headers.
- **Response Body** - (object, optional): The body of the HTTP response.

## Known Limitations
- For Lookup actions it is required to fill at least one of the fields `Select basic fields for resulting object` or `You can provide additional fields here`.
