---
title: Stripe Technical Notes
layout: component
description: Technical Notes for the Stripe component.
icon: stripe.png
icontext: Stripe component
category: stripe
updatedDate: 2024-03-01
ComponentVersion: 1.2.0
---

## Changelog

### 1.2.0 (March 01, 2024)

* Added `Lookup Objects (plural)` Action

### 1.1.0 (December 30, 2022)

* Changed internal library from stringify to qs.stringify to properly encode JSON data into application/x-www-form-urlencoded required by Stripe.
Now instead of specifying an input body in 'application/x-www-form-urlencoded' format as required by the Stripe API you can put either a plain JSON body or application/x-www-form-urlencoded data.

### 1.0.0 (July 1, 2022)

* Added `Make Raw Request` Action
* Initial component release
