---
title: Embedded Recipe Deployment
description: This document provides basic information on embedded recipe deployment.
layout: article
order: 2
section: Marketplace
category: Marketplace
---

There is a way to provide a direct link to a Recipe Deployment for an end user. It’s intended for cases when the end user doesn’t want to manage the elastic.io platform. Eio customer can prepare a platform and compile a link for an end user so he will authenticate and be able to update Credentials used in the Deployment and restart Flows using them.

## Setup

1. User has activated a Recipe. (e.g. using [Embedded recipe](embedded-recipe) page)
2. [Create a one-time token for the user]({{site.data.tenant.apiDocsUri}}/v2#/users/post_users__user_id__one_time_token) using API.
3. Generate URL and give it to the user.

## Generate URL

> Here you can see a URL Format:
```
https://[platform_domain]/embedded-recipe?recipeDeploymentId=[recipeDeploymentId]&oneTimeToken=[oneTimeToken]
```

Options:

- `platform_domain` (required). Your elastic.io platform domain.
- `recipeDeploymentId` (required). Recipe Deployment ID which you want the user to update.
- `oneTimeToken` (required). One-time token that was generated for the user. Used to authenticate a user in the platform.

## Embed

``` html
<!DOCTYPE html>
<html lang="en">
<head>    
  <meta charset="UTF-8">
  <title>Embedded Credentials Demo</title>
  <style>html, body, iframe { height: 85%; width: 90%; margin: 0;}</style>
</head>
<body>
  <iframe src="https://[platform_domain]/embedded-recipe?recipeDeploymentId=[recipeDeploymentId]&oneTimeToken=[oneTimeToken]" />
</body>
</html>
```

## Successful update

``` json
{
    "action": "eio:embedded-recipe:deployment-update-success",
    "data": {
        "recipeDeploymentId": "RECIPE_DEPLOYMENT_ID"
    }
}
```

When a user successfully updates Credentials and restarts the Flows, the platform sends a message with a Recipe Deployment ID to the parent window.
