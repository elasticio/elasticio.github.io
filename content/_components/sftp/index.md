---
title: SFTP component
layout: component
section: Protocol components
description: A component for connecting to an SFTP server to read/write files.
icon: sftp.png
icontext: SFTP component
category: SFTP component
createdDate: 2015-11-20
updatedDate: 2019-12-30
---

## Latest changelog

**1.2.1 (December 30, 2019)**

**General Changes:**

* Update component to new sailor version 2.5.4

> To see the full **changelog** please use the following [link](/components/sftp/changelog).

## General Information

### Description and Purpose

This component creates a connection to an SFTP server to read and upload files.

The optional environment variable `MAX_FILE_SIZE` should be set in settings to provide the maximum file size that can be uploaded in **megabytes (mb)**. The default value for `MAX_FILE_SIZE` is 10MB.

## Credentials

### Host

Host name of SFTP server

### Port

Optional, port of SFTP server. Defaults to 22 if not set.

### User Name

Username for SFTP server

### Password

Password for SFTP server.

>**Note**: field `Private Key` should stay empty in case you fill a password.

### Private Key

To access a secure SFTP servers that is configured with a key-based authentication you must at first upload your `Public key` to the SFTP server (please contact your server administrator to do this) and fill in this field with your `Private key`.

Also please pay attention that the field `Password` should be empty in this case.

![My new SFTP credential](https://user-images.githubusercontent.com/16806832/71006042-5db98a00-20ed-11ea-8e75-5a58b4207330.png)

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

### Poll files

Triggers to get all new and updated files since last polling.

The following configuration fields are available:

* **Directory**: The directory of the files to read from.
* **Emit Behaviour**: Options are: default is `Emit Individually` emits each object in separate message, `Fetch All` emits all objects in one message
* **Start Time**: Start datetime of polling. Default min date:`-271821-04-20T00:00:00.000Z`
* **End Time**: End datetime of polling. Default max date: `+275760-09-13T00:00:00.000Z`


#### Expected output metadata

<details>
<summary>Output metadata</summary>

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

## Actions

### Upload files From Attachments Header

The following configuration fields are available:

- **Directory**: The directory where the file will be uploaded to.

>**Note:** if the directory does not exist, it will create it at the risk of possibly overwriting any files that may have the same name.

Input metadata:

- **Filename**: Custom name for uploaded file.

>**Notes:**
* Uploaded file name will get filename of income file if new `Filename` doesn't provided
* `Filename` will be added at the beggining of attachment name if income message contains multiple attachments: `[SpecifiedFilename]_[NameOfExistedFile]`
* File will be overwritten in case when file with specified name already exists in directory

### Upload File From URL

Given a filename and a URL to an attachment stored in the platform, transfers the contents of the attachment to the SFTP server.  The component returns a summary of the written file.

The following configuration fields are available:

- **Behavior When File Already Exists**: The expected behavior of the component when trying to write to a file that already exists

  - **Throw an Error**: Does not write data to the file and the component produces an error
  - **Overwrite the File**: Replace the existing file contents with the contents of the attachment stored in the platform.
  - **Append the File Contents**: Adds the contents of the attachment stored in the platform to the end of the file. No intermediate characters (e.g. newlines or spaces) will be added.

>**Note:** If the filename provided contains directories that do not exist, those directories will be created.

#### Expected input metadata

- **File Name and Path**: Full filename and path to the file to write.  Both absolute (e.g. `/home/myuser/somefolder/some.file`) and relative (e.g. `./somefolder/some.file`) paths are supported.  Tilde (`~`) expansion is not supported.
- **Attachment URL**: URL of the stored attachment to store in the file.
- **Encoding**: The encoding (if any) that should be applied to the written file.
- **File Mode**: The read/write/execute permissions for the file.

```json
{
  "type": "object",
  "required": true,
  "properties": {
    "filename": {
      "title": "File Name and Path",
      "type": "string",
      "required": true
    },
    "attachmentUrl": {
      "title": "Attachment URL",
      "type": "string",
      "required": true
    },
    "encoding": {
      "title": "Encoding (defaults to null)",
      "type": "string",
      "required": false
    },
    "fileMod": {
      "title": "File Mode (i.e. read/write permissions) (defaults to 0o666 (rwx))",
      "type": "string",
      "required": false
    }
  }
}
```

#### Expected output metadata

```json
{
  "type": "object",
  "properties": {
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
}
```


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

### Download file by name

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

>**Note:** `type` field represents type of the file. You can find additional information about Unix file types [below](#ssh2-sftp-client-api-and-documentation-links).

### Download files

Finds a file by criterias in the provided directory and uploads (streams) to the attachment storage (a.k.a. steward).
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
    "directory": "/www/test",
    "path": "/www/test/1.txt"
  }
}
```

The next component may read from `url` in `attachments` for a memory-efficient way to read/parse data.

#### List of Expected Config fields

##### Behavior

`Fetch All` - fetch all objects in one message in form of array, `Emit Individually` - emit each fetched object as separate message.

##### Number of search terms

Not required field, number of search terms. Determines the number of search terms that the entity must match. Need to be an integer value from 1 to 99. If this field is empty, action emits all entities with selected type.

##### Upload files to attachment

 Not required field. If `Yes` - all files will be downloaded to the attachments and action will return files metadata as JSON object. If `No` - No files will be downloaded to the attachments and action returns files metadata in JSON object

#### Expected input metadata

**Directory Path** - required field, Path of lookup directory.
**Max Size** - Maximum number of objects to fetch. Default `250`, maximum value is `250`.

Metadata is depending on the input field `Number of search terms`.

If `Number of search terms` is empty, metadata does not exist.

If `Number of search terms` = 1, metadata has only one search term.

If `Number of search terms` > 1, metadata has a number of search term equal `Number of search terms` and a number of criteria link equal '`Number of search terms` - 1'.

Each search term has 3 fields:

 ![Search Term](https://user-images.githubusercontent.com/13310949/70321165-54980580-182f-11ea-9442-e6234163deb6.png)

 - **Field Name** - chosen entity's field name. You need to select the one field from `Value` section:

 ![Field Name - Values](https://user-images.githubusercontent.com/13310949/70224021-31992300-1755-11ea-83e0-6023a2d67503.png)

 - **Condition** - You need to select the one condition from `Value` section:

 ![Condition - Values](https://user-images.githubusercontent.com/13310949/70224020-31992300-1755-11ea-8f5d-375a77acf1c6.png)

 - **Field Value** - the value that the field must match with the specified condition.

  You can use wildcard in the condition value for the `like` operator. See [micromatch documentation.](https://www.npmjs.com/package/micromatch)

Between search terms, there is **Criteria Link**. You need to select the one criteria from `Value` section:

![Criteria link - Values](https://user-images.githubusercontent.com/13310949/70224278-ae2c0180-1755-11ea-9445-441a0e2c8f87.png)

`And` Criteria Link has precedence over `Or`. If you configure 3 search Terms:

```sql
 searchTerm1 and SearchTerm2 or SearchTerm3
