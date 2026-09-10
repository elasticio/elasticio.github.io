---
title: Data Mapping
layout: article
section: Platform Features
order: 18
description: How data actually moves from one step of a flow to the next, and the tools you have for shaping it along the way.
category: platform-features
---

A trigger or action produces output fields; the next step in your flow needs input fields — and those two field lists are almost never identical in name, shape, or format. **Data Mapping** is where you tell the platform exactly how one step's output becomes the next step's input, and it's a step you'll touch in essentially every flow you build.

## The mapping screen

Every step after the first in a flow has a mapping screen showing the incoming fields on one side, sourced from a real [data sample](/guides/data-sample-overview) pulled from the previous step, and the fields the current step expects on the other. Mapping a simple value is a matter of connecting the two — drag a source field onto a destination field, or type a fixed value directly into it.

Not every field needs a value: a field marked required must be mapped or filled in before the step will save; optional fields can be left empty. Getting this distinction right early avoids a class of runtime errors that only show up once real data starts flowing.

## When a straight connection isn't enough

Source and destination fields don't always line up cleanly — a date might need reformatting, a full name might need splitting into first and last, a numeric total might need to be summed across an array. For that, the mapper has a **developer mode** where any field's value can be written as a [JSONata](http://jsonata.org/) expression instead of a straight connection — the same expression language used in [Content-Based Routing](content-based-routing) conditions. The mapper evaluates the expression against your real data sample as you write it, so you can see the actual result before the flow ever runs.

## Arrays and nested objects

Mapping gets more interesting once either side involves an array — for example, mapping each line item of an order to a corresponding line in an invoice. The platform supports array-to-array mapping directly in the same interface, including cases where the array itself contains objects with their own nested fields, without requiring a separate step or a hand-written loop.

## Related links

- [Mapping Data](/guides/mapping-data) — the full walkthrough, including array-to-array mapping and array-of-objects examples
- [Transforming data](/guides/transforming-data) — a closer look at JSONata itself: strings, numbers, dates, and arrays
- [Understanding Data Sample](/guides/data-sample-overview)
- [Content-Based Routing](content-based-routing)
