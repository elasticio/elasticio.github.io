---
title: Custom Error Handler
description: Custom Error Handler feature gives you a control to process information about Errors in your integration flow the way it makes sense for your workflow.
layout: article
section: Troubleshooting
order: 5
category: troubleshooting
---

## Description

Custom Error Handler feature gives you a control to process information about
Errors in your integration flow the way it makes sense for your workflow. You con
use any component which has an action function to process the error information.
For example you can send [Email](/components/email/), add a row in
[spreadsheet](/components/gspreadsheet/) and much more.

The screenshot below shows what kind of error information you can get:

![Error emitter](/assets/img/integrator-guide/custom-error-handler/error-emitter.png)

## How works

To create an Custom Error Handler for your flow switch to the draft mode and click
on **"Add Error handling"** button:

![Add Error handling](/assets/img/integrator-guide/custom-error-handler/add-error-handling.png)

Here are couple of suggestions to guide you in the process:

*   To configure Custom Error Handler your draft must have at least one configured step.
*   Consider configuring error handling in the end of flow configuration.
*   Always have a plan what are you going to do with the errors before starting the process.

To help you make your own mind we have two examples, in one we use [E-mail component](/components/email/)
and in the second we use [Google Spreadsheet component](/components/gspreadsheet/)
as error handler.

## Example with E-mail

Click on Custom Error Handler button and choose a E-mail component to handle flow
errors:

![Choose e-mail component](/assets/img/integrator-guide/custom-error-handler/choose-email-component.png)

In our example, we are using an [E-mail component](/components/email/index) to
send information per E-mail. We use information about `error name` and `error message`:

![Configure component Input](/assets/img/integrator-guide/custom-error-handler/configure-component-input.png)

Here you can see what the message from the platform looks like if an error occurs.
We received the name of the error and its message as expected:

![Message from platform](/assets/img/integrator-guide/custom-error-handler/email.png)

## Example with Spreadsheet

Click on Custom Error Handler button and choose a Google Spreadsheet component
to handle flow errors. Before starting you must have a spreadsheet ready to
receive the errors. This means spreadsheet with headers created:

![Choose Spreadsheet component](/assets/img/integrator-guide/custom-error-handler/choose-gspreadsheet-component.png)

Then choose **"Add Spreadsheet Row"** as action:

![Add Spreadsheet Row](/assets/img/integrator-guide/custom-error-handler/add-spreadsheet-row.png)

When configuring the component, please select a pre-created table, select a
Worksheet and Input Mod. We are using **"First Row as Headers"** mode witch
generates input based on values in first row cells. Again, cells must be created in
advance, in our case they are called **"Error name"** and **"Error description"**:

![First Configuration](/assets/img/integrator-guide/custom-error-handler/configuration-1.png)

Now you can see the first cells **"Error name"** and **"Error description"** as
input headers. In our case, we select the error name and its message as input:

![Second Configuration](/assets/img/integrator-guide/custom-error-handler/configuration-2.png)

Here you can see the final result, the spreadsheet with error messages filled:

![Table](/assets/img/integrator-guide/custom-error-handler/table.png)
