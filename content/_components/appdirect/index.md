---
title: AppDirect Component
layout: component
section: E-Commerce components
description: AppDirect component is designed for AppMarket API integration.
icon:  appdirect.png
icontext: AppDirect Component
category: appdirect
ComponentVersion: 2.0.0
updatedDate: 2021-05-11
---

## Description

This component uses v2 version of API which described at [AppMarket API Reference](https://help.appdirect.com/api/appmarket.html)

### Authentication

Authentication occurs via OAuth 2.0. To make OAuth work, you need a new App in your Environment.

### Configuring your environment

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

Check that `Require API client to request scopes` option is disabled in your API Client:

![API Client Settings](https://user-images.githubusercontent.com/22715422/78552759-be8ddf00-7810-11ea-8e60-498b2c4e6038.png)

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

## Triggers

AppDirect component includes the following triggers:

  1. [Webhook subscription](/components/appdirect/triggers#webhook-subscription)                                           
  Webhooks are notifications that the AppDirect platform can send to Integration
  Flow when certain events occur in the system.

## Actions

  1. [Create Object](/components/appdirect/actions#create-object)                                                           
  Create Object in AppDirect Environment.

  2. [Update Object](/components/appdirect/actions#update-object)                                                            
  Update Object in AppDirect Environment.

  3. [Create Entity](/components/appdirect/actions#create-entity)                                                            
  Create Entity in AppDirect Environment.

  4. [Update Entity](/components/appdirect/actions#update-entity)                                                            
  Update Entity in AppDirect Environment.

  5. [Lookup Object By ID](/components/appdirect/actions#lookup-object-by-id)                                                   
  Get an object by its type and id from AppDirect Environment.

  6. [Lookup Objects](/components/appdirect/actions#lookup-objects)                                                             
  Get objects by criteria.

  7. [Delete Object By ID](/components/appdirect/actions#delete-object-by-id)                                                
  Delete object by its type and id from AppDirect Environment.

  8. [Enable/Disable company membership](/components/appdirect/actions#enabledisable-company-membership)                     
  Enable or disable marketplace user's company membership.

  9. [Invite company membership](/components/appdirect/actions#invite-company-membership)                                       
  Add a user as a member of a marketplace company.

## Links

-   [API Reference](https://help.appdirect.com/api/appmarket.html)
-   [Creating API client](https://help.appdirect.com/appmarket/Default.htm#MarketplaceManager/api-client-create.html)
-   [Webhook integration documentation](https://help.appdirect.com/appmarket/Default.htm#MarketplaceManager/mm-set-integ-webhook.htm)
