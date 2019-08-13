---
title: Passthrough Feature Overview
layout: article
section: Basic Concepts
order: 3
---

This document provides basic information on [passthrough feature](#passthrough-feature) and gives an [example](#example) of its use.

## Passthrough Feature

Most components in an integration Flow receive data, process it in some way, and send data to the next step, or elsewhere. The thing is, in a generic Flow the message fed to Step 6 may be completely different from the data on Step 1. What if Step 6 requires the initial data that was fed to Step 1 in the beginning? That's exactly what Passthrough is for. Basically, it adds every previous message to the next one in a numbered "list". In the end, the data sent by Step 5 to Step 6 includes the "operational" message of Step 5, and all the messages from the previous steps.

## Samples in Integration Flows


[data mapping](/guides/mapping-data). It is a process of
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
