---
title: SFTP actions
layout: component
description: SFTP component actions.
icon: sftp.png
icontext: SFTP component
category: sftp
updatedDate: 2022-11-04
ComponentVersion: 1.6.0
---

## Delete File

Action to delete file by provided full file path. If the file does not exist, the empty message (`{}`) is returned

> **Plesae Note:** To gain a better understanding of the functionality provided by Delete File action, we recommend checking out our [example article](/components/sftp/usage-example#delete-file). It provides a detailed walkthrough of how to use Delete File action effectively, which will assist you in working with it.

{% include img.html max-width="100%" url="img/delete.png" title="Delete File" %}

### Configuration Fields

There is no Configuration Fields.

### Input Metadata

- **Full Path** - (string, required): Full filename and path to the file

### Output Metadata

- **id** - (string, required): Full filename and path to the file

## Download File by name

Finds a file by name in the provided directory and uploads (streams) to the attachment storage

{% include img.html max-width="100%" url="img/download-by-name.png" title="Download File by name" %}

> **Plesae Note:** To gain a better understanding of the functionality provided by Download File by name action, we recommend checking out our [example article](/components/sftp/usage-example#download-file-by-name). It provides a detailed walkthrough of how to use Download File by name action effectively, which will assist you in working with it.

### Configuration Fields

* **Allow Empty Result** - (dropdown, optional, defaults to `No`): Do not thrown error when no objects were found
* **Allow ID to be Omitted** - (dropdown, optional, defaults to `No`): Do not thrown error when object id is missing

### Input Metadata

- **Path and File Name** - (string, required if `Allow ID to be Omitted` set to `No`): Full filename and path to the file

### Output Metadata

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
* **attachment_url** - (string, required): Url to file in storage

## Download Files

Finds a file by criteria in the provided directory and uploads (streams) to the attachment storage

> **Plesae Note:** To gain a better understanding of the functionality provided by Download Files action, we recommend checking out our [example article](/components/sftp/usage-example#download-files). It provides a detailed walkthrough of how to use Download Files action effectively, which will assist you in working with it.

{% include img.html max-width="100%" url="img/download-files.png" title="Download Files" %}

### Configuration Fields

* **Behavior** - (dropdown, required): Defines the way result objects will be emitted
    * **Fetch All** - All objects will be emitted as array in one object with key `results`
    * **Emit Individually** - Each object will be emitted separately filling the entire message
* **Number of search terms** - (number, optional, between 0 and 99): Defines the number of search terms that the entity must match
* **Upload files to attachment** - (dropdown, optional): If set to `Yes` files will be uploaded to platform storage
* **File Upload Retry** - (number, optional, default 5): How many times to retry file upload as attachment to platform storage
* **Retry Timeout** - (number, optional, default 10000): How long to wait between retry attempts in milliseconds
* **File Upload Timeout** - (number, optional, default 10000): If a file upload process is longer than the specified number of milliseconds and is not processing any data (receiving or uploading), the timeout will be thrown (the process will be retried if \"File Upload Retry\" set)

### Input Metadata

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

### Output Metadata

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
* **attachment_url** - (string, required): Url to file in storage

## Move File

Action to move file on SFTP already exists in one location on an sftp server to be moved to another location on the same SFTP server.
Target location MUST exist.  If the target filename already exists it will be overwritten. This action uses the openssh POSIX rename extension introduced in OpenSSH 4.8 if it is available. The advantage of this version of rename over standard SFTP rename is that it is an atomic operation and will allow renaming a resource where the destination name exists. If the openssh POSIX rename mechanism is not available, then a delete operation and then rename operation will be completed.

> **Plesae Note:** To gain a better understanding of the functionality provided by Move File action, we recommend checking out our [example article](/components/sftp/usage-example#move-file). It provides a detailed walkthrough of how to use Move File action effectively, which will assist you in working with it.

{% include img.html max-width="100%" url="img/move-file.png" title="Move File" %}

### Configuration Fields

There is no Configuration Fields.

### Input Metadata

- **Current file Name and Path** - (string, required): Full filename and path to the file
- **New file Name and Path** - (string, required): Full filename and path to the file to move

### Output Metadata

- **filename** - (string, required): Full filename and path to the file where it was
- **newFilename** - (string, required): Full filename and path to the file where is moved

## Upload File From URL

> **Plesae Note:** To gain a better understanding of the functionality provided by Upload File From URL action, we recommend checking out our [example article](/components/sftp/usage-example#upload-file-from-url). It provides a detailed walkthrough of how to use Upload File From URL action effectively, which will assist you in working with it.

Given a filename and a URL to an attachment, transfers the contents of the attachment to the SFTP server

{% include img.html max-width="100%" url="img/upload-file.png" title="Upload File From URL" %}

### Configuration Fields

* **Behavior When File Already Exists** - (dropdown, required): The expected behavior of the component when trying to write to a file that already exists:
  * **Throw an Error**: Does not write data to the file and the component produces an error
  * **Overwrite the File**: Replace the existing file contents with the contents of the attachment stored in the platform.
  * **Append the File Contents**: Adds the contents of the attachment stored in the platform to the end of the file. No intermediate characters (e.g. newlines or spaces) will be added.

>**Please Note:** If the filename provided contains directories that do not exist, those directories will be created.

### Input Metadata

- **File Name and Path** - (string, required): Full filename and path to the file to write.  Both absolute (e.g. `/home/myuser/somefolder/some.file`) and relative (e.g. `./somefolder/some.file`) paths are supported.  Tilde (`~`) expansion is not supported.
- **Attachment URL** - (string, required): URL of the stored attachment to store in the file.
- **Encoding** - (string, optional): The encoding (if any) that should be applied to the written file.
- **File Mode** - (string/number, optional): The read/write/execute permissions for the file, defaults to 00666 (rwx)

### Output Metadata

* **mode** - (number, required): permissions for the file
* **size** - (number, required): File Size
* **uid** - (number, required): User identifier
* **gid** - (number, required): Group identifier
* **accessTime** - (string, required): Last Access Time
* **modifyTime** - (string, required): Last Modify Time
* **isDirectory** - (boolean, required): Is it directory
* **isFile** - (string, required): Is it file


## Upload Files From Attachments Header

> **Plesae Note:** To gain a better understanding of the functionality provided by Upload Files From Attachments Header action, we recommend checking out our [example article](/components/sftp/usage-example#upload-files-from-attachments-header). It provides a detailed walkthrough of how to use Move Upload Files From Attachments Header action effectively, which will assist you in working with it.

{% include img.html max-width="100%" url="img/upload-files-from-attachments-header.png" title="Upload Files From Attachments Header" %}

### Configuration Fields

- **Directory** - (string, required): The directory where the file will be uploaded to, if the directory does not exist, it will create it at the risk of possibly overwriting any files that may have the same name.

### Input Metadata

* **Filename** - (string, optional): Custom name for uploaded file
  * **Note 1** Uploaded file name will get filename of income file if new `Filename` doesn't provided
  * **Note 2** `Filename` will be added at the beggining of attachment name if income message contains multiple attachments: `[SpecifiedFilename]_[NameOfExistedFile]`
  * **Note 3** File will be overwritten in case when file with specified name already exists in directory

### Output Metadata

An object, with key `results` that has an array as its value

* **attachment** - (string, required): File Name
* **uploadedOn** - (string, required): Upload datetime
* **path** - (string, required): Full Path to file
