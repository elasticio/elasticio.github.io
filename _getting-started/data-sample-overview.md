---
title: Data Sample Overview
layout: article
section: Basic Concepts
order: 1
---

This document provides basic information on [data samples](#data-samples) and how they are useful when [building integration flows](#samples-in-integraton-flows). Additionally, it gives high-level information about [exceptions](#exceptions).

## Data Sample


A data sample is an example of [component](/integration-component) output data.
It is essential in building integration flows, because it allows you to see what
sort of data the next component in the flow will receive from the previous one.
With this information you can configure the next component to act properly on
the input it receives.

## Samples in Integration Flows


Each component in a flow has its own input/output data standards. For proper
flow operation, the components need [data mapping](//guides/mapping-data). It is a process of
data conversion from one component’s standard to the next one’s. Basically, data
mapper retrieves data from one component and relays it to the next component in
a compatible form. In order to see what sort of output data the first component
produces we use data sample.

A data sample can be retrieved from a component or written manually by the
integrator. In any case, the sample is then given as input to the next
component. The receiving component may not require all the data from the sample
or may require it in completely different order. That’s when you configure
proper mapping so that the receiving component gets input in accordance with its
standard.

**NOTE:** Samples exist for flow building and testing purposes. However, the data from samples will go into production when you run the flow. If you want to avoid this, you can use **Generate Stub Sample** function. It retrieves the component's output template and fills it with fake data that you can discard afterwards.

Let’s observe the following process example:

1.  Component Baboon is followed by Component Toucan.

2.  When we select *Component Toucan*, we can see what sort of data it accepts as
    input.

3.  By retrieving a data sample from *Component Baboon*, we can see what sort of
    data it provides as output.

4.  Then we configure the data mapper to relay *Baboon* data to *Toucan*, converting
    it first into a form acceptable by *Toucan*. The mapping process may include
    ignoring some of the output fields, switching field places, etc.

5.  On the example scheme we can see, that *Baboon* sends out the following data:
    `Name`, `Surname`, `Address`, `Phone Number` and `Email`. Component *Toucan* doesn’t
    need `Email`. Also, it has `Name and Surname` together in one field. Data mapper
    makes the necessary changes into Baboon output, so that the data fits *Toucan*
    input standard.

![](/assets/img/getting-started/what-is-a-sample/Screenshot_1.png)

**NOTE:** Not all components work in by the same process. Some of them, for example service components, have their own setup behavior.

## Exceptions

There are components that have a different approach to input or output, for example:

- Components that expect a file, for example a *.json* array, as input. They will parse the file for the required data.

- Components that do not accept manual mapping, but instead accept a certain type of data as input, for example a *JSONata* expression.

- Components that only accept manual mapping.
