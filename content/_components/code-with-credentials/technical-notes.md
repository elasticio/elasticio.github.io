---
title: Code component with credentials Technical Notes
layout: component
description: Technical Notes for the Code component with credentials.
icon: code-with-credentials.png
icontext: Code component with credentials
category: code
updatedDate: 2025-09-26
ComponentVersion: 1.0.1
---

## Changelog

### 1.0.1 (September 26, 2025)

* Updated the following dependencies:
 * Node.js version 18 -> 22
 * axios 1.6.8 -> 1.12.2
 * elasticio-sailor-nodejs 2.7.2 -> 2.7.6

### 1.0.0 (March 28, 2024)

The component is derived from the [code-component](/components/code/) `1.2.11`.

  A noteworthy enhancement in this version is the introduction of an authorization mechanism. This mechanism involves the use of credentials, which are available in four distinct types:
  * `No Auth`
  * `Basic Auth`
  * `API Key`
  * `OAuth 2.0`