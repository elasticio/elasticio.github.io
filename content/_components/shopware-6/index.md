---
title: Shopware 6  component
layout: component
section: E-Commerce components
description: A component to work with Shopware API.
icon: shopware.png
category: shopware-6
icontext: Shopware-6 component
updatedDate: 2022-08-12
ComponentVersion: 1.0.0
---

## Credentials

Component credentials configuration fields:

* **API Base URI**  (string, required) - Indicates what URL base needs to be used
* **Username**  (string, required)
* **Password**  (string, required)

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Make Raw Request

Executes custom request.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.
