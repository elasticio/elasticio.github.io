---
title: Recipe Deployment
layout: article
section: Recipes Feature
description: This document provides information on recipe deployment.
order: 2
category: Recipes Feature
---

The **Recipe Deployment** is an entity that connects an original Recipe with a set of flows created during a single activation.

All flows that are part of the Recipe Deployment are not editable. The only way to edit the flows is to [unlink](#unlinking) the Recipe Deployment.

## Synchronization

Synchronization is the process of updating the Recipe Deployment to the latest version of the Recipe. You will see a synchronization icon near the Recipe Deployment name if it's outdated.

The synchronization process will:

1. Stop all currently running flows.
    1. **All the data in the queues will be lost.**
2. Delete the old set of flows.
    1. **All snapshots and execution history will be lost.**
3. Create a new set of flows.
4. Start the new set of flows.

## Unlinking

On the Recipe Deployment unlinking, you will be asked for 2 options:

{% include img.html max-width="100%" url="/assets/img/integrator-guide/recipe-deployment/unlinking.png" title="Unlinking" %}

1. Just unlink the Recipe Deployment - unlink its flows from the Recipe
2. Same as in the first option, however, in addition, delete the flow
