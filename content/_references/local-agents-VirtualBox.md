---
title: Local Agent installation using VirtualBox
description: This article describes the local agent installation on VirtualBox.
layout: article
section: Local Agents
order: 2
category: local agents
---

## Description

This article describes the [local agent](/getting-started/local-agent) installation
on VirtualBox. This is one of the main supported methods to run the local agents.
If you can not use VirtualBox please check the alternative solutions in
the [requesting local agents](local-agents-requesting) page for more. Hereford, we
assume you have no technical impediments to install and use the VirtualBox VM.

> **Please Note** - without `agent-gateway` and `agent-boatswain` you can't
> connect to the platform run-time and use the local agents in your integration
> flows. These two configuration parameters are given to you personally when you
> [request a local agent](local-agents-requesting).


## Virtual Machine setup

To start setting up the Virtual Machine you need the following files and setups:

*   **Virtual Machine Manager** - you can use the Oracle VM VirtualBox Manager. If you don't have it, visit the [VirtualBox Download page](https://www.virtualbox.org/wiki/Downloads) to get the version for your OS and install it.

*   **Virtual Machine Image** - download the [elasticio-local-agent-1.0.3.tar.gz](https://cdn.elastic.io/localagent/elasticio-local-agent-1.0.3.tar.gz) compressed archive (about 1.6 GB).

*   **Virtual Machine Descriptor files** - `agent-gateway` and `agent-boatswain` files specifically created for your agent. These files are provided by {{site.data.tenant.name}} directly.

To start with the setup unpack the downloaded **Virtual Machine Image** file to find
these two files:

1.  Virtual Machine description – `elasticio-local-agent-1.0.3.ovf` (~ 8 KB)
2.  Virtual Machine Disk image – `elasticio-local-agent-1.0.3-disk001.vmdk` (~ 1.57 GB)

VM Disk image contains the necessary environment for running the Agent and used
as a template for a new VM.

Here we assume that you have installed the VirtualBox on your computer and have
started it already. Let us import the image and create a new Virtual Machine (VM).

Click on the `*.ovf` file to launch the import wizard of the VirtualBox. Your OS
should have associated these files types with it during the installation. Click on
*Import* to start importing the Disk image:

![Importing the disk image](/assets/img/references/local-agents/local-agents-vbox01.png "Importing the disk image")

If clicking on the file is not working, you can navigate to the *Machine > Add*
menu of the VirtualBox and select the `*.ovf` file from your files system to start
the importing.

After when you import a newly created virtual machine should appear in the
VirtualBox's left-hand side menu.

![Virtual Machine imported](/assets/img/references/local-agents/local-agents-vbox02.png "Virtual Machine imported")

Let us make sure that the newly imported VM is correctly configured. While the
VM is selected in the left-hand side menu, navigate to *Settings > Network*
page to check the NAT configuration.

![NAT setup](/assets/img/references/local-agents/local-agents-vbox03.png "NAT setup")

The above screenshot shows the Network part of the Setting. We need to make sure
that:

1.  The *Adapter 1* is selected and the *Attached* is on value `NAT`.
2.  Click on the *Advanced* drop-down menu to see the advanced settings if it is not extended.
3.  Make sure that the checkbox besides the *Cable Connected* is on.

By default your VM is configured with port forwarding to expose some services from
the VM to your host system. Click on the *Port Forwarding* button to see the
configured ports (3).

![Port Forwarding](/assets/img/references/local-agents/local-agents-vbox04.png "Port Forwarding")

The screenshot above shows the port forwarding setup. Make sure that these values
match. Here are the values in one convenient table:

| Name | Protocol | Host IP | Host Port | Guest IP | Guest Port |
| :--- | :--------| :-------| :---------| :--------| :----------|
| SSH into Agent  | TCP |  | 2222 |  | 22 |
| k8s Dashboard http | TCP |  | 30080 |  | 30080 |
| k8s Dashboard https | TCP |  | 30443 |  | 30443 |

> **Note** Do not change these configuration to avoid errors during further steps.
After checking the details of VM setup, close the Settings configuration windows
to return to the main window of VirtualBox with still inactive agent on the
left-hand side menu.

## Start and Examine the Virtual Machine

Click *Start* arrow-button in the top menu to start your VM. The first launch
can take a couple of minutes. After the successful launch you will see a Linux
terminal like this:

![Linux terminal](/assets/img/references/local-agents/local-agents-vbox05.png "Linux terminal")

You can log into a newly started VM using a pre-configured credentials which we
will supply to you during the [local agent request](local-agents-requesting) process.
**Please change the password after the first login**.

Now let us check if we can login to the VM using a command line on your OS:

```sh
ssh 127.0.0.1 -p 2222 -v -l root
```

Provide the same password which we hope you have already changed. If the login is
successful let us proceed further and check the Kubernetes (k8s).

> **Note** The fresh VM which is provided {{site.data.tenant.name}} to run local
> agents contains Kubernetes installation with system pods only.
If you would like to check if the k8s is operational then use this command:

```sh
kubectl get pods -n kube-system
```

The output should look like this:

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

If you see a similar output then everything is running properly. Time to deploy
the **Virtual Machine Descriptor** files: `agent-gateway` and `agent-boatswain`.


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
Locate your `gateway-ID.json` and upload it into the running agent. On Linux based
OS you can do:

```sh
$: cd /path/to/the/directory/with/downloaded/descriptor/
$: scp -P 2222 gateway-5a7984dd8cd3360019524c22.json root@127.0.0.1:/root/
```

Replace `5a7984dd8cd3360019524c22` with `id` of your agent in the command
above. At this stage you can switch to the terminal of VM. If you do so then you should
omit all the instances of `ssh root@127.0.0.1 -p 2222` from the following examples.
Alternatively, you can stay at your OS's command line but every following command
would need you to enter the password to execute.

Let us launch the `agent-gateway` as a pod on k8s of our VM:

```sh
ssh root@127.0.0.1 -p 2222 'kubectl create -f gateway-5a7984dd8cd3360019524c22.json'
```

It would take about a minute to fully launch the `agent-gateway`. We can check
the deployment status using the following command:

```sh
ssh root@127.0.0.1 -p 2222 'kubectl get deployments'
root@127.0.0.1s password:

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
$: scp -P 2222 boatswain-5a7984dd8cd3360019524c22.yml root@127.0.0.1:/root/
```

Replace `5a7984dd8cd3360019524c22` with `id` of your agent in the command
above. Let us launch the deployment for the `agent-boatswain`

```sh
ssh root@127.0.0.1 -p 2222 'kubectl create -f boatswain-5a7984dd8cd3360019524c22.yml'
```

In about a minute `agent-boatswain` should appear as `Running` in a list of
deployment. Let us check the situation:

```sh
ssh root@127.0.0.1 -p 2222 'kubectl get deployments'
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
> inside your local agent. Please visit the url [http://127.0.0.1:30080/](http://127.0.0.1:30080/) in your browser.

## Related links

- [Local Agent](/getting-started/local-agent)
- [Requesting a Local Agent](local-agents-requesting)
- [VirtualBox Download page](https://www.virtualbox.org/wiki/Downloads)
- [elasticio-local-agent-1.0.3.tar.gz](https://cdn.elastic.io/localagent/)
