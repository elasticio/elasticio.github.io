---
title: ZIP/UnZIP component
layout: component
section: Utility components
description: This component is designed to operate with zip files.
icon: zip-unzip.png
icontext: ZIP/UnZIP component
category: zip
updatedDate: 2022-12-02
ComponentVersion: 1.2.0
---

## Introduction

The Zip/UnZip component allows users to compress and decompress files in their data integration flows. This connector can be used to reduce the size of data files and improve data transfer performance, as well as to simplify the handling of compressed files.

### How it works

It allows users to make operations with ZIP file extensions. For this purpose, it has 2 actions [ZIP] and [UnZIP]. Please note some of the [limitations](#limitations) of this component.

## Environment variables

This component has non-mandatory environment variable:

* `ZIP_TTL` - it defaults to 60000 milliseconds(60sec), if other value is not defined.
Number of millisecond of time to live for zip files, unZip action downloads zip files into filesystem.ZIP action launch scheduler that will deleted files older than allowed ttl(time to live).

* `REQUEST_MAX_CONTENT_LENGTH` - default 1GB. Number of bytes, max content length for uploading attachments.

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### ZIP action

ZIP provided files. Iterate over body `files`, for each member if `path` match
configured `regex` download file from provided `url`, and append them to zip using
provided `path` as location and name of the file. Output contains attachment with
url to archive:

![ZIP action](img/zip.png)

### Configuration fields description

* `regex` - default match all `'[^]*'`. Regex for filename with extension, only files that matches regex will be add to ZIP.

* `httpTimeout` - default 60000 milliseconds(60 sec), number of milliseconds for http request timeouts

* `httpRetry` - default 3, number of retry for http request

* `zipName` - by default generate uuid name with `.zip` extension. Output zip filename with extension.

### Input and output schema description

Input schema

Contains array of items with properties:

* `url` - url to file, from where file can be downloaded

* `path` - path under which file will be stored inside zip, regex perform validation only over filename with extension part of path

Output schema:

Contains property size in body, and url to created archive in attachments.

### UnZIP action

Unzip provided zip file. Only files that match `regex` and with uncompressed size less than  `maxFileSize` will be unzipped:

![UnZIP action](img/unzip.png)

### Configuration fields description

* `regex` - default match all `'[^]*'`. Regex for filename with extension, only files that matches regex will be unzipped.

* `maxFileSize` - default 104857600 bytes(100mb), number of bytes. Maximum file size, files with uncompressed size bigger than provided value will not be unzipped

* `httpTimeout` - default 60000 milliseconds(60 sec), number of milliseconds for http request timeouts

* `httpRetry` - default 3, number of retry for http request

### Input and output schema description

Input schema:

Contains property `url` that provided url to zip, that will be downloaded and unzipped.

Output schema

Contains array of items with properties:

* `filename`- name of file with extension
* `size` - uncompressed file size

## Use Case

In this section, we will look at an example of how the Zip/UnZip component can be used. Many CRMs use ZIP file extensions to compress and export their data. Imagine an organization that wants to use a new CRM system. Different systems use different file extensions. Their old CRM system supports only CSV file extensions while the new one only XML. Integration flow must use ZIP/UnZIP component to UnZIP archive and convert CSV to XML file. Then this file could be archived into ZIP and imported to a new CRM. Let's start with what our flow should look like:

<details close markdown="block"><summary><strong>Flow view</strong></summary>

{% include img.html max-width="30%" url="img/flow-view.png" title="Flow view" %}

</details>

In the first step, we start with the [Webhook component](/components/webhook). It accepts the Zip archive, which we will further process with the Zip/UnZip component.

{% include img.html max-width="100%" url="img/webhook-config.png" title="Webhook Configuration" %}

In the second step, we will use a Zip/UnZip component function that gets the URL of the ZIP archive and perform the UnZIP action:

{% include img.html max-width="100%" url="img/zip-unzip-config.png" title="UnZIP action" %}

For a better understanding of the next steps, please take a look at the CSV table:

<details close markdown="block"><summary><strong>CSV Table</strong></summary>

{% include img.html max-width="100%" url="img/csv-table.png" title="CSV Table" %}

</details>

In the third step we use [CSV component](/components/csv) to read an archive:

{% include img.html max-width="100%" url="img/csv-config.png" title="CSV action" %}

The output of the CSV component in the JSON format will be sent to the next component:

<details close markdown="block"><summary><strong>CSV Sample output</strong></summary>

```json
{
  "result": [
    {
      "column0": "Identifier",
      "column1": "First name",
      "column2": "Last name"
    },
    {
      "column0": "901242",
      "column1": "Rachel",
      "column2": "Booker"
    },
    {
      "column0": "207074",
      "column1": "Laura",
      "column2": "Grey"
    },
    {
      "column0": "408129",
      "column1": "Craig",
      "column2": "Johnson"
    },
    {
      "column0": "934600",
      "column1": "Mary",
      "column2": "Jenkins"
    },
    {
      "column0": "507916",
      "column1": "Jamie",
      "column2": "Smith"
    }
  ]
}
```

</details>

In step 4, we use an [XML component](/components/xml) that converts the JSON output from the CSV component into an XML file.

{% include img.html max-width="100%" url="img/xml-config.png" title="XML Configuration" %}

The last step is the ZIP component again that archives the XML output file into a ZIP:

{% include img.html max-width="100%" url="img/zip-unzip-config-2.png" title="UnZip action" %}

Here you can see what the XML file we archived looks like:

<details close markdown="block"><summary><strong>XML output file</strong></summary>

```XML
<?xml version="1.0" encoding="UTF-8"?>
<table>
  <column0>Identifier</column0>
  <column1>First name</column1>
  <column2>Last name</column2>
  <column0>901242</column0>
  <column1>Rachel</column1>
  <column2>Booker</column2>
  <column0>207074</column0>
  <column1>Laura</column1>
  <column2>Grey</column2>
  <column0>408129</column0>
  <column1>Craig</column1>
  <column2>Johnson</column2>
  <column0>934600</column0>
  <column1>Mary</column1>
  <column2>Jenkins</column2>
  <column0>507916</column0>
  <column1>Jamie</column1>
  <column2>Smith</column2>
</table>
```

</details>

After all the above steps, this archive is completely ready for use in the new CRM.

{% include img.html max-width="100%" url="img/crm-zip.png" title="CRM.zip" %}

## Limitations

1. Attachments mechanism does not work with the [Local Agent Installation](/getting-started/local-agent).

2. UnZIP action does not support archived folders. It can only unzip archived files.
