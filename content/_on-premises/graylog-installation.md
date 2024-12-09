---
layout: article
title: GrayLog Installation
order: 1
section: Installation Guides
description: Document guides the installation, configuration and index setup of the GrayLog service.
category: installation
---

{: .no_toc}

{{page.description}}

- TOC
{:toc}

## Installation

We are supporting GrayLog versions 2.4.7 - 3.1.2 which works with the specific
version of Elasticsearch (5th version).

## Configuration

This section shows how to configure [GrayLog](graylog) for log collection
from the platform services, as well as from the flow steps and one-time executions.

We recommend setting up different streams for the platform services and the
integration flow executions to enable different retention policies for the
technical logs produced by the platform and the execution logs produced by the
integration flow steps.

[Fluentd](/on-premises/kubernetes/fluentd) collects logs from the Kubernetes containers
and sends logs to GrayLog in the `GELF` format. The plan is to configure GrayLog
input to receive messages via the following two ports:

*   Port `12201` for the platform services (`eio-platform`)
*   Port `12202` for the flow step and one-time executions (`eio-exec`)

### Platform services input

We use this input to collect all logs from the platform services on the port
`12201`. The following are the configurations in the GrayLog UI.

1.  Go to **System / Inputs -> Inputs**,
2.  Select `GELF UDP` in the select box,
3.  Click on the **Launch new input**,
4.  Check the **Global** checkbox,
5.  Specify **Title** to `Platform input`,
6.  Specify **Port** to `12201`,
7.  Specify **Override source** to `eio-platform`,
8.  Click on **Save**.
9.  Next to the created input click on the **Start input**,
10.  Next to the created input click on the **Manage extractors**,
11.  Click **Actions -> Import extractors**,
12.  Copy-Paste the following JSON (Click to expand) and click on **Add extractors to input**.
<details close markdown="block">
<summary>
Click to expand
</summary>
{: .text-delta }
```json
{
   "extractors": [
     {
       "title": "Truncate message",
       "extractor_type": "regex_replace",
       "converters": [],
       "order": 0,
       "cursor_strategy": "copy",
       "source_field": "message",
       "target_field": "message",
       "extractor_config": {
         "replacement": "$1",
         "regex": "^(.{0,524288}).*$"
       },
       "condition_type": "none",
       "condition_value": ""
     },
     {
       "title": "JSON",
       "extractor_type": "json",
       "converters": [],
       "order": 1,
       "cursor_strategy": "copy",
       "source_field": "message",
       "target_field": "message",
       "extractor_config": {
         "flatten": false,
         "key_separator": ".",
         "list_separator": ", ",
         "kv_separator": "="
       },
       "condition_type": "string",
       "condition_value": "level"
     },
     {
       "title": "K8S Fluentd",
       "extractor_type": "json",
       "converters": [],
       "order": 2,
       "cursor_strategy": "copy",
       "source_field": "log",
       "target_field": "",
       "extractor_config": {
         "flatten": true,
         "list_separator": ", ",
         "kv_separator": "=",
         "key_prefix": "",
         "key_separator": "_",
         "replace_key_whitespace": false,
         "key_whitespace_replacement": "_"
       },
       "condition_type": "none",
       "condition_value": ""
     }
   ],
   "version": "2.4.7"
 }
```
</details>

### Flow step executions input

We use this input to collect all logs from the integration flow step and one-time
executions on the port `12202`. The following are the configurations in the GrayLog UI.

1.  Go to the **System / Inputs -> Inputs**,
2.  Select `GELF UDP` in the select box,
3.  Click on the **Launch new input**,
4.  Check the **Global** checkbox,
5.  Specify the **Title** to `Exec-input`,
6.  Specify the **Port** to `12202`,
7.  Specify the **Override source** to `eio-exec`,
8.  Click on **Save**.
9.  Next to the created input click on the **Start input**,
10.   Next to the created input click on the **Manage extractors**,
11.   Click on **Actions -> Import extractors**,
12.   Copy-Paste the following JSON (Click to expand) and click on the **Add extractors to input**.
<details close markdown="block">
<summary>
Click to expand
</summary>
{: .text-delta }
```json
{
  "extractors": [
    {
      "title": "Extract threadId",
      "extractor_type": "regex",
      "converters": [],
      "order": 0,
      "cursor_strategy": "copy",
      "source_field": "message",
      "target_field": "threadId",
      "extractor_config": {
        "regex_value": "\"threadId\" ?: ?\"([a-z0-9-]+)\""
      },
      "condition_type": "none",
      "condition_value": ""
    },
    {
      "title": "Extract level",
      "extractor_type": "regex",
      "converters": [
        {
          "type": "numeric",
          "config": {}
        }
      ],
      "order": 1,
      "cursor_strategy": "copy",
      "source_field": "message",
      "target_field": "level",
      "extractor_config": {
        "regex_value": "\"level\" ?: ?([0-9-]+)"
      },
      "condition_type": "none",
      "condition_value": ""
    },
    {
      "title": "Copy message to msg",
      "extractor_type": "copy_input",
      "converters": [],
      "order": 2,
      "cursor_strategy": "copy",
      "source_field": "message",
      "target_field": "msg",
      "extractor_config": {},
      "condition_type": "none",
      "condition_value": ""
    },
    {
      "title": "Try to parse JSON from message to msg",
      "extractor_type": "regex",
      "converters": [],
      "order": 3,
      "cursor_strategy": "copy",
      "source_field": "message",
      "target_field": "msg",
      "extractor_config": {
        "regex_value": "\"msg\" ?: ?\"(.*?)(?<!\\\\)\""
      },
      "condition_type": "none",
      "condition_value": ""
    }
  ],
  "version": "2.4.7"
}
```
</details>

