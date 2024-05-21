---
title: REST API with Arbitrary Token Authentication component
layout: component
section: Utility components
description: A component for REST requests with the ability to generate `Token Code` code in configuration fields.
icon: rest-api-token.png
icontext: REST API with Arbitrary Token Authentication Component
category: rest-api-token
updatedDate: 2022-01-28
ComponentVersion: 1.0.0
---

## Description

The component designed for REST requests with the ability to generate `Token Code` code in configuration fields. This code will execute and generate an object containing two functions `addAuthenticationToRequestOptions` and `getAccessToken` which will then be executed with provided code operations.

## Credentials

* Base URL: If provided, all requests made with the action should be appended to this base URL (account for trailing `/` chars in an intelligent way)
* Config Data: Arbitrary JSON that can store information required to obtain the auth token (e.g. Username, Password, Token URL)
* Token Code: JS Code that when evaluated produces an object with two properties:
    * `async function addAuthenticationToRequestOptions()` which takes one argument `requestOptions`. Function `addAuthenticationToRequestOptions` will modify `requestOptions` so that any additional authentication fields will be placed into `requestOptions`. The code in `addAuthenticationToRequestOptions` will have access to `this.cfg` which will contain all the information stored in the credentials. The code in `addAuthenticationToRequestOptions` will be able to call the async function `this.getTokenAndUpdateCredentials()`. Function `getTokenAndUpdateCredentials()` will call `getAccessToken()` and then save the returned data into the `Tokens` field of the credential.
    * `async function getAccessToken()` will make whatever call(s) is/are needed to obtain the authentication tokens. This function should return a JS object that will then update be placed into the Tokens field of the credential. This function should also be able to call `this.getCredentials()` in order to ensure that the token information is up to date.
Libraries that are available there:
    * axios
    * xml2js
* Tokens: Place to store access tokens & other received metadata (e.g. expiry time)

> **Note:**: *Credentials always verify successfully.* The component is not any system-agnostic. This is why we can't do any meaningful verification.

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### HTTP Request Action

Makes an HTTP request with described parameters and options and parse the response back to the flow.

#### Configuration fields description

* Error Tolerance (dropdown, required): Determines behavior for when an erroneous HTTP code is received. Options are as follows:
    * **No Errors Tolerated**: Any HTTP status code >= 400 should result in an error being thrown
    * **Only Not Found Errors Tolerated**: HTTP status codes of 404, 410 or similar should result in a message being produced with the status code and the HTTP reponse. All other error codes should result in an error being thrown.
    * **None**: Regardless of the HTTP error code, the component should produce an outbound message with the status code and the HTTP reponse.
    * **Manual**: A range of error codes to throw errors on can be configured via the message input.

In this component, authorization generates a token and stores it in JSON-formatted credentials. When some new REST request called, the component looks at the credentials and takes the token from there if it present. If the token is valid, the component makes this request with parameters and with obtained valid token. If the token is not valid, then a new token is generated.

The following diagram shows how REST calls will be handled with request options and how adding an authentication token will be done. When you implement these two functions (`addAuthenticationToRequestOptions()` and `getAccessToken()`) in the REST client, the following will happened:

![image](https://user-images.githubusercontent.com/60236080/148190885-ff935e36-ed4d-4da0-bbe2-fe17396ad1a4.png)

So, as you see, before making request, `addAuthenticationToRequestOptions()` function will be called, and it is your responsibility to implement it.
Function `this.getToken()` (see description bellow) is available here, so our recommendation is to use following code:
```js
async function addAuthenticationToRequestOptions(requestOptions){
  const accessToken = await this.getToken();
  requestOptions.headers.Authorization = `Bearer ${accessToken}`;
}
```

The following diagram describes function `getToken()`:

![image](https://user-images.githubusercontent.com/16806832/149419069-237a0e84-d000-4822-99fc-8ac7b85de438.png)

As you see, `getToken()` function uses function `getTokenAndUpdateCredential()` that are available at `addAuthenticationToRequestOptions()` as well and described bellow.

![image](https://user-images.githubusercontent.com/60236080/148190537-358088a3-0769-441e-983f-e68220bbdafa.png)

As you see, `getTokenAndUpdateCredential()` function uses function `getAccessToken()`, and it is your responsibility to implement it.

>**Please Note**: function `getAccessToken()` should return object with required property: `access_token`. Property `expires_in` is optional and will be used in calculation token expire time.

See code example:
```js
async function getAccessToken() {
  const { tokenUrl, username, password, data } = JSON.parse(this.cfg.configData);
  const requestOptions = {
    url: tokenUrl,
    method: 'POST',
    auth: {
      username,
      password,
    },
    data,
  };
  const response = await this.request(requestOptions);
  if (response.data && response.data.access_token) {
    this.logger.info('Access token is received');
    return response.data;
  }
  throw new Error('The response does not contain access_token, please check your credentials or API');
}
```
Considering all of the above, the `Token Code` can be as follows:
```js
async function run(msg, cfg, snapshot) {
    const addAuthenticationToRequestOptions = async function (requestOptions) {
        const accessToken = await this.getToken();
        requestOptions.headers.Authorization = `Bearer ${accessToken}`;
    };
    const getAccessToken = async function () {
        const { tokenUrl, username, password, data } = JSON.parse(this.cfg.configData);
        const requestOptions = {
            url: tokenUrl,
            method: 'POST',
            auth: {
                username,
                password,
            },
            data,
        };
        const response = await this.request(requestOptions);
        if (response.data && response.data.access_token) {
            this.logger.info('Access token is received');
            return response.data;
        }
        throw new Error('The response does not contain access_token, please check your credentials or API');
    };
    const body = { addAuthenticationToRequestOptions, getAccessToken };
    this.logger.info('Execution finished');
    return body;
}
```

In this case `configData` field should be:

```
"{\"tokenUrl\":\"https://example.com/api/v2/client/tokens\",\"username\":\"username\",\"password\":\"password\",\"data\":\"data\"}"
```

#### Input Metadata description

* Url: Path of the resource relative to the URL base. If there is no URL base, or if then this should be treated as the full URl.
* Method: HTTP Verb for the request.
* HTTP headers: HTTP headers to attach to the request
* Request Body: Body of the request to send
* If **Error Tolerance** is **Manual**:
    * HTTP Codes to throw errors (array of error ranges, optional default to `[]`): A double array with a list of ranges of HTTP response codes to throw errors upon receiving Use a syntax that matches retry-axios. Example: `[[400, 403], [405, 599]]` - Throw errors on all errors apart from 404.

#### Output Metadata description

* Status Code: HTTP status code of the request
* HTTP Headers: HTTP headers of the response
* Response Body: JSON representation of the response body from the request
