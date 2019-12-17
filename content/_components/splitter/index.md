---
title: Splitter component
layout: component
section: Utility components
description: The Splitter integration connector was designed to work together with the JSONata-powered Mapper.
icon: splitter.png
icontext: Splitter component
category: Splitter component
createdDate: 2017-03-31
updatedDate: 2019-09-19
---

## Description

The Splitter processes income messages containing multiple elements that might have to be processed in different ways. The Splitter emits out the composite message into individual messages, each containing data related to one item.

### Environment variables

Component does not have any required environment variables, but we suggest to use `EIO_REQUIRED_RAM_MB` in order to avoid `Component run out of memory and terminated` error, recommended value of allocated memory is `512` MB.

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Split Message By Array

**This action is deprecated, please use Split on JSONata Expression instead.**

Splits a message into multiple messages using a given separator. The separator is treated as a path to a property inside the message. A message is split when a property is an array and emitted are multiple messages. Otherwise the original message is emitted.

For example, we have a message:

```
{
    "users": [
        {
            "name": "John"
        },
        {
            "name": "Mike"
        }
    ]
}
```

The splitting expression is "users", action will return output:
```
{
    "name": "John"
}

{
    "name": "Mike"
}
```
*Notes:*

- *When splitting expression refers to an object splitter returns this object;*
- *When splitting expression contains primitive value like ```users:"John"``` or array of primitives like ```users:["John", "Mike", "Anna"]``` splitter emits error.*

### Split on JSONata Expression

This component takes the incoming message body and applies the configured JSONata tranformation on it. The evaluated transformation must be an array. This array is split and emitted into multiple messages.

For example, given the following message:

```
{
    "FirstName": "Fred",
    "Surname": "Smith",
    "Phone": [
        {
            "type": "home",
            "number": "0203 544 1234"
        },
        {
            "type": "office",
            "number": "01962 001234"
        },
        {
            "type": "mobile",
            "number": "077 7700 1234"
        }
    ]
}
```

and the JSONata expression `Phone.{type: number}`, an object constructor, the action will return output:
```
{
    "home": "0203 544 1234"
}

{
    "office": "01962 001234"
}

{
    "mobile": "077 7700 1234"
}
```
*Notes:*

- *If the evaluated array contains primitive values like ```users:["John", "Mike", "Anna"]```, the splitter emits error.*

### List of Expected Config fields

```Split Property``` - use this field to choose a separator.

## Documentation links

More information and some examples can be found here: [Splitter documentation](https://www.elastic.io/connectors/splitter-integration/)
and here: [Array splitting and JSONata mapper](https://support.elastic.io/support/solutions/articles/14000069604-array-splitting-and-jsonata-mapper)
