---
title: Embedded Recipe
description: This document provides basic information on embedded recipe.
layout: article
order: 1
section: Marketplace
category: Marketplace
---

There is a way to provide a direct link to a Recipe page for an end user. It’s intended for cases when the end user doesn’t want to manage the elastic.io platform. Eio customer can prepare a platform and compile a link for an end user so he will authenticate and be able to activate a recipe.

## Setup

1. [Create a user](({{site.data.tenant.apiDocsUri}}/v2#/users/post_users)) using API.
2. [Add user as a contract member](({{site.data.tenant.apiDocsUri}}/v2#/contracts/post_contracts__contract_id__members)) using API.
3. [Add user as a workspace member](({{site.data.tenant.apiDocsUri}}/v2#/workspaces/post_workspaces__workspace_id__members)) using API.
4. Revise user permissions to make him access only things required to activate a recipe.
5. [Create a one-time token for the user](({{site.data.tenant.apiDocsUri}}/v2#/users/post_users__user_id__one_time_token)) using API.
6. Generate URL and give it to the user.

## Generate URL

> Here you can see a URL Format:
```
https://[platform_domain]/embedded-recipe?recipeId=[recipeId]&oneTimeToken=[oneTimeToken]&contractId=[contractId]
```

Options:

- `platform_domain` (required). Your elastic.io platform domain.
- `recipeId` (required). Recipe ID which you want the user to activate.
- `oneTimeToken` (required). One-time token that was generated for the user. Used to authenticate  a user in the platform.
- `contractId` (optional). Contract ID in which the user will activate the recipe. If not provided, the first found contract for the user is used.

## Embed

```html
<!DOCTYPE html>
<html lang="en">
<head>    
  <meta charset="UTF-8">
  <title>Embedded Credentials Demo</title>
  <style>html, body, iframe { height: 85%; width: 90%; margin: 0;}</style>
</head>
<body>
  <iframe src="https://[platform_domain]/embedded-recipe?recipeId=[recipeId]&oneTimeToken=[oneTimeToken]&contractId=[contractId]" />
</body>
</html>
```

## Successful activation

When a user successfully activates a recipe, the platform sends a message with a Recipe Deployment ID to the parent window.

```json
{
    "action": "eio:embedded-recipe:activate-success",
    "data": {
        "recipeDeploymentId": "RECIPE_DEPLOYMENT_ID"
    }
}
```

# Reference:
