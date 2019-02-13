---
title: Deploying with KSonnet
layout: article
section: Developing Components
category: component
order: 1
since: 20190119
---

One of the first problems this article solves is simplifying how users deploying the {{site.data.tenant.name}} platform to Kubernetes clusters.

With that in mind, we are representing a detailed step by step instruction on how to deploy the {{site.data.tenant.name}} platform into a running Kubernetes cluster with all the required descriptors onto that should work on customer's hardware utilizing KSonnet.

Before we go ahead and dive into the configuration peculiarities, let's deal with some of the basic terminologies.

## What is Kubernetes 

> Kubernetes is an open source container orchestration tool developed by Google. [Source code in GitHub](https://github.com/kubernetes/kubernetes).

Kubernetes is an open source toolkit for building a fault-tolerant, scalable platform designed to automate and centrally manage [containerized applications](https://www.techradar.com/news/what-is-container-technology).

The platform itself can be deployed within almost any infrastructure – into any working Kubernetes cluster (manually installed into private infrastructure) in the local network, server cluster, data center, any kind of cloud – public (Google Kubernetes Engine, Azure Kubernetes Service, Amazon Elastic Container Service for Kubernetes, etc.), private, hybrid, or even over the combination of these methods.


### Benefits of Using Kubernetes

* Provide the fastest possible and least costly horizontal scalability by distributing Docker containers over multiple hosts;

* Reduce the need for new hardware resources when scaling;

* Provide the comprehensive control and automation in the administration processes;

* Introduce algorithms for replication, scaling, self-recovery, and resumption of system operability;

* Provide increased fault tolerance and minimize downtime by launching containers on different machines.

## What is KSonnet

> A [CLI-supported framework](https://ksonnet.io/docs/) for extensible Kubernetes configurations.

Ksonnet is an alternate way of defining application configuration for Kubernetes. It utilizes Jsonnet, a JSON templating language instead of the default YAML files to determine k8s manifests. The KSonnet CLI renders the final YAML files and then applies it to the cluster.

It is intended to be used for defining reusable components and incrementally applying them to build an application.

### How does KSonnet work

KSonnet is a mixture of two things: a set of patterened, generic mixin functions that are generated from the kubernetes API spec, and a handful of hand-written helper functions that provide a shorthand for creating some of the more common API object types (like deployments).

In short, Ksonnet helps you define and manage applications as collection of components using Jsonnet and then deploy them on different Kubernetes clusters.

### Common Use Cases

* Flexibility in writing configuration using Jsonnet;

* Packaging: Complex configurations can be built as mixing and matching components;

* Reusable component and prototype library: avoid duplication;

* Easy deployments to multiple environments;

* Last-mile deployment: CD step.


## Deploying Platform

In this section we describe how to install, configure the necessary components, and get everything ready for deployment. 

The following repository contains the [KSonnet registry](https://ksonnet.io/docs/concepts#registry) of {{site.data.tenant.name}} platform components.
To proceed further, please install the [KSonnet CLI](https://github.com/ksonnet/ksonnet/releases) first.

### Installation

To be able to execute the platform's fresh installation you should configure all the necessary parameters in the `config.json` & `platform.json` files.

### Configuration

On this step you can find all the necessary descriptors parameters and its classification to be able to proceed with further configuration.

Let's start with the first configuration file to set up:

#### config.json

```js
{
    "accounts_password": "%accounts_password%",
    "amqp_uri": "%amqp_uri%",
    "api_uri": "%api_uri%",
    "api_service": "%api_service%",
    "appdirect_marketplace_url": "%appdirect_marketplace_url%",
    "appdirect_subscription_events_uri": "%appdirect_subscription_events_uri%",
    "apidocs_service": "%apidocs_service%",
    "apprunner_image": "%apprunner_image%",
    "company_name": "%company_name%",
    "component_mem_default": "%component_mem_default%",
    "cookie_max_age": "%cookie_max_age%",
    "debug_data_size_limit_mb": "%debug_data_size_limit_mb%",
    "default_driver_backend": "%default_driver_backend%",
    "default_per_contract_quota": "%default_per_contract_quota%",
    "elastic_search_uri": "%elastic_search_uri%",
    "enforce_quota": "%enforce_quota%",
    "environment": "%environment%",
    "env_password": "%env_password%",
    "external_api_uri": "%external_api_uri%",
    "external_app_uri": "%external_app_uri%",
    "external_gateway_uri": "%external_gateway_uri%",
    "external_steward_uri": "%external_steward_uri%",
    "frontend_service": "%frontend_service%",
    "gelf_address": "%gelf_address%",
    "gelf_host": "%gelf_host%",
    "gelf_port": "%gelf_port%",
    "gelf_protocol": "%gelf_protocol%",
    "git_receiver_host": "%git_receiver_host%",
    "hooks_data_password": "%hooks_data_password%",
    "intercom_access_token": "%intercom_access_token%",
    "intercom_app_id": "%intercom_app_id%",
    "intercom_secret_key": "%intercom_secret_key%",
    "kubernetes_rabbitmq_uri_sailor": "%kubernetes_rabbitmq_uri_sailor%",
    "kubernetes_slugs_base_url": "%kubernetes_slugs_base_url%",
    "mandrill_api_key": "%mandrill_api_key%",
    "marathon_uri": "%marathon_uri%",
    "message_crypto_iv": "%message_crypto_iv%",
    "message_crypto_password": "%message_crypto_password%",
    "mongo_uri": "%mongo_uri%",
    "node_env": "%node_env%",
    "petstore_api_host": "%petstore_api_host%",
    "predefined_users": "%predefined_users%",
    "quotas_uri": "%quotas_uri%",
    "rabbitmq_stats_login": "%rabbitmq_stats_login%",
    "rabbitmq_stats_pass": "%rabbitmq_stats_pass%",
    "rabbitmq_stats_uri": "%rabbitmq_stats_uri%",
    "rabbitmq_uri_boatswains": "%rabbitmq_uri_boatswains%",
    "rabbitmq_uri_sailor": "%rabbitmq_uri_sailor%",
    "rabbitmq_virtual_host": "%rabbitmq_virtual_host%",
    "rabbitmq_max_messages_per_queue": "%rabbitmq_max_messages_per_queue%",
    "rabbitmq_max_messages_mbytes_per_queue": "%rabbitmq_max_messages_mbytes_per_queue%",
    "raven_uri": "%raven_uri%",
    "secondary_marathon_uri": "%secondary_marathon_uri%",
    "service_account_password": "%service_account_password%",
    "service_account_username": "%service_account_username%",
    "session_mongo_uri": "%session_mongo_uri%",
    "slug_base_url": "%slug_base_url%",
    "steward_storage_uri": "%steward_storage_uri%",
    "steward_uri": "%steward_uri%",
    "suspended_task_max_messages_count": "%suspended_task_max_messages_count%",
    "suspend_watch_kubernetes_max_events": "%suspend_watch_kubernetes_max_events%",
    "team_name": "%team_name%",
    "tenant_code": "%tenant_code%",
    "tenant_domain": "%tenant_domain%",
    "tenant_name": "%tenant_name%",
    "user_amqp_crypto_password": "%user_amqp_crypto_password%",
    "user_api_crypto_password": "%user_api_crypto_password%",
    "webhooks_base_uri": "%webhooks_base_uri%",
    "webhooks_service": "%webhooks_service%",
    "tenant_admin_email": "%tenant_admin_email%",
    "tenant_admin_password": "%tenant_admin_password%",
    "log_level": "%log_level%"
}
```

* `accounts_password` - a secret key, used for encryption of payload of user's credentials in a database;

* `amqp_uri` - RabbitMQ's unique identifier. More information about 'amqp' can be found [here](https://www.rabbitmq.com/uri-spec.html)

* `api_uri` - description;

* `api_service` - description;

* `appdirect_marketplace_url` - description;

* `appdirect_subscription_events_uri` - description;

* `apidocs_service` - description;

* `apprunner_image` - description;

* `company_name` - description;

* `component_mem_default` - description;

* `cookie_max_age` - description;

* `debug_data_size_limit_mb` - description;

* `default_driver_backend` - description;

* `default_per_contract_quota` - description;

* `elastic_search_uri` - description;

* `enforce_quota` - description;

* `environment` - description;

* `env_password` - description;

* `external_api_uri` - description;

* `external_app_uri` - description;

* `external_gateway_uri` - description;

* `external_steward_uri` - description;

* `frontend_service` - description;

* `gelf_address` - description;

* `gelf_host` - description;

* `gelf_port` - description;

* `gelf_protocol` - description;

* `git_receiver_host` - description;

* `hooks_data_password` - description;

* `intercom_access_token` - description;

* `intercom_app_id` - description;

* `intercom_secret_key` - description;

* `kubernetes_rabbitmq_uri_sailor` - description;

* `kubernetes_slugs_base_url` - description;

* `mandrill_api_key` - description;

* `marathon_uri` - description;

* `message_crypto_iv` - description;

* `message_crypto_password` - description;

* `mongo_uri` - description;

* `node_env` - description;

* `petstore_api_host` - description;

* `predefined_users` - description;

* `quotas_uri` - description;

* `rabbitmq_stats_login`, `rabbitmq_stats_pass`, `rabbitmq_stats_uri`, `rabbitmq_uri_boatswains`, `rabbitmq_uri_sailor`, `rabbitmq_virtual_host`, `rabbitmq_max_messages_per_queue`, `rabbitmq_max_messages_mbytes_per_queue`, - number of RabbitMQ-related instances that are responsible for proper functioning of RabbitMQ DataBase components.

* `raven_uri` - description;

* `secondary_marathon_uri` - description;

* `service_account_password` - description;

* `service_account_username` - description;

* `session_mongo_uri` - description;

* `slug_base_url` - description;

* `steward_storage_uri` - description;

* `steward_uri` - description;

* `suspended_task_max_messages_count` - description;

* `suspend_watch_kubernetes_max_events` - description;

* `team_name` - description;

* `tenant_code` - description;

* `tenant_domain` - description;

* `tenant_name` - description;

* `user_amqp_crypto_password` - description;

* `user_api_crypto_password` - description;

* `webhooks_base_uri` - description;

* `webhooks_service` - description;

* `tenant_admin_email` - description;

* `tenant_admin_password` - description;

* `log_level` - description;

* `external_api_uri`, `external_app_uri`, `external_gateway_uri`, `external_steward_uri` - number of instances responsible for pointing API, Frontend, Webhooks and the Steward application respectively to the DNS names. 

* `mongo_uri` and `session_mongo_uri` - MongoDB-related instances responsible for the most DataBase payload storage and session storage for a web applications respectively.

* `webhooks_base_uri` and `webhooks_service` - instances that are responsible for pointing Webhooks to the DNS name.


Check the following [README.md](https://github.com/elasticio/k8s-deployment/blob/master/README.md) file for more detailed parameters description.  

The next configuration file to work on is related to the platform itself:

#### platform.json

```js
{
    "ingress_cert_name": "elasticio-ingress-certificate",
    "ingress_cert_crt": "%https_ssl_cert_crt_base64%",
    "ingress_cert_key": "%https_ssl_cert_key_base64%",
    "docker_username": "%docker_username%",
    "docker_password": "%docker_password%",
    "docker_email": "%docker_email%",
    "api_docs_image": "%api_docs_image%",
    "app_domain": "%app_domain%",
    "webhooks_domain": "%webhooks_domain%",
    "api_domain": "%api_domain%",
    "gitreceiver_key": "%gitrececeiver_pub_key_base64%",
    "ingress_name_default": "elasticio-ingress",
    "ingress_name_api_docs": "ingress-api-docs",
    "load_balancer_ip": "%load_balancer_ip%",
    "storage_slugs_pv_name": "platform-storage-slugs-volume",
    "nfs_server_address": "%pss_nfs_addr%",
    "nfs_share": "%pss_nfs_share%",
    "storage_slugs_lb_ip": "%pss_lb_ip%",
    "storage_slugs_size": "%pss_storgare_size%",
    "storage_slugs_sub_path_slugs": "slugs",
    "storage_slugs_sub_path_steward": "steward",
    "api_replicas": 2,
    "frontend_replicas": 2,
    "gold_dragon_coin_replicas": 2,
    "webhooks_replicas": 2,
    "storage_slugs_replicas": 2,
    "raven_replicas": 2,
    "steward_replicas": 2,
    "lookout_replicas": 2
}
```

* `ingress_cert_crt` and `ingress_cert_key` - https SSL certificate and key for application domains, base64 encoded.

* `docker_username`, `docker_password`, `docker_email` - docker registry credential; used for the registry where the {{site.data.tenant.name}} applications are.

* `app_domain`, `api-domain`, `webhooks_domain` - {{site.data.tenant.name}} applications domains.

* `gitreceiver_key` - public key for gitreceiver, base64 encoded

* `load_balancer_ip` - external IP-address of the {{site.data.tenant.name}} application.

* `nfs_server_address` and `nfs_share` - configuration of NFS instance for slugs component and slugs storage.

* `storage_slugs_lb_ip` - internal IP-address of platform-storage-slugs that is used for Agents.

* `storage_slugs_size` - size of slugs storage (refer to Kubernetes PersistentVolume `size` field for format).

* `api_replicas`, `gold_dragon_coin_replicas`, `webhooks_replicas`, `storage_slugs_replicas`, `raven_replicas`, `steward_replicas`, `lookout_replicas` - number of instances for applications.


### Initializing the KSonnet project

```bash
ks init elasticio --skip-default-registries --env elasticio --context <kubectl_context>
cd elasticio
```

### Adding the {{site.data.tenant.name}} registry

```bash
ks registry add elasticio github.com/elasticio/KSonnet-registry/tree/master
```

### Installing the {{site.data.tenant.name}} packages

```bash
ks pkg install elasticio/platform@<current_elasticio_version>
```

### Generating the KSonnet components

```bash
ks generate elastic.io.config config --values-file=config.json
ks generate elastic.io.gendry gendry
ks generate elastic.io.platform platform --values-file=platform.json
```

### Applying configuration

```bash
ks apply -c config elasticio --skip-gc --gc-tag elasticio0 --context <kubectl_context>
```

### Running Gendry application to initialize the {{site.data.tenant.name}} platform

```bash
ks apply -c gendry elasticio --skip-gc --gc-tag elasticio0 --context <kubectl_context>
```
Wait until the Gendry's pod status changes to completed:

`kubectl --context <kubectl_context> --namespace platform get pods -lapp=gendry`

The output should look like the following:
```
NAME           READY   STATUS      RESTARTS   AGE
gendry-qzjfp   0/1     Completed   0          1d
```

### Deploying platforms' applications

```bash
ks apply elasticio --gc-tag elasticio0 --context <kubectl_context>
```

## Updating Platform

Below are the steps required for updating to the new version.

### Installing a new version of packages

```bash
ks pkg install elasticio/platform@<new_elasticio_version>
```

### Removing an outdated components

```bash
ks component rm config
ks component rm gendry
ks component rm platform
```

### Generating a new version of KSonnet components

```bash
ks generate elastic.io.config config --values-file=/path/to/config.json
ks generate elastic.io.gendry gendry
ks generate elastic.io.platform platform --values-file=/path/to/platform.json
```

### Updating configuration

```bash
ks apply -c config elasticio --skip-gc --gc-tag elasticio0 --context <kubectl_context>
```

### Run Gendry application to initialize the {{site.data.tenant.name}} platform

```bash
ks delete -c gendry elasticio --context <kubectl_context>
ks apply -c gendry elasticio --skip-gc --gc-tag elasticio0 --context <kubectl_context>
```

Wait until the Gendry's pod status changes to completed:

`kubectl --context <kubectl_context> --namespace platform get pods -lapp=gendry`

The output should look like the following:

```
NAME           READY   STATUS      RESTARTS   AGE
gendry-qzjfp   0/1     Completed   0          1d
```

### Updating platforms' applications

```bash
ks apply elasticio --gc-tag elasticio0 --context <kubectl_context>
```

## Known issues

In this section you can find the list of known issues and its workarounds.

### Error: 403 API rate limit exceeded

*Error Code:*

`GET https://api.github.com/repos/elasticio/KSonnet-registry/commits/master: 403 API rate limit exceeded for %YOUR_IP_ADDRESS%`

*Solution:*

1. Create a GitHub [personal access token](https://github.com/settings/tokens);

2. Set `GITHUB_TOKEN` environment variable, i.e. 

    `GITHUB_TOKEN=<github_personal_token> ks registry add   elasticio github.com/elasticio/ksonnet-registry/tree/master`

### Error: Registry already exists

*Error Code:*

`Registry with name already exists`

*Solution:*

Remove the KSonnet project directory and execute all the previous installation steps once again.

## Summary

Let's briefly review the key points we have learned from this article.

* Kubernetes is a core tool in DevOps, and is the world's most popular open-source container orchestration engine. It offers the ability to schedule and manage containers (Docker or otherwise) at scale;

* Ksonnet helps defining and managing applications as collection of components using Jsonnet and then deploying them on different Kubernetes clusters;

* The `config.json` & `platform.json` files have to be configured first, before proceeding with KSonnet deployment.

