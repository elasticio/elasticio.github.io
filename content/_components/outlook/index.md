---
title: Outlook component
layout: component
section: Office components
description: An integration component for the Office 365 Outlook REST API.
icon: outlook.png
icontext: Outlook component
category: outlook
updatedDate: 2025-07-22
ComponentVersion: 2.1.1
---

## Table of Contents

* [General information](#general-information)
   * [Description](#description)
   * [Completeness Matrix](/components/outlook/technical-notes#completeness-matrix)
   * [API version](#api-version)
   * [Requirements](#requirements)
   * [Environment variables](#environment-variables)
* [Credentials](#credentials)
* [Triggers](#triggers)
   * [Contacts](#contacts)
   * [Poll for New Mail](#poll-for-new-mail)
* [Actions](#actions)
   * [Check Availability](#check-availability)
   * [Find Next Available Time](#find-next-available-time)
   * [Create Event](#create-event)
   * [Move Mail](#move-mail)
   * [Send Mail](#send-mail)
* [Known Limitations](#known-limitations)

## General information
### Description

[Outlook](https://outlook.live.com/) is a personal information manager web app from Microsoft consisting of webmail, calendaring, contacts, and tasks services.

### API version

The component uses [Microsoft Graph REST API v1.0](https://docs.microsoft.com/en-us/graph/overview?view=graph-rest-1.0).

### Requirements

To create the credentials you would need:

- select existing Auth Client from drop-down list `Choose Auth Client` or create a new one. To create a new client you should specify the following fields:

| Field name             | Mandatory | Description                                                                                                              |
|------------------------|-----------|--------------------------------------------------------------------------------------------------------------------------|
| Name                   | true      | your Auth Client's name                                                                                                  |
| Client ID              | true      | your OAuth client key                                                                                                    |
| Client Secret          | true      | your OAuth client secret                                                                                                 |
| Authorization Endpoint | true      | your OAuth authorization endpoint. Use `https://login.microsoftonline.com/common/oauth2/v2.0/authorize`                  |
| Token Endpoint         | true      | your OAuth Token endpoint for refreshing access token. Use `https://login.microsoftonline.com/common/oauth2/v2.0/token`  |

- fill field ``Name Your Credential``
- click on ``Authenticate`` button - if you have not logged in Salesforce before then log in by entering data in the login window that appears
- click on ``Verify`` button for verifying your credentials
- click on ``Save`` button for saving your credentials

This is the list of the scopes that the credentials for the entire component might require. If you want to limit the scope of the credentials, feel free to only select the required scopes (space separated list):
* openid
* offline_access
* User.Read
* Contacts.Read
* Profile
* Calendars.ReadWrite
* Mail.ReadWrite
* Mail.Send

offline_access is required for each credential.

Example of the scopes for the `Send Mail` action: `offline_access Mail.Send`

> **Please Note:** To be able to verify the credentials you need these scopes: `offline_access User.Read`

> You can find more details in [dedicated OAuth2 App creation page](create-oauth-app).

## Credentials
To create new credentials you need to authorize in Microsoft system using OAuth2 protocol - details are described on the [Creating OAuth2 App](/components/outlook/create-oauth-app.html) page.

### Environment variables

| Name                      |Mandatory|Description|Values|
|---------------------------|---------|-----------|------|
| `MAIL_RETRIEVE_MAX_COUNT` | false | Define max count mails could be retrieved per one `Poll for New Mail` trigger execution. Defaults to 1000| 1000 |
| `TOP_LIST_MAIL_FOLDER`    | false | Define the maximum number of folders that can be found for dropdown fields containing a list of Mail Folder. Defaults to 100| 100 |

> **Please Note:** From the platform version [20.51](/releases/20/51) we deprecated the
> component `LOG_LEVEL` environment variable. Now you can control logging level per each step of the flow.

## Triggers

### Contacts

Triggers to poll all new contacts from Outlook since last polling. Polling is provided by `lastModifiedDateTime` contact's property.
Per one execution it is possible to poll 900 contacts.

#### Expected output metadata
<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>

```json
{
  "type": "object",
  "properties": {
    "contacts": {
      "type": "array",
      "properties": {
        "id": {
          "type": "string",
          "required": true
        },
        "createdDateTime": {
          "type": "string",
          "required": true
        },
        "lastModifiedDateTime": {
          "type": "string",
          "required": true
        },
        "changeKey": {
          "type": "string"
        },
        "parentFolderId": {
          "type": "string"
        },
        "birthday": {
          "type": "date"
        },
        "fileAs": {
          "type": "string"
        },
        "displayName": {
          "type": "string"
        },
        "givenName": {
          "type": "string"
        },
        "initials": {
          "type": "string"
        },
        "middleName": {
          "type": "string"
        },
        "nickName": {
          "type": "string"
        },
        "surname": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "emailAddresses": {
          "type": "array",
          "properties": {
            "name": {
              "type": "string"
            },
            "address": {
              "type": "string",
              "required": true
            }
          }
        },
        "jobTitle": {
          "type": "string"
        },
        "companyName": {
          "type": "string"
        },
        "department": {
          "type": "string"
        },
        "officeLocation": {
          "type": "string"
        },
        "profession": {
          "type": "string"
        },
        "businessHomePage": {
          "type": "string"
        },
        "assistantName": {
          "type": "string"
        },
        "manager": {
          "type": "string"
        },
        "homePhones": {
          "type": "array"
        },
        "mobilePhone": {
          "type": "array"
        },
        "businessPhones": {
          "type": "array"
        },
        "homeAddress": {
          "type": "object",
          "properties": {
            "street": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "state": {
              "type": "string"
            },
            "countryOrRegion": {
              "type": "string"
            },
            "postalCode": {
              "type": "string"
            }
          }
        },
        "businessAddress": {
          "type": "object",
          "properties": {
            "street": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "state": {
              "type": "string"
            },
            "countryOrRegion": {
              "type": "string"
            },
            "postalCode": {
              "type": "string"
            }
          }
        },
        "otherAddress": {
          "type": "object",
          "properties": {
            "street": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "state": {
              "type": "string"
            },
            "countryOrRegion": {
              "type": "string"
            },
            "postalCode": {
              "type": "string"
            }
          }
        },
        "spouseName": {
          "type": "string"
        },
        "personalNotes": {
          "type": "string"
        }
      }
    }
  }
}
```
</details>

### Poll for New Mail

Triggers to poll all new mails from specified folder since last polling. Polling is provided by `lastModifiedDateTime` mail's property.

Per one execution it is possible to poll 1000 mails by defaults, this can be changed by using environment variable `MAIL_RETRIEVE_MAX_COUNT`.

#### List of Expected Configuration fields

* **Mail Folder** - Drop-down list with available Outlook mail folders.
* **Start Time** - Start date-time of polling. Defaults: `1970-01-01T00:00:00.000Z`.
* **Poll Only Unread Mail** - Check-Box, if set, only unread mails will be poll.
* **Get Attachment** - CheckBox, if checked, email attachments will be downloaded to the platform and the link will be provided as a part of the output metadata with the key `attachments`.
* **Emit Behavior** -  Options are: default is `Emit Individually` emits each mail in separate message, `Emit All` emits all found mails in one message.

#### Expected output metadata
<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>

```json
{
  "type": "object",
  "required": true,
  "properties": {
    "id": {
      "type": "string",
      "required": true
    },
    "createdDateTime": {
      "type": "string",
      "required": true
    },
    "lastModifiedDateTime": {
      "type": "string",
      "required": true
    },
    "changeKey": {
      "type": "string",
      "required": true
    },
    "categories": {
      "type": "array",
      "required": true,
      "items": {}
    },
    "receivedDateTime": {
      "type": "string",
      "required": true
    },
    "sentDateTime": {
      "type": "string",
      "required": true
    },
    "hasAttachments": {
      "type": "boolean",
      "required": true
    },
    "internetMessageId": {
      "type": "string",
      "required": true
    },
    "subject": {
      "type": "string",
      "required": true
    },
    "bodyPreview": {
      "type": "string",
      "required": true
    },
    "importance": {
      "type": "string",
      "required": true
    },
    "parentFolderId": {
      "type": "string",
      "required": true
    },
    "conversationId": {
      "type": "string",
      "required": true
    },
    "conversationIndex": {
      "type": "string",
      "required": true
    },
    "isDeliveryReceiptRequested": {
      "type": "string",
      "required": true
    },
    "isReadReceiptRequested": {
      "type": "boolean",
      "required": true
    },
    "isRead": {
      "type": "boolean",
      "required": true
    },
    "isDraft": {
      "type": "boolean",
      "required": true
    },
    "webLink": {
      "type": "string",
      "required": true
    },
    "inferenceClassification": {
      "type": "string",
      "required": true
    },
    "body": {
      "type": "object",
      "required": true,
      "properties": {
        "contentType": {
          "type": "string",
          "required": true
        },
        "content": {
          "type": "string",
          "required": true
        }
      }
    },
    "sender": {
      "type": "object",
      "required": true,
      "properties": {
        "emailAddress": {
          "type": "object",
          "required": true,
          "properties": {
            "name": {
              "type": "string",
              "required": true
            },
            "address": {
              "type": "string",
              "required": true
            }
          }
        }
      }
    },
    "from": {
      "type": "object",
      "required": true,
      "properties": {
        "emailAddress": {
          "type": "object",
          "required": true,
          "properties": {
            "name": {
              "required": true,
              "type": "string"
            },
            "address": {
              "required": true,
              "type": "string"
            }
          }
        }
      }
    },
    "toRecipients": {
      "type": "array",
      "required": true,
      "properties": {}
    },
    "ccRecipients": {
      "type": "array",
      "required": true,
      "properties": {}
    },
    "bccRecipients": {
      "type": "array",
      "required": true,
      "properties": {}
    },
    "replyTo": {
      "type": "array",
      "required": true,
      "properties": {}
    },
    "flag": {
      "type": "object",
      "required": true,
      "properties": {
        "flagStatus": {
          "type": "string",
          "required": true
        }
      }
    },
    "attachments": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "url": {
            "type": "string"
          },
          "contentType": {
            "type": "string"
          },
          "size": {
            "type": "number"
          }
        }
      }
    }
  }
}
```
</details>

## Actions

### Check Availability

The action retrieves events for the time specified in `Time` field or for the current time (in case if `Time` field is empty) and returns `true` if no events found, or `false` otherwise.

#### List of Expected Configuration fields

- **Time** - string field (YYYY-MM-DDTHH:MM:SS format).

#### Expected output metadata
<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>

```json
{
    "type": "object",
    "required": false,
    "properties": {
        "available": {
            "type": "boolean",
            "required": false,
            "title": "Available"
        }
    }
}
```
</details>

### Find Next Available Time

The action retrieves events for the time specified in `Time` field or for the current time (in case if `Time` field is empty).
Returns specified time if no events found, otherwise calculates the new available time based on found event. If no time specified, the result time will be emitted in UTC time zone (e.g. 2023-08-20T10:00:00Z).

#### List of Expected Configuration fields

- **Time** - string field (YYYY-MM-DDTHH:MM:SS format).
- **Subject** - string field.

#### Expected output metadata
<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>

```json
{
    "type": "object",
    "required": false,
    "properties": {
        "time": {
            "type": "string",
            "required": false,
            "title": "Time"
        },
        "subject": {
            "type": "string",
            "required": false,
            "title": "Subject"
        }
    }
}
```
</details>

### Create Event

The action creates event in specified calendar with specified options.

#### List of Expected Configuration fields

* **Calendar** - Drop-down list with available Outlook calendars.
* **Time Zone** - Drop-down list with available time zones.
* **Importance** - Drop-down list, options are: `Low`, `Normal`, `High`.
* **Show As** - Drop-down list, options are: `Free`, `Tentative`, `Busy`, `Out of Office`, `Working Elsewhere`, `Unknown`.
* **Sensitivity** - Drop-down list, options are: `Normal`, `Personal`, `Private`, `Confidential`.
* **Body Content Type** - Drop-down list, options are: `Text`, `HTML`.
* **All Day Event** - Check-Box, if set, all day event will be created.

#### Expected output metadata
<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>

```json
{
  "type":"object",
  "properties":{
    "id": {
      "type":"string",
      "required":false,
      "title":"Event ID"
    },
    "createdDateTime": {
      "type":"string",
      "required":false,
      "title":"Created Date Time"
    },
    "lastModifiedDateTime": {
      "type":"string",
      "required":false,
      "title":"Last Modified Date Time"
    },
    "originalStartTimeZone": {
      "type":"string",
      "required":false,
      "title":"Original Start Time Zone"
    },
    "originalEndTimeZone": {
      "type":"string",
      "required":false,
      "title":"Original End Time Zone"
    },
    "iCalUId": {
      "type":"string",
      "required":false,
      "title":"iCalUId"
    },
    "reminderMinutesBeforeStart": {
      "type":"string",
      "required":false,
      "title":"Reminder Minutes Before Start"
    },
    "subject": {
      "type":"string",
      "required":false,
      "title":"Subject"
    },
    "importance": {
      "type":"string",
      "required":false,
      "title":"Importance"
    },
    "sensitivity": {
      "type":"string",
      "required":false,
      "title":"Sensitivity"
    },
    "isAllDay": {
      "type":"boolean",
      "required":false,
      "title":"Is All Day"
    },
    "isCancelled": {
      "type":"boolean",
      "required":false,
      "title":"Is Cancelled"
    },
    "isOrganizer": {
      "type":"boolean",
      "required":false,
      "title":"Is Organizer"
    },
    "showAs": {
      "type":"string",
      "required":false,
      "title":"Show As"
    },
    "webLink": {
      "type":"string",
      "required":false,
      "title":"Web Link"
    },
    "body": {
      "type":"object",
      "required":false,
      "title":"Object",
      "properties": {
        "contentType": {
          "type":"string",
          "required":false,
          "title":"Body Content-Type"
        },
        "content": {
          "type":"string",
          "required":false,
          "title":"Body Content"
        }
      }
    },
    "start": {
      "type":"object",
      "required":false,
      "title":"Start",
      "properties": {
        "dateTime": {
          "type":"string",
          "required":false,
          "title":"Start Date and Time"
        },
        "timeZone": {
          "type":"string",
          "required":false,
          "title":"Start Time Zone"
        }
      }
    },
    "end": {
      "type":"object",
      "required":false,
      "title":"End",
      "properties": {
        "dateTime": {
          "type":"string",
          "required":false,
          "title":"End Date and Time"
        },
        "timeZone": {
          "type":"string",
          "required":false,
          "title":"End Time Zone"
        }
      }
    },
    "location": {
      "type":"object",
      "required":false,
      "title":"Location",
      "properties": {
        "displayName": {
          "type":"string",
          "required":false,
          "title":"Location Display Name"
        },
        "address": {
          "type":"object",
          "required":false,
          "title":"Location Address",
          "properties": {
            "street": {
              "type":"string",
              "required":false,
              "title":"Location Street"
            },
            "city": {
              "type":"string",
              "required":false,
              "title":"Location City"
            },
            "state": {
              "type":"string",
              "required":false,
              "title":"Location State"
            },
            "countryOrRegion": {
              "type":"string",
              "required":false,
              "title":"Location Country/Region"
            },
            "postalCode": {
              "type":"string",
              "required":false,
              "title":"Location Postal Code"
            }
          }
        }
      }
    },
    "organizer": {
      "type":"object",
      "required":false,
      "title":"Organizer",
      "properties": {
        "emailAddress": {
          "type":"object",
          "required":false,
          "title":"Organizer Address",
          "properties": {
            "name": {
              "type":"string",
              "required":false,
              "title":"Organizer Name"
            },
            "address": {
              "type":"string",
              "required":false,
              "title":"Organizer Email Address"
            }
          }
        }
      }
    },
    "calendarId": {
      "type":"string",
      "required":false,
      "title":"Calendar ID"
    }
  }
}
```
</details>

### Move Mail

The action moves message with specified id from the original mail folder to a specified destination mail folder or soft-deletes message if the destination folder isn't specified.

#### List of Expected Configuration fields

* **Original Mail Folder** - Drop-down list with available Outlook mail folders - from where mail should be moved, required field.
* **Destination Mail Folder** - Drop-down list with available Outlook mail folders - where mail should be moved, not required field.
If not specified, the message will be soft-deleted (moved to the folder with property `deleteditems`).

#### Expected output metadata
Input metadata contains field `Message ID` - what exactly message should be moved.
<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>

```json
{
  "type": "object",
  "required": true,
  "properties": {
    "messageId": {
      "type": "string",
      "required": true,
      "name": "Message ID"
    }
  }
}
```
</details>

### Send Mail

The action simply send a message to a recipient(s).

#### Expected input metadata
<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>

```json
{
  "type": "object",
  "required": true,
  "properties": {
    "subject": {
      "type": "string",
      "required": true,
      "name": "The subject of the message"
    },
    "ccRecipients": {
      "type": "array",
      "required": false,
      "name": "The Cc: recipients for the message",
      "items": {
        "emailAddress": {
          "type": "object",
          "required": true,
          "name": "The subject of the message",
          "properties": {
            "address": {
              "type": "string",
              "required": true,
              "name": "The email address of the person or entity"
            },
            "name": {
              "type": "string",
              "required": false,
              "name": "The display name of the person or entity"
            }
          }
        }
      }
    },
    "toRecipients": {
      "type": "array",
      "required": true,
      "name": "The To: recipients for the message",
      "items": {
        "type": "object",
        "properties": {
          "emailAddress": {
            "type": "object",
            "required": true,
            "name": "The subject of the message",
            "properties": {
              "address": {
                "type": "string",
                "required": true,
                "name": "The email address of the person or entity"
              },
              "name": {
                "type": "string",
                "required": false,
                "name": "The display name of the person or entity"
              }
            }
          }
        }
      }
    },
    "body": {
      "type": "object",
      "required": true,
      "properties": {
        "content": {
          "type": "string",
          "required": true,
          "name": "The content of the item"
        },
        "contentType": {
          "type": "string",
          "required": false,
          "name": "The type of the content. Possible values are text and html",
          "enum": [
            "text",
            "html"
          ]
        }
      }
    },
    "saveToSentItems": {
      "type": "boolean",
      "required": false,
      "name": "Save to Sent items"
    },
    "attachments": {
      "type": "array",
      "title": "Attachments",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "title": "File name"
          },
          "url": {
            "type": "string",
            "title": "URL to file"
          }
        }
      }
    }
  }
}
```
</details>

#### Expected output metadata
In case of a success, output metadata simply repeats the incoming message. I.e. output message schema is exactly the same as for input message.
<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>

```json
{
  "type": "object",
  "required": true,
  "properties": {
    "subject": {
      "type": "string",
      "required": true,
      "name": "The subject of the message"
    },
    "ccRecipients": {
      "type": "array",
      "required": false,
      "name": "The Cc: recipients for the message",
      "items": {
        "emailAddress": {
          "type": "object",
          "required": true,
          "name": "The subject of the message",
          "properties": {
            "address": {
              "type": "string",
              "required": true,
              "name": "The email address of the person or entity"
            },
            "name": {
              "type": "string",
              "required": false,
              "name": "The display name of the person or entity"
            }
          }
        }
      }
    },
    "toRecipients": {
      "type": "array",
      "required": true,
      "name": "The To: recipients for the message",
      "items": {
        "type": "object",
        "properties": {
          "emailAddress": {
            "type": "object",
            "required": true,
            "name": "The subject of the message",
            "properties": {
              "address": {
                "type": "string",
                "required": true,
                "name": "The email address of the person or entity"
              },
              "name": {
                "type": "string",
                "required": false,
                "name": "The display name of the person or entity"
              }
            }
          }
        }
      }
    },
    "body": {
      "type": "object",
      "required": true,
      "properties": {
        "content": {
          "type": "string",
          "required": true,
          "name": "The content of the item"
        },
        "contentType": {
          "type": "string",
          "required": false,
          "name": "The type of the content. Possible values are text and html",
          "enum": [
            "text",
            "html"
          ]
        }
      }
    },
    "saveToSentItems": {
      "type": "boolean",
      "required": false,
      "name": "Save to Sent items"
    },
    "attachments": {
      "type": "array",
      "title": "Attachments",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "title": "File name"
          },
          "url": {
            "type": "string",
            "title": "URL to file"
          }
        }
      }
    }
  }
}
```
</details>

#### Message Example

```json
{
  "subject": "Hello",
  "toRecipients": [
    {
      "emailAddress": {
        "address": "email@example.com",
        "name": "John"
      }
    }
  ],
  "body": {
    "content": "Hello, I am an email content text",
    "contentType": "text"
  }
}
```

> **Please note:** When employing the `Send Mail` action along with attachments, the component seamlessly handles files up to 20MB as its default capability. Nevertheless, should your tasks involve larger files, it is recommended to either establish or augment the `EIO_REQUIRED_RAM_MB` environment variable. This variable functions as the memory usage threshold for the component, initially configured at 256MB.

## Known issues and limitations

### Current implementation uses AD V2.0 OAuth2

Second version of AD protocol has some advantages, see [here](https://docs.microsoft.com/en-us/azure/active-directory/azuread-dev/azure-ad-endpoint-comparison) for more information.

### OData output for lastModifiedDateTime has a precision issue

Apparently the `lastModifiedDateTime` returned by MS Graph has no millisecond in it is obvious that filter query accept and treat millisecond values correctly there is a workaround for that issue implemented in the code, however you need to keep an eye on it.