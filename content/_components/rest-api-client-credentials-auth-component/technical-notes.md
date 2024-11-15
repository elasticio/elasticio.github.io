---
title: Rest API OAuth2 Client Credentials Component Technical Notes
layout: component
description: Technical Notes for the Rest API OAuth2 Client Credentials component
icon: rest-api-client-credentials-auth-component.png
icontext: Rest API OAuth2 Client Credentials Component
category: rest-api-client
updatedDate: 2024-11-15
ComponentVersion: 1.3.1
---

## Changelog

### 1.3.1 (November 15, 2024)

* Update Sailor to `2.7.4` to fix the issue with the disappearing rebound indication

### 1.3.0 (November 07, 2024)

* Updated API request handling to use `axiosReqWithRetryOnServerError` from `component-commons-library`
* Added new option `Rebound Selected Codes` to configuration field `Error Tolerance` in `HTTP request` action
* Update Sailor version to `2.7.3`
* Update component-commons-library version to `3.2.1`

### 1.2.0 (June 03, 2024)

* Added `Maximum response size in bytes` configuration field to `HTTP request` action.

### 1.1.0 (December 29, 2023)

* Added `Request timeout` in sec configuration field to `HTTP request` action.
* Set default requests timeout to 60sec.
* Added more detailed logs for errors.

### 1.0.1 (October 31, 2023)

* Updated dependencies to the latest versions.
* Made REST client reusable.

### 1.0.0 (November 26, 2021)

* Added `HTTP request` action.
