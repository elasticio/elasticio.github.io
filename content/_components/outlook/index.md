---
title: Outlook component
layout: component
section: Office components
description: An integration component for the Office 365 Outlook REST API.
icon: outlook.png
icontext: Outlook component
category: Outlook
createdDate: 2016-10-20
updatedDate: 2020-07-29
---

## Latest changelog

**1.0.0 (July 29, 2020)**

* Use this.logger functionality instead of console.log
* Update libs to latest versions
* Update sailor to 2.6.14 version
* Add `Poll for New Mail` trigger
* Add `Move Mail` action

> To see the full **changelog** please use the following [link](/components/outlook/changelog).

## Description

[Outlook](https://outlook.live.com/) is a personal information manager web app from Microsoft consisting of webmail, calendaring, contacts, and tasks services.

### Completeness Matrix

The [component completeness](completeness-matrix) matrix gives the technical
details about Salesforce objects this component covers.

### API version

It is used [Microsoft Graph REST API v1.0](https://docs.microsoft.com/en-us/graph/overview?view=graph-rest-1.0).

## Requirements

This component uses [OAuth 2.0 protocol](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-protocols), so you should register your app.
For more details, learn how to register an [app](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).
A Redirect URI for your tenant is: `https://your-tenant.elastic.io/callback/oauth2`, for default EIO tenant just use `https://app.elastic.io/callback/oauth2`.
Client ID and Secret (that you get after app registration) need to be configured in the environment variables ```OAUTH_CLIENT_ID``` and ```OAUTH_CLIENT_SECRET```

The component uses following Microsoft Graph scopes:

* "openid"
* offline_access"
* User.Read"
* Contacts.Read"
* Profile"
* Calendars.ReadWrite"
* Mail.ReadWrite"

### Environment variables

|Name|Mandatory|Description|Values|
|----|---------|-----------|------|
|`OAUTH_CLIENT_ID`| true | Microsoft Graph Application OAuth2 Client ID | Can be found in your application page on [https://portal.azure.com](https://portal.azure.com) |
|`OAUTH_CLIENT_SECRET`| true | Microsoft Graph Application OAuth2 Client Secret | Can be found in your application page on [https://portal.azure.com](https://portal.azure.com) |
|`LOG_LEVEL`| false | Controls logger level | `trace`, `debug`, `info`, `warn`, `error` |
|`MAIL_RETRIEVE_MAX_COUNT`| false | Define max count mails could be retrieved per one `Poll for New Mail` trigger execution. Default to 1000| 1000 |

### Credentials

To create new credentials you need to authorize in Microsoft system using OAuth2 protocol - details are described in [Requirements](#requirements) section.

## Triggers

### Contacts

Triggers to poll all new contacts from Outlook since last polling. Polling is provided by `lastModifiedDateTime` contact's property.
Per one execution it is possible to poll 900 contacts.

### Poll for New Mail

Triggers to poll all new mails from specified folder since last polling. Polling is provided by `lastModifiedDateTime` mail's property.
Per one execution it is possible to poll 1000 mails by defaults, this can be changed by using environment variable `MAIL_RETRIEVE_MAX_COUNT`.

#### List of Expected Config fields

* **Mail Folder** - Dropdown list with available Outlook mail folders
* **Start Time** - Start datetime of polling. Defaults: `1970-01-01T00:00:00.000Z`
* **Poll Only Unread Mail** - CheckBox, if set, only unread mails will be poll
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

#### List of Expected Config fields

* **Calendar** - Dropdown list with available Outlook calendars
* **Time Zone** - Dropdown list with available time zones
* **Importance** - Dropdown list, options are: `Low`, `Normal`, `High`
* **Show As** - Dropdown list, options are: `Free`, `Tentative`, `Busy`, `Out of Office`, `Working Elsewhere`, `Unknown`
* **Sensitivity** - Dropdown list, options are: `Normal`, `Personal`, `Private`, `Confidential`
* **Body Content Type** - Dropdown list, options are: `Text`, `HTML`
* **All Day Event** - CheckBox, if set, all day event will be created

### Move Mail

The action moves message with specified id from the original mail folder to a specified destination mail folder or soft-deletes message if the destination folder isn't specified.

#### List of Expected Config fields

* **Original Mail Folder** - Dropdown list with available Outlook mail folders - from where mail should be moved, required field.
* **Destination Mail Folder** - Dropdown list with available Outlook mail folders - where mail should be moved, not required field.
If not specified, the message will be soft-deleted (moved to the folder with property `deleteditems`).


## Known issues and limitations

### Current implementation uses AD V2.0 OAuth2

Second version of AD protocol has [some advantages](https://azure.microsoft.com/en-us/documentation/articles/active-directory-v2-compare/), see [here](https://azure.microsoft.com/en-us/documentation/articles/active-directory-v2-limitations/) for more information.

### OData output for lastModifiedDateTime has a precision issue

Apparently the `lastModifiedDateTime` returned by MS Graph has no milliseconds
in it is obvious that filter query accept and treat millisecond values correctly
there is a workaround for that issue implemented in the code, however you need to
keep an eye on it.
