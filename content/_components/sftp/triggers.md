---
title: SFTP triggers
layout: component
description: SFTP component triggers.
icon: sftp.png
icontext: SFTP component
category: sftp
updatedDate: 2021-02-12
ComponentVersion: 1.4.4
---

## Read files

Will continuously poll remote SFTP location for files that match given pattern. Found files will be transferred as attachments to the next component.

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
      "url": "https://adress/foo&Signature=5%2FsrvmbGGfVoYpKeMH3ugaEL"
    }
  },
  "body": {
    "filename": "large.xml",
    "size": 2508908
  }
}
```

The next component may read from `url` in `attachments` for a memory-efficient way to read/parse data. Please note that if multiple files are found, SFTP component will generate one message per file.

>**Note:** you may need to consider cleaning up the `.elasticio_processed` directory manually

## Poll files

Triggers to get all new and updated files since last polling.

The following configuration fields are available:

* **Directory**: The directory of the files to read from.
* **Emit Behaviour**: Options are: default is `Emit Individually` emits each object in separate message, `Fetch All` emits all objects in one message
* **Start Time**: Start datetime of polling. Default min date:`-271821-04-20T00:00:00.000Z`
* **End Time**: End datetime of polling. Default max date: `+275760-09-13T00:00:00.000Z`

### Expected output metadata

<details close markdown="block">
<summary>
Click to expand - Output metadata
</summary>

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

</details>

>**Note:** `type` field represents type of the file. You can find additional information about Unix file types [below](#ssh2-sftp-client-api-and-documentation-links).
