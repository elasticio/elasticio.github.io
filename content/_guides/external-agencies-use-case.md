---
title: External agencies use case
layout: article
section: Recipes Feature
description: This document provides information on External agencies use case.
order: 6
category: Recipes Feature
---

In this article, we will introduce you to one of the use cases using recipes, which will help you better understand the functionality of the recipes feature.

## Parties

*  **SaaS Vendor** - The platform installation owner.

*  **Third-party agency** - A contract-level user on the platform that builds Recipes for future sell.

*  **End-user** - A SaaS Marketplace user who wants to start integrations quickly.

## Actions

### Recipe Creation

The third-party agency builds a set of flows that works as one. This set represents one integration. When the set is well-tested, the agency uses the [Export to Recipe](creating-recipes#create-recipe---flows-export) feature to create a Recipe with visibility Workspace or Contract. At this point, it will be visible only inside the contract. They can test activation.

### Recipe “Approval”

When the third-party is ready to sell their Recipe, they send a message to the SaaS vendor via their internal communication mechanism. The SaaS vendor user is invited into the agency workspace to test the Recipe.

The SaaS vendor checks the Recipe. On approval, it [changes its visibility](creating-recipes#visibility) via API to Tenant or Global using a [role](/guides/managing-user-roles-in-a-tenant#roles-and-permissions) with required permissions.

### Recipe Activation

All roles can do the Recipe activation. The agency activates it on the Recipe page using Activate button. The SaaS vendor can activate the Recipe for testing on the Recipe page or from its marketplace. The end-user activates the Recipe on the same pages as the SaaS vendor.

The marketplace is a separate platform created by the SaaS vendor. It lists the Recipes. Each Recipe page inside the marketplace [embeds the widget](embedded-recipe) to activate the Recipe.

### Recipe Update

As the agency created the Recipe, it can update it. The update flow is nearly the same as create one. It uses the [Export to Recipe](creating-recipes#create-recipe---flows-export) feature. But inside the modal box, you choose to update the existing recipe.

The update doesn’t require the “approval” from the SaaS vendor.  

### Recipe Syncing

When a new version of the Recipe appears, already existing Recipe Deployments can be [synced](recipe-deployment#synchronization) to match the latest version. The synchronization is done from the UI by the member of the workspace where the Recipe Deployment is placed or anyone with a [special permission](recipes-access-rights#permissions). **The synchronization process may have some destructive effects**. Read the [explanation](recipe-deployment#synchronization) carefully.
