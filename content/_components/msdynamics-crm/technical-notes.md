---
title: Microsoft Dynamics CRM Technical Notes
layout: component
description: Technical Notes for the Microsoft Dynamics CRM component
icon:  msdynamics-crm.png
icontext: Microsoft Dynamics CRM component
category: msdynamics
updatedDate: 2020-11-30
ComponentVersion: 1.2.2
redirect_from:
  - /components/msdynamics/completeness-matrix.html
  - /components/msdynamics/changelog.html
---

## Deprecated component

>**Plese note:** the Microsoft Dynamics CRM component has been **deprecated** and is no longer supported. We highly recommend migrating to the newer [Microsoft Dynamics CRM v2](/components/msdynamics-crm-v2) component, which offers improved functionality and ongoing maintenance.

>Please update your codebase to utilize the [Microsoft Dynamics CRM v2](/components/msdynamics-crm-v2) as soon as possible to ensure compatibility with future updates and benefit from the latest features.

## Changelog

### 1.2.2 (November 30, 2020)

* Upgrade to sailor 2.6.19
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit

### 1.2.1 (October 7, 2020)

* Bump dependencies
* Fix emit called without await
* Fix node to version 14
* Annual audit of the component code to check if it exposes a sensitive data in the logs

### 1.2.0 (June 18, 2020)

* Add support for `Bulk operations` (Create/Update/Delete)
* Add `Delete Object By ID` action
* Add `Query` action
* Add new implementation `Upsert` action with image attachment support
* Add new implementation `Lookup Object` action with image attachment support
* Add `Lookup Objects` action

### 1.1.0 (March 3, 2018)

* Initial release of OIH standardized component

## Completeness Matrix

Here is Microsoft Dynamics CRM Completeness Matrix:

![Microsoft Dynamics CRM Matrix](https://user-images.githubusercontent.com/5213324/84370377-d7d05480-abe0-11ea-9e65-c0cc4d69bc78.png)

> **Please Note:** This component has dynamic metadata, so all available entity types will be retrieved dynamically in each trigger/action.
