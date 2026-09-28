---
layout: component
title: Trumba component
section: Office components
description: The Trumba component connects your integration flows with the Trumba Calendar platform.
icon: trumba.png
icontext: Trumba component
category: trumba
ComponentVersion: 1.0.0
updatedDate: 2026-09-24
---

## Table of Contents

- [Description](#description)
- [Credentials](#credentials)
- [Triggers](#triggers)
  - [Get Canceled Events Polling](#get-canceled-events-polling)
  - [Get New and Updated Events Polling](#get-new-and-updated-events-polling)
  - [Get New and Updated Registrations Polling](#get-new-and-updated-registrations-polling)
- [Actions](#actions)
  - [Create or Update Event](#create-or-update-event)
  - [Delete Event](#delete-event)
  - [Get Attendees](#get-attendees)
  - [Get Calendar Info](#get-calendar-info)
  - [Get Event by ID](#get-event-by-id)
  - [Get Events](#get-events)
  - [Make Raw Request](#make-raw-request)

## Description

The **Trumba component** connects your integration flows with the Trumba Calendar platform. It enables polling for new, updated, and canceled events; tracking attendee registrations; querying calendar metadata and feeds; creating, updating, and canceling calendar events using standard iCalendar (`.ics`) protocols; and executing arbitrary raw HTTP requests against the Trumba API.

## Credentials

To authenticate with the Trumba API, configure the following credentials:

1. **Username** (required) – Your Trumba account username (email address).
2. **Password** (required) – Your Trumba account password. Trumba uses HTTP Basic authentication.
3. **Calendar Webname** (required) – The unique web name of your Trumba calendar (e.g., `mycalendar` in `https://www.trumba.com/calendars/mycalendar.json`). Used during credentials verification to confirm access to the calendar.
4. **Base URL** (optional) – Trumba API base URL. Defaults to `https://www.trumba.com`.

> **Please Note:** The Trumba account used must either own the calendar or be granted **"Can add, delete and change content"** permissions for that calendar.

## Triggers

### Get Canceled Events Polling

Regularly polls the Trumba calendar JSON feed (`/calendars/{calendarWebname}.json`) specifically for events that have been marked as canceled (`canceled: true`). Tracks previously emitted cancellations in the execution `snapshot` to avoid duplicate emissions.

#### Configuration Fields

- **Emit Behavior** (required) – Choose how canceled events are emitted:
  - `Emit individually` (default): Emits each canceled event as a separate message downstream.
  - `Emit pages`: Emits canceled events in pages of a configurable size, each formatted as `{ results: [...] }`.
  - `Emit all (array)`: Emits all canceled events in a single message `{ results: [...] }`.
- **Page Size** (optional, default `100`) – Number of events per page when using `Emit pages` mode.
- **Start Date / Time** (optional) – Date/time to start querying events from (e.g. `20260901` or `2026-09-01T00:00:00Z`). Defaults to the current date.
- **Lookahead Weeks** (optional, default `4`) – Number of weeks ahead to query events for.
- **Search Keywords** (optional) – Filter events by text search.
- **Filter View** (optional) – Name of a Trumba filter view to restrict events.
- **Category** (optional dropdown) – Dynamic dropdown populated from active calendar events (inspects both event `category` and `customFields` with `Category`/`Categories` label, supporting comma-separated multi-choice values).
- **Custom Filter Field** (optional dropdown) – Dynamic dropdown populated from calendar custom fields to filter by.

#### Output Example (Emit Individually)

```json
{
  "eventID": 1042,
  "title": "Strategy Workshop (Canceled)",
  "startDateTime": "2026-10-15T14:00:00",
  "endDateTime": "2026-10-15T16:00:00",
  "description": "Quarterly planning session - canceled due to scheduling conflicts.",
  "location": "Conference Room B",
  "webLink": "https://www.trumba.com/event/1042",
  "category": "Workshops",
  "canceled": true,
  "openSignUp": false,
  "registration": {},
  "customFields": [
    {
      "fieldID": 101,
      "label": "Presenter",
      "value": "Jane Doe"
    }
  ]
}
```

#### Output Example (Emit Pages / Emit All)

```json
{
  "results": [
    {
      "eventID": 1042,
      "title": "Strategy Workshop (Canceled)",
      "startDateTime": "2026-10-15T14:00:00",
      "endDateTime": "2026-10-15T16:00:00",
      "category": "Workshops",
      "canceled": true
    }
  ]
}
```

### Get New and Updated Events Polling

Regularly polls the Trumba calendar JSON feed (`/calendars/{calendarWebname}.json`) for new and updated events. Tracks event IDs and last-modified timestamps in the execution `snapshot` to avoid duplicate emissions.

#### Configuration Fields

- **Emit Behavior** (required) – Choose how events are emitted:
  - `Emit individually` (default): Emits each new or updated event as a separate message downstream.
  - `Emit pages`: Emits events in chunks/pages of a configurable size, each formatted as `{ results: [...] }`.
  - `Emit all (array)`: Emits all new or updated events as a single array inside `{ results: [...] }`.
- **Page Size** (optional, default `100`) – Number of events per page when using `Emit pages` mode.
- **Start Date / Time** (optional) – Date/time to start querying events from (e.g. `20260901` or `2026-09-01T00:00:00Z`). Defaults to current date.
- **Lookahead Weeks** (optional, default `4`) – Number of weeks ahead to query events for.
- **Search Keywords** (optional) – Filter events by text search.
- **Filter View** (optional) – Name of a Trumba filter view to restrict events.
- **Category** (optional dropdown) – Dynamic dropdown populated from active calendar events (inspects both event `category` and `customFields` with `Category`/`Categories` label, supporting comma-separated multi-choice values).
- **Custom Filter Field** (optional dropdown) – Dynamic dropdown populated from calendar custom fields to filter by.

#### Output Example (Emit Individually)

```json
{
  "eventID": 1001,
  "title": "Quarterly Planning Workshop",
  "startDateTime": "2026-10-01T09:00:00",
  "endDateTime": "2026-10-01T17:00:00",
  "description": "Cross-team quarterly planning session.",
  "location": "Conference Room A",
  "webLink": "https://www.trumba.com/event/1001",
  "category": "Meetings",
  "canceled": false,
  "openSignUp": true,
  "registration": {},
  "customFields": [
    {
      "fieldID": 101,
      "label": "Location Room",
      "value": "Room 402"
    }
  ]
}
```

#### Output Example (Emit Pages / Emit All)

```json
{
  "results": [
    {
      "eventID": 1001,
      "title": "Quarterly Planning Workshop",
      "startDateTime": "2026-10-01T09:00:00",
      "endDateTime": "2026-10-01T17:00:00",
      "category": "Meetings",
      "canceled": false
    }
  ]
}
```

### Get New and Updated Registrations Polling

Periodically polls Trumba's Registration Service (`/regservice/{calendarWebname}.csv`) for new and updated attendee registrations. Utilizes Trumba's `changedate` parameter and execution snapshots to incrementally deliver sign-ups without duplicates.

#### Configuration Fields

- **Event** (optional dropdown) – Dynamic dropdown populated with active calendar events to monitor registrations for.
- **Emit Behavior** (required) – Choose how attendee registrations are emitted:
  - `Emit individually` (default): Emits each registration as an individual message downstream.
  - `Emit pages`: Emits registrations in pages of a configurable size `{ results: [...] }`.
  - `Emit all (array)`: Emits all registrations in a single message `{ results: [...] }`.
- **Page Size** (optional, default `100`) – Number of registrations per page when using `Emit pages`.
- **Start Date / Time** (optional) – Date to start polling registrations from on the first run (e.g. `20260901` or `2026-09-01T00:00:00Z`).

#### Output Example (Emit Individually)

```json
{
  "eventID": 6001,
  "eventDescription": "Tech Conference 2026",
  "eventDateTime": "11/01/2026 10:00 AM",
  "attendeeName": "Carol Danvers",
  "emailAddress": "carol@example.com",
  "response": "Registered",
  "numberOfAttendees": 1,
  "organization": "Avengers Corp"
}
```

#### Output Example (Emit Pages / Emit All)

```json
{
  "results": [
    {
      "eventID": 6001,
      "eventDescription": "Tech Conference 2026",
      "eventDateTime": "11/01/2026 10:00 AM",
      "attendeeName": "Carol Danvers",
      "emailAddress": "carol@example.com",
      "response": "Registered",
      "numberOfAttendees": 1
    }
  ]
}
```

## Actions

### Create or Update Event

Create a new event or update an existing event on a Trumba calendar by submitting standard JSON fields. The action formats the event into an RFC 5545 iCalendar (`.ics`) payload and submits it via HTTP `PUT` with `delta=true` to Trumba's calendar service (`https://www.trumba.com/service/{calendarWebname}.ics?delta=true`). Using `delta=true` ensures existing calendar events are preserved rather than overwritten.

#### Configuration Fields

*There are no configuration fields for this action.*

#### Input Fields

- **Event Title** (required, `string`) – The title / summary of the event.
- **Start Date / Time** (required, `string`) – Start timestamp (e.g. `2026-11-15T10:00:00Z` or `2026-11-15`).
- **End Date / Time** (optional, `string`) – End timestamp. Defaults to start time + 1 hour if omitted (+ 1 day for all-day events).
- **All Day Event** (optional, `boolean`) – Set to `true` for all-day events.
- **Description** (optional, `string`) – Detailed description or notes.
- **Location** (optional, `string`) – Room, address, or venue name.
- **Category** (optional, `string`) – Category or tag for the event.
- **URL** (optional, `string`) – Web link associated with the event.
- **Event UID** (optional, `string`) – Unique event identifier. If provided, updates the existing event matching this UID; if omitted, generates a new UUID.

#### Example 1: Creating a Timed Event

**Input Message:**
```json
{
  "title": "Quarterly Strategy Session",
  "startDateTime": "2026-11-15T10:00:00Z",
  "endDateTime": "2026-11-15T12:00:00Z",
  "location": "Boardroom B",
  "description": "Executive strategy alignment.",
  "category": "Meetings"
}
```

**Output Message:**
```json
{
  "uid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Quarterly Strategy Session",
  "startDateTime": "2026-11-15T10:00:00.000Z",
  "endDateTime": "2026-11-15T12:00:00.000Z",
  "statusCode": 200,
  "response": "<Response><ResponseMessage>Success</ResponseMessage></Response>"
}
```

#### Example 2: Creating an All-Day Event

**Input Message:**
```json
{
  "title": "Company Holiday - Founder's Day",
  "startDateTime": "2026-12-01",
  "allDay": true,
  "description": "All offices closed in observance of Founder's Day.",
  "category": "Holidays"
}
```

#### Example 3: Updating an Existing Event by UID

**Input Message:**
```json
{
  "uid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Quarterly Strategy Session (Rescheduled)",
  "startDateTime": "2026-11-15T13:00:00Z",
  "endDateTime": "2026-11-15T15:00:00Z",
  "location": "Main Auditorium"
}
```

### Delete Event

Permanently deletes / cancels an event from a Trumba calendar by submitting its unique identifier (`uid`). The action formats an RFC 5545 cancellation payload (`METHOD:CANCEL`, `STATUS:CANCELLED`) and submits it via HTTP `PUT` with `delta=true` to Trumba's calendar service (`https://www.trumba.com/service/{calendarWebname}.ics?delta=true`). Using `delta=true` ensures only the targeted event is canceled while preserving all other events on the calendar.

#### Input Fields

- **Event UID** (required, `string`) – The unique identifier of the event to delete.

#### Example Input Message

```json
{
  "uid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

#### Example Output Message

```json
{
  "uid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "statusCode": 200,
  "response": "<Response><ResponseMessage>Success</ResponseMessage></Response>"
}
```

### Get Attendees

Query event attendee and registration records from the Trumba Registration Service (`/regservice/{calendarWebname}.csv`). Parses CSV records into normalized JSON objects, preserving all custom form questions and answers.

#### Configuration Fields

- **Emit Behavior** (required) – Choose how attendee records are emitted:
  - `Emit individually` (default): Emits each attendee registration as a separate message.
  - `Emit pages`: Emits attendees in chunks/arrays based on the configured **Page Size**.
  - `Emit all (array)`: Emits all attendees matching the criteria in a single message `{ "results": [...] }`.
- **Page Size** (optional, default `100`) – Number of attendee records per page when using `Emit pages`.

#### Input Fields

All input fields are optional:

- **Event ID** (`string` / `number`) – Unique ID of the event to retrieve attendee registrations for.
- **Start Date** (`string`) – Limits records to events starting on or after this date (`YYYYMMDD` or ISO 8601 date).
- **End Date** (`string`) – Limits records to events ending on or before this date (`YYYYMMDD` or ISO 8601 date).
- **Email Address** (`string`) – Limits records to a specific attendee's email address.
- **Change Date / Time** (`string`) – Limits records to registrations added or updated after this timestamp (`yyyymmddThhmm` in UTC, or ISO date).

#### Example Input Message

```json
{
  "eventId": 5001,
  "startDate": "20261001",
  "endDate": "20261031"
}
```

#### Example Output Message (Emit Individually)

```json
{
  "eventID": 5001,
  "eventDescription": "Leadership Summit",
  "eventDateTime": "10/15/2026 09:00 AM",
  "attendeeName": "Alice Smith",
  "emailAddress": "alice@example.com",
  "response": "Registered",
  "numberOfAttendees": 1,
  "dietaryRequirement": "Vegetarian",
  "tshirtSize": "Large"
}
```

#### Example Output Message (Emit Pages / Emit All)

```json
{
  "results": [
    {
      "eventID": 5001,
      "eventDescription": "Leadership Summit",
      "eventDateTime": "10/15/2026 09:00 AM",
      "attendeeName": "Alice Smith",
      "emailAddress": "alice@example.com",
      "response": "Registered",
      "numberOfAttendees": 1
    }
  ]
}
```

### Get Calendar Info

Inspects a Trumba calendar's event feed (`/calendars/{calendarWebname}.json`) to dynamically discover its metadata: active categories, custom fields (`fieldID` and `label`), timezones, event count, and a sample event.

#### Input Fields

- **Weeks to Inspect** (optional, `number` / `string`) – Number of weeks of calendar data to inspect (defaults to `4`).

#### Example Input Message

```json
{
  "weeks": 8
}
```

#### Example Output Message

```json
{
  "calendarWebname": "mycalendar",
  "eventCount": 42,
  "categories": [
    "Community",
    "Education",
    "Workshops"
  ],
  "customFields": [
    { "fieldID": 101, "label": "Audience" },
    { "fieldID": 102, "label": "Location Room" },
    { "fieldID": 103, "label": "Presenter" }
  ],
  "timezones": [
    "America/Los_Angeles"
  ],
  "sampleEvent": {
    "eventID": 1001,
    "title": "Quarterly Planning Workshop",
    "startDateTime": "2026-10-01T09:00:00"
  }
}
```

### Get Event by ID

Lookup a single Trumba event by its unique ID.

#### Configuration Fields

- **Allow Zero Results?** (optional checkbox, default `false`) – When checked, if no event matches the specified ID, an empty message body `{}` is emitted instead of throwing an error.

#### Input Fields

- **Event ID** (required, string or number) – Unique identifier of the event to fetch (e.g., `"12345"` or `12345`).

#### Example Input Message

```json
{
  "eventId": "12345"
}
```

#### Example Output Message (Found)

```json
{
  "eventID": 12345,
  "title": "Board Meeting",
  "startDateTime": "2026-09-10T10:00:00",
  "endDateTime": "2026-09-10T12:00:00",
  "location": "Boardroom A",
  "description": "Annual strategic alignment."
}
```

#### Example Output Message (Not Found with Allow Zero Results enabled)

```json
{}
```

### Get Events

Query calendar events matching dynamic search filters, custom fields, and date ranges on-demand.

#### Configuration Fields

- **Category** (optional dropdown) – Dynamic dropdown populated from active calendar events (inspects both event `category` and `customFields` with `Category`/`Categories` label, supporting comma-separated multi-choice values).
- **Custom Filter Field** (optional dropdown) – Dynamic dropdown populated from calendar custom fields to filter by.
- **Emit Behavior** (required) – Choose how fetched events are emitted:
  - `Emit individually` (default): Emits each event as an individual message.
  - `Emit pages`: Emits events in chunks/arrays based on the configured **Page Size**.
  - `Emit all (array)`: Emits all events matching the criteria in a single message `{ "results": [...] }`.
- **Page Size** (optional, default `100`) – Number of events per page when using `Emit pages`.

#### Input Fields

All input fields are optional:

- **Start Date** (`string`) – Date to start querying events from in `YYYYMMDD` format (e.g., `20260901`) or ISO 8601 date. Defaults to current date.
- **Weeks** (`string` / `number`) – Number of weeks forward from the start date (defaults to `4` if months/days are not specified).
- **Months** (`string` / `number`) – Number of months forward from the start date.
- **Days** (`string` / `number`) – Number of days forward from the start date.
- **Previous Weeks** (`string` / `number`) – Number of previous weeks prior to the start date to query.
- **Previous Months** (`string` / `number`) – Number of previous months prior to the start date to query.
- **Search Keywords** (`string`) – Search text to filter events by keyword.
- **Category** (`string`) – Filter events by category name.
- **Filter View** (`string`) – Name of the Trumba filter view.
- **Filter Field** (`string`) – Custom field name to filter by.
- **Filter Value** (`string`) – Value for the custom filter field.

#### Example Input Message

```json
{
  "startDate": "20261001",
  "weeks": 4,
  "category": "Education",
  "filterfield": "Presenter",
  "filtervalue": "Dr. Smith"
}
```

#### Example Output Message (Emit Individually)

```json
{
  "eventID": 2045,
  "title": "Advanced Integration Architectures",
  "startDateTime": "2026-10-12T13:00:00",
  "endDateTime": "2026-10-12T15:00:00",
  "location": "Lecture Hall 1",
  "category": "Education",
  "canceled": false,
  "openSignUp": true,
  "customFields": [
    {
      "fieldID": 201,
      "label": "Presenter",
      "value": "Dr. Smith"
    },
    {
      "fieldID": 202,
      "label": "Difficulty",
      "value": "Advanced"
    }
  ]
}
```

#### Example Output Message (Emit Pages / Emit All)

```json
{
  "results": [
    {
      "eventID": 2045,
      "title": "Advanced Integration Architectures",
      "startDateTime": "2026-10-12T13:00:00",
      "endDateTime": "2026-10-12T15:00:00",
      "category": "Education"
    }
  ]
}
```

### Make Raw Request

Manually construct and execute HTTP requests against any Trumba endpoint.

#### Input Fields

- **Method** (required) – HTTP method: `GET`, `POST`, `PATCH`, `PUT`, or `DELETE`.
- **URL** (required) – Path relative to the base URL (e.g., `/calendars/yourcalendar.json` or `/calendars/yourcalendar.json?weeks=4&startdate=20260901`).
- **Headers** (optional) – Custom HTTP headers object (e.g., `{"Content-Type": "text/calendar; charset=utf-8", "Accept": "application/xml, text/xml, */*"}`). Defaults to `application/json`.
- **Request Body** (optional) – Payload for `POST`, `PATCH`, or `PUT` requests (JSON object or raw string, such as an iCalendar `.ics` payload).

#### Example 1: Querying Calendar Events (GET)

**Input Message:**
```json
{
  "method": "GET",
  "url": "/calendars/mycalendar.json?weeks=4"
}
```

#### Example 2: Submitting an Event via Raw iCalendar (PUT)

**Input Message:**
```json
{
  "method": "PUT",
  "url": "/service/mycalendar.ics?delta=true",
  "headers": {
    "Content-Type": "text/calendar; charset=utf-8",
    "Accept": "application/xml, text/xml, */*"
  },
  "data": "BEGIN:VCALENDAR\r\nMETHOD:PUBLISH\r\nVERSION:2.0\r\nPRODID:-//elastic.io//Trumba Test//EN\r\nBEGIN:VEVENT\r\nUID:test-event-001\r\nDTSTAMP:20260921T120000Z\r\nDTSTART:20261101T090000Z\r\nDTEND:20261101T100000Z\r\nSUMMARY:Test Event\r\nDESCRIPTION:Created with Make Raw Request.\r\nEND:VEVENT\r\nEND:VCALENDAR"
}
```

#### Output Fields

- **Status Code** (`number`) – HTTP status code returned by the Trumba API (e.g., `200`, `201`).
- **Headers** (`object`) – HTTP response headers received from Trumba.
- **Response Body** (`object` / `array`) – Parsed response body returned by Trumba.

**Output Message Structure:**
```json
{
  "statusCode": 200,
  "headers": {
    "content-type": "application/json; charset=utf-8"
  },
  "responseBody": [
    {
      "eventID": 1001,
      "title": "Quarterly Planning Workshop",
      "start": "2026-10-01T09:00:00",
      "end": "2026-10-01T17:00:00"
    }
  ]
}
```