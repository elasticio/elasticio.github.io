---
title: Smarty-streets Technical Notes
layout: component
description: Technical notes for the Smarty-streets component
icon: smarty-streets.png
icontext: Smarty-streets component
category: Smarty-streets component
updatedDate: 2025-05-13
ComponentVersion: 3.0.0
---

## Changelog

### 3.0.0 (May 13, 2025)

* **BREAKING CHANGE** - In previous versions in case of an error there were both an error and a successful message in the executions. Now if an error happens, a message won't be emitted. Only a platform error will be thrown.
* Sailor version updated from 2.1.0 to 4.0.3
* smartystreets-java-sdk version updated from 3.2.0 to 3.10.7
* json-schema-validator version updated from 2.2.8 to 2.2.14
* jackson-module-jsonSchema version updated from 2.9.4 to 2.19.0
* Gradle builder version updated from 5.4.1 to 7.5.1

### 2.0.2 (May 17, 2023)

* Fix versions mismatch
* Update gradle wrapper
