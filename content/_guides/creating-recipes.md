---
title: Creating and Using Recipes
layout: article
section: Recipes
description: This document provides information on how to create a recipe, and how to use them.
order: 1
category: recipes
redirect_from:
  - /guides/creating-recipes.html#coming-soon-recipes-ui
---

This document provides information on how to [create Recipes from UI](#creating-recipes-from-ui), [create recipes using API](#creating-recipes-using-api) and how to [manage Recipes using API](#managing-recipes-using-api).

[Recipes](/getting-started/recipes) allow users to share [Flow](/getting-started/integration-flow) templates with others without disclosing their non-shareable data ([Credentials](/getting-started/credential), Fields, Variables).
​
## Creating And Activating Recipes from UI

Right now we are developing some stylish UI for Recipes functionality. At the moment, we are testing the way to create a Recipe via the UI:

![Export Recipe](/assets/img/integrator-guide/creating-recipes/export-recipe.png)

  **1.** This page shows the selected Recipe and its details. A dedicated button allows the user to activate it, opening the Recipe activation wizard:

![Activate Recipe](/assets/img/integrator-guide/creating-recipes/activate-recipe.png)

  **2.** First you have to specify Contract and Workspace to which the Recipe will be activated. The recipe has an attribute visibility, which indicates how the recipe is shared by other clients. The default recipe visibility is `workspace`:

![Contract and Workspace](/assets/img/integrator-guide/creating-recipes/specify.png)

You can change the visibility using the API function [Update a recipe visibility](#update-a-recipe-visibility):

```
curl {{site.data.tenant.apiBaseUri}}.io/v2/recipes/{RECIPE_ID}/visibility \
  -X PATCH \
  -u {EMAIL}:{APIKEY} \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' -d '
   {
     "data": {
       "visibility": "contract"
     }
   }'
```

> The **"visibility"** field can take the following values: **"workspace"**, **"contract"** or **"tenant"**.

*   **Workspace** level means that Recipe available to be activated into current Workspace.
*   **Contract** level means that Recipe available to be activated into any Workspace of the current Contract.
*   **Tenant** level means that Recipe available to be activated into any Contract of current Tenant.

> **Please Note**: you can set visibility level of Recipe according to the used Components visibility in Recipe. **You can't downgrade Recipe visibility level.**


After changing the visibility to **contract**, the recipe setup will look like this:

![Contract visibility](/assets/img/integrator-guide/creating-recipes/contract-visibility.png)

And after changing the visibility to **tenant**, the recipe setup will look like this:

![Tenant visibility](/assets/img/integrator-guide/creating-recipes/tenant-visibility.png)

  **3.** Here you can setup your credentials for every step. You can verify(**1**), edit(**2**) or delete(**3**) credentials and choose credentials you need(**4**):

![Setup recipe credential](/assets/img/integrator-guide/creating-recipes/recipe-cred-setup.png)

You can even create a new credential using the plus sign if you need.

  **4.** After that you have to click to "Finish" and new identical flow with the same name will be created:

![New flow](/assets/img/integrator-guide/creating-recipes/new-flow.png)

## Recipe with Topics

When you want to activate a Recipe based on the Flow with Topics you have to follow the steps described in [Creating And Activating Recipes from UI](#creating-and-activating-recipes-from-ui). However, there is one important difference from a recipe with topics from a recipe without topics - a recipe using topics can only be activated within one workspace. You can see this limitation in the example flow based on [PubSub component](/components/pub-sub/index):

![Recipe with Topic](/assets/img/integrator-guide/creating-recipes/recipe-topic.png)

## Creating Recipes using API

There are two ways to create a Recipe:
​
*   [Creating Recipes from scratch](#creating-recipes-from-scratch)
*   [Creating Recipes from an existing flow](#creating-recipes-from-existing-flow)


### Creating Recipes from scratch

You can create a Recipe from scratch provided you have `workspaces.recipe.edit` permission:

```
POST /v2/recipes/
```

To see parameters and examples please visit [API-Documentation]({{site.data.tenant.apiDocsUri}}/v2#/recipes/post_recipes).

### Creating Recipes from an existing flow

To create a Recipe from a chosen Flow, use the following request, provided you have `workspaces.recipe.edit` permission:
​
```
POST /v2/flows/{FLOW_ID}/export-to-recipe
```

To see parameters and examples please visit [API-Documentation]({{site.data.tenant.apiDocsUri}}/v2#/recipes/post_flows__flow_id__export_to_recipe).

## Managing recipes using API

The following actions with Recipes are available:

*   [Retrieve a Recipe by ID](#retrieve-a-recipe-by-id)
*   [Retrieve all Recipes](#retrieve-all-recipes)
*   [Update a Recipe](#update-a-recipe)
*   [Update a Recipe visibility](#update-a-recipe-visibility)
*   [Activate a Recipe - create a Flow](#activate-a-recipe---create-a-flow)
*   [Delete a Recipe](#delete-a-recipe)

### Retrieve a Recipe by ID

This resource allows you to retrieve a Recipe by its ID.

To retrieve a Recipe by its ID please use the following request, provided you are a member of the corresponding contract:

```
GET /v2/recipes/{RECIPE_ID}
```

To see parameters and examples please visit [API-Documentation]({{site.data.tenant.apiDocsUri}}/v2#/recipes/get_recipes__recipe_id_).

### Retrieve all Recipes

This resource allows you to retrieve all Recipes.

To retrieve all Recipes please use the following request:

```
GET /v2/recipes/
```

To see parameters and examples please visit [API-Documentation]({{site.data.tenant.apiDocsUri}}/v2#/recipes/get_recipes).

### Update a Recipe

This resource allows you to update the given Recipe.

To update the given Recipe please use the following request, provided you have `workspaces.recipe.edit` permission:

```
PATCH /v2/recipes/{RECIPE_ID}
```

To see parameters and examples please visit [API-Documentation]({{site.data.tenant.apiDocsUri}}/v2#/recipes/patch_recipes__recipe_id_).

### Update a Recipe visibility

This resource allows you to update attribute visibility of the given Recipe.

To update a Recipe visibility please use the following request:

```
PATCH /v2/recipes/{RECIPE_ID}/visibility
```

This request is authorized depend on specified visibility level for a user that has next permission:

*   to `tenant` if user has permission `tenant.recipe.edit_visibility_tenant`
*   to `contract` if user has permission `workspaces.recipe.edit`
*   to `workspace` if user has permission `workspaces.recipe.edit`

To see parameters and examples please visit [API-Documentation]({{site.data.tenant.apiDocsUri}}/v2#/recipes/patch_recipes__recipe_id__visibility).

### Activate a Recipe - create a flow

This resource creates a [flow](/getting-started/integration-flow) from a Recipe. If the Recipe contains a [component](/getting-started/integration-component), which requires a [credential](/getting-started/credential), it should be provided among the request payload.

To activate a Recipe please use the following request, provided you have `workspaces.recipe.edit` permission:

```
POST /v2/recipes/{RECIPE_ID}/activate
```

To see parameters and examples please visit [API-Documentation]({{site.data.tenant.apiDocsUri}}/v2#/recipes/post_recipes__recipe_id__activate).

### Delete a Recipe

This resource allows you to delete a Recipe. To delete a Recipe please use the
following request:

```
DELETE /v2/recipe/{RECIPE_ID}
```

To see parameters and examples please visit [API-Documentation]({{site.data.tenant.apiDocsUri}}/v2#/recipes/delete_recipes__recipe_id_).
