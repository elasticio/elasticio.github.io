---
title: PayPal component
layout: component
section: Finance-related components
description: A PayPal component with implementations of actions and triggers based off of the Open Integration Hub (OIH) Standard.
icon: paypal.png
icontext: PayPal component
category: paypal
updatedDate: 2022-03-25
ComponentVersion: 1.0.0
---

## Credentials

To use paypal API you need to **Create App** in [developer account](https://developer.paypal.com/) and use *Client ID* and *Secret* from there, to do this go to:

DASHBOARD -> My Apps & Credentials -> REST API apps:

![PayPal Rest API](img/paypal-rest-api.png)

You will also need to configure your credentials during flow configuration.

![PayPal Credentials](img/paypal-cred.png)

Component credentials configuration Fields:

 * **Environment**  (Dropdown: Production or Sandbox, required) - Indicates what URL base needs to be used `api.sandbox.paypal.com` or `api.paypal.com`
  * **Client ID**  (string, required) - from App
  * **Secret**  (string, required) - from App

## Triggers

This component has no trigger functions. This means it will not be accessible to select as a first component during the integration flow design.

## Actions

### Make Raw Request

Executes custom request

![Make Raw Request](img/make-raw-request.png)

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean) Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required) Path of the resource relative to the base URL.
* **Method** - Allowed values `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, required. HTTP verb to use in the request.
* **Request Body** - (object, optional) Body of the request to send

#### Output Metadata

* **Status Code** - (number, required) HTTP status code of the response, required.
* **HTTP headers** - (object, required) HTTP headers of the response, required.
* **Response Body** - (object, optional) HTTP response body.
