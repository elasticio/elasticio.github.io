---
title: Stripe Technical Notes
layout: component
description: Technical Notes for the Stripe component.
icon: stripe.png
icontext: Stripe component
category: stripe
updatedDate: 2022-12-30
ComponentVersion: 1.1.0
---

## Changelog

### 1.1.0 (December 30, 2022)

* Changed internal library from stringify to qs.stringify to properly encode JSON data into application/x-www-form-urlencoded required by Stripe.
Now instead of specifying an input body in 'application/x-www-form-urlencoded' format as required by the Stripe API you can put either a plain JSON body or application/x-www-form-urlencoded data.

### 1.0.0 (July 1, 2022)

* Added `Make Raw Request` Action
* Initial component release
