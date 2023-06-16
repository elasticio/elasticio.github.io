---
title: Microsoft OneDrive component
layout: component
section: Office components
description: This is the component for working with Microsoft OneDrive storage service on platform.
icon: onedrive.png
icontext: Microsoft OneDrive component
category: onedrive
ComponentVersion: 2.0.0
updatedDate: 2023-05-19
---

## Description

Microsoft OneDrive Component is designed to manage files and folders in OneDrive service using [Microsoft Graph API](https://learn.microsoft.com/en-us/graph/use-the-api)

## Environment variables

| Name                     | Mandatory | Description                                                                                           | Values                              |
|--------------------------|-----------|-------------------------------------------------------------------------------------------------------|-------------------------------------|
| `API_RETRIES_COUNT`      | false     | Set how many time system try to make request to API on server errors (3 by default)                          | `integer` above 0 and below 5|
| `API_REQUEST_TIMEOUT`    | false     | HTTP requests timeout in milliseconds (15000 by default)                                              | `integer` above 500 and below 20000 |

## API version

Current release of component tested on Graph API `v1` (`https://graph.microsoft.com/v1.0/`)

## Credentials

Microsoft OneDrive uses the OAuth 2.0.
How to register an application look [here](https://learn.microsoft.com/en-us/onedrive/developer/rest-api/getting-started/app-registration?view=odsp-graph-online).
Redirect URI for platform is `https://{your-tenant-address}/callback/oauth2`

* **Type** (dropdown, required) - `OAuth2`
* **Choose Auth Client** (dropdown, required) - select one of created before or `Add New Auth Client`:
  * **Name** (string, required) - provide any name you want
  * **Client ID** (string, required) - put here `Application (client) ID`
  * **Client Secret** (string, required) - put here `Client credentials`
  * **Authorization Endpoint** (string, required) - OneDrive authorization endpoint `https://login.microsoftonline.com/common/oauth2/v2.0/authorize`
  * **Token Endpoint** (string, required) - OneDrive refresh token endpoint `https://login.microsoftonline.com/common/oauth2/v2.0/token`
* **Name Your Credential** (string, required) - provide any name you want
* **Scopes (Space-separated list)** (string, required) - Put here scopes to get access to your OneDrive - `offline_access Files.ReadWrite.All`

## Triggers

### Get New and Updated Objects Polling

Retrieve all the updated or created objects within a given time range.

#### Configuration Fields

* **Drive Identity** - (dropdown, required): OneDrive instance to work with
* **Folders path** - (multiselect dropdown, required): Select folders to follow
* **Include subfolders** - (checkbox, optional): If checked, trigger will follow to each subfolder of selected folder.
    >**Please Note:** this will increase the number of API calls

* **Enable File Attachments** - (checkbox, optional): If checked, file will be uploaded to local storage and link provided in response
* **Time stamp field to poll on** - (dropdown, optional, default `Last Modified`): Select which date will be used to track files - `Last Modified` or `Created`
* **Emit Behavior** - (dropdown, optional, default `Emit individually`): Defines the way result objects will be emitted, one of `Emit page` or `Emit individually`.
* **Page Size** - (number, optional, defaults to 999, max 999): Indicates the size of pages to be fetched per request
* **Start Time** - (string, optional): The timestamp to start polling from (inclusive) - using ISO 8601 Date time utc format - YYYY-MM-DDThh:mm:ssZ. Default value is the beginning of time (January 1, 1970 at 00:00).
* **End Time** - (string, optional): The timestamp to stop polling (exclusive) - using ISO 8601 Date time utc format - YYYY-MM-DDThh:mm:ssZ. Default value is flow execution time.

#### Input Metadata

There is no Input or Output metadata in this trigger.

#### Output Metadata

Depends on `Enable File Attachments` and `Emit behavior` fields.
 * If `Emit behavior` field is equal to `Emit page` - object with property `results` that contains array of files
 * If `Emit behavior` field is equal to `Emit individually`, file information will fulfill whole message
 * If `Enable File Attachments` checked, for each file there will be additional field - `attachmentUrl`


#### Limitations

* OneDrive API doesn't support filtering - as result we collect information about all files from selected folders and filter them locally (inside component) for each trigger execution
* From point above, option `Emit page` not always emit records according to `Page Size`
* `Include subfolders` increase amount of API calls - additional call for each subfolder and inner folders

## Actions

### Create Folder

Create new folder in provided `path`. If `path` not exist component will fail.

#### Configuration Fields

* **Drive Identity** - (dropdown, required): OneDrive instance to work with
* **Conflict Behavior** - (dropdown, optional, `Fail` by default) - Select one of options to handle case when folder already exists:
  * **Fail** - Fails if folder with same name already exists under provided `path`
  * **Generate new name** - If folder with same name already exists under provided `path` then will be created new folder with different name. Examples: `folder_name` (already exist) -> `folder_name 1` (will be created), `folder_name 1` (already exist) -> `folder_name 1 1` (will be created)
  * **Upsert** - If folder already exist, you will get information about this folder

#### Input Metadata

* **Path** - (string, required): Full path to folder where you need to create new folder, ex: `Monthly reports/November`
* **Name** - (string, required): Name of new folder

#### Output Metadata

Metadata of created folder

### Delete File

Action to delete item from OneDrive by provided path in selected disc.

#### Configuration Fields

* **Drive Identity** - (dropdown, required): OneDrive instance to work with
* **Emit strategy when file not found** - (dropdown, optional, `Emit nothing` by default) - select one of options to handle case when file not exist:
  * **Emit nothing** - component will not produce any messages
  * **Emit an empty object** - result will be empty object: `{}`
  * **Throw an error** - error will be thrown

#### Input Metadata

* **Path** - (string, required): Full path to item, ex: `Monthly reports/November/Cars sales.pdf`

#### Output Metadata

* **Path** - (string, required): Full path to item, ex: `Monthly reports/November/Cars sales.pdf`

### Get File

Lookup a single file by its path.

#### Configuration Fields

* **Drive Identity** - (dropdown, required): OneDrive instance to work with
* **Enable File Attachments** - (checkbox, optional): If checked, file will be uploaded to local storage and link provided in response

#### Input Metadata

* **Path** - (string, required): Full path to item, ex: `Monthly reports/November/Cars sales.pdf`

#### Output Metadata

File information as JSON object, if `Enable File Attachments` checked, there also will be additional field `attachmentUrl` with link to file on platform

### Upsert File

Updates (if record exist) or creates a new file

#### Configuration Fields

* **Drive Identity** - (dropdown, required): OneDrive instance to work with
* **Upload single file** - (checkbox, optional): Use this option if you want to upload a single file

#### Input Metadata
If `Upload single file` checked, there will be 2 fields:
* **URL** - (string, required): link to file on Internet or platform
* **Path** - (string, required): Full path to item on OneDrive, ex: `Monthly reports/November/Cars sales.pdf`

If `Upload single file` unchecked:
* **Files** - (array, required): Collection of files to upload, each record contains object with two keys:
  * **URL** - (string, required): link to file on Internet or platform
  * **Path** - (string, required): Full path to item on OneDrive, ex: `Monthly reports/November/Cars sales.pdf`

#### Output Metadata

Result object from upsert.
