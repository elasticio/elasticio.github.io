---
title: Dropbox component
layout: component
section: Office components
description: Component to interact with Dropbox.
icon: dropbox.png
icontext: Dropbox component
category: dropbox
updatedDate: 2022-10-07
ComponentVersion: 1.1.0
---

## General information

### Description

Component to interact with [Dropbox](https://www.dropbox.com). Dropbox is a cloud storage service, which allows copy files to the cloud and accesses them later from a different device.

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Dropbox component like [changelog](/components/dropbox/technical-notes#changelog) and [completeness matrix](/components/dropbox/technical-notes#completeness-matrix).

### SDK version

It is used [Dropbox JavaScript SDK](https://github.com/dropbox/dropbox-sdk-js).

### Environment variables

| Name|Mandatory|Description|Values|
|----|---------|-----------|------|
| `ATTACHMENT_MAX_SIZE`| false | For `{{site.data.tenant.name}}` attachments configuration. Maximal possible attachment size in bytes. By default set to 1000000 and according to platform limitations CAN'T be bigger than that. | Up to `1000000` bytes|

> Please Note: From the platform version [20.51](/releases/20/51) we deprecated the
> component `LOG_LEVEL` environment variable. Now you can control logging level per each step of the flow.

## Credentials

The Dropbox SDK utilizes OAuth 2 for authorizing API requests. To ensure secure communication and access to Dropbox resources, you need to obtain an access token. To get started, create and set up your app. For detailed instructions on how to set up OAuth and generate an `access token`, refer to the Dropbox [OAuth guide](https://developers.dropbox.com/ru-ru/oauth-guide).

To create and set up your app, follow these steps:

**1.** Navigate to the Dropbox `App Center` in your web browser.

{% include img.html max-width="100%" url="img/app_center.png" title="App Center" %}

**2.**  In the `Manage` section, click on `Build an app`.

{% include img.html max-width="100%" url="img/manage_build_an_app.png" title="Build an app" %}

**3.** On the redirected page, click on the `Create app` button.

{% include img.html max-width="100%" url="img/create_apps.png" title="Choose create app" %}

**4.** Fill in the required fields, such as `Choose an API`, `Choose the type of access you need` and `NAme your App`. After configuration, press `Create app`.

{% include img.html max-width="100%" url="img/create_app.png" title="Config" %}

## Access Token

On the 'Developer Settings' page of your app, follow these steps:

1. Find the `OAuth2` title.
2. Click on the `Generate` button located below the `Generate access token` field to generate a new access token.
3. Alternatively, if you have previously generated an access token, you can use that instead.

{% include img.html max-width="100%" url="img/genetare_token.png" title="Genetare token" %}

> Please note: In order to perform certain actions, such as accessing user files or creating folders, you need to have all necessary permissions enabled. To manage permissions, click on the `Scoped App` link in the `Developer Settings` section or switch to the `Developer Permissions` page.

{% include img.html max-width="100%" url="img/dropbox_permissions.png" title="Permissions" %}

## Triggers

This component has no trigger functions. This means it will not be accessible to select as a first component during the integration flow design.

## Actions

### Get File By Path

Action to get file from Dropbox by provided path

{% include img.html max-width="100%" url="img/get-file-by-path.png" title="Get File By Path" %}

#### List of Expected Config fields

##### Allow Empty Result

Default `No`. In case `No` is selected - an error will be thrown when no files were found,
If `Yes` is selected -  an empty object will be returned instead of throwing an error.

##### Allow File name to be Omitted

Default `No`. In case `No` is selected - an error will be thrown when file path is missing in metadata, if `Yes` is selected - an empty object will be returned instead of throwing an error.

##### Enable File Attachments

Checkbox for attaching files content to action response

#### Metadata fields description

* **path** - Full path to file

<details close markdown="block"><summary><strong>Input example</strong></summary>

```json
{
    "path": "/inner_folder/file.any"
}
```
</details>

<details close markdown="block"><summary><strong>Output example</strong></summary>

- Successful response

```json
{
".tag": "file",
"name": "file.any",
"path_lower": "/file.any",
"path_display": "/file.any",
"id": "id:Ua3SpE_E_CAAAAAAAAAACA",
"client_modified": "2020-03-31T11:25:40Z",
"server_modified": "2020-03-31T11:25:40Z",
"rev": "015a224d3e0147b00000001b724db90",
"size": 28,
"is_downloadable": true,
"content_hash": "10931f016454cbd4d852632b81f2e5ab2502dc120e2afb7efcd6b64fb9d27e7a"
}
```

</details>

### Upsert File

Action upserts (create or replace) with file from attachment by provided path in Microsoft One Drive. If more then 1 attachments (or no attachments) provided the action will throw an error:

{% include img.html max-width="100%" url="img/upsert-file.png" title="Upsert File" %}

#### Metadata fields description

  * **Path** - Full path to item to create or replace

<details close markdown="block"><summary><strong>Input example</strong></summary>

```json
{
    "path": "/base_folder/inner_folder/file.any"
}
```

</details>

<details close markdown="block"><summary><strong>Output example</strong></summary>

- Successful response

```json
{
  ".tag": "file",
  "name": "file.any",
  "path_lower": "/file.any",
  "path_display": "/file.any",
  "id": "id:Ua3SpE_E_CAAAAAAAAAACA",
  "client_modified": "2020-03-31T11:25:40Z",
  "server_modified": "2020-03-31T11:25:40Z",
  "rev": "015a224d3e0147b00000001b724db90",
  "size": 28,
  "is_downloadable": true,
  "content_hash": "10931f016454cbd4d852632b81f2e5ab2502dc120e2afb7efcd6b64fb9d27e7a",
  "url": "http://maester-service.platform.svc.cluster.local:3002/objects/70d14266-37ae-46b7-b485-d4a2948b24e7?storage_type=maester"
}
```

</details>

### Delete Folder Or File By Path

Action to delete folder or file from Dropbox by provided path:

{% include img.html max-width="100%" url="img/delete-folder-or-file-by-path.png" title="Delete Folder Or File By Path" %}

#### List of Expected Config fields

* **Throw an error in case if path not found** - select the behavior in case when specified path not found.

#### Metadata fields description

* **Path** - Full path to a file or a folder

<details close markdown="block"><summary><strong>Input example</strong></summary>

```json
  {
      "path": "base_folder/inner_folder/file.any"
  }
```

</details>

<details close markdown="block"><summary><strong>Output example</strong></summary>

- Error response example

  ```json
  {
     "metadata":{
        "path":"/test/DeleteByPath/Document.docx"
     },
     "result":"path_lookup/not_found/...",
     "error":{
        ".tag":"path_lookup",
        "path_lookup":{
           ".tag":"not_found"
        }
     }
  }
```

- Successful response

```json
{
   "metadata":{
      ".tag":"file",
      "name":"Document.docx",
      "path_lower":"/test/deletebypath/document.docx",
      "path_display":"/test/DeleteByPath/Document.docx",
      "id":"id:o0yGDTvyrFAAAAAAAAAAIw",
      "client_modified":"2020-03-31T13:32:00Z",
      "server_modified":"2020-03-31T13:32:01Z",
      "rev":"015a22697b3373f000000013a1ecc50",
      "size":10982,
      "is_downloadable":true,
      "content_hash":"8424108d60c2a77a6c36355e4a974882a79ca4ecd25a611f0c0b68713d31a044"
   },
   "result":"deleted"
}
```

</details>

### Create Folder

Create new folder in provided `path`. Path should contains folder name:

{% include img.html max-width="100%" url="img/create-folder.png" title="Create Folder" %}

#### Input fields description

  * **Conflict Behaviour** - behaviour in case folder already exists. Default: `Fail`. Options: `Fail`, `Rename`, `Skip`.
      1. `Fail` - fails if folder with same name already exists under provided `path`
      2. `Rename` - rename folder if folder with same name already exists under provided `path`. Examples: `exists` -> `exists (1)`, `exists (1)` -> `exists (1) (1)`
      3. `Skip` - ignore error for already existing folder, returns `{}` if selected

#### Metadata fields description

  * **Path** - Path to to folder where new folder will be created. Use empty string or `/` for root

<details close markdown="block"><summary><strong>Input example</strong></summary>

```json
{
    "path": "/test/create/folder"
}
```

</details>

<details close markdown="block"><summary><strong>Output example</strong></summary>

  - Successful response

```json
{
    "name": "Folder",
    "path_lower": "/test/create/folder",
    "path_display": "/test/create/Folder",
    "id": "id:U6e6XFFVGvAAAAAAAAAAlw"
}
```

</details>

## Known Limitations

1. Maximal possible size for an attachment is 10 MB.
2. Attachments mechanism does not work with [Local Agent Installation](/guides/vpn-agent).
