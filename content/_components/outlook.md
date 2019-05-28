---
title: Outlook component
layout: article
section: Utility Components
---
---
## Description

An integration component for the Office 365 Outlook REST API


## Authentication

This component uses OAuth 2.0 authentication, so when deploying it to
your team you need to supply OAuth App Client ID and Client Secret.
You can register your app to obtain a client ID and secret via
https://apps.dev.microsoft.com, for that you would need to sign in with
either your Microsoft account (Outlook.com), or your work or school account (Office 365).

Client ID and Secret need to be configured in the environment variables
```MSAPP_CLIENT_ID``` and ```MSAPP_CLIENT_SECRET```. When specifying
callback URI  please use your callback URL in a form

```
https://your-tenant.address/callback/oauth2
```

for public cloud default tenant just use ``https://your-tenant.address/callback/oauth2``

Apart from the OAuth 2.0 button you would need to specify the __AD tenant ID__
 if you not sure about that just use ``common``.

## Scope and Consent

Before using this component certain Microsoft Graph scopes need to be defined for your application.
This can be done via https://apps.dev.microsoft.com.

The list of scopes required by the component is: "calendars.read calendars.readwrite contacts.read mail.read mail.send user.read".

## Known issues and limitations

### Current implementation uses AD V2.0 OAuth2

Second version of AD protocol has [some advantages](https://azure.microsoft.com/en-us/documentation/articles/active-directory-v2-compare/), see [here](https://azure.microsoft.com/en-us/documentation/articles/active-directory-v2-limitations/) for more information.

### OData output for lastModifiedDateTime has a precision issue

Apparently the ``lastModifiedDateTime`` returned by MS Graph has no milliseconds
in it is obvious that filter query accept and treat millisecond values correctly
there is a workaround for that issue implemented in the code, however you need to
keep an eye on it.

## License

Apache-2.0 © [{{site.data.tenant.name}} GmbH](http://{{site.data.tenant.name}})
