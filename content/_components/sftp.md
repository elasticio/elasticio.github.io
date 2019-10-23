---
title: SFTP component
layout: article
section: Protocol components
---
---

# SFTP Component 

## Table of Contents
* [General information](#general-information)
   * [Description and Purpose](#description-and-purpose)
* [Credentials](#credentials)
     * [User Name](#user-name)
     * [Password](#password)
     * [Host](#host)
     * [Port](#port)
* [Triggers](#triggers)
   * [Read](#read)
* [Actions](#actions)
   * [Upload](#upload)
* [Known limitations](#known-limitations)
* [SSH2 SFTP Client API and Documentation links](#ssh2-sftp-client-api-and-documentation-links)

## General Information

### Description and Purpose

This component creates a connection to an SFTP server to read and upload files.

## Credentials
### User Name
Username for SFTP server
### Password
Password for SFTP server
### Host
Host name of SFTP server
### Port
Optional, port of SFTP server. Defaults to 22 if not set.

![image](https://user-images.githubusercontent.com/35310862/65412296-3a818600-ddef-11e9-9064-8b9db7a650d5.png)

## Triggers

### Read

The following configuration fields are available:
* **Directory**: The directory of the files to read from.
* **Pattern**: Optional regex pattern for file names. If no pattern is given, no matching is done.

After a file is found:
 * It is moved to the (hidden) directory `.elasticio_processed`
 * It is pulled and uploaded (streamed) to the attachment storage (a.k.a. steward)
 * After the upload, the READ-URL of the file will be used to generate a message with content like below:

```json
{
  "id": "5e00ca80-f2a3-11e6-9fdd-e7b75b43e28b",
  "attachments": {
    "large.xml": {
      "url": "https://steward.eio.cloud/foo&Signature=5%2FsrvmbGGfVoYpKeMH3ugaEL"
    }
  },
  "body": {
    "filename": "large.xml",
    "size": 2508908
  }
}
```

The next component may read from `url` in `attachments` for a memory-efficient way to read/parse data. Please note that if multiple files are found, SFTP component will generate one message per file.

* Note: you may need to consider cleaning up the `.elasticio_processed` directory manually

## Actions

### Upload

The following configuration fields are available:
|* **Directory**: The directory where the file will be uploaded to.

* Note: if the directory does not exist, it will create it at the risk of possibly overwriting any files that may have the same name.

## Known limitations

* The maximum file size accepted by the SFTP component is limited to 100 MiB (Mebibytes)
* The attachments mechanism does not work with [Local Agent Installation](https://support.elastic.io/support/solutions/articles/14000076461-announcing-the-local-agent-)

## SSH2 SFTP Client API and Documentation links

The SFTP component uses [ssh2-sftp-client](https://www.npmjs.com/package/ssh2-sftp-client).
