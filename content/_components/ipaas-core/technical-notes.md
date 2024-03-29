---
title: IPass Core Technical Notes
layout: component
description: Technical Notes for the IPass Core component
icon: ipaas-core.png
icontext: IPaas Core component
category: ipaas-core
updatedDate: 2023-07-07
ComponentVersion: 1.5.2
---

## Chanhelog

### 1.5.2 (July 07, 2023)

* Fixed credential verification

### 1.5.1 (December 02, 2022)

* Updated Sailor version to 2.7.1

### 1.5.0 (August 26, 2022)

* Added `Calculate Flow Dependencies` Action
* Added `Validate Deployability` Action
* Added ability to fetch more that 100 objects (in total) for `Lookup Objects (plural)` action
* Added checkbox `Retrieve only base fields` for `Lookup Objects (plural)` action
* Update Sailor version to 2.6.29

### 1.4.0 (June 03, 2022)

* Hydrate flow with `pubSubTopicName` at actions `Lookup Object By Unique Criteria` and `Lookup Objects (plural)`
* Add logic to handle matching Pub-Sub topics at actions `Upsert Object By Unique Criteria`
* Hydrate flow with `componentSemanticVersion` at actions `Lookup Object By Unique Criteria` and `Lookup Objects (plural)`
* Add logic to handle matching on Semantic Versions at actions `Upsert Object By Unique Criteria`

### 1.3.2 (April 08, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config
* Update component-commons-library version to 2.0.2

### 1.3.0 (January 28, 2022)

* Added new action `Fetch Dynamic Select Model`
* Added new action `Fetch Dynamic Metadata`

### 1.2.0 (January 14, 2021)

* Added new action `Lookup Object (Plural)`

### 1.1.1 (November 26, 2021)

* Performance improvement

### 1.1.0 (November 26, 2021)

* Added new action `Raw HTTP Request`
* Added `secrets` support

### 1.0.3 (September 3, 2021)

* Migrated PlatformApiLogicClient to component-commons-library

### 1.0.2 (August 13, 2021)

* Lookup Object improvement - decrease load to platform API

### 1.0.1 (April 5, 2021)

* Fixed a bug where some flows could not be found if there are more than 20 workspaces

### 1.0.0 (July 3, 2020)

* Component created with actions for Lookup Flow and Upsert Flow

## Completeness Matrix

IPass Core Component Completeness Matrix:

![image](https://user-images.githubusercontent.com/7985390/149104210-165f1a07-7118-422b-8bd9-b80ebf229611.png)
