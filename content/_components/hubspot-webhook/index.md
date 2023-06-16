---
title: HubSpot Webhook component
layout: component
section: CRM components
description: HubSpot webhook Component is designed to track events happening in a HubSpot account.
icon: hubspot.png
icontext: Hubspot Webhook component
category: hubspot-webhook
updatedDate: 2023-05-22
ComponentVersion: 1.0.0
---

## Description

HubSpot webhook Component is designed to track events happening in a HubSpot account. Designed separate from main `HubSpot` component due to different credential mechanism and trigger behavior

## Credentials

Component credentials configuration fields:
* **Secret** (string, required) - You need to provide Client secret from HubSpot application here

## Triggers

### Webhook
Receive data from HubSpot based on configured [webhooks](https://developers.hubspot.com/docs/api/webhooks) and [validate](https://developers.hubspot.com/docs/api/webhooks/validating-requests) it

Note that you always have to use the `Add sample manually` approach to save the sample.

To use this action you need to preform the following steps:

1. Create flow with `Hubspot webhook Component` as initial step and save it
2. Now you can get Webhook url:

{% include img.html max-width="100%" url="img/webhook-url.png" title="Webhook url" %}

3. Use it inside HubSpot as `Target URL`

{% include img.html max-width="100%" url="img/target-url.png" title="Target url" %}

### Config Fields

There is no configuration fields in this trigger.

#### Input Metadata

There is no input metadata in this trigger.

#### Output Metadata

Event will fulfill whole message

## Limitations

* `Send sample request` works not as expected, use `Add sample manually` instead
* `Verify` credentials process always executes successfully for now
