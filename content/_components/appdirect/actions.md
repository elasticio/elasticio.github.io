---
title: AppDirect Actions
layout: component
description: AppDirect component actions
icon:  appdirect.png
icontext: AppDirect Component
category: appdirect
ComponentVersion: 2.0.0
updatedDate: 2021-05-11
---

## Create Object

Create Object in AppDirect Environment

### Create Object. Input fields

 - **Object type** - type of object which you want to create.
  You can use only next list of types for this action:
    - **[Company](https://help.appdirect.com/api/appdirect.html#create-new-company)**
    - **[Subscription](https://help.appdirect.com/api/appdirect.html#subscriptions)**
    - **[Opportunity](https://help.appdirect.com/api/appdirect.html#create-opportunity)**
    - **[Opportunity Item ](https://help.appdirect.com/api/appdirect.html#edit-item)**
    - **[Lead](https://help.appdirect.com/api/appdirect.html#leads-v2)**

## Update Object

Update Object in AppDirect Environment

### Update Object. Input fields

- **Object type** - type of object which you want to update.
   You can use only next list of types for this action:
    - **[Update Company](https://help.appdirect.com/api/appdirect.html#update-company)**
    - **[Company Memberships](https://help.appdirect.com/api/appdirect.html#read-a-company)**
    - **[Order Parameters](https://help.appdirect.com/api/appdirect.html#update-purchase-order-configuration-details)**
    - **[Subscription](https://help.appdirect.com/api/appdirect.html#change-subscription-details)**
    - **[Opportunity](https://help.appdirect.com/api/appdirect.html#update-opportunity)**
    - **[Opportunity Item](https://help.appdirect.com/api/appdirect.html#edit-item)**
    - **[Lead](https://help.appdirect.com/api/appdirect.html#update-lead)**

## Create Entity

Create Entity in AppDirect Environment.

### Create Entity. Input fields

-   **Entity type** - type of entity which you want to create. You can use only next list of types for this action:
    -   **[Company](https://help.appdirect.com/api/appdirect.html#create-new-company)**

## Update Entity

Update Entity in AppDirect Environment.

### Update Entity. Input fields

-   **Entity type** - type of entity which you want to update. You can use only the following list of types for this action:
    -   **[Company Memberships](https://help.appdirect.com/api/appdirect.html#create-new-company)**
    -   **[Order Parameters](https://help.appdirect.com/api/appdirect.html#update-purchase-order-configuration-details)**
    -   **[Subscription](https://help.appdirect.com/api/appdirect.html#change-subscription-details)**

## Lookup Object By ID

Get an object by its type and id from AppDirect Environment.

### Lookup Object By ID. Input fields:

  - **Object type** - type of object which you want to lookup.

-   **Entity type** - type of entity which you want to lookup. You can use only the following list of types for this action:
  -   **[Company Memberships](https://help.appdirect.com/api/appdirect.html#read-a-company)**
  -   **[Order](https://help.appdirect.com/api/appdirect.html#retrieve-a-purchase-order)**
  -   **[Payment Instruments (Default)](https://help.appdirect.com/api/appdirect.html#retrieve-the-default-payment-instrument)**
  -   **[Product](https://help.appdirect.com/api/appdirect.html#retrieve-a-product)**
  -   **[Subscription](https://help.appdirect.com/api/appdirect.html#subscriptions)**
  -   **[Subscription Assignment](https://help.appdirect.com/api/appdirect.html#read-application-assignment-for-user-and-subscription)**
  -   **[User](https://help.appdirect.com/api/appdirect.html#read-a-user)**
  -   **[User Memberships](https://help.appdirect.com/api/appdirect.html#read-user-memberships)**

## Lookup Objects

Get objects by criteria.

### Lookup Objects. Input fields

- **Object type** - type of object which you want to lookup.

-   **Entity type** - type of entity which you want to lookup. You can use only the following list of types for this action:
    -   **[Buyable product](https://help.appdirect.com/api/appdirect.html#retrieve-buyable-products)**
    -   **[Company](https://help.appdirect.com/api/appdirect.html#list-all-companies)**
    -   **[Company Memberships](https://help.appdirect.com/api/appdirect.html#list-company-memberships)**
    -   **[Staging product](https://help.appdirect.com/api/appdirect.html#read-staging-catalog)**
    -   **[Subscription](https://help.appdirect.com/api/appdirect.html#list-all-subscriptions-for-a-company)**
    -   **[Subscription Assignment](https://help.appdirect.com/api/appdirect.html#list-application-assignments-for-subscription)**
-   **Behaviour** - Behaviour of emitting data.
    -   **Fetch all**
    -   **Fetch Page**
    -   **Emit Individually**

### Lookup Objects. Input Metadata description

-   **pageSize**: positive integer that defaults to 100 (only if Fetch Page mode)
-   **pageNumber**: required non-negative integer that is 0 based (only if Fetch Page mode)
-   **order**: optional array of fieldname + sort direction pairs (only if Fetch Page mode)
```json
[
  {
    "fieldName": "createdOn",
    "sortDirection": "ASC"
  },
  {
    "fieldName": "NAME",
    "sortDirection": "DESC"
  }
]
```
-   **max result size**: optional positive integer that defaults to 1000 (only if fetch all mode)

### Lookup Objects. Input metadata limitations

-   **max result size** value doesn't support value more than **100000000** in  **Fetch all**  mode
-   **Emit Individually** mode can't emit more then **100000000** messages

## Delete Object By ID

Delete object by its type and id from AppDirect Environment.

- **Object type** - type of object which you want to lookup.

-   **Entity type** - type of entity which you want to lookup. You can use only the following type for this action:
    -   **[Company Memberships](https://help.appdirect.com/api/appdirect.html#delete-company-membership)**

## Enable/Disable company membership

See the link: [Enable/Disable company membership](https://help.appdirect.com/api/appdirect.html#enable-disable-company-membership). Enable or disable marketplace user's company membership.

This only changes the user company membership's enabled status; all other
attributes are ignored.

## Invite company membership

See the link: [Invite company membership](https://help.appdirect.com/api/appdirect.html#create-company-membership-add-user)
Add a user as a member of a marketplace company.

Depending on channel configuration, the membership is either created immediately
or when an invited user accepts the invitation. If no user exists with the given
email address (and also depending on channel configuration), a user may be created.
This causes an invitation to be sent to the user.
