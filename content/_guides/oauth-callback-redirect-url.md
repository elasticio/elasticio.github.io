---
title: OAuth Callback redirect URL
description: This document gives the guidelines on configuring your own OAuth App in case when platform is run on different/dedicated tenant.
layout: article
section: Contract Management
order: 9
category: integrator-management
---

> Our Callback URL: `{{site.data.tenant.appURL}}/callback/oauth2`

This document gives the guidelines on configuring your own OAuth App in case when {{site.data.tenant.name}} platform is run on different/dedicated tenant. Why would one need to do this?

When your created app needs to use a Callback URL for the authentication purposes then the URL structure should be of the following structure:

`https://your-tenant-address` + `/callback/oauth` + `2` or `1` depending on the particular OAuth version. This structure completely conforms with the [(IETF) The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749).

The full constructed example would be : `https://your-tenant-address/callback/oauth2`.

Any component which runs the authentication through the OAuth is set by default to use {{site.data.tenant.name}} main Callback redirect URL structure. For example `{{site.data.tenant.appURL}}/callback/oauth2` is the URL for our OAuth2. This means the authorisation process would not be successful if the same app is deployed into a different tenant (i.e. different base URL).

> Care must be made to create and configure your own OAuth app and to provide the specifically created OAuth keys as `env vars`.
For more information please read our [articles about environment variables](/references/how-to-define-envirament-variables-for-components).

## Related links

- [(IETF) The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)
- [How to define environment variables for components](/references/how-to-define-envirament-variables-for-components)
