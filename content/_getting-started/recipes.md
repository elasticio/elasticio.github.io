---
title: Recipes Feature
layout: article
section: Platform Features
description: This document provides basic information on Recipes and some details of their usage.
order: 9
category: platform-features
since: 20191030
---

## Recipes Overview

The Recipes feature allows users to leverage integration Flow templates for easy sharing and reusability. This comprehensive documentation provides detailed information on creating, managing, and deploying Recipes. A Recipe serves as a blueprint for an integration Flow, enabling users to share popular flow patterns while abstracting away the underlying implementation details. Recipes are conveniently stored and can be accessed based on their [visibility settings](/guides/recipes-access-rights), which can be defined at the Workspace, Contract, Tenant, or Global level. Managing Recipe visibility requires appropriate permissions.

## Managing Recipes

### Creating Recipes

Recipes can be easily created from existing integration Flows. A Recipe encapsulates all the necessary information to recreate the Flow, excluding any non-shareable data. By activating a Recipe, users can effortlessly reproduce the desired Flow with their own configurations.

For more information, please refer to the article on [creating and managing Recipes](/guides/creating-recipes).

### Activating Recipes

Another convenient feature is the ability to use pre-existing recipes and activate them with ease. By leveraging these already created recipes, you can quickly set up flows based on their predefined configurations.

For more information, please refer to the article on [activating Recipes](/guides/creating-recipes#viewing-and-activating-recipes).

### Recipe Deployment

A Recipe Deployment establishes a link between an original Recipe and a set of Flows created during a single activation. It's important to note that the Flows within a Recipe Deployment are not editable. If modifications to the Flows are required, the Recipe Deployment must be unlinked.

For more information, please refer to the article on [Recipe deployment](/guides/recipe-deployment).

### Embedded Recipes

To accommodate scenarios where end users prefer not to directly manage the elastic.io platform, we offer the Embedded Recipes feature. It enables you to provide a direct link to a Recipe page for end users. This allows them to authenticate and activate Recipes without navigating the entire platform.

For more information, please refer to the article on [embedded Recipes](/guides/embedded-recipe).

### Embedded Recipe Deployment

For cases where end users prefer not to manage the platform directly, we provide the Embedded Recipe Deployment feature. You can generate a direct link to a Recipe Deployment, allowing end users to update credentials used in the deployment and restart Flows without extensive platform management.

For more information, please refer to the article on [embedded Recipe deployment](/guides/embedded-recipe-deployment).

## Use Cases

To enhance your understanding of the aforementioned features of Recipes, we recommend exploring two use cases: the "External Agencies" use case and the "Copying Flow" use case. These examples will provide further insight into the functionalities and capabilities of the Recipes feature.

1. [External Agencies Use Case](/guides/external-agencies-use-case): This use case highlights how Recipes can be leveraged by external agencies. It showcases the benefits of using Recipes to streamline integrations and ensure consistent flow patterns across different agencies. By referring to this example, you can gain a better understanding of how Recipes can be utilized in real-world scenarios involving external agencies.

2. [Copying flow through recipes Use Case](/guides/copying-flow-through-recipes): This use case focuses on the details of copying a Flow using Recipes. It demonstrates how Recipes serve as a blueprint for reproducing Flows with predefined configurations. By exploring this example, you will gain a comprehensive understanding of how to effectively utilize Recipes to replicate and share Flows across different environments or users.

By reviewing these use cases, you will acquire a deeper comprehension of the functionality and practical applications of the Recipes feature.
