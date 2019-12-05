---
title: sftp
layout: article
section: PLACEHOLDER
---
---

# SFTP Component [![CircleCI](https://circleci.com/gh/elasticio/sftp-component.svg?style=svg)](https://circleci.com/gh/elasticio/sftp-component)

## Table of Contents
* [General information](#general-information)
   * [Description and Purpose](#description-and-purpose)
* [Credentials](#credentials)
     * [User Name](#user-name)
     * [Password](#password)
     * [Host](#host)
     * [Port](#port)
* [Triggers](#triggers)
   * [Read files](#read-files)
   * [Get new and updated files](#get-new-and-updated-files)
* [Actions](#actions)
   * [Upload files](#upload-files)
   * [Delete file](#delete-file)
   * [Lookup file by name](#lookup-file-by-name)
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

### Read files

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

### Get new and updated files
Triggers to get all new and updated files since last polling.

The following configuration fields are available:
* **Directory**: The directory of the files to read from.
* **Emit Behaviour**: Options are: default is `Emit Individually` emits each object in separate message, `Fetch All` emits all objects in one message
* **Start Time**: Start datetime of polling. Default min date:`-271821-04-20T00:00:00.000Z`
* **End Time**: End datetime of polling. Default max date: `+275760-09-13T00:00:00.000Z`


#### Expected output metadata
```json
{
  "type": "object",
  "properties": {
    "filename": {
      "title": "File Name",
      "type": "string",
      "required": true
    },
    "size": {
      "title": "File Size",
      "type": "number",
      "required": true
    },
    "type": {
      "title": "File Type",
      "type": "string",
      "required": true
    },
    "modifyTime": {
      "title": "Last Modification Time",
      "type": "number",
      "required": true
    },
    "accessTime": {
      "title": "Last Access Time",
      "type": "number",
      "required": true
    },
    "directory": {
      "title": "Directory",
      "type": "string",
      "required": true
    },
    "path": {
      "title": "Full Path",
      "type": "string",
      "required": true
    }
  }
}

```

## Actions

### Upload files

The following configuration fields are available:
- **Directory**: The directory where the file will be uploaded to.

* Note: if the directory does not exist, it will create it at the risk of possibly overwriting any files that may have the same name.

Input metadata:

- **Filename**: Custom name for uploaded file.

Notes:
* Uploaded file name will get filename of income file if new `Filename` doesn't provided 
* `Filename` will be added at the beggining of attachment name if income message contains multiple attachments: `[SpecifiedFilename]_[NameOfExistedFile]`
* File will be overwrited in case when file with specified name already exists in directory

### Delete file
Action to delete file by provided full file path.

#### Expected input metadata
```json
{
  "type": "object",
  "properties": {
    "path": {
      "title": "Full Path",
      "type": "string",
      "required": true
    }
  }
}
```

#### Expected output metadata
```json
{
  "type": "object",
  "properties": {
    "id": {
      "title": "Full Path",
      "type": "string",
      "required": true
    }
  }
}

```

### Lookup file by name
Finds a file by name in the provided directory and uploads (streams) to the attachment storage (a.k.a. steward).
After the upload, the READ-URL of the file will be used to generate a message with content like below:

```json
{
  "id": "0c196dca-4187-4b49-bf90-5cfe9030955b",
  "attachments": {
    "1.txt": {
      "url": "http://steward-service.platform.svc.cluster.local:8200/files/99999-6613-410a-9da8-c5f6d529b683",
      "size": 7
    }
  },
  "body": {
    "type": "-",
    "name": "1.txt",
    "size": 7,
    "modifyTime": "2019-12-02T13:05:42.000Z",
    "accessTime": "2019-12-04T14:14:54.000Z",
    "rights": {
      "user": "rw",
      "group": "r",
      "other": "r"
    },
    "owner": 1002,
    "group": 1002,
    "attachment_url": "http://steward-service.platform.svc.cluster.local:8200/files/99999-6613-410a-9da8-c5f6d529b683",
    "directory": "/www/olhav",
    "path": "/www/olhav/1.txt"
  }
}
```

The next component may read from `url` in `attachments` for a memory-efficient way to read/parse data. 

#### List of Expected Config fields
##### Allow Empty Result
Default `No`. In case `No` is selected - an error will be thrown when no objects were found,
If `Yes` is selected -  an empty object will be returned instead of throwing an error.

##### Allow ID to be Omitted
Default `No`. In case `No` is selected - an error will be thrown when object id is missing in metadata, if `Yes` is selected - an empty object will be returned instead of throwing an error.

#### Expected input metadata
```json
{
  "type": "object",
  "properties": {
    "path": {
      "title": "Path and File Name",
      "type": "string"
    }
  }
}
```

#### Expected output metadata

<details> 
<summary>Output metadata</summary>

```json

{
  "type": "object",
  "properties": {
    "type": {
      "title": "Type",
      "type": "string",
      "required": true
    },
    "name": {
      "title": "File Name",
      "type": "string",
      "required": true
    },
    "size": {
      "title": "File Size",
      "type": "number",
      "required": true
    },
    "modifyTime": {
      "title": "modifyTime",
      "type": "string",
      "required": true
    },
    "accessTime": {
      "title": "accessTime",
      "type": "string",
      "required": true
    },
    "directory": {
      "title": "directory",
      "type": "string",
      "required": true
    },
    "path": {
      "title": "path",
      "type": "string",
      "required": true
    },
    "attachment_url": {
      "title": "File Size",
      "type": "number",
      "required": true
    }
  }
}

```
</details>

## Known limitations

* The maximum file size accepted by the SFTP component is limited to 100 MB.
* The attachments mechanism does not work with [Local Agent Installation](https://support.elastic.io/support/solutions/articles/14000076461-announcing-the-local-agent-)
* `Get new and updated files` trigger mechanism is based on SFTP file `modifyTime` metadata field. For correct processing the trigger requires correct time configuration on the SFTP server.
* `Get new and updated files` trigger does not support empty files processing.
* `Get new and updated files` trigger does not support `fetch page` Emit Behaviour

## SSH2 SFTP Client API and Documentation links

The SFTP component uses [ssh2-sftp-client](https://www.npmjs.com/package/ssh2-sftp-client).
