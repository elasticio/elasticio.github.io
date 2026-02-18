---
title: NetSuite component
layout: component
section: ERP components
description: An iPaaS component designed to facilitate robust connectivity with the NetSuite ERP API.
icon: netsuite.png
icontext: NetSuite component
category: netsuite
updatedDate: 2026-02-18
ComponentVersion: 3.2.2
---

## Table of Contents

* [General Information](#general-information)
   * [Description](#description)
   * [Purpose](#purpose)
   * [How it Works](#how-it-works)
   * [API Version](#api-version)
* [Requirements](#requirements)
   * [Environment Variables](#environment-variables)
   * [Enable Web Service Communication](#enable-web-service-communication)
* [Credentials](#credentials)
   * [Obtaining Credentials in NetSuite](#obtaining-credentials-in-netsuite)
   * [Authentication on the platform](#authentication-on-the-platform)
* [Triggers](#triggers)
* [Actions](#actions)
* [Known Limitations](#known-limitations)
* [Links](#links)

## General information

### Description
{{page.description}}

### Purpose
The primary objective of this component is to provide a comprehensive suite of tools for interacting with and managing data within the NetSuite ERP ecosystem.

### How it works
Communication with NetSuite is established using the native SOAP SDK, ensuring reliable and secure data exchange.

### API version

This component is optimized for and supports NetSuite version **2022.1**. While it is likely to remain functional with other versions, absolute compatibility is guaranteed only for the specified release.

## Requirements

### Environment variables

Component requires 1024 MB of RAM memory to properly function. It is recommended
to increase the RAM memory prior any activity (credentials verify, retrieve sample). Contact [support](mailto:{{site.data.tenant.supportEmail}}) for more.

| Variable            | Value  |
| ------------------- |:------:| 
| EIO_REQUIRED_RAM_MB | 1024   | 

### Enable web-service communication

NetSuite’s Web Services SOAP interface allows you to communicate with the ERP
and to integrate external systems with it. NetSuite's native SDK, which is used
for the communication in the component, uses NetSuite’s SOAP Web Services under
the hood.

By default web service communication is disabled in NetSuite. So it should be
enabled in order to allow component make calls. To enable Web Service communication:

1. Navigate to **Setup > Company > Enable Features**.
2. Select the **SuiteCloud** tab and locate the **SuiteTalk** section.
3. Check the **Web Services** box.
4. Click **Save**.

![Enable Web Service](https://user-images.githubusercontent.com/8449044/44262942-9a3d5300-a225-11e8-840d-834528f68776.png)

## Credentials

Netsuite connector since version 3.0.0+ only supports **Token-Based Authentication (TBA)**. Support of a user credentials mechanism has been removed by Netsuite SOAP API.

### Obtaining Credentials in NetSuite

To use Token-Based authentication you must at first setup a Netsuite account:

#### 1. Enable Integration
1. Navigate to **Setup > Company > Enable Features > SuiteCloud > Manage Authentication**.
2. Enable **Token-Based Authentication**.
3. Navigate to **Setup > Integrations > Manage Integrations**.
4. Click **New**.
5. Assign a name to the integration. 
6. Ensure **Token-Based Authentication** is checked. 
7. Uncheck **TBA: AUTHORIZATION FLOW** and **AUTHORIZATION CODE GRANT**.
8. Ensure **TBA: ISSUETOKEN ENDPOINT** is checked.
9. **Important:** Securely record the **Consumer Key** and **Consumer Secret**. These values are only displayed once.

#### 2. Configure Role and Permissions
1. Navigate to **Setup > Users/Roles > Manage Roles > New**.
2. Create a new role and assign the required permissions (e.g., access to specific NetSuite object types and transactions).
3. The role must include **User Access Tokens** and **SOAP Web Services** permissions.
4. Assign this role to the integration user via **Lists > Employees > Edit User > Access tab > Roles subtab**.

#### 3. Generate Access Token
1. Navigate to **Setup > Users/Roles > Access Tokens > New**.
2. Select the **Integration**, **User**, and **Role** created in the previous steps.
3. **Important:** Securely record the **Token ID** and **Token Secret**. These values are only displayed once.

#### Required Fields

*   **Domain**: Your NetSuite domain endpoint (e.g., `https://{accountId}.suitetalk.api.netsuite.com`). Locate this in the NetSuite UI under **Setup > Company > Company Information** in the **Company URLs** subtab.. Should be something like `https://{accountId}.suitetalk.api.netsuite.com`.
* **Account**. Account Number to access NetSuite API. This number is required for the component to connect to NetSuite via native SuiteTalk API. Can be found here:
    1. Go to **Setup** -> **Integration** -> **Web Services Preferences**.
    2. Find `ACCOUNT ID` field there.
    ![Account id location](img/account_id_location.png)
    
> **Please Note:** Make sure you have copied an account name exactly how it is specified in Netsuite UI.

* **Consumer Key**.
* **Consumer Secret**.
* **Token Id**.
* **Token Secret**.

### Authentication on the platform

In order to use the functions of the NetSuite component, you need to go through the authentication process. 

Please paste the required fields described in the steps above. After filling in all fields, click **Verify** to validate the credentials, then click **Save** to store them.
![Credentials](img/credentials.png)

## Triggers

NetSuite component includes the following triggers:

  - [Get New and Updated Objects Polling](/components/netsuite/triggers#get-new-and-updated-objects-polling)                            
  This versatile trigger monitors a NetSuite instance for new or modified objects across all supported types.

The following NetSuite triggers are deprecated:

  - [Search Entity (deprecated)](/components/netsuite/deprecated-functions#search-entity-deprecated)                                                  
  Deprecated. Use [Get New and Updated Objects Polling](/components/netsuite/triggers#get-new-and-updated-objects-polling) trigger instead. Find an object or a set of objects using filter criteria (field, operator, value).

## Actions

NetSuite component includes the following actions:

  1. [Add Object](/components/netsuite/actions#add-object)       
  Creates a new record in NetSuite.

  2. [Delete Object By Id](/components/netsuite/actions#delete-object-by-id)       
  Deletes a record from NetSuite using its Internal or External ID.

  3. [Get Item Availability](/components/netsuite/actions#get-item-availability)      
  Retrieves real-time availability for a specific item.

  4. [Lookup Object By Id](/components/netsuite/actions#lookup-object-by-id)       
  Retrieves a specific record by its ID.

  5. [Lookup Objects](/components/netsuite/actions#lookup-objects)       
  Searches for objects in NetSuite that match specific criteria.

  6. [Lookup Objects By Custom Field](/components/netsuite/actions#lookup-objects-by-custom-field)       
  Finds records matching a specific custom string field.

  7. [Update Object](/components/netsuite/actions#update-object)        
  Modifies an existing record in NetSuite.

  8. [Upsert Object By Id](/components/netsuite/actions#upsert-object-by-id)       
  Updates an existing record or creates a new one if the ID is not found.

  9. [Upsert Custom Fields](/components/netsuite/actions#upsert-custom-fields)       
  Can upsert custom fields in NetSuite.  

The following NetSuite actions are deprecated:

  1. [Lookup Customer (deprecated)](/components/netsuite/deprecated-functions#lookup-customer-deprecated)       
  Deprecated. Use [Lookup Object By Id](/components/netsuite/actions#lookup-object-by-id) action instead. This action enables to find the customer by provided ID.

  2. [Lookup Invoice (deprecated)](/components/netsuite/deprecated-functions#lookup-invoice-deprecated)       
  Deprecated. Use [Lookup Object By Id](/components/netsuite/actions#lookup-object-by-id) action instead. This action can be used to find invoices by provided ID.

  3. [Upsert Customer (deprecated)](/components/netsuite/deprecated-functions#upsert-customer-deprecated)       
  Deprecated. Use [Lookup Object By Id](/components/netsuite/actions#lookup-object-by-id) action instead. Create new or update existing customer by provided external ID.

  4. [Upsert Contact (deprecated)](/components/netsuite/deprecated-functions#upsert-contact-deprecated)       
  Deprecated. Use [Upsert Object By Id](/components/netsuite/actions#upsert-object-by-id) action instead. Create new or update existing contact by provided external ID.

  5. [Upsert Invoice (deprecated)](/components/netsuite/deprecated-functions#upsert-invoice-deprecated)       
  Deprecated. Use [Upsert Object By Id](/components/netsuite/actions#upsert-object-by-id) action instead. Create new or update existing invoice by provided external ID.

  6. [Upsert Sales Order (deprecated)](/components/netsuite/deprecated-functions#upsert-sales-order-deprecated)       
  Deprecated. Use [Upsert Object By Id](/components/netsuite/actions#upsert-object-by-id) action instead. Create new or update existing sales order by provided external ID.

  7. [Upsert Vendor (deprecated)](/components/netsuite/deprecated-functions#upsert-vendor-deprecated)       
  Deprecated. Use [Upsert Object By Id](/components/netsuite/actions#upsert-object-by-id) action instead. Create new or update existing vendor by provided external ID.

## Links

* [NetSuite API Documentation](http://www.netsuite.com/portal/developers/resources/suitetalk-documentation.shtml).

* [Open Integration Hub Standards](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#lookup-objects-plural).