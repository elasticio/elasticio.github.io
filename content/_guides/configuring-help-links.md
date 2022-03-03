---
title: Configuring Help Links
layout: article
description: his document explains how to configure help links for Platform UI and provides examples.
section: Contract Management
order: 1
category: integrator-management
---

{{page.description}}

## Help Links

You can put help links on different stages of integration Flow creation:

*   When creating and verifying new Credentials
*   When selecting trigger or action of the Component
*   When receiving Credentials errors
*   When configuring Component fields and mapping, etc.

You can configure help links per Component via `help` property in a `component.json`:

```json
{
   "help": {
        "description": "Lorem ipsum",
        "link": "https://docs.acme.com/components/salesforce/credentials.html"
    }
}
```

**Properties:**

*  `help.description` - used to provide a short (1-2 sentences) description for the user as a quick help.
*  `help.link` - used to provide a URL of a more details documentation. This URL is configured by Platform administrator. Additionally `help.link` property may be defined in Credentials object and in all triggers and actions.

## Example

```json
{
  "title": "Salesforce",
  "help": {
       "link":  "https://docs.acme.com/components/salesforce"
  },
  "credentials": {
    "fields": {},
    "help": {
        "link": "#credentials"
     }
  },
  "triggers": {
    "queryTrigger": {
      "help": {
          "link":  "#query-trigger"
      }
    }
  },
  "actions": {
    "queryAction": {
      "help": {
          "link": "#query-action"
      }
    }
  }
}
```
