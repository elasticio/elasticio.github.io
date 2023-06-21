---
title: Copying flow through recipes feature
layout: article
section: Recipes Feature
description: The article explains how to utilize the recipes feature in elastic.io to create flow templates, configure access levels, and change the visibility of recipes.
order: 1
category: Recipes Feature
---

## Copying Flows Using the Recipes Feature

The Recipes feature not only allows you to create flow templates from existing flows but also provides the flexibility to configure access at different levels.

{% include img.html max-width="40%" url="/assets/img/integrator-guide/creating-recipes/recipes-parameter.png" title="Recipes parameter" %}

On the recipe page, you can view the parameters of the recipe, as shown in the screenshot above. These fields include the author, visibility, created date, and last update date. The visibility parameter determines the level of access to the recipe, and it can be set to one of the following options:

* Workspace (Accessible within the workspace)
* Contract (Accessible within the contract)
* Tenant (Accessible across the entire tenant)
* Global (Accessible everywhere in the environment, including other tenants)

To modify these parameters, you need the appropriate permissions as listed below:

* `workspaces.recipe.edit`
* `workspaces.recipe.edit`
* `tenant.recipe.edit_visibility_tenant`
* `global.recipe.edit_visibility_global`

In the provided screenshot, the visibility parameter is set to Workspace, indicating that the recipe is only accessible within that specific workspace.

### Changing the Visibility Level

To change the visibility level to the desired setting, you must have the necessary permissions mentioned earlier.

You can modify the visibility level using a PATCH request through the API. Please refer to the recipes-visibility endpoint [documentation]({{site.data.tenant.apiDocsUri}}/v2#/recipes/patch_recipes__recipe_id__visibility) for detailed instructions.

Additionally, you will need the recipe ID, which can be obtained directly from the URL when you open a specific recipe page.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/creating-recipes/recipes-id.png" title="Recipes ID" %}

{% include img.html max-width="100%" url="/assets/img/integrator-guide/creating-recipes/recipes-url.png" title="Recipes URL" %}

Use the following JSON body in the PATCH request to change the visibility level:

```json
{
  "data": {
    "visibility": "contract"
  }
}
```

Executing a PATCH request with the above JSON body will update the recipe's visibility level accordingly.

{% include img.html max-width="40%" url="/assets/img/integrator-guide/creating-recipes/updated-visibility.png" title="Updated Visibility" %}

After performing this action, the recipe will appear on the recipe page in other workspaces (if the visibility is set to contract), other contracts (in the case of tenant or global). You can then navigate to another workspace where you plan to deploy the recipe and activate it.
