---
title: Preparing the verifyCredentials.js for oauth
description: This article describes verifyCredentials.js which would initiate the actual verification process.
layout: article
section: Tokens in OAuth2 components
order: 4
category: tokens-in-oauth2-components
---

## Description

>A standard practice of the component creation is to include a `verifyCredentials.js` which would initiate the actual verification process.

`verifyCredentials.js` file/programme is the one which initiates the first authorization process with an external resource that you integration flow is trying to connect.

## Example

Here is an example from the Microsoft Outlook component by {{site.data.tenant.name}}:

```js
const MicrosoftGraph = require("msgraph-sdk-javascript");
const co = require('co');

// This function will be called by the platform to verify credentials
module.exports = function verifyCredentials(credentials, cb) {
  console.log('Credentials passed for verification %j', credentials);
  // Configuring MS Graph access library
  var client = MicrosoftGraph.init({
    defaultVersion: 'v1.0',
    debugLogging: true,
    authProvider: (done) => {
      done(null, credentials.oauth.access_token);
    }
  });
  // Doing verification
  var process = co(function*() {
    console.log('Fetching user information');
    var user = yield client.api('/me').get();
    console.log('Found user', user);
  });
  process.then(function () {
    console.log('Verification completed');
    cb(null, {verified: true});
  }).catch(err => {
    console.log('Error occured', err.stack || err);
    cb(null , {verified: false});
  });
};
```

In this example, we can see how the system [uses data provided in the `credentials` part of the `component.json`](/references/oauth2-setup-preparation-in-component-json) to make the call to the external API provider (**Service** provider) for an `access_token`. If everything goes as planned {{site.data.tenant.name}} (**Application**) gets the necessary data back from the **Service** and stores it in the database.

## Access_token

We would like to highlight how the access_token is referenced here: `credentials.oauth.access_token` which shows that it is within the `oauth` structure of the `credentials` field. The whole `oauth` field is being saved in the database in the following form:

```js
{
     "oauth":  {
       "access_token":"2YotnFZFEjr1zCsicMWpAA",
       "expires_in":3599,
       "ext_expires_in" : "0",
       "id_token" : "iuyaoixboiayudq807bd209db02ud92jd92",
       "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA",
       "scope" : "calendars.read calendars.readwrite contacts.read mail.read mail.send user.read",
       "token_type":"bearer"
     }
}
```

>**Please note:** this component is using an OAuth2 authorization method. For obvious reasons, we do not include the actual tokens here. And, the actual tokens are highly encrypted. In fact, this whole structure presented above is saved in an encrypted form within the `credentials` structure of our database.

## Related links

- [OAuth2 setup preparation in component.json](/references/oauth2-setup-preparation-in-component-json)
