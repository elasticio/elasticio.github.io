---
title: Microsoft-dynamics-crm component
layout: article
section: CRM Components
---


Connects to Products in the Microsoft Dynamics/NAV Family Via the OData API which use Authorization grant

# Dynamics Remarks
See [`DynamicsCrmRemarks.md`](/Documentation/DynamicsCrmRemarks.md).

# Authentication
See the file [`ConfiguringAnODataAppForDynamicsOnAzureActiveDirectory.md`](/Documentation/ConfiguringAnODataAppForDynamicsOnAzureActiveDirectory.md)
for details on this process.

# Triggers
## Get Objects Polling
Get objects which have recently been modified or created.

All Objects Programmatically Detectable Covered.  Time range options not
supported, Standardized `isNew`,`createdOn` and `modifiedOn` not included in
output.

# Actions
## Lookup Object by Field(s)
Given a set of criteria which matches exactly one record, find that matching record.

All Objects Programmatically Detectable Covered. Requires a sample object to
exist to infer schema. Shows all fields, not just unique fields.  Does not
necessarily understand type for field.

## Upsert Object By ID
Update an existing entry if the id provided.  Otherwise create a new entry.

All Objects Programmatically Detectable Covered. Requires a sample object to
exist to infer schema.  Does not inform following components if new.

# Legacy Behavior
See the file [`DocumentationOnLegacyBehavior.md`](/Documentation/DocumentationOnLegacyBehavior.md)
for details.

# Configuration Info
## Required environment variables
`EIO_REQUIRED_RAM_MB` must be set to `512`.  This is because the metadata file for the service is large enough that it requires additional RAM to be parsed.

For the local testing (e.g. spec-integration) the following environment variables are required:
* `RESOURCE`
* `OAUTH_CLIENT_ID`
* `OAUTH_CLIENT_SECRET`
* `ODATA_API_ROOT_LOCATION`
* `OAUTH_TOKEN`
* `CONTACT_TO_LOOKUP_FIRST_NAME`
* `CONTACT_TO_LOOKUP_TOO_MANY_LAST_NAME`

## Version and compatibility information
This component interacts with OData version 4.  It has been
tested with
```
Microsoft Dynamics 365

Server version: 9.0.1.569 (DB 9.0.1.569)
Client version (Last Commit Version): 1.2.24-180302-013059
Build Timestamp: 3/1/2018 5:41:10 PM
Org name: eiosales
Session Id: 3877d450-5720-4bcd-9fe9-a2af1bbb4bba
Time: 3/19/2018 5:03:37 PM
```

[npm-image]: https://badge.fury.io/js/microsoft-dynamics-crm.svg
[npm-url]: https://npmjs.org/package/microsoft-dynamics-crm
[daviddm-image]: https://david-dm.org/elasticio/microsoft-dynamics-crm.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/elasticio/microsoft-dynamics-crm
[circle-image]: https://circleci.com/gh/elasticio/microsoft-dynamics-crm.svg?style=svg&circle-token=8ba933a24eebd8db04c1c1d420389e4fbafcb78c
[circle-url]: https://circleci.com/gh/elasticio/microsoft-dynamics-crm
