---
title: Git-Protocol component
layout: component
section: Protocol components
description:
icon: git-protocol.png
icontext: Git-Protocol component
category: Git-Protocol
ComponentVersion: 1.2.5
updatedDate: 2024-09-04
---

## Table of Contents
* [General information](#general-information)
    * [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
    * [Create Commit](#create-commit)
      * [Config Fields](#config-fields)
      * [Input Metadata](#input-metadata)
      * [Output Metadata](#output-metadata)
    * [Read from Branch](#read-from-branch)
      * [Config Fields](#config-fields)
      * [Input Metadata](#input-metadata)
      * [Output Metadata](#output-metadata)

## General information
### Description
Git protocol component for the [elastic.io platform](http://www.elastic.io "elastic.io platform")

## Credentials
- Passphrase (string/text box, optional): Passphrase to use to authenticate.
- Private SSH Key (string/text box, required): Private SSH key to use to authenticate. Example:

```
-----BEGIN RSA PRIVATE KEY-----
MBJH8a7JHVHg67JKB98yNB7y8776867dsfaAUG925ZwqePrSWDL8ikHB
{...}
jnJHBGH68t76ghvdsaHJVH66657VCHHcEZD+aVRKDQwjIosXR8r88b==
-----END RSA PRIVATE KEY-----
```

<details>
  <summary>Technical details</summary>
The only field available on Elastic's UI to provide a secure input is a 'PasswordFieldView' view class. The problem is that it replaces new line characters with spaces.
This method modifies the key in the following way. E.g. the key is:

```
   -----BEGIN RSA PRIVATE KEY-----
   BASE64_ENCODED_DATA_LINE_1
   BASE64_ENCODED_DATA_LINE_2
   BASE64_ENCODED_DATA_LINE_3
   -----END RSA PRIVATE KEY-----
```

The platform will then transform the key so:

-----BEGIN RSA PRIVATE KEY----- BASE64_ENCODED_DATA_LINE_1 BASE64_ENCODED_DATA_LINE_2 BASE64_ENCODED_DATA_LINE_3 -----END RSA PRIVATE KEY-----

The code in the component replaces all the space characters (except for in the header and footer lines) with new line characters
</details>

- Public SSH Key (string/text box, required): Public SSH key to use to authenticate. Example:

```
ssh-rsa AAAAB3NzaC1yc2EAAAAD{.....}kf0vBMStV user@exampleHost
```

Please note that you need to add your SSH key to the server (GiHub, GitLab, etc.) first!
- Service URL (string, required): Url of the service to test the SSH key for validity. Example:


```
git@github.com
```

- Git Project (string, required): Part of the git repo URL that is after the service URL. (e.g. If the Git Project is elasticio/git-protocol-component.git and the Service URL is git@github.com, then the full git URL should be git@github.com:elasticio/git-protocol-component.git

## Actions
### Create Commit
This action does the equivalent to
- git clone
- git checkout <branch>
- git add ...
- git rm -r ... (if specified, optional)
- git commit
- git push

#### Config Fields

- File Source. One of the following:
  - Maester. Elastic's internal object storage
  - URL. Internet (must be publicly available. Authentication mechanisms are not supported)

#### Input Metadata

- Git Branch (string, required): Identifies an existing branch in the git repo on which to create the commit. Must exist before starting the action!
- Commit message (string, required)
- Commit Author (object, required)
  - Name (string, required)
  - Email (string, required)
  - Date (string, optional: default to now). Time (in seconds from epoch) when the action happened
- Commit Committer (object, optional)
  - Name (string, required)
  - Email (string, required)
  - Date (string, optional: default to now). Time (in seconds from epoch) when the action happened
- Files to add to commit (array, required)
  - File Source Meta (string, required): Dynamically generated. Will be one of the following depending on File Source chosen in the configuration:
    - Configuration `Maester Object ID or Maester URL`: - either ID of the object in Maester (e.g. `797bb70d-1590-4136-b9db-2abb01983d92`) or the full Maester object URL (e.g. `http://maester-service.platform.svc.cluster.local:3002/objects/dbceb3f1-6d18-4eb4-9f08-2437b6ef685f?storage_type=maester`))
    - Configuration `External URL`: External link to the file (e.g. `https://example.com/file.txt`). Must be publicly available. Authentication mechanisms are not supported
  - Filename + path (string, required): Location within the git repo to create the file
- Files to remove from the commit (array of strings, optional): List of files or file wildcards to remove as part of the commit. (equivalent to `git rm -r fileOne.txt fileTwo.txt someFolder`)

#### Output Metadata

* commitId - ID of the commit in the repo

### Read from Branch
This action reads the files from a Git repository and saves them in Maester (Elastic's internal object storage)

#### Config Fields

- Include hidden files: When selected, hidden files (starting with '.') are included. Otherwise they are skipped

#### Input Metadata

- Git Branch (string, required): Identifies an existing branch in the git repo from which to read
- Files to transfer (array of strings, required): List of files or file wildcards to read from the commit and transfer to Maester

#### Output Metadata

* commitId - ID of the commit in the repo

#### File patterns usage
Internally this library is being used to find the wildcards/patterns match: [https://www.npmjs.com/package/fast-glob](https://www.npmjs.com/package/fast-glob)

Examples:
1. Match all the files including all subdirectories (also note that 'Include hidden files' configuration field might affect the result): `'**'`
2. Match all the files of js type: `'**/*.js'`
3. Match a single file in the root folder: `'component.json'`
4. Match all the files in the given 'lib' folder: `'lib/**'`

## Known limitations
1. Maester object created by Sailor's Lightweight message feature can not be read (to be precise - they will be processed but not decrypted)
2. The repository must be initialized before executing the `Create Commit` action. This means that the repository must contain at least one commit (initial commit).
