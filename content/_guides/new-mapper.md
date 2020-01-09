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
You will arrive at Step Configuration, which presents the following settings in tabs:

1\. [Components](#components)

2\. [Versions](#versions)

3\. [Functions](#functions)

4\. [Agents](#agents)

5\. [Input](#input)

6\. [Sample](#sample)

7\. [Summary](#summary)

You may be familiar with them, but to be sure, let's go over each one.

### Components
In this tab you select the Component for this step.

### Versions
Here you can select the required Component version.

### Functions


### Agents


### Input


### Sample
This is where you retrieve a [data sample](/guides/data-sample-overview.html). A data sample is an example of [component](/getting-started/integration-component) output data. It is essential in building integration flows, because it allows you to see what sort of data the next component in the flow will receive from the previous one. With this information you can configure the next component to act properly on the input it receives.

### Summary
Tab for Step description. This is optional, but consider adding detailed descriptions so that people that will use this Flow won't have to nag you with questions.  
