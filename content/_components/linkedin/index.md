---
layout: component
title: LinkedIn component
section: Service components
description: The LinkedIn component is designed for seamless integration with the LinkedIn API.
icon: linkedin.png
icontext: LinkedIn component
category: linkedin
ComponentVersion: 1.0.0
updatedDate: 2026-04-20
---

## Table of Contents
* [General Information](#general-information)
* [Credentials](#credentials)
* [Triggers](#triggers)
  * [Get New and Updated Objects (Polling)](#get-new-and-updated-objects-polling)
* [Actions](#actions)
  * [Create or Reshare Post](#create-or-reshare-post)
  * [Make Raw Request](#make-raw-request)

## General Information

### Description
The LinkedIn component is designed for seamless integration with the LinkedIn API, enabling you to trigger flows based on LinkedIn data and perform various actions like creating posts.

## Credentials
Authentication occurs via OAuth 2.0.

To use OAuth 2.0, you must create a **LinkedIn Application** in the LinkedIn Developer Portal. During the app creation process, you will be asked to specify a **Redirect URL**. To process OAuth authentication via the platform, your [redirect URL](/guides/oauth-callback-redirect-url.html) should be in the format `https://your-tenant.elastic.io/callback/oauth2`.

More information can be found in the official [LinkedIn documentation](https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow).

To create credentials in the elastic.io platform:

1. Select an existing Auth Client from the **Choose Auth Client** dropdown or create a new one. To create a new Auth Client, specify the following fields:

| Field Name | Mandatory | Description |
|---|---|---|
| Name | Yes | A name for your Auth Client. |
| Client ID | Yes | Your Application's Client ID. |
| Client Secret | Yes | Your Application's Client Secret. |
| Authorization Endpoint | Yes | `https://www.linkedin.com/oauth/v2/authorization` |
| Token Endpoint | Yes | `https://www.linkedin.com/oauth/v2/accessToken` | 

2. Provide a name for your credential in the **Name Your Credential** field.
3. Specify the scopes in the **Scopes (Comma-separated fields)** field. For example:
```
r_member_postAnalytics,r_organization_followers,r_organization_social,rw_organization_admin,r_organization_social_feed,w_member_social,r_member_profileAnalytics,w_organization_social,r_basicprofile,w_organization_social_feed,w_member_social_feed,r_1st_connections_size
```
4. Click **Authenticate**. A login window will appear. Please enter your LinkedIn credentials.
5. Click **Verify** to confirm the credentials are working (verifies via the `/me` endpoint).
6. Click **Save** to save your credentials.

## Triggers

### Get New and Updated Objects (Polling)
Polls for new or updated objects like Posts from a specific author.

#### Configuration Fields
* **Object Type** (dropdown, required): Currently supports `Posts`.
* **Author (Person or Page)** (dropdown, required, dynamic): 
    * Select **Current Member (Authenticated User)** to poll for your own personal posts.
    * Select an **Organization** from the list to poll for posts from a company page you manage.
* **Emit Behavior** (dropdown):
    * `Emit individually` (default): Emits each new post as a separate message.
    * `Emit page`: Emits all new posts found in the polling interval as a single message.
* **Start Time** (string): Beginning time to start polling from (ISO format, default `1970-01-01T00:00:00.000Z`).
* **End Time** (string): End time for the polling range.
* **Size of Polling Page** (string): Max number of records to fetch in a single request (default 100). Must be a positive integer.

## Actions

### Create or Reshare Post
Create a new post or reshare an existing one with commentary.

#### Configuration Fields
* **Post Author** (dropdown, required, dynamic): Select yourself or an organization page to post from.

#### Input Metadata
* **Thoughts / Commentary** (TextFieldView, optional): The text content of the post.
* **Reshare Post URN** (TextFieldView, optional): The URN of an existing post to reshare (e.g., `urn:li:share:12345`).

#### Output Metadata
* **ID** (string): The (ID) URN of the created or reshared post.

### Make Raw Request
Executes a custom REST API call to a LinkedIn endpoint. Compatible with Rest.li 2.0 protocol.

#### Usage Notes for Raw Requests

The LinkedIn API uses the **Rest.li** protocol, which has two versions with different syntax rules. By default, this component uses **Rest.li 2.0.0** and the **LinkedIn Versioned API** (e.g., `202401`).

*   **Endpoint Prefix:** Almost all modern LinkedIn API calls must be prefixed with `/rest/` (e.g., `/rest/posts` instead of `/posts`).
*   **Protocol Versions & Query Parameters:**
    *   **Rest.li 2.0.0 (Default):** Supports complex nested objects using parentheses. However, it is strict about reserved characters. **Colons (`:`) in URNs must be percent-encoded as `%3A`**.
        *   *Example:* `/rest/me?projection=(id,firstName,lastName)`
        *   *Example with URN:* 
`/rest/organizationalEntityFollowerStatistics?q=organizationalEntity&organizationalEntity=urn%3Ali%3Aorganization%3A12345`
    *   **Rest.li 1.0.0:** Uses "dot notation" for nested fields and is more lenient with colons in URNs. To use this, you must add the header `X-Restli-Protocol-Version: 1.0.0`.
        *   *Example:* `/rest/organizationPageStatistics?q=organization&
        organization=urn:li:organization:12345&timeIntervals.timeGranularityType=DAY` (Must send 1.0.0 header). 
For more details on the differences between protocol versions, see the official LinkedIn documentation:
* [Rest.li Protocol Versions & Syntax Overview](https://learn.microsoft.com/en-us/linkedin/shared/api-guide/concepts/protocol-version)
* [How to format Query Parameters (Parentheses vs Dots)](https://learn.microsoft.com/en-us/linkedin/shared/api-guide/concepts/protocol-version#parameters)

#### Input Metadata
* **Method** (dropdown, required): The HTTP method to use (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
* **URL** (string, required): The URL path for the request (e.g., `/me` or `/posts`).
* **Data** (JSON, optional): The body to attach to the request.

#### Output Metadata
* **statusCode**: The HTTP status code of the response.
* **headers**: The response headers.
* **responseBody**: The actual data returned by the API.