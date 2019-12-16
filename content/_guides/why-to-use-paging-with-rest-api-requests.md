---
title: How to implement the pagination?
layout: article
section: Paging
category: paging
order: 0
---

## Description

Paging is like requesting the data in batches from rest API resources. It is reminiscent of the actual idea of pages of data when the data is being queried via a standard interface.

Paging in rest API requests is regarded a good practice for accessing a large amount of data via API calls in order not to overtax the system with long processes of single read instance.

Many API providers have standardised approach and include quite an extensive support for pagination, however, there are still sizable amount who do not have that support. These two cases will be presented separately:

  * [How to proceed when API provider has in-built pagination system?](/guides/how-to-implement-the-pagination)
  * [What to do when API provider does not support pagination](/guides/what-to-do-when-api-provider-does-not-support-paging) from out of the box, yet?

## Giving user control over paging

Let us consider a scenario in which the API service provider would have very flexible pagination support and one have a possibility to choose how big is the batch size. In this case, the pagination can be directly built into the interface following way:

```js
"getCustomers": {
    "main": "./lib/triggers/getCustomers.js",
    "type": "polling",
    "title": "Query Customers",
    "fields": {
      "customersSet": {
        "label": "Customers to get",
        "prompt": "Please choose",
        "viewClass": "SelectView",
        "required": false,
        "model": {
          "": "All customers",
          "new": "New customers (without External ID)",
          "updated": "Updated Customers (with external ID)"
        }
      },
      "limit": {
        "label": "Customers per request",
        "prompt": "Please choose",
        "viewClass": "SelectView",
        "required": false,
        "model": {
          "20": "20",
          "50": "50",
          "100": "100",
          "200": "200",
          "500": "500",
          "1000": "1000"
        }
      }
    },
    "metadata": {
      "out": "./lib/schemas/getCustomers.out.json"
 }
}
```

In the above-presented example we give the user a possibility to choose from different sizes of batches: 20, 50, 100, 200, 500 and 1000 records. This setup would look the following way on the interface(taken from [Shopware component](/components/shopware/index)):

![Shopware query orders](/assets/img/paging/shopware-query-orders.png)

Obviously, the `limit` parameter is defined elsewhere and is available as a global parameter within the component.

>Word of caution: Not all API providers would let you choose the batch sizes so this implementation would not be applicable. Normally, you can only control the page number and request only the next page incrementally.

When the pagination is tied directly with page number then we suggest using a [snapshot](/getting-started/snapshot-overview) feature to save the last requested page number. More information is given in the [how to implement pagination](/guides/how-to-implement-the-pagination) help article.
