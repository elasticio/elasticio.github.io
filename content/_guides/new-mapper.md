---
title: New Mapper UI
layout: article
section: Data transformation
category: data-transformation
order: 0
since: 20200109
---

This document presents data mapping on our Platform and provides a detailed description of the new mapper UI.

## Mapping
Components that receive data from previous steps must be mapped to those steps for proper data processing. Data mapper matches the data from trigger Component to the corresponding fields in the action Component, and that's what we call mapping. You can read all about our current way of data mapping [here](mapping-data). The process remains basically the same, but there is a different UI for it.

## New Mapper UI
You will arrive at Step Configuration, which presents some of the following settings in tabs, depending on the Component:

- [Components](#components)

- [Versions](#versions)

- [Functions](#functions)

- [Agents](#agents)

- [Credentials](#credentials)

- [Input](#input)

- [Sample](#sample)

- [Summary](#summary)

You may be familiar with them, but to be sure, let's go over each one.

### Components
In this tab you select the Component for this step.

### Versions
Here you can select the required Component version.

### Functions
Some Components have more than one way of operation, so you are prompted to select one.

### Agents
(ARE THESE LOCAL AGENTS?)

### Credentials
Credentials hold authentication data for Components. In this tab you can select from the available credentials, add new ones, verify and save them. Also you can edit and delete existing credentials.

### Input
The actual mapping tab. Here you provide data input for fields required by the Ccomponent.

### Sample
This is where you retrieve a [data sample](/guides/data-sample-overview.html). A data sample is an example of [component](/getting-started/integration-component) output data. It is essential in building integration flows, because it allows you to see what sort of data the next component in the flow will receive from the previous one. With this information you can configure the next component to act properly on the input it receives.

### Summary
Tab for Step description. This is optional, but consider adding detailed descriptions to your Steps. This way Flow users won't have to nag you with questions.  
