---
title: Google-translate Technical Notes
layout: component
description: Technical Notes for the Google translate component.
icon: google-translate.png
icontext: Google-translate component
category: google-translate
updatedDate: 2024-03-28
ComponentVersion: 2.0.0
---

## Changelog

### 2.0.0 (March 29, 2024)
* Breaking Changes:
  * Google Translate library switched from `google-translate:3.0.0` to `@google-cloud/translate:8.1.0`.
  * Translate Object Properties has not been transferred to this component version.
  * Actions metadata has been changed.
  * Action *Translate Array of Objects* renamed (and reworked) to *Translate Array of Texts*.
* Updated Sailor to `2.7.2`.
* Updated dev libraries.
* Fixed credentials verification stuck issue.

### 0.0.2 (December 10, 2020)

* Update Sailor version to 2.6.21
* Annual audit of the component code to check if it exposes sensitive data in the logs
* Annual npm vulnerabilities audit

### 0.0.1 (March 30, 2018)

* Initial release
