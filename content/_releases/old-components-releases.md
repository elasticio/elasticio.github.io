---
title: Archived Components Release Notes
layout: rel
section: Component Releases
description: Components release notes, archived into one big page after 6 month and kept around for the reference.
category: component-releases
version: (v19 - v26)
updatedDate: 2020-03-07
redirect_from:
  - /comp-releases/19.html
  - /comp-releases/20.html
  - /comp-releases/21.html
  - /comp-releases/22.html
  - /comp-releases/23.html
  - /comp-releases/24.html
  - /comp-releases/25.html
  - /comp-releases/26.html
---

## v19 Release

> Released date: July 11, 2019

This release included updates and bug fixed to the following components:

### Jdbc Component

[Click to open Component documentation](/components/jdbc/)

This is an open source component for working with object-relational database
management systems on {{site.data.tenant.name}} platform

#### Bugs Fixed:

*   Incorrect parsing of variables
*   `Upsert By Primary Key Action` now supports `null` values

### Google Spreadsheets component

[Click to open Component documentation](/components/gspreadsheet/)

{{site.data.tenant.name}} iPaaS component to read and write to Google Spreadsheets

#### New trigger: Get Spreadsheet Row

Trigger to read the data in each row of a given Google Spreadsheet and passes
it to the next step of your integration flow.

#### New actions:

*   **Create new Spreadsheet** - Action to create a new Google spreadsheet.
*   **Add Spreadsheet Row** - Action to create a new Google spreadsheet row


### CSV Component

[Click to open Component documentation](/components/csv/)

A component to read and write Comma Separated Values (CSV) files

#### Updated action: Read CSV attachment

New option added: `Emit all messages` to emit all rows in one message as an array.

### Salesforce Component

[Click to open Component documentation](/components/salesforce/)

Integration component for Salesforce API for the {{site.data.tenant.name}} iPaaS

#### Bugs Fixed:

Attachment Object type can not be sent to Salesforce

## v20 Release

> Released date: July 29, 2019

This release included updates and bug fixed to the following components:

### Google Spreadsheets component

[Click to open Component documentation](/components/gspreadsheet/)

{{site.data.tenant.name}} iPaaS component to read and write to Google Spreadsheets

#### Fixed bugs:

*   Remove fields `spreadsheetId`, `spreadsheetUrl` from `Create new spreadsheet action`, as theirs inputs are not affect on new spreadsheet creation.
*   README.MD is updated

### Filter Component

[Click to open Component documentation](/components/filter/)

{{site.data.tenant.name}} iPaaS component to filter the incoming data based on an
arbitrary JSONata expression

#### Updated Action: Simple JSONata Filter

`Assertion` Checkbox added: If checked, the checkbox adds Assertion functionality.
Instead of doing nothing, the component will throw an error when the condition is not met


### Jdbc Component

[Click to open Component documentation](/components/jdbc/)

This is an open source component for working with object-relational database
management systems on {{site.data.tenant.name}} platform.

#### New Action: Execute stored procedure

This action calls stored procedure from selected `DB Schema` and `Stored procedure` name.

### Postgresql Component

[Click to open Component documentation](/components/postgresql/)

This is an open source component for working with PostgreSQL object-relational
database management system on {{site.data.tenant.name}} iPaaS, it also works well with AWS Redshift

#### Updated Action: SQL Injection

`Number of retries in case of deadlock transaction` field is added.

You can specify the maximum number of retries, that is intended to help to solve
lock's issues in case of a deadlock transaction. The delay between retries is 1
second. Default value for this configuration field is 0, it means, that such
behavior is switched off (by default) and no any retry will be performed in case
of deadlock transaction.

### Netsuite Component

[Click to open Component documentation](/components/netsuite/)

Main purpose of this component is to provide functionality to interact with
NetSuite ERP system.

#### New Trigger: Get New and Updated Objects Polling

Generic trigger that polls NetSuite instance for new and/or updated objects (of
any type available in the NetSuite).

#### New Actions:

*   Lookup Objects - Looks for objects available in NetSuite which meet given criteria.
*   Lookup Object By Id - Lookup an object by the Id provided.
*   Delete Object By Id - Deletes an object by the Id provided.
*   Upsert Object By Id - Either update an object in NetSuite by an Id provided or inserts as a new object if it does not exist.

#### Other New features:

All previously existed triggers and actions marked as deprecated, as they are
not match with OIH standards:

**Deprecated Trigger:**

*   Search entity (Please use Get New and Updated Objects Polling Trigger instead)

**Deprecated Actions:**

*   Lookup Customer (Please use Lookup Object By ID Action instead)
*   Lookup Invoice (Please use Lookup Object By ID Action instead)
*   Upsert Contact (Please use Upsert Object By Id Action instead)
*   Upsert Customer (Please use Upsert Object By Id Action instead)
*   Upsert Invoice (Please use Upsert Object By Id Action instead)
*   Upsert Sales Order (Please use Upsert Object By Id Action instead)
*   Upsert Vendor(Please use Upsert Object By Id Action instead)

## v21 Release

> Released date: August 08, 2019

This release included updates and bug fixed to the following components:

### Netsuite Component

[Click to open Component documentation](/components/netsuite/)

Main purpose of this component is to provide functionality to interact with
NetSuite ERP system.

#### New features: Error handling improvement

Error messages have become more user-friendly and some additional information is
moved from errors thrown to logs.

## v22 Release

> Released date: August 28, 2019

This release included updates and bug fixed to the following components:

### SAP ECC (R/3, ERP) Component

[Click to open Component documentation](/components/sap-r3/)

This is a new component that communicates with provided SAP ECC (R/3, ERP) system

#### New Action: Call RFC Service

