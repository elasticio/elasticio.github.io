---
title: Custom Error Handling
layout: article
section: Platform Features
description: This document provides basic information on how you can configure and use the custom error handling in your integration flows.
order: 9
category: platform-features
---





### Preconditions and Limitations

> The Node.js Sailor `2.6.13+` version is required for this mechanism to work, therefore,
> we recommend upgrading your custom components accordingly.

This version of custom error handling handles only certain use cases and errors.
It is still not able to handle:

*   "Container failed to start" by request-reply as error handler. It causes request timeout on webhook.
*   "Container failed to start" original error messages.
*   If your component is not using a system-wide mapper component right before to map the fields, then you must upgrade the Node.js Sailor to at least `2.6.13` version.
*   At this moment the components which do not require mapper component input to function would not show in the components list to choose from to map.

Custom error handler support in Flow Designer:

Only 1 error handling is supported for now, icon is located at the right bottom corner and is visible at all times except if user is in version mode of designer and that version does not have any custom error handling
Custom error handing step configuration has an icon of the chosen node in the step summary and in the header, instead of the general icon (BUT, on the graph the icon never changes)
The incoming hardcoded sample:

```json
{
    "error": {
        "message": "Error message",
        "name": "Error name",
        "stack": "Error stack trace"
    },
    "errorInput": {
      "properties": {
            "headers": { "header":"value" }
        },
        "content": {
            "headers": { "header":"value" },
            "body": {}
        }
    }
}
```
