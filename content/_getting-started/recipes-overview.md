---
title: Recipes Overview
layout: article
section: Advanced Concepts
order: 1
category: integration-flow
since: 20191030
---

This document provides basic information on Recipes and some details of their usage.

## Recipes

A Recipe is, basically, a template for an integration [Flow](integration-flow-overview). It allows users to share popular flow patterns without exposing any details. Recipes will be available in a sort of Recipe store, provided they are visible to the user.

To get a Recipe, a user creates an integration Flow, and then creates a Recipe from it. The Recipe will contain everything another user needs to recreate the same Flow, except for the [non-shareable data](#details). Having configured them, a user can activate the Recipe and recreate a Flow.

Visibility level is set by the Recipe author, and can be **Workspace, Contract, Tenant or Global**, values that define the space where a Recipe is shared. Setting a certain visibility level requires corresponding permissions.

## Details

There may be a few configurables that you'll need to deal with manually after activating a Recipe:

- **[Credentials](credential)**. Obviously, Credentials are Workspace-bound, so they will not work in another Workspace. The user will need his own Credentials to activate a Recipe.

- **Fields**.  

- **Flow Variables**. Flow variables are special variables used in Flow metadata to hardcode certain data. They will need to be configured, if used in a Recipe.