## Index Set configuration

A GrayLog stream writes messages to an index set, which has configuration for
retention, sharding, and replication of the stored data. By configuring index sets,
you could, for example, have different retention times for certain streams.

### Index set for platform logs

This index set is used to configure rotation and retention policy for logs from
the platform services. Add index set following the instructions:

1.  Go to **System / Inputs -> Indices**,
2.  Click on the **Create index set** button,
3.  Specify the **Title** as `Platform index set`,
4.  Specify **Description** something like `Platform logs`,
5.  Specify **Index prefix** as `platform`,
6.  Choose the desired index rotation and retention policy,
7.  Click on **Save**.
8.  Apply custom mapping using the HTTP call to GrayLog host (click to expand):
<details close markdown="block">
<summary>
Click to expand
</summary>
{: .text-delta }
```sh
curl -X PUT -H 'Content-Type: application/json' 'http://{GRAYLOG_HOST}:9200/_template/platform-custom-mapping?pretty' -d '
{
    "template": "platform_*",
    "settings": {
        "index": {
            "analysis": {
                "analyzer": {
                    "analyzer_keyword": {
                        "filter": "lowercase",
                        "tokenizer": "keyword"
                    }
                }
            }
        }
    },
    "mappings": {
        "message": {
            "properties": {
                "msg": {
                    "type": "text",
                    "analyzer": "analyzer_keyword"
                }
            }
        }
    }
}
'
```
</details>

### Index set for flow executions

This index set is used to configure rotation and retention policy for logs from
the integration flow steps and one-time executions. Add index set following the instructions:

1.  Go to the **System / Inputs -> Indices**,
2.  Click on **Create index set** button,
3.  Specify the **Title** as `Exec index set`,
4.  Specify the **Description** as `Flow steps and one-time execs logs`,
5.  Specify **Index prefix** to `exec`,
6.  Choose desired index rotation and retention policy,
7.  Click on **Save**
8.  Apply custom mapping using the HTTP call to GrayLog host (click to expand):
<details close markdown="block">
<summary>
Click to expand
</summary>
{: .text-delta }
```sh
curl -X PUT -H 'Content-Type: application/json' 'http://{GRAYLOG_HOST}:9200/_template/exec-custom-mapping?pretty' -d '
{
    "order": 0,
    "index_patterns": [
        "exec_*"
    ],
    "mappings": {
        "properties": {
            "msg": {
                "analyzer": "simple",
                "type": "text"
            }
        }
    }
}
'
```
</details>

## Stream configuration

The Graylog streams are a mechanism to route messages into categories in realtime
while they are processed. You define rules that instruct Graylog which message to
route into which streams.

Every stream is assigned to an index set which controls how messages routed into
that stream are being stored into the [Elasticsearch](elasticsearch).

Two streams must be configured:

*   platform logs
*   flows steps & one-time exec logs

### Configuring stream for platform logs

This stream is used to route all platform logs to **Platform index set**.

1.  Go to **Streams**,
2.  Click on **Create Stream** button,
3.  Specify the **Title** to `Platform stream`,
4.  Specify the **Description** to `Platform logs`,
5.  Specify the **Index Set** to `Platform index set`,
6.  Check **Remove matches from ‘All messages’ stream**,
7.  Click on **Save**.
8.  In the right to the created stream click on **Manage rules**,
9.  Click on **Add stream rule**,
10.  Specify **Field** to `source`,
11.  Specify **Type** to `match exactly`,
12.  Specify **Value** to `eio-platform`,
13.  Click on **Save**
14.  Next to the created stream click on **Start Stream**,
15.  Check if messages are being collected.

### Configuring “exec” stream

This stream is used to route all flow steps & one-time execution logs to **Exec index set**.

1.  Go to the **Streams**,
2.  Click to **Create Stream** button,
3.  Specify the **Title** as `Exec stream`,
4.  Specify the **Description** to `Flow steps & one-time execs logs`,
5.  Specify the **Index Set** to `Exec index set`,
6.  Check **Remove matches from ‘All messages’ stream**
7.  Click to **Save**.
8.  In the right to the created stream click on **Manage rules**,
9.  Click **Add stream rule**,
10.  Specify **Field** to `source`,
11.  Specify **Type** to `match exactly`,
12.  Specify **Value** to `eio-exec`,
13.  Click to **Save**.
14.  Next to the created stream click on **Start Stream**,
15.  Check if messages are being collected.
