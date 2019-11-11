---
title: Configuring ODATA APP
layout: component
section: CRM components
description: How to register and configure guide.
icon: msdynamics-crm.png
icontext: Configuring ODATA APP
category: Microsoft Dynamics CRM
createdDate: 2018-03-18
updatedDate: 2018-09-07
---

Here is how to register and configure an app in Active Directory or Azure Active Directory

The following steps and screenshots describe app registration on Azure Active
Directory.  These instructions may differ for other types of Active Directory.

## 1. Login

* Login to the [Azure Portal](https://portal.azure.com) with your Microsoft Credentials.

* Select the **Azure Active Directory** resource from the selector on the left.

![Select the Azure Active Directory](https://user-images.githubusercontent.com/5710732/35617709-3bbf7698-0679-11e8-9904-f093a4a84128.png)

## 2.  App registrations

* Select **App registrations**.

![Select App registrations](https://user-images.githubusercontent.com/5710732/35617710-3bdba6ce-0679-11e8-97c1-c17ab764c464.png)

* Select **New application registration**.

![* Select new application registration](https://user-images.githubusercontent.com/5710732/35617711-3bf82894-0679-11e8-9a63-d500948a1559.png)

* Enter:

   1. A **Name** of your choosing
   2. Select **Web app/API** for **Application Type**
   3. Enter `https://app.elastic.io/` for the **Sign-on URL**
* Click **Create**

![Create new app](https://user-images.githubusercontent.com/5710732/35617712-3c14ba54-0679-11e8-89e8-dd72f52b0f5a.png)

## 3. Settings

* Select the newly created application.
* Select **Settings**

![Settings](https://user-images.githubusercontent.com/5710732/35617713-3c30b736-0679-11e8-944e-23920225c716.png)

* Select **Reply URLs**.  Add `https://app.elastic.io/callback/oauth2` as a
reply URL.  Click **Save**.

![Select Reply URLs](https://user-images.githubusercontent.com/5710732/35617714-3c4e5840-0679-11e8-8180-ebabbd3b0fa6.png)

* Select **Required Permissions**.  Click **Add**.
* Click **Select an API**
* Click **Dynamics CRM Online**

![Dynamics CRM Online](https://user-images.githubusercontent.com/5710732/35617715-3c8599ae-0679-11e8-9c1f-1de8c6f6001c.png)

* Select the permission **Access CRM Online as organization users**
* Click **Done** to add the permissions.

![Access CRM Online as organization users](https://user-images.githubusercontent.com/5710732/35617716-3ca231d6-0679-11e8-8c96-6f682d6fb0d4.png)


* Select **Keys**.  Enter:
    1. Some description for **Key description**.
    2. Set **Duration** to **Never expires**

![Keys - Set Duration](https://user-images.githubusercontent.com/5710732/35617717-3cbaa14e-0679-11e8-92fc-7f1dd291c2ee.png)

* Select **Save**.  Copy the key value created. You will need this value in
the **Configure app details in elastic.io** section.

![Key value created](https://user-images.githubusercontent.com/5710732/35617718-3cdb3710-0679-11e8-8a9b-43d1868b614f.png)

* Copy the value of the **Application ID**.  You will also need this value in the next section.

![Value of the Application ID](https://user-images.githubusercontent.com/5710732/35617719-3cf7fa44-0679-11e8-9c42-693b49b6f532.png)

## License

Apache-2.0 © [{{site.data.tenant.name}} GmbH]({{site.data.tenant.name}})
