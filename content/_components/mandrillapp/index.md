---
title: Mandrillapp component
layout: component
section: Marketing-related components
description: Mandrill is an email infrastructure service offered as an add-on for MailChimp.
icon: mandrillapp.png
icontext: Mandrillapp component
category: mandrillapp
updatedDate: 2023-04-06
ComponentVersion: 1.0.0
---

## Authentication

For authentication you would need a Mandrill API key. You can find it (or generate it) in the Mandrill UI:

![Authentication on Mandrillapp](img/mandrillapp-auth.png)

## Technical Notes

The [technical notes](technical-notes) page gives some technical details about Mandrillapp component like [changelog](/components/mandrillapp/technical-notes#changelog).

## Triggers

### Inbound e-mail trigger

Inbound e-mail trigger can receive e-mails that are sent to mandrill inbox(es),
it uses Mandrill Webhooks API.

You have following configuration parameters:

![Configuration Parameters](https://user-images.githubusercontent.com/36419533/102479003-fcf9c000-4066-11eb-89b8-4d33d48efb3b.png)

## Actions

### Send Template

![Mandrillapp action](img/mandrillapp-action.png)
