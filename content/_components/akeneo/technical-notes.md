---
title: Akeneo Technical Notes
layout: component
description: Technical Notes for the Akeneo component
icon: akeneo.png
icontext: Akeneo Component
category: akeneo
updatedDate: 2025-03-21
ComponentVersion: 2.0.1
---
## Changelog

### 2.0.1 (March 21, 2025)

* Fixed input metadata for the `Lookup Objects (plural)` action
* Fixed an issue where no data was emitted in `Emit Individually` mode for the `Lookup Objects (plural)` action
* `Sailor` bumped from 2.7.3 to 2.7.5
* `component-commons-library` bumped from 3.2.1 to 3.2.2

### 2.0.0 (November 07, 2024)

* The component has undergone a significant refactor. Object types in actions and triggers have been reviewed and corrected. Internal code has been updated, and API inconsistencies have been resolved.
* Changes include:
  * Node.js version bumped from 16 to 20
  * Sailor bumped from 2.7.0 to 2.7.3
  * Axios bumped from 0.27.2 to 1.7.7
  * component-commons-library bumped from 3.1.0 to 3.2.1

### 1.0.0 (October 07, 2022)

* Added `Make Raw Request` Action
* Added `Lookup Object By ID` Action
* Added `Lookup Objects (plural)` Action
* Added `Delete Object By ID` Action
* Added `Upsert Object` Action
* Added `Get New and Updated Objects Polling` Trigger
* Initial component release
