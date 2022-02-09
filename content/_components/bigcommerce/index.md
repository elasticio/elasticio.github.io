---
title: BigCommerce component
layout: component
section: E-Commerce components
description: A component to work with BigCommerce online stores
icon: bigcommerce.png
icontext: BigCommerce Component
category: bigcommerce
updatedDate: 2022-01-28
ComponentVersion: 1.2.0
---

## General information

This is the component for working with BigCommerce online stores on [{{site.data.tenant.name}} platform](http://www.{{site.data.tenant.name}}).

### Purpose

The component allows you to connect to the BigCommerce platform through REST API. For more information about BigCommerce API, visit the [BigCommerce’s official documentation](https://developer.bigcommerce.com/api-docs/getting-started/about-our-api).

## Credentials

To use the BigCommerce connector, you need the following:

### Store hash

Specify your unique ID for store.

### Access Token

The following steps outline how to generate store API Credentials.
1. Navigate to **Advanced Settings > API Accounts > Create API Account.**
1. Give the account a name (it will only be visible to store users).
1. In the **OAuth Scopes** section, select the minimum scopes the app will require.
1. Select **Save**.

[Obtaining store API credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials#obtaining-store-api-credentials)

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Make Raw Request

Executes custom request

#### Config fields

* **Don't throw error on 404 Response** - (boolean, optional) Treat 404 HTTP responses not as error, defaults to `false`.

#### Input field description

* **Method** - (string enum (`GET`,`POST`,`PUT`,`DELETE`, `PATCH`), required): HTTP Verb for the request.
* **URL** - (string, required): Path of the resource relative to the URL base. Mostly starts with API version.
* **Request Body** - (object, optional): Body of the request to send.

#### Output field description

* **Status Code** - (number, required): HTTP status code of the response.
* **Response Body** - (object, optional): JSON representation of the response body from the request.

### Create Object

Creates selected object.
Action creates a single object. Input metadata is stored in the component.

#### Input field description

* **Object type to Create** - a dropdown list where you should choose an object type, which you want to create. E.g. `Product`.

### Update Object

Updates selected object.
Action updates a single object. Input metadata is stored in the component.

#### Input field description

* **Object type to Update** - a dropdown list where you should choose an object type, which you want to create. E.g. `Product`.

#### Limitations

The set of fields to update can be different from the set of fields when the object is creating.

### Delete Object

Deletes selected object by ID.

#### Input field description

* **Object type to Delete** - a dropdown list where you should choose the object type, which you want to delete. E.g. `Product`

#### Metadata description

* **ID** - `string`, BigCommerce object ID

Result is an object with a property **id** in case of successful operation.

### Create a Payment

Action creates a payment for order using one of BigCommerce payment gateways

#### Config fields

None

#### Input Metadata

* **Order ID** (number, required) - Unique order identifier which will be used for the payment, make sure that order `status_id:0` ([more info](https://developer.bigcommerce.com/api-docs/store-management/payment-processing#using-the-orders-api))
* **Payment method ID** (string, required) - Provide payment method, that was configured on platform and supported by order (ex. - `"authorizenet.card"`). Available list can be found using [Get Payment Methods](https://developer.bigcommerce.com/api-reference/store-management/payment-processing/accepted-methods/paymentsmethodsget)
* **Payment Instrument details** (object, required) - Details of the payment

<details close markdown="block">
<summary>
Credit card sample
</summary>
  ```json
    {
      "type": "card",
      "number": "4111111111111111",
      "cardholder_name": "success",
      "expiry_month": 3,
      "expiry_year": 2030,
      "verification_value": "737"
    }
  ```
</details>

<details close markdown="block">
<summary>
Stored card sample
</summary>

  ```json
    {
      "type": "stored_card",
      "token": "050a1e5c982e5905288ec5ec33f292772762033a0704f46fccb16bf1940b51ef",
      "verification_value": "4242"
    }
  ```
    \* You will need the `"token"` from [Get Payment Methods](https://developer.bigcommerce.com/api-reference/store-management/payment-processing/accepted-methods/paymentsmethodsget)
</details>

* **Save Instrument** (boolean, optional) - Should the credit card be saved once used. False by default.

#### Output Metadata

* **status** (number, required) - Http status code
* **data** (object, required) - Data returned from the payment API

#### Limitations

If you provide wrong/unavailable `Payment method ID` system return status 204 without errors and data

### Lookup Object by ID

Lookup an object by ID.

#### Input field description

* **Object type to Lookup** - a dropdown list where you should choose the object type, which you want to lookup. E.g. `Product`
* **Allow ID to be omitted** - checkbox, if checked - ID can be omitted and the empty object will be returned, else - ID is required.
* **Allow zero results** - checkbox, if checked and nothing is found - empty object will be returned, else - action throw an error.

#### Metadata description

* **ID** - `string`, BigCommerce object ID

### Lookup Objects

Lookup objects satisfying specified criteria.

#### Input fields description

* **Object type to Lookup** - a dropdown list where you should choose the object type, which you want to lookup. E.g. `Product`;
* **Output method** - a dropdown list of following values: `Emit all`, `Emit page` and `Emit individually`;
* **Number of search terms** - a text field where you can specify a number of search terms (not less than 0 and not greater than 99). If 0 is specified then all records will be returned.

#### Metadata description

The input metadata can contain different fields depending on the configuration field **Output method** :

**Output method** - `Emit all` or `Emit individually`:
* **Maximum number of records** - an optional positive integer (the default value is 250);

**Output method** - `Emit page`:
* **Page size** - a required integer from the interval [1-250]. It defaults to 250 if a value not from the interval is specified;
* **Page number** - a required non-negative integer (greater than 0); It defaults to 1 if a negative value is specified.

Note that the number of records the component emits may affect the performance of the platform/component.

Groups of fields for each search term go next:

* **Field name** - a string represents a lookup field (a list of allowed values is available);
* **Field value** - a string represents value for selected field.

#### Output

The output data depends on the configuration field **Output method**:  
**Output method** - `Emit all`, `Emit page`: an object with key ```results``` that has an array of records as its value;  
**Output method** - `Emit individually`: a record.

#### Limitations

* Actions expect `Make Raw Request` are not fully tested, use them on your own risk only.
* Between each two term's group of fields implicitly applied "AND" logic.
* The maximum number of `Products` returned is 250.
[More about filtering](https://developer.bigcommerce.com/api-docs/getting-started/filtering)
