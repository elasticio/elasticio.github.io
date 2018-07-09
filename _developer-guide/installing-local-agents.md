---
title: Installing Local Agents
layout: article
section: Local Agents
category: agents
order: 0
---

To successfully run your instance of the Agent you must do the following steps:

0. [System Requirements](#system-requirements)
1. [Request Local Agent](#request-local-agent)
2. [Set the Virtual Machine up](#virtual-machine-setup)
3. [Start the VM](#start-the-vm)
4. [Make sure you can login to the VM](#make-sure-you-can-ssh-into-the-vm)
4. [Deploy `agent-gateway` to the VM](#deploy-agent-gateway)
5. [Deploy `agent-boatswain` to the VM](#deploy-agent-boatswain)
6. [Check the agent is operational](#check-the-agent-is-operational)

## System Requirements

The local agent provided by {{site.data.tenant.name}} runs in the Virtual Machine (VM)
which must have the following resources:

| Resource | Required Amount | Description |
| :--------| :--------------:| :-----------|
| RAM      | 2 CPU and 2 GB  | Extendable up to 100 GB, depending on the usage |
| HD Space | > 6 GB          | Size of extracted VM files after the first run |

The numbers above show the minimum required configuration. However, if you are
planning to run many integration steps using the same local agent then here is
an estimate to help you to check your resources and determine the feasibility.

| Step  | vCPU | RAM | HD Space |
| :---- | :---: | :---: | :----: |
| 1 step | 0.1  | 256 MB | 1 GB |
| 20 steps | ~2  | ~5 GB | ~20 GB |

The **values listed in the above table are exclusive of the initial requirements**
which are necessary for running the VM itself. Meaning, to run one integration step in
your VM you would in average need 1 GB + 2 GB = 3 GB RAM. Please consider these values
before installing and running the local agent on your own PC.

## Request Local Agent

To begin working with local agent you must request it by navigating to
*Settings > Agents* section of {{site.data.tenant.name}} platform as it is shown
on the screenshot below.

![Navigate to Agents](/assets/img/developer-guide/local-agents/local-agents-01.png "Navigate to Agents")

Click on button *+ Request an agent* to start.

![Click to request a local agent](/assets/img/developer-guide/local-agents/local-agents-02.png "Click to request a local agent")

You will be guided through the steps to name your Agent (1), give the description
(2) of for the agent and wait for the activation (3).

![Requesting the local agent](/assets/img/developer-guide/local-agents/local-agents-03.png "Requesting the local agent")

Your requested agent has status as `pending`. If local agents have been reuqested
and used by your colleagues you might see other agents with different statuses when
you visit the *Settings > Agents* page:

![Agents with different statuses](/assets/img/developer-guide/local-agents/local-agents-04.png "Agents with different statuses")

The screenshot above shows 3 different agents with different statuses. The statuses
can be:

*   `online` : **shown with a green dot** - agent is online and operational.
*   `offline`: **shown with a red dot** - agent is ready but not started yet or agent is down for maintenance.
*   `pending`: **shown with a grey dot** - we are preparing the agent for you.


## Virtual Machine setup

To start setting up the Virtual Machine we need the following files and setups:

*   **Virtual Machine Manager** - we use the Oracle VM VirtualBox Manager. If you don't have it, visit the [VirtualBox Download page](https://www.virtualbox.org/wiki/Downloads) to get the version for your OS and install it.
*   **Virtual Machine Image** - download the [elasticio-local-agent-1.0.3.tar.gz](https://cdn.elastic.io/localagent/elasticio-local-agent-1.0.3.tar.gz) compressed archive (about 1.6 GB).
*   **Virtual Machine Descriptor files** - `agent-gateway` and `agent-boatswain` files specifically created for your agent. These files are provided by {{site.data.tenant.name}} directly.

To start with setup unpack the **Virtual Machine Image** to find these
two files:

1.  Virtual Machine description – `elasticio-local-agent-1.0.3.ovf` (~ 8 KB)
2.  Virtual Machine Disk image – `elasticio-local-agent-1.0.3-disk001.vmdk` (~ 1.57 GB)

VM Disk image contains the necessary environment for running the Agent and used
as a template for a new VM.

Here we assume that you have installed the VirtualBox on your computer and have
started it already. Let us import the image and create a new Virtual Machine (VM).

Click on the `*.ovf` file to launch the import wizard of the VirtualBox. Your OS
must have associated these files types with it during the installation. Click on
*Import* to start importing the Disk image:

![Importing the disk image](/assets/img/developer-guide/local-agents/local-agents-05.png "Importing the disk image")

If clicking on the file did not work, you can launch VirtualBox and then navigate
to the *Machine > Add* menu of the VirtualBox and select the `*.ovf` file from
your files system to start the process.

After the import is completed the newly created virtual machine should appear in
the VirtualBox in the menu on the left-hand side.

![Virtual Machine imported](/assets/img/developer-guide/local-agents/local-agents-06.png "Virtual Machine imported")

At this stage it is important to make sure that the VM is configured correctly.
While the VM is selected in the left-hand side menu, navigate to *Settings > Network*
page to check if the NAT is configured correctly.

![NAT setup](/assets/img/developer-guide/local-agents/local-agents-07.png "NAT setup")

The above screenshot shows the Network part of the Setting. We need to make sure
that:

1.  The *Adapter 1* is selected and the *Attached* is on value `NAT`.
2.  Click on the *Advanced* drop-down menu to see the advanced settings if it is not extended.
3.  Make sure that the checkbox besides the *Cable Connected* is on.

By default your VM is configured with port forwarding to expose some services from
the VM to your host system. Click on the *Port Forwarding* button to see the
configured ports (3).

![Port Forwarding](/assets/img/developer-guide/local-agents/local-agents-08.png "Port Forwarding")

The screenshot above shows the port forwarding setup. Make sure that these values
match in your case. Here are the values in one convenient table:

| Name | Protocol | Host IP | Host Port | Guest IP | Guest Port |
| :--- | :--------| :-------| :---------| :--------| :----------|
| SSH into Agent  | TCP |  | 2222 |  | 22 |
| k8s Dashboard http | TCP |  | 30080 |  | 30080 |
| k8s Dashboard https | TCP |  | 30443 |  | 30443 |

> **Note** Do not change any configuration setup to avoid any unexpected behaviour or errors.

After checking the details of Virtual Machine setup, close the Settings menues
to return to the main window of VirtualBox with still inactive agent on the
left-hand side menu.

## Start and Examine the Virtual Machine

Click *Start* arrow-button in the top menu to start your VM. The first launch
can take a couple of minutes. After the successful launch you will see a Linux
terminal like this:

![Linux terminal](/assets/img/developer-guide/local-agents/local-agents-09.png "Linux terminal")

You can log into a newly started VM using the pre-configured credentials:
*   Agent login: `root` - the main system administrator
*   Agent password: `changeme` - **Please change the password after the first login**.

Now let us check if we can login to the VM using a command line:

```
ssh 127.0.0.1 -p 2222 -v -l root
```

Provide the same password which we hope you have already changed. If the login is
sucsessfull let us proceed further and check the Kubernetes (k8s).

> **Note** The fresh VM which is provided {{site.data.tenant.name}} to run local
> agents contains Kubernetes installation with system pods only.

If you would like to make sure k8s is launched properly, you can use command:

```
kubectl get pods -n kube-system
```

The output should look like this:

```
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
If you see a similar output then everything is runnin properly. Time to deploy
the **Virtual Machine Descriptor** files: `agent-gateway` and `agent-boatswain`.


## Deploy `agent-gateway`

On this step, we are going to deploy the `agent-gateway` which establishes a secure
VPN connection between the VM and `{{site.data.tenant.name}}` data centre. To do
so you would need a special descriptor file which is unique to your agent.

The file is in `JSON` format and must by of `gateway-ID.json`. The ID is 24
characters long alpha-numeric and it is unique to your agent.

> **WARNING** The descriptor contains unique security credential, unique to
> your agent. Security of VPN connection is based on the secrecy of this descriptor.
>
> Do not share this with any third party! In case of disclosure of descriptor
> contact [support@{{site.data.tenant.name}}](support@{{site.data.tenant.name}})
> as soon as possible to block the old and re-issue a new descriptor with new credentials.

Locate your `gateway-ID.json` and upload it into the runnig agent. On Linux based
OS you can simply do:

```sh
# Navigate to the directory with descriptor file
$: cd /path/to/the/directory/with/downloaded/descriptor/
# Copy the descriptor file to the VM
$: scp -P 2222 gateway-5a7984dd8cd3360019524c22.json root@127.0.0.1:/root/
```

Please replace `5a7984dd8cd3360019524c22` with `id` of your agent in the command
above. At this stage you can switch to the terminal of VM in that case you should
omit all the instances of `ssh root@127.0.0.1 -p 2222` from the following examples.
Alternatively, you can stay at your OS's command line but every following command
will ask for the password to execute.

Let us launch the `agent-gateway` as a pod on k8s of our Virtual Machine:

```
ssh root@127.0.0.1 -p 2222 'kubectl create -f gateway-5a7984dd8cd3360019524c22.json'
```

It would take about a minute to fully launch the `agent-gateway`. We can check
the deployment status using the following command:

```
ssh root@127.0.0.1 -p 2222 'kubectl get deployments'
root@127.0.0.1's password:
NAME          DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
agent-gateway   1         1         1            1           1m
```
Success, the `agent-gateway` is up and running. Let's continue and deploy the
`agent-boatswain`.

## Deploy `agent-boatswain`

On this step, we are going to deploy the `agent-boatswain`, which provides
coordination between the local Kubernetes cluster and the main orchestrator of
`{{site.data.tenant.name}}` integration platform (`Admiral`).

The file is in `YML` format and must by of `boatswain-ID.yml`. The ID is 24
characters long alpha-numeric and it is unique to your agent.

> **WARNING** The descriptor contains unique security credential, unique to
> your agent. Security of VPN connection is based on the secrecy of this descriptor.
>
> Do not share this with any third party! In case of disclosure of descriptor
> contact [support@{{site.data.tenant.name}}](support@{{site.data.tenant.name}})
> as soon as possible to block the old and re-issue a new descriptor with new credentials.

Let us launch the `agent-boatswain` as a pod on k8s of our Virtual Machine:

```sh
# Navigate to the directory with descriptor file
$: cd /path/to/the/directory/with/downloaded/descriptor/
# Copy the descriptor file to the VM
$: scp -P 2222 boatswain-5a7984dd8cd3360019524c22.yml root@127.0.0.1:/root/
```

Please replace `5a7984dd8cd3360019524c22` with `id` of your agent in the command
above. Let us launch the deployment for the `agent-boatswain`

```sh
ssh root@127.0.0.1 -p 2222 'kubectl create -f boatswain-5a7984dd8cd3360019524c22.yml'
```

In about a minute `agent-boatswain` should appear as `Running` in a list of
deployment. Let us check the situation:

```
ssh root@127.0.0.1 -p 2222 'kubectl get deployments'
root@127.0.0.1's password:
NAME              DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
agent-boatswain   1         1         1            1           1m
agent-gateway     1         1         1            1           6m
```

If the `AVAILABLE` tab of `agent-boatswain` is still showing `0`, wait for a minute
and check again until both pads show `1`. All the necessary pods are up and running.
Time to check your agent on {{site.data.tenant.name}} UI.


## Check the agent is operational

Navigate to *Settings > Agents* page of the {{site.data.tenant.name}} platform to
check if the agent is `online` and operational.

Once [`agent-gateway`](#deploy-agent-gateway) and [`agent-boatswain`](#deploy-agent-boatswain)
are started, the agent should be displayed as `online`
(with `Last seen: a few seconds ago`) as we have [explain earlier](#request-local-agent).

> **Note** You can also access the Kubernetes dashboard to see the pods running
> inside your local agent. Please visit the url [http://127.0.0.1:30080/](http://127.0.0.1:30080/) in your browser.
