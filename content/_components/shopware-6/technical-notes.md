---
title: Shopware 6 Technical Notes
layout: component
description: Technical Notes for the Shopware component.
icon: shopware.png
icontext: Shopware-6 component
category: shopware-6
updatedDate: 2022-09-23
ComponentVersion: 1.1.1
---

## Chagelog

### 1.1.1 (September 23, 2022)

* Fix sample retrieving when message body is empty
* Correct amount of objects to emit in sample (10 objects maximum)
* Now error will be thrown if `Start Time` is bigger `End Time` in `Get New and Updated Objects Polling` Trigger

### 1.1.0 (September 09, 2022)

* New authentication method using client credentials grant
* Added `Lookup Object (at most one)` Action
* Added `Lookup Objects (plural)` Action
* Added `Upsert Object` Action
* Added `Delete Object By ID` Action
* Added `Get New and Updated Objects Polling` Trigger

### 1.0.0 (August 12, 2022)

* Added `Make Raw Request` Action
* Initial component release
