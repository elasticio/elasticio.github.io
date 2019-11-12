---
title: SaleSphere component
layout: component
section: CRM components
description: A component to work with SaleSphere CRM by mVISE.
icon: salesphere.png
icontext: SaleSphere Component
category: SaleSphere Component
createdDate: 2018-06-14
updatedDate: 2019-05-29
---

## Description

This is a private connector designed to connect with the SaleSphere CRM by mVISE
on {{site.data.tenant.name}} platform, meaning that you can add SaleSphere
into any of your integration flows. It was developed specifically to run on the
{{site.data.tenant.name}} platform.

## Requirements

### Credentials

*   `username` - Your Username for Login.
*   `password` - Your Password.
*   `tenant` - Your tenant.
*   `serverUrl` - URL to SaleSphere (if not using the default).

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Upsert Catalog By External ID

Create a catalog given the external ID. Update an existing entry if there is
already a catalog with the provided external ID.

### Upsert Category By External ID

Create a category given the external ID. Update an existing entry if there is
already a category with the provided external ID.


### Upsert Product By External ID

Create a product given the external ID. Update an existing product if there is
already a product with the provided external ID.

### Upsert file By External ID

Create a file given the external ID. Update an existing product if there is
already a product with the provided external ID.

### Upsert hierarchy

Upsert collection with all dependencies.

### Delete Category Or Product

Given an external ID that refers to a category or product, delete that object.
