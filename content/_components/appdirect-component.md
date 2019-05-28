---
title: AppDirect Component
layout: article
section: E-Commerce Components
---
---
## Description

AppDirect component is designed for AppMarket API integration. This component
uses v2 version of API which described at [AppMarket API Reference](https://help.appdirect.com/api/appmarket.html)

### Authentication
Authentication occurs via OAuth 2.0. In order to make OAuth work, you need a new App in your Environment.

## Configuring your environment

Here is how to configure your environment:

1.  Login to your environment.
2.  Follow to **Manage --> Marketplace -->  Setting -->  API Clients --> Create API Client**
3.  Create a new API Client:
    -   Specify **Name** of client
    -   Enable **oauth2** authorization
    -   Select "**Authorization Code**" grant type checkbox
    -   Specify the **callback URL**

Your callback URL should be

```
https://your-tenant.address/callback/oauth2
```

Click **Save Settings**. The new API client is created, along with a Consumer
Secret and Consumer Key. A message appears that includes the Consumer Secret
and a warning that you should copy and store the secret in a safe location
because it cannot be retrieved after the message is dismissed.

You can use [Create API clients](https://help.appdirect.com/appmarket/Default.htm#MarketplaceManager/api-client-create.html) manual for additional information.

## Credentials

-   `Environment URL` - The Url of your AppDirect environment. For example `demo.example.com`.
-   `Consumer Key` - Consumer Key which you received during API client configuration step.
-   `Consumer Secret` - Consumer Secret which you received during API client configuration step.

### Creating credentials

-   Specify Environment URL (without `http://` or `https://` prefixes)
-   Specify Consumer Key
-   Specify Consumer Secret
-   Click "Authenticate"
-   Specify your **Email** and **Password** and click **"Log In"**
-   After getting a **"Success"** notification save your credentials.

## Actions

### Create Entity
Create Entity in AppDirect Environment

#### Create Entity. Input fields

-   **Entity type** - type of entity which you want to create. You can use only next list of types for this action:
    -   **[Company](https://help.appdirect.com/api/appmarket.html#create-new-company)**

### Update Entity

Update Entity in AppDirect Environment

#### Update Entity. Input fields

-   **Entity type** - type of entity which you want to update. You can use only the following list of types for this action:
    -   **[Company Memberships](https://help.appdirect.com/api/appmarket.html#read-user-memberships)**
    -   **[Order Parameters](https://help.appdirect.com/api/appmarket.html#update-purchase-order-configuration-details)**
    -   **[Subscription](https://help.appdirect.com/api/appmarket.html#change-subscription-details)**

### Lookup Object By ID

Get an object by its type and id from AppDirect Environment

#### Lookup Object By ID. Input fields:

-   **Entity type** - type of entity which you want to lookup. You can use only the following list of types for this action:
  -   **[Company Memberships](https://help.appdirect.com/api/appmarket.html#read-company-membership)**
  -   **[Order](https://help.appdirect.com/api/appmarket.html#retrieve-a-purchase-order)**
  -   **[Payment Instruments (Default)](https://help.appdirect.com/api/appmarket.html#retrieve-the-default-payment-instrument)**
  -   **[Product](https://help.appdirect.com/api/appmarket.html#retrieve-a-product)**
  -   **[Subscription](https://help.appdirect.com/api/appmarket.html#read-a-user)**
  -   **[Subscription Assignment](https://help.appdirect.com/api/appmarket.html#read-application-assignment-for-user-and-subscription)**
  -   **[User](https://help.appdirect.com/api/appmarket.html#read-a-user)**
  -   **[User Memberships](https://help.appdirect.com/api/appmarket.html#read-user-memberships)**

### Lookup Objects

Get objects by criteria

#### Lookup Objects. Input fields
-   **Entity type** - type of entity which you want to lookup. You can use only the following list of types for this action:
    -   **[Buyable product](https://help.appdirect.com/api/appmarket.html#retrieve-buyable-products)**
    -   **[Company](https://help.appdirect.com/api/appmarket.html#list-all-companies)**
    -   **[Company Memberships](https://help.appdirect.com/api/appmarket.html#list-company-memberships)**
    -   **[Staging product](https://help.appdirect.com/api/appmarket.html#read-staging-catalog)**
    -   **[Subscription](https://help.appdirect.com/api/appmarket.html?shell#list-all-subscriptions)**
    -   **[Subscription Assignment](https://help.appdirect.com/api/appmarket.html#list-application-assignments-for-subscription)**
-   **Behaviour** - Behaviour of emitting data.
    -   **Fetch all**
    -   **Fetch Page**
    -   **Emit Individually**

#### Lookup Objects. Input Metadata description

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

#### Lookup Objects. Input metadata limitations

-   **max result size** value doesn't support value more than **100000000** in  **Fetch all**  mode
-   **Emit Individually** mode can't emit more then **100000000** messages

### Delete Object By ID

Delete object by its type and id from AppDirect Environment.

-   **Entity type** - type of entity which you want to lookup. You can use only the following type for this action:
    -   **[Company Memberships](https://help.appdirect.com/api/appmarket.html#delete-company-membership)**

### Enable/Disable company membership

See the link: [Enable/Disable company membership](https://help.appdirect.com/api/appmarket.html#enable-disable-company-membership). Enable or disable marketplace user's company membership.

This only changes the user company membership's enabled status; all other
attributes are ignored.

### Invite company membership

See the link: [Invite company membership](https://help.appdirect.com/api/appmarket.html#create-company-membership-invite-user)
Add a user as a member of a marketplace company.

Depending on channel configuration, the membership is either created immediately
or when an invited user accepts the invitation. If no user exists with the given
email address (and also depending on channel configuration), a user may be created.
This causes an invitation to be sent to the user.


## Triggers

### Webhook subscription

Webhooks are notifications that the AppDirect platform can send to Integration
Flow when certain events occur in the system. For example, you can receive
notifications when users are created, when products are modified, when
subscriptions are canceled, and so on. The AppDirect platform sends notifications
to the component in real time.

When flow starts, the component tries to create a new subscription using trigger
configuration. The component can not create a new subscription if the same
subscription already exists in AppDirect platform. Before flow stop, component
tries to remove a subscription to Webhook URL with specified in configuration
**entity type** value.

You can use [documentation](https://help.appdirect.com/appmarket/Default.htm#MarketplaceManager/mm-set-integ-webhook.htm) for more detail information.

#### Webhook subscription. Input fields

-   **Entity group** - group of entity types
-   **Entity type** - type of entity which you want to create.
-   **Event type** - type of event which you want to subscribe

You can see a table of available configuration cases below:

| Entity group | Entity type | Event type |
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

## Links

-   [API Reference](https://help.appdirect.com/api/appmarket.html)
-   [Creating API client](https://help.appdirect.com/appmarket/Default.htm#MarketplaceManager/api-client-create.html)
-   [Webhook integration documentation](https://help.appdirect.com/appmarket/Default.htm#MarketplaceManager/mm-set-integ-webhook.htm)

## License
Apache-2.0 © [{{site.data.tenant.name}} GmbH](http://www.{{site.data.tenant.name}})
