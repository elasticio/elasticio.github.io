---
title: Git-Protocol Technical Notes
layout: component
description: Technical Notes for the Git-Protocol component
icon: git-protocol.png
icontext: Git-Protocol component
category: Git-Protocol
ComponentVersion: 1.3.0
updatedDate: 2026-02-05
---

## Changelog

### 1.3.0 (February 05, 2026)

* Added a "Beautify JSON files" option to the `Create Commit` action to improve the readability of diffs.
* Enhanced test suite with more comprehensive tests for `Create Commit` action and edge cases.
* Fixed internal dependencies to resolve test failures.
* Fixed a race condition where parallel executions would collide on the local file system by using unique temporary directories for each action.
* Updated documentation to include known limitations regarding concurrency and remote push conflicts.

### 1.2.5 (August 23, 2024)

* Updated `nodegit` to 0.28.0-alpha.11

### 1.2.4 (June 3, 2024)

* From now it is possible to provide either Maester Object ID or the Maester Object URL as an input in the Create Commit Action

### 1.2.3 (February 01, 2023)

* Add GHSA-hrpp-h998-j3pp vulnerability to .nsprc

### 1.2.2 (February 01, 2023)

* Add Circleci context

### 1.2.1 (February 01, 2023)

* Test commit for testing pushing the image to the Docker hub

### 1.2.0 (October 21, 2022)

* Added support for public git repositories
* Update `sailor-nodejs` to 2.7.0
* Implement custom Dockerfile
* Update Node engine version to 16.13.2

### 1.1.3 (April 22, 2022)

* Update `component-commons-library` to 2.0.2
* Update `sailor-nodejs` to 2.6.27
* Added component-pusher to circleci
* Fix dependencies

### 1.1.2 (December 24, 2021)

* Fixed a bug in verify credentials

### 1.1.1 (December 22, 2021)

* Fixed a bug when metadata could not be loaded in the `Create Commit` action

### 1.1.0 (December 10, 2021)

* Added new action `Read from Branch`

### 1.0.1 (November 26, 2021)

* Change 'Public SSH Key' and 'Passphrase' fields type to PasswordFieldView
* Reduced the size of component icon file

### 1.0.0 (November 12, 2021)

* New action `Create Commit`
