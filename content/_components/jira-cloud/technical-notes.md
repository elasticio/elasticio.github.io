---
title: Jira Cloud Technical Notes
layout: component
description: Technical Notes for the Jira Cloud component.
icon: jira-cloud.png
icontext: Jira Cloud component
category: jira-cloud
updatedDate: 2025-10-21
ComponentVersion: 1.4.1
---

## Changelog

### 1.4.1 (October 21, 2025)

* Adjusted `Page Size` handling for Jira API v3 `/search/jql` endpoint

### 1.4.0 (September 25, 2025)

* **Atlassian is deprecating the `/search` endpoint, therefore, the component has been migrated to `/search/jql`.** Affected items:
  * `Lookup Objects (plural)` action: the field `totalCountOfMatchingResults` will no longer be present, and `Emit Page` will no longer include the field `Page Number [>=0]`, it will emit all pages.
  * `Get New and Updated Objects Polling` trigger: no user‑visible changes are expected.
* Updated Sailor to version 2.7.6.
* Updated `@elastic.io/component-commons-library` to version 4.0.0.
* Updated `axios` to version 1.12.2.
* Removed the `elasticio-node` library.

### 1.3.0 (May 30, 2023)

* Added support `Jira Service Management Cloud`

### 1.2.0 (April 28, 2023)

* Added `Delete Object` Action
* Added `Lookup Objects (plural)` Action
* Added `Get New and Updated Objects Polling` Trigger

### 1.1.0 (March 24, 2023)

* Added `Lookup Object (at most one)` Action
* Added `Upsert Object` Action

### 1.0.0 (March 10, 2023)

* Added `Make Raw Request` Action
* Initial component release
