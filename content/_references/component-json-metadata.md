---
title: Metadata Schemas for Components
description: This technical reference describes the schema rules for in and out metadata for components
layout: article
section: Component.json Technical Reference
order: 7
category: component-descriptor
---

## JSONSchema References

You can use [JSONSchema references](https://json-schema.org) in Component metadata. Basically, it allows you to avoid repetitive coding by referencing certain keys called definitions. Let's take Email Component as an example. Here you can see three address fields `To`, `Cc` and `Bcc`:

```json
{
  "actions": {
    "send": {
      "main": "./send.js",
      "title": "Send Mail",
      "metadata": {
        "in": {
          "type": "object",
          "properties": {
            "to": {
              "title": "To",
              "type": "string",
              "required": true
            },
            "cc": {
              "title": "Cc",
              "type": "string",
              "required": false
            },
            "bcc": {
              "title": "Bcc",
              "type": "string",
              "required": false
            }
          }
        }
      }
    }
  }
}
```

The thing about them is that they are basically the same element. So what you can do is add a definition for address fields, and just refer to it every time you need one. Here is how it will look like:

```json
{
  "definitions": {
    "addressfields": {
      "type": "object",
      "properties": {
        "To":           { "type": "string" },
        "Cc":           { "type": "string" },
        "Bcc":          { "type": "string" }
      },
      "required": ["To"]
    }
  }
}
```

When you need to refer to this definition from elsewhere using the `$ref` keyword:

`{ "$ref": "#/definitions/addressfields" }`

So if we go back to our initial Email Component, with a set reference it will look like this:

```json
{
  "actions": {
    "send": {
      "main": "./send.js",
      "title": "Send Mail",
      "metadata": {
        "in": {
          "type": "object",
          "properties": {
            "$ref": "#/definitions/addressfields"
          }
        }
      }
    }
  }
}
```

>**IMPORTANT:** We do not support referencing by `$id` and referencing external schemas at the moment.
