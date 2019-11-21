---
title: shopify-admin
layout: article
section: PLACEHOLDER
---
---

[![CircleCI](https://circleci.com/gh/elasticio/shopify-admin-component.svg?style=svg&circle-token=7c1a1dbf426517d0837f5e14484bcf3ccec43d36)](https://circleci.com/gh/elasticio/shopify-admin-component)

# Shopify Admin component
## Table of Contents
 * [Description](#description)
    * [Purpose](#purpose)
    * [Completeness Matrix](#completeness-matrix)
    * [How works. API version](#how-works-api-version)
    * [Requirements](#requirements)
        * [Environment variables](#environment-variables)
 * [Credentials](#credentials)
 * [Triggers](#triggers)
    * [Polling Trigger](#polling-trigger)
    * [Webhook subscription](#webhook-subscription)
 * [Actions](#actions)
    * [Lookup Object](#lookup-object)
    * [Lookup Objects](#lookup-objects)
    * [Create Object](#create-object)
    * [Upsert Object](#upsert-object)
    * [Delete Object](#delete-object)
    * [Deprecated actions](#deprecated-actions)
    
## Description

### Purpose
elastic.io iPaaS integration component for the Shopify Admin API.

### Completeness Matrix
[Shopify Admin Component Completeness Matrix](https://docs.google.com/spreadsheets/d/1BeaLQJYy0JGxxwAZHSnHoT1UsR_jf4GfGwtZExfvn-I)

[Shopify Admin Component Completeness Matrix in pdf](https://github.com/elasticio/shopify-admin-component/files/3870226/Shopify.admin.component.complitness.matrix.-.Sheet1.3.pdf)

### How works. API version
Component was tested on `2019-10` API version. 

You can find more information about API versioning at Shopify [here](https://help.shopify.com/en/api/versioning). 

Shopify Admin API documentation: https://help.shopify.com/api/reference.

### Requirements
#### Environment variables
Name|Mandatory|Description|Values|
|----|---------|-----------|------|
|SHOPIFY_API_VERSION| false | Determines API version of Shopify to use | Default: `2019-10` |

## Credentials
 - shopName
 - apiKey
 - password
 
 **Note**: How to generate creds https://help.shopify.com/api/getting-started#generate-api-credentials-from-the-shopify-admin

## Triggers

### Polling Trigger
Polls Shopify API for new and updated objects.
#### List of Expected Config fields
##### Object Type
Type of object for polling.
<details> 
  <summary>Supported object types</summary>
  
Supported object types|
 -----------|
|Application Charge
|Application Credit
|Blog
|Checkout
|Collect
|Collection Listing
|Comment
|Country
|Custom Collection
|Customer
|Customer Saved Search
|Dispute
|Draft Order
|Event
|Fulfillment Service
|Gift Card
|Marketing Event
|Metafield
|Order
|Page
|Payout
|Policy
|Price Rule
|Product
|Product Listing
|Recurring Application Charge
|Redirect
|Report
|Script Tag
|Shipping Zone
|Smart Collection
|Tender Transaction
|Theme
|Webhook

</details>

##### Emit Behaviour 
Options are: default is `Emit Individually` emits each object in separate message, `Fetch All` emits all objects in one message and `Fetch Page` emits object in messages size of `Size Of Polling Page`
##### Start Time
Start datetime of polling. Default min date:`-271821-04-20T00:00:00.000Z`
##### End Time
End datetime of polling. Default max date: `+275760-09-13T00:00:00.000Z`
##### Size Of Polling Page
Size of polling page, used in Fetch Page behaviour to determine size of emitted message. Default: `1000`
##### Single Page Per Interval
If `Yes` polls for one page each execution, if `No` polls for all pages in one execution. Default: `Yes`
#### Expected output metadata
<details> 
  <summary>Expected output metadata</summary>
  
 Entity type|Json schema location
 -----------| -------------
 |Application Charge|[/lib/schemas/oih/applicationCharge.json](/lib/schemas/oih/applicationCharge.json)
 |Application Credit|[/lib/schemas/oih/applicationCredit.json](/lib/schemas/oih/applicationCredit.json)
 |Blog|[/lib/schemas/oih/blog.json](/lib/schemas/oih/blog.json)
 |Checkout|[/lib/schemas/oih/checkout.json](/lib/schemas/oih/checkout.json)
 |Collect|[/lib/schemas/oih/collect.json](/lib/schemas/oih/collect.json)
 |Collection Listing|[/lib/schemas/oih/collectionListing.json](/lib/schemas/oih/collectionListing.json)
 |Comment|[/lib/schemas/oih/comment.json](/lib/schemas/oih/comment.json)
 |Country|[/lib/schemas/oih/country.json](/lib/schemas/oih/country.json)
 |Custom Collection|[/lib/schemas/oih/customCollection.json](/lib/schemas/oih/customCollection.json)
 |Customer|[/lib/schemas/oih/customer.json](/lib/schemas/oih/customer.json)
 |Customer Saved Search|[/lib/schemas/oih/customerSavedSearch.json](/lib/schemas/oih/customerSavedSearch.json)
 |Dispute|[/lib/schemas/oih/dispute.json](/lib/schemas/oih/dispute.json)
 |Draft Order|[/lib/schemas/oih/draftOrder.json](/lib/schemas/oih/draftOrder.json)
 |Event|[/lib/schemas/oih/event.json](/lib/schemas/oih/event.json)
 |Fulfillment Service|[/lib/schemas/oih/fulfillmentService.json](/lib/schemas/oih/fulfillmentService.json)
 |Gift Card|[/lib/schemas/oih/giftCard.json](/lib/schemas/oih/giftCard.json)
 |Marketing Event|[/lib/schemas/oih/marketingEvent.json](/lib/schemas/oih/marketingEvent.json)
 |Metafield|[/lib/schemas/oih/metafield.json](/lib/schemas/oih/metafield.json)
 |Order|[/lib/schemas/oih/order.json](/lib/schemas/oih/order.json)
 |Page|[/lib/schemas/oih/page.json](/lib/schemas/oih/page.json)
 |Payout|[/lib/schemas/oih/payout.json](/lib/schemas/oih/payout.json)
 |Policy|[/lib/schemas/oih/policy.json](/lib/schemas/oih/policy.json)
 |Price Rule|[/lib/schemas/oih/priceRule.json](/lib/schemas/oih/priceRule.json)
 |Product|[/lib/schemas/oih/product.json](/lib/schemas/oih/product.json)
 |Product Listing|[/lib/schemas/oih/productListing.json](/lib/schemas/oih/productListing.json)
 |Recurring Application Charge|[/lib/schemas/oih/recurringApplicationCharge.json](/lib/schemas/oih/recurringApplicationCharge.json)
 |Redirect|[/lib/schemas/oih/redirect.json](/lib/schemas/oih/redirect.json)
 |Report|[/lib/schemas/oih/report.json](/lib/schemas/oih/report.json)
 |Script Tag|[/lib/schemas/oih/scriptTag.json](/lib/schemas/oih/scriptTag.json)
 |Shipping Zone|[/lib/schemas/oih/shippingZone.json](/lib/schemas/oih/shippingZone.json)
 |Smart Collection|[/lib/schemas/oih/smartCollection.json](/lib/schemas/oih/smartCollection.json)
 |Tender Transaction|[/lib/schemas/oih/tenderTransaction.json](/lib/schemas/oih/tenderTransaction.json)
 |Theme|[/lib/schemas/oih/theme.json](/lib/schemas/oih/theme.json)
 |Webhook|[/lib/schemas/oih/webhook.json](/lib/schemas/oih/webhook.json)

</details>

### Webhook subscription
Creates webhook subscriptions on the Shopify side and receives events to the flow.
#### List of Expected Config fields
##### Object Type
Type of object for polling.
<details> 
  <summary>Supported object types</summary>
  
Supported object types|
 -----------|
|Cart
|Checkout
|Collection
|Collection Publication
|Customer
|Customer Saved Search
|Draft Order
|Fulfillment
|Fulfillment Event
|Inventory Item
|Inventory Level
|Location
|Order
|Order Transaction
|Product
|Product Listing
|Refund
|Shop
|Shop Alternate Locale
|Tender Transaction
|Theme

</details>

#### Links to documentation
You can find more information in the [Webhook Documentation](https://help.shopify.com/en/api/reference/events/webhook).

## Actions
### Lookup Object
Finds object by id.
#### List of Expected Config fields
##### Object Type
Type of object for polling.
<details> 
  <summary>Supported object types</summary>
  
Supported object types|
 -----------|
|Application Charge
|Application Credit
|Article
|Asset
|Blog
|Carrier Service
|Checkout
|Collect
|Collection Listing
|Comment
|Country
|Custom Collection
|Customer
|Customer Address
|Customer Saved Search
|Discount Code
|Dispute
|Draft Order
|Event
|Fulfillment
|Fulfillment Event
|Fulfillment Service
|Gift Card
|Gift Card Adjustment
|Inventory Item
|Location
|Marketing Event
|Metafield
|Order
|Order Risk
|Page
|Payment
|Payout
|Price Rule
|Product
|Product Image
|Product Listing
|Product Variant
|Province
|Recurring Application Charge
|Redirect
|Refund
|Report
|Script Tag
|Shop
|Smart Collection
|Theme
|Transaction
|Usage Charge
|User
|Webhook

</details>

##### Allow Empty Result
Default `No`. In case `No` is selected - an error will be thrown when no objects were found,
If `Yes` is selected -  an empty object will be returned instead of throwing an error.
##### Allow ID to be Omitted
Default `No`. In case `No` is selected - an error will be thrown when object id is missing in metadata, if `Yes` is selected - an empty object will be returned instead of throwing an error.

#### Expected input metadata
Input metadata contains `id` or several `ids` fields (some object types have complex id):
1. Object type `Shop` - does not have `id` empty input expected in message.
2. Type Objects with complex id: `Article`, `Asset`, `Checkout`, `Customer Address`, `Discount Code`, `Fulfillment`, `Fulfillment Event`, `Gift Card Adjustment`, `Inventory Level`,  `Order Risk`,  `Payment`,  `Product Image`,  `Product Listing`,  `Product Variant`, `Province`, `Refund`, `Shop`, `Usage Charge`

#### Expected output metadata
<details> 
  <summary>Expected output metadata</summary>
    
 Entity type|Json schema location
 -----------| -------------
|Application Charge|[/lib/schemas/oih/applicationCharge.json](/lib/schemas/oih/applicationCharge.json)
|Application Credit|[/lib/schemas/oih/applicationCredit.json](/lib/schemas/oih/applicationCredit.json)
|Article|[/lib/schemas/oih/article.json](/lib/schemas/oih/article.json)
|Asset|[/lib/schemas/oih/asset.json](/lib/schemas/oih/asset.json)
|Blog|[/lib/schemas/oih/blog.json](/lib/schemas/oih/blog.json)
|Carrier Service|[/lib/schemas/oih/carrierService.json](/lib/schemas/oih/carrierService.json)
|Checkout|[/lib/schemas/oih/checkout.json](/lib/schemas/oih/checkout.json)
|Collect|[/lib/schemas/oih/collect.json](/lib/schemas/oih/collect.json)
|Collection Listing|[/lib/schemas/oih/collectionListing.json](/lib/schemas/oih/collectionListing.json)
|Comment|[/lib/schemas/oih/comment.json](/lib/schemas/oih/comment.json)
|Country|[/lib/schemas/oih/country.json](/lib/schemas/oih/country.json)
|Custom Collection|[/lib/schemas/oih/customCollection.json](/lib/schemas/oih/customCollection.json)
|Customer|[/lib/schemas/oih/customer.json](/lib/schemas/oih/customer.json)
|Customer Address|[/lib/schemas/oih/customerAddress.json](/lib/schemas/oih/customerAddress.json)
|Customer Saved Search|[/lib/schemas/oih/customerSavedSearch.json](/lib/schemas/oih/customerSavedSearch.json)
|Discount Code|[/lib/schemas/oih/discountCode.json](/lib/schemas/oih/discountCode.json)
|Dispute|[/lib/schemas/oih/dispute.json](/lib/schemas/oih/dispute.json)
|Draft Order|[/lib/schemas/oih/draftOrder.json](/lib/schemas/oih/draftOrder.json)
|Event|[/lib/schemas/oih/event.json](/lib/schemas/oih/event.json)
|Fulfillment|[/lib/schemas/oih/fulfillment.json](/lib/schemas/oih/fulfillment.json)
|Fulfillment Event|[/lib/schemas/oih/fulfillmentEvent.json](/lib/schemas/oih/fulfillmentEvent.json)
|Fulfillment Service|[/lib/schemas/oih/fulfillmentService.json](/lib/schemas/oih/fulfillmentService.json)
|Gift Card|[/lib/schemas/oih/giftCard.json](/lib/schemas/oih/giftCard.json)
|Gift Card Adjustment|[/lib/schemas/oih/giftCardAdjustment.json](/lib/schemas/oih/giftCardAdjustment.json)
|Inventory Item|[/lib/schemas/oih/inventoryItem.json](/lib/schemas/oih/inventoryItem.json)
|Location|[/lib/schemas/oih/location.json](/lib/schemas/oih/location.json)
|Marketing Event|[/lib/schemas/oih/marketingEvent.json](/lib/schemas/oih/marketingEvent.json)
|Metafield|[/lib/schemas/oih/metafield.json](/lib/schemas/oih/metafield.json)
|Order|[/lib/schemas/oih/order.json](/lib/schemas/oih/order.json)
|Order Risk|[/lib/schemas/oih/orderRisk.json](/lib/schemas/oih/orderRisk.json)
|Page|[/lib/schemas/oih/page.json](/lib/schemas/oih/page.json)
|Payment|[/lib/schemas/oih/payment.json](/lib/schemas/oih/payment.json)
|Payout|[/lib/schemas/oih/payout.json](/lib/schemas/oih/payout.json)
|Price Rule|[/lib/schemas/oih/priceRule.json](/lib/schemas/oih/priceRule.json)
|Product|[/lib/schemas/oih/product.json](/lib/schemas/oih/product.json)
|Product Image|[/lib/schemas/oih/productImage.json](/lib/schemas/oih/productImage.json)
|Product Listing|[/lib/schemas/oih/productListing.json](/lib/schemas/oih/productListing.json)
|Product Variant|[/lib/schemas/oih/productVariant.json](/lib/schemas/oih/productVariant.json)
|Province|[/lib/schemas/oih/province.json](/lib/schemas/oih/province.json)
|Recurring Application Charge|[/lib/schemas/oih/recurringApplicationCharge.json](/lib/schemas/oih/recurringApplicationCharge.json)
|Redirect|[/lib/schemas/oih/redirect.json](/lib/schemas/oih/redirect.json)
|Refund|[/lib/schemas/oih/refund.json](/lib/schemas/oih/refund.json)
|Report|[/lib/schemas/oih/report.json](/lib/schemas/oih/report.json)
|Script Tag|[/lib/schemas/oih/scriptTag.json](/lib/schemas/oih/scriptTag.json)
|Shop|[/lib/schemas/oih/shop.json](/lib/schemas/oih/shop.json)
|Smart Collection|[/lib/schemas/oih/smartCollection.json](/lib/schemas/oih/smartCollection.json)
|Theme|[/lib/schemas/oih/theme.json](/lib/schemas/oih/theme.json)
|Transaction|[/lib/schemas/oih/transaction.json](/lib/schemas/oih/transaction.json)
|Usage Charge|[/lib/schemas/oih/usageCharge.json](/lib/schemas/oih/usageCharge.json)
|User|[/lib/schemas/oih/user.json](/lib/schemas/oih/user.json)
|Webhook|[/lib/schemas/oih/webhook.json](/lib/schemas/oih/webhook.json)

</details>

### Lookup Objects
#### List of Expected Config fields
##### Object Type
Type of object for lookup.
<details> 
  <summary>Supported object types</summary>
  
Supported object types|
 -----------|
|Access Scope
|Application Charge
|Application Credit
|Article
|Asset
|Balance
|Blog
|Carrier Service
|Checkout
|Collect
|Collection Listing
|Comment
|Country
|Currency
|Custom Collection
|Customer
|Customer Address
|Customer Saved Search
|Discount Code
|Dispute
|Draft Order
|Event
|Fulfillment
|Fulfillment Event
|Fulfillment Service
|Gift Card
|Gift Card Adjustment
|Inventory Item
|Inventory Level
|Location
|Marketing Event
|Metafield
|Order
|Order Risk
|Page
|Payment
|Payout
|Policy
|Price Rule
|Product
|Product Image
|Product Listing
|Product Variant
|Province
|Recurring Application Charge
|Redirect
|Refund
|Report
|Resource Feedback
|Script Tag
|Shipping Zone
|Smart Collection
|Storefront Access Token
|Tender Transaction
|Theme
|Transaction
|Usage Charge
|User
|Webhook

</details>

##### Behavior
`Fetch All` - fetch all objects in one message in form of array, `Emit Individually` - emit each fetched object as separate message.
##### Max Size
Maximum number of objects to fetch. Default `250`, maximum value is `250`. 

#### Expected input metadata
1. `idField` - object types: `Article`, `Asset`, `Article`, `Customer Address`, `Discount Code`, `Inventory Item`, `Inventory Level`, `Fulfillment`, `Order Risk`, `Refund`, `Transaction`, `Fulfillment Event`, `Gift Card Adjustment`, `Payment`, `Product Image`, `Product Variant`, `Province`, `Usage Charge` require id of parent object to be passed in input metadata
2. `order` - add ability to sort items.`fieldName`: name of field for sorting objects, only fields of type: `string`, `number`, `boolean` supported. `orderDirection`: asc or desc defines direction of sorting.
3. `filter` - add ability filter item from result. `searchTerm`: `fieldName` - name of field to apply filter. `condition` - `eq` equal, `ne` not equal, `gt` greater, `ge` greater or equal, `lt` less, `le` less or equal apply provided condition to field. `fieldValue` - value to be used by condition in comparing with `value` in object field. It is possible to chain few conditions via: `criteriaLink` - `and`, `or` chain with previous condition by provided operator.

#### Example of usage
1. Object Type - `Country`,
2. Behaviour - `Fetch All`,
3. Max Size - `20`
````json
{
  "order": {
    "fieldName": "code",
    "orderDirection": "desc"
  },
  "filter": [
    {
      "searchTerm": {
        "fieldName": "tax",
        "condition": "gt",
        "fieldValue": "0"
      },
      "criteriaLink": "and"
    }
  ]
}
````
Will return maximum 20 objects of type Country ordered by their code and filtered where tax value greater then 0.

### Create Object
Action to create new object instance. Only for object that can't be updated.

#### List of Expected Config fields
##### Object Type
Type of object for polling.
<details> 
  <summary>Supported object types</summary>
  
Supported object types|
 -----------|
|Application Charge
|Application Credit
|Collect
|Gift Card Adjustment
|Payment
|Product Listing
|Recurring Application Charge
|Refund
|Resource Feedback
|Storefront Access Token
|Transaction
|Usage Charge

</details>

#### Expected input metadata
<details> 
  <summary>Expected input metadata</summary>
  
 Entity type|Json schema location
 -----------| -------------
 |applicationCharge   |[/lib/schemas/oih/input/applicationCharge.json](/lib/schemas/oih/input/applicationCharge.json)
 |applicationCredit   |[/lib/schemas/oih/input/applicationCredit.json](/lib/schemas/oih/input/applicationCredit.json)
 |collect   |[/lib/schemas/oih/input/collect.json](/lib/schemas/oih/input/collect.json)
 |giftCardAdjustment   |[/lib/schemas/oih/input/giftCardAdjustment.json](/lib/schemas/oih/input/giftCardAdjustment.json)
 |payment   |[/lib/schemas/oih/input/payment.json](/lib/schemas/oih/input/payment.json)
 |productListing   |[/lib/schemas/oih/input/productListing.json](/lib/schemas/oih/input/productListing.json)
 |recurringApplicationCharge   |[/lib/schemas/oih/input/recurringApplicationCharge.json](/lib/schemas/oih/input/recurringApplicationCharge.json)
 |refund   |[/lib/schemas/oih/input/refund.json](/lib/schemas/oih/input/refund.json)
 |resourceFeedback   |[/lib/schemas/oih/input/resourceFeedback.json](/lib/schemas/oih/input/resourceFeedback.json)
 |storefrontAccessToken   |[/lib/schemas/oih/input/storefrontAccessToken.json](/lib/schemas/oih/input/storefrontAccessToken.json)
 |transaction   |[/lib/schemas/oih/input/transaction.json](/lib/schemas/oih/input/transaction.json)
 |usageCharge   |[/lib/schemas/oih/input/usageCharge.json](/lib/schemas/oih/input/usageCharge.json)
 
</details>

#### Expected output metadata
<details> 
  <summary>Expected output metadata</summary>

 Entity type|Json schema location
 -----------| -------------
 |applicationCharge   |[/lib/schemas/oih/applicationCharge.json](/lib/schemas/oih/applicationCharge.json)
 |applicationCredit   |[/lib/schemas/oih/applicationCredit.json](/lib/schemas/oih/applicationCredit.json)
 |collect   |[/lib/schemas/oih/collect.json](/lib/schemas/oih/collect.json)
 |giftCardAdjustment   |[/lib/schemas/oih/giftCardAdjustment.json](/lib/schemas/oih/giftCardAdjustment.json)
 |payment   |[/lib/schemas/oih/payment.json](/lib/schemas/oih/payment.json)
 |productListing   |[/lib/schemas/oih/productListing.json](/lib/schemas/oih/productListing.json)
 |recurringApplicationCharge   |[/lib/schemas/oih/recurringApplicationCharge.json](/lib/schemas/oih/recurringApplicationCharge.json)
 |refund   |[/lib/schemas/oih/refund.json](/lib/schemas/oih/refund.json)
 |resourceFeedback   |[/lib/schemas/oih/resourceFeedback.json](/lib/schemas/oih/resourceFeedback.json)
 |storefrontAccessToken   |[/lib/schemas/oih/storefrontAccessToken.json](/lib/schemas/oih/storefrontAccessToken.json)
 |transaction   |[/lib/schemas/oih/transaction.json](/lib/schemas/oih/transaction.json)
 |usageCharge   |[/lib/schemas/oih/usageCharge.json](/lib/schemas/oih/usageCharge.json)
 
</details>

#### Example of usage
Object Type: `Order`
Input message:
```
{
    "title": "Apple main blog second",
}
```
Output message:
```
{
  "id": 49341497426,
  "handle": "apple-main-blog-second-9",
  "title": "Apple main blog second",
  "updated_at": "2019-11-14T04:54:30-05:00",
  "commentable": "no",
  "feedburner": null,
  "feedburner_location": null,
  "created_at": "2019-11-14T04:54:30-05:00",
  "template_suffix": null,
  "tags": "",
  "admin_graphql_api_id": "gid://shopify/OnlineStoreBlog/49341497426"
}
```

### Upsert Object
Upsert Object action is useful if it isn't known if there is already an object in the system. Action determines if the data needs to be matched to an existing object or added to a new one.
Only for objects that can be created and updated.
#### List of Expected Config fields
##### Object Type
Type of object for polling.
<details> 
  <summary>Supported object types</summary>
  
Supported object types|
 -----------|
|Article
|Asset
|Blog
|Carrier Service
|Checkout
|Comment
|Country
|Custom Collection
|Customer
|Customer Address
|Customer Saved Search
|Discount Code
|Draft Order
|Fulfillment
|Fulfillment Service
|Gift Card
|Marketing Event
|Metafield
|Order
|Order Risk
|Page
|Price Rule
|Product
|Product Image
|Product Variant
|Redirect
|Report
|Script Tag
|Smart Collection
|Theme
|Webhook

</details>

#### Expected input metadata
<details> 
  <summary>Expected input metadata</summary>
  
 Entity type|Json schema location|Required params for lookup/update
 -----------| -------------| -------------
|article|[/lib/schemas/oih/input/upsert/article.json](/lib/schemas/oih/input/upsert/article.json)|id,  blog_id
|asset|[/lib/schemas/oih/input/upsert/asset.json](/lib/schemas/oih/input/upsert/asset.json) |key,  theme_id
|blog|[/lib/schemas/oih/input/upsert/blog.json](/lib/schemas/oih/input/upsert/blog.json) |id
|carrierService|[/lib/schemas/oih/input/upsert/carrierService.json](/lib/schemas/oih/input/upsert/carrierService.json) |id
|checkout|[/lib/schemas/oih/input/upsert/checkout.json](/lib/schemas/oih/input/upsert/checkout.json) |token
|comment|[/lib/schemas/oih/input/upsert/comment.json](/lib/schemas/oih/input/upsert/comment.json) |id
|country|[/lib/schemas/oih/input/upsert/country.json](/lib/schemas/oih/input/upsert/country.json) |id
|customCollection|[/lib/schemas/oih/input/upsert/customCollection.json](/lib/schemas/oih/input/upsert/customCollection.json) |id
|customer|[/lib/schemas/oih/input/upsert/customer.json](/lib/schemas/oih/input/upsert/customer.json) |id
|customerAddress|[/lib/schemas/oih/input/upsert/customerAddress.json](/lib/schemas/oih/input/upsert/customerAddress.json) |id, customer_id
|customerSavedSearch|[/lib/schemas/oih/input/upsert/customerSavedSearch.json](/lib/schemas/oih/input/upsert/customerSavedSearch.json) |id
|discountCode|[/lib/schemas/oih/input/upsert/discountCode.json](/lib/schemas/oih/input/upsert/discountCode.json) |id, price_rule_id
|draftOrder|[/lib/schemas/oih/input/upsert/draftOrder.json](/lib/schemas/oih/input/upsert/draftOrder.json) |id
|fulfillment|[/lib/schemas/oih/input/upsert/fulfillment.json](/lib/schemas/oih/input/upsert/fulfillment.json) |id, order_id
|fulfillmentService|[/lib/schemas/oih/input/upsert/fulfillmentService.json](/lib/schemas/oih/input/upsert/fulfillmentService.json) |id
|giftCard|[/lib/schemas/oih/input/upsert/giftCard.json](/lib/schemas/oih/input/upsert/giftCard.json) |id
|marketingEvent|[/lib/schemas/oih/input/upsert/marketingEvent.json](/lib/schemas/oih/input/upsert/marketingEvent.json) |id
|metafield|[/lib/schemas/oih/input/upsert/metafield.json](/lib/schemas/oih/input/upsert/metafield.json) |id
|order|[/lib/schemas/oih/input/upsert/order.json](/lib/schemas/oih/input/upsert/order.json) |id
|orderRisk|[/lib/schemas/oih/input/upsert/orderRisk.json](/lib/schemas/oih/input/upsert/orderRisk.json) |id, order_id
|page|[/lib/schemas/oih/input/upsert/page.json](/lib/schemas/oih/input/upsert/page.json) |id
|priceRule|[/lib/schemas/oih/input/upsert/priceRule.json](/lib/schemas/oih/input/upsert/priceRule.json) |id
|product|[/lib/schemas/oih/input/upsert/product.json](/lib/schemas/oih/input/upsert/product.json) |id
|productImage|[/lib/schemas/oih/input/upsert/productImage.json](/lib/schemas/oih/input/upsert/productImage.json) |id, product_id
|productVariant|[/lib/schemas/oih/input/upsert/productVariant.json](/lib/schemas/oih/input/upsert/productVariant.json) |id
|redirect|[/lib/schemas/oih/input/upsert/redirect.json](/lib/schemas/oih/input/upsert/redirect.json) |id
|report|[/lib/schemas/oih/input/upsert/report.json](/lib/schemas/oih/input/upsert/report.json) |id
|scriptTag|[/lib/schemas/oih/input/upsert/scriptTag.json](/lib/schemas/oih/input/upsert/scriptTag.json) |id
|smartCollection|[/lib/schemas/oih/input/upsert/smartCollection.json](/lib/schemas/oih/input/upsert/smartCollection.json) |id
|theme|[/lib/schemas/oih/input/upsert/theme.json](/lib/schemas/oih/input/upsert/theme.json) |id
|webhook|[/lib/schemas/oih/input/upsert/webhook.json](/lib/schemas/oih/input/upsert/webhook.json)  |id

</details>

#### Expected output metadata
<details> 
  <summary>Expected output metadata</summary>

 Entity type|Json schema location
 -----------| -------------
|article|[/lib/schemas/oih/output/upsert/article.json](/lib/schemas/oih/output/upsert/article.json)
|asset|[/lib/schemas/oih/output/upsert/asset.json](/lib/schemas/oih/output/upsert/asset.json)
|blog|[/lib/schemas/oih/output/upsert/blog.json](/lib/schemas/oih/output/upsert/blog.json)
|carrierService|[/lib/schemas/oih/output/upsert/carrierService.json](/lib/schemas/oih/output/upsert/carrierService.json)
|checkout|[/lib/schemas/oih/output/upsert/checkout.json](/lib/schemas/oih/output/upsert/checkout.json)
|comment|[/lib/schemas/oih/output/upsert/comment.json](/lib/schemas/oih/output/upsert/comment.json)
|country|[/lib/schemas/oih/output/upsert/country.json](/lib/schemas/oih/output/upsert/country.json)
|customCollection|[/lib/schemas/oih/output/upsert/customCollection.json](/lib/schemas/oih/output/upsert/customCollection.json)
|customer|[/lib/schemas/oih/output/upsert/customer.json](/lib/schemas/oih/output/upsert/customer.json)
|customerAddress|[/lib/schemas/oih/output/upsert/customerAddress.json](/lib/schemas/oih/output/upsert/customerAddress.json)
|customerSavedSearch|[/lib/schemas/oih/output/upsert/customerSavedSearch.json](/lib/schemas/oih/output/upsert/customerSavedSearch.json)
|discountCode|[/lib/schemas/oih/output/upsert/discountCode.json](/lib/schemas/oih/output/upsert/discountCode.json)
|draftOrder|[/lib/schemas/oih/output/upsert/draftOrder.json](/lib/schemas/oih/output/upsert/draftOrder.json)
|fulfillment|[/lib/schemas/oih/output/upsert/fulfillment.json](/lib/schemas/oih/output/upsert/fulfillment.json)
|fulfillmentService|[/lib/schemas/oih/output/upsert/fulfillmentService.json](/lib/schemas/oih/output/upsert/fulfillmentService.json)
|giftCard|[/lib/schemas/oih/output/upsert/giftCard.json](/lib/schemas/oih/output/upsert/giftCard.json)
|marketingEvent|[/lib/schemas/oih/output/upsert/marketingEvent.json](/lib/schemas/oih/output/upsert/marketingEvent.json)
|metafield|[/lib/schemas/oih/output/upsert/metafield.json](/lib/schemas/oih/output/upsert/metafield.json)
|order|[/lib/schemas/oih/output/upsert/order.json](/lib/schemas/oih/output/upsert/order.json)
|orderRisk|[/lib/schemas/oih/output/upsert/orderRisk.json](/lib/schemas/oih/output/upsert/orderRisk.json)
|page|[/lib/schemas/oih/output/upsert/page.json](/lib/schemas/oih/output/upsert/page.json)
|priceRule|[/lib/schemas/oih/output/upsert/priceRule.json](/lib/schemas/oih/output/upsert/priceRule.json)
|product|[/lib/schemas/oih/output/upsert/product.json](/lib/schemas/oih/output/upsert/product.json)
|productImage|[/lib/schemas/oih/output/upsert/productImage.json](/lib/schemas/oih/output/upsert/productImage.json)
|productVariant|[/lib/schemas/oih/output/upsert/productVariant.json](/lib/schemas/oih/output/upsert/productVariant.json)
|redirect|[/lib/schemas/oih/output/upsert/redirect.json](/lib/schemas/oih/output/upsert/redirect.json)
|report|[/lib/schemas/oih/output/upsert/report.json](/lib/schemas/oih/output/upsert/report.json)
|scriptTag|[/lib/schemas/oih/output/upsert/scriptTag.json](/lib/schemas/oih/output/upsert/scriptTag.json)
|smartCollection|[/lib/schemas/oih/output/upsert/smartCollection.json](/lib/schemas/oih/output/upsert/smartCollection.json)
|theme|[/lib/schemas/oih/output/upsert/theme.json](/lib/schemas/oih/output/upsert/theme.json)
|webhook|[/lib/schemas/oih/output/upsert/webhook.json](/lib/schemas/oih/output/upsert/webhook.json)  

</details>

#### Example of usage
Object Type: `Article`
Input message:
```
{
    "id": 383343525970,
    "blog_id": 47884042322,
    "title": "My new title",
}
```
<details> 
  <summary>Output message</summary>
  
```
{
  "id": 383343525970,
  "title": "My new Title",
  "created_at": "2019-11-12T08:27:49-05:00",
  "body_html": "Hello, it's a test blog",
  "blog_id": 47884042322,
  "author": "test Admin",
  "user_id": 38430933074,
  "published_at": "2019-11-12T08:27:00-05:00",
  "updated_at": "2019-11-19T10:21:40-05:00",
  "summary_html": "",
  "template_suffix": null,
  "handle": "test-blog-post",
  "tags": "",
  "admin_graphql_api_id": "gid://shopify/OnlineStoreArticle/383343525970"
}
```
</details>

### Delete Object
#### List of Expected Config fields
##### Object Type
Type of object for polling.
<details> 
  <summary>Supported object types</summary>
  
Supported object types|
 -----------|
|Api Permission
|Article
|Asset
|Blog
|Carrier Service
|Collect
|Comment
|Country
|Custom Collection
|Customer
|Customer Address
|Customer Saved Search
|Discount Code
|Draft Order
|Fulfillment Event
|Fulfillment Service
|Inventory Level
|Marketing Event
|Metafield
|Order
|Order Risk
|Page
|Price Rule
|Product
|Product Image
|Product Listing
|Product Variant
|Recurring Application Charge
|Redirect
|Report
|Script Tag
|Smart Collection
|Storefront Access Token
|Theme
|Webhook
</details>

#### Expected input metadata

For most type of objects: `{ "id" : "object id" }`
Special cases:
1. Api Permission - this type of object does not have `id`. Empty object expected as input for this type.
2. Article -  `{ "id" : "object id",  "blodId" : "Blog Id" }`.
3. Asset - `{ "key" : "object id",  "themeId" : "Theme Id" }`.
4. Customer Address - `{ "id" : "object id",  "customerId" : "Customer Id" }`.
5. Discount Code - `{ "id" : "object id",  "priceRuleId" : "Price Rule Id" }`.
6. Fulfillment Event - `{ "id" : "object id",  "orderId" : "Order Id", "fulfillmentId" : "Fulfillment Id" }`.
7. Inventory Level - `{ "params" : { "inventory_item_id" : "Inventory Item Id", "location_id" : "Location Id" }}`.
8. Order Risk - `{ "id" : "object id",  "orderId" : "Order Id" }`.
9. Product Image - `{ "id" : "object id",  "productId" : "Product Id" }`.
10.Product Variant - `{ "id" : "object id",  "productId" : "Product Id" }`.

#### Expected output metadata
Output: `{ "id" : "object id" }` means that object was successfully deleted.
Output: `{}` means that object hasn`t been deleted.
Special cases:
1. Api Permission - this type of object does not have `id`, in case of successful deletion of this object type: `{ "id" : "Successfully deleted API Permission object"}` returned.
2. Inventory Level - this type of object does not have `id`, in case of successful deletion of this object type: `{ "id" : { "inventory_item_id" : "Inventory item id", "location_id": "Location id" }}`

#### Example of usage
Object Type: `Order`
Input message:
```
{
    "id" : "1213"
}
```
Output message:
```
{
    "id" : "1213"
}
```

### Deprecated actions

<details> 
  <summary>Deprecated actions</summary>
  
#### List products(Deprecated use List Objects action instead)

in/out metadata can be found at `/lib/schemas/listProducts.{in/out}.json`

##### usage example
<details> 
  <summary>input message</summary>

```
{
	"ids": [
		"814083178540"
	],
	"limit": 3,
	"page": 1,
	"since_id": 0,
	"title": "new product",
	"vendor": null,
	"handle": null,
	"product_type": null,
	"collection_id": null,
	"created_at_min": "2018-04-22T11:04:58-04:00",
	"created_at_max": null,
	"updated_at_min": null,
	"updated_at_max": null,
	"published_at_min": null,
	"published_at_max": null,
	"published_status": "any"
}
```

</details>

<details> 
  <summary>output message</summary>
  
```
{
	"result": [
		{
			"id": 814083178540,
			"title": "my new product 1",
			"body_html": "description of my new product 1",
			"vendor": "fredddy123store",
			"product_type": "",
			"created_at": "2018-04-19T09:36:10-04:00",
			"handle": "my-new-product-1",
			"updated_at": "2018-04-23T11:04:58-04:00",
			"published_at": "2018-04-19T09:34:40-04:00",
			"template_suffix": null,
			"published_scope": "web",
			"tags": "",
			"variants": [
				{
					"id": 8771018031148,
					"product_id": 814083178540,
					"title": "Default Title",
					"price": "10.50",
					"sku": "",
					"position": 1,
					"inventory_policy": "deny",
					"compare_at_price": "11.00",
					"fulfillment_service": "manual",
					"inventory_management": null,
					"option1": "Default Title",
					"option2": null,
					"option3": null,
					"created_at": "2018-04-19T09:36:10-04:00",
					"updated_at": "2018-04-19T09:36:10-04:00",
					"taxable": true,
					"barcode": "",
					"grams": 0,
					"image_id": null,
					"inventory_quantity": 1,
					"weight": 0,
					"weight_unit": "kg",
					"inventory_item_id": 8852818395180,
					"old_inventory_quantity": 1,
					"requires_shipping": false
				}
			],
			"options": [
				{
					"id": 1180400189484,
					"product_id": 814083178540,
					"name": "Title",
					"position": 1,
					"values": [
						"Default Title"
					]
				}
			],
			"images": [
				{
					"id": 2887637663788,
					"product_id": 814083178540,
					"position": 1,
					"created_at": "2018-04-19T09:36:12-04:00",
					"updated_at": "2018-04-19T09:36:12-04:00",
					"alt": null,
					"width": 1919,
					"height": 983,
					"src": "https://cdn.shopify.com/s/files/1/0024/0628/5356/products/Selection_177.png?v=1524144972",
					"variant_ids": []
				}
			],
			"image": {
				"id": 2887637663788,
				"product_id": 814083178540,
				"position": 1,
				"created_at": "2018-04-19T09:36:12-04:00",
				"updated_at": "2018-04-19T09:36:12-04:00",
				"alt": null,
				"width": 1919,
				"height": 983,
				"src": "https://cdn.shopify.com/s/files/1/0024/0628/5356/products/Selection_177.png?v=1524144972",
				"variant_ids": []
			}
		}
	]
}
```
</details>

#### Upsert product
in/out metadata can be found at `/lib/schemas/upsertProduct.{in/out}.json`

##### usage example

<details>
  <summary>Input message</summary>
  
```
{
	"id": "814083178540",
	"body_html": "It's the small iPod with a big idea: Video.",
	"handle": "ipod-nano",
	"images": [
		{
			"position": 1,
			"width": 100,
			"height": 100,
			"src": "https://fastcode.space/wp-content/uploads/2017/03/a-abstract-logo-design_1043-4-1.jpg",
			"variant_ids": [
				"808950810"
			]
		}
	],
	"options": [
		{
			"name": "Color",
			"values": [
				"Blue",
				"Black"
			]
		}
	],
	"product_type": "Cult Products",
	"published_scope": "global",
	"tags": "Emotive, Flash Memory, MP3, Music",
	"template_suffix": "product.liquid",
	"title": "my new product 1 - ASD",
	"metafields_global_title_tag": "IPod Nano - White, 8GB",
	"metafields_global_description_tag": "It's the small iPod with a big idea: Video.",
	"variants": [
		{
			"barcode": "1234_pink",
			"compare_at_price": 250,
			"fulfillment_service": "manual",
			"grams": 567,
			"weight": 0.2,
			"weight_unit": "kg",
			"inventory_management": "shopify",
			"inventory_policy": "continue",
			"inventory_quantity": 10,
			"option1": "Pink",
			"position": 1,
			"price": 239.99,
			"requires_shipping": true,
			"sku": "IPOD2008PINK",
			"taxable": true,
			"title": "Pink"
		}
	],
	"vendor": "Apple"
}
```

</details>

<details>
  <summary>output message</summary>

```
{
	"result": {
		"id": 814083178540,
		"title": "my new product 1 - ASD",
		"body_html": "It's the small iPod with a big idea: Video.",
		"vendor": "Apple",
		"product_type": "Cult Products",
		"created_at": "2018-04-19T09:36:10-04:00",
		"handle": "ipod-nano-12",
		"updated_at": "2018-04-26T06:12:03-04:00",
		"published_at": "2018-04-19T09:34:40-04:00",
		"template_suffix": "product.liquid",
		"published_scope": "web",
		"tags": "Emotive, Flash Memory, MP3, Music",
		"variants": [
			{
				"id": 8932338991148,
				"product_id": 814083178540,
				"title": "Pink",
				"price": "239.99",
				"sku": "IPOD2008PINK",
				"position": 1,
				"inventory_policy": "continue",
				"compare_at_price": "250.00",
				"fulfillment_service": "manual",
				"inventory_management": "shopify",
				"option1": "Pink",
				"option2": null,
				"option3": null,
				"created_at": "2018-04-26T06:12:03-04:00",
				"updated_at": "2018-04-26T06:12:03-04:00",
				"taxable": true,
				"barcode": "1234_pink",
				"grams": 200,
				"image_id": null,
				"inventory_quantity": 10,
				"weight": 0.2,
				"weight_unit": "kg",
				"inventory_item_id": 9031879360556,
				"old_inventory_quantity": 10,
				"requires_shipping": true
			}
		],
		"options": [
			{
				"id": 1180400189484,
				"product_id": 814083178540,
				"name": "Color",
				"position": 1,
				"values": [
					"Pink"
				]
			}
		],
		"images": [
			{
				"id": 2965072117804,
				"product_id": 814083178540,
				"position": 1,
				"created_at": "2018-04-26T06:12:03-04:00",
				"updated_at": "2018-04-26T06:12:03-04:00",
				"alt": null,
				"width": 626,
				"height": 626,
				"src": "https://cdn.shopify.com/s/files/1/0024/0628/5356/products/a-abstract-logo-design_1043-4-1_f1f65d87-0dab-40da-95a0-71546a4b4ff2.jpg?v=1524737523",
				"variant_ids": []
			}
		],
		"image": {
			"id": 2965072117804,
			"product_id": 814083178540,
			"position": 1,
			"created_at": "2018-04-26T06:12:03-04:00",
			"updated_at": "2018-04-26T06:12:03-04:00",
			"alt": null,
			"width": 626,
			"height": 626,
			"src": "https://cdn.shopify.com/s/files/1/0024/0628/5356/products/a-abstract-logo-design_1043-4-1_f1f65d87-0dab-40da-95a0-71546a4b4ff2.jpg?v=1524737523",
			"variant_ids": []
		}
	}
}
```

</details>

#### Delete product(Deprecated. Use Delete Object action instead)
in/out metadata can be found at `/lib/schemas/deleteProduct.{in/out}.json`

##### usage example
input message:
```
{
	"id": "814083178540"
}
```
output message:
```
{
	"deleted": true,
	"productId": "814083178540"
}
```

#### Get product
in/out metadata can be found at `/lib/schemas/getProduct.{in/out}.json`

##### usage example
input message:
```
{
	"id": "833638662188",
	"fields": [
		"id",
		"title",
		"createdAt"
	]
}
```
output message:
```
{
	"result": {
		"id": 833638662188,
		"title": "123 123 IPod Nano - 8GB",
		"created_at": "2018-04-24T11:46:06-04:00"
	}
}
```

#### Count products
in/out metadata can be found at `/lib/schemas/countProducts.{in/out}.json`

##### usage example
input message:
```
{
	"vendor": null,
	"product_type": null,
	"collection_id": null,
	"created_at_min": null,
	"created_at_max": null,
	"updated_at_min": null,
	"updated_at_max": null,
	"published_at_min": null,
	"published_at_max": null,
	"published_status": null
}
```
output message:
```
{
	"result": 15
}
```

#### Create product image
in/out metadata can be found at `/lib/schemas/createProductImage.{in/out}.json`

##### usage example
input message:
```
{
	"productId": "814083178540",
	"position": 2,
	"variant_ids": [
		"8932338991148"
	],
	"src": "https://cnet3.cbsistatic.com/img/IAN-lCz3ZhpINi8edorKDpaLCBA=/770x433/2014/02/24/694b0dd2-d40d-4a87-8970-b5a59ec6fe6d/apple-ipod-nano-2nd-generation-digital-player-flash-8-gb-display-1-5-black.jpg",
	"attachment": "",
	"filename": "",
	"alt": "image alt",
	"metafields": [
		{
			"key": "new",
			"value": "newvalue",
			"value_type": "string",
			"namespace": "global"
		}
	],
	"width": 640,
	"height": 480
}
```
output message:
```
{
	"result": {
		"id": 3004333031468,
		"product_id": 814083178540,
		"position": 2,
		"created_at": "2018-04-30T06:02:06-04:00",
		"updated_at": "2018-04-30T06:02:07-04:00",
		"alt": "image alt",
		"width": 770,
		"height": 433,
		"src": "https://cdn.shopify.com/s/files/1/0024/0628/5356/products/apple-ipod-nano-2nd-generation-digital-player-flash-8-gb-display-1-5-black_81d42a70-0396-42a7-8171-fbd1a6c28370.jpg?v=1525082527",
		"variant_ids": []
	}
}
```

#### Update product image
in/out metadata can be found at `/lib/schemas/updateProductImage.{in/out}.json`

##### usage example
input message:
```
{
	"productId": "814083178540",
	"imageId": "2978401321004",
	"position": 3,
	"variant_ids": [
		"8932338991148"
	],
	"src": "https://cnet3.cbsistatic.com/img/IAN-lCz3ZhpINi8edorKDpaLCBA=/770x433/2014/02/24/694b0dd2-d40d-4a87-8970-b5a59ec6fe6d/apple-ipod-nano-2nd-generation-digital-player-flash-8-gb-display-1-5-black.jpg",
	"attachment": "",
	"filename": "",
	"alt": "image alt 2",
	"metafields": [
		{
			"key": "new",
			"value": "newvalue",
			"value_type": "string",
			"namespace": "global"
		}
	],
	"width": 640,
	"height": 480
}
```
output message:
```
{
	"result": {
		"id": 2978401321004,
		"product_id": 814083178540,
		"position": 3,
		"created_at": "2018-04-27T10:24:34-04:00",
		"updated_at": "2018-04-30T06:07:51-04:00",
		"alt": "image alt 2",
		"width": 770,
		"height": 433,
		"src": "https://cdn.shopify.com/s/files/1/0024/0628/5356/products/apple-ipod-nano-2nd-generation-digital-player-flash-8-gb-display-1-5-black_218e13cc-0fc5-402d-bbbc-fae01e1f0dbc.jpg?v=1525082871",
		"variant_ids": [
			8932338991148
		]
	}
}
```

#### Delete product image(Deprecated. Use Delete Object action instead)
in/out metadata can be found at `/lib/schemas/deleteProductImage.{in/out}.json`

##### usage example
input message:
```
{
	"productId": "814083178540",
	"imageId": "3004381331500"
}
```
output message:
```
{
	"result": {
		"deleted": true,
		"productId": "814083178540",
		"imageId": "3004381331500"
	}
}
```

#### List inventory items(Deprecated use List Objects action instead)
in/out metadata can be found at `/lib/schemas/listInventoryItems.{in/out}.json`

##### usage example
input message:
```
{
	"ids": [
		"8994203271212",
		"8994177056812"
	],
	"page": 1,
	"limit": 10
}
```
output message:
```
{
	"result": [
		{
			"id": 8994177056812,
			"sku": "",
			"created_at": "2018-04-24T11:44:31-04:00",
			"updated_at": "2018-04-24T11:44:31-04:00",
			"tracked": false
		},
		{
			"id": 8994203271212,
			"sku": "IPOD2008PINK",
			"created_at": "2018-04-24T11:46:06-04:00",
			"updated_at": "2018-04-24T11:46:06-04:00",
			"tracked": true
		}
	]
}
```

#### Get inventory item
in/out metadata can be found at `/lib/schemas/getInventoryItem.{in/out}.json`

##### usage example
input message:
```
{
	"id": "8994203271212"
}
```
output message:
```
{
	"result": {
		"id": 8994203271212,
		"sku": "IPOD2008PINK",
		"created_at": "2018-04-24T11:46:06-04:00",
		"updated_at": "2018-04-24T11:46:06-04:00",
		"tracked": true
	}
}
```

#### Update inventory item
in/out metadata can be found at `/lib/schemas/updateInventoryItem.{in/out}.json`

##### usage example
input message:
```
{
	"id": "8994203271212",
	"sku": "new sku",
	"tracked": false
}
```
output message:
```
{
	"result": {
		"id": 8994203271212,
		"sku": "new sku",
		"created_at": "2018-04-24T11:46:06-04:00",
		"updated_at": "2018-04-30T09:15:05-04:00",
		"tracked": false
	}
}
```

#### Create product variant
in/out metadata can be found at `/lib/schemas/createProductVariant.{in/out}.json`

##### usage example
input message:
```
{
	"productId": "814083178540",
	"barcode": "1234_pink",
	"compare_at_price": 599.99,
	"fulfillment_service": "manual",
	"grams": 567,
	"image_id": "",
	"inventory_item_id": "",
	"inventory_management": "shopify",
	"inventory_policy": "continue",
	"inventory_quantity": 10,
	"old_inventory_quantity": 5,
	"inventory_quantity_adjustment": 5,
	"metafields": [
		{
			"key": "new",
			"value": "newvalue",
			"value_type": "string",
			"namespace": "global"
		}
	],
	"option1": "new Pink",
	"position": 1,
	"price": 399,
	"requires_shipping": true,
	"sku": "sku 123",
	"taxable": false,
	"tax_code": "",
	"title": "Pink 11",
	"weight": 100,
	"weight_unit": "oz"
}
```
output message:
```
{
	"result": {
		"id": 9010709037100,
		"product_id": 814083178540,
		"title": "new Pink",
		"price": "399.00",
		"sku": "sku 123",
		"position": 1,
		"inventory_policy": "continue",
		"compare_at_price": "599.99",
		"fulfillment_service": "manual",
		"inventory_management": "shopify",
		"option1": "new Pink",
		"option2": "",
		"option3": "",
		"created_at": "2018-04-30T09:36:58-04:00",
		"updated_at": "2018-04-30T09:36:58-04:00",
		"taxable": false,
		"barcode": "1234_pink",
		"grams": 2835,
		"image_id": "",
		"inventory_quantity": 10,
		"weight": 100,
		"weight_unit": "oz",
		"inventory_item_id": 9120577257516,
		"old_inventory_quantity": 10,
		"requires_shipping": true
	}
}
```

#### Update product variant
in/out metadata can be found at `/lib/schemas/updateProductVariant.{in/out}.json`

##### usage example
input message:
```
{
	"id": "9010709037100",
	"productId": "814083178540",
	"barcode": "1234_pink",
	"compare_at_price": 599.99,
	"fulfillment_service": "manual",
	"grams": 567,
	"image_id": "",
	"inventory_item_id": "",
	"inventory_management": "shopify",
	"inventory_policy": "continue",
	"inventory_quantity": 10,
	"old_inventory_quantity": 5,
	"inventory_quantity_adjustment": 5,
	"metafields": [
		{
			"key": "new1",
			"value": "newvalue1",
			"value_type": "string",
			"namespace": "global"
		}
	],
	"option1": "new Pink",
	"position": 1,
	"price": 399,
	"requires_shipping": true,
	"sku": "sku 123",
	"taxable": false,
	"tax_code": "",
	"title": "Pink 22",
	"weight": 100,
	"weight_unit": "oz"
}
```
output message:
```
{
	"result": {
		"id": 9010709037100,
		"product_id": 814083178540,
		"title": "new Pink",
		"price": "399.00",
		"sku": "sku 123",
		"position": 1,
		"inventory_policy": "continue",
		"compare_at_price": "599.99",
		"fulfillment_service": "manual",
		"inventory_management": "shopify",
		"option1": "new Pink",
		"option2": "",
		"option3": "",
		"created_at": "2018-04-30T09:36:58-04:00",
		"updated_at": "2018-04-30T09:47:59-04:00",
		"taxable": false,
		"barcode": "1234_pink",
		"grams": 2835,
		"image_id": "",
		"inventory_quantity": 15,
		"weight": 100,
		"weight_unit": "oz",
		"inventory_item_id": 9120577257516,
		"old_inventory_quantity": 15,
		"requires_shipping": true
	}
}
```

#### Delete product variant(Deprecated. Use Delete Object action instead)
in/out metadata can be found at `/lib/schemas/deleteProductVariant.{in/out}.json`

##### usage example
input message:
```
{
	"id": "9010709037100",
	"productId": "814083178540"
}
```
output message:
```
{
	"result": {
		"deleted": true,
		"id": "9010709037100",
		"productId": "814083178540"
	}
}
```


</details>
