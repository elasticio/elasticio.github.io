---
title: Microsoft Dynamics CRM triggers
layout: component
description: Microsoft Dynamics CRM component triggers.
icon:  msdynamics-crm.png
icontext: Microsoft Dynamics CRM component
category: msdynamics
updatedDate: 2020-11-30
ComponentVersion: 1.2.2
---

## Deprecated component

>**Plese note:** the Microsoft Dynamics CRM component has been **deprecated** and is no longer supported. We highly recommend migrating to the newer [Microsoft Dynamics CRM v2](/components/msdynamics-crm-v2) component, which offers improved functionality and ongoing maintenance.

>Please update your codebase to utilize the [Microsoft Dynamics CRM v2](/components/msdynamics-crm-v2) as soon as possible to ensure compatibility with future updates and benefit from the latest features.

## Fetch new and updated objects

Get objects which have recently been modified or created.

All Objects Programmatically Detectable Covered. Time range options not supported, Standardized `isNew`, `createdOn` and `modifiedOn` not included in output.

## Query Accounts

Query Objects: Accounts

### Input fields description

**Custom data filter** - all available objects will be retrieved if no input provided. Not required field.

## Query Contacts

Query Objects: Contacts

No input fields available.

## Query Quotes

Query Objects: Quotes

### Input fields description

* **Object type to fetch** - a dropdown list where you should choose an entity set, which you want to lookup. E.g. `accounts`.
