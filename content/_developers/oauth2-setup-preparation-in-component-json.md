---
title: OAuth2 setup preparation in component.json
description: It is important to make sure that this setup is prepared and provided during the design of the integration component.
layout: article
section: Tokens in OAuth2 components
order: 3
category: tokens-in-oauth2-components
redirect_from:
  - /references/oauth2-setup-preparation-in-component-json.html
---

## Description

It is important to make sure that this setup is prepared and provided during the design of the integration component. The setup of `oauth` part is one part of the general process of authorization.

The `oauth` setup in the `component.json` of your component ensures that several things are set:

  * The `credentials` field is presented in the user interface for the user to give its explicit authorization to the {{site.data.tenant.name}} **Application**. This ensures the ability to add security credentials to be used for the integration component proper function.

  * The proper connection endpoints, as well as connection specific protocols, are indicated. Those endpoints are used by the verification process to authorize the user `credentials`.

## Example

Let us explain how it should be done on an example of currently working example. Here are the first 31 lines from `component.json` of [Microsoft Outlook component](/components/outlook/index) by {{site.data.tenant.name}} showing those parts:

```js
{
  "title": "Outlook",
  "description": "integration component for Office 365 Outlook REST API",
  "envVars": {
    "MSAPP_CLIENT_ID": {
      "required": true,
      "description": "Your App Client ID"
    },
    "MSAPP_CLIENT_SECRET": {
      "required": true,
      "description": "Your App Client Secret"
    }
  },
  "credentials": {
    "fields": {
      "oauth": {
        "label": "Authentication",
        "viewClass": "OAuthFieldView",
        "required": true
      }
    },
    "oauth2": {
      "client_id": "{{MSAPP_CLIENT_ID}}",
      "client_secret": "{{MSAPP_CLIENT_SECRET}}",
      "auth_uri": "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
      "token_uri": "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      "scopes": [
        "openid","offline_access","User.Read","Contacts.Read","Profile","Calendars.ReadWrite"
      ]
    }
  }
}
```

## Notes

From the example we have the following sections to note:

Lines 16-20 show the `oauth` which will be used to draw the interface for `credentials`. For more details please refer to credentials object description. This would be the interface where the **User** would be asked to authorise. This is just one example representation and can be different from component to component. However, everything which is involved in drawing that part should be included here.

Lines 22-30 represent the `oauth2` setup which contains the necessary parameters and endpoint like `client_id`, `client_secret`, `auth_uri`, `token_uri` and several more to initiate the user redirection. These parameters will be used to connect and enquire for the `access_token` and other parameters.

>It is also worth to mention that `oauth` would also be used as a name of the JSON structure where the final `credentials` would be saved in the database.
