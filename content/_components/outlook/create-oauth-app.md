---
title: Creating OAuth2 App
layout: component
description: Here is how to create an OAuth2 App in Microsoft Azure Portal.
icon: outlook.png
icontext: Outlook component
category: outlook
updatedDate: 2023-08-01
ComponentVersion: 2.0.0
---

## Introduction

Microsoft Outlook component uses [OAuth 2.0 protocol](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-protocols) and requires a dedicated OAuth2 app registration. This
article will guide you through the process.

During the process you will be asked to enter a **Redirect Address** for your application.
It is `{{site.data.tenant.appURL}}/callback/oauth2`. Please refer to
[OAuth Callback redirect URL](/guides/oauth-callback-redirect-url) article for
more explanation.

In the end of this guide you should have `OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET`
values of your application which you will add as environment variables to the Outlook
component repository.

## Creating OAuth2 App

Login to [Azure Portal](https://portal.azure.com) and select App registration to begin.

{% include img.html max-width="100%" url="img/outlook-oauth2app-azure-portal-start.png" title="Login to Azure Portal and Select App registration" %}

A new configuration page will open where you can see all the registered applications
your account has. Select a **+ New registration** to create a brand new one.

{% include img.html max-width="100%" url="img/outlook-oauth2app-azure-portal-new-reg.png" title="Click on New registration" %}

Now you can configure the initial setup of your application. Remember the callback
address? Now we need that address here.

{% include img.html max-width="100%" url="img/outlook-oauth2app-azure-portal-registration.png" title="Fill in to register" %}

1.  Give a memorable name to your application.
2.  Select the access type. It you are not sure about this, select **Multitenant** (second option).
3.  Callback address. The screenshot shows a generic address, you should enter `{{site.data.tenant.appURL}}/callback/oauth2` and leave the drop-down menu **Web**.
4.   Press **Register** to save and navigate to the next screen.

{% include img.html max-width="100%" url="img/outlook-oauth2app-azure-portal-oauth-id.png" title="Newly registered App" %}

Here we have the basic configuration of OAuth2 application. Several IDs are available.
Copy the **Application (Client) ID** value since this is your `OAUTH_CLIENT_ID`.
Now Select **Certificates & secrets** menu in the left to navigate a different setup
page. There we are going to set your `OAUTH_CLIENT_SECRET` value.

{% include img.html max-width="100%" url="img/outlook-oauth2app-azure-portal-oauth-secret-1.png" title="Setting the Client secret value" %}

Here in scroll-down to Client secret section and

1.  Click on **+ New client secret** to start. A pop-up window will appear with **Add a client secret** title as it is show on the screenshot above.
2.  Add the description of your secret so you can identify it later on.
3.  Select Expiration. We recommend setting 1 or 2 years.
4.  Click to **Add** to save and generate the secret value.

Next you will see a screen with generated secret value.

{% include img.html max-width="100%" url="img/outlook-oauth2app-azure-portal-oauth-secret-1.png" title="Generated secret value. Click to copy." %}

This is your `OAUTH_CLIENT_SECRET` value, Copy somewhere safe.

> **Important: click to copy the value before navigating away from the screen.** Next time you visit this screen you will not be able to see the value and would be forced to create a new one.

Congratulation, now you have both necessary values. However, we are not yet done
with the OAuth2 app. We need to configure it further before we can use it in the
integration flows.

## Configuring OAuth2 App

Now we need to configure the newly created OAuth2 app to ensure it is not only
connecting but can exchange data. For that purpose we need to add an ability to
exchange access and ID tokens first.

Navigate to **Authentication** section using the menu in the left and scroll-down
until you see information about granting the tokens.

{% include img.html max-width="100%" url="img/outlook-oauth2app-azure-portal-auth.png" title="Select ID and access tokens." %}

Select both ID and access tokens and save it. Please do not change anything else
on this page.

Next we must extend the grant scopes of this OAuth2 app. Navigate to
**API permissions** section using the left side menu. By default only `User.Read`
scope is added.

{% include img.html max-width="100%" url="img/outlook-oauth2app-azure-portal-scopes1.png" title="The default view." %}

Click on **Microsoft Graph** to open scope explorer to choose.

{% include img.html max-width="100%" url="img/outlook-oauth2app-azure-portal-scopes2.png" title="Select the scopes." %}

Now select the following scopes in **Delegated** access mode:

*   `Calendars.ReadWrite` - Have full access to user calendars.
*   `Contacts.Read` - Read user contacts.
*   `Mail.ReadWrite` - Read and write access to user mail.
*   `offline_access` - Maintain access to data you have given it access to.
*   `openid` - Sign users in.
*   `profile` - View users; basic profile.
*   `User.Read` - Sign in and read user profile.

Here is the final screen with already added access scopes.

{% include img.html max-width="100%" url="img/outlook-oauth2app-azure-portal-scopes3.png" title="Configured scopes." %}

Congratulation. Your OAuth2 app is ready. Now we can leave the Azure portal and go
back to the platform to finish the configuration on platform side.

## Configuration on platform

By this stage our OAuth2 App is ready in Azure Portal and we have values for both
`OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET`. We only need to add these values as
environment variables to the component repository on the platform.

> **Note: If you don't have access to the component repository ask the support to help you.**

Navigate to the the Outlook component repository.

{% include img.html max-width="100%" url="img/outlook-oauth2app-platform-repo.png" title="Navigate to Outlook component repository." %}

Now click to open the configuration page to set the environment variables.

{% include img.html max-width="100%" url="img/outlook-oauth2app-platform-repo-envars.png" title="Setting environment variables." %}

We have successfully added environment variables. Now all you need to do is create
a credential for Outlook component to make OAuth2 Authentication.
