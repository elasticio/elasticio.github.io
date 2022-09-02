---
title: Creating OAuth App for Salesforce
layout: component
description: How to create OAuth App for Salesforce.
icon: salesforce.png
icontext: Salesforce component
category: salesforce
updatedDate: 2022-08-30
ComponentVersion: 2.4.0
---

## Purpose

> When you deploy the Salesforce component separately into a dedicated tenant or
> into your developer team it can not use the OAuth App specifically created for
> our main {{site.data.tenant.name}} tenant. For this purposes you must create a
> different OAuth App and add the required environment variables to the component setup.

Salesforce [documentation page](https://help.salesforce.com/articleView?id=connected_app_create.htm&type=5)
gives all specific details and explanation on how to create any app. We will go
through the necessary steps to show where to locate those setup options.

## Create new OAuth App

To start you need to navigate to the Setup section. Please log-in to your account
and select the Setup menu.

![Navigate to Salesforce setup](img/salesforce-navigate-to-setup.png)

Next on the left-side menu use the **Quick Find** and search for `App Manager`,
click to navigate to the page, and press on `New Connected App` to start.

![Navigate to create app](img/salesforce-navigate-to-create-app.png)

It will open a new page which should look like this:

![Creating the new app](img/Salesforce-oauth-new-app.png)

Fill-in the required details for **Connected App Name**, **API Name** and
**Contact Email** and also select the check-box called **Enable OAuth Settings**
at **API (Enable OAuth Settings)** section. After enabling this check-box it will
extend into the following setup:

![Configuring the OAuth settings](img/Salesforce-api-enable-oauth-settings.png)

*  **Callback URL** - put the correct URL which should of the `https://your-tenant-address/callback/oauth2` form.
*  **Selected Oauth Scopes** - The Salesforce documentation explains [API (Enable OAuth Settings)](https://help.salesforce.com/articleView?id=connected_app_create.htm&type=5) part requirements. In particular, a special care must be taken to select at least these two settings:
   *   **Full access (full)** - which allows access to all data accessible by the logged-in user, and encompasses all other scopes. This option, however, doesn't return a `refresh_token`. For that purposes you need to explicitly request the `refresh_token` scope to get one.
   *   **Perform requests on your behalf at any time (refresh_token, offline_access)** - This option would allows a `refresh_token` to be returned if you are eligible to receive one. This lets the app interact with the user's data while the user is offline. **The `refresh_token` scope is synonymous with offline_access**.

Press save to create your OAuth App.

## After creating the OAuth App

After creating the OAuth App Salesforce would show you a screen containing all
the necessary details of your newly created OAuth App.

![Created app details](img/Salesforce-oauth-key-final-result.png)

From this setup you would need to copy the **Consumer Key** and the **Consumer Secret**
for use in your custom installation of Salesforce component.

> These two keys would need to be defined as Environment Variables for your
> custom deployed component.

You can create a Auth client directly in the credentials section:

![Add new client](img/add-new-client.png)

You would need to define four variables here:

![Define client](img/define-client.png)

*   **Client ID** - your OAuth client key, meaning the **Consumer Key**.
*   **Client Secret** - your OAuth client secret, meaning the **Consumer Secret**.
*   **Authorization Endpoint** - The authorization endpoint is used to interact with the resource owner and obtain an authorization grant. For production use `https://login.salesforce.com/services/oauth2/authorize`, for sandbox - `https://test.salesforce.com/services/oauth2/authorize`.
*   **Token Endpoint** - The token endpoint is used by the client to obtain or refresh an access token. For production use `https://login.salesforce.com/services/oauth2/token`, for sandbox - `https://test.salesforce.com/services/oauth2/token`.

Here you can see how to select an existing `client`:

![Choose client](img/client-exist.png)

For more information pleas read our [Secrets feature](/getting-started/secrets) article.
