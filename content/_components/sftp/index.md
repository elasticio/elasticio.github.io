---
title: SFTP component
layout: component
section: Protocol components
description: A component for connecting to an SFTP server to read/write files.
icon: sftp.png
icontext: SFTP component
category: sftp
updatedDate: 2022-04-12
ComponentVersion: 1.4.7
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

*   `MAX_FILE_SIZE` (bytes) - Use this variable to control or extend the allowed upload file size. The system caps the files bigger than 100MB by default (104857600).
*   `REQUEST_TIMEOUT` (milliseconds) - Use this variable to control the platform behavior when the connection between the platform and the external SFTP server must be dropped in case of inactivity. The default value is 10 seconds (10000).

**These variables are optional and if not set the default system value is used instead.**

## Credentials

To authenticate with an external SFTP server you must fill-in the necessary values
in the credentials section.

*  **Host** - Host name of the SFTP server.
*  **Port** - Optional, port of SFTP server. Defaults to 22 if not set.
*  **User Name** - Username for SFTP server.
*  **Password** - Password for SFTP server.
*  **Private Key** - An RSA private key. Set empty if password is already in use.


### Private Key

To access a secure SFTP servers that is configured with a key-based authentication
you must at first upload your `Public key` to the SFTP server (please contact your
server administrator to do this) and fill in this field with your `Private key`.

Also please pay attention that the field `Password` should be empty in this case.

![My new SFTP credential](img/sftp-credentials.png)

## Triggers

SFTP component includes the following triggers:

1.  [Read files](triggers#read-files) - Will continuously poll remote SFTP location for files that match given pattern. Found files will be transferred as attachments to the next component.
2.  [Poll files](triggers#poll-files) - Triggers to get all new and updated files since last polling.

## Actions

SFTP component includes the following actions:

1.  [Upload files From Attachments Header](actions#upload-files-from-attachments-header) - Upload all files from the attachments header to a defined SFTP directory.
2.  [Upload File From URL](actions#upload-file-from-url) - Given a filename and a URL to an attachment stored in the platform, transfers the contents of the attachment to the SFTP server. The component returns a summary of the written file.
3.  [Delete file](actions#delete-file) - Action to delete file by provided full file path.
4.  [Download file by name](actions#download-file-by-name) - Finds a file by name in the provided directory and uploads (streams) to the attachment storage (a.k.a. steward).
5.  [Download files](actions#download-files) - Finds a file by criteria in the provided directory and uploads (streams) to the attachment storage (a.k.a. steward).
6.  [Move File](actions#move-file) - Action to move file on SFTP already exists in one location on an sftp server to be moved to another location on the same SFTP server. Target location MUST exist.

## Known limitations

* The attachments mechanism does not work with [Local Agent Installation](/getting-started/local-agent)
* `Get new and updated files` trigger mechanism is based on SFTP file `modifyTime` metadata field. For correct processing the trigger requires correct time configuration on the SFTP server.
* `Get new and updated files` trigger does not support empty files processing.
* `Get new and updated files` trigger does not support `fetch page` Emit Behaviour

## Related links

*   The SFTP component uses [ssh2-sftp-client](https://www.npmjs.com/package/ssh2-sftp-client).
*   Explanation of [Unix file types](https://en.wikipedia.org/wiki/Unix_file_types)
