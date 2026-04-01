---
title: Google BigQuery component
layout: component
section: Database components
description: Integration component to interact with the Google BigQuery.
icon: google-bigquery.png
icontext: Google BigQuery component
category: bigquery
ComponentVersion: 1.1.0
updatedDate: 2023-02-10
---

## Table of Contents
* [General information](#general-information)
   * [Description](#description)
   * [Completeness Matrix](/components/google-bigquery/technical-notes#completeness-matrix)
   * [API version / SDK version](#api-version--sdk-version)
* [Credentials](#credentials)
* [Actions](#actions)
   * [Query](#query)
   * [Insert Rows as Stream](#insert-rows-as-stream)
* [BigQuery API and Documentation links](#bigquery-api-and-documentation-links)

## General Information
### Description

{{page.description}}

### API version / SDK version

The component uses `@google-cloud/bigquery` client library, version `5.2.0`.

## Credentials

`Service Account` - Set of credentials (project ID, private key, etc) provided by Google.

More information on how to generate credentials you can find [here](https://cloud.google.com/bigquery/docs/quickstarts/quickstart-client-libraries).

After you perform all authentication steps described above just copy and paste
content of an authentication JSON file as-is to the field **Service Account credentials**.

It should look like this:

```json
{
  "type": "service_account",
  "project_id": "projectname",
  "private_key_id": "ds67f57s6df5sd76f57s6df57sdf67sdf76df",
  "private_key": "PRIVATE_KEY",
  "client_email": "email",
  "client_id": "2348238472834782348723",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "cert_url"
}

```

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Query

Performs a query provided by user.

#### Expected input metadata

Input metadata include query options according to [documentations](https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query#queryrequest).
The `query` option is required.

```json
{
  "type": "object",
  "required": true,
  "properties": {
    "query": {
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
  "required": true,
  "properties": {
    "result": {
      "required": true,
      "type": "array"
    }
  }
}
```

#### Limitations

The query [options](https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query#queryrequest) are an experimental feature and correct behavior is not guaranteed. Only `query`, `location`, `dryRun`, `useQueryCache`, `useLegacySql`, `parameterMode`,`maximumBytesBilled` options were tested.

### Insert Rows as Stream

Inserts an array on rows into the table as stream.

#### Configuration Fields

* **Dataset** - (required, string) dataset to insert rows.
* **Table** - (required, string) table to insert rows.
* **Throw error if insert fails** - (required, checkbox) if selected a default error `PartialFailureError` will be thrown in case if insert fails. Otherwise, an object containing error details will be emitted.

#### Input metadata

Input metadata includes an array of json objects representing the table schema. There might be 1 or more objects in the array.

* **Rows** - (array, required) Array of JSON objects each representing a row.

Example:

Integrator Mode:
```
[{"comment": "Lorem ipsum"}, {"comment": "dolor"}]
```

Developer Mode:
```json
{
  "rows": [
    {
      "comment": "Lorem ipsum"
    },
    {
      "comment": "dolor"
    }
  ]
}
```

#### Output metadata

In case of a successful insert an object with an empty errors object inside will be emitted:
```json
{
  "errors": []
}
```
Otherwise, the errors object will contain all the errors with regard to all the rows being sent. E.g.:
```json
{
  "errors": [
    {
      "errors": [
        {
          "message": "no such field: commddent.",
          "reason": "invalid"
        }
      ],
      "row": {
        "commddent": "Lorem ipsum"
      }
    },
    {
      "errors": [
        {
          "message": "",
          "reason": "stopped"
        }
      ],
      "row": {
        "comment": "dolor"
      }
    }
  ]
}
```

## BigQuery API and Documentation links

* [BigQuery documentation](https://cloud.google.com/bigquery/docs)
