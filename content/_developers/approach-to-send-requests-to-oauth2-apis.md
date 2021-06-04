---
title: Approach to send requests to OAuth2 APIs
description: This document provides information on the process of obtaining and refreshing the tokens.
layout: article
section: Tokens in OAuth2 components
order: 1
category: tokens-in-oauth2-components
redirect_from:
  - /references/approach-to-send-requests-to-oauth2-apis.html
---

## Description

Before we would delve into the process of obtaining and refreshing the actual `access_token` and `refresh_token` it is recommended to check the overall setup of authorisation procedure in the integration component:

  1. [Here is how the OAuth2 authorization process works](/references/how-the-oauth2-process-works) at {{site.data.tenant.name}}.
  2. Prepare and check your `component.json`. Here are the [instructions and suggestions](/references/oauth2-setup-preparation-in-component-json).
  3. Prepare the `verifyCredentials.js`. Here is [what can be done](/references/preparing-the-verifyCredentials-js-for-oauth-process) for that.
  4. The stored `credentials` can be accessed [following this example](/references/how-to-access-access_token-during-component-execution).

## Refreshing the tokens

  The very definition of an `access_token` within the scope of OAuth2 is that it will expire sooner or later. If any system is accepting the same `access_token` for long period then it is prone to a potential security breach. Dependent on a system the `access_token` is valid only for several hours. Some systems require it to be updated every hour and this is regarded as a standard practice.

  The process of refreshing the `access_token` is initiated when the API responds with an access error **401 UNAUTHORIZED**. The methods of encountering and coding might vary from component to component due to different requirements from different API providers, however, the logic is the same, Service responds with the message: **Give me the** `refresh_token` **and I will give you the new** `access_token` **to continue accessing the protected data**.

  >**Note:**
  It is the job of the component creator to make sure that there is a routine in place to refresh the `access_token` according to the requirements of external API provider to which the component connects.

## Method of refreshing token during each access

  This method is perhaps too overzealous but works quite well while in ensuring to have an up-to-date. This method is not waiting for the above mentioned 401 error from the server but simply requests the `refresh_token` along with the `access_token` every time. Some API providers might discourage this but there is nothing technically wrong to do this. Here is an example of implementation:

```js
return co(function* mainLoop() {
        console.log('Refreshing an OAuth Token');
        const newToken = yield rp({
            method: 'POST',
            uri: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
            json: true,
            form: {
                refresh_token: cfg.oauth.refresh_token,
                scope: cfg.oauth.scope,
                grant_type: 'refresh_token',
                client_id: process.env.MSAPP_CLIENT_ID,
                client_secret: process.env.MSAPP_CLIENT_SECRET
            }
        });
        console.log('Updating token');
        this.emit('updateKeys', {
            oauth: newToken
        });

        const client = MicrosoftGraph.init({
            defaultVersion: 'v1.0',
            debugLogging: true,
            authProvider: (done) => {
                done(null, newToken.access_token);
            }
        });
...     

}
```

In this example, which is taken from the [Microsoft Outlook component](https://github.com/elasticio/outlook/blob/master/lib/triggers/contacts.js), the whole procedure includes refreshing first the `refresh_token` then using the first to refresh the access_token.

>Notice how the refresh token is emitted via `updateKeys` event (on line 15 in the above example).

This solution was chosen since Microsoft requires the `refresh_token` to be updated regularly as well. This is rather an exception than a rule. Normally API providers do not require the `refresh_token` to be updated regularly or they are just updated and sent along with the `access_token` from time to time.

It is important to get familiarised in advance with the requirements of the API provider in order to know when and how to initiate the refresh token procedure.

## Refreshing the tokens when it is required

This is the more standard implementation of the token refresh procedure. The tokens are being refreshed only when the API provider rejects with **401 UNAUTHORIZED** error. The following is an example taken from the [Salesforce Java component](https://github.com/elasticio/salesforce-component-java) by {{site.data.tenant.name}}:

```java
private String sendRequestAndRefreshTokensIfRequired(
            final HttpRequestBase request, final JsonObject configuration) {

        try {
            return HttpClientUtils.sendRequest(request);
        } catch (AuthorizationException e) {

            HttpClientUtils.refreshTokens(configuration);

            logger.info("Emitting updated keys");

            getEventEmitter().emitUpdateKeys(configuration);

            HttpClientUtils.authorizeRequest(request, configuration);

            logger.info("Sending the original request width refreshed access_token");
            try {
                return HttpClientUtils.sendRequest(request);
            } catch (AuthorizationException e1) {
                throw new RuntimeException(e1);
            }

        }
    }
```

The procedure presented in the example ensures the proper execution of these steps:

  * Sends a request to the API using the `access_token` from the component's configuration

  * If the request succeeds, the data from the response are emitted

  * If the API response with 401 UNAUTHORIZED, the `access_token` is updated using the `refresh_token`.

  * The response of the refresh token request is emitted using the `updateKeys` event. It is important to note here that **the entire response must be emitted since some OAuth2 API providers also refresh the** `refresh_token` from time to time or repeatedly.

  * Finally the system sends the original request one more time, now using the new `access_token`.

  In the above example HttpClientUtils.refreshTokens(configuration) is defined separately like this:

```java
public static final void refreshTokens(final JsonObject configuration) {

          logger.info("About to refresh tokens");

          final JsonObject oauth = configuration.get(Constants.CONFIGURATION_OAUTH).getAsJsonObject();

          if (oauth == null) {
              throw new RuntimeException("Please authenticate with Salesforce");
          }

          final String refreshToken = getRequiredConfigurationParameter(
                  oauth, Constants.CONFIGURATION_REFRESH_TOKEN);

          final List<NameValuePair> params = new ArrayList<NameValuePair>();
          params.add(new BasicNameValuePair("grant_type", "refresh_token"));
          params.add(new BasicNameValuePair("client_id", System.getenv("SALESFORCE_KEY")));
          params.add(new BasicNameValuePair("client_secret", System.getenv("SALESFORCE_SECRET")));
          params.add(new BasicNameValuePair("refresh_token", refreshToken));
          params.add(new BasicNameValuePair("format", "json"));

          final String url = "https://login.salesforce.com/services/oauth2/token";

          final HttpPost httpPost = new HttpPost(url);
          try {
              httpPost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
          } catch (UnsupportedEncodingException e) {
              throw new RuntimeException(e);
          }


          final String content;
          try {
              content = HttpClientUtils.sendRequest(httpPost);
          } catch (AuthorizationException e) {
              throw new RuntimeException(e);
          }

          logger.info("Refresh token response: {}", content);

          final JsonObject newOauth = new JsonParser().parse(content).getAsJsonObject();

          configuration.add(Constants.CONFIGURATION_OAUTH, newOauth);
      }
```

## Related links

- [How the OAuth2 process works](/references/how-the-oauth2-process-works)
- [OAuth2 setup preparation in component.json](/references/oauth2-setup-preparation-in-component-json)
- [Preparing the verifyCredentials.js for oauth](/references/preparing-the-verifyCredentials-js-for-oauth-process)
- [How to access access_token during component execution?](/references/how-to-access-access_token-during-component-execution)
- [Microsoft Outlook component](https://github.com/elasticio/outlook/blob/master/lib/triggers/contacts.js)
- [Salesforce Java component](https://github.com/elasticio/salesforce-component-java)
