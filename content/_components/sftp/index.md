---
title: SFTP component
layout: component
section: Protocol components
description: A component for connecting to an SFTP server to read/write files.
icon: sftp.png
icontext: SFTP component
category: sftp
updatedDate: 2024-03-01
ComponentVersion: 1.7.0
---

## General Information

This component creates a connection to an external SFTP server so you can work
with the files. You can use this component to read, write, move or delete the
files on your SFTP server. The component has trigger and action functions covering
each use case.

If you are interested in the past changes that the component has undergone check
the [changelog](technical-notes#changelog).


## Environment variables

The SFTP component works with different files sizes and different SFTP servers. To
have more control over the process you can apply environment variables to further
suit your scenarios.

|Name|Mandatory|Description|Values|
|----|---------|-----------|------|
|`MAX_FILE_SIZE`| false |  Maximum file size that can be uploaded in **megabytes (mb)** (100MB by default) | any `integer` above 0|

## Credentials

To authenticate with an external SFTP server you must fill-in the necessary values
in the credentials section.

* **Host** - (string, required): Host name of SFTP server
* **Port** - (number, optional, defaults to 22): Port of SFTP server
* **User Name** - (string, required): Username for SFTP server
* **Password** - (string, optional): Password for SFTP server
>**Plese Note:**  field `Password` should be empty in case you fill a `Private Key`

* **Private Key** - (string, optional): To access a secure SFTP servers that is configured with a key-based authentication you must at first upload your `Public key` to the SFTP server (please contact your server administrator to do this) and fill in this field with your `Private key`
* **Passphrase** - (string, optional): If Private Key was created using passphrase, put it here
>**Plese Note:**  field `Private Key` should stay empty in case you fill a password


## Triggers

SFTP component includes the following triggers:

1.  [Poll files](triggers#poll-files) - Triggers to get all new and updated files since last polling.
2.  [Read files(deprecated)](triggers#read-filesdeprecated) - Will continuously poll remote SFTP location for files that match given pattern. Found files will be transferred as attachments to the next component.

## Actions

SFTP component includes the following actions:

1.  [Delete file](actions#delete-file) - Action to delete file by provided full file path.
2.  [Download File by name](actions#download-file-by-name) - Finds a file by name in the provided directory and uploads (streams) to the attachment storage.
3.  [Download Files](actions#download-files) - Finds a file by criteria in the provided directory and uploads (streams) to the attachment storage
4.  [Move file](actions#move-file) - Action to move file on SFTP already exists in one location on an sftp server to be moved to another location on the same SFTP server.
5.  [Upload File From URL](actions#upload-file-from-url) - Given a filename and a URL to an attachment, transfers the contents of the attachment to the SFTP server.
6.  [Upload Files From Attachments Header](actions#upload-files-from-attachments-header) - Upload all files from the attachments header to a defined SFTP directory

## Known limitations

* The attachments mechanism does not work with [Local Agent Installation](/guides/vpn-agent)

## Related links

*   The SFTP component uses [ssh2-sftp-client](https://www.npmjs.com/package/ssh2-sftp-client).
*   Explanation of [Unix file types](https://en.wikipedia.org/wiki/Unix_file_types)
