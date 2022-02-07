---
title: Mapper UI
description: This document provides a detailed description of the mapper UI used in the integration flow step configuration.
layout: article
section: Data transfer
category: data-transfer
since: 20200116
order: 3
---

Components that receive data from previous steps must be mapped to those steps
for proper data processing. Data mapper matches the data from trigger Component
to the corresponding fields in the action Component, this we call data mapping.
For in-depth explanation of mapping methods we refer to a dedicated
[data mapping](mapping-data) article.

{{page.description}} Depending on component type, not all configuration fields
(steps) will show. For example if the component requires no authorisation, credentials
section would not show. Let us examine each section (or configuration step) in detail.

## Component selector

In this tab you select the Component for this step.

![New Mapper Components](/assets/img/integrator-guide/new-mapper/Components.png)

## Versions

Here you can select the required Component version. As versions may differ by functionality, sometimes it is essential to use the most recent or a bit older one, depending on the task requirements.

![New Mapper Versions](/assets/img/integrator-guide/new-mapper/Versions.png)

## Functions

Some Components have more than one way of operation, so you are prompted to select one.

![New Mapper Functions](/assets/img/integrator-guide/new-mapper/Functions.png)

## Agents

Some Components allow you to configure [Local Agent](/getting-started/local-agent.html).

![New Mapper Agents](/assets/img/integrator-guide/new-mapper/Agents.png)

## Credentials

[Credentials](/getting-started/credential) hold authentication data for Components. In this tab you can select from the available credentials, add new ones, verify and save them. Also you can edit and delete existing credentials.

![New Mapper Credentials](/assets/img/integrator-guide/new-mapper/Creds.png)

## Input

The actual mapping tab. Here you provide data input for fields required by the Component. There are three methods of mapping: **Integrator view**, **JSONata view**, and **Developer Mode**.

**Integrator view** is the standard mapping view, where you can see all the data fields:

![New Mapper Input](/assets/img/integrator-guide/new-mapper/Input.png)

**JSONata view** is intended for JSONata expressions in fields. You can switch to this view like this:

![New Mapper Switch to JSONata](/assets/img/integrator-guide/new-mapper/Switch-Jsonata.png)

In both views you can evaluate the expressions and see which data will be seen as the result. As you can see, our `First Name` and `Last Name` in the field resulted in the complete name:

![Evaluate Data](/assets/img/integrator-guide/new-mapper/Evaluate.png)

If you want to code your mapping manually, you can use the **Developer Mode**:

![New Mapper Switch to Developer Mode](/assets/img/integrator-guide/new-mapper/Switch-Developer.png)

Data is evaluated the same way in Developer Mode, with green light showing that everything works, and red, if not:

![New Mapper Switch to Developer Mode](/assets/img/integrator-guide/new-mapper/Evaluate-Developer.png)

Then, you can switch back to Integrator view:

![New Mapper Switch to Integrator Mode](/assets/img/integrator-guide/new-mapper/Switch-integrator.png)

## Sample

This is where you retrieve a [data sample](/getting-started/data-sample-overview). A data sample is an example of Component output data. It is essential in building integration flows, because it allows you to see what sort of data the next component in the flow will receive from the previous one. With this information you can configure the next component to act properly on the input it receives.

![New Mapper Sample](/assets/img/integrator-guide/new-mapper/Sample.png)

## Summary

Tab for Step description. This is optional, but consider adding detailed descriptions to your Steps. This way Flow users won't have to nag you with questions. Additionally, there may be Credentials here, and a [passthrough](/getting-started/passthrough-feature.html) switch to turn passthrough on and off for this step.

![New Mapper Summary](/assets/img/integrator-guide/new-mapper/Summary.png)

## Related links

- [Integration Component Overview](/getting-started/integration-component.html)
- [Mapping data](mapping-data)
- [Local Agent](/getting-started/local-agent.html)
- [Understanding credentials](/getting-started/credential)
- [Data Sample Overview](/getting-started/data-sample-overview)
- [Passthrough Feature](/getting-started/passthrough-feature.html)
