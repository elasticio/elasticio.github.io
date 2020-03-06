---
title: Creating and Using Recipes
layout: article
section: Recipes
description: This document provides information on how to create a recipe, and how to use them.
order: 1
category: recipes
---

This document provides information on how to [create Recipes](#creating-recipes), [manage Recipes](#managing-recipes), and how to [use them to create Flows](#activate-a-recipe---create-a-flow). Additionally, it gives a small glimpse into the new [Recipes UI](#coming-soon-recipes-ui) that is in development.

[Recipes](/getting-started/recipes) allow users to share [Flow](/getting-started/integration-flow) templates with others without disclosing their non-shareable data ([Credentials](/getting-started/credential), Fields, Variables).

​
## Creating Recipes

There are two ways to create a Recipe:
​
- [From an existing integration Flow](#creating-recipes-from-flows)
​
- [From scratch](#creating-recipes-from-scratch)

### Creating Recipes from Flows

To create a Recipe from a chosen Flow, use the following request, provided you have `workspaces.recipe.edit` permission:
​
`POST {{site.data.tenant.apiBaseUri}}/v2/recipes/`     
​

Below are the request body parameters:

| **Parameter** | **Required** | **Description** |
|----------------------------------|--------------|---------------------------|
| `type`                             | yes   | Allowed value: `recipe` |
| `attributes.activation_config.variables` | no  | List of variables for steps|
| `attributes.activation_config.credentials`   | no   | List of Credentials for steps  |
| `attributes.marketplace_content.name` | yes    | Recipe name |
| `attributes.marketplace_content.description` | yes   | Recipe description  |
| `attributes.marketplace_content.short_description` | yes   | Recipe short description  |
| `attributes.marketplace_content.help_text` | no   | Recipe help text  |
| `attributes.flow_template.cron` | no   | CRON expression |
| `attributes.flow_template.graph` | yes   | Recipe graph representing component connections  |
| `relationships.workspace.data.id` | yes          | Workspace ID  |
| `relationships.workspace.data.type` | yes          | Allowed value: `workspace`  |


**EXAMPLE:**
​
```
curl -X POST {{site.data.tenant.apiBaseUri}}/v2/recipes \
  -u {EMAIL}:{APIKEY} \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' -d '
  {
    "data": {
      "type": "recipe",
      "attributes": {
        "activation_config": {
          "variables": [{
            "title": "Email to fill a \"CC\" field",
            "key": "cc"
          }],
          "credentials": [{
            "description": "Credentials to access your Component",
            "stepId": "step_1"
          }]
        },
        "marketplace_content": {
          "title": "My Recipe",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "short_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "help_text": "No setup required",
          "tags": []
        },
        "flow_template": {
          "cron": "*/3 * * * *",
          "graph": {
            "nodes": [
              {
                "name": "Step name",
                "description": "Step description",
                "command": "acmecore/petstore:getPetsByStatusWithGenerators@latest",
                "fields": {
                  "status": "pending"
                },
                "id": "step_1"
              },
              {
                "name": "Step name",
                "description": "Step description",
                "command": "acmecore/email:send@latest",
                "fields": {
                  "dontThrowErrorFlg": true
                },
                "id": "step_2"
              }
            ],
            "edges": [
              {
                "config": {
                  "mapper_type": "jsonata",
                  "mapper": {
                    "to": "pets[0].name",
                    "cc": "$getFlowVariables().cc",
                    "subject": "pets[0].id",
                    "textBody": "pets[0].status"
                  },
                  "condition": null
                },
                "source": "step_1",
                "target": "step_2"
              }
            ]
          }
        }
      },
      "relationships": {
        "workspace": {
          "data": {
            "type": "workspace",
            "id": "{WORKSPACE_ID}"
          }
        }
      }
    }
  }'
```

### Creating Recipes from Scratch

To create a Recipe from a chosen Flow, use the following request, provided you have `workspaces.recipe.edit` permission:
​
`POST {{site.data.tenant.apiBaseUri}}/v2/flows/{FLOW_ID}/export-to-recipe`​


Below are the request body parameters:
​

| **Parameter** | **Required** | **Description** |
| `type`                              | yes          | Allowed value: `recipe`    |
| `relationships.workspace.data.id`   | yes          | Workspace ID               |
| `relationships.workspace.data.type` | yes          | Allowed value: `workspace` |


**EXAMPLE:**
​
```
curl -X POST {{site.data.tenant.apiBaseUri}}/v2/flows/{FLOW_ID}/export-to-recipe \
  -u {EMAIL}:{APIKEY} \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' -d '
  {
    "data": {
      "type": "flow-export-to-recipe-config",
      "relationships": {
        "workspace": {
          "data": {
            "type": "workspace",
            "id": "{WORKSPACE_ID}"
          }
        }
      }
    }
  }'
```

## Managing recipes

The following actions with Recipes are available:

- [Retrieve a Recipe by ID](#retrieve-a-recipe-by-id)
- [Retrieve all Recipes](#retrieve-all-recipes)
- [Update a Recipe](#update-a-recipe)
- [Update a Recipe visibility](#update-a-recipe-visibility)
- [Activate a Recipe - create a Flow](#activate-a-recipe---create-a-flow)
- [Delete a Recipe](#delete-a-recipe)

### Retrieve a Recipe by ID

This resource allows you to retrieve a Recipe by its ID.

To retrieve a Recipe by its ID please use the following request, provided you are a member of the corresponding contract:

`GET {{site.data.tenant.apiBaseUri}}/v2/recipes/{RECIPE_ID}`


Below are the request URL parameters:


| **Parameter** | **Required** | **Description** |
| `RECIPE_ID`                              | yes          | Recipe identifier    |

**Example Request:**

```
curl {{site.data.tenant.apiBaseUri}}/v2/recipes/{RECIPE_ID} \
   -u {EMAIL}:{APIKEY}
```

### Retrieve all Recipes

This resource allows you to retrieve all Recipes.

To retrieve all Recipes please use the following request:


`GET {{site.data.tenant.apiBaseUri}}.io/v2/recipes/`


Below are the request QUERY parameters:

| **Parameter** | **Required** | **Description** |
| `workspace_id` | yes          | An Id of the Workspace    |
| `page[size]`    | no          | Amount of items per page. Default is `50`    |
| `page[number]`   | no          | Number of page you want to display. Default is `1` |

**Example Request:**

```
curl '{{site.data.tenant.apiBaseUri}}/v2/recipes?workspace_id={WORKSPACE_ID}&page[size]=2&page[number]=1' \
   -g -u {EMAIL}:{APIKEY}
```

## Update a Recipe

This resource allows you to update the given Recipe.

To update the given Recipe please use the following request, provided you have `workspaces.recipe.edit` permission:

`PATCH {{site.data.tenant.apiBaseUri}}/v2/recipes/{RECIPE_ID}`

Below are the request URL parameters:


| **Parameter** | **Required** | **Description** |
| `RECIPE_ID` | yes          | Recipe ID    |


Below are the request BODY parameters:


| **Parameter** | **Required** | **Description** |
|----------------------------------|--------------|---------------------------|
| `type`                             | yes   | Allowed value: `recipe` |
| `attributes.activation_config.variables` | no  | List of variables for steps|
| `attributes.activation_config.credentials`   | no   | List of Credentials for steps  |
| `attributes.marketplace_content.name` | yes    | Recipe name |
| `attributes.marketplace_content.description` | yes   | Recipe description  |
| `attributes.marketplace_content.short_description` | yes   | Recipe short description  |
| `attributes.marketplace_content.help_text` | no   | Recipe help text  |
| `attributes.flow_template.cron` | no   | CRON expression |
| `attributes.flow_template.graph` | yes   | Recipe graph representing component connections  |
| `relationships.workspace.data.id` | yes          | Workspace ID  |
| `relationships.workspace.data.type` | yes          | Allowed value: `workspace`  |


**Example Request:**


```
curl {{site.data.tenant.apiBaseUri}}/v2/recipes/{RECIPE_ID} \
  -X PATCH \
  -u {EMAIL}:{APIKEY} \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' -d '
   {
     "data": {
       "id": "{RECIPE_ID}",
       "type": "recipe",
       "attributes": {
         "activation_config": {
           "variables": [{
             "title": "Email to fill a \"CC\" field",
             "key": "emailCc"
           }]
         },
         "marketplace_content": {
           "title": "My Recipe",
           "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
           "short_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
           "help_text": "No setup required",
           "tags": []
         },
         "flow_template": {
           "cron": "*/3 * * * *",
           "graph": {
             "nodes": [
               {
                 "name": "New name",
                 "description": "New description",
                 "command": "{{site.data.tenant.name}}/petstore:getPetsByStatusWithGenerators@latest",
                 "id": "step_1"
               },
               {
                 "name": "New name",
                 "description": "New description",
                 "command": "{{site.data.tenant.name}}/email:send@latest",
                 "fields": {
                   "dontThrowErrorFlg": true
                 },
                 "id": "step_2"
               }
             ],
             "edges": [
               {
                 "config": {
                   "mapper_type": "jsonata",
                   "mapper": {
                     "to": "pets[0].name",
                     "cc": "$getFlowVariables().emailCc",
                     "subject": "pets[0].id",
                     "textBody": "pets[0].status"
                   },
                   "condition": null
                 },
                 "source": "step_1",
                 "target": "step_2"
               }
             ]
           }
         }
       }
     }
   }'
```


### Update a Recipe visibility

This resource allows you to update attribute visibility of the given Recipe.

To update a Recipe visibility please use the following request:

`PATCH {{site.data.tenant.apiBaseUri}}/v2/recipes/{RECIPE_ID}/visibility`

This request is authorized depend on specified visibility level for a user that has next permission:

 * to `tenant` if user has permission `tenant.recipe.edit_visibility_tenant`

 * to `global` if user has permission `global.recipe.edit_visibility_global`

 * to `contract` if user has permission `workspaces.recipe.edit`

 * to `workspace` if user has permission `workspaces.recipe.edit`

Below are the request URL parameters:


| **Parameter** | **Required** | **Description** |
| `RECIPE_ID` | yes          | Recipe ID    |


Below are the request BODY parameters:


| **Parameter** | **Required** | **Description** |
| `visibility` | yes          | Recipe sharing mode. Value must be one of `workspace`, `contract`, `tenant` or `global`    |

**Example Request:**

```
curl {{site.data.tenant.apiBaseUri}}/v2/recipes/{RECIPE_ID}/visibility \
  -X PATCH \
  -u {EMAIL}:{APIKEY} \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' -d '
   {
     "data": {
       "visibility": "contract"
     }
   }
```


### Activate a Recipe - create a flow

This resource creates a [flow](/getting-started/integration-flow) from a Recipe. If the Recipe contains a [component](/getting-started/integration-component), which requires a [credential](/getting-started/credential), it should be provided among the request payload.

To activate a Recipe please use the following request, provided you have `workspaces.recipe.edit` permission:

`POST {{site.data.tenant.apiBaseUri}}/v2/recipes/{RECIPE_ID}/activate`

Below are the request URL parameters:


| **Parameter** | **Required** | **Description** |
| `RECIPE_ID` | yes          | Recipe ID    |

Below are the request BODY parameters:


| **Parameter** | **Required** | **Description** |
|----------------------------------|--------------|---------------------------|
| `type` | yes   |A value must be `recipe-activation-config` |
| `attributes.name` | no  | Flow name|
| `attributes.credentials`   | no   | Specify component credentials if needed  |
| `attributes.variables` | yes    | Specify values for variables which were defined in Recipe for mapping |
| `attributes.fields` | no   | Specify fields for Recipe steps |
| `relationships.workspace.data.id` | yes          | Workspace ID  |
| `relationships.workspace.data.type` | yes          | Allowed value: `workspace`  |


**Example Request:**

```
curl {{site.data.tenant.apiBaseUri}}/v2/recipes/{RECIPE_ID}/activate \
   -X POST \
   -u {EMAIL}:{APIKEY} \
   -H 'Accept: application/json' \
   -H 'Content-Type: application/json' -d '
   {
     "data": {
       "type": "recipe-activation-config",
       "attributes": {
         "name": "Flow, created from Recipe",
         "description": "Recipe description",
         "credentials": {
           "step_1": "{CREDENTIAL_ID}"
         },
         "variables": {
           "TO_EMAIL": "goose@example.com",
           "NAME_IN_SUBJECT": "Neochen Jubata"
         },
         "fields": {
           "step_1": {
             "code": "console.log(message)"
           },
           "step_3":  {
             "email": "email@example.com"
           }
         }
       },
       "relationships": {
         "workspace": {
           "data": {
             "type": "workspace",
             "id": "{WORKSPACE_ID}"
           }
         }
       }
     }
   }'
```


### Delete a Recipe

This resource allows you to delete a Recipe.

To delete a Recipe please use the following request:


`DELETE {{site.data.tenant.apiBaseUri}}/v2/recipe/{RECIPE_ID}`


Below are the request URL parameters:


| **Parameter** | **Required** | **Description** |
| `RECIPE_ID` | yes          | Recipe ID    |


**Example Request:**


```
curl {{site.data.tenant.apiBaseUri}}/v2/recipes/{RECIPE_ID} \
   -X DELETE \
   -u {EMAIL}:{APIKEY}
```

## Coming Soon: Recipes UI

Right now we are developing some stylish UI for Recipes functionality. At the moment, we are testing the way to activate a Recipe via the UI:

1\. This page shows the selected Recipe and its details. A dedicated button allows the user to activate it, opening the Recipe activation wizard:

![Recipe Activate UI](/assets/img/integrator-guide/creating-recipes/activate.png)

2\. The wizard allows the user to enter all the data that is not contained in the Recipe itself. To start, we expand Global configuration **(1)**, fill in all the fields **(2)** and proceed with specific Component Credentials **(3)**. After each selection we press **Next** **(4)**:

![Recipe Activate Wizard](/assets/img/integrator-guide/creating-recipes/enter-data.png)

3\. After having entered all the data, the **Next** button becomes **Finish**. Click it to create the Flow:

![Recipe Activate Finish](/assets/img/integrator-guide/creating-recipes/finish.png)

4\. The Flow is ready:

![Recipe to Flow](/assets/img/integrator-guide/creating-recipes/flow-ready.png)
