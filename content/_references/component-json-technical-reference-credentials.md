---
title: component.json Technical Reference - Credentials
description: This technical reference describes the structure of the credentials section of the component.json manifest file/component descriptor file
layout: article
section: Component Descriptor
order: 2
category: component descriptor
---

The `credentials` object in the [`component.json`](component-json-technical-reference.html) is used to expose the information that the platform needs to collect from the integrator in order to be able to connect to their instance/account.  Information that is collected in this section typically include:
* URL to the integrator's instance (if there is not a shared cloud url)
* Username or other account identifier
* Password or other API keys/tokens required to authenticate

## What do credentials represent

Whenever an integrator uses your component on the {{site.data.tenant.name}} platform, they will need create a credentials object where they must provide values for each of the fields asked for in the `credentials` part of the component.  

Once these values have been provided, these values will be available to the component's code in all actions, triggers and related helper functions.  

In addition to the fields identified in component.json, the platform will also prompt the integrator to assign a name to their credential. An integrator may have more than one credential for a given component if the integrator has multiple accounts or instances for system the component is built for.

![Example Credentials for the Magento 2 Component](/assets/img/references/component.json/credentials-full.png)

## Omitting Credentials

If the `credentials` object is not provided, then the integrator will not have the ability to select a credentials object between the *Functions* tab and the *Input* tab.

![Example of No Credentials](/assets/img/references/component.json/no-credentials.png)

If the `credentials` object is provided and is `{}` or is `{"fields": {}}` then the integrator will have the ability to select a credentials object although there will be no inputs for the integrator to fill in apart from a credential name.

![Example of Empty Credentials](/assets/img/references/component.json/credentials-empty.png)

## `credentials` Object Structure
The `credentials` should be an object with the following properties:

| Property Name | Description |
| :------------ | :---------- |
| [fields](#fields-object) | An object which describes the fields in the credential. Each key-value pair in the object represents a field that is exposed. The string key acts as the identifier for the field.  The structure of the field object is described below. |
| [oauth1](#oauth1) | Specifies the details about OAuth v1.0 resources. Only used if a `OAuthFieldView` field is defined. |
| [oauth2](#oauth2) | Specifies the details about OAuth v2.0 resources. Only used if a `OAuthFieldView` field is defined. |

## Example
*(from the Magento 2 component.json)*

```json
{
    "title": ...,
    "description": ...,
    "buildType": ...,
    "credentials": {
        "fields": {
            "minorVersion": {
                "viewClass": "SelectView",
                "label": "Minor Version of Magento",
                "required": true,
                "placeholder": "Choose version of Magento",
                "model": {
                    "2": "v2.2",
                    "3": "v2.3"
                }
            },
            "edition": {
                "viewClass": "SelectView",
                "label": "Magento Edition",
                "required": true,
                "placeholder": "Choose environment",
                "model": {
                    "openSource": "Open source",
                    "enterprise": "Enterprise"
                }
            },
            "url": {
                "viewClass": "TextFieldView",
                "label": "URL",
                "required": true,
                "placeholder": "Instance URL"
            },
            "username": {
                "viewClass": "TextFieldView",
                "label": "Username",
                "required": false,
                "placeholder": "Paste username"
            },
            "password": {
                "viewClass": "PasswordFieldView",
                "label": "Password",
                "required": false,
                "placeholder": "Paste password"
            },
            "integrationToken": {
                "viewClass": "PasswordFieldView",
                "label": "Integration Token",
                "required": false,
                "placeholder": "Paste Integration Token"
            }
        }
    },
    "triggers": {
      ...
    },
    "actions": {
      ...
    }
}
```
