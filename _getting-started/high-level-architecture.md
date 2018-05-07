---
title: High Level Architecture
layout: article
section: Basic Concepts
order: 0
category: component
---

## In General
* Integrations consist of a series of [flows](http://docs.elastic.io/getting-started/integration-flow.html)
* Flows are an ordered series of steps
* Flows [can have branches](https://docs.elastic.io/integrator-guide/recipient-list.html) and it is possible to configure which branch(es) a message follows (https://docs.elastic.io/integrator-guide/content-based-router.html)
* Memory is not shared between steps
* Each step receives the output from the proceeding steps in the form of a message and provides information to the following step as a message
* The number of outbound messages does not have to equal the number of inbound messages.  One can emit zero outbound messages or multiple outbound messages
* Each message is a [JSON](https://www.json.org/) string
* Between most steps, there is a [mapping step](https://docs.elastic.io/integrator-guide/mapping-data.html).
* The mapping step transforms the structure of the JSON passing through it
* The instructions to perform the mapping are expressed as [JSONata expression(s)](https://support.elastic.io/support/solutions/articles/14000069448-jsonata-powered-mapper)
* The step following the mapper can inform the step of the structure of the expected incoming message to the mapper either dynamically or statically.  This structure is expressed as a JSONSchema.
* Each step is a [component](http://docs.elastic.io/getting-started/integration-component.html) that is configured for that specific flow
* [A component exposes a set of possible interactions with an external system](https://support.elastic.io/support/solutions/articles/14000036334-component-descriptor-structure)
* Components have the ability to [write documents and other binary data to storage that can be read by other components if the other component has the URL to that resource](https://support.elastic.io/support/solutions/articles/14000057806-working-with-binary-data-attachments-)
* A component should encapsulate API mechanics and programming concepts (e.g. error handling, branching etc) from the flow
* A component should expose its functionality in a generic manner
* A flow can be started in one of two ways:
  * It can be automatically started on a schedule.  A component must expose a trigger in this case or the first step must be the timer component.
  * It can be triggered by an incoming HTTPS request.  In this case, the [webhook component](https://support.elastic.io/support/solutions/folders/14000109800) must be the first step.
* If a flow is triggered by an incoming HTTPS request, it can
  * respond immediately before executing the rest of the flow
  * respond after the flow has executed.  In this case, the structure of the response can be altered however, [in this case the flow must be configured to be "always on"](https://docs.elastic.io/integrator-guide/realtime-flows.html).
* A component can be defined to [accept credentials](https://support.elastic.io/support/solutions/articles/14000032297-add-and-manage-your-security-credentials).  Credentials provide all the information to locate and authenticate for a specific account for an external system.
* All steps are executed in the cloud however, it is possible to configure a step to be [executed on another machine outside the cloud](https://support.elastic.io/support/solutions/articles/14000076461-announcing-the-local-agent-).

## Component Development
* A component is a code library
* Currently [JavaScript (node.js)](https://docs.elastic.io/developer-guide/building-nodejs-component.html) and [Java (and other JVM languages)](https://docs.elastic.io/developer-guide/building-java-component.html) are supported languages for component development
* During execution/build, it is placed inside [an application which handles interactions with its execution environment](https://support.elastic.io/support/solutions/folders/14000113643)
* It can be tested locally through unit and integration tests
* It is [loaded onto the platform by configuring the platform as a git remote and pushing the code to the platform where the platform performs a build](https://docs.elastic.io/developer-guide/deploying-component.html)
* Every component has a [`component.json` file](https://support.elastic.io/support/solutions/articles/14000036334-component-descriptor-structure) which defines the actions, triggers and credentials exposed by the component
* [SSH public/private key pairs are used to authenticate code pushes](https://docs.elastic.io/developer-guide/ssh-keys.html)
* During execution a component can send information to the following places:
  * It can [send a message to the following step](https://support.elastic.io/support/solutions/articles/14000059492-emitdata-event)
  * [It can report an error to the platform](https://support.elastic.io/support/solutions/articles/14000059628-emiterror-event)
  * It can [send information to the next iteration of itself](https://support.elastic.io/support/solutions/folders/14000112651)
  * It can [send information about a credential to the next component to interact with that credential](https://support.elastic.io/support/solutions/folders/14000112862)
  * It can log information to logs which are collected by the platform
  * It can [ask that a message be processed at a later time](https://support.elastic.io/support/solutions/folders/14000109788)
* During execution a component can receive information in the following places:
  * [The incoming message](https://support.elastic.io/support/solutions/articles/14000059492-emitdata-event)
  * [The snapshot produced by the previous execution](https://support.elastic.io/support/solutions/folders/14000112651)
  * [The configuration configured for this specific step](https://support.elastic.io/support/solutions/folders/14000108605)
  * [The credentials object](https://support.elastic.io/support/solutions/articles/14000032297-add-and-manage-your-security-credentials)
  * [Environment variables](https://support.elastic.io/support/solutions/folders/14000108754)
