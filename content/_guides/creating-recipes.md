---
title: Creating recipes
layout: article
section: Recipes
description: This document provides information on how to create a recipe.
order: 1
category: recipes
---

## Introduction

[Recipes](/getting-started/recipes) allow users to share [Flow](/getting-started/integration-flow) templates with others without disclosing their non-shareable data ([Credentials](/getting-started/credential), Fields, Variables).
There are two ways to create a Recipe:
​
- [From an existing integration Flow](#creating-recipes-from-existing-flows)
​
- [From scratch](#creating-recipes-from-scratch)
​

## Creating Recipes from Existing Flows


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

## Creating Recipes from Scratch

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
