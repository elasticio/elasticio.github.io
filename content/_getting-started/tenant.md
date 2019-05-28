---
title: What is a tenant?
layout: article
section: Advanced Concepts
since: 20190110
---

The {{site.data.tenant.name}} platform is based on a multi-tenant architecture in which multiple virtual instances of the same integration platform are operated in a shared environment. A tenant represents an isolated and customizable instance of the same platform which is separated logically from all the other tenants, but not physically. The logical separation is accomplished by:

* unique domains to access the platform's capabilities
* isolated set of users within the platform
* independent customization parameters


## Unique domains

One of the most important separation characteristics of a tenant is its domain used to access the application. Once user logged in into a tenant using its application url, all the work is done within the boundaries of this tenant. Apart from the web application domain used by users a tenant is logically isolated from the others by 3 more other domains used for REST API, Webhook based flows and a Git URL used to push integration components into the tenant.

## Separation of users

Users are identified by their email addresses in the {{site.data.tenant.name}} platform. Since users of a tenant are logically separated from all the other users in all the other tenants, it's possible to register the same user email multiple times in the system. However, a user's email is unique within a single tenant.

## Customization parameters

A tenant maybe configured with a set of different parameters. The most interesting in this article are:

* Custom CSS file to provide the tenant with a unique look and feel
* Custom favicon
* Custom logo
* Individual set of integration components available in the tenant
* many other parameters to tweak tenant's behaviour