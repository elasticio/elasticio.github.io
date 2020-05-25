---
title: AWS S3 component
layout: component
section: Protocol components
description: A object storage that can store and retrieve e.g. files, documents or images from any place on the Internet.
icon:  aws-s3.png
icontext: AWS S3 component
category: AWS S3 component
createdDate: 2016-04-16
updatedDate: 2020-05-22
---

## Latest changelog

**1.3.1 (May 22, 2020)**

* Update sailor version to 2.6.7

> To see the full **changelog** please use the following [link](/components/aws-s3/changelog).


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

The component is based on [AWS S3 SDK](https://aws.amazon.com/sdk-for-node-js/ 'SDK for NodeJS') version 2.314.0.

## Requirements

### Environment variables

|Name|Mandatory|Description|Values|
|----|---------|-----------|------|
|`LOG_LEVEL`| false | Controls logger level | `trace`, `debug`, `info`, `warning`, `error` |
|`ATTACHMENT_MAX_SIZE`| false | For `elastic.io` attachments configuration. Maximal possible attachment size in bytes. By default set to 1000000 and according to platform limitations CAN'T be bigger than that. | Up to `1000000` bytes|
|`ACCESS_KEY_ID`| false | For integration-tests is required to specify this variable |  |
|`ACCESS_KEY_SECRET`| false | For integration-tests is required to specify this variable |  |
|`REGION`  | false | For integration-tests is required to specify this variable |  |


## Credentials

Access keys consist of two parts: an access key ID and a secret access key.
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

 - **Bucket Name and folder** - name of S3 bucket to read files from
 - **Emit Behaviour**: Options are: default is `Emit Individually` emits each object in separate message, `Fetch All` emits all objects in one message
 - **Start Time**: Start datetime of polling. Default min date:`-271821-04-20T00:00:00.000Z`
 - **End Time**: End datetime of polling. Default max date: `+275760-09-13T00:00:00.000Z`
 - **Enable File Attachments**: End datetime of polling. Default max date: `+275760-09-13T00:00:00.000Z`

<details>
<summary>Output metadata</summary>

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

### Write file

Put stream as file into S3 bucket.
This action creates or rewrites a new file on S3 with the content that is passed as an input attachment.
The name of the file would be the same to the attachment name.
Be careful: this action can process only one attachment - if it would be more or no attachment at all the execution would fail with exception.

#### List of Expected Config fields

 - **Default Bucket Name and folder** - name of S3 bucket to write file in (by default, if `bucketName` is not provided in metadata);

#### Expected input metadata

 - **filename** - name of resulted file at S3 bucket (optional);
 - **bucketName** - name of S3 bucket to write file in (will replace `Default Bucket Name and folder` if provided, the field is optional).

![ Write file - default bucket name](https://user-images.githubusercontent.com/40201204/59688384-448b5b80-91e6-11e9-8dd0-e007983055c8.png)

<details>
<summary>Input metadata</summary>

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

<details>
<summary>Output metadata</summary>

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

### Read file

Read file from S3 bucket.
This action reads file from S3 bucket by provided name. The result is storing in the output body (for json or xml) or in the output attachment (for other types).
File type resolves by it's extension. The name of attachment would be same to filename.

#### List of Expected Config fields

 - **Default Bucket Name and folder** - name of S3 bucket to read file from (by default, if `bucketName` is not provided in metadata);

#### Expected input metadata

 - **filename** - name of file at S3 bucket to read;
 - **bucketName** - name of S3 bucket to read file from (will replace `Default Bucket Name and folder` if provided, the field is optional).

![Read file - default bucket name](https://user-images.githubusercontent.com/40201204/59688635-ced3bf80-91e6-11e9-8c17-a172a1dadce2.png)

<details>
<summary>Input metadata</summary>

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

<details>
<summary>Output metadata</summary>

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

**Notice**: if you provide bucket and folder (as example `eio-dev/inbound`), not only all names of files will  return but name of root folder (`inbound/`) as well.

#### List of Expected Config fields

 - **Default Bucket Name and folder** - name of S3 bucket to read file from (by default, if `bucketName` is not provided in metadata);

#### Expected input metadata

 - **bucketName** - name of S3 bucket to write file from (will replace `Default Bucket Name and folder` if provided, the field is optional).

![Get filenames - default bucket name](https://user-images.githubusercontent.com/40201204/59688813-1fe3b380-91e7-11e9-8f54-a90b2b601eea.png)

<details>
<summary>Input metadata</summary>

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

<details>
<summary>Output metadata</summary>

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

 - **filename** - name of file at S3 bucket to delete;
 - **bucketName** - name of S3 bucket and folder to delete file from (will replace `Default Bucket Name and folder` if provided, the field is optional).

![Delete file - default bucket name](https://user-images.githubusercontent.com/40201204/59688635-ced3bf80-91e6-11e9-8c17-a172a1dadce2.png)

<details>
<summary>Input metadata</summary>

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

<details>
<summary>Output metadata</summary>

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

 - **bucketName** - name of S3 bucket where file is placed
 - **folder** - name of folder where file is placed (can be omitted)
 - **oldFileName** - name of file that should be renamed
 - **newFileName** - new name of file

<details>
<summary>Input metadata</summary>

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

<details>
<summary>Output metadata</summary>

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

### Stream to CSV

Action is deprecated. Use `Write file` action instead.

## Known Limitations

1. Maximal possible size for an attachment is 10 MB.
2. Attachments mechanism does not work with [Local Agent Installation](/getting-started/local-agent)
