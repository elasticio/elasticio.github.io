---
title: Component Reference Card
layout: article
order: 2
section: Reference Cards
---

* A component is a code library
* Currently [JavaScript (node.js)](/developer-guide/building-nodejs-component) and [Java (and other JVM languages)](/developer-guide/building-java-component) are supported languages for component development
* During execution/build, it is placed inside an application which handles interactions with its execution environment
* It can be tested locally through unit and integration tests
* It is [loaded onto the platform by configuring the platform as a git remote and pushing the code to the platform where the platform performs a build](/developer-guide/deploying-component)
* Every component has a `component.json` file which defines the actions, triggers and credentials exposed by the component
* [SSH public/private key pairs are used to authenticate code pushes](/developer-guide/ssh-keys)
* During execution a component can send information to the following places:
  * It can send a message to the following step *(emit data)*
  * It can report an error to the platform *(emit error)*
  * It can send information to the next iteration of itself *(emit snapshot)*
  * It can send information about a credential to the next component to interact with that credential *(emit keys)*
  * It can log information to logs which are collected by the platform
  * It can ask that a message be processed at a later time *(emit rebound)*
* During execution a component can receive information in the following places:
  * The incoming message *(msg)*
  * The snapshot produced by the previous execution *(snapshot)*
  * The fields configured for this specific step *(cfg)*
  * The credentials object *(cfg)*
  * Environment variables *(process.env)*

![Component Inputs & Outputs Diagram](/assets/img/references/component-reference-card/component-inputs-and-outputs.svg "Component Inputs & Outputs")
