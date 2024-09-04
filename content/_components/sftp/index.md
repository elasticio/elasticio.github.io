---
title: SFTP component
layout: component
section: Protocol components
description: A component for connecting to an SFTP server to read/write files.
icon: sftp.png
icontext: SFTP component
category: sftp
updatedDate: 2024-09-05
ComponentVersion: 1.7.3
---

## Table of Contents

* [Description](#description)
* [Environment variables](#environment-variables)
* [Credentials](#credentials)
* [Triggers](#triggers)
   * [Poll Files](#poll-files)
   * [Deprecated triggers](#deprecated-triggers)
* [Actions](#actions)
   * [Delete File](#delete-file)
   * [Download File by name](#download-file-by-name)
   * [Download Files](#download-files)
   * [Move File](#move-file)
   * [Upload File From URL](#upload-file-from-url)
   * [Upload Files From Attachments Header](#upload-files-from-attachments-header)

## Description
This component creates a connection to an SFTP server to read and upload files.

## Environment variables

Name|Mandatory|Description|Values|
|----|---------|-----------|------|
|`MAX_FILE_SIZE`| false |  Maximum file size that can be uploaded in **megabytes (mb)** (100MB by default) | any `integer` above 0|

## Credentials

* **Host** - (string, required): Host name of SFTP server
* **Port** - (number, optional, defaults to 22): Port of SFTP server
* **User Name** - (string, required): Username for SFTP server
* **Password** - (string, optional): Password for SFTP server. Must stay empty in case you fill a private key field
* **Private Key** - (string, optional): To access a secure SFTP servers that is configured with a key-based authentication you must at first upload your `Public key` to the SFTP server (please contact your server administrator to do this) and fill in this field with your `Private key`.
  Must stay empty in case you fill a password key field.
  The component has been tested with the following keys:
  * rsa (Minimum allowed key length - 2048 bits, minimum recommended - 3072 bits)
  * rsa-sha2-256
  * rsa-sha2-512
  * ed25519
  * ecdsa

* **Passphrase** - (string, optional): If Private Key was created using passphrase, put it here

## Triggers

### Poll Files
Triggers to get all new and updated files since last polling.

#### Configuration Fields
* **Directory** - (string, required): The directory of the files to read from
* **Emit Behaviour** - (dropdown, optional): Defines the way result objects will be emitted, defaults to `Emit individually`
    * **Fetch All** - All objects will be emitted as array in one object with key `results`
    * **Emit Individually** - Each object will be emitted separately filling the entire message
* **Start Time** - (string, optional): Start datetime of polling, defaults to`-271821-04-20T00:00:00.000Z`
* **End Time** - (string, optional): End datetime of polling, defaults to `+275760-09-13T00:00:00.000Z`
* **Pattern** - (string, optional): Regex pattern for file names. If no pattern is given, no matching is done


#### Output Metadata
* **filename** - (string, required): File Name
* **size** - (number, required): File Size
* **type** - (string, required): File Type
* **modifyTime** - (string, required): Last Modification Time
* **accessTime** - (string, required): Last Access Time
* **directory** - (string, required): Directory
* **path** - (string, required): Full Path

#### Known limitations
* Trigger mechanism is based on SFTP file `modifyTime` metadata field. For correct processing the trigger requires correct time configuration on the SFTP server.

### Deprecated Triggers

#### Read Files

Will continuously poll remote SFTP location for files that match given pattern. Found files will be transferred as attachments to the next component

After a file is found:
 * It is moved to the (hidden) directory `.elasticio_processed` and to name of the file will be added timestamp, ex.: file `test.txt` will be renamed to `test.txt_1657621889133`
 * It is pulled and uploaded (streamed) to the attachment storage

Note: you may need to consider cleaning up the `.elasticio_processed` directory manually

##### Configuration Fields

* **Directory** - (string, required): The directory of the files to read from
* **Pattern** - (string, optional): Regex pattern for file names. If no pattern is given, no matching is done.

##### Input Metadata

none

##### Output Metadata

* **filename** - (string, required): Name of the file
* **size** - (number, required): File size

## Actions

### Delete File
Action to delete file by provided full file path.If the file does not exist, the empty message (`{}`) is returned

#### Configuration Fields
none

#### Input Metadata
- **Full Path** - (string, required): Full filename and path to the file

#### Output Metadata
- **id** - (string, required): Full filename and path to the file

### Download File by name
Finds a file by name in the provided directory and either uploads (streams) its content to the attachment storage or emits its in Base64 representation as a message.

#### Configuration Fields
* **Allow Empty Result** - (dropdown, optional, defaults to `No`): Do not throw an error when no objects were found
* **Allow ID to be Omitted** - (dropdown, optional, defaults to `No`): Do not throw an error when object id is missing
* **Emit file content (Base64)** - (checkbox, optional, defaults to `No`): When checked, a file will not be put into the internal storage. The file content in Base64 representation will be emitted as a part of the message.
  **Be careful:** Maximum message size supported on the platform is 10MB. This is why files bigger than 10MB will not be processed.

#### Input Metadata
- **Path and File Name** - (string, required if `Allow ID to be Omitted` set to `No`): Full filename and path to the file

#### Output Metadata
* **type** - (string, required): File type
* **name** - (number, required): File name
* **size** - (number, required): File size
* **owner** - (number, required): User identifier
* **group** - (number, required): Group identifier
* **accessTime** - (string, required): Last Access Time
* **modifyTime** - (string, required): Last Modify Time
* **rights** - (object, required): Rights to file on SFTP server
* **directory** - (string, required): Directory
* **path** - (string, required): Full Path
* **attachment_url** - (string, required): Url to file in storage. This field will always be empty if the checkbox `Emit file content (Base64)` is checked
* **base64Content** - (string, optional): Base64 file content

### Download Files
Finds files by criteria in the provided directory and either uploads (streams) their content to the attachment storage or emits it in Base64 representation as a message.

#### Configuration Fields
* **Behavior** - (dropdown, required): Defines the way result objects will be emitted
    * **Fetch All** - All objects will be emitted as array in one object with key `results`
    * **Emit Individually** - Each object will be emitted separately filling the entire message
* **Number of search terms** - (number, optional, between 0 and 99): Defines the number of search terms that the entity must match
* **Upload files to attachment** - (dropdown, optional): If set to `Yes` files will be uploaded to platform storage
* **File Upload Retry** - (number, optional, default 5): How many times to retry file upload as attachment to platform storage
* **Retry Timeout** - (number, optional, default 10000): How long to wait between retry attempts in milliseconds
* **File Upload Timeout** - (number, optional, default 10000): If a file upload process is longer than the specified number of milliseconds and is not processing any data (receiving or uploading), the timeout will be thrown (the process will be retried if \"File Upload Retry\" set)
* **Emit File Content (Base64)** - (checkbox, optional, defaults to `No`): When checked, the file will not be stored internally. Instead, its content will be emitted as part of the message, encoded in Base64.
  * **Note**: The maximum supported message size on the platform is 10MB. Files larger than 10MB will not be processed.
  * **Important**: This checkbox functions differently from the `Download File by Name` action. In the latter, file content is either attached to the message or emitted within the message body. However, in this action, the output depends on both this checkbox and the `Upload Files to Attachment` dropdown. The combination of these two fields can result in one of four outcomes:
    * Upload file to attachment. Emit file content as a message.
    * Upload file to attachment. Do not emit file content as a message.
    * Do not upload file to attachment. Emit file content as a message.
    * Do not upload file to attachment. Do not emit file content as a message.


#### Input Metadata
* **Directory Path** - (string, required): The directory of the files to read from
* **Max Size** - (number, optional, defaults to 250): Maximum number of objects to fetch
* **Search term** - (object, required and appears if `Number of search terms` > 0): Criteria of the file to search:
    * **Field Name** - (string, required): options are:
      * **name** - File name
      * **modifyTime** - Last Modify Time
      * **accessTime** - Last Access Time
      * **size** - File size
    * **Condition** - (string, required): options are:
      * **like** - like
      * **eq** - equal
      * **ne** - not equal
      * **gt** - greater than
      * **gte** - greater than or equal
      * **lt** - less than
      * **lte** - less than or equal
    * **Field Value** - (string, required): Value for selected term
* **Criteria Link** - (string, required and appears if `Number of search terms` > 1): Determinate how to combine `Search terms`:
  * **and** - All search term match
  * **or** - One or more search terms match

#### Output Metadata
* **type** - (string, required): File type
* **name** - (number, required): File name
* **size** - (number, required): File size
* **owner** - (number, required): User identifier
* **group** - (number, required): Group identifier
* **accessTime** - (string, required): Last Access Time
* **modifyTime** - (string, required): Last Modify Time
* **rights** - (object, required): Rights to file on SFTP server
* **directory** - (string, required): Directory
* **path** - (string, required): Full Path
* **attachment_url** - (string, optional): Url to file in storage. This field exists if the `Upload files to attachment` configuration set to true
* **base64Content** - (string, optional): Base64 file content
*
### Move File

Action to move file on SFTP already exists in one location on an sftp server to be moved to another location on the same SFTP server.
Target location MUST exist.  If the target filename already exists it will be overwritten. This action uses the openssh POSIX rename extension introduced in OpenSSH 4.8 if it is available. The advantage of this version of rename over standard SFTP rename is that it is an atomic operation and will allow renaming a resource where the destination name exists. If the openssh POSIX rename mechanism is not available, then a delete operation and then rename operation will be completed.

#### Configuration Fields

none

#### Input Metadata

- **Current file Name and Path** - (string, required): Full filename and path to the file
- **New file Name and Path** - (string, required): Full filename and path to the file to move

#### Output Metadata

- **filename** - (string, required): Full filename and path to the file where it was
- **newFilename** - (string, required): Full filename and path to the file where is moved

### Upload File From URL

Given a filename and a URL to an attachment, transfers the contents of the attachment to the SFTP server

#### Configuration Fields

* **Behavior When File Already Exists** - (dropdown, required): The expected behavior of the component when trying to write to a file that already exists:
  * **Throw an Error**: Does not write data to the file and the component produces an error
  * **Overwrite the File**: Replace the existing file contents with the contents of the attachment stored in the platform.
  * **Append the File Contents**: Adds the contents of the attachment stored in the platform to the end of the file. No intermediate characters (e.g. newlines or spaces) will be added.

Note: If the filename provided contains directories that do not exist, those directories will be created.

#### Input Metadata

- **File Name and Path** - (string, required): Full filename and path to the file to write.  Both absolute (e.g. `/home/myuser/somefolder/some.file`) and relative (e.g. `./somefolder/some.file`) paths are supported.  Tilde (`~`) expansion is not supported.
- **Attachment URL** - (string, required): URL of the stored attachment to store in the file.
- **Encoding** - (string, optional): The encoding (if any) that should be applied to the written file.
- **File Mode** - (string/number, optional): The read/write/execute permissions for the file, defaults to 00666 (rwx)

#### Output Metadata

* **mode** - (number, required): permissions for the file
* **size** - (number, required): File Size
* **uid** - (number, required): User identifier
* **gid** - (number, required): Group identifier
* **accessTime** - (string, required): Last Access Time
* **modifyTime** - (string, required): Last Modify Time
* **isDirectory** - (boolean, required): Is it directory
* **isFile** - (string, required): Is it file


### Upload Files From Attachments Header

#### Configuration Fields

- **Directory** - (string, required): The directory where the file will be uploaded to, if the directory does not exist, it will create it at the risk of possibly overwriting any files that may have the same name.

#### Input Metadata

* **Filename** - (string, optional): Custom name for uploaded file
  * **Note 1** Uploaded file name will get filename of income file if new `Filename` doesn't provided
  * **Note 2** `Filename` will be added at the beggining of attachment name if income message contains multiple attachments: `[SpecifiedFilename]_[NameOfExistedFile]`
  * **Note 3** File will be overwritten in case when file with specified name already exists in directory

#### Output Metadata
An object, with key `results` that has an array as its value

* **attachment** - (string, required): File Name
* **uploadedOn** - (string, required): Upload datetime
* **path** - (string, required): Full Path to file
