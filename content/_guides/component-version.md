---
title: Component version
description: This document explains component versions, build history and how to fix a component version for a particular flow step.
layout: article
section: Building integration flows
category: building integration flows
order: 10
redirect_from:
  - /guides/fix-a-component-version-for-a-particular-flow.html
---

## Build History

During the component development, every new deployment or code commit is given a
distinct version which every developer can examine in the **Build history** table
presented on each repository page.

{% include img.html max-width="80%" url="/assets/img/integrator-guide/component-version/build-history.png" title="Build history" %}

The screenshot shows table of deployments when you navigate to component repository
page from the **Development** > **Developer Teams** > **Team** > **Repository**.
The columns in this table has the following information for each deployment:
*   **Date** - the date when the component code was deployed to the platform.
*   **Version** - the version of component. Previously sequential number assigned after each deployment. Now the actual semantic version of each deployment (from [21.19](/releases/21.19)) taken from the `version` parameter of the `component.json` configuration. The platform will reject an attempt to deploy a component code with the same version twice.
*   **Commit** - the short-hash of the component code version.
*   **Status** - the deployment status. The check-mark means a success.
*   **State** - showing the *Current* version - the `latest` version.
*   **Log** - Shows the component deployment log. At any given time we show the recent build log.
*   **Bin Icon** - Click to delete the version from system. Shown to contract Admins and above. System will not allow you to delete a version when it's used in an integration flow step.


## Step configuration

When you select a component for each integration step, the platform will automatically
select the latest available version of component for your step and skip over the configuration.
You can open the **Versions** section again:

{% include img.html max-width="80%" url="/assets/img/integrator-guide/component-version/versions-step-configuration-default.png" title="Latest version selected by default" %}

> **When you save the integration flow step, the platform will fix component version**
> shown in this configuration section. This approach ensures that the integration flow
> step behaves the same way when you tested during the design.

If you would rather prefer the platform to use the `latest` component version each
time then select the **Latest** label as shown in the screenshot.

{% include img.html max-width="80%" url="/assets/img/integrator-guide/component-version/versions-step-configuration-latest.png" title="Latest label selected" %}

> **Please note**, we ensure the backwards compatibility of every component release.
> However, some changes might break your integration setup or produce unwanted
> results if you set the component version `latest`. We recommend using the latest
> current version instead.

## Available versions

Starting from the [platform release 21.41](/releases/21.41#reduce-list-of-component-version),
we limit the selectable component versions available during the integration flow
step design to two. This means you can select latest 2 deployments.

If you have an integration flow where you use earlier version you would still see
the version during the step configuration.

{% include img.html max-width="80%" url="/assets/img/integrator-guide/component-version/versions-step-configuration-old.png" title="Old version selected" %}

When you change the version to newest one, the old version will no longer show.

> We recommend using newer version of components when possible to ensure the
> message processing stavbility. We fix and improve our components so they can
> serve you well.
