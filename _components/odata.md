---
title: Odata component
layout: article
section: Utility Components
---


OData with OAuth component for the [elastic.io platform](http://www.elastic.io).

A component designed to work with generic APIs which implement the [OData v4
specification](http://www.odata.org).

# Authentication
Supports the following forms:
* No Auth
* Basic Auth
* API key auth

# Triggers
## Get Objects Polling
Get objects which have recently been modified or created.

All types of objects programmatically detectable are covered.  When selecting this trigger, the first input that must be configured is **Object type to fetch**.  This dropdown when opened will produce a list of all object types on the system.

This trigger relies on the service implementing OData's delta links.  Not all services (e.g. TripPin and NAV/Business Center) support this.

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
* TripPin does not work for updating/creating information.
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
This component interacts with OData version 4.  It has been
tested with the [OData TripPin Reference Service](http://www.odata.org/odata-services/).

[npm-image]: https://badge.fury.io/js/odata-component.svg
[npm-url]: https://npmjs.org/package/odata-component
[travis-image]: https://travis-ci.org/elasticio/odata-component.svg?branch=master
[travis-url]: https://travis-ci.org/elasticio/odata-component
[daviddm-image]: https://david-dm.org/elasticio/odata-component.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/elasticio/odata-component

# Development Information
## OData TripPin Sample Service
The OData consortium has created a sample OData service called TripPin.  The
integration tests for this repo are designed to run against this service.  This
service has numerous bugs and some of the checks that would normally be tested
has to be reduced in these unit tests.

Resources
* [TripPin Intro](http://www.odata.org/blog/trippin-new-odata-v4-sample-service/)
* [TripPin Sample Calls](http://www.odata.org/odata-services/)
* [Request A Key To Identify Yourself to Trippin](http://www.odata.org/odata-services/service-usages/request-key-tutorial/)

## NAV/Business Central
Instructions are in [`documentation/NAV - Business Central Instructions`](documentation/NAV%20-%20Business%20Central%20Instructions.md).

## Running Integration Tests
For the local testing (e.g. spec-integration) the following environment variables are required:
* `TRIPPIN_RESOURCE_SERVER_URL` - Obtain a sample TripPin key and place the provided URL with key into this variable
* `TRIPPIN_CONTACT_TO_LOOKUP_FIRST_NAME` - Sample contact name to lookup
* `TRIPPIN_CONTACT_TO_LOOKUP_ID` - Sample contact id to lookup


This segment of tests are designed to run against Microsoft NAV/Business Central.  In theory they should work on any OData system that uses HTTP Basic auth for authentication and has an object with one key and one modifiable string field:
* `BC_RESOURCE_SERVER_URL` - Url to the root of the OData service on your instance
* `BC_USERNAME="NAVADMIN"` - Username for authentication
* `BC_WEB_SERVICE_ACCESS_KEY` - Password for authentication
* `BC_TO_LOOKUP_FIELD_NAME` - Name of modifiable string field
* `BC_PRIMARY_KEY` - Primary Key of the object
* `BC_TO_LOOKUP_FIELD_VALUE` - Sample value of string field that should match exactly one result
* `BC_TO_LOOKUP_ID` - ID value of the object with field value of `BC_TO_LOOKUP_FIELD_VALUE`
* `BC_OBJECT_TYPE` - Object type to test

These environment variables must be placed in a [`.env`
file](https://www.npmjs.com/package/dotenv).  The integration tests can be run
through npm with the cli command `npm run integration-test` or by the mocha test
running capabilities of your IDE.  The integration tests are located in `spec-integration`.

### Example .env file
*(Replace `<IncludeYourValueHere>` with a value specific for your system)*
```
TRIPPIN_RESOURCE_SERVER_URL="http://services.odata.org/TripPinRESTierService/<IncludeYourValueHere>/"
TRIPPIN_CONTACT_TO_LOOKUP_FIRST_NAME=Russell
TRIPPIN_CONTACT_TO_LOOKUP_ID=russellwhyte

BC_RESOURCE_SERVER_URL="https://<IncludeYourValueHere>:7048/nav/odatav4"
BC_USERNAME="NAVADMIN"
BC_WEB_SERVICE_ACCESS_KEY="<IncludeYourValueHere>"
BC_TO_LOOKUP_FIELD_NAME="Name"
BC_PRIMARY_KEY="No"
BC_TO_LOOKUP_FIELD_VALUE="UniqueValue"
BC_TO_LOOKUP_ID="12"
BC_OBJECT_TYPE="CustomerCardService"
```
