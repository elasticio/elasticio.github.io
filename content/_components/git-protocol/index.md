---
title: Git-Protocol component
layout: component
section: Protocol components
description: This component provides Git integration, enabling the execution of fundamental Git commands within integration flows.
icon: git-protocol.png
icontext: Git-Protocol component
category: Git-Protocol
ComponentVersion: 1.3.0
updatedDate: 2026-02-05
---

## Table of Contents
* [General Information](#general-information)
    * [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
    * [Create Commit](#create-commit)
    * [Read from Branch](#read-from-branch)
* [Known Limitations](#known-limitations)

## General information

### Description

{{page.description}}

## Credentials

- **Passphrase** (optional): The passphrase for your private SSH key, if applicable.
- **Private SSH Key** (required): Your private SSH key for authentication with the Git service.
Example:
```
-----BEGIN RSA PRIVATE KEY-----
MBJH8a7JHVHg67JKB98yNB7y8776867dsfaAUG925ZwqePrSWDL8ikHB
{...}
jnJHBGH68t76ghvdsaHJVH66657VCHHcEZD+aVRKDQwjIosXR8r88b==
-----END RSA PRIVATE KEY-----
```
<details>
  <summary>Technical Details on Key Formatting</summary>
  The platform UI processes secure inputs in a way that may replace newline characters with spaces. This component automatically sanitizes the private key by restoring the correct newline formatting, ensuring its validity for SSH authentication.
</details>
<br>

- **Public SSH Key** (required): Your public SSH key. This key must be registered with your Git provider (e.g., GitHub, GitLab) to grant access.
Example:
```
ssh-rsa AAAAB3NzaC1yc2EAAAAD{.....}kf0vBMStV user@exampleHost
```
> **Please Note:** Your public SSH key must be added to your Git provider (e.g., GitHub, GitLab) before using this component.

- **Service URL** (required): The base URL for the Git service (e.g., `git@github.com`).
- **Git Project** (required): The repository path. For a repository URL like `git@github.com:elasticio/git-protocol-component.git`, this value would be `elasticio/git-protocol-component.git`.

### Technical details

The only field available on Platform UI to provide a secure input is a 'PasswordFieldView' view class. The problem is that it replaces new line characters with spaces.
This method modifies the key in the following way. E.g. the key is:

```
   -----BEGIN RSA PRIVATE KEY-----
   BASE64_ENCODED_DATA_LINE_1
   BASE64_ENCODED_DATA_LINE_2
   BASE64_ENCODED_DATA_LINE_3
   -----END RSA PRIVATE KEY-----
```

The platform will then transform the key so:
```
-----BEGIN RSA PRIVATE KEY----- BASE64_ENCODED_DATA_LINE_1 BASE64_ENCODED_DATA_LINE_2 BASE64_ENCODED_DATA_LINE_3 -----END RSA PRIVATE KEY-----
```
The code in the component replaces all the space characters (except for in the header and footer lines) with new line character

## Triggers

This component has no trigger functions. This means it will not be accessible to select as a first component during the integration flow design.

## Actions

### Create Commit

This action executes a sequence of Git commands: `clone`, `checkout`, `add`, `rm` (if specified), `commit`, and `push`.

#### Configuration Fields

- **File Source**: Defines the source of the files for the commit.
  - **Maester**: Elastic.io's internal object storage.
  - **URL**: A publicly accessible URL. Authentication is not supported.
- **Beautify JSON files** (optional): When enabled, this option formats `.json` files for improved human readability using standard indentation, which enhances the clarity of diffs in version control.

#### Input Metadata

- **Git Branch** (string, required): The target branch for the commit. The branch must already exist.
- **Commit Message** (string, required): A descriptive message for the commit.
- **Commit Author** (object, required):
  - **Name** (string, required)
  - **Email** (string, required)
  - **Date** (integer, optional): The author's action timestamp (seconds since epoch). Defaults to the current time.
- **Commit Committer** (object, optional):
  - **Name** (string, required)
  - **Email** (string, required)
  - **Date** (integer, optional): The committer's action timestamp (seconds since epoch). Defaults to the current time.
- **Files to Add** (array, required): An array of files to add or update in the commit.
  - **Source** (string, required): The location of the file's content, corresponding to the `File Source` configuration.
    - For **Maester**: The object ID (e.g., `797bb70d-1590-4136-b9db-2abb01983d92`) or the full Maester URL.
    - For **URL**: The public URL of the file.
  - **Path** (string, required): The full destination path and filename for the file within the repository.
- **Files to Remove** (array of strings, optional): An array of file paths or wildcards specifying files to be removed from the repository (equivalent to `git rm -r ...`).

#### Output Metadata

- **commitId**: The SHA-1 hash of the successfully created commit.

### Read from Branch

This action retrieves files from a specified branch in a Git repository and stores them in Maester, the elastic.io internal object storage.

#### Configuration Fields

- **Include hidden files**: If enabled, the action will include files and directories that start with a period (`.`).

#### Input Metadata

- **Git Branch** (string, required): The name of an existing branch from which to read files.
- **Files to transfer** (array of strings, required): An array of file paths or glob patterns used to select the files to be transferred to Maester.

#### Output Metadata

The action outputs an array of metadata objects, where each object represents a file retrieved from the repository.

#### File patterns usage

This component utilizes `fast-glob` for matching file patterns. The following examples illustrate common usage:
- `'**'`: Matches all files across all subdirectories.
- `'**/*.js'`: Matches all files with a `.js` extension.
- `'component.json'`: Matches a single file in the root directory.
- `'lib/**'`: Matches all files within the `lib` directory.

## Known limitations
1. Objects stored in Maester via the Sailor's "Lightweight" message feature cannot be read by this component due to encryption limitations.
2. The `Create Commit` action can only be used on repositories that have been initialized and contain at least one existing commit.
3. **Concurrency:** When running multiple 'Create Commit' actions in parallel targeting the same branch, race conditions may occur during the `push` operation. If a parallel execution pushes a new commit to the remote branch while another execution is in progress, the latter may fail with a 'non-fast-forward' error because its local history is now outdated. This component currently does not support automatic rebasing or retries in such scenarios.
