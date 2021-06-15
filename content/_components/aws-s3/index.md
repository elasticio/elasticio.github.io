---
title: AWS S3 component
layout: component
section: Protocol components
description: A object storage that can store and retrieve e.g. files, documents or images from any place on the Internet.
icon:  aws-s3.png
icontext: AWS S3 component
category: aws-s3
updatedDate: 2020-11-12
ComponentVersion: 1.4.1
---

## General information

### Purpose

The component provides ability to connect to Amazon Simple Storage Service (Amazon S3) object storage service.

Following actions are inside:

- Write file
- Read file
- Get filenames
- Delete file
- Stream to CSV
- Rename file

### Description

This is the component for working with AWS S3 object storage service on {{site.data.tenant.name}} platform.

### How works. SDK version

The component is based on [AWS S3 SDK](https://aws.amazon.com/sdk-for-node-js/ 'SDK for NodeJS') version 2.683.0.

## Requirements

### Environment variables

|Name|Mandatory|Description|Values|
|----|---------|-----------|------|
|`ATTACHMENT_MAX_SIZE`| false | For `elastic.io` attachments configuration. Maximal possible attachment size in bytes. By default set to 1000000 and according to platform limitations CAN'T be bigger than that. | Up to `1000000` bytes|
|`ACCESS_KEY_ID`| false | For integration-tests is required to specify this variable |  |
|`ACCESS_KEY_SECRET`| false | For integration-tests is required to specify this variable |  |
|`REGION`  | false | For integration-tests is required to specify this variable |  |

> Please Note: From the platform version [20.51](/releases/2020-12-17) we deprecated the
> component `LOG_LEVEL` environment variable. Now you can control logging level per each step of the flow.

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about AWS-S3 component like [changelog](/components/aws-s3/technical-notes#changelog) and [completeness matrix](/components/aws-s3/technical-notes#completeness-matrix).

## Credentials

Access keys consist of three parts: an access key ID, a secret access key and a region.
Like a user name and password, you must use both the access key ID and secret access key together to authenticate your requests.
According to [AWS documentation](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html#access-bucket-intro) for buckets created in Regions launched after March 20, 2019 `Region` is required for AWS credential.

### Access Key Id

An access key ID (for example, `AKIAIOSFODNN7EXAMPLE`).

### Secret Access Key

A secret access key (for example, `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`).

### Region

Example: `ca-central-1`.

## Triggers

### Get New and Updated S3 Objects

Triggers to get all new and updated s3 objects since last polling.

#### List of Expected Config fields

![Get New and Updated S3 Objects](img/get-new-and-update.png)

 - **Bucket Name and folder** - name of S3 bucket to read files from
 - **Emit Behaviour**: Options are: default is `Emit Individually` emits each object in separate message, `Fetch All` emits all objects in one message
 - **Start Time**: Start datetime of polling. Default min date:`-271821-04-20T00:00:00.000Z`
 - **End Time**: End datetime of polling. Default max date: `+275760-09-13T00:00:00.000Z`
 - **Enable File Attachments**: If selected, the contents of the file will be exported in addition to the file metadata.

<details close markdown="block">
<summary>
Click to expand - Output metadata
</summary>

```json
{
  "type": "object",
  "properties": {
    "Key": {
      "type": "string",
      "required": true
    },
    "LastModified": {
      "type": "string",
      "required": true
    },
    "ETag": {
      "type": "string",
      "required": true
    },
    "Size": {
      "type": "number",
      "required": true
    },
    "StorageClass": {
      "type": "string",
      "required": true
    },
    "Owner": {
      "type": "object",
      "properties": {
        "ID": {
          "type": "string",
          "required": true
        }
      }
    }
  }
}
```

</details>

## Actions

### Write File to S3 From a Provided Attachment

Given a filename and a URL to an attachment stored in the platform, transfers the contents of the attachment to AWS S3. The component returns a summary of the written file. AWS S3 always overwrites the contents of the file if it already exists.

#### Expected input metadata

 - **bucketName** - name of S3 bucket to write the file to; Sufficient write permission is required;
 - **fileName** - Name of file/S3 object to write. Use `/` characters in the filename to create folders;
 - **attachmentUrl** - Url to the attachment stored in the platform. The contents of this attachment will be written to S3 without any transformation;

#### Limitations

* It is not possible to set the File/Object Metadata in S3
* Files/Objects can not be so large that they can not fit in the memory of the component's docker container.
* Files/Objects can not be more that 5 GB in size
* It is not possible to set the AWS S3 Storage Class for written files/objects. They will always be written with the `standard` storage class.
* It is not possible to set file/object tags
* It is not possible to compression objects/files (with zip, gzip, etc)
* It is not possible to encrypt object/files

### Read file

Read file from S3 bucket.
This action reads file from S3 bucket by provided name. The result is storing in the output body (for json or xml) or in the output attachment (for other types).
File type resolves by it's extension. The name of attachment would be same to filename.

#### List of Expected Config fields

 - **Default Bucket Name and folder** - name of S3 bucket to read file from (by default, if `bucketName` is not provided in metadata);

#### Expected input metadata

![Read file](img/read-file.png)

 - **filename** - name of file at S3 bucket to read;
 - **bucketName** - name of S3 bucket to read file from (will replace `Default Bucket Name and folder` if provided, the field is optional).


<details close markdown="block">
<summary>
Click to expand - Input metadata
</summary>

```json
{
  "type": "object",
  "properties": {
    "filename": {
      "type": "string",
      "required": true
    },
    "bucketName": {
      "type": "string",
      "required": false
    }
  }
}
```

</details>

#### Expected output metadata

<details close markdown="block">
<summary>
Click to expand - Output metadata
</summary>

```json
{
  "type": "object",
  "properties": {
    "filename": {
      "type": "string",
      "required": true
    }
  }
}
```

</details>

### Get filenames

Emit individually all filenames from S3 bucket.
This action gets all names of files which are storing in S3 bucket with provided name.
The filenames emits individually.

> **Please Note:** if you provide bucket and folder (as example `eio-dev/inbound`), not only all names of files will  return but name of root folder (`inbound/`) as well.

#### List of Expected Config fields

 - **Default Bucket Name and folder** - name of S3 bucket to read file from (by default, if `bucketName` is not provided in metadata);

#### Expected input metadata

![Get filenames](img/get-filename.png)

 - **bucketName** - name of S3 bucket to write file from (will replace `Default Bucket Name and folder` if provided, the field is optional).

<details close markdown="block">
<summary>
Click to expand - Input metadata
</summary>

```json
{
  "type": "object",
  "properties": {
    "bucketName": {
      "type": "string",
      "required": false
    }
  }
}
```

</details>

#### Expected output metadata

<details close markdown="block">
<summary>
Click to expand - Output metadata
</summary>

```json
{
  "type": "object",
  "properties": {
    "ETag": {
      "type": "string",
      "required": true
    },
    "Location": {
      "type": "string",
      "required": false
    },
    "Key": {
      "type": "string",
      "required": true
    },
    "Bucket": {
      "type": "string",
      "required": true
    }
  }
}
```

</details>

#### Known limitations

It is possible to retrieve maximum 1000 file names.

### Delete file

Delete file from S3 bucket.

This action removes file from S3 by provided name in selected bucket. The action will emit single filename of removed file.

#### List of Expected Config fields

 - **Default Bucket Name and folder** - name of S3 bucket to delete file from (by default, if `bucketName` is not provided);

#### Expected input metadata

![Delete file](img/delete-file.png)

 - **filename** - name of file at S3 bucket to delete;
 - **bucketName** - name of S3 bucket and folder to delete file from (will replace `Default Bucket Name and folder` if provided, the field is optional).

<details close markdown="block">
<summary>
Click to expand - Input metadata
</summary>

```json
{
  "type": "object",
  "properties": {
    "filename": {
      "type": "string",
      "required": true
    },
    "bucketName": {
      "type": "string",
      "required": false
    }
  }
}
```

</details>

#### Expected output metadata

<details close markdown="block">
<summary>
Click to expand - Output metadata
</summary>

```json
{
  "type": "object",
  "properties": {
    "filename": {
      "type": "string",
      "required": true
    }
  }
}
```

</details>

### Rename file

Rename file in S3 bucket and folder.

This action renames file by provided name in selected bucket and folder.
The action will emit properties of renamed file.

#### Expected input metadata

![Rename file](img/rename-file.png)

 - **bucketName** - name of S3 bucket where file is placed
 - **folder** - name of folder where file is placed (can be omitted)
 - **oldFileName** - name of file that should be renamed
 - **newFileName** - new name of file

<details close markdown="block">
<summary>
Click to expand - Input metadata
</summary>

```json
{
  "type": "object",
  "properties": {
    "bucketName": {
      "title":"Bucket Name and folder",
      "type": "string",
      "required": true
    },
    "folder": {
      "type": "string",
      "required": false
    },
    "oldFileName": {
      "type": "string",
      "required": true
    },
    "newFileName": {
      "type": "string",
      "required": true
    }
  }
}
```

</details>

#### Expected output metadata

<details close markdown="block">
<summary>
Click to expand - Output metadata
</summary>

```json
{
  "type": "object",
  "properties": {
    "Key": {
      "type": "string",
      "required": true
    },
    "LastModified": {
      "type": "string",
      "required": true
    },
    "ETag": {
      "type": "string",
      "required": true
    },
    "Size": {
      "type": "number",
      "required": true
    },
    "StorageClass": {
      "type": "string",
      "required": true
    },
    "Owner": {
      "type": "object",
      "required": true,
      "properties": {
        "ID": {
          "type": "string",
          "required": true
        }
      }
    }
  }
}
```

</details>

### Write file(deprecated)

**This action is deprecated.** Please use [Write File to S3 From a Provided Attachment](#write-file-to-s3-from-a-provided-attachment) instead.
Put stream as file into S3 bucket.
This action creates or rewrites a new file on S3 with the content that is passed as an input attachment.
The name of the file would be the same to the attachment name.
Be careful: this action can process only one attachment - if it would be more or no attachment at all the execution would fail with exception.

#### List of Expected Config fields

 - **Default Bucket Name and folder** - name of S3 bucket to write file in (by default, if `bucketName` is not provided in metadata);

#### Expected input metadata

 - **filename** - name of resulted file at S3 bucket (optional);
 - **bucketName** - name of S3 bucket to write file in (will replace `Default Bucket Name and folder` if provided, the field is optional).

<details close markdown="block">
<summary>
Click to expand - Input metadata
</summary>

```json
{
  "type": "object",
  "properties": {
    "filename": {
      "type": "string",
      "required": false
    },
    "bucketName": {
      "type": "string",
      "required": false
    }
  }
}
```

</details>

#### Expected output metadata

<details close markdown="block">
<summary>
Click to expand - Output metadata
</summary>

```json
{
  "type": "object",
  "properties": {
    "ETag": {
      "type": "string",
      "required": true
    },
    "Location": {
      "type": "string",
      "required": false
    },
    "Key": {
      "type": "string",
      "required": true
    },
    "Bucket": {
      "type": "string",
      "required": true
    }
  }
}
```

</details>

### Stream to CSV

**Action is deprecated.** Use the [CSV](/components/csv/index) & or [Batch](/components/batch/index) component to create a csv file first, then write that file to S3.

## Known Limitations

1. Maximal possible size for an attachment is 10 MB.
2. Attachments mechanism does not work with [Local Agent Installation](/getting-started/local-agent)
