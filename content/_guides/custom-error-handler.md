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

To create an Custom Error Handler for your flow you have to switch to draft mode and click to **"Add Error handling"** button:

![Add Error handling](/assets/img/integrator-guide/custom-error-handler/add-error-handling.png)

Then you have to choose a component you want to use to handle flow errors:

![Choose component](/assets/img/integrator-guide/custom-error-handler/choose-component.png)

In our example, we are using an [E-mail component](/components/email/index) to send information to the E-mail. In this case, it is information about `error name` and `error message`:

![Configure component Input](/assets/img/integrator-guide/custom-error-handler/configure-component-input.png)

Here you can see what the message from the platform looks like if an error occurs - in our case, we received the name of the error and its message:

![Message from platform](/assets/img/integrator-guide/custom-error-handler/email.png)
