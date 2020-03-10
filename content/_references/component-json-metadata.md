---
title: Metadata Schemas for Components
description: This technical reference describes how to implement JSONSchema references in .in and .out component metadata
layout: article
section: Component.json
order: 7
category: component-descriptor
---

## JSONSchema References

You can use [JSONSchema references](https://json-schema.org) in Component metadata files (i.e. files with `.in.json` and `.out.json` extensions). Basically, it allows you to avoid repetitive coding by referencing certain keys called definitions. Let's take an Order component metadata file (we'll call it `order.in.json`) as an example. Here you can see that this component has two address fields `billing_address` and `shipping_address`, each with some subfields:

`order.in.json`:

```json
{
  "type": "object",
  "properties": {
    "billing_address": {
      "type": "object",
      "required": true,
      "properties": {
        "street_address": {
          "type": "string",
          "required": true
        },
        "city": {
          "type": "string",
          "required": true
        },
        "state": {
          "type": "string",
          "required": true
        },
        "telephone": {
          "type": "number"
        }
      }
    },
    "shipping_address": {
      "type": "object",
      "required": true,
      "properties": {
        "street_address": {
          "type": "string",
          "required": true
        },
        "city": {
          "type": "string",
          "required": true
        },
        "state": {
          "type": "string",
          "required": true
        },
        "telephone": {
          "type": "number"
        }
      }
    }
  }
}
```

Note that the subfields for each address are the same. This means you can assign a more general type `addressfields` that represents both `billing_address` and `shipping_address`. You can implement this by adding a definition for `addressfields`, and just refer to the definition every time you want an object with the same shape:

```json
{
  "definitions": {
    "addressfields": {
      "type": "object",
      "required": true,
      "properties": {
        "street_address": {
          "type": "string",
          "required": true
        },
        "city": {
          "type": "string",
          "required": true
        },
        "state": {
          "type": "string",
          "required": true
        },
        "telephone": {
          "type": "number"
        }
      }
    }
  }
}
```

This definition can be referred to by replacing the object definition with just the `$ref` keyword and the path to the definition field (where `#` represents the JSONSchema's outermost property space):

`{ "$ref": "#/definitions/addressfields" }`

Now, your `order.in.json` file will look like this:

```json
{
  "definitions": {
    "addressfields": {
      "type": "object",
      "required": true,
      "properties": {
        "street_address": {
          "type": "string",
          "required": true
        },
        "city": {
          "type": "string",
          "required": true
        },
        "state": {
          "type": "string",
          "required": true
        },
        "telephone": {
          "type": "number"
        }
      }
    }
  },
  "type": "object",
  "properties": {
    "billing_address": {
      "$ref": "#/definitions/addressfields"
    },
    "shipping_address": {
      "$ref": "#/definitions/addressfields"
    }
  }
}
```

Another way to implement a definition is by adding an `$id` field to the definition object and reference that id's value in the place of the path to the definition as so:

```json
{
  "definitions": {
    "addressfields": {
      "$id": "#addressfields",
      "type": "object",
      "required": true,
      "properties": {
        "street_address": {
          "type": "string",
          "required": true
        },
        "city": {
          "type": "string",
          "required": true
        },
        "state": {
          "type": "string",
          "required": true
        },
        "telephone": {
          "type": "number"
        }
      }
    }
  },
  "type": "object",
  "properties": {
    "billing_address": {
      "$ref": "#addressfields"
    },
    "shipping_address": {
      "$ref": "#addressfields"
    }
  }
}
```


>**IMPORTANT:** We do not support referencing external schemas at the moment.
