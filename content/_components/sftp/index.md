---
title: SFTP component
layout: component
section: Protocol components
description: A component for connecting to an SFTP server to read and upload files.
icon: sftp.png
icontext: SFTP component
category: sftp
updatedDate: 2025-07-08
ComponentVersion: 2.0.0
---

## Table of Contents
* [Description](#description)
* [Environment variables](#environment-variables)
* [Credentials](#credentials)
* [Triggers](#triggers)
* [Actions](#actions)


## Description

This component creates a connection to an SFTP server to read and upload files.

## Environment Variables

| Name                          | Mandatory | Description                                                                                  | Values                   |
|-------------------------------|-----------|----------------------------------------------------------------------------------------------|--------------------------|
| `MAX_FILE_SIZE`               | false     | Maximum file size allowed for upload, specified in **megabytes (MB)** (default: 100 MB)     | Any `integer` greater than 0 |
| `MAX_MESSAGE_SIZE`            | false     | Maximum file size that can be emitted as a base64 string, specified in **megabytes (MB)** (default: 10 MB) | Any `integer` greater than 0 |
| `OPERATION_RETRY_MAX_ATTEMPTS` | false     | Number of retry attempts for an operation in case of failure (default: 5)                    | Any `integer` greater than 0 |
| `OPERATION_RETRY_BASE_DELAY`  | false     | Initial delay between retry attempts, specified in **milliseconds** (default: 500 ms). Each subsequent retry uses exponential backoff. | Any `integer` greater than 0 |
| `OPERATION_TIMEOUT`           | false     | Time to wait for a response from the SFTP server before throwing an error or retrying, specified in **milliseconds** (default: 10000 ms) | Any `integer` greater than 0 |
| `CONNECTION_RETRY_MAX_ATTEMPTS` | false     | Number of retry attempts for connection failures (default: 5)                               | Any `integer` greater than 0 |
| `CONNECTION_RETRY_BASE_DELAY` | false     | Initial delay between connection retry attempts, specified in **milliseconds** (default: 500 ms). Each subsequent retry uses exponential backoff. | Any `integer` greater than 0 |
| `AUTO_DISCONNECT_TIMEOUT_MS`  | false     | Time before the client automatically disconnects from the SFTP server, specified in **milliseconds** (default: 15000 ms) | Any `integer` greater than 0 |

## Credentials
* **Host** - (string, required): Host name of SFTP server
* **Port** - (number, optional, defaults to 22): Port of SFTP server
* **User Name** - (string, required): Username for SFTP server
* **Password** - (string, optional): Password for SFTP server. Must stay empty in case you fill a private key field 
* **Private Key** - (string, optional): To access a secure SFTP servers that is configured with a key-based authentication you must at first upload your `Public key` to the SFTP server (please contact your server administrator to do this) and fill in this field with your `Private key.
  Must stay empty in case you fill a password key field. 
  The component has been tested with the following keys:
  * rsa (Minimum allowed key length - 2048 bits, minimum recommended - 3072 bits)
  * rsa-sha2-256
  * rsa-sha2-512
  * ed25519
  * ecdsa
* **Passphrase** - (string, optional): If Private Key was created using passphrase, put it here


## Triggers

SFTP component includes the following triggers:

1.  [Poll files](triggers#poll-files) - Triggers to get all new and updated files since last polling.

## Actions

SFTP component includes the following actions:

1.  [Delete file](actions#delete-file) - Action to delete file by provided full file path.
2.  [Download File by name](actions#download-file-by-name) - Finds a file by name in the provided directory and uploads (streams) to the attachment storage.
3.  [Download Files](actions#download-files) - Finds a file by criteria in the provided directory and uploads (streams) to the attachment storage.
4.  [Move file](actions#move-file) - Action to move file on SFTP already exists in one location on an sftp server to be moved to another location on the same SFTP server.
5.  [Upload File From URL](actions#upload-file-from-url) - Given a filename and a URL to an attachment, transfers the contents of the attachment to the SFTP server.
6.  [Upload Files From Attachments Header](actions#upload-files-from-attachments-header) - Upload all files from the attachments header to a defined SFTP directory.

## Known limitations

* The attachments mechanism does not work with [Local Agent Installation](/guides/vpn-agent).

## Related links

*   The SFTP component uses [ssh2-sftp-client](https://www.npmjs.com/package/ssh2-sftp-client).
*   Explanation of [Unix file types](https://en.wikipedia.org/wiki/Unix_file_types).
