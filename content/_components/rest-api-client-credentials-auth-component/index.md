---
title: Rest API OAuth2 Client Credentials Component
layout: component
section: Utility components
description: A component that can make REST calls while using OAuth2 Client Credentials Auth Grant Type.
icon: rest-api-client-credentials-auth-component.png
icontext: Rest API OAuth2 Client Credentials Component
category: rest-api-client
updatedDate: 2021-11-26
ComponentVersion: 1.0.0
---

## General information

### Description

Component that can make REST calls while using `OAuth2` Client Credentials Auth Grant Type.

More details about OAuth2 Client Credentials Auth Grant Type:

[Client Credentials Auth Overview](https://datatracker.ietf.org/doc/html/rfc6749#section-1.3.4)

[Client Credentials Auth Specifics](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4)

### Environment variables

Component does not use any environment variables

## Credentials

 * Token URL (required): Full URL from which to retrieve the access token
 * Username (required)
 * Password (required)
 * Base URL (optional): If provided, all requests made with the action should be appended to this base URL (account for trailing / chars in an intelligent way)
 * Scopes (optional): CSV List of scopes to ask for. Example: `client,users`
 * Additional Properties (optional): Comma separated list of additional properties. Each property should have key and value with `:` (example: `client_id:123`)
 * Tokens (JSON String, optional): Place to store access tokens & other received metadata (e.g. expiry time).

> Example: `"{\"access_token\":\"access_token_value\",\"token_type\":\"bearer\",\"expires_in\":86400,\"tokenExpiryTime\":\"2021-11-11T23:18:00.470Z\"}"`

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### HTTP request

#### Config Fields

* Error Tolerance (dropdown, required): Determines behavior for when an erroneous HTTP code is received. Options are as follows:
    * **No Errors Tolerated**: Any HTTP status code >= 400 should result in an error being thrown
    * **Only Not Found Errors Tolerated**: HTTP status codes of 404, 410 or similar should result in a message being produced with the status code and the HTTP reponse. All other error codes should result in an error being thrown.
    * **None**: Regardless of the HTTP error code, the component should produce an outbound message with the status code and the HTTP response.
    * **Manual**: A range of error codes to throw errors on can be configured via the message input.

#### Input Metadata

 * Url (string, required): Path of the resource relative to the URL base. If there is no URL base, or if then this should be treated as the full URl.
 * Method (string enum, required): HTTP Verb for the request.
 * HTTP headers (object, optional): HTTP headers to attach to the request
 * Request Body (object, optional): Body of the request to send
 * If **Error Tolerance** is **Manual**:
    * HTTP Codes to throw errors (array of error ranges, optional default to `[]`): A double array with a list of ranges of HTTP response codes to throw errors upon receiving Use a syntax that matches retry-axios. Example: `[[400, 403], [405,599]]` - Throw errors on all errors apart from 404.
 If array is empty, no error would be thrown, produce an outbound message with the status code and the HTTP response.


#### Output Metadata

* Status Code (integer, required): HTTP status code of the request
* HTTP Headers (object, optional): HTTP headers of the response
* Response Body (object, optional): JSON representation of the response body from the request

## Known Limitations

Please note that for the functionality to save and update the token to work correctly, the platform user must have `workspaces.credential.edit` permission (see [API docs]({{site.data.tenant.apiDocsUri}}/v2#/credentials/patch_credentials__credential_id_)).
