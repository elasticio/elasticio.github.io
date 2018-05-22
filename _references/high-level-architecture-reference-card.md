---
title: High Level Architecture Reference Card
layout: article
order: 1
section: Reference Cards
---

* Integrations consist of a series of [flows](/getting-started/integration-flow)
* Flows are an ordered series of steps
* Flows [can have branches](/integrator-guide/recipient-list) and it is possible to configure which branch(es) a message follows (/integrator-guide/content-based-router)
* Memory is not shared between steps
* Each step receives the output from the proceeding steps in the form of a message and provides information to the following step as a message
* The number of outbound messages does not have to equal the number of inbound messages.  One can emit zero outbound messages or multiple outbound messages
* Each message is a [JSON](https://www.json.org/) string
* Between most steps, there is a [mapping step](/integrator-guide/mapping-data).
* The mapping step transforms the structure of the JSON passing through it
* The instructions to perform the mapping are expressed as [JSONata expression(s)](http://jsonata.org/)
* The step following the mapper can inform the step of the structure of the expected incoming message to the mapper either dynamically or statically.  This structure is expressed as a JSONSchema.
* Each step is a [component](/getting-started/integration-component) that is configured for that specific flow
* A component exposes a set of possible interactions with an external system
* Components have the ability to write documents and other binary data to storage that can be read by other components if the other component has the URL to that resource *(attachments)*
* A component should encapsulate API mechanics and programming concepts (e.g. error handling, branching etc) from the flow
* A component should expose its functionality in a generic manner
* A flow can be started in one of two ways:
  * It can be automatically started on a schedule.  A component must expose a trigger in this case or the first step must be the timer component.
  * It can be triggered by an incoming HTTPS request.  In this case, the webhook component must be the first step.
* If a flow is triggered by an incoming HTTPS request, it can
  * respond immediately before executing the rest of the flow
  * respond after the flow has executed.  In this case, the structure of the response can be altered however, [in this case the flow must be configured to be "always on"](/integrator-guide/realtime-flows).
* A component can be defined to accept credentials.  Credentials provide all the information to locate and authenticate for a specific account for an external system.
* All steps are executed in the cloud however, it is possible to configure a step to be executed on another machine outside the cloud. *(Local agent)*

![Integration Platform Basics Diagram](/assets/img/references/high-level-architecture-reference-card/integration-platform-basics.svg "Integration Platform Basics")
