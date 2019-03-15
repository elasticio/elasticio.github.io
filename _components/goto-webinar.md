---
title: Goto-webinar component
layout: article
section: Utility Components
---
---
## Description

Component to talk to Citrix GoToWebinar REST API.

## Environment Variables

This components uses OAuth 2.0 authentication from Citrix REST API, and would
need following ENV Vars to be set on repository - ``CITRIX_APP_ID`` and ``CITRIX_APP_SECRET``

*Note*: when configuring callback url on Citrix please use ``https://your-tenant.address/callback/oauth2``

## Known issues

OAuth 2.0 token that is obtained by the component is currently not refreshed,
this shortcoming need to be fixed later. Reason for that according
to [the documentation](https://developer.citrixonline.com/how-use-refresh-tokens)
 issued token is valid **365 days**.

## License

Apache-2.0 © [{{site.data.tenant.name}} GmbH](http://{{site.data.tenant.name}})
