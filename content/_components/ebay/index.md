---
title: Ebay component
layout: component
section: E-Commerce components
description: A Ebay component for the platform.
icon: ebay.png
icontext: Ebay component
category: ebay
createdDate: 2018-05-07
updatedDate: 2019-06-26
---

## Purpose

E-bay component provides a possibility to interact with eBay API.

> **Note:** Currently only Buying Feed API is accessible.

### How works

The component uses API provided by eBay. Under the hood it works with REST requests to that API.

## Requirements

You need the following values in your request for an Application token:

*   Your application's OAuth credentials (the client_id and client_secret).
*   Your application's redirect_uri value. eBay uses a value known as an `RuName`.
*   A list of OAuth scopes that provide access to the interfaces you call.

For details, see  [Specifying OAuth scopes](https://developer.ebay.com/api-docs/static/oauth-details.html#scopes).

> **Note:** While Buying Feed API is the only possible option, the following
> value will be automatically pointed as a scope: ```https://api.ebay.com/oauth/api_scope/buy.item.feed```.

These values should be saved before the credentials verification process.

### Credentials

| **Name** |  **Description** |
| Environment |  The type of the environment. Should be chosen between Sandbox and Production. |
| Redirect URI |  It is the RuName parameter. See above. |
| Client ID |  OAuth credentials. |
| Client Secret |  OAuth credentials. |

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

1.  [Get Item](actions#get-item) This call retrieves the details of a specific item, such as description, price, category, all item aspects, condition, return policies, seller feedback and score, shipping options, shipping costs, estimated delivery, and other information the buyer needs to make a purchasing decision.
2.  [Get Item Feed](actions#get-item-feed) You can use the `getItemFeed` call to retrieve a daily TSV_GZIP Item feed file. This file contains all the items listed on a specific day and category. Each item is in new condition, offer at a fixed price (Buy It Now); no auctions, and from eBay trusted sellers.
3.  [Get Item Description Feed](actions#get-item-description-feed) The Description feed file is generated each day. This call lets you download a daily TSV_GZIP (tab separated value gzip) Description feed file containing the descriptions of all the items that were listed on a specific day in a specific category.
4.  [Get Item Snapshot Feed](actions#get-item-snapshot-feed) The Hourly feed file is generated each hour every day for all categories. This call lets you download an Hourly TSV_GZIP (tab separated value gzip) feed file containing all the items that have changed within the specified day and hour for a specific category.

## Additional info

### Attachments

Output data in few actions is a binary data as it may have large size. So responding
with a binary output data is not a good idea as it may consume too much resources
to process. This is why data in actions

*   Get Item Description Feed
*   Get Item Feed
*   Get Item Snapshot Feed

is storing and transferred as an attachment.

The data in that actions mentioned above has the next format:

```json
{
   "body": {
      "responseCode": "0",
      "responseAttachmentUrl": "http://attachment_url"
   },
   "attachments": {
      "response": {
         "content-type": "text/plain",
         "url": "http://attachment_url"
      }
   }
}
```

Where `responseCode` is a code of the processing result:
* 0 - success
* 1 - failure
* 2 - business error. The component code was processed correctly, but some business error has happened.

So in order to retrieve an info you can get an URL with a code like this:

`String url = parameters.getMessage().getAttachments().getJsonObject("response").getString("url");`

And get a data from that url with a normal HTTP Get request.
