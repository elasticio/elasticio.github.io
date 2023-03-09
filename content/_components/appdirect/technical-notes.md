---
layout: component
title: AppDirect Technical Notes
description: Technical notes for the AppDirect component.
icon:  appdirect.png
icontext: AppDirect Component
category: appdirect
ComponentVersion: 2.0.0
updatedDate: 2021-05-11
redirect_from:
  -/components/appdirect/changelog.html
  -/components/appdirect/completeness-matrix.html
---

## Changelog

### 2.0.0 (May 11, 2021)

* OAuth2 secrets feature implemented
* Unit and integration tests fixed

### 1.0.5 (November 27, 2020)

* Update sailor version to 2.6.19
* Add `Finalize Opportunity` action
* Add `Request Opportunity Review` action
* The following object types were added to `Create Object` action:
  - `Opportunity`
  - `Opportunity Item`
  - `Lead`
* The following object types were added to `Update Object` action:
  - `Opportunity`
  - `Opportunity Item`
  - `Company`
  - `Lead`
* Change metadata for the following actions:
  - `Update Object`. `Company` object type
  - `Lookup Objects`. `Company` object type


### 1.0.4 (November 06, 2020)

* Update sailor version to 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs

### 1.0.3 (July 29, 2020)

* Changed `Create Company` metadata according to the AppDirect requirement.

### 1.0.1 (May 7, 2020)

* Improve credentials verification

### 1.0.0 (June 12, 2019)

#### New Actions

- Create Entity
- Update Entity
- Lookup Object By ID
- Lookup Objects
- Delete Object By ID
- Enable/Disable company membership
- Invite company membership

#### New Triggers

- Webhook subscription

## Completeness Matrix

Here is a Completeness Matrix for AppDirect component:

![image](https://user-images.githubusercontent.com/36419533/89995162-d16a6180-dc91-11ea-9e27-08ba507d130e.png)
