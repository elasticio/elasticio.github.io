---
title: Microsoft Dynamics CRM component
layout: component
section: CRM components
description: A customer relations management tool developed by Microsoft.
icon:  msdynamics-crm.png
icontext: Microsoft Dynamics CRM component
category: msdynamics
updatedDate: 2020-11-30
ComponentVersion: 1.2.2
---

## Description

Connects to Products in the Microsoft Dynamics/NAV Family Via the OData API
which use Authorization grant.

### Dynamics Remarks

See [Dynamics Crm Remarks](dynamics-crm-remarks).

### Authentication

See how to [configure an OData App](configuring-odata-app) for Dynamics On Azure
Active Directory for details on this process.

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Microsoft Dynamics CRM component like [changelog](/components/msdynamics-crm/technical-notes#changelog) and [completeness matrix](/components/msdynamics-crm/technical-notes#completeness-matrix).

## Triggers

  1. [Fetch new and updated objects](/components/msdynamics-crm/triggers#fetch-new-and-updated-objects)                         
  Get objects which have recently been modified or created.

  2. [Query Accounts](/components/msdynamics-crm/triggers#query-accounts)                                                     
  Query Objects: Accounts

  3. [Query Contacts](/components/msdynamics-crm/triggers#query-contacts)                                                     
  Query Objects: Contacts

  4. [Query Quotes](/components/msdynamics-crm/triggers#query-quotes)                                                         
  Query Objects: Quotes

## Actions

  1. [Bulk Create Objects](/components/msdynamics-crm/actions#bulk-create-objects)                                         
  Provides a simple interface for quickly creating large amounts of objects.

  2. [Bulk Update Objects](/components/msdynamics-crm/actions#bulk-update-objects)                                         
  Provides a simple interface for quickly updating large amounts of objects.

  3. [Bulk Delete Objects](/components/msdynamics-crm/actions#bulk-delete-objects)                                         
  Provides a simple interface for quickly deleting large amounts of objects.

  4. [Delete Object By ID](/components/msdynamics-crm/actions#delete-object-by-id)                                          
  Deletes a Selected Object.

  5. [Lookup Object by Field(s)](/components/msdynamics-crm/actions#lookup-object-by-fields)                                            
  Given a set of criteria which matches exactly one record, find that matching record.

  6. [Upsert Object](/components/msdynamics-crm/actions#upsert-object)                                                
  Creates or Updates Selected Object.

## Deprecated Actions

  1. [Lookup Object by Field(deprecated)](/components/msdynamics-crm/actions#lookup-object-by-fielddeprecated)                  
  Use [Lookup Object by Field(s)](/components/msdynamics-crm/actions#lookup-object-by-fields)  action instead

  2. [Upsert Object(deprecated)](/components/msdynamics-crm/actions#upsert-objectdeprecated)                                    
  Use [Upsert Object](/components/msdynamics-crm/actions#upsert-object)    action instead

  3. [Sync Accounts(deprecated)](/components/msdynamics-crm/actions#sync-accountsdeprecated)                                    
  Use [Upsert Object](/components/msdynamics-crm/actions#upsert-object)    action instead

  4. [Sync Contacts(deprecated)](/components/msdynamics-crm/actions#sync-contactsdeprecated)                                    
  Use [Upsert Object](/components/msdynamics-crm/actions#upsert-object)    action instead

  5. [Sync Invoices(deprecated)](/components/msdynamics-crm/actions#sync-invoicesdeprecated)                                    
  Use [Upsert Object](/components/msdynamics-crm/actions#upsert-object)    action instead

  6. [Sync Orders(deprecated)](/components/msdynamics-crm/actions#sync-ordersdeprecated)                                        
  Use [Upsert Object](/components/msdynamics-crm/actions#upsert-object)    action instead

  7. [Sync Price Levels(deprecated)](/components/msdynamics-crm/actions#sync-price-levelsdeprecated)                            
  Use [Upsert Object](/components/msdynamics-crm/actions#upsert-object)    action instead

  8. [Sync Product Price Levels(deprecated)](/components/msdynamics-crm/actions#sync-price-levelsdeprecated)                    
  Use [Upsert Object](/components/msdynamics-crm/actions#upsert-object)    action instead

  9. [Sync Products(deprecated)](/components/msdynamics-crm/actions#sync-productsdeprecated)                                    
  Use [Upsert Object](/components/msdynamics-crm/actions#upsert-object)    action instead

  10. [Sync Quotes(deprecated)](/components/msdynamics-crm/actions#sync-quotesdeprecated)                                       
  Use [Upsert Object](/components/msdynamics-crm/actions#upsert-object)    action instead

  11. [Sync Unit Groups(deprecated)](/components/msdynamics-crm/actions#sync-unit-groupsdeprecated)                             
  Use [Upsert Object](/components/msdynamics-crm/actions#upsert-object)    action instead

  12. [Sync Units(deprecated)](/components/msdynamics-crm/actions#sync-unitsdeprecated)                                         
  Use [Upsert Object](/components/msdynamics-crm/actions#upsert-object)    action instead

## Legacy Behavior

See the [legacy behavior](legacy-behavior) for details.

## Configuration Info

### Required environment variables

`EIO_REQUIRED_RAM_MB` must be set to `512`.  This is because the metadata file for the service is large enough that it requires additional RAM to be parsed.

For the local testing (e.g. spec-integration) the following environment variables are required:
* `RESOURCE`
* `OAUTH_CLIENT_ID`
* `OAUTH_CLIENT_SECRET`
* `ODATA_API_ROOT_LOCATION`
* `OAUTH_TOKEN`
* `CONTACT_TO_LOOKUP_FIRST_NAME`
* `CONTACT_TO_LOOKUP_TOO_MANY_LAST_NAME`

### Version and compatibility information

This component interacts with OData version 4. It has been tested with:

```
Microsoft Dynamics 365
2020 release wave 1 enabled
Server version: 9.1.0000.18042
Client version: 1.4.831-2005.2
```

## Known limitations

The component was not tested with the latest Microsoft Dynamics CRM version. Althouh it was fully tested with one the recent Dynamics releases, 100% compatibility can not be guaranteed
