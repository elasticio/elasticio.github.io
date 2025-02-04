---
title: CSV component
layout: component
section: Protocol components
description: A component to read and write Comma Separated Values (CSV) files.
icon: csv.png
icontext: CSV component
category: csv
updatedDate: 2024-06-03
ComponentVersion: 3.3.0
---

## How works

The component can read the CSV file from a remote URL or from the message
attachment. It can also write a CSV file from the incoming events.

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about CSV component like [changelog](/components/csv/technical-notes#changelog).

## Requirements

### Environment variables

| Name|Mandatory|Description|Values|
|----|---------|-----------|------|
|EIO_REQUIRED_RAM_MB| false | Value of allocated memory to component | Recommended: `512`/`1024` |
|REQUEST_TIMEOUT| false |  HTTP request timeout in milliseconds | Default value: `10000` |
|REQUEST_RETRY_DELAY| false | Delay between retry attempts in milliseconds | Default value: `7000` |
|REQUEST_MAX_RETRY| false | Number of HTTP request retry attempts |  Default value: `7` |
|REQUEST_MAX_CONTENT_LENGTH| false | Max size of http request in bytes | Default value: `10485760` |
|TIMEOUT_BETWEEN_EVENTS| false | Number of milliseconds write action wait before creating separate attachments | Default value: `10000` |

> Please Note: From the platform version [20.51](/releases/20/51) we deprecated the
> component `LOG_LEVEL` environment variable. Now you can control logging level per each step of the flow.

### Credentials

The component does not require credentials to function.


## Triggers

  1. [Read CSV file from URL](/components/csv/actions#read-csv-file-from-url).
  This trigger read the CSV file from the URL provided in the configuration fields and output the result as a JSON object.


## Actions

  1. [Read CSV attachment](/components/csv/actions#read-csv-attachment)
  Read a CSV attachment of an incoming message.

  2. [Create CSV From Message Stream](/components/csv/actions#create-csv-from-message-stream)
  Multiple incoming events can be combined into one CSV file with the write CSV action.

  3. [Create CSV From JSON Array](/components/csv/actions#create-csv-from-json-array)
  Incoming array can be converted into one CSV file with the write CSV action.

## Limitations

  1. You may get `Component run out of memory and terminated.` error during run-time, that means that component needs more memory, please add  `EIO_REQUIRED_RAM_MB` environment variable with an appropriate value (e.g. value `1024` means that 1024 MB will be allocated) for the component in this case.
  2. You may get `Error: write after end` error, as a current workaround try increase value of environment variable: `TIMEOUT_BETWEEN_EVENTS`.
  3. The maximum possible size for an attachment is only limited by the available RAM memory of the component. In case of running into the limit the platform will give an error message, and if problem persists after a number of restarts the platform will suspend the complete integration flow.
  4. Attachments mechanism does not work with [Local Agent Installation](/guides/vpn-agent).
