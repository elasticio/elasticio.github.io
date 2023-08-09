---
layout: component
title: Freshworks component
section: Utility components
description: Freshworks Component is designed to connect with different Freshworks products using API
category: freshworks
icon: freshworks.png
icontext: Freshworks component
ComponentVersion: 1.1.0
updatedDate: 2023-08-02
---

{{page.description}}

## API version

Current release of component tested with following Freshworks products API versions:
 * **Freshdesk** - [v2.0](https://developers.freshdesk.com/api/#introduction)

## Credentials

Component credentials configuration fields:

* **Freshworks product** (dropdown, required) - Select one of supported Freshworks products:
  * Freshdesk - Customer Service Software
* **API Base URI** (string, required) - URL to your product, different for each product, in most cases looks like this:
  * **Freshdesk** - **https://`domain`.freshdesk.com/** where `domain` is your domain name
* **API key** (string, required) - Can be found in your profile settings page

## Triggers

### Get New and Updated Objects Polling

Retrieve all the updated or created objects within a given time range.

#### Configuration Fields

* **Object Type** - (string, required): Object-type to lookup on. E.g `Ticket`.
* **Time stamp field to poll on** - (dropdown, required): Select which date will be used to track files - `Last Modified` or `Created`
* **Emit Behavior** - (dropdown, optional, default `Emit individually`): Defines the way result objects will be emitted, one of `Emit page` or `Emit individually`.
* **Page Size** - (number, optional, defaults to 100, max 100): Indicates the size of pages to be emitted per message
* **Start Time** - (string, optional): The timestamp to start polling from (inclusive) - using ISO 8601 Date time utc format - YYYY-MM-DDThh:mm:ssZ. Default value is the beginning of time (January 1, 1970 at 00:00).
* **End Time** - (string, optional): The timestamp to stop polling (exclusive) - using ISO 8601 Date time utc format - YYYY-MM-DDThh:mm:ssZ. Default value is flow execution time.

#### Input Metadata

There is no input metadata in this trigger.

#### Output Metadata

Depends on `Emit behavior` field:
 * If `Emit behavior` field is equal to `Emit page` - object with property `results` that contains array of objects
 * If `Emit behavior` field is equal to `Emit individually`, object information will fulfill whole message

#### Limitations

* Freshdesk:
   - In first flow execution (when snapshot is empty) component will use `List All` endpoint (for example - [List All Tickets](https://developers.freshdesk.com/api/#list_all_tickets)) to get maximum records.
   - `List All Tickets` is limited to 9000 records, other Object Types unlimited.
   - Following flow executions (when snapshot is present) will use `Filter` endpoint (for example - [Filter Tickets](https://developers.freshdesk.com/api/#filter_tickets))
   - `Filter` endpoint is limited to 300 records
   - For retrieve sample `Page Size` reduced to 10 and component will stop after emitting first page

## Actions

### Delete Object By ID

Delete an object by a provided ID.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to upsert. E.g `Ticket`.
* **Emit strategy when object not found** - (dropdown, optional, `Emit nothing` by default) - select one of options to handle case when file not exist:
  * **Emit nothing** - component will not produce any messages
  * **Emit an empty object** - result will be an empty object: `{}`
  * **Throw an error** - error will be thrown
* **Hard delete (Contacts only)** - (checkbox, optional) - Applies to Freshdesk Contacts only. When checked, two API calls will be made - a safe delete followed by a hard delete.
Hard delete a contact to completely remove it from the portal. Can be used for GDPR compliance. A contact **must not** be soft-deleted for the action to process correctly!

#### Input Metadata

* **ID** - (string, required): ID of the object to lookup by.

#### Output Metadata

Depending on the `Emit strategy when object not found` configuration an output message can be either empty (`{}`) or:
* **ID** - (string, optional): ID of the object to lookup by.

### Lookup Object By ID (at most one)

Search for object by a provided ID. There should be either 1 (found) or 0 (not found) results.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to upsert. E.g `Ticket`.
* **Allow criteria to be omitted** - (checkbox, optional): In case checkbox is unchecked - an error will be thrown when object id is missing in metadata, if it is checked - an empty object will be returned instead of throwing an error.
* **Allow Zero Results** - (checkbox, optional): In case checkbox is unchecked - an error will be thrown when no objects were found. If it is checked - an empty object will be returned instead of throwing an error.

#### Input Metadata

* **ID** - (string, optional): ID of the object to lookup by.

#### Output Metadata

Result object of view (find) operation.

### Lookup Objects (plural)

Lookup a set of objects using a defined criteria list. Can be emitted in different ways.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object type to lookup on. E.g `Contacts`.

* **Emit Behavior** - (dropdown, required): Defines the way result objects will be emitted, one of `Emit all`, `Emit page` or `Emit individually`.
* **Expert Mode for Filter Expression** - (checkbox, optional): If checked, any query can be entered in metadata field `Filter Expression`. For advanced users.
* **Number of search terms** (number, optional) - text field to specify the number of search terms (positive integer number [1-99] or 0).

#### Input Metadata

If configuration field `Expert Mode for Filter Expression` is enabled:
* **Filter Expression** - (strings, required):  If checked, any query can be entered here. For advanced users.

  Example for Freshdesk Contacts: `unique_external_id:null AND created_at:>'2022-07-13'`, [more info](https://developers.freshdesk.com/api/#filter_contacts)

If configuration field `Expert Mode for Filter Expression` is disabled:
Depend on configuration field `Number of search terms`. If = `N` - N search term and N-1 logical operators will be generated, if = 0 - any search term will be generated.

Example for Freshdesk product where `Number of search terms = 2`:

```json
{
  "sTerm_1": {
    "fieldName": "unique_external_id",
    "condition": ":",
    "fieldValue": "null"
  },
  "link_1_2": "and",
  "sTerm_2": {
    "fieldName": "created_at",
    "condition": ":>",
    "fieldValue": "2022-07-13"
  }
}
```

If selected `Emit Behavior` - `Emit page` is selected - additional fields may be added (if the Freshworks product and selected `Object Type` support it):

* **Page Size** - (number, defaults to 1): Indicates how many records should be fetched.
* **Page Number** - (number, defaults to 1): Indicates page number to be fetched.

In some cases, here may be only one filed to search, for example in Freshdesk if selected `Object Type` is `Company`, there will be only one field for input metadata:

* **Name** - (string, optional): Search for a company using its name, case insensitive, can be looked up using part of the name that starts with provided string

#### Output Metadata

For `Emit All` and `Emit Page` mode: An object, with key `results` that has an array as its value.
For `Emit Individually` mode: Each object which fill the entire message.

#### Limitations

* Freshdesk:

  * Currently for Object Types `Contact` and `Ticket` each API call can get up to 30 records, in total maximum results is 300 records (API allows to get 10 pages with 30 records each)
  * For Object Type `Company` if you provide name to search, there will be additional API call for each record to extract full information, deleted companies will not be included in the results

### Make Raw Request

Executes custom request.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource **relative to the base URL** or full path to it.
<br>Base URL to different products:
  * Freshdesk - **httрs://domain.freshdesk.com/api/v2/** where **httрs://domain.freshdesk.com** is "API Base URI" from credentials and **api/v2/**static part of supported API version.

  For example: to get user information from freshdesk you need to put `/agents/me` or `httрs://domain.freshdesk.com/api/v2/agents/me` in this field
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `DELETE`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.


### Upsert Object

Updates (if record found) or creates a new object.

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to upsert. E.g `Ticket`.

#### Input Metadata

* **ID** - (string, optional): ID of the object to upsert.
And dynamically generated fields according to chosen `Object Type`.

#### Output Metadata

Result object from upsert.

## Limitations

* Freshdesk:
   - [Rate Limit](https://developers.freshdesk.com/api/#ratelimit)
   - Current version of component does't support `avatar` and `attachments` fields
