---
title: Amazon MWS component
layout: article
section: Utility Components
---
---
## Description

[Amazon Marketplace Web Service](https://services.amazon.com/) (Amazon MWS) is
an integrated web service API that helps Amazon sellers to exchange
data on listings, orders, payments, reports and more. Data integration with
Amazon enables high levels of selling automation, which can help sellers grow
their business. Please visit [Amazon Marketplace Web Service (Amazon MWS) Documentation](http://docs.developer.amazonservices.com/en_UK/dev_guide/index.html) for more information.

## How works

This Amazon MWS component can be used to connect your Amazon Seller account with
other services.

> If you intend to use the Amazon MWS API you must have an Amazon MWS-eligible seller account and you must register to use Amazon MWS. Please [visit Registering to use Amazon MWS](http://docs.developer.amazonservices.com/en_US/dev_guide/DG_Registering.html) page to choose your country applicable developers' page.

## Credentials

Here are the credentials necessary to authenticate with the Amazon MWS:

*   `Seller ID` - your seller ID. Check [connecting the Amazon Seller account](#connecting-the-amazon-seller-account) for more.
*   `MWS Auth Token` - a token associated with the ID. Check [connecting the Amazon Seller account](#connecting-the-amazon-seller-account) for more.
*   `Amazon MWS Secret Access Key` - your developer account **AWS Access Key ID**. Check [locating your developer keys](#locating-your-developer-keys) for more.
*   `Amazon MWS Access Key` - your developer account **Secret Key**. Check [locating your developer keys](#locating-your-developer-keys) for more.
*   `Amazon Marketplace ID` (Country specific) - the marketplace ID where you are connecting. To find the specific marketplace ID check the [Amazon MWS endpoints and Marketplace Id values](http://docs.developer.amazonservices.com/en_US/dev_guide/DG_Endpoints.html) documentation.

Please refer to the document [how to provide us access to your Amazon seller account](https://developer.amazonservices.com/gp/mws/faq.html#mawsportal-faq-accessToDeveloper) for details.

## Requirements

### Environment variables

None required.

## Triggers

### List Orders

This trigger function will list the orders in your seller account based on the
`Status` which can be selected from the drop-down menu with the following available values:

*   `Pending` - all the pending orders
*   `Shipped` - all the shipped orders
*   `Unshipped` - all unshipped orders
*   `PartiallyShipped` - partially shipped orders
*   `Canceled` - canceled orders
*   `Unfulfillable` - not fulfillable orders
*   `PendingAvailability (Japan only)` - all orders with status `pending availability`, only available in the Japan store
*   `InvoiceUnconfirmed (China only)` - all orders with status `invoice unconfirmed`, only specific to Chinese store

## Actions

### List Order Items

This action would fetch and give the Order Items on output. This action only
needs the Amazon `Order Id` on input.

The output object contains an array of values listing the `order Items` of the
given the Amazon `Order Id`. The output has the following structure:

```json
{
    "type": "object",
    "required": true,
    "properties": {
        "amazonOrderId": {
            "type": "string",
            "title": "Order Id",
            "required": true
        },
        "orderItems": {
            "type": "array",
            "title": " Order Items",
            "required": true,
            "properties": { ... }
        }
    }
}
```

### Submit Product

This action can be configured using two parameters: `Operation` and `Category`.

**Operation** defines the action type you wish to do:

*   `Upsert` - upsert the records
*   `Delete` - delete the records
*   `PartialUpdate` - update only one part of the records


**Category** defines the specific category of the product and it can have the
following types:

> Auto Accessories, Beauty, Books, Camera & Photo, Cell Phones & Accessories (Wireless), Clothing Accessories & Luggage, Computers, Consumer Electronics, Entertainment Collectibles, Grocery & Gourmet Food, Health, Home Improvement, Industrial & Scientific: Lab & Scientific Supplies, Industrial & Scientific: Power Transmission, Industrial & Scientific: Raw Materials, Jewelry, Lighting, Miscellaneous, Musical Instruments, Music, Office, Outdoors, Pet Supplies, Shoes Handbags and Sunglasses, Software and Video Games, Sports, Sports Collectibles, Tires & Wheels, Tools, Toys & Games


### Submit Product (Category from payload)

This action can be configured to submit the product information based on
dynamically selectable products from the payload and perform the following operations:

*   `Upsert` - upsert the records
*   `Delete` - delete the records
*   `PartialUpdate` - update only one part of the records

### Submit Inventory

This action can be configured to submit the inventory based on the dynamically
selectable values of the Inventory catalogue.

### Change Product Image

This action can be configured to change the product image based on the dynamically
selectable values of the Inventory catalogue.

### Change Product Price

This action can be configured to change the product price based on the dynamically
selectable values of the Inventory catalogue.

### Establish Product Relationships

This action can be configured to establish the product relationships based on the dynamically
selectable values of the Inventory catalogue.

### Get Feed Submission Status

This action is for submitting the status to the feed. It accepts the `Submission ID`
and the `type` as a `string` value on input and outputs the values of the same parameters.


### Get Feed Submission Result

This action is for submitting the result to the feed. It accepts the `Submission ID`
and the `type` as a `string` value on input and outputs the values of the same parameters.


## Additional Information

### Locating your Developer Keys

To locate your developer keys at Amazon MWS follow these steps.

1.  Login to Amazon Seller Central dedicated to your country. To find which one to use simply visit [Amazon Services](https://services.amazon.com/) and navigate your way through your Seller Central page.
2.  After login navigate to your **Settings > User Permissions** page.
3.  When in the User Permissions page scroll-down to find the section called **Amazon MWS Developer Permissions** and check the **Current Authorizations**. Copy the `Developer ID` from here for later use when you would need to create the necessary credentials to use inside the platform Security Credentials part.
4.  Click the link called `View your credentials` in the column entitled **Action Taken**. If you have several Developer IDs in your account then make sure to click on the link in the row where the related Developer ID is located. When clicked a window will pop-up with 3 values: **AWS Access Key ID**, **Secret Key** and **Status**. Make sure that the **Status = Enabled**.
5.  Copy **AWS Access Key ID**, this is your `Amazon MWS Access Key` from the [credentials](#credentials).
6.  Click to *Show* the **Secret Key** value and copy it. This is the `Amazon MWS Secret Access Key` from the [credentials](#credentials).

### Connecting the Amazon Seller account

To retrieve your `Seller ID` and the `MWS Auth Token` values you need to follow
the steps below:

1.  Visit [Amazon Marketplace Web Service (Amazon MWS)](https://developer.amazonservices.com/) and click on **Sign up for MWS** or login if you have done this already previously.
2.  You will be presented with this screen where you would need to select **I want to give a developer access to my Amazon seller account with MWS** option.
3.  Fill in the details for the **Developer's Name** and the **Developer Account Number**. The last one is your `Developer ID`. Check the (3) of the [Locating your Developer Keys](#locating-your-developer-keys) for information. Click Next to go forward.
4.  Agree to the therms and conditions on the next page presented and click Next to finally create credentials.
5.  A page will be presented where you can see the details of your credentials. Please copy the `Seller ID` and the `MWS Auth Token` values before navigating away. This page is shown once.
