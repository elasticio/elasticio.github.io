---
title: Installing Local Agents
layout: article
section: Local Agents
category: agents
order: 0
---

To successfully run your instance of the Agent you must do the following steps:

0. [Requirements](#system-requirements)
1. [Create a db record for the Agent](#create-a-db-record-for-the-agent)
2. [Set the Virtual Machine up](#virtual-machine-setup)
3. [Start the VM](#start-the-vm)
4. [Make sure you can login to the VM](#make-sure-you-can-ssh-into-the-vm)
4. [Deploy `agent-gateway` to the VM](#deploy-agent-gateway)
5. [Deploy `agent-boatswain` to the VM](#deploy-agent-boatswain)
6. [Check the agent is operational](#check-the-agent-is-operational)


## System Requirements

### Provided Image has default Configuration:
- 2 CPU and 2Gb of RAM
- Also Storage can be extended up to 100Gb
- Images Size Before Download < 2Gb
- Required Space - after first Init ~ 6 Gb

### Additionally:
One step of flow requires about 0,1 CPU, 256 Mb RAM and 1Gb storage space.
For example, flow that consists of 20 steps, approximately requires:
- CPU 0.1 * 20 ~ 2 vCPU
- RAM 256 * 20 ~ 5 Gb
- Storage 1 * 20 ~ 20 Gb

## Create a db record for the Agent

- [ ] Go to page `Settings > Agents`

![Settings/Agents](https://user-images.githubusercontent.com/931046/35914209-228c4a6a-0c0b-11e8-8272-d3f445f4f6ad.png)

- [ ] Select an agent

On the agent's page you can find all your agents and choose the one you would like to launch on VM or use button `+ Request an agent` and create the new instance.

- [ ] Make sure selected agent has `status` `offline`

Following statuses are available:

* pending: while we are preparing the agent for you, the circle next to agent's name is grey
* offline: agent is ready but not started yet or agent is down for maintenance, the circle next to agent's name is red
* green: the circle is green when agent is online

![elastic io 2017-11-27 12-18-02](https://user-images.githubusercontent.com/931046/36025903-6f72f19c-0d9d-11e8-8043-5090276874f0.png)



## Virtual Machine setup

### VirtualBox

- [ ] Make sure you have VirtualBox

If you don't have VirtualBox, you can use this [link](https://www.virtualbox.org/wiki/Downloads) in order to download and setup `Oracle VM VirtualBox Manager`.

- [ ] Download the VM image from here: [elasticio-local-agent-1.0.3.tar.gz](https://cdn.elastic.io/localagent/elasticio-local-agent-1.0.3.tar.gz)

VM image contains the necessary environment for running the Agent and used as a template for a new VM.

- [ ] Unpack the downloaded archive

Archive contains these two files:

1. Virtual Machine description – `elasticio-local-agent-1.0.3.ovf`
2. Virtual Disk image – `elasticio-local-agent-1.0.3-disk001.vmdk`

- [ ] Import the image and create a new Virtual Machine (VM)

Most likely your operation system has assosiation with VirtualBox for files `*.ovf` so you can just click on the file `elasticio-local-agent-v0.02.ovf` in order to launch an import wizard. Click `Import` to begin.

If clicking on the file did not work, you can launch VirtualBox and then navigate to the `Machine > Add` menu of the VirtualBox and select the `*.ovf` file from your files system.

![agent-import-dialog](https://user-images.githubusercontent.com/464220/33263606-c1c1f46a-d36a-11e7-9fc0-08e2e2e60028.png)

After the import is completed the newly created virtual machine should appear in the VirtualBox in the menu on the left-hand side.

![oracle vm virtualbox manager 2017-11-22 18-39-12](https://user-images.githubusercontent.com/464220/33263768-488a2e90-d36b-11e7-90fd-110651fc105c.png)

- [ ] Ensure that VM imported properly

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
