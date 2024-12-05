---
layout: article
title: Common Values
order: 2
section: Helm3 deployments
version: 22.38
description: Description of HELM3 common configuration values for all environments and their purpose.
category: helm3
---

{: .no_toc}
[Platform release](https://docs.elastic.io/releases/{{page.version}}#helm3) - **v{{page.version}}**
{: .note.normal}

{{page.description}}

## Introduction

This document describes the HELM3 deployment parameters and their descriptions
which are common for all environments. Check the [general description](general-description)
for explanations and specifications for different environments.

Here are the configurations divided into sections.

### global:
{: .charts.h2}

### version:
{: .charts.h3}
{{page.version}} - The format is year (`YY`) and week (`WW`) added with an extra optional release (`V`).
{: .charts.level_h3}

### affinityKey:
{: .charts.h3}
`app` - Kubernetes configuration for [assigning pods to the correct nodes](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/).
{: .charts.level_h3}

### cloudProvider:
{: .charts.h3}
`GCP` by default. Supported values: `AWS`, `GCP` and `AZURE`.
{: .charts.level_h3}

### containerRuntime:
{: .charts.h3}
 Container runtime used by the [cloudProvider](#cloudprovider). Allowed values: `containerd`, `docker`
{: .charts.level_h3}

### displayPlatformVersion:
{: .charts.h3}
Whether we should expose platform version for end-user. Will be displayed at least in frontend UI and API responses. Allowed values: `true`, `false`
{: .charts.level_h3}

### persistentMessages:
{: .charts.h3}
Allowed values: `true` or `false`. Enables `deliveryMode` : `2` (persistent) for
all components on the installation which use supported sailor versions
(`sailor-nodejs` from `2.7.0` and `sailor-jvm` from `3.4.0`). Default value: `false`.
{: .charts.level_h3 .note.warning}

### secrets:
{: .charts.h3}
#### admiral:
{: .charts.h4}
`"admiral-secrets"` - a separate secrets for the new replicated-admiral. Not used for now.
{: .charts.level_h4 .note.warning}
#### platform:
{: .charts.h4}
Secret containing main bulk of platform environment variables. Check the [Platform environment secret](secrets#platform-environment-secret) section for more information.
{: .charts.level_h4}
#### platformServices:
{: .charts.h4}
Auto-generated secret for service discovery. It contains the internal URLs for the platform
services.
{: .charts.level_h4}
#### imagePull:
{: .charts.h4}
This is the [platform docker registry secret](secrets#platform-docker-registry-secret).
{: .charts.level_h4}
#### gitReceiverPrivateKey:
{: .charts.h4}
Secret containing an RSA private key. Check the
[Git-receiver secret](secrets#git-receiver-secret) section for more.
{: .charts.level_h4}
#### azureStorage: `""`
{: .charts.h4}
#### dockerRegistry:
{: .charts.h4}
Secret used by the whole platform to pull platform microservice images from the
dockerhub. Check the [platform docker registry secret](secrets#platform-docker-registry-secret) for details.
{: .charts.level_h4}
#### dockerRegistryPush:
{: .charts.h4}
Platform uses this secret to push component docker container images to the
docker registry. Check the [docker registry push secret](secrets#docker-registry-push-secret)  description for more information.
{: .charts.level_h4}
#### dockerRegistryHtpasswdSecret:
{: .charts.h4}
Platform uses this secret in the configuration of username/password authentication for internal docker registry. Check the [Docker registry htpasswd secret](secrets#docker-registry-htpasswd-secret) description for more information.
{: .charts.level_h4}
#### mongodbTlsCertificateKey:
{: .charts.h4}
`clientKeySecretName` - Secret name with tls certificate and key. If specified,
will be mounted to the services and specified in the `tlsCertificateKeyFile`
connection option.
{: .charts.level_h4}
#### mongodbTlsCA:
{: .charts.h4}
`caSecretName` - Secret name with CA certificate to validate mongodb server
certificate in the client side. If specified, will be mounted to the services and
specified in the `tlsCAFile` connection option.
{: .charts.level_h4}

### namespaces:
{: .charts.h3}
**Namespaces**: You must create these namespaces in your Kubernetes cluster beforehand. HELM3 chart installations expect to find these namespaces during the installation of the platform version starting from the 21.31 release. Check [namespaces page](namespaces) for More instructions.
{: .charts.level_h3.note.warning}
#### tasks: `"tasks"`
{: .charts.h4}
Platform uses this namespace for pods running the **integration flow steps**.
You can pick an arbitrary name but you must define it beforehand.
{: .charts.level_h4}
#### platform: `"platform"`
{: .charts.h4}
Platform uses this namespace for the pods running the **platform microservices**.
{: .charts.level_h4}
#### monitoring: `"monitoring"`
{: .charts.h4}
Platform uses this namespace for the pods running the **monitoring microservices**.
{: .charts.level_h4}

### appNames:
{: .charts.h3}
**Service Apps:** Links to charts for all microservices. Each app has a separate
descriptors and charts pulled during the platform deployment. For more information check the [platform microservices](/on-prem/#:~:text=Platform%20microservices) section.
{: .charts.level_h3.note.info}
#### admiral: `"admiral"`
{: .charts.h4}
#### api: `"api"`
{: .charts.h4}
#### apiDocs: `"api-docs"`
{: .charts.h4}
#### bloodyGate: `"bloody-gate"`
{: .charts.h4}
#### branRead: `"bran-read"`
{: .charts.h4}
#### branWrite: `"bran-write"`
{: .charts.h4}
#### cache: `"cache"`
{: .charts.h4}
#### defaultBackend: `"default-backend"`
{: .charts.h4}
#### dockerRegistry: `"docker-registry"`
{: .charts.h4}
#### facelessApi: `"faceless-api"`
{: .charts.h4}
#### facelessTokeRefresher: `"faceless-token-refresher"`
{: .charts.h4}
#### fluentd: `"eio-fluentd"`
{: .charts.h4}
#### frontend: `"frontend"`
{: .charts.h4}
#### gendry: `"gendry"`
{: .charts.h4}
#### gitReceiver: `"gitreceiver"`
{: .charts.h4}
#### goldDragonCoin: `"gold-dragon-coin"`
{: .charts.h4}
#### handmaiden: `"handmaiden"`
{: .charts.h4}
#### ingress: `"ingress-nginx"`
{: .charts.h4}
#### ironBank: `"iron-bank"`
{: .charts.h4}
#### knightOfTheBloodyGate: `"knight-of-the-bloody-gate"`
{: .charts.h4}
#### lookout: `"lookout"`
{: .charts.h4}
#### maester: `"maester"`
{: .charts.h4}
#### pss: `"platform-storage-slugs"`
{: .charts.h4}
#### quotaService: `"quota-service"`
{: .charts.h4}
#### raven: `"raven"`
{: .charts.h4}
#### s3: `"s3"`
{: .charts.h4}
#### scheduler: `"scheduler"`
{: .charts.h4}
#### stakaterReloader: `"stakater-reloader"`
{: .charts.h4}
#### steward: `"steward"`
{: .charts.h4}
#### webhooks: `"webhooks"`
{: .charts.h4}
#### wiper: `"wiper"`
{: .charts.h4}

### services:
{: .charts.h3}
**Service availability**: By default all services are enabled. You can disable any service by changing the value of **enable** parameter from true to false. However, **we do not recommend doing this for system critical services.** Consult the [platform microservices](/on-prem/#:~:text=Platform%20microservices) section to know which services are critical.
{: .charts.level_h3.note.info}
#### admiral:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"admiral-service"`
{: .charts.h5}
#### apiDocs:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"api-docs-service"`
{: .charts.h5}
port: 8000
{: .charts.h5}
#### api:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"api-service"`
{: .charts.h5}
port: 9000
{: .charts.h5}
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
#### bloodyGate:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"bloody-gate-service"`
{: .charts.h5}
port: 3000
{: .charts.h5}
#### branRead:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"bran-read-service"`
{: .charts.h5}
port: 5961
{: .charts.h5}
#### branWrite:
{: .charts.h4}
name: `"bran-write-service"`
{: .charts.h5}
enabled: true
{: .charts.h5}
#### cache:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"cache-service"`
{: .charts.h5}
port: 6379
{: .charts.h5}
#### defaultBackend:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"default-backend-service"`
{: .charts.h5}
port: 8080
{: .charts.h5}
#### dockerRegistry:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"docker-registry-service"`
{: .charts.h5}
storageDriver: `"filesystem"`
{: .charts.h5}
nodePort: 31000
{: .charts.h5}
loadBalancerIp: ""
{: .charts.h5}
path: `"elasticio"`
{: .charts.h5}
uri: `""`
{: .charts.h5}
secured: false
{: .charts.h5}
#### facelessApi:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"faceless-api-service"`
{: .charts.h5}
port: 1396
{: .charts.h5}
#### facelessTokeRefresher:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"faceless-token-refresher-service"`
{: .charts.h5}
port: 11396
{: .charts.h5}
#### fluentd:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"fluentd-service"`
{: .charts.h5}
execGelfProto: `""`
{: .charts.h5}
execGelfHost: `""`
{: .charts.h5}
execGelfPort: `""`
{: .charts.h5}
#### frontend:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"frontend-service"`
{: .charts.h5}
port: 8000
{: .charts.h5}
#### gendry:
{: .charts.h4}
name: `"gendry-service"`
{: .charts.h5}
enabled: true
{: .charts.h5}
configMapName: `"gendry-config"`
{: .charts.h5}
#### gitReceiver:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"gitreceiver-service"`
{: .charts.h5}
port: 4022
{: .charts.h5}
#### goldDragonCoin:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"gold-dragon-coin-service"`
{: .charts.h5}
port: 9000
{: .charts.h5}
#### handmaiden:
{: .charts.h4}
name: `"handmaiden-service"`
{: .charts.h5}
enabled: true
{: .charts.h5}
issuer:
{: .charts.h5}
name: letsencrypt-issuer
{: .charts.h6}
Available values: issuer/cluster-issuer
{: .charts.level_h6}
kind: issuer
{: .charts.h6}
#### ingress:
{: .charts.h4}
enabled: true
{: .charts.h5}
error5xxUrl: `""`
{: .charts.h5}
defaultBackendPort: `""`
{: .charts.h5}
name: `"ingress-loadbalancer"`
{: .charts.h5}
httpPort: 80
{: .charts.h5}
httpsPort: 443
{: .charts.h5}
sshPort: 22
{: .charts.h5}
#### ironBank:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"iron-bank-service"`
{: .charts.h5}
port: 3000
{: .charts.h5}
#### knightOfTheBloodyGate:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"knight-of-the-bloody-gate-service"`
{: .charts.h5}
port: 3000
{: .charts.h5}
#### lookout:
{: .charts.h4}
name: `"lookout-service"`
{: .charts.h5}
enabled: true
{: .charts.h5}
#### maester:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"maester-service"`
{: .charts.h5}
port: 3002
{: .charts.h5}
#### maesterRedis:
{: .charts.h4}
enabled: true
{: .charts.h5}
useSentinels: false
{: .charts.h5}
weather we should use sentinels for redis
{: .charts.level_h5}
name: `"maester-redis-service"`
{: .charts.h5}
port: 6379
{: .charts.h5}
#### pss:
{: .charts.h4}
enabled: false
{: .charts.h5}
name: `"platform-storage-slugs-service"`
{: .charts.h5}
port: 9999
{: .charts.h5}
#### pssLoadBalancer:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"platform-storage-slugs-loadbalancer"`
{: .charts.h5}
port: 9999
{: .charts.h5}
#### quotaService:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"quota-service-service"`
{: .charts.h5}
port: 3002
{: .charts.h5}
#### raven:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"raven-service"`
{: .charts.h5}
port: 8070
{: .charts.h5}
#### s3:
{: .charts.h4}
enabled: false
{: .charts.h5}
name: `"s3-service"`
{: .charts.h5}
port: 3000
{: .charts.h5}
#### scheduler:
{: .charts.h4}
name: `"scheduler-service"`
{: .charts.h5}
enabled: true
{: .charts.h5}
#### stakaterReloader:
{: .charts.h4}
enabled: true
{: .charts.h5}
#### steward:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"steward-service"`
{: .charts.h5}
port: 8200
{: .charts.h5}
pssBackwardCompatibility: false
{: .charts.h5}
#### webhooks:
{: .charts.h4}
enabled: true
{: .charts.h5}
name: `"webhooks-service"`
{: .charts.h5}
port: 5000
{: .charts.h5}
#### wiper:
{: .charts.h4}
enabled: true
{: .charts.h5}

### prometheusScrape:
{: .charts.h3}
**Prometheus**: These parameters enable data scrapping from the services. All data is sent to the Prometheus service. Our team uses for monitoring and alerting purposes.
{: .charts.level_h3.note.info}
admiral: `"true"`
{: .charts.h4}
api: `"true"`
{: .charts.h4}
branRead: `"true"`
{: .charts.h4}
branWrite: `"true"`
{: .charts.h4}
facelessApi: `"true"`
{: .charts.h4}
facelessTokenRefresher: `"true"`
{: .charts.h4}
ironBank: `"true"`
{: .charts.h4}
maester: `"true"`
{: .charts.h4}
s3: `"true"`
{: .charts.h4}
cache: `"true"`
{: .charts.h4}
raven: `"true"`
{: .charts.h4}
scheduler: `"true"`
{: .charts.h4}
fluentd: `"true"`
{: .charts.h4}
webhooks: `"true"`
{: .charts.h4}