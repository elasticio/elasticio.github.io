---
title: Ordering fields in component.json
description: This article describes ordering parameters, metadata, triggers, actions and credentials in component.json.
layout: article
section: Component Template Features
order: 3
category: component-descriptor
redirect_from:
  - /references/component-descriptor-ordering-fields.html
---

## JSON and order of the fields

The component descriptor is a `JSON` file and according to the
[standard specification](https://tools.ietf.org/html/rfc7159) the ordering fields
is not important. It is the task of rendering engine to order based on a parameter.

Un-ordered rendering could sometimes introduce confusion on how and in
which sequence parameter fields are rendered during the mapping on UI.

> **NOTE** If your use case warrants a specific ordering of fields then you can use a
> parameter called `order` in your `component.json` to explicitly tell the platform
> to render the input fields in a specific sequence.

## Order parameter

You can configure the order of fields in `component.json` using a numeric key
order for the following sections:

*   output metadata
*   credentials
*   action/trigger
*   action/trigger order
*   action/trigger on recipe activation page
*   credentials on recipe activation page

To order fields you can use any numerical sequence like `9,8,7,6,5,4,3,2,1,0`. The
platform will order from the highest value in the top (`9`) to the lowest values in
the bottom (`0`).

Your sequence can also have gaps like `100,10,5,3,0`. The platform will render
the fields similarly starting from `100` and going down to `0`. Here are some
examples where ordering of the fields is done.

## Ordering metadata

Here is an example of `component.json` for metadata ordering:

```json
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
              "required": true,
              "order":4
            },
            "cc": {
              "title": "Cc",
              "type": "string",
              "required": false,
              "order":3
            },
            "bcc": {
              "title": "Bcc",
              "type": "string",
              "required": false,
              "order":2
            },
            "subject": {
              "title": "Subject",
              "type": "string",
              "required": true,
              "order":1
            },
            "textBody": {
              "title": "Body",
              "type": "string",
              "required": true,
              "maxLength": 1000,
              "order":0
            }
          }
        }
      }
    }
  }
```

## Ordering in triggers and actions

Here is an example of `component.json`, now for trigger/action ordering:

```json
"lookupObjects": {
      "order": 10,
      "title": "Lookup Objects",
      "main": "./lib/actions/lookupObjects.js",
      "description": "Look for objects satisfying specified criteria",
      "dynamicMetadata": true,
      "fields": {
        "sobject": {
          "order": "10",
          "viewClass": "SelectView",
          "label": "Object",
          "required": true,
          "model": "objectTypes",
          "prompt": "Please select a Salesforce Object"
        },
        "includeDeleted": {
          "order": "20",
          "viewClass": "CheckBoxView",
          "label": "Include deleted"
        },
        "outputMethod": {
          "order": "30",
          "viewClass": "SelectView",
          "label": "Output method",
          "required": true,
          "model": {
            "emitAll": "Emit all",
            "emitPage": "Emit page",
            "emitIndividually": "Emit individually"
          },
          "prompt": "Please select an output method"
        },
        "termNumber": {
          "order": "40",
          "viewClass": "TextFieldView",
          "label": "Number of search terms",
          "required": true,
          "placeholder": "Please specify a number of search terms",
          "note": "Enter a positive integer number [1-99] or 0 to lookup all entities of chosen type"
        }
      }
    }
```

## Ordering in credentials

Same for credentials ordering:

```json
"credentials": {
    "verifier": "io.elastic.jdbc.JdbcCredentialsVerifier",
    "fields": {
      "dbEngine": {
        "order":1,
        "viewClass": "SelectView",
        "label": "DB Engine",
        "required": true,
        "model": {
          "mysql": "MySQL",
          "postgresql": "PostgreSQL",
          "oracle": "Oracle",
          "mssql": "MSSQL"
        },
        "prompt": "Please Select Database Type"
      },
      "host": {
        "order":100,
        "viewClass": "TextFieldView",
        "label": "Connection URI (host)",
        "required": true,
        "placeholder": "Connection URI"
      },
      "port": {
        "viewClass": "TextFieldView",
        "label": "Connection port",
        "required": false,
        "placeholder": "Connection port"
      },
      "databaseName": {
        "order":10,
        "viewClass": "TextFieldView",
        "label": "Database Name",
        "required": true,
        "placeholder": "Database Name"
      },
      "user": {
        "order":1000,
        "viewClass": "TextFieldView",
        "label": "User",
        "required": true,
        "placeholder": "User"
      },
      "password": {
        "order":1000000,
        "viewClass": "PasswordFieldView",
        "label": "Password",
        "required": true,
        "placeholder": "Password"
      },
      "configurationProperties": {
        "order":0,
        "viewClass": "TextFieldView",
        "label": "Configuration properties",
        "required": false,
        "placeholder": "useUnicode=true&serverTimezone=UTC"
      }
    }
  }
```

## Related links

- [The JavaScript Object Notation (JSON) Data Interchange Format](https://tools.ietf.org/html/rfc7159)
