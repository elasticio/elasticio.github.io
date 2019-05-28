---
title: Ebay component
layout: article
section: Utility Components
---

### Purpose
The goal of the component is to provide possibility to interact with eBay API from the {{site.data.tenant.name}} platform.

*_Note:_ Currently only Buying Feed API is accessible.
### How works
The component uses API provided by eBay. Under the hood it works with REST requests to that API.
### Requirements
You need the following values in your request for an Application token:

* Your application's OAuth credentials (the client_id and client_secret).
For details, see [Getting your OAuth credentials](https://developer.ebay.com/api-docs/static/oauth-credentials.html).

* Your application's redirect_uri value. eBay uses a value known as an RuName. For details, see [Getting your redirect_uri value](https://developer.ebay.com/api-docs/static/oauth-redirect-uri.html).

* A list of OAuth scopes that provide access to the interfaces you call.

For details, see  [Specifying OAuth scopes](https://developer.ebay.com/api-docs/static/oauth-details.html#scopes).

*_Note_: While Buying Feed API is the only possible option, the next value will be automatically pointed as a scope: ```https://api.ebay.com/oauth/api_scope/buy.item.feed```.

These values should be saved before the credentials verification process.
## Credentials
##### Environment.
The type of the environment. Should be chosen between Sandbox and Production.
##### Redirect URI
It is the RuName parameter. See above.
##### Client ID
OAuth credentials
##### Client Secret
OAuth credentials
## Actions
### GetItem
This call retrieves the details of a specific item, such as description, price, category, all item aspects, condition, return policies, seller feedback and score, shipping options, shipping costs, estimated delivery, and other information the buyer needs to make a purchasing decision.

*eBay's sandbox environment does not provide correct response for this action. So the code could not be fully tested in development stage. Please be careful when testing this code in production environment. Please contact us if any error occurs.*
#### Input fields description (if there is any)
__itemId__ - The eBay RESTful identifier of an item. This ID is returned by the Browse and Feed API calls.

Format: RESTful item ID
For example: v1|272394640372|0 or v1|272394640372|0

__fieldgroups__ - This parameter lets you control what is returned in the response. If you do not set this field, the call returns all the details of the item.
Valid values:

* **PRODUCT** - This adds the additionalImages, additionalProductIdentities, aspectGroups, description, gtins, image, and title product fields to the response, which describe the product associated with the item. See Product for more information about these fields.
* **COMPACT** - This returns only the following fields, which let you quickly check if the availability or price of the item has changed, if the item has been revised by the seller, or if an item's top-rated plus status has changed for items you have stored.
Restriction: Must be a top-level category

More info about this action could be find here: https://developer.ebay.com/api-docs/buy/browse/resources/item/methods/getItem
#### Input json schema location
Request JSON schema ./src/main/resources/schemas/json/Item.in.json

### GetItemFeed
The Item feed file is generated each day. This call lets you download a daily TSV_GZIP (tab separated value gzip) Item feed file of all the items that were listed on a specific day in a specific category.
Details about the TSV_GZIP file could be found here: [Retrieve a daily Item feed file](https://developer.ebay.com/api-docs/buy/static/api-feed.html)
#### Input fields description (if there is any)
__date__ - The date of the feed file you want. The Item feed files are generated every day and there are always 7 daily feed files available.

Format: yyyyMMdd

Requirement: Must be within 3-10 days in the past

__categoryId__ - An eBay top-level category ID of the items to be returned in the feed file. The list of eBay category IDs changes over time and category IDs are not the same across all the eBay maketplaces. To get a list of the top-level categories for a markeplace, you can use the Taxonomy API getCategoryTree call. This call retrieves the complete category tree for the marketplace. The top-level categories are identified by the categoryTreeNodeLevel field.

For example: "categoryTreeNodeLevel": 1

For details see [Get Categories for Buy APIs](https://developer.ebay.com/api-docs/buy/buy-categories.html).

Restriction: Must be a top-level category

__range__ - This header specifies the range in bytes of the chunks of the gzip file being returned.

Format: bytes=startpos-endpos

For example, the following retrieves the first 10 MBs of the feed file.

Range bytes=0-10485760
You can use the getItemFeed call to retrieve a daily TSV_GZIP Item feed file. This file contains all the items listed on a specific day and category. Each item is in new condition, offer at a fixed price (Buy It Now); no auctions, and from eBay trusted sellers.

Maximum: 100 MB

__xeBayCMarketplaceId__ - The ID for the eBay marketplace where the items are hosted. For example: X-EBAY-C-MARKETPLACE-ID = EBAY-US

See the detailed info about this action here: https://developer.ebay.com/api-docs/buy/feed/resources/item/methods/getItemFeed
#### Input json schema location
Request JSON schema ./src/main/resources/schemas/json/ItemFeed.in.json

Response JSON schema ./src/main/resources/schemas/json/ItemFeed.out.json
Response JSON schema ./src/main/resources/schemas/json/ItemFeed.out.json
### GetItemDescriptionFeed
The Description feed file is generated each day. This call lets you download a daily TSV_GZIP (tab separated value gzip) Description feed file containing the descriptions of all the items that were listed on a specific day in a specific category.

The Description feed file contains only the itemId, itemGroupId and description columns. The value of the description column is BASE64 encoded. For each row, there will be values in either itemId or itemGroupId. The description column will always contain a value.

The other parameters and fields are the same like in GetItemFeed action.

Documentation for this action could be found here: https://developer.ebay.com/api-docs/buy/feed/resources/item_description/methods/getItemDescriptionFeed
#### Input json schema location
Request JSON schema ./src/main/resources/schemas/json/ItemFeed.in.json

Response JSON schema ./src/main/resources/schemas/json/ItemFeed.out.json
### GetItemSnapshotFeed
The Hourly feed file is generated each hour every day for all categories. This call lets you download an Hourly TSV_GZIP (tab separated value gzip) feed file containing all the items that have changed within the specified day and hour for a specific category. This means to generate the 8AM file of items that have changed from 8AM and 8:59AM, the service starts at 9AM. You can retrieve the 8AM snapshot file at 10AM.

You can use the response from this call to update the item details of items stored in your database. By comparing the value of itemSnapshotDate for the same item you will be able to tell which information is the latest.
Note: Currently, hourly updates for descriptions are not supported.

All the parameters and fields are the same like in GetItemFeed and GetItemDescriptionFeed action.
The only difference is in the format of data:

**Important:** The format of the 'data' input field: UTC format (yyyy-MM-ddThh:00:00.000Z).

*eBay's sandbox environment does not provide correct response for this action. So the code could not be fully tested in development stage. Please be careful when testing this code in production environment. Please contact us if any error occurs.*
E.g.: 2017-07-12T09:00:00.000Z

Documentation for this action could be found here: https://developer.ebay.com/api-docs/buy/feed/resources/item_snapshot/methods/getItemSnapshotFeed

## Triggers (if any)
No.
## Additional info (if any)

### Attachments

Output data in few actions is a binary data as it may have large size. So responding with a binary output data is not a good idea as it may consume too much resources to process.
This is why data in actions
* Get Item Description Feed
* Get Item Feed
* Get Item Snapshot Feed

is storing and transferred as an attachment.

You can get an additional information about {{site.data.tenant.name}} from our doc page: https://support.{{site.data.tenant.name}}/support/solutions/articles/14000057806-working-with-binary-data-attachments-

The data in that actions mentioned above has the next format:

~~~~
{
   "body": {
      "responseCode": "0",
      "responseAttachmentUrl": "http://steward.marathon.mesos:8091/files/1cfc3a71-d7a7-44e6-a15e-ae18860d537c"
   }
   "attachments": {
      "response": {
         "content-type": "text/plain",
         "url": "http://steward.marathon.mesos:8091/files/1cfc3a71-d7a7-44e6-a15e-ae18860d537c"
      }
   }
}
~~~~
Where `responseCode` is a code of the processing result:
* 0 - success
* 1 - failure
* 2 - business error. The component code was processed correctly, but some business error has happened.

So in order to retrieve an info you can get an URL with a code like this:

`String url = parameters.getMessage().getAttachments().getJsonObject("response").getString("url");`

And get a data from that url with a normal HTTP Get request.
