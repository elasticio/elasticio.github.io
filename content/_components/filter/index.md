---
title: Filter component
layout: component
section: Utility components
description: A component to filter the incoming data based on an arbitrary JSONata expression.
icon: filter.png
icontext: Filter component
category: filter
ComponentVersion: 1.1.4
updatedDate: 2022-11-18
---

## Description

A component to filter the incoming data based on an arbitrary JSONata expression.

## How it works

Filter will pass through the incoming data if it matches the JSONata condition specified in the configuration.
You can use any valid JSONata expression, however it can cause an error to be thrown if it is invalid based on the context.

>**For example:** $number(hello) > 5 where hello: "world". This JSONata expression is valid but an error will be thrown as hello is NaN.

## Requirements

### Environment variables

By default no environment variable is necessary to operate the component.

## Triggers

This component has no trigger functions. This means it will not be selectable as
the first component in an integration flow.

## Actions

### Simple JSONata Filter

![Simple JSONata Filter](img/simple-jsonata-filter.png)

This action has two parameters and a checkbox:

#### Parameters:

`Filter condition` - A **JSONata** expression passed in through the cfg.
The expression will be evaluated to a value of  `true` or `false`.

*   If `false` - a message will be logged to the console and the msg will not be sent forward to the next component.
*   If `true` - a new message with empty body will be passed forward along with all data that passed the condition.

#### Checkbox:

* If checked, the checkbox adds `Assertion` functionality. Instead of doing nothing,
the component will throw an error when the condition is not met.

* `Metadata To Response` Adding passthrough from a previous step to message body as `elasticioMeta` variable, if enabled.

## What can Filter do

Filter condition - A JSONata expression passed in through the cfg.
The expression will be evaluated to a value of true or false.

* If **false** - a message will be logged to the console and the msg will not be sent forward to the next component.
* If **true** - a new message with an empty body will be passed forward along with all data that passed the condition.

The given expressions can be true or false if one and two is numbers:

* $number(one) > $number(two), $number(one) < $number(two),
* $number(one) >= $number(two), $number(one) <= $number(two),
* $number(one) = $number(two), $number(one) != number(two), etc.

body.foo - is true if body.foo is defined and not false.

>**For example:** $exists(body.foo) - if the value exists then it will be defined as true, if not then false.

If given Checkbox is checked:

* Assertion - will throw an error if the condition is not met.
* Metadata To Response - adds passthrough from a previous step to the message body as elasticioMeta variable. That means that data from all previous steps will be added to the message that is emitted.

## Additional Notes

The JSONata Filter expression can be a valid expression however it can cause an
error to be thrown if it is invalid based on the context. For example,
`$number(hello) > 5` where `hello: "world"`. This JSONata expression is valid
but an error will be thrown as `hello` is `NaN`.
