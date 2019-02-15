---
title: Lightspeed-ecom component
layout: article
section: Utility Components
---

## Description

Lightspeed ECom API component for elastic.io iPaaS.

## Authentication

You should request API keys for your shop (`api_key` & `api_secret`) via ticket to support.

Authentication is managed via HTTP authentication. There are several clusters which your app can be installed on. During the installation you should get the `cluster_id`. Please make sure you specify API requests to the correct cluster URL.

**Cluster URLs**
There are two clusters which your app can be installed on. During the installation we send you the `cluster_id`. Please make sure you send API requests to the correct cluster.

**CLUSTERS**
```
eu1 https://api.webshopapp.com/
us1 https://api.shoplightspeed.com/
```

## Credentials

![image](https://user-images.githubusercontent.com/40201204/50343143-833da300-052e-11e9-84be-ccb19eb4f7d1.png)

### Environment URL
Url of the Lightspeed eCom cluster.
Fro example,
- for EU: `api.webshopapp.com`
- for US: `api.shoplightspeed.com`

### Environment language
Lightspeed eCom shop language.

### Client ID
API Key which you received from support during configuration a shop.

### Client Secret
API Secret which you received from support during configuration a shop.

## Triggers

### Polling entity

This trigger polls for existing and updated objects where you can select object type.

![image](https://user-images.githubusercontent.com/40201204/50344276-04973480-0533-11e9-9ac5-c0aa38a7f2ab.png)

#### Input fields description
* **Object Type** - you should select the type of object which updates you want to get.
* **Polling Field** - you can use any field existing at current object, which has datatype like DATE, DATETIME or TIMESTAMP.
* **Batch Size for request pagination** - count of entries which you will get by one request ().

Supported entities:
* attributes
* blogs
* brands
* catalog
* categories
* contacts
* countries
* customers
* dashboard
* deliverydates
* discounts
* events
* external_services
* filters
* groups
* invoices
* languages
* metafields
* orders
* paymentmethods
* products
* quotes
* redirects
* returns
* reviews
* sets
* shipments
* shippingmethods
* shop
* subscriptions
* suppliers
* tags
* taxes
* textpages
* tickets
* time
* types
* variants

### Webhook subscription

![image](https://user-images.githubusercontent.com/40201204/50344997-19c19280-0536-11e9-8c40-f7060ee84cec.png)

#### Input fields description
* **Object Type** - you should select the type of object to make a subscription.

Supported entities:
* contacts
* customers
* invoices
* orders
* products
* quotes
* returns
* reviews
* shipments
* shop
* subscriptions
* tickets
* variants

## Actions

### Create Object

Action creates a new record/object. This action is supported by limited list of entities.

![image](https://user-images.githubusercontent.com/40201204/50345067-5bead400-0536-11e9-91b6-d04615a376d2.png)

#### Input fields description
* **Object type** - you should select the type of object which updates you want to get.

Supported entities:
* attributes
* blogs
* brands
* categories
* customers
* deliverydates
* discounts
* external_services
* filters
* groups
* metafields
* products
* quotes
* redirects
* returns
* reviews
* sets
* subscriptions
* suppliers
* tags
* taxes
* textpages
* tickets
* types
* variants

### Upsert Object

Action creates a new object or updates object which already exists by provided ID. This action is supported by limited list of entities.

![image](https://user-images.githubusercontent.com/40201204/50345067-5bead400-0536-11e9-91b6-d04615a376d2.png)

#### Input fields description
* **Object type** - you should select the type of object which updates you want to get.

Supported entities:
* attributes
* blogs
* brands
* categories
* customers
* deliverydates
* discounts
* external_services
* filters
* groups
* invoices
* metafields
* orders
* products
* quotes
* redirects
* returns
* reviews
* sets
* shipments
* subscriptions
* suppliers
* tags
* taxes
* textpages
* tickets
* types
* variants

### Update Object

Action updates object which already exists by provided ID. This action is supported by limited list of entities.

![image](https://user-images.githubusercontent.com/40201204/50345067-5bead400-0536-11e9-91b6-d04615a376d2.png)

Supported entities:
* attributes
* blogs
* brands
* categories
* customers
* deliverydates
* discounts
* external_services
* filters
* groups
* invoices
* metafields
* orders
* products
* quotes
* redirects
* returns
* reviews
* sets
* shipments
* subscriptions
* suppliers
* tags
* textpages
* tickets
* types
* variants

#### Input fields description
* **Object type** - you should select the type of object which updates you want to get.

Supported entities:


### Lookup Object By ID

Action gets a list of objects by filters or specific object by provided ID.

![image](https://user-images.githubusercontent.com/40201204/50345067-5bead400-0536-11e9-91b6-d04615a376d2.png)

#### Input fields description
* **Object type** - you should select the type of object which updates you want to get.

Supported entities:
* attributes
* blogs
* brands
* catalog
* categories
* contacts
* countries
* customers
* dashboard
* deliverydates
* discounts
* events
* external_services
* filters
* groups
* invoices
* languages
* metafields
* orders
* paymentmethods
* products
* quotes
* redirects
* returns
* reviews
* sets
* shipments
* shippingmethods
* shop
* subscriptions
* suppliers
* tags
* taxes
* textpages
* tickets
* time
* types
* variants

### Delete Object By ID

Action removes object which already exists by provided ID.

![image](https://user-images.githubusercontent.com/40201204/50345067-5bead400-0536-11e9-91b6-d04615a376d2.png)

#### Input fields description
* **Object type** - you should select the type of object which updates you want to get.

Supported entities:
* attributes
* blogs
* brands
* categories
* customers
* deliverydates
* discounts
* external_services
* filters
* groups
* metafields
* products
* redirects
* reviews
* sets
* subscriptions
* suppliers
* tags
* taxes
* textpages
* tickets
* types
* variants
* webhooks

## Additional info

### Pagination

The component is providing request of a whole list of an entity by iterative API requests without user intervention.

A bit of theory:

Lightspeed eCom API limits the number of returned objects to `50` by default and `250` as max. When requesting large data sets it may be necessary to send multiple requests to retrieve all of the data. The meta-dictionary that’s returned tells the current page, and if there’s another page of results after this one, the next entry gives you the URL where it can be fetched.
Depending on the structure of your data, it’s possible that the API may not be able to return the number of resources requested before a HTTP 504 (Gateway Timeout) happens. For example, if your first 100 orders have 1,000 line items each, you might hit a 429 when trying to fetch them.
You can control the page size for a GET request with the limit parameter.

Coming back to the component:

In the component, at the `Polling Trigger` configuration you can configure count of fetching results per page by an appropriate configuration field.
If you notice that 429s are coming back, you should reduce the limit until you start getting 200s. A sensible strategy for this is probably to iteratively halve the page size until you stop getting 429s.

## Known limitations

The current version of the component doesn't support next list of entities:
-   [Account Metafields](https://developers.lightspeedhq.com/ecom/endpoints/accountmetafield/)
-   [Account Permissions](https://developers.lightspeedhq.com/ecom/endpoints/accountpermissions/)
-   [Account Rate limits](https://developers.lightspeedhq.com/ecom/endpoints/accountratelimit/)
-   [Blog article](https://developers.lightspeedhq.com/ecom/endpoints/blogarticle/)
-   [Blog article image](https://developers.lightspeedhq.com/ecom/endpoints/blogarticleimage/)
-   [Blog article tag](https://developers.lightspeedhq.com/ecom/endpoints/blogarticletag/)
-   [Blog comment](https://developers.lightspeedhq.com/ecom/endpoints/blogcomment/)
-   [Blog tag](https://developers.lightspeedhq.com/ecom/endpoints/blogtag/)
-   [Brand image](https://developers.lightspeedhq.com/ecom/endpoints/brandimage/)
-   [CategoryImage](https://developers.lightspeedhq.com/ecom/endpoints/categoryimage/)
-   [CategoriesProduct](https://developers.lightspeedhq.com/ecom/endpoints/categoryproduct/)
-   [CustomerLogin](https://developers.lightspeedhq.com/ecom/endpoints/customerlogin/)
-   [CustomerMetafield](https://developers.lightspeedhq.com/ecom/endpoints/customermetafield/)
-   [DeliveryDate](https://developers.lightspeedhq.com/ecom/endpoints/deliverydate/)
-   [Discount Rules](https://developers.lightspeedhq.com/ecom/endpoints/discountrules/)
-   [ExternalService](https://developers.lightspeedhq.com/ecom/endpoints/externalservice/)
-   [File](https://developers.lightspeedhq.com/ecom/endpoints/file/)
-   [FilterValue](https://developers.lightspeedhq.com/ecom/endpoints/filtervalue/)
-   [GroupsCustomer](https://developers.lightspeedhq.com/ecom/endpoints/groupscustomer/)
-   [InvoiceItem](https://developers.lightspeedhq.com/ecom/endpoints/invoiceitem/)
-   [InvoiceMetafield](https://developers.lightspeedhq.com/ecom/endpoints/invoicemetafield/)
-   [OrderCredit](https://developers.lightspeedhq.com/ecom/endpoints/ordercredit/)
-   [OrderCustomstatus](https://developers.lightspeedhq.com/ecom/endpoints/ordercustomstatus/)
-   [OrderEvent](https://developers.lightspeedhq.com/ecom/endpoints/orderevent/)
-   [OrderMetafield](https://developers.lightspeedhq.com/ecom/endpoints/ordermetafield/)
-   [OrderProduct](https://developers.lightspeedhq.com/ecom/endpoints/orderproduct/)
-   [Paymentmethod](https://developers.lightspeedhq.com/ecom/endpoints/paymentmethod/)
-   [ProductAttribute](https://developers.lightspeedhq.com/ecom/endpoints/productattribute/)
-   [ProductFilterValue](https://developers.lightspeedhq.com/ecom/endpoints/productfiltervalue/)
-   [ProductImage](https://developers.lightspeedhq.com/ecom/endpoints/productimage/)
-   [ProductMetafield](https://developers.lightspeedhq.com/ecom/endpoints/productmetafield/)
-   [ProductRelation](https://developers.lightspeedhq.com/ecom/endpoints/productrelation/)
-   [QuotePaymentmethod](https://developers.lightspeedhq.com/ecom/endpoints/quotepaymentmethod/)
-   [QuoteProduct](https://developers.lightspeedhq.com/ecom/endpoints/quoteproduct/)
-   [QuoteShippingmethod](https://developers.lightspeedhq.com/ecom/endpoints/quoteshippingmethod/)
-   [ShipmentMetafield](https://developers.lightspeedhq.com/ecom/endpoints/shipmentmetafield/)
-   [ShipmentProduct](https://developers.lightspeedhq.com/ecom/endpoints/shipmentproduct/)
-   [Shippingmethod](https://developers.lightspeedhq.com/ecom/endpoints/shippingmethod/)
-   [ShippingmethodCountry](https://developers.lightspeedhq.com/ecom/endpoints/shippingmethodcountry/)
-   [ShippingmethodValue](https://developers.lightspeedhq.com/ecom/endpoints/shippingmethodvalue/)
-   [ShopCompany](https://developers.lightspeedhq.com/ecom/endpoints/shopcompany/)
-   [ShopJavascript](https://developers.lightspeedhq.com/ecom/endpoints/shopjavascript/)
-   [ShopLimits](https://developers.lightspeedhq.com/ecom/endpoints/shoplimits/)
-   [ShopMetafield](https://developers.lightspeedhq.com/ecom/endpoints/shopmetafield/)
-   [ShopScript](https://developers.lightspeedhq.com/ecom/endpoints/shopscript/)
-   [ShopTracking](https://developers.lightspeedhq.com/ecom/endpoints/shoptracking/)
-   [ShopWebsite](https://developers.lightspeedhq.com/ecom/endpoints/shopwebsite/)
-   [SingleSignOn](https://developers.lightspeedhq.com/ecom/endpoints/singlesignon/)
-   [Subscription](https://developers.lightspeedhq.com/ecom/endpoints/subscription/)
-   [TagsProduct](https://developers.lightspeedhq.com/ecom/endpoints/tagsproduct/)
-   [Taxoverride](https://developers.lightspeedhq.com/ecom/endpoints/taxoverride/)
-   [Textpage](https://developers.lightspeedhq.com/ecom/endpoints/textpage/)
-   [ThemeCategory](https://developers.lightspeedhq.com/ecom/endpoints/themecategory/)
-   [ThemeProduct](https://developers.lightspeedhq.com/ecom/endpoints/themeproduct/)
-   [TicketMessage](https://developers.lightspeedhq.com/ecom/endpoints/ticketmessage/)
-   [TypesAttribute](https://developers.lightspeedhq.com/ecom/endpoints/typesattribute/)
-   [VariantMetafield](https://developers.lightspeedhq.com/ecom/endpoints/variantmetafield/)
-   [VariantMovement](https://developers.lightspeedhq.com/ecom/endpoints/variantmovement/)

## API and Documentation links

[Lightspeed eCom API Documentation](https://developers.lightspeedhq.com/ecom/)

[circle-image]: https://circleci.com/gh/elasticio/lightspeed-ecom-component.svg?style=svg&circle-token=db5cb42aff0e86c991e4a57f8c195fd0f954b87d [circle-url]: https://circleci.com/gh/elasticio/lightspeed-ecom-component