Action which gives possibility to call an RFC function on the SAP ECC (R/3, ERP) platform

### Code Component

[Click to open Component documentation](/components/code/)

The holy grail of the {{site.data.tenant.name}} platform.
A code component for the {{site.data.tenant.name}} platform, runs a piece of
`JavaScript` code inside your integration flow

#### Fixed bugs:

Incorrect message consuming in Code-component is fixed

### Database component

[Click to open Component documentation](/components/jdbc/)

This is an open source component for working with object-relational database
management systems on {{site.data.tenant.name}} platform

#### New features:

Field for configuration of the connection custom parameters was added to component
credentials.

### Email Component

[Click to open Component documentation](/components/email/)

Email component for the {{site.data.tenant.name}} platform

#### New features:

Retry in case of problems with retrieving attachments

### Shopware Component

[Click to open Component documentation](/components/shopware/)

Shopware component for the {{site.data.tenant.name}} platform

#### New Action: Upsert Object Action

Action creates a new object or update object which already exists by provided ID.
This action makes `POST` request when get message body without id to create new
entity and `PUT` request when get message body includes id to update existing object.

### Rest-api-component

[Click to open Component documentation](/components/rest-api/)

The REST API component is a simple yet powerful {{site.data.tenant.name}} iPaaS
integration component that allows you to connect to any REST API without programming
your own components and deploying them into the platform.

#### New features: Rebound on REST HTTP timeouts

Retry on failure option enables rebound feature for following `HTTP` status codes:

*   `408`: Request Timeout
*   `423`: Locked
*   `429`: Too Many Requests
*   `500`: Internal Server Error
*   `502`: Bad Gateway
*   `503`: Service Unavailable
*   `504`: Gateway Timeout
*   DNS lookup timeout

## v23 Release

> Released date: September 12, 2019

This release included updates and bug fixed to the following components:

### SAP byDesign Component

[Click to open Component documentation](/components/sap-bydesign/)

{{site.data.tenant.name}} iPaaS component that provides an opportunity to
interact with SAP byDesign API. SAP byDesign API integration with {{site.data.tenant.name}}.

#### New Trigger: Get New And Updated Objects Polling

At the moment only few object types are supported:
*   Query Materials
*   Query Sales Orders
*   Query Accounts

#### Fixed bugs:

*   Password input field should be `PasswordFieldView` (input is hidden)
*   Authorization failed due to specific symbols in Username or Password

### WebHook Component

[Click to open Component documentation](/components/webhook/)

An open source component for sending and receiving WebHooks on {{site.data.tenant.name}} platform

#### New features:

Webhook now includes an additional information in response message:

*   `msg.headers`
*   `msg.url`
*   `msg.method`


### REST-API Component

[Click to open Component documentation](/components/rest-api/)

The REST API component is a simple yet powerful {{site.data.tenant.name}} iPaaS
integration component that allows you to connect to any REST API without programming
your own components and deploying them into the platform.

#### New features

*   Code was refactored: new methods are implemented
*   Readme.md has been updated

### CSV Component

[Click to open Component documentation](/components/csv/)

A component to read and write Comma Separated Values (CSV) files.

#### New features:

In order to keep the component updated and to follow best practices, it was
migrated from Travis CI to CircleCI Component code was refactored (dependencies update)

## v24 Release

> Released date: September 26, 2019

This release included updates and bug fixed to the following components:

### SOAP Component

[Click to open Component documentation](/components/soap/)

#### New features

* SOAP component from now supports the ability to generate SOAP responses given a WSDL
* Readme.md has been updated

### PostgreSQL Component

[Click to open Component documentation](/components/postgresql/)

#### Fixed bugs

* Fix incorrect error response handling

### JDBC Component

[Click to open Component documentation](/components/jdbc/)

#### New features

* Add new action 'Insert action'

### Sugar CRM Component

[Click to open Component documentation](/components/sugarcrm/)

#### Fixed bugs

* Action / Upsert Account field postal address is now not limited to 20 characters

### XML Component

[Click to open Component documentation](/components/xml/)

#### Fixed bugs

* Fix a bug with getting 'File's metadata is not found' message when trying to handle attachments
* Fix a bug with filtering files by name

## v25 Release

> Released date: October 10, 2019

This release included updates and bug fixed to the following components:

### Google Spreadsheet Component

[Click to open Components documentation](/components/gspreadsheet/)

#### New features

* Google Spreadsheet component from now retrieves actual data without formatting and reads spreadsheets as numbers/values without formatting

### Shopify admin Component

[Click to open Component documentation](/components/shopify-admin/)

#### New features

* The component has been fully refactored in order to comply OIH standards
* New `Lookup Objects` action has been introduced

### JDBC Component

[Click to open Component documentation](/components/jdbc/)

#### Fixed bugs

* A bug when no schemas in dropdown list for call procedures action are displayed has been fixed

### CSV Component

[Click to open Component documentation](/components/csv-component/)

#### Fixed bugs

* Fix a bug when `Error: write after end` message had been thrown in `Write CSV attachment` action in runtime in some cases

### Magento2 Component

[Click to open Component documentation](/components/magento2/)

#### New features

* Component completeness matrix has been added to the component documentation

## v26 Release

> Released date: October 24, 2019

This release included updates and bug fixed to the following components:

### JDBC Component

[Click to open Component documentation](/components/jdbc/)

#### Fixed bugs

* New action 'Execute custom query' has been introduced
* Rebound (retry) mechanism for 'Transaction Lock' error has been added
* 'Get Rows Polling' Trigger has got an improved datetime field type support

### SFTP Component

[Click to open Components documentation](/components/sftp/)

#### New features

* Support for custom ports has been introduced
