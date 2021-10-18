---
title: Try Metadata Tool
description:  An internal tool to render the component metadata structures to see how they would look on the platform UI.
layout: article
section: Component Template Features
order: 8
category: component-descriptor
---

We want to introduce you a Try Metadata Tool for the [{{site.data.tenant.name}} platform](http://www.{{site.data.tenant.name}}). You can use this tool to render the component metadata structures to see how they would
look on the platform UI. You can experiment and refine the metadata structure before
committing it to your custom component code. We hope this tool will be useful for you. To access this tool you can just click on the button on left-hand-side menu.

{% include img.html max-width="80%" url="/assets/img/developer-guide/try-metadata/try-metadata.png" title="Try metadata tool" %}

You can use this **JSON** to check how our tool works:

<details close markdown="block">
<summary>
Click to expand
</summary>
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
</details>

Of course, if a mistake is made, you will be notified on the right by **"Invalid JSON"**. Also you can see the specific line where the error was made:

{% include img.html max-width="80%" url="/assets/img/developer-guide/try-metadata/try-metadata-error.png" title="Try metadata error" %}

You can also access this tool using URL `APP_ADDRESS/c/CONTRACT_ID/try-component-metadata`
where the `APP_ADDRESS` is the address of the platform app {{site.data.tenant.appURL}}
and the `CONTRACT_ID` is your contract ID shown in your browser address bar between
`/c/` and `/w/` while visiting the platform UI:

{% include img.html max-width="80%" url="/assets/img/developer-guide/try-metadata/contract-id.png" title="Contact ID" %}

Here is an example of URL:

`https://acme.co/c/7928j9kh8738ea00j4gg38563/try-component-metadata`
