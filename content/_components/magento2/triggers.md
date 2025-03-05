---
title: Magento 2 triggers
layout: component
description: Magento 2 component triggers page
icon: magento.png
icontext: Magento 2 Component
category: magento2
updatedDate: 2025-02-28
ComponentVersion: 1.7.0
---

* [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
* [Deprecated Triggers](#deprecated-triggers)
   * [Bulk Extract](#bulk-extract)

## Get New and Updated Objects Polling
  
Lookup objects polling trigger.
  
### Component's configuration:
  
**Object Type** - required, choose entity type for polling data. Possible options: Customers, Orders, Products, Categories, Carts.
  
**Start Time** - optional, specifies the timestamp, in ISO8601 format, to start polling from. The default value is the beginning of time (January 1, 1970 at 00:00.000).
  
**End Time** - optional, specifies the timestamp, in ISO8601 format, indicating the end of the polling period.
  
**Size of Polling Page** - optional, positive integer, indicates the size of pages to be fetched. Defaults to 1000.
  
**Store View Code** - optional, the dropdown list with all store view codes, is only available for such object types: Products, Categories. With this option is possible to retrieve products for defined store view.

**pollConfig** - optional, a dropdown list allowing to specify polling based on updated_at or created_at timestamp

**emitBehavior** - optional, a dropdown list allowing to specify emit behavior: Emit individually or Emit page
  
#### Input Metadata
  N/A
  
#### Output Data
Output metadata will be generated dynamically according to Magento2 documentation
  
## Deprecated Triggers

### Bulk Extract
  
Trigger for retrieval of large sets of person and person related data, using bulk Marketo API.

This trigger does not work as Get New and Updated Objects Polling trigger but for bulk operations due to Magento 2 API limitations. It will poll objects according to specified input parameters again after successful execution.

#### Component's configuration:

**Object Type** - required, choose entity type for polling data. Possible options: Customers, Orders, Products.

**Store View Code** - optional, the dropdown list with all store view codes, is useful for object type `Products`. With this option is possible to retrieve products for defined store view.

#### Input Metadata

N/A

#### Output Data

Each object emitted individually.