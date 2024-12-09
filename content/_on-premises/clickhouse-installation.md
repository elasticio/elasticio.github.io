---
layout: article
title: ClickHouse Installation
order: 2
section: Installation Guides
description: Document guides through the installation and configuration of the ClickHouse service.
category: installation
---

{: .no_toc}

{{page.description}}

- TOC
{:toc}

## Installation

### VM Requirements

*   Separate VM
*   RAM: 8 GB
*   Storage: 40 GB


### Steps

*   [Install](https://clickhouse.com/docs/en/install) version `19.13.1.11`,
*   Make it accessible by IP address from kubernetes pods network. Also configure firewall to allow access to `8123` port
of this VM.

## Configuration

For this guide we assume the configuration folder location is
at `/etc/clickhouse-server/`. Use your folder if it's different.

### Authentication

[Set up](https://clickhouse.com/docs/en/operations/access-rights) username and
password if you were not asked about credentials during the installation. The created
user must have rights to create database, tables, materialized views and
update/delete tables and materialized views.

## High Availability

Since the ClickHouse supports replication on a table level, It uses ZooKeeper for storing
replicas meta information. Which means you must [install the ZooKeeper](zookeeper-installation) first.

Check that you have not disabled the ClickHouse replication in platform configuration.
You would have done it by using the `*CLICKHOUSE_NO_REPLICA` [Helm](/on-premises/general-description) variables.
If you have disabled the replication and the cluster is running, you need to do
perform a data migration. Ask our support for instructions.
{: .mx-6 .mt-2 .mb-2 .bg-grey-lt-000 .p-4}

The following instruction and command MUST run on each replica Virtual Machine.

### Step1 - macros.xml file

Create `macros.xml` file inside `/etc/clickhouse-server/config.d/` (default
ClickHouse server configuration location) with the following contents.

```xml
<yandex>
    <macros>
        <shard>[shard_id]</shard>
        <replica>[shard_id]-[replica_id].[domain]</replica>
    </macros>
</yandex>
```

Where you must replace the following values:

*   `[shard_id]` (e.g. 01) - shard instance id. Currently we don't use sharding, so all instances will contain the same value.
*   `[replica_id]` (e.g. 1) - replica member id. Each replica instance should have unique id.
*   `[domain]` (e.g. elastic.io) - string to identify this CH cluster. We prefer to use a domain.


### Step2 - ZooKeeper Servers

Create `config.d/zookeeper-servers.xml` file inside the configuration folder with
the following contents:

```xml
<?xml version="1.0"?>
<yandex>
    <zookeeper>
        <node>
            <host>[zookeeper_instance_host_1]</host>
            <port>[zookeeper_instance_port_1]</port>
        </node>
        <node>
            <host>[zookeeper_instance_host_2]</host>
            <port>[zookeeper_instance_port_2]</port>
        </node>
        <node>
            <host>[zookeeper_instance_host_3]</host>
            <port>[zookeeper_instance_port_3]</port>
        </node>
    </zookeeper>
</yandex>
```

We recommend using minimum 3 instances, but you can add more ZooKeeper nodes.

Here are explanations of used values and what they mean:

*   `[zookeeper_instance_host_1]`/`[zookeeper_instance_host_2]`/`[zookeeper_instance_host_3]` (e.g. 10.110.0.1, 10.110.0.2, 10.110.0.3) - ZooKeeper instance host names or IP address.
*   `[zookeeper_instance_port_1]`/`[zookeeper_instance_port_2]`/`[zookeeper_instance_port_3]` (e.g. 2181) - ZooKeeper instance host port.

### Step3 - Restart

There are 3 services which are using ClickHouse `bran-read`, `bran-write` and the
`iron-bank`. They will setup required databases, tables and materialized views
during the startup. But they will do it only on a node specified in a ClickHouse
connection URI.

As ClickHouse replication would not automatically propagate table creation to other
cluster instances, you need to do it manually:

1.  Prepare connection URI for each ClickHouse cluster instance and run:
```
docker run -e LOG_LEVEL=info -e AMQP_URI= -e MONGO_URI= -e BRAN_CLICKHOUSE_URI="[connection_uri]" --rm --network=host elasticio/bran:[platform_version] npm run start:migrate.
```

Note, `[connection_uri]` should include database name.

2.  Do the same for the iron-bank:
```
docker run -e CLICKHOUSE_URI="[connection_uri]" --rm --network=host elasticio/iron-bank:[platform_version] npm run start.
```

Note, `[connection_uri]` should include database name. There may be some errors, but
if you see connected to ClickHouse message – setup ended and you can stop the command.

### Limitations


Currently we don't support automatic switch between replicas, so you need to
update a kubernetes cluster secret with a new replica URL to switch the instance.

We support automatic migrations for database structure only for the main replica.
We will provide you with instructions on how to migrate other replicas when our
next version will require structure migration.
