---
layout: component
title: Microsoft Dynamics CRM Client Credentials Technical Notes
description: Technical Notes for Microsoft Dynamics CRM Client Credentials component.
icon: msdynamics-crm-v2.png
icontext: Microsoft Dynamics CRM Client Credentials component
category: msdynamics-client-credentials
ComponentVersion: 1.0.0
updatedDate: 2026-11-06
---

## Changelog

### 1.0.0 (November 06, 2026)
* Initial release of the Microsoft Dynamics CRM Client Credentials component
* Forked from `microsoft-dynamics-crm-v2` (`1.3.1`) to introduce OAuth 2.0 **Client Credentials Grant** authentication
* Upgraded `@elastic.io/component-commons-library` to `4.0.3`
* Carries over actions and triggers from `microsoft-dynamics-crm-v2`:
  * Actions:
    * **Lookup Objects (plural)**
    * **Lookup object (at most one)**
    * **Delete Object By ID**
    * **Upsert Object**,
    * **Make Raw Request**
  * Triggers: **Get New and Updated Objects Polling**
* Removed action:
  * **Extract Raw System Metadata**