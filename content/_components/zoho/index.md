---
layout: component
title: Zoho Subscriptions component
section: Marketing-related components
description: A component that connects to Zoho Subscriptions API.
category: zoho
icon: zoho.png
icontext: Zoho component
ComponentVersion: 1.0.2
updatedDate: 2020-11-10
---

## Introduction

Zoho Subscriptions is a cloud-based recurring billing and subscription solution
in the Zoho product family. It handles every aspect of your subscription-based
business. It can automatically notify you when a payment doesn't go through for
some reason and automatically retries the card again.

## About the component

This is {{site.data.tenant.name}} Zoho Subscriptions integration component. It has
both [trigger](#triggers) and [action](#actions) functions which means you can
use it either to execute or to act upon a certain event. For example, using it
as a trigger, you can filter existing subscriptions based on a subscription status.
Using it as an action, you can create or update customer data or a subscription.

> **Please Note: Component uses Zoho Subscription API v1.0**.

## Requirements

Before you can use the Zoho Subscriptions integration component, the following
requirements must be met:

*   An active subscription plan with Zoho.
*   An account on the {{site.data.tenant.name}} integration platform.
*   Follow the [setup process in Zoho](#zoho-authentication-setup) and [platform site](#credentials-on-platform).

### Zoho authentication setup

All Zoho Subscriptions APIs requires at least two mandatory headers.

1.  Authorization - Authentication request header. (`Zoho Authtoken`)
2.  `X-com-zoho-subscriptions-organizationid` - the header that contains the `organization ID` of the organization you need to access.

`Zoho Authtoken` : To obtaining an authentication token, login to your Zoho Account
and go [here](https://accounts.zoho.com/apiauthtoken/create?SCOPE=ZohoSubscriptions/subscriptionsapi).

`Organization ID` : Each organization is an independent Zoho Subscriptions Organization
with it’s own organization ID, base currency, time zone, language, customers,
reports, etc. To get the ID follow these [steps](https://www.zoho.com/subscriptions/api/v1/#organization-id).

### Credentials on platform

During credentials creation you need to:

*   Name your credential according to what organization you are using. For example, test environment should be explicitly labeled as `test`.
*   Enter `Zoho Authtoken` for `Authorization`. **Do not include the word `Authtoken`, input the actual token ID.**
*   Enter `Organization ID`.
*   Verify and save new credentials.

![Credentials](img/credentials.png)

### Technical Notes

Please check the [technical notes](technical-notes) page which lists in-depth
technical details about Zoho component like the recent [changelog](technical-notes#changelog).


## Triggers

### Get All Subscriptions

Filters existing subscriptions based on `Subscription Status`. You can select
any custom or built-in ``Subscription Status`` for your Zoho Subscription instance.

#### Input field description

`Subscription Status`: Drop down menu where you have to select the type of status
you want to filter subscriptions.
`Email` : Filters subscription based on customer email address.

![Get All Subscriptions](img/get-all-subscriptions.png)

## Actions

### Retrieve Customer

Due to some limitations of Zoho Subscription API, you cannot check if a customer
exists. As a result, this action allows you check if a customer exist by inputting
their `Email`. If customer exists it returns an object of the customer and its
data and if customer doesn't exist it returns an empty object.

![Retrieve Customer](img/retrieve-customer.png)

### Upsert Customer

Lookup an object by `Zoho Customer ID` or `Email`. Action creates/updates a single
object. Input metadata is fetched dynamically from your Zoho Customer account.
Output metadata is the same as input metadata, so you may expect all fields that
you mapped as input to be returned as output.

![Upsert Object](img/upsert-customer.png)


### Upsert Subscription

Lookup an object by `Zoho Customer ID` or `Zoho Subscription ID`. Action creates/updates
a single object. Input metadata is fetched dynamically from your Zoho Subscription
account. Output metadata is the same as input metadata, so you may expect all
fields that you mapped as input to be returned as output.

![Upsert subscription](img/upsert-subscription.png)


## Limitations

As of right now the component does not take in account for Customers who wants
an online subscription which will charge the customer’s card automatically on every renewal.
