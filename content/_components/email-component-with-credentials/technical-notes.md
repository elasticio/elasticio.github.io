---
title: Email component with Credentials Technical Notes
layout: component
description: Technical Notes for the Email component with Credentials.
icon: email-with-credentials.png
icontext: Email component with Credentials
category: email
ComponentVersion: 1.1.0
updatedDate: 2026-10-19
---

## Changelog

### 1.1.0 (October 19, 2026)

* Added support for SMTP transport via optional 'SMTP URI' (`smtpUri`) field in credentials.
* Made 'Mandrill API Key' (`key`) credential field optional (at least one of 'Mandrill API Key' or 'SMTP URI' must be configured).
* Migrated CI/CD from CircleCI to GitHub Actions workflows (`test.yml`, `publish_release.yml`).
* Updated Node.js engine target to `24.x`.
* Upgraded dependencies to latest stable versions:
    * `@elastic.io/component-commons-library`: 4.0.0 -> 4.0.3
    * `axios`: 1.16.0 -> 1.20.0
    * `elasticio-sailor-nodejs`: 2.7.8 -> 2.7.9
    * `nodemailer`: added 10.0.9

### 1.0.1 (May 07, 2026)

* Enabled automatic CSS inlining for HTML emails by adding `inline_css: true` to Mandrill API requests.
* Updated `README.md` with documentation on HTML email styling best practices and provided an inlined HTML example.
* Upgraded dependencies to latest stable versions:
    * `elasticio-sailor-nodejs`: 2.7.4 -> 2.7.8
    * `@elastic.io/component-commons-library`: 3.2.1 -> 4.0.0
    * `axios`: 1.7.7 -> 1.16.0
    * `moment`: 2.29.4 -> 2.30.1
* Removed `elasticio-node` dependency and replaced it with a local utility.

### 1.0.0 (November 22, 2024)

* Initial release
* Copy of the existing [Email component](https://docs.elastic.io/components/email/index.html), enhanced with the ability to set custom credentials, allowing flexible management of different domains, workflows, and API keys.