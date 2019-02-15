---
title: Lightspeed-retail component
layout: article
section: E-Commerce Components
---

## Description

Lightspeed Retail API component for elastic.io iPaaS.

## Authentication
Lightspeed uses the OAuth2 protocol to authenticate integrations and grant access to the API. See the section on [Authentication](https://developers.lightspeedhq.com/retail/authentication/authentication-overview 'Authentication') for more details.

## Credentials

![image](https://user-images.githubusercontent.com/40201204/50007735-85e24a80-ffba-11e8-8933-63f05d4c53d3.png)

### Environment URL
Url of the Lightspeed Retail environment. Optional.
By default: `api.lightspeedapp.com`

### Account ID
Lightspeed Retail account ID.


### Client ID
Consumer Key which you received during API client configuration step.

### Client Secret
Consumer Secret which you received during API client configuration step.

## Triggers

### Polling entity

This trigger polls for existing and updated objects where you can select object type.

![image](https://user-images.githubusercontent.com/40201204/50015199-9dc3c980-ffce-11e8-904c-4852c0c2f4f8.png)

#### Input fields description
* **Object Type** - you should select the type of object which updates you want to get.
* **Polling Field** - you can use any field existing at current object, which has datatype like DATE, DATETIME or TIMESTAMP.
* **Batch Size for request pagination** - count of entries which you will get by one request ().

## Actions

### Create Object

Action creates a new record/object. This action is supported by limited list of entities.

![image](https://user-images.githubusercontent.com/40201204/50018566-6d812880-ffd8-11e8-87ae-6ab7870f402e.png)

#### Input fields description
* **Object type** - you should select the type of object which updates you want to get.

Supported entities:
* Category
* CreditAccount
* Customer
* CustomerCustomField
* CustomerType
* Discount
* EmployeeHours
* InventoryTransfer
* InventoryCount
* InventoryCountItem
* Item
* ItemCustomField
* ItemMatrix
* Manufacturer
* Order
* OrderCustomField
* OrderLine
* PaymentType
* Quote
* RegisterClose
* RegisterOpen
* RegisterWithdraw
* Sale
* SaleEmailReceipt
* Season
* Serialized
* Tag
* TaxCategory
* TaxClass
* Vendor

### Upsert Object

Action creates a new object or updates object which already exists by provided ID. This action is supported by limited list of entities.

![image](https://user-images.githubusercontent.com/40201204/50018566-6d812880-ffd8-11e8-87ae-6ab7870f402e.png)

#### Input fields description
* **Object type** - you should select the type of object which updates you want to get.

Supported entities:
* Category
* CreditAccount
* Customer
* CustomerCustomField
* CustomerType
* Discount
* Employee
* EmployeeHours
* Industry
* InventoryTransfer
* InventoryCount
* InventoryCountItem
* Item
* ItemCustomField
* ItemMatrix
* Manufacturer
* Order
* OrderCustomField
* OrderLine
* PaymentType
* PriceLevel
* Quote
* RegisterClose
* RegisterOpen
* RegisterWithdraw
* Sale
* SaleEmailReceipt
* SaleLine
* Season
* Serialized
* Shop
* Tag
* TaxCategory
* TaxClass
* Vendor

### Update Object

Action updates object which already exists by provided ID. This action is supported by limited list of entities.

![image](https://user-images.githubusercontent.com/40201204/50018566-6d812880-ffd8-11e8-87ae-6ab7870f402e.png)

#### Input fields description
* **Object type** - you should select the type of object which updates you want to get.

Supported entities:
* Category
* CreditAccount
* Customer
* CustomerCustomField
* CustomerType
* Discount
* Employee
* EmployeeHours
* Industry
* InventoryTransfer
* InventoryCount
* InventoryCountItem
* Item
* ItemCustomField
* ItemMatrix
* Manufacturer
* Order
* OrderCustomField
* OrderLine
* PaymentType
* PriceLevel
* Quote
* Sale
* SaleLine
* Season
* Serialized
* Shop
* Tag
* TaxCategory
* TaxClass
* Vendor

### Lookup Object By ID

Action gets a list of objects by filters or specific object by provided ID.

![image](https://user-images.githubusercontent.com/40201204/50018566-6d812880-ffd8-11e8-87ae-6ab7870f402e.png)

#### Input fields description
* **Object type** - you should select the type of object which updates you want to get.

Supported entities:
* Account
* CatalogVendorItem
* Category
* CCCharge
* CreditAccount
* Customer
* CustomerCustomField
* CustomerType
* Discount
* Employee
* EmployeeHours
* Industry
* InventoryTransfer
* InventoryCount
* InventoryCountCalc
* InventoryCountItem
* Item
* ItemCustomField
* ItemAttributeSet
* ItemMatrix
* Locale
* Manufacturer
* Option
* Order
* OrderCustomField
* OrderLine
* PaymentType
* PriceLevel
* Quote
* Register
* RegisterCalculated
* RegisterCount
* RegisterCountAmount
* RegisterWithdraw
* Sale
* SaleLine
* SalePayment
* SaleVoid
* Season
* Serialized
* Session
* ShipTo
* Shop
* SpecialOrder
* Tag
* TaxCategory
* TaxClass
* Transfer
* TransferItem
* Vendor
* Workorder
* WorkorderItem
* WorkorderLine
* WorkorderStatus

### Delete Object By ID

Action removes object which already exists by provided ID.

![image](https://user-images.githubusercontent.com/40201204/50018566-6d812880-ffd8-11e8-87ae-6ab7870f402e.png)

#### Input fields description
* **Object type** - you should select the type of object which updates you want to get.

Supported entities:
* Category
* CreditAccount
* Customer
* CustomerCustomField
* CustomerType
* Discount
* Employee
* EmployeeHours
* InventoryCount
* InventoryCountItem
* Item
* ItemCustomField
* ItemMatrix
* Order
* OrderCustomField
* OrderLine
* PaymentType
* Quote
* Sale
* SaleLine
* Season
* Serialized
* Tag
* TaxCategory
* TaxClass
* Vendor

## Additional info

### Pagination

The component is providing request of a whole list of an entity by iterative API requests without user intervention.

A bit of theory:

Lightspeed Retail API limits the number of returned objects to `100`. When requesting large data sets it may be necessary to send multiple requests to retrieve all of the data. The meta-dictionary that’s returned tells the current page, and if there’s another page of results after this one, the next entry gives you the URL where it can be fetched.
Depending on the structure of your data, it’s possible that the API may not be able to return the number of resources requested before a HTTP 504 (Gateway Timeout) happens. For example, if your first 100 orders have 1,000 line items each, you might hit a 429 when trying to fetch them.
You can control the page size for a GET request with the limit parameter.

Coming back to the component:

In the component, at the `Polling Trigger` configuration you can configure count of fetching results per page by an appropriate configuration field.
If you notice that 429s are coming back, you should reduce the limit until you start getting 200s. A sensible strategy for this is probably to iteratively halve the page size until you stop getting 429s.

## Known limitations

The current version of the component doesn't support next list of entities:
-   [Customer CustomField CustomFieldChoice](https://developers.lightspeedhq.com/retail/endpoints/Customer-CustomField-CustomFieldChoice/)
-   [Customer CustomField](https://developers.lightspeedhq.com/retail/endpoints/Customer-CustomField/)
-   [DisplayTemplate Employee](https://developers.lightspeedhq.com/retail/endpoints/DisplayTemplate-Employee/)
-   [DisplayTemplate ItemAsLabel](https://developers.lightspeedhq.com/retail/endpoints/DisplayTemplate-ItemAsLabel/)
-   [DisplayTemplate Label](https://developers.lightspeedhq.com/retail/endpoints/DisplayTemplate-Label/)
-   [DisplayTemplate Order](https://developers.lightspeedhq.com/retail/endpoints/DisplayTemplate-Order/)
-   [DisplayTemplate OrderLineAsLabel](https://developers.lightspeedhq.com/retail/endpoints/DisplayTemplate-OrderLineAsLabel/)
-   [DisplayTemplate RegisterCount](https://developers.lightspeedhq.com/retail/endpoints/DisplayTemplate-RegisterCount/)
-   [DisplayTemplate RegisterWithdraw](https://developers.lightspeedhq.com/retail/endpoints/DisplayTemplate-RegisterWithdraw/)
-   [DisplayTemplate Sale](https://developers.lightspeedhq.com/retail/endpoints/DisplayTemplate-Sale/)
-   [DisplayTemplate Transfer](https://developers.lightspeedhq.com/retail/endpoints/DisplayTemplate-Transfer/)
-   [DisplayTemplate TransferItemAsLabel](https://developers.lightspeedhq.com/retail/endpoints/DisplayTemplate-TransferItemAsLabel/)
-   [DisplayTemplate VendorReturn](https://developers.lightspeedhq.com/retail/endpoints/DisplayTemplate-VendorReturn/)
-   [DisplayTemplate Workorder](https://developers.lightspeedhq.com/retail/endpoints/DisplayTemplate-Workorder/)
-   [Inventory Transfer TransferItems](https://developers.lightspeedhq.com/retail/endpoints/Inventory-Transfer-TransferItems/)
-   [Inventory Transfer](https://developers.lightspeedhq.com/retail/endpoints/Inventory-Transfer/)
-   [InventoryCount](https://developers.lightspeedhq.com/retail/endpoints/InventoryCount/)
-   [InventoryCountCalc](https://developers.lightspeedhq.com/retail/endpoints/InventoryCountCalc/)
-   [InventoryCountItem](https://developers.lightspeedhq.com/retail/endpoints/InventoryCountItem/)
-   [InventoryCountReconcile](https://developers.lightspeedhq.com/retail/endpoints/InventoryCountReconcile/)
-   [Item CustomField CustomFieldChoice](https://developers.lightspeedhq.com/retail/endpoints/Item-CustomField-CustomFieldChoice/)

## API and Documentation links

[Lightspeed Retail API Documentation](https://developers.lightspeedhq.com/retail/)

[circle-image]: https://circleci.com/gh/elasticio/lightspeed-retail-component.svg?style=svg&circle-token=b93881af60040b655730e98faec1d86449dd4fa4
[circle-url]: https://circleci.com/gh/elasticio/lightspeed-retail-component
