---
title: Mapper component
layout: article
section: Utility Components
---


The beast doing all the hard mapping work
At the moment there are two different languages used to define transformation between input data and result
- [JSONata](http://jsonata.org)
- Based on handlebars template engine (will be deprecated)

# Handlebars expression language
Just do not use

# JSONata expression language

Expression language is an essential part of functionality of the integration platform, it is frequently required to fight
syntactical but also semantical data transformation. Mapper uses [JSONata](http://jsonata.org) expressions to do
complex data transformation. JSONata has many advantages for the use-case:
 - Native JSON support for input but also output. Every valid JSON document is by default a JSONata expression.
 - Set of build-in functions to do content transformation, e.g. type transformation (stirng to number), string transformation
 (splitting, joining, etc.) and even higher-level functions (lambda, map, reduce, etc.)
 - Comprehensive selector mechanism allowing you to navigate nested JSON structures, arrays, predicated-based selectors
 - Ability to add custom functions, e.g. date parsing or output functions

More information you will find on [JSONata website](http://jsonata.org).

## How expressions work

In order to generically apply JSONata expressions to the integration platform context we defined following rules:
- Expression is applied to each incoming message one-by-one, possible runtime errors during evaluation will be reported as
errors to the platform. One input message provides one message at the output of the component.
- Root context is message ``body``. It contains actually data from previous step and, possibly, passthrough data.
