---
title: Snowflake Technical Notes
layout: component
description: Technical Notes for the Snowflake component.
icon: snowflake.png
icontext: Snowflake component
category: snowflake
updatedDate: 2022-07-29
ComponentVersion: 1.3.0
---

## Changelog

### 1.3.0 (July 29, 2022)

* Added schema name to tables names in dropdown lists
* Fixed issue when tables use schema other than PUBLIC
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config
* Update sailor-nodejs to v2.6.29
* Added `emitIndividually` emitBehavior for trigger `Get rows polling trigger`
* Added ability to operate with snowflake `Views` same to `Tables`

### 1.2.1 (November 26, 2021)

* Reduced the size of component icon file

### 1.2.0 (October 28, 2021)

* Added new `Get rows polling trigger`

### 1.1.1 (October 15, 2021)

* Metadata fix for `Execute stored procedure`

### 1.1.0 (October 1, 2021)

- `Upsert row by primary key`
- `Execute stored procedure`

### 1.0.0 (September 25, 2021)

- `Custom query`
- `Insert`
- `Lookup row by primary key`
- `Delete row by primary key`
- `Select`
