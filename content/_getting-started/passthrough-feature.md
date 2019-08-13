---
title: Passthrough Feature Overview
layout: article
section: Basic Concepts
order: 3
---

This document provides basic information on [passthrough feature](#passthrough-feature) and gives an [example](#example) of its use.

## Passthrough Feature

Most components in an integration Flow receive, process and send messages. After processing, some or even all the data may be lost, so the message a component receives is typically different from the data it sends. The final component may receive something completely different, without even a small trace of the initial message. If you want a component to process data other than what it receives from the previous step, you can use passthrough.

Basically, passthrough maintains copies of all messages per step in the Flow, and adds them to each following message. This way, data received by *Step 4* will contain the message sent by *Step 3*, and a special section with the messages received by *Step 1*, *Step 2* and *Step 3*. Normally, *Step 4* would only read and process the data sent by *Step 3*, but you can configure it to choose a message from any other previous step, if required.      


## Example

Let's say that Flow Baboon consists of 4 steps: Webhook, CRM, Logger and Email.

1\. The Webhook receives a trigger message when someone fills in a registration form, and sends the registration data to the CRM.

2\. The CRM does its magic and sends a "report" to the Logger.   

3\. The Logger logs the new registered member, but its outgoing message does not contain anything beneficial for the Email component.

4\. The Email uses passthrough to read the required data from the initial message, or CRM message, and sends out an email.




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
