---
layout: component
title: Basecamp component
section: Service components
description: The Basecamp component allows you to interact with your Basecamp account via API.
icon: basecamp.png
icontext: Basecamp component
category: basecamp
ComponentVersion: 1.0.0
updatedDate: 2025-10-22
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Delete Object By ID](#delete-object-by-id)
  * [Lookup Object By ID](#lookup-object-by-id)
  * [Lookup Objects (plural)](#lookup-objects-plural)
  * [Make Raw Request](#make-raw-request)
  * [Upsert Object](#upsert-object)
* [Triggers](#triggers)
  * [Webhook](#webhook)

## Description

The Basecamp component allows you to interact with your Basecamp account via API. It was tested using Basecamp 4 version and uses Basecamp’s REST API with OAuth 2.0 authentication.

## Credentials

Before building any integration flow you must first register your app at <https://launchpad.37signals.com/integrations>. You'll be assigned a `client_id` and `client_secret`. You'll need to provide a [redirect_uri](/guides/oauth-callback-redirect-url.html) as `https://{your-tenant-address}/callback/oauth2`.

Now you can create new credentials for the component:

* **Type** (dropdown, required) - `OAuth2`
* **Choose Auth Client** (dropdown, required) - select one of created before or `Add New Auth Client`:
  * **Name** (string, required) - Provide any name you want.
  * **Client ID** (string, required) - From Basecamp app.
  * **Client Secret** (string, required) - From Basecamp app.
  * **Authorization Endpoint** (string, required) - `https://launchpad.37signals.com/authorization/new?type=web_server`
  * **Token Endpoint** (string, required) - `https://launchpad.37signals.com/authorization/token?type=web_server`
* **Name Your Credential** (string, required) - Provide any name you want for this credential.
* **Scopes (Comma-separated list)** (string, required) - Please leave this field empty.
* **Additional parameters (Comma-separated list)** (string, required) - Set it as `access_type:offline,prompt:consent` to ensure the component works properly.
* **Account ID** (string, required) - Your Basecamp account ID.
* **Number of retries** (number, optional, 5 by default) - How many times the component should retry a request if it fails.
* **Delay between retries** (number ms, optional, 10000 by default) - How long to wait before retrying a failed request.

## Actions

### Delete Object By ID

Deletes a single object using its ID.

> **Please Note:** In Basecamp, a "delete" operation does not permanently remove the object. Instead, it is *trashed*. This means the object may still be recoverable or visible in the trash.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to delete.

#### Input Metadata

Includes the field(s) used to identify the object.

#### Output Metadata

Returns the id of the deleted object.

### Lookup Object By ID

Retrieves a single object using its ID.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to look up.

#### Input Metadata

Includes the field(s) used to identify the object.

#### Output Metadata

Returns an object with the result of the lookup.

If the `Upload` type is selected and the **Download to Maester** option is enabled, the result will include `internalURL`, which points to the file stored in the platform’s internal storage (Maester).

### Lookup Objects (Plural)

Lookups a set of objects based on a defined list of criteria. The results can be emitted in different ways.

> **Please Note:** The component automatically retrieves all available objects, but the number of items returned per iteration can vary. Typically:

  Page 1: ~15 items

  Page 2: ~30 items

  Page 3: ~50 items

  Page 4 and above: up to 100 items per iteration

The component will continue fetching pages until all objects matching the criteria are retrieved. For more information about Basecamp’s API pagination, see their [documentation](https://github.com/basecamp/bc3-api/blob/master/README.md#pagination)

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to look up.
* **Emit Behavior** - (dropdown, optional): Specifies how the resulting objects will be emitted, either as `Emit page` or `Emit individually`.

#### Input Metadata

Contains the fields used to identify the objects. If no fields are available, no input metadata is provided.

#### Output Metadata

For `Emit page` mode: An object with the key `results`, which contains an array as its value.

For `Emit individually` mode: Each object fills the entire message.
  
### Make Raw Request

Sends a custom HTTP request to the Basecamp API. Use this action when you need functionality not covered by prebuilt actions.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL. Here comes a part of the path that goes after `https://3.basecampapi.com/{accountId}`.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `DELETE`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

### Upsert Object

This action updates an existing object or creates a new one, depending on the selected operation.

#### Configuration Fields

* **Operation** - (dropdown, required): Choose the operation to perform - either `Update` or `Create`.
* **Object Type** - (dropdown, required): Select the type of object to update or create.

#### Input Metadata

Fields are dynamically generated based on the selected `Object Type`.

Here are some input metadata examples:

1. Object type - `Upload`, operation - `Create` :

```json
{
  "bucketId": "100",
  "vaultId": "123",
  "fileUrl": "http://example.com/cat.png",
  "base_name": "kitten"
}
```

2. Object type - `Document`, operation - `Update` :

```json
{
  "bucketId": "100",
  "id": "125",
  "title": "my-document",
  "content": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do incididunt ut labore et dolore magna aliqua.</p>"
}
```

#### Output Metadata

The result object from the create or update operation.

## Triggers
  
### Webhook

Creates a subscription to selected events. The webhook subscription is automatically created when the flow starts and deleted when the flow stops.

More information can be found on [Basecamp Webhook Docs](https://github.com/basecamp/bc3-api/blob/master/sections/webhooks.md).

#### Configuration Fields

* **Bucket ID** - (string, required): Specify the bucket ID.
* **Events** - (dropdown, optional): Select the events that will trigger this webhook. Defaults to `all` if not chosen.

#### Input Metadata

None.

#### Output Metadata

An object containing the event details that describe the changes.

Output Metadata Example:

```json
{
  "id": 1234567890098,
  "kind": "document_created",
  "created_at": "2025-09-26T16:52:47.351+03:00",
  "recording": {
    "id": 145,
    "title": "New Document",
    "type": "Document",
    "url": "https://3.basecampapi.com/123/buckets/321/documents/145.json",
    "bucket": {
      "id": 321,
      "name": "My Project"
    },
    "creator": {
      "id": 1234567890,
      "name": "Bob",
      "email_address": "bob@example.com"
    },
    "content": "<div>test</div>"
  }
}

```

#### Limitations

* If you use an ordinary flow (`real-time` not enabled), after the flow starts, you will need to run it once. Just follow the webhook URL (to trigger the first execution). This action will create a subscription.