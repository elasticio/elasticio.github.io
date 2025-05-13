---
title: AppDirect Triggers
layout: component
description: AppDirect component triggers
icon:  appdirect.png
icontext: AppDirect component
category: appdirect
ComponentVersion: 2.0.0
updatedDate: 2021-05-11
---

## Webhook subscription

Webhooks are notifications that the AppDirect platform can send to Integration
Flow when certain events occur in the system. For example, you can receive
notifications when users are created, when products are modified, when
subscriptions are canceled, and so on. The AppDirect platform sends notifications
to the component in real time.

When flow starts, the component tries to create a new subscription using trigger
configuration. The component can not create a new subscription if the same
subscription already exists in AppDirect platform. Before flow stop, component tries to remove a subscription to Webhook URI with specified in configuration **object type** value.

You can use [documentation](https://help.appdirect.com/appmarket/Default.htm#MarketplaceManager/mm-set-integ-webhook.htm) for more detail information.

### Webhook subscription. Input fields

- **Object group** - group of object types   
- **Object type** - type of object which you want to create.
- **Event type** - type of event which you want to subscribe

You can see a table of available configuration cases below:

| Object group|Object type|Event type |
| ------------|-----------|---------- |
| Billing     | User       | All, Added, Removed, Changed |
| Billing     | Company    | All, Added, Removed, Changed |
| Billing     | Membership | All, Added, Removed, Changed |
| Billing     | Sales lead | All, Added,  Changed |
| Billing     | Sales opportunity | All, Added, Changed |
| Product     | App assignment | All, Added, Removed, Changed |
| Product     | Catalog product | All, Added, Removed, Changed |
| Product     | Staging product | All, Added, Changed |
| Account     | Subscription | All, Added, Removed, Changed |
| Account     | Invoice | All, Added, Removed, Changed |
| Account     | Order | All, Added, Removed, Changed |
| Account     | Payment instrument | All, Added, Changed |
