---
title: NetSuite Technical Notes
layout: component
description: Technical Notes for the NetSuite component.
icon: netsuite.png
icontext: NetSuite component
category: netsuite
updatedDate: 2024-09-04
ComponentVersion: 3.2.0
redirect_from:
  - /components/netsuite/changelog.html
---

## Changelog

### 3.2.0 (August 22, 2024)

* Add Get Item Availability Action

### 3.1.0 (May 26, 2023)

* Add Lookup Objects by Custom Field Action
* Add Add Object Action
* Add Update Object Action

### 3.0.0 (December 16, 2022)

* **Breaking change** - User credentials authentication mechanism has been removed. As it is no more supported by Netsuite SOAP API
* Update API version to 2022.1
* Update Sailor to 3.4.0
* Add 'required' dependencies to component.json fields
* Add a Circle.ci job to build and push images to Docker Hub

### 2.3.1 August 12, 2021)

* Fix build

### 2.3.0 (February 26, 2021)

* Add Token Based Authentication (TBA) option
* Upgrade sailor to 3.3.2

### 2.2.0 (December 11, 2020)

* Domain field in the credentials made required
* Upgrade sailor to 3.3.1
* Annual audit of the component code to check if it exposes sensitive data in the logs
* Annual dependencies vulnerabilities audit

### 2.1.1 (August 2, 2019)

* Modify Error Handling in component with custom ComponentException

### 2.1.0 (July 26, 2019)

* Add actions according to OIH standards:
  - Lookup Objects
  - Lookup Object By Id
  - Delete Object By Id
  - Upsert Object By Id
* Mark Actions as deprecated:
  - Lookup Customer by External or Internal ID
  - Lookup Invoice by External or Internal Id
  - Update or Insert Vendor in NetSuite
  - Update or Insert Customer in NetSuite
  - Update or Insert Contact in NetSuite
  - Update or Insert Invoice in NetSuite
  - Update or Insert Sales Order in NetSuite
* Add Triggers according to OIH standards:
  - Get New and Updated Objects Polling
* Mark Triggers as deprecated:
  - Search entity
* Improve Custom fields serializers
* Improve JsonSchema generator (added enums for BasicSearch Type)
