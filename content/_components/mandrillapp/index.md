---
title: Mandrillapp component
layout: component
section: Marketing-related components
description: Mandrill is an email infrastructure service offered as an add-on for MailChimp.
icon:  mandrillapp.png
icontext: Mandrillapp component
category: Mandrillapp component
createdDate: 2016-11-14
updatedDate: 2017-10-23
---

## Authentication

For authentication you would need a Mandrill API key. You can find it (or generate it) in the Mandrill UI:

![Authentication on Mandrillapp](https://user-images.githubusercontent.com/56208/29975588-353f0cd4-8f37-11e7-8a2c-c5f1800efb9b.png)

## Triggers

### Inbound e-mail trigger

Intbound e-mail trigger can receive e-mails that are sent to mandrill inbox(es), it uses [Webhooks API](https://mandrill.zendesk.com/hc/en-us/articles/205583217-Introduction-to-Webhooks).

![Inbound e-mail trigger](img/mandrillapp-trigger.png)

You have following configuration parameters.

## Actions

### Send Template

![Mandrillapp action](img/mandrillapp-action.png)
