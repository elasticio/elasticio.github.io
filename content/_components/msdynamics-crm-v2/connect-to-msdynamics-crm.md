---
title: Connection to Microsoft Dynamics CRM
layout: component
description: A step-by-step instruction on how to connect to Microsoft Dynamics CRM.
icon:  msdynamics-crm-v2.png
icontext: Microsoft Dynamics CRM v2 component
category: msdynamics-v2
updatedDate: 2023-05-19
ComponentVersion: 1.2.3
---

## How to Connect to Microsoft Dynamics CRM

Connecting to Microsoft Dynamics CRM involves several steps to ensure a secure and reliable connection. Follow the guide below to successfully set up the connection.

Before you begin, make sure you have the following prerequisites in place:

1. **Microsoft Azure Account:** You need access to a Microsoft Azure account with the necessary permissions to create and manage applications.

2. **Access to Your CRM Instance:** Ensure you have access to the Microsoft Dynamics CRM instance you intend to connect to.

## Step 1: Register an OAuth App in Azure Active Directory

1. Log in to Azure Portal:

Go to [Azure Portal](https://portal.azure.com/) and log in using your Microsoft credentials.

2. Access App Registrations:

Select **App registrations** in the Azure Portal.

{% include img.html max-width="100%" url="img/app-registrations.png" title="App registrations" %}

3. Create a New Registration:

Click on **New registration**.

{% include img.html max-width="100%" url="img/new-registration.png" title="New registration" %}

4. Enter Registration Details:

Fill in the following information:

* **Name:** Choose any name for your registration.
* **Supported account types:** Select "Accounts in this organizational directory only."
* **Redirect URL:**
  * **Platform:** Choose **Web**.
  * **URL:** Enter `https://your-tenant-address/callback/oauth2`.

{% include img.html max-width="100%" url="img/new-registration-process.png" title="New registration process" %}

## Step 2: Add CRM Permissions to the App

1. Access API Permissions:

Click on **API Permissions**.

{% include img.html max-width="100%" url="img/api-permission.png" title="API Permission" %}

2. Add a Permission:

Click **Add a permission**.

{% include img.html max-width="100%" url="img/add-a-permission.png" title="Add a permission" %}

3. Select Dynamics CRM:

Search for and select **Dynamics CRM**.

{% include img.html max-width="100%" url="img/select-dynamics-crm.png" title="Select Dynamics CRM" %}

4. Choose Permissions:

Check the **user_impersonation** checkbox and click **Add permissions**.

{% include img.html max-width="100%" url="img/user_impersonation-checkbox.png" title="user_impersonation checkbox" %}

5. Grant Admin Consent:

Click **Grant admin consent** and confirm by clicking **Yes**.

{% include img.html max-width="100%" url="img/grant-admin-consent.png" title="Grant admin consent" %}

## Step 3: Generate a Secret for the App

1. Access Certificates & Secrets:

Click on **Certificates & secrets**.

{% include img.html max-width="100%" url="img/certificates-&-secrets.png" title="Certificates & secrets" %}

2. Generate a New Client Secret:

Click **New client secret**.

{% include img.html max-width="100%" url="img/INSERT.png" title="New client secret" %}

3. Enter Secret Details:

* Provide a description for the secret and select the desired expiration period (maximum 24 months).
* Click **Add**.

{% include img.html max-width="100%" url="img/new-client-secret.png" title="Enter Secret Details" %}

4. Save Secret Value:

* Save the value displayed in the **Value** column. You will need this when creating an Auth Client on {{site.data.tenant.name}} platform.

{% include img.html max-width="100%" url="img/save-secret-value.png" title="Save Secret Value" %}

## Step 4: Create an Auth Client on Your Platform

1. Create a New Credential:

Create a new credential on {{site.data.tenant.name}} platform for connecting to Microsoft Dynamics CRM.

{% include img.html max-width="100%" url="img/create-a-new-credential-on-platform.png" title="Create a New Credential on platform" %}

2. Configuration Details:

* Fill in the following details:
  * **Name:** Provide a name for this credential (free text).
  * **Client Id:** Use the Application ID copied from **Microsoft Azure -> API permissions -> Application ID**.

  {% include img.html max-width="100%" url="img/client-id.png" title="Client Id" %}

  * **Client Secret:** Add the client secret generated in the previous step.
  * **Authorization Endpoint:** Set it to `https://login.windows.net/common/oauth2/authorize?resource={{ URL encoded URL of CRM instance }}`. For example, if your CRM instance URL is `https://orgfb974624.crm4.dynamics.com/`, the encoded URL becomes `https%3A%2F%2Forgfb974624.crm4.dynamics.com%2F`.
  * **Token Endpoint:** Set it to `https://login.windows.net/common/oauth2/token`.

That's it! You've successfully configured the connection to Microsoft Dynamics CRM using OAuth. Make sure to test the connection on your platform to ensure it's working as expected.
