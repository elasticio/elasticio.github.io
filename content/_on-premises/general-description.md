---
layout: article
title: General Description
order: 1
section: Helm3 deployments
version: 22.38
description: General description of HELM3 configuration values for environment specific cases and their purpose.
category: helm3
---

{: .no_toc}
[Platform release](/releases/{{page.version}}#helm3) - **v{{page.version}}**
{: .note.normal}

{{page.description}}

## Introduction

We present here description of HELM3 deployment structure for environment
specific cases. You can change parameters based on the deployment specifics
and your requirements. Here are the configurations divided into sections. For more information about creating your own catalogue of deployments, check out the [HELM3 docs for more](https://helm.sh/docs/intro/quickstart/).

During platform deployment the current and the [Common values](common-values) charts merge into one general chart.
{: note.info}

### global:
{: .charts.h2}

### apiDocsImage:
{: .charts.h3}
 `"elasticio/api-docs:HASHVERSION"` - image for [API documentation](https://api.elastic.io/docs/v2) service.
 {: .charts.level_h3}
### cloudProvider:
{: .charts.h3}
`"GCP"` - (`GCP` by default). Supported values (`AWS`, `GCP` and `AZURE`)
{: .charts.level_h3}
### containerRuntime:
{: .charts.h3}
 `docker` - Container runtime which is used by selected cloudProvider. Allowed values: `containerd`, `docker`.
{: .charts.level_h3}

### replicas:
{: .charts.h3}
**Replicas of microservices:** These are not all microservices but only the ones
where you can define number of replicas per your requirements and need. Other
services have their replica sets hard-coded in their configurations. Check the
[platform microservices](/on-prem/#:~:text=Platform%20microservices) section for more details
on each service.
{: .charts.level_h3.note.info}
#### dockerRegistry: `2`
{: .charts.h4}
#### api: `2`
{: .charts.h4}
#### branRead: `2`
{: .charts.h4}
#### branWrite: `2`
{: .charts.h4}
#### dockerRegistry: `2`
{: .charts.h4}
#### facelessApi: `2`
{: .charts.h4}
#### frontend: `2`
{: .charts.h4}
#### goldDragonCoin: `2`
{: .charts.h4}
#### lookout: `2`
{: .charts.h4}
#### maester: `2`
{: .charts.h4}
#### pss: `2`
{: .charts.h4}
#### steward: `2`
{: .charts.h4}
#### webhooks: `2`
{: .charts.h4}
#### raven: `2`
{: .charts.h4}

### nodeSelectors:
{: .charts.h3}
The platform uses these node selectors to decide which node pull must be used to run container.
and `ordinaryTask` labels.
{: .charts.level_h3.note.info}
#### platform:
{: .charts.h4}
`platform` - the default value.
{: .charts.level_h4}
#### longRunningTask:
{: .charts.h4}
`longrunning` - the default value.
{: .charts.level_h4}
#### ordinaryTask:
{: .charts.h4}
`ordinary` - the default value.
{: .charts.level_h4}

### services:
{: .charts.h3}
#### componentsPusher:
{: .charts.h4}
`name`: `"components-pusher"` - name of the service which pushes the components.
{: .charts.h5}
`enabled`: `true` - Boolean, set to `true` to enable the service.
{: .charts.h5}
`pullSecret`: - the secret used to fetch the docker images from the dockerhub.
{: .charts.h5}
`configMapName`: `"component-pusher-config"` - [the components configuration](#componentsconfiguration) for the pusher.
{: .charts.h5}

#### api:
{: .charts.h4}
resources:
{: .charts.h5}
limits:
{: .charts.h6}
cpu: 3
{: .charts.h7}
requests:
{: .charts.h6}
cpu: 2
{: .charts.h7}
#### dockerRegistry:
{: .charts.h4}
##### loadBalancerIp:
{: .charts.h4}
`docker_regisrty_internal_ip` - Internal IP used for internal docker registry access.
{: .charts.level_h4}
#### secured:
{: .charts.h4}
`docker-registry-tls` - the name of the tls secret
{: .charts.level_h4}
#### tlsSecretName:
{: .charts.h4}
`docker-registry-cert-name` - (`false` by default) enables tls for the docker registry service.
{: .charts.level_h4}
### fluentd:
{: .charts.h3}
#### execGelfProto:
{: .charts.h4}
`eio_exec_gelf_protocol` - GrayLog GELF input protocol for flow steps logs. (If not provided, the `GELF_PROTOCOL` is used).
{: .charts.level_h4}
#### execGelfHost:
{: .charts.h4}
`eio_exec_gelf_host` - GrayLog GELF input host for flow steps logs. (If not provided, `GELF_HOST` is used).
{: .charts.level_h4}
#### execGelfPort:
{: .charts.h4}
`eio_exec_gelf_port` - GrayLog GELF input port for flow steps logs. (If not provided, `GELF_PORT` is used).
{: .charts.level_h4}
#### ironBank:
{: .charts.h4}
enabled: `true`
{: .charts.h5}
Enable or disable the ironBank service.
{: .charts.level_h5}
#### pssLoadBalancer:
{: .charts.h4}
ip:
{: .charts.h5}
`storage_slugs_lb_ip` - Internal IP for platform storage slugs ingress which is used by Agents.
{: .charts.level_h5}
#### quotaService:
{: .charts.h4}
enabled:
{: .charts.h5}
`true` - Enable or disable the quota service.
{: .charts.level_h5}
#### maester:
{: .charts.h4}
enabled:
{: .charts.h5}
`true`
{: .charts.level_h5}
#### steward:
{: .charts.h4}
pssBackwardCompatibility:
{: .charts.h5}
`true`
{: .charts.level_h5}
### entrypoints:
{: .charts.h3}
#### bloodyGate:
{: .charts.h4}
`agent_vpn_entrypoint` - entry point ip/domain for a [VPN agent](/guides/vpn-agent).
{: .charts.level_h4}
#### loadBalancer:
{: .charts.h4}
`load_balancer_ip` - Public IP for the platform ingress.
{: .charts.level_h4}
### storage:
{: .charts.h3}
#### slugsSubPath:
{: .charts.h4}
`storage_slugs_sub_path_slugs`
{: .charts.level_h4}
#### stewardSubPath:
{: .charts.h4}
`storage_slugs_sub_path_steward`
{: .charts.level_h4}
#### storageClassName:
{: .charts.h4}
`platform-storage-slugs`
{: .charts.level_h4}
#### persistentVolumeClaimName:
{: .charts.h4}
`platform-storage-slugs-volume-claim`
{: .charts.level_h4}
#### type:
{: .charts.h4}
`s3` - Can be one of 4 supported types: `nfs`, `azure`, `aws-efs-csi-driver` and `s3`. `aws-efs-csi-driver` requires EFS CSI driver to be installed. See [docs](https://docs.aws.amazon.com/eks/latest/userguide/efs-csi.html) for the **Amazon EFS CSI driver** configuration
{: .charts.level_h4}
#### fileSystemId:
{: .charts.h4}
`fs-03f24358` - AWS EFS file system ID. Skip if not using type `aws-efs-csi-driver`
{: .charts.level_h4}
##### config:
{: .charts.h5}
name:
{: .charts.h6}
`platform-storage-slugs-volume`
{: .charts.level_h6}
server:
{: .charts.h6}
`nfs_server_address` - NFS instance address used for `platform-storage-slugs` if `storage_slugs_storage_type` is `nfs`.
{: .charts.level_h6}
path:
{: .charts.h6}
`nfs_share` - NFS share name used for `platform-storage-slugs` if `storage_slugs_storage_type` is `nfs`.
{: .charts.level_h6}
size:
{: .charts.h6}
`500Gi` - En example value.
{: .charts.level_h6}
gid:
{: .charts.h6}
`1502`
{: .charts.level_h6}
### componentsConfiguration:
{: .charts.h3}
The `components-pusher` configuration containing the information for each component you
need the service to push automatically. Copy and paste this configuration to suit your
needs.
{: .charts.level_h3.note.info}
developmentTeam: `teamName`
{: .charts.h4}
`teamName` - this is the name of the default team where you deploy your components.
{: .charts.level_h4}
components:
{: .charts.h5}
componentName:
{: .charts.h6}
`componentName` - a unique name you use in your development name. It must match with the name you have already used to push a component into the team. Please pay attention, this must be the parameter name, not the value.
{: .charts.level_h6}
targetTag:
{: .charts.h7}
`latest` - Image tag for pulling into the internal docker registry.
{: .charts.level_h7}
dockerRepoName:
{: .charts.h7}
`"orgName/repoName"` - Image name by which to pull repo from registry
{: .charts.level_h7}
developmentTeam:
{: .charts.h7}
`teamName` - An optional environment variable contaning the team name where to
create the RepoBuild. Will override root `developmentTeam` on the `components`
level if provided.
{: .charts.level_h7}
access:
{: .charts.h7}
`team` - An optional environment variable which sets the access level for the
component in the platform context. The default value is `global`.
{: .charts.level_h7}