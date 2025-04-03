---
title: Snowflake Component
layout: component
section: Database components
description: A component for management over Snowflake database.
icon: snowflake.png
icontext: Snowflake component
category: snowflake
updatedDate: 2025-03-31
ComponentVersion: 2.0.0
---

## Table of Contents
* [Description](#description)
* [Environment variables](#environment-variables)
* [Credentials](#credentials)
* [Triggers](#triggers)
* [Actions](#actions)

### Description

This is a component for management over Snowflake database on [{{site.data.tenant.name}} platform](http://www.{{site.data.tenant.name}}).
Snowflake supports the following constraint types from the ANSI SQL standard:
 - `UNIQUE`
 - `PRIMARY KEY`
 - `FOREIGN KEY`
 - `NOT NULL`
**Important:** - Snowflake supports defining and maintaining constraints, but does not enforce them, except for NOT NULL constraints, which are always enforced. [Overview of Snowflake Constraints](https://docs.snowflake.com/en/sql-reference/constraints-overview.html)
It means that:
  - Multiple rows can be created with the same `UNIQUE` value
  - Multiple rows can be created with the same `PRIMARY KEY` value
  - etc

### Environment variables

No required Environment variables.

## Credentials

Before building any flow, you must first create an OAuth 2 integration in [Snowflake Worksheets](https://docs.snowflake.com/en/user-guide/ui-snowsight-worksheets-gs).

1. Create a new worksheet.

2. Use the following query to create a new integration:
    ```sql
    CREATE SECURITY INTEGRATION EIO
      TYPE = OAUTH
      ENABLED = TRUE
      OAUTH_CLIENT = CUSTOM
      OAUTH_CLIENT_TYPE = 'CONFIDENTIAL'
      OAUTH_REDIRECT_URI = 'https://{your-tenant-address}/callback/oauth2'
      OAUTH_ISSUE_REFRESH_TOKENS = TRUE
      OAUTH_REFRESH_TOKEN_VALIDITY = 7776000
    ;
    ```
    The main fields here are:
      * **EIO** – The name of your integration; you can replace it with your own.
      * **OAUTH_REDIRECT_URI** – The [OAuth 2 redirect URL](/guides/oauth-callback-redirect-url.html) to our platform. Replace `{your-tenant-address}` with your own.
      * **OAUTH_REFRESH_TOKEN_VALIDITY** – The duration for which the component can automatically refresh the token.
      
        ❗❗❗**Note:** By default, the maximum value is 7776000 seconds (90 days). After this period, you **must** reauthorize the component in Snowflake. If you have a business need to increase the maximum value, request your account administrator to send a request to [Snowflake Support](https://docs.snowflake.com/user-guide/contacting-support).

    You can change some values later. For example, to change the **OAUTH_REDIRECT_URI**, you can use the following query:
    ```sql
    ALTER SECURITY INTEGRATION EIO
    SET OAUTH_REDIRECT_URI = 'https://{your-tenant2-address}/callback/oauth2';
    ```

3. After creating the integration, you can use the following query:
    ```sql
    SELECT SYSTEM$SHOW_OAUTH_CLIENT_SECRETS('EIO');
    ```
    In response, you will receive the following fields that will be needed for the component:
      * **OAUTH_CLIENT_SECRET**
      * **OAUTH_CLIENT_ID**

4. You will also need this query:
    ```sql
    DESC INTEGRATION EIO;
    ```
    From this, we will need:
      * **OAUTH_AUTHORIZATION_ENDPOINT**
      * **OAUTH_TOKEN_ENDPOINT**
      * **OAUTH_ALLOWED_AUTHORIZATION_ENDPOINTS**
      * **OAUTH_ALLOWED_TOKEN_ENDPOINTS**

5. Finally, to obtain the account name, you can use this query:
    ```sql
    SELECT LOWER(CURRENT_ORGANIZATION_NAME() || '-' || CURRENT_ACCOUNT_NAME());
    ```

Now you can create new credentials for the component:

{% include img.html max-width="100%" url="img/credentials.png" title="Snowflake Component credentials" %}
* **Type** (dropdown, required) – `OAuth2`
* **Choose Auth Client** (dropdown, required) – Select one of the previously created clients or choose `Add New Auth Client`:
  * **Name** (string, required) – Provide any name you wish.
  * **Client ID** (string, required) – Enter the `OAUTH_CLIENT_ID` here.
  * **Client Secret** (string, required) – Enter the `OAUTH_CLIENT_SECRET` here.
  * **Authorization Endpoint** (string, required) – Enter the `OAUTH_AUTHORIZATION_ENDPOINT` or use one of the `OAUTH_ALLOWED_AUTHORIZATION_ENDPOINTS`.
  * **Token Endpoint** (string, required) – Enter the `OAUTH_TOKEN_ENDPOINT` or use one of the `OAUTH_ALLOWED_TOKEN_ENDPOINTS`.

* **Name Your Credential** (string, required) – Provide any name you wish.
* **Scopes (Comma-separated list)** (string, required) – Use the following value here: `refresh_token session:role:{ROLE}`, where `{ROLE}` is the name of the role to interact with Snowflake.

    ❗**Note:** The `ACCOUNTADMIN`, `SECURITYADMIN`, and `ORGADMIN` roles are not permitted to use the integration - [more info](https://docs.snowflake.com/en/user-guide/oauth-custom#blocking-specific-roles-from-using-the-integration). Ensure that the specified role has access to the necessary database, schema, and table. You can switch to the required role in the Snowflake UI and check the necessary tables.

* **Additional parameters (Comma-separated list)** (string, required) – Leave this blank.
* **Account name** (string, required) – The full name of your account; you can find it in the 5th step of the integration creation.
* **Database Name** (string, required) – The default database to use for the session after connecting.

## Triggers

1. [Get Rows Polling Trigger](/components/snowflake/triggers.html#get-rows-polling-trigger)

## Actions

Snowflake component includes the following actions:

1. [Execute custom query action](/components/snowflake/actions.html#execute-custom-query-action) - Action to execute custom SQL query from provided request string.

2. [Insert action](/components/snowflake/actions.html#insert-action) - This action will execute insert query into the specified table.

3. [Lookup row by primary key action](/components/snowflake/actions.html#lookup-row-by-primary-key-action) - This action will lookup row by it's primary key

4. [Delete row by primary key action](/components/snowflake/actions.html#delete-row-by-primary-key-action) - This action will delete row by it's primary key

5. [Upsert row by primary key action](/components/snowflake/actions.html#upsert-row-by-primary-key-action) - This action will execute upsert row by it's primary key.

6. [Select action](/components/snowflake/actions.html#select-action) -The action will execute an [SQL](https://en.wikipedia.org/wiki/SQL "SQL") query that can return multiple results.

7. [Execute stored procedure action](/components/snowflake/actions.html#execute-stored-procedure-action) - This action calls stored procedure
