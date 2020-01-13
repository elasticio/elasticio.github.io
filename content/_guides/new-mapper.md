---
title: New Mapper UI
layout: article
section: Integrator Guide
category: UI
order: 0
since: 20200109
---

This document presents data mapping on our Platform and provides a detailed description of the new mapper UI.

## Mapping
[Components](/getting-started/integration-component) that receive data from previous steps must be mapped to those steps for proper data processing. Data mapper matches the data from trigger Component to the corresponding fields in the action Component, and that's what we call mapping. You can read all about our current way of data mapping [here](mapping-data). The process remains basically the same, but there is a different UI for it.

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

![New Mapper Components](/assets/img/integrator-guide/new-mapper/Components.png)

### Versions
Here you can select the required Component version.

![New Mapper Versions](/assets/img/integrator-guide/new-mapper/Versions.png)

### Functions
Some Components have more than one way of operation, so you are prompted to select one.

![New Mapper Functions](/assets/img/integrator-guide/new-mapper/Functions.png)

### Agents
Some Components allow you to configure [Local Agent](/getting-started/local-agent.html).

![New Mapper Agents](/assets/img/integrator-guide/new-mapper/Agents.png)

### Credentials
[Credentials](/getting-started/understanding-credentials) hold authentication data for Components. In this tab you can select from the available credentials, add new ones, verify and save them. Also you can edit and delete existing credentials.

![New Mapper Credentials](/assets/img/integrator-guide/new-mapper/Creds.png)

### Input
The actual mapping tab. Here you provide data input for fields required by the Component.

![New Mapper Input](/assets/img/integrator-guide/new-mapper/Input.png)

You can switch to Integrator Mode:

![New Mapper Switch to Integrator](/assets/img/integrator-guide/new-mapper/Switch-integrator.png)

Then, in the Integrator Mode you can switch back:

![New Mapper Switch Back](/assets/img/integrator-guide/new-mapper/Switch-basic.png)

### Sample
This is where you retrieve a [data sample](data-sample-overview). A data sample is an example of Component output data. It is essential in building integration flows, because it allows you to see what sort of data the next component in the flow will receive from the previous one. With this information you can configure the next component to act properly on the input it receives.

![New Mapper Sample](/assets/img/integrator-guide/new-mapper/Sample.png)

### Summary
Tab for Step description. This is optional, but consider adding detailed descriptions to your Steps. This way Flow users won't have to nag you with questions.  

![New Mapper Summary](/assets/img/integrator-guide/new-mapper/Summary.png)
