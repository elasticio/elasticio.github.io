---
title: Update all components in flow
description: This document describes a feature to update the components in all steps of your integration flow in one go.
layout: article
section: Troubleshooting
order: 7
category: troubleshooting
---

### Update components in all flow steps

A feature to help update the components in all steps of your
integration flow in one go. A new button **Update All Components** will appear
in the flow designer if your flow has steps which run on older version of the
component. This can help you solve many of the problems in your flow that might be related to older versions of the component.

{% include img.html max-width="80%" url="/assets/img/RN/2137/rn2137-update-all-components.png" title="Update All Components Button." %}

The following rules apply with this new feature:

*   The **Update All Components** button will appear in case when the flow draft has one or more steps using an older version of the component.
*   By clicking on this button the platform will upgrade all steps to use the latest available component version - not the `latest` alias.
*   If your flow has a step running an outdated component version, by clicking on the **Update All Components** button the system will create a **new draft** of this flow with an updated latest component version - not set the `latest` alias. You can review your flow and publish it essentially upgrading all steps.
*  Components with two versions (СSV, Rest-API and Salesforce) cannot be upgraded from the first to the second version. These versions are considered by the platform as different components.
