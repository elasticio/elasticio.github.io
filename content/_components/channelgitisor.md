---
title: ChannelAdvisor component
layout: article
section: Utility Components
---
---
## Description

The ChannelAdvisor component for the platform. Is is designed to work with ChannelAdvisor platform which implement the [OData v4 specification](http://www.odata.org).

## Requirements

### Environment variables

No environment variables are required for deployment.

### Version and compatibility information
This component interacts with OData version 4.

## Credentials

Supports the [Developer Console Token](https://developer.channeladvisor.com/authorization/developer-console-token 'Developer Console Token') type of authorization. Prerequisites are valid developer key and
password in addition to the access to login to desired ChannelAdvisor accounts
with permission to grant API access. Here is the list of values:

*   `Application Client Id`
*   `Application Client Secret`
*   `Application Refresh Token`
*   `The URL of the OData service to consume`
*   `Print OAuth Token` - for debugging purposes


## Triggers

### Get Objects Polling
Get objects which have recently been modified or created.

All types of objects programmatically detectable are covered.  When selecting
this trigger, the first input that must be configured is **Object type to fetch**.
This drop-down when opened will produce a list of all object types on the system.

This trigger relies on the service implementing OData's delta links. Not all
services support this.

### Technical Notes
*   Time range options are not supported.
*   Standardized `isNew`,`createdOn` and `modifiedOn` not included in output.
*   This trigger could not be tested directly but can the code path can be tested through dynamics CRM component
*   This trigger will throw an exception if no delta links are provided.
*   The schema of the snapshot stored by this trigger is `{"deltaLink": "string delta link"}`
*   The first iteration will produce all the objects in the system.  Subsequent iterations will produce changes from the first iteration.
*   This trigger makes one API call per invocation
*   Does not produce metadata.

## Actions

### Lookup Object by Field
Given a field and a field value that matches exactly one record, find that matching record.

There are three configuration drop-downs:
*   **Object Type to Lookup**: All types of objects programmatically detectable are covered.  This drop down when opened will produce a list of all object types on the system.
*   **Name of Field to Match**: Select a field to compare against.  Currently, this will return a list of all fields on the object selected in the `Object Type to Lookup` drop-down.
*   **Allow Empty Criteria**: Should the lookup operation be skipped (i.e. this component becomes a No-op which emits the empty message) if all criteria are empty?

### Technical Notes
*   All Objects Programmatically Detectable Covered.
*   Shows all fields, not just unique fields.
*   In metadata is dynamic where based on
    *   The selected field, a type for the field is inferred
    *   Allow Empty Criteria, the required attribute for the field is inferred
*   OData has a complexity that in some values when placed in filters must be wrapped in quotes while others do not.  This action can query the OData metadata to learn which should be applied for this field.
*   The schema of the snapshot stored by this action is

```json
{
  "version": 1,
  "fieldName": "Value selected from Name of Field to Match",
  "objectType": "Value selected from Object Type to Lookup",
  "operationType": "lookupObject",
  "wrapFieldInQuotes": true/false
}
```

*   PseudoCode:

```
IF empty field value AND allowEmptyCriteria THEN
  emit empty object
ELSE
  CONST results = Fetch objects with value for field
  IF results.length !== 1 THEN
    Throw exception
  emit result
```

*   One API call per invocation

### Upsert Object By ID
Update an existing entry with the id provided.  Otherwise create a new entry.

All types of objects programmatically detectable are covered.  When selecting
this trigger, the first input that must be configured is **Object type to fetch**.
This drop-down when opened will produce a list of all object types on the system.

### Technical Notes
*   All Objects Programmatically Detectable Covered.
*   Adds an `isNew` flag to show update vs create
*   Metadata is dynamic. The object structure is learned from OData metadata.  The ID field(s) are flagged with `(Primary Key)`
*   OData has a complexity that in some values when placed PUT by ID calls must be wrapped in quotes while others do not.  This action can query the OData metadata to learn which should be applied for this field.
*   The schema of the snapshot stored by this action is

```json
{
  "version": 1,
  "objectType": "Value selected from Object Type to Lookup",
  "operationType": "upsert",
  "wrapFieldInQuotes": true/false
}
```

*   PseudoCode:

```
IF there is not a value for any key THEN
  make POST request to create object
ELSE IF there is a value for every key THEN
  make PATCH request to update object
ELSE
  throw error
END
```

*   Limitation: Does not work if the system can create objects based on an external key
*   One API call per invocation

## Known Limitations

*   Sometimes there are false positive when verifying credentials
*   List of selectable object types for an action/trigger don't reflect that some object types are read-only or not modifiable/deletable
*   Metadata does not expose the ids of linked objects as fields
*   Not successfully tested on local agent
