---
title: Google BigQuery Component
layout: component
section: Database components
description: Integration component to interact with Google BigQuery.
icon: google-bigquery.png
icontext: Google BigQuery component
category: Google BigQuery component
createdDate: 2020-08-28
updatedDate: 2020-10-20
---

## Latest changelog

**1.0.3 (October 20, 2020)**

* Update sailor version to 2.6.17

> To see the full **changelog** please use the following [link](changelog).

## Description

Integration component to interact with Google BigQuery using
`@google-cloud/bigquery` client library version `5.2.0` (API).

## Completeness Matrix

The [component completeness](completeness-matrix) matrix gives the technical
details about Salesforce objects this component covers.

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

#### Action Limitations

The query [options](https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query#queryrequest) are an experimental feature and correct behavior is not guaranteed. Only `query`, `location`, `dryRun`, `useQueryCache`, `useLegacySql`, `parameterMode`,`maximumBytesBilled` options were tested.

## BigQuery API and Documentation links

[BigQuery documentation](https://cloud.google.com/bigquery/docs)
