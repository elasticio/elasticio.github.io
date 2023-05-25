---
title: Here is how the OAuth2 process works
description: This document provides information on OAuth2 process.
layout: article
section: Tokens in OAuth2 components
order: 2
category: tokens-in-oauth2-components
redirect_from:
  - /developers/how-the-oauth2-process-works.html
---

To learn about the details of OAuth2 authorization and the mechanism behind we
refer to [The OAuth Bible](https://github.com/Kong/mashape-oauth) which we highly
recommend. The explanation below is based on that extensive document customized
to the case of this iPaaS.

>**Please note:** Every OAuth2 API provider has its own specific requirements.
> Make sure to check the documentation of the service before assuming anything
> and building the OAuth2 routines in your private component.

## Establishing the initial connections

The purpose of any basic integration scenario is to communicate the data between
the systems. To prevent any third party from getting access to this data, 2
communicating systems need to talk securely. This is done by
**establishing a secure connection** via OAuth where the data is communicated to
and between known parties.

Within the scope of the platform the known parties are:

*    **User** - This is the individual (perhaps you) which holds the ultimate rights to the data. This data is protected by the credentials which are unique to this individual, the user.

*    **Service** - This is the external resource where the protected data is hosted. For example Salesforce, Google, SAP, etc.

  * **Application** - This is the program which is going to access the external data on behalf of the user. In our case, it is the iPaaS.

Before the platform (the **Application**) would be given access to the protected data it needs to be ready to receive greetings and then would need to be introduced to that party (the **Service**). Here are the necessary steps:

  1. At the **Application**, we need to configure the OAuth Callback URL to receive the greetings. We have an [example of how to configure the OAuth Callback redirect URL](/guides/oauth-callback-redirect-url). This is the URL where the **Service** is going to send the Authentication confirmation.

  2. The **Application** needs to be registered with the **Service** as a reliable party. This is done by creating an OAuth App at the **Service** like it is explained in the case of Creating OAuth App for [Salesforce](/components/salesforce/index).

At this stage, no data belonging to any **User** is being exchanged. The systems are just getting to know each other. This stage is usually done once per each external **Service**. What we get from this stage are specific values for `client_id` and `client_secret`. These values are used afterwards by **Application** to get an access to the **Service** to authenticate the **User** credentials.

## Redirecting the User to Service

At this stage the **User** is being redirected to the **Service** by **Application** using the following information:

  * `client_id` - this is a unique identification of **Application**.

  * `client_secret` - this is also provided by the **Application**.

  * `auth_uri` - this is the URL which the **Application** is going to use to get the **User** authenticated.

  * `token_uri` - the is the URL which is going to be used by **Application** to request the `access_token` and
   `refresh_token`.

  * scopes - Optional, this is usually to indicate what is the given scope of access.

Some OAuth API providers support more parameters which can be sent with this redirect. What additional parameters and how they are sent could be different from OAuth API provider to provider. This is the reason we recommend to consult the documentation for each API provider to customize this procedure accordingly.

## User authenticates

This is the moment when the **User** gives his/her explicit consent to **Application** so that it can access the protected data stored at **Service** provider on his/her behalf.

For example in the case of [Google Spreadsheets component](/components/gspreadsheet/index) **User** would need to just start the process of verification like this:

![Start verify credentials](/assets/img/references/tokens-in-oauth2-components/start-verify-credentials.png)

This would send the special request to Google with all the necessary information already encoded in the request. If the **User** is already logged into the Google then a screen like this would be presented:

![OAuth ask for permission](/assets/img/references/tokens-in-oauth2-components/oauth-ask-for-permission.png)

In some other cases the **User** might need to log-in to the system and authorize:

![OAuth login to Salesforce](/assets/img/references/tokens-in-oauth2-components/oauth-login-to-salesforce.png)

Some **Service** providers might require a slightly different sequence of events but the whole procedure is quite similar.

In the end, the **Service** is redirecting our **User** back to the **Application** using the specific OAuth Callback URL with a specific `code`. This `code` will be used by the **Application** for further negotiation.

>**Please note** that if everything is done properly this would be the last instance where the **User** would need to manually interfere to authorize the **Application** to act on behalf of him/her to access the protected data at **Service** provider.

## Application asks for an access

From this point on the **Application** and **Service** are negotiating the connection terms and establishing the rules.

The `code` which was given the **User** after giving an explicit access to the **Application** is taken and included in the next call to the **Service** by **Application** to acquire an `access_token`.

This time **Application** sends the request to the `token_uri`. Here is what this request includes:

  * `client_id` - the same unique ID for this **Application**.

  * `client_secret` - the same secret for this **Application**.

  * `code` - this is exactly the `code` that **User** was given earlier.

  * `redirect_uri` - this is the same OAuth Callback URL for the **Application** to receive the response from the **Service**.

  * `grant_type` = `"authorization_code"` - this values is required in order the procedure to go further.

After receiving the above information **Service** checks the validity of `client_id` and `client_secret` together with the `code` and issues a call to `redirect_uri` containing the `access_token`:

  * `access_token` - this token is going to be used by the **Application** to request the secured data on **Service** side.

  * `expires_in` - this is the time until which the `access_token` is valid.

  * `refresh_token` - this is the token which is going to be used by the **Application** to request for a new `access_token` when it gets expired after `expires_in` time.

## Refreshing the tokens

In most of the cases `access_token` has some specific timespan (determined by `expires_in`) during which it is valid. When this time passes **Service** responds with **401 UNAUTHORIZED** error. Upon encountering this error **Application** must initiate the procedure of refreshing the `access_token` using the earlier given `refresh_token`.

When **Application** receives the access error it initiates a call to `token_uri` with the following content:

  * `client_id`

  * `client_secret`

  * `refresh_token`

  * `grant_type` = `"refresh_token"` - this is a required parameter and must be passed in order for the call to be accepted.

  * `scope` - this is an optional parameter which can be included if it is required, however, it should not have a different value from the ones earlier defined during the initial establishment.

What follows is similar in nature. **Service** validates the supplied parameters and issues a call including:

  * `access_token` - this is the new one.

  * `issued_at` - this is the timestamp of the `access_token` issue which together with expires_in parameter can be used to initiate an automatic refreshing of tokens if needed.

  * `refresh_token` - some OAuth API providers might issue a new refresh_token during this procedure. It is the responsibility of the developer to encounter for this.

After the tokens are refreshed **Application** can resume accessing the protected data stored at **Service** side.

## Related links

- [The OAuth Bible](https://github.com/Kong/mashape-oauth)
- [OAuth Callback redirect URL](/guides/oauth-callback-redirect-url)
- [Salesforce component](/components/salesforce/index)
- [Google Spreadsheets component](/components/gspreadsheet/index)s