```

, it will be executed as

 ```sql
(searchTerm1 and SearchTerm2) or SearchTerm3
```

For example, if you want to find all files where field `name` starts from `123` or field `size` grater than `10000`:

![Integrator mode](https://user-images.githubusercontent.com/13310949/70224450-f6e3ba80-1755-11ea-9a9c-de573f74d370.png)


#### Output metadata

Schema of output metadata depends on Behaviour configuration:

##### Fetch All

<details>
<summary>Output metadata</summary>

```json
{
   "type": "object",
   "properties": {
      "results": {
         "type": "array",
         "properties": {
            "type": "object",
            "properties": {
               "type": {
                  "type": "string"
               },
               "name": {
                  "type": "string"
               },
               "size": {
                  "type": "number"
               },
               "modifyTime": {
                  "type": "number"
               },
               "accessTime": {
                  "type": "number"
               },
               "rights": {
                  "type": "object",
                  "properties": {
                     "user": {
                        "type": "string"
                     },
                     "group": {
                        "type": "string"
                     },
                     "other": {
                        "type": "string"
                     }
                  }
               },
               "owner": {
                  "type": "number"
               },
               "group": {
                  "type": "number"
               },
               "attachment_url": {
                  "type": "string"
               },
               "directory": {
                  "type": "string"
               },
               "path": {
                  "type": "string"
               }
            }
         }
      }
   }
}
```
</details>

##### Emit Individually

<details>
<summary>Output metadata</summary>

```json
{
   "type": "object",
   "properties": {
      "type": {
         "type": "string"
      },
      "name": {
         "type": "string"
      },
      "size": {
         "type": "number"
      },
      "modifyTime": {
         "type": "number"
      },
      "accessTime": {
         "type": "number"
      },
      "rights": {
         "type": "object",
         "properties": {
            "user": {
               "type": "string"
            },
            "group": {
               "type": "string"
            },
            "other": {
               "type": "string"
            }
         }
      },
      "owner": {
         "type": "number"
      },
      "group": {
         "type": "number"
      },
      "attachment_url": {
         "type": "string"
      },
      "directory": {
          "type": "string"
      },
      "path": {
          "type": "string"
      }
   }
}
```
</details>

`type` field represents type of the file. You can find additional information about Unix file types [below](#ssh2-sftp-client-api-and-documentation-links);

#### Known limitations

Action does not support `Fetch Page` mode (according to OIH standards)


## Known limitations

* The maximum file size accepted by the SFTP component is limited to 100 MB.
* The attachments mechanism does not work with [Local Agent Installation](/getting-started/local-agent)
* `Get new and updated files` trigger mechanism is based on SFTP file `modifyTime` metadata field. For correct processing the trigger requires correct time configuration on the SFTP server.
* `Get new and updated files` trigger does not support empty files processing.
* `Get new and updated files` trigger does not support `fetch page` Emit Behaviour

## SSH2 SFTP Client API and Documentation links

The SFTP component uses [ssh2-sftp-client](https://www.npmjs.com/package/ssh2-sftp-client).

Explanation of [Unix file types](https://en.wikipedia.org/wiki/Unix_file_types)
