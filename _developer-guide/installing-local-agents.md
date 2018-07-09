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



The last important detail before starting the VM is to make sure that the NAT is configured correctly.

Please got to VM's settings, choose the `Network` tab and make sure:
- The `Adapter 1` is enabled
- The `Adapter 1` has type/attached to `NAT`
- The checkbox `Cable Connected` is enabled

Screenshot of the example:

![elasticio_agent_networks](https://user-images.githubusercontent.com/931046/35916125-06dc388c-0c12-11e8-94ce-fcfb425f606b.png)

By default your VM is configured with port forwarding to expose some services from the VM to your host system. To see the configured ports, press on the button `Port Forwarding`.

Open the `Advanced` drop-down tab and click on `Port Forwarding`. Here ensure that:
- There is record with `Guest Port: 2222` (`Name: SSH into Agent` and `Protocol: TCP`)
Example:
![virtualbox_ports](https://user-images.githubusercontent.com/931046/35916186-3dfaa2c2-0c12-11e8-839a-402ecc41fbbb.png)

The port 2222 is to be used for SSH login into your VM and 30080 to access the Kubernetes dashboard.


* TODO add description for VMWare etc






## Start the VM

- [ ] Start your newly imported and configured VM

The first launch might take several minutes.

Example of a window with launched VM:

![agent_login](https://user-images.githubusercontent.com/464220/33263611-c5209094-d36a-11e7-9b38-ebcf1766d23f.png)






## Make sure you can ssh into the VM

Once VM is started, you should be able to ssh to the box.

- [ ] login to VM

Open a terminal an run the following command:

```
ssh 127.0.0.1 -p 2222 -v -l root
```

You will be asked to provide a password. The VM is pre-configured with default password `changeme`. It's recommended to change it right on the first launch.

The fresh VM contains Kubernetes with system pods only. If you would like to make sure k8s is launched properly, you can use command

```
kubectl get pods -n kube-system
```

Output should be like this:

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

Now you can add deployments with your agent.

- [ ] stop ssh session
```
exit
```


## Deploy `agent-gateway`

On this step, we are going to deploy the `agent-gateway` which establishes secure VPN connection between the VM and `elastic.io` data centre. To do so you would need a special descriptor file which is unique to your agent.

- [ ] Download descriptor [TODO: add link]

- [ ] Keep the descriptor in secret

*WARNING* The descriptor contains unique security credentials, dedicated to your instance of `Agent`. Security of VPN connection is based on the secrecy of the Descriptor. Act with it as with another security credential (do not share and so on).
    * In case of disclosure of descriptor contact [support@elastic.io](support@elastic.io) as soon as possible in order to block the old and re-issue a new descriptor with credentials.

- [ ] Go to the folder with downloaded descriptor
```sh
cd /path/to/the/directory/with/downloaded/descriptor/
```

- [ ] Upload descriptor to the VM

Please replace `5a7984dd8cd3360019524c22` with `id` of your agent in the command below.

```
scp -P 2222 5a7984dd8cd3360019524c22.json root@127.0.0.1:/root/
```

You will be asked for the [password](#make-sure-you-can-ssh-into-the-vm) since ssh login performing here.

- [ ] Launch the deployment for `agent-gateway`

Please replace `5a7984dd8cd3360019524c22` with `id` of your agent in the command below.

```
ssh root@127.0.0.1 -p 2222 'kubectl create -f 5a7984dd8cd3360019524c22.json'
```

You will be asked for the [password](#make-sure-you-can-ssh-into-the-vm) since ssh login performing here.

- [ ] Check the deployment

```
ssh root@127.0.0.1 -p 2222 'kubectl get deployments'
```

You will be asked for the [password](#make-sure-you-can-ssh-into-the-vm) since ssh login performing here.

After about a minute `agent-gateway` should appear as `Running` in a list of Deployment.

Example:

```
ssh root@127.0.0.1 -p 2222 'kubectl get deployments'
root@127.0.0.1's password:
NAME          DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
agent-gateway   1         1         1            1           1m
```


## Deploy `agent-boatswain`

On this step, we are going to deploy the `agent-boatswain`, which provides coordination between the local `Kubernetes` cluster and the main orchestrator of `elastic.io` integration platform (`Admiral`)

- [ ] Download descriptor [TODO: add link]

- [ ] Keep the descriptor in secret

*WARNING* The descriptor contains unique security credentials, dedicated to your instance of `Agent`. Security of VPN connection is based on the secrecy of the Descriptor. Act with it as with another security credential (do not share and so on).
    * In case of disclosure of descriptor contact [support@elastic.io](support@elastic.io) as soon as possible in order to block the old and re-issue a new descriptor with credentials.

- [ ] Go to the folder with downloaded descriptor
```sh
cd /path/to/the/directory/with/downloaded/descriptor/
```

- [ ] Upload descriptor to the VM

Please replace `5a7984dd8cd3360019524c22` with `id` of youe agent in the command below.
```sh
scp -P 2222 boatswain-5a7984dd8cd3360019524c22.yml root@127.0.0.1:/root/
```
You will be asked for the [password](#make-sure-you-can-ssh-into-the-vm) since ssh login performing here.

- [ ] Launch the deployment for `agent-boatswain`

Please replace `5a7984dd8cd3360019524c22` with `id` of youe agent in the command below.

```sh
ssh root@127.0.0.1 -p 2222 'kubectl create -f boatswain-5a7984dd8cd3360019524c22.yml'
```

You will be asked for the [password](#make-sure-you-can-ssh-into-the-vm) since ssh login performing here.

-  Check the deployment
```sh
ssh root@127.0.0.1 -p 2222 'kubectl get deployments'
```
You will be asked for the [password](#make-sure-you-can-ssh-into-the-vm) since ssh login performing here.


After about a minute `agent-boatswain` should appear as `Running` in a list of Deployment.

Example:
```
ssh root@127.0.0.1 -p 2222 'kubectl get deployments'
root@127.0.0.1's password:
NAME              DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
agent-boatswain   1         1         1            1           1m
agent-gateway     1         1         1            1           6m
```


## Check the agent is operational
- [ ] Go to [agents page](#create-a-db-record-for-the-agent) and find the corresponding record for the Agent.

- [ ] Make sure the agent became online.

Once [`agent-gateway`](#deploy-agent-gateway) and [`agent-boatswain`](#deploy-agent-boatswain) are started, the agent should be displayed as `Online` (with `Last seen: a few seconds ago`).

![elastic io agent is online](https://user-images.githubusercontent.com/931046/35917507-114c1ee0-0c17-11e8-8f9c-5f750caa545a.png)






## Notes
You can also access the Kubernetes dashboard to see the pods running inside your local agent.
Please hit the url [http://127.0.0.1:30080/](http://127.0.0.1:30080/) in your browser.
