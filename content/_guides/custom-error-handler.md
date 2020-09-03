---
title: Custom Error Handler
description: Custom Error Handler is a feature which gives a possibility to send all important information about errors in your flow.
layout: article
section: Troubleshooting
order: 5
category: troubleshooting
---

## Description

Custom Error Handler is a feature which gives you a possibility to send all important information about Errors in your integration flow. In order to submit information about flow errors you can use dozens of components that will help you send an email, create a spreadsheet and much more. The screenshot below shows what kind of error information you can get:

![Error emitter](/assets/img/integrator-guide/custom-error-handler/error-emitter.png)

## How works

To create an Custom Error Handler for your flow please switch to draft mode and click to **"Add Error handling"** button:

![Add Error handling](/assets/img/integrator-guide/custom-error-handler/add-error-handling.png)

We will show you two examples with two different components - [E-mail component](/components/email/index) and [Google Spreadsheet component](/components/gspreadsheet/index).

### Example with E-mail

First choose a E-mail component to handle flow errors:

![Choose e-mail component](/assets/img/integrator-guide/custom-error-handler/choose-email-component.png)

In our example, we are using an [E-mail component](/components/email/index) to send information to the E-mail. In this case, it is information about `error name` and `error message`:

![Configure component Input](/assets/img/integrator-guide/custom-error-handler/configure-component-input.png)

Here you can see what the message from the platform looks like if an error occurs - in our case, we received the name of the error and its message:

![Message from platform](/assets/img/integrator-guide/custom-error-handler/email.png)

### Example with Spreadsheet

First choose a Google Spreadsheet component to handle flow errors:

![Choose Spreadsheet component](/assets/img/integrator-guide/custom-error-handler/choose-gspreadsheet-component.png)

Then choose **"Add Spreadsheet Row"** as action:

![Add Spreadsheet Row](/assets/img/integrator-guide/custom-error-handler/add-spreadsheet-row.png)

When configuring the component, please select a pre-created table, select a Worksheet and Input Mod. We are using **"First Row as Headers"** mode witch generates input based on values in first row cells. Cells must be created in advance, in our case they are called **"Error name"** and **"Error description"**:

![First Configuration](/assets/img/integrator-guide/custom-error-handler/configuration-1.png)

Now you can see the first cells **"Error name"** and **"Error description"** as input headers. In our case, we select the error name and its message as input:

![Second Configuration](/assets/img/integrator-guide/custom-error-handler/configuration-2.png)

Here you can see a spreadsheet with error messages:

![Table](/assets/img/integrator-guide/custom-error-handler/table.png)
