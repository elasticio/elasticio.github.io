---
title: Managing OAuth Clients
layout: article
section: Developing Components
order: 1
since: 20190403
---
This document reveals the new approach to OAuth utilization within the platform
and explains how to [manage](#managing-oauth-client) OAuth clients for
components in a tenant.

## Changes


OAuth client was defined for a component in its environment variables. This way
global access to the component could not be enabled, because users in other tenants would see the
component and its keys. Now OAuth clients are defined
separately from the components’ environment variables, allowing the users in the
other tenant to see all available components without security breach.

To manage OAuth clients the user requires the following permissions:


`tenants.oauth_clients.get`

`tenants.oauth_clients.edit`

`tenants.oauth_clients.create`

`tenants.oauth_clients.delete`


To acquire these permissions, please contact support.

## Managing OAuth Client

To initiate work with OAuth client, first specify `"useOAuthClient": true` in the _component.json_ file. For compatibility reasons, we should also create a link between the new implementation and environment variables if they were present.

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
    }
```

OAuth client management includes the following actions: create,
[retrieve](#to-retrieve-oauth-clients-in-a-tenant-we),
[update](#to-update-oauth-clients-in-a-tenant-we-will-use-the-following-api-request)
and [delete](#to-delete-an-oauth-client-we-will-use-the-following-api-request).

#### To create OAuth clients, we will use the following API request:

`POST https://api.elastic.io/v2/tenants/{TENANT_ID}/oauth-clients`

Below are request payload parameters:

| **Parameter**                       | **Required** | **Description**                 |
|-------------------------------------|--------------|---------------------------------|
| `attributes.client_id`              | yes          | OAuth client ID                 |
| `type`                              | yes          | The value should be `oauth-client`      |
| `attributes.client_secret`          | yes          | OAuth client secret             |
| `relationships.component.data.id`   | yes          | Component ID                    |
| `relationships.component.data.type` | yes          | The value should be `component` |

**EXAMPLE:**
```
 curl https://api.elastic.io/v2/tenants/{TENANT_ID}/oauth-clients \
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

#### To retrieve OAuth clients in a tenant, we will use the following API request:

`GET https://api.elastic.io/v2/tenants/{TENANT_ID}/oauth-clients`

Below are request payload parameters:

| **Parameter**       | **Required** | **Description**        |
|---------------------|--------------|------------------------|
| `TENANT_ID`         | yes          | The ID of the tenant   |
| `filter[component]` | no           | Filter by component ID |

**EXAMPLES:**

The first example is without filtering by component ID.

`curl https://api.elastic.io/v2/tenants/{TENANT_ID}/oauth-clients \    -u
{EMAIL}:{APIKEY}`

The second example includes filtering by component ID.

`curl
https://api.elastic.io/v2/tenants/{TENANT_ID}/oauth-clients/?filter[component]={{COMPONENT_ID}}
\    -u {EMAIL}:{APIKEY}`

#### OAuth clients can also be retrieved by their own ID, using the following API request:

`curl
https://api.elastic.io/v2/tenants/{TENANT_ID}/oauth-clients/{OAUTH-CLIENT_ID} \
-u {EMAIL}:{APIKEY}`

Below are request payload parameters:

| **Parameter**     | **Required** | **Description**            |
|-------------------|--------------|----------------------------|
| `TENANT_ID`       | yes          | The ID of the tenant       |
| `OAUTH-CLIENT_ID` | yes          | The ID of the OAuth client |

**EXAMPLE:**

`curl
https://api.elastic.io/v2/tenants/{TENANT_ID}/oauth-clients/{OAUTH-CLIENT_ID} \
-u {EMAIL}:{APIKEY}`

#### To update OAuth clients in a tenant, we will use the following API request:

`PATCH
https://api.elastic.io/v2/tenants/{TENANT_ID}/oauth-clients/{OAUTH-CLIENT_ID}`

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
curl https://api.elastic.io/v2/tenants/{TENANT_ID}/oauth-clients/{OAUTH-CLIENT_ID} \
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

#### To delete an OAuth client, we will use the following API request:

`DELETE
https://api.elastic.io/v2/tenants/{TENANT_ID}/oauth-clients/{OAUTH-CLIENT_ID}
\\`

Below are request payload parameters:

| **Parameter**   | **Description**            |
|-----------------|----------------------------|
| TENANT_ID       | The ID of the Tenant       |
| OAUTH-CLIENT_ID | The ID of the OAuth client |

**EXAMPLE:**

`curl -i
https://api.elastic.io/v2/tenants/{TENANT_ID}/oauth-clients/{OAUTH-CLIENT_ID} \
-X DELETE \  -u {EMAIL}:{APIKEY}`
