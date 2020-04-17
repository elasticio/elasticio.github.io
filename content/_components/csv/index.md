---
title: CSV component
layout: component
section: Protocol components
description: A simple file format used to store tabular data, for example from a spreadsheet or a database.
icon: csv.png
icontext: CSV component
category: CSV component
createdDate: 2015-11-15
updatedDate: 2020-05-07
---

## Latest changelog

**2.1.0 (May 7, 2020)**

* Add "Write CSV attachment from Array" action
* Add "Write CSV attachment from JSON" action
* Update sailor version to 2.6.5

> To see the full **changelog** please use the following [link](/components/csv/changelog).

## How works

The component can read the CSV file from a remote URL or from the message
attachment. It can also write a CSV file from the incoming events.

## Requirements

### Environment variables

|Name|Mandatory|Description|Values|
|----|---------|-----------|------|
|EIO_REQUIRED_RAM_MB| false | Value of allocated memory to component | Recommended: 512 |
|REQUEST_TIMEOUT| false |  HTTP request timeout in milliseconds | Default value: 10000 |
|REQUEST_RETRY_DELAY| false | Delay between retry attempts in milliseconds | Default value: 7000 |
|REQUEST_MAX_RETRY| false | Number of HTTP request retry attempts |  Default value: 7 |
|REQUEST_MAX_CONTENT_LENGTH| false | Max size of http request in bytes | Default value: 10485760 |
|TIMEOUT_BETWEEN_EVENTS| false | Number of milliseconds write action wait before creating separate attachments | Default value: 10000 |
|LOG_LEVEL| false | Level of logger verbosity | trace, debug, info, warning, error Default: info |


### Credentials

The component does not require credentials to function.


## Triggers

### Read CSV file from URL

This trigger will fetch the CSV file from a given URL. The address must be accessible
to the component. The fetched CSV file will be placed in the attachment part of the
outgoing message.

![Read CVS file from URL](img/read-CVS-file-from-URL.png)

*   `CSV URL` - the full URL to the file for retrieving data.
*   `Emit all messages` - this checkbox configures output behavior of the component. If the option is checked - the component emits an array of messages, otherwise - the component emits a message per row.
*   `CSV Header` - this is a required field. Input the names of headers separated with a comma.
*   `Separators` - Specify the separator type. Usually it is a comma (`,`) but values like Semicolon (`;`), Space (` `), Tab (`\t`) and Hash (`#`) are also supported.
*   `Skip rows` - if you know that the incoming CSV file has certain number of headers you can indicate to skip them. The supported values are `None`, `First row`, `First two`, `First three` and `First four`.
*   `Data columns` - here the values will be added dynamically based on the values in the `CSV Header` field. Here each data column will be listed with the name, Data Type and the Format to enable further configuration.

## Actions

### Read CSV attachment

This action will read the CSV attachment of the incoming message and output
a `JSON` object. To configure this action the following fields can be used:

![Read CVS attachments](img/read-CSV-attachment.png)

*   `Emit all messages` - this checkbox configures output behavior of the component. If the option is checked - the component emits an array of messages, otherwise - the component emits a message per row.
*   `CSV Header` - this is a required field. Input the names of headers separated with a comma.
*   `Separators` - Specify the separator type. Usually it is a comma (`,`) but values like Semicolon (`;`), Space (` `), Tab (`\t`) and Hash (`#`) are also supported.
*   `Skip rows` - if you know that the incoming CSV file has certain number of headers you can indicate to skip them. The supported values are `None`, `First row`, `First two`, `First three` and `First four`.
*   `Data columns` - here the values will be added dynamically based on the values in the `CSV Header` field. Here each data column will be listed with the name, Data Type and the Format to enable further configuration.


### Write CSV attachment

* `Include Header` - this select configures output behavior of the component. If option is `Yes` or no value chosen than header of csv file will be written to attachment, this is default behavior. If value `No` selected than csv header will be omitted from attachment.

This action will combine multiple incoming events into a CSV file until there is a gap
of more than 10 seconds between events. Afterwards, the CSV file will be closed
and attached to the outgoing message.

As part of the component setup, one must specify the columns of the CSV file.
These columns will be published as the header in the first row. For each incoming
event, the value for each header will be `stringified` and written as the value
for that cell. All other properties will be ignored. For example, headers
`foo,bar` along with the following JSON events:

```
{"foo":"myfoo", "bar":"mybar"}
{"foo":"myfoo", "bar":[1,2]}
{"bar":"mybar", "baz":"mybaz"}
```

will produce the following `.csv` file:

