---
title: Snowflake component
layout: component
section: Database components
description: A component for management over Snowflake database.
icon: snowflake.png
icontext: Snowflake component
category: snowflake
updatedDate: 2025-07-11
ComponentVersion: 2.1.0
---

## Table of Contents
* [General information](#general-information)
  * [Description](#description)
  * [Environment variables](#environment-variables)
* [Credentials](#credentials)
  * [OAuth 2 Authentication](#oauth-2-authentication)
  * [Key-pair Authentication](#key-pair-authentication)
* [Triggers](#triggers)
* [Actions](#actions)

## General information
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
      
> **Please Note:** By default, the maximum value is 7776000 seconds (90 days). After this period, you **must** reauthorize the component in Snowflake. If you have a business need to increase the maximum value, request your account administrator to send a request to [Snowflake Support](https://docs.snowflake.com/user-guide/contacting-support).

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

> **Please Note:** The `ACCOUNTADMIN`, `SECURITYADMIN`, and `ORGADMIN` roles are not permitted to use the integration - [more info](https://docs.snowflake.com/en/user-guide/oauth-custom#blocking-specific-roles-from-using-the-integration). Ensure that the specified role has access to the necessary database, schema, and table. You can switch to the required role in the Snowflake UI and check the necessary tables.

* **Additional parameters (Comma-separated list)** (string, required) – Leave this blank.
* **Account name** (string, required) – The full name of your account; you can find it in the 5th step of the integration creation.
* **Database Name** (string, required) – The default database to use for the session after connecting.

### Key-Pair Authentication

To use key-pair authentication, you must pre-create an authentication client of type `noauth` via the [API]({{site.data.tenant.apiBaseUri}}/docs/v2#/auth%20clients/post_auth_clients). The auth-client must have the same visibility scope (e.g., contract, workspace, tenant, or global) as the component that will use it.

You need one of the following permissions to create or access auth clients:
`global.auth_clients.get`, `tenants.auth_clients.get`, `contracts.auth_clients.get`, or `workspaces.auth_clients.get`.

The scope in which the client is created is determined by your permission and relationship.

- No relationship → Global scope

- Contract relationship → Contract scope

- Workspace relationship → Workspace scope

📦 Example: Creating a Contract-Scoped NoAuth Client

```javascript
{
  "data": {
    "type": "auth-client",
    "attributes": {
      "type": "noauth",
      "credentials": {},
      "name": "My Component"
    },
    "relationships": {
      "contract": {
        "data": {
          "type": "contract",
          "id": "{contract_id}"
        }
      },
      "components": {
        "data": [
          {
            "type": "component",
            "id": "{component_id}"
          }
        ]
      }
    }
  }
}
```
> **Please Note:** The component ID can be found in the component credentials page URL after `/credentials/` e.g. `61498a9c74a9310011beb1a7`.

Once created, set the `Type` field in the credentials section to `No Auth`.

Complete the following steps to configure [key pair authentication](https://docs.snowflake.com/en/user-guide/key-pair-auth#overview):

1. Generate a private key. You can generate either an unencrypted or encrypted private key:
  * Unencrypted key (no passphrase): 
`openssl genrsa 2048 | openssl pkcs8 -topk8 -inform PEM -out rsa_key.p8 -nocrypt`
  * Encrypted key (with passphrase):
`openssl genrsa 2048 | openssl pkcs8 -topk8 -v2 des3 -inform PEM -out rsa_key.p8`

2. Generate a public key. From the command line, generate the public key by referencing the private key. The following command assumes the private key is contained in the file named rsa_key.p8:
`openssl rsa -in rsa_key.p8 -pubout -out rsa_key.pub`

3. Store the private and public keys securely.

4. Grant the privilege to assign a public key to a Snowflake user. To assign a public key to a user, you must have one of the following [roles or privileges](https://docs.snowflake.com/en/user-guide/security-access-control-overview). The following statement grants the MODIFY PROGRAMMATIC AUTHENTICATION METHODS privilege on the `my_service_user` user to the role `my_service_owner_role`:
```sql
GRANT MODIFY PROGRAMMATIC AUTHENTICATION METHODS ON USER my_service_user
  TO ROLE my_service_owner_role;
```

5. Assign the public key to a Snowflake user:
```sql
ALTER USER example_user SET RSA_PUBLIC_KEY='MIIBIjANBgkqh...';
```
🔒 Do not include the -----BEGIN PUBLIC KEY----- and -----END PUBLIC KEY----- lines.

6. (Optional) You can additionally verify the user’s public key fingerprint by following [these steps](https://docs.snowflake.com/en/user-guide/key-pair-auth#verify-the-user-s-public-key-fingerprint).

7. Obtain the account name with this query:
    ```sql
    SELECT LOWER(CURRENT_ORGANIZATION_NAME() || '-' || CURRENT_ACCOUNT_NAME());
    ```

After completing the above steps, you can configure the connector with the following fields:

* **Account name** (string, required) – The full account identifier, as shown in step 7.
* **Database Name** (string, required) – The default database to use for the session after connecting.
* **Username** (string, required for key-pair auth) - The Snowflake username associated with the public key.
* **Passphrase** (string, optional) - If your private key is encrypted, specify the passphrase used to protect it.
* **Private Key** (string, required for key-pair auth) - Paste the full PEM-formatted private key here. It must use `PKCS#8` encoding. Both encrypted and unencrypted keys are supported. Be sure to include the full content including the header/footer lines, e.g.: `-----BEGIN PRIVATE KEY-----` or `-----BEGIN ENCRYPTED PRIVATE KEY-----`.

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
