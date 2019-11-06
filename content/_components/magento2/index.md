---
title: Magento2 component
layout: article
section: E-Commerce components
category: magento2
---

Magento v2 component for the {{site.data.tenant.name}} platform.

## Description

Every form of actions is generated from appropriate Magento2 API endpoint JSONschema. The component is currently compatible with v2.2 and v2.3 of the API, which are the two versions currently supported by Magento.

`sku` - stock keeping unit is product identifier.

### Completeness Matrix
![image](https://user-images.githubusercontent.com/36419533/65947494-b9527080-e438-11e9-993b-744250e4354a.png)

[Magento v2 Completeness Matrix](https://docs.google.com/spreadsheets/d/1dysRw0FrJxF6FJr6syvk74ajBxfQRSYE8LFkvuaB5j4/edit?usp=sharing)

### Purpose

The main purpose of the component is integration some external system with e-commerce platform Magento version 2 

### API links

https://devdocs.magento.com/swagger/

## Credentials

There is implemented [token-based authentication](https://devdocs.magento.com/guides/v2.0/get-started/authentication/gs-authentication-token.html) in component.

1. **Admin Token authorization**: for this option `username` and `password` fields are required, `Integration Token` field should be empty. 
A token is generated for each request.
2. **Integration Token authorization**: for this option `Integration Token` field is required, `username` and `password` fields should be empty.

### Minor Version of Magento

Dropdown list with a minor version of Magento 2. It is possible to select 2.2 or 2.3 version. Required field. 

### Magento Edition

Dropdown list with an edition of Magento 2. It is possible to select `Open source` or `Enterprise` edition. Required field.

### Instance URL

It is needed to specify url of Magento instance like `https://magento.instance.com`. Required field.

### Username

It is needed to specify username. Required in pair with `password` for `Admin Token authorization`.

### Password

It is needed to specify password. Required in pair with `username` for `Admin Token authorization`

### Integration Token

It is needed to specify integration token. Required for `Integration Token authorization`

## Actions

### Custom Request Action

You can do custom request using this action. You should manually specify `method`, `url` and `body`.

#### Expected input metadata

Input metadata contains 3 fields:

**Method** - required, specify request method, you can choose one from currently supported by Magento 2 : `GET`, `POST`, `PUT`, `DELETE`. You also may choose any other new available method is case of Magento 2 API update.

**URL** - required, specify an endpoint for request, for example `V1/products/SKU-1`.

**Body** - object, specify body for request if it needed. For example:

```
{
   'username': 'dummy_user',
   'password': 'password 1'
}
```  
![image](https://user-images.githubusercontent.com/16806832/58162968-d194d080-7c8b-11e9-9037-9e359e225c5c.png)

#### Expected output metadata

Output metadata contains object with property `response`, which contains response data. 
For example:

```
{
   'response': 'token'
}
```  
### Set Inventory Action

This action allows you to set the quantity for an already existing product.

#### Expected input metadata
   
Input metadata contains 3 fields:
   
**sku** - required, specify what product to set.
   
**qty** - required, specify what quantity to set.
   
**is_in_stock** - required, specify if product is in stock.

### Upsert Product Action

You can create new or update existing simple or configurable product and associate with existing child product (for configurable products).

#### List of Expected Config fields

**Product Type** - dropdown list with product type options:

- Simple
- Configurable (Associate with existing child product, single configurable variant)

**Attribute Set** - dropdown list with all existing product attribute sets labels plus an options `Specify attribute set id from incoming message` and `Specify attribute set name from incoming message` to allow this to be populated from incoming message via attribute set id or name.

![image](https://user-images.githubusercontent.com/16806832/58963896-a8f5f600-87b6-11e9-98c0-47d00ecb220f.png)

#### Expected input metadata

Input metadata for simple product:

**SKU** - required, product sku that needs to be created or updated

**Status** - required, products status

**Name** - required, products name

**Weight** - required, products weight

**Visibility** - required, products visibility, enum of visibility labels

**Price** - required, products price

**Attribute Set id** - is present, if configuration field `Attribute Set` equals to `Specify attribute set id from incoming message`

**Attribute Set name** - is present, if configuration field `Attribute Set` equals to `Specify attribute set name from incoming message`

**Attribute** - dropdown list with all attributes labels, is present, if configuration field `Product Type` equals to `Configurable (Associate with existing child product, single configurable variant)`

**Custom Attributes** - object with global custom attributes and custom attributes for each store view

**Child skus** - an array of child SKUs that should be associated with the configurable product. Is present, if configuration field `Product Type` equals to `Configurable (Associate with existing child product, single configurable variant)`
                  
#### Expected output metadata

Output metadata contains created or updated product: [/lib/schemas/upsertProductNew.out.json](/lib/schemas/upsertProductNew.out.json) 
   


### Set order as shipped Action

You can set order as shipped in this action.

#### Expected input metadata

Input metadata contains 2 fields:

**Order Id** - required, specify order id, that needs to be set as shipped.

**skuQtyPairs** - required, array of objects with properties:

**sku** - product sku, than needs to be shipped
   
**qty** - quantity of products, than needs to be shipped

```json
[
   {
         "sku": "testSku",
         "qty": 1
   },
   {
         "sku": "testSku2",
         "qty": 3
   }
]
```

#### Expected output metadata

Output metadata contains object with property `response` with shipment ID. 
For example:

```json
{
   "response": "3"
}
```  

### Set Sales Order External ID

This action allows to set or update Sales Order external ID for existing Order

#### Expected input metadata

**magento_order_id** - required, primary id of Sales Order entity for Magento 2 API.
   
**ext_order_id** - required, specify Sales Order an PID for external system.

```
{
   'magento_order_id': 1,
   'ext_order_id': 'some_external_id'
}
``` 


#### Expected output metadata

Sales Order entity structure

Type|Json schema location
-----------| -------------
|SalesOrder  |[/lib/schemas/setSalesOrderExternalId.out.json](/lib/schemas/setSalesOrderExternalId.out.json)

### Create Invoice Action
   
This action allows you to create an invoice for an already existing order using the order's `entity id`.
      
#### Expected input metadata
   
Input metadata contains 2 fields:
   
**capture** - optional, indicate if payment was received for order. If true, payment was received.
   
**orderEntityID** - required, specify the order's `entity id`.

### Lookup Object by ID
This action allows you to search up one of the object types
- customer
- product
- sales order

by unique criteria.

#### Expected input metadata
Input metadata will take the unique ID and an optional store view code. The store view will be set to `all` by default.

#### Expected output metadata
The expected output will be the given object.

If `allow zero results?` is selected, the component will always return an empty object rather than an error if zero results are found.
If `allow ID to be ommitted` is selected, the ID field will not be required to run the action, but the item emitted by 'zero results found' will still be dependent on the other config field.

### Set Tiered Prices
This action takes an array as input, and therefore can only be used in **developer mode**.

#### Input Metadata
The input metadata is a nested array that takes the following format:
```
   {
   "tieredPrices": [
   {
      "sku": string,                              # SKU for one product
      "prices": [                                 # sets tiered prices for SKU to this array of prices                          
         {
         "price": 100,                           # price (in currency)
         "price_type": "discount",               # either "discount" or "fixed"
         "website_id": "other_website",          # website ID can be given as either a string or an int
         "customer_group": "Retailer",           # Customer group must be given as a string
         "quantity": 45                          
         }
      ]
   }, {
      "sku": string,                              # SKU for one product
      "prices": []                                # providing an empty array will remove all existing tiered prices for this product
   }
   ]
}
```

#### Output Metadata
The output will return an array of all the tiered prices for every SKU where they were changes.
If all tiered prices were removed, the output metadata will be `[]`.

### Upsert Customer

Updates a customer, or creates it if it doesn't exist. To update, you must provide the customer ID and website ID (Associate to Website). To create, do not enter a customer ID; the system will generate one.

* Note: the customer's addresses will be completely overwritten by the provided array of addresses
* Note: custom customer attributes can not be set

#### Expected input metadata

**email** - required, unique email of the customer

**firstname** - required

**lastname** - required

#### Expected output metadata
The output metadata is the created or updated product.

### Delete Object
This action allows you to delete the following object types:
- customer
- product

by unique criteria.

#### Expected input metadata
To delete a customer, input either their customer ID or their email. To delete a product, input the product SKU.

#### Expected output metadata
For customers, the output is their customer ID. For products, the output is its SKU.

## Triggers

### Get New and Updated Objects Polling

Lookup objects polling trigger.

#### Component's configuration:

**Object Type** - required, choose entity type for polling data. Possible options: Customers, Orders, Products.

**Start Time** - optional, indicates the beginning time to start polling from (defaults to the beginning of time).

**End Time** - optional, if provided, don’t fetch records modified after this time (defaults to never).

**Size of Polling Page** - optional, positive integer, indicates the size of pages to be fetched. Defaults to 1000 objects.

**Store View Code** - optional, the dropdown list with all store view codes, is useful for object type `Products`. With this option is possible to retrieve products for defined store view.

![image](https://user-images.githubusercontent.com/16806832/59746223-186fe900-927f-11e9-8847-957082c0ab1a.png)

#### Input Metadata
N/A

#### Output Data
Each object emitted individually.
  
## Known limitations

1. Current component version was tested with Magento2 v2.3.3. Correct component behavior is not guaranteed for other Magento2 versions.
2. Deprecated triggers and actions don't support `Integration Token authorization`, only `Admin Token authorization`.
3. Currently Magento2 has a bug where encoded URI's are not recognised and will throw errors. For example if you have `some/sku`, it 
will be encoded to `some%2Fsku`. However, due to the bug this will throw errors. Refrain from using URI's that have special characters which
are meant to be encoded.
