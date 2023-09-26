---
title: Zoom Webhook component
layout: component
section: Utility components
description: A component to receive Zoom webhook events from Zoom API.
icon: zoom-webhook.png
icontext: Zoom Webhook component
category: zoom-webhook
ComponentVersion: 1.0.0
updatedDate: 2023-01-13
---

## API version

There is no specific version of the Zoom Events API. [Zoom Events Changelog](https://marketplace.zoom.us/docs/guides/stay-up-to-date/changelog/).
We can only refer to the development date as of the specific point where the component has been developed and tested.

## Credentials

Component credentials configuration fields:

* **Secret Token**  (string, required) - Secret token (salt) that will be used to validate the webhook endpoint for a
  CRC request from the Zoom API

### How to create an App

To start receiving events first things that you need to do is to create an application in the Zoom Marketplace:
1. Login to your Zoom account.
2. Go to the [Marketplace](https://marketplace.zoom.us/develop/create).
3. Choose `Webhook Only` app.
4. Give it a name.
5. Fill in all the fields (company name, your name, email, etc.). Click *Continue*.
6. Copy the secret token. This value should be saved in the component credentials.
7. Toggle `Event Subscriptions` and hit the `+ Add Event Subscription` button.
8. Give it a name and by clicking `+ Add Events` select all the events you want to come to the webhook.
9. In the `Event notification endpoint URL` field input the URL of the webhook on the platform.
  * Go to the platform, create a flow with the Zoom webhook trigger as the first component in the flow.
  * Create the credentials and specify the secret token.
  * Finish the flow and publish the draft.
  * **IMPORTANT!** Set the flow to realtime. Copy the webhook URL of the flow.
  * Start the flow.
  * Input this URL on the Zoom app configuration page and click `Validate`. If validation succeed click Continua and finish the process.

## Triggers

### Webhook

>**Please Note:** The flow **must** be set as realtime. As it is crucial for the webhook endpoint validation to response within
3 seconds. Otherwise, validation will fail.

Webhook trigger currently works in 2 modes depending on the input message. It simply emits the event from the ZOOM API.
Or, in case of the validation event, calculate and respond to the API to prove the connection is safe.

- Validate webhook endpoint. When you add a new webhook or make changes to an existing one you need to validate the
  webhook endpoint. Zoom will also automatically revalidate webhooks every 72 hours.
  Read more about the validation
  process [here](https://developers.zoom.us/docs/api/rest/webhook-reference/#validate-your-webhook-endpoint).
- Pass events through as is

Incoming messages (events) are validated according to the Zoom [process](https://marketplace.zoom.us/docs/api-reference/webhook-reference/#verify-webhook-events).
If a calculated signature does not match with the signature received in the headers from Zoom - an error will be thrown!

#### Configuration Fields

* **Emit Validate webhook event** - (checkbox, optional): Either emit a message or not when `endpoint.url_validation`
  event received. Normally it does not make sense to emit those messages.

#### Input Metadata

There is no Input Metadata in this Trigger.

#### Output Metadata

- **Event name** - (string, required): Name of the event. E.g. meeting.started, meeting.ended, endpoint.url_validation,
  etc.
- **Event timestamp** - (number, required): Timestamp of the event. E.g. 1672916857229.
- **Payload** - (object, required): Event as is.
