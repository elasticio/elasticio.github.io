---
title: Stripe Technical Notes
layout: component
description: Technical Notes for the Stripe component.
icon: stripe.png
icontext: Stripe component
category: stripe
updatedDate: 2026-05-05
ComponentVersion: 1.3.0
---

## Changelog

### 1.3.0 (May 5, 2026)

* Added `Upsert Object` action
* Updated default Stripe API version to `2026-04-22.dahlia` in `Make Raw Request` action
* Modernized dependencies:
    * `Node.js`: 18 -> 24
    * `axios`: 0.27.2 -> 1.15.2
    * `qs`: 6.11.0 -> 6.15.1
    * `@elastic.io/component-commons-library`: 3.1.5 -> 4.0.0
    * `elasticio-sailor-nodejs`: 2.7.1 -> 2.7.8
    * `uuid`: 8.3.2 -> 9.0.1
* Removed legacy `elasticio-node` and `elasticio-rest-node` libraries

### 1.2.0 (March 01, 2024)

* Added `Lookup Objects (plural)` Action

### 1.1.0 (December 30, 2022)

* Changed internal library from stringify to qs.stringify to properly encode JSON data into application/x-www-form-urlencoded required by Stripe.
Now instead of specifying an input body in 'application/x-www-form-urlencoded' format as required by the Stripe API you can put either a plain JSON body or application/x-www-form-urlencoded data.

### 1.0.0 (July 1, 2022)

* Added `Make Raw Request` Action
* Initial component release
