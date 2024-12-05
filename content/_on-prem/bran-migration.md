---
layout: article
title: Bran Migration
order: 7
section: Installation Guides
description: This document provides a step-by-step tutorial on how to migrate the bran to work with High Availability requierements.
category: installation
---

{{page.description}}

## Introduction

`bran` service (a backend for Threads) now creates and uses replicated tables, which is a starting point for HA (High Availability) of this service.

> **Note**: for existing installation manual migration required!!! Migration can only be executed if installation has 2 ClickHouse instances and 1-3 ZooKeeper instances properly configured.

## Migration plan

1. Create a remote backup of `/mnt/clickhouse`. It contains databases, tables, their metadata and data. You can just mount new disk, create a backup on it and unmount (check that it's not removed and have a clear name, e.g. `clickhouse_backup_before_migration_delete_after_date`)
2. Check that policy for `bran*` queues in rabbitmq can collect all messages received during down time. Looks like `max-length: 3000000 max-length-bytes: 8388608000` should be enough. Your maliage may vary.
3. Stop anybody writing into `bran`'s database (looks like `bran-write` only).
> NOTE: you may potentially get a message duplicate on restart, because `bran` may process message, but don't call `ack` before shutdown.
4. Rename current tables
```
RENAME TABLE
  bran.messages TO bran.messages_standalone,
  bran.events TO bran.events_standalone,
  bran.containers TO bran.containers_standalone,
  bran.threads_view_list TO bran.threads_view_list_standalone,
  bran.threads_view_by_id TO bran.threads_view_by_id_standalone
```

5. create new replicated tables:
run `LOG_LEVEL=info AMQP_URI= MONGO_URI= BRAN_CLICKHOUSE_URI="http://localhost:8123/bran" npm run dev:migrate` locally.
6. Move parts from old tables to a special folder of new ones:
```
rsync -a --remove-source-files --exclude "format_version.txt" --exclude "detached" /mnt/clickhouse/data/bran/messages_standalone/ /mnt/clickhouse/data/bran/messages/detached/
rsync -a --remove-source-files --exclude "format_version.txt" --exclude "detached" /mnt/clickhouse/data/bran/events_standalone/ /mnt/clickhouse/data/bran/events/detached/
rsync -a --remove-source-files --exclude "format_version.txt" --exclude "detached" /mnt/clickhouse/data/bran/%2Einner%2Econtainers_standalone/ /mnt/clickhouse/data/bran/%2Einner%2Econtainers/detached/
rsync -a --remove-source-files --exclude "format_version.txt" --exclude "detached" /mnt/clickhouse/data/bran/%2Einner%2Ethreads_view_by_id_standalone/ /mnt/clickhouse/data/bran/%2Einner%2Ethreads_view_by_id/detached/
rsync -a --remove-source-files --exclude "format_version.txt" --exclude "detached" /mnt/clickhouse/data/bran/%2Einner%2Ethreads_view_list_standalone/ /mnt/clickhouse/data/bran/%2Einner%2Ethreads_view_list/detached/
```
7. Start services that were stopped in 3). Old data will be temporarily unavailable in UI, but at least queued data will be sent to new CH tables.
8. Check that UI page Executions is working and lists new threads.
9. Attach moved parts to new tables ([ClickHouse/ClickHouse#8183](https://github.com/ClickHouse/ClickHouse/issues/8183)):
```
clickhouse-client --format=TSVRaw -q"select 'ALTER TABLE ' || database || '.\"' || table || '\" ATTACH PARTITION ID \'' || partition_id || '\';\n' from system.detached_parts where table != 'messages' group by database, table, partition_id order by database, table, partition_id;" | clickhouse-client -nm (add --host --user --password params for clickhouse-client)
```
10. Restore rabbitmq policy if it was changed in 2).
11. Check that data was really restored (ask QA)
12. run step 5) for 2nd ClickHouse instance
13. Drop old tables:
```
DROP TABLE bran.messages_standalone;
DROP TABLE bran.events_standalone;
DROP TABLE bran.containers_standalone;
DROP TABLE bran.threads_view_list_standalone;
DROP TABLE bran.threads_view_by_id_standalone;
```
14. Schedule backup remove made in 1)
