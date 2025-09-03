---
title: WhatsApp component
layout: component
section: Service components
description: WhatsApp component is designed to connect with WhatsApp
icon: whatsapp.png
icontext: WhatsApp component
category: whatsapp
ComponentVersion: 1.2.0
updatedDate: 2025-08-01
---

# WhatsApp Component

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Send Message](#send-message)
* [Triggers](#triggers)
  * [Webhook](#webhook)

## Description

WhatsApp Component is designed to connect with WhatsApp using [Graph API](https://developers.facebook.com/docs/graph-api)
The current release of component tested with API `v18.0`.

## Credentials

Before building any integration flow please make sure you have prepared what [WhatsApp requires for API communications:](https://developers.facebook.com/docs/whatsapp/business-management-api/get-started#testing-endpoints)
* A Meta [Business Account](https://business.facebook.com/).
* A WhatsApp Business Account, associated with your Meta Business Account.
* A [business app](https://developers.facebook.com/docs/development/create-an-app/app-dashboard/app-types#business), associated with your Meta Business Account.
* A [System User access token](https://developers.facebook.com/docs/development/create-an-app/app-dashboard/app-types#business).
* The [whatsapp_business_management permission](https://developers.facebook.com/docs/permissions#w).
* The [whatsapp_business_messaging permission](https://developers.facebook.com/docs/permissions#w).

To generate a System User access token after creating a system user:
* Sign in the [Meta Business Account](https://business.facebook.com/).
* Locate your business account in the top-left dropdown menu and click its Settings (gear) icon.
* Click Business settings.
* Navigate to User > System users.
* Select the appropriate system user from the list of system users.
* Click the Generate new token button.
* Select the app that will use the token.
* Select any permissions the app needs to function properly and generate the token.

* Creating a token, you can choose between token expiration options - `60 days` or `Never expires`. It’s on the user to refresh the token in the credentials if they choose to it to expire in 60 days.

Now you can create new credentials for the component:
* **Name Your Credential** (string, required) - provide any name you wish
* **WhatsApp Business Account ID** (string, required) - Follow https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/ to find the ID
* **System User Access Token** (string, required) - Token generated above
* **API version** (string, optional, `v18.0` by default) - Version of API you are going to use, look at [Facebook changelog](https://developers.facebook.com/docs/graph-api/changelog) to find out what changes have been made

If you plan to use the `Webhook` trigger, you may also need to complete the following fields:

* **App Secret** (string, optional) - This is used for webhook verification. If left blank, the component will not verify incoming events. You can find this in the `App Settings` > `Basic` section.
* **Verify Token** (string, optional) - This token is sent by Facebook as part of the callback URL verification. If left blank, the component will not verify it. This token is set up when you create the webhook in your application ([Meta for Developers](https://developers.facebook.com/apps/) section)

## Actions

### Send Message

Simply send a message.

#### Configuration Fields

None

#### Input Metadata


Please refer to the Input Schema file below for the full list of metadata fields. 
<details close markdown="block"><summary><strong>Input Schema file</strong></summary>
```json
{
  "type": "object",
  "properties": {
    "to": {
      "type": "string",
      "title": "To",
      "required": true,
      "help": {
        "description": "WhatsApp ID or phone number of the customer you want to send a message to. See Phone Number Formats link below",
        "link": "https://developers.facebook.com/docs/whatsapp/cloud-api/reference/phone-numbers#phone-number-formats"
      }
    },
    "type": {
      "type": "string",
      "title": "Type",
      "help": {
        "description": "The type of message you want to send. If omitted, defaults to text"
      },
      "required": false,
      "enum": [
        "audio",
        "contacts",
        "document",
        "image",
        "location",
        "template",
        "text",
        "video"
      ]
    },
    "audio": {
      "type": "object",
      "title": "Audio",
      "help": {
        "description": "Required for audio messages"
      },
      "required": false,
      "properties": {
        "id": {
          "type": "string",
          "title": "Media ID",
          "help": {
            "description": "Required if using uploaded media, otherwise omit. ID of the <a href='https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#upload-media'>uploaded media asset</a>."
          },
          "required": false
        },
        "link": {
          "type": "string",
          "title": "Media URL",
          "help": {
            "description": "Required if using hosted media, otherwise omit. URL of the media asset hosted on your public server. It can be an external public URL or an internal Maestar storage URL. <a href='https://developers.facebook.com/docs/whatsapp/cloud-api/messages/audio-messages#supported-audio-formats'>Please check supported audio formats</a>"
          },
          "required": false
        }
      }
    },
    "contacts": {
      "type": "array",
      "title": "Contacts",
      "items": {
        "type": "object",
        "properties": {
          "addresses": {
            "type": "array",
            "items": {
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
                "zip": {
                  "type": "string"
                },
                "country": {
                  "type": "string"
                },
                "country_code": {
                  "type": "string"
                },
                "type": {
                  "type": "string"
                }
              }
            }
          },
          "birthday": {
            "type": "string"
          },
          "emails": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "email": {
                  "type": "string",
                  "format": "email"
                },
                "type": {
                  "type": "string"
                }
              }
            }
          },
          "name": {
            "type": "object",
            "properties": {
              "formatted_name": {
                "type": "string"
              },
              "first_name": {
                "type": "string"
              },
              "last_name": {
                "type": "string"
              },
              "middle_name": {
                "type": "string"
              },
              "suffix": {
                "type": "string"
              },
              "prefix": {
                "type": "string"
              }
            }
          },
          "org": {
            "type": "object",
            "properties": {
              "company": {
                "type": "string"
              },
              "department": {
                "type": "string"
              },
              "title": {
                "type": "string"
              }
            }
          },
          "phones": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "phone": {
                  "type": "string"
                },
                "type": {
                  "type": "string"
                },
                "wa_id": {
                  "type": "string"
                }
              }
            }
          },
          "urls": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "url": {
                  "type": "string",
                  "format": "uri"
                },
                "type": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "document": {
      "type": "object",
      "title": "Document",
      "help": {
        "description": "Required for document messages"
      },
      "required": false,
      "properties": {
        "caption": {
          "type": "string",
          "title": "Caption",
          "help": {
            "description": "Document caption text. Maximum 1024 characters."
          },
          "required": false
        },
        "id": {
          "type": "string",
          "title": "Media ID",
          "help": {
            "description": "Required if using uploaded media, otherwise omit. ID of the <a href='https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#upload-media'>uploaded media asset</a>."
          },
          "required": false
        },
        "link": {
          "type": "string",
          "title": "Media URL",
          "help": {
            "description": "Required if using hosted media, otherwise omit. URL of the media asset hosted on your public server. It can be an external public URL or an internal Maestar storage URL. <a href='https://developers.facebook.com/docs/whatsapp/cloud-api/messages/document-messages#supported-document-types'>Please check supported document formats</a>"
          },
          "required": false
        },
        "filename": {
          "type": "string",
          "title": "Document filename",
          "help": {
            "description": "Document filename, with extension. The WhatsApp client will use an appropriate file type icon based on the extension."
          },
          "required": false
        }
      }
    },
    "image": {
      "type": "object",
      "title": "Image",
      "help": {
        "description": "Required for image messages"
      },
      "required": false,
      "properties": {
        "caption": {
          "type": "string",
          "title": "Caption",
          "help": {
            "description": "Media asset caption text. Maximum 1024 characters."
          },
          "required": false
        },
        "id": {
          "type": "string",
          "title": "Media ID",
          "help": {
            "description": "Required if using uploaded media, otherwise omit. ID of the <a href='https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#upload-media'>uploaded media asset</a>."
          },
          "required": false
        },
        "link": {
          "type": "string",
          "title": "Media URL",
          "help": {
            "description": "Required if using hosted media, otherwise omit. URL of the media asset hosted on your public server.  It can be an external public URL or an internal Maestar storage URL. <a href='https://developers.facebook.com/docs/whatsapp/cloud-api/messages/image-messages#supported-image-formats'>Please check supported image formats</a>"
          },
          "required": false
        }
      }
    },
    "location": {
      "type": "object",
      "title": "Location",
      "help": {
        "description": "Required when type=location"
      },
      "required": false,
      "properties": {
        "longitude": {
          "type": "string",
          "title": "Longitude",
          "help": {
            "description": "Longitude of the location"
          },
          "required": false
        },
        "latitude": {
          "type": "string",
          "title": "Latitude",
          "help": {
            "description": "Latitude of the location"
          },
          "required": false
        },
        "name": {
          "type": "string",
          "title": "Name",
          "help": {
            "description": "Name of the location"
          },
          "required": false
        },
        "address": {
          "type": "string",
          "title": "Address",
          "help": {
            "description": "Address of the location"
          },
          "required": false
        }
      }
    },
    "template": {
      "type": "object",
      "title": "Template",
      "help": {
        "description": "Required when type=template"
      },
      "required": false,
      "properties": {
        "name": {
          "type": "string",
          "title": "Name",
          "help": {
            "description": "Name of the template"
          },
          "required": false
        },
        "language": {
          "type": "object",
          "title": "Language",
          "help": {
            "description": "Contains a language object. Specifies the language the template may be rendered in"
          },
          "required": false,
          "properties": {
            "policy": {
              "type": "string",
              "title": "Policy",
              "help": {
                "description": "The language policy the message should follow. The only supported option is deterministic"
              },
              "required": false
            },
            "code": {
              "type": "string",
              "title": "Code",
              "help": {
                "description": "The code of the language or locale to use. Accepts both language and language_locale formats (e.g., en and en_US). For all codes, see https://developers.facebook.com/docs/whatsapp/api/messages/message-templates#supported-languages"
              },
              "required": false
            }
          }
        }
      }
    },
    "text": {
      "type": "object",
      "title": "Text",
      "help": {
        "description": "Required for text messages"
      },
      "required": false,
      "properties": {
        "body": {
          "type": "string",
          "title": "Body",
          "help": {
            "description": "The text of the text message which can contain URLs which begin with http:// or https:// and formatting"
          },
          "required": false
        },
        "preview_url": {
          "type": "boolean",
          "title": "Preview URL",
          "help": {
            "description": "Set to true to have the WhatsApp Messenger and WhatsApp Business apps attempt to render a link preview of any URL in the body text string. URLs must begin with http:// or https://. If multiple URLs are in the body text string, only the first URL will be rendered"
          },
          "required": false
        }
      }
    },
    "video": {
      "type": "object",
      "title": "Video",
      "help": {
        "description": "Required for video messages"
      },
      "required": false,
      "properties": {
        "caption": {
          "type": "string",
          "title": "Caption",
          "help": {
            "description": "Video caption text. Maximum 1024 characters."
          },
          "required": false
        },
        "id": {
          "type": "string",
          "title": "Media ID",
          "help": {
            "description": "Required if using uploaded media, otherwise omit. ID of the <a href='https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#upload-media'>uploaded media asset</a>."
          },
          "required": false
        },
        "link": {
          "type": "string",
          "title": "Media URL",
          "help": {
            "description": "Required if using hosted media, otherwise omit. URL of the media asset hosted on your public server. It can be an external public URL or an internal Maestar storage URL. <a href='https://developers.facebook.com/docs/whatsapp/cloud-api/messages/video-messages#supported-video-formats'>Please check supported video formats</a>"
          },
          "required": false
        }
      }
    },
    "status": {
      "type": "string",
      "title": "Status",
      "help": {
        "description": "A message's status. You can use this field to mark a message as read"
      },
      "required": false
    },
    "context": {
      "type": "object",
      "title": "Context",
      "help": {
        "description": "Required if replying to any message in the conversation"
      },
      "required": false,
      "properties": {
        "message_id": {
          "type": "string",
          "title": "Message ID",
          "help": {
            "description": "ID of a previous message you are replying to"
          },
          "required": false
        }
      }
    }
  }
}
```
</details>

Input message fields depend on the type of the message (one of 'contacts', 'location', 'text', 'template', 'image', 'video', 'audio' or 'document').
E.g. in case type: "template" is specified, you must ensure the template is properly prepared and verified according to the Meta's requirements.
Please refer to the [official guides](https://developers.facebook.com/docs/whatsapp/message-templates/guidelines/) on how to accomplish it.

Here are example input payloads for different WhatsApp message types:

✅ 1. Text Message

```json
{
  "to": "+1234567890",
  "type": "text",
  "text": {
    "body": "Hello! This is a plain text message."
  }
}
```

✅ 2. Image Message

```json
{
  "to": "+1234567890",
  "type": "image",
  "image": {
    "link": "https://example.com/path/to/image.jpg",
    "caption": "Here is an image"
  }
}
```

✅ 3. Video Message

```json
{
  "to": "+1234567890",
  "type": "video",
  "video": {
    "link": "https://example.com/video.mp4",
    "caption": "Watch this video"
  }
}
```

✅ 4. Document Message

```json
{
  "to": "+1234567890",
  "type": "document",
  "document": {
    "link": "https://example.com/file.pdf",
    "filename": "Terms_and_Conditions.pdf"
  }
}
```

✅ 5. Location Message

```json
{
  "to": "+1234567890",
  "type": "location",
  "location": {
    "latitude": 37.422,
    "longitude": -122.084,
    "name": "Googleplex",
    "address": "1600 Amphitheatre Parkway, Mountain View, CA 94043"
  }
}
```

✅ 6. Template Message

```json
{
  "to": "+1234567890",
  "type": "template",
  "template": {
    "name": "hello_world",
    "language": {
      "code": "en_US"
    }
  }
}
```

#### Output Metadata

* **messaging_product** - (string, required): For the WhatsApp API it will **always** be 'whatsapp'.
* **contacts** - (array, required): The input and wa_id of the messages.
* **messages** - (array, optional): Messages status and ID.

## Triggers

### Webhook

This trigger is used to receive events from Facebook.

To utilize it, you need to manually create a webhook subscription in your Facebook application:

1. Create a flow with the `Webhook` trigger as the first step. You might also need to add additional [Credentials](#credentials).
2. Save and start this flow.
3. Click the `Run now` button. There you will see the webhook URL, which will look like `https://in.elastic.io/hook/6690dc400f98620012465ffd`. Copy this URL.
4. Sign in to [Meta for Developers](https://developers.facebook.com/apps/).
5. Open your app.
6. In the left menu bar, you will find the `Webhooks` section. Open it.
7. From the dropdown menu, select `WhatsApp Business Account` and click `Subscribe to this object`.
8. Paste the Callback URL you obtained in the third step.
9. Provide any string as the `Verify token`. This should match the component credentials `Verify Token`, then click `Verify and save`.
10. On this page, you can test webhooks by sending test data.
11. To receive actual data, you need to switch the `App Mode` to `Live mode`. For more information, visit [this page](https://developers.facebook.com/docs/development/build-and-test/app-modes/).

#### Configuration Fields

None

#### Input Metadata

None

#### Output Metadata

Dynamically created event from facebook
