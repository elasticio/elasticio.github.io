---
title: SFTP component
layout: component
section: Protocol components
description: A component for connecting to an SFTP server to read/write files.
icon: sftp.png
icontext: SFTP component
category: SFTP component
createdDate: 2015-11-20
updatedDate: 2019-12-05
---

Use this component to read or write files from a remote SFTP server. The component
uses standard [authentication](#authentication) and has several [trigger](#triggers)
and [action](#actions) functions.

## Authentication

To connect to an SFTP server you need to provide the following credentials to
authenticate:

*  **User Name** - Username for SFTP server
*  **Password** - Password for SFTP server
*  **Host** - Host name of SFTP server
*  Port - Optional, port of SFTP server. Defaults to 22 if not set.

Image below illustrates the credentials page on the platform UI.

![image](https://user-images.githubusercontent.com/35310862/65412296-3a818600-ddef-11e9-9064-8b9db7a650d5.png)

## Triggers

### Read files

The following configuration fields are available:
*   **Directory**: The directory of the files to read from.
*   **Pattern**: Optional regex pattern for file names. If no pattern is given, no matching is done.

After a file is found:

*   SFTP component moves it to the (hidden) directory `.elasticio_processed` to avoid duplicate downloading.
*   The component then pulls and uploads the file as [an attachment](/guides/using-attachments) and stores it temporary.
*   After the upload, you can use the READ-URL of the file to generate a message with content like below:

```json
{
  "id": "5e00ca80-f2a3-11e6-9fdd-e7b75b43e28b",
  "attachments": {
    "large.xml": {
      "url": "https://url-attachment/foo&Signature=5%2FsrvmbGGfVoYpKeMH3ugaEL"
    }
  },
  "body": {
    "filename": "large.xml",
    "size": 2508908
  }
}
```

The next component may read from `url` in `attachments` for a memory-efficient
way to read/parse data. Please note that if multiple files are found, SFTP component
will generate one message per file.

> **Note**: Please consider cleaning up the `.elasticio_processed` directory manually to prevent your SFTP server disk space from filling up.

### Get new and updated files

Trigger to get all new and updated files since last polling.

The following configuration fields are available:

*   **Directory**: The directory of the files to read from.
*   **Emit Behaviour**: Options are: default is `Emit Individually` emits each object in separate message, `Fetch All` emits all objects in one message
*   **Start Time**: Start date-time of polling. Default min date:`-271821-04-20T00:00:00.000Z`
*   **End Time**: End date-time of polling. Default max date: `+275760-09-13T00:00:00.000Z`

You can expect the output metadata to include:

*   File Type in `string`
*   File Name in `string`
*   File Size in `number`
*   File modification time in `number`
*   File access time in `number`
*   File directory name in `string`
*   File path in `string`
*   File size in `number`

## Actions

### Upload files

The only configuration field is the **Directory**, which is the directory where
the file will be uploaded to.

> **Note**: if the directory does not exist, it will create it at the risk of possibly overwriting any files that may have the same name.

This action expects only the **Filename** as an input metadata.

**Remarks:**

*   Uploaded file name will be the same as the incoming filename unless the new `Filename` isn't provided.
*   `Filename` will be added at the begging of attachment name if the incoming message contains multiple attachments: `[SpecifiedFilename]_[NameOfExistedFile]`
*   File will be overwritten in case when a file with the same name already exists in the directory.



### Delete file

Action to delete file on the remote SFTP server directory. It expects the
full file path in `string` format.

### Lookup file by name

Finds a file by name in the provided directory and uploads (streams) to the attachment
storage. After the files is uploaded the platform returns a READ-URL to read
the file in the next steps of integration flow. The next component may read from
the provided `url` in `attachments` for a memory-efficient way to read/parse data.

The only input field is the **Path and File Name** in `string`.

You can use the following configuration fields to control the outcome message:

*   **Allow Empty Result** - The default is `No`.
  *   If left on `No` then an error will be thrown when no objects were found,
  *   If selected `Yes` then an empty object will be returned instead of throwing an error.
*   **Allow ID to be Omitted** - The fault is `No`.
  *   If left on `No` then an error will be thrown when object ID is missing in metadata,
  *   If selected `Yes` then an empty object will be returned instead of throwing an error.

In case when the files is found the component will return the following metadata:

*   File Type in `string`
*   File Name in `string`
*   File Size in `number`
*   File modification time in `number`
*   File access time in `number`
*   File directory name in `string`
*   File path in `string`
*   File size in `number`

## Known limitations

*   The maximum file size accepted by the SFTP component is limited to 100 MB.
*   The attachments mechanism does not work with Local Agent Installation.
*   `Get new and updated files` trigger mechanism is based on SFTP file `modifyTime` metadata field. For correct processing the trigger requires correct time configuration on the SFTP server.
*   `Get new and updated files` trigger does not support empty files processing.
*   `Get new and updated files` trigger does not support `fetch page` Emit Behaviour.

## Related links

The SFTP component uses [ssh2-sftp-client](https://www.npmjs.com/package/ssh2-sftp-client).
