---
title: Salesforce component
layout: component
section: CRM components
description: A component for seamless integration with the Salesforce REST API, enabling you to trigger flows based on Salesforce data and perform various actions.
icon: salesforce.png
icontext: Salesforce component
category: salesforce
updatedDate: 2025-10-15
ComponentVersion: 2.9.0
---

## Table of Contents

* [General Information](#general-information)
   * [Description](#description)
   * [Completeness Matrix](#completeness-matrix)
   * [API Version](#api-version)
   * [Environment Variables](#environment-variables)
* [Credentials](#credentials)
* [Triggers](#triggers)
* [Actions](#actions)
* [Permissions](#permissions)
* [Known Limitations](#known-limitations)

## General Information

### Description

{{page.description}}

> **Please Note**: The component works with the Salesforce API. This means you must
> make sure your Salesforce edition has API Access enabled. To check which editions
> have API access see the [Salesforce editions with API Access](https://help.salesforce.com/articleView?id=000326486&type=1&mode=1) document.
> **If your edition has no API Access by default this component _will not work for you_.**.

### Completeness Matrix

On the [technical notes](technical-notes) page you can find some technical details about Salesforce component like [changelog](technical-notes#changelog) and the [completeness matrix](technical-notes#completeness-matrix).

### API Version
The component uses Salesforce API Version 46.0 by default, but this can be overridden by the environment variable `SALESFORCE_API_VERSION`.

> **Please note:** Deprecated Actions and Triggers - API Version 25.0.

### Environment Variables

| Name | Mandatory | Description | Values |
|------|------------|--------------|---------|
| `SALESFORCE_API_VERSION` | No | Overrides the default Salesforce API version. | Default: `46.0` |
| `REFRESH_TOKEN_RETRIES` | No | The number of retries to refresh a token before throwing an error. | Default: `10` |
| `HASH_LIMIT_TIME` | No | Cache expiration time in milliseconds for `Lookup` actions. | Default: `600000` |
| `HASH_LIMIT_ELEMENTS` | No | The maximum number of entries in the cache for `Lookup` actions. | Default: `10` |
| `UPSERT_TIME_OUT` | No | Timeout for the `Upsert Object` action in milliseconds. | Default: `120000` (2min) |
{: .table .table-bordered .table-striped }

> **Please Note:** From the platform version [20.51](/releases/20/51) we deprecated the
> component `LOG_LEVEL` environment variable. Now you can control logging level per each step of the flow.

## Credentials

Authentication occurs via OAuth 2.0.

To use OAuth 2.0, you must create a Connected App in your Salesforce instance. During the app creation process, you will be asked to specify a Callback URL. To process OAuth authentication on the platform, your [callback URL](/guides/oauth-callback-redirect-url) should be in the format `https://your-tenant.elastic.io/callback/oauth2`.

More information can be found in the official [Salesforce documentation](https://help.salesforce.com/apex/HTViewHelpDoc?id=connected_app_create.htm).

> **Warning:** To maintain a smooth experience, we recommend reusing stored credentials where possible. Duplicating secrets across OAuth clients can result in errors and complications.


For more information, please read our [Creating OAuth App for Salesforce](creating-oauth-app-for-salesforce) article.

During credentials creation you would need to:

**1.**  Select an existing Auth Client from the **Choose Auth Client** dropdown or create a new one.

{% include img.html max-width="100%" url="img/add-new-client.png" title="Add new client" %}

To create a new Auth Client, specify the following fields:

{% include img.html max-width="70%" url="img/define-client.png" title="Define client" %}

| Field Name             | Mandatory | Description |
|------------------------|-----------|-------------|
| Name                   | Yes       | A name for your Auth Client. |
| Client ID              | Yes       | Your Connected App's Consumer Key. |
| Client Secret          | Yes       | Your Connected App's Consumer Secret. |
| Authorization Endpoint | Yes       | Your OAuth authorization endpoint. For production, use `<code>https://login.salesforce.com/services/oauth2/authorize</code>`. For sandboxes, use `<code>https://test.salesforce.com/services/oauth2/authorize</code>`. |
| Token Endpoint         | Yes       | Your OAuth token endpoint for refreshing access tokens. For production, use `<code>https://login.salesforce.com/services/oauth2/token</code>`. For sandboxes, use `<code>https://test.salesforce.com/services/oauth2/token</code>`. |

Here you can see how to select an existing `client`:

{% include img.html max-width="100%" url="img/client-exist.png" title="Choose client" %}

**2.**  Provide a name for your credential in the **Name Your Credential** field.

**3.**  Click **Authenticate**. If you are not already logged into Salesforce, a login window will appear. Please enter your credentials.

**4.**  Click **Verify** to confirm the credentials are working.

**5.**  Click **Save** to save your credentials.

> **Please note:** Salesforce migration or any changes that affect endpoints, single sign-on (SSO), OAuth and JSON web tokens (JWT), and other connections can lead to unpredictable behavior that can cause authentication issues. To avoid this after making changes you need to create new credentials and authenticate again, once this is done the old ones can be safely removed from the platform.

## Triggers

Salesforce component includes the following triggers:

1.  [Get Updated Objects Polling](triggers#get-updated-objects-polling) Polls for objects that have been created or updated within a given time frame.
2.  [Query Trigger](triggers#query-trigger) Executes a user-defined SOQL query during each polling interval to fetch records.
3.  [Subscribe to Platform Events (Real-time Flows Only)](/components/salesforce/triggers#subscribe-to-platform-events) Subscribes to a specified Platform Event using the Salesforce Streaming API.
4. [Subscribe to Pub/Sub Events](triggers#subscribe-to-pubsub-events) Subscribes to a specified Platform Event using the Salesforce [Pub/Sub API](https://developer.salesforce.com/docs/platform/pub-sub-api/overview).

> You can find information on deprecated triggers [here](deprecated-functions#deprecated-actions).

## Actions

Use this list to navigate to the action you seek.

1.  [Bulk Create/Update/Delete/Upsert](actions#bulk-createupdatedeleteupsert) Uses the Bulk API 2.0 to quickly load large amounts of data (up to 10,000 records) from a CSV file into Salesforce.
2.  [Bulk Query](actions#bulk-query) Fetches a large number of records using a SOQL query and streams the result as a CSV file in an attachment.
3.  [Create Object](actions#create-object) Creates a single new object in Salesforce.
4.  [Delete Object (at most 1)](actions#delete-object-at-most-1) Deletes a single object found by a specified field and value.
5.  [Lookup Object (at most 1)](actions#lookup-object-at-most-1) Looks up a single object by a specified field and value.
6.  [Lookup Objects](actions#lookup-objects) Looks up a list of objects that satisfy the specified criteria.
7.  [Query Action](actions#query-action) Executes a SOQL query.
8.  [Raw Request](actions#raw-request) Executes a custom REST API call to a Salesforce endpoint.
9.  [Upsert Object](actions#upsert-object) Creates a new object or updates an existing one.

> You can find information on deprecated actions [here](deprecated-functions#deprecated-actions).

## Permissions

By default, certain user profiles in Salesforce have disabled permissions. To ensure an object is visible in the component's dropdowns, you may need to enable its standard object permissions.

To enable these permissions:

1.  Go to the Salesforce **Setup** page.
2.  Navigate to **Administration > Users > Profiles**.
3.  Select the profile that needs modification and click **Edit**.
4.  Under **Standard Object Permissions**, ensure the necessary permissions are enabled. For example, to use the **Get Updated Objects Polling** trigger, the `Read`, `Create`, and `Edit` permissions are typically required for the object.

<details close markdown="block"><summary><strong>Salesforce setup page</strong></summary>

{% include img.html max-width="100%" url="img/permission-1.png" title="Salesforce setup page" %}

</details>

Once you are on the profile editing page, ensure that all the required standard object permissions are enabled. For instance, if you intend to utilize the [Get New and Updated Objects Polling trigger](triggers#get-new-and-updated-objects-polling-trigger), the following permissions are necessary: Read, Create, and Edit.

<details close markdown="block"><summary><strong>Standart objects permissions</strong></summary>

{% include img.html max-width="100%" url="img/permission-2.png" title="Standart objects permissions" %}

</details>

Carefully review the permissions and make any necessary adjustments to enable the required access.


## Known limitations

Attachments mechanism doesn't work with [Local Agent Installation](/getting-started/local-agent.html).
