---
title: Creating and Using Recipes
layout: article
section: Recipes
description: This document provides information on how to create a recipe, and how to use them.
order: 1
category: recipes
redirect_from:
  - /guides/creating-recipes.html#creating-recipes-from-existing-flows
---

This document provides information on how to [create Recipes from UI](#creating-recipes-from-ui), [create recipes using API](#creating-recipes-using-api) and how to [manage Recipes using API](#managing-recipes-using-api).

[Recipes](/getting-started/recipes) allow users to share [Flow](/getting-started/integration-flow) templates with others without disclosing their non-shareable data ([Credentials](/getting-started/credential), Fields, Variables).

​
## Creating Recipes from UI

Right now we are developing some stylish UI for Recipes functionality. At the moment, we are testing the way to create a Recipe via the UI:

![Export Recipe](/assets/img/integrator-guide/creating-recipes/export-recipe.png)

  **1.** This page shows the selected Recipe and its details. A dedicated button allows the user to activate it, opening the Recipe activation wizard:

![Activate Recipe](/assets/img/integrator-guide/creating-recipes/activate-recipe.png)

  **2.** Here you can setup your credentials for every step. You can verify(**1**), edit(**2**) or delete(**3**) credentials and choose credentials you need(**4**).:

![Setup recipe](/assets/img/integrator-guide/creating-recipes/recipe-setup.png)

  **3.**After that you have to click to "Finish" and new identical flow with the same name will be created:

![New flow](/assets/img/integrator-guide/creating-recipes/new-flow.png)

## Creating Recipes using API

There are two ways to create a Recipe:
​
- [From an existing integration Flow](#creating-recipes-from-flows)
​
- [From scratch](#creating-recipes-from-scratch)

### Creating Recipes from Flows

To create a Recipe from a chosen Flow, use the following request, provided you have `workspaces.recipe.edit` permission:
​

`POST /v2/recipes/`

To see parameters and examples please visite [API-Documentation]({{site.data.tenant.apiBaseUri}}/docs/v2/#create-a-recipe-from-existing-flow).

### Creating Recipes from Scratch

To create a Recipe from a chosen Flow, use the following request, provided you have `workspaces.recipe.edit` permission:
​
`POST {{site.data.tenant.apiBaseUri}}/v2/flows/{FLOW_ID}/export-to-recipe`​

To see parameters and examples please visite [API-Documentation]({{site.data.tenant.apiBaseUri}}/docs/v2/#create-a-recipe).

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

To see parameters and examples please visite [API-Documentation]({{site.data.tenant.apiBaseUri}}/docs/v2/#retrieve-a-recipe-by-id).

### Retrieve all Recipes

This resource allows you to retrieve all Recipes.

To retrieve all Recipes please use the following request:


`GET {{site.data.tenant.apiBaseUri}}.io/v2/recipes/`

To see parameters and examples please visite [API-Documentation]({{site.data.tenant.apiBaseUri}}/docs/v2/#retrieve-all-recipes).

### Update a Recipe

This resource allows you to update the given Recipe.

To update the given Recipe please use the following request, provided you have `workspaces.recipe.edit` permission:

`PATCH {{site.data.tenant.apiBaseUri}}/v2/recipes/{RECIPE_ID}`

To see parameters and examples please visite [API-Documentation]({{site.data.tenant.apiBaseUri}}/docs/v2/#update-a-recipe).

### Update a Recipe visibility

This resource allows you to update attribute visibility of the given Recipe.

To update a Recipe visibility please use the following request:

`PATCH {{site.data.tenant.apiBaseUri}}/v2/recipes/{RECIPE_ID}/visibility`

This request is authorized depend on specified visibility level for a user that has next permission:

 * to `tenant` if user has permission `tenant.recipe.edit_visibility_tenant`

 * to `global` if user has permission `global.recipe.edit_visibility_global`

 * to `contract` if user has permission `workspaces.recipe.edit`

 * to `workspace` if user has permission `workspaces.recipe.edit`

To see parameters and examples please visite [API-Documentation]({{site.data.tenant.apiBaseUri}}/docs/v2/#update-a-recipe-visibility).

### Activate a Recipe - create a flow

This resource creates a [flow](/getting-started/integration-flow) from a Recipe. If the Recipe contains a [component](/getting-started/integration-component), which requires a [credential](/getting-started/credential), it should be provided among the request payload.

To activate a Recipe please use the following request, provided you have `workspaces.recipe.edit` permission:

`POST {{site.data.tenant.apiBaseUri}}/v2/recipes/{RECIPE_ID}/activate`

To see parameters and examples please visite [API-Documentation]({{site.data.tenant.apiBaseUri}}/docs/v2/#activate-a-recipe).

### Delete a Recipe

This resource allows you to delete a Recipe.

To delete a Recipe please use the following request:


`DELETE {{site.data.tenant.apiBaseUri}}/v2/recipe/{RECIPE_ID}`

To see parameters and examples please visite [API-Documentation]({{site.data.tenant.apiBaseUri}}/docs/v2/#delete-a-recipe).
