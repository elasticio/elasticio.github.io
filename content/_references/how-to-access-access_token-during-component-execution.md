---
title: How to access access_token during component execution?
layout: article
section: Tokens in OAuth2 components
order: 5
category: tokens-in-oauth2-components
---

## Description

Before we can try to access any part of `credentials` structure we need to know how it is stored in database. In our database all the credentials are stored in an encrypted conditions. Whenever the process of authorisation wants to access a parameter from it, the system is decrypting it in the process and returns the value for further use.

Here is how the credentials are stored in the the database:

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

## Example

So for example, if in the `component.json` it is named like `oauth` then it will be stored under that name. For obvious reasons we did not include a real data in the above example but the structure of stored data is the same.

>It is entierly up to the component developer how to name that particular section in the `component.json`. It can be `myOauth` or something else. **The system will use that exact name (`myOauth`) to store the structure in the database.**

To access, and modify values they would need to be addressed accordingly like `credentials.oauth.access_token` or through any other name the structure was called. For example in case if it was called `myOauth` then using something like this `credentials.myOauth.access_token`.

## Credentials field name

The name of the credentials field inside the `component.json` is used to access OAuth data during the component execution. If for example the field was set to be **myOAuth** inside the component.json then the credentials would be like:

```js
{
     "myOAuth":  {
       "access_token":"2YotnFZFEjr1zCsicMWpAA",
       "token_type":"bearer",
       "expires_in":3600,
       "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA"
     }
}
```
