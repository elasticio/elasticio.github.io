---
title: Zoho Component Technical Notes
layout: component
description: Technical Notes for the Zoho Subscriptions component.
icon: zoho.png
category: zoho
icontext: Zoho component
ComponentVersion: 2.0.0
updatedDate: 2022-08-17
---

## Changelog

##№ 2.0.0 (August 17, 2022)

* Use `OAuth 2.0` protocol to authorize and authenticate calls (Enable `Faceless` service)
* Upgrade sailor version to 2.6.29
* Update Circle.ci config

#№# 1.0.3 (November 26, 2021)

* Upgrade sailor version to 2.6.26
* Reduced the size of component icon file

### 1.0.2 (November 10, 2020)

*   Upgrade to sailor `2.6.18`.
*   Annual audit of the component code to check if it exposes a sensitive data in the logs.
*   Annual npm vulnerabilities audit.

### 1.0.1 (December 30, 2019)

*   Update sailor version to `2.5.4`.
*   Refactor console log to built in sailor logger
*   Change build type to `docker`

### 1.0.0 (December 19, 2019)

*   Initial release
*   Fix malformed input schemas for "Upsert Subscription" action
