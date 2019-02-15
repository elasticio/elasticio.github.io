---
title: Google-shopping component
layout: article
section: Utility Components
---


## Description
Component exposes Google shopping API.

productId - unique product identifier. Consist of:
`channel:contentLanguage:targetCountry:offerId`.


Component requires at least 1GB of RAM to work correct:

Set env variable `EIO_REQUIRED_RAM_MB` to `1024`.
## Credentials
Component supports Service account as authentication mechanism.

## How to create credentials:
1. Open https://www.google.ru/retail/solutions/merchant-center/
2. Sign up
3. Select your country
4. Enter name of store
5. Click on "continue"
6. Agree to the Terms & Conditions.
7. agree with terms...
8. Click on "continue"
9. Click on skip
10. Click on menu button and choose "COntent API".
11. Click on "authentication" tab.
12. Click on Create API key.
13. Click on "I have read and agree to the terms" and then "Accept & continue" in Google Cloud Platform section
14. Click on "I have read and agree to the terms" and then "Accept & continue" in Google APIs Terms of Service section.
15. Notification "A new API key is being created. This may take up to 30 seconds." is shown on the screen.
16. Pop-up API key created successfully. The only copy of this key (content-api.json) is saved on this computer. Store it securely.
17. In addition, you now have a new Google Cloud project and service account. Learn more" is shown up.
18. CLick "Ok"
19. File content-api-key.json file has been downloaded.


## How to insert credentials into elastic.io platform:

1. Settings -> Security credentials -> Google Shopping component -> Add New Account
2. Enter Name of account.
3. Copy-paste all text from content-api-key.json file into  "googleKeyFile" field.
4. Enter your Merchant ID from Google Merchant Center.
5. Click on "Verify".
6. Click on "Save".

#### merchantId
Id of customer's merchant account.
#### googleKeyFile
Content of json file with google key.
## Actions

### Upsert Product
Request JSON schema `./src/main/schemas/InsertProduct.in.json`

###  Delete Product
Request JSON schema `./src/main/schemas/DeleteProduct.in.json`

###  Get Product
Request JSON schema `./src/main/schemas/DeleteProduct.in.json`

###  List Products

###  Product CustomBatch
Request JSON schema `./src/main/schemas/CustomBatchProduct.in.json`

###  Get Product status info
Request JSON schema `./src/main/schemas/DeleteProduct.in.json`

###  List all Accounts status info

###  Product CustomBatch
Request JSON schema `./src/main/schemas/CustomBatchProductStatuses.in.json`

###  Update inventory and price
Request JSON schema `./src/main/schemas/SetPriceAndInventory.in.json`

###  Inventory CustomBatch
Request JSON schema `./src/main/schemas/CustomBatchInventory.in.json`

###  Get Account Authinfo

###  Claim Account Website
Request input parameters `accountId`

###  Get Account info
Request input parameters `accountId`

###  Delete Account
Request input parameters `accountId`

###  Get Accounts List

###  Create Account
Request JSON schema `./src/main/schemas/InsertAccount.in.json`

###  Patch Account
Request JSON schema `./src/main/schemas/PatchAccount.in.json`

###  Update Account
Request JSON schema `./src/main/schemas/UpdateAccount.in.json`

###  Account CustomBatch
Request JSON schema `./src/main/schemas/CustomBatchAccount.in.json`

###  Get Account tax List
Request input parameters `accountId`

###  Patch Account tax
Request JSON schema `./src/main/schemas/PatchAccountTax.in.json`

###  Update Account tax
Request JSON schema `./src/main/schemas/UpdateAccountTax.in.json`

###  Account tax CustomBatch
Request JSON schema `./src/main/schemas/CustomBatchAccountTax.in.json`

###  Get Account status info
Request input parameters `datafeedId`

###  List all Accounts status info

###  Account CustomBatch
Request JSON schema `./src/main/schemas/CustomBatchAccountStatuses.in.json`

###  Create Datafeed
Request JSON schema `./src/main/schemas/InsertDatafeed.in.json`

###  Get Datafeed info
Request input parameters `datafeedId`

###  Get Datafeeds List

###  Delete Datafeed
Request input parameters `datafeedId`

###  Datafeed CustomBatch
Request JSON schema `./src/main/schemas/CustomBatchDatafeed.in.json`

###  Update Datafeed
Request JSON schema `./src/main/schemas/UpdateDatafeed.in.json`

###  Patch Datafeed
Request JSON schema `./src/main/schemas/PatchDatafeed.in.json`

###  Get Datafeed status info
Request input parameters `datafeedId`

###  List all Datafeeds status info

###  Datafeed CustomBatch
Request JSON schema `./src/main/schemas/CustomBatchDatafeedStatuses.in.json`

## Triggers
No triggers.
## Google shopping API links
[Common request structure description](https://developers.google.com/shopping-content/v2/reference/v2/products)

[Detailed fields description with fields dependencies](https://support.google.com/merchants/answer/7052112?visit_id=1-636537021606682845-1015443800&hl=en&rd=1)
