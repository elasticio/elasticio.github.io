---
title: Managing OAuth Clients
layout: article
section: Tenant Management
order: 1
since: 20190403
---
This document contains [brief information](#oauth-brief) on OAuth, reveals the [new approach to OAuth utilization](#changes-in-approach) within the platform
and explains how to [use OAuth clients](#using-oauth-client-in-components) for
components in a tenant.

## OAuth Brief

[OAuth (Open Authorization)](https://en.wikipedia.org/wiki/OAuth) is authorization and authentication protocol based on access tokens. It allows users to forego credential sharing between different secure Internet-based services. Instead it uses automated authorization process that involves dedicated sets of OAuth credentials - "keys" and "secrets". We call this set of credentials `OAuth client`.

Some [integration components](/getting-started/integration-component) use OAuth client to provide accessibility. However, our legacy implementation restricted the user to a single OAuth client per component per [tenant](/getting-started/tenant). The OAuth client for component was defined in the component's environment variables.

For example, for Salesforce component the following environment variables were required in its _component.json_ file:
```
"envVars": {
   "SALESFORCE_KEY": {
     "required": true,
     "description": "Your Salesforce OAuth client key"
   },
   "SALESFORCE_SECRET": {
     "required": true,
     "description": "Your Salesforce OAuth client secret"
   }
},
```
Obviously, `"SALESFORCE_KEY"` defines Oauth key for Salesforce component, and `"SALESFORCE_SECRET"` defines Oauth secret.

This way `global` access to the component could not be enabled, because users in other tenants would see the
component with its keys and secrets.

## Changes in Approach
Now OAuth clients are defined separately from the components’ environment variables and belong to tenants rather than components. This means that even if we make a component globally accessible, its OAuth client will still remain in our tenant. Users in other tenants will not be able to see or use this `global` component until they define a component-specific OAuth client for their tenant.




## Using OAuth Client in Components

To manage OAuth clients the user requires the following permissions:

`tenants.oauth_clients.get`

`tenants.oauth_clients.edit`

`tenants.oauth_clients.create`

`tenants.oauth_clients.delete`

To acquire these permissions, please contact support.

To define OAuth client for a component, be sure to specify `"useOAuthClient": true` in the _component.json_ file. For compatibility reasons, we should also create a link between the new implementation and environment variables if they were present. You can find the corresponding code in the example below.

**EXAMPLE:**

If you had the following defined for environment variables:
```
"envVars": {
    "PIZZAVAN_KEY": {
      "required": true,
      "description": "Your Pizza Van OAuth client key"
    },
    "PIZZAVAN_SECRET": {
      "required": true,
      "description": "Your Pizza Van OAuth client secret"
    }
  }
```
Add the following object to _component.json_:
```
"oauth2": {
      "client_id": "{{PIZZAVAN_KEY}}",
      "client_secret": "{{PIZZAVAN_SECRET}}",
      "auth_uri": "https://auth_uri",
      "token_uri": "https://token_uri"
    },
    "useOAuthClient": true
  },
```

OAuth client management includes the following actions:
- [Create](#creating-oauth-clients)
- [Retrieve](#retrieving-oauth-clients)
- [Update](#updating-oauth-clients)
- [Delete](#deleting-oauth-clients)

#### Creating OAuth Clients

You can create one OAuth client per component in a tenant. Also, OAuth client can only be defined for a component that exists in the tenant, and is visible.

To create OAuth clients, we will use the following API request:

`POST {{apiBaseUri}}/v2/tenants/{TENANT_ID}/oauth-clients`

Below are request payload parameters:

| **Parameter**                       | **Required** | **Description**                 |
|-------------------------------------|--------------|---------------------------------|
| `attributes.client_id`              | yes          | OAuth client ID                 |
|       `attributes.client_secret`                        | yes          | OAuth client secret      |
| `type`          | yes          |     The value should be `flow`         |
| `relationships.component.data.id`   | yes          | Component ID                    |
| `relationships.component.data.type` | yes          | The value should be `component` |

**EXAMPLE:**
```
 curl {{apiBaseUri}}/v2/tenants/{TENANT_ID}/oauth-clients \
   -X POST \
   -u {EMAIL}:{APIKEY} \
   -H 'Content-Type: application/json' -d '
   {  
     "data":{  
       "type":"oauth-client",
       "attributes":{  
         "client_id":"{CLIENT_ID}",
         "client_secret":"{CLIENT_SECRET}"
       },
       "relationships":{  
         "component":{  
           "data":{  
             "id":"{COMPONENT_ID}",
             "type":"component"
           }
         }
       }
     }
   }'
```


#### Retrieving OAuth Clients

To retrieve OAuth clients in a tenant, we will use the following API request:

`GET {{apiBaseUri}}/v2/tenants/{TENANT_ID}/oauth-clients`

Below are request payload parameters:

| **Parameter**       | **Required** | **Description**        |
|---------------------|--------------|------------------------|
| `TENANT_ID`         | yes          | The ID of the tenant   |
| `filter[component]` | no           | Filter by component ID |

**EXAMPLES:**

The first example is without filtering by component ID.

`curl {{apiBaseUri}}/v2/tenants/{TENANT_ID}/oauth-clients \    -u
{EMAIL}:{APIKEY}`

The second example includes filtering by component ID.

`curl
{{apiBaseUri}}/v2/tenants/{TENANT_ID}/oauth-clients/?filter[component]={{COMPONENT_ID}}
\    -u {EMAIL}:{APIKEY}`

OAuth clients can also be retrieved by their own ID, using the following API request:

`curl
{{apiBaseUri}}/v2/tenants/{TENANT_ID}/oauth-clients/{OAUTH-CLIENT_ID} \
-u {EMAIL}:{APIKEY}`

Below are request payload parameters:

| **Parameter**     | **Required** | **Description**            |
|-------------------|--------------|----------------------------|
| `TENANT_ID`       | yes          | The ID of the tenant       |
| `OAUTH-CLIENT_ID` | yes          | The ID of the OAuth client |

**EXAMPLE:**

`curl
{{apiBaseUri}}/v2/tenants/{TENANT_ID}/oauth-clients/{OAUTH-CLIENT_ID} \
-u {EMAIL}:{APIKEY}`

#### Updating OAuth Clients

To update OAuth clients in a tenant, we will use the following API request:

`PATCH
{{apiBaseUri}}/v2/tenants/{TENANT_ID}/oauth-clients/{OAUTH-CLIENT_ID}`

Below are request payload parameters:

| **Parameter**                       | **Required** | **Description**                    |
|-------------------------------------|--------------|------------------------------------|
| `type`                              | yes          | The value should be `oauth-client` |
| `attributes.client_id`              | yes          | Oauth-client ID                    |
| `attributes.client_secret`          | yes          | Oauth-client secret                |
| `relationships.component.data.id`   | yes          | Component ID                       |
| `relationships.component.data.type` | yes          | The value should be `component`    |

**EXAMPLE:**

```
curl {{apiBaseUri}}/v2/tenants/{TENANT_ID}/oauth-clients/{OAUTH-CLIENT_ID} \
  -X PATCH \
  -u {EMAIL}:{APIKEY} \
  -H 'Content-Type: application/json' -d '
  {  
    "data":{  
      "type":"oauth-client",
      "attributes":{  
        "client_id":"{CLIENT_ID}",
        "client_secret":"{CLIENT_SECRET}"
      },
      "relationships":{  
        "component":{  
          "data":{  
            "id":"{COMPONENT_ID}",
            "type":"component"
          }
        }
      }
    }
  }'
  ```

#### Deleting OAuth Clients

You can only delete an OAuth client that is not used. An OAuth client is considered used when at least one integration flow in the tenant includes the component with this OAuth client. In case you delete a component with a defined OAuth client, this client will remain on the platform. However, it will not be usable. A user with corresponding permissions can remove this OAuth client, if required.

To delete an OAuth client, we will use the following API request:

`DELETE
{{apiBaseUri}}/v2/tenants/{TENANT_ID}/oauth-clients/{OAUTH-CLIENT_ID}
\\`

Below are request payload parameters:

| **Parameter**   | **Description**            |
|-----------------|----------------------------|
| TENANT_ID       | The ID of the Tenant       |
| OAUTH-CLIENT_ID | The ID of the OAuth client |

**EXAMPLE:**

`curl -i
{{apiBaseUri}}/v2/tenants/{TENANT_ID}/oauth-clients/{OAUTH-CLIENT_ID} \
-X DELETE \  -u {EMAIL}:{APIKEY}`

You can only delete an OAuth client that is not used. An OAuth client is considered used when at least one integration flow in the tenant includes the component with this OAuth client. In case you delete a component with a defined OAuth client, this client will remain on the platform. However, it will not be usable. A user with corresponding permissions can remove this OAuth client, if required.
