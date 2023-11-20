---
title: Ebay actions
layout: component
description: Ebay component actions.
icon: ebay.png
icontext: Ebay component
category: ebay
updatedDate: 2023-05-17
ComponentVersion: 2.0.2
---

## Get Item

This call retrieves the details of a specific item, such as description, price, category, all item aspects, condition, return policies, seller feedback and score, shipping options, shipping costs, estimated delivery, and other information the buyer needs to make a purchasing decision.

{% include img.html max-width="100%" url="img/get-item.png" title="Get Item" %}

> **Please note:** eBay's sandbox environment does not provide the correct response for this action. So the code could not be fully tested in the development stage. Please be careful when testing this code in the production environment. Please contact us if any error occurs.

### Input fields description

* **itemId** - The eBay RESTful identifier of an item. This ID is returned by the Browse and Feed API calls.
  * **Format:** RESTful item ID
  * **For example:** `v1|272394640372|0 `or `v1|272394640372|0`

* **fieldgroups** - This parameter lets you control what is returned in the response. If you do not set this field, the call returns all the details of the item. Valid values:

  * **PRODUCT** - This adds the `additionalImages`, `additionalProductIdentities`, `aspectGroups`, `description`, `gtins`, `image`, and `title` product fields to the response, which describe the product associated with the item. See `Product` for more information about these fields.
  * **COMPACT** - This returns only the following fields, which let you quickly check if the availability or price of the item has changed if the item has been revised by the seller, or if an item's top-rated plus status has changed for items you have stored.
      
Restriction: Must be a top-level category

More info about this action could be find [here](https://developer.ebay.com/api-docs/buy/browse/resources/item/methods/getItem).

## Get Item Feed

The Item feed file is generated each day. This call lets you download a daily TSV_GZIP (tab separated value gzip) Item feed file of all the items that were listed on a specific day in a specific category.

{% include img.html max-width="100%" url="img/get-item-feed.png" title="Get Item Feed" %}

Details about the TSV_GZIP file could be found here: [Retrieve a daily Item feed file](https://developer.ebay.com/api-docs/buy/static/api-feed.html)

### Input fields description (if there is any)

* **date** - The date of the feed file you want. The Item feed files are generated every day and there are always 7 daily feed files available.

  * **Format:** `yyyyMMdd`
  * **Requirement:** Must be within 3-10 days in the past

* **categoryId** - An eBay top-level category ID of the items to be returned in the feed file. The list of eBay category IDs changes over time and category IDs are not the same across all the eBay marketplaces. To get a list of the top-level categories for a marketplace, you can use the Taxonomy API `getCategoryTree` call. This call retrieves the complete category tree for the marketplace. The top-level categories are identified by the category `TreeNodeLevel` field.

  * **For example:** `"categoryTreeNodeLevel": 1`

For details see [Get Categories for Buy APIs](https://developer.ebay.com/api-docs/buy/buy-categories.html).

Restriction: Must be a top-level category

* **range** - This header specifies the range in bytes of the chunks of the gzip file being returned.

  * **Format:** bytes=startpos-endpos
  * **For example:** the following retrieves the first 10 MBs of the feed file.
    * Range bytes=0-10485760
    * You can use the `getItemFeed` call to retrieve a daily `TSV_GZIP` Item feed file. This file contains all the items listed on a specific day and category. Each item is in new condition, offered at a fixed price (Buy It Now); no auctions, and from eBay trusted sellers.
  * **Maximum:** 100 MB

* **xeBayCMarketplaceId** - The ID for the eBay marketplace where the items are hosted. For example: `X-EBAY-C-MARKETPLACE-ID = EBAY-US`

See the detailed info about this action [here](https://developer.ebay.com/api-docs/buy/feed/resources/item/methods/getItemFeed).

## Get Item Description Feed

The Description feed file is generated each day. This call lets you download a daily TSV_GZIP (tab separated value gzip) Description feed file containing the descriptions of all the items that were listed on a specific day in a specific category.

{% include img.html max-width="100%" url="img/get-item-description-feed.png" title="Get Item Description Feed" %}

The Description feed file contains only the itemId, itemGroupId and description columns. The value of the description column is BASE64 encoded. For each row, there will be values in either itemId or itemGroupId. The description column will always contain a value.

The other parameters and fields are the same like in GetItemFeed action.

Documentation for this action could be found [here](https://developer.ebay.com/api-docs/buy/feed/resources/item_description/methods/getItemDescriptionFeed).

## Get Item Snapshot Feed

The Hourly feed file is generated each hour every day for all categories. This call lets you download an Hourly TSV_GZIP (tab separated value gzip) feed file containing all the items that have changed within the specified day and hour for a specific category. This means to generate the 8AM file of items that have changed from 8AM and 8:59AM, the service starts at 9AM. You can retrieve the 8AM snapshot file at 10AM.

{% include img.html max-width="100%" url="img/get-item-snapshot-feed.png" title="Get Item Snapshot Feed" %}

You can use the response from this call to update the item details of items stored in your database. By comparing the value of itemSnapshotDate for the same item you will be able to tell which information is the latest.

> **Please note:** Currently, hourly updates for descriptions are not supported.

All the parameters and fields are the same as in [Get Item Feed](#get-item-feed) and [Get Item Description Feed](#get-item-description-feed) actions. The only **difference** is in the format of the data: UTC format (yyyy-MM-ddThh:00:00.000Z). E.g.: 2017-07-12T09:00:00.000Z.

>**Please note:** eBay's sandbox environment does not provide the correct response for this action. So the code could not be fully tested in the development stage. Please be careful when testing this code in the production environment. Please contact us if any error occurs.

Documentation for this action could be found [here](https://developer.ebay.com/api-docs/buy/feed/resources/item_snapshot/methods/getItemSnapshotFeed).
