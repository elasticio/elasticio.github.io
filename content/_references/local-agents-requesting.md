---
title: Requesting a Local Agent
description: This article describes how to request a local agent for running it in your own resource using a Virtualization Machine (VM).
layout: article
section: Local Agents
order: 1
category: local agents
---

This article describes how to request a [local agent](/getting-started/local-agent)
for running it in your own resource using a Virtualization Machine (VM). Before
requesting a local agent check if your intended host machine has a
[compatible operating system and VM installation](#compatible-operating-systems)
and enough [system resources](#system-requirements) to run the VM and the
processes on it.


## Compatible Operating Systems

The local agent can run on the following OS/Virtualization combination:

*   Any OS where VirtualBox can run in 64 bit mode. [Installation instructions here.](local-agents-VirtualBox)
*   Windows Server 2016 with running Hyper-V. [Installation instructions here.](local-agents-HyperV)
*   Windows 10 build 1803 with running Hyper-V. [Installation instructions here.](local-agents-HyperV)
*   Amazon AWS Linux Ubuntu (experimental). Instructions will be available soon.


## System Requirements

The local agent runs in the Virtual Machine (VM), which requires the following
base resources to operate:

| Resource | Required Amount | Description |
| :--------| :--------------:| :-----------|
| RAM      | 2 CPU and 2 GB  | Extendable up to 100 GB, depending on the usage |
| HD Space | > 6 GB          | Size of extracted VM files after the first run |

When we start an integration step on the local agent, it will start consuming more
resources. To estimate the necessary resources and determine the feasibility of
your operations use the following calculations:

| Step  | vCPU | RAM | HD Space |
| :---- | :---: | :---: | :----: |
| 1 step | 0.1  | 256 MB | 1 GB |
| 20 steps | ~2  | ~5 GB | ~20 GB |

The **values listed in the above table are exclusive of the initial requirements**
which are necessary for running the VM itself. Meaning, to run one integration step in
your VM you would in average need 1 GB + 2 GB = 3 GB RAM. Please consider these values
before installing and running the local agent on your own PC.

## Requesting Local Agent

Here we assume you have checked and understood all the prior requirements for installing
and running a local agent on your own resource.

To request a local agent open the (burger) menu and click on *Agents* menu item
to load agents page as it is shown on the screenshot below.

![local agents page](/assets/img/references/local-agents/request-local-agent.png)

Click on *+ Request an agent* to start filling the necessary information for the
local agent.

![local agents filling info](/assets/img/references/local-agents/request-local-agent-information.png)

The illustration above shows the local agent requesting steps:

1.  Name your local agent,
2.  Provide the description of your agent,
3.  Wait for the activation.

Your requested agent has status as `pending`. If local agents have been requested
and used by your colleagues you might see other agents with different statuses when
you visit the *Agents* page. See next section for more information.

## Local Agent Statuses

Local Agents can have 3 different statuses:

*   `online` : **shown with a green dot** - agent is online and operational.
*   `offline`: **shown with a red dot** - agent is ready but not started yet or agent is down for maintenance.
*   `pending`: **shown with a grey dot** - we are preparing the agent for you.

The screenshot below shows these different statuses in one page.

![Agents with different statuses](/assets/img/references/local-agents/local-agent-statuses.png "Agents with different statuses")

## Related links

- [Local Agent](/getting-started/local-agent)
- [Installation using VirtualBox](local-agents-VirtualBox)
- [Installation using Hyper-V](local-agents-HyperV)
