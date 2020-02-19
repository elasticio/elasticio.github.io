---
title: Local Agent
layout: article
section: Platform Features
description: This document provides the basic information on Local Agent and the way to get it in case you require one.
order: 10
since: 20191218
category: platform features
---

This document provides the basic information on [Local Agent](#local-agent) and the [way to get it](#how-to-request-a-local-agent) in case you require one. Additionally, it contains some [technical details](#architecture) for those interested.

## Local Agent

A Local Agent is VM-based application that allows you to create a secure connection between your on-premise database and the Platform, restricting any external access to it. It is intended for companies that work with clients' personal data, or just have strict data security policies. For example:

- Government institutions, military, law enforcement

- Healthcare and insurance

- Banks, telecommunication companies, etc.

Basically, a Local Agent adds another virtualization layer that emulates your own on-premise part of the Platform, securing all connections:

![Local Agent](/assets/img/getting-started/local-agent/scheme.png)

## How to Request a Local Agent

Local Agents require extensive on-premise compute and storage resources. Before requesting a Local Agent, please ensure that your task requires it, and that your setup meets its hardware/software requirements.

To request a Local agent, go to navigational menu and click *Agents*:

![Local Agent Step 1](/assets/img/getting-started/local-agent/Screenshot_1.png)

Then click "*+ Request an agent*" button:

![Local Agent Step 2](/assets/img/getting-started/local-agent/Screenshot_2.png)

Our support will process your request and provide you with everything required to install and run a Local Agent.

## Architecture

Local Agent is a Virtual Machine (VM) that implements a Kubernetes cluster. It contains a set of Pods that implement different parts of service:

1\. Gateway – OpenVPN client;

2\. Boatswain – remote shell that proxies requests/response of Admiral;

3\. Set of pods for currently executing tasks.

The Local Agent connects to the Platform by using a OpenVPN tunnel, except for API calls, which are performed via `https` and External Services calls.
All data is exchanged over the OpenVPN tunnel. API calls over `https` protocol carry only commands and task stats and statuses.

Task pods connect to a external network for communication with external Docker repositories. This is necessary to build deployed components and access external Systems to interact with them in runtime.

The communication with source and target systems are implemented directly from Task Pods by using http or https protocols and any possible port number.

Here is a more detailed scheme:

![Local Agent Architecture](/assets/img/getting-started/local-agent/architecture.png)


## Related links

- [Requesting a Local Agent](/references/local-agents-requesting)
- [Local Agent installation using Hyper-V](/references/local-agents-HyperV)
- [Local Agent installation using VirtualBox](/references/local-agents-VirtualBox)
