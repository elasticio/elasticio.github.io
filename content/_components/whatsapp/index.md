---
title: WhatsApp Component
layout: component
section: Service components
description: WhatsApp Component is designed to connect with WhatsApp
icon: whatsapp.png
icontext: WhatsApp Component
category: whatsapp
ComponentVersion: 1.1.0
updatedDate: 2024-09-05
---

# WhatsApp Component

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Send Message](#send-message)
* [Triggers](#triggers)
  * [Webhook](#webhook)

## Description

WhatsApp Component is designed to connect with WhatsApp using [Graph API](https://developers.facebook.com/docs/graph-api)
The current release of component tested with API `v18.0`.

## Credentials

Before building any integration flow please make sure you have prepared what [WhatsApp requires for API communications:](https://developers.facebook.com/docs/whatsapp/business-management-api/get-started#testing-endpoints)
* A Meta [Business Account](https://business.facebook.com/).
* A WhatsApp Business Account, associated with your Meta Business Account.
* A [business app](https://developers.facebook.com/docs/development/create-an-app/app-dashboard/app-types#business), associated with your Meta Business Account.
* A [System User access token](https://developers.facebook.com/docs/development/create-an-app/app-dashboard/app-types#business).
* The [whatsapp_business_management permission](https://developers.facebook.com/docs/permissions#w).
* The [whatsapp_business_messaging permission](https://developers.facebook.com/docs/permissions#w).

To generate a System User access token after creating a system user:
* Sign in the [Meta Business Account](https://business.facebook.com/).
* Locate your business account in the top-left dropdown menu and click its Settings (gear) icon.
* Click Business settings.
* Navigate to User > System users.
* Select the appropriate system user from the list of system users.
* Click the Generate new token button.
* Select the app that will use the token.
* Select any permissions the app needs to function properly and generate the token.

* Creating a token, you can choose between token expiration options - `60 days` or `Never expires`. It’s on the user to refresh the token in the credentials if they choose to it to expire in 60 days.

Now you can create new credentials for the component:
* **Name Your Credential** (string, required) - provide any name you wish
* **WhatsApp Business Account ID** (string, required) - Follow https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/ to find the ID
* **System User Access Token** (string, required) - Token generated above
* **API version** (string, optional, `v18.0` by default) - Version of API you are going to use, look at [Facebook changelog](https://developers.facebook.com/docs/graph-api/changelog) to find out what changes have been made

If you plan to use the `Webhook` trigger, you may also need to complete the following fields:

* **App Secret** (string, optional) - This is used for webhook verification. If left blank, the component will not verify incoming events. You can find this in the `App Settings` > `Basic` section.
* **Verify Token** (string, optional) - This token is sent by Facebook as part of the callback URL verification. If left blank, the component will not verify it. This token is set up when you create the webhook in your application ([Meta for Developers](https://developers.facebook.com/apps/) section)

## Actions

### Send Message

Simply send a message.

#### Configuration Fields

None

#### Input Metadata

Please refer to the [Input Schema file](./src/schemas/actions/sendMessage.in.json) for the full list of metadata fields.
Input message fields depend on the type of the message (one of 'contacts', 'location', 'text', 'template').
E.g. in case type: "template" is specified, you must ensure the template is properly prepared and verified according to the Meta's requirements.
Please refer to the official guides on how to accomplish it.

An example of the input message with the template available for testing purposes:
```json
{
    "to": "+1234567890",
    "type": "template",
    "template": {
        "name": "hello_world",
        "language": {
            "code": "en_US"
        }
    }
}
```

#### Output Metadata

* **messaging_product** - (string, required): For the WhatsApp API it will **always** be 'whatsapp'.
* **contacts** - (array, required): The input and wa_id of the messages.
* **messages** - (array, optional): Messages status and ID.

## Triggers

### Webhook

This trigger is used to receive events from Facebook.

To utilize it, you need to manually create a webhook subscription in your Facebook application:

1. Create a flow with the `Webhook` trigger as the first step. You might also need to add additional [Credentials](#credentials).
2. Save and start this flow.
3. Click the `Run now` button. There you will see the webhook URL, which will look like `https://in.elastic.io/hook/6690dc400f98620012465ffd`. Copy this URL.
4. Sign in to [Meta for Developers](https://developers.facebook.com/apps/).
5. Open your app.
6. In the left menu bar, you will find the `Webhooks` section. Open it.
7. From the dropdown menu, select `WhatsApp Business Account` and click `Subscribe to this object`.
8. Paste the Callback URL you obtained in the third step.
9. Provide any string as the `Verify token`. This should match the component credentials `Verify Token`, then click `Verify and save`.
10. On this page, you can test webhooks by sending test data.
11. To receive actual data, you need to switch the `App Mode` to `Live mode`. For more information, visit [this page](https://developers.facebook.com/docs/development/build-and-test/app-modes/).

#### Configuration Fields

None

#### Input Metadata

None

#### Output Metadata

Dynamically created event from facebook
