---
title: NetSuite Changelog
layout: component
description: Changelog for NetSuite component.
icon: netsuite.png
icontext: NetSuite component
category: NetSuite component
createdDate: 2019-12-27
updatedDate: 2019-12-27
---

## 2.1.1 (August 8, 2019)

- Modify Error Handling in component with custom ComponentException

## 2.1.0 (July 26, 2019)

### Add actions according to OIH standards:

 - Lookup Objects
 - Lookup Object By Id
 - Delete Object By Id
 - Upsert Object By Id

### Mark Actions as deprecated:

 - Lookup Customer by External or Internal ID
 - Lookup Invoice by External or Internal Id
 - Update or Insert Vendor in NetSuite
 - Update or Insert Customer in NetSuite
 - Update or Insert Contact in NetSuite
 - Update or Insert Invoice in NetSuite
 - Update or Insert Sales Order in NetSuite

### Add Triggers according to OIH standards:

 - Get New and Updated Objects Polling

### Mark Triggers as deprecated:

 - Search entity

### Improve Custom fields serializers

### Improve JsonSchema generator (added enums for BasicSearch Type)
