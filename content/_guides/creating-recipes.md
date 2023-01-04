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
## Creating and Activating Recipes from UI

### Creating the recipe

You can create a recipe from a flow simply by clicking on the corresponding button, as shown in the screenshot:


{% include img.html max-width="100%" url="/assets/img/integrator-guide/creating-recipes/export-recipe.png" title="Export Recipe" %}

After that, you will automatically be directed to the created recipe, where you can activate it. This page shows the selected Recipe and its details.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/creating-recipes/activate-recipe-1.png" title="Activate Recipe 1" %}

You can also find the recipe you are interested in by going to the recipes section. Next, you can activate the recipe you want.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/creating-recipes/activate-recipe-2.png" title="Activate Recipe 2" %}

We display the number of deployments of these recipes on each Recipe Card. Each deployment can include more than one integration flows and these we display when you click **Show Deployments** on the Recipe Card.

You can deploy running integration flows from any listed Recipe by hitting the **Activate** button.

{% include img.html max-width="60%" url="/assets/img/integrator-guide/creating-recipes/recipe-card.png" title="Recipe Card" %}

> **Please note:** you can delete the recipe deployment by selecting the cog menu on the recipe card. However, you can only delete recipe deployments with `workspace` visibility and only when you have `Admin` role in the workspace. You can not delete public recipes (those with `Tenant` or `Global` visibility).

If you have used this recipe before to create a flow, the **Deployments** page will
list them all.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/creating-recipes/recipes-deployments.png" title="Recipes Deployments" %}

From here you can:
*   Open the flows if you have the required workspace access.
*   **Upgrade** the flow using a new recipe version if available.
*   **Delete** the recipe deployment - severing the connection between flow and recipe.
*   **Delete With Flows** - deleting the recipe deployment with the associated flows (one recipe deployment can contain more than one flow).

After clicking on the **"Activate"** button, you will be able to set up the recipe.

### Recipe Setup

**1.** First you have to specify Contract and Workspace to which the Recipe will be activated. The recipe has an attribute visibility, which indicates how the recipe is shared by other clients. The default recipe visibility is `workspace`:

{% include img.html max-width="100%" url="/assets/img/integrator-guide/creating-recipes/specify.png" title="Contract and Workspace" %}

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

{% include img.html max-width="100%" url="/assets/img/integrator-guide/creating-recipes/contract-visibility.png" title="Contract visibility" %}

And after changing the visibility to **tenant**, the recipe setup will look like this:

{% include img.html max-width="100%" url="/assets/img/integrator-guide/creating-recipes/tenant-visibility.png" title="Tenant visibility" %}

**2.** Here you can setup your credentials for every step. You can verify(**1**), edit(**2**) or delete(**3**) credentials and choose credentials you need:

{% include img.html max-width="100%" url="/assets/img/integrator-guide/creating-recipes/recipe-cred-setup.png" title="Setup recipe credential" %}

You can even create a new credential using the plus sign if you need.

**3.** After completing the recipe setup a new identical flow with the same name will be created:

{% include img.html max-width="100%" url="/assets/img/integrator-guide/creating-recipes/new-flow.png" title="New flow" %}

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
