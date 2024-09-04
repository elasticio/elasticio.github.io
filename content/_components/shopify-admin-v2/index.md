---
title: Shopify Admin v2 component
layout: component
section: E-Commerce components
description: Shopify admin Component is designed to connect to Shopify GraphQL Admin API.
icon: shopify-admin-v2.png
icontext: Shopify Admin v2 component
category: shopify-admin-v2
updatedDate: 2024-09-05
ComponentVersion: 2.5.0
---

# Shopify admin Component

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Delete Object](#delete-object)
  * [Create Object](#create-object)
  * [Update Object](#update-object)
  * [Upsert Object](#upsert-object)
  * [Execute mutation](#execute-mutation)
  * [Lookup Objects (plural)](#lookup-objects-plural)
  * [Lookup Object By ID](#lookup-object-by-id)
  * [Make Raw Request](#make-raw-request)
* [Triggers](#triggers)
  * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
  * [Webhook](#webhook)
* [Known Limitations](#known-limitations)

## Description

Shopify admin Component is designed to connect to Shopify [GraphQL](https://shopify.dev/api/admin-graphql) Admin API

Tested with API version: `2023-01`

## Credentials

To use this component you need to create a custom App:
1. Go to your store [Admin panel](https://accounts.shopify.com/store-login)
2. Open `App and sales channel settings`
3. Select `Develop apps for your store`
4. Then `Create an app` button
5. Provide any app name and press `Create app`
6. Follow to `Configure Admin API scopes`
7. Select access scopes - Objects, that component will have access to and press `Save`
8. Now you be able to install this app by pressing `Install app` button in `API credentials` section or in right upper corner
9. Finally you can get `Admin API access token` by selecting `Reveal token once`. It will be needed in component credentials configuration
10. In addition, you may need to save `API secret key` if you going to use webhooks

Screenshot instructions

![image](https://user-images.githubusercontent.com/7985390/212651871-ec4b3a9c-796d-426a-b0f6-3211158eb8fd.png)
![image](https://user-images.githubusercontent.com/7985390/212652427-7ad69efe-b0dc-43d8-9ee7-0644dc6c3eca.png)
![image](https://user-images.githubusercontent.com/7985390/212652928-43d652bf-ffa7-41d8-93c1-8be51651ac51.png)
![image](https://user-images.githubusercontent.com/7985390/212653313-3118a627-8e98-4fa6-8ea4-d71d2e4cf4c2.png)
![image](https://user-images.githubusercontent.com/7985390/212653733-cddae330-d291-4d53-a49b-fc021d804d90.png)
![image](https://user-images.githubusercontent.com/7985390/212654589-0527a2ce-0b60-4cf7-875f-5d599cf580a8.png)
![image](https://user-images.githubusercontent.com/7985390/212654890-3d25d9fb-55db-45f7-bcd0-5b991d78c7c7.png)
![image](https://user-images.githubusercontent.com/7985390/212655979-354a7e97-536c-4cc0-82bf-aeccb279f96a.png)


Component credentials configuration fields:
* **Store name** (string, required) - Provide you store name here, can be found in [Admin panel](https://accounts.shopify.com/store-login) as a part of store url ![image](https://user-images.githubusercontent.com/7985390/212658330-bd1789dd-e7b6-4afb-ae0c-63464a773eb1.png)
* **Admin API access token** (string, required) - this token you will get after app creation (look at instructions above)
* **API version** (string, required) - Provide API version you are going to work with. Currently component tested on `2023-01`, but should work with any available
* **API secret key** (string, optional) - This field is used and required **only** for trigger - `Webhook` to [sign the request with an HMAC header](https://shopify.dev/apps/webhooks/configuration/https#step-5-verify-the-webhook).
## Notes:
* `Admin API access token` shows only once
* To rotate the API credentials for a custom app that was created in the Shopify admin, you need to uninstall and reinstall the app

## Actions

### Delete Object

Objects in Shopify can be deleted with [Execute mutation action](#execute-mutation)


To do that, filter the list of available mutation types in the `Mutation type` configuration field by `Delete` or `Remove` keyword

![image](https://user-images.githubusercontent.com/7985390/219295785-04e58f75-3ee5-476f-8c9d-96e6784e7a19.png)

In most cases you will get one input metadata field with object identifier
![image](https://user-images.githubusercontent.com/7985390/219296219-32cdf0d0-b246-46d3-8610-a33acef6e651.png)

  Example of input metadata to delete a customer


  ``` json
  {
    "input": {
      "id": "gid://shopify/Customer/6657016299696"
    }
  }
  ```

  Example of input metadata to delete multiple companies

  ``` json
  {
    "companyIds": ["gid://shopify/Company/68616368"]
  }
  ```

  Example of input metadata to bulk delete draft orders using search

  ``` json
{
  "search": "query=name:\"#D12\""
}
  ```


### Create Object

Objects in Shopify can be created with [Execute mutation action](#execute-mutation)


To do that, filter the list of available mutation types in the `Mutation type` configuration field by `Create` keyword

![image](https://user-images.githubusercontent.com/7985390/219297221-87962b48-16ed-4a8b-9fe3-8e2c1fce7e9d.png)

Input metadata will represent all needed fields to create an object


  Example of input metadata to create a customer


  ``` json
  {
    "input": {
      "firstName": "NewUser"
    }
  }
  ```


### Update Object

Objects in Shopify can be updated with [Execute mutation action](#execute-mutation)


To do that, filter the list of available mutation types in the `Mutation type` configuration field by `Update` keyword

![image](https://user-images.githubusercontent.com/7985390/219297654-ba6b36cb-e465-4a7e-b797-ee9717788bff.png)

Input metadata will represent all needed fields to update an object


  Example of input metadata to update a customer


  ``` json
  {
    "input": {
      "firstName": "NewUser2",
      "id": "gid://shopify/Customer/6664472461488"
    }
  }
  ```


### Upsert Object

Updates (of record found) or creates a new object.

#### Configuration Fields

* **Object type** - (dropdown, required): Currently supported only `Customers`.
* **Unique field to upsert** - (dropdown, required): This field will be used to search object, if object not found or field is empty, new object will be created.
* **Select basic fields for resulting object** - (dropdown, optional): Here provided only basic fields that can be included in resulting object, it may affect on query cost
* **You can provide additional fields here** - (string, optional): Resulting object can be expanded using GraphQL request, it may affect on query cost
  Example for customer

  ```
    customer {
      addresses {
        city
      }
    }
  ```

  ❗Note: You need to select basic fields or provide additional fields for resulting object to execute mutation
* **Input as batch** - (checkbox, optional): If checked, the input metadata will be an array instead of a single object

#### Input Metadata

Dynamically generated fields according to chosen `Object type`.

#### Output Metadata

Result object from upsert.

### Execute mutation

Execute any mutation available on selected API version. This action can be used to `Create`, `Update` or `Delete` Objects and any other operations that affect on Shopify data

#### Configuration Fields

* **Mutation type** - (dropdown, required): Mutation type to execute. E.g `Customer Create`.
* **Select basic fields for resulting object** - (dropdown, optional): Here provided only basic fields that can be included in resulting object, it may affect on query cost
* **You can provide additional fields here** - (string, optional): Resulting object can be expanded using GraphQL request, it may affect on query cost
  Example for customer

  ```
    customer {
      metafields(first: 2) {
        edges {
          node {
            namespace
            key
            value
          }
        }
      }
      addresses {
        address1
        country
      }
    }
  ```

❗Note: You need to select basic fields or provide additional fields for resulting object to execute mutation

#### Input Metadata

Dynamically generated fields according to chosen `Mutation type`.

#### Output Metadata

Result object from executed mutation.

### Lookup Objects (plural)

Lookup a set of objects by defined criteria list. Can be emitted in different way.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to lookup on. E.g `Customers`.
* **Select basic fields for resulting object** - (dropdown, optional): Here provided only basic fields that can be included in resulting object, it may affect on query cost
* **You can provide additional fields here** - (string, optional): Resulting object can be expanded using GraphQL request, it may affect on query cost
  Example for customer

  ```
      addresses {
        address1
        country
      }
  ```

* **Emit Behavior** - (dropdown, required): Defines the way result objects will be emitted, one of `Emit page` or `Emit individually`.
* **Return Full Response** - (checkbox): Defines the format of emitted result: with service information or without.
Examples for Object type `customers` are given below:
  Response with enabled `Return Full Response` checkbox and `Emit Behavior` = `Emit page`

  ```json
  {
      "data": {
        "customers": [
          {
            "id": "gid://shopify/Customer/2444144115794",
            "firstName": "Willy"
          },
          {
            "id": "gid://shopify/Customer/2444144148562",
            "firstName": "Tobi"
          },
          {
            "id": "gid://shopify/Customer/2444144181330",
            "firstName": "Mathilde"
          }
        ]
      },
      "extensions": {
        "cost": {
          "requestedQueryCost": 5,
          "actualQueryCost": 5,
          "throttleStatus": {
            "maximumAvailable": 1000,
            "currentlyAvailable": 40,
            "restoreRate": 50
          }
        }
      }
  }
  ```


  Response with disabled `Return Full Response` checkbox and `Emit Behavior` = `Emit page`

  ```json
  {
    "results": [
      {
        "id": "gid://shopify/Customer/2444144115794",
        "firstName": "Willy"
      },
      {
        "id": "gid://shopify/Customer/2444144148562",
        "firstName": "Tobi"
      },
      {
        "id": "gid://shopify/Customer/2444144181330",
        "firstName": "Mathilde"
      }
    ]
  }
  ```


* **Number of search terms** - (number, optional): text field to specify the number of search terms (positive integer number [1-99] or 0).
* **Emit empty object if no entities found** - (checkbox): If this checkbox is selected and objects are not found component will emit an empty object instead of skipping execution

#### Input Metadata

* **First** - (strings, optional): Indicates amount of objects per execution. Default to 250
  Input Metadata is depending on the configuration field `Number of search terms`.
  If `Number of search terms` is empty or equal `0`, additional fields will not be generated.
  If `Number of search terms` = 1, one search term will be added to metadata.
  If `Number of search terms` > 1, a number of search term equal `Number of search terms` and a number of criteria link equal 'Number of search terms - 1' will de created in metadata.
  Each search term has 3 fields:
* **Field name** - chosen entity's field name. You need to select the one field from Allowed Values section
  **Note** Allowed Values section contains fields that are allowed to use in query and fields with `-` sign, which means `NOT` modifier (see [here](https://shopify.dev/docs/api/usage/search-syntax#modifiers))
* **Condition** - You need to select the one condition from Allowed Values section
* **Field value** - the value that the field must match with the specified condition
  Between search terms, there is Criteria Link. You need to select the one criteria from Allowed Values section


#### Output Metadata

Dynamically generated fields according to chosen `Object type` and selected fields.
For `Emit Page` mode: An object, with key `results` that has an array as its value.
For `Emit Individually` mode: Each object which fill the entire message.

#### Example
For instance, it is needed to execute following Shopify query:
```
query{
    customers(first:10 query:"country:Canada AND -state:DISABLED"){
        edges{
            node{
                id
                state
                firstName
                addresses{
                    country
                }
            }
        }
    }
}
```
1. Select in `Object type` option `Customers`
   <img width="954" alt="image" src="https://user-images.githubusercontent.com/16806832/219673802-6bbc3d28-76c5-4d91-b72b-0050970501dd.png">

2. From dropdown `Select basic fields for resulting object` select basic fields: `id`, `state` and `firstName`.
   <img width="949" alt="image" src="https://user-images.githubusercontent.com/16806832/219674757-44160d5f-4d31-4ad8-bcd3-e8ffa7011421.png">

**Note**: Basic fields are fields that can be requested without specifying arguments or adding additional levels: `id`, `email`, etc.

3. Paste additional fields in field `You can provide additional fields here`:
   <img width="950" alt="image" src="https://user-images.githubusercontent.com/16806832/219675558-ae13cd53-90be-472c-875b-2863a9d976ff.png">

**Note**: Additional fields are fields that can't be selected in `Basic fields` section. As rule, they are fields with specifying arguments or adding additional levels such as: `addresses{country}`.

4. Select `Emit Behavior`. If it is needed to receive each object individually, use `Emit individually`, in other case, `Emit page` option - all objects will be returned in one array `result`. For example, lets use 'Emit individually'
   <img width="938" alt="image" src="https://user-images.githubusercontent.com/16806832/219677482-c64e97d7-d525-43b8-b5ce-ac5e4fde85ac.png">

5. Specify `Number of search terms`: in example query we see 2 conditions, so set it to `2`
   <img width="939" alt="image" src="https://user-images.githubusercontent.com/16806832/219677761-82c53744-4203-4597-9b46-032a6248df8f.png">

6. Push the button `Continue` and move to fill metadata

7. Set `10` to field `First`
   <img width="959" alt="image" src="https://user-images.githubusercontent.com/16806832/219678472-08e02d21-6f52-4b11-a938-448eb56960cd.png">

8. To map condition `country:Canada`:

- select in `Field name` from Allowed Values dropdown option `country`:
  <img width="937" alt="image" src="https://user-images.githubusercontent.com/16806832/219679275-fdbbb0a4-54e1-442c-b3f7-ec70a13dc7de.png">

- select in `Condition` from Allowed Values dropdown option `:`
- set in `Field value` value `Canada`

<img width="953" alt="image" src="https://user-images.githubusercontent.com/16806832/219678848-e9bbce6f-373b-4fe9-bee6-5b27fa8f83f9.png">

9. Select in `Logical operator` from Allowed Values dropdown option `AND`
10. To map condition `-state:DISABLED`: set `Field name` to `-state`, `Condition` to `:` and `Field value` to `DISABLED`

<img width="955" alt="image" src="https://user-images.githubusercontent.com/16806832/219681436-e1e56a02-0350-47ab-a878-42e829cba8b1.png">

11. Push the button `Continue` and move to `Sample` section
12. Push the button `Retrieve new sample from Shopify admin component v2`
13. Step is configured.

### Lookup Object By ID

Lookup a single object by its ID - only query with one argument `id` can be used in this action.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to lookup on. E.g `Customer`.
* **Select basic fields for resulting object** - (dropdown, optional): Here provided only basic fields that can be included in resulting object, it may affect on query cost
* **You can provide additional fields here** - (string, optional): Resulting object can be expanded using GraphQL request, it may affect on query cost
  Example for customer

  ```
      addresses {
        address1
        country
      }
  ```


<img width="707" alt="image" src="https://user-images.githubusercontent.com/16806832/218702111-f59d8189-5ac4-4d56-b43b-6e7c4ad5b54c.png">

#### Input Metadata

* **ID Value** - (string, required): Value for ID of the object to lookup.

#### Output Metadata

Dynamically generated fields according to chosen `Object type` and selected fields.

### Make Raw Request

Executes custom request.

#### Configuration Fields

none

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL (`https://{store_name}.myshopify.com/admin/api/{api_version}/`) or full url
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

**Note**: GraphQL and REST API endpoints are supported. E.g.

GraphQL

* **Url** - `/graphql.json`
* **Method** - `POST`
* **Request Body** - `{"query": "query { products(first: 10) { edges { node { id title } } } }"}`

Equivalent to this:

REST

* **Url** - `/products.json?fields=id,title`
* **Method** - `POST`
* **Request Body** - *empty

## Triggers

### Get New and Updated Objects Polling

Retrieve all the updated or created objects within a given time range.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to lookup on. E.g `Customers`.

* **Timestamp field to poll on** - (dropdown, required): Can be either Last Modified or Created dates (updated or new objects, respectively)

* **Select basic fields for resulting object** - (dropdown, optional): Here provided only basic fields that can be included in resulting object, it may affect on query cost
* **You can provide additional fields here** - (string, optional): Resulting object can be expanded using GraphQL request, this field represent content from each `edges.node`, it may affect on query cost
  Example for Customers

  ```
    metafields(first: 2) {
      edges {
        node {
          namespace
          key
          value
        }
      }
    }
    addresses {
      address1
      country
    }
  ```
   
* **Size of Polling Page** - (optional, positive integer, defaults to 250, max 250): Indicates the size of pages to be fetched per request. If you query cost will be over shop limit, you can decrease page size.
* **Emit behavior** - (dropdown, optional): Indicates emit objects behavior - `Emit individually` (by default) or `Emit page`
* **Return Full Response** - (checkbox): Defines the format of emitted result: with service information or without.
  Examples for Object type `customers` are given below:
Response with enabled `Return Full Response` checkbox and `Emit Behavior` = `Emit page`

```json
{
    "data": {
      "customers": [
        {
          "id": "gid://shopify/Customer/2444144115794",
          "firstName": "Willy"
        },
        {
          "id": "gid://shopify/Customer/2444144148562",
          "firstName": "Tobi"
        },
        {
          "id": "gid://shopify/Customer/2444144181330",
          "firstName": "Mathilde"
        }
      ]
    },
    "extensions": {
      "cost": {
        "requestedQueryCost": 5,
        "actualQueryCost": 5,
        "throttleStatus": {
          "maximumAvailable": 1000,
          "currentlyAvailable": 40,
          "restoreRate": 50
        }
      }
    }
}
```


Response with disabled `Return Full Response` checkbox and `Emit Behavior` = `Emit page`

```json
{
  "results": [
    {
      "id": "gid://shopify/Customer/2444144115794",
      "firstName": "Willy"
    },
    {
      "id": "gid://shopify/Customer/2444144148562",
      "firstName": "Tobi"
    },
    {
      "id": "gid://shopify/Customer/2444144181330",
      "firstName": "Mathilde"
    }
  ]
}
```


* **Start Time** - (string, optional): The timestamp, in ISO8601 format, to start polling from (inclusive). Default value is the beginning of time (January 1, 1970 at 00:00.000).
* **End Time** - (string, optional): The timestamp, in ISO8601 format, to end at (inclusive). Default value is never.


#### Input Metadata

None.

#### Output Metadata
Resulting object will represent content from path "data\\{Object Type}\\edges\node"

Depends on selected `Object Type`, selected or provided fields and `Emit behavior`:
For `Emit Page` mode: An object with key `results` that has an array as its value (if `Page Size` > 0)
For `Emit Individually` mode: Each object which fill the entire message.


### Webhook

Creates [webhook subscription](https://shopify.dev/docs/api/admin-graphql/2024-01/mutations/webhookSubscriptionCreate) for selected topics on the Shopify side to receive events

#### Configuration Fields

* **Select topics** - (multi-select dropdown, required): Select available topics to create a subscription
* **Skip validation** - (checkbox, optional): If checked - the component will not validate the incoming message to be sure that it comes from Shopify, use it for test purposes only!

#### Input Metadata

None.

#### Output Metadata
Event from the subscription on the selected topic

#### Limitations
* **Generate Stub Sample** works only for the most used objects
* This trigger doesn't support `Retrieve sample` functionality
* If you use ordinary flow (`real-time` not enabled) after flow starts you will need to run it once - just follow the webhook URL (to make the first execution) this action will create a subscription, error on this execution may be ignored

## Known limitations
* Look at [Shopify API rate limits](https://shopify.dev/api/usage/rate-limits), specially [GraphQL Admin API rate limits](https://shopify.dev/api/usage/rate-limits#graphql-admin-api-rate-limits)
* If the component reaches API rate limit it will retry the request after waiting until the queue is restored up to 10 times: for example - a query costs `500` points, currently available only `100` points, the restore rate `50` points/second, the component will wait `8` seconds until available points will be restored and try again to get data

  Be careful with several flows running at the same time, each of them can affect on total available points, if the component won't be able to get data after 10 retries, then the error `"Throttled"` will be thrown
