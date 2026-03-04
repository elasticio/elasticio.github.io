---
title: Shopify Admin v2 Technical Notes
layout: component
description: Technical Notes for the Shopify Admin v2 component.
icon: shopify-admin-v2.png
icontext: Shopify Admin v2 component
category: shopify-admin-v2
updatedDate: 2026-03-03
ComponentVersion: 2.5.3
---

## Chagelog

### 2.5.3 (March 03, 2026)
* Fixed issue with GraphQL `InlineFragment` handling in "Additional fields" configuration field.
* Improved the End Time boundary logic in the `Get New and Updated Objects Polling` trigger (see the README)
* Updated Sailor to version 2.7.8.
* Updated `axios` to version 1.13.5.

### 2.5.2 (August 06, 2025)
* Updated Sailor to version 2.7.6.
* Updated `@elastic.io/component-commons-library` to version 4.0.0.
* Updated `axios` to version 1.11.0.
* Removed the `elasticio-node` library.

### 2.5.1 (April 15, 2025)
* Improved errors text
* Bump dependencies

### 2.5.0 (July 08, 2024)
* Added `Upsert Object` action

### 2.4.0 (May, 08, 2024)
* Added `Emit empty object if no entities found` checkbox to `Lookup Objects (plural)` action.

### 2.3.0 (February 13, 2024)

* Added `Webhook` Trigger.
* Fixed issue with missing object types list in `Get New and Updated Objects Polling` trigger.

### 2.2.1 (January 18, 2024)

* Fixed Error `Cannot read properties of null (reading 'map')` `in Lookup Objects (plural)` action.

### 2.2.0 (February 28, 2023)

* Added `Return Full Response` checkbox for `Get New and Updated Objects Polling` Trigger and `Lookup Objects (plural)` Action.
* Fixed Error `There can be only one argument named "after"` in `Get New and Updated Objects Polling` trigger.

### 2.1.0 (February 24, 2023)

* Added `Get New and Updated Objects Polling` Trigger.
* Added `Execute mutation` Action.
* Added `Lookup Object By ID` Action.
* Added `Lookup Objects (plural)` Action.

### 2.0.0 (January 27, 2023)

* Added `Make Raw Request` Action.
* Initial component release.
