---
title: Microsoft Dynamics CRM component
layout: article
section: CRM Components
---


Connects to Products in the Microsoft Dynamics/NAV Family Via the OData API
which use Authorization grant.

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
tested with:

```
Microsoft Dynamics 365
Server version: 9.0.1.569 (DB 9.0.1.569)
Client version (Last Commit Version): 1.2.24-180302-013059
Build Timestamp: 3/1/2018 5:41:10 PM
```
