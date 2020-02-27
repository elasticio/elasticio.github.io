---
title: Managing Recipes
layout: article
section: Recipes
description: This document provides information on how manage and use recipes.
order: 2
category: recipes
---

## Introduction

In this document we will explain how to use, manage [recipes](/getting-started/recipes) and how to create a [flow](/getting-started/integration-flow) from a recipe.

The following actions with recipes are available:

  * [Retrieve a recipe by ID](#retrieve-a-recipe-by-id)
  * [Retrieve all recipes](#retrieve-all-recipes)
  * [Update a recipe](#update-a-recipe)
  * [Update a recipe visibility](#update-a-recipe-visibility)
  * [Activate a recipe - create a flow](#activate-a-recipe-create-a-flow)
  * [Delete a recipe](#delete-a-recipe)

To learn how to create a recipe please visit [Creating recipes](creating-recipes) page.


## Retrieve a recipe by ID

This resource allows you to retrieve a recipe by its ID.

To retrieve a recipe by its ID please use the following request, provided you are a member of the corresponding contract:

`GET {{site.data.tenant.apiBaseUri}}/v2/recipes/{RECIPE_ID}`


Below are the request URL parameters:


| **Parameter** | **Required** | **Description** |
| `RECIPE_ID`                              | yes          | Recipe identifier    |

### Example Request:

```
curl {{site.data.tenant.apiBaseUri}}/v2/recipes/{RECIPE_ID} \
   -u {EMAIL}:{APIKEY}
```

## Retrieve all recipes

This resource allows you to retrieve all recipes.

To retrieve all recipes please use the following request:


`GET {{site.data.tenant.apiBaseUri}}.io/v2/recipes/`


Below are the request QUERY parameters:

| **Parameter** | **Required** | **Description** |
| `workspace_id` | yes          | An Id of the Workspace    |
| `page[size]`    | no          | Amount of items per page. Default is `50`    |
| `page[number]`   | no          | Number of page you want to display. Default is `1` |

### Example Request:

```
curl '{{site.data.tenant.apiBaseUri}}/v2/recipes?workspace_id={WORKSPACE_ID}&page[size]=2&page[number]=1' \
   -g -u {EMAIL}:{APIKEY}
```

## Update a recipe

This resource allows you to update the given recipe.

To update the given recipe please use the following request, provided you have `workspaces.recipe.edit` permission:

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


### Example Request:


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


## Update a recipe visibility

This resource allows you to update attribute visibility of the given recipe.

To update a recipe visibility please use the following request:

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

### Example Request:

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


## Activate a recipe - create a flow

This resource creates a [flow](/getting-started/integration-flow) from a recipe. If the recipe contains a [component](/getting-started/integration-component), which requires a [credential](/getting-started/credential), it should be provided among the request payload.

To activate a recipe please use the following request, provided you have `workspaces.recipe.edit` permission:

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


### Example Request:

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


## Delete a recipe

This resource allows you to delete a recipe.

To delete a recipe please use the following request:


`DELETE {{site.data.tenant.apiBaseUri}}/v2/recipe/{RECIPE_ID}`


Below are the request URL parameters:


| **Parameter** | **Required** | **Description** |
| `RECIPE_ID` | yes          | Recipe ID    |


### Example Request:


```
curl {{site.data.tenant.apiBaseUri}}/v2/recipes/{RECIPE_ID} \
   -X DELETE \
   -u {EMAIL}:{APIKEY}
```
