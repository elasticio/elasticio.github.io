---
title: Channelgitisor component
layout: article
section: Utility Components
---

The ChannelAdvisor component for the [elastic.io platform](http://www.elastic.io).

The component designed to work with ChannelAdvisor platform which implement the [OData v4
specification](http://www.odata.org).

# Authentication
Supports the [Developer Console Token](https://developer.channeladvisor.com/authorization/developer-console-token 'Developer Console Token') type of authorization.
Prerequisites:
-  Valid developer key and password.
-  Access to login to desired ChannelAdvisor accounts with permission to grant API access.

# Triggers
## Get Objects Polling
Get objects which have recently been modified or created.

All types of objects programmatically detectable are covered.  When selecting this trigger, the first input that must be configured is **Object type to fetch**.  This dropdown when opened will produce a list of all object types on the system.

This trigger relies on the service implementing OData's delta links. Not all services support this.

### Technical Notes
* Time range options are not supported.
* Standardized `isNew`,`createdOn` and `modifiedOn` not included in
output.
* This trigger could not be tested directly but can the code path can be tested through dynamics CRM component
* This trigger will throw an exception if no delta links are provided.
* The schema of the snapshot stored by this trigger is
```
{
  "deltaLink": "string delta link"
}
```
* The first iteration will produce all the objects in the system.  Subsequent iterations will produce changes from the first iteration.
* This trigger makes one API call per invocation
* Does not produce metadata.

# Actions
## Lookup Object by Field
Given a field and a field value that matches exactly one record, find that matching record.

There are three configuration drop downs:
* **Object Type to Lookup**: All types of objects programmatically detectable are covered.  This drop down when opened will produce a list of all object types on the system.
* **Name of Field to Match**: Select a field to compare against.  Currently, this will return a list of all fields on the object selected in the `Object Type to Lookup` dropdown.
* **Allow Empty Criteria**: Should the lookup operation be skipped (i.e. this component becomes a No-op which emits the empty message) if all criteria are empty?

### Technical Notes
* All Objects Programmatically Detectable Covered.
* Shows all fields, not just unique fields.
* In metadata is dynamic where based on
  * The selected field, a type for the field is inferred
  * Allow Empty Criteria, the required attribute for the field is inferred
* OData has a complexity that in some values when placed in filters must be wrapped in quotes while others do not.  This action can query the OData metadata to learn which should be applied for this field.
* The schema of the snapshot stored by this action is
```
{
  "version": 1,   // Protect against schema revisions
  "fieldName": "Value selected from Name of Field to Match",   // Protect against changing config values
  "objectType": "Value selected from Object Type to Lookup",   // Protect against changing config value
  "operationType": "lookupObject",    // Protect against changing action
  "wrapFieldInQuotes": true/false   // Information learned from OData metadata document to correctly form request

}
```
* PseudoCode:
```
IF empty field value AND allowEmptyCriteria THEN
  emit empty object
ELSE
  CONST results = Fetch objects with value for field
  IF results.length !== 1 THEN
    Throw exception
  emit result
```
* One API call per invocation

## Upsert Object By ID
Update an existing entry with the id provided.  Otherwise create a new entry.

All types of objects programmatically detectable are covered.  When selecting this trigger, the first input that must be configured is **Object type to fetch**.  This dropdown when opened will produce a list of all object types on the system.

### Technical Notes
* All Objects Programmatically Detectable Covered.
* Adds an `isNew` flag to show update vs create
* Metadata is dynamic. The object structure is learned from OData metadata.  The ID field(s) are flagged with `(Primary Key)`
* OData has a complexity that in some values when placed PUT by ID calls must be wrapped in quotes while others do not.  This action can query the OData metadata to learn which should be applied for this field.
* The schema of the snapshot stored by this action is
```
{
  "version": 1,   // Protect against schema revisions
  "objectType": "Value selected from Object Type to Lookup",   // Protect against changing config value
  "operationType": "upsert",    // Protect against changing action
  "wrapFieldInQuotes": true/false   // Information learned from OData metadata document to correctly form request

}
```
* PseudoCode:
```
IF there is not a value for any key THEN
  make POST request to create object
ELSE IF there is a value for every key THEN
  make PATCH request to update object
ELSE
  throw error
END
```
* Limitation: [Does not work if the system can create objects based on an external key](https://github.com/elasticio/odata-component/issues/26)
* One API call per invocation

# Other Limitations
* [Sometimes there are false positive when verifying credentials](https://github.com/elasticio/odata-component/issues/25)
* [List of selectable object types for an action/trigger don't reflect that some object types are readonly or not modifiable/deletable](https://github.com/elasticio/odata-component/issues/20)
* [Metadata does not expose the ids of linked objects as fields](https://github.com/elasticio/odata-component/issues/19)
* Not successfully tested on local agent

# Configuration Info
## Required environment variables
No environment variables are required for deployment.

## Version and compatibility information
This component interacts with OData version 4.
