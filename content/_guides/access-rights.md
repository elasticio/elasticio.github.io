---
title: Recipe access rights
layout: article
section: Recipes Feature
description: This document provides information on recipe access rights.
order: 3
category: Recipes Feature
---

## Permissions

- `GLOBAL.RECIPE.GET` - allows seeing all recipes regardless of their [visibility](creating-recipes#visibility) level. E.g. if you have this permission in tenant #1, you will see all recipes in tenant #1 even if their visibility is Workspace.
- `GLOBAL.RECIPE_DEPLOYMENT.SYNC` - allows syncing Recipe Deployments depending on the scope of this permission (Global or Tenant).
- `GLOBAL.RECIPE_DEPLOYMENT.GET` - allows seeing all Recipe Deployments even if you’re not a member of the workspace to which they relate.
- `GLOBAL.RECIPE.EDIT_VISIBILITY_GLOBAL` - allows setting Recipe visibility level to Global.
- `TENANT.RECIPE.EDIT_VISIBILITY_TENANT` - allows setting Recipe visibility level to Tenant.
- `WORKSPACE.FLOW.EXPORT_TO_RECIPE` - allows creating a Recipe from the set of flows.
- `WORKSPACE.RECIPE.EDIT` - allows creating/editing/deleting a Recipe and setting its visibility to Contract or Workspace.
- `WORKSPACE.FLOW.EDIT` - allows syncing Recipe Deployments in the workspace.

## Roles

Here we explain the default list of roles and their permissions. You can add new roles and assign permissions to them using the API.

Tenant Admin

- `GLOBAL.RECIPE_DEPLOYMENT.SYNC`
- `GLOBAL.RECIPE_DEPLOYMENT.GET`
- `TENANT.RECIPE.EDIT_VISIBILITY_TENANT`
- `WORKSPACE.FLOW.EXPORT_TO_RECIPE`
- `WORKSPACE.RECIPE.EDIT`

Service Account

- `GLOBAL.RECIPE.GET`
- `GLOBAL.RECIPE.EDIT_VISIBILITY_GLOBAL`

Workspace Owner

- `WORKSPACE.FLOW.EDIT`

Workspace Admin

- `WORKSPACE.FLOW.EXPORT_TO_RECIPE`
- `WORKSPACE.RECIPE.EDIT`
- `WORKSPACE.FLOW.EDIT`

Workspace Integrator

- `WORKSPACE.FLOW.EXPORT_TO_RECIPE`
- `WORKSPACE.RECIPE.EDIT`
- `WORKSPACE.FLOW.EDIT`
