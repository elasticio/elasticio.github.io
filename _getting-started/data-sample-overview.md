---
title: Data Sample Overview
layout: article
section: Basic Concepts
order: 1
---

This document provides basic information on [data samples](#data-samples) and how they are useful when [building integration flows](#samples-in-integraton-flows).

## Data Sample


A data sample is an example of [component](/integration-component) output data.
It is essential in building integration flows, because it allows you to see what
sort of data the next component in the flow will receive from the previous one.
With this information you can configure the next component to act properly on
the input it receives.

You can generate more than one sample from a component. By default, the first one in the list will be used. Also, you can manually select the proper sample from the list. All unused samples will be deleted once you make a choice.

## Samples in Integration Flows


Each component in a flow has its own input/output data standards. For proper
flow operation, the components need [data mapping](/guides/mapping-data). It is a process of
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

**NOTE:** Samples exist for flow building and testing purposes. Retrieving a sample for an action creates new objects in the target system. If you want to avoid this, you can use **Generate Stub Sample** function. It retrieves the component's output template and fills it with fake data that you can discard afterwards.

Let’s observe the following process example:

1.  *Component Baboon* is followed by *Component Toucan*.

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