```
foo,bar
myfoo,mybar
myfoo,"[1,2]"
,mybar
```

When columns are added in the UI, you will be presented with an opportunity to
provide a JSONata expression per column. If you require number formatting that
is specific to a locale, the JSONata expression should handle that concern.

![Configure Input](img/configure-input.png)

The output of the CSV Write component will be a message with an attachment.  In
order to access this attachment, the component following the CSV Write must be
able to handle file attachments.

### Write CSV attachment from JSON Object

* `Include Header` - this select configures output behavior of the component. If option is `Yes` or no value chosen than header of csv file will be written to attachment, this is default behavior. If value `No` selected than csv header will be omitted from attachment.
* `Separator` - this select configures type of CSV delimiter in an output file. There are next options: `Comma (,)`, `Semicolon (;)`, `Space ( )`, `Tab (\t)`.

This action will combine multiple incoming events into a CSV file until there is a gap
of more than 10 seconds between events. Afterwards, the CSV file will be closed
and attached to the outgoing message.

This action will convert an incoming array into a CSV file by following approach:

* Header inherits names of keys from the input message;
* Payload will store data from Values of relevant Keys (Columns);
* Undefined values of a JSON Object won't be joined to result set (`{ key: undefined }`);
* False values of a JSON Object will be represented as empty string (`{ key: false }` => `""`).

#### Requirements:

* The inbound message is an JSON Object;
* This JSON object has plain structure without nested levels (structured types `objects` and `arrays` are not supported as values). Only primitive types are supported: `strings`, `numbers`, `booleans` and `null`. Otherwise, the error message will be thrown: `Inbound message should be a plain Object. At least one of entries is not a primitive type`.

The keys of an input JSON will be published as the header in the first row. For each incoming
event, the value for each header will be `stringified` and written as the value
for that cell. All other properties will be ignored. For example, headers
`foo,bar` along with the following JSON events:

```
{"foo":"myfoo", "bar":"mybar"}
{"foo":"myfoo", "bar":[1,2]}
{"bar":"mybar", "baz":"mybaz"}
```

will produce the following `.csv` file:

```
foo,bar
myfoo,mybar
myfoo,"[1,2]"
,mybar
```

The output of the CSV Write component will be a message with an attachment.  In
order to access this attachment, the component following the CSV Write must be
able to handle file attachments.

### Write CSV attachment from JSON Array

* `Include Header` - this select configures output behavior of the component. If option is `Yes` or no value chosen than header of csv file will be written to attachment, this is default behavior. If value `No` selected than csv header will be omitted from attachment.
* `Separator` - this select configures type of CSV delimiter in an output file. There are next options: `Comma (,)`, `Semicolon (;)`, `Space ( )`, `Tab (\t)`.

This action will convert an incoming array into a CSV file by following approach:

* Header inherits names of keys from the input message;
* Payload will store data from Values of relevant Keys (Columns);
* Undefined values of a JSON Object won't be joined to result set (`{ key: undefined }`);
* False values of a JSON Object will be represented as empty string (`{ key: false }` => `""`).

#### wRequirements:

* The inbound message is an JSON Array of Objects with identical structure;
* Each JSON object has plain structure without nested levels (structured types `objects` and `arrays` are not supported as values). Only primitive types are supported: `strings`, `numbers`, `booleans` and `null`. Otherwise, the error message will be thrown: `Inbound message should be a plain Object. At least one of entries is not a primitive type`.

The keys of an input JSON will be published as the header in the first row. For each incoming
event, the value for each header will be `stringified` and written as the value
for that cell. All other properties will be ignored. For example, headers
`foo,bar` along with the following JSON events:

```
[
    {"foo":"myfoo", "bar":"mybar"}
    {"foo":"myfoo", "bar":[1,2]}
    {"bar":"mybar", "baz":"mybaz"}
]
```

will produce the following `.csv` file:

```
foo,bar
myfoo,mybar
myfoo2,[1,2]"
,mybar
```

The output of the CSV Write component will be a message with an attachment.  In
order to access this attachment, the component following the CSV Write must be
able to handle file attachments.

## Limitations

  1. You may get `Component run out of memory and terminated.` error during run-time, that means that component needs more memory, please add `EIO_REQUIRED_RAM_MB` environment variable with an appropriate value (e.g. value `512` means that 512 MB will be allocated) for the component in this case.
  2. You may get `Error: write after end` error, as a current workaround try increase value of environment variable: `TIMEOUT_BETWEEN_EVENTS`.
  3. Maximal possible size for an attachment is 10 MB.
  4. Attachments mechanism does not work with [Local Agent Installation](/getting-started/local-agent).
