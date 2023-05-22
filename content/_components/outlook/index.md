---
title: Outlook component
layout: component
section: Office components
description: An integration component for the Office 365 Outlook REST API.
icon: outlook.png
icontext: Outlook component
category: outlook
updatedDate: 2023-04-07
ComponentVersion: 1.0.3
---

## Description

[Outlook](https://outlook.live.com/) is a personal information manager web app from Microsoft consisting of webmail, calendaring, contacts, and tasks services.

### API version

It is used [Microsoft Graph REST API v1.0](https://docs.microsoft.com/en-us/graph/overview?view=graph-rest-1.0).

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Outlook component like [changelog](/components/outlook/technical-notes#changelog) and [completeness matrix](/components/outlook/technical-notes#completeness-matrix).


## Requirements

### Environment variables

| Name|Mandatory|Description|Values|
|----|---------|-----------|------|
| `OAUTH_CLIENT_ID`| true | Microsoft Graph Application OAuth2 Client ID | More on [dedicated OAuth2 App page](create-oauth-app). |
| `OAUTH_CLIENT_SECRET`| true | Microsoft Graph Application OAuth2 Client Secret | More on [dedicated OAuth2 App page](create-oauth-app). |
| `MAIL_RETRIEVE_MAX_COUNT`| false | Define max count mails could be retrieved per one `Poll for New Mail` trigger execution. Default to 1000| 1000 |

> Please Note: From the platform version [20.51](/releases/2020-12-17) we deprecated the
> component `LOG_LEVEL` environment variable. Now you can control logging level per each step of the flow.

### Credentials

To create new credentials you need to authorize in Microsoft system using OAuth2 protocol - details are described in [dedicated OAuth2 App creation page](create-oauth-app).

## Triggers

### Contacts

Triggers to poll all new contacts from Outlook since last polling. Polling is provided by `lastModifiedDateTime` contact's property.
Per one execution it is possible to poll 900 contacts.

### Poll for New Mail

Triggers to poll all new mails from specified folder since last polling. Polling is provided by `lastModifiedDateTime` mail's property.

![Poll for New Mail](img/poll-for-new-mail.png)

Per one execution it is possible to poll 1000 mails by defaults, this can be changed by using environment variable `MAIL_RETRIEVE_MAX_COUNT`.

#### List of Expected Configuration fields

* **Mail Folder** - Drop-down list with available Outlook mail folders
* **Start Time** - Start date-time of polling. Defaults: `1970-01-01T00:00:00.000Z`
* **Poll Only Unread Mail** - Check-Box, if set, only unread mails will be poll
* **Emit Behavior** -  Options are: default is `Emit Individually` emits each mail in separate message, `Emit All` emits all found mails in one message

## Actions

### Check Availability

The action retrieves events for the time specified in `Time` field or for the current time (in case if `Time` field is empty) and returns `true` if no events found, or `false` otherwise.

![Check Availability](img/check-availability.png)

### Find Next Available Time

The action retrieves events for the time specified in `Time` field or for the current time (in case if `Time` field is empty).
Returns specified time if no events found, otherwise calculates the new available time based on found event.

![Find Next Available Time](img/find-next.png)

### Create Event

The action creates event in specified calendar with specified options.

![Create Event](img/create-event.png)

#### List of Expected Configuration fields

* **Calendar** - Drop-down list with available Outlook calendars
* **Time Zone** - Drop-down list with available time zones
* **Importance** - Drop-down list, options are: `Low`, `Normal`, `High`
* **Show As** - Drop-down list, options are: `Free`, `Tentative`, `Busy`, `Out of Office`, `Working Elsewhere`, `Unknown`
* **Sensitivity** - Drop-down list, options are: `Normal`, `Personal`, `Private`, `Confidential`
* **Body Content Type** - Drop-down list, options are: `Text`, `HTML`
* **All Day Event** - Check-Box, if set, all day event will be created

### Move Mail

The action moves message with specified id from the original mail folder to a specified destination mail folder or soft-deletes message if the destination folder isn't specified.

![Move Mail](img/move-mail.png)

#### List of Expected Configuration fields

* **Original Mail Folder** - Drop-down list with available Outlook mail folders - from where mail should be moved, required field.
* **Destination Mail Folder** - Drop-down list with available Outlook mail folders - where mail should be moved, not required field.
If not specified, the message will be soft-deleted (moved to the folder with property `deleteditems`).


## Known issues and limitations

### Current implementation uses AD V2.0 OAuth2

Second version of AD protocol has some advantages, see [here](https://docs.microsoft.com/en-us/azure/active-directory/azuread-dev/azure-ad-endpoint-comparison) for more information.

### OData output for lastModifiedDateTime has a precision issue

Apparently the `lastModifiedDateTime` returned by MS Graph has no milliseconds
in it is obvious that filter query accept and treat millisecond values correctly
there is a workaround for that issue implemented in the code, however you need to
keep an eye on it.
