---
title: Local Agent installation using Hyper-V
description: This article describes the local agent installation on Microsoft Server 2016 and Windows 10 using the Hyper-V visualisation (Deprecated).
layout: article
section: Local Agents
order: 2
category: local agents
---

> This document is about the deprecated (from [20.31 release](/releases/2020-07-30)) local agents.
> Please use our [new VPN agents](/getting-started/vpn-agent) instead.

## Description

This article describes the [local agent](/getting-started/local-agent) installation
on Microsoft Server 2016 and Windows 10 using the Hyper-V visualisation. This is
one of the supported methods to run the local agents. If you don't have Hyper-V
running on your resource or prefer not to use it then check the alternative
solutions in the [requesting local agents](local-agents-requesting) page for more.
Hereford, we assume you have no technical impediments to install and use the Hyper-V VM.

> **Please Note** - without `agent-gateway` and `agent-boatswain` you can't
> connect to the platform run-time and use the local agents in your integration
> flows. These two configuration parameters are given to you personally when you
> [request a local agent](local-agents-requesting).

## Virtual Machine setup

To start setting up the Virtual Machine you need the following files and setups:

*   Make sure you have Hyper-V

*   Download the VM image from here for Windows 10 build 1803 : [elasticio-local-agent-hyperv-1.0.4.zip](https://cdn.elastic.io/localagent/hyperv/elasticio-local-agent-hyperv-1.0.4.zip)

*   Download the VM image from here for Windows server 2016 : [elasticio-local-agent-hyperv-srv-1.0.4.zip](https://cdn.elastic.io/localagent/hyperv/elasticio-local-agent-hyperv-srv-1.0.4.zip)

VM image contains the necessary environment for running the Agent and used as a
template for a new VM. Proceed further and unpack the downloaded archive to find
two folders containing:

1.  Virtual Machine description – `Virtual Machines`

2.  Virtual Disk image – `Virtual Hard Disks`

Import the image to create a new Virtual Machine (VM) then launch the `Hyper-V Manager`
and then navigate to the `Action > Import Virtual Machine`

![Importing VM menu](/assets/img/references/local-agents/local-agents-hyperv01.png)

Now locate folder where you unpacked archive and select the Virtual Machine:

![Importing VM](/assets/img/references/local-agents/local-agents-hyperv02.png)

Choose the import Type: **Copy the virtual machine (create a new unique ID)**

Here is what you will get apon the successful import:

```sh
Virtual Machine: elasticio-local-agent-1.0.4
Import file: C:\Users\bob\Downloads\elasticio-local-agent-1.0.4\elasticio-local-agent-1.0.4\Virtual Machines\E6C6F.....
Import Type: Register (keep ID)
```

## Start and Examine the Virtual Machine

After the import is completed the newly created virtual machine should appear in
the Hyper-V in the menu on the right-hand side. Select VM and Press the Right
Mouse Button and choose **Start Virtual Machine**

![Starting the VM](/assets/img/references/local-agents/local-agents-hyperv03.png)

The first launch might take several minutes.

Once VM is started, you should be able to ssh to the box from your local terminal
using the following command:

```sh
ssh 172.17.0.1 -v -l root
```

You can log into a newly started VM using a pre-configured credentials which we
will supply to you during the [local agent request](local-agents-requesting) process.
**Please change the password after the first login**.

> **Please Note** The Virtual Machine has pre-configured network configuration
> for `DHCP` which is possible to change inside the VM. Use `nmtui` command to do that.

When you change network configuration you will need to reboot the system.

The VM contains Kubernetes with system pods only. If you would like to make sure
k8s is launched properly, you can use the command

```sh
kubectl get pods -n kube-system
```

Output should be like this:

```sh
[root@agent ~]# kubectl get pods -n kube-system
NAME                                   READY     STATUS    RESTARTS   AGE
etcd-agent                             1/1       Running   0          55m
kube-apiserver-agent                   1/1       Running   0          55m
kube-controller-manager-agent          1/1       Running   0          55m
kube-dns-86cc76f8d-d7dn9               3/3       Running   0          55m
kube-flannel-ds-jj2fs                  1/1       Running   0          55m
kube-proxy-2kvfk                       1/1       Running   0          55m
kube-scheduler-agent                   1/1       Running   0          55m
kubernetes-dashboard-79ddfdc44-x4gq9   1/1       Running   0          55m
```

Now you can proceed and add deployments to your agent.

## Deploy `agent-gateway`

On this step, we are going to deploy the `agent-gateway` which establishes a secure
VPN connection between the VM and `{{site.data.tenant.name}}` data centre. To do
so you would need a special descriptor file which is unique to your agent.

The file is in `JSON` format and must look like `gateway-ID.json`, where the ID
is 24 characters long alpha-numeric record and it is unique to your agent.

> **WARNING** The descriptor contains a security credential which is unique to
> your agent. Security of VPN connection depends on the secrecy of this descriptor.
>
> Do not share this with any third party! In case of disclosure of the descriptor
> contact [support@{{site.data.tenant.name}}](mailto:{{site.data.tenant.supportEmail}})
> as soon as possible to block the old and re-issue a new descriptor with new credentials.
Locate your `gateway-ID.json` and upload it into the running agent.


```sh
$: cd /path/to/the/directory/with/downloaded/descriptor/
$: scp -P 2222 gateway-5a7984dd8cd3360019524c22.json root@172.17.0.1:/root/
```

Replace `5a7984dd8cd3360019524c22` with `id` of your agent in the command
above. At this stage you can switch to the terminal of VM. If you do so then you should
omit all the instances of `ssh root@172.17.0.1 -p 2222` from the following examples.
Alternatively, you can stay at your OS's command line but every following command
would need you to enter the password to execute.

Let us launch the `agent-gateway` as a pod on k8s of our VM:

```sh
ssh root@172.17.0.1 -p 2222 'kubectl create -f gateway-5a7984dd8cd3360019524c22.json'
```

It would take about a minute to fully launch the `agent-gateway`. We can check
the deployment status using the following command:

```sh
ssh root@172.17.0.1 -p 2222 'kubectl get deployments'
root@172.17.0.1s password:

NAME          DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
agent-gateway   1         1         1            1           1m
```

Success, the `agent-gateway` is up and running. Let's continue and deploy the
`agent-boatswain`.


## Deploy `agent-boatswain`

On this step, we are going to deploy the `agent-boatswain`, which provides
coordination between the local Kubernetes cluster and the main orchestrator of
`{{site.data.tenant.name}}` integration platform (`Admiral`).

The file is in `YML` format and must look like `boatswain-ID.yml`, where the ID
is 24 characters long alpha-numeric record and it is unique to your agent.

> **WARNING** The descriptor contains a security credential which is unique to
> your agent. Security of VPN connection depends on the secrecy of this descriptor.
>
> Do not share this with any third party! In case of disclosure of the descriptor
> contact [support@{{site.data.tenant.name}}](mailto:{{site.data.tenant.supportEmail}})
> as soon as possible to block the old and re-issue a new descriptor with new credentials.
Let us launch the `agent-boatswain` as a pod on k8s of our VM:

```sh
$: cd /path/to/the/directory/with/downloaded/descriptor/
$: scp -P 2222 boatswain-5a7984dd8cd3360019524c22.yml root@172.17.0.1:/root/
```

Replace `5a7984dd8cd3360019524c22` with `id` of your agent in the command
above. Let us launch the deployment for the `agent-boatswain`

```sh
ssh root@172.17.0.1 -p 2222 'kubectl create -f boatswain-5a7984dd8cd3360019524c22.yml'
```

In about a minute `agent-boatswain` should appear as `Running` in a list of
deployment. Let us check the situation:

```sh
ssh root@172.17.0.1 -p 2222 'kubectl get deployments'
root@127.0.0.1s password:
NAME              DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
agent-boatswain   1         1         1            1           1m
agent-gateway     1         1         1            1           6m
```

If the `AVAILABLE` tab of `agent-boatswain` is still showing `0`, wait for a minute
and check again until both pads show `1`. All the necessary pods are up and running.
Time to check your agent on {{site.data.tenant.name}} UI.

## Check the agent is operational

Navigate to *Settings -> Agents* page of the {{site.data.tenant.name}} platform to
check if the agent is `online` and operational.

Once [`agent-gateway`](#deploy-agent-gateway) and [`agent-boatswain`](#deploy-agent-boatswain)
are on, the agent should appear as `online`
(with `Last seen: a few seconds ago`) as we have [explain earlier](local-agents-requesting#local-agent-statuses).

> **Note** You can also access the Kubernetes dashboard to see the pods running
> inside your local agent. Please visit the url [http://172.17.0.1:30080/](http://172.17.0.1:30080/) in your browser.

## Related links

- [Local Agent](/getting-started/local-agent)
- [Requesting a Local Agent](local-agents-requesting)
- [elasticio-local-agent-hyperv-1.0.4.zip](https://cdn.elastic.io/localagent/hyperv/elasticio-local-agent-hyperv-1.0.4.zip)
- [elasticio-local-agent-hyperv-srv-1.0.4.zip](https://cdn.elastic.io/localagent/hyperv/elasticio-local-agent-hyperv-srv-1.0.4.zip)
